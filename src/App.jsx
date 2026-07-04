import React, { useState } from 'react';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    contact: false,
  });

  const openWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: true }));
  };

  const closeWindow = (windowName) => {
    setOpenWindows(prev => ({ ...prev, [windowName]: false }));
  };

  return (
    <div className="desktop-environment">
      
<Window 
        onOpenAbout={() => openWindow('about')}
        onOpenProjects={() => openWindow('projects')}
        onOpenContact={() => openWindow('contact')}
      />

      {/* 2. Render all of your individual tabs! */}
      <About 
        isOpen={openWindows.about} 
        onClose={() => closeWindow('about')} 
      />

      <Projects 
        isOpen={openWindows.projects} 
        onClose={() => closeWindow('projects')} 
      />

      <Contact 
        isOpen={openWindows.contact} 
        onClose={() => closeWindow('contact')} 
      />

      <Taskbar />
    </div>
  );
}

export default App;