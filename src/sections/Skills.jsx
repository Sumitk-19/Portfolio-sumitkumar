import { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaJava,
  FaDocker,
  FaGitAlt,
  FaGithub,
  FaAngular,
  FaPython,
} from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiKubernetes,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      {
        name: "HTML",
        icon: <FaHtml5 />,
        level: 90,
        experience: "2+ years",
        tooltip: "Semantic HTML, accessibility, SEO structure",
      },
      {
        name: "CSS",
        icon: <FaCss3Alt />,
        level: 85,
        experience: "2+ years",
        tooltip: "Responsive layouts, animations, modern UI",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript />,
        level: 90,
        experience: "2+ years",
        tooltip: "ES6+, async logic, DOM, APIs",
      },
      {
        name: "React",
        icon: <FaReact />,
        level: 85,
        experience: "2 years",
        tooltip: "Hooks, SPA, component architecture",
      },
      {
        name: "Angular",
        icon: <FaAngular />,
        level: 65,
        experience: "1 year",
        tooltip: "Component-based architecture, routing",
      },
    ],
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: <FaNodeJs />,
        level: 80,
        experience: "2 years",
        tooltip: "REST APIs, authentication, middleware",
      },
      {
        name: "Java",
        icon: <FaJava />,
        level: 70,
        experience: "1.5 years",
        tooltip: "OOP, backend logic, DSA foundations",
      },
      {
        name: "Python",
        icon: <FaPython />,
        level: 85,
        experience: "3+ years",
        tooltip: "Automation, scripting, backend basics",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      {
        name: "MongoDB",
        icon: <SiMongodb />,
        level: 85,
        experience: "2+ years",
        tooltip: "NoSQL schemas, aggregation, indexing",
      },
      {
        name: "MySQL",
        icon: <SiMysql />,
        level: 80,
        experience: "1.5 years",
        tooltip: "Relational DB, joins, queries",
      },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      {
        name: "Git",
        icon: <FaGitAlt />,
        level: 85,
        experience: "2 years",
        tooltip: "Version control, branching, workflows",
      },
      {
        name: "GitHub",
        icon: <FaGithub />,
        level: 85,
        experience: "2+ years",
        tooltip: "Repositories, PRs, collaboration",
      },
      {
        name: "Docker",
        icon: <FaDocker />,
        level: 65,
        experience: "1 year",
        tooltip: "Containerization, images, environments",
      },
      {
        name: "Kubernetes",
        icon: <SiKubernetes />,
        level: 50,
        experience: "Learning",
        tooltip: "Orchestration basics, deployments",
      },
    ],
  },
];

function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Technologies I use to build scalable, production-ready applications.
        </p>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div
              className={`skill-card ${visible ? "show" : ""}`}
              key={idx}
              style={{ transitionDelay: `${idx * 0.15}s` }}
            >
              <h3>{category.title}</h3>

              {category.skills.map((skill, i) => (
                <div className="skill-row" key={i}>
                  <div className="skill-header">
                    <div className="skill-name" title={skill.tooltip}>
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                    <span className="skill-exp">{skill.experience}</span>
                  </div>

                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{
                        width: visible ? `${skill.level}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
