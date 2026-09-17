import React, { useState, useRef } from 'react';
import type { ProjectItem } from '../../data/portfolioData';
import {
  ArrowUpRight,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
  Play,
  FileText,
  Cpu,
  MapPin,
  ExternalLink,
  Users,
  Award,
  BookOpen,
  Compass,
  Radar,
  Activity,
  GitBranch,
  Zap,
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
  const cardRef = useRef<HTMLElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [atsScore, setAtsScore] = useState(94);
  const [isOptimized, setIsOptimized] = useState(false);

  // 3D Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4; // Max -4 to +4 deg
    const rotateY = ((x - centerX) / centerX) * 4;  // Max -4 to +4 deg

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s ease-out',
    });
  };

  const handleTriggerAtsBoost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOptimized) {
      setAtsScore(98);
      setIsOptimized(true);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00ff66', '#10b981', '#3b82f6'],
        });
      } catch (err) {
        // silent fallback
      }
    }
  };

  // --- Visual Preview 1: ResumeCraft Interactive Document ---
  const renderResumeCraftVisual = () => {
    return (
      <div className="project-visual-surface visual-resumecraft">
        <div className="resumecraft-header">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="resumecraft-tab">
            <FileText size={12} className="tab-icon" />
            <span>ResumeCraft — AI Resume Optimizer</span>
          </div>

          <a
            href="https://resumecraft.co.in"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="header-live-link font-mono"
            title="Open ResumeCraft live site"
          >
            <span className="status-dot" />
            <span>resumecraft.co.in</span>
            <ExternalLink size={11} />
          </a>
        </div>

        <div className="resumecraft-body">
          {/* Left: Interactive Document Paper */}
          <div className="resume-paper-preview">
            <div className="paper-header">
              <div className="paper-name">GAUTAM KUMAR</div>
              <div className="paper-sub">FULL-STACK DEVELOPER • AMITY UNIVERSITY</div>
            </div>
            <div className="paper-divider" />
            <div className="paper-section">
              <div className="paper-section-title">CORE COMPETENCIES</div>
              <div className="paper-tags">
                <span>React 19</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
                <span>AI Prompt Pipelines</span>
              </div>
            </div>
            <div className="paper-section">
              <div className="paper-section-title">FEATURED PRODUCTS</div>
              <div className="paper-project-item">
                <span className="item-title">ResumeCraft & CloudLab</span>
                <span className="item-desc">
                  AI ATS resume optimization engine & browser-based cloud terminal sandbox.
                </span>
              </div>
            </div>

            <div className="paper-live-footer">
              <span className="ats-score-live font-mono">
                ATS Score: <strong className="text-accent">{atsScore}/100</strong>
              </span>
              <button
                type="button"
                onClick={handleTriggerAtsBoost}
                className="btn-ats-boost font-mono"
              >
                <Sparkles size={11} />
                <span>{isOptimized ? '✓ Optimized to 98%' : 'Simulate ATS AI Boost'}</span>
              </button>
            </div>
          </div>

          {/* Right: AI Feedback Pane */}
          <div className="resume-ai-feedback">
            <div className="feedback-title">
              <Sparkles size={13} className="text-accent" />
              <span>AI ATS Engine Analysis</span>
            </div>
            <div className="feedback-item feedback-success">
              <CheckCircle2 size={13} />
              <span>98% Keyword Match for Full-Stack Roles</span>
            </div>
            <div className="feedback-item feedback-success">
              <CheckCircle2 size={13} />
              <span>Quantifiable production impact verified</span>
            </div>
            <div className="feedback-item feedback-suggestion">
              <Cpu size={13} />
              <span>Tailored: Highlighting Docker & PostgreSQL</span>
            </div>

            <div className="feedback-direct-action">
              <a
                href="https://resumecraft.co.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-launch-live-app font-mono"
              >
                <Zap size={12} className="text-accent" />
                <span>Launch Live App ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Visual Preview 2: CloudLab Interactive Terminal Sandbox ---
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'cloudlab@sandbox:~$ init workspace --node-runtime=v22',
    '[OK] Container sandbox initialized in 38ms',
    '[OK] WebSocket stream connected at wss://cloudlab.dev/session',
    'cloudlab@sandbox:~$ ready for execution. Click quick commands below:',
  ]);
  const [termInput, setTermInput] = useState('');

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    let reply = `[EXEC] '${cmd}' executed successfully.`;

    if (cmd.includes('help')) {
      reply = 'Available commands: run, build, status, deploy, test, clear';
    } else if (cmd.includes('clear')) {
      setTerminalOutput(['cloudlab@sandbox:~$ terminal cleared.']);
      setTermInput('');
      return;
    } else if (cmd.includes('status')) {
      reply = 'System Status: All services operational. Latency: 14ms. Memory: 142MB / 1GB. Node: v22.4';
    } else if (cmd.includes('build')) {
      reply = '[BUILD] Bundle optimized: 0 errors, 5 assets compiled (184kb total) in 1.4s';
    } else if (cmd.includes('test')) {
      reply = '[TEST] 18 passed, 0 failed. All test suites green in 120ms.';
    } else if (cmd.includes('run')) {
      reply = '[RUN] Server listening on http://localhost:8080 (Process ID: 4192)';
    }

    setTerminalOutput((prev) => [...prev, `cloudlab@sandbox:~$ ${rawCmd}`, reply]);
    setTermInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput.trim()) return;
    executeCommand(termInput);
  };

  const renderCloudLabVisual = () => {
    return (
      <div className="project-visual-surface visual-cloudlab">
        <div className="cloudlab-header">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="cloudlab-tab">
            <Terminal size={12} />
            <span>cloudlab-terminal — bash sandbox</span>
          </div>
          <div className="cloudlab-status">
            <span className="status-dot" />
            <span>LIVE SANDBOX ACTIVE</span>
          </div>
        </div>

        <div className="cloudlab-terminal-body">
          <div className="terminal-logs">
            {terminalOutput.map((line, idx) => (
              <div key={idx} className="terminal-log-line">
                {line}
              </div>
            ))}
          </div>

          {/* Clickable Quick Command Chips */}
          <div className="terminal-quick-chips">
            <span className="chips-label font-mono">Quick Run:</span>
            {['status', 'build', 'test', 'run', 'clear'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="chip-btn font-mono"
              >
                {cmd}
              </button>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="terminal-prompt-form" onClick={(e) => e.stopPropagation()}>
            <span className="prompt-label">cloudlab@sandbox:~$</span>
            <input
              type="text"
              value={termInput}
              onChange={(e) => setTermInput(e.target.value)}
              placeholder="type a command or click a quick run chip..."
              className="terminal-input"
            />
            <button type="submit" className="terminal-run-btn" aria-label="Run command">
              <Play size={11} />
            </button>
          </form>
        </div>
      </div>
    );
  };

  // --- Visual Preview 3: SIH 2026 — 3D ULPIN GIS Parcel Map ---
  const [selectedParcel, setSelectedParcel] = useState({
    ulpin: 'ULPIN-2026-IN-884920',
    owner: 'Cadastral Zone A-4',
    area: '1,420 sq.m (Elevation 142m)',
    status: 'Verified Spatial Title',
    elevation: '+18.4m',
  });

  const renderSIH3DVisual = () => {
    return (
      <div className="project-visual-surface visual-sih3d">
        <div className="sih-header">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="sih-title-tab">
            <Layers size={12} />
            <span>3D ULPIN GIS Cadastral Elevation Map</span>
          </div>
          <div className="sih-badge">
            <Award size={11} />
            <span>SIH 3RD RANK</span>
          </div>
        </div>

        <div className="sih-body">
          {/* 3D Wireframe Cadastral Map Grid Visualizer */}
          <div className="sih-map-canvas-mock">
            <div className="gis-grid-overlay">
              <div className="gis-contour-lines" />
              {/* Interactive 3D Cadastral Parcels */}
              <div
                className={`gis-parcel parcel-1 ${selectedParcel.ulpin.includes('884') ? 'parcel-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedParcel({
                    ulpin: 'ULPIN-2026-IN-884920',
                    owner: 'Cadastral Zone A-4',
                    area: '1,420 sq.m (Elevation 142m)',
                    status: 'Verified Spatial Title',
                    elevation: '+18.4m',
                  });
                }}
              >
                <div className="parcel-label">Parcel #884</div>
              </div>
              <div
                className={`gis-parcel parcel-2 ${selectedParcel.ulpin.includes('992') ? 'parcel-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedParcel({
                    ulpin: 'ULPIN-2026-IN-992014',
                    owner: 'Cadastral Sector B-1',
                    area: '3,850 sq.m (Elevation 160m)',
                    status: 'Government Surveyed',
                    elevation: '+32.1m',
                  });
                }}
              >
                <div className="parcel-label">Parcel #992</div>
              </div>
              <div
                className={`gis-parcel parcel-3 ${selectedParcel.ulpin.includes('441') ? 'parcel-active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedParcel({
                    ulpin: 'ULPIN-2026-IN-441029',
                    owner: 'Commercial Zone C',
                    area: '5,200 sq.m (Elevation 135m)',
                    status: 'Spatial Title Active',
                    elevation: '+12.0m',
                  });
                }}
              >
                <div className="parcel-label">Parcel #441</div>
              </div>
            </div>

            <div className="gis-coordinates-hud font-mono">
              <span>LAT: 28.6139° N</span>
              <span>LON: 77.2090° E</span>
              <span>ELEV: {selectedParcel.elevation}</span>
            </div>
          </div>

          {/* Right: Selected Parcel HUD Inspector */}
          <div className="sih-inspector-panel">
            <div className="inspector-heading">
              <MapPin size={13} className="text-accent" />
              <span>Spatial Metadata HUD</span>
            </div>
            <div className="inspector-item">
              <span className="item-label">ULPIN CODE</span>
              <span className="item-val font-mono">{selectedParcel.ulpin}</span>
            </div>
            <div className="inspector-item">
              <span className="item-label">ZONE / SECTOR</span>
              <span className="item-val">{selectedParcel.owner}</span>
            </div>
            <div className="inspector-item">
              <span className="item-label">SURFACE AREA</span>
              <span className="item-val">{selectedParcel.area}</span>
            </div>
            <div className="inspector-status-badge">
              <CheckCircle2 size={12} />
              <span>{selectedParcel.status}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Visual Preview 4: SkillSync AI Resume & Portfolio Competency Matrix ---
  const renderSkillSyncVisual = () => {
    return (
      <div className="project-visual-surface visual-skillsync">
        <div className="skillsync-header">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="skillsync-tab">
            <Radar size={12} className="text-accent" />
            <span>SkillSync — Competency & Role Opportunity Analyzer</span>
          </div>
          <div className="skillsync-match-badge">
            <span>89% MATCH FIT</span>
          </div>
        </div>

        <div className="skillsync-body">
          <div className="skillsync-matrix-col">
            <div className="matrix-title">
              <Activity size={13} className="text-accent" />
              <span>Candidate Skill Breakdown</span>
            </div>
            <div className="skill-meter-row">
              <div className="meter-label">
                <span>Frontend & UI (React 19 / TypeScript)</span>
                <span className="font-mono">92%</span>
              </div>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '92%' }} /></div>
            </div>
            <div className="skill-meter-row">
              <div className="meter-label">
                <span>Backend & APIs (Node / Python)</span>
                <span className="font-mono">86%</span>
              </div>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '86%' }} /></div>
            </div>
            <div className="skill-meter-row">
              <div className="meter-label">
                <span>Database & Systems (PostgreSQL / Docker)</span>
                <span className="font-mono">80%</span>
              </div>
              <div className="meter-bar"><div className="meter-fill" style={{ width: '80%' }} /></div>
            </div>
          </div>

          <div className="skillsync-recs-col">
            <div className="recs-title">
              <Compass size={13} className="text-accent" />
              <span>Career Roadmap Recommendations</span>
            </div>
            <div className="rec-card">
              <div className="rec-badge">High Impact</div>
              <p>PostgreSQL indexing & connection pooling benchmarks to elevate full-stack authority.</p>
            </div>
            <div className="rec-card">
              <div className="rec-badge">Next Step</div>
              <p>Autonomous LLM structured output parsing workflows.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Visual Preview 5: HunarHub Student Talent & Collaboration Hub ---
  const renderHunarHubVisual = () => {
    return (
      <div className="project-visual-surface visual-hunarhub">
        <div className="hunarhub-header">
          <div className="window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-amber" />
            <span className="dot dot-green" />
          </div>
          <div className="hunarhub-tab">
            <Users size={12} className="text-accent" />
            <span>HunarHub — Student Projects & Peer Collaboration Hub</span>
          </div>
          <div className="hunarhub-badge">
            <span>COMMUNITY MVP</span>
          </div>
        </div>

        <div className="hunarhub-body">
          <div className="hunar-cards-row">
            {/* Student Project 1 */}
            <div className="hunar-mini-card">
              <div className="mini-card-badge">
                <Sparkles size={11} />
                <span>Verified Builder</span>
              </div>
              <h5>Autonomous Logistics Tracker</h5>
              <p>Student IoT & route optimizer built with Python & WebSockets.</p>
              <div className="mini-card-tags">
                <span>Python</span>
                <span>IoT</span>
              </div>
            </div>

            {/* Student Project 2 */}
            <div className="hunar-mini-card">
              <div className="mini-card-badge badge-hackathon">
                <GitBranch size={11} />
                <span>Hackathon Team</span>
              </div>
              <h5>AI Document Summarizer</h5>
              <p>Peer collaboration project matching frontend and backend builders.</p>
              <div className="mini-card-tags">
                <span>React</span>
                <span>OpenAI</span>
              </div>
            </div>
          </div>

          <div className="hunar-hub-footer-strip">
            <div className="strip-item">
              <BookOpen size={13} className="text-accent" />
              <span>Verified Student Badges</span>
            </div>
            <div className="strip-item">
              <Users size={13} className="text-accent" />
              <span>Peer Hackathon Matchmaking</span>
            </div>
            <div className="strip-item">
              <Sparkles size={13} className="text-accent" />
              <span>Internship Portals</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hasLiveUrl = Boolean(project.liveUrl);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`project-cinematic-card ${
        isHighlighted ? 'project-card-highlighted' : ''
      } ${hasLiveUrl ? 'project-has-live-url' : ''}`}
      data-cursor-label="VIEW"
    >
      {/* Visual Product Showcase (60-65% Dominance) */}
      <div className="project-visual-container" onClick={() => onOpenCaseStudy(project.id)}>
        {project.visualType === 'resumecraft' && renderResumeCraftVisual()}
        {project.visualType === 'cloudlab' && renderCloudLabVisual()}
        {project.visualType === 'sih3d' && renderSIH3DVisual()}
        {project.visualType === 'skillsync' && renderSkillSyncVisual()}
        {project.visualType === 'hunarhub' && renderHunarHubVisual()}

        <div className="visual-hover-overlay">
          <span className="hover-badge">
            <ArrowUpRight size={16} />
            <span>Inspect Architecture & Details</span>
          </span>
        </div>
      </div>

      {/* Project Meta Information (35-40% Width) */}
      <div className="project-meta-container">
        <div className="project-number-row">
          <span className="project-number font-mono">{project.number}</span>
          <span className="project-category">{project.category}</span>
        </div>

        {/* Live Status Badge */}
        <div className="project-status-row">
          <span className="status-dot" />
          <span className="project-status-text">{project.status}</span>
          {hasLiveUrl && (
            <span className="live-pill-tag font-mono">
              <Zap size={11} />
              <span>LIVE WORKING APP</span>
            </span>
          )}
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-summary">{project.summary}</p>

        {/* Tags */}
        <div className="project-tags-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-accent">
              {tag}
            </span>
          ))}
        </div>

        {/* Action CTAs: Distinct, Glowing, Working Live Buttons */}
        <div className="project-card-actions">
          {/* Primary Action Button */}
          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent btn-live-working-primary"
              aria-label={`Launch live working app for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="live-btn-inner">
                <span className="live-btn-beacon" />
                <span className="live-btn-text">Visit Live Product</span>
                <ArrowUpRight size={16} className="live-btn-icon" />
              </div>
            </a>
          ) : (
            <button
              onClick={() => onOpenCaseStudy(project.id)}
              className="btn-accent project-view-btn"
              aria-label={`View ${project.title} Case Study`}
            >
              <Sparkles size={15} />
              <span>View Case Study</span>
              <ArrowUpRight size={15} />
            </button>
          )}

          {/* Deep Case Study Button */}
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="btn-secondary project-detail-btn"
            aria-label={`Inspect ${project.title} Details`}
          >
            <span>Architecture</span>
          </button>

          {/* GitHub source button */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-code-btn"
              aria-label={`Source code for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
              <ExternalLink size={12} className="code-ext-icon" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
