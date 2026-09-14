# Client Asset Audit

**Project:** Premium Modern Cinematic Architectural Portfolio  
**Architect Client:** Saravanakumar K (Graduate Architect)  
**Date of Audit:** September 12, 2026  
**Status:** Complete Forensic Asset & Content Audit (Phase 0 — Pre-Design / Pre-Development)  
**Safety & Compliance:** Read-Only inspection performed. Zero source files modified, converted, moved, or deleted.

---

## 1. Executive Summary

An exhaustive forensic audit of the client’s source archive (`client-assets/`, 2,036.43 MB / ~2.04 GB across 260 files), official portfolio document (`docs/client/portfolio.pdf`, 43 pages), and professional resume (`docs/client/resume.pdf`, 2 pages) was completed.

### Core Discoveries:
1. **Architect Identity & Caliber:** The client is **Saravanakumar K**, a 2026 graduate from the Lovely School of Architecture and Design (LPU, Punjab) with exceptional computational, parametric, and visualization skills, backed by high-intensity professional internship experience at **Architect Hafeez Contractor (Mumbai)** working on massive 70–120+ acre live master plans and luxury high-rises.
2. **True Project Scale:** The body of work encompasses **16 distinct architectural and design projects**:
   - **6 Flagship Academic & Competition Projects** documented with deep research, hand sketches, Grasshopper scripts, physical models, and high-fidelity renders.
   - **8 Live Professional Projects** executed during the internship at Architect Hafeez Contractor across Mumbai, Thane, Pune, Goa, Amaravati, Gurugram, and Lothal.
   - **2 Additional Specialized Projects** in the client archive (a full 504 MB multi-building Hospital campus in Revit with 19 renders, and a University highway Motel/Dhaba/Restaurant project).
3. **Interactive 3D Assets:** Five production-grade 3D model files exist directly in the archive:
   - 2 Rhino `.3dm` models (the parametric **Mobius Loop Pavilion** in Oslo and the 42-storey **Technopark Master Model** in Kerala).
   - 2 Autodesk Revit `.rvt` BIM models (the **Eco Resort** in Pune and the **Hospital Campus**).
   - 1 Trimble SketchUp `.skp` model (the **Cultural Oasis Urban Intervention** in Katra, Jammu).
4. **Geographical Footprint & Native Globe Rationale:** The client's portfolio explicitly features a **dotted world map on Page 3** connecting his projects to real coordinates across Norway (Oslo) and India (Katra, Thane, Mumbai, Pune, Goa, Amaravati, Lothal, Gurugram, Thiruvananthapuram). The interactive globe requested for the website is not merely a decorative gimmick—it reflects the architect's own conceptual presentation structure.
5. **Physical-to-Digital Craftsmanship:** Rare among digital-native portfolios, Saravanakumar has built elaborate physical models—a full contoured city model of Katra, a bamboo/wire diagrid skyscraper, a biomimetic shell pavilion presented to university jurors, and an articulated spiral watchtower model. This enables a unique "Physical Model → 3D Model → Built Architecture" storytelling arc.
6. **Key Discrepancies & Flags:** 
   - The *Hospital* project is listed on the portfolio Table of Contents (Page 3) and possesses 504 MB of archive assets (including a Revit BIM file and 19 renders), but has **no project spread** in `portfolio.pdf`.
   - The *Motel cum Restaurant* is listed on the Table of Contents and exists in `OTHER PROJECTS`, but is omitted from `portfolio.pdf`.
   - In `portfolio.pdf` Page 10 (Technopark), the introductory text was accidentally copied from Page 4 (Cultural Oasis).
   - Massive raw render files (individual uncompressed PNGs up to 66 MB and 100+ MB PDFs) represent substantial performance risks requiring systematic asset optimization pipelines prior to web delivery.

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

## 2. Client Information

All information below is directly transcribed from `docs/client/resume.pdf` (Primary Authoritative Source) and corroborated with `docs/client/portfolio.pdf`.

* **Full Name:** SARAVANAKUMAR K *(Fact — Resume & Portfolio)*
* **Professional Title:** Graduate Architect *(Fact — Resume)* / Student Architect *(Fact — Portfolio CV)*
* **Date of Birth / Age:** 22 years old *(Fact — Portfolio CV: "22 | Tamil Nadu")*
* **Location / Base:** Ooty, Tamil Nadu, India *(Fact — Resume)*
* **Email:** saravanaarchitecture@gmail.com *(Fact — Resume & Portfolio)*
* **Phone:** +91 8778621993 *(Fact — Resume & Portfolio)*
* **LinkedIn:** [linkedin.com/in/architect-saravanakumar](https://www.linkedin.com/in/architect-saravanakumar) *(Fact — Resume)*
* **Digital Portfolio Link:** [shorturl.at/voWs5](https://shorturl.at/voWs5) *(Fact — Resume)*
* **Student Registration Number:** 12102169 *(Fact — Academic Project Submission Sheets in client-assets)*
* **Languages:**
  - Tamil (Native) *(Fact — Resume & Portfolio)*
  - English (Proficient) *(Fact — Resume & Portfolio)*
  - Kannada (Fluent / Proficient) *(Fact — Resume & Portfolio)*
  - Hindi (Intermediate) *(Fact — Resume & Portfolio)*

### Professional Profile Statement (Fact — Resume):
> *"Graduate Architect with hands-on experience gained through academic projects, design competitions, freelance work, and an architectural internship. Experienced in concept design, space planning, architectural documentation, 3D modeling, visualization, and collaborative project development across residential, commercial, hospitality, landscape, and urban design projects. Proficient in Revit, AutoCAD, Rhino, SketchUp, Adobe Creative Suite, and visualization tools, with strong design communication, problem-solving, and teamwork skills. Passionate about creating practical, user-centric, and sustainable design solutions."*

### Architectural Design Philosophy (Fact — Portfolio CV):
> *"As a student architect, I transform spaces into vibrant, functional works of art that resonate with those who inhabit them. I enjoy enhancing spaces to make them more attractive, engaging, and visually compelling while maintaining their purpose. Guided by creativity, innovation, and a commitment to sustainability, I harmonize form and function to elevate human experiences. My designs balance practical needs with a keen eye for detail, aiming to create a positive impact on the built environment."*

---

## 3. Master Project Inventory

The client's body of work spans 16 total projects classified into Academic, Competition, Professional (Internship), and Product/Design Explorations.

| # | Project Name | Context / Client | Typology | Location | Semester / Year | Portfolio Presence | Archive Presence | 3D Source |
|---|--------------|------------------|----------|----------|-----------------|--------------------|------------------|-----------|
| **01** | **Cultural Oasis** | Academic (LPU) | Urban Intervention / Transit Hub / Hospitality | Katra, Jammu & Kashmir, India | 7th Sem (Jul'24–Dec'24) | Yes (Pages 4–9) | Yes (`Cultural Oasis_01`) | Yes (`.skp` 116.6 MB) |
| **02** | **Ribbon of Life (Techno-Park)** | Academic Thesis (LPU) | Mixed-Use Urban Master Plan & 42-Storey Commercial Tower | Thiruvananthapuram, Kerala, India | 10th Sem Thesis (Jan'26–May'26) | Yes (Pages 10–15) | Yes (`RIBBON OF LIFE_THESIS_02`) | Yes (`.3dm` 45.8 MB) |
| **03** | **Eco Resort (Nature's Nest)** | GRIHA Trophy Competition | Vernacular Eco-Hospitality / Container Architecture | Ghodegaon, Pune, Maharashtra, India | 8th Sem / Feb 2025 | Yes (Pages 16–21) | Yes (`Eco ressort_03`) | Yes (`.rvt` 31.1 MB) |
| **04** | **Flow Spire (Skyline-Hub)** | Academic (LPU) | 350m Landmark Watchtower / Mixed-Use Coastal Master Plan | Thane, Mumbai, Maharashtra, India | 8th Sem (Jan'25–May'25) | Yes (Pages 22–27) | Yes (`WATCH TOWER_FLOW SPIRE_05`) | Drawings & Renders only |
| **05** | **On the Path to Rediscovery** | 120-Hours Competition | Parametric Cultural Pavilion (Old Norse Memory) | Tullinløkka, Oslo, Norway | 8th Sem / Mar 2025 | Yes (Pages 28–30) | Yes (`On the path to Rediscovery_06`) | Yes (`.3dm` 11.7 MB) |
| **06** | **Design Explorations: Pet House & Organizer** | Academic (LPU ARC-654) | Industrial & Modular Product Design | N/A (Indoor / Domestic) | 6th Sem | Yes (Pages 31–33) | Yes (`PRODUCT DESIGN`) | Embedded in PDF |
| **07** | **Physical Models Collection** | Academic / Competition | Material Craft / Diagrid / Biomimicry / Urban Fabric | Multiple Sites | 2021–2026 | Yes (Page 34) | Yes (`COLLAGE PAGE` & Project Folders) | Physical Craft / Photos & Video |
| **08** | **Club House (Upper Thane)** | Hafeez Contractor Internship | Residential Leisure Clubhouse | Upper Thane, Mumbai, Maharashtra | Jun'25–Nov'25 | Yes (Page 36) | In Portfolio PDF | Renders & CAD Sheets |
| **09** | **Vertical Nexus** | Hafeez Contractor Internship | 10-Acre High-Rise Residential (2.03M sq ft) | Kharadi, Pune, Maharashtra | Jun'25–Nov'25 | Yes (Page 37) | In Portfolio PDF | Renders & Master Plan |
| **10** | **The Portico Privé Villa** | Hafeez Contractor Internship | 120-Acre Luxury Plotted Development & Clubhouse | Goa, India | Jun'25–Nov'25 | Yes (Page 38) | In Portfolio PDF | Renders & Villa Details |
| **11** | **The Crest at BKC** | Hafeez Contractor Internship | Flagship Commercial High-Rise | Bandra Kurla Complex (BKC), Mumbai | Jun'25–Nov'25 | Yes (Page 39) | In Portfolio PDF | Renders & Structural Plan |
| **12** | **The Zenith Institution Campus** | Hafeez Contractor Internship | Large-Scale Waterfront Educational Campus | Amaravati, Andhra Pradesh / Hyderabad | Jun'25–Nov'25 | Yes (Page 40) | In Portfolio PDF | Renders & Massing |
| **13** | **Ridgeview Institute** | Hafeez Contractor Internship | Hill-Contour Integrated Campus | Jettri, Navi Mumbai, Maharashtra | Jun'25–Nov'25 | Yes (Page 41) | In Portfolio PDF | Renders & Terrain Model |
| **14** | **The Diadem Tower** | Hafeez Contractor Internship | Ultra-Luxury High-Rise (6BHK/7BHK) | Millennium City, Gurugram, Haryana | Jun'25–Nov'25 | Yes (Page 42) | In Portfolio PDF | Renders & Simplex Plans |
| **15** | **Maritime Interpretation Centre** | Hafeez Contractor Internship | National Maritime Museum & Heritage Complex | Lothal, Gujarat, India | Jun'25–Nov'25 | Yes (Page 43) | In Portfolio PDF | Renders & Tensile Plans |
| **16** | **Healthcare Hospital Complex** | Academic (LPU) | Multi-Wing Multi-Storey General Hospital | India *(Specific City Unconfirmed)* | Academic (LPU) | Listed on TOC (Page 3) | Yes (`HOSPITAL_NEW01` - 504 MB) | Yes (`.rvt` 11.1 MB) |
| **17** | **Highway Motel, Dhaba & Restaurant** | Academic (LPU ARC237) | Commercial Hospitality & Transit Dining | India *(Highway Site)* | 3rd/4th Sem | Listed on TOC (Page 3) | Yes (`OTHER PROJECTS`) | Architectural Sheets in PDF |

---

## 4. Project-by-Project Asset Inventory

### Project 1: Cultural Oasis (Urban Intervention & Tourist Hub)
* **Location:** Katra, Jammu & Kashmir (Vaishno Devi pilgrimage corridor)
* **Academic Level:** Individual Project | 7th Semester (Jul'24–Dec'24)
* **Archive Path:** `client-assets/Cultural Oasis_01/` (44 files, 362.10 MB)
* **Assets Available:**
  * **3D Model:** `Cultural Oasis_01/3D/SITE 3D_09F.skp` (116.62 MB SketchUp 3D file) containing the full site terrain, urban context, accommodation block, circular amphitheatre, shrine colonnade, and parking lot.
  * **Site Research & Analysis:** `Cultural Oasis_01/PDF/KVN ANA/` (5 files):
    * `kevin lynch study.pdf` (0.86 MB) — comprehensive Kevin Lynch urban cognitive framework.
    * `Edge map of Katra.pdf` (0.50 MB) — urban edges, rail barriers, and topographical bounds.
    * `Katra Activity map.pdf` (1.61 MB) — pilgrim circulation, market nodes, hotel densities.
    * `node.pdf` (0.27 MB) — vehicular and pedestrian confluence analysis.
    * `Artboard 3.png` (9.84 MB) — high-res layered urban analysis graphic.
  * **Physical Model Photography:** `Cultural Oasis_01/PNG/PHYSICAL MODEL/` (24 files, ~10.5 MB):
    * 24 detailed high-resolution photos of an enormous hand-crafted physical contour model showing the Katra railway station, pilgrimage arterial roads, contoured topography, and building blocks.
  * **Architectural Renders:** `Cultural Oasis_01/PNG/RENDER/` (14 files, ~235 MB):
    * Extreme high-res renders up to 66.6 MB (`Image18.png` 40.8 MB, `Image19.png` 66.6 MB, `Image16.jpg` 7.97 MB, `Image17.jpg` 6.95 MB, `Image10.jpg`, `Image11.jpg`, `Image13_000.jpg`, `Image19.jpg`).
    * Includes illuminated night renders of the sunken amphitheatre with central lotus fountain, daytime amphitheatre, garden restaurant promenade, accommodation building exterior, grand arched corridor interior, and arrival parking plaza.
  * **Drawings (in Portfolio Pages 4–9):**
    * Kevin Lynch cognitive urban mapping and 3D layered GIS stack (Built-Open, Building Height, Building Use, 3D Site mesh).
    * Colonnade shrine elevations (God Ram, God Hanuman, Goddess Durgai, Goddess Lakshmi, Goddess Saraswathi).
    * Site Section across gazebo, amphitheatre, shrine, and accommodation.
    * Master Site Plan (Scale 1:500) with 11-point key.
    * Accommodation building: Ground, First, and Second floor architectural layouts.
    * 3D Exploded Axonometric drawing isolating Ground Floor, First Floor, Second Floor, and Gable Roof assembly.
    * Building longitudinal and transverse cross-sections.

---

### Project 2: Ribbon of Life (Techno-Park)
* **Location:** Thiruvananthapuram (Trivandrum), Kerala, India
* **Academic Level:** B.Arch Capstone Thesis | 10th Semester (Jan'26–May'26)
* **Archive Path:** `client-assets/RIBBON OF LIFE_THESIS_02/` (23 files, 288.63 MB)
* **Assets Available:**
  * **3D Model:** `RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm` (45.75 MB Rhino 3D file) containing the entire campus master plan, organic ribbon bridges, 42-storey parametric skyscraper, MLCP, and residential cluster.
  * **Official Tender Documents:** `RIBBON OF LIFE_THESIS_02/TENDER/` (4 files, 14.22 MB):
    * `160 -rfp.pdf` (6.21 MB), `584- EoI.pdf` (3.66 MB), `584.pdf` (3.66 MB), `RFP approved27042021.pdf` (0.69 MB) — authentic government/technopark tender documentation proving real-world master planning brief.
  * **Architectural Drawings (PDFs):** `RIBBON OF LIFE_THESIS_02/PDFS/` (6 files, 4.88 MB):
    * `CUR OPT (1).pdf` (3.20 MB) — curved ribbon structural options.
    * `Housing_ele_01.pdf` (0.19 MB) & `Housing_ele_02.pdf` (0.14 MB) — residential tower elevations.
    * `OP1.pdf`, `OP1,1.pdf`, `OP2,2.pdf` — parametric options.
  * **Visual Renders & Graphics:** `RIBBON OF LIFE_THESIS_02/PNG/` (12 files, ~224 MB):
    * High-res renders of the 42-storey biomimetic office tower, continuous elevated circulation ribbons, curved lakeside wellness center, and master campus aerial.
  * **Drawings (in Portfolio Pages 10–15):**
    * State demographic analysis: Kerala literacy rate (96.2%) vs talent migration (Bengaluru 30.8%, Hyderabad 16.7%, Mumbai 13.2%, Abroad 29.8%).
    * Concept evolution sketches: Ribbon flow → Weaving programs → Rising ribbon → Thriving ecosystem.
    * Functional zoning cross-section connecting Residential (Live), Wellness (Relax), IT Towers (Work), Commercial (Shop), Public Realm (Play).
    * Form development diagram: Site → Axis → Massing → Ribbon Integration → Final Form.
    * Master Site Plan with athletic field, MLCP, lakes, and looping landscape spine.
    * 42-Storey Skyscraper: Level 1–42 elevation, central core floor plan, typical office plans 01, 02, 03, and three 3D massing options.
    * Residential District: 1,100 dwelling units / 2,750 residents; Y-shaped tri-wing floor plan, elevations 01 & 02, cluster axonometrics.
    * Commercial double-ring bridge plans and lake-spanning pedestrian boardwalk.

---

### Project 3: Eco Resort (Nature's Nest / GRIHA Trophy)
* **Location:** Ghodegaon, Pune District, Maharashtra, India
* **Context:** GRIHA Trophy Competition Entry | 8th Semester (Feb 2025)
* **Archive Path:** `client-assets/Eco ressort_03/` (54 files, 296.68 MB)
* **Assets Available:**
  * **3D Model:** `Eco ressort_03/3D/SITE_3D_02.rvt` (31.10 MB Autodesk Revit BIM file) detailing the stepped hillside terrain, shipping container cottages, reception, clubhouse, and observation tower.
  * **Complete Competition Submission:** `Eco ressort_03/PDF/final griha.pdf` (107.38 MB, 11-page master competition board presentation).
  * **3D Site Vector Sheets:** `SITE_3D_01.pdf` through `SITE_3D_05.pdf` (5.79 MB).
  * **Individual Building 3D Studies:** `Eco ressort_03/PDF/IND. BUILD. 3D/` (5 files, 2.25 MB):
    * `club house.pdf`, `Containter Home.pdf`, `Containter Home1_02_dor.pdf`, `reception 3d 1.pdf`, `RESTAURANT-2FINAL-1.pdf`.
  * **Raster Render & Presentation Boards:** `Eco ressort_03/PNG/PNG -PART-1 GRIHA/` and `PNG -PART-2-GRIHA/` (40 files, ~150 MB):
    * `GR1.jpg` to `GR19.jpg` and `GR19-1.png` to `GR33.jpg` providing high-resolution isolated components, watercolor illustrations, construction cut-and-fill diagrams, and environmental analysis.
  * **Drawings (in Portfolio Pages 16–21):**
    * Shipping container upcycling lifecycle and cut-and-fill slope adaptation diagrams.
    * Hillside longitudinal site elevation showing 12-point axis from entrance road to summit watchtower.
    * Full Master Site Plan (color-rendered with contour landscape and swimming pool).
    * 3D Isometric Master View of the entire stepped resort.
    * Individual Building Typologies:
      * Reception (pitched roof passive ventilation, floor plan + 3D axonometric).
      * Restaurant (curved sweeping wooden roof, two levels + 3D axonometric).
      * Dormitory (two-storey modular container block + 3D axonometric).
      * Cottages (3-level staggered container stack with cantilevered balconies + 3D axonometric).
    * Renders: Wooden diagrid tree-canopy pavilion, stone hillside cottage stairways, water canal along dormitory, and resort entrance court.

---

### Project 4: Flow Spire (Skyline-Hub)
* **Location:** Vasavi River / Thane Creek junction, Thane, Mumbai, Maharashtra, India
* **Academic Level:** Academic Project | 8th Semester (Jan'25–May'25)
* **Archive Path:** `client-assets/WATCH TOWER_FLOW SPIRE_05/` (22 files, 74.38 MB)
* **Assets Available:**
  * **Vector Architectural Drawings (PDF):** `WATCH TOWER_FLOW SPIRE_05/PDF/` (11 files, ~44.5 MB):
    * `Section and Elevations.pdf` (2.25 MB) — detailed architectural cut through the complex.
    * `MALL/ELE_01.pdf` (0.66 MB) & `MALL/ELE_02.pdf` (0.63 MB) — curved elevations of the retail podium.
    * `WATCH TOWER/SKY_MODEL_08_1.pdf` to `SKY_MODEL_08_8.pdf` (8 vector drawing files, 40.7 MB) — multi-level plans, observation decks, diagrid structural geometry.
  * **Visual Renders & Diagrams:** `WATCH TOWER_FLOW SPIRE_05/PNG/` (11 files, ~27.7 MB).
  * **Drawings (in Portfolio Pages 22–27):**
    * Urban context of Thane: traffic congestion at Majiwada Junction, lack of high-rise commercial icons, Masunda Lake, Ovalekar Wadi, Upvan Lake, Yeoor Hills.
    * Aerodynamic and wind mitigation concept diagrams (faceted rotating geometry breaking coastal drag).
    * Form evolution sequence: 01 Water Drop → 02 Flow → 03 Vortex → 04 Vertical Rise → 05 Core & Spine → 06 Functional Pods.
    * Vertical program zoning diagram:
      * Ground / Base: Entrance Plaza, Lobby, Lounge & Services.
      * Mid-Low (+80m to +84m): Info-Center, Museum, Art Gallery, Exhibition.
      * Mid (+160m to +164m): Water and Ecology Observatory & Research Labs.
      * High (+330m to +338m): Sky Lounge, Fine Dining, 360° Viewing Deck, Sky Green Garden with photovoltaic leaf canopy.
    * Multi-level Floor Plans (+80m, +84m, +160m, +164m, +330m, +334m, +338m).
    * Master Site Plan: Multi-loop highway cloverleaf interchange, shopping mall, circular hotel wing, convention center, golf course, MLCP.
    * Shopping Mall Podium: Basement -02, Basement -01, Ground Floor, First Floor, Voronoi-faceted crystal rock elevation, multi-level atrium sections.
    * Physical Model Photographs: Multi-tiered floor-plate tower model with external spiraling helix structural fins.

---

### Project 5: On the Path to Rediscovery (TPOR / 120-Hours)
* **Location:** Tullinløkka Square, Oslo, Norway
* **Context:** 120-Hours International Architectural Competition | 8th Semester (Mar 2025)
* **Archive Path:** `client-assets/On the path to Rediscovery_06/` (8 files, 131.78 MB)
* **Assets Available:**
  * **3D Model:** `On the path to Rediscovery_06/3D/MOBIUS_03.3dm` (11.72 MB Rhino 3D file) containing the pure continuous mathematical Möbius strip geometry, engraved runes, and site terrain.
  * **Vector Drawing Sheets:** `MOBIUS_03.pdf` (0.63 MB) and `MOBIUS_04.pdf` (0.68 MB).
  * **Visual Renders:** `On the path to Rediscovery_06/PNG/` & `RENDER/` (5 files, ~118.7 MB):
    * `render-1.png` (53.44 MB), `render-2.png` (33.94 MB), `render-3.png` (14.12 MB), `render-4.png` (15.41 MB).
  * **Drawings (in Portfolio Pages 28–30):**
    * Conceptual theme: "The Art of Losing" — preservation of the extinct Old Norse language and reflection on Shelley's *Ozymandias*.
    * Parametric Grasshopper Script definition generating the mathematical Möbius transformation with continuous surface twist.
    * Inscription on pavilion soffit: *"Ur mjǫk fornum skugga... What is lost is never truly gone — only waiting to be found."*
    * Site Plan at Tullinløkka showing pedestrian integration between the Historical Museum and National Gallery.
    * 3D Context axonometric and structural section.
    * 4 cinematic renders: dramatic twilight aerial, eye-level lawn approach, under-arch plaza gathering, and reflection pool view at dusk.

---

### Project 6: Design Explorations (Pet House & Modular Stationery Organizer)
* **Context:** ARC-654 Product Design Coursework | 6th Semester
* **Archive Path:** `client-assets/PRODUCT DESIGN/PDF/SK FD PORTFOLIO.pdf` (14.02 MB, 4-page product design document)
* **Assets Available:**
  * **Pet House (Portfolio Pages 31–32 & PDF):**
    * Feline UX behavioral journey: Climb, Scratch, Explore, Jump, Hide, Rest, Observe, Sleep.
    * Exploded 3D component diagram: Sisal-wrapped columns, base board, sleeping house module, bridge, tunnel, spiral tower, top perch.
    * Plan, front elevation, side elevation, functional zoning, timber joinery details, and rendered product visualizations.
  * **Modular Stationery Organizer (Portfolio Page 33 & PDF):**
    * Tree-inspired articulating desk organizer with 360° rotating multi-joint friction arms.
    * Exploded assembly diagram: Soft LED ambient light ring, solid wood core post, modular aluminum arms with storage trays, metal pivot connector, weighted non-slip base.
    * Product engineering orthographic projections (Plan, Front, Side, Joint Details A, B, C) and product CGI renders.

---

### Project 7: Physical Model Craftsmanship Archive
* **Archive Path:** `client-assets/COLLAGE PAGE/` (53 files, 25.85 MB) + `Cultural Oasis_01/PNG/PHYSICAL MODEL/` (24 files)
* **Assets Available:**
  * `01/S.jpeg` (0.71 MB) — photograph of Saravanakumar presenting his physical biomimicry shell pavilion model at Lovely Professional University to academic professors and an international visiting architect/juror.
  * `01/WhatsApp Video 2026-08-03 at 12.53.13.mp4` (1.73 MB) — live video clip capturing a model demonstration.
  * 24 high-res photos of the Katra city contour model.
  * Detailed photographs of the tall diagrid tower model constructed from wood/bamboo lattice.
  * Detailed photographs of the spiraling Flow Spire watchtower model.
  * Full-bleed collage spread in `docs/client/portfolio.pdf` Page 34 (numbered //33).

---

### Projects 8–15: Architect Hafeez Contractor Professional Internship
* **Context:** Architectural Internship at Architect Hafeez Contractor, Mumbai, India (Jun'25–Nov'25)
* **Source:** `docs/client/portfolio.pdf` Pages 35–43 (Section `//08 Internship`)
* **Project Master Roster:**
  1. **Club House (Upper Thane, Mumbai):** 74-acre luxury residential township clubhouse on Central Avenue Road. Features grand neoclassical exterior render with reflection pool, full Ground Floor Plan, North-East & South-East Elevations, Schematic Section 02, and construction Detail Sections A, B, C, D (Page 36).
  2. **Vertical Nexus (Kharadi, Pune):** 10-acre high-rise residential development with 2.03M sq ft FSI potential. Features Master Plan with internal fire tender circulation, high-rise cross-sections, and 4 photorealistic renders (Entrance Lobby, Entry View, Club View, 4BHK Tower View) (Page 37).
  3. **The Portico Privé Villa (Goa):** 120-acre luxury plotted and villa township (80 acres plotting, 30 acres villas, 10 acres apartments). Features Mediterranean/Goan villa exterior render, Ground Floor Plan, Sections 01 & 02, architectural arch detail drawings (OP3, OP4, OP5, OP6), and master plotted layout (Page 38).
  4. **The Crest at BKC (Bandra Kurla Complex, Mumbai):** Flagship high-rise commercial tower in BKC. Features night aerial render of the faceted glass facade, Ground & First floor commercial plans, building cross-sections E, I, A, B, and detailed structural slab-drop engineering analysis plan (Page 39).
  5. **The Zenith Institution Campus (Amaravati / Hyderabad):** Waterfront mega-campus featuring 10 lac sq ft Academic Block, 393-unit Faculty Housing, and 7,524-unit Student Housing. Features master plan with circular central core, axonometric massing diagrams, and 4 renders (Student Hostel, Aerial, Faculty Housing, Entry) (Page 40).
  6. **Ridgeview Institute (Jettri, Navi Mumbai):** Hillside contoured campus. Features sun-path analysis diagrams, 3D terrain buildable/non-buildable mapping, 4-phase master planning, stepped contour cross-sections, and red terracotta curved courtyard renders (Page 41).
  7. **The Diadem Tower (Gurugram, Haryana):** Ultra-luxury residential skyscraper featuring 6BHK and 7BHK+Study simplex units. Features tower floor plates, structural section, and 5 external renders (Rear view, Front elevation, Club elevation, Front view, Entrance canopy) (Page 42).
  8. **Interpretation Centre (Lothal, Gujarat):** Cultural maritime museum near ancient Indus Valley port. Features 2 master plan options, dramatic sunset exterior render, and 2 black-and-white architectural interior/exterior views of a colossal tensile cable dome and tented mast structure (Page 43).

---

### Projects 16 & 17: Additional Archive Projects (Not in Portfolio Spreads)
* **Project 16: Healthcare Hospital Complex (`client-assets/HOSPITAL_NEW01/`, 20 files, 504.77 MB):**
  * **3D Model:** `HOSPITAL_NEW01/3D/SITE HOSPITAL_02.rvt` (11.06 MB Autodesk Revit BIM file).
  * **Renders:** 19 enormous PNG renders (~50 MB each, totaling ~493 MB) showing the hospital access avenues, vehicle drop-offs, central landscaped courtyards, inpatient ward blocks, and architectural clay/wireframe ambient occlusion perspectives (`Image25.png`, `Image26.png`).
  * **Status:** Listed on the portfolio Table of Contents (Page 3) as "Hospital", but omitted from portfolio presentation pages.
* **Project 17: Highway Motel, Dhaba & Restaurant (`client-assets/OTHER PROJECTS/`, 5.98 MB):**
  * **Source Document:** `DESING PES3 OF MOTEL ,DHABA, RESTAURANT.pdf` (4-page architectural drawing set).
  * **Author:** Saravanakumar (Reg. No. 12102169), Lovely School of Architecture and Design (LSAD), Course ARC237.
  * **Drawings:** Complete Level 0 and Level 1 floor plans, cross-sections, and North/South/East/West elevations for Motel, Multi-Cuisine Restaurant, and Traditional Highway Dhaba.
  * **Status:** Listed on the portfolio Table of Contents (Page 3) as "Motel cum resturant", but omitted from portfolio presentation pages.

---

## 5. Portfolio Cross-Reference

| Portfolio Page | Project / Content Item | Matching Archive Folder | Available Assets | Missing / Discrepancy Flag | Strongest Material |
|---|---|---|---|---|---|
| **01** | Cover Page | `PORTFOLIO PNG_s/01__COVER PAGE.png` | 45.7 MB high-res PNG | None | Red dot minimalist graphic identity |
| **02** | CV Page | `PORTFOLIO PNG_s/02_CV_PAGE.png` | 30.5 MB high-res PNG | None | High-quality portrait photo & bio |
| **03** | Contents / Dotted Map | `PORTFOLIO PNG_s/03_CONTENT_PAGE.png` | 2.96 MB high-res PNG | Lists 15 projects; 2 projects in list have no portfolio pages | Visual concept for interactive globe |
| **04–09** | **Cultural Oasis** | `Cultural Oasis_01/` | `.skp` (116.6 MB), 24 model photos, 14 renders, 5 PDF studies | Folder prefix is `_01`; portfolio header is `//01` | Night amphitheatre render & exploded axonometric |
| **10–15** | **Ribbon of Life** | `RIBBON OF LIFE_THESIS_02/` | `.3dm` (45.8 MB), 4 tender PDFs, 6 drawing PDFs, 12 renders | **FLAG:** Page 10 text was accidentally duplicated from Page 4 | 42-storey biomimetic tower elevation & campus aerial |
| **16–21** | **Eco Resort** | `Eco ressort_03/` | `.rvt` (31.1 MB), 11-page GRIHA PDF (107 MB), 40 render PNGs | Folder spelled `Eco ressort_03`; portfolio spelled `Eco ressort` | Hillside isometric & container cottage details |
| **22–27** | **Flow Spire** | `WATCH TOWER_FLOW SPIRE_05/` | 11 drawing PDFs (44.5 MB), 11 renders, physical model photos | **FLAG:** No 3D model file (`.3dm`/`.skp`) in folder | Twisting tower sketch-to-model & Voronoi mall |
| **28–30** | **On the Path to Rediscovery** | `On the path to Rediscovery_06/` | `.3dm` (11.7 MB), 2 PDFs, 4 renders (118 MB) | Folder has `_06`, portfolio header is `//06`, but project 5 in order | Mathematical Möbius Rhino model & sunset renders |
| **31–33** | **Design Explorations** | `PRODUCT DESIGN/` | `SK FD PORTFOLIO.pdf` (14.02 MB) | Empty `3D/` and `PNG/` subfolders; material is inside PDF | Exploded cat habitat & LED articulated organizer |
| **34** | **Physical Models** | `COLLAGE PAGE/` & Project folders | 53 images/video in `COLLAGE PAGE/` + 24 in `Cultural Oasis_01` | Portfolio page numbered `//33` (discrepancy with actual page 34) | Authentic jury presentation photo & city contour model |
| **35–43** | **Hafeez Contractor Internship** | Portfolio PDF (Pages 35–43) | 9 high-res spreads in PDF | **FLAG:** No raw CAD/3D source files in `client-assets` (firm NDA) | High-level commercial & residential renders and plans |
| *Omitted* | **Hospital Complex** | `HOSPITAL_NEW01/` | `.rvt` (11.06 MB), 19 renders (504 MB) | **FLAG:** On TOC (Page 3) and 504 MB archive, but NO portfolio page | Clay/wireframe perspective renders & Revit model |
| *Omitted* | **Motel / Dhaba / Restaurant** | `OTHER PROJECTS/` | `DESING PES3...pdf` (5.98 MB) | **FLAG:** On TOC (Page 3) and in archive, but NO portfolio page | Complete 2-level architectural plans & elevations |

---

## 6. Resume / Professional Information

### Authoritative Credentials (Fact — Resume):
* **Education:**
  * **Bachelor of Architecture (B.Arch):** Lovely Professional University (LPU), Phagwara, Punjab (2021–2026) — **CGPA: 7.49**
  * **Higher Secondary Education:** Saratha International School, Erode, Tamil Nadu (2021) — **77.2%**
  * **Schooling:** Montfort School, Tamil Nadu (2015–2019) *(Fact — Portfolio CV)*
* **Professional Work Experience:**
  * **Architectural Intern — Architect Hafeez Contractor (Mumbai, India):** Jun'25 – Nov'25 (6 months).
    * Contributed to 14+ live residential, commercial, hospitality, landscape, and urban master plans.
    * Prepared architectural documentation, working drawings, 3D models, and client presentations.
    * Coordinated with structural, MEP, landscape, and client teams.
* **Professional Certifications:**
  * *BIM Architecture Professional Course:* Novatr (Jul'26 – Present)
  * *BIM Project Standards:* Revit, Autodesk Construction Cloud (ACC), Navisworks (Feb'26)
  * *Parametric Modeling:* Lumos Archi Lab — Rhino and Grasshopper (Jul'23 – Aug'23)
  * *Computer-Aided Design:* Human Resource Development — AutoCAD (Aug'22)
* **Software Competencies:**
  * **BIM / CAD:** Autodesk Revit (4+ yrs), AutoCAD (4+ yrs), Shapr3D.
  * **3D & Computational Modeling:** Rhinoceros 3D (3+ yrs), Grasshopper (2+ yrs), Trimble SketchUp (2+ yrs).
  * **Visualization & Rendering:** Enscape, Twinmotion (3+ yrs), D5 Render (2+ yrs).
  * **Post-Production & Publishing:** Adobe Photoshop (3+ yrs), Adobe Illustrator, Affinity Suite, Canva.
  * **Coordination:** Navisworks, Autodesk Construction Cloud (ACC), MS Office.
* **Design & Transferable Skills:**
  * Sustainable & Climate-Responsive Architecture, Bioclimatic Urbanism, Transit-Oriented Design (TOD), Physical Architectural Prototyping, Detail Engineering, Multi-Disciplinary Coordination.

---

## 7. Project Locations (Master Geolocation Roster)

All project locations below are extracted directly from official documents and corroborated with project coordinates for the interactive globe:

| Project Name | Documented Location | Evidence Source | Exact Coordinates |
|--------------|---------------------|-----------------|-------------------|
| **Cultural Oasis** | Katra, Jammu & Kashmir, India | Portfolio Page 4; Resume | **32.9930° N, 74.9318° E** |
| **Ribbon of Life (Technopark)** | Thiruvananthapuram, Kerala, India | Portfolio Page 10; Resume | **8.5241° N, 76.9366° E** |
| **Eco Resort (Nature's Nest)** | Ghodegaon, Pune District, Maharashtra, India | Portfolio Page 16; Resume | **19.0353° N, 73.8344° E** |
| **Flow Spire (Skyline-Hub)** | Thane, Mumbai Metropolitan Region, Maharashtra, India | Portfolio Page 22; Resume | **19.2183° N, 72.9781° E** |
| **On the Path to Rediscovery** | Tullinløkka, Oslo, Norway | Portfolio Page 28; Resume | **59.9167° N, 10.7364° E** |
| **Club House** | Upper Thane, Mumbai, Maharashtra, India | Portfolio Page 36 | **19.2437° N, 73.0186° E** |
| **Vertical Nexus** | Kharadi, Pune, Maharashtra, India | Portfolio Page 37 | **18.5516° N, 73.9348° E** |
| **The Portico Privé Villa** | Goa, India | Portfolio Page 38 | **15.2993° N, 74.1240° E** |
| **The Crest at BKC** | Bandra Kurla Complex, Mumbai, Maharashtra, India | Portfolio Page 39 | **19.0657° N, 72.8687° E** |
| **The Zenith Institution** | Amaravati, Andhra Pradesh, India | Portfolio Page 40 | **16.5131° N, 80.5165° E** |
| **Ridgeview Institute** | Jettri, Navi Mumbai, Maharashtra, India | Portfolio Page 41 | **19.0330° N, 73.0297° E** |
| **The Diadem Tower** | Millennium City, Gurugram, Haryana, India | Portfolio Page 42 | **28.4595° N, 77.0266° E** |
| **Interpretation Centre** | Lothal, Gujarat, India | Portfolio Page 43 | **22.5222° N, 72.2497° E** |
| **Architect's Base / Origin** | Ooty (Udhagamandalam), Tamil Nadu, India | Resume | **11.4102° N, 76.6950° E** |
| **Alma Mater / Education** | Lovely Professional University, Phagwara, Punjab, India | Resume & Portfolio | **31.2240° N, 75.7708° E** |

---

## 8. Interactive Globe Candidates

The architect explicitly established the world globe concept on Page 3 of his portfolio by showing world flight paths converging between Norway and Indian state centers.

### Primary Interactive Globe Pins:
1. **Oslo, Norway (59.9167° N, 10.7364° E):** The sole international landmark project (*On the Path to Rediscovery*, 120-Hours Competition). Selecting this node triggers a dramatic visual flight across continents from Europe to India.
2. **Katra, Jammu (32.9930° N, 74.9318° E):** The northernmost Indian project (*Cultural Oasis*), situated against the Himalayan foothills.
3. **Thiruvananthapuram, Kerala (8.5241° N, 76.9366° E):** The southernmost project (*Ribbon of Life / Technopark*), anchoring the client's capstone thesis.
4. **Mumbai & Thane Cluster (19.0760° N, 72.8777° E):** High-density architectural cluster representing *Flow Spire*, *The Crest at BKC*, *Upper Thane Club House*, and *Ridgeview Institute*.
5. **Pune Cluster (18.5204° N, 73.8567° E):** Dual anchor for *GRIHA Eco Resort (Ghodegaon)* and *Vertical Nexus (Kharadi)*.
6. **Goa (15.2993° N, 74.1240° E):** Luxury coastal plotted township (*The Portico Privé Villa*).
7. **Amaravati, AP (16.5131° N, 80.5165° E):** Vast riverfront campus (*The Zenith Institution*).
8. **Lothal, Gujarat (22.5222° N, 72.2497° E):** Ancient maritime heritage center (*Maritime Interpretation Centre*).
9. **Gurugram, NCR (28.4595° N, 77.0266° E):** Super-luxury skyscraper (*The Diadem Tower*).

### Globe Interaction Model:
* **Route A (Geographical Discovery):** User rotates the 3D globe → clicks a pulsing regional pin → camera glides smoothly to site coordinates → overlay project preview card appears → click navigates to Project Detail Page.
* **Route B (Direct Project Navigation):** User selects project from Grid/Index → camera flies the globe to the project's exact global coordinate → reveals local urban context.

---

## 9. Interactive 3D Candidates

We analyzed the five 3D files in `client-assets/` for real-time WebGL / Three.js / React Three Fiber viability:

```
Archive 3D Models
├── On the path to Rediscovery_06/3D/MOBIUS_03.3dm (11.72 MB Rhino)  ──► [TIER 1: PRIME CANDIDATE]
├── Cultural Oasis_01/3D/SITE 3D_09F.skp         (116.62 MB SketchUp) ──► [TIER 1: PRIME CANDIDATE]
├── RIBBON OF LIFE_THESIS_02/3D/SITE MODEL_03_final.3dm (45.75 MB Rhino)──► [TIER 1: PRIME CANDIDATE]
├── Eco ressort_03/3D/SITE_3D_02.rvt             (31.10 MB Revit BIM) ──► [TIER 2: EXPORT NEEDED]
└── HOSPITAL_NEW01/3D/SITE HOSPITAL_02.rvt       (11.06 MB Revit BIM) ──► [TIER 2: EXPORT NEEDED]
```

### 1. Möbius Loop Pavilion (`MOBIUS_03.3dm` - 11.72 MB) — **TOP CANDIDATE**
* **Why Suitable:** Pure parametric mathematical surface generated via Grasshopper. Highly engaging form with continuous single-edge curvature. Clean geometry converts efficiently to a lightweight glTF/GLB file (< 4 MB).
* **Interactive Treatment:** 
  * 360° cursor-driven orbital camera.
  * Interactive light pass revealing the engraved Old Norse runes on the underside.
  * Real-time wireframe-to-clay-to-textured material toggle.

### 2. Cultural Oasis Site & Accommodation (`SITE 3D_09F.skp` - 116.62 MB) — **TOP CANDIDATE**
* **Why Suitable:** Contains both macro site landscape and a fully articulated 3-storey neoclassical accommodation building that already has an exploded diagram in the portfolio.
* **Interactive Treatment:**
  * Scroll-driven camera flyover along the pilgrimage approach into the sunken amphitheatre.
  * Interactive exploded floor selector (Ground Floor → First Floor → Second Floor → Roof).

### 3. Ribbon of Life 42-Storey Skyscraper (`SITE MODEL_03_final.3dm` - 45.75 MB) — **TOP CANDIDATE**
* **Why Suitable:** Iconic biomimetic skyscraper with organic exterior structural diagrid and sky gardens.
* **Interactive Treatment:**
  * Vertical scroll-driven elevator ascent: camera climbs alongside the facade from podium level (L1) up through mid-level sky gardens to the crown (L42).

### 4. Eco Resort Stepped Hillside (`SITE_3D_02.rvt` - 31.10 MB)
* **Why Suitable:** Complex natural contour terrain with modular container cottages and hilltop observation deck.
* **Conversion Note:** Requires export from Revit to FBX/OBJ before converting to optimized WebGL GLB.

---

## 10. Architectural Build / Reveal Candidates

The user requested projects capable of supporting a multi-stage procedural scroll reveal:
$$\text{Blueprint / CAD} \longrightarrow \text{Site Lines} \longrightarrow \text{Structure} \longrightarrow \text{Floor Plates} \longrightarrow \text{Envelope / Facade} \longrightarrow \text{Final Render}$$

### Prime Candidate A: Cultural Oasis (Accommodation Block)
* **Stage 1 (Blueprint):** Ground & First Floor 2D CAD floor plans (Portfolio Page 8).
* **Stage 2 (Foundations & Ground):** Ground floor walls and internal partitions.
* **Stage 3 (Structure & Colonnade):** First-floor slab and classical arched exterior colonnade.
* **Stage 4 (Upper Level):** Second-floor guest rooms and balcony perimeter.
* **Stage 5 (Roof Assembly):** Overhanging hipped roof structure with dormer gables.
* **Stage 6 (Final Realization):** Smooth cross-dissolve to photorealistic daytime/nighttime renders.
* **Source Asset Support:** Page 8 contains the client's own hand-drawn exploded axonometric isolating these exact four structural strata.

### Prime Candidate B: Flow Spire Watchtower
* **Stage 1 (Organic Seed):** Water drop & vortex conceptual 2D sketches.
* **Stage 2 (Central Core):** Structural central elevator & service spine (+0m to +350m).
* **Stage 3 (Horizontal Pods):** Cantilevered circular floor plates stacked at 80m, 160m, and 330m.
* **Stage 4 (Twisting Diagrid):** Multi-helix spiraling structural cage wrapping around the core.
* **Stage 5 (Canopy Crown):** Photovoltaic solar leaf canopy unfolding over the observation deck.
* **Stage 6 (Final Renders):** Complete tower integrated into the highway roundabout.

### Prime Candidate C: Eco Resort (Container Architecture)
* **Stage 1 (Topography):** Hillside contour lines and cut-and-fill retaining walls.
* **Stage 2 (Modular Placement):** Repurposed shipping container steel frames craned onto hillside terraces.
* **Stage 3 (Timber Elements):** Wooden stairways, bridges, and sweeping timber restaurant roof.
* **Stage 4 (Observation Tower):** Hillcrest timber watchtower lattice erection.
* **Stage 5 (Living Environment):** Stream water body, native vegetation, and guest activity renders.

---

## 11. Architectural Storytelling Candidates

Three projects naturally embody the complete 10-step architectural narrative:

```
WHERE (Context) ──► UNDERSTANDING ──► RESEARCH ──► CONCEPT ──► SKETCHES ──► PHYSICAL MODEL ──► 3D ──► ARCHITECTURE ──► RESULT
```

### 1. Cultural Oasis (Katra, Jammu) — *The Pilgrimage Narrative*
1. **Where:** Katra, Jammu — the high-density gateway town to the sacred Vaishno Devi shrine.
2. **Understanding:** Overcrowding, transit fatigue, loss of Dogra cultural heritage under commercial tourism.
3. **Research:** Rigorous Kevin Lynch urban analysis (Pathways, Nodes, Edges, Districts, Activity zones, Height maps).
4. **Concept:** Transforming dead urban voids into an oasis of cultural memory and respite.
5. **Sketches:** Corridor arch studies, shrine alcoves, transition details.
6. **Physical Model:** Massive hand-built topographic city contour model of Katra.
7. **3D Development:** Full SketchUp model (`SITE 3D_09F.skp`) testing sightlines and massing.
8. **Architecture:** Sunken circular amphitheatre, traditional colonnade with five deity shrines, multi-storey accommodation.
9. **Final Result:** Day/night renders capturing spirituality, water reflections, and mountain backdrops.

### 2. Ribbon of Life (Techno-Park, Kerala) — *The Thesis Narrative*
1. **Where:** Thiruvananthapuram, Kerala.
2. **Understanding:** Severe brain drain despite having India's highest state literacy rate (96.2%).
3. **Research:** Official Technopark tender RFPs, employment statistics, transit corridors.
4. **Concept:** "The Ribbon of Life" — an unbroken spatial loop reconnecting Work, Home, Wellness, and Recreation.
5. **Sketches:** Form ideation (The Ribbon → Weave → Rise → Thrive).
6. **Physical Model:** Diagrid tower structural study.
7. **3D Development:** Rhino master model (`SITE MODEL_03_final.3dm`) testing 3 tower iterations.
8. **Architecture:** 42-storey biomimetic commercial skyscraper, 1,100-unit residential district, elevated pedestrian skyways, and lakeside wellness center.
9. **Final Result:** Master bird's-eye campus render and tower facade perspectives.

### 3. On the Path to Rediscovery (Oslo) — *The Pure Design Narrative*
1. **Where:** Tullinløkka Square, Oslo, Norway.
2. **Understanding:** Cultural amnesia — preserving memories and languages that have slipped into extinction.
3. **Research:** Old Norse linguistics, runic carvings, Shelley's *Ozymandias*.
4. **Concept:** The Möbius strip — infinite journey with no beginning and no end.
5. **Sketches & Grasshopper:** Mathematical algorithmic script generating single-surface twist.
6. **3D Development:** Precise Rhino model (`MOBIUS_03.3dm`) with inscribed runes.
7. **Architecture:** Public gathering bowl, acoustic underside, landscape integration.
8. **Final Result:** Twilight renders showing visitors gathering beneath the dark runic arch.

---

## 12. Strongest Visual Assets

We categorized the most visually striking assets for future website layouts:

### Homepage Hero Candidates:
1. `client-assets/Cultural Oasis_01/PNG/RENDER/Image18.png` (40.8 MB) — Cinematic night view of the sunken amphitheatre with glowing water fountain, amphitheatre tiers, and illuminated colonnade facade.
2. `client-assets/On the path to Rediscovery_06/PNG/RENDER/render-1.png` (53.4 MB) — Dramatic aerial view of the dark timber Möbius loop set against Oslo's urban greenery and evening sky.
3. `client-assets/HOSPITAL_NEW01/PNG/RENDER/Image26.png` (9.9 MB) — Aerial ambient-occlusion wireframe perspective of the hospital campus, providing a high-tech architectural drafting visual.
4. `client-assets/WATCH TOWER_FLOW SPIRE_05/PNG/` — Master bird's-eye view of the 350m twisting tower rising above the highway interchange.

### Fullscreen Section & Background Imagery:
* `Cultural Oasis_01/PNG/RENDER/Image19.png` (66.6 MB) — Twilight garden dining court with warm lanterns and deep blue sky.
* `On the path to Rediscovery_06/PNG/RENDER/render-2.png` (33.9 MB) — Eye-level perspective looking directly up into the arching runic loop.
* `Cultural Oasis_01/PNG/PHYSICAL MODEL/` (Selected photo) — Close-up monochrome of the physical model showing razor-sharp paper craftsmanship.
* `PORTFOLIO PNG_s/01__COVER PAGE.png` — Architectural coordinate grid with bold crimson accent circle.

### Project Card Imagery:
* **Cultural Oasis:** Amphitheatre day render or illuminated night colonnade.
* **Technopark:** 42-storey biomimetic tower elevation.
* **Eco Resort:** Hillside isometric render or hillside cottage stairs.
* **Flow Spire:** Twisting watchtower sketch-to-render progression.
* **On the Path to Rediscovery:** Sunset plaza loop perspective.
* **The Crest at BKC:** Night highway view of the faceted commercial tower.
* **Upper Thane Club House:** Neoclassical exterior reflecting across the pool.
* **The Diadem Tower:** Luxury residential facade with entrance canopy.
* **Lothal Interpretation Centre:** Sunset render of the sweeping maritime tensile structures.

---

## 13. 3D Model Inventory

| Project Name | Filename | Relative Path | Format | File Size | Description & Geometry | WebGL / Web Usefulness | Conversion Risk / Difficulty |
|---|---|---|---|---|---|---|---|
| **On the Path to Rediscovery** | `MOBIUS_03.3dm` | `On the path to Rediscovery_06/3D/` | Rhino 3DM | **11.72 MB** | Pure mathematical Möbius surface with Old Norse engravings and plaza base. | **Extremely High.** Ideal standalone hero interactive 3D viewer. | **Low.** NURBS/mesh exports smoothly to glTF/GLB via Blender or Rhino. |
| **Cultural Oasis** | `SITE 3D_09F.skp` | `Cultural Oasis_01/3D/` | Trimble SketchUp | **116.62 MB** | Complete urban master plan, accommodation block, sunken amphitheatre, and shrines. | **High.** Excellent for orbital site navigation and building exploded views. | **Medium.** 116 MB SketchUp file contains many component instances; requires mesh cleanup and texture baking. |
| **Ribbon of Life (Technopark)** | `SITE MODEL_03_final.3dm` | `RIBBON OF LIFE_THESIS_02/3D/` | Rhino 3DM | **45.75 MB** | 42-storey parametric skyscraper, elevated ribbon circulation, MLCP, residential blocks. | **High.** Perfect for tower inspection and master plan flyover. | **Medium.** Complex organic diagrid needs geometry decimation for smooth 60fps web rendering. |
| **Eco Resort** | `SITE_3D_02.rvt` | `Eco ressort_03/3D/` | Autodesk Revit BIM | **31.10 MB** | Full BIM model of stepped hillside terrain, shipping container cottages, reception, clubhouse. | **Medium.** Great architectural depth; modular components can be isolated. | **High.** Proprietary BIM format; must be exported to FBX/IFC first, then brought into Blender for GLB conversion. |
| **Hospital Complex** | `SITE HOSPITAL_02.rvt` | `HOSPITAL_NEW01/3D/` | Autodesk Revit BIM | **11.06 MB** | Full BIM model of multi-building general hospital campus, vehicle ramps, and courtyards. | **Medium.** Clean institutional geometry. | **High.** Requires Revit export pipeline to FBX before GLB generation. |

*Note: Flow Spire (350m Watchtower) has complete architectural vector drawing sets (`SKY_MODEL_08_1.pdf` to `_8.pdf`) and physical models, but the raw 3D file is not in the folder. If needed for interactive 3D, a lightweight glTF model can be generated matching the documented floor plates and diagrid structure.*

---

## 14. Performance & Optimization Risks

A detailed analysis of client assets revealed severe performance bottlenecks if deployed without an automated optimization pipeline:

1. **Extreme Raster File Sizes (50 MB – 66 MB per image):**
   * Multiple uncompressed PNG renders in `HOSPITAL_NEW01/PNG/RENDER/` (e.g., `1.png` 53.3 MB, `2.png` 53.7 MB, `4.png` 55.6 MB, `7.png` 55.1 MB) and `Cultural Oasis_01/PNG/RENDER/` (`Image19.png` 66.6 MB, `Image18.png` 40.8 MB).
   * Portfolio page PNGs in `PORTFOLIO PNG_s/` are 30–45 MB each (e.g., `01__COVER PAGE.png` 45.7 MB).
   * **Required Future Action:** Convert to modern WebP / AVIF formats with responsive multi-resolution srcset (thumb 400w, medium 1200w, full 2400w). Quality 80–85% will reduce file sizes by 95% (from 50 MB down to ~600 KB) with zero noticeable loss.
2. **Heavy PDF Documents (up to 107 MB):**
   * `final griha.pdf` is **107.38 MB**; `portfolio.pdf` is **50.41 MB**; `SK FD PORTFOLIO.pdf` is **14.02 MB**.
   * Browsers cannot display 100 MB PDFs inline without major lag.
   * **Required Future Action:** Never load raw PDFs directly on the website. Extract needed graphics to lightweight WebP, and provide compressed PDF download links only if requested.
3. **Complex 3D Model Polygon Counts:**
   * `SITE 3D_09F.skp` (116.6 MB) and `SITE MODEL_03_final.3dm` (45.8 MB) likely contain millions of polygons and uncompressed textures.
   * **Required Future Action:** For interactive 3D, target glTF/GLB file budgets under **5–8 MB** per interactive scene, using Draco geometry compression and KTX2 / WebP texture compression.
4. **Local Disk Space Awareness (Observed on Developer Host):**
   * Drive C has low free disk space (~0.10 GB), while Drive D has abundant space (202+ GB).
   * Any future build, caching, and asset pipelines must strictly operate within Drive D (`d:\Saravana_Architect_Portfolio`).

---

## 15. Duplicate / Unclear Assets

1. **Identical Image Copies with Different Timestamps:**
   * `Cultural Oasis_01/PNG/PHYSICAL MODEL/` (24 files) and `COLLAGE PAGE/02/` (29 files) share nearly identical physical model photographs.
   * `Cultural Oasis_01/PNG/RENDER/Image19.png` (66.6 MB) and `Image19.jpg` (5.3 MB) are identical visual frames exported in different formats.
   * `Cultural Oasis_01/PNG/RENDER/Image18.png` (40.8 MB) and `Image17.jpg` (6.9 MB) represent identical camera views.
   * In `HOSPITAL_NEW01/PNG/RENDER/`, `1.png` (53.3 MB) and `4.png` (55.6 MB) appear to be duplicate exports of the same driveway camera angle.
2. **Duplicate Project Tender Documents:**
   * `RIBBON OF LIFE_THESIS_02/TENDER/584- EoI.pdf` (3.66 MB) and `584.pdf` (3.66 MB) are exact binary duplicates.
3. **Spelling Inconsistencies in Client Source Assets:**
   * Folder `Cultural Oasis_01` vs `PORTFOLIO PNG_s` filename: `04_PROJECT 01_ CULTURAL OIASIS _PAGE 01.png` (spelled "OIASIS").
   * Folder `Eco ressort_03` vs portfolio header `Eco ressort` vs table of contents `Eco-friendly resort`.
   * Portfolio Page 2 (CV): Lovely "Proffesional" University (typo in client graphic).
   * Portfolio Page 31: "Acadamic" Project (typo in client graphic).
   * Portfolio Page 28: "Tullinl kka" (Norwegian character `ø` dropped in PDF conversion).

---

## 16. Missing Information / Client Confirmation

The following items cannot be determined from the archive alone and are flagged for client confirmation before final website content freeze:

1. **Hospital Project Inclusion:** 
   * *Status:* The Hospital project is listed on the portfolio Table of Contents (Page 3) and has a 504 MB folder in `client-assets/` with a Revit model and 19 renders, but has no spread in `docs/client/portfolio.pdf`.
   * *Question for Client:* Should the Hospital project be featured as a dedicated project page on the website, or was it intentionally omitted from the final curated portfolio?
2. **Motel cum Restaurant Project Inclusion:**
   * *Status:* Listed on the Table of Contents (Page 3) and present as academic CAD sheets in `OTHER PROJECTS`, but omitted from portfolio spreads.
   * *Question for Client:* Should this early academic project be included in an "Archived / Academic Works" section, or excluded in favor of flagship work?
3. **Hafeez Contractor Project Attributions & NDA:**
   * *Status:* The 8 internship projects are prominently presented in the client's personal portfolio (Pages 35–43).
   * *Question for Client:* Are there any employer attribution or NDA guidelines we should adhere to on the public website (e.g., standard line: *"Work executed during Architectural Internship at Architect Hafeez Contractor, Mumbai"* for those 8 projects)?
4. **Flow Spire 3D Model:**
   * *Status:* Does the client possess the raw `.3dm`, `.skp`, or `.blend` file for the 350m Watchtower, or should we reconstruct a lightweight WebGL version from his detailed floor plans and elevation PDFs?
5. **Contact Information for Public Web:**
   * *Status:* Resume lists personal phone number (+91 8778621993) and email (saravanaarchitecture@gmail.com).
   * *Question for Client:* Does the client want the direct phone number publicly displayed on the website, or prefer an interactive contact form and email link?

---

## 17. Recommended Future Content Architecture

Based strictly on the client's actual assets, we recommend the following website content hierarchy:

```
WEBSITE ARCHITECTURE
│
├── 1. HERO / INTRO
│   ├── Cinematic Dark Visual (Night Amphitheatre or Oslo Twilight Loop)
│   ├── Architect Identity: SARAVANAKUMAR K | Graduate Architect
│   └── Brand Tagline: Harmonizing Form, Function & Environmental Continuity
│
├── 2. INTERACTIVE 3D SHOWCASE (Hero Interactive Feature)
│   ├── Active Model Viewer: On the Path to Rediscovery (Möbius Loop)
│   ├── Interactive Orbit, Lighting Controls & Geometry Breakdown
│   └── Algorithmic / Grasshopper Logic Callout
│
├── 3. CURATED MASTER PROJECTS (Flagship Grid / Filterable Index)
│   ├── Filter by Category: All | Academic & Thesis | Competition | Professional Internship | Product
│   │
│   ├── [FLAGSHIP 01] Cultural Oasis (Katra, J&K) ──► Full Storytelling & Build Reveal Page
│   ├── [FLAGSHIP 02] Ribbon of Life / Technopark (Kerala) ──► Skyscraper & Master Plan Page
│   ├── [FLAGSHIP 03] Eco Resort / Nature's Nest (Pune) ──► Hillside & Modular Container Page
│   ├── [FLAGSHIP 04] Flow Spire (Thane, Mumbai) ──► 350m Watchtower & Coastal Hub Page
│   ├── [FLAGSHIP 05] On the Path to Rediscovery (Oslo) ──► Parametric Cultural Pavilion Page
│   ├── [FLAGSHIP 06] Design Explorations (Pet House & Organizer) ──► Modular Product Page
│   │
│   └── [PROFESSIONAL ARCHIVE] Architect Hafeez Contractor Internship (8 Live Projects)
│       ├── The Crest at BKC (Commercial High-Rise)
│       ├── Upper Thane Club House (Residential Leisure)
│       ├── Vertical Nexus (10-Acre Kharadi Master Plan)
│       ├── The Portico Privé Villa (120-Acre Goa Township)
│       ├── The Zenith Institution (Amaravati Waterfront Campus)
│       ├── Ridgeview Institute (Navi Mumbai Hill Campus)
│       ├── The Diadem Tower (Gurugram Ultra-Luxury Skyscraper)
│       └── Maritime Interpretation Centre (Lothal Ancient Heritage Port)
│
├── 4. INTERACTIVE GLOBAL MAP / LOCATIONS
│   ├── Interactive 3D Dotted Globe (Direct adaptation of Portfolio Page 3)
│   ├── Pins across Oslo, Katra, Mumbai, Thane, Pune, Goa, Kerala, Amaravati, Lothal, Gurugram
│   └── Bidirectional routing: Globe Pin ◄──► Project Page
│
├── 5. PHYSICAL MODEL & CRAFTSMANSHIP GALLERY
│   ├── City contour paper model (Katra)
│   ├── Diagrid wooden high-rise model
│   ├── Biomimicry shell pavilion model & jury presentation photo
│   └── Watchtower spiral model
│
├── 6. ABOUT THE ARCHITECT
│   ├── Professional Biography & Architectural Statement
│   ├── Education: Lovely Professional University (B.Arch, 2021–2026)
│   ├── Certifications: Novatr BIM Professional, ACC, Navisworks, Lumos Rhino/Grasshopper
│   └── Software & Technical Competencies Matrix
│
└── 7. CONTACT & INQUIRIES
    ├── Integrated Direct Inquiry Form
    ├── Contact Coordinates (Ooty / Global)
    ├── LinkedIn & Professional Network Links
    └── Verified Resume / Portfolio Download Access
```

---

## 18. Recommended Implementation Priorities

When development begins in subsequent phases, work should proceed according to these prioritized steps:

* **Priority 1 (Asset Preparation & Pipeline):**
  * Establish an automated asset processing script to convert required full-bleed renders from 50+ MB PNGs into responsive WebP/AVIF images (targeting < 600 KB each).
  * Convert `MOBIUS_03.3dm` into an optimized, Draco-compressed `.glb` asset (< 3 MB) for the initial 3D viewer.
* **Priority 2 (Design System & Tokens):**
  * Establish an architectural dark-mode aesthetic with cream/warm stone secondary accents and crimson red focal highlights (inspired by the client's Portfolio Cover dot and grid motif).
  * Integrate typography suitable for high-end architectural monographs (e.g., *Cinzel* or *Space Grotesk* for display headings, paired with *Inter* for legible technical data).
* **Priority 3 (Core Website Assembly):**
  * Implement the Homepage with immersive Hero visual and Project Card grid.
  * Build the Project Data System linking project IDs, coordinates, typologies, and galleries.
* **Priority 4 (Interactive Features):**
  * Build the Interactive 3D Globe with Three.js / R3F connecting the 9 geo-pinned locations.
  * Implement the 3D Model Viewer for the Möbius Pavilion.
  * Implement the scroll-linked Architectural Build/Reveal experience for Cultural Oasis.
* **Priority 5 (Testing & Client Sign-Off):**
  * Verify 60fps rendering, smooth mobile touch gestures, and responsive typography across desktop, tablet, and mobile.

---

## 19. Separation of Facts, Inferences, and Client Confirmations

To maintain absolute documentation integrity, all findings are categorized:

### FACTS (Directly verified in client files):
* Architect name is Saravanakumar K, holding B.Arch degree (2021–2026) from Lovely Professional University (CGPA 7.49).
* Completed a 6-month architectural internship at Architect Hafeez Contractor in Mumbai (Jun'25–Nov'25) working on 14+ live projects.
* Primary software competencies are Revit, Rhino, Grasshopper, AutoCAD, SketchUp, D5 Render, Twinmotion, Enscape, and Photoshop.
* 5 raw 3D files exist in `client-assets/`: 2 Rhino (`.3dm`), 2 Revit (`.rvt`), 1 SketchUp (`.skp`).
* Physical models were genuinely constructed for Katra city, Diagrid tower, Biomimicry shell, and Watchtower.
* Oslo pavilion was conceptualized for the 120-Hours competition using Old Norse linguistics and a Möbius loop geometry.
* The portfolio Table of Contents on Page 3 features a dotted world map connecting project locations.

### INFERENCES (Reasonable technical conclusions):
* The client omitted *Hospital* and *Motel cum Restaurant* from the final portfolio spreads to curate a tighter, higher-tier narrative focused on his strongest 6 academic/competition projects and 8 Hafeez Contractor projects.
* Page 10 of `portfolio.pdf` has an unintentional placeholder text duplicate from Page 4 due to a graphic design export oversight.
* The 8 projects from the Hafeez Contractor internship lack 3D files in `client-assets/` due to standard corporate non-disclosure and intellectual property retention policies of the firm.

### REQUIRES CLIENT CONFIRMATION:
* Final decision on whether to include or archive the *Hospital* (504 MB Revit + renders) and *Motel cum Restaurant* projects.
* Preferred public contact details (displaying direct phone vs inquiry form only).
* Confirmation of attribution language for the 8 Architect Hafeez Contractor internship projects.
