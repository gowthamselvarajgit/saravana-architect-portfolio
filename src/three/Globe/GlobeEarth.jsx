import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Procedural graticule line generator for cartographic registration
function GraticuleLines({ radius }) {
  const lines = useMemo(() => {
    const lineSegments = [];
    const r = radius * 1.002; // Float slightly above terrain

    // 1. Latitude circles (every 15 degrees)
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = (lat * Math.PI) / 180;
      const y = r * Math.sin(phi);
      const circleRadius = r * Math.cos(phi);
      const points = [];
      const segments = 90;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(circleRadius * Math.sin(theta), y, circleRadius * Math.cos(theta)));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const isEquator = lat === 0;
      const isTropic = Math.abs(lat) === 30; // Close to tropics

      lineSegments.push({
        geometry,
        opacity: isEquator ? 0.25 : isTropic ? 0.14 : 0.08,
        color: isEquator ? '#C41E2A' : '#F4F0E8', // Crimson accent on equator
      });
    }

    // 2. Longitude meridians (every 30 degrees)
    for (let lng = 0; lng < 360; lng += 30) {
      const points = [];
      const segments = 60;
      const theta = (lng * Math.PI) / 180;

      for (let i = 0; i <= segments; i++) {
        const phi = (-Math.PI / 2) + (i / segments) * Math.PI;
        const x = r * Math.cos(phi) * Math.sin(theta);
        const y = r * Math.sin(phi);
        const z = r * Math.cos(phi) * Math.cos(theta);
        points.push(new THREE.Vector3(x, y, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const isPrimeMeridian = lng === 0;

      lineSegments.push({
        geometry,
        opacity: isPrimeMeridian ? 0.2 : 0.08,
        color: '#F4F0E8',
      });
    }

    return lineSegments;
  }, [radius]);

  return (
    <group>
      {lines.map((line, idx) => (
        <lineLoop key={idx} geometry={line.geometry}>
          <lineBasicMaterial
            color={line.color}
            transparent={true}
            opacity={line.opacity}
            depthWrite={false}
          />
        </lineLoop>
      ))}
    </group>
  );
}

export default function GlobeEarth({
  radius = 3.0,
  isInteracting = false,
  selectedProject = null,
  earthRef = null,
  children = null,
}) {
  const localRef = useRef();
  const activeRef = earthRef || localRef;

  // Load authentic local NASA/Three.js Earth textures
  const [colorMap, specularMap, normalMap] = useTexture([
    '/assets/textures/earth/earth_atmos_2048.jpg',
    '/assets/textures/earth/earth_specular_2048.jpg',
    '/assets/textures/earth/earth_normal_2048.jpg',
  ]);

  // Configure texture parameters
  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    specularMap.colorSpace = THREE.NoColorSpace;
    normalMap.colorSpace = THREE.NoColorSpace;
  }, [colorMap, specularMap, normalMap]);

  // Idle planetary rotation: slow, calm, halts when user interacts or project is active
  useFrame((_, delta) => {
    if (!isInteracting && !selectedProject && activeRef.current) {
      activeRef.current.rotation.y += delta * 0.035; // ~0.0006 rad per frame at 60fps
    }
  });

  return (
    <group ref={activeRef}>
      {/* Real Earth Sphere */}
      <mesh
        receiveShadow
        castShadow
        onPointerDown={(e) => {
          // Block raycast clicks from penetrating to the opposite hemisphere
          e.stopPropagation();
        }}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.4, 0.4)} // Subtle natural mountain relief
          roughness={0.7}
          metalness={0.08}
          roughnessMap={specularMap} // Oceans reflect sunlight; continents remain matte
        />
      </mesh>

      {/* Restrained Cartographic Graticule Registration Lines */}
      <GraticuleLines radius={radius} />

      {/* Synchronized Children (Markers, Annotations) */}
      {children}
    </group>
  );
}
