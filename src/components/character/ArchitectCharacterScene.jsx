import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates an authentic architectural CAD blueprint canvas texture for the monitor screen.
 */
function createCadBlueprintTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Midnight blueprint background
  ctx.fillStyle = '#060B19';
  ctx.fillRect(0, 0, 512, 512);

  // Blueprint coordinate grid
  ctx.strokeStyle = 'rgba(0, 102, 255, 0.25)';
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x <= 512; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Architectural CAD parametric geometry (Tower & Möbius contours)
  ctx.strokeStyle = '#0066FF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(256, 70);
  ctx.lineTo(210, 360);
  ctx.lineTo(302, 360);
  ctx.closePath();
  ctx.stroke();

  // Cross diagrid beams
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 1.5;
  for (let y = 110; y < 350; y += 40) {
    const w = ((y - 70) / 290) * 46;
    ctx.beginPath();
    ctx.moveTo(256 - w, y);
    ctx.lineTo(256 + w, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(256 - w, y);
    ctx.lineTo(256 + w, y + 40);
    ctx.moveTo(256 + w, y);
    ctx.lineTo(256 - w, y + 40);
    ctx.stroke();
  }

  // Datum levels
  ctx.fillStyle = '#00E5FF';
  ctx.font = 'bold 12px "Courier New", monospace';
  ctx.fillText('+ [LVL 42 // 192.40m]', 320, 140);
  ctx.fillText('+ [MÖBIUS ARCH // 59°N]', 320, 220);

  // HUD Header
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText('SARAVANAKUMAR K · ARCHITECTURAL CAD', 32, 40);

  // HUD Footer
  ctx.fillStyle = '#00E5FF';
  ctx.font = '11px "Courier New", monospace';
  ctx.fillText('ACTIVE BIM MODEL // REVIT & RHINO 3D // 60 FPS', 32, 470);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates espresso-brown eyes texture customized for Saravanakumar K.
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
    ctx.fillStyle = '#F8F8F8';
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();

    ctx.restore();
  };

  drawEye(140, 256, 110);
  drawEye(372, 256, 110);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a custom face texture for Saravanakumar K with warm skin tone,
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

    // 2. Camera Setup (Architectural 3/4 viewpoint framing Saravanakumar in full)
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.6, 22.8);
    camera.zoom = 1.1;
    camera.lookAt(0.3, 11.2, 0);
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
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const dirLight = new THREE.DirectionalLight(0xE2ECFF, 1.3);
    dirLight.position.set(2, 9, 6);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95);
    scene.add(ambientLight);

    const fillLight = new THREE.DirectionalLight(0x0066FF, 0.7);
    fillLight.position.set(-3, 5, -2);
    scene.add(fillLight);

    const monitorLight = new THREE.PointLight(0x00E5FF, 1.8, 25, 2);
    monitorLight.position.set(0.5, 9.5, 3.8);
    scene.add(monitorLight);

    // Optional HDR Environment
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/assets/models/character/char_enviorment.hdr',
      (texture) => {
        if (!isMounted) { texture.dispose(); return; }
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.environmentIntensity = 0.6;
      },
      undefined,
      () => {}
    );

    // 5. Load 3D Character Model with Draco Compression
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let mixer = null;
    let headBone = null;
    let neckBone = null;
    let browUpAction = null;
    let characterModel = null;
    const clock = new THREE.Clock();

    // Procedural Textures for Saravanakumar K
    const cadScreenTex = createCadBlueprintTexture();
    const brownEyesTex = createBrownEyesTexture();
    const faceTex = createSaravanaFaceTexture();

    // Natural Indian Skin Tone Material
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xA8704D),
      roughness: 0.62,
      metalness: 0.04,
    });

    // Deep Black Hair Material
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x121110),
      roughness: 0.82,
      metalness: 0.05,
    });

    // Dark Navy Architectural Blazer Material
    const blazerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x181E29),
      roughness: 0.72,
      metalness: 0.08,
    });

    // Dark Trousers Material
    const pantsMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x13151A),
      roughness: 0.85,
    });

    gltfLoader.load(
      '/assets/models/character/character.glb',
      (gltf) => {
        if (!isMounted) return;

        characterModel = gltf.scene;
        scene.add(characterModel);

        // Position & 3/4 architectural rotation so the character is fully visible, not hidden behind the laptop!
        characterModel.rotation.y = 0.58; // ~33 deg 3/4 perspective angle
        characterModel.position.set(0.6, -0.3, 0);

        // Customize Materials & Textures to match Saravanakumar K
        characterModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.frustumCulled = true;

            // Remove static vertex colors so material color applies purely
            if (child.geometry && child.geometry.attributes && child.geometry.attributes.color) {
              child.geometry.deleteAttribute('color');
            }

            const name = child.name || '';

            // 1. Face Mesh with Custom Goatee / Beard Texture
            if (name.includes('Plane.007')) {
              if (faceTex) {
                child.material = new THREE.MeshStandardMaterial({
                  map: faceTex,
                  roughness: 0.65,
                  metalness: 0.04,
                });
              } else {
                child.material = skinMaterial;
              }
            }

            // 2. Ears, Neck, Hands (Skin Tone)
            else if (
              name.includes('Plane.003') ||
              name.includes('Plane.005') ||
              name.includes('Mesh.002') ||
              name.includes('Ear') ||
              name.includes('Hand') ||
              name.includes('Neck')
            ) {
              child.material = skinMaterial;
            }

            // 3. Hair & Eyebrows (Deep Natural Black)
            else if (
              name.includes('Iron:pCube3.004') ||
              name.includes('hair') ||
              name.includes('Eyebrow') ||
              name.includes('Plane.004')
            ) {
              child.material = hairMaterial;
            }

            // 4. Eyes (Espresso Brown Iris)
            else if (name.includes('EYEs') || name.includes('Sphere.002')) {
              if (brownEyesTex) {
                child.material = new THREE.MeshBasicMaterial({
                  map: brownEyesTex,
                });
              }
            }

            // 5. Attire (Dark Architectural Blazer)
            else if (name.includes('Cube.002') || name.includes('BODY.SHIRT') || name.includes('SHIRT')) {
              child.material = blazerMaterial;
            }

            // 6. Pants
            else if (name.includes('Cube.004') || name.includes('Pant')) {
              child.material = pantsMaterial;
            }

            // 7. Monitor Screen (CAD Blueprint Display)
            else if (name.includes('Glass.001') || name.includes('screenlight')) {
              if (cadScreenTex) {
                child.material = new THREE.MeshStandardMaterial({
                  map: cadScreenTex,
                  emissiveMap: cadScreenTex,
                  emissive: new THREE.Color(0x00E5FF),
                  emissiveIntensity: 1.6,
                  roughness: 0.2,
                });
              }
            }
          }
        });

        // Lower the monitor screen slightly so the face, beard, and jacket are completely unobstructed
        const monitor = characterModel.getObjectByName('Plane.004');
        const screenLight = characterModel.getObjectByName('screenlight');
        if (monitor) {
          monitor.position.y = 8.1;
        }
        if (screenLight) {
          screenLight.position.y = 8.1;
        }

        // Bone Hierarchy References
        headBone = characterModel.getObjectByName('spine006') || characterModel.getObjectByName('spine.006');
        neckBone = characterModel.getObjectByName('spine005') || characterModel.getObjectByName('spine.005');

        // Animation Mixer Setup
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(characterModel);

          // 1. Intro Animation
          const introClip = gltf.animations.find((c) => c.name === 'introAnimation');
          if (introClip) {
            const introAction = mixer.clipAction(introClip);
            introAction.setLoop(THREE.LoopOnce, 1);
            introAction.clampWhenFinished = true;
            introAction.play();
          }

          // 2. Typing Animation on keyboard
          const typingClip = gltf.animations.find((c) => c.name === 'typing');
          if (typingClip) {
            const typingAction = mixer.clipAction(typingClip);
            typingAction.timeScale = 1.15;
            typingAction.play();
          }

          // 3. Keyboard Key Animations
          ['key1', 'key2', 'key5', 'key6'].forEach((kName) => {
            const keyClip = gltf.animations.find((c) => c.name === kName);
            if (keyClip) {
              const kAction = mixer.clipAction(keyClip);
              kAction.timeScale = 1.2;
              kAction.play();
            }
          });

          // 4. Blinking Loop every ~3 seconds
          const blinkClip = gltf.animations.find((c) => c.name === 'Blink');
          if (blinkClip) {
            const blinkAction = mixer.clipAction(blinkClip);
            const triggerBlink = () => {
              if (!isMounted || !mixer) return;
              blinkAction.reset().play();
              setTimeout(triggerBlink, 2800 + Math.random() * 2200);
            };
            setTimeout(triggerBlink, 1500);
          }

          // 5. Eyebrow raise reaction on hover
          const browClip = gltf.animations.find((c) => c.name === 'browup');
          if (browClip) {
            browUpAction = mixer.clipAction(browClip);
            browUpAction.setLoop(THREE.LoopOnce, 1);
            browUpAction.clampWhenFinished = true;
          }
        }

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
        browUpAction.fadeIn(0.3).play();
      }
    };
    const handleMouseLeave = () => {
      if (browUpAction) {
        browUpAction.fadeOut(0.5);
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

    // 8. Render Loop with Smooth Head Lerp
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }

      // Smooth cursor interpolation
      mouse.x = THREE.MathUtils.lerp(mouse.x, targetMouse.x, 0.08);
      mouse.y = THREE.MathUtils.lerp(mouse.y, targetMouse.y, 0.08);

      // Smooth Head & Neck Tracking (Relative to 3/4 baseline rotation)
      if (headBone) {
        const maxRotY = Math.PI / 5.5; // ~32 deg horizontal
        const maxRotX = Math.PI / 8;   // ~22 deg vertical
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * maxRotY - 0.2, 0.1);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -mouse.y * maxRotX - 0.1, 0.1);
      }

      if (neckBone) {
        neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, mouse.x * 0.12, 0.08);
      }

      // Pulsing monitor illumination
      if (monitorLight) {
        monitorLight.intensity = 1.4 + Math.sin(clock.getElapsedTime() * 4) * 0.3;
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

      if (cadScreenTex) cadScreenTex.dispose();
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
        <div className="arch-char-hover-zone" ref={hoverRef} title="Interactive Architect Head Tracking" />
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="arch-char-skeleton">
          <div className="arch-char-spin" />
          <span>INITIALIZING 3D WORKSTATION...</span>
        </div>
      )}

      {/* Ambient Blueprint Rim Light Glow */}
      <div className="arch-char-rim-glow" aria-hidden="true" />
    </div>
  );
}
