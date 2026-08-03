import React, { useRef, useEffect, useState } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import closeAudio from '../assets/audio/tab_close.wav'; 
import clickSound from '../assets/audio/tab_open.wav'; /* ADDED THIS */
import contactImg from '../assets/contacts_light.png';
import telbooth from '../assets/telephone_booth.png';
import ringSound from '../assets/audio/tel-ring.mp3'; 
import telIcon from '../assets/tel-icon.png';
import emailIcon from '../assets/email-icon.png';
import clickBox from '../assets/audio/click-box.mp3';

import linkedinIcon from '../assets/linkedin-icon.png';
import githubIcon from '../assets/github-icon.png';

import hoverAudio from '../assets/audio/hover.mp3';
import clickAudio from '../assets/audio/click.wav';

export default function Contact({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  const [hasRung, setHasRung] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); /* ADDED THIS */

  useEffect(() => {
    audioRef.current = new Audio(ringSound);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasRung(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (localStorage.getItem('isGlobalMuted') !== 'true') {
      try {
        const sound = new Audio(closeAudio);
        sound.play();
      } catch (e) {
        console.log("No close sound found");
      }
    }
    
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleMaximize = () => {
      const nextMaximizedState = !isMaximized;
      setIsMaximized(nextMaximizedState);
  
      if (localStorage.getItem('isGlobalMuted') !== 'true') {
        try {
          const audioFile = nextMaximizedState ? clickSound : closeAudio;
          const audio = new Audio(audioFile);
          audio.play();
        } catch (e) {
          console.log("Audio failed to play:", e);
        }
      }
    };

  const handlePhoneHover = () => {
    if (hasRung) return; 
    
    if (localStorage.getItem('isGlobalMuted') !== 'true') {
      if (!audioRef.current) return;
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio blocked:", e));
    }
  };

const handlePhoneLeave = () => {
    if (!audioRef.current) return;
    if (!hasRung) {
      setHasRung(true); 
    }

    fadeInterval.current = setInterval(() => {
      if (audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; 
        clearInterval(fadeInterval.current);
      }
    }, 50); 
  };

  const handleLinkClick = () => {
    try {
      const sound = new Audio(clickAudio);
      sound.play();
    } catch (e) {
      console.log("Click sound failed:", e);
    }
  };

  const startX = (window.innerWidth / 2) - 500; 
  const startY = (window.innerHeight / 2) - 320;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close, .windowed"  /* FIXED THIS */
      defaultPosition={{x: startX, y: startY}}
      bounds="body"
      onMouseDown={onFocus}
      disabled={isMaximized} /* FIXED THIS */
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