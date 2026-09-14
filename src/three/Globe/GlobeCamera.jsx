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

      // 3. Define target camera position: 45° elevation angle above the regional site
      const targetCamDistance = 4.85;
      const targetCamPos = markerWorldPos
        .clone()
        .normalize()
        .multiplyScalar(targetCamDistance)
        .add(new THREE.Vector3(0, 0.4, 0));

      const targetLookAt = markerWorldPos.clone().multiplyScalar(0.65);

      if (prefersReducedMotion) {
        camera.position.copy(targetCamPos);
        controlsRef.current.target.copy(targetLookAt);
        controlsRef.current.update();
      } else {
        // Smooth cinematic GSAP flight
        gsap.killTweensOf(camera.position);
        gsap.killTweensOf(controlsRef.current.target);

        gsap.to(camera.position, {
          x: targetCamPos.x,
          y: targetCamPos.y,
          z: targetCamPos.z,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (controlsRef.current) controlsRef.current.update();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: targetLookAt.x,
          y: targetLookAt.y,
          z: targetLookAt.z,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (controlsRef.current) controlsRef.current.update();
          },
        });
      }
    } else {
      // RESET TO WORLD: pull backward smoothly to planetary orbit
      const defaultCamPos = new THREE.Vector3(0, 1.8, 6.8);
      const defaultLookAt = new THREE.Vector3(0, 0, 0);

      if (prefersReducedMotion) {
        camera.position.copy(defaultCamPos);
        controlsRef.current.target.copy(defaultLookAt);
        controlsRef.current.update();
        if (onResetComplete) onResetComplete();
      } else {
        gsap.killTweensOf(camera.position);
        gsap.killTweensOf(controlsRef.current.target);

        gsap.to(camera.position, {
          x: defaultCamPos.x,
          y: defaultCamPos.y,
          z: defaultCamPos.z,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (controlsRef.current) controlsRef.current.update();
          },
          onComplete: () => {
            if (onResetComplete) onResetComplete();
          },
        });

        gsap.to(controlsRef.current.target, {
          x: defaultLookAt.x,
          y: defaultLookAt.y,
          z: defaultLookAt.z,
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (controlsRef.current) controlsRef.current.update();
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
      maxDistance={9.5}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI - 0.2}
      onStart={() => setIsInteracting(true)}
      onEnd={() => setIsInteracting(false)}
    />
  );
}
