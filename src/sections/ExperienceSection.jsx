import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFESSIONAL_ARCHIVE } from '../data/projectsData';
import '../styles/experienceSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animated Metric Counter Component
 * Triggers a smooth numeric count-up animation when scrolled into view via GSAP
 */
function AnimatedCounter({ value, suffix = '', label }) {
  const [displayValue, setDisplayValue] = useState('0');
  const countRef = useRef(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    // Numerical value parsing
    const numericPart = parseFloat(value);
    const obj = { count: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          count: numericPart,
          duration: 1.8,
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
    <div ref={countRef} className="arch-metric-tile">
      <div className="arch-crosshair arch-crosshair-tl" aria-hidden="true" />
      <div className="arch-crosshair arch-crosshair-br" aria-hidden="true" />
      <div className="arch-metric-num">
        {displayValue}
        {suffix}
      </div>
      <div className="arch-metric-label">{label}</div>
    </div>
  );
}

/**
 * Stylized Architectural Blueprint Graphic for Each Practice Scheme
 * Renders technical vector CAD drawing geometries (Elevations, Arches, Diagrids, Contours, Radials)
 */
function BlueprintGraphic({ id }) {
  const gridPattern = (
    <defs>
      <pattern id={`cadGrid-${id}`} width="18" height="18" patternUnits="userSpaceOnUse">
        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(0, 102, 255, 0.12)" strokeWidth="0.75" />
      </pattern>
    </defs>
  );

  let drawing = null;

  switch (id) {
    case 'ahc-clubhouse-upper-thane':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <path d="M 45 85 C 85 38, 160 38, 205 85 C 235 115, 115 122, 45 85 Z" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 229, 255, 0.08)" />
          <path d="M 60 83 C 90 48, 150 48, 190 83" stroke="rgba(0, 229, 255, 0.4)" strokeDasharray="3 3" />
          <rect x="175" y="24" width="135" height="56" rx="2" stroke="#0066FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.12)" />
          <line x1="175" y1="42" x2="310" y2="42" stroke="#0066FF" strokeDasharray="4 2" />
          <line x1="195" y1="24" x2="195" y2="80" stroke="rgba(0, 229, 255, 0.35)" />
          <line x1="218" y1="24" x2="218" y2="80" stroke="rgba(0, 229, 255, 0.35)" />
          <line x1="240" y1="24" x2="240" y2="80" stroke="rgba(0, 229, 255, 0.35)" />
          <line x1="262" y1="24" x2="262" y2="80" stroke="rgba(0, 229, 255, 0.35)" />
          <line x1="285" y1="24" x2="285" y2="80" stroke="rgba(0, 229, 255, 0.35)" />
          <text x="210" y="102" fill="#94a3b8" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">74-ACRE TOWNSHIP</text>
        </g>
      );
      break;

    case 'ahc-vertical-nexus-kharadi':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <rect x="135" y="14" width="85" height="106" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.1)" />
          {[24, 33, 42, 51, 60, 69, 78, 87, 96, 105].map((y) => (
            <line key={y} x1="135" y1={y} x2="220" y2={y} stroke="rgba(0, 229, 255, 0.35)" />
          ))}
          <line x1="155" y1="14" x2="155" y2="120" stroke="#0066FF" strokeDasharray="3 2" />
          <line x1="177" y1="14" x2="177" y2="120" stroke="#00E5FF" strokeWidth="1.4" />
          <line x1="200" y1="14" x2="200" y2="120" stroke="#0066FF" strokeDasharray="3 2" />
          <line x1="177" y1="5" x2="177" y2="14" stroke="#00E5FF" strokeWidth="1.8" />
          <line x1="235" y1="14" x2="235" y2="120" stroke="rgba(148, 163, 184, 0.5)" strokeDasharray="2 2" />
          <text x="242" y="68" fill="#00E5FF" fontSize="7.5" fontFamily="monospace">2.03M SQ FT</text>
        </g>
      );
      break;

    case 'ahc-portico-prive-goa':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <path d="M 45 95 L 45 48 A 20 20 0 0 1 85 48 L 85 95" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M 85 95 L 85 48 A 20 20 0 0 1 125 48 L 125 95" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M 125 95 L 125 48 A 20 20 0 0 1 165 48 L 165 95" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 229, 255, 0.1)" />
          <path d="M 165 95 L 165 48 A 20 20 0 0 1 205 48 L 205 95" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M 205 95 L 205 48 A 20 20 0 0 1 245 48 L 245 95" stroke="#00E5FF" strokeWidth="1.5" />
          <line x1="35" y1="26" x2="255" y2="26" stroke="#0066FF" strokeWidth="2" />
          <line x1="40" y1="30" x2="250" y2="30" stroke="rgba(0, 229, 255, 0.4)" />
          <text x="256" y="62" fill="#94a3b8" fontSize="8" fontFamily="monospace">ARCH OP3–OP6</text>
          <text x="256" y="75" fill="#00E5FF" fontSize="8" fontFamily="monospace">120-ACRE MASTER</text>
        </g>
      );
      break;

    case 'ahc-crest-bkc':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <polygon points="105,18 250,18 235,116 120,116" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.1)" />
          <line x1="105" y1="18" x2="235" y2="116" stroke="#0066FF" strokeWidth="1.5" />
          <line x1="250" y1="18" x2="120" y2="116" stroke="#0066FF" strokeWidth="1.5" />
          <line x1="112" y1="67" x2="242" y2="67" stroke="#00E5FF" strokeDasharray="4 2" />
          <line x1="85" y1="116" x2="270" y2="116" stroke="#00E5FF" strokeWidth="2" />
          <text x="35" y="66" fill="#00E5FF" fontSize="8" fontFamily="monospace">SECTIONS A,B,E,I</text>
        </g>
      );
      break;

    case 'ahc-zenith-institution-campus':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <circle cx="180" cy="65" r="50" stroke="rgba(0, 229, 255, 0.25)" strokeDasharray="3 3" />
          <circle cx="180" cy="65" r="35" stroke="#0066FF" strokeWidth="1.5" />
          <circle cx="180" cy="65" r="18" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 229, 255, 0.15)" />
          <line x1="180" y1="15" x2="180" y2="115" stroke="#0066FF" />
          <line x1="130" y1="65" x2="230" y2="65" stroke="#0066FF" />
          <line x1="145" y1="30" x2="215" y2="100" stroke="rgba(0, 229, 255, 0.4)" strokeDasharray="2 2" />
          <path d="M 40 105 Q 180 85, 320 110" stroke="#00E5FF" strokeWidth="1.8" />
          <text x="38" y="32" fill="#94a3b8" fontSize="8" fontFamily="monospace">10 LAC SQ FT BLOCK</text>
        </g>
      );
      break;

    case 'ahc-ridgeview-institute':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <path d="M 30 35 Q 160 55, 330 25" stroke="rgba(0, 229, 255, 0.3)" />
          <path d="M 30 55 Q 170 80, 330 45" stroke="#0066FF" strokeWidth="1.5" />
          <path d="M 30 75 Q 180 100, 330 65" stroke="#00E5FF" strokeWidth="1.6" />
          <path d="M 30 95 Q 190 120, 330 85" stroke="rgba(0, 229, 255, 0.4)" strokeDasharray="3 3" />
          <rect x="85" y="42" width="48" height="22" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.2)" />
          <rect x="145" y="60" width="58" height="24" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.2)" />
          <rect x="220" y="48" width="48" height="22" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 102, 255, 0.2)" />
          <text x="90" y="24" fill="#00E5FF" fontSize="7.5" fontFamily="monospace">3D TERRAIN CONTOURS</text>
        </g>
      );
      break;

    case 'ahc-diadem-tower':
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <polygon points="120,115 135,45 155,25 180,12 205,25 225,45 240,115" stroke="#00E5FF" strokeWidth="1.6" fill="rgba(0, 102, 255, 0.12)" />
          <line x1="180" y1="3" x2="180" y2="15" stroke="#00E5FF" strokeWidth="2" />
          {[40, 52, 64, 76, 88, 100].map((y) => (
            <line key={y} x1="130" y1={y} x2="230" y2={y} stroke="rgba(0, 229, 255, 0.35)" />
          ))}
          <line x1="115" y1="76" x2="135" y2="76" stroke="#00E5FF" strokeWidth="1.5" />
          <line x1="225" y1="76" x2="245" y2="76" stroke="#00E5FF" strokeWidth="1.5" />
          <text x="35" y="60" fill="#94a3b8" fontSize="8" fontFamily="monospace">6BHK/7BHK SIMPLEX</text>
        </g>
      );
      break;

    case 'ahc-interpretation-centre-lothal':
    default:
      drawing = (
        <g stroke="#00E5FF" strokeWidth="1.2" fill="none">
          <line x1="180" y1="14" x2="180" y2="105" stroke="#00E5FF" strokeWidth="2" />
          <line x1="180" y1="18" x2="80" y2="95" stroke="#0066FF" strokeWidth="1.5" />
          <line x1="180" y1="18" x2="120" y2="95" stroke="rgba(0, 229, 255, 0.5)" />
          <line x1="180" y1="18" x2="240" y2="95" stroke="rgba(0, 229, 255, 0.5)" />
          <line x1="180" y1="18" x2="280" y2="95" stroke="#0066FF" strokeWidth="1.5" />
          <path d="M 80 95 Q 180 55, 280 95" stroke="#00E5FF" strokeWidth="1.8" fill="rgba(0, 102, 255, 0.12)" />
          <text x="95" y="115" fill="#00E5FF" fontSize="7.5" fontFamily="monospace">TENSILE CABLE MAST SYSTEM</text>
        </g>
      );
      break;
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 360 130"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {gridPattern}
      <rect width="360" height="130" fill={`url(#cadGrid-${id})`} />
      {drawing}
    </svg>
  );
}

/**
 * ExperienceSection — Interactive Architectural Bento Dashboard
 * Inspired by modern financial & product UI dashboards with high visual information density
 * Features:
 * - Card 1: Interactive Stacked Bar Chart (Total Built Scope // 3.25M+ Sq Ft)
 * - Card 2: Overlapping Brand Badges & Immersion Metric
 * - Card 3: 3D Embossed Architectural Glass Coin Token with Mouse Tilt
 * - Card 4: Precision Target Capsule Progress Card
 * - Card 5: Active Practice Ledger Stream with Circular Category Badges
 * - Click-to-Inspect Blueprint Modal Drawer
 */
export default function ExperienceSection() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [chartMode, setChartMode] = useState('typology'); // 'typology' | 'quarter'
  const [hoveredBar, setHoveredBar] = useState(null);
  const [coinTilt, setCoinTilt] = useState({ x: 0, y: 0 });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll while modal is active
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

  // 3D Glass Coin Interactive Cursor Tilt
  const handleCoinMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoinTilt({ x: x * 0.35, y: -y * 0.35 });
  };

  const handleCoinMouseLeave = () => {
    setCoinTilt({ x: 0, y: 0 });
  };

  // Stacked Bar Chart Data
  const chartDataTypology = [
    {
      id: 'high-rise',
      label: 'High-Rise',
      val: '2.03M Sq Ft',
      desc: 'Vertical Nexus & Crest BKC',
      base: 70, // Cobalt Base (Schematics)
      mid: 45,  // Cerulean (Revit BIM)
      top: 30,  // Sky Blue (Coordination)
      projectId: 'ahc-vertical-nexus-kharadi'
    },
    {
      id: 'township',
      label: 'Township',
      val: '120+ Acres',
      desc: 'Upper Thane & Goa Masterplan',
      base: 80,
      mid: 35,
      top: 25,
      projectId: 'ahc-clubhouse-upper-thane'
    },
    {
      id: 'commercial',
      label: 'Commercial',
      val: 'BKC Flagship',
      desc: 'Crest Commercial High-Rise',
      base: 55,
      mid: 40,
      top: 30,
      projectId: 'ahc-crest-bkc'
    },
    {
      id: 'campus',
      label: 'Campus',
      val: '10 Lac Sq Ft',
      desc: 'Zenith Institutional Block',
      base: 65,
      mid: 30,
      top: 25,
      projectId: 'ahc-zenith-institution-campus'
    },
  ];

  const chartDataQuarter = [
    { id: 'q1', label: 'Q1 (Jun)', val: '4 Schemes', desc: 'Schematic Onboarding', base: 40, mid: 25, top: 20 },
    { id: 'q2', label: 'Q2 (Aug)', val: '8 Schemes', desc: 'BIM Slab Coordination', base: 65, mid: 35, top: 25 },
    { id: 'q3', label: 'Q3 (Oct)', val: '12 Schemes', desc: 'Masterplan & Sections', base: 85, mid: 45, top: 30 },
    { id: 'total', label: 'Total', val: '14+ Schemes', desc: 'Full Practice Immersion', base: 95, mid: 50, top: 35 },
  ];

  const activeBars = chartMode === 'typology' ? chartDataTypology : chartDataQuarter;

  // Key Practice Schemes for the Activity Ledger
  const ledgerItems = [
    {
      id: 'ahc-crest-bkc',
      title: 'The Crest at BKC',
      sub: 'Flagship Commercial High-Rise',
      stat: '+36 Fl / Approved',
      status: 'SECTIONS A,B,E,I',
      iconClass: 'blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="9" y1="6" x2="9" y2="6.01" />
          <line x1="15" y1="6" x2="15" y2="6.01" />
          <line x1="9" y1="10" x2="9" y2="10.01" />
          <line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="9" y1="14" x2="9" y2="14.01" />
          <line x1="15" y1="14" x2="15" y2="14.01" />
          <path d="M9 18h6" />
        </svg>
      )
    },
    {
      id: 'ahc-clubhouse-upper-thane',
      title: 'Upper Thane Clubhouse',
      sub: '74-Acre Township Leisure',
      stat: 'Sections A–D',
      status: 'SCHEMATICS 100%',
      iconClass: 'sky',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'ahc-vertical-nexus-kharadi',
      title: 'Vertical Nexus',
      sub: 'High-Rise Residential · Kharadi',
      stat: '2.03M Sq Ft',
      status: 'FIRE CODE 100%',
      iconClass: 'navy',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      id: 'ahc-zenith-institution-campus',
      title: 'Zenith Mega-Campus',
      sub: 'Waterfront Educational Block',
      stat: '10 Lac Sq Ft',
      status: 'RADIAL ZONING',
      iconClass: 'cyan',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      id: 'ahc-ridgeview-institute',
      title: 'Ridgeview Institute',
      sub: 'Hill-Contour Terraced Campus',
      stat: 'Contour 3D',
      status: 'SUN-PATH 100%',
      iconClass: 'blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18l5-8 4 6 5-10 4 12" />
        </svg>
      )
    }
  ];

  // GSAP Header entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="arch-exp-section">
      <div className="arch-exp-container">
        
        {/* Technical Eyebrow */}
        <div className="arch-exp-eyebrow">
          <span className="arch-exp-eyebrow-dot" aria-hidden="true" />
          <span>SEC. 03 // PROFESSIONAL PRACTICE &amp; ARCHITECTURAL IMMERSION</span>
        </div>

        {/* Section Header */}
        <div ref={headerRef} className="arch-exp-header">
          <div className="arch-exp-title-wrap">
            <h2 className="arch-exp-main-title">Architectural Experience</h2>
            <p className="arch-exp-subtitle">
              Corporate internship tenure contributing to live masterplans, commercial towers, and residential townships under the Principal Architect at Architect Hafeez Contractor (AHC), Mumbai.
            </p>
          </div>
          <div className="arch-exp-header-badge">
            <span className="arch-exp-badge-firm">ARCHITECT HAFEEZ CONTRACTOR</span>
            <span className="arch-exp-badge-coords">18°55'48"N 72°50'12"E · MUMBAI</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
           INTERACTIVE BENTO DASHBOARD (MATCHING REFERENCE IMAGE)
           ───────────────────────────────────────────────────────────── */}
        <div className="arch-bento-dashboard">
          
          {/* ───────────────────────────────────────────────────────────
             CARD 1 (LEFT): TOTAL BUILT SCOPE & INTERACTIVE STACKED BARS
             ─────────────────────────────────────────────────────────── */}
          <div className="arch-bento-card arch-bento-chart-card">
            <div className="arch-bento-header-row">
              <div>
                <div className="arch-bento-metric-title">Total Built Scope</div>
                <div className="arch-bento-big-value">3.25M+ Sq Ft</div>
              </div>
              <div className="arch-chart-toggle-pills" role="tablist">
                <button
                  type="button"
                  className={`arch-chart-toggle-btn ${chartMode === 'typology' ? 'active' : ''}`}
                  onClick={() => setChartMode('typology')}
                >
                  TYPOLOGY
                </button>
                <button
                  type="button"
                  className={`arch-chart-toggle-btn ${chartMode === 'quarter' ? 'active' : ''}`}
                  onClick={() => setChartMode('quarter')}
                >
                  QUARTERS
                </button>
              </div>
            </div>

            {/* Stacked Bar Chart Canvas */}
            <div className="arch-bento-chart-canvas">
              {/* Dashed Horizontal Gridlines */}
              <div className="arch-chart-grid-line" style={{ bottom: '150px' }}>
                <span>24k</span>
              </div>
              <div className="arch-chart-grid-line" style={{ bottom: '100px' }}>
                <span>16k</span>
              </div>
              <div className="arch-chart-grid-line" style={{ bottom: '50px' }}>
                <span>8k</span>
              </div>
              <div className="arch-chart-grid-line" style={{ bottom: '0px' }}>
                <span>0</span>
              </div>

              {/* Stacked Pillars */}
              <div className="arch-chart-bars-wrap">
                {activeBars.map((bar) => (
                  <div
                    key={bar.id}
                    className="arch-bar-column"
                    onMouseEnter={() => setHoveredBar(bar.id)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() => {
                      if (bar.projectId) {
                        const p = PROFESSIONAL_ARCHIVE.find((x) => x.id === bar.projectId);
                        if (p) setActiveModalProject(p);
                      }
                    }}
                  >
                    {hoveredBar === bar.id && (
                      <div className="arch-bar-tooltip-pop">
                        <strong>{bar.val}</strong> — {bar.desc}
                      </div>
                    )}

                    <div className="arch-stacked-pill-body">
                      <div className="arch-pill-segment-base" style={{ height: `${bar.base}px` }} />
                      <div className="arch-pill-segment-mid" style={{ height: `${bar.mid}px` }} />
                      <div className="arch-pill-segment-top" style={{ height: `${bar.top}px` }} />
                    </div>

                    <span className="arch-bar-x-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────
             CENTER COLUMN: OVERLAPPING BADGES, 3D COIN & TARGET GAUGE
             ─────────────────────────────────────────────────────────── */}
          <div className="arch-bento-center-stack">
            
            {/* Center Top Split: Overlapping Badges + 3D Glass Coin */}
            <div className="arch-bento-center-top-split">
              
              {/* Overlapping Avatars Card */}
              <div className="arch-bento-card arch-avatars-card">
                <div className="arch-avatars-overlap-row">
                  <div className="arch-avatar-circle cyan">LPU</div>
                  <div className="arch-avatar-circle navy">AHC</div>
                </div>
                <div>
                  <div className="arch-avatars-label">Corporate Practice</div>
                  <div className="arch-avatars-val">14+ Schemes</div>
                </div>
              </div>

              {/* 3D Glass & Chrome Coin Card */}
              <div
                className="arch-bento-card arch-coin-bento-card"
                onMouseMove={handleCoinMouseMove}
                onMouseLeave={handleCoinMouseLeave}
              >
                <div
                  className="arch-3d-glass-coin"
                  style={{
                    transform: `rotateY(${coinTilt.x}deg) rotateX(${coinTilt.y}deg)`,
                  }}
                >
                  <div className="arch-3d-coin-text">AHC</div>
                  <div className="arch-3d-coin-sub">MUMBAI · 2025</div>
                </div>
              </div>

            </div>

            {/* Center Bottom: Precision Target Progress Card */}
            <div className="arch-bento-card arch-target-bento-card">
              <div className="arch-target-card-row">
                <div className="arch-target-title">98.4% Drawing Sheet Precision Target</div>
              </div>
              <div className="arch-target-subline">0 Revision Delays (48h Principal Dispatch)</div>
              
              <div className="arch-target-pill-track">
                <div className="arch-target-pill-fill">
                  <div className="arch-target-knob" />
                </div>
              </div>
            </div>

          </div>

          {/* ───────────────────────────────────────────────────────────
             CARD 5 (RIGHT): ACTIVE PRACTICE LEDGER STREAM
             ─────────────────────────────────────────────────────────── */}
          <div className="arch-bento-card arch-bento-ledger-card">
            <div className="arch-ledger-top-row">
              <span className="arch-ledger-date-label">Today, 2025 // IMMERSION</span>
              <span className="arch-ledger-badge-pill">AHC MUMBAI</span>
            </div>

            <div className="arch-ledger-items-list">
              {ledgerItems.map((item) => (
                <div
                  key={item.id}
                  className="arch-ledger-row"
                  onClick={() => {
                    const found = PROFESSIONAL_ARCHIVE.find((x) => x.id === item.id);
                    if (found) setActiveModalProject(found);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const found = PROFESSIONAL_ARCHIVE.find((x) => x.id === item.id);
                      if (found) setActiveModalProject(found);
                    }
                  }}
                >
                  <div className="arch-ledger-left-group">
                    <div className={`arch-ledger-icon-bubble ${item.iconClass}`}>
                      {item.icon}
                    </div>
                    <div className="arch-ledger-info-meta">
                      <span className="arch-ledger-project-name">{item.title}</span>
                      <span className="arch-ledger-project-sub">{item.sub}</span>
                    </div>
                  </div>

                  <div className="arch-ledger-right-group">
                    <span className="arch-ledger-metric-number">{item.stat}</span>
                    <span className="arch-ledger-status-line">{item.status}</span>
                    <div className="arch-ledger-mini-progress">
                      <div className="arch-ledger-mini-bar" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Direct Link to Full Archive Ledger */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="#archive" className="arch-exp-footer-link">
            <span>INSPECT COMPLETE AHC ARCHIVE LEDGER ({PROFESSIONAL_ARCHIVE.length} SCHEMES)</span>
            <span className="arch-exp-arrow">→</span>
          </a>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
         ARCHITECTURAL BLUEPRINT DOSSIER MODAL POPUP
         ───────────────────────────────────────────────────────────── */}
      {activeModalProject && (
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
            {/* Blueprint Header Bar */}
            <div className="arch-modal-titlebar">
              <div className="arch-modal-titlebar-left">
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} />
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
              <div className="arch-crosshair arch-crosshair-tl" aria-hidden="true" />
              <div className="arch-crosshair arch-crosshair-tr" aria-hidden="true" />
              <div className="arch-crosshair arch-crosshair-bl" aria-hidden="true" />
              <div className="arch-crosshair arch-crosshair-br" aria-hidden="true" />

              <div className="arch-modal-eyebrow-row">
                <span className="arch-modal-id">PROJECT REF: {activeModalProject.projectNumber}</span>
                {activeModalProject.coordinates && (
                  <span className="arch-modal-coords">COORDS: {activeModalProject.coordinates}</span>
                )}
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
        </div>
      )}
    </section>
  );
}
