# IMPLEMENTATION BLUEPRINT
## Premium Interactive Architectural Portfolio
### Client: SARAVANAKUMAR K — Graduate Architect

**Document Reference:** `docs/research/IMPLEMENTATION_BLUEPRINT.md`  
**Primary Creative Authority:** `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md`  
**Technical Architecture Authority:** `docs/research/TECHNICAL_READINESS.md`  
**Asset Baseline:** `docs/research/CLIENT_ASSET_AUDIT.md`  
**Date:** September 12, 2026  
**Role:** Lead Systems Architect & Senior Creative Technologist  
**Status:** Construction Blueprint Locked — Ready for Phase 0 Execution  
**Compliance Mandate:** Zero application source code created. Zero npm packages installed. The 2.04 GB client archive (`client-assets/`) remains 100% read-only and untouched.

---

## EXECUTIVE SUMMARY & PURPOSE

This document serves as the **definitive construction drawing** for Saravanakumar K's architectural portfolio platform: **"ARCHITECTURE SHAPED BY PLACE"**.

Every architectural layer, directory boundary, routing rule, data schema, 3D pipeline, GSAP animation timeline, responsive breakpoint, performance budget, and validation gate is specified herein. Another developer or autonomous AI agent must be able to follow this blueprint sequentially from Step 0 to Step 21 without inventing architecture, introducing unapproved dependencies, altering the visual hierarchy, or guessing data relationships.

---

## TABLE OF CONTENTS

1. [1. PROJECT ARCHITECTURE](#1-project-architecture)
2. [2. FOLDER STRUCTURE & ASSET SEPARATION](#2-folder-structure--asset-separation)
3. [3. ROUTING ARCHITECTURE](#3-routing-architecture)
4. [4. COMPONENT ARCHITECTURE & BOUNDARIES](#4-component-architecture--boundaries)
5. [5. PROJECT DATA ARCHITECTURE (SINGLE SOURCE OF TRUTH)](#5-project-data-architecture-single-source-of-truth)
6. [6. HOMEPAGE ARCHITECTURE (EXHIBITION JOURNEY)](#6-homepage-architecture-exhibition-journey)
7. [7. GLOBE ARCHITECTURE (SIGNATURE 01)](#7-globe-architecture-signature-01)
8. [8. MÖBIUS 3D ARCHITECTURE (SIGNATURE 02)](#8-mobius-3d-architecture-signature-02)
9. [9. CULTURAL OASIS BUILD REVEAL (SIGNATURE 03)](#9-cultural-oasis-build-reveal-signature-03)
10. [10. RIBBON OF LIFE ARCHITECTURE](#10-ribbon-of-life-architecture)
11. [11. FLOW SPIRE ARCHITECTURE](#11-flow-spire-architecture)
12. [12. ANIMATION SYSTEM & CHOREOGRAPHY](#12-animation-system--choreography)
13. [13. RESPONSIVE ARCHITECTURE & BREAKPOINTS](#13-responsive-architecture--breakpoints)
14. [14. PERFORMANCE ARCHITECTURE & LIFECYCLE](#14-performance-architecture--lifecycle)
15. [15. SELECTIVE ASSET PIPELINE](#15-selective-asset-pipeline)
16. [16. STATE MANAGEMENT ARCHITECTURE](#16-state-management-architecture)
17. [17. ACCESSIBILITY SPECIFICATIONS](#17-accessibility-specifications)
18. [18. SEO & METADATA ARCHITECTURE](#18-seo--metadata-architecture)
19. [19. ERROR HANDLING & FAILURE STATES](#19-error-handling--failure-states)
20. [20. STEP-BY-STEP IMPLEMENTATION ORDER](#20-step-by-step-implementation-order)
21. [21. VALIDATION GATES (QUALITY GATES)](#21-validation-gates-quality-gates)
22. [22. NON-NEGOTIABLE DECISION GUARDRAILS](#22-non-negotiable-decision-guardrails)
23. [23. FINAL TECHNOLOGY SPECIFICATION TABLE](#23-final-technology-specification-table)

---


---

## SOURCE-OF-TRUTH HIERARCHY

All architectural, narrative, and technical assertions must strictly respect the following governance hierarchy:

```
1. Actual files inside client-assets/            [PRIMARY PHYSICAL REALITY]
2. CLIENT_ASSET_AUDIT.md                         [VERIFIED FORENSIC INVENTORY]
3. Client portfolio PDF / portfolio page assets  [CLIENT'S PRESENTATION SPREADS]
4. Client resume                                 [CLIENT'S PROFESSIONAL CV]
5. MASTER_CREATIVE_DIRECTION_FINAL.md            [LOCKED ART DIRECTION]
6. IMPLEMENTATION_BLUEPRINT.md                   [CONSTRUCTION SPECIFICATIONS]
7. AI / model assumptions                       [LOWEST - NEVER OVERRIDES ABOVE]
```
> [!IMPORTANT]
> Lower-level documentation must NEVER override verified client source material. Any specification, dimension, or architectural claim not directly corroborated by client files is subject to verification.

### RAW SOURCE MODEL VS. FUTURE OPTIMIZED WEB MODEL STATUS

| Project | Raw Source Model (`client-assets/`) | Source Format & Size | Status | Web GLB Asset (`public/assets/models/`) | Web Asset Status |
|---|---|---|---|---|---|
| **Möbius Pavilion** | `On the path to Rediscovery_06/3D/MOBIUS_03.3dm` | Rhino 3D (11.72 MB) | **EXISTS (Verified)** | `mobius_pavilion.glb` | **DOES NOT EXIST YET** (Phase 4 export) |
| **Cultural Oasis** | `Cultural Oasis_01/3D/SITE 3D_09F.skp` | SketchUp (116.62 MB) | **EXISTS (Verified)** | `cultural_oasis_strata.glb` | **DOES NOT EXIST YET** (Phase 4 export) |
| **Ribbon of Life** | `RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm` | Rhino 3D (45.75 MB) | **EXISTS (Verified)** | `technopark_tower.glb` | **DOES NOT EXIST YET** (Phase 4 export) |
| **Eco Resort** | `Eco ressort_03/3D/SITE_3D_02.rvt` | Revit BIM (31.10 MB) | **EXISTS (Verified)** | N/A (Revit export needed) | **NOT YET CONVERTED** (Client FBX dependency) |
| **Hospital Campus**| `HOSPITAL_NEW01/3D/SITE HOSPITAL_02.rvt` | Revit BIM (11.06 MB) | **EXISTS (Verified)** | N/A (Revit export needed) | **NOT YET CONVERTED** (Secondary archive) |
| **Flow Spire** | `WATCH TOWER_FLOW SPIRE_05/3D/` | Empty directory | **RAW 3D UNAVAILABLE** | N/A | **NOT PLANNED** (Drawing-led vector reveal) |

### FOLDER NAMES VS. PUBLIC DISPLAY TITLES
Do not assume that archival directory names are the final public titles:
* `RIBBON OF LIFE_THESIS_02` contains a Rhino model; portfolio spread (Pages 10–15) is titled **"PROJECT 02_ Techno-park"**; public case study title is **"Ribbon of Life (Technopark Phase IV)"** [Title to VERIFY with client].
* `WATCH TOWER_FLOW SPIRE_05` corresponds to portfolio spread (Pages 22–27) titled **"PROJECT 04_ Watchtower"**; public case study title is **"Flow Spire"** [Title to VERIFY with client].
* `Eco ressort_03` is spelled with double-s in the filesystem; portfolio spread (Pages 16–21) is titled **"Echo ressort"**; public case study title is **"Eco Resort & Wellness Institute"** [Title to VERIFY with client].
* `Cultural Oasis_01` corresponds to portfolio spread (Pages 04–09) titled **"PROJECT 01_ CULTURAL OIASIS"**; public title is **"Cultural Oasis"**.
* `On the path to Rediscovery_06` corresponds to portfolio spread (Pages 28–30) titled **"PROJECT 05_ TPOR"** (120-Hours competition); public title is **"On the Path to Rediscovery (Möbius Pavilion)"**.

---

## 1. PROJECT ARCHITECTURE

The application is structured as a high-performance, single-page application (SPA) running in modern browsers with client-side routing, dedicated WebGL rendering stages, and editorial typography.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DOM & EDITORIAL UI LAYER                           │
│  (React 19 • Vanilla CSS Tokens • CSS Modules • Monograph Typography)       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                         GSAP 3 + SCROLLTRIGGER PIPELINE
                    (Pinned Timelines • Scrubbed Sequences)
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌───────────────┐              ┌───────────────┐              ┌───────────────┐
│ GLOBE CANVAS  │              │ MÖBIUS VIEWER │              │ BUILD REVEAL  │
│ (Three.js/R3F)│              │ (Three.js/R3F)│              │ (Three.js/R3F)│
└───────┬───────┘              └───────┬───────┘              └───────┬───────┘
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       ▼
                     DISPOSABLE WEBGL 2 RENDERING ENGINE
            (frameloop="demand" • DPR Clamped [1, 1.5] • Context Guard)
```

### 1.1 Technology Responsibilities

| Technology | Responsibility & Boundaries | What It Must NOT Do |
|---|---|---|
| **React 19** | Component lifecycle, DOM tree composition, route state, declarative UI structure, asset preloading. | Must NOT handle frame-by-frame 3D animation inside React state loops. |
| **Vite 6** | Build tool, Rollup bundler, sub-second HMR dev server, asset URL resolution (`?url`). | Must NOT be configured with heavy server-side rendering (SSR) plugins. |
| **Modern JavaScript (ESM)** | Business logic, coordinate transformations, data filtering, lightweight event handling. | No heavy TypeScript transpilation layers; pure native ES2024 modules. |
| **Vanilla CSS + Tokens** | Global design system (`tokens.css`), typography clamps, semantic color tokens, architectural grids. | No utility framework classes; no CSS-in-JS runtime overhead. |
| **CSS Modules** | Component-scoped styling (`*.module.css`), layout encapsulation, isolation of hover states. | No global style pollution. |
| **Three.js (r170+)** | WebGL 2 rendering, scene graphs, custom point-cloud shaders, geometry buffers, material instances. | Must NOT run unconstrained animation loops when canvases are idle or offscreen. |
| **React Three Fiber (v9)** | Declarative Three.js scene tree, unmount cleanup, camera rig coupling. | Must NOT mount multiple active full-screen canvases simultaneously. |
| **@react-three/drei** | Specialized 3D helpers (`useGLTF`, `OrbitControls`, `Float`, `Center`, `Preload`). | Do NOT use generic Drei gizmos or debug helpers in production. |
| **GSAP 3 + ScrollTrigger** | Pinned editorial storytelling, scrubbed build reveals, entrance choreographies, camera tweens. | Must NOT cause layout thrashing; only animate transforms and opacity. |
| **@gsap/react** | `useGSAP()` hook for automatic timeline scoping and context cleanup on unmount. | Never use raw `useEffect` for GSAP without explicit `ctx.revert()`. |
| **React Router v7** | URL routing, route-level code splitting via `React.lazy`, scroll restoration. | No multi-page full reloads. |
| **Draco GLB** | 3D asset container format; compact binary meshes with lossless attribute compression. | Never load raw `.obj`, `.fbx`, `.3dm`, or `.skp` directly in browser. |
| **WebP (Srcset)** | Multi-resolution photography and render delivery (400w, 1200w, 2400w). | Never serve uncompressed 50–66 MB PNG source files. |
| **Python / Pillow Pipeline** | Automated local batch asset conversion and resizing (stored on `D:`). | Never modifies or touches the read-only `client-assets/` directory. |

---

## 2. FOLDER STRUCTURE & ASSET SEPARATION

To guarantee that the 2.04 GB source archive remains pristine, assets and source code are strictly segregated across physical directory boundaries:

```
d:/Saravana_Architect_Portfolio/
│
├── client-assets/                 ← [SOURCE ARCHIVE: 2.04 GB — READ-ONLY]
│   ├── (Untouched raw client files, Rhino, SketchUp, Revit, raw PNGs)
│
├── docs/                          ← [RESEARCH & ARCHITECTURE SPECIFICATIONS]
│   ├── client/                    (portfolio.pdf, resume.pdf)
│   └── research/                  (CLIENT_ASSET_AUDIT, MASTER_CREATIVE_DIRECTION,
│                                   TECHNICAL_READINESS, IMPLEMENTATION_BLUEPRINT)
│
├── public/                        ← [WEB STATIC DERIVATIVES]
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/                    ← Generated optimized web derivatives only
│       ├── images/
│       │   ├── hero/              (hero_400.webp, hero_1200.webp, hero_2400.webp)
│       │   ├── projects/          (Curated project renders & drawings)
│       │   └── craft/             (24 hand-cut Katra model photos)
│       ├── models/
│       │   ├── mobius_pavilion.glb
│       │   └── cultural_oasis_strata.glb
│       └── fonts/                 (Self-hosted or Google Fonts webfont cache)
│
├── scripts/                       ← [LOCAL ASSET CONVERSION WORKFLOWS]
│   ├── optimize_images.py         (Pillow batch conversion to WebP srcset)
│   └── export_glb_headless.py     (Blender Python headless mesh decimation & Draco export)
│
├── src/                           ← [APPLICATION SOURCE CODE]
│   ├── app/
│   │   ├── App.jsx                (Main application shell & router outlet)
│   │   ├── App.module.css
│   │   └── main.jsx               (Vite entry point)
│   │
│   ├── animations/                (GSAP timeline helpers & transition configs)
│   │   ├── pageTransitions.js
│   │   ├── scrollTriggers.js
│   │   └── textReveals.js
│   │
│   ├── components/                (Reusable modular building blocks)
│   │   ├── common/                (Button, SectionHeader, Tag, CursorFollower, LoadingGate)
│   │   ├── layout/                (SiteHeader, SiteFooter, NavigationDrawer, PageContainer)
│   │   ├── editorial/             (ManifestoQuote, DrawingPlate, TechnicalMetadataTable)
│   │   ├── project/               (ProjectCard, ProjectGrid, ProjectStageNav, ProjectStats)
│   │   └── media/                 (ResponsiveImage, ImageLightbox, CADPlanViewer)
│   │
│   ├── data/                      (Single source of truth data records)
│   │   ├── projectsData.js        (Unified dataset for Globe and Catalogue)
│   │   └── credentialsData.js     (Education, Novatr certifications, capabilities matrix)
│   │
│   ├── hooks/                     (Custom React hooks)
│   │   ├── useGlobeData.js
│   │   ├── useReducedMotion.js
│   │   ├── useViewport.js
│   │   └── useWebGLAvailability.js
│   │
│   ├── pages/                     (Route-level view components)
│   │   ├── HomePage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ProjectDetailPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── sections/                  (Homepage structured exhibition sections)
│   │   ├── OpeningManifesto.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AtlasGlobeSection.jsx
│   │   ├── FlagshipProjectsSection.jsx
│   │   ├── PhysicalCraftSection.jsx
│   │   ├── HafeezArchiveSection.jsx
│   │   ├── AboutPreviewSection.jsx
│   │   └── ContactClosingSection.jsx
│   │
│   ├── styles/                    (Design system & tokens)
│   │   ├── tokens.css             (CSS variables: typography, colors, elevations)
│   │   ├── reset.css              (Modern CSS reset)
│   │   └── typography.css         (Cormorant Garamond, Inter, DM Mono styles)
│   │
│   ├── three/                     (Three.js & R3F canvas subsystems)
│   │   ├── common/                (LightingSetup, CameraRig, CanvasErrorBoundary, DisposeGuard)
│   │   ├── globe/                 (GlobeCanvas, PointCloudLandmass, CoordinatePins, ClusterMarker)
│   │   ├── mobius/                (MobiusCanvas, MobiusGeometry, RunicSoffit, MaterialModes)
│   │   └── buildReveal/           (BuildRevealCanvas, StratifiedLayers, ConstructionTimeline)
│   │
│   └── utils/                     (Math, projection, and formatting helpers)
│       ├── geoCoordinates.js      (Lat/Lng to 3D Cartesian spherical projection)
│       ├── formatters.js          (Coordinates & metric unit formatting)
│       └── webglSupport.js        (GPU & context detection)
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 3. ROUTING ARCHITECTURE

Client-side routing is handled via `react-router-dom` v7. All view routes are code-split using `React.lazy()` to ensure the initial JavaScript payload remains below **180 KB** (gzipped).

```
SITE ROUTE MATRIX
├── /                           ← HomePage (Assembled exhibition flow)
├── /projects                   ← ProjectsPage (Comprehensive filterable catalogue)
├── /projects/:slug             ← ProjectDetailPage (Deep-dive 8-stage case study)
│   ├── :slug = "cultural-oasis"          (Build Reveal Canvas active)
│   ├── :slug = "on-the-path-to-rediscovery" (Möbius 3D Maquette active)
│   ├── :slug = "ribbon-of-life"          (Vertical Tower Inspection)
│   ├── :slug = "flow-spire"              (Vector CAD Plate Reveal)
│   └── :slug = [other projects]          (Editorial monograph format)
├── /about                      ← AboutPage (Architect credentials & BIM matrix)
├── /contact                    ← ContactPage (Inquiry salon & correspondence)
└── *                           ← NotFoundPage (Architectural 404 with return link)
```

### 3.1 Route Characteristics & Performance Table

| Route | View Component | WebGL Required? | 3D Asset Payload | Code-Split Chunk? |
|---|---|---|---|---|
| `/` | `HomePage` | Yes (`<GlobeCanvas />` only) | Low (~180 KB point coordinates) | Standard bundle |
| `/projects` | `ProjectsPage` | No (Pure DOM + WebP) | 0 KB (Zero WebGL) | Lazy loaded |
| `/projects/on-the-path-to-rediscovery` | `ProjectDetailPage` | Yes (`<MobiusCanvas />`) | Quality-tested GLB (~2.5–3.5 MB) | Lazy loaded |
| `/projects/cultural-oasis` | `ProjectDetailPage` | Yes (`<BuildRevealCanvas />`) | Stratified GLB (~4.5–6.5 MB) | Lazy loaded |
| `/projects/ribbon-of-life` | `ProjectDetailPage` | Optional (Tower model) | Isolated Tower GLB (~3.5–5.0 MB) | Lazy loaded |
| `/projects/:slug` (Other) | `ProjectDetailPage` | No (Drawing viewers) | 0 KB (WebP CAD plates only) | Lazy loaded |
| `/about` | `AboutPage` | No | 0 KB | Lazy loaded |
| `/contact` | `ContactPage` | No | 0 KB | Lazy loaded |
| `*` | `NotFoundPage` | No | 0 KB | Lazy loaded |

### 3.2 Route Transition & WebGL Disposal Protocol
When transitioning between routes:
1. An incoming route triggers a **150ms cross-fade** via an overlay curtain (`--color-ground`, `#0A0906`).
2. The unmounting route unmounts its WebGL Canvas. The `DisposeGuard` component traverses all scene objects, calling `.dispose()` on geometries, textures, and materials.
3. The browser window resets scroll position (`window.scrollTo(0, 0)`).
4. The destination page renders its static editorial DOM content first.
5. If the destination page contains a 3D canvas, it initializes asynchronously inside a `<Suspense>` boundary without blocking the UI.

---

## 4. COMPONENT ARCHITECTURE & BOUNDARIES

Components are strictly classified by architectural responsibility to prevent cross-cutting dependency tangles:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. GLOBAL UI & LAYOUT (SiteHeader • SiteFooter • NavigationDrawer • Cursor) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. EDITORIAL MONOGRAPH (ManifestoQuote • DrawingPlate • TechnicalMetaTable) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. PROJECT SHOWCASE (ProjectCard • ProjectGrid • StageNav • Lightbox)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. THREE.JS SPECIALIZED CANVASES (GlobeCanvas • MobiusCanvas • BuildReveal) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. ACCESSIBILITY & FALLBACKS (CanvasErrorBoundary • ReducedMotionFallback)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Component Inventory & Responsibilities

| Component Name | Category | Props / Inputs | Responsibility & Boundary |
|---|---|---|---|
| `<SiteHeader />` | Layout | `activeSection`, `transparent` | Minimalist horizontal header; contains monogram, section anchor links, and mobile drawer toggle. Dims to 30% opacity during 3D inspection. |
| `<NavigationDrawer />` | Layout | `isOpen`, `onClose` | Full-screen mobile overlay featuring oversized `Cormorant Garamond` typography and direct coordinate links. |
| `<SiteFooter />` | Layout | None | The "Closing Salon" — direct email, LinkedIn link, copyright, and colophon. |
| `<ResponsiveImage />` | Media | `srcMap`, `alt`, `aspectRatio` | Generates HTML `<picture>` element with `400w`, `1200w`, and `2400w` WebP sources. Handles lazy loading and blur-up placeholder. |
| `<DrawingPlate />` | Editorial | `plateNumber`, `title`, `scale`, `src` | Architectural drawing viewer; renders title blocks, CAD scale tags (`1:500`), and zoom inspection button. |
| `<TechnicalMetaTable />`| Editorial | `data` (key-value pairs) | Formatted table displaying typology, coordinates, site area, height, materials, and credentials. |
| `<ProjectCard />` | Project | `project`, `variant` (card / list) | Editorial project card featuring thumbnail, location tag, title, and hover line drawing animation. |
| `<GlobeCanvas />` | 3D / Atlas | `projects`, `selectedId`, `onSelect` | R3F canvas housing the point-cloud earth, 15° coordinate rings, and clickable project pins. |
| `<LocationPreviewCard />`| Globe UI | `project`, `position` | Floating card appearing when hovering or tapping a globe pin; shows title, location, coordinates, and "View Story" CTA. |
| `<MobiusCanvas />` | 3D / Maquette | `mode` (clay / wire / twilight) | Isolated R3F canvas rendering `MOBIUS_03.glb`. Houses directional runic illumination and camera orbit constraints. |
| `<ModelModeSwitch />` | 3D UI | `currentMode`, `onChange` | Minimalist segment controller allowing the user to switch between Bone Clay, Wireframe, and Twilight modes. |
| `<BuildRevealCanvas />`| 3D / Reveal | `progress` (0.0 to 1.0) | Dedicated R3F stage mapping GSAP ScrollTrigger scrub progress to stratified structural layer offsets. |
| `<LoadingGate />` | Feedback | `progress`, `label` | Architectural CAD loading indicator; displays wireframe glyph progress and vertex counts during model streaming. |
| `<CanvasErrorBoundary />`| Fallback | `fallbackImage` | Gracefully catches WebGL crashes or unsupported browsers, swapping the canvas for a high-res static render. |

---

## 5. PROJECT DATA ARCHITECTURE (SINGLE SOURCE OF TRUTH)

To guarantee that the Globe, the Project Catalogue, and the individual Case Study pages remain in permanent synchronization, all project metadata is managed in a single, strictly validated module: `src/data/projectsData.js`.

### 5.1 The Data Schema

```javascript
// src/data/projectsData.js
export const PROJECTS_DATA = [
  {
    id: "mobius-oslo",
    slug: "on-the-path-to-rediscovery",
    number: "PROJ-01",
    title: "On the Path to Rediscovery",
    subTitle: "Parametric Cultural Pavilion & Old Norse Memory Forum",
    typology: "Parametric Cultural Pavilion",
    locationName: "Oslo, Norway",
    siteContext: "Tullinløkka Square (between Historical Museum & National Gallery)",
    coordinates: [59.9167, 10.7364], // [Latitude, Longitude]
    year: "2025",
    competition: "120-Hours International Architectural Competition",
    tier: "FLAGSHIP",
    featured: true,
    has3DModel: true,
    modelAsset: "/assets/models/mobius_pavilion.glb",
    heroImage: {
      src400: "/assets/images/projects/mobius/hero_400.webp",
      src1200: "/assets/images/projects/mobius/hero_1200.webp",
      src2400: "/assets/images/projects/mobius/hero_2400.webp",
      alt: "Cinematic twilight rendering of the Möbius Pavilion in Tullinløkka Square"
    },
    thumbnail: "/assets/images/projects/mobius/thumb.webp",
    stats: {
      span: "38.5 m [VERIFY WITH CLIENT / SOURCE]",
      surfaceArea: "1,420 sqm [VERIFY WITH CLIENT / SOURCE]",
      primaryMaterial: "Engineered Timber Soffit & Basalt Base",
      softwareUsed: "Rhino 7, Grasshopper, Twinmotion"
    },
    narrativeStages: [
      { id: "01-place", title: "01 / PLACE", heading: "Tullinløkka Square, Oslo", summary: "An institutional void between Oslo's Historical Museum and National Gallery." },
      { id: "02-question", title: "02 / QUESTION", heading: "The Art of Losing", summary: "What happens to a civilization when its ancient language falls silent?" },
      { id: "03-research", title: "03 / RESEARCH", heading: "Old Norse Epigraphy", summary: "Linguistic decay, runic stones, and Percy Bysshe Shelley's Ozymandias." },
      { id: "04-concept", title: "04 / CONCEPT", heading: "The Continuous Strip", summary: "A topological Möbius surface with neither beginning nor end." },
      { id: "05-parametric", title: "05 / PARAMETRIC", heading: "Grasshopper Logic", summary: "Parametric vector transformation generating ruled curvature." },
      { id: "06-model", title: "06 / 3D MAQUETTE", heading: "The Runic Soffit", summary: "Interactive examination revealing ancient runes beneath the arch." },
      { id: "07-architecture", title: "07 / ARCHITECTURE", heading: "The Sunken Forum", summary: "Acoustic gathering bowl, rain reflection pool, and public promenade." },
      { id: "08-result", title: "08 / RESULT", heading: "Dusk Atmospheric Renders", summary: "Four evocative twilight perspectives of the glowing timber structure." }
    ],
    drawings: [
      { plateNumber: "PL-01", title: "Parametric Soffit Unroll", scale: "1:200", src: "/assets/images/projects/mobius/drawings/mobius_03_plate.webp" },
      { plateNumber: "PL-02", title: "Site Plan & Urban Alignment", scale: "1:500", src: "/assets/images/projects/mobius/drawings/mobius_04_plate.webp" }
    ],
    credits: {
      leadArchitect: "Saravanakumar K",
      competition: "120-Hours (March 2025)",
      academicInstitution: "Lovely Professional University"
    }
  },
  {
    id: "cultural-oasis-katra",
    slug: "cultural-oasis",
    number: "PROJ-02",
    title: "Cultural Oasis",
    subTitle: "Pilgrimage Respite & Urban Void Regeneration",
    typology: "Urban Master Planning & Civic Infrastructure",
    locationName: "Katra, Jammu & Kashmir",
    siteContext: "Vaishno Devi Base Transit Node",
    coordinates: [32.9930, 74.9318],
    year: "2024",
    tier: "FLAGSHIP",
    featured: true,
    has3DModel: true,
    hasBuildReveal: true,
    modelAsset: "/assets/models/cultural_oasis_strata.glb",
    heroImage: {
      src400: "/assets/images/projects/katra/hero_400.webp",
      src1200: "/assets/images/projects/katra/hero_1200.webp",
      src2400: "/assets/images/projects/katra/hero_2400.webp",
      alt: "Illuminated sunken amphitheatre and lotus court at night"
    },
    thumbnail: "/assets/images/projects/katra/thumb.webp",
    stats: {
      capacity: "12,000 Pilgrims Daily [VERIFY WITH CLIENT / SOURCE]",
      siteArea: "4.8 Hectares [VERIFY WITH CLIENT / SOURCE]",
      elevation: "+875 m AMSL [VERIFY WITH CLIENT / SOURCE]",
      structuralSystem: "Rammed Earth, Local Basalt, Hipped Timber Trusses"
    },
    narrativeStages: [
      { id: "01-place", title: "01 / PLACE", heading: "Katra Transit Hub", summary: "Chaotic pilgrimage gateway experiencing extreme crowd density." },
      { id: "02-question", title: "02 / QUESTION", heading: "Regenerating Dead Voids", summary: "Can forgotten urban voids become civic sanctuaries of respite?" },
      { id: "03-research", title: "03 / RESEARCH", heading: "Kevin Lynch Urban Analysis", summary: "Path, Edge, Node, District, Landmark mapping across 5 analytical studies." },
      { id: "04-concept", title: "04 / CONCEPT", heading: "Sunken Sanctuary", summary: "Stepped courtyards that buffer urban acoustics while honoring vernacular forms." },
      { id: "05-craft", title: "05 / CRAFT", heading: "Hand-Cut Topographic Model", summary: "24 photographic studies of the hand-built chipboard contour maquette." },
      { id: "06-reveal", title: "06 / BUILD REVEAL", heading: "Stratified Construction", summary: "Scroll-driven assembly: Blueprint → Substructure → Colonnade → Rooms → Roof." },
      { id: "07-architecture", title: "07 / ARCHITECTURE", heading: "The Amphitheatre & Shrines", summary: "Sunken amphitheatre, central lotus water court, and perimeter dormitories." },
      { id: "08-result", title: "08 / RESULT", heading: "Night Illumination", summary: "Night renders showing lantern-lit colonnade and reflective water." }
    ],
    craftPhotosCount: 24,
    drawings: [
      { plateNumber: "PL-01", title: "Ground & Plinth Master Plan", scale: "1:250", src: "/assets/images/projects/katra/drawings/plan_ground.webp" },
      { plateNumber: "PL-02", title: "First Floor Guest Accommodation", scale: "1:250", src: "/assets/images/projects/katra/drawings/plan_l1.webp" },
      { plateNumber: "PL-03", title: "Exploded Structural Axonometric", scale: "NTS", src: "/assets/images/projects/katra/drawings/exploded_axono.webp" }
    ],
    credits: {
      leadArchitect: "Saravanakumar K",
      academicRole: "Architectural Thesis",
      institution: "Lovely Professional University"
    }
  },
  {
    id: "ribbon-of-life-kerala",
    slug: "ribbon-of-life",
    number: "PROJ-03",
    title: "Ribbon of Life",
    subTitle: "Mixed-Use Innovation Campus & 42-Storey Biomimetic Tower",
    typology: "Commercial High-Rise & Master Plan",
    locationName: "Thiruvananthapuram, Kerala",
    siteContext: "Technopark Phase IV (Technocity)",
    coordinates: [8.5241, 76.9366],
    year: "2025",
    tier: "FLAGSHIP",
    featured: true,
    has3DModel: true,
    modelAsset: "/assets/models/technopark_tower.glb",
    heroImage: {
      src400: "/assets/images/projects/technopark/hero_400.webp",
      src1200: "/assets/images/projects/technopark/hero_1200.webp",
      src2400: "/assets/images/projects/technopark/hero_2400.webp",
      alt: "Aerial perspective of the Ribbon of Life master plan and commercial skyscraper"
    },
    thumbnail: "/assets/images/projects/technopark/thumb.webp",
    stats: {
      height: "168 m [VERIFY] (42 Storeys)",
      residentialUnits: "1,100 Units",
      siteArea: "22 Hectares [VERIFY WITH CLIENT / SOURCE]",
      sustainability: "GRIHA 5-Star Benchmark [VERIFY WITH CLIENT / SOURCE]"
    },
    narrativeStages: [
      { id: "01-place", title: "01 / PLACE", heading: "Kerala Brain Drain", summary: "96.2% literacy rate juxtaposed against 70% youth talent migration." },
      { id: "02-question", title: "02 / QUESTION", heading: "Retaining Innovation", summary: "How can architecture synthesize work, living, and wellness to retain elite minds?" },
      { id: "03-research", title: "03 / RESEARCH", heading: "Government Tender Analysis", summary: "Verified KSITIL tender brief requirements and urban transit corridors." },
      { id: "04-concept", title: "04 / CONCEPT", heading: "The Unbroken Ribbon", summary: "Continuous elevated loop connecting IT Work, Residential, Wellness, and Recreation." },
      { id: "05-tower", title: "05 / THE TOWER", heading: "42-Storey Biomimetic Twist", summary: "Aerodynamic tower rotating to optimize Arabian Sea coastal breezes." },
      { id: "06-masterplan", title: "06 / MASTER PLAN", heading: "1,100 Residential Units", summary: "Elevated pedestrian skyways, sports facilities, and restored ecological lake." },
      { id: "07-architecture", title: "07 / ARCHITECTURE", heading: "The Vertical Ecosystem", summary: "Podium transit, Level 15 Sky Gardens, Level 30 executive suites, Level 42 crown." },
      { id: "08-result", title: "08 / RESULT", heading: "Campus Realization", summary: "Full campus bird's-eye render showing the unified continuous ribbon." }
    ],
    credits: {
      leadArchitect: "Saravanakumar K",
      briefSource: "Kerala State IT Infrastructure Ltd (KSITIL) Tender",
      academicInstitution: "Lovely Professional University"
    }
  },
  {
    id: "flow-spire-mumbai",
    slug: "flow-spire",
    number: "PROJ-04",
    title: "Flow Spire",
    subTitle: "Aerodynamic High-Density Tropical High-Rise",
    typology: "High-Density Residential & Commercial",
    locationName: "Mumbai, Maharashtra",
    coordinates: [19.0760, 72.8777],
    year: "2024",
    tier: "STRONG",
    featured: true,
    has3DModel: false, // 3D source model not confirmed in archive; using vector CAD reveal
    hasDrawingReveal: true,
    heroImage: {
      src400: "/assets/images/projects/flow-spire/hero_400.webp",
      src1200: "/assets/images/projects/flow-spire/hero_1200.webp",
      src2400: "/assets/images/projects/flow-spire/hero_2400.webp",
      alt: "Towering perspective of the aerodynamic Flow Spire facade in Mumbai"
    },
    thumbnail: "/assets/images/projects/flow-spire/thumb.webp",
    stats: {
      floors: "32 Storeys [VERIFY - Observation & Commercial Tower]",
      structuralSystem: "Diagrid Core & Dynamic Solar Shading Louvers",
      drawingsAvailable: "8 Verified Vector CAD Floor Plates"
    }
  },
  {
    id: "eco-resort-pune",
    slug: "eco-resort",
    number: "PROJ-05",
    title: "Eco Resort & Wellness Institute",
    subTitle: "Contoured Earth Architecture in Western Ghats",
    typology: "Sustainable Hospitality & Contoured Architecture",
    locationName: "Pune, Maharashtra",
    coordinates: [18.5204, 73.8567],
    year: "2023",
    tier: "STRONG",
    featured: true,
    has3DModel: false, // Revit model requires client FBX export; leading with renders & thesis
    heroImage: {
      src400: "/assets/images/projects/eco-resort/hero_400.webp",
      src1200: "/assets/images/projects/eco-resort/hero_1200.webp",
      src2400: "/assets/images/projects/eco-resort/hero_2400.webp",
      alt: "Stepped rammed-earth villas integrated into the Western Ghats hillside"
    },
    thumbnail: "/assets/images/projects/eco-resort/thumb.webp",
    stats: {
      thesisDocumentation: "107 MB GRIHA Green Rating Thesis",
      renderCount: "40 High-Resolution Views",
      environmentalFeatures: "Passive Thermal Mass, Rain Harvesting, Local Basalt Plinths"
    }
  },
  {
    id: "hafeez-archive",
    slug: "hafeez-contractor-internship",
    number: "ARCH-01",
    title: "Architect Hafeez Contractor (AHC) Portfolio",
    subTitle: "Professional Corporate Internship Archive (8 Live Commercial Projects)",
    typology: "Corporate Practice Monograph",
    locationName: "Mumbai / Thane / Pune / Gurugram",
    coordinates: [19.0760, 72.8777],
    year: "2025",
    tier: "ARCHIVE",
    featured: false,
    isArchive: true,
    heroImage: {
      src400: "/assets/images/projects/hafeez/hero_400.webp",
      src1200: "/assets/images/projects/hafeez/hero_1200.webp",
      src2400: "/assets/images/projects/hafeez/hero_2400.webp",
      alt: "Architect Hafeez Contractor commercial tower facade detail"
    },
    archiveProjects: [
      { name: "Ridgeview Residence", location: "Mumbai", role: "BIM Modeling & Facade Detailing" },
      { name: "Club House Pavilion", location: "Mumbai", role: "Design Development & Working Drawings" },
      { name: "Vertical Nexus Commercial", location: "Pune", role: "Floor Plate Optimization & Core Planning" },
      { name: "High-Density Residential Towers", location: "Thane", role: "BIM Coordination & Elevation Detailing" },
      { name: "Commercial Office Complex", location: "Thane", role: "Facade Engineering & Material Quantities" },
      { name: "Mixed-Use Development", location: "BKC, Mumbai", role: "Authority Presentation Drawings" },
      { name: "Corporate Headquarters", location: "Gurugram", role: "Structural Grid Coordination" },
      { name: "Coastal Hospitality Enclave", location: "Goa", role: "Site Section Studies" }
    ],
    credits: {
      firm: "Architect Hafeez Contractor (AHC)",
      role: "Architectural Intern (Jun–Nov 2025)",
      location: "Mumbai, India"
    }
  }
];
```

---

## 6. HOMEPAGE ARCHITECTURE (EXHIBITION JOURNEY)

The homepage is structured as an **architectural exhibition gallery**, guiding the visitor through a deliberate narrative progression from philosophy to physical form:

```
01 OPENING STATEMENT      [Dark ground • Philosophical manifesto]
↓
02 ARCHITECTURAL HERO     [Dark ground • Monumental serif title + ambient motion]
↓
03 THE ATLAS (GLOBE)      [Dark ground • Signature 01: Cartographic 3D Globe]
↓
04 SELECTED FLAGSHIPS     [Light paper • Editorial monograph catalogue cards]
↓
05 THE PHYSICAL CRAFT     [Dark ground • Spotlit gallery of 24 hand-cut model photos]
↓
06 PROFESSIONAL ARCHIVE   [Light paper • Architect Hafeez Contractor 8-project grid]
↓
07 THE ARCHITECT (ABOUT)  [Light chalk • Novatr BIM credentials & capabilities matrix]
↓
08 CONTACT SALON          [Dark ground • Direct correspondence invitation]
```

### 6.1 Section Specifications Table

| # | Section Name | Background | Animation Level | WebGL? | Key Assets & Content | Mobile Behavior |
|---|---|---|---|---|---|---|
| **01** | `OpeningManifesto` | `--color-ground` (`#0A0906`) | Level 1 | No | Manifesto quote: *"Architecture Shaped by Place"*. Single serif paragraph. | Clean centered text with 24px side gutters. |
| **02** | `HeroSection` | `--color-ground` | Level 2 | No | Full-bleed cinematic render (`Image18.png`), monumental display title, subtitle. | Scaled clamp typography; 85vh viewport height. |
| **03** | `AtlasGlobeSection` | `--color-ground` | **Level 3 (Signature)** | **Yes** | `<GlobeCanvas />`, point cloud landmass, 9 project coordinate pins, location cards. | Tappable pins or horizontal location swipe cards. |
| **04** | `FlagshipProjects` | `--color-paper` (`#F4F0E8`) | Level 2 | No | 3 curated flagship cards (Katra, Technopark, Möbius) with metric tags and CAD lines. | Single-column stacked cards. |
| **05** | `PhysicalCraft` | `--color-ground` | Level 2 | No | 24 photographic details of Katra hand-cut chipboard contour model. Horizontal scroll strip. | Touch-swipe horizontal carousel. |
| **06** | `HafeezArchive` | `--color-paper` | Level 1 | No | 8-project structured grid documenting corporate internship tenure at Architect Hafeez Contractor. | 2-column compact table. |
| **07** | `AboutPreview` | `--color-chalk` (`#E8E4DC`) | Level 1 | No | Architect portrait (`02_CV_PAGE.png`), Novatr BIM credentials, software matrix. | Stacked photo + credentials list. |
| **08** | `ContactSalon` | `--color-ground` | Level 1 | No | Minimalist closing statement, direct email, LinkedIn link, resume download button. | Large touch-friendly link targets. |

---

## 7. GLOBE ARCHITECTURE (SIGNATURE 01)

The cartographic globe is the master spatial index of the portfolio.

### 7.1 Mathematical Coordinate Projection
Latitude and Longitude are converted into Three.js 3D space using standard spherical trigonometry on a sphere of radius $R = 2.5$:

$$\begin{aligned}
\phi &= (90 - \text{lat}) \cdot \left(\frac{\pi}{180}\right) \\
\theta &= (\text{lng} + 180) \cdot \left(\frac{\pi}{180}\right) \\
x &= -(R \cdot \sin(\phi) \cdot \cos(\theta)) \\
z &= R \cdot \sin(\phi) \cdot \sin(\theta) \\
y &= R \cdot \cos(\phi)
\end{aligned}$$

### 7.2 The Mandatory Visual Validation Gate
Development must **STOP** and validate the globe visually before constructing complex interaction code:

```
[STEP 1: BUILD MINIMAL PROTOTYPE]
  Three.js Sphere (R=2.5) + ~18,000 Points Cloud + Basic Pin Markers
  ↓
[STEP 2: ART DIRECTION REVIEW]
  Evaluate aesthetic: Does it look like an architectural atlas?
  Verify that it does NOT look like a generic spinning blue-marble Earth.
  ↓
[STEP 3: CLARITY & PIN DISAMBIGUATION TEST]
  Check Mumbai/Thane clustering. Check Katra and Oslo readability.
  ↓
[STEP 4: PERFORMANCE & FAN NOISE AUDIT]
  Confirm frameloop="demand" operates at 0 FPS when idle.
  ↓
[STEP 5: MOBILE TOUCH AUDIT]
  Test touch orbit ergonomics on iOS Safari and Android Chrome.
  ↓
[GATE PASSED: PROCEED TO FULL TWO-WAY DATA COUPLING]
```

### 7.3 Visual & Shader Pipeline
* **Base Core:** Deep charcoal sphere (`#0A0906`), non-metallic, roughness 0.9.
* **Landmass Shader:** Three.js `Points` geometry. The vertex shader maps normalized continent UV data into point coordinates; the fragment shader renders circular antialiased chalk points (`rgba(232, 228, 220, 0.45)`) with subtle distance attenuation.
* **Atmospheric Limb:** Faint inverted Fresnel glow in Prussian blueprint (`#1A2B4A`, 8% opacity).
* **Project Pins:** Custom SVG crosshairs oriented to face the camera (`sprite.lookAt(camera)`). Active pins pulse with an inner luminescent crimson beacon (`#E03E48`).

---

## 8. MÖBIUS 3D ARCHITECTURE (SIGNATURE 02)

The Möbius Pavilion interactive viewer is the flagship 3D maquette experience.

### 8.1 Asset & Pipeline Specifications
* **Source Asset:** `client-assets/On the path to Rediscovery_06/3D/MOBIUS_03.3dm` (11.72 MB Rhino 3D).
* **Blender Export:** Extracted NURBS surfaces tessellated to optimize topology while preserving architectural silhouette, important details, shading quality, and interaction requirements. Exported via headless Blender script to Draco-compressed binary GLB (`/public/assets/models/mobius_pavilion.glb`).
* **Starting Target:** ~2.5–3.5 MB (strictly governed by **Visual Quality > File Size** to preserve crisp runic carving geometry).

### 8.2 The Runic Discovery Interaction
* The Old Norse runic characters are modeled directly into the soffit (underside) of the continuous ribbon.
* In normal eye-level view, the runes are hidden in shadow.
* When the visitor orbits the camera beneath the arch (`camera.position.y < model.position.y`), an upward-angled directional spotlight (`#F4F0E8`, intensity 1.8) grazes the soffit geometry. The runes catch the light, revealing the ancient poetry inscribed into the timber.

### 8.3 Material Modes (Interactive Switcher)

| Mode | Material Type | Appearance & Purpose |
|---|---|---|
| **Architectural Clay (Default)** | `MeshStandardMaterial` | Matte unglazed bone plaster (`#E8E4DC`), roughness 0.85, metalness 0.0. Emphasizes pure sculptural curvature. |
| **Technical Wireframe** | `MeshStandardMaterial` + `wireframe: true` | Translucent charcoal fill with chalk-line polygon edges (`#F4F0E8`, 40% opacity). Exposes parametric surface mesh. |
| **Twilight Atmosphere** | Custom PBR Material | Low-key dusk lighting with warm interior amber soffit glow (`#D97736`) and reflection plane, matching Oslo competition renders. |

### 8.4 Camera Controls & Constraints
* `OrbitControls` with momentum damping (`dampingFactor = 0.05`).
* `minDistance = 3.5`, `maxDistance = 12.0`.
* Vertical polar angle clamped: `minPolarAngle = Math.PI / 6` (30°), `maxPolarAngle = Math.PI / 2.05` (88°). This prevents the camera from inverting or dipping below ground level.

---

## 9. CULTURAL OASIS BUILD REVEAL (SIGNATURE 03)

The Build Reveal reconstructs the Cultural Oasis in Katra through an architectural construction sequence driven by the visitor's vertical scroll.

```
SCROLL PROGRESS (0.0 ──────────────────────────────────────────────────────── 1.0)
Layer 1: CAD Blueprint Grid & Site Contours (0.00 – 0.15)
Layer 2: Sunken Amphitheatre & Central Lotus Court (0.15 – 0.35)
Layer 3: Arched Perimeter Colonnade & Pilgrim Shrines (0.35 – 0.55)
Layer 4: Stepped Upper Dormitory Blocks (0.55 – 0.75)
Layer 5: Sloped Hipped Roof & Traditional Timber Dormers (0.75 – 0.90)
Layer 6: Atmospheric Cross-Dissolve to Night Render (0.90 – 1.00)
```

### 9.1 Stratified Layer Group Architecture
The model is authored in Blender from `client-assets/Cultural Oasis_01/3D/SITE 3D_09F.skp` into 5 discrete, named structural groups:
1. `group_blueprint`: Emissive wireframe ground contours (`#E8E4DC`).
2. `group_substructure`: Sunken circular amphitheatre plinth. (Initial position: $y = -1.2\text{m}$, translates to $y = 0.0\text{m}$).
3. `group_colonnade`: Arched perimeter colonnade. (Initial scale: 0.95, opacity: 0, animates to scale: 1.0, opacity: 1).
4. `group_rooms`: Upper guest accommodations and balconies. (Fades in from opacity 0 to 1).
5. `group_roof`: Hipped timber roofs and dormers. (Initial position: $y = +2.5\text{m}$, translates down into lock position at $y = 0.0\text{m}$).

### 9.2 GSAP ScrollTrigger Orchestration
```javascript
// src/three/buildReveal/ConstructionTimeline.js
export function setupBuildRevealTimeline(stageElement, layers, overlayElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stageElement,
      start: "top top",
      end: "+=350%",
      pin: true,
      scrub: 0.8
    }
  });

  tl.to(layers.blueprint.material, { opacity: 1, duration: 0.15 })
    .to(layers.substructure.position, { y: 0, duration: 0.2 }, "+=0.05")
    .to(layers.colonnade.material, { opacity: 1, duration: 0.2 }, "+=0.05")
    .to(layers.rooms.material, { opacity: 1, duration: 0.2 }, "+=0.05")
    .to(layers.roof.position, { y: 0, duration: 0.2 }, "+=0.05")
    .to(overlayElement, { opacity: 1, duration: 0.15 }); // Cross-dissolve to Image18.png

  return tl;
}
```

---

## 10. RIBBON OF LIFE ARCHITECTURE

* **Source Asset:** `client-assets/RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm` (45.75 MB Rhino 3D).
* **Isolation Mandate:** **Isolate the 42-storey biomimetic tower geometry only.** Discard all extraneous campus terrain, parking, and residential blocks to produce an ultra-lean standalone GLB.
* **Camera Rig:** Locked vertical helical camera track. Scrolling the narrative moves the camera up the building's aerodynamic facade:
  * *L01–L05 (Podium):* Public transit concourse and exhibition atrium.
  * *L15–L20 (Mid-Rise):* Suspended multi-level Sky Gardens and social hubs.
  * *L30–L38 (High-Rise):* Executive office suites.
  * *L42 (Crown):* Wind-harvesting canopy and public observation terrace.
* **Copywriting Guardrail:** Portfolio Page 10's duplicate Cultural Oasis text is **strictly banned**. Copy is authored exclusively from Pages 11–15, the KSITIL tender PDFs, and resume credentials.

---

## 11. FLOW SPIRE ARCHITECTURE

* **Source Asset Status:** **No raw 3D model file exists in the archive.**
* **Architectural Medium:** Verified vector CAD documentation (8 floor plans, elevations, and sections in `client-assets/WATCH TOWER_FLOW SPIRE_05/PDF/`).
* **Implementation Strategy:** **Drawing-Led Isometric Axonometric Reveal.**
  * The user scrolls through a clean CAD sequence:
    1. Ground Plinth & Urban Wind Catchers (Level 01 CAD Plate)
    2. Typical Office Diagrid Plan (Level 12 CAD Plate)
    3. Sky Garden Refuge Terrace (Level 22 CAD Plate)
    4. Crown Aerodynamic Section
    5. Final Exterior Render of the Tropical Facade
* **Contingency:** If the client provides a 3D model in the future, it can upgrade to an R3F viewer; the drawing-led experience functions as a complete, compelling architectural presentation on its own.

---

## 12. ANIMATION SYSTEM & CHOREOGRAPHY

The animation system enforces an architectural rhythm using three distinct hierarchy levels:

```
LEVEL 1: Base UI & Typography Reveals (Everywhere • 400ms • Subtle & Quiet)
LEVEL 2: Editorial Pinned Narratives (GSAP ScrollTrigger • Scrubbed Panels)
LEVEL 3: Signature Spatial Moments (Globe • Möbius 3D • Cultural Oasis Reveal)
```

### 12.1 The Rule of Silence
* **Mandatory Rule:** Every Level 3 signature experience must be immediately preceded and succeeded by a quiet, static Level 1 editorial reading section.
* Continuous full-screen animation is banned. Architectural gravitas requires whitespace and visual rest.

### 12.2 Timing Tokens & Easing
```javascript
export const ANIMATION_TOKENS = {
  durationFast: 0.25,
  durationMedium: 0.5,
  durationSlow: 0.8,
  durationMonumental: 1.2,
  easeEditorial: "cubic-bezier(0.16, 1, 0.3, 1)", // Smooth deceleration
  easeArchitectural: "power2.out",
  easeSpring: "back.out(1.4)"
};
```

---

## 13. RESPONSIVE ARCHITECTURE & BREAKPOINTS

The platform implements three explicit breakpoint categories:

```
DESKTOP: > 1200px (Full WebGL, dual-column editorial monograph, mouse parallax)
TABLET:  768px – 1199px (Touch-drag orbit, stacked editorial layouts, 45vh canvases)
MOBILE:  < 768px (Simplified point cloud or 2D vector fallback, single-column)
```

### 13.1 Mobile Adaptation Matrix

| Feature | Desktop (>1200px) | Tablet (768px–1199px) | Mobile (<768px) |
|---|---|---|---|
| **The Globe** | Full 3D point cloud; drag orbit; hover tooltip cards. | Touch drag; tapped pin opens bottom drawer sheet. | Optimized low-draw-call point sphere OR 2D technical vector map with horizontal swipe cards. |
| **Möbius 3D** | Full 60fps canvas; free orbit; 3 shader modes; cursor parallax. | Single-touch drag; fixed elevation; 2 shader modes (Clay/Twilight). | High-resolution interactive 360° image sequence OR simplified low-poly mobile GLB. |
| **Build Reveal** | Pinned horizontal split (40% text, 60% 3D assembly). | Pinned vertical canvas (45vh) with narrative scrolling below. | Vertical scroll-scrub layer cards with crisp WebP strata dissolves. |
| **Canvas DPR** | `dpr={[1, 1.75]}` | `dpr={[1, 1.5]}` | `dpr={[1, 1.0]}` (strictly prevents mobile GPU overheating) |
| **Navigation** | Minimalist horizontal header with translucent dimming. | Inline logo + minimal burger trigger. | Full-screen architectural drawer with monumental `Cormorant Garamond` type. |

---

## 14. PERFORMANCE ARCHITECTURE & LIFECYCLE

### 14.1 The Governing Acceptance Criteria
Arbitrary file-size limits are replaced with real-world performance criteria:

$$\text{ACCEPTANCE} = \text{VISUAL QUALITY} + \text{LOAD PERFORMANCE} + \text{RUNTIME 60FPS} + \text{MOBILE STABILITY}$$

### 14.2 Concrete Performance Rules
1. **One Active WebGL Canvas Rule:** Never run multiple active WebGL contexts simultaneously. Unmount and dispose of previous canvases on route changes.
2. **On-Demand Rendering (`frameloop="demand"`):** Canvases only render when user interaction or GSAP tweens explicitly call `useThree().invalidate()`. frameloop='demand' avoids a continuous render loop while the scene is idle, reducing unnecessary rendering work.
3. **Viewport Mounting:** WebGL canvases only mount when within the active viewport via `IntersectionObserver`.
4. **DPR Clamping:** Never exceed a device pixel ratio of `1.75` on desktop and `1.0` on mobile.
5. **Route-Level Code Splitting:** Heavy 3D chunk bundles are loaded strictly when the user navigates into that specific project detail page.

---

## 15. SELECTIVE ASSET PIPELINE

```
CLIENT ARCHIVE: 2.04 GB (Read-Only)
   ↓
CURATED ASSET SELECTION (Only assets needed for approved pages)
   ↓
LOCAL PROCESSING WORKFLOW (Pillow WebP / Blender Draco)
   ↓
WEB DERIVATIVES IN public/assets/ (Separate from source archive)
```

### 15.1 Processing Scope Checklist
* **Homepage:** Hero render (`Image18.png`), 3 flagship thumbnails, portrait (`02_CV_PAGE.png`).
* **Möbius Pavilion:** `MOBIUS_03.3dm` → Draco GLB; 4 dusk renders; 2 CAD plate PDFs.
* **Cultural Oasis:** `SITE 3D_09F.skp` (4 extracted strata groups); 24 physical model photos; 3 CAD plates.
* **Ribbon of Life:** `SITE MODEL_03_final.3dm` (isolated tower only); master plan aerial render; 3 CAD plates.
* **Flow Spire:** 8 CAD floor plate PDFs converted to crisp WebP plates.
* **Hafeez Contractor Archive:** 8 project elevation renders and diagrams.
* **ALL OTHER FILES:** Remain untouched in `client-assets/`.

---

## 16. STATE MANAGEMENT ARCHITECTURE

The application uses the simplest appropriate state architecture without heavy third-party stores:

```
┌────────────────────────────────────────────────────────┐
│ 1. LOCAL REACT STATE (useState / useReducer)           │
│    • 3D Shader Mode (clay / wireframe / twilight)      │
│    • Mobile Navigation Drawer (open / closed)          │
│    • Lightbox Active Image Index                       │
├────────────────────────────────────────────────────────┤
│ 2. SHARED CONTEXT (React.createContext)                │
│    • Active Globe Location / Project Synchronization  │
│    • Reduced Motion Preference State                   │
├────────────────────────────────────────────────────────┤
│ 3. URL PARAMETER STATE (React Router)                  │
│    • Active Project Slug (/projects/:slug)             │
│    • Catalogue Filter Tag (/projects?filter=academic)  │
└────────────────────────────────────────────────────────┘
```
**Decision:** Redux, Zustand, and MobX are **explicitly excluded** to prevent unnecessary boilerplate and abstraction.

---

## 17. ACCESSIBILITY SPECIFICATIONS

1. **Semantic HTML5:** Strict hierarchy (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`). Exactly one `<h1>` per page.
2. **Keyboard Focus:** All interactive elements feature visible, high-contrast focus rings (`2px solid #E03E48`, offset 2px).
3. **Screen Readers:** Globe locations render an accessible hidden HTML `<ul>` list with GPS coordinates and project links (`.sr-only`).
4. **`prefers-reduced-motion: reduce` Support:**
   * GSAP ScrollTrigger animations resolve instantly to their final states.
   * 3D canvases display high-resolution static WebP renders with accessible captions.
   * CSS smooth-scrolling is disabled.

---

## 18. SEO & METADATA ARCHITECTURE

* **Page Titles:**
  * Home: `Saravanakumar K — Graduate Architect | Architecture Shaped by Place`
  * Projects: `Selected Works & Architectural Archive | Saravanakumar K`
  * Project Detail: `[Project Title] — [Typology] | Saravanakumar K`
  * About: `Architectural Credentials & BIM Practice | Saravanakumar K`
  * Contact: `Inquiry & Professional Dialogue | Saravanakumar K`
* **Meta Descriptions:** Unique 150-character descriptions for each page focusing on place, sustainable master planning, and computational architecture.
* **OpenGraph & Twitter Cards:** Full OpenGraph image tags pointing to `public/assets/images/og_preview.jpg` (1200x630).
* **Canonical URLs & Sitemap:** Auto-generated `sitemap.xml` and `robots.txt` in `public/`.

---

## 19. ERROR HANDLING & FAILURE STATES

| Failure Condition | Graceful Fallback Strategy |
|---|---|
| **WebGL Not Supported** | The canvas is replaced with `<CanvasErrorBoundary />`, rendering a full-bleed, high-resolution WebP hero render with full narrative text. |
| **WebGL Context Lost** | Displays a minimal CAD notification: `"[GPU CONTEXT RESTORING...]"` with a manual reload button; does not crash the page. |
| **GLB Model Fails to Load** | Falls back to an interactive 360° image sequence or static photorealistic perspective renders. |
| **Slow Network (4G / 3G)** | Low-resolution blur-up WebP placeholders load instantly; 3D models defer loading until user taps "Explore 3D Maquette". |
| **Route Not Found (404)** | Renders `NotFoundPage.jsx` with an architectural elevation grid and a direct link returning to the Exhibition Home. |

---

## 20. STEP-BY-STEP IMPLEMENTATION ORDER

```
PHASE 0: PRE-IMPLEMENTATION & DISK SAFETY (CRITICAL)
  [STEP 00] Verify C: drive (>0.04 GB) and D: drive (>200 GB) free space.
  [STEP 01] Redirect npm cache: npm config set cache "D:\.npm-cache" --location=project.
  [STEP 02] Initialize React 19 + Vite 6 project strictly on D: drive.
  [STEP 03] Configure package.json with exact locked dependencies.
  [STEP 04] Verify npm install succeeds on D: without writing to C:.

PHASE 1: DESIGN SYSTEM & APPLICATION SHELL
  [STEP 05] Implement tokens.css (typography clamps, colors, architectural grids).
  [STEP 06] Implement reset.css and typography.css (Google Fonts / local webfonts).
  [STEP 07] Setup React Router v7 with route-level code splitting.
  [STEP 08] Build SiteHeader, SiteFooter, and NavigationDrawer.

PHASE 2: PROJECT DATA & CURATED ASSET PIPELINE
  [STEP 09] Build projectsData.js with verified coordinates and narrative stages.
  [STEP 10] Write scripts/optimize_images.py (Pillow batch conversion to WebP).
  [STEP 11] Execute image optimization ONLY for curated homepage & flagship renders.
  [STEP 12] Verify WebP images in public/assets/images/.

PHASE 3: HOMEPAGE EDITORIAL FOUNDATION
  [STEP 13] Implement OpeningManifesto section.
  [STEP 14] Implement HeroSection with responsive WebP image and monumental type.
  [STEP 15] Implement FlagshipProjects preview cards.
  [STEP 16] Implement PhysicalCraft section (24 Katra model photos).
  [STEP 17] Implement HafeezArchive section (8 corporate internship projects).
  [STEP 18] Implement AboutPreview and ContactClosing sections.

PHASE 4: SIGNATURE 01 — THE ATLAS (GLOBE)
  [STEP 19] Build minimal visual prototype of GlobeCanvas (Three.js point cloud).
  [STEP 20] Execute VALIDATION GATE 3 (Art Direction Review of Globe Aesthetic).
  [STEP 21] Once approved: implement project pins, clustering, and LocationPreviewCard.
  [STEP 22] Implement two-way synchronization (Location ↔ Project Card).
  [STEP 23] Implement mobile 2D vector fallback.

PHASE 5: PROJECT DETAIL PAGES & SIGNATURE 3D
  [STEP 24] Build ProjectDetailPage template with 8-stage narrative layout.
  [STEP 25] Process MOBIUS_03.3dm through Blender headless script to Draco GLB.
  [STEP 26] Execute VALIDATION GATE 5 (Möbius Runic Quality & Visual Inspection).
  [STEP 27] Build MobiusCanvas with 3 material modes and runic spotlight discovery.
  [STEP 28] Extract Cultural Oasis 4 structural strata from SketchUp to GLB.
  [STEP 29] Execute VALIDATION GATE 6 (Build Reveal Structural Layer Review).
  [STEP 30] Build BuildRevealCanvas with GSAP ScrollTrigger pinned timeline.
  [STEP 31] Build Ribbon of Life case study (isolated tower ascent).
  [STEP 32] Build Flow Spire case study (vector CAD plate reveal).

PHASE 6: COMPREHENSIVE PAGES & POLISH
  [STEP 33] Build full ProjectsPage catalogue with filtering.
  [STEP 34] Build full AboutPage (Novatr BIM credentials, education, matrix).
  [STEP 35] Build full ContactPage salon.
  [STEP 36] Audit WebGL context disposal, frameloop="demand", and mobile DPR clamps.
  [STEP 37] Implement prefers-reduced-motion fallbacks and accessibility tags.
  [STEP 38] Execute VALIDATION GATE 8 & 9 (Performance profiling & Final QA).
```

---

## 21. VALIDATION GATES (QUALITY GATES)

At each gate, implementation must **PAUSE** until the criteria are formally verified:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ GATE 1: FOUNDATION & DISK SAFETY                                           │
│ Criteria: Vite builds cleanly; npm cache is on D:; zero bytes written to C:│
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 2: VISUAL DESIGN & TOKENS                                             │
│ Criteria: Typography clamps scale cleanly; contrast passes WCAG AA/AAA.    │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 3: GLOBE MINIMAL PROTOTYPE                                            │
│ Criteria: Point cloud reads as technical cartography, NOT a generic Earth. │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 4: GLOBE INTERACTION APPROVAL                                         │
│ Criteria: Pin selection, clustering, and two-way card sync operate at 60fps│
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 5: MÖBIUS 3D MAQUETTE QUALITY                                         │
│ Criteria: Runic carvings on soffit are razor-sharp; 3 material modes work. │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 6: CULTURAL OASIS BUILD REVEAL                                        │
│ Criteria: 5 strata assemble cleanly with GSAP scrub; no shader jank.      │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 7: RESPONSIVE & MOBILE ERGONOMICS                                     │
│ Criteria: Mobile DPR clamped to 1.0; touch navigation smooth on all views. │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 8: PERFORMANCE & MEMORY AUDIT                                         │
│ Criteria: frameloop="demand" active; WebGL contexts dispose cleanly; <1.2s │
├────────────────────────────────────────────────────────────────────────────┤
│ GATE 9: FINAL PRODUCTION QA                                                │
│ Criteria: Zero 404s; accessibility verified; client archive untouched.    │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 22. NON-NEGOTIABLE DECISION GUARDRAILS

1. **Creative Authority Is Locked:** `MASTER_CREATIVE_DIRECTION_FINAL.md` is the supreme aesthetic authority. Never introduce neon, glassmorphism, or AI gradients.
2. **Zero Architectural Fabrication:** All 3D geometry and CAD plates must originate strictly from the architect's authentic client archive files.
3. **`client-assets/` Remains Read-Only:** Under no circumstances will any source file be modified, renamed, moved, or deleted.
4. **Selective Asset Processing Only:** Never execute blind batch conversions on the 2.04 GB archive. Only convert explicitly curated assets.
5. **Visual Quality Over Arbitrary File Size:** Never destroy architectural geometry, fine details, or materials merely to hit an artificial megabyte threshold.
6. **Globe Visual Validation Gate:** Do not build complex globe interaction logic until the minimal point-cloud prototype passes visual art direction review.
7. **Exactly Three Level 3 Moments:** The Globe, Möbius 3D, and Cultural Oasis Build Reveal. Keep all other sections calm (Rule of Silence).
8. **One Active Expensive Canvas Rule:** Never run multiple active WebGL contexts simultaneously.
9. **No Unapproved Frameworks:** Tailwind, Next.js, Redux, Zustand, and Lenis are strictly excluded.
10. **Drive Space Protection:** Always verify that processing and cache directories point to `D:` drive (`C:` possesses only ~0.04 GB free).

---

## 23. FINAL TECHNOLOGY SPECIFICATION TABLE

| Component | Final Locked Choice | Justification & Role |
|---|---|---|
| **Core Framework** | **React 19** | Declarative UI, modern asset preloading, native ref handling, R3F v9 compatibility. |
| **Build Tool** | **Vite 6** | Instant HMR, fast Rollup production bundling, simple static file handling. |
| **Language** | **Modern JavaScript (ESM)** | High developer velocity, no 3D typing overhead, clean ES2024 modules. |
| **Styling Architecture** | **Vanilla CSS + Tokens + Modules** | Highest performance, zero CSS runtime overhead, absolute control over fluid typography. |
| **3D Engine** | **Three.js (r170+)** | World standard WebGL engine, broad ecosystem, custom point-cloud shaders. |
| **3D React Binding** | **@react-three/fiber (v9)** | Declarative scene graph, seamless React state binding, automatic disposal. |
| **3D Utilities** | **@react-three/drei** | Standard helpers (`useGLTF`, `OrbitControls`, `Float`, `Center`). |
| **Animation Engine** | **GSAP 3 + ScrollTrigger** | Unrivaled timeline control, pinned storytelling, scrubbed scroll synchronization. |
| **GSAP React** | **@gsap/react (`useGSAP`)** | Official GSAP React hook ensuring automatic cleanup and zero memory leaks. |
| **Routing** | **React Router v7** | Client-side routing, route-level code splitting via `React.lazy`. |
| **Rendering Baseline** | **WebGL 2.0** | 99.4% universal hardware support; WebGPU evaluated as progressive enhancement. |
| **3D Asset Format** | **GLB (Draco Compressed)** | Single binary container, compact geometry, universal web standard. |
| **Image Asset Format** | **WebP (Responsive Srcset)** | 90%+ bandwidth savings, multi-resolution (400w, 1200w, 2400w). |
| **Asset Pipeline** | **Python Pillow + Blender Headless** | Automated local batch processing on `D:` drive; source archive untouched. |
| **Hosting Strategy** | **Static CDN (Vercel / GitHub Pages)** | Zero server maintenance, global edge distribution, instant caching. |
| **Backend** | **None (Static Client-Side)** | Zero attack surface, direct mailto or Formspree for correspondence. |

---

## DOCUMENT VERIFICATION & STATUS

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                IMPLEMENTATION BLUEPRINT: FORMALLY LOCKED                   │
│                                                                            │
│   • Creative Authority: MASTER_CREATIVE_DIRECTION_FINAL.md                 │
│   • Technical Authority: TECHNICAL_READINESS.md                            │
│   • Asset Inventory: CLIENT_ASSET_AUDIT.md                                 │
│                                                                            │
│   VERIFICATION CONFIRMATION:                                               │
│   1. MASTER_CREATIVE_DIRECTION_FINAL.md: UNTOUCHED                         │
│   2. TECHNICAL_READINESS.md: UNTOUCHED                                     │
│   3. CLIENT_ASSET_AUDIT.md: UNTOUCHED                                      │
│   4. client-assets/ directory (2.04 GB): UNTOUCHED & 100% READ-ONLY        │
│   5. Application source code: ZERO FILES CREATED                           │
│   6. Dependencies: ZERO PACKAGES INSTALLED                                 │
│                                                                            │
│   STATUS: READY FOR STEP 0 EXECUTION UPON USER APPROVAL                   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---
*End of Document — Signed by Lead Systems Architect & Senior Creative Technologist*
