import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GazeEngine } from '../../utils/gazeEngine';

/**
 * Creates espresso-brown eyes texture customized for Saravanakumar K
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
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FAFAFA';
    ctx.fill();

    const irisR = radius * 0.58;
    ctx.beginPath();
    ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
    ctx.fillStyle = '#1D120C';
    ctx.fill();

    const grad = ctx.createRadialGradient(cx, cy, irisR * 0.2, cx, cy, irisR);
    grad.addColorStop(0, '#5C381F');
    grad.addColorStop(0.6, '#382012');
    grad.addColorStop(1, '#1A0E08');
    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.95, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#0A0806';
    ctx.fill();

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
 * Creates custom face texture for Saravanakumar K with warm skin tone and trimmed beard
 */
function createSaravanaFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#A8704D';
  ctx.fillRect(0, 0, 512, 512);

  const grad = ctx.createRadialGradient(256, 230, 40, 256, 256, 240);
  grad.addColorStop(0, '#B8805D');
  grad.addColorStop(0.7, '#A8704D');
  grad.addColorStop(1, '#945E3D');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = '#161412';
  ctx.beginPath();
  ctx.ellipse(225, 305, 28, 10, -0.12, 0, Math.PI * 2);
  ctx.ellipse(287, 305, 28, 10, 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#874D38';
  ctx.beginPath();
  ctx.ellipse(256, 324, 25, 7, 0, 0, Math.PI * 2);
  ctx.fill();

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
 * ArchitectCharacterScene
 * Interactive 3D Digital Twin with Saccade Gaze Engine, Avatar Mode Switch, and Gesture Actions
 */
export default function ArchitectCharacterScene({ className = '', onLoaded }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
  const [avatarMode, setAvatarMode] = useState('stylized'); // 'stylized' | 'humanoid'
  const [activeAction, setActiveAction] = useState('idle');
  const [isLoading, setIsLoading] = useState(true);

  const playGestureRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const container = canvasMountRef.current;
    if (!container) return;

    setIsLoading(true);

    // 1. Scene Setup
    const scene = new THREE.Scene();

    const rect = container.getBoundingClientRect();
    const width = rect.width || 420;
    const height = rect.height || 520;
    const aspect = width / height;

    // 2. Camera Setup (Calibrated portrait framing for each model)
    const camera = new THREE.PerspectiveCamera(
      avatarMode === 'stylized' ? 38 : 32,
      aspect,
      0.1,
      100
    );

    if (avatarMode === 'stylized') {
      camera.position.set(0, 1.25, 2.85);
      camera.lookAt(0, 1.15, 0);
    } else {
      camera.position.set(0, 1.48, 1.55);
      camera.lookAt(0, 1.40, 0);
    }

    // 3. WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.4);
    keyLight.position.set(0.8, 2.2, 3.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbe7ff, 1.4);
    fillLight.position.set(-2.0, 1.0, 2.5);
    scene.add(fillLight);

    const cyanRim = new THREE.DirectionalLight(0x00d0ff, 2.6);
    cyanRim.position.set(-3.0, 2.0, -2.0);
    scene.add(cyanRim);

    const purpleRim = new THREE.DirectionalLight(0x9d4edd, 2.4);
    purpleRim.position.set(3.0, 2.0, -2.0);
    scene.add(purpleRim);

    // 5. Gaze Engine
    const gazeEngine = new GazeEngine();

    // 6. Loaders & Models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    let mixer = null;
    let characterModel = null;
    let headBone = null;
    let neckBone = null;
    let brownEyesTex = null;
    let faceTex = null;
    let leftEyeBone = null;
    let rightEyeBone = null;

    const actions = {};
    let currentActionName = 'idle';

    const switchAction = (newActionName, duration = 0.25) => {
      if (!mixer || currentActionName === newActionName) return;
      const prevAction = actions[currentActionName];
      const nextAction = actions[newActionName];

      if (nextAction) {
        nextAction.reset();
        nextAction.enabled = true;
        if (prevAction) {
          prevAction.crossFadeTo(nextAction, duration, true);
        }
        nextAction.play();
        currentActionName = newActionName;
        setActiveAction(newActionName);
      }
    };

    playGestureRef.current = (actionKey) => {
      if (avatarMode === 'humanoid') {
        if (actionKey === 'idle') {
          switchAction('idle', 0.35);
        } else if (actions[actionKey]) {
          switchAction(actionKey, 0.2);
          const clip = actions[actionKey].getClip();
          setTimeout(() => {
            if (isMounted && currentActionName === actionKey) {
              switchAction('idle', 0.4);
            }
          }, Math.max(2200, clip.duration * 1000 - 300));
        }
      } else {
        // Stylized Model Gestures
        setActiveAction(actionKey);
        if (headBone) {
          if (actionKey === 'think') {
            headBone.rotation.z = 0.12;
          } else if (actionKey === 'present') {
            headBone.rotation.y = 0.22;
          } else if (actionKey === 'wave') {
            headBone.rotation.y = -0.22;
          }
        }
        setTimeout(() => {
          if (isMounted) {
            setActiveAction('idle');
            if (headBone) headBone.rotation.z = 0;
          }
        }, 2200);
      }
    };

    // Mode A: Stylized Cartoon Digital Twin
    if (avatarMode === 'stylized') {
      brownEyesTex = createBrownEyesTexture();
      faceTex = createSaravanaFaceTexture();

      const characterNodeNames = new Set([
        'Cube', 'Cube.001', 'Cube.002', 'Cube.004', 'Cube.006',
        'Cylinder', 'Cylinder.001', 'BODY.HAIR', 'BODY.FACE',
        'BODY.SHIRT', 'EYE.L', 'EYE.R', 'BODY.SKIN',
      ]);

      const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0x9e6844,
        roughness: 0.65,
        metalness: 0.04,
      });

      const faceMaterial = new THREE.MeshStandardMaterial({
        map: faceTex,
        roughness: 0.62,
        metalness: 0.04,
      });

      const hairMaterial = new THREE.MeshStandardMaterial({
        color: 0x11100e,
        roughness: 0.85,
        metalness: 0.05,
      });

      const blazerMaterial = new THREE.MeshStandardMaterial({
        color: 0x1b2838,
        roughness: 0.72,
        metalness: 0.08,
      });

      const pantsMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e2229,
        roughness: 0.8,
        metalness: 0.02,
      });

      gltfLoader.load(
        '/assets/models/character/character.glb',
        (gltf) => {
          if (!isMounted) return;
          characterModel = gltf.scene;

          characterModel.traverse((child) => {
            if (child.isMesh) {
              const name = child.name || '';
              const isCharacterPart =
                characterNodeNames.has(name) ||
                name.startsWith('Cube') ||
                name.startsWith('Cylinder') ||
                name.includes('BODY') ||
                name.includes('EYE') ||
                name.includes('Pant') ||
                name.includes('Hand');

              if (!isCharacterPart) {
                child.visible = false;
                child.geometry?.dispose();
                return;
              }

              if (name === 'BODY.FACE' || name === 'Cube.001') {
                child.material = faceMaterial;
              } else if (name === 'BODY.HAIR' || name.includes('HAIR')) {
                child.material = hairMaterial;
              } else if (name.includes('SKIN') || name.includes('Hand') || name === 'Cube') {
                child.material = skinMaterial;
              } else if (name.includes('EYE') || name.includes('Cylinder')) {
                if (brownEyesTex) {
                  child.material = new THREE.MeshBasicMaterial({ map: brownEyesTex });
                }
              } else if (name.includes('SHIRT') || name.includes('Cube.002')) {
                child.material = blazerMaterial;
              } else if (name.includes('Pant') || name.includes('Cube.004')) {
                child.material = pantsMaterial;
              }
            }
          });

          headBone = characterModel.getObjectByName('spine006') || characterModel.getObjectByName('spine.006');
          neckBone = characterModel.getObjectByName('spine005') || characterModel.getObjectByName('spine.005');

          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(characterModel);
            const blinkClip = gltf.animations.find((c) => c.name === 'Blink');
            if (blinkClip) {
              const blinkAction = mixer.clipAction(blinkClip);
              const triggerBlink = () => {
                if (!isMounted || !mixer) return;
                blinkAction.reset().play();
                setTimeout(triggerBlink, 2400 + Math.random() * 2000);
              };
              setTimeout(triggerBlink, 1000);
            }
          }

          characterModel.scale.set(0.1, 0.1, 0.1);
          characterModel.position.set(0, -0.05, 0);
          scene.add(characterModel);
          setIsLoading(false);
          if (onLoaded) onLoaded();
        },
        undefined,
        (err) => {
          console.error('Error loading stylized character:', err);
          setIsLoading(false);
        }
      );
    } else {
      // Mode B: Ready Player Me Photoreal Architect Humanoid
      gltfLoader.load(
        '/assets/models/character/humanoid_architect.glb',
        (gltf) => {
          if (!isMounted) return;
          characterModel = gltf.scene;

          characterModel.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.roughness = 0.55;
              child.material.metalness = 0.05;
            }
          });

          headBone = characterModel.getObjectByName('Head');
          neckBone = characterModel.getObjectByName('Neck');
          leftEyeBone = characterModel.getObjectByName('LeftEye');
          rightEyeBone = characterModel.getObjectByName('RightEye');

          characterModel.position.set(0, 0, 0);
          scene.add(characterModel);

          mixer = new THREE.AnimationMixer(characterModel);

          // Load Modular Animation Clips
          const animList = [
            { key: 'idle', url: '/assets/models/character/animations/idle.glb' },
            { key: 'present', url: '/assets/models/character/animations/present.glb' },
            { key: 'think', url: '/assets/models/character/animations/think.glb' },
            { key: 'wave', url: '/assets/models/character/animations/wave.glb' },
          ];

          let loadedCount = 0;
          animList.forEach(({ key, url }) => {
            gltfLoader.load(url, (animGltf) => {
              if (!isMounted || !mixer) return;
              if (animGltf.animations && animGltf.animations.length > 0) {
                const action = mixer.clipAction(animGltf.animations[0]);
                if (key === 'idle') {
                  action.setLoop(THREE.LoopRepeat);
                  action.play();
                } else {
                  action.setLoop(THREE.LoopOnce, 1);
                  action.clampWhenFinished = true;
                }
                actions[key] = action;
              }
              loadedCount++;
              if (loadedCount === animList.length) {
                currentActionName = 'idle';
                setActiveAction('idle');
              }
            });
          });

          setIsLoading(false);
          if (onLoaded) onLoaded();
        },
        undefined,
        (err) => {
          console.error('Error loading humanoid architect:', err);
          setIsLoading(false);
        }
      );
    }

    // 7. Mouse / Pointer Movement Tracking
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      gazeEngine.setTargetPointer(x, y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. Responsive Resize Handler
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

    // 9. Animation & Gaze Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      // Update Saccades, Organic Micro-Tremors, and Breathing via GazeEngine
      const gaze = gazeEngine.update(delta);

      // Head & Neck Tracking with Saccades
      if (headBone) {
        if (avatarMode === 'stylized') {
          headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, gaze.headRotY - 0.12, 0.1);
          headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, gaze.headRotX - 0.08, 0.1);
        } else {
          headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, gaze.headRotY * 0.75, 0.1);
          headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, gaze.headRotX * 0.75, 0.1);
        }
      }

      if (neckBone) {
        neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, gaze.neckRotY * 0.7, 0.08);
      }

      // Real-Time Eye Pupils for Stylized Model
      if (avatarMode === 'stylized' && brownEyesTex) {
        brownEyesTex.offset.x = THREE.MathUtils.lerp(brownEyesTex.offset.x, gaze.eyeOffsetX, 0.14);
        brownEyesTex.offset.y = THREE.MathUtils.lerp(brownEyesTex.offset.y, gaze.eyeOffsetY, 0.14);
      }

      // Rigged Eye Bones for Humanoid Model
      if (avatarMode === 'humanoid' && leftEyeBone && rightEyeBone) {
        leftEyeBone.rotation.y = gaze.eyeRotY;
        leftEyeBone.rotation.x = gaze.eyeRotX;
        rightEyeBone.rotation.y = gaze.eyeRotY;
        rightEyeBone.rotation.x = gaze.eyeRotX;
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

      dracoLoader.dispose();
      scene.clear();
      renderer.dispose();

      if (brownEyesTex) brownEyesTex.dispose();
      if (faceTex) faceTex.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [avatarMode, onLoaded]);

  const handleGestureClick = useCallback((actionKey) => {
    if (playGestureRef.current) {
      playGestureRef.current(actionKey);
    }
  }, []);

  return (
    <div ref={containerRef} className={`arch-char-scene-root ${className}`}>
      {/* Top Header Mode Toggle: Stylized vs Humanoid */}
      <div className="arch-char-mode-selector">
        <button
          type="button"
          className={`arch-char-mode-btn ${avatarMode === 'stylized' ? 'active' : ''}`}
          onClick={() => setAvatarMode('stylized')}
          title="Switch to stylized cartoon digital twin"
        >
          <span>🎭 Stylized Twin</span>
        </button>
        <button
          type="button"
          className={`arch-char-mode-btn ${avatarMode === 'humanoid' ? 'active' : ''}`}
          onClick={() => setAvatarMode('humanoid')}
          title="Switch to photoreal Ready Player Me humanoid avatar"
        >
          <span>👤 Photoreal Architect</span>
        </button>
      </div>

      {/* 3D Canvas Mount Point */}
      <div className="arch-char-canvas-mount" ref={canvasMountRef} />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="arch-char-skeleton">
          <div className="arch-char-spin" />
          <span>
            INITIALIZING {avatarMode === 'stylized' ? '3D CARTOON TWIN' : 'PHOTOREAL ARCHITECT'}...
          </span>
        </div>
      )}

      {/* Ambient Blueprint Rim Light Glow */}
      <div className="arch-char-rim-glow" aria-hidden="true" />

      {/* Interactive Floating Gesture Action Bar */}
      <div className="arch-char-actions-bar" role="toolbar" aria-label="Avatar presentation gestures">
        <button
          type="button"
          className={`arch-char-action-chip ${activeAction === 'wave' ? 'active' : ''}`}
          onClick={() => handleGestureClick('wave')}
          title="Greet visitors with a friendly wave"
        >
          <span>👋 Greet</span>
        </button>

        <button
          type="button"
          className={`arch-char-action-chip ${activeAction === 'present' ? 'active' : ''}`}
          onClick={() => handleGestureClick('present')}
          title="Architectural scheme presentation gesture"
        >
          <span>📐 Present</span>
        </button>

        <button
          type="button"
          className={`arch-char-action-chip ${activeAction === 'think' ? 'active' : ''}`}
          onClick={() => handleGestureClick('think')}
          title="Design review & contemplation pose"
        >
          <span>💡 Ponder</span>
        </button>

        <button
          type="button"
          className={`arch-char-action-chip ${activeAction === 'idle' ? 'active' : ''}`}
          onClick={() => handleGestureClick('idle')}
          title="Live cursor tracking with saccadic gaze"
        >
          <span>👁️ Track</span>
        </button>
      </div>
    </div>
  );
}
