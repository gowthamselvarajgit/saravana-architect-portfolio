import React from 'react';
import InteractiveModelViewer from '../three/ModelViewer/InteractiveModelViewer';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import { MOBIUS_MODEL_MANIFEST } from '../data/models/mobiusModelData';
import '../styles/mobiusProject.css';

/**
 * MobiusProjectPage — Monograph Project Page & 3D Maquette Viewer
 * Corresponds to Step 4B of the architectural portfolio.
 */
export default function MobiusProjectPage({ onNavigate = null }) {
  const { theme, toggleTheme } = useTheme();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="mobius-page-root">
      {/* 1. Monograph Navigation Bar */}
      <header className="mobius-header" role="banner">
        <div className="mobius-header-left">
          <a
            href="/"
            onClick={(e) => handleNavigate(e, '/')}
            className="mobius-nav-link"
            aria-label="Return to Monograph Exhibition"
          >
            ← MONOGRAPH EXHIBITION
          </a>
          <span style={{ color: 'var(--color-border)', userSelect: 'none' }}>|</span>
          <a
            href="/atlas"
            onClick={(e) => handleNavigate(e, '/atlas')}
            className="mobius-nav-link"
            aria-label="Open Digital Architectural Atlas"
          >
            SPATIAL ATLAS ↗
          </a>
        </div>

        <div className="mobius-header-right">
          <button
            type="button"
            className="mobius-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? 'LIGHT MONOGRAPH' : 'DARK BLUEPRINT'}
          </button>
        </div>
      </header>

      {/* 2. Hero Header & Editorial Introduction */}
      <section className="mobius-hero-section" aria-labelledby="mobius-title">
        <div className="mobius-project-eyebrow">
          <span>PROJECT 01 / FIVE PRIMARY WORKS · 120 HOURS 2023</span>
          <span className="mobius-coords">
            REPRESENTATIVE COORDINATES: {MOBIUS_MODEL_MANIFEST.location.representativeCoordinates} (OSLO)
          </span>
        </div>

        <h1 id="mobius-title" className="mobius-title">
          {MOBIUS_MODEL_MANIFEST.title}
        </h1>
        <div className="mobius-subtitle">
          {MOBIUS_MODEL_MANIFEST.alternateTitle} · {MOBIUS_MODEL_MANIFEST.location.name}
        </div>

        <div className="mobius-intro-grid">
          <div>
            <blockquote className="mobius-thesis">
              &ldquo;{MOBIUS_MODEL_MANIFEST.thesis}&rdquo;
            </blockquote>
            <p className="mobius-body-text" style={{ marginBottom: '1rem' }}>
              Conceived for the prestigious 120 HOURS international design challenge under the theme
              &ldquo;The Art of Losing&rdquo;, this project interrogates what occurs when ancient languages,
              oral mythologies, and cultural memories vanish. Situated in Oslo&rsquo;s historic Tullinløkka
              square—flanked by the Historical Museum and the National Gallery—the scheme translates
              an Old Norse runic inscription into an unbroken, single-sided timber Möbius surface.
            </p>
            <p className="mobius-body-text">
              Public circulation, stepped gathering amphitheaters, and acoustic exhibition chambers are unified
              beneath a monumental 22.8-meter archway. The geometry bridges historic civic fabric with contemporary
              computational timber engineering.
            </p>
          </div>

          <aside className="mobius-meta-card" aria-label="Architectural Specifications">
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              PROJECT TELEMETRY
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">COMPETITION</span>
              <span className="mobius-meta-val">120 HOURS 2023</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">STUDIO CONTEXT</span>
              <span className="mobius-meta-val">8th Sem · Mar 2025</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">LOCATION</span>
              <span className="mobius-meta-val">Oslo, Norway</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">SHELL SPAN</span>
              <span className="mobius-meta-val">52.54m × 59.01m</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">PEAK HEIGHT</span>
              <span className="mobius-meta-val">22.77m Datum</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">STRUCTURE</span>
              <span className="mobius-meta-val">Glulam Ribs</span>
            </div>
            <div className="mobius-meta-row">
              <span className="mobius-meta-key">SOURCE MODEL</span>
              <span className="mobius-meta-val">Rhino OpenNURBS</span>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. The Dominant Hero: 3D Architectural Maquette Interactive Viewer */}
      <section className="mobius-maquette-section" aria-label="Interactive 3D Maquette">
        <div className="mobius-stage-header">
          <span>01 / INTERACTIVE DIGITAL MAQUETTE</span>
          <span>ORBIT · FOCUS · SHADING MODES · LAYER ISOLATION</span>
        </div>

        <InteractiveModelViewer projectSlug="mobius" theme={theme} />
      </section>

      {/* 4. Blueprint → Process Drawing Section */}
      <section className="mobius-process-section" aria-labelledby="process-heading">
        <div className="mobius-section-container">
          <div className="mobius-process-grid">
            <div className="mobius-process-figure">
              <img
                src="/assets/images/projects/mobius/mobius-process-01.webp"
                alt="Original architectural process drawings showing Möbius loop geometric derivation, unrolled surface, and runic tectonic details"
                className="mobius-process-img"
                loading="lazy"
              />
              <div className="mobius-figure-caption">
                FIG 01.01 — GEOMETRIC FORMATION STUDY · UNROLLED SURFACE &amp; RUNIC SOFFIT TECTONICS
              </div>
            </div>

            <div className="mobius-process-content">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                COMPUTATIONAL DERIVATION
              </div>
              <h2 id="process-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 300, marginBottom: '1rem' }}>
                From Runic Linework to Continuous Surface
              </h2>
              <p>
                The initial architectural research studied runic inscriptions discovered across Scandinavian cultural sites.
                Rather than treating runes as decorative two-dimensional ornament, the linework was mathematically translated
                into the non-orientable topological logic of the Möbius strip.
              </p>
              <p>
                By twisting a ribbon 180 degrees before uniting its boundaries, the distinction between interior ceiling,
                exterior roof, and pedestrian ground dissolves. The soffit inscriptions carved into the ascending arch
                act as an acoustic filter, directing natural soundscapes down into the amphitheater while memorializing
                endangered linguistic dialects.
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-text-muted)', borderLeft: '2px solid var(--color-border-strong)', paddingLeft: '0.75rem' }}>
                SOURCE ARCHIVE: client-assets/On the path to Rediscovery_06/
                <br />
                GENUINE ARCHITECTURAL DRAWINGS BY SARAVANAKUMAR K
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Spatial Immersion & Walkthrough Foundation (Walkthrough - if available) */}
      <section className="mobius-walkthrough-dispatch" aria-label="Walkthrough & Spatial Immersion">
        <div className="mobius-dispatch-box">
          <div className="mobius-dispatch-info">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                marginBottom: '0.35rem',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              EXPERIENCE PIPELINE · STEP 4C FOUNDATION
            </div>
            <h4>03 / Spatial Immersion: Walk Inside</h4>
            <p>
              The current Step 4B establishes the real OpenNURBS 3D maquette, orbit controls, and architectural layer isolation.
              In Step 4C, the [ENTER THE SPACE] trigger will unlock full first-person WASD navigation, collision boundaries,
              and spatial audio inside the timber loop.
            </p>
          </div>

          <a
            href="/"
            onClick={(e) => handleNavigate(e, '/')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              border: '1px solid var(--color-border-strong)',
              padding: '0.75rem 1.4rem',
              backgroundColor: 'var(--color-surface)',
              transition: 'all 0.2s ease',
            }}
          >
            ← RETURN TO MONOGRAPH EXHIBITION
          </a>
        </div>
      </section>

      {/* 6. Photographic Render Documentation (Final Architecture) */}
      <section className="mobius-gallery-section" aria-labelledby="gallery-heading">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '0.5rem',
          }}
        >
          <h2 id="gallery-heading" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300 }}>
            04 / Final Architectural Visualizations &amp; Atmospheric Studies
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            FIG 01.02 — 01.04
          </span>
        </div>

        <div className="mobius-gallery-grid">
          <article className="mobius-gallery-card">
            <img
              src="/assets/images/projects/mobius/mobius-hero.webp"
              alt="Monumental aerial render of the timber Möbius pavilion situated in Tullinløkka square"
              className="mobius-gallery-img"
              loading="lazy"
            />
            <div className="mobius-gallery-meta">
              <div className="mobius-gallery-title">Civic Presence in Tullinløkka</div>
              <div className="mobius-gallery-sub">Primary Competition Render · Oslo Atmosphere</div>
            </div>
          </article>

          <article className="mobius-gallery-card">
            <img
              src="/assets/images/projects/mobius/mobius-detail-01.webp"
              alt="Close-up detail render of the ascending timber arch and pedestrian circulation ramp"
              className="mobius-gallery-img"
              loading="lazy"
            />
            <div className="mobius-gallery-meta">
              <div className="mobius-gallery-title">Ascending Timber Archway</div>
              <div className="mobius-gallery-sub">Pedestrian Circulation &amp; Glulam Rib Tectonics</div>
            </div>
          </article>

          <article className="mobius-gallery-card">
            <img
              src="/assets/images/projects/mobius/mobius-detail-02.webp"
              alt="Perspective render of the runic soffit inscriptions and civic amphitheater"
              className="mobius-gallery-img"
              loading="lazy"
            />
            <div className="mobius-gallery-meta">
              <div className="mobius-gallery-title">Soffit Runic Articulations</div>
              <div className="mobius-gallery-sub">Acoustic Inscription &amp; Civic Gathering Chamber</div>
            </div>
          </article>
        </div>
      </section>

      {/* Colophon Footer */}
      <Footer />
    </div>
  );
}
