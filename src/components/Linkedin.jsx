import React, { useRef, useEffect } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import closeAudio from '../assets/audio/tab_close.wav'; 
import linkedInImg from '../assets/linkedin_tb.png'; 

export default function Linkedin({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 

  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://widgets.sociablekit.com/linkedin-profile-posts/widget.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

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

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close" 
      defaultPosition={{ x: -200, y: 20 }} 
      onMouseDown={onFocus} 
      bounds="body"
    >
      <div 
        ref={nodeRef} 
        style={{ position: 'absolute', zIndex: zIndex }} 
        bounds="body"
        onMouseDown={onFocus} 
      >

        <div 
          className="tab-window window-entrance" 
          style={{ width: '380px', height: '550px', display: 'flex', flexDirection: 'column' }}
        >
          <div className="title-bar">
            <div className="side-by-side">
              <img className='icon-topbar' src={linkedInImg} alt="LinkedIn" />
              <span className="title">LinkedIn Activity</span>
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

          <div className="window-content-tab" style={{ padding: 0, overflowY: 'auto', flex: 1 }}>
            <div className="sk-ww-linkedin-profile-post" data-embed-id="25698847"></div>
          </div>
          
        </div>
      </div>
    </Draggable>
  );
}