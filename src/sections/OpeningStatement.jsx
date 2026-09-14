import React from 'react';
import { Container } from '../components/ArchPrimitives';

/**
 * Opening Statement — Section 01
 * Minimal, disciplined architectural manifesto.
 * Text is kept to an absolute minimum.
 */
export default function OpeningStatement() {
  return (
    <section
      className="surface-light"
      style={{
        paddingTop: 'calc(64px + var(--space-xl))',
        paddingBottom: 'var(--space-lg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
          }}
        >
          {/* Left: Core Manifesto */}
          <div style={{ maxWidth: '640px' }}>
            <div
              data-anim="opening-eyebrow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2xs)',
                marginBottom: 'var(--space-xs)',
              }}
            >
              <span className="arch-section-index">// 01</span>
              <span className="arch-hairline-vertical" style={{ height: '10px' }} />
              <span className="arch-eyebrow">PRACTICE MANIFESTO</span>
            </div>

            <h1
              data-anim="opening-title"
              className="arch-display-hero"
              style={{ marginBottom: 'var(--space-xs)' }}
            >
              Architecture <em>Shaped</em> by Place
            </h1>

            <p
              data-anim="opening-body"
              className="arch-body"
              style={{ color: 'var(--color-text-secondary)', margin: 0 }}
            >
              A disciplined spatial practice grounded in topography, cultural memory, and computational tectonics.
            </p>
          </div>

          {/* Right: Methodological Trajectory Sequence */}
          <div
            data-anim="opening-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
              ONTOLOGICAL TRAJECTORY
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: 'var(--color-text-primary)',
              }}
            >
              <span>PLACE</span>
              <span style={{ color: 'var(--color-accent)' }}>→</span>
              <span>IDEA</span>
              <span style={{ color: 'var(--color-accent)' }}>→</span>
              <span>PROCESS</span>
              <span style={{ color: 'var(--color-accent)' }}>→</span>
              <span>FORM</span>
              <span style={{ color: 'var(--color-accent)' }}>→</span>
              <span>SPACE</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
