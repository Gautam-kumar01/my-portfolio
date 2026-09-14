import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ArrowUpRight, Sparkles, Users, Cpu } from 'lucide-react';
import { GithubIcon } from '../UI/SocialIcons';
import { ScrollReveal } from '../UI/ScrollReveal';
import './OtherProjects.css';

interface OtherProjectsProps {
  onOpenCaseStudy: (projectId: string) => void;
  activeSkillHighlight?: string | null;
}

export const OtherProjects: React.FC<OtherProjectsProps> = ({
  onOpenCaseStudy,
  activeSkillHighlight,
}) => {
  const otherProjects = PORTFOLIO_DATA.projects.filter((p) => !p.featured);

  return (
    <section className="other-projects-section">
      <div className="container">
        <ScrollReveal>
          <div className="other-projects-header">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>MORE BUILDS & PLATFORMS</span>
            </div>
            <h3 className="other-projects-title">Additional Experiments & Community Systems</h3>
          </div>
        </ScrollReveal>

        <div className="other-projects-grid">
          {otherProjects.map((project, idx) => {
            const isHighlighted =
              Boolean(activeSkillHighlight) &&
              project.tags.some(
                (t) =>
                  t.toLowerCase().includes((activeSkillHighlight || '').toLowerCase()) ||
                  (activeSkillHighlight || '').toLowerCase().includes(t.toLowerCase())
              );

            return (
              <ScrollReveal key={project.id} delay={idx * 120}>
                <div
                  className={`other-project-card ${
                    isHighlighted ? 'other-card-highlighted' : ''
                  }`}
                  onClick={() => onOpenCaseStudy(project.id)}
                  data-cursor-label="VIEW"
                >
                <div className="other-card-top">
                  <div className="other-card-category-row">
                    <span className="other-category-tag">{project.category}</span>
                    <span className="other-num">{project.number}</span>
                  </div>

                  <div className="other-icon-wrap">
                    {project.id === 'skillsync' ? (
                      <Cpu size={22} className="other-icon-purple" />
                    ) : (
                      <Users size={22} className="other-icon-amber" />
                    )}
                  </div>

                  <h4 className="other-title">{project.title}</h4>
                  <p className="other-tagline">{project.tagline}</p>
                  <p className="other-desc">{project.summary}</p>
                </div>

                <div className="other-card-bottom">
                  <div className="other-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="other-actions-row">
                    <button
                      className="other-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCaseStudy(project.id);
                      }}
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={14} />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="other-code-link"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Source code for ${project.title}`}
                      >
                        <GithubIcon size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>
    </section>
  );
};
