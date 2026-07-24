import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './style/Window.css';



import aboutImg from '../assets/about.png';
import projectsImg from '../assets/projects.png';
import contactImg from '../assets/contact.png';
import resumeImg from '../assets/resume.png';
import clickSound from '../assets/audio/tab_open.wav';
import closeAudio from '../assets/audio/tab_close.wav'; 
import resumePdf from '../assets/Aryll-Nevin-Morales_Resume.pdf';

export default function Window({ 
  isOpen, 
  onClose, 
  onOpenAbout, 
  onOpenProjects, 
  onOpenContact,
  zIndex,
  onFocus
}) {
  const nodeRef = useRef(null);

  if (!isOpen) return null;
  
  const playSound = () => {
    if (localStorage.getItem('isGlobalMuted') !== 'true') {
      try {
        const audio = new Audio(clickSound);
        audio.play();
      } catch (e) {
        console.log("Audio failed to play:", e);
      }
    }
  };

  const handleClose = () => {
    if (localStorage.getItem('isGlobalMuted') !== 'true') {
      try {
        const sound = new Audio(closeAudio);
        sound.play();
      } catch (e) {
        console.log("Close audio failed to play:", e);
      }
    }
    setTimeout(() => {
      if (onClose) onClose();
    }, 100);
  };

  const handleAboutClick = () => {
    playSound();
    if (onOpenAbout) onOpenAbout();
  };

  const handleProjectsClick = () => {
    playSound();
    if (onOpenProjects) onOpenProjects();
  };

  const handleContactClick = () => {
    playSound();
    if (onOpenContact) onOpenContact();
  };

  const handleResumeClick = () => {
    playSound();
    window.open(resumePdf, '_blank'); 
  };

  const startX = (window.innerWidth / 2) - 350;
  const startY = (window.innerHeight / 2) - 250;

  return (
    
    <Draggable 
    nodeRef={nodeRef} 
    handle=".title-bar" 
    cancel=".close" 
    defaultPosition={{x: -350, y: -250}}
    bounds="body"
    onMouseDown={onFocus}
    >

      <div 
        ref={nodeRef} 
        className="os-window main-window-anchor" 
        style={{ position: 'absolute', zIndex: zIndex }}
      >

        <div className="title-bar">
          <span className="title">Portfolio Portal</span>
          
          <div className="window-controls">
            <button className="btn close" onClick={handleClose}>
              [ x ]
            </button>
          </div>
        </div>

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
    </Draggable>
  );
}