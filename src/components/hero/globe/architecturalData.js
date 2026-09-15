/* ============================================================================
   ARCHITECTURAL DATA STORE — Saravanakumar K Portfolio
   Nodes, Great-Circle Trajectories, Live Telemetry, Ticker & Manifest Data
   ========================================================================= */

/** Architectural Nodes: Core project sites, studio base, and global research links */
export const ARCH_NODES = [
  // Core Portfolio Projects
  { id: 'mobius',      label: 'OSLO [MÖBIUS]',             lat: 59.9158, lon:  10.7356, typology: 'Cultural Pavilion' },
  { id: 'oasis',       label: 'KATRA [CULTURAL OASIS]',    lat: 32.9930, lon:  74.9318, typology: 'Pilgrimage Sanctuary' },
  { id: 'flowspire',   label: 'MUMBAI [FLOW SPIRE]',       lat: 19.0760, lon:  72.8777, typology: 'Aerodynamic Watchtower' },
  { id: 'ecoresort',   label: 'PUNE [NATURE\'S NEST]',     lat: 18.5204, lon:  73.8567, typology: 'GRIHA Eco-Resort' },
  { id: 'chennai',     label: 'TAMIL NADU [STUDIO]',       lat: 13.0827, lon:  80.2707, typology: 'Architectural Base' },
  { id: 'ribbon',      label: 'KERALA [RIBBON OF LIFE]',   lat:  8.5241, lon:  76.9366, typology: 'Biomimetic Masterplan' },

  // Global Discourse & Research Nodes
  { id: 'singapore',   label: 'SINGAPORE [BIOPHILIC]',     lat:  1.3521, lon: 103.8198, typology: 'Tropical Ecology' },
  { id: 'tokyo',       label: 'TOKYO [TIMBER METABOLISM]', lat: 35.6762, lon: 139.6503, typology: 'Tectonic Joinery' },
  { id: 'london',      label: 'LONDON [AA TECTONICS]',     lat: 51.5074, lon:  -0.1278, typology: 'Parametric Discourse' },
  { id: 'copenhagen',  label: 'COPENHAGEN [NORDIC URBAN]', lat: 55.6761, lon:  12.5683, typology: 'Climate-Adaptive Design' },
];

export const ARCH_NODE_BY_ID = Object.fromEntries(ARCH_NODES.map((n) => [n.id, n]));

/**
 * Architectural great-circle project arcs.
 * Radiating from Chennai studio base to project sites and global design nodes.
 */
export const ARCH_ROUTES = [
  { from: 'chennai',   to: 'mobius',     lift: 0.44, weight: 1.0 },
  { from: 'chennai',   to: 'ribbon',     lift: 0.16, weight: 1.0 },
  { from: 'chennai',   to: 'oasis',      lift: 0.28, weight: 0.9 },
  { from: 'chennai',   to: 'ecoresort',  lift: 0.22, weight: 0.8 },
  { from: 'chennai',   to: 'flowspire',  lift: 0.24, weight: 0.8 },
  { from: 'chennai',   to: 'singapore',  lift: 0.26, weight: 0.8 },
  { from: 'singapore', to: 'tokyo',      lift: 0.32, weight: 0.6 },
  { from: 'chennai',   to: 'london',     lift: 0.46, weight: 0.8 },
  { from: 'mobius',    to: 'copenhagen', lift: 0.16, weight: 0.6 },
];

/** Ticker headlines cycling authentic studio dispatches */
export const ARCHITECTURAL_HEADLINES = [
  { tag: 'THESIS 02',     text: 'Ribbon of Life — 42,000 m² biomimetic mixed-use masterplan finalized' },
  { tag: 'COMPETITION',   text: 'Möbius Loop Pavilion — 120 HOURS Oslo cultural memory submission' },
  { tag: 'TECTONICS',     text: 'Cultural Oasis — Stepped Himalayan contour terracing & diagrid bio-domes' },
  { tag: 'SUSTAINABILITY',text: 'Nature\'s Nest — GRIHA green rating & container upcycling methodology' },
  { tag: 'AERODYNAMICS',  text: 'Flow Spire — Coastal wind drag mitigation & rotational geometry study' },
  { tag: 'RESEARCH',      text: 'Micro-climate responsiveness & earthen tectonics in coastal Tamil Nadu' },
  { tag: 'MONOGRAPH',     text: 'Saravanakumar K — Architecture shaped by place, climate & tectonic rigor' },
];

/** Rotating telemetry readout for active dossiers */
export const ARCHITECTURAL_TELEMETRY = [
  {
    lane: 'THS-02 · RIBBON OF LIFE',
    mode: 'BIOMIMETIC TOWER',
    eta: 'KERALA [08°31\'N 76°56\'E]',
    teu: '42,000 M²',
  },
  {
    lane: 'PRJ-01 · MÖBIUS LOOP',
    mode: 'PARAMETRIC TIMBER',
    eta: 'OSLO [59°55\'N 10°44\'E]',
    teu: '1,250 M²',
  },
  {
    lane: 'PRJ-02 · CULTURAL OASIS',
    mode: 'CONTOUR TERRACING',
    eta: 'KATRA [32°59\'N 74°56\'E]',
    teu: '18,500 M²',
  },
  {
    lane: 'PRJ-04 · NATURE\'S NEST',
    mode: 'GRIHA ECO-RESORT',
    eta: 'PUNE [18°31\'N 73°51\'E]',
    teu: '8,400 M²',
  },
  {
    lane: 'PRJ-05 · FLOW SPIRE',
    mode: 'AERODYNAMIC HIGH-RISE',
    eta: 'MUMBAI [19°04\'N 72°52\'E]',
    teu: '65,000 M²',
  },
];

/** Loader roulette column items: Contexts & Locations */
export const LOADER_LOCATIONS = [
  'Oslo · Norway',
  'Thiruvananthapuram · Kerala',
  'Katra · Jammu & Kashmir',
  'Pune · Maharashtra',
  'Mumbai · Maharashtra',
  'Chennai · Tamil Nadu',
  'Auroville · Tamil Nadu',
  'Bangalore · Karnataka',
  'Copenhagen · Denmark',
  'London · United Kingdom',
  'Zurich · Switzerland',
  'Singapore',
];

/** Loader roulette column items: Disciplines & Methodologies */
export const LOADER_DISCIPLINES = [
  'Parametric Tectonics',
  'Biomimetic Morphology',
  'Climate-Responsive Form',
  'Physical Maquette Craft',
  'Computational Design',
  'Contour Terracing',
  'Aerodynamic Diagrids',
  'Earthen Vault Research',
  'Urban Sanctuary Planning',
  'GRIHA Green Systems',
];
