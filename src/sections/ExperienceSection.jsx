import React from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';
import { PROFESSIONAL_ARCHIVE } from '../data/projectsData';

export default function ExperienceSection() {
  const highlightProjects = PROFESSIONAL_ARCHIVE.slice(0, 4);

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        <SectionHeader
          data-anim="section-header"
          index="SEC. 06 / EXPERIENCE"
          eyebrow="PROFESSIONAL PRACTICE"
          title="Architectural Experience"
          subtitle="Corporate and institutional internship tenure at Architect Hafeez Contractor, Mumbai."
        />

        {/* Primary Internship Card */}
        <div
          data-anim="about-content"
          style={{
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 'var(--space-sm)',
              paddingBottom: 'var(--space-md)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <div>
              <span className="arch-tech-label" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: '4px' }}>
                FIRM &amp; LOCATION
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, margin: 0 }}>
                Architect Hafeez Contractor (AHC)
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                Mumbai, Maharashtra, India · Intern Architect
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                TENURE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                Jun 2025 – Nov 2025
              </span>
            </div>
          </div>

          <div className="arch-split-asymmetric" style={{ gap: 'var(--space-xl)' }}>
            <div>
              <h4 className="arch-tech-label" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>
                KEY PRACTICE RESPONSIBILITIES
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Contributed to 14+ live projects spanning residential townships, commercial high-rises, hospitality, landscape, and urban master plans.',
                  'Conducted site context analyses, case studies, zoning compliance checks, and preliminary space planning under the Principal Architect.',
                  'Produced comprehensive architectural drawings, detailed building sections, and parametric 3D models for active client pitches.',
                  'Facilitated cross-discipline coordination between architectural, structural, MEP, and landscape engineering teams.',
                  'Operated across AutoCAD, SketchUp, D5 Render, and Photoshop to deliver multi-phase submissions within stringent timeline constraints.',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      position: 'relative',
                      paddingLeft: 'var(--space-md)',
                      marginBottom: 'var(--space-sm)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.6em',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '50%',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Stats / Scope Panel */}
            <div
              style={{
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-lg)',
              }}
            >
              <span className="arch-tech-label" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: 'var(--space-md)' }}>
                ENGAGEMENT SUMMARY
              </span>
              {[
                { label: 'PORTFOLIO SCOPE', value: '14+ Concurrent Live Projects' },
                { label: 'PROJECT TYPOLOGIES', value: 'Residential, Commercial, Civic' },
                { label: 'COORDINATION', value: 'Architectural · Structural · MEP' },
                { label: 'CORE CAD STACK', value: 'AutoCAD · Revit · SketchUp · D5' },
                { label: 'OFFICE CADENCE', value: 'Full-Time Immersion' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: 'var(--space-xs)',
                    paddingBottom: 'var(--space-xs)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    gap: 'var(--space-sm)',
                  }}
                >
                  <span className="arch-tech-label">{label}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-primary)',
                      textAlign: 'right',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Live Project Highlights */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 'var(--space-md)',
            }}
          >
            <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
              SAMPLE ENGAGEMENT DOSSIERS (AHC PRACTICE ARCHIVE)
            </span>
            <a
              href="#archive"
              className="arch-tech-label"
              style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
            >
              VIEW FULL ARCHIVE LEDGER →
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {highlightProjects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2xs)' }}>
                    <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                      {proj.projectNumber}
                    </span>
                    <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
                      {proj.period}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, margin: '0 0 var(--space-xs)' }}>
                    {proj.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)' }}>
                    {proj.location} · {proj.typology}
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--color-text-muted)' }}>
                    {proj.contribution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
