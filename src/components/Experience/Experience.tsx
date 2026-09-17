import React, { useState } from 'react';
import { ScrollReveal } from '../UI/ScrollReveal';
import { MagneticButton } from '../UI/MagneticButton';
import {
  Briefcase,
  Layers,
  GraduationCap,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Award,
  Globe,
  Rocket,
} from 'lucide-react';
import './Experience.css';

interface ExperienceProps {
  onContactClick: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  onContactClick,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const experienceCategories = [
    {
      id: 'building-products',
      number: '01',
      categoryTitle: 'Building Products',
      tag: 'INDEPENDENT SOFTWARE PLATFORMS',
      role: 'Full-Stack Product Builder',
      headline: 'Architecting & Launching Standalone Platforms',
      description:
        'Engineering standalone, functional software platforms designed to solve specific workflow friction with AI, cloud environments, and spatial visualizations.',
      icon: <Layers size={20} className="exp-step-icon text-accent" />,
      products: [
        {
          id: 'resumecraft',
          name: 'ResumeCraft',
          type: 'AI • Career • SaaS',
          desc: 'AI-powered resume builder & ATS scoring engine with live preview.',
          liveTag: 'Live at resumecraft.co.in',
        },
        {
          id: 'cloudlab',
          name: 'CloudLab',
          type: 'Cloud • Developer Tools',
          desc: 'Browser-based cloud IDE with container sandbox & web terminal.',
          liveTag: 'Active Project',
        },
        {
          id: 'sih-3d-ulpin',
          name: 'SIH 2026 — 3D ULPIN',
          type: 'GIS • 3D • Spatial Tech',
          desc: '3D land parcel mapping & cadastral terrain visualization platform.',
          liveTag: '3rd Rank SIH Internal',
        },
      ],
      highlights: [
        'End-to-end full-stack development from scratch using React, Node.js, and Python',
        'Integration of Large Language Models (OpenAI APIs) for structured scoring',
        '3D terrain mesh rendering and spatial polygon projections with Three.js',
        'Database architecture and state persistence using MongoDB and PostgreSQL',
      ],
    },
    {
      id: 'freelancing',
      number: '02',
      categoryTitle: 'Freelancing',
      tag: 'CLIENT & SOLUTION ENGINEERING',
      role: 'Freelance Web Developer',
      headline: 'Freelance Web & Digital Product Development',
      description:
        'Collaborating directly with individuals, creators, and businesses to turn raw concepts into high-converting, bespoke websites and scalable web applications.',
      icon: <Globe size={20} className="exp-step-icon text-accent" />,
      products: [],
      highlights: [
        'Custom responsive websites and high-performance web applications',
        'Full-stack API development, authentication, and secure database setup',
        'Performance optimization, smooth 60fps animations, and SEO best practices',
        'Direct technical consultation, rapid prototyping, and end-to-end cloud deployments',
      ],
    },
    {
      id: 'learning-by-building',
      number: '03',
      categoryTitle: 'Learning by Building',
      tag: 'ACADEMIC & HACKATHON INNOVATION',
      role: 'BCA Student & Competitive Builder',
      headline: 'B.C.A + Hackathons + Independent Projects',
      description:
        'Combining formal undergraduate computer science coursework at Amity University with high-intensity hackathons and relentless hands-on building.',
      icon: <GraduationCap size={20} className="exp-step-icon text-accent" />,
      products: [],
      academicMilestones: [
        {
          title: 'Amity University — Bachelor of Computer Applications (B.C.A)',
          detail: 'Active undergraduate degree focusing on software architecture, distributed systems, algorithms, and database management.',
          icon: <GraduationCap size={15} className="text-accent" />,
        },
        {
          title: 'Smart India Hackathon (SIH 2026 Internal) — 3rd Rank',
          detail: 'Architected the 3D ULPIN cadastral land parcel mapping engine, achieving 3rd place in college-wide selection.',
          icon: <Award size={15} className="text-accent" />,
        },
        {
          title: 'Google Gen AI Hackathon (2025) — Participant',
          detail: 'Built an AI-driven automated document workflow prototype leveraging modern Generative AI models.',
          icon: <Rocket size={15} className="text-accent" />,
        },
      ],
      highlights: [
        'Applied algorithmic principles directly to live software systems rather than theoretical exercises',
        'Collaborative team leadership and fast-paced hackathon sprint execution',
        'Continuous experimentation with modern cloud sandboxes, AI APIs, and spatial computing',
      ],
    },
  ];

  return (
    <section className="scene-section experience-section" id="experience">
      {/* Background Glow */}
      <div className="experience-ambient-glow" />

      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="experience-header">
            <div className="eyebrow">
              <Briefcase size={14} />
              <span>06 — PRACTICAL EXPERIENCE</span>
            </div>
            <h2 className="section-title">From ideas to products.</h2>
            <p className="section-subtitle">
              Practical engineering experience developed through building standalone SaaS products, client freelance solutions, and university hackathons.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Experience Timeline Container */}
        <div className="experience-timeline-layout">
          {/* Vertical Progress Spine */}
          <div className="exp-timeline-spine">
            <div className="spine-line" />
          </div>

          {/* Experience Track Nodes */}
          <div className="exp-timeline-tracks">
            {experienceCategories.map((item, idx) => {
              const isActive = activeTab === idx;

              return (
                <ScrollReveal key={item.id} delay={idx * 120}>
                  <div
                    className={`exp-timeline-node ${isActive ? 'exp-node-active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {/* Spine Beacon Marker */}
                    <div className="node-beacon-indicator">
                      <span className="beacon-dot" />
                      <span className="beacon-num font-mono">{item.number}</span>
                    </div>

                    {/* Content Card */}
                    <div className="exp-node-card">
                      {/* Top Header Row */}
                      <div className="exp-node-top">
                        <div className="exp-tag-wrap">
                          <span className="exp-category-num font-mono">{item.number} —</span>
                          <span className="exp-category-tag font-mono">{item.tag}</span>
                        </div>
                        <div className="exp-role-badge">
                          <span className="status-dot" />
                          <span>{item.role}</span>
                        </div>
                      </div>

                      <h3 className="exp-node-headline">{item.headline}</h3>
                      <p className="exp-node-desc">{item.description}</p>

                      {/* 01: Product Showcase Grid (for Building Products) */}
                      {item.products && item.products.length > 0 && (
                        <div className="exp-products-showcase">
                          <div className="showcase-title-row">
                            <Sparkles size={14} className="text-accent" />
                            <span className="font-mono">FEATURED PRODUCTS BUILT:</span>
                          </div>
                          <div className="exp-products-grid">
                            {item.products.map((prod) => (
                              <div
                                key={prod.id}
                                className="exp-product-box"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onSelectProject) onSelectProject(prod.id);
                                }}
                              >
                                <div className="product-box-top">
                                  <h4 className="prod-name">{prod.name}</h4>
                                  <span className="prod-type font-mono">{prod.type}</span>
                                </div>
                                <p className="prod-desc">{prod.desc}</p>
                                <div className="product-box-bottom">
                                  <span className="prod-live-badge">
                                    <span className="status-dot" />
                                    <span>{prod.liveTag}</span>
                                  </span>
                                  <ArrowUpRight size={13} className="prod-arrow" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 03: Academic & Hackathon Milestones (for Learning by Building) */}
                      {item.academicMilestones && (
                        <div className="exp-academic-showcase">
                          <div className="showcase-title-row">
                            <Award size={14} className="text-accent" />
                            <span className="font-mono">ACADEMIC & COMPETITIVE MILESTONES:</span>
                          </div>
                          <div className="academic-milestones-list">
                            {item.academicMilestones.map((m, mIdx) => (
                              <div key={mIdx} className="academic-milestone-item">
                                <div className="milestone-icon-wrap">{m.icon}</div>
                                <div className="milestone-info">
                                  <h5>{m.title}</h5>
                                  <p>{m.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Engineering Deliverables */}
                      <div className="exp-highlights-box">
                        <div className="highlights-label font-mono">PRACTICAL HIGHLIGHTS:</div>
                        <div className="highlights-grid">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="highlight-item">
                              <CheckCircle2 size={15} className="highlight-icon text-accent" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Central Callout CTA: "Have an idea?" / "Let's build it." */}
        <ScrollReveal delay={150}>
          <div className="experience-bottom-cta-banner">
            <div className="cta-left-content">
              <div className="cta-eyebrow font-mono">
                <Sparkles size={14} className="text-accent" />
                <span>HAVE AN IDEA?</span>
              </div>
              <h3 className="cta-main-title">Let's build it.</h3>
              <p className="cta-desc">
                Whether you need a full-stack web application, an AI-integrated prototype, or a high-performance modern website, let's connect and discuss your vision.
              </p>
            </div>

            <div className="cta-action-wrap">
              <MagneticButton strength={20}>
                <button
                  onClick={onContactClick}
                  className="btn-accent exp-conversation-btn"
                  aria-label="Start a conversation"
                >
                  <span>Start a conversation</span>
                  <ArrowUpRight size={16} />
                </button>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
