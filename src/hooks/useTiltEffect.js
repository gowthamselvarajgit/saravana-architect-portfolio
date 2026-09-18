import { useEffect } from 'react';

/**
 * useTiltEffect
 * Adds 3D cursor-tracking tilt and dynamic specular glare to card elements.
 * Adapted from digital-persona's interactive 3D UI card mechanics.
 */
export function useTiltEffect(ref, options = {}) {
  const { maxTilt = 8, scale = 1.02, speed = 400 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      // Update specular glare CSS variables
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
        el.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '1');
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.setProperty('--glare-opacity', '0');

      setTimeout(() => {
        if (el) el.style.transition = '';
      }, speed);
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 80ms ease-out';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [ref, maxTilt, scale, speed]);
}
