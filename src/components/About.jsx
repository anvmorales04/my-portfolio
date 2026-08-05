import React, { useRef, useState } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import { playSound } from '../utils/audio';

import aboutImg from '../assets/about_light.png';
import myProfilePic from '../assets/prof-pic.jpg';
import skill1 from '../assets/skill-1.png';
import skill2 from '../assets/skill-2.png';
import skill3 from '../assets/skill-3.png';
import skill4 from '../assets/skill-4.png';
import skill5 from '../assets/skill-5.png';
import skill6 from '../assets/skill-6.png';

export default function About({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    playSound('windowClose');
    setTimeout(() => {
      onClose();
    }, 100);
  };
  

  const handleBoxClick = () => {
    playSound('boxClick');
  };

const handleMaximize = () => {
    const nextMaximizedState = !isMaximized;
    setIsMaximized(nextMaximizedState);

    playSound(nextMaximizedState ? 'windowOpen' : 'windowClose');
  };

  const startX = (window.innerWidth / 2) - 500; 
  const startY = (window.innerHeight / 2) - 320;
  
  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close, .windowed" 
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
          
          <div className="window-entrance" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <div className="title-bar">
              <div className="side-by-side">
                <img className='icon-topbar' src={aboutImg} alt="About" />
                <span className="title">About Me</span>
              </div>
              
              <div className="window-controls">

                <button 
                  className="btn windowed" 
                  onClick={handleMaximize}>
                  {isMaximized ? '[ ▭ ]' : '[ ❐ ]'}
                </button>


                <button 
                  className="btn close" 
                  onClick={handleClose}>
                  [ x ]
                </button>
              </div>
            </div>

            <div className="window-content-tab">
              <div className="profile-header">
                <img src={myProfilePic} alt="Aryll Nevin Morales" className="profile-avatar" />
                
                <div className="profile-info">
                  <h4>Computer Engineer | Developer | Artist</h4>
                  <h1><strong>Aryll Nevin Morales</strong></h1>
                  
                  <p>aryll.nevin.morales@gmail.com</p>
                </div>
              </div>

              <div className="info-content">
                <h2>Brief Description</h2>
                
                <div className="content-square" onClick={handleBoxClick}>
                 <p>Computer Engineering graduate from De La Salle Lipa. I build and create things, 
                 bringing highly unique, out-of-the-box ideas to life. Experienced in engineering 
                 responsive applications, eye-catching designs, developing data structures, managing databases, 
                 integrating AI computer vision models, and driving a 300% increase in team production output.</p>
                </div>
                
                <br />

                <div className="content-row" style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                  
                  <div className="summary-box">
                    <h3>3+</h3>
                    <p>Projects</p>
                  </div>

                  <div className="summary-box">
                    <h3>3</h3>
                    <p>Leadership Roles</p>
                  </div>

                  <div className="summary-box">
                    <h3>10+</h3>
                    <p>Skills</p>
                  </div>

                  <div className="summary-box">
                    <h3>2</h3>
                    <p>Awards</p>
                  </div>

                </div>
            




                <br />

                <h2>Professional Experience</h2>
                <div className="content-square" onClick={handleBoxClick}>
                  <div className="space-between-header">
                      <div>
                        <h2>Junior App Developer</h2>
                        <h3>Internship - LikhaInternet Inc.</h3>
                      </div>

                      <div className="right-side-content">
                        <p>June 2025 - July 2025</p> 
                      </div>
                    </div>

                  <div className="bullet-point-row">
                      <div className="bullet-points">&gt;</div>
                      <p><strong>Full-Stack Development & Deployment:</strong> Engineered two comprehensive cooperative-management 
                        applications from the ground up using FlutterFlow and Supabase, successfully deploying critical 
                        production features including an e-commerce cart, real-time chat, and secure user accounts.</p>
                    </div>
                  
                  <div className="bullet-point-row">
                      <div className="bullet-points">&gt;</div>
                      <p><strong>UI/UX Optimization:</strong> Optimized application interfaces by 
                      implementing responsive design principles, delivering a highly intuitive user experience that 
                      minimized navigational friction for cooperative members.</p>
                    </div>

                  <div className="bullet-point-row">
                      <div className="bullet-points">&gt;</div>
                      <p><strong>Backend Architecture:</strong> Streamlined the monitoring and management of 
                      employees and cooperative members by structuring efficient backend databases and SQL queries. </p>
                    </div>
                </div>
                <br />

                <h2>Skills</h2>
                <div className="content-square">
                  
                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill1} alt=">" />
                    </div>
                    <p><strong>UI/UX Development</strong> <br />
                    Creating responsive, user-friendly and eye-catching user interfaces and experiences for easy and efficient use.</p>
                  </div>

                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill2} alt=">" />
                    </div>
                    <p><strong>Data Structures & Algorithms</strong> <br />
                    Engineering optimized core mechanics and data queries by implementing different areas of data structures and algorithms.</p>
                  </div>

                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill3} alt=">" />
                    </div>
                    <p><strong>Database Architecture & Management</strong> <br />
                    Streamlining data monitoring and system management by structuring efficient backend databases and writing robust SQL queries.</p>
                  </div>

                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill4} alt=">" />
                    </div>
                    <p><strong>Graphic & Publication Design</strong> <br />
                    Applying foundational design principles to rapidly conceptualize cohesive, high-quality visual themes and promotional assets.</p>
                  </div>

                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill5} alt=">" />
                    </div>
                    <p><strong>Media, Audio, & Video Production</strong> <br />
                    Authoring and directing video content, scaling production output to establish a recognizable brand identity.</p>
                  </div>

                  <div className="bullet-point-row" onClick={handleBoxClick}>
                    <div className="bullet-points">
                      <img className="icon-pic" src={skill6} alt=">" />
                    </div>
                    <p><strong>Team Management & Leadership</strong> <br />
                    Mentoring creative teams and spearheading end-to-end technical event operations to elevate visual branding and drive organizational productivity.</p>
                  </div>

                </div>
              </div>
            </div>

          </div> 
        </div>
    </Draggable>
  );
}