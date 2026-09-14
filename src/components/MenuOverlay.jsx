import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/menuOverlay.css';

/**
 * MenuOverlay — Fullscreen Architectural Navigation Index
 *
 * Links:
 * 01 PROJECTS (with sub-indices for Works & Archive)
 * 02 ATLAS
 * 03 EXPERIENCE
 * 04 EDUCATION
 * 05 ABOUT
 * 06 CONTACT
 */
export default function MenuOverlay({ isOpen, onClose, onNavigate, theme, onToggleTheme }) {
  const containerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const menuItems = [
    { number: '01', label: 'PROJECTS', path: '/projects' },
    { number: '02', label: 'ATLAS', path: '/atlas' },
    { number: '03', label: 'EXPERIENCE', path: '/experience' },
    { number: '04', label: 'EDUCATION', path: '/education' },
    { number: '05', label: 'ABOUT', path: '/about' },
    { number: '06', label: 'CONTACT', path: '/contact' },
  ];

  // Handle ESC key press & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Entrance GSAP animation
  useEffect(() => {
    if (!isOpen) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35 }
      )
        .fromTo(
          '.menu-nav-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, duration: 0.5 },
          '-=0.15'
        )
        .fromTo(
          '.menu-sublinks, .menu-side-datum, .menu-overlay-footer',
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onClose();
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleItemClick = (path, e) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      onNavigate(path);
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="menu-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Architectural Site Navigation"
    >
      <div className="menu-overlay-grid" aria-hidden="true" />

      {/* Top Bar */}
      <div className="menu-overlay-topbar">
        <div className="menu-overlay-brand">
          <span className="menu-overlay-brand-name">SARAVANAKUMAR K</span>
          <span className="menu-overlay-brand-sub">GRADUATE ARCHITECT · MONOGRAPH INDEX</span>
        </div>

        <button
          ref={closeBtnRef}
          type="button"
          className="menu-overlay-close-btn"
          onClick={handleClose}
          aria-label="Close Navigation Menu"
        >
          <span>CLOSE</span>
          <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>×</span>
        </button>
      </div>

      {/* Main Body */}
      <div className="menu-overlay-body">
        <nav className="menu-nav-list" role="navigation" aria-label="Monograph Sections">
          {menuItems.map((item) => (
            <div key={item.number}>
              <a
                href={item.path}
                className="menu-nav-item"
                onClick={(e) => handleItemClick(item.path, e)}
              >
                <span className="menu-nav-index">{item.number}</span>
                <span className="menu-nav-label">{item.label}</span>
              </a>

              {/* Sub-links specifically for Projects (Primary Works vs Archive) */}
              {item.number === '01' && (
                <div className="menu-sublinks">
                  <a
                    href="#projects"
                    className="menu-sublink"
                    onClick={(e) => handleItemClick('/projects#works', e)}
                  >
                    // 01.1 PRIMARY WORKS
                  </a>
                  <a
                    href="#archive"
                    className="menu-sublink"
                    onClick={(e) => handleItemClick('/projects#archive', e)}
                  >
                    // 01.2 ARCHITECTURAL ARCHIVE
                  </a>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Side Datum Column */}
        <div className="menu-side-datum">
          <div className="menu-datum-block">
            <span className="menu-datum-label">GEOGRAPHICAL DATUM</span>
            <span className="menu-datum-value">OOTY, THE NILGIRIS, TAMIL NADU</span>
            <span className="menu-datum-label" style={{ marginTop: '2px' }}>11°24'N 76°42'E</span>
          </div>

          <div className="menu-datum-block">
            <span className="menu-datum-label">DISCIPLINE</span>
            <span className="menu-datum-value">TOPOLOGICAL &amp; CLIMATE TECTONICS</span>
            <span className="menu-datum-label" style={{ marginTop: '2px' }}>B.ARCH · LPU (2021—2026)</span>
          </div>

          <div className="menu-datum-block">
            <span className="menu-datum-label">THEME SELECTION</span>
            <button
              type="button"
              onClick={onToggleTheme}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                color: 'var(--color-raw-warm-paper)',
                background: 'rgba(244, 240, 232, 0.08)',
                border: '1px solid rgba(244, 240, 232, 0.2)',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
                width: 'fit-content',
                marginTop: '4px',
              }}
            >
              {theme === 'dark' ? 'SWITCH TO LIGHT MODE ◑' : 'SWITCH TO DARK MODE ◐'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="menu-overlay-footer">
        <span>© 2026 SARAVANAKUMAR K · ALL RIGHTS RESERVED</span>
        <span>ARCHITECTURE SHAPED BY PLACE</span>
      </div>
    </div>
  );
}
