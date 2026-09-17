import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../UI/ScrollReveal';
import {
  User,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Terminal,
  Code2,
  Cpu,
  Workflow,
} from 'lucide-react';
import './About.css';

interface AboutProps {
  onContactClick?: () => void;
}

export const About: React.FC<AboutProps> = () => {
  const [activeMilestone, setActiveMilestone] = useState(2); // default to present
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reaction for 3D timeline depth and progress fill
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the timeline container the user has scrolled
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(progress);

      // Auto activate milestones based on scroll progress
      if (progress > 0.65) {
        setActiveMilestone(2);
      } else if (progress > 0.4) {
        setActiveMilestone(1);
      } else if (progress > 0.15) {
        setActiveMilestone(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineMilestones = [
    {
      year: '2023',
      degree: '10th — CBSE',
      institution: 'Bal Vidya Niketan School, Jehanabad',
      location: 'Jehanabad, Bihar',
      status: 'completed',
      tag: 'Foundation in Logic & Science',
      desc: 'Completed secondary education with rigorous coursework in computer applications, analytical thinking, and mathematics.',
      highlight: 'Built algorithmic thinking and core programming foundations.',
    },
    {
      year: '2025',
      degree: '12th',
      institution: 'Gandhi Memorial Inter College',
      location: 'Bihar',
      status: 'completed',
      tag: 'Higher Secondary Specialization',
      desc: 'Deepened computer science fundamentals, algorithm design, structured data handling, and problem-solving principles.',
      highlight: 'Transitioned from script learning to full-stack web architectures.',
    },
    {
      year: 'Present',
      degree: 'B.C.A',
      institution: 'Amity University',
      location: 'Undergraduate Program',
      status: 'active',
      tag: 'Active Degree & Product Engineering',
      desc: 'Specializing in full-stack architecture, AI prompt models, cloud sandboxes, modern distributed systems, and real-world digital products.',
      highlight: 'Building enterprise-grade apps, hackathon systems, and client solutions.',
    },
  ];

  return (
    <section className="scene-section about-narrative-section" id="about">
      {/* Background ambient lighting */}
      <div className="about-ambient-glow" />
      <div className="about-ambient-glow-right" />

      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="about-story-header">
            <div className="eyebrow">
              <User size={14} />
              <span>03 — STORY & ETHOS</span>
            </div>
            <h2 className="section-title">
              More than just <span className="text-accent">code.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* 1. EDITORIAL STORY NARRATIVE */}
        <div className="about-narrative-grid">
          {/* Main Story Paragraphs */}
          <ScrollReveal delay={100} className="narrative-text-col">
            <div className="editorial-lead-box">
              <p className="story-paragraph story-p1">
                Gautam Kumar is a <strong>full-stack developer, builder and BCA student</strong> focused on turning ideas into functional digital products.
              </p>
              <p className="story-paragraph story-p2">
                He works across <strong>modern web development, AI-powered applications, cloud-based platforms</strong> and data-driven experiences.
              </p>
              <p className="story-paragraph story-p3">
                Instead of only learning technologies, he focuses on <strong>building real products and solving real problems.</strong>
              </p>
            </div>

            {/* Core Working Philosophy Badges */}
            <div className="story-principles-row">
              <div className="story-principle-pill">
                <Code2 size={14} className="text-accent" />
                <span>Product Over Theory</span>
              </div>
              <div className="story-principle-pill">
                <Sparkles size={14} className="text-accent" />
                <span>Real User Friction Solved</span>
              </div>
              <div className="story-principle-pill">
                <Cpu size={14} className="text-accent" />
                <span>AI & Cloud Native</span>
              </div>
              <div className="story-principle-pill">
                <Workflow size={14} className="text-accent" />
                <span>Clean Architecture</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Quick Monogram Terminal Card */}
          <ScrollReveal delay={200} className="narrative-meta-col">
            <div className="about-terminal-card">
              <div className="terminal-card-topbar">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-amber" />
                  <span className="dot dot-green" />
                </div>
                <div className="terminal-title">
                  <Terminal size={12} />
                  <span>gautam_profile.json</span>
                </div>
              </div>

              {/* Developer Profile Portrait Header */}
              <div className="about-terminal-photo-header">
                <div className="about-photo-wrap">
                  <img
                    src="/gautam-profile.jpg"
                    alt="Gautam Kumar"
                    className="about-profile-photo"
                  />
                  <span className="about-photo-status-badge">
                    <span className="status-dot" />
                    <span>Active</span>
                  </span>
                </div>
                <div className="about-photo-details">
                  <h4 className="about-photo-name">Gautam Kumar</h4>
                  <p className="about-photo-role">Full-Stack Developer & Builder</p>
                  <p className="about-photo-uni">Amity University • B.C.A</p>
                </div>
              </div>

              <div className="terminal-code-body font-mono">
                <div className="code-line"><span className="code-key">"name"</span>: <span className="code-val">"Gautam Kumar"</span>,</div>
                <div className="code-line"><span className="code-key">"role"</span>: <span className="code-val">"Full-Stack Developer & Builder"</span>,</div>
                <div className="code-line"><span className="code-key">"degree"</span>: <span className="code-val">"B.C.A — Amity University"</span>,</div>
                <div className="code-line"><span className="code-key">"focus"</span>: <span className="code-val">"Full-Stack, AI & Cloud Platforms"</span>,</div>
                <div className="code-line"><span className="code-key">"mindset"</span>: <span className="code-val">"Idea → Design → Build → Ship"</span>,</div>
                <div className="code-line"><span className="code-key">"freelance"</span>: <span className="code-accent">"Available for Projects"</span></div>
              </div>

              <div className="terminal-card-footer">
                <span className="status-dot" />
                <span className="footer-status-text">Available for Client Projects & Roles</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 2. VISUAL 3D EDUCATION TIMELINE */}
        <div className="about-timeline-section" id="education" ref={timelineRef}>
          <ScrollReveal>
            <div className="timeline-header-row">
              <div className="eyebrow">
                <GraduationCap size={14} />
                <span>EDUCATION TIMELINE</span>
              </div>
              <h3 className="timeline-subheading">Academic Path & Milestones</h3>
              <p className="timeline-subtitle">
                A structured journey from foundational computer science to real-world software architecture.
              </p>
            </div>
          </ScrollReveal>

          <div className="spatial-timeline-container">
            {/* 3D Timeline Glowing Progress Track */}
            <div className="spatial-timeline-track">
              <div
                className="spatial-timeline-fill"
                style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
              />
            </div>

            <div className="spatial-milestones-grid">
              {timelineMilestones.map((item, idx) => {
                const isActive = idx === activeMilestone;
                const isCurrent = item.status === 'active';
                // 3D parallax depth responsive to scroll progress & active state
                const depthZ = isActive ? 20 : (idx * 6) - (scrollProgress * 12);
                const rotY = isActive ? 0 : (idx - 1) * -3;

                return (
                  <ScrollReveal key={item.year} delay={idx * 120}>
                    <div
                      className={`spatial-milestone-card ${
                        isActive ? 'milestone-card-active' : ''
                      } ${isCurrent ? 'milestone-card-current' : ''}`}
                      onClick={() => setActiveMilestone(idx)}
                      style={{
                        transform: `perspective(1000px) rotateY(${rotY}deg) translateZ(${depthZ}px)`,
                      }}
                    >
                      {/* Top Node Header */}
                      <div className="milestone-card-top">
                        <div className="milestone-year-chip">
                          <Calendar size={13} />
                          <span>{item.year}</span>
                        </div>

                        {isCurrent ? (
                          <div className="active-enrollment-badge">
                            <span className="status-dot" />
                            <span>PRESENT ENROLLMENT</span>
                          </div>
                        ) : (
                          <span className="completed-tag">
                            <CheckCircle2 size={13} />
                            <span>COMPLETED</span>
                          </span>
                        )}
                      </div>

                      <h4 className="milestone-card-degree">{item.degree}</h4>
                      <p className="milestone-card-inst">{item.institution}</p>

                      <div className="milestone-card-location">
                        <MapPin size={12} className="text-accent" />
                        <span>{item.location}</span>
                      </div>

                      <p className="milestone-card-desc">{item.desc}</p>

                      <div className="milestone-card-highlight">
                        <span className="highlight-label">Key Focus:</span> {item.highlight}
                      </div>

                      <div className="milestone-card-footer-pill">
                        <span>{item.tag}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
