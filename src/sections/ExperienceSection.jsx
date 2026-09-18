import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFESSIONAL_ARCHIVE } from '../data/projectsData';
import ArchitectTowerHologram from '../components/3d/ArchitectTowerHologram';
import { useTiltEffect } from '../hooks/useTiltEffect';
import '../styles/experienceSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated Metric Counter Component
 * Triggers a smooth numeric count-up animation when scrolled into view
 */
function AnimatedCounter({ value, suffix = '', label }) {
  const [displayValue, setDisplayValue] = useState('0');
  const countRef = useRef(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const numericPart = parseFloat(value);
    const obj = { count: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          count: numericPart,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (value.includes('.')) {
              setDisplayValue(obj.count.toFixed(2));
            } else {
              setDisplayValue(Math.round(obj.count).toString());
            }
          },
        });
      },
    });

    return () => st.kill();
  }, [value]);

  return (
    <div ref={countRef} className="arch-metric-card">
      <div className="arch-metric-card-num">
        {displayValue}
        <span>{suffix}</span>
      </div>
      <div className="arch-metric-card-label">{label}</div>
    </div>
  );
}

/**
 * Vector SVG Icons for Card Badges
 */
function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  );
}

function ArchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V10a8 8 0 0 1 16 0v11" />
      <path d="M8 21v-7a4 4 0 0 1 8 0v7" />
    </svg>
  );
}

function TowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V7l6-5 6 5v15" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function VillaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
    </svg>
  );
}

function CampusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

/**
 * Pinned Cards Configuration
 * Directly mapped to PROFESSIONAL_ARCHIVE entries
 */
const PINNED_CARDS_DATA = [
  {
    id: 'ahc-crest-bkc',
    index: '01',
    theme: 'theme-blue',
    pinColor: 'blue',
    categoryKey: 'commercial',
    categoryLabel: 'Commercial High-Rise',
    icon: <BuildingIcon />,
    title: 'The Crest at BKC',
    location: 'BKC, Mumbai',
    desc: 'Commercial floor plate drafting, longitudinal sections, and structural slab-drop engineering coordination in Mumbai central financial hub.',
    metrics: { gfa: '420,000 sq.ft', height: '148.5m', floors: '38 Floors' },
  },
  {
    id: 'ahc-clubhouse-upper-thane',
    index: '02',
    theme: 'theme-red',
    pinColor: 'red',
    categoryKey: 'township',
    categoryLabel: 'Township Leisure Club',
    icon: <ArchIcon />,
    title: 'Club House — Upper Thane',
    location: 'Upper Thane, Mumbai',
    desc: 'Schematic cross-sections, ground floor recreation spatial flow, and detail working drawings for a 74-acre integrated township masterplan.',
    metrics: { gfa: '85,000 sq.ft', site: '74 Acres', amenities: '12 Zones' },
  },
  {
    id: 'ahc-vertical-nexus-kharadi',
    index: '03',
    theme: 'theme-green',
    pinColor: 'green',
    categoryKey: 'high-rise',
    categoryLabel: 'High-Rise Residential',
    icon: <TowerIcon />,
    title: 'Vertical Nexus',
    location: 'Kharadi, Pune',
    desc: 'High-rise residential circulation, podium fire-tender access compliance, and structural tower coordinates across a 2.03M sq ft site.',
    metrics: { gfa: '2.03M sq.ft', towers: '4 Towers', units: '840 Apts' },
  },
  {
    id: 'ahc-portico-prive-goa',
    index: '04',
    theme: 'theme-pink',
    pinColor: 'pink',
    categoryKey: 'township',
    categoryLabel: 'Luxury Villa Masterplan',
    icon: <VillaIcon />,
    title: 'The Portico Privé Villa',
    location: 'Goa, India',
    desc: 'Mediterranean plotted villa layout, classical colonnade arch options (OP3–OP6), and landscape coordination across 120 acres.',
    metrics: { site: '120 Acres', villas: '64 Units', typology: 'Bespoke' },
  },
  {
    id: 'ahc-zenith-institution-campus',
    index: '05',
    theme: 'theme-cyan',
    pinColor: 'cyan',
    categoryKey: 'campus',
    categoryLabel: 'Educational Mega-Campus',
    icon: <CampusIcon />,
    title: 'The Zenith Campus',
    location: 'Amaravati / Hyd.',
    desc: 'Massing axonometrics, radial master planning layout, and residential cluster coordination for 7,524 student units and 10 Lac sq ft academic zones.',
    metrics: { gfa: '1.0M sq.ft', capacity: '7,524 Beds', masterplan: 'Radial' },
  },
  {
    id: 'ahc-ridgeview-institute',
    index: '06',
    theme: 'theme-amber',
    pinColor: 'amber',
    categoryKey: 'campus',
    categoryLabel: 'Hill-Contour Integrated',
    icon: <MountainIcon />,
    title: 'Ridgeview Institute',
    location: 'Navi Mumbai',
    desc: 'Stepped contour sections, solar sun-path analysis, buildable slope mapping, and 4-phase master plan on natural mountain slopes.',
    metrics: { terrain: 'Stepped 32°', phases: '4 Phases', greenCover: '62%' },
  },
];

const CATEGORIES = [
  { id: 'all', label: 'ALL SCHEMES', count: 6 },
  { id: 'high-rise', label: '01 HIGH-RISE', count: 1 },
  { id: 'township', label: '02 TOWNSHIPS', count: 2 },
  { id: 'commercial', label: '03 COMMERCIAL', count: 1 },
  { id: 'campus', label: '04 MEGA-CAMPUS', count: 2 },
];

/**
 * Tiltable Pinned Card with cursor-tracking specular glare
 */
function InteractiveTiltCard({ card, onClick }) {
  const cardRef = useRef(null);
  useTiltEffect(cardRef, { maxTilt: 7, scale: 1.025, speed: 350 });

  return (
    <div
      ref={cardRef}
      className={`arch-pinned-card ${card.theme}`}
      onClick={() => onClick(card.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(card.id);
        }
      }}
      aria-label={`Inspect architectural blueprint for ${card.title}`}
    >
      {/* Specular glare layer (digital-persona style) */}
      <div className="arch-card-glare" aria-hidden="true" />

      {/* Top 3D Pushpin Sphere */}
      <div className={`arch-pushpin ${card.pinColor}`} title={`Pin: ${card.title}`} />

      {/* Card Top Row: Number & Icon Badge */}
      <div className="arch-pinned-top-row">
        <div className="arch-pinned-num">{card.index}</div>
        <div className="arch-pinned-icon-badge" aria-hidden="true">
          {card.icon}
        </div>
      </div>

      {/* Card Body */}
      <div className="arch-pinned-body">
        <span className="arch-pinned-category">{card.categoryLabel}</span>
        <h4 className="arch-pinned-title">{card.title}</h4>
        <p className="arch-pinned-desc">{card.desc}</p>

        {/* Micro CAD Specs Pill Row */}
        <div className="arch-pinned-metrics-row">
          {Object.entries(card.metrics).map(([k, v]) => (
            <span key={k} className="arch-pinned-metric-pill">
              <strong>{k.toUpperCase()}:</strong> {v}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="arch-pinned-footer">
        <span className="arch-pinned-location">{card.location}</span>
        <span className="arch-pinned-cta">
          BLUEPRINT <span>↗</span>
        </span>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const containerRef = useRef(null);
  const leftFirmCardRef = useRef(null);

  // Apply tilt to left firm card
  useTiltEffect(leftFirmCardRef, { maxTilt: 4, scale: 1.01, speed: 450 });

  // Filter cards by category
  const filteredCards =
    activeCategory === 'all'
      ? PINNED_CARDS_DATA
      : PINNED_CARDS_DATA.filter((card) => card.categoryKey === activeCategory);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  const handleCardClick = (projectId) => {
    const found = PROFESSIONAL_ARCHIVE.find((p) => p.id === projectId);
    if (found) {
      setActiveModalProject(found);
    }
  };

  return (
    <section id="experience" className="arch-exp-section" ref={containerRef}>
      <div className="arch-exp-container">
        {/* Section Header */}
        <div className="arch-exp-header">
          <div className="arch-exp-title-wrap">
            <div className="arch-exp-eyebrow">
              <span className="arch-exp-eyebrow-dot" aria-hidden="true" />
              <span>Section 03 // Professional Practice</span>
            </div>
            <h2 className="arch-exp-main-title">
              Corporate Internship &amp; Architectural Practice
            </h2>
            <p className="arch-exp-subtitle">
              Intensive studio residency at <strong>Architect Hafeez Contractor (AHC)</strong>, Mumbai. 
              Hands-on contributions across live commercial high-rises, large-scale township masterplans, and institutional campus frameworks.
            </p>
          </div>

          <div className="arch-exp-header-badge">
            <span className="arch-exp-badge-firm">ARCHITECT HAFEEZ CONTRACTOR</span>
            <span className="arch-exp-badge-coords">18°55&apos;42&quot;N 72°50&apos;02&quot;E · MUMBAI</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
           SPLIT LAYOUT: LEFT (FIRM DOSSIER + 3D HOLOGRAM) | RIGHT (PINNED CARDS)
           ───────────────────────────────────────────────────────────── */}
        <div className="arch-split-layout">
          {/* =========================================================
             LEFT SECTION: UNIFIED PRACTICE CARD WITH 3D TOWER HOLOGRAM
             ========================================================= */}
          <div className="arch-left-section">
            <div ref={leftFirmCardRef} className="arch-firm-pinned-card">
              {/* Specular Glare */}
              <div className="arch-card-glare" aria-hidden="true" />

              {/* Top 3D Pushpin */}
              <div className="arch-pushpin blue" title="AHC Practice Dossier" />

              {/* Top Row: Index & Icon */}
              <div className="arch-firm-top-row">
                <div className="arch-firm-index-num">AHC // 00</div>
                <div className="arch-firm-badge-icon" aria-hidden="true">
                  <CompassIcon />
                </div>
              </div>

              {/* Firm & Role Info */}
              <div className="arch-firm-tag-pill">
                <span className="arch-firm-tag-pill-dot" />
                <span>OFFICIAL STUDIO RESIDENCY</span>
              </div>
              <h3 className="arch-firm-name">Architect Hafeez Contractor</h3>
              <div className="arch-firm-role-title">
                Intern Architect · Commercial, High-Rise &amp; Township Division
              </div>

              <div className="arch-firm-tenure-strip">
                <span>🗓 Jun 2025 – Nov 2025</span>
                <span>•</span>
                <span>Mumbai Headquarters</span>
              </div>

              <p className="arch-firm-narrative">
                Contributed directly to live municipal submissions, working drawing packages, and cross-disciplinary 
                structural coordination for landmark projects spanning high-density mixed-use towers, 74-acre township 
                masterplans, and institutional campuses across India.
              </p>

              {/* ───────────────────────────────────────────────────────
                 LIVE 3D CAD ARCHITECTURAL TOWER HOLOGRAM (digital-persona style)
                 Interactive WebGL Three.js wireframe model with laser scanner
                 ─────────────────────────────────────────────────────── */}
              <div className="arch-firm-hologram-container">
                <div className="arch-firm-hologram-header">
                  <span className="arch-firm-holo-dot" />
                  <span>INTERACTIVE 3D CAD SCHEME VIEWPORT</span>
                </div>
                <ArchitectTowerHologram />
              </div>

              {/* Animated Live CAD Metrics */}
              <div className="arch-firm-metrics-grid">
                <AnimatedCounter value="6" suffix="+" label="Major Practice Schemes" />
                <AnimatedCounter value="74" suffix=" AC" label="Township Masterplan" />
                <AnimatedCounter value="2.03" suffix="M" label="Sq. Ft. High-Rise GFA" />
                <AnimatedCounter value="100" suffix="%" label="FSI & Municipal Compliance" />
              </div>

              {/* BIM & Drafting Competencies */}
              <div className="arch-firm-skills-wrap">
                <div className="arch-firm-skills-title">Core Competencies &amp; Tooling</div>
                <div className="arch-firm-skill-chips">
                  <span className="arch-firm-chip">AutoCAD 2D Drafting</span>
                  <span className="arch-firm-chip">Revit BIM Coordination</span>
                  <span className="arch-firm-chip">Municipal FSI Verification</span>
                  <span className="arch-firm-chip">Slab-Drop Detailing</span>
                  <span className="arch-firm-chip">Principal Architect Review</span>
                  <span className="arch-firm-chip">Consultant Dispatch</span>
                </div>
              </div>

              {/* Verified Seal */}
              <div className="arch-firm-seal-row">
                <span className="arch-firm-seal-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  VERIFIED STUDIO ARCHIVE
                </span>
                <span>MUMBAI, INDIA</span>
              </div>
            </div>
          </div>

          {/* =========================================================
             RIGHT SECTION: 4 CATEGORIES & 3D TILT PINNED CARDS GRID
             ========================================================= */}
          <div className="arch-right-section">
            {/* 4 Category Filter Tabs */}
            <div className="arch-tabs-bar" role="tablist" aria-label="Project typologies">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`arch-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="arch-tab-count">
                    {cat.id === 'all'
                      ? PINNED_CARDS_DATA.length
                      : PINNED_CARDS_DATA.filter((c) => c.categoryKey === cat.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Pinned Cards Grid with 3D Tilt & Specular Glare */}
            <div className="arch-pinned-grid">
              {filteredCards.map((card) => (
                <InteractiveTiltCard
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
         ARCHITECTURAL BLUEPRINT DOSSIER MODAL TERMINAL
         Mounted to document.body via createPortal
         ───────────────────────────────────────────────────────────── */}
      {activeModalProject &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="arch-dossier-modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveModalProject(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="arch-modal-title"
          >
            <div className="arch-dossier-modal" onClick={(e) => e.stopPropagation()}>
              {/* Technical Drawing Header Bar */}
              <div className="arch-modal-titlebar">
                <div className="arch-modal-titlebar-left">
                  <span className="arch-modal-pulse-dot" />
                  <span>AHC PRACTICE ARCHIVE // DRAWING SHEET {activeModalProject.projectNumber}</span>
                </div>
                <button
                  type="button"
                  className="arch-modal-close-btn"
                  onClick={() => setActiveModalProject(null)}
                  aria-label="Close dossier"
                >
                  ESC / ✕
                </button>
              </div>

              {/* Modal Interior Body */}
              <div className="arch-modal-body">
                <div className="arch-modal-eyebrow-row">
                  <span className="arch-modal-id">PROJECT REF: {activeModalProject.projectNumber}</span>
                  {activeModalProject.coordinates && (
                    <span className="arch-modal-coords">COORDS: {activeModalProject.coordinates}</span>
                  )}
                  <span className="arch-modal-status-badge">APPROVED FOR CONSTRUCTION</span>
                </div>

                <h3 id="arch-modal-title" className="arch-modal-title">
                  {activeModalProject.title}
                </h3>
                <div className="arch-modal-location">
                  {activeModalProject.location} · {activeModalProject.firm}
                </div>



                <div className="arch-modal-section-title">PRACTICE CONTRIBUTION &amp; ROLE</div>
                <p className="arch-modal-desc">{activeModalProject.contribution}</p>

                <div className="arch-modal-section-title">TECHNICAL SPECIFICATIONS &amp; RECORD</div>
                <table className="arch-modal-specs-table">
                  <tbody>
                    <tr>
                      <td className="arch-modal-specs-label">Architectural Firm</td>
                      <td className="arch-modal-specs-value">{activeModalProject.firm} (Mumbai)</td>
                    </tr>
                    <tr>
                      <td className="arch-modal-specs-label">Role &amp; Tenure</td>
                      <td className="arch-modal-specs-value">Intern Architect · {activeModalProject.period}</td>
                    </tr>
                    <tr>
                      <td className="arch-modal-specs-label">Typology &amp; Scope</td>
                      <td className="arch-modal-specs-value">{activeModalProject.typology}</td>
                    </tr>
                    <tr>
                      <td className="arch-modal-specs-label">Archive Source</td>
                      <td className="arch-modal-specs-value">{activeModalProject.source}</td>
                    </tr>
                    <tr>
                      <td className="arch-modal-specs-label">Coordinates</td>
                      <td className="arch-modal-specs-value">{activeModalProject.coordinates || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="arch-modal-section-title">COORDINATION &amp; SOFTWARE PACKAGES</div>
                <div className="arch-modal-tags">
                  <span className="arch-modal-pill primary">AutoCAD 2D</span>
                  <span className="arch-modal-pill primary">Revit BIM Coordination</span>
                  <span className="arch-modal-pill">Schematic Sections</span>
                  <span className="arch-modal-pill">Principal Architect Review</span>
                  <span className="arch-modal-pill">Consultant Dispatch</span>
                  {activeModalProject.typology && activeModalProject.typology.toLowerCase().includes('high-rise') && (
                    <span className="arch-modal-pill">Structural Slab-Drop Detail</span>
                  )}
                  {activeModalProject.typology && activeModalProject.typology.toLowerCase().includes('township') && (
                    <span className="arch-modal-pill">Township Masterplanning</span>
                  )}
                  {activeModalProject.typology && activeModalProject.typology.toLowerCase().includes('campus') && (
                    <span className="arch-modal-pill">Radial Zoning Layout</span>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="arch-modal-footer">
                  <span style={{ fontFamily: 'var(--f-mono, monospace)', fontSize: '0.72rem', color: '#777' }}>
                    PRESS ESC OR CLICK OUTSIDE TO DISMISS
                  </span>
                  <button
                    type="button"
                    className="arch-modal-btn-close"
                    onClick={() => setActiveModalProject(null)}
                  >
                    CLOSE DOSSIER
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
