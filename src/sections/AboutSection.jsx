import React from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';
import { ARCHITECT_INFO } from '../data/projectsData';

/**
 * About Section — Section 06
 * Factually verified architect biography & credentials.
 * Surface: Adapts to active theme (chalk/paper in light mode).
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        <SectionHeader
          data-anim="section-header"
          index="SEC. 06 / PROFILE"
          eyebrow="ARCHITECTURAL FOUNDATION"
          title="Saravanakumar K"
          subtitle="Graduate Architect · Lovely School of Architecture and Design"
        />

        <div className="arch-split-asymmetric">
          {/* Narrative Biography */}
          <div data-anim="about-content">
            <p
              className="arch-body-large"
              style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}
            >
              {ARCHITECT_INFO.philosophy}
            </p>

            <p className="arch-body" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
              Completed Bachelor of Architecture (B.Arch) training at the{' '}
              <strong>Lovely School of Architecture and Design</strong>, Lovely Professional University (2021–2026).
              Design investigations emphasize the translation of regional topography and climate constraints into parametric,
              performative architecture.
            </p>

            <p className="arch-body" style={{ color: 'var(--color-text-secondary)' }}>
              During a comprehensive professional internship at <strong>Architect Hafeez Contractor (AHC)</strong> in Mumbai (Jun–Nov 2025),
              contributed to large-scale master plans, high-rise residential towers, and civic institutional campuses—coordinating
              Revit BIM models, facade details, and architectural documentation under the Principal Architect.
            </p>
          </div>

          {/* Structured Architectural Credentials Panel */}
          <div
            data-anim="about-content"
            style={{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              padding: 'var(--space-lg)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--space-sm)',
                paddingBottom: 'var(--space-2xs)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
                CURRICULUM VITAE SUMMARY
              </span>
              <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                [ VERIFIED CV ]
              </span>
            </div>

            {/* CV metadata rows */}
            {[
              { label: 'DEGREE', value: 'Bachelor of Architecture (B.Arch)' },
              { label: 'INSTITUTION', value: 'Lovely School of Arch & Design (LPU)' },
              { label: 'ACADEMIC PERIOD', value: '2021 – 2026' },
              { label: 'REGION', value: 'India' },
              { label: 'INTERNSHIP', value: 'Architect Hafeez Contractor (AHC)' },
              { label: 'INTERNSHIP PERIOD', value: 'Jun 2025 – Nov 2025 · Mumbai' },
              { label: 'BIM & 3D MODELING', value: 'Revit · Rhino 3D · SketchUp · AutoCAD' },
              { label: 'PARAMETRICS', value: 'Grasshopper Algorithmic Logic' },
              { label: 'VISUALIZATION', value: 'Lumion · V-Ray · Enscape · Photoshop' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 'var(--space-md)',
                  paddingTop: 'var(--space-xs)',
                  paddingBottom: 'var(--space-xs)',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
              >
                <span className="arch-tech-label">{label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.04em',
                    color: 'var(--color-text-primary)',
                    textAlign: 'right',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

            {/* Direct Download Button inside CV summary */}
            <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)' }}>
              <a
                href="/Saravanakumar_K_Architect_Resume.pdf"
                download="Saravanakumar_K_Architect_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  color: 'var(--color-bg)',
                  backgroundColor: 'var(--color-accent)',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <span>DOWNLOAD COMPLETE CV (PDF)</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
