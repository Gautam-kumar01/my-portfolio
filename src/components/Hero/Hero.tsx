import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { DigitalWorkspace3D } from './DigitalWorkspace3D';
import { MagneticButton } from '../UI/MagneticButton';
import { ArrowDown, ArrowUpRight, FileDown, Code2, Sparkles, Terminal } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onContactClick: () => void;
  onShowToast?: (message: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onShowToast }) => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast("Downloading Gautam Kumar's verified Resume...");
    }
    // Create simulated CV download blob
    const cvContent = `GAUTAM KUMAR
Full-Stack Developer • Builder • Freelancer
Email: ${PORTFOLIO_DATA.personal.email}
Education: B.C.A @ Amity University (2026-Present) | 12th GMIC (2025) | 10th CBSE (2023)

CORE PROJECTS:
- ResumeCraft: AI-Powered Resume Builder & ATS Optimizer
- CloudLab: Browser-Based Cloud Development Environment & Terminal
- SIH 2026 3D ULPIN: 3D GIS Geospatial Cadastral Mapping Platform (3rd Rank)
- SkillSync: Automated Skill Gap & Job Requirement Analysis
- HunarHub: Student Talent Showcase & Peer Collaboration Network

CORE SKILLS:
React, Node.js, Python, PostgreSQL, MongoDB, Three.js, Docker, WebSockets, LLM Integrations
`;
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Gautam_Kumar_Resume_2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow" />

      <div className="container hero-container">
        {/* Left: Headline & Typography */}
        <div className="hero-content">
          <div className="hero-role-badge">
            <span className="hero-role-dot" />
            <span className="hero-role-text">FULL-STACK DEVELOPER • BUILDER • FREELANCER</span>
          </div>

          <h1 className="hero-headline">
            I build <span className="hero-headline-accent">digital products</span> <br />
            that solve <span className="hero-headline-highlight">real problems.</span>
          </h1>

          <p className="hero-description">
            {PORTFOLIO_DATA.personal.heroDescription}
          </p>

          {/* Action CTAs with Magnetic physics */}
          <div className="hero-actions">
            <MagneticButton strength={15}>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="btn-accent hero-cta-primary"
                data-interactive="true"
              >
                <span>View My Work</span>
                <ArrowDown size={16} />
              </a>
            </MagneticButton>

            <MagneticButton strength={15}>
              <button
                onClick={onContactClick}
                className="btn-secondary hero-cta-secondary"
                data-interactive="true"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight size={16} />
              </button>
            </MagneticButton>

            <MagneticButton strength={12}>
              <button
                onClick={handleDownloadCV}
                className="hero-cv-btn"
                title="Download Gautam's Resume"
                data-interactive="true"
              >
                <FileDown size={15} />
                <span>Download CV</span>
              </button>
            </MagneticButton>
          </div>

          {/* Real-time Status Indicator */}
          <div className="hero-live-status">
            <span className="status-dot" />
            <div className="hero-status-details">
              <span className="hero-status-title">Currently building:</span>
              <span className="hero-status-value">
                {PORTFOLIO_DATA.personal.currentFocus}
              </span>
            </div>
          </div>

          {/* Quick Skill Tags under Hero */}
          <div className="hero-quick-tags">
            <div className="hero-quick-tag">
              <Code2 size={13} className="hero-tag-icon" />
              <span>Full-Stack & React</span>
            </div>
            <div className="hero-quick-tag">
              <Sparkles size={13} className="hero-tag-icon" />
              <span>AI & LLM Pipelines</span>
            </div>
            <div className="hero-quick-tag">
              <Terminal size={13} className="hero-tag-icon" />
              <span>3D GIS & Three.js</span>
            </div>
          </div>
        </div>

        {/* Right: 3D Digital Workspace Command Center */}
        <div className="hero-visual-wrapper">
          <div className="hero-3d-frame">
            <DigitalWorkspace3D />
            
            {/* Overlay Badges for visual depth */}
            <div className="floating-ui-card floating-ui-top">
              <div className="floating-ui-header">
                <span className="ui-dot ui-dot-green" />
                <span>ACTIVE WORKSPACE</span>
              </div>
              <div className="floating-ui-body">
                <span>Gautam's Digital Workshop</span>
                <span className="ui-pill">v2026.1</span>
              </div>
            </div>

            <div className="floating-ui-card floating-ui-bottom">
              <div className="floating-ui-header">
                <span className="ui-dot ui-dot-blue" />
                <span>CORE STACK</span>
              </div>
              <div className="floating-ui-tags">
                <span>React</span>
                <span>Node</span>
                <span>Python</span>
                <span>Three.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Transition: Scroll to explore */}
      <div className="hero-transition-bar">
        <a href="#projects" onClick={scrollToProjects} className="hero-scroll-indicator" aria-label="Scroll to explore">
          <span className="scroll-label">Scroll to explore</span>
          <ArrowDown size={14} className="scroll-arrow" />
        </a>
      </div>
    </section>
  );
};
