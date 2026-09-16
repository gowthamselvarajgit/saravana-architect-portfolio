import React, { useState, useEffect, useCallback } from 'react';
import { Container, SectionHeader } from '../components/ArchPrimitives';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    {
      id: 'mobius-hero',
      title: 'Möbius Pavilion — Tullinløkka Square',
      category: 'works',
      categoryLabel: 'Selected Works',
      src: '/assets/images/projects/mobius/mobius-hero.webp',
      caption: 'Continuous single-sided timber Möbius surface uniting public circulation and acoustic exhibition in Oslo.',
      aspect: 'landscape',
    },
    {
      id: 'cultural-oasis-model',
      title: 'Katra Contoured City Maquette',
      category: 'models',
      categoryLabel: 'Physical Models',
      src: '/assets/images/projects/cultural-oasis/cultural-oasis-model-01.webp',
      caption: 'Hand-cut layered contour study mapping steep Himalayan terrain and urban nodes.',
      aspect: 'landscape',
    },
    {
      id: 'cultural-oasis-hero',
      title: 'Cultural Oasis — Stepped Amphitheater',
      category: 'works',
      categoryLabel: 'Selected Works',
      src: '/assets/images/projects/cultural-oasis/cultural-oasis-hero.webp',
      caption: 'Civic water courts, colonnade heritage facades, and terraced bio-domes.',
      aspect: 'landscape',
    },
    {
      id: 'mobius-process',
      title: 'Möbius Algorithmic Morphogenesis',
      category: 'details',
      categoryLabel: 'Details & Diagrams',
      src: '/assets/images/projects/mobius/mobius-process-01.webp',
      caption: 'Grasshopper parametric progression and timber joinery fabrication details.',
      aspect: 'landscape',
    },
    {
      id: 'ribbon-hero',
      title: 'Ribbon of Life — Biomimetic Skyscraper',
      category: 'works',
      categoryLabel: 'Selected Works',
      src: '/assets/images/projects/ribbon-of-life/ribbon-hero.webp',
      caption: 'Techno-Park Phase IV continuous elevated pedestrian ribbon and twisted tower.',
      aspect: 'landscape',
    },
    {
      id: 'cultural-oasis-process',
      title: 'Kevin Lynch Cognitive Master Plan',
      category: 'details',
      categoryLabel: 'Details & Diagrams',
      src: '/assets/images/projects/cultural-oasis/cultural-oasis-process-01.webp',
      caption: 'Node, path, edge, landmark and district spatial structuring for pilgrimage transit.',
      aspect: 'landscape',
    },
    {
      id: 'eco-resort-hero',
      title: "Eco Resort — Nature's Nest",
      category: 'works',
      categoryLabel: 'Selected Works',
      src: '/assets/images/projects/eco-resort/eco-resort-hero.webp',
      caption: 'Sustainable container upcycling and stilt cottages on Western Ghats contour slopes.',
      aspect: 'landscape',
    },
    {
      id: 'flow-spire-hero',
      title: 'Flow Spire — Coastal Confluence Landmark',
      category: 'works',
      categoryLabel: 'Selected Works',
      src: '/assets/images/projects/flow-spire/flow-spire-hero.webp',
      caption: 'Aerodynamic rotated high-rise geometry mitigating coastal wind vectors in Thane.',
      aspect: 'landscape',
    },
    {
      id: 'mobius-detail-01',
      title: 'Möbius Rib & Acoustic Void',
      category: 'details',
      categoryLabel: 'Details & Diagrams',
      src: '/assets/images/projects/mobius/mobius-detail-01.webp',
      caption: 'Glulam structural ribs framing natural daylight into exhibition chamber.',
      aspect: 'landscape',
    },
    {
      id: 'cultural-oasis-detail-01',
      title: 'Terraced Bio-Dome Enclosure',
      category: 'details',
      categoryLabel: 'Details & Diagrams',
      src: '/assets/images/projects/cultural-oasis/cultural-oasis-detail-01.webp',
      caption: 'Crystalline diagrid glass greenhouse stepping along natural slope contours.',
      aspect: 'landscape',
    },
  ];

  const filteredItems = activeFilter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (!activeImage) return;
      if (e.key === 'Escape') setActiveImage(null);
      if (e.key === 'ArrowRight') {
        const idx = filteredItems.findIndex((item) => item.id === activeImage.id);
        const next = filteredItems[(idx + 1) % filteredItems.length];
        setActiveImage(next);
      }
      if (e.key === 'ArrowLeft') {
        const idx = filteredItems.findIndex((item) => item.id === activeImage.id);
        const prev = filteredItems[(idx - 1 + filteredItems.length) % filteredItems.length];
        setActiveImage(prev);
      }
    },
    [activeImage, filteredItems]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-4xl)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        <SectionHeader
          data-anim="section-header"
          index="SEC. 05 / GALLERY"
          eyebrow="CURATED VISUAL CORPUS"
          title="Architectural Gallery"
          subtitle="A visual repository of project renders, physical study maquettes, and technical details."
        />

        {/* Filter Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-xl)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--space-md)',
          }}
        >
          {[
            { id: 'all', label: 'ALL VISUALS (10)' },
            { id: 'works', label: 'SELECTED WORKS (5)' },
            { id: 'models', label: 'PHYSICAL CRAFT (1)' },
            { id: 'details', label: 'DETAILS & PROCESS (4)' },
          ].map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  background: isActive ? 'var(--color-text-primary)' : 'transparent',
                  color: isActive ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  padding: '0.45rem 0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-anim="project-card"
              onClick={() => setActiveImage(item)}
              style={{
                position: 'relative',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                overflow: 'hidden',
                cursor: 'pointer',
                group: 'card',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: '#0F0E0D',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 400, margin: '0 0 2px' }}>
                    {item.title}
                  </h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    {item.categoryLabel}
                  </span>
                </div>
                <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                  ENLARGE +
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 9, 6, 0.92)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'var(--space-xl)',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '32px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#F4F0E8',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              padding: '8px 16px',
              cursor: 'pointer',
              zIndex: 10001,
            }}
          >
            ESC ✕
          </button>

          {/* Inner Lightbox Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            />
            <div
              style={{
                marginTop: 'var(--space-md)',
                color: '#F4F0E8',
                textAlign: 'center',
                maxWidth: '680px',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, margin: '0 0 6px' }}>
                {activeImage.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-accent, #0066FF)', margin: '0 0 4px' }}>
                {activeImage.categoryLabel}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(244, 240, 232, 0.75)', margin: 0 }}>
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
