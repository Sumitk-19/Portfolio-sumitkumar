import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const sections = ["home", "about", "skills", "projects", "contact"];

function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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

  /* ---------- Close mobile menu on resize ---------- */
  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 992) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <nav className="navbar">
  <div className="nav-inner">
    

    {/* CENTER: LINKS (DESKTOP) */}
    <ul className="nav-links desktop">
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

    {/* RIGHT: SOCIALS + HAMBURGER */}
    <div className="nav-actions">
      <div className="nav-socials desktop">
        <a href="https://github.com/Sumitk-19" target="_blank"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/sumitk19/" target="_blank"><FaLinkedin /></a>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
      </div>
    </div>
  </div>

  {/* MOBILE MENU */}
  {menuOpen && (
    <div className="mobile-menu">
      {sections.map((sec) => (
        <a
          key={sec}
          href={`#${sec}`}
          className={active === sec ? "active" : ""}
          onClick={() => setMenuOpen(false)}
        >
          {sec.charAt(0).toUpperCase() + sec.slice(1)}
        </a>
      ))}

      <div className="mobile-socials">
        <a href="https://github.com/Sumitk-19"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/sumitk19/"><FaLinkedin /></a>
      </div>
    </div>
  )}
</nav>
  );
}

export default Navbar;
