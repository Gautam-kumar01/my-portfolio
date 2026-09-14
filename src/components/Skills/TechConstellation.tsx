import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { TechConstellation3D } from './TechConstellation3D';
import { ScrollReveal } from '../UI/ScrollReveal';
import {
  Wrench,
  Sparkles,
  ArrowUpRight,
  Layers,
  Code2,
  Server,
  Database,
  Cpu,
  Cloud,
  BarChart3,
  Boxes,
} from 'lucide-react';
import './Skills.css';

interface TechConstellationProps {
  onSkillHover: (skillName: string | null) => void;
  onSelectProject: (projectId: string) => void;
}

export const TechConstellation: React.FC<TechConstellationProps> = ({
  onSkillHover,
  onSelectProject,
}) => {
  const { skillGroups, projects } = PORTFOLIO_DATA;
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    category?: string;
    linkedProjects: string[];
  } | null>(null);

  const handleMouseEnter = (skill: { name: string; linkedProjects: string[] }, category?: string) => {
    setHoveredSkill({ ...skill, category });
    onSkillHover(skill.name);
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
    onSkillHover(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code2 size={15} className="cat-icon text-accent" />;
      case 'Backend':
        return <Server size={15} className="cat-icon text-accent" />;
      case 'Database':
        return <Database size={15} className="cat-icon text-accent" />;
      case 'AI':
        return <Cpu size={15} className="cat-icon text-accent" />;
      case 'Cloud / DevOps':
        return <Cloud size={15} className="cat-icon text-accent" />;
      case 'Data / Analytics':
        return <BarChart3 size={15} className="cat-icon text-accent" />;
      case 'Tools':
        return <Boxes size={15} className="cat-icon text-accent" />;
      default:
        return <Layers size={15} className="cat-icon text-accent" />;
    }
  };

  return (
    <section className="scene-section skills-section" id="skills">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="skills-header">
            <div className="eyebrow">
              <Wrench size={14} />
              <span>05 — TECHNICAL MATRIX</span>
            </div>
            <h2 className="section-title">Tools I build with.</h2>
            <p className="section-subtitle">
              No arbitrary percentage bars or fake skill ratings. Explore the interactive 3D technology constellation to see the real-world products and platforms built with each tool.
            </p>
          </div>
        </ScrollReveal>

        {/* 3D Interactive Technology Constellation Canvas */}
        <ScrollReveal delay={100}>
          <TechConstellation3D
            hoveredSkillName={hoveredSkill?.name || null}
            onSkillHover={(skill) => {
              if (skill) {
                setHoveredSkill(skill);
                onSkillHover(skill.name);
              } else {
                setHoveredSkill(null);
                onSkillHover(null);
              }
            }}
            onSelectProject={onSelectProject}
          />
        </ScrollReveal>

        {/* Constellation Matrix Container */}
        <div className="skills-matrix-wrapper">
          {/* Active Cross-Linking Telemetry Banner */}
          <ScrollReveal delay={140}>
            <div className="skills-live-banner">
              <div className="banner-status-left">
                <Sparkles size={16} className="text-accent" />
                {hoveredSkill ? (
                  <div className="banner-skill-info">
                    <span className="banner-skill-cat font-mono">
                      {hoveredSkill.category || 'TECHNOLOGY'}:
                    </span>
                    <strong className="banner-skill-title">{hoveredSkill.name}</strong>
                  </div>
                ) : (
                  <span>Hover over any 3D node or skill badge below to view connected products</span>
                )}
              </div>

              <div className="banner-linked-projects">
                {hoveredSkill && hoveredSkill.linkedProjects.length > 0 ? (
                  <div className="linked-pills-wrap">
                    <span className="linked-label font-mono">Used In Products:</span>
                    {hoveredSkill.linkedProjects.map((pid) => {
                      const proj = projects.find((p) => p.id === pid);
                      if (!proj) return null;
                      return (
                        <button
                          key={pid}
                          onClick={() => onSelectProject(pid)}
                          className="linked-project-pill"
                          aria-label={`Open case study for ${proj.title}`}
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight size={13} />
                        </button>
                      );
                    })}
                  </div>
                ) : hoveredSkill ? (
                  <span className="no-links-text font-mono">
                    Foundational Engineering Competency
                  </span>
                ) : (
                  <span className="idle-indicator font-mono">● LIVE NETWORK SYNC ACTIVE</span>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Grouped 7 Categorized Technology Cards */}
          <ScrollReveal delay={200}>
            <div className="skills-categories-grid">
              {skillGroups.map((group) => (
                <div key={group.category} className="skill-category-card">
                  <div className="category-header">
                    {getCategoryIcon(group.category)}
                    <h3 className="category-name">{group.category}</h3>
                  </div>

                  <div className="skills-nodes-list">
                    {group.skills.map((skill) => {
                      const isSelected = hoveredSkill?.name === skill.name;
                      const hasLinks = skill.linkedProjects.length > 0;

                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onMouseEnter={() => handleMouseEnter(skill, group.category)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => {
                            if (skill.linkedProjects.length > 0) {
                              onSelectProject(skill.linkedProjects[0]);
                            }
                          }}
                          className={`skill-node ${isSelected ? 'skill-node-active' : ''} ${
                            hasLinks ? 'skill-node-linked' : ''
                          }`}
                          data-interactive="true"
                          aria-label={`Skill ${skill.name}`}
                        >
                          <span className="skill-name">{skill.name}</span>
                          {hasLinks && (
                            <span className="skill-count-badge font-mono">
                              {skill.linkedProjects.length}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
