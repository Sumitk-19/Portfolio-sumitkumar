import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi 👋 I’m VISION AI BOT. Ask me anything about Sumit’s skills, projects, or resume.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);
  const pulseRef = useRef(null);

  /* ---------- Auto scroll ---------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------- ESC to close ---------- */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ---------- Pulse glow every 10s ---------- */
  useEffect(() => {
    if (open) return;

    const interval = setInterval(() => {
      if (pulseRef.current) {
        pulseRef.current.classList.add("pulse");
        setTimeout(() => {
          pulseRef.current?.classList.remove("pulse");
        }, 1200);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [open]);

  /* ---------- Send message ---------- */
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.reply || "I couldn’t generate a response.",
        },
      ]);

      if (!open) setUnread((u) => u + 1);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠️ AI is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ---------- Floating Toggle Button ---------- */}
      <button
        ref={pulseRef}
        className="chatbot-button"
        onClick={() => {
          setOpen(true);
          setUnread(0);
        }}
        aria-label="Open AI Chatbot"
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
            <FaTimes
              className="chatbot-close"
              onClick={() => setOpen(false)}
            />
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

            {loading && <div className="chat-msg bot">Typing…</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about projects, skills, resume…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
