import React, { useRef } from 'react';
import GlobeEarth from './GlobeEarth';
import GlobeAtmosphere from './GlobeAtmosphere';
import GlobeMarkers from './GlobeMarkers';
import GlobeCamera from './GlobeCamera';

export default function GlobeScene({
  projects = [],
  selectedProject = null,
  onSelectProject = () => {},
  onResetComplete = () => {},
  isInteracting = false,
  setIsInteracting = () => {},
  radius = 3.0,
}) {
  const earthRef = useRef();

  return (
    <>
      {/* Architectural Lighting Rig */}
      {/* 1. Key Sun Light: Directional light casting day/night terminator and ocean specular */}
      <directionalLight
        position={[7, 3.5, 6]}
        intensity={2.2}
        color="#FFF8EE"
      />

      {/* 2. Atmospheric Sky Fill: Cool hemiboreal blue bounce */}
      <hemisphereLight
        args={['#DCE6F2', '#1A1815', 0.8]}
      />

      {/* 3. Subtle Warm Ground Fill: Simulates warm paper reflective bounce */}
      <directionalLight
        position={[-6, -3, -5]}
        intensity={0.4}
        color="#E8DEC8"
      />

      {/* Earth Group (contains real Earth mesh, graticules, and synced markers) */}
      <group>
        <GlobeEarth
          radius={radius}
          isInteracting={isInteracting}
          selectedProject={selectedProject}
          earthRef={earthRef}
        >
          <GlobeMarkers
            projects={projects}
            radius={radius}
            selectedProject={selectedProject}
            onSelectProject={onSelectProject}
          />
        </GlobeEarth>

        {/* Atmospheric Rim Glow */}
        <GlobeAtmosphere radius={radius} />
      </group>

      {/* Camera and Orbit Controls with GSAP Flight Controller */}
      <GlobeCamera
        selectedProject={selectedProject}
        onResetComplete={onResetComplete}
        setIsInteracting={setIsInteracting}
        earthRef={earthRef}
        radius={radius}
      />
    </>
  );
}
