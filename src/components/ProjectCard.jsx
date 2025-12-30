function ProjectCard({ project }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 bg-dark text-light border-secondary">
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>

          <div className="mb-2">
            {project.tech.map((item, index) => (
              <span
                key={index}
                className="badge bg-secondary me-1 mb-1"
              >
                {item}
              </span>
            ))}
          </div>

          <span
            className={`badge ${
              project.status === "Live" ? "bg-success" : "bg-warning"
            }`}
          >
            {project.status}
          </span>
        </div>

        <div className="card-footer d-flex justify-content-between">
          <a
            href={project.liveLink}
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Live
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            className="btn btn-sm btn-outline-light"
          >
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
