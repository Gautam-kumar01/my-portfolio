import React, { useState } from 'react';
import type { ProjectItem } from '../../data/portfolioData';
import {
  BookOpen,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
  Award,
  Zap,
  Globe,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from '../UI/SocialIcons';
import confetti from 'canvas-confetti';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (projectId: string) => void;
  isHighlighted?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  isHighlighted,
}) => {
  const [atsScore, setAtsScore] = useState(94);
  const [isOptimized, setIsOptimized] = useState(false);
  const [activeTerminalTab, setActiveTerminalTab] = useState<'output' | 'docker'>('output');

  const handleTriggerAtsBoost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOptimized) {
      setAtsScore(99);
      setIsOptimized(true);
      try {
        confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.7 },
          colors: ['#00ff9d', '#00e5ff', '#38bdf8'],
        });
      } catch (err) {
        // silent
      }
    }
  };

  // 1. ResumeCraft Visual Preview
  const renderResumeCraftVisual = () => (
    <div className="modern-mockup-body mockup-resumecraft">
      <div className="mockup-sub-header">
        <div className="doc-pill">
          <Sparkles size={13} className="text-accent" />
          <span>Gautam_Software_Engineer.pdf</span>
        </div>
        <div className="ats-score-badge">
          <span className="ats-score-label">ATS Score:</span>
          <span className="ats-score-val font-mono">{atsScore}%</span>
        </div>
      </div>

      <div className="resumecraft-preview-grid">
        <div className="resumecraft-doc-pane">
          <div className="doc-line-name">GAUTAM KUMAR</div>
          <div className="doc-line-sub font-mono">Full-Stack Developer • React, Node.js, AI</div>
          <div className="doc-skeleton-group">
            <div className="doc-skel-line w-full" />
            <div className="doc-skel-line w-85" />
            <div className="doc-skel-line w-70" />
          </div>
          <div className="doc-skill-tags-row">
            <span className="doc-tag">React 19</span>
            <span className="doc-tag">TypeScript</span>
            <span className="doc-tag">LLM APIs</span>
          </div>
        </div>

        <div className="resumecraft-ai-pane">
          <div className="ai-feedback-header">
            <Sparkles size={12} className="text-accent" />
            <span>AI Keyword Optimization</span>
          </div>
          <p className="ai-feedback-text">
            Strong quantifiable metrics detected. ATS compatibility index is in the top 2%.
          </p>
          <button
            onClick={handleTriggerAtsBoost}
            className={`ats-boost-btn ${isOptimized ? 'ats-boosted' : ''}`}
          >
            {isOptimized ? <CheckCircle2 size={13} /> : <Zap size={13} />}
            <span>{isOptimized ? 'Optimized (99% ATS)' : 'Auto-Optimize Score'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 2. CloudLab Visual Preview
  const renderCloudLabVisual = () => (
    <div className="modern-mockup-body mockup-cloudlab">
      <div className="mockup-sub-header">
        <div className="cloud-tabs">
          <button
            onClick={() => setActiveTerminalTab('output')}
            className={`cloud-tab ${activeTerminalTab === 'output' ? 'cloud-tab-active' : ''}`}
          >
            <Terminal size={12} />
            <span>bash — session: #842</span>
          </button>
          <button
            onClick={() => setActiveTerminalTab('docker')}
            className={`cloud-tab ${activeTerminalTab === 'docker' ? 'cloud-tab-active' : ''}`}
          >
            <Cpu size={12} />
            <span>docker-container</span>
          </button>
        </div>
        <div className="cloud-status-badge">
          <span className="status-dot" />
          <span className="font-mono">ONLINE • 24ms</span>
        </div>
      </div>

      <div className="cloudlab-terminal-content font-mono">
        <div className="term-line">
          <span className="term-prompt">gautam@cloudlab:~$</span>
          <span className="term-cmd">npm run build && docker compose up -d</span>
        </div>
        <div className="term-output">
          <span className="text-accent">✓</span> Container workspace initialized successfully.
        </div>
        <div className="term-output text-muted">
          WebSocket channel established at wss://cloudlab.dev/term/stream
        </div>
        <div className="term-output">
          <span className="text-cyan">➜</span> Port 3000 mapped to https://preview-sandbox.cloudlab.dev
        </div>
        <div className="term-line term-cursor-line">
          <span className="term-prompt">gautam@cloudlab:~$</span>
          <span className="term-cursor" />
        </div>
      </div>
    </div>
  );

  // 3. SIH 3D ULPIN Visual Preview
  const renderSih3DVisual = () => (
    <div className="modern-mockup-body mockup-sih3d">
      <div className="mockup-sub-header">
        <div className="gis-title-pill">
          <Layers size={13} className="text-accent" />
          <span>Cadastral Terrain Visualizer (SIH 2026)</span>
        </div>
        <div className="gis-award-badge">
          <Award size={13} />
          <span>3rd Rank Winner</span>
        </div>
      </div>

      <div className="sih3d-preview-canvas">
        <div className="sih3d-wireframe-grid">
          <div className="gis-parcel parcel-active">
            <span className="parcel-tag font-mono">ULPIN: #8429-102</span>
            <span className="parcel-elevation">Elevation: +42.8m</span>
          </div>
          <div className="gis-parcel parcel-sec">
            <span className="parcel-tag font-mono">ULPIN: #8429-103</span>
          </div>
        </div>
        <div className="gis-telemetry-bar font-mono">
          <span>Projection: WGS84 3D</span>
          <span>Mesh: 12.4k Vertices</span>
          <span>FPS: 60</span>
        </div>
      </div>
    </div>
  );

  // 4. SkillSync Visual Preview
  const renderSkillSyncVisual = () => (
    <div className="modern-mockup-body mockup-skillsync">
      <div className="mockup-sub-header">
        <div className="doc-pill">
          <Cpu size={13} className="text-accent" />
          <span>Competency Matrix & Market Fit</span>
        </div>
        <div className="fit-badge">
          <span className="font-mono text-accent">96% Market Match</span>
        </div>
      </div>

      <div className="skillsync-bars-grid">
        <div className="skill-meter-row">
          <div className="skill-meter-labels">
            <span>Frontend & React Architecture</span>
            <span className="font-mono text-accent">98%</span>
          </div>
          <div className="skill-meter-track">
            <div className="skill-meter-fill w-98" />
          </div>
        </div>

        <div className="skill-meter-row">
          <div className="skill-meter-labels">
            <span>Node.js Backend & API Systems</span>
            <span className="font-mono text-cyan">94%</span>
          </div>
          <div className="skill-meter-track">
            <div className="skill-meter-fill w-94 fill-cyan" />
          </div>
        </div>

        <div className="skill-meter-row">
          <div className="skill-meter-labels">
            <span>AI APIs & LLM Prompt Pipelines</span>
            <span className="font-mono text-purple">92%</span>
          </div>
          <div className="skill-meter-track">
            <div className="skill-meter-fill w-92 fill-purple" />
          </div>
        </div>
      </div>
    </div>
  );

  // 5. HunarHub Visual Preview
  const renderHunarHubVisual = () => (
    <div className="modern-mockup-body mockup-hunarhub">
      <div className="mockup-sub-header">
        <div className="doc-pill">
          <Globe size={13} className="text-accent" />
          <span>Student Talent & Project Network</span>
        </div>
        <div className="hunar-badge">
          <span className="font-mono">MVP Platform</span>
        </div>
      </div>

      <div className="hunarhub-cards-preview">
        <div className="hunar-project-mini-card">
          <div className="hunar-card-top">
            <span className="hunar-card-title">Cloud Infrastructure Sandbox</span>
            <span className="badge-pill">B.C.A</span>
          </div>
          <p className="hunar-card-desc">Peer collaboration & verified GitHub project repository showcase.</p>
          <div className="hunar-tags">
            <span>Full-Stack</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article
      className={`modern-project-card ${isHighlighted ? 'project-card-highlighted' : ''}`}
      style={{ '--project-accent': project.accentColor } as React.CSSProperties}
    >
      {/* 1. Left: High-Fidelity Browser Mockup Window */}
      <div className="project-mockup-frame">
        {/* Browser Mac Topbar */}
        <div className="mockup-topbar">
          <div className="mockup-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="mockup-url-bar font-mono">
            <span className="url-lock">🔒</span>
            <span className="url-text">
              {project.liveUrl ? project.liveUrl.replace('https://', '') : `${project.id}.preview`}
            </span>
          </div>
          <div className="mockup-status-dot" title="Working Project">
            <span className="status-dot" />
          </div>
        </div>

        {/* Dynamic Mockup Body */}
        {project.visualType === 'resumecraft' && renderResumeCraftVisual()}
        {project.visualType === 'cloudlab' && renderCloudLabVisual()}
        {project.visualType === 'sih3d' && renderSih3DVisual()}
        {project.visualType === 'skillsync' && renderSkillSyncVisual()}
        {project.visualType === 'hunarhub' && renderHunarHubVisual()}
      </div>

      {/* 2. Right: Clean, Structured Project Details */}
      <div className="project-info-pane">
        <div className="project-category-row">
          <span className="project-category-badge font-mono">{project.category}</span>
          <span className="project-index font-mono">0{project.number}</span>
        </div>

        <h3 className="project-title-heading">{project.title}</h3>
        <p className="project-tagline-text">{project.tagline}</p>
        <p className="project-summary-text">{project.summary}</p>

        {/* Tech Stack Pills */}
        <div className="project-tech-pills">
          {project.tags.map((t) => (
            <span key={t} className="tech-pill-tag">
              {t}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="project-action-buttons">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent project-btn-primary"
              title={`Open live project ${project.title}`}
            >
              <span>Live Product</span>
              <ArrowUpRight size={15} />
            </a>
          )}

          {project.hasCaseStudy && (
            <button
              onClick={() => onOpenCaseStudy(project.id)}
              className="btn-secondary project-btn-secondary"
              title="Inspect architectural breakdown"
            >
              <BookOpen size={14} />
              <span>Case Study</span>
            </button>
          )}

          <a
            href={project.githubUrl || 'https://github.com/Gautam-kumar01'}
            target="_blank"
            rel="noopener noreferrer"
            className="project-github-btn"
            title="View source code on GitHub"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </article>
  );
};
