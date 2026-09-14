import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import GlobeScene from './GlobeScene';

function GlobeFallback() {
  return (
    <div className="atlas-loader">
      <div className="atlas-loader-spinner" />
      <div className="atlas-loader-text">
        INITIALIZING DIGITAL ATLAS · 3D REAL EARTH
      </div>
    </div>
  );
}

export default function GlobeCanvas({
  projects = [],
  selectedProject = null,
  onSelectProject = () => {},
  onResetComplete = () => {},
}) {
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerDown = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsInteracting(false);
  }, []);

  return (
    <div
      className="atlas-canvas-wrapper"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Suspense fallback={<GlobeFallback />}>
        <Canvas
          camera={{
            position: [0, 1.8, 6.8],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 1.75)]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <GlobeScene
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={onSelectProject}
            onResetComplete={onResetComplete}
            isInteracting={isInteracting}
            setIsInteracting={setIsInteracting}
            radius={3.0}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
