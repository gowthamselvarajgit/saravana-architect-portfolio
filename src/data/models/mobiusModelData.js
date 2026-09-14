/**
 * ==============================================================================
 * MÖBIUS PAVILION — 3D MODEL ARCHITECTURAL MANIFEST
 * SARAVANAKUMAR K — GRADUATE ARCHITECT
 * 
 * Source-of-Truth:
 * - client-assets/On the path to Rediscovery_06/3D/MOBIUS_03.3dm
 * - docs/research/MOBIUS_MODEL_INSPECTION.md
 * - docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md
 * ==============================================================================
 */

export const MOBIUS_MODEL_MANIFEST = {
  id: 'mobius-pavilion',
  projectSlug: 'mobius',
  title: 'On the path to Rediscovery',
  alternateTitle: 'Möbius Loop Pavilion',
  competition: '120 HOURS 2023 ("The Art of Losing")',
  academicContext: '8th Semester · Mar 2025',
  year: '2025',
  location: {
    name: 'Tullinløkka Square, Oslo, Norway',
    city: 'Oslo',
    country: 'Norway',
    representativeCoordinates: '59°54\'57"N 10°44\'08"E',
    lat: 59.9158,
    lng: 10.7356,
    contextSite: 'Public Civic Plaza between Historical Museum and National Gallery',
  },
  thesis: 'Preserving extinct cultural memory through an unbroken topological surface.',

  // 3D Model Technical Specifications
  sourceFile: 'client-assets/On the path to Rediscovery_06/3D/MOBIUS_03.3dm',
  sourceFormat: 'Rhino 3D (OpenNURBS Archive v70)',
  sourceSizeMB: 11.72,
  conversionPipeline: 'rhino3dm OpenNURBS Render Mesh Extraction → Coordinate Transformation → trimesh PBR GLB',
  webModelPath: '/assets/models/mobius/mobius_pavilion.glb',
  webModelIsolatedPath: '/assets/models/mobius/mobius_pavilion_isolated.glb',
  webModelSizeBytes: 998604, // 975 KB
  webModelSizeMB: 0.95,

  // Geometry Topology Metrics
  geometryMetrics: {
    totalTriangles: 34876,
    totalVertices: 21206,
    pavilionShellTriangles: 31171,
    pavilionShellVertices: 18366,
    soffitRunesTriangles: 1418,
    soffitRunesVertices: 1308,
    plazaGroundTriangles: 1609,
    contextBuildingsTriangles: 628,
  },

  // Verified Bounding Box & Metric Scale (Meters)
  dimensions: {
    widthX: 52.54, // meters
    heightY: 22.77, // meters
    depthZ: 59.01, // meters
    unit: 'meters',
    datumY: 0.25, // ground level
  },

  // Preserved Architectural Hierarchy
  hierarchy: [
    {
      id: 'MOBIUS_PAVILION_SHELL',
      label: 'Pavilion Glulam Shell',
      category: 'Structure & Envelope',
      material: 'Engineered Timber / Glulam Ribs',
      color: '#D1A67A',
      description: 'Continuous single-sided topological surface uniting exhibition ramp, seating, and monumental arch.',
      isPrimary: true,
    },
    {
      id: 'MOBIUS_SOFFIT_RUNES',
      label: 'Soffit Runic Articulations',
      category: 'Tectonic Inscription',
      material: 'Oxidized Bronze / Charred Timber',
      color: '#594738',
      description: 'Twenty discrete runic elements carved into the ascending soffit, commemorating extinct Old Norse dialects.',
      isPrimary: true,
    },
    {
      id: 'TULLINLOKKA_PLAZA',
      label: 'Tullinløkka Plaza Ground',
      category: 'Urban Landscape',
      material: 'Nordic Granite Paving',
      color: '#BEB9B2',
      description: 'Civic ground podium and pedestrian pathways anchoring the pavilion to the historic square.',
      isPrimary: false,
    },
    {
      id: 'OSLO_CONTEXT_BUILDINGS',
      label: 'Historic Museum Facades',
      category: 'Contextual Massing',
      material: 'Architectural Clay Plaster',
      color: '#D7D2CA',
      description: 'Volumetric silhouettes of the Historical Museum and National Gallery framing the site.',
      isPrimary: false,
    },
    {
      id: 'PLAZA_LANDSCAPING',
      label: 'Plaza Lawn Terraces',
      category: 'Softscape',
      material: 'Park Turf & Ground Cover',
      color: '#8CA07D',
      description: 'Green lawn buffers softening pedestrian approach.',
      isPrimary: false,
    },
  ],

  // Curated Architectural Vantage Points (Camera Choreography)
  cameraPresets: [
    {
      id: 'axonometric',
      label: 'Aerial Axonometric',
      position: [42, 32, 48],
      target: [0, 8, 0],
      fov: 38,
      description: 'Overview of the topological figure-eight geometry within the urban square.',
    },
    {
      id: 'approach',
      label: 'Eye-Level Approach',
      position: [-18, 3.5, 36],
      target: [0, 7, 0],
      fov: 48,
      description: 'Pedestrian eye-level perspective looking toward the soaring timber archway.',
    },
    {
      id: 'runes',
      label: 'Soffit Runes Detail',
      position: [14, 11, 16],
      target: [20, 18, 22],
      fov: 42,
      description: 'Low-angle perspective examining the runic inscriptions under the ascending arch.',
    },
    {
      id: 'plan',
      label: 'Plan Overlook',
      position: [0, 68, 0.1],
      target: [0, 0, 0],
      fov: 35,
      description: 'Orthographic-style plan view revealing the continuous circulation path.',
    },
  ],

  // Shading Presentation Modes
  shadingModes: [
    { id: 'timber', label: 'Engineered Timber PBR' },
    { id: 'clay', label: 'Museum Clay Maquette' },
    { id: 'wireframe', label: 'Drafting Linework' },
  ],
};
