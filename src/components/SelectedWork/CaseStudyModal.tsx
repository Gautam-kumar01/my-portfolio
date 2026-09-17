import React, { useEffect } from 'react';
import { CASE_STUDIES } from '../../data/caseStudies';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Globe,
  Activity,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../UI/SocialIcons';
import './CaseStudyModal.css';

interface CaseStudyModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ projectId, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (projectId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectId, onClose]);

  if (!projectId || !CASE_STUDIES[projectId]) return null;

  const study = CASE_STUDIES[projectId];

  return (
    <div className="case-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="case-modal-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="case-modal-topbar">
          <div className="case-category-pill">
            <span className="pill-dot" />
            <span>{study.category}</span>
          </div>

          <button
            onClick={onClose}
            className="case-modal-close-btn"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Header */}
        <div className="case-modal-header">
          <div className="case-product-tag">
            <Sparkles size={14} className="text-accent" />
            <span>PRODUCT CASE STUDY</span>
          </div>
          <h2 className="case-modal-title">{study.title}</h2>
          <p className="case-modal-subtitle">{study.subtitle}</p>

          <div className="case-links-row">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent case-action-btn"
              >
                <Globe size={15} />
                <span>Visit Live Product</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {study.githubUrl && (
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary case-action-btn"
              >
                <GithubIcon size={15} />
                <span>View Repository</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Case Study Body Content */}
        <div className="case-modal-body">
          {/* 1. Problem Definition */}
          <section className="case-section">
            <div className="case-section-header">
              <div className="case-step-num font-mono">01</div>
              <h3 className="case-section-title">The Problem</h3>
            </div>
            <div className="case-callout-box problem-box">
              <p>{study.problem}</p>
            </div>
          </section>

          {/* 2. Engineering Approach & Solution */}
          <section className="case-section">
            <div className="case-section-header">
              <div className="case-step-num font-mono">02</div>
              <h3 className="case-section-title">Approach & Architectural Design</h3>
            </div>
            <div className="case-callout-box approach-box">
              <p>{study.approach}</p>
            </div>
          </section>

          {/* 3. What Was Built */}
          <section className="case-section">
            <div className="case-section-header">
              <div className="case-step-num font-mono">03</div>
              <h3 className="case-section-title">What I Built</h3>
            </div>
            <div className="case-built-grid">
              {study.whatIBuilt.map((item, idx) => (
                <div key={idx} className="built-item-card">
                  <CheckCircle2 size={16} className="built-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Architecture Highlights */}
          {study.architectureHighlights && study.architectureHighlights.length > 0 && (
            <section className="case-section">
              <div className="case-section-header">
                <div className="case-step-num font-mono">04</div>
                <h3 className="case-section-title">Key Architectural Decisions</h3>
              </div>
              <div className="case-arch-grid">
                {study.architectureHighlights.map((arch, idx) => (
                  <div key={idx} className="arch-card">
                    <div className="arch-card-header">
                      <Cpu size={14} className="text-accent" />
                      <h4>{arch.title}</h4>
                    </div>
                    <p>{arch.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Technology Stack */}
          <section className="case-section">
            <div className="case-section-header">
              <div className="case-step-num font-mono">05</div>
              <h3 className="case-section-title">Technologies Used</h3>
            </div>
            <div className="case-tech-tags">
              {study.technologies.map((tech) => (
                <span key={tech} className="tech-badge font-mono">
                  <Layers size={13} className="badge-icon" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </section>

          {/* 6. Current Status */}
          <section className="case-section">
            <div className="case-section-header">
              <div className="case-step-num font-mono">06</div>
              <h3 className="case-section-title">Current Status</h3>
            </div>
            <div className="case-status-card">
              <Activity size={16} className="text-accent" />
              <span>{study.currentStatus}</span>
            </div>
          </section>
        </div>

        {/* Modal Bottom Close */}
        <div className="case-modal-footer">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent modal-live-bottom"
            >
              <span>Visit {study.title} ({study.liveUrl.replace('https://', '')})</span>
              <ArrowUpRight size={14} />
            </a>
          )}
          <button onClick={onClose} className="btn-secondary modal-close-bottom">
            <span>Close Case Study</span>
          </button>
        </div>
      </div>
    </div>
  );
};
