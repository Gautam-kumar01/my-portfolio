import React, { useState, useRef } from 'react';
import { ScrollReveal } from '../UI/ScrollReveal';
import { MagneticButton } from '../UI/MagneticButton';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowUpRight,
  Terminal,
  MessageSquare,
  AlertCircle,
  Globe,
  Zap,
} from 'lucide-react';
import './ContactCTA.css';

interface ContactCTAProps {
  onShowToast: (message: string) => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onShowToast }) => {
  const email = 'gautamkr192007@gmail.com';
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    onShowToast(`Copied ${email} to clipboard!`);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWorkTogether = () => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    onShowToast('Ready! Enter your details to start our collaboration.');
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formState.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formState.message.trim()) {
      errors.message = 'Please enter a brief message or project description.';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast('Message prepared! Opening your email client...');
      window.location.href = `mailto:${email}?subject=Project Collaboration: ${encodeURIComponent(
        formState.name
      )}&body=${encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nProject Details:\n${formState.message}`
      )}`;
    }, 600);
  };

  return (
    <section className="scene-section contact-cta-section" id="contact">
      {/* Animated Connecting Laser Spine leading into the contact hub */}
      <div className="contact-connector-laser">
        <div className="laser-beam" />
        <div className="laser-node-glow" />
      </div>

      {/* 3D Digital Workspace / Glowing Network Background */}
      <div className="cta-network-bg">
        <div className="network-ambient-orb orb-1" />
        <div className="network-ambient-orb orb-2" />
        <div className="network-mesh-grid" />
      </div>

      <div className="container contact-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="contact-headline-wrap">
            <div className="eyebrow cta-eyebrow">
              <Sparkles size={14} />
              <span>08 — CONTACT & COLLABORATION</span>
            </div>

            <h2 className="cta-main-heading">
              Let's build something <span className="text-accent">meaningful.</span>
            </h2>

            <p className="cta-subtitle">
              Have an idea, project or opportunity? Let's turn it into something real.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Contact Hub */}
        <div className="contact-hub-grid">
          {/* Direct Workspace Communications Terminal */}
          <ScrollReveal delay={100}>
            <div className="contact-direct-card">
              <div className="direct-card-topbar">
                <div className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-amber" />
                  <span className="dot dot-green" />
                </div>
                <div className="direct-terminal-title font-mono">
                  <Terminal size={12} />
                  <span>gautam_inbox.sh</span>
                </div>
              </div>

              <div className="direct-card-content">
                <span className="direct-label font-mono">DIRECT EMAIL INBOX</span>
                
                <div className="email-display-card">
                  <div className="email-meta-left">
                    <Mail size={18} className="text-accent" />
                    <span className="email-text font-mono">{email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="copy-mini-btn"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="direct-action-buttons">
                  <MagneticButton strength={15}>
                    <a
                      href={`mailto:${email}?subject=Project Collaboration Inquiry`}
                      className="btn-accent direct-primary-btn"
                      aria-label="Send me an email"
                    >
                      <Mail size={16} />
                      <span>Send me an email</span>
                      <ArrowUpRight size={15} />
                    </a>
                  </MagneticButton>

                  <MagneticButton strength={12}>
                    <button
                      onClick={handleWorkTogether}
                      className="btn-secondary direct-secondary-btn"
                      aria-label="Let's work together"
                    >
                      <Zap size={15} className="text-accent" />
                      <span>Let's work together</span>
                    </button>
                  </MagneticButton>
                </div>

                {/* Workspace Live Telemetry */}
                <div className="direct-telemetry-box font-mono">
                  <div className="telemetry-item">
                    <span className="status-dot" />
                    <span>STATUS: Open for Freelance & Product Roles</span>
                  </div>
                  <div className="telemetry-item">
                    <Globe size={13} className="text-accent" />
                    <span>TIMEZONE: India (IST / UTC+5:30)</span>
                  </div>
                  <div className="telemetry-item">
                    <MessageSquare size={13} className="text-accent" />
                    <span>RESPONSE: Typically within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Accessible Direct Message Form */}
          <ScrollReveal delay={200}>
            <div className="contact-form-card">
              <div className="form-card-header">
                <MessageSquare size={16} className="text-accent" />
                <h3>Send A Direct Message</h3>
              </div>

              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <Check size={28} className="text-accent" />
                  </div>
                  <h4>Message Prepared!</h4>
                  <p>Your default email client has been launched with the pre-filled inquiry. I look forward to speaking with you.</p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="btn-secondary reset-form-btn"
                  >
                    <span>Send another message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="interactive-contact-form" noValidate>
                  {/* Name Field */}
                  <div className="form-field">
                    <label htmlFor="contact-name" className="field-label font-mono">
                      Your Name <span className="required-star">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Alex Miller"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      className={`form-input ${formErrors.name ? 'form-input-error' : ''}`}
                      aria-invalid={Boolean(formErrors.name)}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <span id="name-error" className="field-error-msg font-mono">
                        <AlertCircle size={12} />
                        <span>{formErrors.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-field">
                    <label htmlFor="contact-email" className="field-label font-mono">
                      Your Email <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                      }}
                      className={`form-input ${formErrors.email ? 'form-input-error' : ''}`}
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <span id="email-error" className="field-error-msg font-mono">
                        <AlertCircle size={12} />
                        <span>{formErrors.email}</span>
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="form-field">
                    <label htmlFor="contact-message" className="field-label font-mono">
                      Project Details or Idea <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Briefly describe what you're looking to build..."
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                      }}
                      className={`form-textarea ${formErrors.message ? 'form-input-error' : ''}`}
                      aria-invalid={Boolean(formErrors.message)}
                      aria-describedby={formErrors.message ? 'message-error' : undefined}
                    />
                    {formErrors.message && (
                      <span id="message-error" className="field-error-msg font-mono">
                        <AlertCircle size={12} />
                        <span>{formErrors.message}</span>
                      </span>
                    )}
                  </div>

                  <MagneticButton strength={15}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-accent submit-msg-btn"
                    >
                      {isSubmitting ? (
                        <span>Preparing...</span>
                      ) : (
                        <>
                          <span>Start Conversation</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
