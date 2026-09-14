import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/SocialIcons';
import './Footer.css';

export const Footer: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Main 3-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Left: Brand Identity & Role */}
          <div className="footer-col-left">
            <div className="footer-brand-header">
              <span className="footer-monogram font-mono">{personal.monogram}</span>
              <span className="footer-name">{personal.name}</span>
            </div>
            <p className="footer-role">Full-Stack Developer • Builder • Freelancer</p>
            <p className="footer-sub font-mono">BCA Student @ Amity University</p>
          </div>

          {/* Center: Clean Minimal Navigation */}
          <div className="footer-col-center">
            <span className="footer-nav-heading font-mono">NAVIGATION</span>
            <div className="footer-nav-list">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Verified Social Connections */}
          <div className="footer-col-right">
            <span className="footer-nav-heading font-mono">CONNECT</span>
            <div className="footer-social-list">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personal.email}`}
                className="footer-social-link"
                aria-label="Send Direct Email"
              >
                <Mail size={16} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="footer-bottom-bar">
          <p className="copyright-text font-mono">
            © 2026 Gautam Kumar. All rights reserved.
          </p>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to Top">
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
