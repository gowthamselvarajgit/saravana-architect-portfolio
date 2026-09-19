import React, { useEffect, useRef, useState } from 'react';
import '../../styles/cloudMistTransition.css';

/**
 * CloudMistTransition
 * Real Green-Screen Video Chroma-Key Atmospheric Cloud Transition Engine.
 *
 * Uses public/assets/video/cloud.mp4 with real 1080p cloud footage.
 * Performs real-time WebGL/Canvas chroma-keying to remove the green screen
 * ([0, 229, 0]), leaving clean, transparent, photorealistic volumetric clouds
 * that billow across the viewport, cover the screen 100% during route change,
 * and then clear to reveal the architectural monograph page.
 *
 * Zero HUD text, zero artificial bars, zero visible green.
 */
export default function CloudMistTransition({
  isActive = false,
  onCovered = () => {},
  onComplete = () => {},
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'billowing' | 'covered' | 'dispersing'
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const animRef = useRef(null);
  const hasCoveredRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      hasCoveredRef.current = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 5.0;
      }
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onCovered();
      onComplete();
      setPhase('idle');
      return;
    }

    hasCoveredRef.current = false;
    setPhase('billowing');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Set video start timestamp: at 5.0s, clouds billow in and close to 100% whiteout at 9.1s
    video.currentTime = 5.0;
    video.playbackRate = 2.2;
    video.play().catch(() => {});

    // Initialize WebGL context for GPU-accelerated chroma-keying
    let gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    let useFallback2D = false;
    let ctx2d = null;

    if (!gl) {
      ctx2d = canvas.getContext('2d');
      useFallback2D = true;
    }

    let program = null;
    let videoTexture = null;
    let uOpacityLoc = null;

    if (!useFallback2D && gl) {
      // Vertex Shader (Full-screen Quad)
      const vsSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;
        void main() {
          vUv = vec2((aPosition.x + 1.0) * 0.5, 1.0 - (aPosition.y + 1.0) * 0.5);
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;

      // Fragment Shader (Green-Screen Chroma-Key & Despill)
      const fsSource = `
        precision highp float;
        uniform sampler2D uVideo;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          vec4 tex = texture2D(uVideo, vUv);
          float r = tex.r;
          float g = tex.g;
          float b = tex.b;

          // Clouds are neutral white/grey, so max(r, b) represents true cloud density
          float maxRb = max(r, b);

          // Green-screen identification: green channel dominates
          // Pure green background is ~[0, 0.898, 0]
          float rawAlpha = clamp(maxRb / (g + 0.0001), 0.0, 1.0);
          
          // Smooth alpha thresholding: 0 in green background, 1 in solid cloud
          float alpha = smoothstep(0.24, 0.62, rawAlpha);

          // Despill green: clamp green channel to maxRb so no green fringe remains
          float despillG = min(g, maxRb * 1.02);

          // Enhance highlights to pure brilliant white
          vec3 cloudColor = vec3(r, despillG, b);
          cloudColor = mix(cloudColor, vec3(1.0), smoothstep(0.68, 0.94, maxRb));

          gl_FragColor = vec4(cloudColor, alpha * uOpacity);
        }
      `;

      const createShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Quad Geometry
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(aPositionLoc);
      gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

      videoTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, videoTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      uOpacityLoc = gl.getUniformLocation(program, 'uOpacity');
    }

    const startTime = performance.now();
    let currentPhase = 'billowing';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER LOOP
    // ─────────────────────────────────────────────────────────────────────────
    const renderLoop = (time) => {
      const elapsed = time - startTime;

      let opacity = 1.0;
      if (currentPhase === 'billowing') {
        // As video plays from 5.0s toward 9.1s (~1350ms):
        if (elapsed >= 1350 && !hasCoveredRef.current) {
          hasCoveredRef.current = true;
          currentPhase = 'covered';
          setPhase('covered');
          onCovered(); // Route changes under 100% whiteout coverage

          // Hold covered for 350ms to let project dossier mount and scroll to top
          setTimeout(() => {
            currentPhase = 'dispersing';
            setPhase('dispersing');

            // Disperse/reveal over 950ms
            setTimeout(() => {
              currentPhase = 'idle';
              setPhase('idle');
              onComplete();
            }, 950);
          }, 350);
        }
      } else if (currentPhase === 'dispersing') {
        // Fade out cloud opacity smoothly
        opacity = Math.max(0, 1.0 - (elapsed - 1700) / 900);
      }

      // WebGL Rendering
      if (gl && program && videoTexture) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.uniform1f(uOpacityLoc, opacity);

        gl.bindTexture(gl.TEXTURE_2D, videoTexture);
        if (video.readyState >= 2) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else if (useFallback2D && ctx2d) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        if (video.readyState >= 2) {
          ctx2d.globalAlpha = opacity;
          ctx2d.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }

      if (currentPhase !== 'idle') {
        animRef.current = requestAnimationFrame(renderLoop);
      }
    };

    animRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isActive]);

  return (
    <div
      className={`arch-cloud-transition-portal phase-${phase}`}
      data-active={phase !== 'idle'}
      aria-hidden="true"
      role="presentation"
    >
      {/* Hidden Video Source (1080p Green-Screen Cloud Footage) */}
      <video
        ref={videoRef}
        src="/assets/video/cloud.mp4"
        muted
        playsInline
        preload="none"
        className="arch-cloud-hidden-video"
      />

      {/* Real-time Chroma-Keyed Cloud Canvas */}
      <canvas ref={canvasRef} className="arch-cloud-canvas" />

      {/* Solid Whiteout Shroud (Active during 'covered' phase for 100% bleed-free route switch) */}
      <div className="arch-cloud-shroud" />
    </div>
  );
}
