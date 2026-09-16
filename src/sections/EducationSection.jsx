import React from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';

export default function EducationSection() {
  return (
    <section
      id="education"
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
          index="SEC. 07 / PEDAGOGY"
          eyebrow="ACADEMIC BACKGROUND"
          title="Architectural Education"
          subtitle="Accredited degree foundation, academic coursework, and institutional design studies."
        />

        <div className="arch-split-asymmetric" style={{ gap: 'var(--space-xl)' }}>
          {/* Main University Education Card */}
          <div data-anim="about-content">
            <div
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-xl)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 'var(--space-xs)',
                }}
              >
                <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                  PRIMARY ARCHITECTURAL DEGREE
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  2021 – 2026
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 400, margin: '0 0 var(--space-2xs)' }}>
                Bachelor of Architecture (B.Arch)
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                Lovely School of Architecture and Design, Lovely Professional University (LPU), Phagwara, Punjab
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-md)',
                  alignItems: 'center',
                  padding: 'var(--space-sm) var(--space-md)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                <div>
                  <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                    CUMULATIVE GRADE
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                    CGPA 7.49
                  </span>
                </div>
                <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--color-border)' }} />
                <div>
                  <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                    CAPSTONE THESIS
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    Ribbon of Life — Techno-Park Phase IV Master Plan
                  </span>
                </div>
              </div>

              <p className="arch-body" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Five-year intensive Council of Architecture (CoA) compliant curriculum emphasizing architectural design studios,
                climatic site planning, parametric computational morphogenesis, structural engineering systems, and urban sociology.
              </p>
            </div>

            {/* Senior Secondary Schooling Card */}
            <div
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
                  marginBottom: 'var(--space-2xs)',
                }}
              >
                <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
                  HIGHER SECONDARY EDUCATION
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  2021
                </span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 var(--space-2xs)' }}>
                Senior Secondary Education (HSC)
              </h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 var(--space-xs)' }}>
                Saratha International School, Erode, Tamil Nadu · <strong>Score: 77.2%</strong>
              </p>
            </div>
          </div>

          {/* Side Pedagogical & Linguistic Competency Panel */}
          <div data-anim="about-content">
            {/* Linguistic Proficiency Panel */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-lg)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              <span className="arch-tech-label" style={{ color: 'var(--color-accent)', display: 'block', marginBottom: 'var(--space-sm)' }}>
                LINGUISTIC PROFICIENCY
              </span>
              {[
                { lang: 'English', fluency: 'Proficient / Professional Academic' },
                { lang: 'Tamil', fluency: 'Native' },
                { lang: 'Kannada', fluency: 'Fluent' },
                { lang: 'Hindi', fluency: 'Intermediate / Working Proficiency' },
              ].map(({ lang, fluency }) => (
                <div
                  key={lang}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    paddingTop: 'var(--space-xs)',
                    paddingBottom: 'var(--space-xs)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500 }}>{lang}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{fluency}</span>
                </div>
              ))}
            </div>

            {/* Academic Core Disciplines */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-lg)',
              }}
            >
              <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--space-sm)' }}>
                STUDIO CURRICULUM HIGHLIGHTS
              </span>
              {[
                'Advanced Architectural Design Studios (Sem I–X)',
                'Urban Planning & Kevin Lynch Cognitive Mapping',
                'Climate-Responsive & Sustainable Architecture (GRIHA)',
                'Building Information Modeling (BIM) Standards & Co-ordination',
                'Parametric Design & Computational Facades (Grasshopper)',
                'Landscape Ecology & Contour Topography Adaptation',
              ].map((course, idx) => (
                <div
                  key={idx}
                  style={{
                    paddingTop: 'var(--space-2xs)',
                    paddingBottom: 'var(--space-2xs)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.02em',
                  }}
                >
                  · {course}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
