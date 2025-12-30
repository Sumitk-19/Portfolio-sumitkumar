import heroImg from "../assets/profile.png";

function Home() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6">
            <p className="hero-subtitle">Hello, I’m</p>

            <h1 className="hero-title">
            <span className="hero-name">SUMIT KUMAR</span>
            
            </h1>



            <h3 className="hero-role">
              MERN Stack Developer
            </h3>

            <p className="hero-description">
              A passionate web developer with a strong focus on designing and delivering scalable, 
              user-centric, and production-ready web applications, combining clean architecture, modern 
              technologies, and performance-driven development practices to build reliable solutions that 
              solve real-world problems.
            </p>

          
            
          </div>

          {/* RIGHT IMAGE */}
          <div className="orbit-wrapper">
  {/* Orbit animation stays as-is */}
  <svg
    className="hex-orbit-svg"
    viewBox="0 0 200 200"
    width="460"
    height="460"
  >
    <polygon
      points="100,10 180,55 180,145 100,190 20,145 20,55"
      fill="none"
      stroke="url(#hexGradient)"
      strokeWidth="2"
    />
    <defs>
      <linearGradient id="hexGradient" gradientTransform="rotate(45)">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
  </svg>

  {/* STATIC HEXAGON IMAGE */}
  <div className="hex-image-container">
    <img src={heroImg} alt="Profile" />
  </div>
</div>



        </div>
      </div>
    </section>
  );
}

export default Home;
