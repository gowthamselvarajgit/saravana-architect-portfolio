import React from 'react';
import ModelLighting from './ModelLighting';
import ModelMesh from './ModelMesh';
import ModelCameraControls from './ModelCameraControls';

/**
 * Architectural Ground Plane & Datum Grid
 */
function ArchitecturalGround({
  theme = 'light',
  gridArgs = [180, 36],
  groundRadius = 95,
}) {
  const isDark = theme === 'dark';
  const gridColorPrimary = isDark ? '#2E3846' : '#D0C9BE';
  const gridColorSecondary = isDark ? '#1C2430' : '#E8E2D8';

  return (
    <group position={[0, -0.05, 0]}>
      {/* Precision grid lines */}
      <gridHelper
        args={[gridArgs[0], gridArgs[1], gridColorPrimary, gridColorSecondary]}
        position={[0, 0, 0]}
      />

      {/* Subtle circular site ground pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <circleGeometry args={[groundRadius, 64]} />
        <meshBasicMaterial
          color={isDark ? '#0D1117' : '#F4EFE6'}
          transparent={true}
          opacity={isDark ? 0.8 : 0.6}
        />
      </mesh>
    </group>
  );
}

/**
 * ModelViewerScene — R3F Scene Root
 */
export default function ModelViewerScene({
  modelManifest = null,
  theme = 'light',
  shadingMode = 'timber',
  activeLayer = 'all',
  currentPreset = 'axonometric',
  firstPersonEntry = false,
  hoveredElement = null,
  selectedElement = null,
  onHoverElement = () => {},
  onSelectElement = () => {},
  onTransitionEnd = () => {},
}) {
  return (
    <>
      {/* Studio Lighting */}
      <ModelLighting theme={theme} />

      {/* Ground Grid & Site Datum */}
      <ArchitecturalGround
        theme={theme}
        gridArgs={modelManifest?.gridArgs || [180, 36]}
        groundRadius={modelManifest?.groundRadius || 95}
      />

      {/* Authentic Model Geometry */}
      <ModelMesh
        modelManifest={modelManifest}
        theme={theme}
        shadingMode={shadingMode}
        activeLayer={activeLayer}
        hoveredElement={hoveredElement}
        selectedElement={selectedElement}
        onHoverElement={onHoverElement}
        onSelectElement={onSelectElement}
      />

      {/* Choreographed Camera & Orbit Navigation */}
      <ModelCameraControls
        modelManifest={modelManifest}
        currentPreset={currentPreset}
        firstPersonEntry={firstPersonEntry}
        onTransitionEnd={onTransitionEnd}
      />
    </>
  );
}
