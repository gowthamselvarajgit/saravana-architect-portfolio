import React from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';
import { ARCHITECT_INFO } from '../data/projectsData';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-4xl)',
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
          index="SEC. 07 / DIALOGUE & INQUIRY"
          eyebrow="COMMUNICATION"
          title="Initiate Spatial Collaboration"
          subtitle="Available for architectural design, computational modeling, and master planning commissions."
        />

        <div className="arch-split-equal">
          {/* Editorial Closing Statement */}
          <div data-anim="contact-content">
            <h3
              className="arch-display-large"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', marginBottom: 'var(--space-md)' }}
            >
              Every meaningful project begins with a conversation about <em>place</em>.
            </h3>

            <p className="arch-body" style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
              Open to collaborations with architectural practices, urbanists, cultural institutions, and research studios.
              Curated portfolio documentations and full drawing sets are available upon verified professional request.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <a
                href={`mailto:${ARCHITECT_INFO.email}`}
                className="arch-button arch-button-accent"
                style={{ display: 'inline-flex' }}
              >
                DIRECT INQUIRY →
              </a>
              <a
                href={ARCHITECT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="arch-button"
                style={{ display: 'inline-flex' }}
              >
                LINKEDIN PROFILE ↗
              </a>
            </div>
          </div>

          {/* Structured Architectural Colophon / Dispatch Box */}
          <div
            data-anim="contact-content"
            style={{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
          >
            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                DISPATCH COORDINATES
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2xs)',
                }}
              >
                {ARCHITECT_INFO.name}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-secondary)',
                  display: 'block',
                  marginBottom: 'var(--space-md)',
                }}
              >
                Graduate Architect · Lovely School of Arch & Design (LPU)
              </span>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--color-border-subtle)',
                paddingTop: 'var(--space-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2xs)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="arch-tech-label">PRACTICE REGION</span>
                <span className="arch-tech-value">India</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="arch-tech-label">DISCIPLINE</span>
                <span className="arch-tech-value">Architecture Shaped by Place</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="arch-tech-label">COMMUNICATION</span>
                <span className="arch-tech-value">{ARCHITECT_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
