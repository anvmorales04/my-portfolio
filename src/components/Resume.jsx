import React, { useRef, useEffect, useState } from 'react'; 
import Draggable from 'react-draggable';

import './style/Tab_Window.css'; 
import './style/Resume.css'; // <-- Import the new CSS

import { playSound } from '../utils/audio';

// Icons used in content
import resumeIcon from '../assets/resume-icon.png'; 
import qaIcon from '../assets/qa-icon.png';
import sdIcon from '../assets/sd-icon.png';
import fdIcon from '../assets/fd-icon.png';
import dbIcon from '../assets/db-icon.png';
import resIcon from '../assets/resIcon.png';

import defaultResumePdf from '../assets/documents/Aryll-Nevin-Morales_Resume.pdf'; 
import databaseResumePdf from '../assets/documents/Morales, Aryll Nevin_DB-Resume.pdf';
import frontendResumePdf from '../assets/documents/Morales, Aryll Nevin_FD-Resume.pdf';
import softwareResumePdf from '../assets/documents/Morales, Aryll Nevin_SD-Resume.pdf';


export default function Resume({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const [isMaximized, setIsMaximized] = useState(false); 
  const [selectedResume, setSelectedResume] = useState(null);

  // Resume options data
  const resumeOptions = [
    { id: 'general', title: 'General Resume', icon: resIcon, pdfUrl: defaultResumePdf },
    { id: 'frontend', title: 'Frontend and UI/UX Resume', icon: fdIcon, pdfUrl: frontendResumePdf },
    { id: 'software', title: 'Software Developer Resume', icon: sdIcon, pdfUrl: softwareResumePdf }, 
    { id: 'database', title: 'Database Resume', icon: dbIcon, pdfUrl: databaseResumePdf },     
    { id: 'qa', title: 'Quality Assurance Resume', icon: qaIcon, pdfUrl: defaultResumePdf }   
  ];

  useEffect(() => {
    if (!isOpen) {
      setSelectedResume(null);
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

  const handleSelect = (id) => {
    setSelectedResume(id);
    playSound('linkClick');
  };

  const handleConfirm = () => {
    if (selectedResume) {
      playSound('windowOpen');
      const selectedOption = resumeOptions.find(opt => opt.id === selectedResume);
      window.open(selectedOption.pdfUrl, '_blank');
    }
  };

  const startX = (window.innerWidth / 2) - 500; 
  const startY = (window.innerHeight / 2) - 320;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close, .windowed, .resume-option-btn, .confirm-btn" 
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
        <div className="title-bar">
          <div className="side-by-side">
            <img className='icon-topbar' src={resumeIcon} alt="Resume" />
            <span className="title">Resume Selection</span>
          </div>
          
          <div className="window-controls">
            <button className="btn windowed" onClick={handleMaximize}>
              {isMaximized ? '[ ▭ ]' : '[ ❐ ]'}
            </button>
            <button className="btn close" onClick={handleClose}>
              [ x ]
            </button>
          </div>
        </div>

        <div className="window-body resume-body">
          
          <h2 className="resume-header-title">
            Resume Selection
          </h2>

          <div className="resume-selection-container">
            {resumeOptions.map((opt) => (
              <button
                key={opt.id}
                // Append 'selected' class dynamically
                className={`btn resume-option-btn ${selectedResume === opt.id ? 'selected' : ''}`}
                onClick={() => handleSelect(opt.id)}
              >
                <div className="resume-icon-wrapper">
                  <img src={opt.icon} alt={opt.title} className="resume-icon-img" />
                </div>
                <span className="resume-title">{opt.title}</span>
              </button>
            ))}
          </div>

          <div className="confirm-container">
            <button 
              className="btn confirm-btn"
              onClick={handleConfirm}
              disabled={!selectedResume}
            >
              Confirm
            </button>
          </div>

        </div>
      </div>
    </Draggable>
  );
}