import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { latLngToVector3 } from './GlobeMarkers';

export default function GlobeCamera({
  selectedProject = null,
  onResetComplete = null,
  setIsInteracting = () => {},
  earthRef = null,
  radius = 3.0,
}) {
  const controlsRef = useRef();
  const { camera } = useThree();

  // Handle camera flight when project selection changes
  useEffect(() => {
    if (!controlsRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (selectedProject) {
      // 1. Calculate base Cartesian coordinate of the project
      const markerLocalPos = latLngToVector3(
        selectedProject.location.lat,
        selectedProject.location.lng,
        radius
      );

      // 2. Account for current Earth Y-rotation to get true world position
      const earthRotationY = earthRef?.current ? earthRef.current.rotation.y : 0;
      const markerWorldPos = markerLocalPos.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), earthRotationY);

      // 3. Define target direction vector and approach distance
      const targetDir = markerWorldPos.clone().normalize();
      const targetCamDistance = 3.25;
      const targetCamPos = targetDir.clone().multiplyScalar(targetCamDistance);

      if (prefersReducedMotion) {
        camera.position.copy(targetCamPos);
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      } else {
        // Spherical arc flight: camera orbits smoothly around the sphere
        // while continuously pointing at (0, 0, 0).
        // This ensures the Earth is 100% symmetrically centered in the canvas
        // with ZERO accidental edge clipping at any stage of flight.
        const startPos = camera.position.clone();
        const startDir = startPos.clone().normalize();
        const startDist = startPos.length();
        const animState = { progress: 0 };

        gsap.killTweensOf(animState);

        gsap.to(animState, {
          progress: 1,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = animState.progress;
            // Smooth spherical slerp between start direction and target marker direction
            const curDir = new THREE.Vector3().copy(startDir).lerp(targetDir, p).normalize();
            // Smooth distance interpolation from initial orbit to approach altitude
            const curDist = THREE.MathUtils.lerp(startDist, targetCamDistance, p);
            camera.position.copy(curDir.multiplyScalar(curDist));
            // Keep center of Earth dead-centered in view frustum: prevents all edge clipping!
            if (controlsRef.current) {
              controlsRef.current.target.set(0, 0, 0);
              controlsRef.current.update();
            }
          },
        });
      }
    } else {
      // RESET TO WORLD: pull backward smoothly to planetary orbit
      const defaultCamPos = new THREE.Vector3(0, 0.0, 7.8);
      const defaultLookAt = new THREE.Vector3(0, 0, 0);

      if (prefersReducedMotion) {
        camera.position.copy(defaultCamPos);
        controlsRef.current.target.copy(defaultLookAt);
        controlsRef.current.update();
        if (onResetComplete) onResetComplete();
      } else {
        const startPos = camera.position.clone();
        const targetDir = new THREE.Vector3(0, 0.0, 1.0);
        const targetDist = 7.8;
        const animState = { progress: 0 };

        gsap.killTweensOf(animState);

        gsap.to(animState, {
          progress: 1,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = animState.progress;
            const startDir = startPos.clone().normalize();
            const startDist = startPos.length();
            const curDir = new THREE.Vector3().copy(startDir).lerp(targetDir, p).normalize();
            const curDist = THREE.MathUtils.lerp(startDist, targetDist, p);
            camera.position.copy(curDir.multiplyScalar(curDist));
            if (controlsRef.current) {
              controlsRef.current.target.set(0, 0, 0);
              controlsRef.current.update();
            }
          },
          onComplete: () => {
            if (onResetComplete) onResetComplete();
          },
        });
      }
    }
  }, [selectedProject, camera, earthRef, radius, onResetComplete]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={4.2}
      maxDistance={12.0}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI - 0.2}
      onStart={() => setIsInteracting(true)}
      onEnd={() => setIsInteracting(false)}
    />
  );
}
