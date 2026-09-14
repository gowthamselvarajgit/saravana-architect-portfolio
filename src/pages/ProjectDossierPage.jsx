import React from 'react';
import Footer from '../components/Footer';
import InteractiveModelViewer from '../three/ModelViewer/InteractiveModelViewer';
import { useTheme } from '../hooks/useTheme';
import { PRIMARY_PROJECTS } from '../data/projectsData';
import { getProjectModelConfig } from '../data/models/projectModelRegistry';
import '../styles/projectDossier.css';

/**
 * ProjectDossierPage — Dedicated Architectural Monograph for Selected Projects
 * Resolves each project route (/projects/:slug) with its verified telemetry & independent 3D experience.
 */
export default function ProjectDossierPage({ slug, onNavigate = null }) {
  const { theme, toggleTheme } = useTheme();

  // Find project by slug or id
  const project = PRIMARY_PROJECTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  const modelConfig = getProjectModelConfig(project?.slug);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!project) {
    return (
      <div
        className="dossier-page-root"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}
        >
          PROJECT NOT FOUND // 404
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.4rem',
            fontWeight: 300,
            marginBottom: '1.5rem',
          }}
        >
          Uncataloged Architectural Node
        </h1>
        <a
          href="/"
          onClick={(e) => handleNavigate(e, '/')}
          className="dossier-action-btn"
        >
          ← RETURN TO MONOGRAPH EXHIBITION
        </a>
      </div>
    );
  }

  return (
    <div className="dossier-page-root">
      {/* 1. Header Navigation */}
      <header className="dossier-header" role="banner">
        <div className="dossier-header-left">
          <a
            href="/"
            onClick={(e) => handleNavigate(e, '/')}
            className="dossier-nav-link"
            aria-label="Return to Monograph Exhibition"
          >
            ← MONOGRAPH EXHIBITION
          </a>
          <span style={{ color: 'var(--color-border)', userSelect: 'none' }}>|</span>
          <a
            href="/atlas"
            onClick={(e) => handleNavigate(e, '/atlas')}
            className="dossier-nav-link"
            aria-label="Open Digital Architectural Atlas"
          >
            SPATIAL ATLAS ↗
          </a>
        </div>

        <div className="dossier-header-right">
          <button
            type="button"
            className="dossier-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? 'LIGHT MONOGRAPH' : 'DARK BLUEPRINT'}
          </button>
        </div>
      </header>

      {/* 2. Hero & Project Introduction */}
      <section className="dossier-hero-section" aria-labelledby="dossier-heading">
        <div className="dossier-eyebrow">
          <span>
            PROJECT {project.projectNumber} / FIVE PRIMARY WORKS · {project.year}
          </span>
          <span className="dossier-coords">
            REPRESENTATIVE LOCATION: {project.location.coordinates} ({project.location.city.toUpperCase()})
          </span>
        </div>

        <h1 id="dossier-heading" className="dossier-title">
          {project.title}
        </h1>
        <div className="dossier-subtitle">
          {project.alternateTitle} · {project.location.name}
        </div>

        <div className="dossier-intro-grid">
          <div>
            <blockquote className="dossier-thesis">
              &ldquo;{project.thesis}&rdquo;
            </blockquote>
            <p className="dossier-body-text">
              {project.description}
            </p>

            {/* Representative Location Governance Disclaimer */}
            <div className="dossier-disclaimer-box">
              <strong style={{ color: 'var(--color-text-primary)' }}>DATA GOVERNANCE NOTICE:</strong>
              <br />
              REPRESENTATIVE LOCATION COORDINATES ({project.location.coordinates})
              <br />
              CITY / REGIONAL LEVEL · NOT EXACT CADASTRAL SITE BOUNDARY
            </div>
          </div>

          <aside className="dossier-meta-card" aria-label="Project Telemetry">
            <div className="dossier-meta-heading">PROJECT PARAMETERS</div>
            <div className="dossier-meta-row">
              <span className="dossier-meta-key">TYPOLOGY</span>
              <span className="dossier-meta-val">{project.category.split('/')[0].trim()}</span>
            </div>
            <div className="dossier-meta-row">
              <span className="dossier-meta-key">CONTEXT</span>
              <span className="dossier-meta-val">{project.context}</span>
            </div>
            <div className="dossier-meta-row">
              <span className="dossier-meta-key">YEAR</span>
              <span className="dossier-meta-val">{project.year}</span>
            </div>
            <div className="dossier-meta-row">
              <span className="dossier-meta-key">LOCATION</span>
              <span className="dossier-meta-val">{project.location.city}, {project.location.country}</span>
            </div>
            <div className="dossier-meta-row">
              <span className="dossier-meta-key">3D ASSET</span>
              <span className="dossier-meta-val">
                {project.hasWebModel
                  ? 'Interactive 3D Maquette Ready'
                  : project.hasRaw3D
                  ? 'Authentic Archive (In Progress)'
                  : 'Drawing-Led Study'}
              </span>
            </div>
            {project.technicalSpecs && project.technicalSpecs.map((spec) => (
              <div key={spec.label} className="dossier-meta-row">
                <span className="dossier-meta-key">{spec.label}</span>
                <span className="dossier-meta-val">{spec.value}</span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* 3. Pillar 01: 3D MODEL EXPERIENCE */}
      {project.hasWebModel ? (
        /* Web-Ready 3D Interactive Model Viewer */
        <section className="dossier-maquette-section" aria-label={`Interactive 3D Digital Maquette: ${project.title}`}>
          <div className="dossier-stage-header">
            <span>01 / INTERACTIVE DIGITAL MAQUETTE · {project.title.toUpperCase()}</span>
            <span>ORBIT · FOCUS · SHADING MODES · LAYER ISOLATION</span>
          </div>

          <div style={{ height: '75vh', minHeight: '540px', position: 'relative' }}>
            <InteractiveModelViewer
              projectSlug={project.slug}
              modelConfig={modelConfig}
              theme={theme}
            />
          </div>
        </section>
      ) : project.hasRaw3D ? (
        /* Preparation in progress card for raw models (.skp, .rvt) */
        <section className="dossier-status-section" aria-label="3D Model Preparation Status">
          <div className="dossier-status-box">
            <div className="dossier-status-info">
              <div className="dossier-status-eyebrow">
                EXPERIENCE PILLAR 01 · 3D MODEL
              </div>
              <h4 style={{ color: 'var(--color-accent)' }}>
                3D MODEL — PREPARATION IN PROGRESS
              </h4>
              <p>
                Original source asset: <code>{project.rawModel}</code>.
                <br />
                {modelConfig?.conversionPipelineStatus ||
                  'The authentic client geometry is preserved intact within the archive. Direct web-ready 3D model conversion is in progress.'}
              </p>
            </div>

            <div className="dossier-status-actions">
              <a
                href="/atlas"
                onClick={(e) => handleNavigate(e, '/atlas')}
                className="dossier-action-btn"
              >
                LOCATE ON 3D ATLAS ↗
              </a>
            </div>
          </div>
        </section>
      ) : (
        /* Drawing & Render-led study for Flow Spire */
        <section className="dossier-status-section" aria-label="Drawing-Led Investigation Status">
          <div className="dossier-status-box">
            <div className="dossier-status-info">
              <div className="dossier-status-eyebrow">
                EXPERIENCE PILLAR 01 · 3D MODEL STATUS
              </div>
              <h4>
                DRAWING &amp; RENDER-LED INVESTIGATION
              </h4>
              <p>
                Conceived and detailed through 8 multi-level CAD vector plans, aerodynamic wind-shear section studies, and physical studio study models.
                Authentic client archive contains no raw 3D file; zero artificial or synthetic geometry substituted.
              </p>
            </div>

            <div className="dossier-status-actions">
              <a
                href="#process-heading"
                className="dossier-action-btn"
              >
                EXPLORE CAD VECTOR PLANS ↓
              </a>
              <a
                href="/atlas"
                onClick={(e) => handleNavigate(e, '/atlas')}
                className="dossier-action-btn"
              >
                LOCATE ON 3D ATLAS ↗
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 4. Pillar 02: DRAWING & PROCESS */}
      {(project.processImages?.length > 0 || project.supportingImages?.length > 0) && (
        <section className="dossier-gallery-section" id="process-heading" aria-labelledby="process-heading">
          <div className="dossier-gallery-container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '0.5rem',
                marginBottom: 'var(--space-xl)',
              }}
            >
              <h2 className="dossier-section-title" style={{ margin: 0 }}>
                02 / Generative Drawing, Physical Craft &amp; Process
              </h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                PROCESS STUDIES
              </span>
            </div>

            <div className="dossier-gallery-grid">
              {project.processImages?.map((imgUrl, idx) => (
                <article key={imgUrl} className="dossier-gallery-card">
                  <img
                    src={imgUrl}
                    alt={`${project.title} generative process drawing ${idx + 1}`}
                    loading="lazy"
                  />
                  <div className="dossier-gallery-card-footer">
                    FIG {project.projectNumber}.P0{idx + 1} · CRAFT &amp; PROCESS STUDY
                  </div>
                </article>
              ))}

              {project.supportingImages?.map((imgUrl, idx) => (
                <article key={imgUrl} className="dossier-gallery-card">
                  <img
                    src={imgUrl}
                    alt={`${project.title} detailed architectural study ${idx + 1}`}
                    loading="lazy"
                  />
                  <div className="dossier-gallery-card-footer">
                    FIG {project.projectNumber}.0{idx + 2} · TECTONIC DETAIL
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Pillar 03: WALKTHROUGH (IF AVAILABLE) */}
      <section className="dossier-status-section" style={{ margin: 'var(--space-2xl) auto' }} aria-label="Walkthrough Status">
        <div className="dossier-status-box">
          <div className="dossier-status-info">
            <div className="dossier-status-eyebrow">
              EXPERIENCE PILLAR 03 · WALKTHROUGH
            </div>
            <h4>03 / Spatial Immersion &amp; Walkthrough Status</h4>
            <p>
              {project.hasWebModel
                ? `Interactive spatial exploration is active in the 3D maquette above. First-person walking exploration is scheduled for Step 4C.`
                : `Interactive spatial walkthrough for ${project.title} will unlock upon conversion of its verified archive geometry.`}
            </p>
          </div>

          <div className="dossier-status-actions">
            <a
              href="/"
              onClick={(e) => handleNavigate(e, '/')}
              className="dossier-action-btn"
            >
              ← RETURN TO MONOGRAPH EXHIBITION
            </a>
          </div>
        </div>
      </section>

      {/* 6. Pillar 04: FINAL ARCHITECTURE (PRIMARY VISUALIZATION) */}
      {project.heroImage && (
        <section className="dossier-hero-stage" aria-label="Final Architectural Visualization">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '0.5rem',
              marginBottom: 'var(--space-md)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, margin: 0 }}>
              04 / Final Architectural Representation
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
              FIG {project.projectNumber}.01
            </span>
          </div>

          <div className="dossier-hero-frame">
            <img
              src={project.heroImage}
              alt={`Primary visual representation of ${project.title}`}
              className="dossier-hero-img"
            />
            <div className="dossier-hero-caption">
              <span>FIG {project.projectNumber}.01 — {project.title.toUpperCase()}</span>
              <span>{project.location.name.toUpperCase()}</span>
            </div>
          </div>
        </section>
      )}

      {/* Colophon Footer */}
      <Footer />
    </div>
  );
}
