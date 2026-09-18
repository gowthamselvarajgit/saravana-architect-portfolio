import React, { useState, useCallback } from 'react';
import { PRIMARY_PROJECTS } from '../data/projectsData';
import GlobeCanvas from '../three/Globe/GlobeCanvas';
import '../styles/selectedProjectsSection.css';

/**
 * 3D Project Scheme Card Component
 * Highly detailed architectural card featuring 3D elevation, authentic render
 * thumbnail, editorial typography, and 1-click automatic flight launch.
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
 * - Centerpiece: Frameless 3D Real Earth Globe with atmospheric glow and orbit controls
 * - Surrounded by: High-end 3D Scheme Cards (West Flank: Schemes 01 & 02; East Flank: Schemes 03, 04, 05)
 * - Interaction: 1-click on any card or globe pin automatically triggers the cloud animation
 *   and flies directly to the specific project monograph page.
 */
export default function SelectedProjectsSection({ onNavigate = () => {} }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  // West Flank: First 2 projects (Möbius & Cultural Oasis)
  const westProjects = PRIMARY_PROJECTS.slice(0, 2);
  // East Flank: Remaining 3 projects (Ribbon of Life, Eco-Resort, Flow Spire)
  const eastProjects = PRIMARY_PROJECTS.slice(2, 5);

  const activeProject = hoveredProject || selectedProject;

  // Single-action 1-click navigation:
  // Immediately rotates globe to site and launches cloud transition into project monograph
  const handleProjectDirectFlight = useCallback(
    (project) => {
      setSelectedProject(project);
      onNavigate(`/projects/${project.slug || project.id}`, { withClouds: true });
    },
    [onNavigate]
  );

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
              The interactive planetary globe is centered and surrounded by primary monograph schemes.
              Click any card to fly directly into the dedicated 3D project page.
            </p>
          </div>

          <div className="arch-projects-header-badge">
            <span className="arch-projects-badge-tag">FIVE PRIMARY SCHEMES</span>
            <span className="arch-projects-badge-sub">INTERACTIVE 3D SITES &amp; BIM MODELS</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
           CENTER GLOBE SURROUNDED BY 3D CARDS LAYOUT:
           WEST FLANK (01, 02) | CENTER FRAMELESS GLOBE | EAST FLANK (03, 04, 05)
           ───────────────────────────────────────────────────────────── */}
        <div className="arch-projects-surround-stage">
          {/* =========================================================
             WEST FLANK: CARDS 01 & 02
             ========================================================= */}
          <div className="arch-projects-flank arch-projects-flank-west" role="region" aria-label="Western Schemes">
            {westProjects.map((project, idx) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={idx}
                isSelected={activeProject?.id === project.id}
                onClick={() => handleProjectDirectFlight(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>

          {/* =========================================================
             CENTER STAGE: FRAMELESS 3D REAL EARTH GLOBE
             (Not inside a card! Expansive, organic, boundaryless)
             ========================================================= */}
          <div className="arch-projects-globe-center-stage">
            {/* Atmospheric cosmic radial aura */}
            <div className="arch-globe-ambient-glow" aria-hidden="true" />
            <div className="arch-globe-orbit-ring ring-1" aria-hidden="true" />
            <div className="arch-globe-orbit-ring ring-2" aria-hidden="true" />

            {/* Top Telemetry Overlay */}
            <div className="arch-globe-telemetry-hud" aria-hidden="true">
              <span className="arch-globe-hud-pill">
                <span className="arch-globe-hud-pulse" />
                <span>3D REAL EARTH ATLAS</span>
              </span>
              <span className="arch-globe-hud-coords">
                {activeProject
                  ? `${activeProject.location.coordinates} · ${activeProject.location.city.toUpperCase()}`
                  : 'PLANETARY SURROUND VIEW · 5 GLOBAL SITES'}
              </span>
            </div>

            {/* 3D WebGL Canvas Mount (Frameless, open-air) */}
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
              <span>DRAG GLOBE TO ROTATE · CLICK CARD OR PIN FOR 1-CLICK 3D FLIGHT</span>
            </div>
          </div>

          {/* =========================================================
             EAST FLANK: CARDS 03, 04, 05
             ========================================================= */}
          <div className="arch-projects-flank arch-projects-flank-east" role="region" aria-label="Eastern Schemes">
            {eastProjects.map((project, idx) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={idx + 2}
                isSelected={activeProject?.id === project.id}
                onClick={() => handleProjectDirectFlight(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
