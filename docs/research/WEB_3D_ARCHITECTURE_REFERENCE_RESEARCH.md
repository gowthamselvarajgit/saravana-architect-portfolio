# WEB & 3D ARCHITECTURAL REFERENCE RESEARCH
## Interactive Spatial Principles for the Saravana Architectural Monograph

**Document Reference:** `docs/research/WEB_3D_ARCHITECTURE_REFERENCE_RESEARCH.md`  
**Governing Authority:** `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md`  
**Technical Infrastructure:** `docs/research/TECHNICAL_READINESS.md`  
**Construction Blueprint:** `docs/research/IMPLEMENTATION_BLUEPRINT.md`  
**Asset Baseline:** `docs/research/ASSET_DERIVATIVE_INVENTORY.md`  
**Date:** September 13, 2026  
**Role:** Senior Digital Art Director + Creative Technologist + 3D WebGL Specialist  
**Status:** Complete Forensic Research & Strategic Synthesis  

---

## EXECUTIVE SUMMARY & GOVERNING DIRECTIVE

This research synthesizes interaction design, WebGL performance, 3D maquette presentation, and spatial transitions from world-class digital architecture experiences and the six required reference platforms.

The portfolio of **Saravana Kumar K** is not a generic creative showcase, nor is it a commercial real-estate website. It is an **Architectural Monograph × Interactive Spatial Atlas × Tactile 3D Maquette Gallery** governed by a singular ontological premise:

> ### **"ARCHITECTURE SHAPED BY PLACE"**
> **PLACE → IDEA → PROCESS → FORM → SPACE**
>
> Technology never performs for its own sake; it reveals the invisible geographic, climatic, and cultural forces that generate physical architectural form.

### Strict Governance Guardrails
1. **Source-of-Truth Primacy:** Verified client assets in `client-assets/` and the locked decisions in `MASTER_CREATIVE_DIRECTION_FINAL.md` remain the absolute authority. No reference website overrides client files or locked art direction.
2. **Typography System Locked:** Only **Cormorant Garamond** (Display), **Inter** (Body), and **DM Mono** (Technical Drafting) are permitted. Zero new font families will be introduced.
3. **Palette Locked:** Warm architectural paper (`#F4F0E8`), obsidian drafting ground (`#0A0906`), drawing ink (`#1A1815`), and authentic crimson seal (`#C41E2A` / `#B31822` / `#E03E48`). Zero generic purple gradients, neon glows, or SaaS glassmorphism.
4. **Zero Fabrication:** 3D models and drawings originate exclusively from authentic Rhino (`.3dm`), SketchUp (`.skp`), Revit (`.rvt`), and CAD vector sheets.

---

## 1. FORENSIC REFERENCE ANALYSIS

Below is the forensic examination of the six nominated reference platforms and key contemporary digital architectural benchmarks.

---

### REFERENCE 01: United Carriers (`https://unitedcarriers.com/`)
*Global Logistics & Spatial Routing Platform*

* **INTERACTION OBSERVATION:**
  - **First Screen:** Dark, deep spatial environment with an immediate focal point on glowing terrestrial telemetry and geographic route nodes.
  - **Navigation:** Precision monospaced badges (`DM Mono`-style), geographic coordinates (`LAT / LONG`), and structured data grids.
  - **3D / Map Presentation:** Interactive spatial nodes connected by dynamic routing arcs across dark geographical space.
  - **Scroll & Movement:** Scroll triggers smooth camera panning across planetary infrastructure nodes rather than jarring full-page jumps.
  - **Information Reveal:** Contextual cards slide out on click with detailed routing specs, transit times, and compliance data.

* **WHY IT WORKS:**
  - Replaces abstract business statistics with palpable spatial geography.
  - The technical typography and coordinate badges impart institutional authority and operational precision.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **Cartographic Coordinate Telemetry:** Display latitude/longitude tags (e.g., `8.5581° N, 76.8807° E` for Technopark) as elegant drafting callouts.
  - **Spatial Project Node Indicators:** Clean circular pulsing pins on the Atlas globe that expand into architectural project summary cards upon hover.
  - **Monospaced Data Badges:** Architectural project metadata (Climate Zone, Site Area, Structural System, Year) organized into crisp drafting tables.

* **WHAT WE SHOULD AVOID:**
  - Fast-paced commercial shipping urgency, aggressive enterprise contact CTAs, and neon-saturated high-frequency glowing traces.

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Grounds every architectural project in its undeniable geographic reality. A building in Thiruvananthapuram is physically rooted in the Arabian Sea coastal plain; this telemetry proves it is not a placeless concept.

---

### REFERENCE 02: Graffico Office (`https://office.graffico.it/`)
*Interactive 3D Architectural Workspace Tour*

* **INTERACTION OBSERVATION:**
  - **First Screen:** Seamless camera entry directly into a 3D architectural volume.
  - **Camera Movement:** Constrained orbital motion paired with pre-choreographed vantage points. The user does not get lost in free space; clicking a room smoothly animates the camera to that specific viewpoint.
  - **3D Model Presentation:** Baked ambient occlusion and soft indirect lighting make the architectural model feel tactile, volumetric, and physically real.
  - **Spatial Annotations:** Hotspots anchored to 3D world coordinates that maintain their screen-space registration regardless of camera rotation.
  - **Cursor Interaction:** Subtle camera parallax linked to mouse movement creates spatial depth even while static.

* **WHY IT WORKS:**
  - Solves the primary flaw of WebGL: "user lost in empty 3D space." By strictly constraining orbit angles and providing guided camera viewpoints, it keeps the visitor engaged with architectural intent.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **Constrained Orbit Controls:** In the **Möbius Pavilion** 3D viewer, restrict polar angles (`minPolarAngle: Math.PI / 6`, `maxPolarAngle: Math.PI / 2.1`) so the camera never clips underground or inverts.
  - **Choreographed Vantage Points:** Instant camera transitions to key architectural perspectives: *Eye-Level Approach*, *Aerial Axonometric*, *Soffit Rune Under-view*, and *Plan Overlook*.
  - **World-Space Drafting Pins:** Pin monospaced notes (`[01] Torus Knot Shell`, `[02] Cast Concrete Base`, `[03] Integrated Runes`) directly onto the 3D pavilion mesh.

* **WHAT WE SHOULD AVOID:**
  - Unconstrained first-person navigation, heavy raw uncompressed textures, and complex collision physics that degrade frame rates on mobile devices.

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Allows the visitor to examine the maquette from the precise vantage points Saravana designed—especially looking upward into the Möbius soffit to understand how light and structural geometry interact.

---

### REFERENCE 03: ERA Residence (`https://www.era-residence.com/`)
*Contemporary Mediterranean Architectural Showcase*

* **INTERACTION OBSERVATION:**
  - **First Screen:** Monumental high-contrast serif typography overlaid on warm, tactile architectural photography. Slow, deliberate cinematic ease.
  - **Pacing & Navigation:** Editorial monograph feel. Generous whitespace, asymmetric layouts, and slow scroll velocity.
  - **Drawing-to-Render Alignment:** Interactive residence selectors overlay structural CAD floor plans directly onto rendered 3D perspectives.
  - **Color & Texture:** Warm linen, natural stone, limestone white, and terra cotta undertones. No harsh tech blacks or synthetic neon.
  - **Mobile Adaptation:** High-density 3D is gracefully degraded into clean architectural photography carousels with identical typography and framing.

* **WHY IT WORKS:**
  - Communicates timeless permanence and high architectural value. The pacing respects the visitor's intelligence rather than bombarding them with micro-animations.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **Monograph Editorial Spreads:** Large `Cormorant Garamond` serif headings paired with clean `Inter` body text and generous architectural margins.
  - **Blueprint / Section Overlay Slider:** An interactive curtain slider comparing Saravana's raw CAD section drawings against the finished exterior render.
  - **Material-Led Color Palette:** The warm paper background (`#F4F0E8`), drawing ink (`#1A1815`), and crimson seal accent (`#C41E2A`) create an authentic monograph mood identical to luxury architectural publications (*El Croquis*, *Detail*).

* **WHAT WE SHOULD AVOID:**
  - Commercial real-estate lead-generation popups, cookie-cutter "Book a Showing" buttons, and endless generic interior decor photography.

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Saravana's projects (such as the Cultural Oasis and Eco Resort) are deeply engaged with natural materials, climate mitigation, and landscape integration. ERA's material calm provides the perfect visual temperament.

---

### REFERENCE 04: God's Eye View (`bilawalsidhu/gods-eye-view`)
*Planetary Spatial Intelligence & Photorealistic 3D Globe*

* **INTERACTION OBSERVATION:**
  - **Macro-to-Micro Transition:** Smooth exponential camera fly-to from global orbit down into pinpoint geographic coordinates.
  - **LOD (Level of Detail) Scaling:** Objects dynamically shift representations based on camera distance: orbital pin → site boundary polygon → 3D architectural massing.
  - **Screen-Space HUD & Reticles:** Monospaced coordinate readouts, elevation counters, and framing brackets that track active targets.
  - **GLSL Shading Modes:** Ability to toggle visual rendering modes (Cartographic, Noir, Environmental/Elevation).

* **WHY IT WORKS:**
  - Conveys a feeling of total spatial mastery and authentic cartography. The smooth camera flight across thousands of kilometers creates visceral awe.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **The Digital Atlas Camera Flight:** When the user clicks an architectural project on the Atlas page, the camera performs a smooth spherical flight from global orbit down to the project's exact geographic coordinates (e.g., rotating from Norway down to Kerala).
  - **Architectural Drafting Reticle:** A lightweight vector HUD that brackets the project location with latitude, longitude, elevation above sea level, and monsoon wind vectors.
  - **Atmospheric Rim Shader:** A custom Three.js GLSL Fresnel shader on the globe perimeter that gives depth and realism without requiring massive multi-megabyte cloud textures.

* **WHAT WE SHOULD AVOID:**
  - Military HUD styling, crosshairs, surveillance terminology ("targets", "contacts"), and heavy streaming 3D tilesets requiring third-party API keys (Cesium/Google Maps). Everything must run self-contained and offline.

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Directly realizes the first tier of our ontological journey: **WORLD → PLACE**. Visitors see where each project sits in relation to regional topography, oceanic coastlines, and climate belts.

---

### REFERENCE 05: Pascal Editor (`pascalorg/editor`)
*Open-Source 3D Architectural Massing Engine (React Three Fiber)*

* **INTERACTION OBSERVATION:**
  - **Architecture-First UI:** Built entirely in React Three Fiber with zero extraneous video-game fluff.
  - **Orthographic vs. Perspective Toggles:** Seamless animated camera transition between 3D Perspective and architectural orthographic projections (Top/Plan, Front/Elevation, Right/Section).
  - **Layer / Floor Isolation:** Ability to isolate building levels (Basement, Ground, Level 1, Roof) and structural layers (Columns, Slabs, Envelope).
  - **Drafting Grid & Snapping:** Precise architectural grid underlays that visually anchor building massing to scale.

* **WHY IT WORKS:**
  - It treats 3D not as decoration, but as an analytical architectural instrument. Every control mirrors how an architect thinks and presents work.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **Orthographic View Switcher:** In the 3D Project Viewer, allow visitors to click `[PERSPECTIVE]`, `[PLAN]`, `[ELEVATION]`, or `[AXONOMETRIC]` with smooth camera slerping.
  - **Stratified Layer / Section Isolation:** Especially powerful for **Cultural Oasis**: visitors can peel away the stepped landscaped roof terraces to reveal the subterranean gallery levels beneath.
  - **Architectural Reference Grid:** A subtle monospaced dimensional grid (`ArchGrid`) under the 3D maquette with meter increments and compass orientation.

* **WHAT WE SHOULD AVOID:**
  - Complex editing tools, transform gizmos, generative massing algorithms, and dense multi-panel CAD toolbars. The visitor is an observer/juror, not a modeler.

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Shows that Saravana's buildings are not just sculptural shells, but deeply resolved architectural systems whose strata, floor plates, and structural cores respond to environmental criteria.

---

### REFERENCE 06: Three.js Architectural Walkthrough (`MuhammadMuzamil-dev/threejs-architectural-walkthrough`)
*Lightweight Native Three.js Architectural Spatial Renderer*

* **INTERACTION OBSERVATION:**
  - **Native Rendering:** Uses standard Three.js `GLTFLoader`, soft directional sunlight, and shadow maps running in a pure browser context.
  - **Zero Heavy Middleware:** Fast cold start, zero heavy engine dependencies, auto-adjusting aspect ratio and DPR scaling.

* **WHY IT WORKS:**
  - Proves that clean Three.js code with proper lighting and shadow settings delivers high-performance 60 FPS architectural rendering without bloated external game engines.

* **WHAT WE CAN ADAPT FOR SARAVANA:**
  - **Architectural Lighting Rig:** A disciplined 3-point architectural studio lighting setup:
    1. Warm Key Light (`#FFF8EE`, directional, casts soft PCF shadows).
    2. Cool Ambient Fill (`#D8E4F0`, simulates atmospheric sky bounce).
    3. Ground Rim Light (`#E8DEC8`, warm paper reflection).
  - **Progressive GLB Loading & Draco Decompression:** Fast asynchronous loading with DRACOLoader to keep 3D asset transfer under 2 MB.

* **WHAT WE SHOULD AVOID:**
  - WASD first-person keyboard controls (clunky on touchscreens, disorienting for clients and jury panels).

* **HOW IT FITS "ARCHITECTURE SHAPED BY PLACE":**
  - Guarantees that every visitor—whether reviewing the portfolio on an M3 MacBook Pro, an office Dell laptop, or an iPad—experiences flawless, stable 60 FPS architectural rendering.

---

## 2. 3D-SPECIFIC INTERACTION PATTERNS: FEASIBILITY & ADAPTATION

We evaluated 16 spatial patterns for compatibility with our **React 18 + Vite + R3F + Three.js + GSAP** stack:

| Pattern | Architectural Meaning | Technical Feasibility | Strategic Verdict | Implementation Plan |
|---|---|---|---|---|
| **Constrained Orbit** | Examines maquette without getting lost in void | Extremely High (Drei `OrbitControls`) | **ADOPT (Core)** | Clamp polar angles, set smooth damping (`dampingFactor: 0.05`), auto-rotate on idle. |
| **Choreographed Camera Vantage Points** | Shows intentional architectural viewpoints | Extremely High (GSAP + Camera slerp) | **ADOPT (Core)** | Preset buttons: `[Approach]`, `[Aerial Axon]`, `[Soffit Detail]`, `[Plan]`. |
| **Blueprint → 3D Transformation** | Demonstrates the leap from drafting to reality | High (Custom GLSL vertex shader / GSAP) | **ADOPT (Signature)** | Used in Build Reveal section: 2D vector CAD drawing extrudes into 3D massing. |
| **Stratified Section / Floor Isolation** | Explains internal vertical zoning | High (R3F mesh visibility / Y-offset) | **ADOPT (Signature)** | Used in **Cultural Oasis**: stepped strata lift upward like architectural model layers. |
| **Orthographic Projection Switcher** | Analyzes true architectural proportions | High (R3F Camera transition) | **ADOPT (High)** | Toggle between Perspective and Orthographic camera with animated frustum. |
| **Hover-Based World Hotspots** | Connects 3D geometry to technical details | High (Drei `Html` with screen clamping) | **ADOPT (Core)** | Pin tags (`[01] Torus Knot Shell`, `[02] Runes`) anchored to model vertices. |
| **Model Maquette Material Toggle** | Switches between Clay, Wireframe, and Render | High (Three.js material swap) | **ADOPT (High)** | Toggle: `[Clay Maquette]` (warm plaster), `[Drafting Wireframe]`, `[Material PBR]`. |
| **Scroll-Driven Camera Flight** | Guides narrative through architectural spaces | High (GSAP ScrollTrigger + Timeline) | **ADOPT (Signature)** | Camera orbits and descends as visitor scrolls through case study chapters. |
| **First-Person Walkthrough** | Explores interior spaces at human scale | Medium (PointerLockControls) | **REJECT** | Disorienting, high cognitive load, poor mobile touch support. |
| **Exploded Building Assembly** | Shows MEP / structural breakdown | Medium-High (Mesh hierarchy offsets) | **DEFER (Phase 4)** | Feasible for Ribbon of Life structural core; prioritize floor strata first. |
| **Live Sunlight / Shadow Simulator** | Shows solar path across day/seasons | High (DirectionalLight orbital math) | **ADAPT (Restrained)** | Simple morning/noon/dusk slider for Möbius Pavilion. |

---

## 3. GLOBE RESEARCH: "THE DIGITAL ATLAS"

The Atlas page must serve as a **meaningful spatial index**, not a decorative spinning ball.

```
                  ┌─────────────────────────────────┐
                  │              WORLD              │
                  │   Planetary Macro-Context       │
                  └────────────────┬────────────────┘
                                   │ Camera flight slerp
                                   ▼
                  ┌─────────────────────────────────┐
                  │            LOCATION             │
                  │ Coordinates, Climate, Topography│
                  └────────────────┬────────────────┘
                                   │ Bounding reticle zoom
                                   ▼
                  ┌─────────────────────────────────┐
                  │             PROJECT             │
                  │ Site Massing & Urban Response   │
                  └────────────────┬────────────────┘
                                   │ Spatial page transition
                                   ▼
                  ┌─────────────────────────────────┐
                  │          ARCHITECTURE           │
                  │ Detail, Craft, Space, Material  │
                  └─────────────────────────────────┘
```

### Key Technical Specifications for the Atlas Globe:
1. **Real-World Earth Surface & Cartography (Primary Client Requirement):**
   - The globe must immediately read as a **real planet Earth** with authentic, recognizable continents (Europe, Scandinavia, Indian subcontinent, Himalayas, Africa, Americas), real ocean basins, and true geographical contours.
   - High-performance, lightweight equirectangular Earth texture suite (~1 MB total payload):
     - `earth_atmos_2048.jpg` (512 KB): Real-world photographic color map showing continents, forests, mountains, deserts, green plains, icecaps, and real oceans.
     - `earth_specular_2048.jpg` (223 KB): Exact ocean reflectivity mask creating authentic sunlight glints across oceans while keeping landmasses matte and tactile.
     - `earth_normal_2048.jpg` (336 KB): Topographic surface normals, granting tangible 3D relief to the Himalayas, Western Ghats, Scandinavian shield, and Alps.
   - Precision sphere geometry (`radius: 3.2`, 64 segments).
   - Architectural graticule grid: delicate latitude and longitude drafting lines (15° intervals, Equator, Tropics) with north/south polar indicators.
   - Custom GLSL Fresnel vertex/fragment shader for an authentic atmospheric rim haze (warm amber/ivory glow facing the camera grazing angles, rejecting generic neon blue sci-fi glow).
2. **Hero Dominance on `/atlas`:**
   - The Earth sphere must be the visually dominant centerpiece of the viewport (filling 70–85% of screen height on desktop), surrounded only by minimal, elegant monograph typography and drafting metadata.
   - Subtle idle rotation (0.0008 rad/frame) when inactive; immediate, seamless user takeover upon pointer interaction.
3. **Project Pins & Hit Detection:**
   - Architectural registration markers plotted using standard geographical spherical projection:
     $$\phi = \text{latitude in radians},\quad \theta = \text{longitude in radians} + \pi/2$$
     $$x = -R \cdot \cos(\phi) \cdot \cos(\theta)$$
     $$y = R \cdot \sin(\phi)$$
     $$z = R \cdot \cos(\phi) \cdot \sin(\theta)$$
   - Concentric registration rings, central locus point, subtle breathing pulse, and crimson accent (`#C41E2A`).
   - Project coordinates labeled strictly as **"REPRESENTATIVE LOCATION COORDINATES"** (e.g. Oslo, Katra, Thiruvananthapuram, Ghodegaon, Thane), acknowledging they mark the project city/region rather than unverified exact cadastral pins.
4. **Camera Flight Choreography:**
   - On pin click, user free-orbit is temporarily paused.
   - GSAP timeline slerps `camera.position` and `controls.target` along a smooth arc above the globe surface (1.6s, `power2.inOut`), decelerating into a focused 45° vantage point over the selected region.
   - Instantly completes for visitors with `prefers-reduced-motion`.
   - Architectural project dossier slides in with verified information and an accessible `[RESET TO WORLD]` control.
5. **Performance & Lazy Loading:**
   - Canvas is lazily mounted only when the `/atlas` route is active; fully disposed on unmount.
   - DPR capped at `Math.min(window.devicePixelRatio, 1.75)` to prevent GPU throttling on retina screens.
   - Frameloop set to `demand` during idle; continuously renders only during camera motion or user dragging.
   - Zero project building models loaded on Atlas (saving bandwidth and memory).
   - Frameloop set to `demand` during idle; switches to continuous loop only during camera motion or user dragging.
5. **Mobile Fallback:**
   - On screens `< 768px`, the globe renders in a compact, touch-optimized upper viewport while a swipable horizontal monospaced project index occupies the bottom half.

---

## 4. ANIMATION SYSTEM: ARCHITECTURAL CHOREOGRAPHY

Animation must never exist as generic decoration ("animate everything because we can"). Every transition must communicate **structure, process, place, or navigation**.

### Architectural Transition Vocabulary:
1. **The Construction Wipe (Page-to-Page Transition):**
   - An architectural drafting line sweeps across the screen from left to right, followed by a warm paper wash (`#F4F0E8` / `#0A0906`).
   - Old content scales subtly down ($0.98\times$) as new content registers in perfect alignment with the Swiss grid.
2. **Blueprint Line Construction (Drawing Reveal):**
   - Vector CAD floor plans and sections reveal via SVG `stroke-dashoffset` animations synchronized with scroll progress.
   - First the primary grid lines appear, then structural columns, then wall envelopes, then dimensional annotations.
3. **Spatial Camera Handoff (Atlas to Project Page):**
   - Clicking a project on the Atlas globe initiates a camera zoom into the coordinate reticle. As the surface fills the screen, a seamless cross-fade transitions into the project's hero render, maintaining continuous visual focal direction.
4. **Editorial Typographic Stagger:**
   - Headings split by line; each line rises cleanly from behind an `overflow: hidden` mask with cubic bezier easing (`power3.out`, duration: 0.9s).
   - Paired technical metadata (DM Mono) renders instantly without fade, mimicking a teletype drafting output.
5. **Cursor-Reactive Depth:**
   - Modest mouse parallax on hero images and 3D maquettes ($\pm 12\text{px}$ displacement), giving tactile dimensional weight without inducing nausea.

---

## 5. REFINED TYPOGRAPHY & MATERIAL SYSTEM

### Typography Hierarchy (STRICTLY LOCKED)
No new fonts permitted. The system expresses elite architectural gravitas through pure proportion, tracking, and contrast:

| Role | Font Family | Weights | Tracking / Case | Architectural Context |
|---|---|---|---|---|
| **Display / Monumental** | **Cormorant Garamond** | 300 Light, 400 Regular, 400 Italic | `-0.02em`, Title/Sentence Case | Monograph titles, philosophical axioms, project names. |
| **Body / Narrative** | **Inter** | 400 Regular, 500 Medium | `-0.01em`, Sentence Case | Curatorial essays, design methodologies, project narratives. |
| **Technical Drafting** | **DM Mono** | 400 Regular, 500 Medium | `+0.05em`, UPPERCASE | Coordinates, scale tags (`1:100`), drawing numbers, structural specs. |

### Color & Material Palette (LOCKED)
- **Paper Light (Warm Drawing Paper):** `--color-paper: #F4F0E8`
- **Ground Dark (Obsidian Drafting Table):** `--color-ground: #0A0906`
- **Ink Primary:** `--color-ink: #1A1815`
- **Architectural Line:** `--color-line: rgba(26, 24, 21, 0.12)`
- **Adaptive Crimson Seal:**
  - Light mode: `--color-accent-paper: #B31822` (5.4:1 contrast ratio)
  - Dark mode: `--color-accent-ground: #E03E48` (4.8:1 contrast ratio)
  - Core emblem: `--color-accent-core: #C41E2A`

---

## 6. SYNTHESIS: THE ADAPTATION MATRIX

| Reference Platform | Adopted Interaction Pattern | Rejected Anti-Pattern | Exact Portfolio Page Destination |
|---|---|---|---|
| **United Carriers** | Coordinate badges, geographic telemetry tables, node-to-route storytelling. | High-saturation neon glows, commercial shipping urgency, aggressive conversion CTAs. | **Atlas Page** (`/atlas`), **Project Hero Headers** |
| **Graffico Office** | Constrained orbit, choreographed vantage point buttons, world-space vertex pins. | Free-camera gaming navigation, uncompressed texture weight. | **3D Project Viewer** (`/project/mobius-pavilion`) |
| **ERA Residence** | Monograph editorial pacing, split-screen layouts, CAD-drawing-over-render curtain slider. | Cookie-cutter real estate sliders, lead-gen popups. | **Project Case Study Spreads** (`/projects`, `/project/:id`) |
| **God's Eye View** | Macro-to-micro camera fly-to, screen-space target reticles, distance-based LOD. | Military/spy UI styling, radar sweeps, heavy external map streaming APIs. | **Atlas Page** (`/atlas`) |
| **Pascal Editor** | Orthographic projection switcher, stratified floor isolation, drafting grid underlay. | Complex modeling gizmos, generative massing algorithms, dense DAW-style toolbars. | **3D Project Viewer**, **Process/Craft Section** |
| **Three.js Walkthrough**| 3-point architectural studio lighting, soft PCF shadow maps, lightweight GLB loading. | WASD keyboard walking, PointerLock mouse capture. | **Global WebGL Canvas** |

---

## 7. STRATEGIC DECISION GATE: ALIGNMENT REVIEW

### Alignment with "Architecture Shaped by Place":
1. **The Atlas Globe** anchors every building in planetary and regional geography (climate zones, prevailing monsoons, solar trajectories).
2. **The 3D Maquette** enables analytical examination of environmental form (how the Möbius curve self-shades, how Cultural Oasis steps down to retain groundwater).
3. **The Build Reveal** demonstrates that architecture is not a static sculpture, but an assembled tectonic system arising from site geology.

### Conclusion & Approval Gate:
All research requirements are satisfied. The interaction direction is rigorous, technically feasible within our existing React + Vite + Three.js + R3F + GSAP architecture, respects all disk space and performance constraints, and strictly adheres to the locked creative direction.

Execution of the multi-page experience may proceed upon formal confirmation.
