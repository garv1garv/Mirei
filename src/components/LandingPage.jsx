import React, { useState, useEffect, useMemo } from 'react';

export function LandingPage({ onGetStarted }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Parallax shift based on mouse
  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  return (
    <div className="landing-page">
      {/* Animated glow orbs */}
      <div className="glow-orb glow-orb-1" style={{ transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)` }} />
      <div className="glow-orb glow-orb-2" style={{ transform: `translate(${-parallaxX * 0.3}px, ${-parallaxY * 0.3}px)` }} />
      <div className="glow-orb glow-orb-3" />

      {/* Subtle grid overlay */}
      <div className="landing-grid-overlay" />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="landing-particle"
          style={{
            left: `${5 + (i * 5.2)}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${12 + Math.random() * 10}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
        />
      ))}

      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">
          <div className="landing-logo-icon">
            {/* Custom SVG Logo — crystal/prism shape */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff85a1"/>
                  <stop offset="50%" stopColor="#d946ef"/>
                  <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
              <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none"/>
              <path d="M12 2v20M3 7l9 5 9-5M3 17l9-5 9 5" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.5"/>
              <circle cx="12" cy="12" r="2.5" fill="url(#logoGrad)" opacity="0.8"/>
            </svg>
          </div>
          <span>Mirei</span>
        </div>
        <nav className="landing-nav">
          <a href="#">Curriculum</a>
          <a href="#">Philosophy</a>
          <a href="#">AI Tutor</a>
        </nav>
      </header>

      {/* Hero section */}
      <main className="landing-hero">
        <div className="landing-badge">
          <span className="pulse-dot" />
          Mirei Platform v3.0 — Built with Love
        </div>

        <h1>
          Master Data Structures<br />
          <span className="gradient-text">& Algorithms, Beautifully.</span>
        </h1>

        <p>
          The most refined, cinematic, and intelligent coding platform ever built.
          Experience real-time AI mentoring, deep visualizations, and a UI crafted with absolute devotion.
        </p>

        <div className="landing-cta-group">
          <button className="landing-btn-primary" onClick={onGetStarted}>
            Launch Platform
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
          <button className="landing-btn-secondary">
            Explore Curriculum
          </button>
        </div>

        <div className="landing-stats">
          <div className="landing-stat">
            <span className="stat-value">500+</span>
            <span className="stat-label">Curated Problems</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">15</span>
            <span className="stat-label">Cinematic Themes</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">AI Mentorship</span>
          </div>
          <div className="landing-stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Infinite Love</span>
          </div>
        </div>
      </main>
    </div>
  );
}
