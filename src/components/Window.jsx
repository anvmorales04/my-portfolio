import './style/Window.css';
import aboutImg from '../assets/about.png';
import projectsImg from '../assets/projects.png';
import contactImg from '../assets/contact.png';
import resumeImg from '../assets/resume.png';
import clickSound from '../assets/audio/tab_open.wav';
import resumePdf from '../assets/Aryll-Nevin-Morales_Resume.pdf';

export default function Window({ onOpenAbout, onOpenProjects, onOpenContact }) {
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleAboutClick = () => {
    playSound();
    console.log("Clicked About Window");
    if (onOpenAbout) {
      onOpenAbout();
    }
  };

    const handleProjectsClick = () => {
    playSound();
    console.log("Clicked Projects Window");
    if (onOpenProjects) {
      onOpenProjects();
    }
  };

  const handleContactClick = () => {
    playSound();
    console.log("Clicked Contact Window");
    if (onOpenContact) onOpenContact();
  };

  const handleResumeClick = () => {
    playSound();
    window.open(resumePdf, '_blank'); 
  };

  return (
    <div className="os-window main-window-anchor">
      {/* The top bar of the window */}


      <div className="title-bar">
        <span className="title">Portfolio Portal</span>
      </div>

      {/* The inside of the window */}
      <div className="window-content">
        <h3 className="spacing-tight">Developer | Engineer | Artist</h3>

        <h1 className="spacing-normal">&gt; Aryll Nevin Morales</h1>

        <p>Computer Engineering graduate from De La Salle Lipa. I build and create things, bringing highly unique, out-of-the-box ideas to life.</p>

        <p>Welcome to my portfolio portal! <br/>
          Below you may select which tab you want to access. Happy browsing!</p>
        
        <div className="button-row">
          <button className="icon-btn" alt="About icon" onClick={handleAboutClick}>
            <img src={aboutImg} alt="About" />
            <span>About</span>
          </button>

          <button className="icon-btn" alt="Projects icon" onClick={handleProjectsClick}>
            <img src={projectsImg} alt="Projects" />
            <span>Projects</span>
          </button>

          <button className="icon-btn" alt="Contact icon" onClick={handleContactClick}>
            <img src={contactImg} alt="Contact" />
            <span>Contact</span>
          </button>

          <button className="icon-btn" alt="Resume icon" onClick={handleResumeClick}>
            <img src={resumeImg} alt="Resume"/>
            <span>Resume</span>
          </button>
        </div>


      </div>
    </div>
  );
}   