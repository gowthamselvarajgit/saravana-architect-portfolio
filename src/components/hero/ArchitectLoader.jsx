/* ============================================================================
   ArchitectLoader — Three-phase architectural preloader sequence.
   1. Network manifest: wordmark, geographic/disciplinary roulettes, dotted map,
      real asset readiness counter
   2. Centring: wordmark translates to dead centre inside 4 hairline rings
   3. Wipe: circular hole wipes open onto the 3D globe hero
   ========================================================================= */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getLandMask } from './globe/landMask.js';
import { LOADER_LOCATIONS, LOADER_DISCIPLINES, ARCH_NODES } from './globe/architecturalData.js';

const LAT_TOP = 84;
const LAT_BOT = -58;
const DOT_PITCH = 3.55;

function buildTrack(host, items) {
  if (!host) return { el: host, rows: items.length, rowPx: 22 };
  const html = [...items, ...items, ...items]
    .map((t) => `<div class="loader__item">${t}</div>`)
    .join('');
  host.innerHTML = html;
  return {
    el: host,
    rows: items.length,
    rowPx: 22,
  };
}

function runTrack(track, { direction = -1, secondsPerRow = 0.45 } = {}) {
  if (!track || !track.el) return { kill: () => {} };
  const span = track.rows * track.rowPx;
  const from = direction < 0 ? 0 : -span;
  const to = direction < 0 ? -span : 0;

  gsap.set(track.el, { y: from });
  return gsap.to(track.el, {
    y: to,
    duration: track.rows * secondsPerRow,
    ease: 'none',
    repeat: -1,
    onRepeat: () => gsap.set(track.el, { y: from }),
  });
}

function pulseRows(host, period = 640) {
  if (!host) return 0;
  const rows = [...host.children];
  let i = 0;
  return setInterval(() => {
    rows.forEach((r) => r.classList.remove('is-hot'));
    const a = rows[i % rows.length];
    if (a) a.classList.add('is-hot');
    i += 1 + ((Math.random() * 2) | 0);
  }, period);
}

function drawMap(canvas, mask, t, activeIds) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;

  if (canvas.width !== Math.round(w * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }

  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const cols = Math.max(40, Math.round(w / DOT_PITCH));
  const rows = Math.max(20, Math.round(h / DOT_PITCH));
  const size = Math.max(1, DOT_PITCH * 0.42);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  for (let r = 0; r < rows; r++) {
    const lat = LAT_TOP - ((r + 0.5) / rows) * (LAT_TOP - LAT_BOT);
    const y = ((r + 0.5) / rows) * h;
    for (let c = 0; c < cols; c++) {
      const lon = -180 + ((c + 0.5) / cols) * 360;
      if (!mask.isLand(lon, lat)) continue;
      ctx.fillRect(((c + 0.5) / cols) * w - size / 2, y - size / 2, size, size);
    }
  }

  const project = (lat, lon) => [
    ((lon + 180) / 360) * w,
    ((LAT_TOP - lat) / (LAT_TOP - LAT_BOT)) * h,
  ];

  for (const n of ARCH_NODES) {
    const [x, y] = project(n.lat, n.lon);
    const active = activeIds.has(n.id);

    if (active) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 4.4 + n.lat);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 85, 0, ${0.2 + 0.3 * pulse})`;
      ctx.arc(x, y, 4.8 + pulse * 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#ff5500';
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default function ArchitectLoader({ readyPromise, onComplete }) {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const pctRef = useRef(null);
  const stageRef = useRef(null);
  const mapRef = useRef(null);
  const locRef = useRef(null);
  const discRef = useRef(null);
  const ringsRef = useRef(null);
  const wipeRef = useRef(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const readyPromiseRef = useRef(readyPromise);
  readyPromiseRef.current = readyPromise;

  useEffect(() => {
    const root = rootRef.current;
    const mark = markRef.current;
    const pctEl = pctRef.current;
    const stage = stageRef.current;
    const mapEl = mapRef.current;
    const rings = ringsRef.current ? [...ringsRef.current.querySelectorAll('i')] : [];
    const wipes = wipeRef.current ? [...wipeRef.current.querySelectorAll('i')] : [];

    if (!root || !mark || !pctEl || !stage || !mapEl) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const locTrack = buildTrack(locRef.current, LOADER_LOCATIONS);
    const discTrack = buildTrack(discRef.current, LOADER_DISCIPLINES);

    const spins = [
      runTrack(locTrack, { direction: -1, secondsPerRow: 0.45 }),
      runTrack(discTrack, { direction: 1, secondsPerRow: 0.55 }),
    ];
    const pulses = [pulseRows(locTrack.el, 640), pulseRows(discTrack.el, 820)];

    let mapRaf = 0;
    let mask = null;
    const activeIds = new Set();
    const rotateActive = setInterval(() => {
      activeIds.clear();
      for (let i = 0; i < 4; i++) {
        activeIds.add(ARCH_NODES[(Math.random() * ARCH_NODES.length) | 0].id);
      }
    }, 1150);

    getLandMask().then((m) => {
      mask = m;
      const t0 = performance.now();
      const tick = () => {
        if (!mapEl) return;
        drawMap(mapEl, mask, (performance.now() - t0) / 1000, activeIds);
        mapRaf = requestAnimationFrame(tick);
      };
      tick();
    });

    const hasSeenLoader = typeof window !== 'undefined' && sessionStorage.getItem('saravana_loader_seen');
    if (hasSeenLoader) {
      root.classList.add('is-gone');
      stage.style.display = 'none';
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const MIN_PHASE_1 = 380;
    const startedAt = performance.now();

    let assetsDone = false;
    const ready = readyPromiseRef.current || Promise.resolve();
    const fontReady = document.fonts ? document.fonts.ready : Promise.resolve();
    // Guarantee asset completion within 300ms
    const assetTimeout = new Promise((r) => setTimeout(r, 300));
    Promise.race([Promise.all([ready, fontReady]), assetTimeout])
      .then(() => { assetsDone = true; })
      .catch(() => { assetsDone = true; });

    let isUnmounted = false;

    const runSequence = async () => {
      await new Promise((resolve) => {
        let shown = 0;
        let target = 0;
        let lastTime = performance.now();

        const tick = () => {
          if (isUnmounted) return;
          const now = performance.now();
          const elapsed = now - startedAt;
          const dt = Math.min((now - lastTime) / 1000, 0.1);
          lastTime = now;

          const floor = Math.min(100, (elapsed / MIN_PHASE_1) * 100);
          const cap = assetsDone ? 100 : 94;
          target = Math.min(cap, Math.max(target + 80 * dt, floor));
          shown += (target - shown) * Math.min(1, 24 * dt);

          if (pctEl) {
            pctEl.textContent = String(Math.min(100, Math.round(shown))).padStart(2, '0');
          }

          if (elapsed >= MIN_PHASE_1 && (shown >= 98.5 || elapsed >= MIN_PHASE_1 + 250)) {
            if (pctEl) pctEl.textContent = '100';
            resolve();
            return;
          }
          requestAnimationFrame(tick);
        };
        tick();
      });

      const stop = () => {
        spins.forEach((s) => s.kill());
        pulses.forEach((p) => clearInterval(p));
        clearInterval(rotateActive);
        cancelAnimationFrame(mapRaf);
      };

      if (reduced) {
        stop();
        sessionStorage.setItem('saravana_loader_seen', '1');
        root.classList.add('is-gone');
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }

      /* Phase 2: Centring the wordmark inside hairline rings */
      const markRect = mark.getBoundingClientRect();
      const dx = window.innerWidth / 2 - (markRect.left + markRect.width / 2);
      const dy = window.innerHeight / 2 - (markRect.top + markRect.height / 2);

      const tl = gsap.timeline();

      const bodyEl = stage.querySelector('.loader__body');
      tl.to([bodyEl, mapEl, pctEl.parentElement], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: stop,
      }, 0.05);

      tl.to(mark, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'expo.inOut',
      }, 0.1);

      tl.to(rings, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'expo.out',
        stagger: 0.03,
      }, 0.18);

      /* Phase 3: Circular wipe opening onto the hero */
      const hole = { v: 0 };
      tl.to(hole, {
        v: 80,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => root.style.setProperty('--hole', `${hole.v}%`),
      }, 0.45);

      tl.to(mark, { opacity: 0, duration: 0.18, ease: 'power2.in' }, 0.5);
      tl.to(rings, { opacity: 0, duration: 0.22, ease: 'power2.in', stagger: 0.02 }, 0.52);

      const span = Math.hypot(window.innerWidth, window.innerHeight) * 1.25;
      wipes.forEach((el, i) => {
        tl.fromTo(el,
          { opacity: 0.7, width: 2, height: 2 },
          {
            opacity: 0,
            width: span,
            height: span,
            duration: 0.48,
            ease: 'power2.out',
          }, 0.46 + i * 0.05);
      });

      await tl.then();
      sessionStorage.setItem('saravana_loader_seen', '1');
      root.classList.add('is-gone');
      stage.style.display = 'none';
      if (onCompleteRef.current) onCompleteRef.current();
    };

    runSequence();

    return () => {
      isUnmounted = true;
      spins.forEach((s) => s.kill());
      pulses.forEach((p) => clearInterval(p));
      clearInterval(rotateActive);
      cancelAnimationFrame(mapRaf);
    };
  }, []);

  return (
    <div className="loader" id="loader" ref={rootRef} aria-hidden="true">
      {/* Phase 1: Network Manifest */}
      <div className="loader__stage" id="loaderStage" ref={stageRef}>
        <div className="loader__head">
          <div className="loader__mark" id="loaderMark" ref={markRef}>
            SARAVANAKUMAR<span>ARCHITECTURAL PRACTICE</span>
          </div>
          <div className="loader__pct">
            <span id="loaderPct" ref={pctRef}>00</span>
            <i className="loader__spin" aria-hidden="true"></i>
          </div>
        </div>

        <div className="loader__body">
          <div className="loader__col loader__col--l">
            <div className="loader__track" id="loaderLocations" ref={locRef}></div>
          </div>
          <div className="loader__col loader__col--r">
            <div className="loader__track" id="loaderDisciplines" ref={discRef}></div>
          </div>
        </div>

        <canvas className="loader__map" id="loaderMap" ref={mapRef}></canvas>
      </div>

      {/* Phase 2: Concentric rings */}
      <div className="loader__rings" id="loaderRings" ref={ringsRef} aria-hidden="true">
        <i style={{ '--d': '50vh' }}></i>
        <i style={{ '--d': '75vh' }}></i>
        <i style={{ '--d': '100vh' }}></i>
        <i style={{ '--d': '125vh' }}></i>
      </div>

      {/* Phase 3: Hairlines leading circular wipe */}
      <div className="loader__wipe" id="loaderWipe" ref={wipeRef} aria-hidden="true">
        <i></i>
        <i></i>
      </div>
    </div>
  );
}
