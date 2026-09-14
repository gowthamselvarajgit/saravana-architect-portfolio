import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ModelViewerCanvas from './ModelViewerCanvas';
import { getProjectModelConfig } from '../../data/models/projectModelRegistry';
import '../../styles/modelViewer.css';

/**
 * InteractiveModelViewer (ProjectModelViewer)
 * High-Performance Architectural Maquette Controller.
 * Bridges React UI controls, camera choreography, and 3D WebGL rendering
 * for any project in the monograph corpus.
 */
export default function InteractiveModelViewer({
  projectSlug = 'mobius',
  modelConfig = null,
  theme = 'light',
}) {
  const manifest = useMemo(() => {
    return modelConfig || getProjectModelConfig(projectSlug);
  }, [modelConfig, projectSlug]);

  const defaultPreset = manifest?.initialPreset || manifest?.cameraPresets?.[0]?.id || 'axonometric';
  const defaultShading = manifest?.initialShading || manifest?.shadingModes?.[0]?.id || 'timber';

  const [currentPreset, setCurrentPreset] = useState(defaultPreset);
  const [shadingMode, setShadingMode] = useState(defaultShading);
  const [activeLayer, setActiveLayer] = useState('all');
  const [hoveredElement, setHoveredElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [firstPersonEntry, setFirstPersonEntry] = useState(false);

  // Sync state if manifest changes (e.g. project switch)
  useEffect(() => {
    setCurrentPreset(manifest?.initialPreset || manifest?.cameraPresets?.[0]?.id || 'axonometric');
    setShadingMode(manifest?.initialShading || manifest?.shadingModes?.[0]?.id || 'timber');
    setActiveLayer('all');
    setSelectedElement(null);
    setHoveredElement(null);
    setFirstPersonEntry(false);
  }, [manifest]);

  // Active inspected element data
  const inspectedData = useMemo(() => {
    const targetId = selectedElement || hoveredElement;
    if (!targetId || !manifest?.hierarchy) return null;
    return manifest.hierarchy.find((h) => h.id === targetId) || null;
  }, [selectedElement, hoveredElement, manifest]);

  const handleSelectPreset = useCallback((presetId) => {
    setFirstPersonEntry(false);
    setCurrentPreset(presetId);
  }, []);

  const handleResetCamera = useCallback(() => {
    setFirstPersonEntry(false);
    setCurrentPreset(defaultPreset);
    setSelectedElement(null);
    setActiveLayer('all');
  }, [defaultPreset]);

  const handleEnterSpace = useCallback(() => {
    setFirstPersonEntry(true);
  }, []);

  const handleExitSpace = useCallback(() => {
    setFirstPersonEntry(false);
    setCurrentPreset(defaultPreset);
  }, [defaultPreset]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Escape') {
        if (firstPersonEntry) handleExitSpace();
        else if (selectedElement) setSelectedElement(null);
        else if (activeLayer !== 'all') setActiveLayer('all');
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetCamera();
      } else if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        if (manifest?.cameraPresets?.[idx]) {
          handleSelectPreset(manifest.cameraPresets[idx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    firstPersonEntry,
    selectedElement,
    activeLayer,
    manifest,
    handleExitSpace,
    handleResetCamera,
    handleSelectPreset,
  ]);

  if (!manifest || !manifest.hasWebModel) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-secondary)',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
            3D MODEL — PREPARATION IN PROGRESS
          </div>
          <div style={{ fontSize: '0.85rem' }}>
            Source Asset: <code>{manifest?.rawSource || 'Archive Model'}</code>
          </div>
        </div>
      </div>
    );
  }

  const dims = manifest.dimensions || { widthX: 0, depthZ: 0, heightY: 0 };
  const trisCount = manifest.geometryMetrics?.totalTriangles?.toLocaleString() || '';

  return (
    <div
      className="maquette-viewer-root"
      role="region"
      aria-label={`${manifest.title} 3D Architectural Maquette Interactive Viewer`}
    >
      {/* 1. 3D WebGL Canvas Viewport */}
      <div className="maquette-canvas-container">
        <ModelViewerCanvas
          modelManifest={manifest}
          theme={theme}
          shadingMode={shadingMode}
          activeLayer={activeLayer}
          currentPreset={currentPreset}
          firstPersonEntry={firstPersonEntry}
          hoveredElement={hoveredElement}
          selectedElement={selectedElement}
          onHoverElement={setHoveredElement}
          onSelectElement={setSelectedElement}
        />
      </div>

      {/* 2. Top Architectural Telemetry Overlay */}
      <div className="maquette-overlay-top">
        <div className="maquette-spec-badge">
          <span className="maquette-spec-label">
            AUTHENTIC 3D GEOMETRY · {manifest.rawFormat ? manifest.rawFormat.toUpperCase() : 'RHINO OPENNURBS'}
          </span>
          <span className="maquette-spec-val">
            {dims.widthX.toFixed(1)}m (W) × {dims.depthZ.toFixed(1)}m (D) × {dims.heightY.toFixed(1)}m (H)
            {trisCount ? ` · ${trisCount} TRIS` : ''}
          </span>
        </div>

        {/* Inspected Element HUD Card */}
        {inspectedData && (
          <div className="maquette-inspect-card" role="dialog" aria-label="Architectural Component Telemetry">
            <div className="maquette-inspect-header">
              <span className="maquette-inspect-tag">{inspectedData.category}</span>
              {selectedElement && (
                <button
                  type="button"
                  className="maquette-inspect-close"
                  onClick={() => setSelectedElement(null)}
                  aria-label="Close component inspection"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="maquette-inspect-title">{inspectedData.label}</div>
            <div className="maquette-inspect-desc">{inspectedData.description}</div>
            <div className="maquette-inspect-meta">
              <div>
                <span className="maquette-spec-label">MATERIAL: </span>
                <span style={{ color: 'var(--color-text-primary)' }}>{inspectedData.material}</span>
              </div>
              <div>
                <span className="maquette-spec-label">STATUS: </span>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {inspectedData.isPrimary ? 'Primary Structure' : 'Context Element'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Architectural Controls & Choreography */}
      <div className="maquette-overlay-bottom">
        {/* Entry Transition Notice */}
        {firstPersonEntry && (
          <div className="maquette-step4c-banner" role="alert">
            <div className="maquette-step4c-text">
              <strong>[ PEDESTRIAN ENTRY THRESHOLD · FIRST-PERSON CAMERA CHOREOGRAPHY ]</strong>
              <br />
              Camera transitioned to ground perspective at architectural approach threshold.
            </div>
            <button
              type="button"
              className="maquette-action-btn"
              onClick={handleExitSpace}
              style={{
                backgroundColor: 'var(--color-accent)',
                color: '#FFFFFF',
                borderColor: 'var(--color-accent)',
              }}
            >
              RETURN TO 3D ORBIT ⟲
            </button>
          </div>
        )}

        {/* Row A: Curated Vantages & Shading Modes */}
        <div className="maquette-controls-row">
          {/* Curated Vantage Points */}
          <div className="maquette-pill-group" role="group" aria-label="Camera Vantage Presets">
            {manifest.cameraPresets?.map((preset, idx) => (
              <button
                key={preset.id}
                type="button"
                className={`maquette-pill-btn ${
                  currentPreset === preset.id && !firstPersonEntry ? 'is-active' : ''
                }`}
                onClick={() => handleSelectPreset(preset.id)}
                aria-label={`Switch camera to ${preset.label}`}
              >
                0{idx + 1} / {preset.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Shading Presentation Modes */}
          <div className="maquette-pill-group" role="group" aria-label="Shading Presentation Modes">
            {manifest.shadingModes?.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`maquette-pill-btn ${shadingMode === mode.id ? 'is-active' : ''}`}
                onClick={() => setShadingMode(mode.id)}
                aria-label={`Switch presentation to ${mode.label}`}
              >
                {mode.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Row B: Architectural Layer Isolation & Master Action */}
        <div className="maquette-controls-row">
          {/* Layer Isolation Pills */}
          <div className="maquette-pill-group" role="group" aria-label="Architectural Layer Isolation">
            <button
              type="button"
              className={`maquette-pill-btn ${activeLayer === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveLayer('all')}
              aria-label="Display complete architectural assemblage"
            >
              ASSEMBLAGE [ALL]
            </button>
            {manifest.hierarchy?.map((layer) => (
              <button
                key={layer.id}
                type="button"
                className={`maquette-pill-btn ${activeLayer === layer.id ? 'is-active' : ''}`}
                onClick={() => setActiveLayer(layer.id)}
                aria-label={`Isolate architectural layer: ${layer.label}`}
              >
                {layer.label.split(' ')[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Actions: Reset & Enter The Space */}
          <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
            <button
              type="button"
              className="maquette-action-btn"
              onClick={handleResetCamera}
              aria-label="Reset camera and selection"
            >
              <span>⟲</span> RESET
            </button>

            {!firstPersonEntry && (
              <button
                type="button"
                className="maquette-enter-btn"
                onClick={handleEnterSpace}
                aria-label="Enter architectural space at pedestrian level"
              >
                <span>[ ENTER THE SPACE ]</span>
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        </div>

        {/* Hint Bar */}
        <div className="maquette-hint-bar" aria-hidden="true">
          DRAG TO ORBIT · PINCH/WHEEL TO ZOOM · CLICK GEOMETRY TO INSPECT · KEYS [1-{manifest.cameraPresets?.length || 4}] VANTAGE · [R] RESET
        </div>
      </div>
    </div>
  );
}
