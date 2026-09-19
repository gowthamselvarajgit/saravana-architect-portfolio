import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PRIMARY_PROJECTS } from '../data/projectsData';
import GlobeCanvas from '../three/Globe/GlobeCanvas';
import '../styles/selectedProjectsSection.css';

/**
 * 3D Project Scheme Card Component
 * Architectural card featuring authentic render thumbnail,
 * refined editorial typography, and direct 1-click flight trigger.
 * 
 * Uses an editorial ledger so the Earth remains the section's visual centre.
 */
function ProjectCard3D({ project, index, isSelected, onClick, onMouseEnter, onMouseLeave }) {
  const formattedNum = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`arch-card-3d ${isSelected ? 'is-selected' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open 3D Monograph for ${project.title}`}
    >
      <div className="arch-card-3d-inner">
        {/* Render Thumbnail Image with Gradient Scrim */}
        <div className="arch-card-3d-media">
          <img
            src={project.heroImage}
            alt={project.title}
            className="arch-card-3d-img"
            loading="lazy"
          />
          <div className="arch-card-3d-scrim" />

          {/* Top Metadata Badges on Image */}
          <div className="arch-card-3d-badges">
            <span className="arch-card-3d-num">// {formattedNum}</span>
            <span className="arch-card-3d-location">
              {project.location.city.toUpperCase()} · {project.year}
            </span>
          </div>

          {/* 3D Model / Drawing Badge */}
          <div className="arch-card-3d-tech-badge">
            <span className="arch-card-3d-tech-dot" />
            <span>{project.hasWebModel ? '3D MAQUETTE' : 'BIM CAD SET'}</span>
          </div>
        </div>

        {/* Card Typography & Project Context */}
        <div className="arch-card-3d-body">
          <h3 className="arch-card-3d-title">{project.title}</h3>
          <p className="arch-card-3d-context">
            {project.thesis || project.context}
          </p>

          {/* Micro Typology Tags */}
          <div className="arch-card-3d-specs">
            <span className="arch-card-3d-spec-pill">
              {project.technicalSpecs?.[0]?.value || 'Architecture'}
            </span>
            <span className="arch-card-3d-spec-pill">
              {project.category?.split('/')?.[0]?.trim() || 'Design Scheme'}
            </span>
          </div>

          {/* Direct 1-Click Flight Prompt */}
          <div className="arch-card-3d-action">
            <span className="arch-card-3d-action-text">FLY TO 3D MONOGRAPH</span>
            <span className="arch-card-3d-action-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * SelectedProjectsSection
 * Section 03 // Primary Architectural Corpus
 * 
 * Layout:
 * - Centerpiece: Frameless 3D Real Earth Globe with architectural exhibition aura
 * - West Flank: 2 Featured Monograph Cards (Möbius Towers & Cultural Oasis)
 * - East Flank: 3 Compact Ledger Cards (Ribbon of Life, Eco-Resort, Flow Spire)
 * - Optical Equilibrium: Both flanks match in vertical height to prevent right-hand heaviness.
 */
export default function SelectedProjectsSection({ onNavigate = () => {} }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const activeProject = hoveredProject || selectedProject;

  const flightTimerRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // Cinematic Project Flight Sequence:
  // 1. Instantly triggers smooth camera flight toward geographic site on the 3D globe.
  // 2. As the camera approaches site elevation (~800ms into flight), clouds billow in.
  // 3. Peak cloud cover navigates to the destination monograph and clears mist.
  const handleProjectDirectFlight = useCallback(
    (project) => {
      if (!project || isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      // Immediately fly camera to target geographic location on globe
      setSelectedProject(project);

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        onNavigate(`/projects/${project.slug || project.id}`, { withClouds: false });
        isNavigatingRef.current = false;
        return;
      }

      if (flightTimerRef.current) {
        clearTimeout(flightTimerRef.current);
      }

      // Camera flies toward location. As it dives into the atmosphere (550ms into flight),
      // volumetric clouds billow into the viewport creating the atmospheric cloud penetration effect.
      flightTimerRef.current = setTimeout(() => {
        onNavigate(`/projects/${project.slug || project.id}`, { withClouds: true });
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 3200);
      }, 550);
    },
    [onNavigate]
  );

  useEffect(() => {
    return () => {
      if (flightTimerRef.current) {
        clearTimeout(flightTimerRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="arch-projects-section">
      <div className="arch-projects-container">
        {/* Section Eyebrow */}
        <div className="arch-projects-eyebrow">
          <span className="arch-projects-eyebrow-dot" aria-hidden="true" />
          <span>SEC. 03 // PRIMARY CORPUS &amp; 3D EARTH ATLAS</span>
        </div>

        {/* Section Header */}
        <div className="arch-projects-header">
          <div className="arch-projects-title-wrap">
            <h2 className="arch-projects-main-title">
              Selected Architectural Works
            </h2>
            <p className="arch-projects-subtitle">
              Topological investigations, high-rise frameworks, and climate-adaptive pavilions.
              The interactive planetary globe occupies the dominant central stage, flanked by satellite monograph schemes.
              Select a location from the globe or the indexed schemes below to enter its dedicated architectural monograph.
            </p>
          </div>

          <div className="arch-projects-header-badge">
            <span className="arch-projects-badge-tag">FIVE PRIMARY SCHEMES</span>
            <span className="arch-projects-badge-sub">INTERACTIVE 3D SITES &amp; BIM MODELS</span>
          </div>
        </div>

        {/* =========================================================
           PART 1: DOMINANT CENTRAL 3D REAL EARTH GLOBE (AT TOP)
           ========================================================= */}
        <div className="arch-projects-globe-hero-stage">
          {/* Atmospheric diffusion aura */}
          <div className="arch-globe-ambient-glow" aria-hidden="true" />
          <div className="arch-globe-orbit-ring ring-1" aria-hidden="true" />
          <div className="arch-globe-orbit-ring ring-2" aria-hidden="true" />

          {/* Top Telemetry Museum Plaque */}
          <div className="arch-globe-telemetry-hud" aria-hidden="true">
            <span className="arch-globe-hud-pill">
              <span className="arch-globe-hud-pulse" />
              <span>3D EARTH ATLAS</span>
            </span>
            <span className="arch-globe-hud-coords">
              {activeProject
                ? `${activeProject.location.coordinates} · ${activeProject.location.city.toUpperCase()}`
                : 'PLANETARY ATLAS · 5 GLOBAL SITES'}
            </span>
          </div>

          {/* 3D WebGL Canvas Mount */}
          <div className="arch-globe-canvas-mount">
            <GlobeCanvas
              projects={PRIMARY_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={handleProjectDirectFlight}
            />
          </div>

          {/* Bottom Telemetry Prompt */}
          <div className="arch-globe-telemetry-bottom" aria-hidden="true">
            <span className="arch-globe-instruction-dot">●</span>
            <span>DRAG GLOBE TO ROTATE · CLICK SCHEME OR PIN TO ENTER MONOGRAPH</span>
          </div>
        </div>

        {/* =========================================================
           PART 1: ALL 5 PROJECT CARDS BELOW THE GLOBE
           Row 1: [CARD 01] [CARD 02] [CARD 03]
           Row 2: [CARD 04] [CARD 05]
           ========================================================= */}
        <div className="arch-projects-cards-grid" role="region" aria-label="Curated Project Schemes">
          {PRIMARY_PROJECTS.map((project, idx) => (
            <div key={project.id} className={`arch-project-card-cell card-cell-${idx + 1}`}>
              <ProjectCard3D
                project={project}
                index={idx}
                isSelected={activeProject?.id === project.id}
                onClick={() => handleProjectDirectFlight(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
