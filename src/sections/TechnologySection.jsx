import React, { useState } from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';

export default function TechnologySection() {
  const [activeTab, setActiveTab] = useState('all');

  const techCategories = [
    { id: 'all', label: 'ALL TECHNOLOGIES' },
    { id: 'bim', label: 'BIM & 3D MODELING' },
    { id: 'parametric', label: 'PARAMETRIC COMPUTATION' },
    { id: 'visualization', label: 'RENDERING & VIZ' },
    { id: 'production', label: 'GRAPHIC & DOCUMENTATION' },
  ];

  const tools = [
    { name: 'Autodesk Revit', category: 'bim', proficiency: 'Advanced BIM Modeling & Documentation', icon: 'RVT', highlights: 'Parametric families, coordination models, working sheets' },
    { name: 'Rhinoceros 3D', category: 'bim', proficiency: 'Complex NURBS & Freeform Surface Modeling', icon: 'R3D', highlights: 'Topological pavilions, high-rise massing, mesh export' },
    { name: 'SketchUp Pro', category: 'bim', proficiency: 'Rapid Spatial & Volumetric Massing', icon: 'SKP', highlights: 'Urban block studies, schematic client presentations' },
    { name: 'AutoCAD', category: 'bim', proficiency: 'Working Drawings & Technical Drafting', icon: 'CAD', highlights: 'Municipal sanctions, architectural details, sections' },
    { name: 'Shapr3D', category: 'bim', proficiency: 'Precision Direct Modeling', icon: 'S3D', highlights: 'Product architecture, tactile detailing' },

    { name: 'Grasshopper', category: 'parametric', proficiency: 'Algorithmic Morphogenesis & Logic', icon: 'GH', highlights: 'Möbius loops, Voronoi lattices, parametric skinning' },
    { name: 'Computational Analysis', category: 'parametric', proficiency: 'Environmental & Solar Sun-Path Mapping', icon: 'CMP', highlights: 'Contour cut-and-fill, wind vector aerodynamics' },

    { name: 'Enscape 3D', category: 'visualization', proficiency: 'Real-Time Architectural Walkthroughs', icon: 'ENS', highlights: 'Lighting studies, client VR previews, live rendering' },
    { name: 'D5 Render', category: 'visualization', proficiency: 'Photorealistic Real-Time Ray Tracing', icon: 'D5', highlights: 'Vegetation scattering, atmospheric weather simulation' },
    { name: 'Lumion Pro', category: 'visualization', proficiency: 'Cinematic Environmental Animation', icon: 'LUM', highlights: 'Landscape framing, seasonal lighting sequences' },
    { name: 'Chaos V-Ray', category: 'visualization', proficiency: 'Physically Based Lighting & Materiality', icon: 'VRY', highlights: 'Sub-surface scattering, photorealistic textures' },
    { name: 'Twinmotion', category: 'visualization', proficiency: 'Unreal Engine ArchViz Simulation', icon: 'TM', highlights: 'Dynamic transit & populated urban public realms' },

    { name: 'Adobe Photoshop', category: 'production', proficiency: 'Post-Production & Collage Architecture', icon: 'PS', highlights: 'Atmospheric depth, materiality layering, hero renders' },
    { name: 'Adobe Illustrator', category: 'production', proficiency: 'Vector Axonometrics & Diagrams', icon: 'AI', highlights: 'Lynchian urban diagrams, schematic circulation pathing' },
    { name: 'Affinity Suite & InDesign', category: 'production', proficiency: 'Editorial Portfolio Monograph Curation', icon: 'ID', highlights: 'High-density architectural book spreads, typography' },
    { name: 'Microsoft Office & Canva', category: 'production', proficiency: 'Client Presentations & Specifications', icon: 'PPT', highlights: 'Executive pitch decks, project scheduling, reports' },
  ];

  const filteredTools = activeTab === 'all' ? tools : tools.filter((t) => t.category === activeTab);

  return (
    <section
      id="technology"
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
          index="SEC. 09 / TOOLKIT"
          eyebrow="SOFTWARE &amp; COMPUTATIONAL SYSTEMS"
          title="Technology &amp; Tooling"
          subtitle="Software stack, parametric environments, and high-performance digital visualization pipelines."
        />

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-md)',
          }}
        >
          {techCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                style={{
                  background: isActive ? 'var(--color-text-primary)' : 'transparent',
                  color: isActive ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '0.45rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              data-anim="about-content"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-md)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border)',
                      padding: '2px 6px',
                    }}
                  >
                    {tool.icon}
                  </span>
                  <span className="arch-tech-label" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                    {tool.category}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 var(--space-2xs)' }}>
                  {tool.name}
                </h4>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                  {tool.proficiency}
                </p>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  {tool.highlights}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
