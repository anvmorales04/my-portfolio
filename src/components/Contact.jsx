import React, { useRef, useEffect, useState } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import closeAudio from '../assets/audio/tab_close.wav'; 
import contactImg from '../assets/contacts_light.png';
import telbooth from '../assets/telephone_booth.png';
import ringSound from '../assets/audio/tel-ring.mp3'; 
import telIcon from '../assets/tel-icon.png';
import emailIcon from '../assets/email-icon.png';

import linkedinIcon from '../assets/linkedin-icon.png';
import githubIcon from '../assets/github-icon.png';

import hoverAudio from '../assets/audio/hover.mp3';
import clickAudio from '../assets/audio/click.wav';

export default function Contact({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const audioRef = useRef(null);
  const fadeInterval = useRef(null);

  const [hasRung, setHasRung] = useState(false);

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
      if (audioRef.current.volume > 0.1) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; 
        clearInterval(fadeInterval.current);
      }
    }, 100); 
  };

  const handleLinkClick = () => {
    try {
      const sound = new Audio(clickAudio);
      sound.play();
    } catch (e) {
      console.log("Click sound failed:", e);
    }
  };

  const startX = (window.innerWidth / 2) - 400; 
  const startY = (window.innerHeight / 2) - 300;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close" 
      defaultPosition={{x: startX, y: startY}}
      bounds="body"
      onMouseDown={onFocus}
    >
      <div 
        ref={nodeRef} 
        className="tab-window"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex }} 
      >
        <div className="window-entrance" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="title-bar">
            <div className="side-by-side">
                <img className='icon-topbar' src={contactImg} alt="Contact" />
                <span className="title">Contact</span>
              </div>
              <div className="window-controls">
                <button className="btn close" onClick={handleClose}>[ x ]</button>
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

              <div className="info-content">
                <h2>Contact Me</h2>
                <p>You may contact me through these channels.</p>

                <div className="bullet-point-row">
                  <img className="bullet-point" src={emailIcon} alt="Email" />
                  <div className="text-box"> 
                    <p>aryll.nevin.morales@gmail.com</p>
                  </div>
                </div>
                <hr />

                <h2>Links</h2>
                <div className="content-row"> 
                  
                  {/* GitHub Link */}
                  <a 
                    href="https://github.com/anvmorales04" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="columnContent clickable-link"
                    onClick={handleLinkClick}
                  >
                    <img className="image-container" src={githubIcon} alt="GitHub" />
                    <h2>Github</h2>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/aryll-nevin-morales-55b360323/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="columnContent clickable-link"
                    onClick={handleLinkClick}
                  >
                    <img className="image-container" src={linkedinIcon} alt="LinkedIn" />
                    <h2>LinkedIn</h2>
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