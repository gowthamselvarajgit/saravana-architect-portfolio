# MASTER CREATIVE DIRECTION
## Premium Interactive Architectural Portfolio
### SARAVANAKUMAR K — Graduate Architect

**Document Type:** Creative Direction × UX Specification × Implementation-Readiness Report  
**Date:** September 12, 2026  
**Status:** Pre-Development — Research & Documentation Phase  
**Safety Compliance:** Zero source files modified, converted, moved, or deleted.

---

> **Read alongside:** [`CLIENT_ASSET_AUDIT.md`](./CLIENT_ASSET_AUDIT.md) — the forensic asset inventory that validates every creative decision in this document.

---

## PART 1 — CREATIVE BRIEF SYNTHESIS

### 1.1 The Central Concept

The portfolio must communicate a single, coherent idea:

> **Architecture shaped by place.**

Every design, typographic, and interactive decision must serve this concept. The visitor should leave understanding *where* Saravanakumar's architecture lives, *why* it exists, and *how* it was discovered — not merely that it looks impressive.

The portfolio is framed as:

**A DIGITAL ARCHITECTURAL ATLAS**

The world is the index. Geography is the organizing principle. Place births idea, idea becomes form, form becomes space. This is not metaphor — it is literally true of the client's work, which spans Oslo, Katra, Kerala, Mumbai, Pune, Goa, Gurugram, Amaravati, and Lothal.

**Asset Validation:** The client's own portfolio (Page 3) presents a dotted world map connecting project locations. The globe concept is native to his thinking — we are amplifying his own conceptual structure, not imposing one.

---

### 1.2 What This Must NOT Feel Like

| Anti-Pattern | Why It's Excluded |
|---|---|
| Generic React portfolio | Technology-first rather than architecture-first |
| AI-generated website | No human editorial curation; mechanical repetition |
| Student portfolio template | Rigid section order, card grids, generic layout |
| Generic architecture template | Lacks specificity to this architect's work and places |
| SaaS landing page | Commercial product language; wrong audience register |
| Real-estate website | Property-selling language; misrepresents the work |
| Three.js technology demo | 3D as spectacle rather than architectural understanding |
| Purple AI gradients, glassmorphism | Visually contradicts the material seriousness of architecture |

---

### 1.3 The Three Signature Moments

The site has exactly three moments of technological peak:

| Signature | Experience | Project(s) |
|---|---|---|
| **01 — THE WORLD** | Interactive 3D globe as geographic portfolio index | All 13+ geolocated projects |
| **02 — INTERACTIVE ARCHITECTURAL MODEL** | Orbital 3D viewer of a flagship parametric structure | Möbius Pavilion (Oslo) / Technopark Tower (Kerala) |
| **03 — BLUEPRINT → ARCHITECTURE REVEAL** | Scroll-driven architectural construction sequence | Cultural Oasis / Flow Spire / Eco Resort |

Everything else is supporting material. Three strong ideas executed with precision are worth more than twenty decorative effects.

---

## PART 2 — INFORMATION ARCHITECTURE

### 2.1 Site Structure

```
SITE ROOT
│
├── HOME                           ← Single-page orchestrated journey
│   ├── HERO                       ← Hybrid visual + typography + motion
│   ├── WORLD / GLOBE              ← Signature 01: Interactive geographic index
│   ├── SELECTED PROJECTS          ← Editorial catalogue preview (3–4 flagships)
│   ├── PROCESS / CRAFT            ← Physical model progression gallery
│   ├── PROFESSIONAL EXPERIENCE    ← Hafeez Contractor archive (editorial)
│   ├── ABOUT                      ← Condensed architect statement
│   └── CONTACT                    ← Exhibition closing statement
│
├── PROJECTS                       ← Full catalogue
│   ├── FLAGSHIP WORK              ← 6 academic / competition projects
│   ├── PROFESSIONAL ARCHIVE       ← 8 Hafeez Contractor projects
│   └── [PROJECT DETAIL]           ← Individual immersive project pages
│
├── ABOUT                          ← Full architect page
│
└── CONTACT                        ← Standalone contact page
```

### 2.2 Project Hierarchy

Projects are explicitly tiered by interactive depth, not by personal preference alone. The tiers reflect available assets and narrative completeness.

| Tier | Projects | Interactive Depth |
|---|---|---|
| **★★★★★ FLAGSHIP** | Cultural Oasis, Ribbon of Life, On the Path to Rediscovery | Full story arc + 3D + build reveal or orbital |
| **★★★★ STRONG** | Flow Spire, Eco Resort | Strong storytelling + physical model + drawing reveal |
| **★★★ CURATED** | Design Explorations, Hospital (pending client confirmation) | Editorial presentation; product/detail focus |
| **★★ ARCHIVE** | 8 Hafeez Contractor internship projects | Professional archive; renders + concise data |

---

## PART 3 — HOMEPAGE EXPERIENCE

### 3.1 Hero

**Direction: Hybrid Hero** — architectural image + typographic statement + subtle spatial motion → transition into globe.

**Opening sequence:**

```
[Full-bleed cinematic image OR ambient section]

         ARCHITECTURE
         IN RESPONSE
         TO PLACE

                    SARAVANAKUMAR K
                    Graduate Architect

         [EXPLORE WORK ↓]
```

The opening image must be architectural — either the Cultural Oasis night amphitheatre render (`Image18.png`) or the Oslo Möbius twilight render (`render-1.png`). Both are validated in the asset audit as the strongest cinematic frames available.

**Asset Candidates (Validated):**
- `Cultural Oasis_01/PNG/RENDER/Image18.png` (40.8 MB) — illuminated night amphitheatre with glowing lotus fountain and colonnade. Cinematic. Unique.
- `On the path to Rediscovery_06/PNG/RENDER/render-1.png` (53.4 MB) — dramatic aerial of the dark Möbius loop against Oslo's green canopy.

**What the visitor understands within 5 seconds:**
*"This is an architect whose work is connected to place."*

**Animation approach:**
- Subtle ken-burns drift on the hero image (GSAP, transform-only, GPU-accelerated)
- Typographic entrance: staggered line-by-line reveal, opacity + slight vertical shift
- Scroll indicator: minimal downward arrow or thin line
- NO particle effects, NO glowing title, NO gradient text

### 3.2 Globe Section

The globe is the geographic portfolio index. It is not decoration.

**Visual language:**
Inspired by the client's own portfolio map on Page 3 and the principle of an architectural atlas. Restrained point-cloud / dotted continent rendering, NOT photorealistic Earth, NOT Google Maps. Closer to technical drawing than geographic simulation.

**Interaction model:**

```
User scrolls into globe section
→ Globe fades in / rises from below
→ Project location pins pulse gently
→ User rotates globe via drag (desktop) / touch (mobile)
→ User hovers/taps a pin
→ Location card appears:

  ┌─────────────────────────────┐
  │  OSLO                       │
  │  NORWAY                     │
  │                             │
  │  ON THE PATH TO REDISCOVERY │
  │  Parametric Cultural Pavilion│
  │                             │
  │  [EXPLORE →]                │
  └─────────────────────────────┘

→ Click EXPLORE → project page transition
```

**Globe Pin Locations (All Validated in Asset Audit):**

| Pin | Location | Project(s) |
|---|---|---|
| 1 | Oslo, Norway (59.9167° N, 10.7364° E) | On the Path to Rediscovery |
| 2 | Katra, J&K (32.9930° N, 74.9318° E) | Cultural Oasis |
| 3 | Thiruvananthapuram, Kerala (8.5241° N, 76.9366° E) | Ribbon of Life |
| 4 | Mumbai / Thane cluster (19.07° N, 72.88° E) | Flow Spire, The Crest at BKC, Club House, Ridgeview |
| 5 | Pune cluster (18.52° N, 73.86° E) | Eco Resort, Vertical Nexus |
| 6 | Goa (15.2993° N, 74.1240° E) | The Portico Privé Villa |
| 7 | Amaravati, AP (16.5131° N, 80.5165° E) | The Zenith Institution |
| 8 | Lothal, Gujarat (22.5222° N, 72.2497° E) | Maritime Interpretation Centre |
| 9 | Gurugram, NCR (28.4595° N, 77.0266° E) | The Diadem Tower |

**Cluster handling:** Mumbai/Thane and Pune are geographically close. On hover, expand the cluster into a list rather than overlapping individual pins. Do not force geographic precision at the cost of usability.

### 3.3 Selected Projects Preview

3–4 flagship projects presented as editorial cards below the globe section. This is NOT the full project index — it is a curated editorial preview.

**Format:**

```
01
CULTURAL OASIS

KATRA
JAMMU & KASHMIR, INDIA

[large atmospheric image]
```

Strong whitespace. Large type. The number, title and location act like archive notation.

**Interaction (restrained):**
- Hover: subtle image slow-drift (not scale), thin horizontal line appears, "EXPLORE PROJECT" appears in small caps
- Cursor: can transform subtly (crosshair → pointer) but no custom animated cursors
- No: glowing borders, bounce, heavy parallax, scale transforms

### 3.4 Process / Craft Section

A gallery showcasing the Physical Model → 3D Model → Architecture progression.

**Asset basis (Validated):**
- 24 photos of Katra physical contour model (`Cultural Oasis_01/PNG/PHYSICAL MODEL/`)
- Physical model photos from `COLLAGE PAGE/` (53 files including diagrid tower, shell pavilion, watchtower spiral)
- Video clip: `COLLAGE PAGE/01/WhatsApp Video 2026-08-03 at 12.53.13.mp4` (1.73 MB, genuine jury presentation footage)

**Format:** Horizontal scroll gallery or grid. Each progression set shows:
`PHYSICAL MODEL PHOTO → 3D DIGITAL MODEL → FINAL RENDER`

### 3.5 Professional Experience Section

Presents the 8 Hafeez Contractor projects as a professional archive. Editorial. Concise. Respectful of scale without overstating authorship.

**Attribution language (consistent, pending client confirmation):**
*"Work executed during Architectural Internship — Architect Hafeez Contractor, Mumbai (Jun–Nov 2025)"*

**Format:** Staggered editorial grid or horizontal scroll. Project name, typology, location. No heavy 3D. Renders and plans only.

---

## PART 4 — PROJECT DETAIL PAGE FRAMEWORK

### 4.1 Universal Story Framework

Every flagship project page follows this narrative arc, adapted to each project's actual content:

```
01  PLACE         Where is it? Geographic and urban context.
02  QUESTION      Why does this architecture need to exist?
03  RESEARCH      What was discovered through site analysis?
04  CONCEPT       What idea emerged from the research?
05  DEVELOPMENT   How did the concept become form?
06  MODEL         Physical model → 3D model → digital space.
07  ARCHITECTURE  The final built/proposed architecture.
08  RESULT        Final renders; the complete spatial proposal.
    [NEXT PROJECT →]
```

The section labels are flexible — adapt to each project's vocabulary. Cultural Oasis may say "PILGRIMAGE" instead of "PLACE." Oslo may say "LANGUAGE" instead of "RESEARCH." Do not force identical labels on unlike narratives.

### 4.2 Typography Within Project Pages

Use the contrast of large editorial type vs small technical data as a visual identity system:

```
01 / PLACE

KATRA
JAMMU & KASHMIR
INDIA

PROGRAM              TYPE                 YEAR
Cultural + Tourism   Academic (LPU)       2024

Then large display:

CULTURAL
OASIS
```

This pattern repeats through every section. The system creates rhythm without repetition.

---

## PART 5 — FLAGSHIP PROJECT EXPERIENCES

### 5.1 CULTURAL OASIS — ★★★★★

**Location:** Katra, Jammu & Kashmir, India
**Type:** Urban Intervention / Transit Hub / Cultural Complex
**Asset richness:** Highest of all projects — deepest storytelling opportunity.

**Asset inventory (Validated in Audit):**
- SketchUp 3D model: `SITE 3D_09F.skp` (116.62 MB)
- Physical model: 24 photographs of hand-built Katra topographic city contour model
- Site analysis: 5 Kevin Lynch PDFs (Activity Map, Edge Map, Node Map, Kevin Lynch Study, Urban Analysis Graphic)
- Architectural renders: 14 images including 66.6 MB night amphitheatre and 40.8 MB garden dining renders
- Drawings: Site plan (1:500), exploded axonometric, floor plans, sections, colonnade elevations

**Narrative arc:**

```
01 PLACE        → Katra, J&K. The gateway to Vaishno Devi.
                  Overcrowding. Transit fatigue.
                  Lost Dogra cultural heritage.

02 RESEARCH     → Kevin Lynch urban analysis.
                  Pathways. Nodes. Edges. Districts.
                  Activity mapping. Height zoning.
                  [Interactive: overlay / toggle between analysis layers]

03 CONCEPT      → Dead urban voids transformed into
                  oasis of cultural memory and pilgrimage respite.

04 PHYSICAL     → 24 photographs of the hand-built
                  topographic city contour model of Katra.
                  [Gallery: close-up details of craftsmanship]

05 DIGITAL      → SketchUp model exploration
                  [Interactive: scroll-driven site flyover OR
                   exploded floor-plate viewer]

06 ARCHITECTURE → Sunken circular amphitheatre.
                  Lotus fountain. Colonnade shrines.
                  Multi-storey accommodation.

07 BUILD REVEAL → BLUEPRINT → GROUND → COLONNADE →
                  UPPER FLOORS → ROOF → FINAL RENDER
                  [Signature 03: Scroll-driven build sequence]

08 RESULT       → Night renders: illuminated amphitheatre,
                  water reflections, lantern-lit garden court.
```

**Build Reveal sequence (Asset-validated):**
- Stage 1 (Blueprint): Ground & First floor 2D plans from Portfolio Pages 7–8
- Stage 2 (Ground): Ground floor walls and plinth
- Stage 3 (Colonnade): Classical arched exterior colonnade with shrine alcoves
- Stage 4 (Upper Level): Second floor guest rooms and balcony
- Stage 5 (Roof): Overhanging hipped roof with dormer gables
- Stage 6 (Result): Cross-dissolve to `Image18.png` night render

**Source basis:** The client's own Portfolio Page 8 contains the exploded axonometric isolating these exact four structural strata — the build reveal literally enacts the drawing that already exists in the archive.

**UX Risk:** SketchUp `.skp` file is 116.6 MB — contains entire site. Must be exported to optimized GLB (<6 MB) with Draco compression before any web rendering. Do NOT load raw file.

---

### 5.2 RIBBON OF LIFE (TECHNOPARK) — ★★★★★

**Location:** Thiruvananthapuram, Kerala, India
**Type:** Mixed-Use Urban Master Plan + 42-Storey Commercial Tower
**Asset richness:** Strong — highest thesis-level narrative depth.

**Asset inventory (Validated in Audit):**
- Rhino 3D model: `SITE MODEL_03_final.3dm` (45.75 MB) — full campus, 42-storey tower, ribbon bridges
- Government tender documents: 4 authentic RFP/EoI PDFs proving real-world brief
- Renders: 12 high-res images including 42-storey tower elevation and campus aerial
- Drawings: State demographic analysis, concept evolution sketches, zoning section, 42-storey floor plans (all tiers), Y-shaped residential plans, commercial bridge plans

**Narrative arc:**

```
01 PLACE        → Thiruvananthapuram, Kerala.
                  India's highest state literacy rate: 96.2%.
                  Yet 70% of talent leaves for Bengaluru, Hyderabad, Mumbai, abroad.

02 QUESTION     → Why does the smartest state
                  lose its people?

03 RESEARCH     → Official government Technopark tender (actual RFP).
                  Employment statistics. Urban transit analysis.

04 CONCEPT      → THE RIBBON OF LIFE.
                  An unbroken spatial loop connecting:
                  WORK (IT Towers) ↔ HOME (Residential) ↔
                  WELLNESS (Lakeside Center) ↔ RECREATION (Public Realm)

05 FORM         → Form development: Site → Axis → Massing →
                  Ribbon Integration → Final Form
                  [Animated diagram sequence]

06 TOWER        → 42-Storey biomimetic commercial skyscraper.
                  Scroll-driven vertical ascent:
                  L01 Podium → L15 Sky Garden → L30 Upper Office → L42 Crown
                  [Signature 02: Interactive 3D tower viewer]

07 MASTERPLAN   → 1,100 dwelling units. Athletic field. Lakes.
                  Elevated skyway pedestrian ribbons.
                  Lakeside wellness centre.

08 RESULT       → Campus aerial render + tower perspective renders.
```

**Interactive 3D Treatment:**
The 42-storey tower is the strongest standalone 3D viewer candidate after the Möbius pavilion. Consider:
- Scroll drives camera from podium level upward
- At key floors, labels appear: "Level 15 — Sky Garden", "Level 30 — Executive Offices", "Level 42 — Crown"
- User can pause scroll and orbit-inspect any level

**Asset Note:** The `SITE MODEL_03_final.3dm` at 45.75 MB contains the full master plan, not just the tower. For web, isolate tower geometry only (reduces model complexity significantly before GLB export).

**Content Flag:** Portfolio Page 10 introductory text is accidentally a copy of Page 4 (Cultural Oasis). The correct Ribbon of Life project description must be sourced from pages 11–15, the tender documents, and the resume — NOT Page 10's introductory paragraph.

---

### 5.3 ON THE PATH TO REDISCOVERY — ★★★★★

**Location:** Tullinløkka Square, Oslo, Norway
**Type:** Parametric Cultural Pavilion (Old Norse Memory)
**Context:** 120-Hours International Architectural Competition, March 2025

**Asset inventory (Validated in Audit):**
- Rhino 3D model: `MOBIUS_03.3dm` (11.72 MB) — pure Möbius strip geometry with Old Norse runes
- Renders: 4 images (53.4 MB + 33.9 MB + 14.1 MB + 15.4 MB) — twilight aerial, eye-level lawn approach, under-arch gathering, reflection pool dusk
- Vector drawings: `MOBIUS_03.pdf`, `MOBIUS_04.pdf`
- Grasshopper script definition (documented in portfolio Page 29)

**Narrative arc:**

```
01 PLACE        → Oslo, Norway. Tullinløkka Square.
                  Between the Historical Museum and National Gallery.

02 QUESTION     → "The Art of Losing."
                  What happens to a language when no one speaks it?
                  What remains of a culture when it falls silent?

03 RESEARCH     → Old Norse linguistics. Runic carvings.
                  Shelley's Ozymandias.
                  "What is lost is never truly gone —
                   only waiting to be found."

04 CONCEPT      → THE MÖBIUS STRIP.
                  No beginning. No end.
                  A continuous surface that returns to itself.
                  Like memory. Like language. Like culture.

05 PARAMETRIC   → Grasshopper script definition.
                  Mathematical Möbius transformation.
                  [Show: parametric logic → mesh generation — static visual]

06 MODEL        → MOBIUS_03.3dm — the pure geometric form.
                  Old Norse runes inscribed on the soffit.
                  [Signature 02: Interactive 3D orbital viewer]
                  User orbits. User discovers the runes underneath.
                  Real-time wireframe / clay / material toggle.

07 ARCHITECTURE → Public gathering bowl.
                  Acoustic underside. Reflective pool.
                  Urban integration with Tullinløkka.

08 RESULT       → 4 cinematic renders. Twilight. Dusk.
                  Visitors beneath the dark runic arch.
```

**Interactive 3D Treatment — Primary Candidate:**
`MOBIUS_03.3dm` is the top-priority 3D conversion candidate.
- 11.72 MB Rhino file → estimated <3 MB compressed GLB
- Pure NURBS/mesh surface → clean WebGL conversion
- Minimal polygon complexity → high probability of 60fps on desktop and mid-range mobile
- The discovery moment (runes on the underside) is an inherently interactive experience — it can only be discovered by orbiting the model

**Competition Context:** This is a 120-Hours competition entry, meaning it was conceived and delivered under extreme time constraint. This should be mentioned in the project narrative as it reveals speed of thinking, not just final outcome.

---

### 5.4 ECO RESORT (NATURE'S NEST) — ★★★★

**Location:** Ghodegaon, Pune District, Maharashtra, India
**Type:** Vernacular Eco-Hospitality / Container Architecture
**Context:** GRIHA Trophy Competition Entry, February 2025

**Asset inventory (Validated in Audit):**
- Revit BIM model: `SITE_3D_02.rvt` (31.10 MB) — stepped hillside, container cottages, clubhouse
- Competition submission: `final griha.pdf` (107.38 MB, 11-page board)
- 5 vector site elevation PDFs
- 5 individual building 3D studies (PDFs)
- 40 render boards (GRIHA Part 1 & 2)

**Narrative arc:**

```
01 PLACE        → Ghodegaon, Pune. Hillside terrain.
                  Sloped topography as design constraint.

02 CONCEPT      → Upcycled shipping containers as
                  modular dwelling units.
                  Cut-and-fill hillside adaptation.

03 BUILD REVEAL → TOPOGRAPHY → CONTAINERS → TIMBER →
                  OBSERVATION TOWER → LIVING LANDSCAPE
                  [Signature 03 candidate: Scroll-driven reveal]

04 ARCHITECTURE → Stepped resort: reception, restaurant (sweeping curved timber roof),
                  dormitory, cottages, observation tower.

05 RESULT       → Hillside isometric render.
                  Stone stairway cottage renders.
                  Water canal along dormitory.
```

**3D Note:** The Revit BIM file requires export to FBX first (requires Revit installed), then Blender conversion to GLB. This is a higher-risk pipeline than the Rhino models. For Phase 1, use renders and vector drawings; defer 3D viewer to Phase 2 if Revit pipeline cannot be established cleanly.

---

### 5.5 FLOW SPIRE (SKYLINE-HUB) — ★★★★

**Location:** Vasavi River / Thane Creek junction, Thane, Mumbai, Maharashtra
**Type:** 350m Landmark Watchtower / Mixed-Use Coastal Master Plan

**Asset inventory (Validated in Audit):**
- NO raw 3D model file in archive (only drawings and renders)
- 11 detailed vector drawing PDFs (multi-level plans, diagrid geometry)
- 11 renders and diagrams
- Physical model photographs (multi-tiered floor-plate tower model with spiraling helix fins)

**Narrative arc:**

```
01 PLACE        → Thane. Vasavi River. Coastal junction.
                  Majiwada Junction — worst traffic congestion in MMR.
                  No high-rise commercial landmark for the city.

02 CONCEPT      → Water drop → Flow → Vortex →
                  Vertical Rise → Core & Spine → Functional Pods
                  [Animated form evolution sequence from portfolio diagrams]

03 PHYSICAL     → Physical model photographs.
                  Multi-tiered floor plates. Spiraling helix structural fins.
                  [Gallery]

04 ARCHITECTURE → 350m tower. Observation deck at +330m.
                  Sky Lounge, Fine Dining, 360° View.
                  Photovoltaic leaf solar canopy.

05 BUILD REVEAL → CORE → FLOOR PLATES (+80m, +160m, +330m) →
                  DIAGRID EXOSKELETON → SOLAR CANOPY → FINAL RENDER
                  [Drawing-based layer animation from vector PDFs]

06 RESULT       → Bird's-eye master plan + tower perspective renders.
```

**3D Strategy without source file:**
Since no 3D model exists, two options:
1. **Preferred:** Use the detailed floor plan PDFs (8 vector files) as the basis for a drawing-to-form reveal using 2D SVG/PNG layer animation. Faithful to the documented geometry.
2. **Alternative:** Reconstruct a lightweight illustrative 3D wireframe in Blender, based strictly on the documented floor plans and elevations. This is asset-reconstruction from drawings, not fabrication.

**Client Confirmation Required:** Does the client have the original 3D model file for Flow Spire?

---

### 5.6 DESIGN EXPLORATIONS — ★★★

**Type:** Industrial & Modular Product Design (Academic, 6th Semester)

**Projects:**
1. **Pet House** — modular feline habitat with behavioral UX journey
2. **Modular Stationery Organizer** — articulating desk organizer with LED ambient ring

**Format:** Product design section, not architectural storytelling. Use exploded diagrams, orthographic projections, and clean product renders. Lighter editorial treatment.

**Asset Note:** The 3D subfolder is empty; all material is embedded in `SK FD PORTFOLIO.pdf`. Assets must be extracted from PDF as individual high-res PNG pages before web use.

---

## PART 6 — TYPOGRAPHY SYSTEM

### 6.1 Two-Personality Type System

**DISPLAY (Editorial / Architectural):**
- Large, confident, architectural
- Used for project titles, section headers, location names, hero statements
- Candidate: `Cormorant Garamond` (refined, architectural elegance — Google Fonts, free)
- Alternative: `Playfair Display` (Google Fonts, free)

**UTILITY / TECHNICAL:**
- Compact, precise, documentation-like
- Used for project numbers, year, location data, typology, dimensions, annotations
- Candidate: `Space Grotesk` (Google Fonts, free)
- Metadata / mono: `DM Mono` (Google Fonts, free)
- Body text: `Inter` (Google Fonts, optimal screen legibility)

**Size ratio example:**

```css
/* Display — hero / project title */
font-size: clamp(3.5rem, 8vw, 9rem);
letter-spacing: -0.02em;

/* Editorial label — section numbers */
font-size: 0.75rem;
letter-spacing: 0.15em;
text-transform: uppercase;

/* Technical metadata */
font-size: 0.875rem;
letter-spacing: 0.05em;
```

**Rules:**
- Do NOT use gradient text on display type
- Do NOT use white glow behind display type
- Do NOT use uppercase if it reduces readability at scale
- DO use uppercase for location names (OSLO, KATRA, THIRUVANANTHAPURAM)
- DO use small caps for section labels (01 / PLACE, 02 / CONCEPT)

---

## PART 7 — COLOR SYSTEM

### 7.1 Primary Palette

| Token | Value | Use |
|---|---|---|
| `--color-ground` | `#0A0906` | Primary dark background (near-black warm) |
| `--color-paper` | `#F4F0E8` | Light mode / section backgrounds (warm architectural paper) |
| `--color-ink` | `#1A1815` | Primary text on light backgrounds |
| `--color-chalk` | `#E8E4DC` | Secondary light surface |
| `--color-blueprint` | `#1A2B4A` | Blueprint-inspired deep navy (controlled use only) |
| `--color-line` | `rgba(255,255,255,0.08)` | Subtle dividers on dark backgrounds |
| `--color-accent` | `#C41E2A` | Restrained crimson accent (from portfolio cover red dot) |
| `--color-accent-muted` | `rgba(196,30,42,0.15)` | Hover states, active pins |

**Rationale:** The client's own portfolio cover features a minimal architectural grid with a bold crimson/red circular accent. This crimson is already part of his visual identity — we inherit it rather than invent an alien accent color.

**What to avoid:**
- DO NOT use `#6B46C1` purple or blue-purple gradients
- DO NOT use rgba glassmorphism blur panels
- DO NOT use heavy drop shadows on cards
- DO NOT use neon accents of any kind
- Images provide the color richness — the UI should be restrained

### 7.2 Section Rhythm

```
HERO              → Dark (--color-ground) + full-bleed image
GLOBE             → Dark → transitional gradient
PROJECTS PREVIEW  → Light (--color-paper) — typography-led
PROCESS / CRAFT   → Dark — photography-led
PROFESSIONAL      → Light — editorial grid
ABOUT             → Transitional
CONTACT           → Dark — minimal, closing
```

---

## PART 8 — ANIMATION & INTERACTION PHILOSOPHY

### 8.1 Animation Hierarchy

**Level 1 — Normal Content (everywhere):**
- Opacity reveal on scroll entry (IntersectionObserver)
- Subtle Y-axis shift on entrance (8–16px, 400–600ms, ease-out)
- Image lazy-load with soft fade
- Hover on links: underline draw, subtle color shift

**Level 2 — Important Content (section transitions, project cards):**
- Typography choreography: staggered word/line reveals
- Pinned section scrolling for project narrative sections
- Image cross-dissolve transitions (render → drawing → render)
- Location card appearance on globe hover (scale + opacity, spring easing)

**Level 3 — Signature Interactions (three locations only):**
- Globe: Three.js / R3F interactive rotation, pin hover states
- 3D Model Viewer: orbital camera, material toggle, rune reveal
- Build Reveal: scroll-driven mesh assembly / layer progression

**Rule:** If a section has Level 3 animation, the surrounding sections must be Level 1 only. Contrast is essential. If everything moves, nothing feels important.

### 8.2 Scroll Behavior

Use GSAP ScrollTrigger for pinned sections and scroll-linked animations.

**Pinned section rule:** Only pin flagship project narrative sections and the globe section. Do NOT pin every section.

### 8.3 Cursor

Minimal cursor transformation only:
- Default → `crosshair` on interactive 3D areas
- Default → subtle larger dot on project cards
- Avoid: trailing cursors, particle cursors, custom animated cursors

### 8.4 Page Transitions

- Fade out (200ms) → brief black frame → fade in (300ms)
- Total transition time: <800ms
- No full-screen wipes, spinning effects, or curtain reveals

---

## PART 9 — LOADING EXPERIENCE

**Direction:**

```
[Full screen dark background]

SARAVANAKUMAR K

LOADING ARCHIVE

[thin horizontal progress bar]

01 / 05 LOADING MODELS...
```

Optional: SVG stroke-dasharray animation of the Möbius pavilion outline slowly resolving.

**Rules:**
- Maximum preload time target: 3 seconds on broadband
- Only preload assets needed for immediate first view
- Lazy load everything below the fold
- Mobile: simplify preloader; defer 3D assets; load static fallback first

---

## PART 10 — NAVIGATION

```
[Left]  SARAVANAKUMAR K         [Right]  PROJECTS   ABOUT   CONTACT
```

- On scroll: navbar gains slight dark overlay after 60px
- During immersive sections: navbar fades to 30% opacity, reappears on mouse-top-hover
- Mobile: Hamburger → full-screen dark menu overlay with large type

---

## PART 11 — ABOUT PAGE

**Content structure (all verified facts from resume/portfolio):**

```
01  ARCHITECT
    Saravanakumar K | Graduate Architect | Ooty, Tamil Nadu, India

02  PHILOSOPHY
    [From portfolio CV — condensed, not verbatim paste]

03  EDUCATION
    B.Arch — Lovely Professional University (2021–2026) | CGPA: 7.49

04  EXPERIENCE
    Architectural Intern — Architect Hafeez Contractor
    Mumbai, India | Jun–Nov 2025 | 14+ live projects

05  CERTIFICATIONS
    BIM Architecture Professional — Novatr (Jul 2026–Present)
    BIM Project Standards — Revit, ACC, Navisworks (Feb 2026)
    Parametric Modeling — Lumos Archi Lab (Jul–Aug 2023)
    Computer-Aided Design — AutoCAD, HRD (Aug 2022)

06  CAPABILITIES
    [Organised matrix, not a list]
    BIM / CAD  |  3D & Computational  |  Visualization
    Coordination  |  Sustainability  |  Documentation
```

**Portrait:** Portfolio Page 2 (`02_CV_PAGE.png`) contains a professional portrait. Extract and optimize for web.

---

## PART 12 — CONTACT PAGE

```
LET'S DISCUSS
A PROJECT

saravanaarchitecture@gmail.com
linkedin.com/in/architect-saravanakumar
Based in Ooty, Tamil Nadu, India.
Open to opportunities globally.

[Optional: simple contact form — Name / Email / Message / Send]
```

**Note:** Confirm with client whether to display direct phone number publicly.

---

## PART 13 — MOBILE EXPERIENCE

| Feature | Desktop | Mobile |
|---|---|---|
| Globe | Three.js interactive, drag to rotate | Touch drag; simplified dotted sphere; reduce pin count if needed |
| 3D Model Viewer | Full orbital, material toggle | Reduced quality GLB, touch orbit, no material toggle |
| Build Reveal | Horizontal scroll-pinned | Vertical scroll-driven only |
| Project narrative | Pinned horizontal panels | Vertical section stack |
| Hero image | Full-bleed 100vh | Full-bleed 85vh |
| Typography | Large display sizes | Responsive clamp values; minimum 2.5rem for display headings |
| Navigation | Inline horizontal | Hamburger → full-screen overlay |

---

## PART 14 — IMPLEMENTATION READINESS ANALYSIS

### 14.1 Technically Realistic — High Confidence ✅

| Experience | Basis |
|---|---|
| Hero with cinematic image + typography | Assets validated; standard GSAP |
| Globe with geo-pins | All 9 coordinates documented; standard Three.js R3F |
| Editorial project catalogue | All renders exist; responsive image optimization is standard |
| Kevin Lynch analysis overlay (Cultural Oasis) | 5 PDF studies exist; convert to layered PNG/SVG |
| Physical model photography gallery | 77+ photos across projects |
| Möbius 3D viewer | `MOBIUS_03.3dm` 11.72 MB — clean NURBS, low-risk GLB conversion |
| Page transitions | Standard GSAP |
| Scroll-driven section animations | GSAP ScrollTrigger |
| Preloader with progress | Standard implementation |
| Contact form | Standard HTML + Formspree or equivalent |
| About page | Full content validated in resume |

### 14.2 Realistic with Preparation Required — Medium Confidence ⚠️

| Experience | Preparation Needed |
|---|---|
| Cultural Oasis SketchUp 3D viewer | Convert 116.6 MB `.skp` → FBX → Blender mesh cleanup → Draco-compressed GLB <6 MB |
| Ribbon of Life tower 3D viewer | Convert 45.75 MB `.3dm` → isolate tower only in Blender → GLB <5 MB |
| Eco Resort 3D viewer | `.rvt` requires Revit export to FBX (client must perform). Then Blender → GLB |
| Build Reveal (Cultural Oasis) | Three.js mesh reveal driven by ScrollTrigger; requires geometry grouped by construction stage |
| Build Reveal (Flow Spire — no 3D file) | SVG/PNG layer animation from vector PDFs, OR lightweight 3D reconstruction from floor plans |
| Asset optimization pipeline | Batch convert 50–66 MB PNGs to <600 KB WebP/AVIF via ImageMagick/Sharp |

### 14.3 High Risk / Requires Special Planning 🔴

| Experience | Issue |
|---|---|
| Eco Resort Revit BIM interactive 3D | Requires Revit software (client must export FBX). No standalone conversion path. |
| Hospital Revit BIM | Same Revit dependency. Also: inclusion pending client decision (CF-01). |
| Hosting original 500+ MB PNG renders | Never deploy raw files. Optimization pipeline is non-negotiable prerequisite. |
| Live Grasshopper in browser | Not feasible. Show static documentation of script logic instead. |
| Loading all 3D models simultaneously | Never do this. Load on-demand per project page with disposal on navigation. |
| Custom globe GLSL shader | Dotted continent rendering via Three.js Points geometry + custom shader. Standard but requires shader expertise. |

---

## PART 15 — UX RISK REGISTER

| Risk | Severity | Mitigation |
|---|---|---|
| Globe too complex → user doesn't understand it's navigational | 🔴 High | Add "Drag to explore" instruction. Animate one pin-hover automatically as introduction. |
| Build reveal scroll hijacking feels jarring | 🟡 Medium | Use GSAP `scrub` (not snap) for smooth continuous scroll feel. Allow user to scroll past. |
| 3D model viewer performance on mobile | 🟡 Medium | Serve low-poly GLB for mobile. Static render fallback if WebGL unavailable. |
| Project narrative too long → user disengages | 🟡 Medium | Max 3 paragraphs per section. Let images carry the narrative. |
| Hafeez Contractor attribution ambiguity | 🟡 Medium | Clear, consistent attribution on every internship project. Pending CF-03. |
| Flow Spire missing 3D model | 🟡 Low-Medium | Physical model photography + drawings are primary medium. Still compelling without 3D. |
| Portfolio Page 10 text error (Ribbon of Life) | 🟡 Low-Medium | Ribbon of Life content must be written from Pages 11–15 + tender docs. NEVER use Page 10 intro text. |

---

## PART 16 — PERFORMANCE RISK REGISTER

| Risk | Severity | Mitigation |
|---|---|---|
| Individual PNG renders up to 66.6 MB | 🔴 Critical | Mandatory: convert to WebP/AVIF at 80–85% quality, multi-resolution srcset (400w / 1200w / 2400w) |
| `SITE 3D_09F.skp` 116.6 MB | 🔴 Critical | Convert, clean, compress to <6 MB GLB before any web loading |
| Three.js globe + active 3D model on same page | 🟡 Medium | Globe on home page only. 3D viewer on individual project pages only. Never both active simultaneously. |
| `final griha.pdf` 107.38 MB | 🟡 Medium | Extract images to WebP. Offer compressed PDF download only if user requests. |
| C: drive ~0.10 GB free | 🟡 Medium | All build tools, caches, outputs strictly on D: drive only |

---

## PART 17 — CONTENT FLAGS REQUIRING CLIENT CONFIRMATION

| # | Question | Impact |
|---|---|---|
| **CF-01** | Should the Hospital project be featured or archived? | Determines whether a 6th detailed project page is built |
| **CF-02** | Should the Motel cum Restaurant be included? | Minor — early works section if included |
| **CF-03** | Are there NDA restrictions on Hafeez Contractor internship projects? | Attribution language and drawing detail level on public website |
| **CF-04** | Does the client have the original 3D model for Flow Spire? | Determines 3D viewer vs drawing-based reveal |
| **CF-05** | Public phone number or form-only contact? | Contact page implementation |
| **CF-06** | Preferred personal tagline / brand statement? | Hero and about sections |

---

## PART 18 — PROJECT ASSET READINESS MATRIX

| Project | Hero Image | Story Images | Drawings | Physical Model | 3D GLB | Build Reveal |
|---|---|---|---|---|---|---|
| Cultural Oasis | ✅ | ✅ (14 renders) | ✅ (Pages 4–9) | ✅ (24 photos) | ⚠️ (.skp conversion needed) | ⚠️ (scene authoring needed) |
| Ribbon of Life | ✅ | ✅ (12 renders) | ✅ (Pages 10–15) | ✅ (diagrid model) | ⚠️ (.3dm conversion needed) | N/A |
| On the Path to Rediscovery | ✅ | ✅ (4 renders) | ✅ (2 PDFs) | N/A | ✅ Ready (11.7 MB → ~3 MB GLB) | N/A |
| Eco Resort | ✅ | ✅ (40 renders) | ✅ (5 PDFs) | N/A | 🔴 (Revit export needed) | ⚠️ (viable from drawings) |
| Flow Spire | ✅ | ✅ (11 renders) | ✅ (11 PDFs) | ✅ (model photos) | 🔴 (no source file) | ⚠️ (drawing-based viable) |
| Design Explorations | ✅ | ✅ (in PDF) | ✅ (orthographic) | N/A | N/A | N/A |
| Hafeez Contractor (8 projects) | ✅ (in portfolio PDF) | ✅ | ✅ | N/A | N/A | N/A |
| Hospital | ✅ | ✅ (19 renders) | N/A | N/A | 🔴 (Revit export needed) | N/A |

---

## PART 19 — RECOMMENDED IMPLEMENTATION PHASES

### Phase 0 — Asset Pipeline (Pre-Development, Non-Negotiable First Step)
1. Batch convert all render PNGs/JPGs → responsive WebP/AVIF at 400w / 1200w / 2400w
2. Convert `MOBIUS_03.3dm` → GLB via Blender (Rhino export → OBJ → Blender → GLB + Draco compression)
3. Convert `SITE MODEL_03_final.3dm` → tower-only GLB via Blender
4. Request Revit FBX export from client for Eco Resort (and Hospital if CF-01 confirmed)
5. Extract design exploration assets from `SK FD PORTFOLIO.pdf` as individual page PNGs
6. Resolve all content flags CF-01 through CF-06

### Phase 1 — Foundation & Home
1. Project scaffolding (React + Vite + R3F + GSAP + routing)
2. Design system (tokens, typography, color, base components)
3. Homepage: Hero + Globe + Selected Projects + Craft + Professional + About + Contact
4. Möbius 3D viewer (standalone component)
5. Preloader

### Phase 2 — Flagship Project Pages
1. Cultural Oasis — full narrative + build reveal
2. Ribbon of Life — full narrative + tower 3D viewer
3. On the Path to Rediscovery — full narrative + Möbius interactive
4. Flow Spire — full narrative + drawing-based reveal

### Phase 3 — Supporting Project Pages
1. Eco Resort (3D deferred to Phase 4 pending Revit export)
2. Design Explorations
3. Professional Archive (8 Hafeez Contractor projects)

### Phase 4 — Polish & Optimization
1. Eco Resort 3D viewer (if Revit export successful)
2. Mobile experience refinement
3. Performance audit (Lighthouse, WebGL profiling)
4. Accessibility review
5. SEO meta tags and structured data
6. Cross-browser testing

---

## PART 20 — DELIBERATE CREATIVE DECISIONS WITH JUSTIFICATIONS

### Decision 1: Möbius Pavilion as Primary 3D Hero (not Cultural Oasis)

The Cultural Oasis SketchUp model at 116.6 MB is significantly more complex than the Möbius at 11.72 MB. The Möbius is a purer, mathematically precise geometry that converts cleanly and predictably to GLB. Cultural Oasis is better served by its build reveal and physical model photography. The Möbius 3D viewer is the flagship interactive moment precisely because it is small, precise, and discoverable — the runes cannot be seen until the user orbits the model.

### Decision 2: Globe as Separate Section, Not Hero

The creative direction specifies "HYBRID HERO" — architectural image + typography FIRST, then globe. The globe appears after the hero scroll, not as the opening frame. This ensures the visitor understands the architect's identity before they engage with geographic exploration.

### Decision 3: Crimson Accent from Portfolio Cover

The client's portfolio cover (`01__COVER PAGE.png`) already features a bold crimson/red circular accent dot on an architectural grid. Rather than invent an accent color, we inherit his own visual identity. This creates coherence between the portfolio document and the website.

### Decision 4: No Custom Animated Cursor

Custom animated cursors were explicitly excluded in the creative brief (Section 31). A subtly-transformed cursor state is retained for interactive elements only.

### Decision 5: Flow Spire Reveal from Drawings (Not 3D Model)

No 3D model file exists for Flow Spire. Rather than fabricate a completely invented geometry, we use the architect's own detailed floor plan PDFs (8 vector files documenting every level) as the basis for a drawing-to-form reveal sequence. This is more architecturally honest than a speculative 3D reconstruction.

### Decision 6: Grasshopper Script as Static Visual, Not Live

Running Grasshopper parametric logic in a browser is technically not feasible (Grasshopper is a Rhino plugin; it has no browser runtime). The script is presented as a documented visual diagram — showing the logic without falsely implying live computation.

---

## PART 21 — FINAL CREATIVE STATEMENT

> The website should feel like walking through a digital architectural exhibition where every project is a journey from PLACE to IDEA to FORM to SPACE.

Every decision in this document has been tested against this statement.

The globe: reveals **place**.
The narrative sections: reveal **idea and process**.
The 3D viewers: reveal **form**.
The renders: reveal **space**.

Technology serves architecture. Architecture is the hero.

---

*End of Document*
*Next Phase: Implementation Plan (pending client confirmation on content flags CF-01–CF-06)*

---

**Cross-References:**
- [`CLIENT_ASSET_AUDIT.md`](./CLIENT_ASSET_AUDIT.md) — Forensic asset inventory (primary source of truth for all content claims)
- `docs/client/portfolio.pdf` — Client's official portfolio document (43 pages)
- `docs/client/resume.pdf` — Client's professional resume (2 pages)
- `client-assets/` — 2.04 GB source archive (read-only, untouched)

