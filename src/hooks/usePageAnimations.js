/**
 * usePageAnimations — Enhanced GSAP Animations for Step 3C
 * "Architecture should feel like it is being revealed, not decorated."
 *
 * Implements:
 * - Opening Statement: controlled typographic reveal
 * - Navigation: subtle initial appearance
 * - Hero: heading + frame staggered reveal with clearProps: 'transform'
 * - Section headings: ScrollTrigger viewport reveal
 * - Project cards: progressive viewport reveal with clearProps: 'transform' to avoid 3D tilt conflicts
 * - Archive & Process: subtle stagger reveals
 *
 * Respects prefers-reduced-motion via gsap.matchMedia().
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE_GSAP = 'power2.out';

export function usePageAnimations(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            // Reduced motion: immediately make everything visible, no movement
            gsap.set(
              [
                '[data-anim="nav"]',
                '[data-anim="opening-eyebrow"]',
                '[data-anim="opening-title"]',
                '[data-anim="opening-body"]',
                '[data-anim="opening-panel"]',
                '[data-anim="hero-bar"]',
                '[data-anim="hero-frame"]',
                '[data-anim="hero-sub"]',
                '[data-anim="section-header"]',
                '[data-anim="project-card"]',
                '[data-anim="archive-content"]',
                '[data-anim="process-card"]',
                '[data-anim="about-content"]',
                '[data-anim="contact-content"]',
              ],
              { opacity: 1, y: 0, clearProps: 'all' }
            );
            return;
          }

          // =================================================================
          // 1. NAVIGATION — subtle initial appearance
          // =================================================================
          gsap.from('[data-anim="nav"]', {
            autoAlpha: 0,
            y: -16,
            duration: 0.7,
            ease: EASE_GSAP,
            delay: 0.1,
            clearProps: 'transform',
          });

          // =================================================================
          // 2. OPENING STATEMENT — controlled typographic reveal (if present)
          // =================================================================
          if (container.querySelector('[data-anim="opening-title"]')) {
            const openingTl = gsap.timeline({ delay: 0.3 });

            openingTl
              .from('[data-anim="opening-eyebrow"]', {
                autoAlpha: 0,
                y: 10,
                duration: 0.5,
                ease: EASE_GSAP,
                clearProps: 'transform',
              })
              .from(
                '[data-anim="opening-title"]',
                {
                  autoAlpha: 0,
                  y: 18,
                  duration: 0.8,
                  ease: EASE_GSAP,
                  clearProps: 'transform',
                },
                '-=0.25'
              )
              .from(
                '[data-anim="opening-body"]',
                {
                  autoAlpha: 0,
                  y: 12,
                  duration: 0.65,
                  ease: EASE_GSAP,
                  clearProps: 'transform',
                },
                '-=0.3'
              )
              .from(
                '[data-anim="opening-panel"]',
                {
                  autoAlpha: 0,
                  y: 8,
                  duration: 0.55,
                  ease: EASE_GSAP,
                  stagger: 0.1,
                  clearProps: 'transform',
                },
                '-=0.2'
              );
          }

          // =================================================================
          // 3. HERO — heading, frame reveal, then narrative sub-bar
          // =================================================================
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: '[data-anim="hero-bar"]',
              start: 'top 88%',
              once: true,
            },
          });

          heroTl
            .from('[data-anim="hero-bar"]', {
              autoAlpha: 0,
              y: 12,
              duration: 0.55,
              ease: EASE_GSAP,
              clearProps: 'transform',
            })
            .from(
              '[data-anim="hero-frame"]',
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.9,
                ease: EASE_GSAP,
                clearProps: 'transform',
              },
              '-=0.2'
            )
            .from(
              '[data-anim="hero-sub"]',
              {
                autoAlpha: 0,
                y: 10,
                duration: 0.5,
                ease: EASE_GSAP,
                stagger: 0.08,
                clearProps: 'transform',
              },
              '-=0.35'
            );

          // =================================================================
          // 4. SECTION HEADERS — subtle ScrollTrigger reveal
          // =================================================================
          gsap.utils.toArray('[data-anim="section-header"]').forEach((el) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 16,
              duration: 0.65,
              ease: EASE_GSAP,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            });
          });

          // =================================================================
          // 5. PROJECT CARDS — progressive reveal, clears transform for 3D tilt
          // =================================================================
          gsap.utils.toArray('[data-anim="project-card"]').forEach((el, i) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 24,
              duration: 0.7,
              ease: EASE_GSAP,
              delay: i * 0.06,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            });
          });

          // =================================================================
          // 6. ARCHIVE SECTION CONTENT
          // =================================================================
          gsap.utils.toArray('[data-anim="archive-content"]').forEach((el) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 16,
              duration: 0.65,
              ease: EASE_GSAP,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            });
          });

          // =================================================================
          // 7. PROCESS / CRAFT CARDS
          // =================================================================
          gsap.utils.toArray('[data-anim="process-card"]').forEach((el, i) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 18,
              duration: 0.6,
              ease: EASE_GSAP,
              delay: i * 0.08,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            });
          });

          // =================================================================
          // 8. ABOUT & CONTACT SECTIONS
          // =================================================================
          gsap.utils.toArray('[data-anim="about-content"], [data-anim="contact-content"]').forEach((el, i) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 14,
              duration: 0.6,
              ease: EASE_GSAP,
              delay: i * 0.1,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            });
          });
        }
      );

      return () => {
        mm.revert();
      };
    }, container);

    return () => ctx.revert();
  }, [containerRef]);
}
