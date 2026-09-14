import React, { useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import AtlasSection from '../sections/AtlasSection';
import SelectedProjectsSection from '../sections/SelectedProjectsSection';
import ArchiveSection from '../sections/ArchiveSection';
import ProcessCraftSection from '../sections/ProcessCraftSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import { usePageAnimations } from '../hooks/usePageAnimations';

export default function HomePage({ onNavigate, currentPath = '/' }) {
  const containerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // GSAP foundation animations scoped to container
  usePageAnimations(containerRef);

  return (
    /**
     * Root surface: light warm-paper editorial (default).
     * Dark mode: set via data-theme on <html> by useTheme().
     * theme-surface-root enables smooth transition between modes.
     */
    <div ref={containerRef} className="theme-surface-root" style={{ minHeight: '100vh' }}>
      {/* Editorial Header / Navigation */}
      <Navigation theme={theme} onToggleTheme={toggleTheme} onNavigate={onNavigate} currentPath={currentPath} />

      {/* Main Architectural Content Stream */}
      <main id="main-content">
        {/* Section 01: Heron AI-Inspired Architectural Hero Canvas */}
        <HeroSection onNavigate={onNavigate} />

        {/* Section 02: Projects by Place / Geographic Atlas Slot */}
        <AtlasSection />

        {/* Section 04: Selected Architectural Projects (5 Primary Works) */}
        <SelectedProjectsSection />

        {/* Section 05: Architectural Archive & Gated Professional Work */}
        <ArchiveSection />

        {/* Section 06: Process & Physical Modeling Craft */}
        <ProcessCraftSection />

        {/* Section 07: Architect Profile & Verified Credentials */}
        <AboutSection />

        {/* Section 08: Dialogue & Contact Dispatch */}
        <ContactSection />
      </main>

      {/* Colophon Footer */}
      <Footer />
    </div>
  );
}
