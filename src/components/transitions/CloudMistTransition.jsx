import React, { useEffect, useState } from 'react';
import '../../styles/cloudMistTransition.css';

/**
 * CloudMistTransition
 * Full-screen cinematic volumetric cloud and mist transition.
 * Sweeps across the viewport when navigating into a 3D project detail page,
 * completely cloaks the screen in billowing atmospheric clouds, and slowly
 * dissolves as morning mist to reveal the 3D architectural monograph.
 *
 * @param {boolean} isActive - Controls when the cloud transition triggers
 * @param {function} onCovered - Fired at peak 100% cloud cover (time to navigate)
 * @param {function} onComplete - Fired when mist has completely dispersed
 */
export default function CloudMistTransition({
  isActive = false,
  onCovered = () => {},
  onComplete = () => {},
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'billowing' | 'covered' | 'dispersing'

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }

    // Phase 1: Billow In (0 -> 1100ms)
    setPhase('billowing');

    const coverTimer = setTimeout(() => {
      setPhase('covered');
      onCovered();

      // Phase 2: Start dispersing after route switch (1250ms)
      const disperseTimer = setTimeout(() => {
        setPhase('dispersing');

        // Phase 3: Complete and unmount (2400ms)
        const completeTimer = setTimeout(() => {
          setPhase('idle');
          onComplete();
        }, 1100);

        return () => clearTimeout(completeTimer);
      }, 350);

      return () => clearTimeout(disperseTimer);
    }, 1100);

    return () => clearTimeout(coverTimer);
  }, [isActive]);

  if (phase === 'idle') return null;

  return (
    <div className={`arch-cloud-transition-portal phase-${phase}`} aria-hidden="true">
      {/* SVG Turbulence Filter for Organic Cloud Micro-Structures */}
      <svg className="arch-cloud-filter-svg">
        <filter id="cloudDistort">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Base Atmospheric Fog Background */}
      <div className="arch-cloud-backdrop" />

      {/* Layer 1: Foreground Low-Density Billowing Puffs */}
      <div className="arch-cloud-layer layer-1">
        <div className="arch-cloud-puff puff-1" />
        <div className="arch-cloud-puff puff-2" />
        <div className="arch-cloud-puff puff-3" />
      </div>

      {/* Layer 2: Core Dense Cumulus Masses */}
      <div className="arch-cloud-layer layer-2">
        <div className="arch-cloud-puff puff-4" />
        <div className="arch-cloud-puff puff-5" />
        <div className="arch-cloud-puff puff-6" />
        <div className="arch-cloud-puff puff-7" />
      </div>

      {/* Layer 3: High-Altitude Atmospheric Drifting Stratus */}
      <div className="arch-cloud-layer layer-3">
        <div className="arch-cloud-puff puff-8" />
        <div className="arch-cloud-puff puff-9" />
      </div>

      {/* Center Holographic Telemetry HUD during Flight */}
      <div className="arch-cloud-hud">
        <div className="arch-cloud-hud-title">APPROACHING SITE ELEVATION</div>
        <div className="arch-cloud-hud-sub">ATMOSPHERIC DESCENT IN PROGRESS · 1:200 SCALE</div>
        <div className="arch-cloud-hud-bar">
          <div className="arch-cloud-hud-progress" />
        </div>
      </div>
    </div>
  );
}
