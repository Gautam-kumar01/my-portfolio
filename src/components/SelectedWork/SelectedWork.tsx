import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from '../UI/ScrollReveal';
import { Code2, Sparkles, Filter } from 'lucide-react';
import './SelectedWork.css';

type FilterCategory = 'All' | 'AI' | 'Web' | 'Cloud' | '3D/GIS';

interface SelectedWorkProps {
  onOpenCaseStudy: (projectId: string) => void;
  activeSkillHighlight?: string | null;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onOpenCaseStudy,
  activeSkillHighlight,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');

  const filterOptions: FilterCategory[] = ['All', 'AI', 'Web', 'Cloud', '3D/GIS'];

  // Filter projects based on the active category
  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.filterCategories.includes(activeFilter as any);
  });

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All') return PORTFOLIO_DATA.projects.length;
    return PORTFOLIO_DATA.projects.filter((p) =>
      p.filterCategories.includes(category as any)
    ).length;
  };

  return (
    <section className="scene-section selected-work-section" id="projects">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="selected-work-header">
            <div className="eyebrow">
              <Code2 size={14} />
              <span>01 — PROJECTS & PLATFORMS</span>
            </div>
            <h2 className="section-title">Things I've built.</h2>
            <p className="section-subtitle">
              Real products, experiments and platforms built to solve real problems.
            </p>
          </div>
        </ScrollReveal>

        {/* Project Filtering Controls */}
        <ScrollReveal delay={80}>
          <div className="projects-filter-bar">
            <div className="filter-label-wrap">
              <Filter size={14} className="text-accent" />
              <span>Filter By Domain:</span>
            </div>
            <div className="filter-pills-row" role="tablist">
              {filterOptions.map((cat) => {
                const isActive = activeFilter === cat;
                const count = getCategoryCount(cat);

                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(cat)}
                    className={`filter-pill-btn ${isActive ? 'filter-pill-active' : ''}`}
                  >
                    <span>{cat}</span>
                    <span className="filter-count-badge font-mono">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Cinematic Vertical Showcase */}
        <div className="projects-vertical-stack">
          {filteredProjects.map((project, idx) => {
            const isHighlighted =
              Boolean(activeSkillHighlight) &&
              project.tags.some(
                (t) =>
                  t.toLowerCase().includes((activeSkillHighlight || '').toLowerCase()) ||
                  (activeSkillHighlight || '').toLowerCase().includes(t.toLowerCase())
              );

            return (
              <ScrollReveal key={project.id} delay={idx * 80}>
                <ProjectCard
                  project={project}
                  onOpenCaseStudy={onOpenCaseStudy}
                  isHighlighted={isHighlighted}
                />
              </ScrollReveal>
            );
          })}
        </div>

        <div className="selected-work-footer-note">
          <Sparkles size={14} className="text-accent" />
          <span>Each platform was engineered with custom architectures, verified state management, and real database workflows.</span>
        </div>
      </div>
    </section>
  );
};
