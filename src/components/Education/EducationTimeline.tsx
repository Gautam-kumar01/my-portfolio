import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../UI/ScrollReveal';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import './Education.css';

export const EducationTimeline: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section className="scene-section education-section" id="education">
      <div className="container">
        {/* Header */}
        <ScrollReveal>
          <div className="education-header">
            <div className="eyebrow">
              <GraduationCap size={14} />
              <span>04 — ACADEMIC JOURNEY</span>
            </div>
            <h2 className="section-title">Education & Milestones</h2>
            <p className="section-subtitle">
              Formal foundations in computer applications, mathematics, and software engineering.
            </p>
          </div>
        </ScrollReveal>

        {/* Minimal 3-Milestone Vertical Timeline */}
        <div className="education-timeline-track">
          {education.map((item, index) => {
            const isCurrent = item.status === 'current';

            return (
              <ScrollReveal key={index} delay={index * 120}>
                <div
                  className={`timeline-milestone-item ${
                    isCurrent ? 'milestone-current' : ''
                  }`}
                >
                  {/* Milestone Node */}
                  <div className="milestone-marker">
                    <div className="marker-dot">
                      {isCurrent && <span className="marker-active-pulse" />}
                    </div>
                    {index < education.length - 1 && <div className="marker-line" />}
                  </div>

                  {/* Milestone Content Card */}
                  <div className="milestone-content-card">
                    <div className="milestone-year-row">
                      <div className="milestone-year-badge">
                        <Calendar size={12} />
                        <span>{item.year}</span>
                      </div>
                      {isCurrent && (
                        <span className="current-program-pill">
                          <span className="status-dot" />
                          <span>CURRENT ENROLLMENT</span>
                        </span>
                      )}
                    </div>

                    <h3 className="milestone-degree">{item.degree}</h3>

                    <div className="milestone-institution-row">
                      <span className="institution-name">{item.institution}</span>
                      {item.location && (
                        <span className="institution-location">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>

                    <p className="milestone-desc">{item.description}</p>
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
