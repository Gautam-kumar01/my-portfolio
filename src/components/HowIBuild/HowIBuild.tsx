import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ScrollReveal } from '../UI/ScrollReveal';
import {
  GitBranch,
  Lightbulb,
  Palette,
  Hammer,
  RotateCw,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import './HowIBuild.css';

export const HowIBuild: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2); // default to 'BUILD'
  const steps = PORTFOLIO_DATA.processSteps;

  const stepIcons = [
    <Lightbulb key="0" size={18} />,
    <Palette key="1" size={18} />,
    <Hammer key="2" size={18} />,
    <RotateCw key="3" size={18} />,
    <Rocket key="4" size={18} />,
  ];

  return (
    <section className="scene-section how-i-build-section" id="process">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="how-i-build-header">
            <div className="eyebrow">
              <GitBranch size={14} />
              <span>02 — ENGINEERING PHILOSOPHY</span>
            </div>
            <h2 className="section-title">From idea to working product.</h2>
            <p className="section-subtitle">
              Gautam doesn't just write code — he enters an idea, architects the system,
              builds the full-stack foundation, stress-tests edge cases, and ships resilient software.
            </p>
          </div>
        </ScrollReveal>

        {/* 5-Node Interactive Progressive Path */}
        <ScrollReveal delay={150}>
          <div className="process-pipeline-wrapper">
          {/* Connecting Active Progress Line */}
          <div className="pipeline-track">
            <div
              className="pipeline-fill"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* 5 Interactive Step Nodes */}
          <div className="pipeline-nodes-row">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPassed = idx < activeStep;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`pipeline-node-btn ${isActive ? 'node-active' : ''} ${
                    isPassed ? 'node-passed' : ''
                  }`}
                  aria-label={`Step ${step.step}: ${step.title}`}
                >
                  <div className="node-circle">
                    {stepIcons[idx]}
                    {isActive && <div className="node-pulse-ring" />}
                  </div>
                  <div className="node-label-wrap">
                    <span className="node-step-num">{step.step}</span>
                    <span className="node-step-title">{step.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Card */}
          <div className="pipeline-detail-card">
            <div className="detail-card-header">
              <div className="detail-num-badge">
                <span>PHASE {steps[activeStep].step}</span>
              </div>
              <span className="detail-action-pill">{steps[activeStep].actionTag}</span>
            </div>

            <h3 className="detail-title">{steps[activeStep].title} — {steps[activeStep].subtitle}</h3>
            <p className="detail-desc">{steps[activeStep].details}</p>

            <div className="detail-card-footer">
              <div className="stepper-dots">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`stepper-dot ${i === activeStep ? 'stepper-dot-active' : ''}`}
                  />
                ))}
              </div>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="btn-secondary next-step-btn"
                >
                  <span>Next: {steps[activeStep + 1].title}</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep(0)}
                  className="btn-secondary next-step-btn"
                >
                  <span>Restart Journey (01 IDEA)</span>
                  <RotateCw size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
};
