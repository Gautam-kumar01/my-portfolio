import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { DigitalWorkspace3D } from './DigitalWorkspace3D';
import { MagneticButton } from '../UI/MagneticButton';
import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
  Code2,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
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
    const cvContent = `GAUTAM KUMAR
Full-Stack Developer • Builder • Freelancer
Email: ${PORTFOLIO_DATA.personal.email}
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
GitHub: ${PORTFOLIO_DATA.personal.github}
Education: B.C.A @ Amity University (2026-Present) | 12th GMIC (2025) | 10th CBSE (2023)

CORE PRODUCTS BUILT:
- ResumeCraft (Live AI Resume Builder & ATS Scoring Engine - https://resumecraft.co.in)
- CloudLab (Browser-Based Cloud Sandbox & Interactive Web Terminal)
- SIH 2026 3D ULPIN (3D Geospatial Cadastral Elevation Mapping Engine - 3rd Rank)
- SkillSync (Automated Skill Gap & Job Market Requirement Analyzer)
- HunarHub (Student Project Showcase & Collaboration MVP)

CORE TECHNICAL MATRIX:
React 19, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Three.js WebGL, Docker, WebSockets, LLM Integrations
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

  const techStackMarquee = [
    { name: 'React 19', tag: 'Frontend' },
    { name: 'TypeScript', tag: 'Language' },
    { name: 'Node.js', tag: 'Backend' },
    { name: 'Python', tag: 'AI & Data' },
    { name: 'PostgreSQL', tag: 'Database' },
    { name: 'Three.js WebGL', tag: '3D Graphics' },
    { name: 'OpenAI / Gemini', tag: 'LLM APIs' },
    { name: 'MongoDB', tag: 'NoSQL' },
    { name: 'Docker', tag: 'DevOps' },
    { name: 'WebSockets', tag: 'Realtime' },
    { name: 'Tailwind CSS', tag: 'Styling' },
    { name: 'Git & GitHub', tag: 'VCS' },
  ];

  return (
    <section className="hero-section" id="hero">
      {/* Background ambient lighting */}
      <div className="hero-ambient-glow" />
      <div className="hero-ambient-glow-secondary" />

      <div className="container hero-container">
        {/* Left: Headline, Badges, Metrics & CTAs */}
        <div className="hero-content">
          {/* Top Status Pill */}
          <div className="hero-role-badge">
            <span className="hero-role-dot" />
            <span className="hero-role-text">FULL-STACK DEVELOPER • BUILDER • FREELANCER</span>
          </div>

          {/* Featured Live Product Quick-Launcher Ribbon */}
          <a
            href="https://resumecraft.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-live-product-banner"
            title="Launch live working project ResumeCraft"
          >
            <div className="banner-left-wrap">
              <span className="live-pulse-beacon" />
              <span className="live-banner-tag font-mono">LIVE PRODUCT:</span>
              <span className="live-banner-title">ResumeCraft (AI ATS Engine)</span>
            </div>
            <div className="banner-right-wrap font-mono">
              <span>Launch Live App</span>
              <ExternalLink size={13} className="banner-arrow" />
            </div>
          </a>

          {/* Main Headline */}
          <h1 className="hero-headline">
            I build <span className="hero-headline-accent">digital products</span> <br />
            that solve <span className="hero-headline-highlight">real problems.</span>
          </h1>

          <p className="hero-description">
            {PORTFOLIO_DATA.personal.heroDescription}
          </p>

          {/* Live Floating Metric Highlights */}
          <div className="hero-metrics-grid">
            <div className="hero-metric-card">
              <div className="metric-header">
                <Zap size={15} className="text-accent" />
                <span className="metric-num font-mono">5+</span>
              </div>
              <span className="metric-label">Products Built & Shipped</span>
            </div>

            <div className="hero-metric-card">
              <div className="metric-header">
                <Award size={15} className="text-accent" />
                <span className="metric-num font-mono">3rd</span>
              </div>
              <span className="metric-label">SIH Internal Hackathon</span>
            </div>

            <div className="hero-metric-card">
              <div className="metric-header">
                <CheckCircle2 size={15} className="text-accent" />
                <span className="metric-num font-mono">100%</span>
              </div>
              <span className="metric-label">Practical Production Code</span>
            </div>
          </div>

          {/* Action CTAs with Magnetic physics */}
          <div className="hero-actions">
            <MagneticButton strength={15}>
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="btn-accent hero-cta-primary"
                data-interactive="true"
              >
                <Sparkles size={16} />
                <span>Explore Live Products</span>
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
              <span className="hero-status-title">Active Focus:</span>
              <span className="hero-status-value">
                {PORTFOLIO_DATA.personal.currentFocus}
              </span>
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
                <span className="ui-pill font-mono">60FPS WebGL</span>
              </div>
            </div>

            <div className="floating-ui-card floating-ui-bottom">
              <div className="floating-ui-header">
                <span className="ui-dot ui-dot-blue" />
                <span>FEATURED ENGINE</span>
              </div>
              <div className="floating-ui-live-row">
                <div className="live-engine-info">
                  <span className="live-engine-name">ResumeCraft AI & CloudLab</span>
                  <span className="live-engine-sub font-mono">resumecraft.co.in</span>
                </div>
                <span className="live-badge-glow">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Tech Stack Marquee Strip */}
      <div className="hero-marquee-wrap" aria-label="Core Technology Stack">
        <div className="hero-marquee-label font-mono">
          <Code2 size={13} className="text-accent" />
          <span>ENGINEERING STACK:</span>
        </div>
        <div className="hero-marquee-track">
          <div className="hero-marquee-content">
            {techStackMarquee.concat(techStackMarquee).map((item, idx) => (
              <div key={idx} className="marquee-chip">
                <span className="chip-name">{item.name}</span>
                <span className="chip-tag font-mono">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Transition: Scroll to explore */}
      <div className="hero-transition-bar">
        <a href="#projects" onClick={scrollToProjects} className="hero-scroll-indicator" aria-label="Scroll to explore projects">
          <span className="scroll-label">Scroll to explore projects</span>
          <ArrowDown size={14} className="scroll-arrow" />
        </a>
      </div>
    </section>
  );
};
