import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi 👋 I’m VISION AI BOT. Ask me anything about Sumit’s portfolio.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);

  /* ---------- Auto Scroll ---------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- Pulse Glow every 10s ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!open) {
        const btn = document.querySelector(".chatbot-button");
        btn?.classList.add("pulse");
        setTimeout(() => btn?.classList.remove("pulse"), 1200);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [open]);

  /* ---------- Send Message ---------- */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        content: data.reply || "Sorry, I couldn’t respond.",
      };

      setMessages((prev) => [...prev, botMsg]);

      if (!open) setUnread((u) => u + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "AI service unavailable right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- Floating Button ---------- */}
      <button
        className="chatbot-button"
        onClick={() => {
          setOpen(true);
          setUnread(0);
        }}
      >
        <FaRobot size={20} />
        <span className="chatbot-label">VISION AI BOT</span>

        {unread > 0 && <span className="chatbot-badge">{unread}</span>}
      </button>

      {/* ---------- Chat Window ---------- */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>VISION AI BOT</span>
            <FaTimes onClick={() => setOpen(false)} />
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-msg ${msg.role === "user" ? "user" : "bot"}`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="chat-msg bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about projects, skills, resume…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
