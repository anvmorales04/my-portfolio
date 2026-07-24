import React, { useState, useEffect } from 'react';
import './App.css'; 

export default function ViewCounter() {
  const [totalViews, setTotalViews] = useState('...');
  const [todayViews, setTodayViews] = useState('...');

  useEffect(() => {
    // 1. Removed API key to prevent CORS security blocks in the browser
    const BASE_URL = "https://api.counterapi.dev/v2/aryll-moraless-team-4810/views-anvmorales04";

    const fetchCounts = async () => {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '_');

      try {
        const lastVisitDate = localStorage.getItem('portfolioLastVisit');

        if (lastVisitDate !== today) {
          // --- NEW VISIT TODAY: Increment the counter ---
          // Notice we removed the extra header options here!
          const upRes = await fetch(`${BASE_URL}/up`);
          if (!upRes.ok) throw new Error("Increment API connection failed");

          localStorage.setItem('portfolioLastVisit', today);
        }

        // --- FETCH STATS ---
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
    <div className="view-counter-container">
      <div style={{ marginBottom: '5px' }}>Views Today: {todayViews}</div>
      <div>Total Views: {totalViews}</div>
    </div>
  );
}