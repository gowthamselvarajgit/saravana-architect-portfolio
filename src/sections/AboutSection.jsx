import React, { useState, useRef, useEffect } from 'react';
import ArchitectCharacterScene from '../components/character/ArchitectCharacterScene';
import '../styles/aboutSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AboutSection — Interactive 3D Cartoon Architect Workstation & Client Dossier
 * 
 * Features:
 * - 3D Cartoon Architect Model customized to Saravanakumar K (skin tone, hair, navy blazer, espresso eyes)
 * - Real-time cursor/touch head tracking & live typing animations
 * - Seamless toggle between 3D Interactive Workstation & Practice Pass ID Card
 * - Architectural title block specs grid and CV dispatch
 */
export default function AboutSection() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'id'
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Smooth GSAP ScrollTrigger entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="arch-about-section">
      <div className="arch-about-container">
        
        {/* Technical Eyebrow */}
        <div className="arch-about-eyebrow">
          <span className="arch-about-eyebrow-dot" aria-hidden="true" />
          <span>SEC. 02 // ARCHITECT PROFILE &amp; 3D WORKSTATION</span>
        </div>

        <div className="arch-about-grid">
          
          {/* ─────────────────────────────────────────────────────────
             LEFT SIDE: 3D ANIMATED CARTOON WORKSTATION / ID PASS
             ───────────────────────────────────────────────────────── */}
          <div ref={leftColRef} className="arch-id-card-wrap">
            
            {/* Architectural View Mode Switcher */}
            <div className="arch-view-mode-bar" role="tablist" aria-label="Workstation View Modes">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === '3d'}
                className={`arch-view-mode-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => setViewMode('3d')}
              >
                <span>3D Workstation</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'id'}
                className={`arch-view-mode-btn ${viewMode === 'id' ? 'active' : ''}`}
                onClick={() => setViewMode('id')}
              >
                <span>Practice Pass ID</span>
              </button>
            </div>

            {/* Mode 1: 3D Animated Cartoon Architect Workstation */}
            {viewMode === '3d' && (
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
                <ArchitectCharacterScene />

                {/* Workstation HUD Overlay Badge */}
                <div className="arch-char-badge-overlay" aria-hidden="true">
                  <div className="arch-char-badge-left">
                    <span className="arch-char-badge-dot" />
                    <div>
                      <div className="arch-char-badge-title">Saravanakumar K · Digital Twin</div>
                      <div className="arch-char-badge-sub">Real-Time Cursor &amp; Eye Tracking Active</div>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.62rem', color: '#666', letterSpacing: '0.05em' }}>
                    60 FPS
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: Authentic Physical Practice Pass ID Card */}
            {viewMode === 'id' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Lanyard Clip Mockup */}
                <div className="arch-id-lanyard-hanger" aria-hidden="true">
                  <div className="arch-id-lanyard-strap" />
                  <div className="arch-id-lanyard-clip" />
                </div>

                <div className="arch-id-card">
                  {/* Punch Hole Slot */}
                  <div className="arch-id-slot-hole" aria-hidden="true" />

                  {/* Header Strip */}
                  <div className="arch-id-header">
                    <span className="arch-id-brand-mark">
                      <span>PRACTICE PASS</span>
                    </span>
                    <span className="arch-id-badge-code">ID // SK-2026-ARCH</span>
                  </div>

                  {/* Architect Portrait */}
                  <div className="arch-id-photo-wrapper">
                    <img
                      src="/assets/images/saravanakumar-3d-avatar.png"
                      alt="Saravanakumar K - Graduate Architect"
                      className="arch-id-photo-img"
                    />
                    <div className="arch-id-crosshair arch-id-crosshair-tl" aria-hidden="true" />
                    <div className="arch-id-crosshair arch-id-crosshair-tr" aria-hidden="true" />
                    <div className="arch-id-crosshair arch-id-crosshair-bl" aria-hidden="true" />
                    <div className="arch-id-crosshair arch-id-crosshair-br" aria-hidden="true" />
                    <div className="arch-id-live-pill">
                      <span className="arch-id-live-dot" />
                      <span>ACTIVE · 2026</span>
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="arch-id-identity">
                    <h3 className="arch-id-name">Saravanakumar K</h3>
                    <div className="arch-id-role">Graduate Architect &amp; BIM</div>
                    <p className="arch-id-org">
                      Architect Hafeez Contractor (AHC) Mumbai · Lovely School of Architecture (B.Arch)
                    </p>
                  </div>

                  {/* Holographic Security Strip */}
                  <div className="arch-id-holo-strip" aria-hidden="true">
                    <span className="arch-id-holo-text">
                      TOPOGRAPHY · PARAMETRIC FORM · TECTONIC RIGOR
                    </span>
                  </div>

                  {/* Barcode */}
                  <div className="arch-id-footer">
                    <div className="arch-id-barcode-box">
                      <svg className="arch-id-barcode-svg" viewBox="0 0 140 24" fill="currentColor" aria-hidden="true">
                        <rect x="0" y="0" width="3" height="24" />
                        <rect x="5" y="0" width="1.5" height="24" />
                        <rect x="9" y="0" width="4" height="24" />
                        <rect x="15" y="0" width="2" height="24" />
                        <rect x="19" y="0" width="1.5" height="24" />
                        <rect x="23" y="0" width="5" height="24" />
                        <rect x="30" y="0" width="2" height="24" />
                        <rect x="34" y="0" width="3.5" height="24" />
                        <rect x="40" y="0" width="1.5" height="24" />
                        <rect x="44" y="0" width="4" height="24" />
                        <rect x="50" y="0" width="2" height="24" />
                        <rect x="54" y="0" width="5" height="24" />
                        <rect x="61" y="0" width="1.5" height="24" />
                        <rect x="65" y="0" width="3" height="24" />
                        <rect x="70" y="0" width="4" height="24" />
                        <rect x="76" y="0" width="2" height="24" />
                        <rect x="80" y="0" width="5" height="24" />
                        <rect x="87" y="0" width="1.5" height="24" />
                        <rect x="91" y="0" width="3.5" height="24" />
                        <rect x="97" y="0" width="2" height="24" />
                        <rect x="101" y="0" width="4" height="24" />
                        <rect x="107" y="0" width="1.5" height="24" />
                        <rect x="111" y="0" width="5" height="24" />
                        <rect x="118" y="0" width="2" height="24" />
                        <rect x="122" y="0" width="3" height="24" />
                        <rect x="127" y="0" width="4" height="24" />
                        <rect x="133" y="0" width="2" height="24" />
                        <rect x="137" y="0" width="3" height="24" />
                      </svg>
                      <span className="arch-id-barcode-num">SK-2026-0814-ARCH</span>
                    </div>
                    <div className="arch-id-stamp-badge">VERIFIED</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ─────────────────────────────────────────────────────────
             RIGHT SIDE: CLIENT DETAILS & ARCHITECTURAL SPECS
             ───────────────────────────────────────────────────────── */}
          <div ref={rightColRef} className="arch-about-details">
            <h2 className="arch-about-title">
              Saravanakumar K
            </h2>
            
            <div className="arch-about-subtitle">
              <span>GRADUATE ARCHITECT &amp; BIM SPECIALIST</span>
              <span>·</span>
              <span>INDIA</span>
            </div>

            {/* Concise Core Statement */}
            <p className="arch-about-statement">
              Graduate Architect grounded in <strong>regional topography</strong>, <strong>parametric form-finding</strong>, and <strong>ecological reality</strong>. 
              Bridging conceptual computational logic and buildable structural systems across live high-rises, cultural pavilions, and master planning schemes.
            </p>

            {/* Architectural Philosophy Quote */}
            <blockquote className="arch-about-philosophy-quote">
              “Architecture is not an autonomous form dropped onto neutral terrain; it is an enduring conversation with topography, cultural memory, and ecological reality.”
            </blockquote>

            {/* Architectural Specifications Grid (Title Block Style) */}
            <div className="arch-about-specs-grid">
              {/* Spec 01 */}
              <div className="arch-about-spec-cell">
                <span className="arch-about-spec-label">
                  <span>01 // PEDAGOGY &amp; DEGREE</span>
                </span>
                <div className="arch-about-spec-value">Bachelor of Architecture (B.Arch)</div>
                <div className="arch-about-spec-sub">
                  Lovely School of Architecture &amp; Design · 2021–2026 · CGPA 7.49
                </div>
              </div>

              {/* Spec 02 */}
              <div className="arch-about-spec-cell">
                <span className="arch-about-spec-label">
                  <span>02 // PRACTICE &amp; EXPERIENCE</span>
                </span>
                <div className="arch-about-spec-value">Architect Hafeez Contractor (AHC)</div>
                <div className="arch-about-spec-sub">
                  Mumbai · Jun–Nov 2025 · 14+ Live High-Rise &amp; Master Plan Schemes
                </div>
              </div>

              {/* Spec 03 */}
              <div className="arch-about-spec-cell">
                <span className="arch-about-spec-label">
                  <span>03 // BIM &amp; PARAMETRIC SUITE</span>
                </span>
                <div className="arch-about-spec-value">Revit BIM · Rhino 3D · Grasshopper</div>
                <div className="arch-about-spec-sub">
                  AutoCAD · SketchUp · Lumion · V-Ray · Enscape · Adobe Suite
                </div>
              </div>

              {/* Spec 04 */}
              <div className="arch-about-spec-cell">
                <span className="arch-about-spec-label">
                  <span>04 // DISCIPLINE &amp; FOCUS</span>
                </span>
                <div className="arch-about-spec-value">Parametric &amp; Climate-Resilient</div>
                <div className="arch-about-spec-sub">
                  GRIHA Trophy &amp; 120-Hours Oslo Competition Contributor
                </div>
              </div>
            </div>

            {/* Architectural Actions */}
            <div className="arch-about-actions">
              {/* Primary Download Button */}
              <a
                href="/Saravanakumar_K_Architect_Resume.pdf"
                download="Saravanakumar_K_Architect_Resume.pdf"
                className="arch-btn-cv"
                aria-label="Download Saravanakumar K Curriculum Vitae PDF"
              >
                <span>Download Complete CV</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>

              {/* Secondary Projects Button */}
              <a
                href="#projects"
                className="arch-btn-works"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('projects');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Selected Works</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/architect-saravanakumar"
                target="_blank"
                rel="noopener noreferrer"
                className="arch-btn-linkedin"
                aria-label="Saravanakumar K LinkedIn Profile"
                title="Connect on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
