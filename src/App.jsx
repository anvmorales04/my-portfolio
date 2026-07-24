import React, { useState, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Linkedin from './components/Linkedin';
import ViewCounter from './ViewCounter';
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

  return (
    <div className="desktop-environment">
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

      <ViewCounter />

      <Taskbar 
        onHomeClick={() => setIsHomeOpen(!isHomeOpen)} 
        onLinkedInClick={() => openWindow('linkedin')} 
        zIndex={zIndices.home}             
        onFocus={() => bringToFront('home')} 
        isHomeOpen={isHomeOpen}
      />
    </div>
  );
}

export default App;