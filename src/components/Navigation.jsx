import React, { useState, useEffect, useRef } from 'react';
import '../styles/navigation.css';

/**
 * Floating Pill Navbar & Rich Architectural Mega-Menu
 * Based on user reference image:
 * - Floating centered pill with backdrop blur
 * - Geometric monogram logo
 * - Mega-menu with featured left card + stacked right cards + bottom banner
 * - Direct CV download & Get in touch CTA button
 */
export default function Navigation({ theme = 'light', onToggleTheme, onNavigate, currentPath = '/' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'profile' | 'works' | null
  const timeoutRef = useRef(null);

  const isHomepage = currentPath === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Transition from dark hero pill styling to white paper pill styling
      setIsScrolled(window.scrollY > (isHomepage ? window.innerHeight * 0.8 : 30));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleLinkClick = (path, e) => {
    if (e) e.preventDefault();
    setActiveMenu(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const isHeroMode = isHomepage && !isScrolled;

  return (
    <div className="arch-navbar-wrapper">
      <header
        role="banner"
        className={`arch-navbar-pill ${isHeroMode ? 'on-hero' : ''}`}
      >
        {/* Left Circular Monogram Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="arch-pill-logo"
          aria-label="Saravanakumar K — Home"
          title="Saravanakumar K — Architect"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3L3 9l9 6 9-6-9-6z" />
            <path d="M3 14.5l9 6 9-6" />
          </svg>
        </a>

        {/* Center Pill Menu Links */}
        <nav className="arch-pill-links" role="navigation" aria-label="Main Navigation">
          {/* PROFILE Mega-Menu */}
          <div
            className={`arch-nav-dropdown ${activeMenu === 'profile' ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter('profile')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="arch-pill-dropdown-trigger"
              onClick={() => setActiveMenu(activeMenu === 'profile' ? null : 'profile')}
              aria-expanded={activeMenu === 'profile'}
              aria-haspopup="true"
            >
              <span>Profile</span>
              <span className="pill-caret">▾</span>
            </button>

            {/* Profile Mega-Menu Card */}
            <div className="arch-mega-menu" role="menu">
              <div className="arch-mega-grid">
                {/* Left Featured Card */}
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick('/about', e)}
                  className="arch-mega-card-featured"
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#0066FF', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                      BIOGRAPHY &amp; VISION
                    </span>
                    <h4 className="mega-card-title">About Saravanakumar K</h4>
                    <p className="mega-card-desc">
                      Graduate Architect grounded in regional topography, parametric form-finding, and ecological reality.
                    </p>
                  </div>

                  {/* Architect portrait image covered inside card */}
                  <div className="mega-card-illustration mega-card-portrait-container" aria-hidden="true">
                    <img
                      src="/assets/images/saravanakumar-portrait.png"
                      alt="Saravanakumar K - Graduate Architect"
                      className="mega-card-img mega-portrait-img"
                    />
                  </div>
                </a>

                {/* Right Stacked Column */}
                <div className="arch-mega-col-stacked">
                  {/* Top Card: Experience */}
                  <a
                    href="/experience"
                    onClick={(e) => handleLinkClick('/experience', e)}
                    className="arch-mega-card-stacked"
                  >
                    <div>
                      <h4 className="mega-card-title">Experience</h4>
                      <p className="mega-card-desc">
                        Architect Hafeez Contractor (AHC) Mumbai · 14+ live high-rise &amp; master plan schemes.
                      </p>
                    </div>
                    <div className="mega-card-mini-diagram" aria-hidden="true">
                      <span>AHC MUMBAI · JUN–NOV 2025</span>
                    </div>
                  </a>

                  {/* Bottom Card: Education */}
                  <a
                    href="/education"
                    onClick={(e) => handleLinkClick('/education', e)}
                    className="arch-mega-card-stacked"
                  >
                    <div>
                      <h4 className="mega-card-title">Education</h4>
                      <p className="mega-card-desc">
                        Lovely School of Architecture (B.Arch, 2021–2026 · CGPA 7.49).
                      </p>
                    </div>
                    <div className="mega-card-mini-diagram" aria-hidden="true">
                      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M10 20 Q40 0 70 20" />
                        <line x1="40" y1="5" x2="40" y2="20" strokeDasharray="2 2" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              {/* Bottom Banner */}
              <a
                href="/achievements"
                onClick={(e) => handleLinkClick('/achievements', e)}
                className="arch-mega-footer"
              >
                <div className="mega-footer-left">
                  <div className="mega-footer-icon" aria-hidden="true">
                    ★
                  </div>
                  <div>
                    <div className="mega-footer-title">Achievements &amp; Certifications</div>
                    <div className="mega-footer-desc">
                      120-Hours Oslo, GRIHA Trophy, Novatr BIM Professional, Lumos Rhino
                    </div>
                  </div>
                </div>
                <span className="mega-footer-btn">
                  <span>View credentials</span>
                  <span aria-hidden="true">›</span>
                </span>
              </a>
            </div>
          </div>

          {/* WORKS Mega-Menu */}
          <div
            className={`arch-nav-dropdown ${activeMenu === 'works' ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter('works')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="arch-pill-dropdown-trigger"
              onClick={() => setActiveMenu(activeMenu === 'works' ? null : 'works')}
              aria-expanded={activeMenu === 'works'}
              aria-haspopup="true"
            >
              <span>Works</span>
              <span className="pill-caret">▾</span>
            </button>

            {/* Works Mega-Menu Card */}
            <div className="arch-mega-menu" role="menu">
              <div className="arch-mega-grid">
                {/* Left Featured Card: Projects */}
                <a
                  href="/projects"
                  onClick={(e) => handleLinkClick('/projects', e)}
                  className="arch-mega-card-featured"
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#0066FF', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                      FLAGSHIP MONOGRAPHS
                    </span>
                    <h4 className="mega-card-title">Selected Projects</h4>
                    <p className="mega-card-desc">
                      Möbius Pavilion (Oslo), Cultural Oasis (Katra), Ribbon of Life (Kerala), Eco Resort (Pune), Flow Spire (Mumbai).
                    </p>
                  </div>

                  {/* Sketched image of a project as requested */}
                  <div className="mega-card-illustration mega-card-sketch-container" aria-hidden="true">
                    <img
                      src="/assets/ribbon_of_life/ribbon_tower_sketch_cropped.png"
                      alt="Ribbon of Life Skyscraper Architectural Sketch"
                      className="mega-card-img mega-card-sketch-img"
                    />
                  </div>
                </a>

                {/* Right Stacked Column */}
                <div className="arch-mega-col-stacked">
                  {/* Top Card: Gallery */}
                  <a
                    href="/gallery"
                    onClick={(e) => handleLinkClick('/gallery', e)}
                    className="arch-mega-card-stacked"
                  >
                    <div>
                      <h4 className="mega-card-title">Gallery</h4>
                      <p className="mega-card-desc">
                        Curated collection of physical study maquettes, high-res renders, and linework.
                      </p>
                    </div>
                    <div className="mega-card-mini-diagram" aria-hidden="true">
                      <span>10+ CURATED WORKS · LIGHTBOX</span>
                    </div>
                  </a>

                  {/* Bottom Card: Technology */}
                  <a
                    href="/technology"
                    onClick={(e) => handleLinkClick('/technology', e)}
                    className="arch-mega-card-stacked"
                  >
                    <div>
                      <h4 className="mega-card-title">Technology</h4>
                      <p className="mega-card-desc">
                        Revit BIM, Rhino 3D, Grasshopper, Enscape, Lumion, V-Ray, D5 Render.
                      </p>
                    </div>
                    <div className="mega-card-mini-diagram" aria-hidden="true">
                      <span>REVIT · RHINO · GRASSHOPPER</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Bottom Banner: Archive Ledger */}
              <a
                href="/archive"
                onClick={(e) => handleLinkClick('/archive', e)}
                className="arch-mega-footer"
              >
                <div className="mega-footer-left">
                  <div className="mega-footer-icon" aria-hidden="true">
                    📖
                  </div>
                  <div>
                    <div className="mega-footer-title">Architectural Archive &amp; Ledger</div>
                    <div className="mega-footer-desc">
                      Indexed ledger of 14+ corporate and academic spatial schemes.
                    </div>
                  </div>
                </div>
                <span className="mega-footer-btn">
                  <span>Open ledger</span>
                  <span aria-hidden="true">›</span>
                </span>
              </a>
            </div>
          </div>

          {/* Direct About Link */}
          <a
            href="/about"
            onClick={(e) => handleLinkClick('/about', e)}
            className="arch-pill-link"
          >
            About
          </a>
        </nav>

        {/* Right Actions: Download CV + Blue Get Started Button */}
        <div className="arch-pill-actions">
          <a
            href="/Saravanakumar_K_Architect_Resume.pdf"
            download="Saravanakumar_K_Architect_Resume.pdf"
            className="arch-pill-cv-btn"
            title="Download Verified Architectural Resume (PDF)"
          >
            <span>Download CV</span>
            <span style={{ fontSize: '0.85rem' }}>↓</span>
          </a>

          <a
            href="/contact"
            onClick={(e) => handleLinkClick('/contact', e)}
            className="arch-pill-cta"
          >
            <span>Contact me</span>
            <span style={{ fontSize: '0.85rem' }}>→</span>
          </a>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            className="arch-pill-mobile-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Card Modal) */}
      {mobileMenuOpen && (
        <div className="arch-mobile-pill-drawer" role="navigation" aria-label="Mobile Navigation">
          <div>
            <div className="arch-mobile-category-title">Profile &amp; Credentials</div>
            <a href="/about" onClick={(e) => handleLinkClick('/about', e)} className="arch-mobile-pill-item">
              <strong>About Profile</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>Biography &amp; Spatial Philosophy</span>
            </a>
            <a href="/experience" onClick={(e) => handleLinkClick('/experience', e)} className="arch-mobile-pill-item">
              <strong>Experience</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>Architect Hafeez Contractor (AHC) Mumbai</span>
            </a>
            <a href="/education" onClick={(e) => handleLinkClick('/education', e)} className="arch-mobile-pill-item">
              <strong>Education</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>Lovely School of Architecture (B.Arch, CGPA 7.49)</span>
            </a>
            <a href="/achievements" onClick={(e) => handleLinkClick('/achievements', e)} className="arch-mobile-pill-item">
              <strong>Achievements &amp; Certifications</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>120-Hours, GRIHA, Novatr BIM, Lumos</span>
            </a>
          </div>

          <div>
            <div className="arch-mobile-category-title">Works &amp; Research</div>
            <a href="/projects" onClick={(e) => handleLinkClick('/projects', e)} className="arch-mobile-pill-item">
              <strong>Selected Projects</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>5 Flagship Architectural Monoliths</span>
            </a>
            <a href="/gallery" onClick={(e) => handleLinkClick('/gallery', e)} className="arch-mobile-pill-item">
              <strong>Gallery</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>Curated Visual Corpus with Lightbox</span>
            </a>
            <a href="/technology" onClick={(e) => handleLinkClick('/technology', e)} className="arch-mobile-pill-item">
              <strong>Technology &amp; Tooling</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>BIM, Grasshopper, Rhino, Enscape, Lumion</span>
            </a>
            <a href="/archive" onClick={(e) => handleLinkClick('/archive', e)} className="arch-mobile-pill-item">
              <strong>Archive Ledger</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary, #68707D)' }}>14+ Professional &amp; Academic Schemes</span>
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '8px' }}>
            <a
              href="/Saravanakumar_K_Architect_Resume.pdf"
              download="Saravanakumar_K_Architect_Resume.pdf"
              className="arch-pill-cv-btn"
              style={{ justifyContent: 'center', border: '1px solid rgba(0,0,0,0.1)' }}
            >
              Download CV (PDF) ↓
            </a>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick('/contact', e)}
              className="arch-pill-cta"
              style={{ justifyContent: 'center' }}
            >
              Contact me →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
