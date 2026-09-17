import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING WORKSPACE');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    // Smooth, realistic loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        const increment = Math.max(2, Math.floor(remaining * 0.18 + Math.random() * 8));
        const next = Math.min(100, prev + increment);

        if (next > 75) {
          setStatusText('LAUNCHING 3D ENVIRONMENT');
        } else if (next > 45) {
          setStatusText('LOADING ASSETS & ENGINES');
        } else if (next > 20) {
          setStatusText('CONNECTING CORE MODULES');
        }

        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setStatusText('EXPERIENCE READY');
      const timer1 = setTimeout(() => {
        setIsFadingOut(true);
      }, 350);

      const timer2 = setTimeout(() => {
        setIsGone(true);
        if (onLoaded) onLoaded();
      }, 950);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [progress, onLoaded]);

  if (isGone) return null;

  return (
    <div
      className={`loading-screen-backdrop ${isFadingOut ? 'loading-fade-out' : ''}`}
      aria-hidden="true"
    >
      {/* Background Ambient Pulse */}
      <div className="loading-ambient-glow" />

      <div className="loading-content-box">
        {/* Glowing Profile Avatar / Emblem */}
        <div className="loading-avatar-frame">
          <div className="loading-ring-outer" />
          <div className="loading-ring-inner" />
          <img
            src="/gautam-profile.jpg"
            alt="Gautam Kumar"
            className="loading-avatar-img"
          />
        </div>

        {/* Identity & Status */}
        <div className="loading-identity-row">
          <h3 className="loading-title">GAUTAM KUMAR</h3>
          <span className="loading-subtitle font-mono">PORTFOLIO EXPERIENCE</span>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="loading-progress-container">
          <div className="loading-telemetry-row font-mono">
            <span className="telemetry-status-text">
              <span className="telemetry-pulse-dot" />
              {statusText}
            </span>
            <span className="telemetry-percentage">{progress}%</span>
          </div>

          <div className="loading-progress-track">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
