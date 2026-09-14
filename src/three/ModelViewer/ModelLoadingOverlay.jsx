import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

/**
 * Architectural Model Loading Overlay
 * Uses DM Mono editorial typography and genuine asset readiness progression.
 */
export default function ModelLoadingOverlay({
  modelManifest = null,
  onLoaded = () => {},
}) {
  const { active, progress } = useProgress();
  const [phase, setPhase] = useState('01 / INITIALIZING 3D GEOMETRY');
  const [isDone, setIsDone] = useState(false);

  const trisText = modelManifest?.geometryMetrics?.totalTriangles
    ? `(${modelManifest.geometryMetrics.totalTriangles.toLocaleString()} TRIS)`
    : '';

  useEffect(() => {
    if (progress < 40) {
      setPhase(`01 / PARSING TOPOLOGICAL SHELL ${trisText}`);
    } else if (progress < 80) {
      setPhase('02 / COMPILING PBR ARCHITECTURAL SHADERS');
    } else if (progress < 100) {
      setPhase('03 / CHOREOGRAPHING DIGITAL MAQUETTE');
    } else {
      setPhase('04 / MAQUETTE READY');
      const timer = setTimeout(() => {
        setIsDone(true);
        onLoaded();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [progress, trisText, onLoaded]);

  if (!active && isDone) return null;

  const projectNum = modelManifest?.projectNumber || '01';
  const projectTitle = modelManifest?.title || 'Architectural Model';
  const projectSlug = (modelManifest?.slug || 'project').toUpperCase();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--color-bg, #F9F7F1)',
        color: 'var(--color-text-primary, #1A1916)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: active || !isDone ? 1 : 0,
        pointerEvents: active || !isDone ? 'auto' : 'none',
        padding: '2rem',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          border: '1px solid var(--color-border, #E4DFD3)',
          padding: '2rem 1.75rem',
          backgroundColor: 'var(--color-surface, #FFFFFF)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          fontFamily: "'DM Mono', monospace",
          textAlign: 'left',
        }}
      >
        <div
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted, #7A756B)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          MONOGRAPH CORPUS · PROJECT {projectNum} / {projectSlug}
        </div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.4rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            marginBottom: '1.25rem',
            color: 'var(--color-text-primary, #1A1916)',
          }}
        >
          {projectTitle}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--color-border, #E4DFD3)',
            marginBottom: '1rem',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.max(8, progress)}%`,
              height: '100%',
              backgroundColor: 'var(--color-accent-crimson, #A33B26)',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>

        {/* Phase Readout */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ color: 'var(--color-text-secondary, #4A463E)' }}>
            {phase}
          </span>
          <span
            style={{
              color: 'var(--color-text-muted, #7A756B)',
              fontWeight: 500,
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
