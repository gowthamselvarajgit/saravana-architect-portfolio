import React, { useState, useEffect } from 'react';
import '../styles/navigation.css';

/**
 * Modern Visible Architectural Navigation Bar
 *
 * Exposes direct destinations on Desktop:
 * LEFT: SARAVANAKUMAR K / ARCHITECT
 * CENTER/RIGHT: PROJECTS · ATLAS · EXPERIENCE · EDUCATION · ABOUT · CONTACT
 * RIGHT: LIGHT / DARK
 *
 * Mobile: Clean minimal drawer trigger.
 */
export default function Navigation({ theme = 'light', onToggleTheme, onNavigate, currentPath = '/' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECTS', path: '/projects', targetId: 'projects' },
    { label: 'ATLAS', path: '/atlas', isSpaView: true },
    { label: 'EXPERIENCE', path: '/experience', targetId: 'about' },
    { label: 'EDUCATION', path: '/education', targetId: 'about' },
    { label: 'ABOUT', path: '/about', targetId: 'about' },
    { label: 'CONTACT', path: '/contact', targetId: 'contact' },
  ];

  const handleLinkClick = (link, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(link.path);
    }
  };

  return (
    <header role="banner" data-anim="nav" className={`arch-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="arch-navbar-container">
        
        {/* Left Brand Box */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('/');
          }}
          className="arch-nav-brand-box"
          aria-label="Saravanakumar K — Architect Home"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 12L12 2L22 12M12 22L2 12M12 22L22 12" />
            <path d="M12 2v20" />
            <path d="M2 12h20" />
          </svg>
        </a>

        {/* Empty Spacer */}
        <div className="arch-nav-spacer"></div>

        {/* Desktop Links Grid */}
        <nav role="navigation" className="arch-nav-links-grid" aria-label="Primary Architectural Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path === '/projects' && currentPath.startsWith('/projects'));
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(link, e)}
                className={`arch-nav-grid-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Contact & Mobile Trigger */}
        <div className="arch-nav-actions-grid">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/contact');
            }}
            className="arch-nav-contact-btn"
          >
            CONTACT US <span className="arrow">→</span>
          </a>

          {/* Mobile Menu Icon / Button (< 880px) */}
          <button
            type="button"
            className="arch-mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation links"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="arch-mobile-drawer" role="navigation" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(link, e)}
              className="arch-nav-grid-link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (onNavigate) onNavigate('/contact');
            }}
            className="arch-nav-contact-btn mobile-only"
          >
            CONTACT US <span className="arrow">→</span>
          </a>
        </div>
      )}
    </header>
  );
}
