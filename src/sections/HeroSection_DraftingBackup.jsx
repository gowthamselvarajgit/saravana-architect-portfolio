import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import '../styles/hero.css';

/**
 * HeroSection — Architectural Drafting Canvas (Heron AI Inspired)
 * Featured Project: RIBBON OF LIFE (Thesis 02 — B.Arch Capstone)
 * Pure Architectural Linework, Construction Guidelines & Shaded Drawing.
 * NO 3D models or photorealistic renders.
 */
export default function HeroSection({ onNavigate }) {
  const [activeLayer, setActiveLayer] = useState('all'); // 'all', 'linework', 'shaded'
  const [isDrawing, setIsDrawing] = useState(true);
  const [drawingStep, setDrawingStep] = useState(0); // 0: init, 1: axes, 2: linework, 3: drawing reveal, 4: complete
  const [hoverCoord, setHoverCoord] = useState({ x: 1420, y: 380 });

  const frameRef = useRef(null);
  const animTimelineRef = useRef(null);
  const lineworkRef = useRef(null);

  // Execute the "Architectural Drafting Evolution" sequence
  const runDraftingAnimation = useCallback(() => {
    if (animTimelineRef.current) {
      animTimelineRef.current.kill();
    }

    setIsDrawing(true);
    setDrawingStep(0);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDrawing(false);
        setDrawingStep(4);
      },
    });
    animTimelineRef.current = tl;

    // 1. Initial State: Clean Blank Chart Paper
    tl.set('.arch-hero-sketch-img', { opacity: 0, scale: 0.99 });
    tl.set('.arch-hero-shaded-img', { opacity: 0 });
    tl.set('.draft-guideline', { strokeDashoffset: 1600, opacity: 0 });
    tl.set('.draft-structural', { strokeDashoffset: 2000, opacity: 0 });
    tl.set('.draft-annotation', { opacity: 0, y: 6 });

    // Step 1: Blank canvas sits, status updates
    tl.to({}, { 
      duration: 0.4,
      onStart: () => setDrawingStep(1)
    });

    // Step 2: Construction Axes & Datum Lines (The architect lays down guidelines)
    tl.to('.draft-guideline', {
      strokeDashoffset: 0,
      opacity: 0.45,
      duration: 1.6,
      stagger: 0.08,
      ease: 'power2.inOut',
      onStart: () => setDrawingStep(1)
    });

    tl.to('.draft-annotation', {
      opacity: 0.75,
      y: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power1.out'
    }, '-=0.6');

    // Step 3: Structural Outline Lines Trace Out (Contour & Diagrid pen strokes)
    tl.to('.draft-structural', {
      strokeDashoffset: 0,
      opacity: 0.85,
      duration: 2.2,
      stagger: 0.1,
      ease: 'power2.out',
      onStart: () => setDrawingStep(2)
    }, '-=0.4');

    // Step 4: Authentic Hand-Drawn Ink & Graphite Sketch Inks In
    tl.to('.arch-hero-sketch-img', {
      opacity: 0.96,
      scale: 1,
      duration: 2.0,
      ease: 'power2.inOut',
      onStart: () => setDrawingStep(3)
    }, '-=0.8');

    // Step 5: Tonal Graphite Shading Softly Manifests
    tl.to('.arch-hero-shaded-img', {
      opacity: 0.75,
      duration: 1.8,
      ease: 'power1.inOut',
      onStart: () => setDrawingStep(4)
    }, '-=0.5');

    // Subtle fade of vector structural lines once the authentic drawing is revealed
    tl.to('.draft-structural', {
      opacity: 0.3,
      duration: 1.4,
      ease: 'power1.out'
    }, '-=1.0');

  }, []);

  // Run on mount
  useEffect(() => {
    runDraftingAnimation();
    return () => {
      if (animTimelineRef.current) animTimelineRef.current.kill();
    };
  }, [runDraftingAnimation]);

  // Pointer move handler for CAD crosshairs
  const handlePointerMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    setHoverCoord({
      x: Math.round(x),
      y: Math.round(y),
    });
  };

  const getStepLabel = () => {
    switch (drawingStep) {
      case 0: return '00 / INITIALIZING CHART';
      case 1: return '01 / DRAFTING DATUMS & AXES';
      case 2: return '02 / TRACING STRUCTURAL EXOSKELETON';
      case 3: return '03 / INKING ARCHITECTURAL SKETCH';
      case 4: return '04 / COMPLETE DRAWING PLATE';
      default: return 'ARCHITECTURAL DRAFTING';
    }
  };

  return (
    <section id="hero" className="arch-hero-section">
      
      {/* 1. Main CAD Architectural Drawing Stage (Massive Drawing Frame) */}
      <div 
        className="arch-hero-canvas-frame" 
        ref={frameRef}
        onPointerMove={handlePointerMove}
      >
        {/* Subtle Drafting Guidelines (Heron AI vertical/horizontal grid borders) */}
        <div className="arch-hero-guide-v left"></div>
        <div className="arch-hero-guide-v center"></div>
        <div className="arch-hero-guide-v right"></div>
        <div className="arch-hero-guide-h bottom"></div>

        {/* Small Orange Square Markers */}
        <div className="arch-hero-orange-marker" style={{ top: '32%', left: '22%' }}></div>
        <div className="arch-hero-orange-marker" style={{ top: '68%', right: '22%' }}></div>

        {/* Top Header Plate Annotations */}
        <div className="arch-hero-plate-badge top-left">
          <span className="plate-num">PLATE 02</span>
          <span className="plate-title">RIBBON OF LIFE // BIOMIMETIC HIGH-RISE DRAFTING</span>
        </div>

        <div className="arch-hero-plate-badge top-right">
          <span className={`plate-status ${isDrawing ? 'is-drawing' : 'is-ready'}`}>
            {isDrawing ? '● DRAWING IN PROGRESS' : '● PLATE COMPLETE'}
          </span>
          <span className="plate-step">{getStepLabel()}</span>
        </div>

        {/* Interactive Controls Overlay */}
        <div className="arch-hero-interactive-dock">
          <button 
            type="button"
            className="arch-dock-btn"
            onClick={runDraftingAnimation}
            title="Replay the drawing sequence"
          >
            ↺ REPLAY DRAFTING
          </button>

          <div className="arch-dock-segmented">
            <button
              type="button"
              className={`arch-dock-seg-btn ${activeLayer === 'linework' ? 'active' : ''}`}
              onClick={() => setActiveLayer('linework')}
            >
              LINEWORK
            </button>
            <button
              type="button"
              className={`arch-dock-seg-btn ${activeLayer === 'all' ? 'active' : ''}`}
              onClick={() => setActiveLayer('all')}
            >
              COMPOSITE
            </button>
            <button
              type="button"
              className={`arch-dock-seg-btn ${activeLayer === 'shaded' ? 'active' : ''}`}
              onClick={() => setActiveLayer('shaded')}
            >
              SHADED STUDY
            </button>
          </div>
        </div>

        {/* Dynamic Crosshair HUD Bottom Right */}
        <div className="arch-hero-hud-crosshair">
          <div className="crosshair-icon">+</div>
          <div className="crosshair-coords">
            X: {hoverCoord.x}PX<br />
            Y: {hoverCoord.y}PX
          </div>
        </div>

        {/* Bottom Left Architectural Stamp */}
        <div className="arch-hero-drawing-stamp">
          <div className="stamp-row bold">THESIS 02 // TECHNO-PARK PHASE IV</div>
          <div className="stamp-row">135M TOWER · 08°31'27"N 76°56'12"E</div>
          <div className="stamp-row">SARAVANAKUMAR K · B.ARCH ARCHIVE</div>
        </div>

        {/* THE ARCHITECTURAL DRAWING LAYERS */}
        <div className="arch-hero-drawing-layer">
          
          {/* Layer A: SVG Construction Linework */}
          <svg
            ref={lineworkRef}
            className="arch-hero-svg-linework"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* 1. Base Drafting Construction Datums */}
            {/* Vertical Central Spine Axis */}
            <line className="draft-guideline" x1="495" y1="30" x2="495" y2="760" stroke="#111" strokeWidth="0.6" strokeDasharray="6 4" />
            <line className="draft-guideline" x1="440" y1="50" x2="440" y2="740" stroke="#111" strokeWidth="0.3" strokeDasharray="3 3" />
            <line className="draft-guideline" x1="550" y1="50" x2="550" y2="740" stroke="#111" strokeWidth="0.3" strokeDasharray="3 3" />
            
            {/* Horizontal Datum Elevation Lines */}
            {/* Datum +135.0m (Crown) */}
            <line className="draft-guideline" x1="180" y1="140" x2="820" y2="140" stroke="#111" strokeWidth="0.5" strokeDasharray="1600" />
            {/* Datum +90.0m (Upper Diagrid Tier) */}
            <line className="draft-guideline" x1="220" y1="310" x2="780" y2="310" stroke="#111" strokeWidth="0.4" strokeDasharray="1600" />
            {/* Datum +45.0m (Podium Interchange) */}
            <line className="draft-guideline" x1="220" y1="480" x2="780" y2="480" stroke="#111" strokeWidth="0.4" strokeDasharray="1600" />
            {/* Datum ±0.00m (Ground Masterplan Level) */}
            <line className="draft-guideline" x1="100" y1="675" x2="900" y2="675" stroke="#111" strokeWidth="0.8" strokeDasharray="1600" />
            
            {/* Dimension Line & Ticks on Left Side */}
            <line className="draft-guideline" x1="200" y1="140" x2="200" y2="675" stroke="#111" strokeWidth="0.4" strokeDasharray="1600" />
            <line className="draft-guideline" x1="192" y1="140" x2="208" y2="140" stroke="#111" strokeWidth="0.6" />
            <line className="draft-guideline" x1="192" y1="310" x2="208" y2="310" stroke="#111" strokeWidth="0.6" />
            <line className="draft-guideline" x1="192" y1="480" x2="208" y2="480" stroke="#111" strokeWidth="0.6" />
            <line className="draft-guideline" x1="192" y1="675" x2="208" y2="675" stroke="#111" strokeWidth="0.6" />

            {/* Compass Arc at Plinth Center */}
            <path
              className="draft-guideline"
              d="M 370 675 A 125 125 0 0 1 620 675"
              fill="none"
              stroke="#111"
              strokeWidth="0.35"
              strokeDasharray="4 4"
            />

            {/* Text Annotations on SVG */}
            <g className="draft-annotation" fontFamily="var(--font-mono)" fontSize="9" fill="#555" letterSpacing="0.1em">
              <text x="215" y="136">+135.0M CROWN</text>
              <text x="215" y="306">+90.0M MID TIER</text>
              <text x="215" y="476">+45.0M PODIUM INTERCHANGE</text>
              <text x="110" y="670">±0.00M MASTERPLAN DATUM</text>
              <text x="500" y="45">AXIS 01</text>
            </g>

            {/* 2. Structural Contour Linework */}
            {/* Crown Petals */}
            <path
              className="draft-structural"
              d="M 460 140 L 472 108 L 485 135 L 495 105 L 507 135 L 520 108 L 532 140"
              fill="none"
              stroke="#111"
              strokeWidth="1.2"
              strokeDasharray="2000"
            />
            
            {/* Exoskeleton Outer Profile */}
            <path
              className="draft-structural"
              d="M 460 140 L 456 310 L 450 480 C 442 560, 420 630, 290 675"
              fill="none"
              stroke="#111"
              strokeWidth="1.3"
              strokeDasharray="2000"
            />
            <path
              className="draft-structural"
              d="M 532 140 L 536 310 L 542 480 C 550 560, 570 630, 710 675"
              fill="none"
              stroke="#111"
              strokeWidth="1.3"
              strokeDasharray="2000"
            />

            {/* Diagrid X-Brace Structural Paths (Tier 3) */}
            <path
              className="draft-structural"
              d="M 460 140 L 495 225 L 532 140 M 456 310 L 495 225 L 536 310"
              fill="none"
              stroke="#111"
              strokeWidth="0.75"
              strokeDasharray="2000"
            />

            {/* Diagrid X-Brace Structural Paths (Tier 2) */}
            <path
              className="draft-structural"
              d="M 456 310 L 495 395 L 536 310 M 450 480 L 495 395 L 542 480"
              fill="none"
              stroke="#111"
              strokeWidth="0.75"
              strokeDasharray="2000"
            />

            {/* Diagrid X-Brace Structural Paths (Tier 1 Base) */}
            <path
              className="draft-structural"
              d="M 450 480 L 495 580 L 542 480 M 438 640 L 495 580 L 558 640"
              fill="none"
              stroke="#111"
              strokeWidth="0.75"
              strokeDasharray="2000"
            />

            {/* Flared Plinth Podium Contour Ribbons */}
            <path
              className="draft-structural"
              d="M 290 675 C 350 688, 430 682, 495 680 C 560 682, 640 688, 710 675"
              fill="none"
              stroke="#111"
              strokeWidth="1.1"
              strokeDasharray="2000"
            />
          </svg>

          {/* Layer B: Authentic Hand-Drawn Ink & Graphite Sketch */}
          <img
            src="/assets/ribbon_of_life/ribbon_tower_sketch_cropped_transparent.png"
            alt="Ribbon of Life Hand-Drawn Architectural Linework Sketch"
            className="arch-hero-sketch-img"
            style={{
              display: activeLayer === 'shaded' ? 'none' : 'block',
            }}
            loading="eager"
          />

          {/* Layer C: Perfectly Matched Architectural Tonal Graphite Shading */}
          <img
            src="/assets/ribbon_of_life/ribbon_tower_tonal_matched_transparent.png"
            alt="Ribbon of Life Tonal Graphite Architectural Study"
            className="arch-hero-shaded-img"
            style={{
              display: activeLayer === 'linework' ? 'none' : 'block',
              mixBlendMode: 'multiply',
            }}
            loading="eager"
          />

        </div>

      </div>

      {/* 2. Giant Typography Block Grid (Heron AI Clean Proportions) */}
      <div className="arch-hero-typography-grid">
        <div className="arch-hero-headline-box">
          <div className="arch-hero-badge-tag">FEATURED THESIS · ARCHIVE 02</div>
          <h1 className="arch-hero-giant-text">
            RIBBON OF LIFE:<br/>BIOPHILIC TOWER
          </h1>
        </div>
        
        <div className="arch-hero-desc-box">
          <p className="arch-hero-desc-text">
            An integrated continuous loop connecting Work, Live, Relax, Shop, and Play. A 135m biomimetic high-rise anchors the Techno-Park Phase IV masterplan through parametric diagrid geometry and vertical green ecosystems.
          </p>
          
          <div className="arch-hero-metrics">
            <span>⎔ 135M TOWER</span>
            <span>⎔ PARAMETRIC DIAGRID</span>
            <span>⎔ BIOPHILIC URBANISM</span>
            <span>⎔ CAPSTONE THESIS</span>
          </div>
        </div>

        <div className="arch-hero-cta-box">
          <a
            href="/projects/ribbon-of-life"
            onClick={(e) => { 
              e.preventDefault(); 
              if (onNavigate) onNavigate('/projects/ribbon-of-life'); 
            }}
            className="arch-hero-discover-btn"
          >
            EXPLORE THESIS PROJECT <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* 3. Scrolling Architectural Ticker Strip */}
      <div className="arch-hero-ticker-wrap" aria-hidden="true">
        <div className="arch-hero-ticker">
          <div className="arch-hero-ticker-track">
            <span>RIBBON OF LIFE</span>
            <span className="sep">⎔</span>
            <span>B.ARCH CAPSTONE THESIS</span>
            <span className="sep">⎔</span>
            <span>135M BIOMIMETIC TOWER</span>
            <span className="sep">⎔</span>
            <span>TECHNO-PARK PHASE IV</span>
            <span className="sep">⎔</span>
            <span>CONTINUOUS URBAN LOOP</span>
            <span className="sep">⎔</span>
            <span>PARAMETRIC DIAGRID</span>
            <span className="sep">⎔</span>
            <span>THIRUVANANTHAPURAM 08°31'N</span>
            <span className="sep">⎔</span>
            <span>CLIMATIC EXOSKELETON</span>
            <span className="sep">⎔</span>
            <span>HAND-DRAWN ARCHITECTURAL DRAFTING</span>
            <span className="sep">⎔</span>
          </div>
          <div className="arch-hero-ticker-track">
            <span>RIBBON OF LIFE</span>
            <span className="sep">⎔</span>
            <span>B.ARCH CAPSTONE THESIS</span>
            <span className="sep">⎔</span>
            <span>135M BIOMIMETIC TOWER</span>
            <span className="sep">⎔</span>
            <span>TECHNO-PARK PHASE IV</span>
            <span className="sep">⎔</span>
            <span>CONTINUOUS URBAN LOOP</span>
            <span className="sep">⎔</span>
            <span>PARAMETRIC DIAGRID</span>
            <span className="sep">⎔</span>
            <span>THIRUVANANTHAPURAM 08°31'N</span>
            <span className="sep">⎔</span>
            <span>CLIMATIC EXOSKELETON</span>
            <span className="sep">⎔</span>
            <span>HAND-DRAWN ARCHITECTURAL DRAFTING</span>
            <span className="sep">⎔</span>
          </div>
        </div>
      </div>

    </section>
  );
}
