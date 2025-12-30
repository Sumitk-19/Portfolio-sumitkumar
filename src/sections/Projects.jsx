import { useState } from "react";
import { projects } from "../data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const filters = ["All", "MERN", "Web App", "Realtime"];

function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">
        Real-world applications I’ve built and shipped.
      </p>

      {/* Filters */}
      <div className="project-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={active === f ? "active" : ""}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="projects-grid">
        {filtered.map((p) => (
          <div className="project-card" key={p.id}>
            <img src={p.image} alt={p.title} loading="lazy" />

            <div className="project-content">
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              <div className="project-tech">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={p.github} target="_blank">
                  <FaGithub />
                </a>
                {p.live !== "#" && (
                  <a href={p.live} target="_blank">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
