import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    // Fast, crisp progress sequence (< 800ms total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating spring-like curve
        const step = Math.max(12, Math.floor((100 - prev) * 0.35));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer1 = setTimeout(() => {
        setIsFadingOut(true);
      }, 150);

      const timer2 = setTimeout(() => {
        setIsGone(true);
        if (onLoaded) onLoaded();
      }, 550);

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
      <div className="loading-content-box">
        {/* Monogram Emblem */}
        <div className="loading-monogram-wrap">
          <div className="loading-monogram-ring" />
          <span className="loading-monogram-text font-mono">GK</span>
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="loading-telemetry-row font-mono">
          <span className="telemetry-label">THE DIGITAL WORKSHOP</span>
          <span className="telemetry-pct">{progress}%</span>
        </div>

        <div className="loading-progress-track">
          <div
            className="loading-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
