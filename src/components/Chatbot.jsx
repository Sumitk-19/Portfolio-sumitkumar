import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const knowledgeBase = [
  {
    keywords: ["skill", "skills", "technology", "tech"],
    reply:
      "Sumit is skilled in MERN Stack (MongoDB, Express, React, Node.js), JavaScript, React, Node.js, Python, Java, Git, GitHub, Docker, and Kubernetes."
  },
  {
    keywords: ["project", "projects", "work"],
    reply:
      "Sumit has built projects like BookNest (MERN e-commerce), TinyFiles (image compressor), Friend Fusion (real-time chat app), and multiple production-ready web apps."
  },
  {
    keywords: ["experience", "internship", "background"],
    reply:
      "Sumit has over 2 years of hands-on experience in web development and has worked on real-world projects during internships and personal ventures."
  },
  {
    keywords: ["resume", "cv"],
    reply:
      "You can view or download Sumit’s resume from the About section using the 'View Resume' button."
  },
  {
    keywords: ["contact", "email", "reach"],
    reply:
      "You can contact Sumit through the Contact section or connect via LinkedIn and GitHub from the navigation bar."
  },
  {
    keywords: ["hello", "hi", "hey"],
    reply:
      "Hi 👋 I’m VISION AI BOT. Ask me about Sumit’s skills, projects, experience, or resume."
  }
];

function getBotReply(message) {
  const msg = message.toLowerCase();

  for (let item of knowledgeBase) {
    if (item.keywords.some(keyword => msg.includes(keyword))) {
      return item.reply;
    }
  }

  return "I can help with information about Sumit’s skills, projects, experience, or resume.";
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi 👋 I’m VISION AI BOT. Ask me anything about Sumit’s portfolio."
    }
  ]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef(null);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Pulse glow every 10s */
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

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    const botReply = getBotReply(input);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      if (!open) setUnread(u => u + 1);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className="chatbot-button"
        onClick={() => {
          setOpen(true);
          setUnread(0);
        }}
      >
        <FaRobot />
        <span className="chatbot-label">VISION AI BOT</span>
        {unread > 0 && <span className="chatbot-badge">{unread}</span>}
      </button>

      {/* Chat Window */}
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
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about skills, projects, resume…"
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
