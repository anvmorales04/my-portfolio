import React, { useRef, useEffect, useState } from 'react'; 
import Draggable from 'react-draggable';
import './style/Tab_Window.css'; 

import { playSound } from '../utils/audio';
import linkedInImg from '../assets/linkedin_tb.png'; 

export default function Linkedin({ isOpen, onClose, zIndex, onFocus }) {
  const nodeRef = useRef(null); 
  const [widgetReady, setWidgetReady] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const script = document.createElement('script');
    script.src = "https://widgets.sociablekit.com/linkedin-profile-posts/widget.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!isCancelled) {
        setWidgetReady(true);
        setWidgetError(false);
      }
    };

    script.onerror = () => {
      if (!isCancelled) {
        setWidgetReady(false);
        setWidgetError(true);
      }
    };

    document.body.appendChild(script);

    const fallbackTimer = window.setTimeout(() => {
      if (!isCancelled && !widgetReady) {
        setWidgetError(true);
      }
    }, 4000);

    return () => {
      isCancelled = true;
      window.clearTimeout(fallbackTimer);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [widgetReady]);

  const handleClose = () => {
    playSound('windowClose');
    setTimeout(() => {
      onClose();
    }, 100);
  };

return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".title-bar" 
      cancel=".close" 
      defaultPosition={{ x: 90, y: 20 }}
      onMouseDown={onFocus} 
      bounds="body"
    >
      <div 
        ref={nodeRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: zIndex,
          visibility: isOpen ? 'visible' : 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.95)', // <--- Adds the pop-in scale animation
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out' // <--- Animate both smoothly
        }} 
        onMouseDown={onFocus} 
      >

        <div 
          className="tab-window" 
          style={{
            width: '380px',
            height: '550px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            top: 0,
            left: 0,
            zIndex: zIndex,
            boxSizing: 'border-box'
          }}
        >
          <div className="title-bar">
            <div className="side-by-side">
              <img className='icon-topbar' src={linkedInImg} alt="LinkedIn" />
              <span className="title">LinkedIn Activity</span>
            </div>
            <div className="window-controls">
              <button 
                className="btn close" 
                onClick={handleClose}>
                [ x ]
              </button>
            </div>
          </div>

          <div className="window-content-tab" style={{ padding: 0, overflowY: 'auto', flex: 1, minHeight: 0 }}>
            {widgetError ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                height: '100%',
                padding: '24px',
                textAlign: 'center',
                color: '#483D3F'
              }}>
                <div style={{ fontSize: '48px', fontWeight: 700 }}>in</div>
                <h3 style={{ margin: 0 }}>LinkedIn activity</h3>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  The embedded feed is unavailable right now, but you can still open my profile directly.
                </p>
                <a
                  href="https://www.linkedin.com/in/aryll-nevin-morales/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 16px',
                    borderRadius: '999px',
                    backgroundColor: '#483D3F',
                    color: '#F4EBD9',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Open LinkedIn profile
                </a>
              </div>
            ) : (
              <div className="sk-ww-linkedin-profile-post" data-embed-id="25698847"></div>
            )}
          </div>
          
        </div>
      </div>
    </Draggable>
  );
}