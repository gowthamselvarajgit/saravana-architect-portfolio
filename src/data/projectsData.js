/**
 * ==============================================================================
 * ARCHITECTURAL PROJECTS & ARCHIVE DATA STORE
 * SARAVANAKUMAR K — GRADUATE ARCHITECT
 * 
 * Source-of-Truth:
 * - client-assets/ (Primary Physical Archive)
 * - docs/research/CLIENT_ASSET_AUDIT.md
 * - docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md
 * 
 * Governance Rules:
 * - Zero fabricated metrics (no invented floor counts, dimensions, or percentages).
 * - Client attribution strictly preserved.
 * - Professional internship work designated "pending-client-confirmation".
 * ==============================================================================
 */

/**
 * 1. PRIMARY EDITORIAL WORKS (5 Core Selected Academic & Competition Projects)
 */
export const PRIMARY_PROJECTS = [
  {
    id: 'mobius',
    slug: 'mobius',
    projectNumber: '01',
    title: 'On the path to Rediscovery',
    alternateTitle: 'Möbius Loop Pavilion',
    category: 'Competition / Parametric Cultural Pavilion',
    context: '120 HOURS 2023 Architectural Competition ("The Art of Losing")',
    academicContext: '8th Semester · Mar 2025',
    year: '2025',
    location: {
      name: 'Tullinløkka Square, Oslo, Norway',
      city: 'Oslo',
      country: 'Norway',
      coordinates: '59°54\'57"N 10°44\'08"E',
      lat: 59.9158,
      lng: 10.7356,
      contextSite: 'Between the Historical Museum and National Gallery',
    },
    thesis: 'Preserving extinct cultural memory through an unbroken topological surface.',
    description:
      'Conceived for the 120 HOURS international design challenge, the pavilion responds to the theme "The Art of Losing"—contemplating what occurs when ancient languages and cultural memory vanish. Located in Oslo\'s historic Tullinløkka square, the scheme translates an Old Norse runic inscription into an unbroken, single-sided timber Möbius surface, uniting public circulation, gathering, and acoustic exhibition beneath a continuous architectural arch.',
    route: '/projects/mobius',
    heroImage: '/assets/images/projects/mobius/mobius-hero.webp',
    supportingImages: [
      '/assets/images/projects/mobius/mobius-detail-01.webp',
      '/assets/images/projects/mobius/mobius-detail-02.webp',
    ],
    processImages: [
      '/assets/images/projects/mobius/mobius-process-01.webp',
    ],
    sourceFolder: 'client-assets/On the path to Rediscovery_06/',
    rawModel: 'client-assets/On the path to Rediscovery_06/3D/MOBIUS_03.3dm (Rhino 3D, 11.72 MB)',
    hasRaw3D: true,
    hasWebModel: true,
    webModelPath: '/assets/models/mobius/mobius_pavilion.glb',
    modelExperienceTitle: 'Explore Möbius 3D Maquette',
    status: 'verified primary portfolio project',
    publicationStatus: 'verified',
    featured: true,
    atlasVisible: true,
    archiveVisible: true,
    technicalSpecs: [
      { label: 'TYPOLOGY', value: 'Exhibition & Cultural Pavilion' },
      { label: 'GEOMETRY', value: 'Continuous Single-Sided Möbius Surface' },
      { label: 'PARAMETRICS', value: 'Grasshopper Algorithmic Progression' },
      { label: 'MATERIALITY', value: 'Engineered Timber / Glulam Ribs' },
      { label: 'SITE CONTEXT', value: 'Urban Civic Plaza (Tullinløkka)' },
    ],
  },
  {
    id: 'cultural-oasis',
    slug: 'cultural-oasis',
    projectNumber: '02',
    title: 'Cultural Oasis',
    alternateTitle: 'Pilgrimage Urban Intervention & Tourist Hub',
    category: 'Academic Major Design / Cultural & Hospitality',
    context: 'Bachelor of Architecture Design Studio',
    academicContext: '7th Semester · Jul–Dec 2024',
    year: '2024',
    location: {
      name: 'Katra, Jammu & Kashmir, India',
      city: 'Katra',
      state: 'Jammu & Kashmir',
      country: 'India',
      coordinates: '32°59\'31"N 74°56\'02"E',
      lat: 32.9930,
      lng: 74.9318,
      contextSite: 'Vaishno Devi Pilgrimage Transit Corridor',
    },
    thesis: 'Climatic sanctuary and regional memory rooted in Himalayan foothills.',
    description:
      'Situated along the chaotic pilgrimage transit corridor of Katra at the base of the sacred Trikuta mountains, Cultural Oasis transforms residual urban voids into spaces of contemplative respite. Grounded in Kevin Lynch\'s urban cognitive framework, the project articulates a stepped water amphitheater, perimeter colonnade heritage facades, and crystalline diagrid bio-domes stepping down steep contour terraces.',
    route: '/projects/cultural-oasis',
    heroImage: '/assets/images/projects/cultural-oasis/cultural-oasis-hero.webp',
    supportingImages: [
      '/assets/images/projects/cultural-oasis/cultural-oasis-detail-01.webp',
      '/assets/images/projects/cultural-oasis/cultural-oasis-detail-02.webp',
      '/assets/images/projects/cultural-oasis/cultural-oasis-detail-03.webp',
    ],
    processImages: [
      '/assets/images/projects/cultural-oasis/cultural-oasis-process-01.webp',
      '/assets/images/projects/cultural-oasis/cultural-oasis-model-01.webp',
    ],
    sourceFolder: 'client-assets/Cultural Oasis_01/',
    rawModel: 'client-assets/Cultural Oasis_01/3D/SITE 3D_09F.skp (SketchUp 2024, 116.62 MB)',
    hasRaw3D: true,
    hasWebModel: false,
    modelStatusNotice: '3D MODEL — PREPARATION IN PROGRESS',
    webModelPath: null,
    modelExperienceTitle: null,
    status: 'verified primary portfolio project',
    publicationStatus: 'verified',
    featured: true,
    atlasVisible: true,
    archiveVisible: true,
    technicalSpecs: [
      { label: 'TYPOLOGY', value: 'Cultural Campus & Pilgrimage Sanctuary' },
      { label: 'URBAN METHOD', value: 'Kevin Lynch Node, Path, Edge Mapping' },
      { label: 'KEY ELEMENTS', value: 'Stepped Amphitheater, Water Court, Bio-Domes' },
      { label: 'TERRAIN LOGIC', value: 'Stepped Contour Terracing' },
      { label: 'PHYSICAL CRAFT', value: 'Hand-Crafted Contoured Foam Study' },
    ],
  },
  {
    id: 'ribbon-of-life',
    slug: 'ribbon-of-life',
    projectNumber: '03',
    title: 'Ribbon of Life',
    alternateTitle: 'Techno-Park Phase IV Master Plan & Skyscraper',
    category: 'B.Arch Capstone Thesis / Urban Master Plan & High-Rise',
    context: 'Bachelor of Architecture Capstone Thesis',
    academicContext: '10th Semester Thesis · Jan–May 2026',
    year: '2026',
    location: {
      name: 'Thiruvananthapuram, Kerala, India',
      city: 'Thiruvananthapuram',
      state: 'Kerala',
      country: 'India',
      coordinates: '08°31\'27"N 76°56\'12"E',
      lat: 8.5241,
      lng: 76.9366,
      contextSite: 'Technopark Campus Master Extension',
    },
    thesis: 'An integrated continuous loop connecting Work, Live, Relax, Shop, and Play.',
    description:
      'Grounded in official Kerala State IT Infrastructure Ltd tender analysis and demographic youth migration studies, Ribbon of Life reimagines the technology workplace as an unbroken urban ecosystem. An elevated spatial ribbon physically and socially links four primary programmatic quadrants—IT office towers, residential enclaves, lakeside wellness facilities, and civic public realms—integrating a biomimetic twisted skyscraper within a sustainable landscape masterplan.',
    route: '/projects/ribbon-of-life',
    heroImage: '/assets/images/projects/ribbon-of-life/ribbon-hero.webp',
    supportingImages: [],
    processImages: [],
    sourceFolder: 'client-assets/RIBBON OF LIFE_THESIS_02/',
    rawModel: 'client-assets/RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm (Rhino 3D, 45.75 MB)',
    hasRaw3D: true,
    hasWebModel: true,
    webModelPath: '/assets/models/ribbon-of-life/ribbon_of_life.glb',
    modelExperienceTitle: 'Explore Ribbon of Life 3D Skyscraper',
    status: 'verified primary academic project',
    publicationStatus: 'verified',
    featured: true,
    atlasVisible: true,
    archiveVisible: true,
    technicalSpecs: [
      { label: 'TYPOLOGY', value: 'Mixed-Use Master Plan & Biomimetic Tower' },
      { label: 'URBAN SPINE', value: 'Continuous Elevated Pedestrian Ribbon' },
      { label: 'PROGRAMS', value: 'Work, Live, Relax, Shop, Play' },
      { label: 'RESEARCH BASE', value: 'State Demographic Migration & Tender Data' },
      { label: 'DIGITAL MODEL', value: 'Rhino Parametric Campus Mesh' },
    ],
  },
  {
    id: 'eco-resort',
    slug: 'eco-resort',
    projectNumber: '04',
    title: 'Eco Resort',
    alternateTitle: "Nature's Nest / GRIHA Trophy Competition",
    category: 'Competition / Sustainable Hospitality & Hillside Architecture',
    context: 'GRIHA Trophy Design Competition Entry',
    academicContext: '8th Semester · Feb 2025',
    year: '2025',
    location: {
      name: 'Ghodegaon, Pune District, Maharashtra, India',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      coordinates: '18°31\'13"N 73°51\'24"E',
      lat: 18.5204,
      lng: 73.8567,
      contextSite: 'Western Ghats Foothills Sloped Contour Terrain',
    },
    thesis: 'Climate-responsive luxury eco-hospitality minimizing environmental disturbance.',
    description:
      'Engineered for the GRIHA Green Building Rating competition, Nature\'s Nest integrates upcycled shipping container modules, timber diagrid pavilions, and rammed-earth construction with natural hillside topography. Following cut-and-fill slope adaptation, the masterplan incorporates staggered stilt cottages, passive cross-ventilation, rainwater catchment canals, and vernacular shading canopies that tread lightly on the Western Ghats landscape.',
    route: '/projects/eco-resort',
    heroImage: '/assets/images/projects/eco-resort/eco-resort-hero.webp',
    supportingImages: [],
    processImages: [],
    sourceFolder: 'client-assets/Eco ressort_03/',
    rawModel: 'client-assets/Eco ressort_03/3D/SITE_3D_02.rvt (Revit BIM, 31.10 MB)',
    hasRaw3D: true,
    hasWebModel: false,
    modelStatusNotice: '3D MODEL — PREPARATION IN PROGRESS',
    webModelPath: null,
    modelExperienceTitle: null,
    status: 'verified academic project',
    publicationStatus: 'verified',
    featured: true,
    atlasVisible: true,
    archiveVisible: true,
    technicalSpecs: [
      { label: 'TYPOLOGY', value: 'Sustainable Hospitality & Wellness Institute' },
      { label: 'EVALUATION', value: 'GRIHA Green Building Rating Principles' },
      { label: 'CONSTRUCTION', value: 'Container Upcycling & Timber Stilt Systems' },
      { label: 'TERRAIN LOGIC', value: 'Hillside Cut-and-Fill Slope Terracing' },
      { label: 'BIM ASSET', value: 'Autodesk Revit Parametric Site Model' },
    ],
  },
  {
    id: 'flow-spire',
    slug: 'flow-spire',
    projectNumber: '05',
    title: 'Flow Spire',
    alternateTitle: 'Skyline-Hub / Landmark Watchtower',
    category: 'Academic Design Studio / Aerodynamic Landmark High-Rise',
    context: 'Bachelor of Architecture Design Studio',
    academicContext: '8th Semester · Jan–May 2025',
    year: '2025',
    location: {
      name: 'Thane, Mumbai, Maharashtra, India',
      city: 'Thane / Mumbai',
      state: 'Maharashtra',
      country: 'India',
      coordinates: '19°04\'34"N 72°52\'40"E',
      lat: 19.0760,
      lng: 72.8777,
      contextSite: 'Vasavi River & Thane Creek Coastal Confluence',
    },
    thesis: 'Aerodynamic form evolution mitigating coastal wind drag and celebrating urban flow.',
    description:
      'Conceived as a coastal gateway landmark at the threshold where Mumbai\'s urban energy spreads into Thane, Flow Spire embodies eternal fluidity and growth ("Tide of Growth"). Sited at the Vasavi River–Thane Creek junction, the tower features a faceted rotating geometry that responds to dominant coastal wind vectors. The scheme is articulated through multi-level vector CAD plans, physical spiral study models, a Voronoi-crystal shopping podium, and sky observation lounges.',
    route: '/projects/flow-spire',
    heroImage: '/assets/images/projects/flow-spire/flow-spire-hero.webp',
    supportingImages: [],
    processImages: [],
    sourceFolder: 'client-assets/WATCH TOWER_FLOW SPIRE_05/',
    rawModel: null, // Verified: No raw 3D file exists; drawing & render led
    hasRaw3D: false,
    hasWebModel: false,
    modelStatusNotice: 'DRAWING & RENDER-LED INVESTIGATION',
    webModelPath: null,
    modelExperienceTitle: null,
    status: 'verified academic project (drawing & render-led)',
    publicationStatus: 'verified',
    featured: true,
    atlasVisible: true,
    archiveVisible: true,
    technicalSpecs: [
      { label: 'TYPOLOGY', value: 'Coastal Landmark High-Rise & Mixed-Use Complex' },
      { label: 'AERODYNAMICS', value: 'Faceted Rotating Form Mitigating Wind Drag' },
      { label: 'PROGRAM STACK', value: 'Transit Base, Ecological Labs, Sky Lounges' },
      { label: 'REPRESENTATION', value: 'Multi-Level Vector CAD Drawings & Physical Model' },
      { label: 'SITE CONTEXT', value: 'Vasavi River / Thane Creek Junction' },
    ],
  },
];

/**
 * Backward compatibility: export PROJECTS pointing to PRIMARY_PROJECTS
 */
export const PROJECTS = PRIMARY_PROJECTS;

/**
 * 2. DESIGN EXPLORATIONS (Product & Industrial Architecture)
 */
export const DESIGN_EXPLORATIONS = [
  {
    id: 'design-explorations',
    projectNumber: '06',
    title: 'Design Explorations: Pet House & Modular Organizer',
    alternateTitle: 'Product Architecture & Ergonomic Systems',
    category: 'Industrial & Modular Product Design',
    context: 'ARC-654 Coursework (Bachelor of Architecture)',
    semester: '6th Semester',
    year: '2024',
    location: {
      name: 'Interior / Domestic Scale',
      city: null,
      country: 'India',
    },
    status: 'verified academic/design exploration work',
    publicationStatus: 'verified',
    archiveVisible: true,
    items: [
      {
        name: 'Pet House (Cat Behavioral Architecture)',
        concept: 'Feline behavioral journey: climb, scratch, explore, rest, observe',
        components: 'Sisal-wrapped columns, sleeping cube, bridge tunnel, spiral tower',
        medium: '3D exploded axonometric & timber joinery details',
      },
      {
        name: 'Modular Stationery Organizer',
        concept: 'Tree-inspired articulating desk organizer with 360° rotating arms',
        components: 'Solid wood core, modular aluminum trays, LED ambient ring, non-slip base',
        medium: 'Orthographic engineering projections & product CGI',
      },
    ],
    sourceFolder: 'client-assets/PRODUCT DESIGN/',
  },
];

/**
 * 3. PHYSICAL MODEL CRAFTSMANSHIP (Process & Material Investigation)
 */
export const PHYSICAL_CRAFT_PROJECTS = [
  {
    id: 'physical-craft',
    projectNumber: '07',
    title: 'Physical Model Craftsmanship',
    category: 'Material Investigation & Studio Craft',
    context: 'Academic & Competition Studio Submissions',
    year: '2021–2026',
    status: 'verified process/craft archive',
    publicationStatus: 'verified',
    archiveVisible: true,
    description:
      'Physical models serve as primary cognitive tools across Saravanakumar\'s design methodology. From large-scale contoured foam topography of steep Himalayan terrain to delicate bamboo diagrid towers and parametric biomimicry shell maquettes presented before university juries, tactile craftsmanship bridges abstract computational concepts and physical material behavior.',
    artifacts: [
      {
        title: 'Katra Contoured City Model',
        materials: 'Hand-cut layered foam contour boards, chipboard masses',
        scale: 'Territorial urban site scale',
        focus: 'Steep hillside topography, pilgrimage routes, transit nodes',
        source: 'client-assets/Cultural Oasis_01/PNG/PHYSICAL MODEL/',
      },
      {
        title: 'Bamboo Diagrid Tower Maquette',
        materials: 'Wood strip lattice, wire tensile core',
        focus: 'High-rise structural stability and wind transparency',
        source: 'client-assets/COLLAGE PAGE/',
      },
      {
        title: 'Biomimicry Shell Pavilion',
        materials: 'Form-active curved surface study',
        focus: 'Presented to international jurors and academic faculty',
        source: 'client-assets/COLLAGE PAGE/01/S.jpeg',
      },
      {
        title: 'Spiral Watchtower Study',
        materials: 'Articulated floor-plate massing model',
        focus: 'Helix aerodynamic circulation fins',
        source: 'client-assets/WATCH TOWER_FLOW SPIRE_05/PNG/WhatsApp Image 2025-06-03 at 10.33.05.png',
      },
    ],
  },
];

/**
 * 4. PROFESSIONAL / INTERNSHIP ARCHIVE (Architect Hafeez Contractor)
 * 
 * IMPORTANT:
 * All projects below have publicationStatus: "pending-client-confirmation".
 * They are documented internally for accurate archive representation,
 * with neutral attribution respecting Indian architectural practice protocols.
 * Zero claim of independent ownership or unverified roles.
 */
export const PROFESSIONAL_ARCHIVE = [
  {
    id: 'ahc-clubhouse-upper-thane',
    projectNumber: 'AHC-01',
    title: 'Club House — Upper Thane',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Upper Thane, Mumbai, Maharashtra, India',
    coordinates: '19°14\'N 73°02\'E',
    lat: 19.2333,
    lng: 73.0333,
    typology: 'Residential Leisure Clubhouse (74-Acre Township)',
    contribution: 'Schematic sections, Ground floor planning, architectural detail drawings (Sections A, B, C, D) under Principal Architect.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 36)',
  },
  {
    id: 'ahc-vertical-nexus-kharadi',
    projectNumber: 'AHC-02',
    title: 'Vertical Nexus',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Kharadi, Pune, Maharashtra, India',
    coordinates: '18°33\'N 73°56\'E',
    lat: 18.5514,
    lng: 73.9352,
    typology: 'High-Rise Residential (10-Acre Site, 2.03M sq ft)',
    contribution: 'Master plan coordination, internal circulation, fire-tender path compliance, building cross-sections.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 37)',
  },
  {
    id: 'ahc-portico-prive-goa',
    projectNumber: 'AHC-03',
    title: 'The Portico Privé Villa',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Goa, India',
    coordinates: '15°18\'N 74°07\'E',
    lat: 15.2993,
    lng: 74.1240,
    typology: 'Luxury Plotted Development & Clubhouse (120-Acre Masterplan)',
    contribution: 'Mediterranean villa layout, architectural arch detail options (OP3–OP6), ground floor coordination.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 38)',
  },
  {
    id: 'ahc-crest-bkc',
    projectNumber: 'AHC-04',
    title: 'The Crest at BKC',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra, India',
    coordinates: '19°04\'N 72°52\'E',
    lat: 19.0657,
    lng: 72.8687,
    typology: 'Flagship Commercial High-Rise',
    contribution: 'Commercial floor plates, building sections E, I, A, B, structural slab-drop engineering coordination.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 39)',
  },
  {
    id: 'ahc-zenith-institution-campus',
    projectNumber: 'AHC-05',
    title: 'The Zenith Institution Campus',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Amaravati / Hyderabad, India',
    coordinates: '16°30\'N 80°30\'E',
    lat: 16.5131,
    lng: 80.5165,
    typology: 'Waterfront Educational Mega-Campus (10 Lac sq ft Academic Block, 7,524 Student Housing Units)',
    contribution: 'Massing axonometrics, radial master planning layout, residential cluster coordination.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 40)',
  },
  {
    id: 'ahc-ridgeview-institute',
    projectNumber: 'AHC-06',
    title: 'Ridgeview Institute',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Jettri, Navi Mumbai, Maharashtra, India',
    coordinates: '19°00\'N 73°05\'E',
    lat: 19.0330,
    lng: 73.0297,
    typology: 'Hill-Contour Integrated Campus',
    contribution: 'Sun-path analysis, 3D terrain buildable/non-buildable mapping, 4-phase master plan, stepped contour sections.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 41)',
  },
  {
    id: 'ahc-diadem-tower',
    projectNumber: 'AHC-07',
    title: 'The Diadem Tower',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Millennium City, Gurugram, Haryana, India',
    coordinates: '28°27\'N 77°01\'E',
    lat: 28.4595,
    lng: 77.0266,
    typology: 'Ultra-Luxury Residential Skyscraper (6BHK / 7BHK Simplex Units)',
    contribution: 'Tower floor plates, structural core sections, entry canopy drawings.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 42)',
  },
  {
    id: 'ahc-interpretation-centre-lothal',
    projectNumber: 'AHC-08',
    title: 'Maritime Interpretation Centre',
    firm: 'Architect Hafeez Contractor',
    period: 'Jun 2025 – Nov 2025',
    location: 'Lothal, Gujarat, India',
    coordinates: '22°31\'N 72°14\'E',
    lat: 22.5222,
    lng: 72.2497,
    typology: 'National Maritime Museum & Heritage Complex',
    contribution: 'Master plan options, tensile cable dome and tented mast structure documentation.',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    source: 'portfolio.pdf (Page 43)',
  },
];

/**
 * 5. SECONDARY ARCHIVE WORKS REQUIRING CLIENT CONFIRMATION
 */
export const SECONDARY_CONFIRMATION_PROJECTS = [
  {
    id: 'hospital-complex',
    projectNumber: 'ARC-09',
    title: 'Healthcare Hospital Complex',
    category: 'Academic Studio / Institutional Healthcare',
    academicContext: 'Bachelor of Architecture Studio',
    year: '2024',
    location: {
      name: 'India (Specific Site Unconfirmed)',
      country: 'India',
    },
    rawModel: 'HOSPITAL_NEW01/3D/SITE HOSPITAL_02.rvt (Revit BIM, 11.06 MB)',
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    note: 'Present in client archive with 504 MB data (Revit BIM + 19 renders), listed on portfolio Table of Contents, but no project spread.',
  },
  {
    id: 'highway-motel-restaurant',
    projectNumber: 'ARC-10',
    title: 'Highway Motel, Dhaba & Restaurant',
    category: 'Academic Studio (ARC-237) / Transit Hospitality',
    academicContext: '3rd/4th Semester',
    year: '2023',
    location: {
      name: 'Highway Transit Corridor, India',
      country: 'India',
    },
    publicationStatus: 'pending-client-confirmation',
    archiveVisible: true,
    note: 'Present in client archive under OTHER PROJECTS, listed on portfolio Table of Contents, but omitted from primary spread.',
  },
];

/**
 * 6. FACTUALLY VERIFIED ARCHITECT RESUME & CREDENTIALS
 */
export const ARCHITECT_INFO = {
  name: 'SARAVANAKUMAR K',
  title: 'Graduate Architect',
  degree: 'Bachelor of Architecture (B.Arch)',
  institution: 'Lovely School of Architecture and Design, Lovely Professional University (LPU), Punjab',
  period: '2021 – 2026',
  baseLocation: 'India',
  email: 'saravanaarchitecture@gmail.com',
  phone: '+91 8778621993',
  linkedin: 'https://www.linkedin.com/in/architect-saravanakumar',
  portfolioLink: 'https://shorturl.at/voWs5',
  coordinates: 'Architecture Shaped by Place',
  internship: {
    firm: 'Architect Hafeez Contractor (AHC)',
    location: 'Mumbai, Maharashtra, India',
    role: 'Intern Architect',
    period: 'Jun 2025 – Nov 2025',
    scope: 'Large-scale residential townships, commercial high-rises, waterfront campuses, and master planning schemes',
    projectsCount: 8,
  },
  profile:
    'Graduate Architect with hands-on experience gained through academic projects, design competitions, and an architectural internship at Architect Hafeez Contractor. Experienced in concept design, spatial planning, architectural documentation, 3D modeling, and visualization across residential, commercial, hospitality, and urban design projects.',
  philosophy:
    'Architecture is not an autonomous form dropped onto neutral terrain; it is an enduring conversation with topography, cultural memory, and ecological reality.',
  softwareProficiency: [
    { category: 'BIM & Modeling', tools: ['Revit', 'Rhino 3D', 'SketchUp', 'AutoCAD'] },
    { category: 'Parametric', tools: ['Grasshopper', 'Computational Logic'] },
    { category: 'Visualization', tools: ['V-Ray', 'Lumion', 'Enscape', 'Photoshop'] },
    { category: 'Design Suite', tools: ['InDesign', 'Illustrator', 'Lightroom'] },
  ],
};
