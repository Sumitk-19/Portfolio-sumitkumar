import { useEffect, useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";

const BOT_REPLIES = {
  hi: "Hi 👋 I’m VISION AI BOT. Ask me about Sumit’s skills, projects, resume, or contact info.",
  hello: "Hello! How can I help you today?",
  skills:
    "Sumit is a MERN Stack Developer skilled in React, Node.js, MongoDB, JavaScript, Java, Python, Docker, Git, and more.",
  projects:
    "You can explore projects like BookNest, Friend Fusion, and TinyFiles in the Projects section.",
  resume:
    "You can view or download Sumit’s resume from the About section using the Resume button.",
  contact:
    "You can reach Sumit through the contact form or via GitHub and LinkedIn links.",
  default:
    "I’m not sure about that. Try asking about skills, projects, resume, or contact.",
};

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m VISION AI BOT. Ask me anything!" },
  ]);

  /* ---------------- Pulse Glow every 10s ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const btn = document.querySelector(".chatbot-toggle");
      if (!btn) return;

      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"), 1800);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- Handle Send ---------------- */
  const handleSend = () => {
    if (!input.trim()) return;

    const lower = input.toLowerCase();
    let reply = BOT_REPLIES.default;

    Object.keys(BOT_REPLIES).forEach((key) => {
      if (lower.includes(key)) {
        reply = BOT_REPLIES[key];
      }
    });

    setMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      { from: "bot", text: reply },
    ]);

    if (!open) {
      setUnread((prev) => prev + 1);
    }

    setInput("");
  };

  /* ---------------- Toggle Chat ---------------- */
  const toggleChat = () => {
    setOpen((prev) => !prev);
    setUnread(0);
  };

  return (
    <>
      {/* ===== Floating Toggle ===== */}
      <div className="chatbot-toggle" onClick={toggleChat}>
        <span className="chatbot-icon">
          <TbMessageChatbot size={20} />
          {unread > 0 && <span className="chatbot-badge">{unread}</span>}
        </span>
        <span className="chatbot-label">VISION AI BOT</span>
      </div>

      {/* ===== Chat Window ===== */}
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            VISION AI BOT
            <span onClick={() => setOpen(false)}>×</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
