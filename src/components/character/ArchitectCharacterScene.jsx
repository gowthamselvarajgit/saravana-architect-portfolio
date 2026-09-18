import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GazeEngine } from '../../utils/gazeEngine';

/**
 * ArchitectCharacterScene
 * Photoreal 3D Digital Twin with Saccade Gaze Engine and Expressive Architectural Gestures
 * - Exclusively renders the Photoreal Ready Player Me Architect humanoid model
 * - Calibrated camera framing: slightly brought down and zoomed in with ample clearance for greeting wave
 */
export default function ArchitectCharacterScene({ className = '', onLoaded }) {
  const containerRef = useRef(null);
  const canvasMountRef = useRef(null);
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
    const width = rect.width || 440;
    const height = rect.height || 520;
    const aspect = width / height;

    // 2. Camera Setup
    // FOV 33, slightly zoomed in, looking at chest/collar height (y=1.28)
    // Model lowered to y=-0.16 so wave gesture hand stays safely inside the container
    const camera = new THREE.PerspectiveCamera(33, aspect, 0.1, 100);
    camera.position.set(0, 1.36, 1.46);
    camera.lookAt(0, 1.28, 0);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
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
    };

    // Load Ready Player Me Photoreal Architect Humanoid
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

        // Lower the model slightly (y = -0.16) to ensure the waving hand gesture fits inside viewport
        characterModel.position.set(0, -0.16, 0);
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
      const w = r.width || 440;
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

      // Natural Head & Neck Tracking with Saccades
      if (headBone) {
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, gaze.headRotY * 0.72, 0.1);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, gaze.headRotX * 0.72, 0.1);
      }

      if (neckBone) {
        neckBone.rotation.y = THREE.MathUtils.lerp(neckBone.rotation.y, gaze.neckRotY * 0.65, 0.08);
      }

      // Rigged Eye Bones for Photoreal Model
      if (leftEyeBone && rightEyeBone) {
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

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  const handleGestureClick = useCallback((actionKey) => {
    if (playGestureRef.current) {
      playGestureRef.current(actionKey);
    }
  }, []);

  return (
    <div ref={containerRef} className={`arch-char-scene-root ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div className="arch-char-canvas-mount" ref={canvasMountRef} />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="arch-char-skeleton">
          <div className="arch-char-spin" />
          <span>INITIALIZING PHOTOREAL ARCHITECT...</span>
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
