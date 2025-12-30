import aboutImg from "../assets/aboutpic.jpg";
import { useState } from "react";
import ResumeModal from "../components/ResumeModal";




function About() {
  const [showResume, setShowResume] = useState(false);
  return (
    <section className="container section-padding">
      <div className="row align-items-center g-5">
        {/* LEFT CONTENT */}
        <div className="col-lg-6">
          <h2 className="about-title mb-3">
            About Me
          </h2>

          <p className="about-text">
            I’m <strong>Sumit Kumar</strong>, a MERN Stack Developer with a strong
            focus on building scalable, real-world web applications. I specialize
            in React and modern frontend development while delivering efficient,
            production-ready solutions.
          </p>

          <p className="about-text">
            I enjoy working on end-to-end products, continuously improving my
            skills, and building projects that solve real problems with clean UI
            and solid architecture.
          </p>

          <button
           type="button"          // 🔴 VERY IMPORTANT
           className="resume-btn"
           onClick={() => setShowResume(true)}
      >
      View Resume
          </button>

          <ResumeModal
           isOpen={showResume}
           onClose={() => setShowResume(false)}
         />
         
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-6 text-center">
          <div className="about-image-wrapper">
            <img
              src={aboutImg}
              alt="Developer Illustration"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
