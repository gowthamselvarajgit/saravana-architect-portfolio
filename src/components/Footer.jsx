import React from 'react';
import { Container } from './ArchPrimitives';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        {/* Architectural Colophon Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div>
            <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              IDENTITY
            </span>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-3xs)',
              }}
            >
              Saravanakumar K
            </div>
            <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
              Graduate Architect · B.Arch (2021–2026)<br />
              Lovely School of Architecture and Design (LPU), Punjab
            </p>
          </div>

          <div>
            <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              PRIMARY CORPUS
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xs)' }}>
              <li>
                <a href="#projects" className="arch-link" style={{ fontSize: '0.8125rem' }}>
                  01 // On the path to Rediscovery (Möbius)
                </a>
              </li>
              <li>
                <a href="#projects" className="arch-link" style={{ fontSize: '0.8125rem' }}>
                  02 // Cultural Oasis Katra
                </a>
              </li>
              <li>
                <a href="#projects" className="arch-link" style={{ fontSize: '0.8125rem' }}>
                  03 // Ribbon of Life (Technopark)
                </a>
              </li>
              <li>
                <a href="#projects" className="arch-link" style={{ fontSize: '0.8125rem' }}>
                  04 // Eco Resort (Nature’s Nest)
                </a>
              </li>
              <li>
                <a href="#projects" className="arch-link" style={{ fontSize: '0.8125rem' }}>
                  05 // Flow Spire (Watchtower)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              DIGITAL MONOGRAPH
            </span>
            <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
              Concept: Architecture Magazine × Digital Atlas × Architectural Model.<br />
              Typography: Cormorant Garamond · Inter · DM Mono.<br />
              Palette: Warm Paper #F4F0E8 · Ink #1A1815 · Blueprint Navy #1A2B4A.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
                PRACTICE
              </span>
              <span className="arch-tech-value" style={{ display: 'block' }}>
                ARCHITECTURE SHAPED BY PLACE
              </span>
              <span className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
                Graduate Architect · India
              </span>
            </div>

            <div style={{ marginTop: 'var(--space-md)' }}>
              <button
                type="button"
                onClick={scrollToTop}
                className="arch-button"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.6875rem' }}
                aria-label="Scroll back to top of page"
              >
                TOP OF FOLIO ↑
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal Strip */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: 'var(--space-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>© {new Date().getFullYear()} SARAVANAKUMAR K. ALL RIGHTS RESERVED.</span>
          <span>ARCHITECTURE SHAPED BY PLACE</span>
        </div>
      </Container>
    </footer>
  );
}
