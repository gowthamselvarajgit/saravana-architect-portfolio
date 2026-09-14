# TECHNICAL READINESS & TECHNOLOGY ARCHITECTURE AUDIT
## Premium Interactive Architectural Portfolio
### Client: SARAVANAKUMAR K — Graduate Architect

**Document Reference:** `docs/research/TECHNICAL_READINESS.md`  
**Primary Creative Authority:** `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md`  
**Asset Baseline:** `docs/research/CLIENT_ASSET_AUDIT.md`  
**Date:** September 12, 2026  
**Role:** Senior Digital Art Director + Creative Technologist + Systems Architect  
**Status:** Technical Audit Complete — Implementation Strategy Locked & Corrected  
**Phase:** Step 3 of Pre-Implementation (Strictly Documentation-Only / Zero Code Modified / Zero Packages Installed)

---

## EXECUTIVE SUMMARY

This document establishes the technical, rendering, performance, and infrastructural architecture required to realize the locked creative direction: **"ARCHITECTURE SHAPED BY PLACE"**.

The platform is an **Architectural Monograph × Interactive Spatial Atlas × Tactile 3D Maquette Gallery**. It requires high-precision 3D WebGL rendering, smooth scroll-driven CAD reveals, and an interactive cartographic globe. However, it must function flawlessly on everyday laptops, tablets, and mobile devices with zero jank, minimal battery drain, and fast load times.

Crucially, this audit reveals that **no web application currently exists in the workspace** (greenfield state), and the local system drive (`C:`) has only **0.04 GB free space**, while the project drive (`D:`) possesses **202.24 GB free space**. This fundamental finding shapes our entire dependency installation, caching, asset pipeline, and build architecture.

---

## TABLE OF CONTENTS

1. [1. CURRENT PROJECT REALITY](#1-current-project-reality)
2. [2. AVAILABLE SKILLS AUDIT](#2-available-skills-audit)
3. [3. RECOMMENDED TECHNOLOGY STACK](#3-recommended-technology-stack)
4. [4. RENDERING & CANVAS ARCHITECTURE](#4-rendering--canvas-architecture)
5. [5. 3D PROJECT STRATEGY & QUALITY-FIRST PIPELINE](#5-3d-project-strategy--quality-first-pipeline)
6. [6. GLOBE ARCHITECTURE & VISUAL VALIDATION](#6-globe-architecture--visual-validation)
7. [7. BUILD REVEAL ARCHITECTURE](#7-build-reveal-architecture)
8. [8. PERFORMANCE & SELECTIVE ASSET PIPELINE](#8-performance--selective-asset-pipeline)
9. [9. LOADING STRATEGY & PROGRESSIVE HYDRATION](#9-loading-strategy--progressive-hydration)
10. [10. MOBILE & RESPONSIVE DEGRADATION STRATEGY](#10-mobile--responsive-degradation-strategy)
11. [11. ANIMATION ARCHITECTURE & REACT INTEGRATION](#11-animation-architecture--react-integration)
12. [12. TECHNOLOGY DECISION MATRIX](#12-technology-decision-matrix)
13. [13. TECHNICAL RISK REGISTER](#13-technical-risk-register)
14. [14. FINAL RECOMMENDATIONS & WHAT NOT TO USE](#14-final-recommendations--what-not-to-use)
15. [15. RECOMMENDED IMPLEMENTATION ORDER](#15-recommended-implementation-order)
16. [16. IMPORTANT IMPLEMENTATION GUARDRAILS](#16-important-implementation-guardrails)
17. [DOCUMENT STATUS](#document-status)

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

## 1. CURRENT PROJECT REALITY

A comprehensive forensic audit of the local development environment and workspace was performed on September 12, 2026:

### 1.1 Filesystem & Repository State
* **Root Directory:** `d:/Saravana_Architect_Portfolio`
* **Application Code:** **NONE.** No `package.json`, `vite.config.js`, or `src/` directory exists. The workspace is a greenfield repository currently holding research documents and raw client assets.
* **Client Archive:** `client-assets/` contains **2.04 GB** (707 files, 115 folders) of uncompressed architectural renders, Rhino models (`.3dm`), SketchUp models (`.skp`), Revit BIM files (`.rvt`), and vector CAD PDFs.
* **Empty Scaffolding Folders:** `assets/3d`, `assets/documents`, `assets/images`, `assets/logos` exist but are currently empty.
* **Documentation:** 
  * `docs/research/CLIENT_ASSET_AUDIT.md` (complete forensic asset analysis)
  * `docs/research/MASTER_CREATIVE_DIRECTION.md` (initial draft)
  * `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md` (locked creative direction)

### 1.2 System Environment & Tooling
* **Operating System:** Windows 11 Enterprise (x64)
* **Node.js Runtime:** `v22.17.1` (Modern active LTS)
* **Package Manager:** `npm 10.9.2`
* **Python Runtime:** `Python 3.13.7`
  * Pre-installed image packages: `Pillow 12.3.0` (with native **WebP support enabled**), `pypdf 6.18.1`, `numpy 2.5.3`.
* **Git Status:** Initialized on `master`, initial assets untracked, zero commits made.

### 1.3 Critical Environmental Constraint: Storage Drives
```
Drive C:   0.04 GB FREE  (CRITICAL SYSTEM CONSTRAINT — NEARLY 100% FULL)
Drive D: 202.24 GB FREE  (SPACIOUS STORAGE — ALL WORK MUST RESIDE HERE)
```
> [!CAUTION]
> **Drive C: Exhaustion Warning:**
> The `C:` system drive has practically zero free space (`0.04 GB`). Running a standard `npm install` without configuration will immediately crash because npm writes cache files to `C:\Users\...\AppData\Local\npm-cache` by default.
> 
> **MANDATORY PREREQUISITE BEFORE ANY INSTALLATION:**
> The global/local npm cache and temp directories must be explicitly redirected to the `D:` drive:
> ```powershell
> npm config set cache "D:\.npm-cache" --location=project
> npm config set temp "D:\.npm-temp" --location=project
> ```
> All project code, `node_modules`, 3D conversion outputs, and optimized WebP derivatives must reside strictly within `d:\Saravana_Architect_Portfolio`.

---

## 2. AVAILABLE SKILLS AUDIT

The project has specialized capabilities pre-installed under `.agents/skills/`. We audited these skills to ensure we maximize built-in architectural patterns without duplicating or reinstalling packages:

| Skill Directory | Relevance to Project | Key Capability to Leverage |
|---|---|---|
| `r3f-best-practices` | **CRITICAL** | Best practices for React Three Fiber (canvas isolation, `frameloop="demand"`, memoization, unmount disposal). |
| `three-best-practices` | **CRITICAL** | Three.js scene optimization, draw call reduction, texture management, shader efficiency. |
| `threejs-shaders` | **HIGH** | Custom GLSL point-cloud shaders for the cartographic globe landmass and atmospheric limb haze. |
| `gsap-react` | **CRITICAL** | Official GSAP React patterns (`useGSAP()` hook, context scoping, `revertOnUpdate`, memory cleanup). |
| `gsap-scrolltrigger` | **CRITICAL** | Pinned section orchestration, scrubbed timelines, horizontal narrative scrolls. |
| `gsap-timeline` & `core` | **HIGH** | Sequential animation choreography for the architectural build reveals. |
| `using-blender` & `blender-3d-modeling` | **HIGH** | Headless automated scripts for Rhino/SketchUp mesh extraction, decimation, and Draco GLB export. |
| `design-system` & `ui-styling` | **HIGH** | Semantic CSS custom property architecture, fluid typographic scales, accessible contrast enforcement. |
| `design-taste-frontend` | **HIGH** | Anti-slop architectural aesthetics, whitespace balancing, bespoke editorial grids. |

**Verdict:** All necessary design, animation, 3D, and frontend skills are already present. **Zero additional agent skills are required.**

---

## 3. RECOMMENDED TECHNOLOGY STACK

Based on the locked creative direction and local system realities, we recommend the following production stack:

### 3.1 Core Architecture: React 19 + Vite 6 + Modern JavaScript (ESM)
* **Framework:** **React 19**
  * *Rationale:* React 19 provides native asset preloading (`preload`, `preinit`), simplified ref handling without forwardRef boilerplate, and rock-solid compatibility with the latest `@react-three/fiber` v9.
* **Build Tool:** **Vite 6**
  * *Rationale:* Sub-second Hot Module Replacement (HMR), native ES modules in development, highly optimized Rollup production bundling, effortless asset handling for GLB/HDR files via `?url` imports.
* **Language:** **Modern JavaScript (ESM)**
  * *Rationale:* TypeScript introduces compilation friction, heavy `@types/three` maintenance overhead, and strict type casting battles with dynamic Three.js/R3F scene graphs and GSAP timeline refs. Modern JavaScript (ES2024) paired with JSDoc typing provides maximum velocity, clean code, and zero runtime performance penalty.

### 3.2 Styling System: Vanilla CSS Tokens + CSS Modules
* **Architecture:** **CSS Custom Properties (Tokens) + CSS Modules**
  * *Global Design Tokens (`src/styles/tokens.css`):* Centralizes all typography clamps, architectural color values, surface tones, and elevation grids.
  * *Component CSS Modules (`*.module.css`):* Encapsulates styles for editorial cards, navigation drawers, and viewer overlays without naming collisions.
* **Explicit Exclusion of Tailwind CSS:**
  * *Why Banned:* Tailwind abstracts away fine-grained CSS control, clutters JSX templates with hundreds of utility strings, makes custom fluid typographic clamp calculations awkward, and encourages generic "SaaS-like" visual patterns that directly violate the locked editorial monograph aesthetic.

### 3.3 3D Spatial Engine: Three.js r170+ + React Three Fiber (R3F) + Drei
* **Core:** `three` (WebGL 2 renderer, buffer geometries, mesh standard materials).
* **React Integration:** `@react-three/fiber` (declarative scene graph, unified React state binding).
* **Utilities:** `@react-three/drei` (`useGLTF`, `OrbitControls`, `Float`, `Center`, `Preload`).
* **Hardware Baseline:** **WebGL 2.0**.
  * *WebGPU Assessment:* WebGPU is not recommended as a hard requirement in 2026 due to fragmented mobile browser support (particularly iOS Safari) and lack of mature post-processing ecosystem parity. WebGL 2 provides universal hardware acceleration on 99.4% of all active devices.

### 3.4 Animation & Choreography Engine: GSAP 3 + ScrollTrigger + @gsap/react
* **Core:** `gsap` (GreenSock Animation Platform v3).
* **Plugins:** `ScrollTrigger` (scrubbed pinned sequences, narrative panels, layer assembly triggers).
* **React Binding:** `@gsap/react` (`useGSAP()` hook for automatic context cleanup and memory management).
* **Role Separation:** GSAP handles DOM layout transitions, typography reveals, and scroll-linked timeline interpolation; R3F handles 3D object rendering. GSAP updates lightweight camera and mesh properties; R3F renders them smoothly.

### 3.5 Routing & Information Architecture: React Router v7
* **Router:** `react-router-dom` v7 (BrowserRouter with route-level code splitting via `React.lazy`).
* **Route Structure:**
  * `/` (Exhibition Homepage: Manifesto, Hero, Atlas Globe, Selected Works, Craft, Hafeez Archive, About, Contact)
  * `/projects` (Complete Architectural Catalogue & Filterable Matrix)
  * `/projects/:slug` (Deep-dive project case studies: Cultural Oasis, Ribbon of Life, Möbius, etc.)
  * `/about` (Architect profile, Novatr BIM certifications, architectural philosophy)
  * `/contact` (Professional inquiry salon & direct correspondence)

---

## 4. RENDERING & CANVAS ARCHITECTURE

A primary risk in WebGL-heavy websites is memory bloating, GPU fan spin, and device throttling caused by running multiple active 3D scenes or a single unwieldy global canvas. 

### 4.1 The Decoupled Multi-Canvas Pattern
The website will **NOT** utilize a single global Three.js canvas behind all pages. Instead, we establish a **Decoupled Specialized Canvas Architecture**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DOM & EDITORIAL UI LAYER                           │
│  (Monograph Typography, Narrative Columns, CAD Drawings, Project Metadata)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                        GSAP SCROLLTRIGGER ORCHESTRATION
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌───────────────┐              ┌───────────────┐              ┌───────────────┐
│ GLOBE CANVAS  │              │ MODEL VIEWER  │              │ BUILD REVEAL  │
│ (The Atlas)   │              │ (Möbius 3D)   │              │ (Katra Oasis) │
└───────┬───────┘              └───────┬───────┘              └───────┬───────┘
        │                              │                              │
        └──────────────────────────────┼──────────────────────────────┘
                                       ▼
                       SHARED THREE.JS OPTIMIZATION ENGINE
             (frameloop="demand" • DPR Clamped [1, 1.5] • Auto-Disposal)
```

### 4.2 Canvas Lifecycle & Resource Isolation

| Canvas Component | Location | Mounting Behavior | Frameloop Strategy |
|---|---|---|---|
| `<GlobeCanvas />` | Homepage (The Atlas Section) | Mounts only when within viewport (`IntersectionObserver`). Completely unmounts or pauses when scrolled past. | `demand` during idle; switches to continuous during user drag or camera fly-to animation. |
| `<ModelViewerCanvas />` | `/projects/on-the-path-to-rediscovery` | Mounts exclusively on the dedicated Möbius project page inside an isolated viewer frame. | `demand` with `invalidate()` on OrbitControls change or shader mode toggle. |
| `<BuildRevealCanvas />` | `/projects/cultural-oasis` | Mounts inside a pinned GSAP ScrollTrigger section (100vh). | Scrub-driven: GSAP updates the layer progress variable, triggering single-frame renders. |

### 4.3 WebGL Context Management & Disposal Protocol
Mobile browsers strictly cap active WebGL contexts to between 8 and 16. Exceeding this limit causes older contexts to crash silently (`CONTEXT_LOST_WEBGL`).
* **Rule 1:** Never mount more than **ONE active WebGL canvas simultaneously** across the entire DOM.
* **Rule 2:** On route transitions (e.g. from Home to Project Detail), the unmounting canvas must execute explicit disposal of geometries and materials.
* **Rule 3: Frame Rate & Battery Conservation:** All canvases use `frameloop="demand"` by default. frameloop='demand' avoids a continuous render loop while the scene is idle, reducing unnecessary rendering work.

---

## 5. 3D PROJECT STRATEGY & QUALITY-FIRST PIPELINE

### 5.1 The Governing Principle: VISUAL QUALITY > ARBITRARY FILE SIZE
In architectural presentation, arbitrary numerical constraints must never override spatial fidelity:

> [!IMPORTANT]
> **VISUAL QUALITY > ARBITRARY FILE SIZE**  
> We must never damage architectural geometry, fine details, materials, drawings, or visual fidelity simply to hit an artificial megabyte number.
> 
> File size targets are **internal optimization goals and starting baselines**, NOT mandatory acceptance criteria. They are strictly subject to:
> 1. Visual quality and silhouette integrity
> 2. Geometry complexity and architectural accuracy
> 3. Texture and material detail requirements
> 4. Actual real-world browser and mobile performance testing

### 5.2 The 3D Asset Decision Process
For each candidate 3D model, the following sequential evaluation pipeline must be applied:

```
RAW ARCHITECTURAL MODEL (Rhino / SketchUp / Revit)
   ↓
Clean unnecessary / invisible geometry
   ↓
Remove irrelevant site clutter & entourage
   ↓
Isolate the actual architectural subject
   ↓
Optimize topology where safe (preserve sharp edges & silhouette)
   ↓
Optimize textures & material channels
   ↓
Compress (Draco / Meshopt as appropriate)
   ↓
TEST VISUAL FIDELITY (Verify no faceted artifacts or texture degradation)
   ↓
TEST LOADING TIME (Assess network impact on standard broadband & 4G)
   ↓
TEST DESKTOP PERFORMANCE (Verify smooth 60fps interaction)
   ↓
TEST MOBILE FALLBACK (Verify memory footprint & touch responsiveness)
   ↓
ACCEPT ASSET ONLY IF BOTH QUALITY AND PERFORMANCE ARE ACCEPTABLE
```

**If a model remains too heavy after sensible optimization:**
* Reduce the scope of what is displayed (e.g. isolate primary facade or core volume).
* Simplify interaction (e.g. constrain camera orbit range).
* Load the asset progressively (render lightweight proxy while high-res geometry streams in).
* Use a lighter representation (e.g. pre-rendered 360° interactive image sequence).
* Or defer that specific 3D experience in favor of photorealistic renders and CAD drawings.

**Under no circumstances will important architectural information be sacrificed merely to satisfy a file-size quota.**

### 5.3 3D Candidates & Initial Optimization Targets

| Priority | Project & Asset | Source Format & Size | Starting Optimization Goal | Quality & Architectural Role |
|---|---|---|---|---|
| **1 (STAR)** | **Möbius Pavilion**<br>`On the path to Rediscovery_06/3D/MOBIUS_03.3dm`<br>(Rhino 3D, 11.72 MB) | Starting target: ~2.5–3.5 MB | Pure mathematical NURBS. Lowest risk, highest conceptual impact. Sized to guarantee crisp runic carvings on the under-soffit. |
| **2** | **Cultural Oasis**<br>`Cultural Oasis_01/3D/SITE 3D_09F.skp`<br>(SketchUp, 116.62 MB) | Starting target: ~4.5–6.5 MB (stratified) | Do NOT load raw site mesh. Isolate 4 discrete structural tiers for the Build Reveal. Must preserve arched colonnade clarity. |
| **3** | **Ribbon of Life**<br>`RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm`<br>(Rhino 3D, 45.75 MB) | Starting target: ~3.5–5.0 MB | Isolate the 42-storey biomimetic commercial tower only. Must preserve aerodynamic facade twist and sky gardens. |
| **4** | **Eco Resort**<br>`Eco ressort_03/3D/SITE_3D_02.rvt`<br>(Revit BIM, 31.10 MB) | Pending Revit export | Requires Revit software to export FBX (client dependency). Initial release features 40 renders + 107 MB GRIHA thesis drawings. |
| **5** | **Hospital Project**<br>`HOSPITAL_NEW01/3D/SITE HOSPITAL_02.rvt`<br>(Revit BIM, 11.06 MB) | Pending Revit export | Secondary archive candidate under CF-01 confirmation. |

### 5.4 The Möbius Discovery Interaction (Signature 3D Moment)
* **The Mesh:** A seamless, single-sided topological Möbius ribbon with Old Norse runic inscriptions recessed into the underside soffit.
* **Camera Rig:** Constrained `OrbitControls` with `minPolarAngle={Math.PI / 6}` and `maxPolarAngle={Math.PI / 2.05}` (prevents clipping below ground level).
* **Interaction Mechanic:** When the user orbits downward to look up into the archway, an upward-pointing directional spotlight (`#F4F0E8`, intensity 1.8) casts grazing shadows across the runic geometry, revealing the ancient Viking text in razor-sharp relief.
* **Inspection Modes (UI Switcher):**
  1. *Architectural Bone Clay:* Matte diffuse plaster with ambient occlusion.
  2. *Technical Wireframe:* Stylized chalk lines showing the parametric surface mesh.
  3. *Twilight Atmosphere:* Low-key dusk lighting matching the competition renders.

---

## 6. GLOBE ARCHITECTURE & VISUAL VALIDATION

The globe is **not an ornamental Three.js background**; it is the master geographic index of Saravanakumar's architectural career.

```
       [ THE WORLD ]
             ↓
       [ LOCATION ]
             ↓
       [ PROJECT DOSSIER ]
             ↓
    [ FULL PROJECT STORY ]
```

### 6.1 Architectural Requirements
* **Architectural/Geographical Index:** It is the primary spatial directory connecting real places to architectural concepts.
* **NOT a Generic Spinning Earth:** Banned are cartoonish blue-marble satellite spheres, spinning gaming globes, and generic tech demos.
* **Technical Cartography Aesthetic:** Deep charcoal void (`#0A0906`), subtle warm chalk point-cloud continents, 15° hairline latitude/longitude rings, target crosshairs, and datum markings.
* **Real Project Locations:** Plotted strictly with the client's authentic coordinates (Katra, Oslo, Kerala, Mumbai, Pune, Goa, Amaravati, Lothal, Gurugram).
* **Multi-Project Handling:** Handles dense geographic clusters (e.g. Mumbai, BKC, Thane) with clear cluster markers and smooth camera focus.
* **Two-Way Synchronization:** Selecting Katra on the globe highlights Cultural Oasis; selecting Cultural Oasis in the project index rotates the globe to Katra (`32.9930° N, 74.9318° E`).
* **Shared Data Source:** The Globe and the Project Catalogue consume the exact same underlying `PROJECTS_DATA` array.

### 6.2 Mandatory Visual Validation Stage (Before Full Implementation)
The globe is one of the **THREE signature moments** of the website. We must NOT assume that the globe implementation is automatically correct simply because it compiles and renders without errors.

> [!IMPORTANT]
> **MANDATORY VISUAL VALIDATION PROCESS**  
> Before investing development time into complex camera transitions and interaction trees, the globe must pass this strict sequential validation gate:
> 
> 1. **Build the Smallest Possible Visual Prototype:** Construct a minimal Three.js sphere with the proposed point-cloud landmass and basic coordinate pins.
> 2. **Test Visual Language:** Review the sphere against the creative direction. Does it read as a refined architectural atlas or an off-the-shelf Three.js demo?
> 3. **Test Project Pins & Geographic Clarity:** Verify that real coordinates (Oslo, Katra, Kerala, Mumbai, etc.) are unmistakably distinct, legible, and visually balanced.
> 4. **Test Interaction & Affordances:** Verify that a first-time visitor immediately understands the globe is draggable, zoomable, and clickable.
> 5. **Test Desktop Performance:** Confirm stable 60fps rendering without GPU fan spin on standard laptops.
> 6. **Test Mobile & Simplified Mode:** Confirm touch responsiveness, gesture ergonomics, and evaluate whether mobile requires a simplified point count or 2D technical vector map.
> 7. **Art Direction Review:** Critically assess whether the prototype embodies *\"Architecture Shaped by Place\"*.
> 8. **Proceed Only After Approval:** Only when the visual language and interaction feel authentic will full two-way data coupling and transition polish be implemented.
> 
> **Rule:** If the initial prototype fails the architectural aesthetic, iterate the visual shaders first. Never build complex technical logic on an unapproved visual foundation.

### 6.3 Technical Implementation Specifics
* **Base Sphere:** Deep charcoal-black (`#0A0906`), matte non-reflective finish.
* **Landmass Mesh:** Three.js `Points` geometry featuring ~18,000 sampling points derived from vector continent boundaries, shaded via custom vertex/fragment shaders in subtle warm chalk (`rgba(232, 228, 220, 0.45)`).
* **Interactive Pins:** 3D billboarded SVG crosshair sprites with pulsing core beacon dots (`#E03E48`).
* **Clustering:** Proximity threshold grouping projects within 50 km into a clustered indicator showing `[N PROJECTS]`, expanding smoothly upon zoom.

---

## 7. BUILD REVEAL ARCHITECTURE

The Build Reveal is our signature construction interaction, demonstrating how Saravanakumar's architecture emerges from soil to structure to envelope.

```
01 BLUEPRINT  ──→  02 SUBSTRUCTURE  ──→  03 COLONNADE  ──→  04 ROOMS  ──→  05 ROOF  ──→  06 NIGHT RENDER
 (CAD Lines)       (Excavated Base)      (Arched Niches)    (Upper Floors)   (Hipped Cap)  (Atmospheric Image)
```

### 7.1 Evaluated Technical Implementation Approaches

| Approach | Mechanics | Evaluation | Decision |
|---|---|---|---|
| **A. Custom Depth-Peeling / Clip Shaders** | Procedural GLSL clip planes slicing vertically through mesh. | Complex, fragile across mobile GPUs, ignores architectural construction logic. | **REJECTED** |
| **B. Morph Targets / Blendshapes** | Deforming geometry vertices between construction phases. | Enormous file size overhead, geometry distortions, incompatible with CAD models. | **REJECTED** |
| **C. Stratified Layer Groups + GSAP Scrub** | Isolated discrete structural meshes grouped by trade; GSAP controls opacity and subtle vertical displacement. | **100% reliable, deterministic, zero shader compilation jank, mirrors authentic architectural drawings (Portfolio Page 8).** | **SELECTED** |

### 7.2 The Selected Layer Group Architecture
The model for Cultural Oasis is authored in Blender into 5 discrete structural groups:
1. `group_01_blueprint`: Ground plinth line contours (emissive wireframe, `#E8E4DC`).
2. `group_02_substructure`: Sunken circular amphitheatre and central lotus pool (`y` offset: -1.2m → 0.0m).
3. `group_03_colonnade`: Arched perimeter colonnade and pilgrim shrines (opacity: 0 → 1, scale: 0.95 → 1.0).
4. `group_04_accommodations`: Stepped upper dormitory and guest rooms (opacity: 0 → 1).
5. `group_05_roof`: Sloped hipped timber roofs and dormer caps (`y` offset: +2.5m → 0.0m).

---

## 8. PERFORMANCE & SELECTIVE ASSET PIPELINE

### 8.1 Core Principle: WE ARE NOT CONVERTING THE ENTIRE CLIENT ARCHIVE

> [!WARNING]
> **SELECTIVE ASSET PROCESSING MANDATE**  
> The client archive (`client-assets/`) is **2.04 GB** (707 files, 115 folders).
> 
> **WE ARE NOT CONVERTING THE ENTIRE CLIENT ARCHIVE.**
> 
> The archive contains extensive material that will never appear on the public website (e.g. administrative documents, raw render iterations, internal thesis drafts, redundant high-poly test meshes, and unreferenced site scans).
> 
> **The strictly enforced pipeline is:**
> ```
> CLIENT ARCHIVE (Read-Only)
>    ↓
> AUDIT (Completed in CLIENT_ASSET_AUDIT.md)
>    ↓
> SELECT WEBSITE ASSETS (Only items required by approved site architecture)
>    ↓
> PREPARE ONLY SELECTED ASSETS
>    ↓
> OPTIMIZE (WebP image resizing, Blender Draco GLB export)
>    ↓
> CREATE WEB DERIVATIVES (Stored in separate build directories on D:)
>    ↓
> IMPLEMENT IN FRONTEND
> ```

### 8.2 Scope of Assets to Process
Asset conversion is strictly restricted to assets required by the approved creative direction:
* **Homepage Hero:** Selected full-bleed cinematic render.
* **Selected Flagship Projects:** Core presentation renders for Cultural Oasis, Ribbon of Life, Möbius, Flow Spire, and Eco Resort.
* **Globe / Project Locations:** Location metadata, preview thumbnails, and coordinates for all 13+ geolocated works.
* **Möbius Interactive 3D:** Only `MOBIUS_03.3dm` converted to Draco GLB.
* **Cultural Oasis Build Reveal:** Only the 4 isolated structural tiers extracted from `SITE 3D_09F.skp`.
* **Ribbon of Life Interactive Tower:** Only the 42-storey tower isolated from `SITE MODEL_03_final.3dm`.
* **Selected Project Galleries:** Curated 24 physical model photos of Katra, diagrid model photos of Ribbon of Life, and selected technical drawings.
* **Drawings & Process Material:** Verified CAD plans, Kevin Lynch analysis layers, and section cuts actually displayed on page.
* **About / Contact:** Professional portrait (`02_CV_PAGE.png`) and credentials documentation.

**STRICTLY FORBIDDEN:**
* Do NOT batch-convert every raw image in the archive.
* Do NOT convert unused SketchUp or Revit test files.
* Do NOT rasterize entire 100+ MB multi-page PDFs unless specific plates are curated for display.

### 8.3 Physical Archive Separation
* The original `client-assets/` directory remains **100% read-only and untouched**.
* All optimized WebP images, GLB models, and extracted SVG plates are written exclusively to separate web asset folders on the `D:` drive (`assets/` or `public/assets/`).

---

## 9. LOADING STRATEGY & PROGRESSIVE HYDRATION

The loading experience reflects the disciplined pace of an architectural exhibition, replacing generic spinners with architectural line construction.

```
[INITIAL LOAD: < 1.2s] ──→ Editorial Text & Monograph Title Appear Instantly
                          ├── WebGL Globe loads asynchronously in background
                          └── 3D Models downloaded strictly on user route demand
```

### 9.1 Stage 1: The Initial Monograph Entry (First Contentful Paint < 1.2s)
1. Critical HTML/CSS loaded (< 50 KB).
2. The user immediately sees:
   ```
   SARAVANAKUMAR K
   Graduate Architect
   Architecture Shaped by Place
   ```
3. A hairline progress rule (`0.5px`, `#E03E48`) draws across the screen as essential fonts resolve.
4. The page is immediately interactive. **Zero 3D blocking.**

### 9.2 Stage 2: The 3D Maquette Loader (On-Demand Model Routes)
When navigating into `/projects/on-the-path-to-rediscovery`, an architectural CAD loading indicator mounts inside the canvas frame:
```
┌──────────────────────────────────────────────┐
│ [01/03] DECODING PARAMETRIC NURBS GEOMETRY   │
│ GEOMETRY: 48,240 VERTICES                     │
│ BUFFER PROGRESS: [████████████░░░░] 74%       │
│ RUNIC SOFFIT CALIBRATION: ACTIVE             │
└──────────────────────────────────────────────┘
```
This turns required loading latency into an authentic architectural storytelling moment.

---

## 10. MOBILE & RESPONSIVE DEGRADATION STRATEGY

The website must deliver a breathtaking experience across all form factors:

### 10.1 Multi-Device Adaptation Matrix

| Feature | Desktop (> 1200px) | Tablet (768px – 1199px) | Mobile (< 768px) |
|---|---|---|---|
| **The Globe** | Full 3D point cloud; drag orbit; hover tooltip cards. | Touch drag; tapped pin opens slide-up bottom sheet. | Lightweight 2D vector technical map OR low-poly sphere with horizontal swipe cards. |
| **Möbius 3D** | Full 60fps canvas; free orbit; 3 shader modes; cursor parallax. | Single-touch drag; fixed elevation; 2 shader modes (Clay/Twilight). | Touch-swipe 360° orbital view OR low-poly mobile GLB. |
| **Build Reveal** | Pinned horizontal split (40% text, 60% 3D assembly). | Pinned vertical canvas (45vh) with narrative scrolling below. | Vertical scroll-scrub layer cards with crisp WebP strata dissolves. |
| **Canvas DPR** | `window.devicePixelRatio` clamped `[1, 1.75]` | Clamped `[1, 1.5]` | Clamped `[1, 1.0]` (prevents retina mobile GPU melt) |
| **Navigation** | Minimalist horizontal editorial header. | Header with compact burger trigger. | Full-screen architectural monograph drawer with monumental serif type. |

---

## 11. ANIMATION ARCHITECTURE & REACT INTEGRATION

### 11.1 The Locked Three-Tier Hierarchy
* **LEVEL 1 (Base UI):** Lightweight CSS transitions and IntersectionObserver opacity reveals (`400ms`, `cubic-bezier(0.16, 1, 0.3, 1)`).
* **LEVEL 2 (Editorial Cadence):** GSAP ScrollTrigger for pinned case study milestones, staggered typography line reveals, and cross-fading drawing layers.
* **LEVEL 3 (Signature Spatial Moments):** Strictly 3 instances: The Globe, Möbius 3D Maquette, and Katra Build Reveal.
* **The Rule of Silence:** Level 3 moments are always buffered by completely static Level 1 reading sections.

### 11.2 React + GSAP Clean Integration Protocol
In strict adherence to the official `@gsap/react` skill, all GSAP animations must be scoped to a container ref with automatic cleanup:
```javascript
useGSAP(() => {
  gsap.from(".editorial-line", {
    opacity: 0,
    y: 16,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });
}, { scope: containerRef });
```

---

## 12. TECHNOLOGY DECISION MATRIX

| Area | Candidate | Final Recommendation | Architectural & Engineering Rationale |
|---|---|---|---|
| **Framework** | React 19 / Next.js / Vue | **React 19** | Industry standard for R3F, declarative UI, component isolation; Next.js SSR adds unnecessary Node server complexity for a portfolio. |
| **Build Tool** | Vite 6 / Webpack / Turbopack | **Vite 6** | Instant startup, lightning-fast HMR, lean Rollup production builds, simple static file handling. |
| **Language** | TypeScript / Modern JavaScript | **Modern JavaScript (ESM)** | Eliminates 3D typing battles and build boilerplate while delivering identical runtime performance. |
| **Styling** | Vanilla CSS / Tailwind / Styled-Comp | **Vanilla CSS + Tokens + Modules** | Highest runtime performance, zero abstraction over typography clamp formulas, protects monograph identity. |
| **3D Engine** | Three.js / Babylon.js / PlayCanvas | **Three.js (r170+)** | World standard WebGL engine, widest ecosystem, optimal shader community. |
| **3D React** | @react-three/fiber | **@react-three/fiber (v9)** | Elegant declarative Three.js binding, unified React state, automatic disposal. |
| **3D Helpers** | @react-three/drei | **@react-three/drei** | Battle-tested helpers (`useGLTF`, `OrbitControls`, `Float`, `Center`). |
| **Animation** | GSAP / Framer Motion / Motion | **GSAP 3 + ScrollTrigger** | Unrivaled timeline control, scrubbed scroll synchronization, high performance. |
| **GSAP React** | @gsap/react | **@gsap/react (`useGSAP`)** | Official GSAP hook ensuring automatic cleanup and zero memory leaks. |
| **Rendering** | WebGL 2 / WebGPU | **WebGL 2 (Universal Baseline)** | 99.4% global device compatibility. WebGPU evaluated as progressive enhancement only. |
| **Routing** | React Router v7 / Wouter | **React Router v7** | Standard SPA routing, seamless code-splitting, URL parameter management. |
| **Backend** | Node / Supabase / None | **Static Client-Side (No Backend)** | Zero maintenance, zero attack surface, free global CDN hosting. Form via direct mailto / Formspree. |
| **Model Format** | GLB / OBJ / FBX / USDZ | **GLB (Compressed as Appropriate)** | Single-file binary container, compact geometry, universal web standard. |
| **Image Format** | WebP / AVIF / JPEG | **WebP (Multi-Resolution Srcset)** | 90%+ size reduction, universal browser support, exceptional line art retention. |

---

## 13. TECHNICAL RISK REGISTER

| # | Technical Risk | Impact | Probability | Mitigation Strategy |
|---|---|---|---|---|
| **R-01** | **Drive C: Exhaustion During Install** | 🔴 Critical | High | Explicitly redirect `npm cache` and temp directories to `D:\.npm-cache` before running any install command. |
| **R-02** | **Sacrificing Architectural Fidelity for MB Targets** | 🔴 Critical | Medium | Enforce **Visual Quality > Arbitrary File Size** principle; test visual fidelity before accepting any compressed mesh. |
| **R-03** | **Globe Aesthetic Failing Architectural Tone** | 🔴 Critical | Medium | Enforce mandatory 8-step visual validation prototype before building full globe interaction logic. |
| **R-04** | **Uncontrolled Batch Asset Conversion** | 🟡 Medium | High | Strictly enforce Selective Asset Processing; only convert assets explicitly curated for approved pages. |
| **R-05** | **Multiple WebGL Context Loss** | 🟡 Medium | Medium | Single active canvas rule; explicit geometry and material `.dispose()` on component unmount. |
| **R-06** | **Revit Files Missing Direct Web Pipeline** | 🟡 Medium | High | Defer Eco Resort / Hospital 3D models; lead with 40 photorealistic renders and 107 MB GRIHA thesis drawings. |
| **R-07** | **ScrollTrigger & R3F Desynchronization** | 🟡 Medium | Low | Use GSAP `useGSAP()` with scoped container refs; avoid mixing React state updates inside scroll scrub loops. |
| **R-08** | **Excessive Battery Drain / GPU Spin** | 🟡 Medium | Medium | Enforce `frameloop="demand"` on all canvases; set DPR clamp to `[1, 1.5]`; stop rendering when offscreen. |

---

## 14. FINAL RECOMMENDATIONS & WHAT NOT TO USE

### 14.1 Recommended Final Stack
```
┌──────────────────────────────────────────────────────────┐
│ CORE:      React 19 + Vite 6 + Modern JavaScript (ESM)   │
│ STYLING:   Vanilla CSS Design Tokens + CSS Modules       │
│ 3D:        Three.js r170+ + R3F + Drei + Draco GLB       │
│ ANIMATION: GSAP 3 + ScrollTrigger + @gsap/react          │
│ ROUTING:   React Router v7 (BrowserRouter)               │
│ PIPELINE:  Python Pillow (WebP) + Blender Draco (GLB)    │
└──────────────────────────────────────────────────────────┘
```

### 14.2 Technologies We Must NOT Use
1. **NO Tailwind CSS:** Prevents stylesheet bloat, preserves bespoke architectural typography clamp rules, and avoids generic utility styling.
2. **NO Next.js / Fullstack SSR:** Adds unnecessary server maintenance and Node deployment overhead for a portfolio that excels as a blazingly fast static CDN application.
3. **NO Framer Motion for 3D/Scroll:** GSAP ScrollTrigger has vastly superior scrub precision and timeline synchronization with WebGL canvases.
4. **NO Lenis Smooth Scroll Over-Engineering:** Virtual smooth scrolling often fights native mobile gesture physics and causes trackpad jank on macOS. Native smooth scrolling with GSAP ScrollTrigger is cleaner.
5. **NO WebGPU as a Hard Requirement:** Would break the site on ~40% of mobile devices and older laptops.
6. **NO Generic UI Component Kits (MUI / AntD / Chakra):** Architectural portfolios demand bespoke structural layouts, not off-the-shelf button components.

---

## 15. RECOMMENDED IMPLEMENTATION ORDER

```
PHASE 0: PRE-IMPLEMENTATION & DISK SAFETY (CRITICAL)
  1. Verify disk space on C: and D: drives.
  2. Configure npm cache to D: drive (npm config set cache "D:\.npm-cache").
  3. Scaffolding: Initialize React 19 + Vite project on D: drive.
  4. Selective Asset Pipeline: Run Python script to generate WebP derivatives ONLY for curated assets.

PHASE 1: DESIGN SYSTEM & CORE FRAMEWORK
  5. Implement CSS Tokens (tokens.css: typography clamps, colors, grids).
  6. Setup React Router v7 with route-level code splitting.
  7. Build Base Layout, Minimal Header Navigation, and Footer Salon.

PHASE 2: HOMEPAGE & EDITORIAL FOUNDATION
  8. Implement Opening Manifesto & Monumental Architectural Hero.
  9. Build Project Data Store (projectsData.js) with all 13+ verified coordinates.
 10. Implement Selected Flagship Project Preview cards.
 11. Implement Physical Craft Gallery (24 hand-cut contour model photos).
 12. Implement Architect Hafeez Contractor (AHC) Professional Archive monograph.

PHASE 3: SIGNATURE 01 — THE ATLAS (GLOBE)
 13. Build minimal visual prototype of GlobeCanvas for aesthetic validation.
 14. Validate cartographic visual language, pin clarity, and interaction ergonomics.
 15. Once approved: implement full two-way data coupling (Location ↔ Project Dossier Card).
 16. Add mobile responsive 2D vector fallback.

PHASE 4: FLAGSHIP PROJECT DETAIL PAGES & SIGNATURE 3D
 17. Build Project Detail Page template with 8-stage narrative architecture.
 18. Process MOBIUS_03.3dm through the quality-first 3D pipeline (verify runic detail).
 19. Implement Signature 02: Möbius 3D Orbital Maquette with Runic Discovery.
 20. Prepare Cultural Oasis stratified layers from SketchUp model.
 21. Implement Signature 03: Scroll-Driven Stratified Build Reveal.
 22. Build Ribbon of Life case study with vertical tower elevation track.

PHASE 5: ABOUT, CONTACT & SECONDARY WORK
 23. Build About Page (Novatr BIM credentials, education, capabilities matrix).
 24. Build Contact Salon (Email, LinkedIn, consultation inquiry).
 25. Build Secondary Project Case Studies (Flow Spire, Eco Resort).

PHASE 6: PERFORMANCE POLISH, ACCESSIBILITY & FINAL QA
 26. Audit WebGL contexts, memory disposal, and mobile DPR clamps.
 27. Enforce prefers-reduced-motion fallbacks for all 3D and scroll animations.
 28. SEO meta tags, OpenGraph previews, and Lighthouse 95+ performance validation.
```

---

## 16. IMPORTANT IMPLEMENTATION GUARDRAILS

The following six technical and artistic guardrails are permanently locked for all subsequent phases:

1. **Visual Quality Over Arbitrary 3D File-Size Targets:**  
   Never compromise architectural geometry, essential facade details, material nuances, or drawings merely to meet an artificial megabyte threshold. Target ranges are starting baselines, not hard acceptance criteria. Every model must pass visual inspection before acceptance.

2. **Globe Visual Validation Before Full Implementation:**  
   Do not invest engineering time in building complex interaction trees or transitions until a minimal visual prototype has been validated against the creative direction. The globe must unmistakably read as an architectural atlas rather than a generic 3D Earth demo.

3. **Selective Asset Processing Only:**  
   Never execute blind batch conversions across the 2.04 GB client archive. Process exclusively the assets required for the approved pages, flagships, and interactions.

4. **Client Archive Remains Read-Only:**  
   The source directory `client-assets/` is inviolable. No source file will ever be modified, renamed, moved, compressed, or deleted.

5. **No Unnecessary Duplication of the Archive:**  
   Do not duplicate the 2.04 GB archive or create redundant full-site copies. All derivatives must be generated directly into production target directories on `D:`.

6. **Disk-Space Safety Before Asset Processing:**  
   With the `C:` drive possessing only ~0.04 GB free space, all caches, temporary files, package installations, and outputs must be strictly directed to `D:`. Disk free space must be re-verified prior to any heavy processing workload.

---

## DOCUMENT STATUS

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                 TECHNICAL READINESS STATUS: APPROVED                       │
│                                                                            │
│   • Creative Direction is formally locked in MASTER_CREATIVE_DIRECTION_    │
│     FINAL.md.                                                              │
│   • Technical Architecture is approved with all three corrections          │
│     integrated (Quality-first 3D, Globe visual validation, and             │
│     Selective asset processing).                                           │
│   • Implementation has NOT started.                                        │
│   • Asset conversion has NOT started.                                      │
│   • The 2.04 GB client archive remains 100% untouched.                    │
│                                                                            │
│   NEXT STEP: Author IMPLEMENTATION_BLUEPRINT.md                            │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---
*End of Document — Approved by Senior Digital Art Director & Systems Architect*
