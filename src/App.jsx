import React, { useState, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Linkedin from './components/Linkedin';
import DotField from './components/DotField'; 
import './App.css';

function App() {
  const [isHomeOpen, setIsHomeOpen] = useState(true);

  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    contact: false,
    linkedin: true, 
  });

  const [zIndices, setZIndices] = useState({
    home: 11,    
    about: 10,
    projects: 10,
    contact: 10,
    linkedin: 10,   
  });

  const [topZ, setTopZ] = useState(11);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 850) {
      setShowMobileWarning(true);
    }
  }, []);

  const bringToFront = (windowName) => {
    const newZ = topZ + 1;
    setZIndices(prev => ({ ...prev, [windowName]: newZ }));
    setTopZ(newZ);
  };

  const openWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: true }));
    bringToFront(windowName);
  };

  const closeWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: false }));
  };

  const closeAllWindows = () => {
    setOpenWindows({
      about: false,
      projects: false,
      contact: false,
      linkedin: false,
    });
  };

const handleHomeTaskbarClick = () => {
    if (window.innerWidth <= 850) {
      setIsHomeOpen(true);
      bringToFront('home');
    } else {
      if (isHomeOpen) {
        if (zIndices.home === topZ) {
          setIsHomeOpen(false);
        } else {
          bringToFront('home'); 
        }
      } else {
        setIsHomeOpen(true);
        bringToFront('home');
      }
    }
  };

  const handleLinkedinTaskbarClick = () => {
    if (window.innerWidth <= 850) {
      setOpenWindows(prev => ({ ...prev, linkedin: true }));
      bringToFront('linkedin');
    } else {
      if (openWindows.linkedin) {
        if (zIndices.linkedin === topZ) {
          setOpenWindows(prev => ({ ...prev, linkedin: false }));
        } else {
          bringToFront('linkedin'); 
        }
      } else {
        setOpenWindows(prev => ({ ...prev, linkedin: true }));
        bringToFront('linkedin');
      }
    }
  };

  return (
    <div className="desktop-environment">
      
      <DotField
        dotRadius={2}
        dotSpacing={16}
        bulgeStrength={60}
        glowRadius={250}
        sparkle={true} 
        waveAmplitude={0}
        gradientFrom="#77685D"
        gradientTo="#483D3F" 
        glowColor="rgba(244, 235, 217, 0.15)" 
      />

      {showMobileWarning && (
        <div className="mobile-warning-overlay">
          <div className="mobile-warning-modal">
            <div className="title-bar">
              <span>System Notice</span>
              <button className="close" onClick={() => setShowMobileWarning(false)}>X</button>
            </div>
            <div className="warning-content">
              <p>For the best experience, try opening the website in a desktop (PC).</p>
              <button onClick={() => setShowMobileWarning(false)}>Continue Anyway</button>
            </div>
          </div>
        </div>
      )}

      <Window 
        isOpen={isHomeOpen} 
        onClose={() => setIsHomeOpen(false)}
        onOpenAbout={() => openWindow('about')}     
        onOpenProjects={() => openWindow('projects')}
        onOpenContact={() => openWindow('contact')}  
        zIndex={zIndices.home}             
        onFocus={() => bringToFront('home')} 
      />

      <About 
        isOpen={openWindows.about} 
        onClose={() => closeWindow('about')} 
        zIndex={zIndices.about}
        onFocus={() => bringToFront('about')}
      />

      <Projects 
        isOpen={openWindows.projects} 
        onClose={() => closeWindow('projects')} 
        zIndex={zIndices.projects}
        onFocus={() => bringToFront('projects')}
      />

      <Contact 
        isOpen={openWindows.contact} 
        onClose={() => closeWindow('contact')}
        zIndex={zIndices.contact}
        onFocus={() => bringToFront('contact')}
      />

      <Linkedin 
        isOpen={openWindows.linkedin} 
        onClose={() => closeWindow('linkedin')}
        zIndex={zIndices.linkedin}
        onFocus={() => bringToFront('linkedin')}
      />

      <Taskbar 
        onHomeClick={handleHomeTaskbarClick} 
        onLinkedInClick={handleLinkedinTaskbarClick} 
        zIndex={zIndices.home}                    
        onFocus={() => bringToFront('home')} 
        isHomeOpen={isHomeOpen}
      />
    </div>
  );
}

export default App;