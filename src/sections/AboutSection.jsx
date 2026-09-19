import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ArchitectCharacterScene from '../components/character/ArchitectCharacterScene';
import WebGLErrorBoundary from '../components/WebGLErrorBoundary';
import '../styles/aboutSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 4 Architectural Cards Data matching Image 3 (Iconly Style)
const ABOUT_CARDS = [
  {
    id: 'pedagogy',
    category: '01 // PEDAGOGY & DEGREE',
    title: 'Bachelor of Architecture',
    subtitle: 'Lovely School of Architecture & Design · 2021–2026 · CGPA 7.49',
    theme: 'red',
    image: '/assets/images/about/card_pedagogy_3d.jpg',
    imageAlt: '3D Classical Column Capital & Drafting Calipers',
    modalDetails: {
      headline: 'Bachelor of Architecture (B.Arch) — Academic Excellence',
      institution: 'Lovely School of Architecture & Design, LPU · Punjab, India',
      duration: '2021 – 2026 (5-Year Professional Degree)',
      score: 'Cumulative GPA: 7.49 / 10.0',
      description:
        'Comprehensive 5-year Council of Architecture (CoA) accredited curriculum focused on architectural design theory, climatology, building construction technology, structural systems, and urban sociology. Developed high-precision technical drawing packages and computational models for live competition and thesis programs.',
      highlights: [
        'Advanced Architectural Design Studios I–X (High-Rise, Urban, Healthcare, Cultural)',
        'Building Construction & Materials: Tectonic joints, steel-concrete composite systems',
        'Climatology & Environmental Studies: Solar geometry, daylight factor, passive heating/cooling',
        'Theory of Structures & Seismic Design: RCC framing, lateral load distribution, soil mechanics',
        'Professional Practice & Specifications: Municipal bye-laws, NBC 2016, quantity estimating',
      ],
    },
  },
  {
    id: 'practice',
    category: '02 // PRACTICE & EXPERIENCE',
    title: 'Architect Hafeez Contractor',
    subtitle: 'Mumbai · Jun–Nov 2025 · 14+ Live High-Rise Schemes',
    theme: 'light',
    image: '/assets/images/about/card_practice_3d.jpg',
    imageAlt: '3D High-Rise Skyscraper Cantilever Model',
    modalDetails: {
      headline: 'Architect Hafeez Contractor (AHC) — High-Rise & Master Planning Practice',
      institution: 'AHC Architects · Mumbai Headquarters',
      duration: 'June 2025 – November 2025 (Full-Time Architectural Practice)',
      score: '14+ Commercial & Residential High-Rise Schemes Handled',
      description:
        'Directly embedded in high-intensity architectural production for major developers across Mumbai, NCR, and Bengaluru. Drafted core and egress coordination packages, verified MCGM/DCR bye-law compliance, modeled podium landscaping interfaces, and prepared executive design review presentations for Hafeez Contractor.',
      highlights: [
        'High-rise core layouts: Fire lifts, pressurized egress staircases, mechanical risers',
        'Municipal submission sets: Floor Space Index (FSI) optimization and fire officer clearances',
        'Facade coordination: Structural glazing, unitized curtain walls, and cantilevered viewing decks',
        'Township circulation: Vehicular segregations, emergency access routes, podium recreation grids',
        'Site review & multi-disciplinary coordination: Structural, MEP, and PHE engineering alignments',
      ],
    },
  },
  {
    id: 'bim',
    category: '03 // BIM & PARAMETRIC SUITE',
    title: 'BIM & Parametric Suite',
    subtitle: 'Revit BIM · Rhino 3D · Grasshopper · Enscape Suite',
    theme: 'light',
    image: '/assets/images/about/card_bim_3d.jpg',
    imageAlt: '3D Parametric Mobius Diagrid Structure',
    modalDetails: {
      headline: 'Computational Design & Building Information Modeling (BIM)',
      institution: 'Advanced Digital Production Pipeline',
      duration: 'Professional Competency Level: LOD 350',
      score: 'Revit · Rhino 3D · Grasshopper · V-Ray · Enscape · AutoCAD',
      description:
        'Bridging computational algorithmic logic with buildable construction documentation. Utilizing Rhino and Grasshopper for complex double-curved geometries, generative panelization, and daylight optimization, paired with Autodesk Revit for federated BIM coordination and schedule generation.',
      highlights: [
        'Revit Architecture: Parametric family creation, LOD 350 construction schedules, phase mapping',
        'Rhino 3D & Grasshopper: Visual programming, surface subdivision, solar radiation scripting',
        'High-End Visualization: Chaos V-Ray, Enscape RT, and Lumion for photoreal client renders',
        'AutoCAD: Precise municipal clearance drafting, layered construction detail sets',
        'Adobe Creative Suite: Photoshop, Illustrator, and InDesign for architectural monograph portfolios',
      ],
    },
  },
  {
    id: 'climate',
    category: '04 // DISCIPLINE & FOCUS',
    title: 'Climate-Resilient Design',
    subtitle: 'GRIHA Trophy & 120-Hours Oslo Competition Contributor',
    theme: 'blue',
    image: '/assets/images/about/card_climate_3d.jpg',
    imageAlt: '3D Bioclimatic Aerodynamic Canopy Shell',
    modalDetails: {
      headline: 'Climate-Responsive Architecture & Sustainable Systems',
      institution: 'Research, Competitions & Design Practice',
      duration: 'National & International Competition Submissions',
      score: 'GRIHA Trophy Contributor · 120-Hours Oslo Participant',
      description:
        'Architectural design synthesized with local microclimate, sun paths, wind vectors, and bioclimatic efficiency. Prioritizing passive solar gain management, natural stack effect ventilation, vernacular earth-masonry thermal mass, and rainwater harvesting cycles to achieve net-positive architectural interventions.',
      highlights: [
        'GRIHA Green Building Trophy: Net-zero energy strategies, low embodied carbon envelope design',
        '120-Hours Oslo International Competition: Fast-paced conceptual response to urgent social resilience',
        'Passive Cooling: Courtyard air convection, porous terra-cotta screens, evaporative misting pools',
        'Sun & Shading Geometry: Computational heliodon simulation and kinetic louvers for glare elimination',
        'Contextual Tectonics: Integrating vernacular stone and timber with contemporary steel diagrids',
      ],
    },
  },
];

/**
 * AboutSection — Interactive 3D Photoreal Architect Workstation & Client Dossier
 */
export default function AboutSection() {
  const [activeModalCard, setActiveModalCard] = useState(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Lazy-mount 3D Character Scene when section enters viewport to conserve WebGL context slots
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsSectionInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.02 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalCard]);

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
             LEFT SIDE: 3D PHOTOREAL ARCHITECT WORKSTATION / ID PASS
             ───────────────────────────────────────────────────────── */}
          <div ref={leftColRef} className="arch-id-card-wrap">
            <div style={{ position: 'relative', width: '100%', maxWidth: '440px', minHeight: '520px' }}>
              <WebGLErrorBoundary>
                {isSectionInView ? (
                  <ArchitectCharacterScene />
                ) : (
                  <div className="arch-char-scene-root is-frameless" style={{ minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="arch-char-skeleton">
                      <div className="arch-char-spin" />
                      <span>INITIALIZING 3D PHOTOREAL ARCHITECT...</span>
                    </div>
                  </div>
                )}
              </WebGLErrorBoundary>

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
          </div>

          {/* ─────────────────────────────────────────────────────────
             RIGHT SIDE: CLIENT DETAILS & ICONLY-STYLE 3D CARDS (Image 3)
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

            {/* ─────────────────────────────────────────────────────────
               ICONLY-STYLE 3D ARCHITECTURAL CARDS GRID (Image 3 Ref)
               2x2 layout with rich 3D component images & pill action buttons
               ───────────────────────────────────────────────────────── */}
            <div className="arch-iconly-cards-grid" role="region" aria-label="Architectural Credentials and Capabilities">
              {ABOUT_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`arch-iconly-card arch-iconly-card--${card.theme}`}
                  onClick={() => setActiveModalCard(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalCard(card);
                    }
                  }}
                  aria-label={`View detailed credentials for ${card.title}`}
                >
                  {/* Left Content Area */}
                  <div className="arch-iconly-card-content">
                    <span className="arch-iconly-card-category">{card.category}</span>
                    <h3 className="arch-iconly-card-title">{card.title}</h3>
                    <p className="arch-iconly-card-sub">{card.subtitle}</p>

                    {/* Pill Action Button */}
                    <div className="arch-iconly-card-btn">
                      <span className="arch-iconly-btn-circle" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                      <span className="arch-iconly-btn-text">LEARN MORE</span>
                    </div>
                  </div>

                  {/* Right 3D Visual Asset Area */}
                  <div className="arch-iconly-card-visual" aria-hidden="true">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="arch-iconly-card-3d-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
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

      {/* ─────────────────────────────────────────────────────────
         INTERACTIVE ARCHITECTURAL DOSSIER MODAL
         Mounted to document.body via createPortal to break free from section transforms
         ───────────────────────────────────────────────────────── */}
      {activeModalCard &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="arch-card-modal-backdrop"
            onClick={() => setActiveModalCard(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeModalCard.modalDetails.headline}
          >
            <div
              className={`arch-card-modal-window arch-card-modal--${activeModalCard.theme}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="arch-card-modal-header">
                <div className="arch-card-modal-badge">{activeModalCard.category}</div>
                <button
                  type="button"
                  className="arch-card-modal-close"
                  onClick={() => setActiveModalCard(null)}
                  aria-label="Close credentials popup"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="arch-card-modal-body">
                <div className="arch-card-modal-top-row">
                  <div className="arch-card-modal-info">
                    <h3 className="arch-card-modal-title">{activeModalCard.modalDetails.headline}</h3>
                    <div className="arch-card-modal-meta">
                      <span>{activeModalCard.modalDetails.institution}</span>
                      <span>·</span>
                      <span>{activeModalCard.modalDetails.duration}</span>
                    </div>
                    <div className="arch-card-modal-score-badge">
                      {activeModalCard.modalDetails.score}
                    </div>
                  </div>

                  <div className="arch-card-modal-hero-img-wrap">
                    <img
                      src={activeModalCard.image}
                      alt={activeModalCard.imageAlt}
                      className="arch-card-modal-hero-img"
                    />
                  </div>
                </div>

                <p className="arch-card-modal-desc">
                  {activeModalCard.modalDetails.description}
                </p>

                <div className="arch-card-modal-highlights">
                  <div className="arch-card-modal-section-title">CORE HIGHLIGHTS &amp; COMPETENCIES</div>
                  <ul className="arch-card-modal-list">
                    {activeModalCard.modalDetails.highlights.map((item, idx) => (
                      <li key={idx} className="arch-card-modal-list-item">
                        <span className="arch-card-modal-bullet">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Action */}
              <div className="arch-card-modal-footer">
                <button
                  type="button"
                  className="arch-card-modal-action-btn"
                  onClick={() => setActiveModalCard(null)}
                >
                  <span>Back to Overview</span>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
