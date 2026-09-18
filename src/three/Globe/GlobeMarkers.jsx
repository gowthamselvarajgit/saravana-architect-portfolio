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

      {/* Sleek Floating Micro-Pill Tag on Hover Only */}
      {hovered && isFacingCamera && (
        <Html
          position={[0, 0.18, 0]}
          center
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className="arch-pin-micro-tag">
            <span className="arch-pin-tag-num">// {project.projectNumber}</span>
            <span className="arch-pin-tag-title">{project.title}</span>
            <span className="arch-pin-tag-city">{project.location.city.toUpperCase()}</span>
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
