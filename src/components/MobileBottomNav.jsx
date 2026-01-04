import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaEnvelope
} from "react-icons/fa";


const navItems = [
  { id: "home", label: "Home", icon: <FaHome /> },
  { id: "about", label: "About", icon: <FaUser /> },
  { id: "skills", label: "Skills", icon: <FaCode /> },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope /> }
];

function MobileBottomNav() {
  const [active, setActive] = useState("home");
  const [tooltip, setTooltip] = useState(null);

  /* Scroll Spy */
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + window.innerHeight / 2;

      navItems.forEach(({ id }) => {
        const sec = document.getElementById(id);
        if (!sec) return;

        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Long-press tooltip */
  const handleTouchStart = (label) => {
    setTooltip(label);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTooltip(null), 600);
  };

  return (
    <nav className="mobile-bottom-nav">
      <span
        className="active-dot"
        style={{
          left: `${navItems.findIndex(i => i.id === active) * 56 + 28}px`
        }}
      />

      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`nav-item ${active === item.id ? "active vibrate" : ""}`}
          onTouchStart={() => handleTouchStart(item.label)}
          onTouchEnd={handleTouchEnd}
        >
          {item.icon}
          {tooltip === item.label && (
            <span className="tooltip">{item.label}</span>
          )}
        </a>
      ))}
    </nav>
  );
}

export default MobileBottomNav;
