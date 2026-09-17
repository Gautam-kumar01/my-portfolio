import React, { useState } from 'react';
import { FreelanceBackground3D } from './FreelanceBackground3D';
import { MagneticButton } from '../UI/MagneticButton';
import { ScrollReveal } from '../UI/ScrollReveal';
import { generateResumePDF } from '../../utils/generateResumePDF';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import {
  Briefcase,
  Globe,
  Terminal,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Clock,
  FileDown,
  MessageSquareCode,
} from 'lucide-react';
import './FreelanceSection.css';

interface FreelanceSectionProps {
  onContactClick?: () => void;
  onShowToast?: (message: string) => void;
}

export const FreelanceSection: React.FC<FreelanceSectionProps> = ({
  onContactClick,
  onShowToast,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleStartProject = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onShowToast) {
      onShowToast("Generating & downloading Gautam's structured PDF Resume...");
    }
    try {
      generateResumePDF();
    } catch (err) {
      console.error(err);
      if (onShowToast) {
        onShowToast("Failed to generate PDF. Retrying...");
      }
    }
  };

  const services = [
    {
      icon: <Globe size={22} className="service-icon-svg" />,
      title: 'Custom Web Apps & SaaS MVPs',
      tagline: 'High-conversion, dynamic, responsive web applications',
      description:
        'Architecting reactive, user-centric web applications with modern state management, smooth navigation, and optimized conversion pathways.',
      tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite / Next.js'],
      color: '#00ff66',
    },
    {
      icon: <Terminal size={22} className="service-icon-svg" />,
      title: 'Full-Stack & Cloud Architecture',
      tagline: 'Resilient APIs, secure auth, and scalable cloud databases',
      description:
        'Developing robust RESTful and WebSocket microservices, secure authentication mechanisms, and optimized MongoDB/PostgreSQL schemas.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker'],
      color: '#00e5ff',
    },
    {
      icon: <Sparkles size={22} className="service-icon-svg" />,
      title: 'AI Integrations & Smart Automations',
      tagline: 'LLM pipelines, ATS scoring & semantic tooling',
      description:
        'Infusing applications with OpenAI and Gemini LLMs, prompt pipelines, semantic indexing, and automated data processing workflows.',
      tech: ['OpenAI API', 'Gemini AI', 'Vector Prompts', 'Python'],
      color: '#a855f7',
    },
    {
      icon: <Layers size={22} className="service-icon-svg" />,
      title: '3D Interactive Graphics & UI Polish',
      tagline: '60 FPS WebGL experiences, spatial UI & micro-interactions',
      description:
        'Elevating standard web interfaces into unforgettable digital experiences using Three.js, spatial shaders, and micro-animations.',
      tech: ['Three.js', 'WebGL', 'Shaders', 'Lighthouse 95+'],
      color: '#38bdf8',
    },
  ];

  const guarantees = [
    {
      icon: <Zap size={18} />,
      title: 'Rapid 48–72h MVP Sprint',
      desc: 'Get an interactive, working prototype deployed fast to validate real user demand.',
    },
    {
      icon: <ShieldCheck size={18} />,
      title: 'Production-Grade Clean Code',
      desc: 'Modular, well-commented TypeScript code with clear documentation and zero technical debt.',
    },
    {
      icon: <Clock size={18} />,
      title: 'Direct & Transparent Syncs',
      desc: 'Milestone tracking, staging previews, and clear communication with zero surprise delays.',
    },
    {
      icon: <CheckCircle2 size={18} />,
      title: 'Performance & SEO Optimized',
      desc: 'Sub-second load times, 95+ Lighthouse metrics, and mobile-first responsiveness by default.',
    },
  ];

  return (
    <section className="freelance-section-root" id="freelance">
      <div className="container">
        <ScrollReveal>
          <div
            className="freelance-master-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* 3D WebGL Background Layer */}
            <FreelanceBackground3D isHovered={isHovered} />

            {/* Subtle Gradient Glow & Cyber Mesh Overlays */}
            <div className="freelance-mesh-glow" />
            <div className="freelance-grid-lines" />

            {/* Content Container (Layered above 3D WebGL) */}
            <div className="freelance-card-inner">
              {/* Header Badge */}
              <div className="freelance-header-top">
                <div className="freelance-status-pill">
                  <span className="pulsing-radar-dot" />
                  <span className="status-pill-text">OPEN FOR FREELANCE & CLIENT PRODUCTS</span>
                </div>

                <div className="freelance-availability-badge">
                  <span className="avail-label">Availability:</span>
                  <span className="avail-val">Accepting Q1/Q2 2026 Projects</span>
                </div>
              </div>

              {/* Main Headline & Intro */}
              <div className="freelance-hero-text">
                <div className="eyebrow freelance-eyebrow">
                  <Briefcase size={14} />
                  <span>FREELANCE & SOLUTION ENGINEERING</span>
                </div>

                <h2 className="freelance-title">
                  Transforming ambitious ideas into <span className="highlight-text-neon">market-ready products</span>.
                </h2>

                <p className="freelance-subtitle">
                  Beyond my academic coursework and personal software builds, I partner with founders, businesses, and creators to architect tailored web apps, SaaS MVPs, and high-performance digital systems.
                </p>
              </div>

              {/* 4 Service Pillars Grid */}
              <div className="freelance-services-grid">
                {services.map((svc, idx) => (
                  <div
                    key={svc.title}
                    className={`service-card ${activeService === idx ? 'service-card-active' : ''}`}
                    onMouseEnter={() => setActiveService(idx)}
                    onMouseLeave={() => setActiveService(null)}
                    style={{ '--service-accent': svc.color } as React.CSSProperties}
                  >
                    <div className="service-card-header">
                      <div className="service-icon-box">{svc.icon}</div>
                      <span className="service-index">0{idx + 1}</span>
                    </div>

                    <h4 className="service-card-title">{svc.title}</h4>
                    <p className="service-card-tagline">{svc.tagline}</p>
                    <p className="service-card-desc">{svc.description}</p>

                    <div className="service-tech-tags">
                      {svc.tech.map((t) => (
                        <span key={t} className="service-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 4 Value Guarantees Banner */}
              <div className="freelance-guarantees-banner">
                <div className="guarantees-heading">
                  <MessageSquareCode size={16} className="text-accent" />
                  <span>THE FREELANCE STANDARD & EXECUTION GUARANTEE</span>
                </div>

                <div className="guarantees-grid">
                  {guarantees.map((g) => (
                    <div key={g.title} className="guarantee-item">
                      <div className="guarantee-icon-wrapper">{g.icon}</div>
                      <div>
                        <h5 className="guarantee-title">{g.title}</h5>
                        <p className="guarantee-desc">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Callout Row */}
              <div className="freelance-actions-row">
                <div className="freelance-btn-group">
                  <MagneticButton strength={15}>
                    <button
                      onClick={handleStartProject}
                      className="btn-accent freelance-primary-cta"
                      data-interactive="true"
                    >
                      <Sparkles size={16} />
                      <span>Start a Project with Gautam</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </MagneticButton>

                  <MagneticButton strength={12}>
                    <button
                      onClick={handleDownloadResume}
                      className="btn-secondary freelance-resume-btn"
                      title="Download Gautam's Verified PDF Resume"
                      data-interactive="true"
                    >
                      <FileDown size={15} />
                      <span>Download PDF Resume</span>
                    </button>
                  </MagneticButton>
                </div>

                <div className="freelance-direct-contact">
                  <div className="contact-quick-stat">
                    <span className="stat-glow-dot" />
                    <span>Direct Email: <strong>{PORTFOLIO_DATA.personal.email}</strong></span>
                  </div>
                  <span className="response-time-note">⚡ Avg Response Time: &lt; 4 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
