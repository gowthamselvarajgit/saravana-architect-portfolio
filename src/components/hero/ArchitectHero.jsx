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
import ArchitectCharacterScene from '../character/ArchitectCharacterScene';
import WebGLErrorBoundary from '../WebGLErrorBoundary';
import { ARCHITECTURAL_HEADLINES, ARCHITECTURAL_TELEMETRY } from './globe/architecturalData.js';
import '../../styles/architect-hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function ArchitectHero({ onNavigate }) {
  const canvasMountRef = useRef(null);
  const labelsRef = useRef(null);
  const tickerLineRef = useRef(null);
  const readoutLaneRef = useRef(null);
  const readoutModeRef = useRef(null);
  const readoutEtaRef = useRef(null);
  const readoutTeuRef = useRef(null);
  const dragHintRef = useRef(null);

  const globeRef = useRef(null);
  const landingPadRef = useRef(null);
  const avatarStageRef = useRef(null);
  const hasTriggeredGreetRef = useRef(false);
  const lastTriggerTimeRef = useRef(0);
  const [characterGesture, setCharacterGesture] = useState(null);
  const [isGreetingActive, setIsGreetingActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isLandingPadInView, setIsLandingPadInView] = useState(false);

  const handleModelLoaded = useCallback(() => {
    setIsModelReady(true);
  }, []);

  // Lazy-mount 3D Character Avatar ONLY when user scrolls near the landing-pad
  // This guarantees that on initial page load, ONLY the Hero Globe occupies a WebGL context!
  useEffect(() => {
    const pad = landingPadRef.current;
    if (!pad || !('IntersectionObserver' in window)) {
      setIsLandingPadInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLandingPadInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px 120px 0px', threshold: 0.02 }
    );
    observer.observe(pad);
    return () => observer.disconnect();
  }, []);

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

    const mount = canvasMountRef.current;
    const labels = labelsRef.current;
    if (!mount || !labels) return;

    // Remove any stale canvas in mount to ensure a clean WebGL context on every mount
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'hero__canvas';
    canvas.id = 'globeCanvas';
    mount.appendChild(canvas);

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
      if (mount && mount.contains(canvas)) {
        mount.removeChild(canvas);
      }
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

  // Calculate precise scrolling length (in pixels from page top) to frame the 3D Architect
  const getAvatarScrollMetrics = useCallback(() => {
    const el = avatarStageRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const absoluteTop = rect.top + currentScroll;

    // Ideal vertical focal point: 3D character's upper torso / face at ~46% of viewport height
    const viewportTargetY = window.innerHeight * 0.46;
    const modelFocalOffsetY = el.offsetHeight * 0.35;
    const targetScrollLength = Math.max(0, Math.round(absoluteTop + modelFocalOffsetY - viewportTargetY));

    return {
      currentScroll: Math.round(currentScroll),
      targetScrollLength,
      absoluteTop: Math.round(absoluteTop),
      viewportHeight: window.innerHeight,
      stageHeight: el.offsetHeight,
      // Effective activation zone around the calculated target scroll length
      triggerStart: Math.max(0, targetScrollLength - 90),
      triggerEnd: targetScrollLength + 320,
    };
  }, []);

  // Trigger avatar waving hand gesture and display greeting callout
  const executeGreeting = useCallback((source = 'scroll') => {
    const now = Date.now();
    // Debounce to prevent jitter (minimum 3 seconds between triggers)
    if (now - lastTriggerTimeRef.current < 3000) return;
    lastTriggerTimeRef.current = now;
    hasTriggeredGreetRef.current = true;

    // 1. Dispatch waving hand animation to 3D architect humanoid model
    setCharacterGesture({ action: 'wave', id: now });

    // 2. Open architectural greeting callout
    setIsGreetingActive(true);
  }, []);

  // Manual wave handler from greeting bubble button
  const handleManualWave = useCallback(() => {
    const now = Date.now();
    lastTriggerTimeRef.current = now;
    setCharacterGesture({ action: 'wave', id: now });
    setIsGreetingActive(true);
  }, []);

  // Audio voice greeting via Web Speech API
  const handleSpeakGreeting = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = "Hello and welcome! I am Saravanakumar, Graduate Architect and BIM Specialist. Step into my architectural monograph below.";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium')) && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  useEffect(() => {
    const stage = avatarStageRef.current;
    if (!stage) return;

    let updateRaf = null;

    // Real-time calculation on scroll to measure scroll length vs target
    const handleScroll = () => {
      if (updateRaf) cancelAnimationFrame(updateRaf);
      updateRaf = requestAnimationFrame(() => {
        const metrics = getAvatarScrollMetrics();
        if (!metrics) return;

        const isAligned = metrics.currentScroll >= metrics.triggerStart && metrics.currentScroll <= metrics.triggerEnd;

        // If user scrolls within the calculated target length corridor, trigger waving hand and greeting!
        if (isAligned && !hasTriggeredGreetRef.current) {
          executeGreeting('scroll_length_calculated');
        }

        // Reset trigger flag when user scrolls far away (> 450px above or below) so they can re-trigger on return
        if (Math.abs(metrics.currentScroll - metrics.targetScrollLength) > 450) {
          hasTriggeredGreetRef.current = false;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial metrics calculation
    handleScroll();

    // GSAP ScrollTrigger bound directly to the avatar stage for hardware-accelerated precision
    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top 60%',
      end: 'bottom 20%',
      onEnter: () => {
        executeGreeting('scroll_trigger_down');
      },
      onEnterBack: () => {
        executeGreeting('scroll_trigger_up');
      },
      onLeaveBack: () => {
        // Dismiss greeting when scrolling back up into hero
        setIsGreetingActive(false);
      },
    });

    return () => {
      if (updateRaf) cancelAnimationFrame(updateRaf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      st.kill();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [executeGreeting, getAvatarScrollMetrics]);

  // Handle navigation
  const handleNavClick = (e, path, targetId) => {
    e.preventDefault();

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

          {/* WebGL Canvas Mount + Stars */}
          <div className="hero__canvas-mount" id="globeCanvasMount" ref={canvasMountRef}></div>

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
      <section className="landing-pad" ref={landingPadRef}>
        <div className="landing-pad__inner">
          {/* 3D Architect Digital Twin Stage with Precision Calculated Greeting */}
          <div className="landing-pad__stage" ref={avatarStageRef}>

            <div className="landing-pad__stage-grid">
              {/* 3D Architect Digital Twin Center Stage */}
              <div className="landing-pad__model-center">
                <WebGLErrorBoundary>
                  {isLandingPadInView ? (
                    <ArchitectCharacterScene
                      showCard={false}
                      showActions={true}
                      triggerGesture={characterGesture}
                      onLoaded={handleModelLoaded}
                    />
                  ) : (
                    <div className="arch-char-scene-root is-frameless" style={{ minHeight: '580px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="arch-char-skeleton">
                        <div className="arch-char-spin" />
                        <span>INITIALIZING 3D PHOTOREAL ARCHITECT...</span>
                      </div>
                    </div>
                  )}
                </WebGLErrorBoundary>
              </div>

              {/* Synchronous Architectural Greeting Callout Card */}
              <aside
                className={`arch-greeting-bubble ${isGreetingActive ? 'is-active' : ''}`}
                role="region"
                aria-label="Saravanakumar Architectural Greeting"
              >
                <div className="arch-greeting-inner">
                  {/* Header Strip */}
                  <div className="arch-greeting-header">
                    <div className="arch-greeting-pulse-tag">
                      <span className="arch-greeting-beacon" />
                      <span>SARAVANAKUMAR K · DIGITAL TWIN</span>
                    </div>
                    <div className="arch-greeting-header-tools">
                      <button
                        type="button"
                        className={`arch-greeting-audio-btn ${isSpeaking ? 'is-speaking' : ''}`}
                        onClick={handleSpeakGreeting}
                        title={isSpeaking ? "Stop voice greeting" : "Listen to voice greeting"}
                        aria-label="Voice greeting toggle"
                      >
                        {isSpeaking ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19h4l5 5V0L10 5H6v14zm13.5-7c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        )}
                        <span>{isSpeaking ? 'Speaking...' : 'Voice'}</span>
                      </button>
                      <button
                        type="button"
                        className="arch-greeting-close-btn"
                        onClick={() => setIsGreetingActive(false)}
                        aria-label="Close greeting"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="arch-greeting-content">
                    <div className="arch-greeting-salutation">
                      <span className="arch-greeting-wave-icon">👋</span>
                      <h3>Hello &amp; Welcome!</h3>
                    </div>
                    <p className="arch-greeting-lead">
                      I am <strong>Saravanakumar</strong> — Graduate Architect &amp; Computational Designer.
                    </p>
                    <p className="arch-greeting-sub">
                      Bridging contextual topography, parametric form-finding, and ecological reality. Scroll down to explore live high-rises and thesis works.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="arch-greeting-actions">
                    <button
                      type="button"
                      className="arch-greeting-chip-btn arch-greeting-chip--wave"
                      onClick={handleManualWave}
                    >
                      <span>👋 Wave Again</span>
                    </button>
                    <a
                      href="#projects"
                      className="arch-greeting-chip-btn arch-greeting-chip--explore"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span>Selected Works ↓</span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>

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
