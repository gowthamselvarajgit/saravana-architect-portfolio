import React, { useState, useEffect, useCallback } from 'react';
import GlobeCanvas from '../three/Globe/GlobeCanvas';
import { PRIMARY_PROJECTS } from '../data/projectsData';
import '../styles/atlas.css';

export default function AtlasPage({ onNavigate = null }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter the 5 primary verified projects with atlas visibility
  const atlasProjects = PRIMARY_PROJECTS.slice(0, 5);

  const handleSelectProject = useCallback((project) => {
    setSelectedProject((prev) => (prev?.id === project.id ? null : project));
  }, []);

  const handleResetWorld = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Keyboard accessibility: Escape to reset camera to world
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        handleResetWorld();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleResetWorld]);

  const handleNavigateProject = (e, route) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleBackHome = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="atlas-container">
      {/* 1. Header Editorial Chrome */}
      <header className="atlas-header">
        <div className="atlas-brand">
          <a
            href="/"
            onClick={handleBackHome}
            className="atlas-back-link"
            aria-label="Return to Monograph Exhibition"
          >
            ← MONOGRAPH EXHIBITION
          </a>
          <h1 className="atlas-title">Digital Architectural Atlas</h1>
        </div>

        <div className="atlas-telemetry">
          <div className="atlas-coords-badge">
            {selectedProject
              ? `${selectedProject.location.city.toUpperCase()} · ${selectedProject.location.coordinates}`
              : 'PLANETARY MACRO SCALE · 00°00\'00"N 00°00\'00"E'}
          </div>

          <button
            type="button"
            className="atlas-reset-btn"
            onClick={handleResetWorld}
            disabled={!selectedProject}
            aria-label="Reset 3D camera to full planetary Earth orbit"
          >
            <span>⟲</span> RESET TO WORLD
          </button>
        </div>
      </header>

      {/* 2. Real 3D Earth Canvas — The Hero Element */}
      <GlobeCanvas
        projects={atlasProjects}
        selectedProject={selectedProject}
        onSelectProject={handleSelectProject}
        onResetComplete={() => {}}
      />

      {/* 3. Subtle Interaction Hint */}
      {!selectedProject && (
        <div className="atlas-hint" aria-hidden="true">
          DRAG TO ROTATE · SCROLL TO ZOOM · SELECT REGISTRATION MARKER
        </div>
      )}

      {/* 4. Architectural Project Dossier (Editorial Card) */}
      <aside
        className={`atlas-dossier ${!selectedProject ? 'is-hidden' : ''}`}
        aria-hidden={!selectedProject}
      >
        {selectedProject && (
          <>
            <div className="atlas-dossier-header">
              <span className="atlas-dossier-num">
                PROJECT {selectedProject.projectNumber}
              </span>
              <button
                type="button"
                className="atlas-dossier-close"
                onClick={handleResetWorld}
                aria-label="Close project dossier and return to world view"
              >
                ✕
              </button>
            </div>

            <h2 className="atlas-dossier-title">{selectedProject.title}</h2>
            <div className="atlas-dossier-alt-title">
              {selectedProject.alternateTitle}
            </div>

            <div className="atlas-dossier-meta-grid">
              <div className="atlas-dossier-meta-item">
                <span className="atlas-dossier-meta-label">TYPOLOGY</span>
                <span className="atlas-dossier-meta-val">
                  {selectedProject.category.split('/')[0].trim()}
                </span>
              </div>
              <div className="atlas-dossier-meta-item">
                <span className="atlas-dossier-meta-label">YEAR</span>
                <span className="atlas-dossier-meta-val">
                  {selectedProject.year}
                </span>
              </div>
              <div className="atlas-dossier-meta-item">
                <span className="atlas-dossier-meta-label">LOCATION</span>
                <span className="atlas-dossier-meta-val">
                  {selectedProject.location.city}, {selectedProject.location.country}
                </span>
              </div>
              <div className="atlas-dossier-meta-item">
                <span className="atlas-dossier-meta-label">STUDIO / CONTEXT</span>
                <span className="atlas-dossier-meta-val">
                  {selectedProject.context}
                </span>
              </div>
            </div>

            {/* Strict Data Governance Disclaimer */}
            <div className="atlas-dossier-disclaimer">
              REPRESENTATIVE LOCATION COORDINATES ({selectedProject.location.coordinates})
              <br />
              CITY / REGIONAL LEVEL · NOT EXACT CADASTRAL SITE COORDINATES
            </div>

            <p className="atlas-dossier-desc">
              {selectedProject.thesis || selectedProject.description}
            </p>

            <a
              href={selectedProject.route}
              onClick={(e) => handleNavigateProject(e, selectedProject.route)}
              className="atlas-dossier-action"
            >
              EXPLORE PROJECT MONOGRAPH →
            </a>
          </>
        )}
      </aside>

      {/* 5. Cartographic Index Bar (Accessible Project Selector) */}
      <nav className="atlas-index-bar" aria-label="Architectural Project Index">
        <span className="atlas-index-label">PROJECTS:</span>
        {atlasProjects.map((p) => {
          const isActive = selectedProject?.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className={`atlas-index-item ${isActive ? 'is-active' : ''}`}
              onClick={() => handleSelectProject(p)}
              aria-pressed={isActive}
              aria-label={`View ${p.title} in ${p.location.city}`}
            >
              <span className="atlas-index-item-num">{p.projectNumber}</span>
              <span>{p.alternateTitle || p.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
