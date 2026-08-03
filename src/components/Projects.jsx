import React, { useRef, useState, useEffect, useMemo } from 'react';
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 
import './style/Projects_Tabs.css';

import closeAudio from '../assets/audio/tab_close.wav'; 
import clickSound from '../assets/audio/tab_open.wav'; /* ADDED THIS */
import projectsImg from '../assets/projects_light.png';
import hoverAudio from '../assets/audio/hover.mp3';
import clickAudio from '../assets/audio/click.wav';

import technoIcon from '../assets/techno_icon.png';
import thesisPaper from '../assets/Group5A_TechnoFitness_CpEDesi2 Paper.pdf';
import engichefIcon from '../assets/engichef-icon.png';

import tec1 from '../assets/gallery/techno/tec1.jpg';
import tec2 from '../assets/gallery/techno/tec2.jpg';
import tec3 from '../assets/gallery/techno/tec3.mp4';
import tec4 from '../assets/gallery/techno/tec4.jpg';
import tec5 from '../assets/gallery/techno/tec5.jpg';
import tec6 from '../assets/gallery/techno/tec6.mp4';
import tec7 from '../assets/gallery/techno/tec7.jpg';

import eng1 from '../assets/gallery/engichef/engi1.mp4';
import eng2 from '../assets/gallery/engichef/engi2.png';
import eng9 from '../assets/gallery/engichef/engi9.png';
import eng10 from '../assets/gallery/engichef/engi10.png';

import g1 from '../assets/gallery/graphic/g1.png';
import g2 from '../assets/gallery/graphic/g2.jpg';
import g3 from '../assets/gallery/graphic/g3.jpg';
import g4 from '../assets/gallery/graphic/g4.jpg';
import g6 from '../assets/gallery/graphic/g6.jpg';
import g7 from '../assets/gallery/graphic/g7.jpg';
import g8 from '../assets/gallery/graphic/g8.jpg';
import g9 from '../assets/gallery/graphic/g9.jpg';
import g10 from '../assets/gallery/graphic/g10.jpg';
import g11 from '../assets/gallery/graphic/g11.jpg';
import g12 from '../assets/gallery/graphic/g12.jpg';
import g13 from '../assets/gallery/graphic/g13.jpg';
import g14 from '../assets/gallery/graphic/g14.jpg';
import g15 from '../assets/gallery/graphic/g15.jpg';

import podIcon from '../assets/podIcon.png';

export default function Projects({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const [activeTab, setActiveTab] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false); /* ADDED THIS */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      }
    };
    
    if (selectedMedia) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  const galleryTechno = useMemo(() => [
      { id: 1, type: 'image', src: tec1 },
      { id: 2, type: 'image', src: tec2 },
      { id: 3, type: 'video', src: tec3 },
      { id: 4, type: 'image', src: tec4 },
      { id: 5, type: 'image', src: tec5 },
      { id: 6, type: 'video', src: tec6 },
      { id: 7, type: 'image', src: tec7 }
    ], []);

  const galleryEngi = useMemo(() => [
      { id: 1, type: 'video', src: eng1 },
      { id: 2, type: 'image', src: eng2 },
      { id: 9, type: 'image', src: eng9 },
      { id: 10, type: 'image', src: eng10 }
    ], []);

  const galleryPubli = useMemo(() => [
      { id: 1, type: 'image', src: g1 },
      { id: 2, type: 'image', src: g2 },
      { id: 3, type: 'image', src: g3 },
      { id: 4, type: 'image', src: g4 },
      { id: 6, type: 'image', src: g6 },
      { id: 7, type: 'image', src: g7 },
      { id: 8, type: 'image', src: g8 },
      { id: 9, type: 'image', src: g9 },
      { id: 10, type: 'image', src: g10 },
      { id: 11, type: 'image', src: g11 },
      { id: 12, type: 'image', src: g12 },
      { id: 13, type: 'image', src: g13 },
      { id: 14, type: 'image', src: g14 },
      { id: 15, type: 'image', src: g15 }
    ], []);

  const projectsData = useMemo(() => [
    {
      id: 1,
      title: "Technical Projects",
      shortDesc: "Collection of Technical Projects",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="project-square">
            <div className="info-tab" style={{ position: 'relative' }}>
              <img 
                className="icon-style"
                src={technoIcon} 
                alt="Techno Fitness Logo" 
                style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  right: '0px', 
                  width: '100px',
                  height: 'auto',
                  objectFit: 'contain'
                }} 
              />

              <div className="project-tags">
                <span className="tag software">Software/Hardware</span>
                <span className="tag render">Thesis Project</span>
                <span className="tag award">★ 3rd Best Thesis</span>
              </div>
              
              <h1>Techno-Fitness</h1>
              <h2>Leveraging Computer Vision and Workout Assistance Coach</h2>
              
              <div className="bullet-point-row">
                <p>Techno-Fitness is a hardware-based fitness assistance system designed for beginner to intermediate calisthenics enthusiasts. It uses computer vision to provide real-time posture monitoring and feedback during home-based workouts, directly addressing the lack of personalized guidance and form correction found in most standard fitness applications.</p>
              </div>
              
              <div className="bullet-point-row">
                <p><strong>Key Features:</strong></p>
                <div className="project-tags">
                  <span className="tag capability">Mediapipe</span>
                  <span className="tag capability">OpenCV</span>
                  <span className="tag capability">Python</span>
                  <span className="tag capability">Computer Vision</span>
                  <span className="tag capability">JSON</span>
                </div>
              </div>

              <div className="button-row">
                <a href={thesisPaper} target="_blank" rel="noopener noreferrer" className="button-style">
                  View Thesis Paper&nbsp;&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>

              <div className="gallery-container">
                {galleryTechno.map((media) => (
                  media.type === 'video' ? (
                    <video 
                      key={media.id} 
                      src={media.src} 
                      className="gallery-item" 
                      muted 
                      loop 
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                      onClick={() => setSelectedMedia(media)}
                    />
                  ) : (
                    <img 
                      key={media.id} 
                      src={media.src} 
                      alt="Gallery content" 
                      className="gallery-item" 
                      onClick={() => setSelectedMedia(media)} 
                    />
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="project-square">
            <div className="info-tab" style={{ position: 'relative' }}>
              <img 
                className="icon-style"
                src={engichefIcon} 
                alt="EngiChef Logo" 
                style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  right: '0px', 
                  width: '150px',
                  height: 'auto',
                  objectFit: 'contain'
                }} 
              />
              
              <div className="project-tags">
                <span className="tag software">Software</span>
                <span className="tag render">Data Structures</span>
              </div>
              
              <h1>EngiChef</h1>
              <h2>A Data Structures based game</h2>
              
              <div className="bullet-point-row">
                <p>EngiChef is an interactive restaurant burger cooking game designed to seamlessly blend 
                  data structure concepts into a functional and engaging experience. Players take on the role of 
                  a chef tasked with crafting customized burgers to meet specific customer preferences within a 
                  fast-paced, 5-minute shift. The game features time-sensitive challenges where customers have 
                  individual patience timers, requiring players to balance speed and accuracy to earn points 
                  and prevent customers from leaving.</p>
              </div>

              <div className="bullet-point-row">
                <p><strong>Key Features:</strong></p>
                <div className="project-tags">
                  <span className="tag capability">Data structures</span>
                  <span className="tag capability">Java</span>
                  <span className="tag capability">Queue</span>
                  <span className="tag capability">Stack</span>
                  <span className="tag capability">Linked Lists</span>
                  <span className="tag capability">Arrays</span>
                  <span className="tag capability">Sorting Algorithms</span>
                  <span className="tag capability">Game</span>
                </div>
              </div>

              <div className="button-row">
                <a href='https://drive.google.com/file/d/1CDSSrWj1iYRm955BIvHIGM3z3JzULOey/view?usp=sharing' target="_blank" rel="noopener noreferrer" className="button-style">
                  Download Game (Must have Java)&nbsp;&nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>

              <div className="gallery-container">
                {galleryEngi.map((media) => (
                  media.type === 'video' ? (
                    <video 
                      key={media.id} 
                      src={media.src} 
                      className="gallery-item" 
                      muted 
                      loop 
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                      onClick={() => setSelectedMedia(media)}
                    />
                  ) : (
                    <img 
                      key={media.id} 
                      src={media.src} 
                      alt="Gallery content" 
                      className="gallery-item" 
                      onClick={() => setSelectedMedia(media)} 
                    />
                  )
                ))}
              </div>

            </div>
          </div>

        </div>
      )
    },
    {
      id: 2,
      title: "Visual Projects",
      shortDesc: "Collection of Video Projects",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="project-square">
            <div className="info-tab" style={{ position: 'relative' }}>

              <img 
                className="icon-style"
                src={podIcon} 
                alt="Podcast Logo" 
                style={{ 
                  position: 'absolute', 
                  top: '0px', 
                  right: '0px', 
                  width: '200px',
                  height: 'auto',
                  objectFit: 'contain'
                }} 
              />

              <div className="project-tags">
                <span className="tag render">Video Production</span>
                <span className="tag capability">Podcast</span>
              </div>
              
              <h1>The LaSallian Life Podcast</h1>
              <h2>Volumes 1 and 2</h2>
              
              <div className="bullet-point-row">
                <p>A video podcast full of entertaining and engaging graphics and animations that 
                  talks about relationships, life, experiences, and challenges. It aims to create 
                  an engaging video where real stories and authentic conversations can flourish 
                  sparking reflection, connection, and meaningful dialogue among viewers. 
                  By blending humor, creativity, and honest perspectives, the podcast seeks to 
                  resonate with audiences making topics feel more relatable. It would feature 
                  several hosts and guests to share their life experiences and wisdom about the 
                  mentioned topics.</p>
              </div>

              <br/>
              <iframe 
                src="https://www.youtube.com/embed/AxNCourGJcU?si=EQS9gkSJb0mIzKvW" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>

              <br/><br/>
              <iframe 
                src="https://www.youtube.com/embed/RwuwbTz4BSw?si=WAu7OzwaTkdHqPn1" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>

            </div>
          </div>

          <div className="project-square"> 
            <div className="project-tags">
              <span className="tag render">Video Production</span>
              <span className="tag capability">Short Film</span>
            </div>

            <h1>Lahat ng Kwento</h1>
            <h2>Leaders' Week - Short Film Entry</h2>
            <div className="bullet-point-row">
              <p>Short Film entry for the Leaders' Week 2026. This short film explores
                the consequences of cyberbullying. More particularly, not knowing
                the reason behind a story but only a fragment of it. 
              </p>
            </div>

            <br/>
            <iframe 
                src="https://www.youtube.com/embed/v9nih_XTc6Y?si=8nhpruFd1tFYu4n3" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
            </iframe>
          </div>

          <div className="project-square"> 
            <div className="project-tags">
              <span className="tag render">Video Production</span>
              <span className="tag capability">Advocacy</span>
              <span className="tag award">★ Best Advocacy Video</span>
            </div>

            <h1>CITE Advocacy Video</h1>
            <div className="bullet-point-row">
              <p>Winner of the Best Advocacy during the 2023 Lasallian Cup. This advocacy focuses on celebrating the "brilliance" of students 
                by recognizing the passion and skill within their academic endeavors beyond 
                traditional grades.
              </p>
            </div>

            <br/>
            <iframe 
                src="https://www.youtube.com/embed/ZS_g6hKUw3Q?si=TyNjPcHHQs3rCrHU" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
            </iframe>
          </div>

          <div className="project-square"> 
            <div className="project-tags">
                <span className="tag render">Video Production</span>
                <span className="tag capability">Promotional Video</span>
              </div>
              
              <h1>CpE Career Ladder</h1>
              
              <div className="bullet-point-row">
                <p>Inspired by Career Ladder by Max Klymenko, CpE Career Ladder captures the journey of climbing toward our 
                  future professions after graduating from Computer Engineering. It featured three episodes exploring how diverse the possible career paths are in computer engineering.</p>
              </div>

              <br/>
              <iframe 
                src="https://www.youtube.com/embed/v4BLpPYCvTA?si=BY6oPMBhs861KRT-" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>

              <br/><br/>
              <iframe 
                src="https://www.youtube.com/embed/o_1yhs5t26o?si=KuqRo6FbyNmC_tBk" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>

              <br/><br/>
              <iframe 
                src="https://www.youtube.com/embed/ZFbeQmGDgtI?si=pkxGenuQNUZwL3IV" 
                style={{ 
                  width: '100%', 
                  aspectRatio: '16 / 9', 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '8px' 
                }} 
                scrolling="no" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
          </div>

        </div>
      )
    },
    {
      id: 3,
      title: "Publications",
      shortDesc: "Gallery of Graphic Designs",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="project-square">
            <div className="info-tab" style={{ position: 'relative' }}>
              
              <h1>Gallery</h1>   

              <div className="gallery-container">
                {galleryPubli.map((media) => (
                  media.type === 'video' ? (
                    <video 
                      key={media.id} 
                      src={media.src} 
                      className="gallery-item" 
                      muted 
                      loop 
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                      onClick={() => setSelectedMedia(media)}
                    />
                  ) : (
                    <img 
                      key={media.id} 
                      src={media.src} 
                      alt="Gallery content" 
                      className="gallery-item" 
                      onClick={() => setSelectedMedia(media)} 
                    />
                  )
                ))}
              </div> 

            </div>
          </div>

        </div>
      )
    }
  ], [galleryTechno, galleryEngi, galleryPubli]);

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

  /* ADDED MAXIMIZE FUNCTION */
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

  const handleLinkClick = (id) => {
    if (localStorage.getItem('isGlobalMuted') !== 'true') {
      try {
        const sound = new Audio(clickAudio);
        sound.play();
      } catch (e) {
        console.log("Click sound failed:", e);
      }
    }

    setActiveTab(id);
  };

  const currentProject = projectsData.find(proj => proj.id === activeTab);

  const startX = (window.innerWidth / 2) - 500; 
  const startY = (window.innerHeight / 2) - 320;

  return (
    <>
      <Draggable 
        nodeRef={nodeRef} 
        handle=".title-bar" 
        cancel=".close, .windowed" /* FIXED THIS */
        defaultPosition={{x: startX, y: startY}}
        bounds="body"
        onMouseDown={onFocus}
        disabled={isMaximized} /* FIXED THIS */
      >
        <div 
          ref={nodeRef} 
          className={`tab-window ${isMaximized ? 'maximized' : ''}`} /* FIXED THIS */
          style={{ position: 'absolute', top: 0, left: 0, zIndex: zIndex }} 
        >
          <div className="window-entrance" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="title-bar">
              <div className="side-by-side">
                <img className='icon-topbar' src={projectsImg} alt="Projects" />
                <span className="title">Projects</span>
              </div>
              <div className="window-controls">
                
                {/* FIXED THIS: Added Maximize Button */}
                <button 
                  className="btn windowed" 
                  onClick={handleMaximize}>
                  {isMaximized ? '[ ▭ ]' : '[ ❐ ]'}
                </button>

                <button className="btn close" onClick={handleClose}>[ x ]</button>
              </div>
            </div>

            <div className="window-content">
              <div className="content-row">
                {projectsData.map((project) => (
                  <button 
                    key={project.id}
                    className={`button-tab ${activeTab === project.id ? 'active' : ''}`}
                    onClick={() => handleLinkClick(project.id)}>
                    <div className="columnContent">
                      <h2>{project.title}</h2>
                      <p>{project.shortDesc}</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <hr />

              <div className="mini-page-content" key={activeTab}>
                {currentProject.content}
              </div>
            </div>
          </div>
        </div>
      </Draggable>

      {selectedMedia && (
        <div className="lightbox-overlay" onClick={() => setSelectedMedia(null)}>
          <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} className="lightbox-media" controls autoPlay />
            ) : (
              <img src={selectedMedia.src} alt="Enlarged gallery view" className="lightbox-media" />
            )}
          </div>
        </div>
      )}
    </>
  );
}