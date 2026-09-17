import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Creates espresso-brown eyes texture customized for Saravanakumar K
 * with crisp sclera, rich iris, and dual catchlight reflections.
 */
function createBrownEyesTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);

  const drawEye = (cx, cy, radius) => {
    // Sclera (White of eye)
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FAFAFA';
    ctx.fill();

    // Outer Iris Ring (Dark Chocolate)
    const irisR = radius * 0.58;
    ctx.beginPath();
    ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
    ctx.fillStyle = '#1D120C';
    ctx.fill();

    // Inner Iris Radial Gradient (Warm Espresso to Amber Hazel)
    const grad = ctx.createRadialGradient(cx, cy, irisR * 0.2, cx, cy, irisR);
    grad.addColorStop(0, '#5C381F');
    grad.addColorStop(0.6, '#382012');
    grad.addColorStop(1, '#1A0E08');
    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Pupil (Deep Jet Black)
    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0806';
    ctx.fill();

    // Dual Specular Catchlights (Crisp White Reflections)
    ctx.beginPath();
    ctx.arc(cx - irisR * 0.28, cy - irisR * 0.28, irisR * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + irisR * 0.22, cy + irisR * 0.22, irisR * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fill();

    ctx.restore();
  };

  drawEye(140, 256, 110);
  drawEye(372, 256, 110);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates custom face texture for Saravanakumar K with warm skin tone,
 * mustache, and trimmed chin beard/goatee.
 */
function createSaravanaFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Warm South Asian skin tone
  ctx.fillStyle = '#A8704D';
  ctx.fillRect(0, 0, 512, 512);

  // Soft facial shading
  const grad = ctx.createRadialGradient(256, 230, 40, 256, 256, 240);
  grad.addColorStop(0, '#B8805D');
  grad.addColorStop(0.7, '#A8704D');
  grad.addColorStop(1, '#945E3D');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Trimmed mustache (above lip, under nose)
  ctx.fillStyle = '#161412';
  ctx.beginPath();
  ctx.ellipse(225, 305, 28, 10, -0.12, 0, Math.PI * 2);
  ctx.ellipse(287, 305, 28, 10, 0.12, 0, Math.PI * 2);
  ctx.fill();

  // Natural warm lips
  ctx.fillStyle = '#874D38';
  ctx.beginPath();
  ctx.ellipse(256, 324, 25, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Trimmed goatee & chin beard
  ctx.fillStyle = '#161412';
  ctx.beginPath();
  ctx.ellipse(256, 342, 9, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(256, 385, 46, 26, 0, 0, Math.PI * 2);
  ctx.ellipse(190, 365, 36, 16, 0.5, 0, Math.PI * 2);
  ctx.ellipse(322, 365, 36, 16, -0.5, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * ArchitectCharacterScene — Interactive 3D Cartoon Digital Twin of Saravanakumar K
 * Features:
 * - Isolated cartoon character (laptop, keyboard, desk, and room completely removed)
 * - Real-time eye pupil tracking and head orientation responsive to mouse cursor
 * - Periodic natural blinking loop
 * - Eyebrow reaction on hover
 * - Tailored architectural navy blazer, styled hair, and warm South Asian complexion
 */
export default function ArchitectCharacterScene({ className = '', onLoaded }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
  const hoverRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasMountRef.current) return;

    let isMounted = true;
    const container = canvasMountRef.current;
    let rect = container.getBoundingClientRect();
    let width = rect.width || 420;
    let height = rect.height || 520;
    const aspect = width / height;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Architectural 3/4 viewpoint framing Saravanakumar's bust & face in full)
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.6, 22.8);
    camera.zoom = 1.15;
    camera.lookAt(0.2, 11.2, 0);
    camera.updateProjectionMatrix();

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Setup (Warm key + subtle fill + architectural cyan & purple rims)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Key Light (illuminating face, smile, and blazer warmly)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.6);
    keyLight.position.set(2.0, 15.0, 10.0);
    scene.add(keyLight);

    // Fill Light (soft cool tone for shadow depth)
    const fillLight = new THREE.DirectionalLight(0xdce8ff, 0.8);
    fillLight.position.set(-4.0, 12.0, 6.0);
    scene.add(fillLight);

    // Cyan Kicker Rim Light (Left shoulder & jawline)
    const cyanRim = new THREE.DirectionalLight(0x00d0ff, 1.8);
    cyanRim.position.set(-4.5, 13.5, -3.0);
    scene.add(cyanRim);

    // Purple / Indigo Rim Light (Right hair silhouette matching reference portrait)
    const purpleRim = new THREE.DirectionalLight(0x9d4edd, 2.0);
    purpleRim.position.set(4.5, 14.0, -3.0);
    scene.add(purpleRim);

    // Top Hair Light
    const hairLight = new THREE.DirectionalLight(0xffffff, 0.85);
    hairLight.position.set(0, 17.0, 1.0);
    scene.add(hairLight);

    // Optional HDR Environment for realistic PBR reflections
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/assets/models/character/char_enviorment.hdr',
      (texture) => {
        if (!isMounted) { texture.dispose(); return; }
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.environmentIntensity = 0.4;
      },
      undefined,
      () => {}
    );

    // Procedural Textures & Materials for Saravanakumar K
    const brownEyesTex = createBrownEyesTexture();
    const faceTex = createSaravanaFaceTexture();

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xa8704d),
      roughness: 0.65,
      metalness: 0.04,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x141212),
      roughness: 0.8,
      metalness: 0.05,
    });

    const blazerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x182030), // Architectural dark navy
      roughness: 0.7,
      metalness: 0.08,
    });

    const pantsMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111622),
      roughness: 0.8,
      metalness: 0.05,
    });

    // 5. Load the Cloned Cartoon Character Model
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let characterModel = null;
    let headBone = null;
    let neckBone = null;
    let mixer = null;
    let browUpAction = null;

    // The strict set of nodes that compose ONLY the character
    const characterNodeNames = new Set([
      'hair',
      'BODY.SHIRT',
      'Ear.001',
      'Eyebrow',
      'EYEs.001',
      'Face.002',
      'Hand',
      'Neck',
      'Pant',
      'Plane.007',
      'Shoe',
      'Sole'
    ]);

    gltfLoader.load(
      '/assets/models/character/character.glb',
      (gltf) => {
        if (!isMounted) return;

        characterModel = gltf.scene;

        // Traverse and isolate ONLY the character meshes; hide everything else (laptop, desk, keys, room)
        characterModel.traverse((child) => {
          if (child.isMesh) {
            const name = child.name;

            // Check if this mesh belongs to the character
            const isCharacterPart = characterNodeNames.has(name) ||
              name.includes('EYEs') ||
              name.includes('Sphere.002') ||
              name.includes('Face') ||
              name.includes('SHIRT') ||
              name.includes('Pant') ||
              name.includes('hair') ||
              name.includes('Eyebrow') ||
              name.includes('Neck') ||
              name.includes('Hand') ||
              name.includes('Ear');

            if (!isCharacterPart) {
              // Hide laptop, monitor, keyboard keys, desk, floor, chair
              child.visible = false;
              return;
            }

            // Keep character part visible with polished materials
            child.visible = true;
            child.castShadow = false;
            child.receiveShadow = false;

            // 1. Face & Groomed Beard / Goatee
            if (name.includes('Plane.007')) {
              if (faceTex) {
                child.material = new THREE.MeshStandardMaterial({
                  map: faceTex,
                  roughness: 0.65,
                  metalness: 0.04,
                });
              }
            }
            // 2. Skin Tone (Head, Neck, Hands, Ears)
            else if (
              name.includes('Mesh.002') ||
              name.includes('Face') ||
              name.includes('Hand') ||
              name.includes('Ear') ||
              name.includes('Neck')
            ) {
              child.material = skinMaterial;
            }
            // 3. Stylized Volumetric Hair & Eyebrows
            else if (
              name.includes('hair') ||
              name.includes('Eyebrow') ||
              name.includes('Plane.003')
            ) {
              child.material = hairMaterial;
            }
            // 4. Cartoon Eyes (Espresso brown with pupil tracking texture)
            else if (name.includes('EYEs') || name.includes('Sphere.002')) {
              if (brownEyesTex) {
                child.material = new THREE.MeshBasicMaterial({
                  map: brownEyesTex,
                });
              }
            }
            // 5. Attire (Dark Architectural Navy Blazer)
            else if (name.includes('BODY.SHIRT') || name.includes('SHIRT') || name.includes('Cube.002')) {
              child.material = blazerMaterial;
            }
            // 6. Pants
            else if (name.includes('Pant') || name.includes('Cube.004')) {
              child.material = pantsMaterial;
            }
          }
        });

        // Bone Hierarchy References for Head & Neck Tracking
        headBone = characterModel.getObjectByName('spine006') || characterModel.getObjectByName('spine.006');
        neckBone = characterModel.getObjectByName('spine005') || characterModel.getObjectByName('spine.005');

        // Animation Mixer Setup (Blinking loop + Eyebrow hover reaction)
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(characterModel);

          // 1. Natural Blinking Loop every ~3.2 seconds
          const blinkClip = gltf.animations.find((c) => c.name === 'Blink');
          if (blinkClip) {
            const blinkAction = mixer.clipAction(blinkClip);
            const triggerBlink = () => {
              if (!isMounted || !mixer) return;
              blinkAction.reset().play();
              setTimeout(triggerBlink, 2600 + Math.random() * 2400);
            };
            setTimeout(triggerBlink, 1200);
          }

          // 2. Eyebrow raise reaction on hover
          const browClip = gltf.animations.find((c) => c.name === 'browup');
          if (browClip) {
            browUpAction = mixer.clipAction(browClip);
            browUpAction.setLoop(THREE.LoopOnce, 1);
            browUpAction.clampWhenFinished = true;
          }
        }

        scene.add(characterModel);
        setIsLoading(false);
        if (onLoaded) onLoaded();
      },
      undefined,
      (err) => {
        console.error('Error loading 3D character:', err);
        setIsLoading(false);
      }
    );

    // 6. Interactive Mouse / Cursor Tracking Logic
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      // Coordinates normalized to [-1, 1] relative to viewport
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Hover effect on character face
    const hoverEl = hoverRef.current;
    const handleMouseEnter = () => {
      if (browUpAction) {
        browUpAction.reset();
        browUpAction.enabled = true;
        browUpAction.fadeIn(0.25).play();
      }
    };
    const handleMouseLeave = () => {
      if (browUpAction) {
        browUpAction.fadeOut(0.4);
      }
    };

    if (hoverEl) {
      hoverEl.addEventListener('mouseenter', handleMouseEnter);
      hoverEl.addEventListener('mouseleave', handleMouseLeave);
    }

    // 7. Responsive Resize Handler
    const handleResize = () => {
      if (!canvasMountRef.current) return;
      const r = canvasMountRef.current.getBoundingClientRect();
      const w = r.width || 420;
      const h = r.height || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation & Real-Time Eye / Head Tracking Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth cursor interpolation
      mouse.x = THREE.MathUtils.lerp(mouse.x, targetMouse.x, 0.08);
      mouse.y = THREE.MathUtils.lerp(mouse.y, targetMouse.y, 0.08);

      // Subtle organic breathing motion
      const breathing = Math.sin(elapsed * 1.8) * 0.02;

      // Real-Time Head & Neck Bone Tracking (Follows cursor smoothly)
      if (headBone) {
        const maxRotY = 0.45; // ~26 deg horizontal rotation
        const maxRotX = 0.28; // ~16 deg vertical tilt
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * maxRotY - 0.12, 0.1);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -mouse.y * maxRotX - 0.08 + breathing * 0.5, 0.1);
      }

      if (neckBone) {
        neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, mouse.x * 0.12, 0.08);
      }

      // Real-Time Eye Pupil Tracking (Pupils smoothly slide inside eye sockets toward the cursor)
      if (brownEyesTex) {
        const targetEyeOffsetX = mouse.x * 0.045;
        const targetEyeOffsetY = mouse.y * 0.04;
        brownEyesTex.offset.x = THREE.MathUtils.lerp(brownEyesTex.offset.x, targetEyeOffsetX, 0.12);
        brownEyesTex.offset.y = THREE.MathUtils.lerp(brownEyesTex.offset.y, targetEyeOffsetY, 0.12);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (hoverEl) {
        hoverEl.removeEventListener('mouseenter', handleMouseEnter);
        hoverEl.removeEventListener('mouseleave', handleMouseLeave);
      }

      dracoLoader.dispose();
      scene.clear();
      renderer.dispose();

      if (brownEyesTex) brownEyesTex.dispose();
      if (faceTex) faceTex.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div ref={containerRef} className={`arch-char-scene-root ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div className="arch-char-canvas-mount" ref={canvasMountRef}>
        {/* Interactive Face Hover Zone */}
        <div className="arch-char-hover-zone" ref={hoverRef} title="Interactive Architect Head & Eye Tracking" />
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="arch-char-skeleton">
          <div className="arch-char-spin" />
          <span>INITIALIZING 3D CARTOON TWIN...</span>
        </div>
      )}

      {/* Ambient Blueprint Rim Light Glow */}
      <div className="arch-char-rim-glow" aria-hidden="true" />
    </div>
  );
}
