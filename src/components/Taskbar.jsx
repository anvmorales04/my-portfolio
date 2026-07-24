import React, { useState, useEffect } from 'react';
import './style/Taskbar.css';
import clickSound from '../assets/audio/tab_open.wav';
import closeSound from '../assets/audio/tab_close.wav'; // ADDED: Import close sound
import audioOFF from '../assets/OFF_audio.png';
import audioON from '../assets/ON_audio.png';
import audio_ON from '../assets/audio/ON-audio.mp3';
import audio_OFF from '../assets/audio/OFF-audio.mp3';
import linkedIn from '../assets/linkedin_tb.png';

// ADDED: isHomeOpen to the props list
export default function Taskbar({ onHomeClick, onLinkedInClick, isHomeOpen }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [isShaking, setIsShaking] = useState(false);
  
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('isGlobalMuted') === 'true';
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: 'numeric', 
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem('isGlobalMuted', newMutedState);
    
    try {
      const soundFile = newMutedState ? audio_OFF : audio_ON;
      const audio = new Audio(soundFile);
      audio.play();
    } catch(e) {
      console.log("Audio failed", e);
    }

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300); 
  };

  const handleHomeClick = () => {
    if (!isMuted) {
      try {
        // UPDATED: Choose the sound based on whether the window is currently open
        const soundToPlay = isHomeOpen ? closeSound : clickSound;
        const audio = new Audio(soundToPlay);
        audio.play();
      } catch(e) {
        console.log("Audio failed", e);
      }
    }
    
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleLinkedInClick = () => {
    if (!isMuted) {
      try {
        const audio = new Audio(clickSound);
        audio.play();
      } catch(e) {
        console.log("Audio failed", e);
      }
    }
    
    if (onLinkedInClick) {
      onLinkedInClick();
    }
  };

  return (
    <div className="taskbar">
      
      <div className="taskbar-left">
        <button className="start-button" onClick={handleHomeClick}>
          ⊞ Home
        </button>
        
        <button className="mute-button" onClick={handleLinkedInClick} title="LinkedIn">
          <img 
            src={linkedIn} 
            alt="LinkedIn" 
            className="mute-icon" 
          />
        </button>

        <button 
            className={`mute-button ${isShaking ? 'shake' : ''}`} 
            onClick={handleToggleMute} 
            title={isMuted ? "Unmute" : "Mute"}
          >
          <img 
            src={isMuted ? audioOFF : audioON} 
            alt={isMuted ? "Audio Off" : "Audio On"} 
            className="mute-icon" 
          />
        </button>
      </div>

      <div className="system-tray">
        <span className="time">{formattedTime}</span>
        <span className="date">{formattedDate}</span>
        <span className="small-text">Inspired by shar | © 2026 Aryll Nevin Morales</span>
      </div>
    </div>
  );
}