import React, { useRef } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import closeAudio from '../assets/audio/tab_close.wav'; 
import clickBox from '../assets/audio/click-box.mp3';

import aboutImg from '../assets/about_light.png';
import myProfilePic from '../assets/prof-pic.jpg';
import skill1 from '../assets/skill-1.png';
import skill2 from '../assets/skill-2.png';
import skill3 from '../assets/skill-3.png';
import skill4 from '../assets/skill-4.png';
import skill5 from '../assets/skill-5.png';
import skill6 from '../assets/skill-6.png';

export default function About({ isOpen, onClose }) {
  const nodeRef = useRef(null); 

  if (!isOpen) return null;

  const handleClose = () => {
    try {
      const sound = new Audio(closeAudio);
      sound.play();
    } catch (e) {
      console.log("No close sound found");
    }
    
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleBoxClick = () => {
    try {
      const sound = new Audio(clickBox);
      sound.volume = 0.5; 
      sound.play();
    } catch (e) {
      console.log("Click sound failed:", e);
    }
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close" 
      defaultPosition={{x: 50, y: 50}}>
      
      <div ref={nodeRef} style={{ position: 'absolute', zIndex: 10 }}>
        
        <div className="tab-window window-entrance">
          
          <div className="title-bar">
            <div className="side-by-side">
              <img className='icon-topbar' src={aboutImg} alt="About" />
              <span className="title">About Me</span>
            </div>
            <div className="window-controls">
              <button 
                className="btn close" 
                onClick={handleClose}
              >
                [ x ]
              </button>
            </div>
          </div>

          <div className="window-content-tab">
            <div className="profile-header">
              <img src={myProfilePic} alt="Aryll Nevin Morales" className="profile-avatar" />
              
              <div className="profile-info">
                <h1>Aryll Nevin Morales</h1>
                <h4>Developer | Engineer | Artist</h4>
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