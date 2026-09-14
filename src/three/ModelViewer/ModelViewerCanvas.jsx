import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelViewerScene from './ModelViewerScene';
import ModelLoadingOverlay from './ModelLoadingOverlay';

/**
 * ModelViewerCanvas — WebGL Viewport Container for Project Architectural Maquettes
 */
export default function ModelViewerCanvas({
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
  const isHighRise = (modelManifest?.dimensions?.heightY || 0) > 100;
  const initialCamPos =
    modelManifest?.cameraPresets?.[0]?.position ||
    (isHighRise ? [175, 135, 195] : [42, 32, 48]);
  const initialFov = modelManifest?.cameraPresets?.[0]?.fov || 38;
  const farPlane = isHighRise ? 2000 : 600;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-bg, #F9F7F1)',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{
          position: initialCamPos,
          fov: initialFov,
          near: 0.2,
          far: farPlane,
        }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.75) : 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ModelViewerScene
            modelManifest={modelManifest}
            theme={theme}
            shadingMode={shadingMode}
            activeLayer={activeLayer}
            currentPreset={currentPreset}
            firstPersonEntry={firstPersonEntry}
            hoveredElement={hoveredElement}
            selectedElement={selectedElement}
            onHoverElement={onHoverElement}
            onSelectElement={onSelectElement}
            onTransitionEnd={onTransitionEnd}
          />
        </Suspense>
      </Canvas>

      {/* Editorial Loading Overlay */}
      <ModelLoadingOverlay modelManifest={modelManifest} />
    </div>
  );
}
