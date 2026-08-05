import React, { useRef, useEffect, useState } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import { playSound } from '../utils/audio';
import contactImg from '../assets/contacts_light.png';
import telbooth from '../assets/telephone_booth.png';
import telIcon from '../assets/tel-icon.png';
import emailIcon from '../assets/email-icon.png';

import linkedinIcon from '../assets/linkedin-icon.png';
import githubIcon from '../assets/github-icon.png';

export default function Contact({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);
  const shakeDurationMs = 2400;

  const [hasRung, setHasRung] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); /* ADDED THIS */

  useEffect(() => {
    return () => {
      if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasRung(false);

      if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = null;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    playSound('windowClose');
    
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleMaximize = () => {
      const nextMaximizedState = !isMaximized;
      setIsMaximized(nextMaximizedState);
  
      playSound(nextMaximizedState ? 'windowOpen' : 'windowClose');
    };

  const handlePhoneHover = () => {
    if (hasRung) return;

    setHasRung(true);

    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
      fadeInterval.current = null;
    }

    const audio = playSound('telephoneRing', {
      volume: 0.25,
      playbackRate: 0.65,
      ignoreMute: true,
    });
    audioRef.current = audio;
  };

  const handlePhoneLeave = () => {
    if (!audioRef.current) return;

    const fadeSteps = 24;
    const fadeStepMs = Math.round(shakeDurationMs / fadeSteps);
    const volumeStep = audioRef.current.volume / fadeSteps;
    let step = 0;

    if (fadeInterval.current) {
      clearInterval(fadeInterval.current);
    }

    fadeInterval.current = setInterval(() => {
      step += 1;
      const nextVolume = Math.max(0, audioRef.current.volume - volumeStep);
      if (audioRef.current) {
        audioRef.current.volume = nextVolume;
      }

      if (step >= fadeSteps || nextVolume <= 0.01) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        audioRef.current = null;
        clearInterval(fadeInterval.current);
        fadeInterval.current = null;
      }
    }, fadeStepMs);
  };

  const handleLinkClick = () => {
    playSound('linkClick');
  };

  const startX = (window.innerWidth / 2) - 500; 
  const startY = (window.innerHeight / 2) - 320;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close, .windowed" 
      defaultPosition={{x: startX, y: startY}}
      bounds="body"
      onMouseDown={onFocus}
      disabled={isMaximized} 
    >
      <div 
        ref={nodeRef} 
        className={`tab-window ${isMaximized ? 'maximized' : ''}`} 
        style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex }} 
      >
          
          <div className="window-entrance" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
          <div className="title-bar">
            <div className="side-by-side">
                <img className='icon-topbar' src={contactImg} alt="Contact" />
                <span className="title">Contact</span>
              </div>
              
              <div className="window-controls">

                <button 
                  className="btn windowed" 
                  onClick={handleMaximize}>
                  {isMaximized ? '[ ▭ ]' : '[ ❐ ]'}
                </button>


                <button 
                  className="btn close" 
                  onClick={handleClose}>
                  [ x ]
                </button>
              </div>

          </div>

          <div className="window-content">
            <div className="content-row">
              <img 
                className={`telephone-booth ${hasRung ? 'has-rung' : ''}`} 
                src={telbooth} 
                alt="Telephone booth" 
                onMouseEnter={handlePhoneHover}
                onMouseLeave={handlePhoneLeave}
              />

              <div className="info-content contact">
                <h2>Contact</h2>
                <p>You may contact me through these channels.</p>

                

                <div className="contact-links-container"> 
                  <a 
                    href="mailto:aryll.nevin.morales@gmail.com" 
                    className="contact-card clickable-link"
                    onClick={handleLinkClick}
                  >
                    <img className="contact-icon" src={emailIcon} alt="Email" />
                    <h2>Email</h2>
                    <p>aryll.nevin.morales@gmail.com</p>
                  </a>

                  <a 
                    href="https://github.com/anvmorales04" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-card clickable-link"
                    onClick={handleLinkClick}
                  >
                    <img className="contact-icon" src={githubIcon} alt="GitHub" />
                    <h2>GitHub</h2>
                    <p>github.com/anvmorales04</p>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/aryll-nevin-morales-55b360323/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-card clickable-link"
                    onClick={handleLinkClick}
                  >
                    <img className="contact-icon" src={linkedinIcon} alt="LinkedIn" />
                    <h2>LinkedIn</h2>
                    <p>linkedin.com/in/aryll-nevin-morales-55b360323</p>
                  </a>
                  
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}