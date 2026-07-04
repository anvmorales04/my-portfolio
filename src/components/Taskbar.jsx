import React, { useState, useEffect } from 'react';
import './style/Taskbar.css';
import clickSound from '../assets/audio/tab_open.wav';


export default function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Format the date (MM/DD/YYYY)
  const formattedDate = currentTime.toLocaleDateString([], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className="taskbar">
      <button className="start-button" onClick={playSound}>
        ⊞ Home
      </button>
      <div className="system-tray">
        <span className="time">{formattedTime}</span>
        <span className="date">{formattedDate}</span>
        <span className="small-text">© 2026 Aryll Nevin Morales</span>
      </div>
    </div>
  );
}