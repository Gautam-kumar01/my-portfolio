import React, { useRef, useState } from 'react';
import { ScrollReveal } from '../UI/ScrollReveal';
import {
  Trophy,
  Sparkles,
  Calendar,
  Layers,
  Cpu,
  CheckCircle2,
  Medal,
  Award,
  Zap,
} from 'lucide-react';
import './Achievements.css';

interface AchievementItem {
  id: string;
  title: string;
  subTitle: string;
  badgeLabel: string;
  badgeType: 'rank' | 'participated';
  year: string;
  focusProject: string;
  description: string;
  constraintTag: string;
  verifiedDetails: string;
}

export const Achievements: React.FC = () => {
  const achievements: AchievementItem[] = [
    {
      id: 'sih-2026',
      title: 'SIH Internal Hackathon',
      subTitle: 'Smart India Hackathon 2026 Selection',
      badgeLabel: '3rd Rank',
      badgeType: 'rank',
      year: '2026',
      focusProject: '3D ULPIN GIS Cadastral Mapping',
      description:
        'Awarded 3rd place in the internal hackathon selection for architecting a real-time 3D GIS platform that projects unique land parcel polygons onto interactive elevation meshes.',
      constraintTag: '24-Hour Rapid Engineering Sprint',
      verifiedDetails: 'Selected by technical evaluation panel for cadastral spatial accuracy & Three.js performance.',
    },
    {
      id: 'google-genai-2025',
      title: 'Google Gen AI Hackathon',
      subTitle: 'Generative AI & LLM Systems Sprint',
      badgeLabel: 'Participated',
      badgeType: 'participated',
      year: '2025',
      focusProject: 'AI Document Workflow & Extraction Engine',
      description:
        'Engineered an intelligent document analysis and prompt orchestration prototype using modern Generative AI models, competing alongside developers across practical AI challenges.',
      constraintTag: 'Competitive AI Model Integration',
      verifiedDetails: 'Built automated structured document parsing & context-aware generative pipelines.',
    },
  ];

  return (
    <section className="scene-section achievements-section" id="achievements">
      {/* Ambient background lighting */}
      <div className="achievements-ambient-glow" />

      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="achievements-header">
            <div className="eyebrow">
              <Award size={14} />
              <span>07 — COMPETITIVE RECOGNITION</span>
            </div>
            <h2 className="section-title">Built. Competed. Learned.</h2>
            <p className="section-subtitle">
              Validating technical skills under real-world hackathon constraints. Transparent participation and practical problem-solving with zero exaggerated accolades.
            </p>
          </div>
        </ScrollReveal>

        {/* Compact Visual Badges & 3D Emblem Showcase */}
        <div className="achievements-emblems-grid">
          {achievements.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 140}>
              <AchievementEmblemCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        {/* Minimal Hackathon Philosophy Footer */}
        <ScrollReveal delay={200}>
          <div className="achievements-ethos-strip">
            <Zap size={14} className="text-accent" />
            <span>
              Hackathons teach rapid decision-making, scoped architecture, and shipping functional code under strict time limits.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

interface CardProps {
  item: AchievementItem;
}

const AchievementEmblemCard: React.FC<CardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const isRank = item.badgeType === 'rank';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`achievement-emblem-card ${
        isRank ? 'emblem-card-rank' : 'emblem-card-participant'
      }`}
    >
      {/* 3D Visual Emblem Halo Header */}
      <div className="emblem-card-header">
        <div className="emblem-3d-visual">
          <div className="emblem-ring-outer">
            <div className="emblem-ring-inner">
              {isRank ? (
                <Trophy size={24} className="emblem-trophy-icon" />
              ) : (
                <Sparkles size={24} className="emblem-sparkles-icon" />
              )}
            </div>
          </div>
        </div>

        <div className="emblem-header-meta">
          <div className="emblem-badge-chip">
            <Medal size={13} />
            <span>{item.badgeLabel}</span>
          </div>
          <div className="emblem-year-chip font-mono">
            <Calendar size={12} />
            <span>{item.year}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="emblem-content-body">
        <h3 className="emblem-title">{item.title}</h3>
        <p className="emblem-subtitle font-mono">{item.subTitle}</p>

        <div className="emblem-focus-box">
          <div className="focus-label font-mono">
            {isRank ? <Layers size={12} className="text-accent" /> : <Cpu size={12} className="text-accent" />}
            <span>KEY PRODUCT: {item.focusProject}</span>
          </div>
          <p className="focus-desc">{item.description}</p>
        </div>

        {/* Constraint & Verification Pills */}
        <div className="emblem-footer-pills">
          <div className="constraint-pill font-mono">
            <span className="status-dot" />
            <span>{item.constraintTag}</span>
          </div>
          <div className="verified-pill">
            <CheckCircle2 size={13} className="text-accent" />
            <span>{item.verifiedDetails}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
