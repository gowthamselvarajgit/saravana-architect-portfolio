import * as THREE from 'three';

/**
 * Lightweight organic 2D pseudo-simplex noise generator.
 * Eliminates need for external npm dependency while providing silky-smooth micro-tremors.
 */
function pseudoNoise2D(x, y) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return (s - Math.floor(s)) * 2 - 1;
}

function smoothNoise(x, y) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  // Smoothstep interpolation
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const n00 = pseudoNoise2D(i, j);
  const n10 = pseudoNoise2D(i + 1, j);
  const n01 = pseudoNoise2D(i, j + 1);
  const n11 = pseudoNoise2D(i + 1, j + 1);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;

  return nx0 * (1 - sy) + nx1 * sy;
}

/**
 * Tracks normalized animation clips so multiple calls won't scale positions twice.
 */
const normalisedClips = new WeakSet();
const MIXAMO_PREFIX = 'mixamorig';
const POSITION_SUFFIX = '.position';
const MIXAMO_SCALE = 0.01;

/**
 * Normalises Mixamo FBX/GLB animations:
 * 1. Strips 'mixamorig' prefix so tracks bind to standard glTF / RPM bone names (Hips, Spine, Head, etc.)
 * 2. Scales position tracks by 0.01 to match standard glTF meters.
 */
export function normaliseFbxAnimations(animations) {
  if (!animations || !animations.length) return animations;

  for (const clip of animations) {
    if (normalisedClips.has(clip)) continue;

    for (const track of clip.tracks) {
      if (track.name.includes(MIXAMO_PREFIX)) {
        track.name = track.name.replace(MIXAMO_PREFIX, '');
      }
      if (track.name.includes(POSITION_SUFFIX)) {
        for (let j = 0; j < track.values.length; j++) {
          track.values[j] *= MIXAMO_SCALE;
        }
      }
    }
    normalisedClips.add(clip);
  }

  return animations;
}

/**
 * GazeEngine
 * Implements human saccadic eye movements, micro-tremor, and smooth head-neck tracking.
 * Adapted from digital-persona's gaze architecture.
 */
export class GazeEngine {
  constructor() {
    this.time = 0;
    this.currentPointer = new THREE.Vector2(0, 0);
    this.targetPointer = new THREE.Vector2(0, 0);

    // Saccade state (human fixation point jumps)
    this.saccadeOffset = new THREE.Vector2(0, 0);
    this.targetSaccade = new THREE.Vector2(0, 0);
    this.nextSaccadeTime = 1.2;
    this.timeSinceSaccade = 0;

    // Blinking state
    this.nextBlinkTime = 2.8;
    this.timeSinceBlink = 0;
    this.isBlinking = false;
    this.blinkProgress = 0;
  }

  /**
   * Updates target pointer from normalized cursor [-1, 1]
   */
  setTargetPointer(x, y) {
    this.targetPointer.x = THREE.MathUtils.clamp(x, -1, 1);
    this.targetPointer.y = THREE.MathUtils.clamp(y, -1, 1);
  }

  /**
   * Main per-frame update loop
   */
  update(delta) {
    this.time += delta;
    this.timeSinceSaccade += delta;
    this.timeSinceBlink += delta;

    // 1. Saccade Timer (Random fixation jumps every 800ms–2400ms)
    if (this.timeSinceSaccade > this.nextSaccadeTime) {
      this.timeSinceSaccade = 0;
      this.nextSaccadeTime = 0.8 + Math.random() * 1.6;

      // Small rapid jump in fixation
      const angle = Math.random() * Math.PI * 2;
      const magnitude = 0.015 + Math.random() * 0.025;
      this.targetSaccade.x = Math.cos(angle) * magnitude;
      this.targetSaccade.y = Math.sin(angle) * magnitude;
    }

    // Decay saccade back to central focus
    this.saccadeOffset.x = THREE.MathUtils.lerp(this.saccadeOffset.x, this.targetSaccade.x, delta * 12);
    this.saccadeOffset.y = THREE.MathUtils.lerp(this.saccadeOffset.y, this.targetSaccade.y, delta * 12);
    this.targetSaccade.x = THREE.MathUtils.lerp(this.targetSaccade.x, 0, delta * 4);
    this.targetSaccade.y = THREE.MathUtils.lerp(this.targetSaccade.y, 0, delta * 4);

    // 2. Continuous Organic Micro-Tremor (Multi-octave smooth noise)
    const microTremorX = smoothNoise(this.time * 2.2, 0.5) * 0.008;
    const microTremorY = smoothNoise(0.5, this.time * 2.2) * 0.008;

    // 3. Smooth pointer interpolation
    this.currentPointer.x = THREE.MathUtils.lerp(this.currentPointer.x, this.targetPointer.x, delta * 4.5);
    this.currentPointer.y = THREE.MathUtils.lerp(this.currentPointer.y, this.targetPointer.y, delta * 4.5);

    // 4. Subtle respiratory spine breathing
    const breathingY = Math.sin(this.time * 1.6) * 0.012;

    // Return combined ocular & cranial offsets
    return {
      // Head/neck angles in radians
      headRotY: this.currentPointer.x * 0.42 + microTremorX * 0.5,
      headRotX: -this.currentPointer.y * 0.26 + breathingY + microTremorY * 0.5,
      neckRotY: this.currentPointer.x * 0.16,
      neckRotX: -this.currentPointer.y * 0.1,

      // Eye pupil offsets
      eyeOffsetX: this.currentPointer.x * 0.042 + this.saccadeOffset.x + microTremorX,
      eyeOffsetY: this.currentPointer.y * 0.038 + this.saccadeOffset.y + microTremorY,

      // Eye bone rotations (for rigged eye bones in RPM)
      eyeRotY: this.currentPointer.x * 0.32 + this.saccadeOffset.x * 2.5 + microTremorX * 2.0,
      eyeRotX: -this.currentPointer.y * 0.28 + this.saccadeOffset.y * 2.5 + microTremorY * 2.0,

      // Breathing vertical offset
      breathingY,
    };
  }
}
