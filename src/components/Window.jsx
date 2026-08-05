import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './style/Window.css';

import ViewCounter from './style/ViewCounter';

import aboutImg from '../assets/about.png';
import projectsImg from '../assets/projects.png';
import contactImg from '../assets/contact.png';
import resumeImg from '../assets/resume.png';
import { playSound } from '../utils/audio';

export default function Window({ 
  isOpen, 
  onClose, 
  onOpenAbout, 
  onOpenProjects, 
  onOpenContact,
  onOpenResume,
  zIndex,
  onFocus
}) {
  const nodeRef = useRef(null);

  if (!isOpen) return null;
  
  const playWindowSound = () => {
    playSound('windowOpen');
  };

  const handleClose = () => {
    playSound('windowClose');
    setTimeout(() => {
      if (onClose) onClose();
    }, 100);
  };

  const handleAboutClick = () => {
    playWindowSound();
    if (onOpenAbout) onOpenAbout();
  };

  const handleProjectsClick = () => {
    playWindowSound();
    if (onOpenProjects) onOpenProjects();
  };

  const handleContactClick = () => {
    playWindowSound();
    if (onOpenContact) onOpenContact();
  };

  const handleResumeClick = () => {
    playWindowSound();
    if (onOpenResume) onOpenResume();
  };

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
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '5px',
            flexWrap: 'wrap-reverse', 
            gap: '10px'
          }}>
            <h3 className="spacing-tight" style={{ margin: 0 }}>
              Computer Engineer | Developer | Artist
            </h3>
            <ViewCounter />
          </div>

          <h1 className="spacing-normal" style={{ margin: '10px 0' }}>
            &gt; Aryll Nevin Morales
          </h1>

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