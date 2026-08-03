import React, { useState, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Linkedin from './components/Linkedin';
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

  // --- HOME TASKBAR CLICK HANDLER ---
  const handleHomeTaskbarClick = () => {
    if (window.innerWidth <= 850) {
      // MOBILE: Open and bring to front. If already open, do nothing.
      setIsHomeOpen(true);
      bringToFront('home');
    } else {
      // DESKTOP: Toggle open/close (close if open, open & bring to front if closed)
      if (isHomeOpen) {
        setIsHomeOpen(false);
      } else {
        setIsHomeOpen(true);
        bringToFront('home');
      }
    }
  };


  const handleLinkedinTaskbarClick = () => {
    if (window.innerWidth <= 850) {
      // Mobile view: Open and bring to front without closing on repeat taps
      setOpenWindows(prev => ({ ...prev, linkedin: true }));
      bringToFront('linkedin');
    } else {
      // Desktop view: Toggle open/close
      if (openWindows.linkedin) {
        setOpenWindows(prev => ({ ...prev, linkedin: false }));
      } else {
        setOpenWindows(prev => ({ ...prev, linkedin: true }));
        bringToFront('linkedin');
      }
    }
  };

  return (
    <div className="desktop-environment">
      
      {/* MOBILE WARNING POP-UP */}
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

      {/* Placed first in the DOM & given a lower z-index so it loads in the background */}
      <Linkedin 
        isOpen={openWindows.linkedin} 
        onClose={() => closeWindow('linkedin')}
        zIndex={zIndices.linkedin}
        onFocus={() => bringToFront('linkedin')}
      />

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