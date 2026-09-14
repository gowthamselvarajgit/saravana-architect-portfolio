import React, { useMemo, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MOBIUS_MODEL_MANIFEST } from '../../data/models/mobiusModelData';

/**
 * Fallback Material Palettes
 */
const DEFAULT_PALETTES = {
  timber: {
    default: {
      color: '#C99B6A',
      roughness: 0.48,
      metalness: 0.04,
      emissive: '#000000',
    },
  },
  clay: {
    default: {
      color: '#E5DFD5',
      roughness: 0.86,
      metalness: 0.0,
      emissive: '#000000',
    },
  },
  wireframe: {
    default: {
      color: '#2B3D52',
      roughness: 0.5,
      metalness: 0.1,
      wireframe: true,
    },
  },
};

/**
 * ModelMesh — Renders the project's verified 3D geometry
 */
export default function ModelMesh({
  modelManifest = MOBIUS_MODEL_MANIFEST,
  shadingMode = 'timber',
  activeLayer = 'all',
  hoveredElement = null,
  selectedElement = null,
  onHoverElement = () => {},
  onSelectElement = () => {},
  theme = 'light',
}) {
  const modelPath =
    modelManifest?.modelPath ||
    modelManifest?.webModelPath ||
    MOBIUS_MODEL_MANIFEST.webModelPath;

  const { scene } = useGLTF(modelPath);
  const isDark = theme === 'dark';

  // Map of hierarchy metadata for fast lookup
  const hierarchyMap = useMemo(() => {
    const map = new Map();
    const list = modelManifest?.hierarchy || MOBIUS_MODEL_MANIFEST.hierarchy;
    list.forEach((item) => {
      map.set(item.id, item);
    });
    return map;
  }, [modelManifest]);

  // Determine which layer id a node belongs to
  const getLayerIdForNode = useCallback(
    (node) => {
      if (!node) return null;
      let curr = node;
      while (curr) {
        if (hierarchyMap.has(curr.name)) return curr.name;
        curr = curr.parent;
      }
      // If single mesh without named parents, match first hierarchy item if available
      const firstEntry = modelManifest?.hierarchy?.[0]?.id;
      return firstEntry || 'default';
    },
    [hierarchyMap, modelManifest]
  );

  // Create & assign materials dynamically to scene meshes
  useMemo(() => {
    const projectPalettes = modelManifest?.palettes || {};
    const activePalette =
      projectPalettes[shadingMode] ||
      DEFAULT_PALETTES[shadingMode] ||
      DEFAULT_PALETTES.timber;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const layerId = getLayerIdForNode(child);
      const layerProps =
        activePalette[layerId] ||
        activePalette.default ||
        DEFAULT_PALETTES.timber.default;

      const isIsolated = activeLayer !== 'all';
      const matchesActive = !isIsolated || layerId === activeLayer;
      const isHovered = hoveredElement === layerId;
      const isSelected = selectedElement === layerId;

      // Ensure geometry computes vertex normals if missing
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      // Dynamic color adjustments for dark theme in wireframe mode
      let baseColor = layerProps.color;
      if (shadingMode === 'wireframe' && isDark) {
        if (layerId === 'MOBIUS_PAVILION_SHELL' || layerId === 'Biomimetic_Tower_Mesh') {
          baseColor = '#58A6FF';
        } else if (layerId === 'MOBIUS_SOFFIT_RUNES') {
          baseColor = '#FF7B72';
        } else {
          baseColor = '#4B6B8A';
        }
      }

      // Emissive highlight state
      let emissiveColor = '#000000';
      let emissiveIntensity = 0.0;
      if (isSelected) {
        emissiveColor = isDark ? '#FF9E3B' : '#D97706';
        emissiveIntensity = 0.45;
      } else if (isHovered) {
        emissiveColor = isDark ? '#E5C07B' : '#F59E0B';
        emissiveIntensity = 0.25;
      }

      // Opacity handling for layer isolation
      const opacity = matchesActive ? (layerProps.opacity ?? 1.0) : 0.12;
      const transparent = !matchesActive || Boolean(layerProps.transparent);

      // Create new MeshStandardMaterial with high visual fidelity
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(baseColor),
        roughness: layerProps.roughness ?? 0.5,
        metalness: layerProps.metalness ?? 0.0,
        wireframe: Boolean(layerProps.wireframe),
        transparent: transparent,
        opacity: opacity,
        depthWrite: matchesActive && !layerProps.wireframe,
        emissive: new THREE.Color(emissiveColor),
        emissiveIntensity: emissiveIntensity,
        side: THREE.DoubleSide,
      });

      child.material = mat;
      child.castShadow = false;
      child.receiveShadow = false;
    });
  }, [
    scene,
    modelManifest,
    shadingMode,
    activeLayer,
    hoveredElement,
    selectedElement,
    isDark,
    getLayerIdForNode,
  ]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    const layerId = getLayerIdForNode(e.object);
    if (layerId) {
      onHoverElement(layerId);
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    onHoverElement(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    const layerId = getLayerIdForNode(e.object);
    if (layerId) {
      onSelectElement(layerId);
    }
  };

  return (
    <group
      name={`${modelManifest?.slug || 'project'}-root-group`}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <primitive object={scene} />
    </group>
  );
}

// Preload web models
useGLTF.preload(MOBIUS_MODEL_MANIFEST.webModelPath);
useGLTF.preload('/assets/models/ribbon-of-life/ribbon_of_life.glb');
