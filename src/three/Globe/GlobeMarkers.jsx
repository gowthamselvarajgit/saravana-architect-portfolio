import React, { useState, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Convert latitude and longitude to 3D Cartesian coordinates on sphere
export function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function SingleMarker({
  project,
  radius,
  isSelected,
  onSelect,
}) {
  const [hovered, setHovered] = useState(false);
  const [isFacingCamera, setIsFacingCamera] = useState(true);
  const markerGroupRef = useRef();

  // Position slightly above the surface to prevent z-fighting
  const position = useMemo(() => {
    return latLngToVector3(project.location.lat, project.location.lng, radius * 1.008);
  }, [project.location.lat, project.location.lng, radius]);

  // Surface normal for orienting the marker tangent to the sphere
  const normal = useMemo(() => position.clone().normalize(), [position]);

  // Dynamic back-face occlusion test: prevent raycasting behind horizon
  useFrame(({ camera }) => {
    if (!markerGroupRef.current) return;
    const worldPos = new THREE.Vector3();
    markerGroupRef.current.getWorldPosition(worldPos);
    const toCamera = camera.position.clone().sub(worldPos);
    const dot = worldPos.dot(toCamera);
    const facing = dot > 0.05;
    if (facing !== isFacingCamera) {
      setIsFacingCamera(facing);
      if (!facing && hovered) {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }
    }
  });

  return (
    <group ref={markerGroupRef} position={position} visible={isFacingCamera}>
      {/* Precision hit area (calibrated to 0.06 to prevent overlap between adjacent Pune & Thane nodes) */}
      {isFacingCamera && (
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(project);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      {/* Tangent disc group */}
      <group
        onUpdate={(self) => {
          self.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        }}
      >
        {/* Inner solid locus dot */}
        <mesh>
          <circleGeometry args={[isSelected ? 0.045 : 0.032, 24]} />
          <meshBasicMaterial
            color={isSelected ? '#E03E48' : hovered ? '#FFFFFF' : '#C41E2A'}
            depthTest={false}
          />
        </mesh>

        {/* Outer registration ring */}
        <mesh>
          <ringGeometry
            args={[
              isSelected ? 0.08 : hovered ? 0.07 : 0.055,
              isSelected ? 0.095 : hovered ? 0.085 : 0.065,
              32,
            ]}
          />
          <meshBasicMaterial
            color={isSelected ? '#E03E48' : hovered ? '#FFFFFF' : '#C41E2A'}
            transparent
            opacity={isSelected ? 0.95 : hovered ? 0.9 : 0.6}
            depthTest={false}
          />
        </mesh>

        {/* Secondary drafting crosshair ticks on hover or selected */}
        {(hovered || isSelected) && (
          <mesh>
            <ringGeometry args={[0.11, 0.118, 32]} />
            <meshBasicMaterial
              color="#F4F0E8"
              transparent
              opacity={0.4}
              depthTest={false}
            />
          </mesh>
        )}
      </group>

      {/* Floating Monospaced Location Tag */}
      {(hovered || isSelected) && isFacingCamera && (
        <Html
          position={[0, 0.22, 0]}
          center
          distanceFactor={10}
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(10, 9, 6, 0.92)',
              border: '1px solid rgba(244, 240, 232, 0.3)',
              padding: '0.4rem 0.75rem',
              borderRadius: '2px',
              color: '#F4F0E8',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
            }}
          >
            <div style={{ color: '#E03E48', fontSize: '0.65rem' }}>
              {project.projectNumber} · {project.location.city.toUpperCase()}
            </div>
            <div style={{ fontWeight: 500 }}>{project.title}</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.6, letterSpacing: '0.04em' }}>
              REP. COORDS: {project.location.coordinates}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function GlobeMarkers({
  projects = [],
  radius = 3.0,
  selectedProject = null,
  onSelectProject,
}) {
  return (
    <group>
      {projects.map((project) => (
        <SingleMarker
          key={project.id}
          project={project}
          radius={radius}
          isSelected={selectedProject?.id === project.id}
          onSelect={onSelectProject}
        />
      ))}
    </group>
  );
}
