/**
 * ==============================================================================
 * PROJECT 3D MODEL ARCHITECTURAL REGISTRY & SINGLE SOURCE OF TRUTH
 * SARAVANAKUMAR K — GRADUATE ARCHITECT PORTFOLIO
 * 
 * Strict Governance:
 * - Every project has its own independent 3D experience and configuration.
 * - NEVER display another project's 3D model, CTA, title, or metadata as a fallback.
 * - If a project's model is not yet converted, display:
 *   "3D MODEL — PREPARATION IN PROGRESS" with verified raw source asset.
 * - Flow Spire is drawing & render-led: NO 3D viewer until a verified raw 3D source exists.
 * ==============================================================================
 */

export const PROJECT_MODEL_REGISTRY = {
  // ----------------------------------------------------------------------------
  // PROJECT 01: MÖBIUS PAVILION (OSLO, NORWAY)
  // ----------------------------------------------------------------------------
  mobius: {
    slug: 'mobius',
    projectNumber: '01',
    title: 'On the path to Rediscovery',
    alternateTitle: 'Möbius Loop Pavilion',
    category: 'Competition / Parametric Cultural Pavilion',
    location: {
      name: 'Tullinløkka Square, Oslo, Norway',
      city: 'Oslo',
      country: 'Norway',
      coordinates: '59°54\'57"N 10°44\'08"E',
      lat: 59.9158,
      lng: 10.7356,
    },
    thesis: 'Preserving extinct cultural memory through an unbroken topological surface.',
    hasWebModel: true,
    status: 'ready',
    modelPath: '/assets/models/mobius/mobius_pavilion.glb',
    rawSource: 'client-assets/On the path to Rediscovery_06/3D/MOBIUS_03.3dm',
    rawFormat: 'Rhino 3D OpenNURBS (v70, 11.72 MB)',
    dimensions: {
      widthX: 52.54,
      heightY: 22.77,
      depthZ: 59.01,
      unit: 'meters',
      datumY: 0.25,
    },
    geometryMetrics: {
      totalTriangles: 34876,
      totalVertices: 21206,
    },
    gridArgs: [180, 36],
    groundRadius: 95,
    cameraLimits: { minDistance: 6, maxDistance: 150 },
    initialPreset: 'axonometric',
    initialShading: 'timber',
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
    shadingModes: [
      { id: 'timber', label: 'Engineered Timber PBR' },
      { id: 'clay', label: 'Museum Clay Maquette' },
      { id: 'wireframe', label: 'Drafting Linework' },
    ],
    palettes: {
      timber: {
        MOBIUS_PAVILION_SHELL: { color: '#C99B6A', roughness: 0.48, metalness: 0.04 },
        MOBIUS_SOFFIT_RUNES: { color: '#4B3828', roughness: 0.65, metalness: 0.25 },
        TULLINLOKKA_PLAZA: { color: '#BCB7AE', roughness: 0.82, metalness: 0.02 },
        OSLO_CONTEXT_BUILDINGS: { color: '#DAD5CC', roughness: 0.88, opacity: 0.85, transparent: true },
        PLAZA_LANDSCAPING: { color: '#8A9E7B', roughness: 0.85 },
        default: { color: '#C99B6A', roughness: 0.48, metalness: 0.04 },
      },
      clay: {
        MOBIUS_PAVILION_SHELL: { color: '#E5DFD5', roughness: 0.86 },
        MOBIUS_SOFFIT_RUNES: { color: '#A89F93', roughness: 0.9 },
        TULLINLOKKA_PLAZA: { color: '#D4CDC3', roughness: 0.92 },
        OSLO_CONTEXT_BUILDINGS: { color: '#DBD6CD', roughness: 0.94, opacity: 0.8, transparent: true },
        PLAZA_LANDSCAPING: { color: '#C6CCBE', roughness: 0.95 },
        default: { color: '#E5DFD5', roughness: 0.86 },
      },
      wireframe: {
        MOBIUS_PAVILION_SHELL: { color: '#2B3D52', roughness: 0.5, metalness: 0.1, wireframe: true },
        MOBIUS_SOFFIT_RUNES: { color: '#9E3825', roughness: 0.5, metalness: 0.1, wireframe: true },
        TULLINLOKKA_PLAZA: { color: '#7D8D9E', roughness: 0.6, wireframe: true },
        OSLO_CONTEXT_BUILDINGS: { color: '#A0B0C0', roughness: 0.7, wireframe: true, opacity: 0.4, transparent: true },
        PLAZA_LANDSCAPING: { color: '#6A8072', roughness: 0.7, wireframe: true },
        default: { color: '#2B3D52', roughness: 0.5, metalness: 0.1, wireframe: true },
      },
    },
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
    cta: 'INTERACTIVE 3D MAQUETTE',
  },

  // ----------------------------------------------------------------------------
  // PROJECT 02: CULTURAL OASIS (KATRA, JAMMU & KASHMIR)
  // ----------------------------------------------------------------------------
  'cultural-oasis': {
    slug: 'cultural-oasis',
    projectNumber: '02',
    title: 'Cultural Oasis',
    alternateTitle: 'Pilgrimage Urban Intervention & Tourist Hub',
    category: 'Academic Major Design / Cultural & Hospitality',
    location: {
      name: 'Katra, Jammu & Kashmir, India',
      city: 'Katra',
      country: 'India',
      coordinates: '32°59\'31"N 74°56\'02"E',
      lat: 32.9930,
      lng: 74.9318,
    },
    thesis: 'Climatic sanctuary and regional memory rooted in Himalayan foothills.',
    hasWebModel: false,
    status: 'preparation-in-progress',
    notice: '3D MODEL — PREPARATION IN PROGRESS',
    modelPath: null,
    rawSource: 'client-assets/Cultural Oasis_01/3D/SITE 3D_09F.skp',
    rawFormat: 'Trimble SketchUp 2024 (.skp)',
    rawSizeMB: 116.62,
    conversionPipelineStatus:
      'Original 116.62 MB SketchUp 2024 binary archive preserved intact. Server-side headless conversion is in progress awaiting Trimble C-SDK geometry extraction.',
    provenanceNote:
      'Authentic 3D geometry encompasses stepped water amphitheater, perimeter colonnade heritage facades, and crystalline diagrid bio-domes stepping down steep Himalayan contour terraces.',
    cta: 'LOCATE ON 3D ATLAS',
  },

  // ----------------------------------------------------------------------------
  // PROJECT 03: RIBBON OF LIFE (THIRUVANANTHAPURAM, KERALA)
  // ----------------------------------------------------------------------------
  'ribbon-of-life': {
    slug: 'ribbon-of-life',
    projectNumber: '03',
    title: 'Ribbon of Life',
    alternateTitle: 'Techno-Park Phase IV Master Plan & Skyscraper',
    category: 'B.Arch Capstone Thesis / Urban Master Plan & High-Rise',
    location: {
      name: 'Thiruvananthapuram, Kerala, India',
      city: 'Thiruvananthapuram',
      country: 'India',
      coordinates: '08°31\'27"N 76°56\'12"E',
      lat: 8.5241,
      lng: 76.9366,
    },
    thesis: 'An integrated continuous loop connecting Work, Live, Relax, Shop, and Play.',
    hasWebModel: true,
    status: 'ready',
    modelPath: '/assets/models/ribbon-of-life/ribbon_of_life.glb',
    rawSource: 'client-assets/RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm',
    rawFormat: 'Rhino 3D OpenNURBS (45.75 MB)',
    dimensions: {
      widthX: 106.10,
      heightY: 194.22,
      depthZ: 82.65,
      unit: 'meters',
      datumY: 0,
    },
    geometryMetrics: {
      totalTriangles: 67178,
      totalVertices: 33939,
    },
    gridArgs: [420, 42],
    groundRadius: 220,
    cameraLimits: { minDistance: 15, maxDistance: 650 },
    initialPreset: 'axonometric',
    initialShading: 'aluminum',
    cameraPresets: [
      {
        id: 'axonometric',
        label: 'Aerial Axonometric',
        position: [175, 135, 195],
        target: [0, 85, 0],
        fov: 42,
        description: 'Elevated perspective capturing the 194-meter aerodynamic spiral form.',
      },
      {
        id: 'street',
        label: 'Podium Street Approach',
        position: [-75, 18, 110],
        target: [0, 45, 0],
        fov: 52,
        description: 'Pedestrian eye-level perspective looking up from the Technopark campus podium.',
      },
      {
        id: 'crown',
        label: 'Tower Crown & Sky Terrace',
        position: [50, 192, 65],
        target: [0, 172, 0],
        fov: 38,
        description: 'Close perspective on the aerodynamically tapered crown and sky-deck level.',
      },
      {
        id: 'plan',
        label: 'Campus Plan Overlook',
        position: [0, 290, 0.1],
        target: [0, 0, 0],
        fov: 35,
        description: 'Orthographic plan orientation revealing the continuous ribbon circulation loop.',
      },
    ],
    shadingModes: [
      { id: 'aluminum', label: 'Anodized Aluminum PBR' },
      { id: 'clay', label: 'Museum Clay Maquette' },
      { id: 'wireframe', label: 'Structural Vector Linework' },
    ],
    palettes: {
      aluminum: {
        Biomimetic_Tower_Mesh: { color: '#B0C2D4', roughness: 0.32, metalness: 0.62 },
        RIBBON_BIOMIMETIC_TOWER: { color: '#B0C2D4', roughness: 0.32, metalness: 0.62 },
        default: { color: '#B0C2D4', roughness: 0.32, metalness: 0.62 },
      },
      clay: {
        Biomimetic_Tower_Mesh: { color: '#E4DFD6', roughness: 0.88, metalness: 0.0 },
        RIBBON_BIOMIMETIC_TOWER: { color: '#E4DFD6', roughness: 0.88, metalness: 0.0 },
        default: { color: '#E4DFD6', roughness: 0.88, metalness: 0.0 },
      },
      wireframe: {
        Biomimetic_Tower_Mesh: { color: '#3A5C80', roughness: 0.5, metalness: 0.2, wireframe: true },
        RIBBON_BIOMIMETIC_TOWER: { color: '#3A5C80', roughness: 0.5, metalness: 0.2, wireframe: true },
        default: { color: '#3A5C80', roughness: 0.5, metalness: 0.2, wireframe: true },
      },
    },
    hierarchy: [
      {
        id: 'Biomimetic_Tower_Mesh',
        label: 'Biomimetic Twisted Skyscraper',
        category: 'Superstructure & Facade',
        material: 'Anodized Aluminum Louvers & Solar High-Performance Glass',
        color: '#B0C2D4',
        description: '194.2-meter high-rise with rotating floor plate massing designed to mitigate coastal wind vortex shedding.',
        isPrimary: true,
      },
    ],
    cta: 'INTERACTIVE 3D SKYSCRAPER',
  },

  // ----------------------------------------------------------------------------
  // PROJECT 04: ECO RESORT (GHODEGAON, PUNE)
  // ----------------------------------------------------------------------------
  'eco-resort': {
    slug: 'eco-resort',
    projectNumber: '04',
    title: 'Eco Resort',
    alternateTitle: "Nature's Nest / GRIHA Trophy Competition",
    category: 'Competition / Sustainable Hospitality & Hillside Architecture',
    location: {
      name: 'Ghodegaon, Pune District, Maharashtra, India',
      city: 'Pune',
      country: 'India',
      coordinates: '18°31\'13"N 73°51\'24"E',
      lat: 18.5204,
      lng: 73.8567,
    },
    thesis: 'Climate-responsive luxury eco-hospitality minimizing environmental disturbance.',
    hasWebModel: false,
    status: 'preparation-in-progress',
    notice: '3D MODEL — PREPARATION IN PROGRESS',
    modelPath: null,
    rawSource: 'client-assets/Eco ressort_03/3D/SITE_3D_02.rvt',
    rawFormat: 'Autodesk Revit BIM (.rvt)',
    rawSizeMB: 31.10,
    conversionPipelineStatus:
      'Original 31.10 MB Revit BIM database preserved intact. Parametric building envelopes & hillside stilt modules awaiting Autodesk Forge/Revit API geometry extraction.',
    provenanceNote:
      'GRIHA 5-Star hillside masterplan containing upcycled container chalets, central diagrid clubhouse, passive cross-ventilation shafts, and cut-and-fill slope adaptation.',
    cta: 'LOCATE ON 3D ATLAS',
  },

  // ----------------------------------------------------------------------------
  // PROJECT 05: FLOW SPIRE (THANE, MUMBAI)
  // ----------------------------------------------------------------------------
  'flow-spire': {
    slug: 'flow-spire',
    projectNumber: '05',
    title: 'Flow Spire',
    alternateTitle: 'Skyline-Hub / Landmark Watchtower',
    category: 'Academic Design Studio / Aerodynamic Landmark High-Rise',
    location: {
      name: 'Thane, Mumbai, Maharashtra, India',
      city: 'Thane / Mumbai',
      country: 'India',
      coordinates: '19°04\'34"N 72°52\'40"E',
      lat: 19.0760,
      lng: 72.8777,
    },
    thesis: 'Aerodynamic form evolution mitigating coastal wind drag and celebrating urban flow.',
    hasWebModel: false,
    status: 'drawing-led',
    notice: 'DRAWING & RENDER-LED INVESTIGATION',
    modelPath: null,
    rawSource: null,
    rawFormat: 'Multi-Level Vector CAD Drawings & Physical Study Maquette',
    rawSizeMB: 0,
    conversionPipelineStatus:
      'Verified drawing-led and physical craft investigation. Authentic archive contains no raw 3D file; zero synthetic or procedural 3D substituted.',
    provenanceNote:
      'Articulated through 8 comprehensive CAD vector floor plates, aerodynamic structural section studies, and studio physical spiral study models.',
    cta: 'EXPLORE CAD VECTOR PLANS',
  },
};

/**
 * Retrieve project model configuration by slug
 */
export function getProjectModelConfig(slug) {
  if (!slug) return PROJECT_MODEL_REGISTRY.mobius;
  return PROJECT_MODEL_REGISTRY[slug] || null;
}
