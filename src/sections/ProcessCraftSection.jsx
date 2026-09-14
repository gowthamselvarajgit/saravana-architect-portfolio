import React, { useState } from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';

export default function ProcessCraftSection() {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      num: '01',
      title: 'Territorial Cartography',
      subtitle: 'Kevin Lynch Urban Systems & Pilgrimage Trajectories',
      medium: 'Hand-Drafted Diagram & GIS Vector Analysis',
      image: '/assets/images/projects/cultural-oasis/cultural-oasis-process-01.webp',
      alt: 'Kevin Lynch analytical urban landmarks diagram of Katra',
      description:
        'Rigorous analytical mapping of the Katra urban ecosystem: identifying nodes (railway terminal, bazaar, transit hubs), paths (pilgrim trails), edges (river corridors), and sacred temple landmarks before drawing a single architectural line.',
      specs: [
        { label: 'FRAMEWORK', value: 'Image of the City (Lynchian Nodes & Edges)' },
        { label: 'TOPOGRAPHY', value: '754m Grade Transition' },
        { label: 'OUTPUT', value: 'Spatial Movement Vectors' },
      ],
    },
    {
      num: '02',
      title: 'Physical Contour Maquette',
      subtitle: 'Sub-Himalayan Stepped Grade Analysis',
      medium: 'Laser-Cut & Hand-Finished High-Density Foam',
      image: '/assets/images/projects/cultural-oasis/cultural-oasis-model-01.webp',
      alt: 'Studio photograph of physical foam contour model of Katra foothills',
      description:
        'Handcrafted stepped foam contour layers modeling the severe grade transitions of the Himalayan foothills. Physical models reveal light penetration, slope constraints, and terracing opportunities invisible on flat digital planes.',
      specs: [
        { label: 'MATERIAL', value: 'High-Density Architectural Foam' },
        { label: 'SCALE', value: '1:500 Topographic Study' },
        { label: 'STUDY GOAL', value: 'Cut-and-Fill Terracing & Retaining' },
      ],
    },
  ];

  const currentStep = processSteps[activeStep];

  return (
    <section
      id="process"
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
          index="SEC. 05 / DISCIPLINE & CRAFT"
          eyebrow="TECTONIC METHODOLOGY"
          title="Drawing · Model · Form"
          subtitle="Architecture realized through iterative physical modeling and analytical territorial mapping."
        />

        {/* Interactive Step Switcher Bar */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-xs)',
          }}
        >
          {processSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.5rem 1.25rem',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                  backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all var(--transition-fast) ease',
                }}
              >
                PHASE {step.num}: {step.title}
              </button>
            );
          })}
        </div>

        {/* Feature Reveal Showcase */}
        <div
          data-anim="process-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {/* Visual Showcase Frame with Clip-Path Reveal */}
          <div
            className="process-reveal-step"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 11',
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-border-subtle)',
              overflow: 'hidden',
            }}
          >
            <img
              key={currentStep.image}
              src={currentStep.image}
              alt={currentStep.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                animation: 'fadeIn 0.5s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: 'rgba(26, 24, 21, 0.85)',
                color: 'var(--color-raw-warm-paper)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {currentStep.medium}
            </div>
          </div>

          {/* Narrative & Parameter Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-2xs)' }}>
              <span className="arch-section-index" style={{ color: 'var(--color-accent)' }}>
                DISCIPLINE // {currentStep.num}
              </span>
              <span className="arch-tech-label">STUDIO CRAFT &amp; INVESTIGATION</span>
            </div>

            <h3 className="arch-display-medium" style={{ marginBottom: 'var(--space-2xs)' }}>
              {currentStep.title}
            </h3>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                display: 'block',
                marginBottom: 'var(--space-md)',
              }}
            >
              {currentStep.subtitle}
            </span>

            <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
              {currentStep.description}
            </p>

            {/* Step Specifications */}
            <div
              style={{
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-surface-elevated)',
                padding: 'var(--space-sm) var(--space-md)',
              }}
            >
              {currentStep.specs.map((sp) => (
                <div
                  key={sp.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.25rem 0',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span className="arch-tech-label">{sp.label}</span>
                  <span className="arch-tech-value">{sp.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodological Sequence Ribbon */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          <div>
            <span className="arch-section-index" style={{ color: 'var(--color-accent)' }}>PHASE 01</span>
            <div className="arch-display-medium" style={{ fontSize: '1.25rem', margin: '4px 0' }}>
              Territorial Inquiry
            </div>
            <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
              Investigating microclimate, solar azimuth, cultural memory, and existing human flow.
            </p>
          </div>

          <div>
            <span className="arch-section-index" style={{ color: 'var(--color-accent)' }}>PHASE 02</span>
            <div className="arch-display-medium" style={{ fontSize: '1.25rem', margin: '4px 0' }}>
              Physical &amp; Digital Tectonics
            </div>
            <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
              Simultaneous physical massing studies and Grasshopper algorithmic constraint resolution.
            </p>
          </div>

          <div>
            <span className="arch-section-index" style={{ color: 'var(--color-accent)' }}>PHASE 03</span>
            <div className="arch-display-medium" style={{ fontSize: '1.25rem', margin: '4px 0' }}>
              Spatial Synthesis
            </div>
            <p className="arch-body-small" style={{ color: 'var(--color-text-secondary)' }}>
              Translating structural parameters into breathable public enclosures and civic monuments.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
