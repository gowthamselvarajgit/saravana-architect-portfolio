import React, { useState, useRef } from 'react';
import { Container, SectionHeader, ArrowLink } from '../components/ArchPrimitives';
import { PRIMARY_PROJECTS } from '../data/projectsData';

/**
 * MagneticCard: Reusable wrapper providing pointer-driven 3D perspective tilt
 * and inner image counter-parallax.
 */
function MagneticCard({ children, className = '', style = {}, onExpand, isExpanded }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0, isHovered: false });

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Normalized coordinates (-1 to 1)
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTransform({
      rotateX: -normY * 3.5, // subtle architectural tilt
      rotateY: normX * 3.5,
      imgX: normX * -12, // counter-parallax
      imgY: normY * -12,
      isHovered: true,
    });
  };

  const handlePointerLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, imgX: 0, imgY: 0, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      className={`arch-card-tilt-container ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
      }}
    >
      <div
        className={`arch-card-tilt-inner ${transform.isHovered ? 'is-hovered' : ''}`}
        style={{
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {typeof children === 'function' ? children(transform) : children}
      </div>
    </div>
  );
}

export default function SelectedProjectsSection() {
  const [mobius, oasis, ribbon, ecoResort, flowSpire] = PRIMARY_PROJECTS;
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-4xl)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        <SectionHeader
          data-anim="section-header"
          index="SEC. 03 / PRIMARY CORPUS"
          eyebrow="SELECTED ARCHITECTURAL WORKS"
          title="Five Architectural Investigations"
          subtitle="Topological structures, territorial masterplans, and climatic adaptations developed across academic and competition arenas."
        />

        {/* ================================================================== */}
        {/* PROJECT 01: ON THE PATH TO REDISCOVERY (MÖBIUS) — MONUMENTAL HERO */}
        {/* ================================================================== */}
        <MagneticCard
          data-anim="project-card"
          className="arch-project-interactive"
          style={{
            marginBottom: 'var(--space-4xl)',
            paddingBottom: 'var(--space-3xl)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {({ imgX, imgY, isHovered }) => (
            <article aria-labelledby="mobius-heading">
              {/* Project Label Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingBottom: 'var(--space-xs)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span className="arch-section-index project-num">// 01</span>
                  <span className="arch-card-badge">
                    <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
                    COMPETITION WINNING PROPOSAL
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  <span className="arch-tech-label">OSLO, NORWAY</span>
                  <span className="arch-tech-label">2025</span>
                </div>
              </div>

              <div className="project-rule" style={{ marginBottom: 'var(--space-lg)' }} />

              <div className="arch-split-asymmetric">
                {/* Left: Narrative & Parameters */}
                <div>
                  <h3
                    id="mobius-heading"
                    className="arch-display-large"
                    style={{ marginBottom: 'var(--space-sm)' }}
                  >
                    {mobius.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--space-md)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-xs)',
                    }}
                  >
                    <span>{mobius.context}</span>
                    <span>·</span>
                    <span>{mobius.academicContext}</span>
                  </div>

                  <p className="arch-body" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                    {mobius.thesis}
                  </p>

                  <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
                    <span className="arch-tech-label" style={{ border: '1px solid var(--color-border)', padding: '0.25rem 0.6rem' }}>
                      CONTINUOUS SURFACE
                    </span>
                    <span className="arch-tech-label" style={{ border: '1px solid var(--color-border)', padding: '0.25rem 0.6rem' }}>
                      ENGINEERED TIMBER RIBS
                    </span>
                    <span className="arch-tech-label" style={{ border: '1px solid var(--color-border)', padding: '0.25rem 0.6rem' }}>
                      3D MAQUETTE READY
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <ArrowLink href={mobius.route}>
                      EXPLORE MÖBIUS 3D DOSSIER
                    </ArrowLink>
                    <button
                      type="button"
                      onClick={() => toggleExpand('mobius')}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-primary)',
                        padding: '0.45rem 0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {expandedProjectId === 'mobius' ? '[-] CLOSE TECHNICAL DRAWINGS' : '[+] VIEW GENERATIVE STUDY'}
                    </button>
                  </div>
                </div>

                {/* Right: Primary Render Frame with Counter Parallax */}
                <div>
                  <div
                    className="project-img-wrapper"
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 10',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    <img
                      src={mobius.heroImage}
                      alt={mobius.title}
                      loading="lazy"
                      className="project-img"
                      style={{
                        transform: `translate(${imgX}px, ${imgY}px) scale(${isHovered ? 1.05 : 1})`,
                        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="arch-tech-label">ELEVATED PLAZA PERSPECTIVE</span>
                    <span className="arch-tech-label">RHINO · GRASSHOPPER · 2.5K WEBP</span>
                  </div>
                </div>
              </div>

              {/* In-situ Expand Drawer for Möbius */}
              {expandedProjectId === 'mobius' && (
                <div
                  style={{
                    marginTop: 'var(--space-xl)',
                    padding: 'var(--space-lg)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  <span className="arch-tech-label" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: 'var(--space-xs)' }}>
                    ARCHITECTURAL STUDY SHEET // MÖBIUS GENERATIVE EVOLUTION
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                    <div>
                      <img
                        src="/assets/images/projects/mobius/mobius-process-01.webp"
                        alt="Parametric Grasshopper study"
                        style={{ width: '100%', height: 'auto', border: '1px solid var(--color-border-subtle)', display: 'block' }}
                      />
                      <span className="arch-tech-label" style={{ display: 'block', marginTop: 'var(--space-2xs)' }}>FIG 1.1: GRASSHOPPER CONSTRAINT SOLVER</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <p className="arch-body" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        The form was mathematically solved using non-orientable topology. 
                        By twisting a ruled surface 180° prior to joining endpoints, interior ceiling becomes exterior ramp, 
                        eliminating traditional wall partitions and encouraging continuous pedestrian flow through historical Oslo plaza.
                      </p>
                      <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-sm)' }}>
                        <span className="arch-tech-label">COORDINATES: 59°54'57"N 10°44'08"E</span>
                        <span className="arch-tech-label" style={{ display: 'block' }}>COMPETITION SUBMISSION: 120 HOURS 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          )}
        </MagneticCard>

        {/* ================================================================== */}
        {/* PROJECTS 02 & 03: ASYMMETRIC STAGGERED 2-COLUMN SPREAD             */}
        {/* Cultural Oasis (Himalayan Sanctuary) + Ribbon of Life (IT Tower)  */}
        {/* ================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            marginBottom: 'var(--space-4xl)',
            paddingBottom: 'var(--space-3xl)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* PROJECT 02: CULTURAL OASIS */}
          <MagneticCard
            data-anim="project-card"
            className="arch-project-interactive"
          >
            {({ imgX, imgY, isHovered }) => (
              <article aria-labelledby="oasis-heading">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingBottom: 'var(--space-xs)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="arch-section-index project-num">// 02</span>
                    <span className="arch-card-badge">
                      <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
                      URBAN INTERVENTION
                    </span>
                  </div>
                  <span className="arch-tech-label">KATRA, JAMMU · 2024</span>
                </div>

                <div className="project-rule" style={{ marginBottom: 'var(--space-md)' }} />

                <div
                  className="project-img-wrapper"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <img
                    src={oasis.heroImage}
                    alt={oasis.title}
                    loading="lazy"
                    className="project-img"
                    style={{
                      transform: `translate(${imgX}px, ${imgY}px) scale(${isHovered ? 1.05 : 1})`,
                      transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                <h4
                  id="oasis-heading"
                  className="arch-display-medium"
                  style={{ marginBottom: 'var(--space-2xs)' }}
                >
                  {oasis.title}
                </h4>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    display: 'block',
                    marginBottom: 'var(--space-sm)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {oasis.location.name} · {oasis.academicContext}
                </span>

                <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                  {oasis.thesis}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    STEPPED AMPHITHEATER
                  </span>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    PILGRIMAGE TRANSIT NODE
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <ArrowLink href={oasis.route}>
                    VIEW STRATIFIED BUILD REVEAL
                  </ArrowLink>
                  <button
                    type="button"
                    onClick={() => toggleExpand('oasis')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    {expandedProjectId === 'oasis' ? '[-] HIDE' : '[+] DETAILS'}
                  </button>
                </div>

                {expandedProjectId === 'oasis' && (
                  <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <img src={oasis.galleryImages[0]} alt="Contour study" style={{ width: '100%', height: 'auto', marginBottom: 'var(--space-xs)' }} />
                    <span className="arch-tech-label">PHYSICAL STEPPED FOAM TERRAIN STUDY</span>
                  </div>
                )}
              </article>
            )}
          </MagneticCard>

          {/* PROJECT 03: RIBBON OF LIFE (TECHNOPARK) */}
          <MagneticCard
            data-anim="project-card"
            className="arch-project-interactive"
          >
            {({ imgX, imgY, isHovered }) => (
              <article aria-labelledby="ribbon-heading">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingBottom: 'var(--space-xs)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="arch-section-index project-num">// 03</span>
                    <span className="arch-card-badge">
                      <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
                      B.ARCH CAPSTONE THESIS
                    </span>
                  </div>
                  <span className="arch-tech-label">KERALA · 2026</span>
                </div>

                <div className="project-rule" style={{ marginBottom: 'var(--space-md)' }} />

                <div
                  className="project-img-wrapper"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <img
                    src={ribbon.heroImage}
                    alt={ribbon.title}
                    loading="lazy"
                    className="project-img"
                    style={{
                      transform: `translate(${imgX}px, ${imgY}px) scale(${isHovered ? 1.05 : 1})`,
                      transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                <h4
                  id="ribbon-heading"
                  className="arch-display-medium"
                  style={{ marginBottom: 'var(--space-2xs)' }}
                >
                  {ribbon.title}
                </h4>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    display: 'block',
                    marginBottom: 'var(--space-sm)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Techno-Park Phase IV · {ribbon.location.city}, Kerala · {ribbon.academicContext}
                </span>

                <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                  {ribbon.thesis}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    42-STOREY BIOMIMETIC TOWER
                  </span>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    CONTINUOUS PEDESTRIAN LOOP
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <ArrowLink href={ribbon.route}>
                    VIEW THESIS MASTERPLAN DOSSIER
                  </ArrowLink>
                  <button
                    type="button"
                    onClick={() => toggleExpand('ribbon')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    {expandedProjectId === 'ribbon' ? '[-] HIDE' : '[+] DETAILS'}
                  </button>
                </div>

                {expandedProjectId === 'ribbon' && (
                  <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                      Thesis Program: 42-storey office and incubator tower linked by an elevated skyway loop across 24 acres. 
                      Integrates passive tropical ventilation screens and podium-level public civic spaces.
                    </p>
                  </div>
                )}
              </article>
            )}
          </MagneticCard>
        </div>

        {/* ================================================================== */}
        {/* PROJECTS 04 & 05: MATERIAL CRAFT & VECTOR DRAWING REVEAL          */}
        {/* Eco Resort (Nature's Nest) + Flow Spire (Landmark Watchtower)      */}
        {/* ================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
          }}
        >
          {/* PROJECT 04: ECO RESORT */}
          <MagneticCard
            data-anim="project-card"
            className="arch-project-interactive"
          >
            {({ imgX, imgY, isHovered }) => (
              <article aria-labelledby="ecoresort-heading">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingBottom: 'var(--space-xs)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="arch-section-index project-num">// 04</span>
                    <span className="arch-card-badge">
                      <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
                      GRIHA TROPHY ENTRY
                    </span>
                  </div>
                  <span className="arch-tech-label">PUNE, MAHARASHTRA · 2025</span>
                </div>

                <div className="project-rule" style={{ marginBottom: 'var(--space-md)' }} />

                <div
                  className="project-img-wrapper"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <img
                    src={ecoResort.heroImage}
                    alt={ecoResort.title}
                    loading="lazy"
                    className="project-img"
                    style={{
                      transform: `translate(${imgX}px, ${imgY}px) scale(${isHovered ? 1.05 : 1})`,
                      transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                <h4
                  id="ecoresort-heading"
                  className="arch-display-medium"
                  style={{ marginBottom: 'var(--space-2xs)' }}
                >
                  {ecoResort.title}
                </h4>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    display: 'block',
                    marginBottom: 'var(--space-sm)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Nature’s Nest · {ecoResort.location.name} · {ecoResort.academicContext}
                </span>

                <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                  {ecoResort.thesis}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    GRIHA GREEN RATING
                  </span>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    RAMMED-EARTH TECTONICS
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <ArrowLink href={ecoResort.route}>
                    VIEW SUSTAINABILITY STUDY
                  </ArrowLink>
                  <button
                    type="button"
                    onClick={() => toggleExpand('ecoresort')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    {expandedProjectId === 'ecoresort' ? '[-] HIDE' : '[+] DETAILS'}
                  </button>
                </div>

                {expandedProjectId === 'ecoresort' && (
                  <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                      GRIHA 5-Star passive architectural strategies: minimum site excavation through cantilevered stilt foundations, 
                      natural rainwater catchment channels along natural contour depressions, and repurposed shipping containers.
                    </p>
                  </div>
                )}
              </article>
            )}
          </MagneticCard>

          {/* PROJECT 05: FLOW SPIRE */}
          <MagneticCard
            data-anim="project-card"
            className="arch-project-interactive"
          >
            {({ imgX, imgY, isHovered }) => (
              <article aria-labelledby="flowspire-heading">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingBottom: 'var(--space-xs)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <span className="arch-section-index project-num">// 05</span>
                    <span className="arch-card-badge">
                      <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
                      DRAWING &amp; MODEL-LED
                    </span>
                  </div>
                  <span className="arch-tech-label">THANE, MUMBAI · 2025</span>
                </div>

                <div className="project-rule" style={{ marginBottom: 'var(--space-md)' }} />

                <div
                  className="project-img-wrapper"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 10',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <img
                    src={flowSpire.heroImage}
                    alt={flowSpire.title}
                    loading="lazy"
                    className="project-img"
                    style={{
                      transform: `translate(${imgX}px, ${imgY}px) scale(${isHovered ? 1.05 : 1})`,
                      transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                <h4
                  id="flowspire-heading"
                  className="arch-display-medium"
                  style={{ marginBottom: 'var(--space-2xs)' }}
                >
                  {flowSpire.title}
                </h4>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    display: 'block',
                    marginBottom: 'var(--space-sm)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Skyline-Hub Landmark Watchtower · {flowSpire.location.name} · {flowSpire.academicContext}
                </span>

                <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                  {flowSpire.thesis}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    AERODYNAMIC TWISTED SPINE
                  </span>
                  <span className="arch-tech-label" style={{ border: '1px solid var(--color-border-subtle)', padding: '0.2rem 0.5rem' }}>
                    DRAWING-LED TECTONICS
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <ArrowLink href={flowSpire.route}>
                    EXPLORE VECTOR PLANS &amp; ELEVATION
                  </ArrowLink>
                  <button
                    type="button"
                    onClick={() => toggleExpand('flowspire')}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      padding: '0.35rem 0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    {expandedProjectId === 'flowspire' ? '[-] HIDE' : '[+] DETAILS'}
                  </button>
                </div>

                {expandedProjectId === 'flowspire' && (
                  <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                      Drawing-Led Methodology: Flow Spire's helical twist was resolved through 8 successive AutoCAD section cuts 
                      and physical balsa study models rather than automatic procedural scripting, prioritizing tectonic constructability.
                    </p>
                  </div>
                )}
              </article>
            )}
          </MagneticCard>
        </div>
      </Container>
    </section>
  );
}
