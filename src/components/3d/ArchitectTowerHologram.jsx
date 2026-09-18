import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ArchitectTowerHologram
 * Interactive 3D Architectural CAD Wireframe Hologram
 * Inspired by digital-persona's real-time WebGL interactive canvas.
 * Renders a futuristic high-rise skyscraper with glowing structural lattice,
 * scanning elevation laser plane, and cursor-reactive pitch/yaw controls.
 */
export default function ArchitectTowerHologram({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isMounted = true;
    let animId;

    // 1. Scene & Camera
    const scene = new THREE.Scene();

    const rect = container.getBoundingClientRect();
    const width = rect.width || 380;
    const height = rect.height || 240;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0066ff, 3.5, 10);
    blueLight.position.set(2, 3, 2);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 2.8, 10);
    cyanLight.position.set(-2, -1, 2);
    scene.add(cyanLight);

    // 4. Procedural High-Rise Skyscraper Geometry
    const towerGroup = new THREE.Group();
    scene.add(towerGroup);

    // Base podium
    const podiumGeo = new THREE.BoxGeometry(2.4, 0.25, 2.4);
    const podiumEdges = new THREE.EdgesGeometry(podiumGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.65 });
    const podiumWire = new THREE.LineSegments(podiumEdges, lineMat);
    podiumWire.position.y = -1.5;
    towerGroup.add(podiumWire);

    // Ground circular coordinate radar grid
    const radarGeo = new THREE.RingGeometry(0.2, 1.8, 32);
    const radarMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const radarMesh = new THREE.Mesh(radarGeo, radarMat);
    radarMesh.rotation.x = Math.PI / 2;
    radarMesh.position.y = -1.6;
    towerGroup.add(radarMesh);

    // Main Tower Floors (Stacked wireframe boxes with varying dimensions)
    const floorCount = 14;
    const towerHeight = 2.8;
    const floorHeight = towerHeight / floorCount;

    for (let i = 0; i < floorCount; i++) {
      const progress = i / floorCount;
      const taper = 1.0 - progress * 0.35;
      const w = 1.2 * taper;
      const d = 1.2 * taper;
      const y = -1.35 + i * floorHeight + floorHeight / 2;

      // Outer floor edge
      const floorBoxGeo = new THREE.BoxGeometry(w, floorHeight * 0.88, d);
      const floorEdges = new THREE.EdgesGeometry(floorBoxGeo);
      const floorLineMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0x00e5ff : 0x0066ff,
        transparent: true,
        opacity: 0.45 + (1 - progress) * 0.35,
      });
      const floorWire = new THREE.LineSegments(floorEdges, floorLineMat);
      floorWire.position.y = y;

      // Slight twist per floor for aerodynamic architectural feel
      floorWire.rotation.y = progress * 0.22;
      towerGroup.add(floorWire);

      // Core column shaft
      const coreGeo = new THREE.BoxGeometry(w * 0.38, floorHeight, d * 0.38);
      const coreEdges = new THREE.EdgesGeometry(coreGeo);
      const coreMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 });
      const coreWire = new THREE.LineSegments(coreEdges, coreMat);
      coreWire.position.y = y;
      towerGroup.add(coreWire);

      // Cantilever Sky Deck at mid-level
      if (i === 8) {
        const cantileverGeo = new THREE.BoxGeometry(w * 1.5, floorHeight * 0.7, d * 1.1);
        const cantileverEdges = new THREE.EdgesGeometry(cantileverGeo);
        const cantMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
        const cantileverWire = new THREE.LineSegments(cantileverEdges, cantMat);
        cantileverWire.position.set(0.35, y, 0);
        towerGroup.add(cantileverWire);
      }
    }

    // Top Architectural Spire
    const spireGeo = new THREE.ConeGeometry(0.18, 0.75, 4);
    const spireEdges = new THREE.EdgesGeometry(spireGeo);
    const spireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.9 });
    const spireWire = new THREE.LineSegments(spireEdges, spireMat);
    spireWire.position.y = 1.82;
    towerGroup.add(spireWire);

    // Glowing Laser Elevation Scan Plane (Sweeping up and down)
    const scanPlaneGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.rotation.x = Math.PI / 2;
    towerGroup.add(scanPlane);

    // 5. Mouse Reactive Pitch & Yaw
    let targetRotY = 0;
    let targetRotX = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = y * 0.25;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const r = container.getBoundingClientRect();
      const w = r.width || 380;
      const h = r.height || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Continuous ambient rotation + mouse response
      towerGroup.rotation.y += 0.008;
      towerGroup.rotation.y = THREE.MathUtils.lerp(towerGroup.rotation.y, towerGroup.rotation.y + targetRotY * 0.02, 0.08);
      towerGroup.rotation.x = THREE.MathUtils.lerp(towerGroup.rotation.x, targetRotX, 0.08);

      // Sweeping Laser Elevation Scanner
      scanPlane.position.y = -1.4 + Math.sin(elapsed * 1.6) * 1.5 + 1.5;
      scanPlane.rotation.z = elapsed * 0.4;

      // Pulse Radar
      radarMesh.rotation.z = -elapsed * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      scene.clear();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`arch-tower-hologram-wrap ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="arch-tower-canvas" />

      {/* Holographic CAD HUD Overlay */}
      <div className="arch-tower-hud-overlay" aria-hidden="true">
        <div className="arch-tower-hud-row">
          <span className="arch-tower-hud-tag">
            <span className="arch-tower-hud-dot" />
            LIVE CAD WIREFRAME · LOD 350
          </span>
          <span className="arch-tower-hud-metric">60 FPS</span>
        </div>
        <div className="arch-tower-hud-bottom">
          <span>AHC // SKYSCRAPER MODEL</span>
          <span>18°55&apos;42&quot;N · MUMBAI</span>
        </div>
      </div>
    </div>
  );
}
