import React, { useState } from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';
import {
  PRIMARY_PROJECTS,
  DESIGN_EXPLORATIONS,
  PHYSICAL_CRAFT_PROJECTS,
  PROFESSIONAL_ARCHIVE,
  SECONDARY_CONFIRMATION_PROJECTS,
} from '../data/projectsData';

export default function ArchiveSection() {
  const [activeCategory, setActiveCategory] = useState('architectural');
  const [hoveredPreview, setHoveredPreview] = useState(null); // { img, title, subtitle, x, y }

  const categories = [
    { id: 'architectural', label: '01 / ARCHITECTURAL CORPUS', count: PRIMARY_PROJECTS.length },
    { id: 'explorations', label: '02 / DESIGN EXPLORATIONS', count: DESIGN_EXPLORATIONS[0].items.length },
    { id: 'craft', label: '03 / PHYSICAL MODEL CRAFT', count: PHYSICAL_CRAFT_PROJECTS[0].artifacts.length },
    { id: 'professional', label: '04 / PROFESSIONAL ARCHIVE', count: PROFESSIONAL_ARCHIVE.length },
  ];

  const handleRowPointerMove = (e, item) => {
    setHoveredPreview({
      img: item.heroImage || item.image || (item.galleryImages && item.galleryImages[0]) || null,
      title: item.title || item.name,
      subtitle: item.context || item.concept || item.location?.city || item.materials,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleRowPointerLeave = () => {
    setHoveredPreview(null);
  };

  return (
    <section
      id="archive"
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
          index="SEC. 04 / REPOSITORY"
          eyebrow="COMPREHENSIVE LEDGER"
          title="Architectural Archive &amp; Catalogue"
          subtitle="A high-density indexed ledger of spatial investigations, computational models, product designs, and professional practice."
        />

        {/* Floating Preview Thumbnail Box */}
        {hoveredPreview && hoveredPreview.img && (
          <div
            className="archive-float-preview"
            style={{
              left: `${hoveredPreview.x + 20}px`,
              top: `${hoveredPreview.y - 120}px`,
              opacity: 1,
            }}
          >
            <img
              src={hoveredPreview.img}
              alt={hoveredPreview.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '4px 8px',
                backgroundColor: 'rgba(26, 24, 21, 0.88)',
                color: 'var(--color-raw-warm-paper)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {hoveredPreview.title}
            </div>
          </div>
        )}

        {/* Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Archive Categories"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-2xl)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-sm)',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all var(--transition-fast) ease',
                }}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* TAB 01: PRIMARY ARCHITECTURAL PROJECTS LEDGER                     */}
        {/* ================================================================== */}
        {activeCategory === 'architectural' && (
          <div data-anim="archive-content" aria-labelledby="tab-architectural">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1.6fr 1fr 1fr 1.2fr 2.5rem',
                paddingBottom: 'var(--space-2xs)',
                borderBottom: '1px solid var(--color-border-strong)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}
              className="archive-table-header"
            >
              <span>NO.</span>
              <span>PROJECT TITLE</span>
              <span className="archive-col-hide-mobile">TYPOLOGY</span>
              <span className="archive-col-hide-mobile">LOCATION</span>
              <span className="archive-col-hide-mobile">RAW MODEL STATUS</span>
              <span style={{ textAlign: 'right' }}>REF</span>
            </div>

            {PRIMARY_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="archive-table-row"
                onPointerMove={(e) => handleRowPointerMove(e, proj)}
                onPointerLeave={handleRowPointerLeave}
                onClick={() => {
                  window.location.hash = proj.route.replace('#', '');
                }}
              >
                <div className="archive-row-rule" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-accent)' }}>
                  //{proj.projectNumber}
                </span>
                <div>
                  <a
                    href={proj.route}
                    style={{
                      textDecoration: 'none',
                      color: 'var(--color-text-primary)',
                      fontWeight: 500,
                      display: 'block',
                    }}
                  >
                    {proj.title}
                  </a>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    {proj.context}
                  </span>
                </div>
                <span className="archive-col-hide-mobile" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {proj.category.split('/')[0]}
                </span>
                <span className="archive-col-hide-mobile" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {proj.location.city}, {proj.location.country}
                </span>
                <span className="archive-col-hide-mobile" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  {proj.rawModel ? proj.rawModel.split('(')[1]?.replace(')', '') || '3D Model Available' : 'Drawing & Model-Led'}
                </span>
                <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                  →
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 02: DESIGN & PRODUCT EXPLORATIONS                              */}
        {/* ================================================================== */}
        {activeCategory === 'explorations' && (
          <div data-anim="archive-content" aria-labelledby="tab-explorations">
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                COURSEWORK INVESTIGATION · ARC-654
              </span>
              <h3 className="arch-display-medium" style={{ marginTop: 'var(--space-2xs)' }}>
                Domestic &amp; Ergonomic Product Architecture
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {DESIGN_EXPLORATIONS[0].items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--space-lg)',
                  }}
                >
                  <span className="arch-section-index">// 0{idx + 1}</span>
                  <h4 className="arch-display-small" style={{ margin: 'var(--space-2xs) 0 var(--space-xs) 0' }}>
                    {item.name}
                  </h4>
                  <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                    {item.concept}
                  </p>
                  <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span className="arch-tech-label">ASSEMBLY</span>
                      <span className="arch-tech-value" style={{ textAlign: 'right' }}>{item.components}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="arch-tech-label">REPRESENTATION</span>
                      <span className="arch-tech-value" style={{ textAlign: 'right' }}>{item.medium}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 03: PHYSICAL MODEL CRAFTSMANSHIP                               */}
        {/* ================================================================== */}
        {activeCategory === 'craft' && (
          <div data-anim="archive-content" aria-labelledby="tab-craft">
            <p className="arch-body" style={{ maxWidth: '800px', marginBottom: 'var(--space-xl)', color: 'var(--color-text-secondary)' }}>
              {PHYSICAL_CRAFT_PROJECTS[0].description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-md)',
              }}
            >
              {PHYSICAL_CRAFT_PROJECTS[0].artifacts.map((art, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--space-md)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2xs)' }}>
                    <span className="arch-tech-label">STUDIO ARTIFACT // 0{idx + 1}</span>
                    <span className="arch-tech-label">{art.scale || 'STUDY SCALE'}</span>
                  </div>
                  <h4 className="arch-display-small" style={{ marginBottom: 'var(--space-xs)' }}>
                    {art.title}
                  </h4>
                  <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-xs)' }}>
                    <div style={{ marginBottom: '0.25rem' }}>
                      <span className="arch-tech-label" style={{ display: 'block' }}>MATERIALS</span>
                      <span className="arch-tech-value">{art.materials}</span>
                    </div>
                    <div>
                      <span className="arch-tech-label" style={{ display: 'block' }}>INVESTIGATION</span>
                      <span className="arch-tech-value">{art.focus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 04: PROFESSIONAL / INTERNSHIP ARCHIVE                          */}
        {/* ================================================================== */}
        {activeCategory === 'professional' && (
          <div data-anim="archive-content" aria-labelledby="tab-professional">
            {/* Regulatory & Legal Compliance Callout */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderLeft: '3px solid var(--color-blueprint)',
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-md) var(--space-lg)',
                marginBottom: 'var(--space-xl)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-3xs)' }}>
                <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-blueprint)' }} />
                <span className="arch-tech-label" style={{ color: 'var(--color-text-primary)' }}>
                  PROFESSIONAL INTERNSHIP TENURE · ARCHITECT HAFEEZ CONTRACTOR (MUMBAI)
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Selected professional work executed during internship tenure (Jun 2025 – Nov 2025). 
                Projects represent collaborative studio developments under Principal Architect Hafeez Contractor.
                Specific publication details, high-resolution drawing sheets, and detailed role attributions are currently{' '}
                <strong style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  [ PENDING CLIENT CONFIRMATION ]
                </strong>{' '}
                in accordance with professional confidentiality protocols.
              </p>
            </div>

            {/* High-Density Professional Project Table */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '4.5rem 1.5fr 1fr 1.5fr',
                paddingBottom: 'var(--space-2xs)',
                borderBottom: '1px solid var(--color-border-strong)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}
              className="archive-table-header"
            >
              <span>CODE</span>
              <span>PROJECT TITLE</span>
              <span>LOCATION</span>
              <span>TYPOLOGY &amp; CONTRIBUTIONS</span>
            </div>

            {PROFESSIONAL_ARCHIVE.map((ahc) => (
              <div
                key={ahc.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '4.5rem 1.5fr 1fr 1.5fr',
                  alignItems: 'baseline',
                  gap: 'var(--space-md)',
                  padding: 'var(--space-sm) 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
                className="archive-table-row"
              >
                <div className="archive-row-rule" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-blueprint)' }}>
                  {ahc.projectNumber}
                </span>
                <div>
                  <span style={{ fontWeight: 500, display: 'block', color: 'var(--color-text-primary)' }}>
                    {ahc.title}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    {ahc.firm} · {ahc.period}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {ahc.location}
                </span>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                    {ahc.typology}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                    {ahc.contribution}
                  </span>
                </div>
              </div>
            ))}

            {/* Additional Secondary Projects Note */}
            <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border-subtle)' }}>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                ADDITIONAL ARCHIVAL STUDIES REQUIRING CLIENT CONFIRMATION
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                {SECONDARY_CONFIRMATION_PROJECTS.map((sec) => (
                  <div
                    key={sec.id}
                    style={{
                      border: '1px solid var(--color-border-subtle)',
                      padding: 'var(--space-sm) var(--space-md)',
                      backgroundColor: 'var(--color-surface)',
                      flex: '1 1 300px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-primary)', display: 'block', fontWeight: 500 }}>
                      {sec.title}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                      {sec.category} · Status: Pending Client Confirmation
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
