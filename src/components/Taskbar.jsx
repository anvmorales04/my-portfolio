import React, { useState, useEffect } from 'react';
import './style/Taskbar.css';
import audioOFF from '../assets/OFF_audio.png';
import audioON from '../assets/ON_audio.png';
import linkedIn from '../assets/linkedin_tb.png';
import { playSound, setGlobalMuteState, getGlobalMuteState } from '../utils/audio';

export default function Taskbar({ onHomeClick, onLinkedInClick, isHomeOpen }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isShaking, setIsShaking] = useState(false);
  const [isMuted, setIsMuted] = useState(() => getGlobalMuteState());

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
    const soundName = newMutedState ? 'muteOff' : 'muteOn';

    setIsMuted(newMutedState);
    setGlobalMuteState(newMutedState);
    playSound(soundName, { ignoreMute: true });

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300); 
  };

  const handleHomeClick = () => {
    if (!isMuted) {
      playSound('buttonClick');
    }
    
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleLinkedInClick = () => {
    if (!isMuted) {
      playSound('buttonClick');
    }
    
    if (onLinkedInClick) {
      onLinkedInClick();
    }
  };

  return (
    <div className="taskbar">
      
      <div className="taskbar-left">
        <button className="start-button" onClick={handleHomeClick}>
          ⊞ <span className="home-text">Home</span>
        </button>
        
        <button className="mute-button linkedin-button" onClick={handleLinkedInClick} title="LinkedIn">
          <img 
            src={linkedIn} 
            alt="LinkedIn" 
            className="mute-icon"
          />
        </button>

        <button 
            className={`mute-button audio-button ${isShaking ? 'shake' : ''}`} 
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