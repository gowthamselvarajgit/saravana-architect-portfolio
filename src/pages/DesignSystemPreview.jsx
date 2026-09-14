import React, { useState } from 'react';
import {
  Container,
  Section,
  Eyebrow,
  SectionHeader,
  ArchLink,
  ArrowLink,
  ArchButton,
  MetadataRow,
  Hairline,
} from '../components/ArchPrimitives';

export default function DesignSystemPreview() {
  const [activeSurface, setActiveSurface] = useState('dark');

  const toggleSurface = () => {
    setActiveSurface((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={activeSurface === 'light' ? 'surface-light' : 'surface-dark'}>
      {/* Top Architectural System Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--color-border)',
          paddingTop: 'var(--space-sm)',
          paddingBottom: 'var(--space-sm)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--color-bg)',
          zIndex: 100,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <span className="arch-marker">
                <span className="arch-marker-dot"></span>
                STEP 1 SPECIFICATION
              </span>
              <span className="arch-hairline-vertical" style={{ height: '14px' }}></span>
              <span className="arch-tech-label">FOUNDATION PREVIEW</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <button
                type="button"
                onClick={toggleSurface}
                className="arch-button"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.6875rem' }}
                aria-label="Toggle between dark and light surface preview"
              >
                SURFACE: {activeSurface.toUpperCase()}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* 01. TYPOGRAPHY SYSTEM */}
      <Section surface={activeSurface}>
        <Container>
          <SectionHeader
            index="SEC. 01 / TYPOGRAPHY"
            eyebrow="TYPE HIERARCHY"
            title="Typographic Proportions & Scale"
            subtitle="Display: Cormorant Garamond · Body: Inter · Technical: DM Mono"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                Display Hero (clamp: 2.75rem – 6.0rem)
              </span>
              <h1 className="arch-display-hero">
                Architecture <em>Shaped</em> by Place
              </h1>
            </div>

            <Hairline variant="subtle" />

            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                Display Large (clamp: 2.25rem – 4.25rem)
              </span>
              <h2 className="arch-display-large">
                Spatial Rigor & Ecological Form
              </h2>
            </div>

            <Hairline variant="subtle" />

            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                Display Medium (clamp: 1.75rem – 2.85rem)
              </span>
              <h3 className="arch-display-medium">
                Geographic Atlas & Digital Artifacts
              </h3>
            </div>

            <Hairline variant="subtle" />

            <div>
              <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                Section Heading (clamp: 1.5rem – 2.25rem)
              </span>
              <h4 className="arch-section-heading">
                Climatic Context & Programmatic Logic
              </h4>
            </div>

            <Hairline variant="subtle" />

            <div className="arch-split-equal">
              <div>
                <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                  Body Large (Introductory / Lead copy)
                </span>
                <p className="arch-body-large">
                  The portfolio structure translates architectural thinking into digital space:
                  investigating place first, developing spatial form, and resolving structure through precise tectonic execution.
                </p>
              </div>
              <div>
                <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                  Body Regular & Body Small
                </span>
                <p className="arch-body" style={{ marginBottom: 'var(--space-sm)' }}>
                  Every project exists within physical coordinates, cultural realities, and material constraints.
                  Architecture is not an autonomous object dropped onto a neutral site, but a dialogue with terrain, climate, and time.
                </p>
                <p className="arch-body-small">
                  Note: Body text strictly respects line length boundaries of less than 70 characters for optimal architectural reading.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Hairline />

      {/* 02. COLOR SYSTEM */}
      <Section surface={activeSurface} compact>
        <Container>
          <SectionHeader
            index="SEC. 02 / CHROMATIC LOGIC"
            eyebrow="LOCKED PALETTE"
            title="Architectural Palette & Contrast Validation"
            subtitle="Authoritative hex values locked from MASTER_CREATIVE_DIRECTION_FINAL.md"
          />

          <div className="arch-grid-3col">
            {/* Color Swatch 1 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#0A0906',
                  border: '1px solid rgba(232, 228, 220, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Near Black" />
              <MetadataRow label="HEX" value="#0A0906" />
              <MetadataRow label="ROLE" value="Deep Charcoal Canvas" />
            </div>

            {/* Color Swatch 2 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#F4F0E8',
                  border: '1px solid rgba(26, 24, 21, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Warm Paper" />
              <MetadataRow label="HEX" value="#F4F0E8" />
              <MetadataRow label="ROLE" value="Architectural Drawing Base" />
            </div>

            {/* Color Swatch 3 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#1A1815',
                  border: '1px solid rgba(232, 228, 220, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Ink" />
              <MetadataRow label="HEX" value="#1A1815" />
              <MetadataRow label="ROLE" value="Primary Text on Light" />
            </div>

            {/* Color Swatch 4 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#E8E4DC',
                  border: '1px solid rgba(26, 24, 21, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Chalk" />
              <MetadataRow label="HEX" value="#E8E4DC" />
              <MetadataRow label="ROLE" value="Rules, Grids & Borders" />
            </div>

            {/* Color Swatch 5 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#1A2B4A',
                  border: '1px solid rgba(232, 228, 220, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Blueprint Navy" />
              <MetadataRow label="HEX" value="#1A2B4A" />
              <MetadataRow label="ROLE" value="Technical Blueprints / Accents" />
            </div>

            {/* Color Swatch 6 */}
            <div className="arch-panel">
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#C41E2A',
                  border: '1px solid rgba(232, 228, 220, 0.2)',
                  marginBottom: 'var(--space-sm)',
                }}
              />
              <MetadataRow label="NAME" value="Crimson" />
              <MetadataRow label="HEX" value="#C41E2A" />
              <MetadataRow label="ROLE" value="Restrained Coordinate Indicator" />
            </div>
          </div>
        </Container>
      </Section>

      <Hairline />

      {/* 03. SURFACE INVERSION DEMONSTRATION */}
      <Section surface={activeSurface === 'dark' ? 'light' : 'dark'}>
        <Container>
          <SectionHeader
            index="SEC. 03 / SURFACE INVERSION"
            eyebrow="LIGHT & DARK SURFACES"
            title={
              activeSurface === 'dark'
                ? 'Warm Paper Inversion Surface (#F4F0E8)'
                : 'Near Black Master Surface (#0A0906)'
            }
            subtitle="Dual-surface architecture supports full dark-mode and light editorial presentations."
          />

          <div className="arch-split-asymmetric">
            <div>
              <p className="arch-body-large" style={{ marginBottom: 'var(--space-md)' }}>
                Surfaces invert without losing typographic clarity or architectural identity.
                Hairlines, borders, and metadata rows dynamically adjust contrast while maintaining identical structural alignment.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                <ArchButton variant="outline">TECHNICAL SPECIFICATION</ArchButton>
                <ArchButton variant="accent">EXPLORE ARCHIVE</ArchButton>
              </div>
            </div>

            <div className="arch-panel">
              <div className="arch-panel-header">
                <span className="arch-tech-label">SURFACE METRICS</span>
                <span className="arch-section-index">[ TE-01 ]</span>
              </div>
              <MetadataRow label="CONTRAST RATIO" value="> 12.5:1 (WCAG AAA)" />
              <MetadataRow label="TEXT WEIGHT" value="Regular (400)" />
              <MetadataRow label="HAIRLINE OPACITY" value="12% Semantic Border" />
              <MetadataRow label="ACCENT BEHAVIOR" value="Restrained Crimson Pin" />
            </div>
          </div>
        </Container>
      </Section>

      <Hairline />

      {/* 04. EDITORIAL GRID & STRUCTURAL ALIGNMENT */}
      <Section surface={activeSurface}>
        <Container>
          <SectionHeader
            index="SEC. 04 / EDITORIAL GRID"
            eyebrow="STRUCTURE"
            title="12-Column Architectural System & Spacing Scale"
            subtitle="Precision alignment lines with zero superfluous decorative elements."
          />

          {/* 12-Column Visualizer */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>
              12-Column Proportional Layout
            </span>
            <div className="arch-grid-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: 'var(--space-xs) 0',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          {/* Spacing Progression Visualizer */}
          <div>
            <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>
              Spacing Scale Progression (4px to 136px)
            </span>
            <div className="arch-grid-4col">
              <div className="arch-panel">
                <div className="arch-tech-label">TIGHT SPACING</div>
                <MetadataRow label="3XS" value="0.25rem (4px)" />
                <MetadataRow label="2XS" value="0.50rem (8px)" />
                <MetadataRow label="XS" value="0.75rem (12px)" />
                <MetadataRow label="SM" value="1.00rem (16px)" />
              </div>
              <div className="arch-panel">
                <div className="arch-tech-label">MEDIUM SPACING</div>
                <MetadataRow label="MD" value="1.50rem (24px)" />
                <MetadataRow label="LG" value="2.00rem (32px)" />
                <MetadataRow label="XL" value="3.00rem (48px)" />
              </div>
              <div className="arch-panel">
                <div className="arch-tech-label">EXPANSIVE SPACING</div>
                <MetadataRow label="2XL" value="4.50rem (72px)" />
                <MetadataRow label="3XL" value="6.00rem (96px)" />
                <MetadataRow label="4XL" value="8.50rem (136px)" />
              </div>
              <div className="arch-panel">
                <div className="arch-tech-label">PAGE MARGINS</div>
                <MetadataRow label="GUTTER" value="clamp(1.25rem, 3.5vw, 4rem)" />
                <MetadataRow label="SECTION-Y" value="clamp(4rem, 8vw, 8.5rem)" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Hairline />

      {/* 05. INTERACTION PRIMITIVES & ACCESSIBILITY FOCUS */}
      <Section surface={activeSurface} compact>
        <Container>
          <SectionHeader
            index="SEC. 05 / INTERACTION & A11Y"
            eyebrow="TACTILE CONTROLS"
            title="Architectural Links, Buttons & Focus States"
            subtitle="Tab through controls to test visible keyboard focus rings."
          />

          <div className="arch-split-equal">
            <div className="arch-panel">
              <div className="arch-panel-header">
                <span className="arch-tech-label">PRIMITIVE CONTROLS</span>
                <span className="arch-marker">
                  <span className="arch-marker-dot"></span>
                  ACCESSIBLE
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                    Architectural Text Link:
                  </span>
                  <ArchLink href="#test-link">Explore Cultural Oasis Documentation</ArchLink>
                </div>

                <div>
                  <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                    Directional Arrow Link:
                  </span>
                  <ArrowLink href="#test-arrow">View Site Chronology</ArrowLink>
                </div>

                <div>
                  <span className="arch-tech-label" style={{ display: 'block', marginBottom: 'var(--space-2xs)' }}>
                    Button States (Outline & Accent):
                  </span>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                    <ArchButton>GEOMETRIC STUDY</ArchButton>
                    <ArchButton variant="accent">DOWNLOAD BLUEPRINT</ArchButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="arch-panel">
              <div className="arch-panel-header">
                <span className="arch-tech-label">ACCESSIBILITY COMPLIANCE</span>
                <span className="arch-section-index">[ A11Y-CHECK ]</span>
              </div>
              <MetadataRow label="FOCUS RING" value="2px Solid Crimson / 3px Offset" />
              <MetadataRow label="REDUCED MOTION" value="@media (prefers-reduced-motion) Active" />
              <MetadataRow label="CUSTOM CURSOR" value="BANNED (Native OS Cursor Retained)" />
              <MetadataRow label="TOUCH TARGETS" value=">= 44px Interactive Height" />
              <MetadataRow label="SEMANTIC HTML" value="header, section, main, h1-h4, hr" />
            </div>
          </div>
        </Container>
      </Section>

      <Hairline />

      {/* Footer System Status Bar */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-lg)',
          paddingBottom: 'var(--space-lg)',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
            }}
          >
            <div>
              <span className="arch-tech-label" style={{ display: 'block' }}>
                SARAVANAKUMAR K — ARCHITECTURAL PORTFOLIO
              </span>
              <span className="arch-body-small">
                Design System Foundation · Step 1 Verification Complete
              </span>
            </div>
            <div>
              <span className="arch-section-index">
                ARCHITECTURE MAGAZINE × DIGITAL ATLAS × ARCHITECTURAL MODEL
              </span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
