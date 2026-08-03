import React, { useState, useEffect } from 'react';

export default function ViewCounter() {
  const [totalViews, setTotalViews] = useState('...');
  const [todayViews, setTodayViews] = useState('...');

  useEffect(() => {
    const BASE_URL = "https://api.counterapi.dev/v2/aryll-moraless-team-4810/views-anvmorales04";

    const fetchCounts = async () => {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '_');

      try {
        const lastVisitDate = localStorage.getItem('portfolioLastVisit');

        if (lastVisitDate !== today) {
          const upRes = await fetch(`${BASE_URL}/up`);
          if (!upRes.ok) throw new Error("Increment API connection failed");
          localStorage.setItem('portfolioLastVisit', today);
        }

        const statsRes = await fetch(`${BASE_URL}/stats`);
        if (!statsRes.ok) throw new Error("Stats API connection failed");
        
        const statsData = await statsRes.json();
        
        setTotalViews(statsData.data?.up_count || 0);
        setTodayViews(statsData.data?.stats?.today?.up || 0);

      } catch (error) {
        console.log("Error loading view counter:", error);
        setTotalViews('Err');
        setTodayViews('Err');
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <style>
        {`
          .custom-tooltip-container {
            position: relative;
            display: inline-block;
            cursor: help;
            margin-left: 4px;
            opacity: 0.6;
            transition: opacity 0.2s ease;
          }
          .custom-tooltip-container:hover {
            opacity: 1;
          }
          .custom-tooltip-box {
            visibility: hidden;
            background-color: #483D3F;
            color: #F4EBD9;
            text-align: center;
            border-radius: 6px;
            padding: 6px 10px;
            position: absolute;
            z-index: 100;
            
            /* FIXED: Drop DOWN instead of UP */
            top: 150%; 
            
            /* FIXED: Align to the RIGHT edge so it grows leftward */
            right: 0; 
            left: auto;
            
            white-space: nowrap;
            font-size: 12px;
            font-weight: 400;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            opacity: 0;
            
            /* Animate downward slightly */
            transform: translateY(-5px); 
            transition: opacity 0.2s ease, transform 0.2s ease;
            pointer-events: none;
          }
          
          /* The little arrow (now pointing UP at the icon) */
          .custom-tooltip-box::after {
            content: "";
            position: absolute;
            bottom: 100%; /* Places arrow on top of the box */
            right: 8px;   /* Aligns arrow directly under the 'i' */
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent #483D3F transparent;
          }
          
          .custom-tooltip-container:hover .custom-tooltip-box {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(72, 61, 63, 0.08)',
          border: '1px solid rgba(72, 61, 63, 0.15)',
          color: '#483D3F',
          padding: '4px 14px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          gap: '6px',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <span style={{ color: '#4ade80', fontSize: '10px' }}>●</span> 
        <span>{todayViews} Today's Views</span>
        
        <div className="custom-tooltip-container">
          <span style={{ fontSize: '14px' }}>ⓘ</span>
          <div className="custom-tooltip-box">
            Total Views: {totalViews}
          </div>
        </div>
      </div>
    </>
  );
}