import React from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';

export default function AchievementsCertificationsSection() {
  const certifications = [
    {
      title: 'BIM Architecture Professional Course',
      issuer: 'Novatr',
      period: 'Jul 2025 – Present',
      focus: 'Revit BIM workflows, IFC schemas, BIM Execution Plans (BEP), parametric families, and coordination matrices.',
      tag: 'BIM & REVIEWS',
    },
    {
      title: 'BIM Project Standards — Revit, ACC & Navisworks',
      issuer: 'Autodesk Construction Cloud / ACC',
      period: 'Feb 2026',
      focus: 'Clash detection, Navisworks Manage 4D simulation, common data environments, and collaborative BIM standards.',
      tag: 'COORDINATION',
    },
    {
      title: 'Rhino 3D & Grasshopper Parametric Logic',
      issuer: 'Lumos Archi Lab',
      period: 'Jul 2023 – Aug 2023',
      focus: 'Algorithmic geometric progression, computational surface panelization, attractor curves, and generative facade optimization.',
      tag: 'PARAMETRIC',
    },
    {
      title: 'AutoCAD Professional Certified',
      issuer: 'Human Resource Development (HRD)',
      period: 'Aug 2022',
      focus: 'Precision 2D architectural working drawings, municipal approval drafting, and layer hierarchy management.',
      tag: 'DRAFTING',
    },
  ];

  const competitions = [
    {
      name: '120 HOURS International Architectural Competition',
      host: 'Oslo School of Architecture and Design (AHO) · Oslo, Norway',
      period: 'March 2025',
      project: 'On the Path to Rediscovery (Möbius Loop Pavilion)',
      site: 'Tullinløkka Square, Oslo',
      summary:
        'Conceived under the international design brief "The Art of Losing"—contemplating what occurs when ancient languages and cultural identity vanish. Translated Norse runic poetry into a continuous, single-sided timber Möbius surface uniting public gathering and acoustic exhibition.',
      status: 'International Submission · Complete Dossier & 3D Maquette',
      anchorLink: '/projects/mobius',
    },
    {
      name: 'GRIHA Trophy National Architecture Competition',
      host: 'GRIHA Council / National Association of Students of Architecture',
      period: 'February 2025',
      project: "Eco Resort — Nature's Nest",
      site: 'Ghodegaon, Pune District, Maharashtra',
      summary:
        'Engineered for rigorous GRIHA Green Building Rating standards on steep Western Ghats foothills. Utilized cut-and-fill slope adaptation, upcycled shipping containers, passive cross-ventilation, rainwater retention swales, and vernacular Wada timber elements.',
      status: 'Competition Design Entry · Complete BIM & Sustainability Dossier',
      anchorLink: '/projects/eco-resort',
    },
  ];

  return (
    <section
      id="achievements"
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
          index="SEC. 08 / MERIT"
          eyebrow="COMPETITIONS &amp; ACCREDITATIONS"
          title="Achievements &amp; Certifications"
          subtitle="International design competition submissions and specialized computational BIM qualifications."
        />

        {/* Section Part 1: Competition Achievements */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 'var(--space-xs)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: 'var(--space-md)',
            }}
          >
            <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
              01 / ARCHITECTURAL COMPETITIONS
            </span>
            <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
              JURIED &amp; INTERNATIONAL ENTRIES
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {competitions.map((comp) => (
              <div
                key={comp.name}
                data-anim="project-card"
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                    <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                      {comp.period}
                    </span>
                    <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
                      COMPETITION
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, margin: '0 0 var(--space-2xs)' }}>
                    {comp.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                    {comp.host}
                  </p>

                  <div
                    style={{
                      borderLeft: '2px solid var(--color-accent)',
                      paddingLeft: 'var(--space-sm)',
                      marginBottom: 'var(--space-md)',
                    }}
                  >
                    <span className="arch-tech-label" style={{ display: 'block', color: 'var(--color-text-muted)' }}>
                      SUBMITTED SCHEME:
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500 }}>
                      {comp.project}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                      Location: {comp.site}
                    </span>
                  </div>

                  <p className="arch-body" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                    {comp.summary}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: 'var(--space-sm)',
                    borderTop: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                    ✓ {comp.status}
                  </span>
                  {comp.anchorLink && (
                    <a
                      href={comp.anchorLink}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-primary)',
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                      }}
                    >
                      EXPLORE MONOGRAPH →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Part 2: Verified Professional Certifications */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 'var(--space-xs)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: 'var(--space-md)',
            }}
          >
            <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
              02 / PROFESSIONAL CERTIFICATIONS
            </span>
            <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
              VERIFIED SPECIALIZATIONS
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.title}
                data-anim="about-content"
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
                    <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                      [{cert.tag}]
                    </span>
                    <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)' }}>
                      {cert.period}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 400, margin: '0 0 var(--space-2xs)' }}>
                    {cert.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: 'var(--space-xs)' }}>
                    {cert.issuer}
                  </p>

                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {cert.focus}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 'var(--space-md)',
                    paddingTop: 'var(--space-xs)',
                    borderTop: '1px solid var(--color-border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  VERIFIED ACCREDITATION
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
