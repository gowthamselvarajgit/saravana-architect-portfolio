import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/pageTransition.css';

/**
 * PageTransition — Spatial Architectural Sheet Transition
 *
 * Sequence:
 * Sheet slides down across the viewport with a glowing crimson drafting laser rule
 * and hairline CAD grid, swaps space underneath, and sweeps out into the new view.
 * Duration: ~650ms total.
 */
export default function PageTransition({ triggerKey, children }) {
  const sheetRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const sheet = sheetRef.current;
    const content = contentWrapperRef.current;
    if (!sheet) return;

    const tl = gsap.timeline({
      onStart: () => {
        if (sheet) sheet.style.visibility = 'visible';
      },
      onComplete: () => {
        if (sheet) sheet.style.visibility = 'hidden';
      }
    });

    // Outgoing scale & sheet entrance
    tl.to(content, { scale: 0.985, opacity: 0.85, duration: 0.22, ease: 'power2.in' })
      .fromTo(sheet, 
        { yPercent: -100 }, 
        { yPercent: 0, duration: 0.32, ease: 'power3.inOut' }, 
        '-=0.15'
      )
      .set(content, { scale: 1, opacity: 1 })
      .to(sheet, {
        yPercent: 100,
        duration: 0.36,
        ease: 'power3.inOut',
        delay: 0.04,
      });

    return () => {
      tl.kill();
      if (sheet) sheet.style.visibility = 'hidden';
    };
  }, [triggerKey]);

  return (
    <>
      <div className="arch-transition-stage" aria-hidden="true">
        <div ref={sheetRef} className="arch-transition-sheet">
          <div className="arch-transition-grid" />
          <div className="arch-transition-rule" />
          <div className="arch-transition-meta">
            <span>[ SHEET TRANSITION // 01 ]</span>
            <span>ARCHITECTURE SHAPED BY PLACE</span>
          </div>
          <div className="arch-transition-meta" style={{ justifyContent: 'center' }}>
            <span className="arch-transition-target">SARAVANAKUMAR K · SPATIAL MONOGRAPH</span>
          </div>
          <div className="arch-transition-meta">
            <span>PLAN · STRUCTURE · SPACE</span>
            <span>INDIA</span>
          </div>
        </div>
      </div>
      <div ref={contentWrapperRef} style={{ width: '100%', minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
}
