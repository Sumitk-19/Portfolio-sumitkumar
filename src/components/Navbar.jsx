import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const sections = ["home", "about", "skills", "projects", "contact"];

function Navbar() {
  const [active, setActive] = useState("home");

  /* ---------- Scroll Spy ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* CENTER LINKS */}
        <ul className="nav-links">
          {sections.map((sec) => (
            <li key={sec}>
              <a
                href={`#${sec}`}
                className={active === sec ? "active" : ""}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT SOCIAL ICONS */}
        <div className="nav-socials">
          <a
            href="https://github.com/Sumitk-19"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sumitk19/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
