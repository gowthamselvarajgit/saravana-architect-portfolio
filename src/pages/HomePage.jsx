import React, { useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ExperienceSection from '../sections/ExperienceSection';
import EducationSection from '../sections/EducationSection';
import SelectedProjectsSection from '../sections/SelectedProjectsSection';
import GallerySection from '../sections/GallerySection';
import AchievementsCertificationsSection from '../sections/AchievementsCertificationsSection';
import TechnologySection from '../sections/TechnologySection';
import AtlasSection from '../sections/AtlasSection';
import ArchiveSection from '../sections/ArchiveSection';
import ProcessCraftSection from '../sections/ProcessCraftSection';
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

        {/* Section 02: Architect Profile & Philosophy */}
        <AboutSection />

        {/* Section 03: Selected Architectural Projects & 3D Real Earth Globe (Immediately following About) */}
        <SelectedProjectsSection onNavigate={onNavigate} />

        {/* Section 04: Professional Practice & Internship Experience */}
        <ExperienceSection />

        {/* Section 05: Academic Degree & Pedagogy */}
        <EducationSection />

        {/* Section 06: Architectural Gallery (Curated Visual Corpus) */}
        <GallerySection />

        {/* Section 07: Competitions & Professional Certifications */}
        <AchievementsCertificationsSection />

        {/* Section 08: Technology, BIM & Computational Tooling */}
        <TechnologySection />

        {/* Section 09: Projects by Place / Geographic Atlas Slot */}
        <AtlasSection />

        {/* Section 10: Architectural Archive & Gated Professional Work */}
        <ArchiveSection />

        {/* Section 11: Process & Physical Modeling Craft */}
        <ProcessCraftSection />

        {/* Section 12: Dialogue & Contact Dispatch */}
        <ContactSection />
      </main>

      {/* Colophon Footer */}
      <Footer />
    </div>
  );
}
