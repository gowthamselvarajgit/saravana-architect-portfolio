import React from 'react';

/**
 * Architectural Studio Lighting Rig
 * Calibrated for Scandinavian low-sun angle and neutral museum maquette reading.
 * Adapts between Light Monograph Theme and Dark Blueprint Theme.
 */
export default function ModelLighting({ theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <>
      {/* 1. Hemispheric Sky / Ground Ambient Fill */}
      <hemisphereLight
        skyColor={isDark ? '#4A6278' : '#F5F7FA'}
        groundColor={isDark ? '#1C1E24' : '#E8E4DC'}
        intensity={isDark ? 0.65 : 0.85}
      />

      {/* 2. Key Sunlight (Warm 35° Azimuth low sun typical of Oslo latitude 59.9°N) */}
      <directionalLight
        position={[38, 42, 28]}
        intensity={isDark ? 1.2 : 1.45}
        color={isDark ? '#FFF3DF' : '#FFF9F0'}
        castShadow={false}
      />

      {/* 3. Cool Secondary Fill (North sky bounce) */}
      <directionalLight
        position={[-32, 24, -26]}
        intensity={isDark ? 0.45 : 0.55}
        color={isDark ? '#A0C4E2' : '#D6E4F0'}
        castShadow={false}
      />

      {/* 4. Subtle Up-light / Ground Bounce */}
      <directionalLight
        position={[0, -20, 0]}
        intensity={0.2}
        color="#F0ECE4"
        castShadow={false}
      />
    </>
  );
}
