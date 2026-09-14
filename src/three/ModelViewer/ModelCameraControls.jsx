import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { MOBIUS_MODEL_MANIFEST } from '../../data/models/mobiusModelData';

/**
 * Architectural Camera Controller
 * Smoothly choreographs transitions between curated vantage points using GSAP.
 */
export default function ModelCameraControls({
  modelManifest = MOBIUS_MODEL_MANIFEST,
  currentPreset = 'axonometric',
  isTransitioning = false,
  onTransitionEnd = () => {},
  firstPersonEntry = false,
}) {
  const controlsRef = useRef();
  const { camera } = useThree();
  const activeTimelineRef = useRef(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!controlsRef.current) return;

    const presets = modelManifest?.cameraPresets || MOBIUS_MODEL_MANIFEST.cameraPresets;

    // Find requested preset configuration
    let targetPreset = presets.find((p) => p.id === currentPreset);

    // If first-person entry mode triggered, fly toward the ground entrance
    if (firstPersonEntry) {
      const isHighRise = (modelManifest?.dimensions?.heightY || 0) > 100;
      targetPreset = isHighRise
        ? {
            position: [-45, 6, 75],
            target: [0, 25, 0],
            fov: 60,
          }
        : {
            position: [-16, 2.2, 32],
            target: [0, 4.5, 0],
            fov: 55,
          };
    }

    if (!targetPreset) return;

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const duration = prefersReducedMotion ? 0.1 : 1.4;
    const ease = prefersReducedMotion ? 'none' : 'power2.inOut';

    const tl = gsap.timeline({
      onComplete: () => {
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        onTransitionEnd();
      },
    });

    // 1. Camera position tween
    tl.to(
      camera.position,
      {
        x: targetPreset.position[0],
        y: targetPreset.position[1],
        z: targetPreset.position[2],
        duration,
        ease,
        onUpdate: () => {
          if (controlsRef.current) controlsRef.current.update();
        },
      },
      0
    );

    // 2. Controls target tween
    tl.to(
      controlsRef.current.target,
      {
        x: targetPreset.target[0],
        y: targetPreset.target[1],
        z: targetPreset.target[2],
        duration,
        ease,
        onUpdate: () => {
          if (controlsRef.current) controlsRef.current.update();
        },
      },
      0
    );

    // 3. FOV update
    if (targetPreset.fov && camera.fov !== targetPreset.fov) {
      tl.to(
        camera,
        {
          fov: targetPreset.fov,
          duration,
          ease,
          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        },
        0
      );
    }

    activeTimelineRef.current = tl;

    return () => {
      if (activeTimelineRef.current) {
        activeTimelineRef.current.kill();
      }
    };
  }, [
    currentPreset,
    firstPersonEntry,
    modelManifest,
    camera,
    onTransitionEnd,
    prefersReducedMotion,
  ]);

  const limits = modelManifest?.cameraLimits || { minDistance: 6, maxDistance: 160 };

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      panSpeed={0.5}
      minDistance={limits.minDistance}
      maxDistance={limits.maxDistance}
      maxPolarAngle={Math.PI / 2 + 0.05} // Restrict camera from going beneath ground datum
      minPolarAngle={0.05}
    />
  );
}
