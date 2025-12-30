function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="resume-backdrop" onClick={onClose}>
      <div
        className="resume-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-header">
          <h3>Resume</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <iframe
          src="/resume.pdf"
          title="Resume Preview"
          className="resume-frame"
        />

        <div className="resume-actions">
          <a
            href="/resume.pdf"
            download
            className="download-btn"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
