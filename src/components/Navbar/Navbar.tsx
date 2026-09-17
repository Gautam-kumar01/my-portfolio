import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Freelance', href: '#freelance', id: 'freelance' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active section scroll spy
      const sections = navLinks.map((link) => document.querySelector(link.href));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i] as HTMLElement | null;
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Left: Brand / Monogram */}
        <a href="#hero" className="navbar-brand" onClick={(e) => handleNavClick(e, '#hero')} aria-label="Gautam Kumar Home">
          <span className="navbar-monogram">{PORTFOLIO_DATA.personal.monogram}</span>
          <span className="navbar-name">{PORTFOLIO_DATA.personal.name}</span>
        </a>

        {/* Center: Desktop Nav Links with Active State */}
        <nav className="navbar-center" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Secondary CTA + Primary CTA + Status */}
        <div className="navbar-right">
          <div className="navbar-status-badge" title="Available for work">
            <span className="status-dot" />
            <span className="status-label">Available</span>
          </div>

          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="navbar-secondary-btn"
            aria-label="View Projects"
          >
            <span>Projects</span>
          </a>

          <button
            onClick={onContactClick}
            className="navbar-cta-btn"
            aria-label="Let's Work Together"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight size={14} className="navbar-cta-icon" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-status-row">
            <span className="status-dot" />
            <span className="status-label">Available for freelance & product engineering</span>
          </div>

          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`mobile-nav-link ${activeSection === link.id ? 'mobile-nav-active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <Sparkles size={14} className="text-accent" />}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer-actions">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn-secondary mobile-sec-btn"
            >
              <span>View Projects</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="btn-accent mobile-cta-btn"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
