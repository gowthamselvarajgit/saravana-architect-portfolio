/* ============================================================================
   ArchitectHero — High-Performance Dotted-Globe Hero Section with Atmospheric
   Descent, React Bits GooeyNav, Procedural Grain, and Kinetic Typographic Reveals.
   ========================================================================= */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Globe } from './globe/Globe.js';
import ArchitectLoader from './ArchitectLoader.jsx';
import { ARCHITECTURAL_HEADLINES, ARCHITECTURAL_TELEMETRY } from './globe/architecturalData.js';
import '../../styles/architect-hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectHero({ onNavigate }) {
  const canvasRef = useRef(null);
  const labelsRef = useRef(null);
  const tickerLineRef = useRef(null);
  const readoutLaneRef = useRef(null);
  const readoutModeRef = useRef(null);
  const readoutEtaRef = useRef(null);
  const readoutTeuRef = useRef(null);
  const dragHintRef = useRef(null);

  const globeRef = useRef(null);

  // 1. Procedural Film Grain
  const makeGrain = () => {
    const size = 180;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    document.documentElement.style.setProperty('--grain-url', `url(${c.toDataURL()})`);
  };

  // 2. News Ticker
  const startTicker = () => {
    const line = tickerLineRef.current;
    if (!line) return () => {};

    let i = 0;
    const paint = (n) => {
      const h = ARCHITECTURAL_HEADLINES[n];
      line.innerHTML = `<i>${h.tag}:</i> <b>${h.text}</b>`;
    };
    paint(0);

    let hovering = false;
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };
    line.addEventListener('pointerenter', onEnter);
    line.addEventListener('pointerleave', onLeave);

    const interval = setInterval(() => {
      if (hovering || document.hidden) return;
      i = (i + 1) % ARCHITECTURAL_HEADLINES.length;
      gsap.to(line, {
        y: '-110%',
        opacity: 0,
        duration: 0.42,
        ease: 'power3.in',
        onComplete: () => {
          paint(i);
          gsap.fromTo(line,
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.6, ease: 'expo.out' });
        },
      });
    }, 5200);

    return () => {
      line.removeEventListener('pointerenter', onEnter);
      line.removeEventListener('pointerleave', onLeave);
      clearInterval(interval);
    };
  };

  // 3. Telemetry Scramble
  const startTelemetry = () => {
    const lane = readoutLaneRef.current;
    const mode = readoutModeRef.current;
    const eta = readoutEtaRef.current;
    const teu = readoutTeuRef.current;
    if (!lane || !mode || !eta || !teu) return () => {};

    let i = 0;
    const scramble = (el, next) => {
      const pool = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ°[]·—';
      const total = 9;
      let frame = 0;

      const step = () => {
        const settled = Math.floor((frame / total) * next.length);
        let out = '';
        for (let c = 0; c < next.length; c++) {
          const ch = next[c];
          if (c < settled || ch === ' ' || ch === ',' || ch === '·' || ch === '[' || ch === ']') out += ch;
          else out += pool[(Math.random() * pool.length) | 0];
        }
        el.textContent = out;
        if (frame++ < total) requestAnimationFrame(step);
        else el.textContent = next;
      };
      step();
    };

    const interval = setInterval(() => {
      i = (i + 1) % ARCHITECTURAL_TELEMETRY.length;
      const d = ARCHITECTURAL_TELEMETRY[i];
      scramble(lane, d.lane);
      scramble(mode, d.mode);
      scramble(eta, d.eta);
      scramble(teu, d.teu);
    }, 4400);

    return () => clearInterval(interval);
  };

  // 4. Staged Hero Intro
  const playIntro = (globe) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { p: 0 };
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    if (reduced) {
      if (globe) globe.setIntro(1);
      gsap.set('.mask__i', { y: '0%' });
      gsap.set('[data-intro], .nav, .hero__actions, #readout', { opacity: 1 });
      if (dragHintRef.current) dragHintRef.current.style.opacity = '1';
      return tl;
    }

    if (globe) {
      tl.to(state, {
        p: 1,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => globe.setIntro(state.p),
      }, 0);
    }

    tl.to('.rail', { opacity: 1, duration: 1.0 }, 0.1);

    tl.to('.hero__eyebrow .mask__i', { y: '0%', duration: 1.05 }, 0.4);

    tl.to('.hero__title .mask__i',
      { y: '0%', duration: 1.25, stagger: 0.085 }, 0.55);

    tl.to('.hero__lede .mask__i',
      { y: '0%', duration: 1.0, stagger: 0.055 }, 0.85);

    tl.fromTo('.hero__actions',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.0 }, 1.05);

    tl.fromTo('#readout',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.1 }, 1.25);

    tl.to('.scrollcue', { opacity: 1, duration: 0.9 }, 1.45);
    tl.to('#dragHint', { opacity: 1, duration: 0.9 }, 1.7);

    return tl;
  };

  // 5. Scroll-Driven Atmospheric Descent
  const initScroll = (globe) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis = null;
    if (!reduced) {
      lenis = new Lenis({
        duration: 0.75,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const heroCopy = document.querySelector('#heroCopy');
    const sky = document.querySelector('#descentSky');
    const white = document.querySelector('#descentWhite');
    const warm = document.querySelector('#bloomWarm');
    const cool = document.querySelector('#bloomCool');
    const cue = document.querySelector('.scrollcue');
    const readout = document.querySelector('#readout');
    const drag = document.querySelector('#dragHint');
    const rail = document.querySelector('.rail');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? true : 0.6,
      },
    });

    // Hero elements fade and clear out
    tl.to(heroCopy, { y: -90, opacity: 0, ease: 'none', duration: 0.32 }, 0)
      .to([cue, drag], { opacity: 0, ease: 'none', duration: 0.14 }, 0)
      .to(readout, { opacity: 0, y: 16, ease: 'none', duration: 0.18 }, 0.02)
      .to(rail, { opacity: 0, y: -16, ease: 'none', duration: 0.24 }, 0.04);

    // Camera dives into limb
    tl.to(globe, {
      dive: 1,
      ease: 'none',
      duration: 0.92,
      onUpdate: () => {
        globe.setDive(globe.dive);
        globe.update();
      },
    }, 0.05);

    // DOM bloom swells then blows out
    tl.to(warm, { opacity: 1.35, scale: 1.5, ease: 'none', duration: 0.5 }, 0.05)
      .to(warm, { opacity: 0, ease: 'none', duration: 0.26 }, 0.64)
      .to(cool, { opacity: 1.5, scale: 1.9, ease: 'none', duration: 0.62 }, 0.05)
      .to(cool, { opacity: 0, ease: 'none', duration: 0.18 }, 0.8);

    // Atmosphere floods the frame
    tl.fromTo(sky,
      { opacity: 0, scale: 1.3 },
      { opacity: 1, scale: 1, ease: 'none', duration: 0.34 }, 0.62);

    // Transition to white paper section below
    tl.to(white, { opacity: 1, ease: 'none', duration: 0.1 }, 0.92);

    ScrollTrigger.refresh();

    return {
      lenis,
      destroy: () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        lenis?.destroy();
      },
    };
  };

  const loaderCompletedRef = useRef(false);

  // Mount Effect
  useEffect(() => {
    makeGrain();

    const canvas = canvasRef.current;
    const labels = labelsRef.current;
    if (!canvas || !labels) return;

    const globe = new Globe(canvas, labels);
    globeRef.current = globe;

    // 1. Immediately initialize the scroll-driven atmospheric descent so ScrollTrigger is ALWAYS active!
    let scrollClean = null;
    try {
      scrollClean = initScroll(globe);
    } catch (e) {
      console.warn('Scroll init warning:', e);
    }

    // Bind drag hint dismissal on user orbit
    globe.onDragged = () => {
      if (dragHintRef.current) {
        gsap.to(dragHintRef.current, { opacity: 0, duration: 0.5, overwrite: true });
      }
      globe.onDragged = null;
    };

    const hasSeenLoader = typeof window !== 'undefined' && sessionStorage.getItem('saravana_loader_seen');

    if (hasSeenLoader || loaderCompletedRef.current) {
      document.body.classList.remove('is-locked');
      globe.setIntro(1);
      gsap.set('.mask__i', { y: '0%' });
      gsap.set('[data-intro], .rail, .hero__actions, #readout, .scrollcue, #dragHint', { opacity: 1, y: 0 });
    } else {
      document.body.classList.add('is-locked');
      globe.setIntro(0);
    }

    let rafId = 0;
    let isVisible = true;
    const loop = () => {
      if (isVisible) {
        globe.update();
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const heroEl = document.getElementById('hero');
    let observer = null;
    if (heroEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { rootMargin: '300px 0px 300px 0px', threshold: 0 }
      );
      observer.observe(heroEl);
    }

    const cleanTicker = startTicker();
    const cleanTelemetry = startTelemetry();

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      cleanTicker();
      cleanTelemetry();
      scrollClean?.destroy();
      globe.dispose();
      globeRef.current = null;
      document.body.classList.remove('is-locked');
    };
  }, []);

  // Handler when loader completes
  const handleLoaderComplete = useCallback(() => {
    document.body.classList.remove('is-locked');
    loaderCompletedRef.current = true;
    const globe = globeRef.current;

    if (globe) {
      playIntro(globe);
      globe.setIntro(1);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        window.dispatchEvent(new Event('resize'));
        ScrollTrigger.refresh();
      });
    }
  }, []);

  // Handle navigation
  const handleNavClick = (e, path, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="arch-hero-scope">
      {/* ────────────────── Three-Phase Architectural Preloader ────────────────── */}
      <ArchitectLoader onComplete={handleLoaderComplete} />

      {/* ────────────────── Hero Sticky Section ────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__sticky" id="heroSticky">

          {/* WebGL Canvas + Stars */}
          <canvas className="hero__canvas" id="globeCanvas" ref={canvasRef}></canvas>

          {/* Atmospheric DOM Bloom Layers */}
          <div className="hero__bloom hero__bloom--warm" id="bloomWarm" aria-hidden="true"></div>
          <div className="hero__bloom hero__bloom--cool" id="bloomCool" aria-hidden="true"></div>

          {/* Projected 3D Labels */}
          <div className="hero__labels" id="globeLabels" ref={labelsRef} aria-hidden="true"></div>

          {/* Scrim Vignette */}
          <div className="hero__scrim" aria-hidden="true"></div>

          {/* Film Grain */}
          <div className="grain" aria-hidden="true"></div>

          {/* ── Top Utility Rail ── */}
          <div className="rail" data-intro="rail">
            <div className="rail__ticker">
              <div className="ticker" id="ticker">
                <span className="ticker__line" id="tickerLine" ref={tickerLineRef}></span>
              </div>
            </div>
            <div className="rail__utils">
              <span className="rail__badge">MONOGRAPH 2026</span>
              <span className="rail__sep">/</span>
              <span className="rail__link" onClick={(e) => handleNavClick(e, '/atlas', 'atlas')}>Digital Atlas</span>
              <span className="rail__sep">/</span>
              <span className="rail__link" onClick={(e) => handleNavClick(e, '/contact', 'contact')}>Dispatch</span>
            </div>
          </div>

          {/* ── Hero Copy (Personal, High-Engagement Architectural Lockup) ── */}
          <div className="hero__copy" id="heroCopy">
            <p className="hero__eyebrow">
              <span className="mask"><span className="mask__i">Graduate Architect & Computational Designer</span></span>
            </p>

            <h1 className="hero__title">
              <span className="mask"><span className="mask__i">Hi, I am</span></span>
              <span className="mask"><span className="mask__i">Saravana Kumar.</span></span>
              <span className="mask"><span className="mask__i hero__title-accent">Architect.</span></span>
            </h1>

            <p className="hero__lede">
              <span className="mask"><span className="mask__i">I design climate-resilient buildings, parametric forms, and human-centered spaces — turning conceptual sketches into structural reality.</span></span>
            </p>

            <div className="hero__actions">
              <a className="btn btn--solid" href="#projects" onClick={(e) => handleNavClick(e, '/projects', 'projects')}>
                <span className="btn__label roll"><i>Explore Works</i><i aria-hidden="true">Explore Works</i></span>
              </a>
              <a className="btn btn--ghost" href="#contact" onClick={(e) => handleNavClick(e, '/contact', 'contact')}>
                <span className="btn__label roll"><i>Get In Touch</i><i aria-hidden="true">Get In Touch</i></span>
              </a>
              <a
                className="btn btn--social"
                href="https://www.linkedin.com/in/architect-saravanakumar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Saravana Kumar LinkedIn Profile"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ── Live Telemetry Readout (Active Dossier) ── */}
          <aside className="readout" id="readout" data-intro="readout" aria-hidden="true">
            <div className="readout__head">
              <i className="readout__pulse"></i><span>ACTIVE DOSSIER</span>
            </div>
            <div className="readout__body">
              <div className="readout__lane" id="readoutLane" ref={readoutLaneRef}>
                THS-02 · RIBBON OF LIFE
              </div>
              <div className="readout__rows">
                <div><span>TYPOLOGY</span><b id="readoutMode" ref={readoutModeRef}>BIOMIMETIC TOWER</b></div>
                <div><span>LOCATION</span><b id="readoutEta" ref={readoutEtaRef}>KERALA [08°31'N]</b></div>
                <div><span>SCALE</span><b id="readoutTeu" ref={readoutTeuRef}>42,000 M²</b></div>
              </div>
            </div>
          </aside>

          {/* ── Scroll Cue ── */}
          <div className="scrollcue" data-intro="cue" aria-hidden="true">
            <div className="scrollcue__pill"><i></i></div>
          </div>

          {/* ── Atmospheric Descent Overlay ── */}
          <div className="descent" id="descent" aria-hidden="true">
            <div className="descent__sky" id="descentSky"></div>
            <div className="descent__white" id="descentWhite"></div>
          </div>

          {/* ── Drag to Orbit Affordance ── */}
          <div className="draghint" id="dragHint" ref={dragHintRef} aria-hidden="true">
            DRAG TO ORBIT
          </div>

        </div>
      </section>

      {/* ────────────────── Landing Pad Transition ────────────────── */}
      <section className="landing-pad">
        <div className="landing-pad__inner">
          <p className="landing-pad__kicker">From conceptual rigor, spatial clarity emerges</p>
          <h2 className="landing-pad__title">
            <span>We shape architecture.</span>
            <em>We honor the place.</em>
          </h2>
          <div className="landing-pad__stats">
            <div>
              <b>05</b>
              <span>Core Selected Works</span>
            </div>
            <div>
              <b>120H</b>
              <span>International Design Challenge</span>
            </div>
            <div>
              <b>100%</b>
              <span>Authentic Linework & Physical Maquettes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
