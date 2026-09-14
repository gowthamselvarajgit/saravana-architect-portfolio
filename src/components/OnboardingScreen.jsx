import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/onboarding.css';

/**
 * OnboardingScreen — Spatial Architectural Construction Experience
 *
 * Visual Sequence:
 * 0.0s: Dark ground / registration point
 * 0.4s: Construction drafting lines shoot across axes
 * 1.0s: Perspective isometric foundation grid unfolds
 * 1.6s: Structural geometry & parametric vaulting arcs draw in
 * 2.2s: Architectural volume develops depth & spatial facets
 * 3.0s: SARAVANAKUMAR K appears
 * 3.4s: "ARCHITECTURE SHAPED BY PLACE"
 * 3.8s: [ ENTER THE ARCHITECTURE ]
 *
 * Continuous Transition:
 * On ENTER, the camera pushes forward THROUGH the drawing geometry into the homepage.
 */
export default function OnboardingScreen({ onEnter }) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const enterBtnRef = useRef(null);
  const manifestoRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Focus enter button when ready for keyboard accessibility
    enterBtnRef.current?.focus();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(
        '.arch-construct-grid, .arch-construct-pre, .arch-construct-title, .arch-construct-subtitle, .arch-construct-btn',
        { opacity: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timelineRef.current = tl;

      // 1. Initial registration datum points & grid fade-in
      tl.fromTo('.arch-construct-grid', { opacity: 0, scale: 0.9 }, { opacity: 0.85, scale: 1, duration: 0.8 })
        .fromTo('.arch-datum-cross', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.4, stagger: 0.05, duration: 0.5 }, '-=0.5')
        
        // 2. Drafting construction guidelines sweep across X/Y axes
        .fromTo('.drafting-axis-line', 
          { strokeDashoffset: 1200, opacity: 0 }, 
          { strokeDashoffset: 0, opacity: 0.5, duration: 0.9, stagger: 0.1 }, 
          '-=0.3'
        )

        // 3. Plan / foundation perimeter draws in
        .fromTo('.foundation-path',
          { strokeDashoffset: 800, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.75, duration: 1.1, stagger: 0.12 },
          '-=0.5'
        )

        // 4. Structural vertical elevations and parametric vault curves assemble
        .fromTo('.elevation-column',
          { scaleY: 0, transformOrigin: 'bottom', opacity: 0 },
          { scaleY: 1, opacity: 0.85, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo('.vault-arch-curve',
          { strokeDashoffset: 600, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.9, duration: 1.2, stagger: 0.14 },
          '-=0.6'
        )

        // 5. Volume facets & spatial shading develop
        .fromTo('.structural-facet',
          { opacity: 0, scale: 0.96 },
          { opacity: 0.18, scale: 1, duration: 0.8, stagger: 0.06 },
          '-=0.8'
        )

        // 6. Monograph typography reveals
        .fromTo('.arch-construct-pre',
          { y: 14, opacity: 0 },
          { y: 0, opacity: 0.65, duration: 0.5 },
          '-=0.4'
        )
        .fromTo('.arch-construct-title',
          { y: 22, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.3'
        )
        .fromTo('.arch-construct-subtitle',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 0.9, duration: 0.6 },
          '-=0.4'
        )
        .fromTo('.arch-construct-btn',
          { y: 20, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Continuous Camera Push Transition: DRAWING -> ZOOM -> SPACE
  const handleEnterClick = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onEnter();
      return;
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: onEnter,
    });

    // 1. Typography fades quickly
    tl.to(manifestoRef.current, {
      opacity: 0,
      y: -25,
      scale: 1.05,
      duration: 0.35,
      ease: 'power2.in',
    })
      // 2. Camera pushes THROUGH the architectural linework into space
      .to(viewportRef.current, {
        scale: 3.2,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.in',
      }, '-=0.25')
      // 3. Background curtain lifts into the monograph homepage
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.45,
        ease: 'power3.inOut',
      }, '-=0.2');
  };

  return (
    <div
      ref={containerRef}
      className="arch-construct-stage"
      role="dialog"
      aria-modal="true"
      aria-label="Saravanakumar Architectural Spatial Entry"
    >
      {/* Perspective CAD Grid Ground */}
      <div className="arch-construct-grid" aria-hidden="true" />

      {/* Header bar: Live Status & Skip Action */}
      <div className="arch-construct-header">
        <div className="arch-construct-status">
          <span className="arch-construct-status-dot" />
          <span>INITIALIZING SPATIAL TECTONICS</span>
        </div>
        <button
          type="button"
          className="arch-construct-skip"
          onClick={onEnter}
          aria-label="Skip architectural introduction and enter directly"
        >
          [ SKIP INTRO → ]
        </button>
      </div>

      {/* Registration Crosshairs */}
      <div className="arch-datum-cross tl" aria-hidden="true" />
      <div className="arch-datum-cross tr" aria-hidden="true" />
      <div className="arch-datum-cross bl" aria-hidden="true" />
      <div className="arch-datum-cross br" aria-hidden="true" />

      {/* Central Viewport: Dynamic Architectural Construction Assembly */}
      <div ref={viewportRef} className="arch-construct-viewport">
        <svg
          className="arch-construct-svg"
          viewBox="0 0 1000 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Construction Guidelines across axes */}
          <g stroke="rgba(244, 240, 232, 0.12)" strokeWidth="1">
            <line className="drafting-axis-line" x1="500" y1="0" x2="500" y2="700" strokeDasharray="1200" />
            <line className="drafting-axis-line" x1="0" y1="350" x2="1000" y2="350" strokeDasharray="1200" />
            <line className="drafting-axis-line" x1="150" y1="100" x2="850" y2="600" strokeDasharray="1200" stroke="rgba(244, 240, 232, 0.07)" />
            <line className="drafting-axis-line" x1="850" y1="100" x2="150" y2="600" strokeDasharray="1200" stroke="rgba(244, 240, 232, 0.07)" />
          </g>

          {/* Isometric Base Foundation Contours */}
          <g stroke="rgba(244, 240, 232, 0.3)" strokeWidth="1.2">
            {/* Outer Elliptical Plaza Loop */}
            <ellipse className="foundation-path" cx="500" cy="460" rx="360" ry="120" strokeDasharray="800" />
            {/* Inner Sacred Water Amphitheater Circle */}
            <ellipse className="foundation-path" cx="500" cy="460" rx="210" ry="70" strokeDasharray="800" stroke="rgba(196, 30, 42, 0.5)" />
            {/* Stepped Plinth Terraces */}
            <ellipse className="foundation-path" cx="500" cy="475" rx="140" ry="46" strokeDasharray="800" stroke="rgba(244, 240, 232, 0.18)" />
          </g>

          {/* Structural Vertical Columns & Ribs */}
          <g stroke="rgba(244, 240, 232, 0.35)" strokeWidth="1.2">
            <line className="elevation-column" x1="260" y1="420" x2="260" y2="220" />
            <line className="elevation-column" x1="380" y1="485" x2="380" y2="285" />
            <line className="elevation-column" x1="500" y1="510" x2="500" y2="180" stroke="rgba(196, 30, 42, 0.7)" strokeWidth="1.5" />
            <line className="elevation-column" x1="620" y1="485" x2="620" y2="285" />
            <line className="elevation-column" x1="740" y1="420" x2="740" y2="220" />
          </g>

          {/* Parametric Möbius / Cultural Oasis Vault Curves */}
          <g strokeWidth="1.5">
            {/* Ascending Monumental Arch */}
            <path
              className="vault-arch-curve"
              d="M 260 220 Q 500 80 740 220"
              stroke="rgba(244, 240, 232, 0.65)"
              strokeDasharray="600"
            />
            {/* Continuous Ruled Surface Twist */}
            <path
              className="vault-arch-curve"
              d="M 260 220 Q 500 180 620 485"
              stroke="rgba(196, 30, 42, 0.55)"
              strokeDasharray="600"
            />
            <path
              className="vault-arch-curve"
              d="M 740 220 Q 500 180 380 485"
              stroke="rgba(244, 240, 232, 0.4)"
              strokeDasharray="600"
            />
            {/* Diagrid Lattice Infill */}
            <path
              className="vault-arch-curve"
              d="M 320 280 L 500 240 L 680 280"
              stroke="rgba(244, 240, 232, 0.25)"
              strokeDasharray="600"
            />
          </g>

          {/* Translucent Architectural Shading Facets (Mass & Depth) */}
          <polygon
            className="structural-facet"
            points="260,220 500,80 500,180 260,420"
            fill="rgba(244, 240, 232, 0.05)"
          />
          <polygon
            className="structural-facet"
            points="500,80 740,220 740,420 500,180"
            fill="rgba(244, 240, 232, 0.08)"
          />
          <polygon
            className="structural-facet"
            points="380,485 500,510 500,180 380,285"
            fill="rgba(196, 30, 42, 0.06)"
          />

          {/* Real Metric Elevation Ticks */}
          <text x="515" y="185" fill="rgba(244, 240, 232, 0.45)" fontFamily="'DM Mono', monospace" fontSize="9" letterSpacing="0.1em">
            +23.00m (CROWN CULMINATION)
          </text>
          <text x="515" y="355" fill="rgba(244, 240, 232, 0.35)" fontFamily="'DM Mono', monospace" fontSize="9" letterSpacing="0.1em">
            +11.50m (STRUCTURAL EQUATOR)
          </text>
          <text x="515" y="515" fill="rgba(244, 240, 232, 0.45)" fontFamily="'DM Mono', monospace" fontSize="9" letterSpacing="0.1em">
            +0.00m (CIVIC PLAZA DATUM)
          </text>
        </svg>

        {/* Central Monograph Manifesto Typography */}
        <div ref={manifestoRef} className="arch-construct-manifesto">
          <span className="arch-construct-pre">
            // MONOGRAPH · ARCHITECTURAL PRACTICE
          </span>

          <h1 className="arch-construct-title">
            SARAVANAKUMAR K
          </h1>

          <p className="arch-construct-subtitle">
            Architecture Shaped by Place
          </p>

          <button
            ref={enterBtnRef}
            type="button"
            className="arch-construct-btn"
            onClick={handleEnterClick}
            aria-label="Enter Architectural Portfolio"
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }} />
            <span>ENTER THE ARCHITECTURE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
