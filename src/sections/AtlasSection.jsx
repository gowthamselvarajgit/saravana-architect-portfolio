import React, { useState } from 'react';
import { Container, SectionHeader, ArrowLink } from '../components/ArchPrimitives';
import { PRIMARY_PROJECTS } from '../data/projectsData';

export default function AtlasSection() {
  const [selectedLocationId, setSelectedLocationId] = useState('oslo');

  const verifiedLocations = [
    {
      id: 'oslo',
      country: 'Norway',
      place: 'Oslo, Norway',
      region: 'Nordic Hemiboreal · 60°N',
      coordinates: '59°54\'57"N 10°44\'08"E',
      lat: 59.9158,
      lng: 10.7356,
      mapX: 48, // relative percentage on schematic map plane
      mapY: 22,
      projectId: 'mobius',
      projectTitle: 'On the path to Rediscovery (Möbius)',
      projectNumber: '01',
      thesis: 'Extinct language preservation through single-sided timber loop in Tullinløkka square.',
      heroImage: '/assets/images/projects/mobius/mobius-hero.webp',
      elevation: '23m ASL',
      climateZone: 'Dfb · Hemiboreal Humid Continental',
      tectonicResponse: 'Charred glulam ribs resisting snow load and marine frost',
    },
    {
      id: 'katra',
      country: 'India',
      place: 'Katra, Jammu & Kashmir',
      region: 'Sub-Himalayan Foothills · Trikuta Mountain',
      coordinates: '32°59\'31"N 74°56\'02"E',
      lat: 32.9930,
      lng: 74.9318,
      mapX: 68,
      mapY: 42,
      projectId: 'cultural-oasis',
      projectTitle: 'Cultural Oasis',
      projectNumber: '02',
      thesis: 'Climatic pilgrimage sanctuary, water amphitheater, and terraced bio-domes.',
      heroImage: '/assets/images/projects/cultural-oasis/cultural-oasis-hero.webp',
      elevation: '754m ASL',
      climateZone: 'Cwa · Subtropical Mountain Foothills',
      tectonicResponse: 'Stepped contour retaining gabions & passive thermal earth berming',
    },
    {
      id: 'trivandrum',
      country: 'India',
      place: 'Thiruvananthapuram, Kerala',
      region: 'Malabar Coast · Tropical Wet',
      coordinates: '08°31\'27"N 76°56\'12"E',
      lat: 8.5241,
      lng: 76.9366,
      mapX: 69,
      mapY: 78,
      projectId: 'ribbon-of-life',
      projectTitle: 'Ribbon of Life (Techno-Park)',
      projectNumber: '03',
      thesis: 'Continuous elevated pedestrian ribbon synthesizing work, living, and wellness.',
      heroImage: '/assets/images/projects/ribbon-of-life/ribbon-hero.webp',
      elevation: '18m ASL',
      climateZone: 'Am · Tropical Monsoon',
      tectonicResponse: 'Perforated terracotta brise-soleil & stack-effect open air skycourts',
    },
    {
      id: 'pune',
      country: 'India',
      place: 'Ghodegaon, Pune, Maharashtra',
      region: 'Western Ghats Foothills · Sloped Contour',
      coordinates: '18°31\'13"N 73°51\'24"E',
      lat: 18.5204,
      lng: 73.8567,
      mapX: 67,
      mapY: 62,
      projectId: 'eco-resort',
      projectTitle: "Eco Resort (Nature's Nest)",
      projectNumber: '04',
      thesis: 'Container upcycling and timber stilt architecture following cut-and-fill slopes.',
      heroImage: '/assets/images/projects/eco-resort/eco-resort-hero.webp',
      elevation: '640m ASL',
      climateZone: 'Aw · Tropical Wet & Dry',
      tectonicResponse: 'Cantilevered pin foundations minimizing grade soil disturbance',
    },
    {
      id: 'thane',
      country: 'India',
      place: 'Thane, Mumbai, Maharashtra',
      region: 'Coastal Confluence · Vasavi River & Creek',
      coordinates: '19°04\'34"N 72°52\'40"E',
      lat: 19.0760,
      lng: 72.8777,
      mapX: 66,
      mapY: 58,
      projectId: 'flow-spire',
      projectTitle: 'Flow Spire (Watchtower)',
      projectNumber: '05',
      thesis: 'Aerodynamic rotated geometry responding to coastal winds and tidal flow.',
      heroImage: '/assets/images/projects/flow-spire/flow-spire-hero.webp',
      elevation: '9m ASL',
      climateZone: 'Aw · Coastal Humid Macro-Climate',
      tectonicResponse: 'Vorticity-shedding helical profile reducing lateral wind shear',
    },
  ];

  const currentLocation = verifiedLocations.find((l) => l.id === selectedLocationId) || verifiedLocations[0];

  return (
    <section
      id="atlas"
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transition: 'background-color var(--transition-base) ease, color var(--transition-base) ease',
      }}
    >
      <Container>
        <SectionHeader
          data-anim="section-header"
          index="SEC. 02 / GEOGRAPHIC ATLAS"
          eyebrow="PROJECTS BY PLACE"
          title="Territorial Atlas & Coordinates"
          subtitle="Every project is an architectural response to geographic, climatic, and topological context. Explore each work indexed by its authentic coordinates."
        />

        {/* 12-Column Spatial Cartographic Stage */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
          className="globe-canvas-host"
        >
          {/* Blueprint Grid Lines Overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(26, 43, 74, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(26, 43, 74, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Top Bar inside Canvas Host */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'var(--space-sm) var(--space-md)',
              borderBottom: '1px solid var(--color-border)',
              backgroundColor: 'rgba(236, 231, 222, 0.4)',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <span className="atlas-radar-beacon" style={{ width: '10px', height: '10px' }}>
                <span className="arch-marker-dot" style={{ backgroundColor: 'var(--color-accent)' }} />
              </span>
              <span className="arch-tech-label">TERRITORIAL GEOGRAPHIC INDEX</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span
                className="arch-tech-label"
                style={{ animation: 'coordinateFlicker 3s ease-in-out infinite' }}
              >
                REP. COORDS: {currentLocation.coordinates}
              </span>
              <a
                href="/atlas"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/atlas');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-paper, #B31822)',
                  textDecoration: 'none',
                  border: '1px solid var(--color-accent-paper, #B31822)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '2px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  backgroundColor: 'rgba(179, 24, 34, 0.05)',
                }}
              >
                EXPLORE 3D EARTH ATLAS ↗
              </a>
            </div>
          </div>

          {/* Main Interactive Cartographic Workspace */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-md)',
              padding: 'var(--space-lg)',
              alignItems: 'center',
            }}
          >
            {/* Left: Schematic Coordinate Radar & Geographic Pinboard */}
            <div
              style={{
                position: 'relative',
                minHeight: '340px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Radar Rings */}
              <div
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  border: '1px dashed var(--color-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                  }}
                />
              </div>

              {/* Dynamic Coordinate Crosshair Lines pointing to active location */}
              <div
                style={{
                  position: 'absolute',
                  top: `${currentLocation.mapY}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'rgba(184, 80, 48, 0.35)',
                  transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `${currentLocation.mapX}%`,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  backgroundColor: 'rgba(184, 80, 48, 0.35)',
                  transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                }}
              />

              {/* Geographic Pins for all 5 Locations */}
              {verifiedLocations.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocationId(loc.id)}
                    aria-label={`Select ${loc.place}`}
                    style={{
                      position: 'absolute',
                      top: `${loc.mapY}%`,
                      left: `${loc.mapX}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: isSelected ? '14px' : '10px',
                        height: isSelected ? '14px' : '10px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-blueprint)',
                        border: isSelected ? '2px solid #FFFFFF' : '1px solid #FFFFFF',
                        boxShadow: isSelected ? '0 0 10px rgba(184, 80, 48, 0.7)' : 'none',
                        display: 'block',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                        backgroundColor: 'rgba(244, 240, 232, 0.85)',
                        padding: '1px 4px',
                        borderRadius: '2px',
                      }}
                    >
                      {loc.place.split(',')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Location Dossier Card */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-elevated)',
                padding: 'var(--space-md) var(--space-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2xs)' }}>
                  <span className="arch-section-index" style={{ color: 'var(--color-accent)' }}>
                    SITE DOSSIER // 0{currentLocation.projectNumber}
                  </span>
                  <span className="arch-tech-label">
                    {currentLocation.region}
                  </span>
                </div>

                <h3 className="arch-display-medium" style={{ marginBottom: 'var(--space-2xs)' }}>
                  {currentLocation.place}
                </h3>

                <p className="arch-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                  {currentLocation.thesis}
                </p>

                {/* Climatic & Tectonic Parameter Matrix */}
                <div
                  style={{
                    border: '1px solid var(--color-border-subtle)',
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--space-sm) var(--space-md)',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                    <span className="arch-tech-label">ELEVATION</span>
                    <span className="arch-tech-value">{currentLocation.elevation}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                    <span className="arch-tech-label">CLIMATE ZONE</span>
                    <span className="arch-tech-value">{currentLocation.climateZone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                    <span className="arch-tech-label">TECTONIC RESPONSE</span>
                    <span className="arch-tech-value" style={{ textAlign: 'right' }}>{currentLocation.tectonicResponse}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-xs)' }}>
                <span className="arch-tech-label" style={{ color: 'var(--color-accent)' }}>
                  CONNECTING PLACE → PROJECT // {currentLocation.projectNumber}
                </span>
                <ArrowLink href={`#projects`}>
                  VIEW {currentLocation.projectTitle.split(' ')[0]}
                </ArrowLink>
              </div>
            </div>
          </div>

          {/* Bottom: Location Selector Buttons Strip */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              overflowX: 'auto',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            {verifiedLocations.map((loc) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocationId(loc.id)}
                  style={{
                    flex: '1 0 auto',
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    borderRight: '1px solid var(--color-border-subtle)',
                    borderTop: isSelected ? '2px solid var(--color-accent)' : '2px solid transparent',
                    backgroundColor: isSelected ? 'var(--color-surface-elevated)' : 'transparent',
                    color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast) ease',
                  }}
                >
                  <span style={{ display: 'block', fontWeight: 600, color: isSelected ? 'var(--color-accent)' : 'inherit' }}>
                    {loc.place.split(',')[0]}
                  </span>
                  <span style={{ fontSize: '0.625rem', opacity: 0.7 }}>
                    {loc.country}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
