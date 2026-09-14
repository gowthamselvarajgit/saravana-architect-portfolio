# WEB 3D ARCHITECTURAL MODEL & MAQUETTE REFERENCE RESEARCH
## Interactive 3D Model Inspection & Spatial Pacing for the Saravana Monograph

**Document Reference:** `docs/research/WEB_3D_MODEL_REFERENCE_RESEARCH.md`  
**Governing Standard:** `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md`  
**Project:** Saravana Kumar K — Architectural Portfolio Monograph  
**Date:** September 13, 2026  
**Status:** Complete Forensic Research & Strategic Synthesis  

---

## 1. STRONGEST BENCHMARK REFERENCES AUDITED

1. **Pascal 3D Architectural Editor (`pascalorg/editor`):**
   * *Core Mechanism:* React Three Fiber architecture built strictly for buildings. Features orthographic vs. perspective projection switching, architectural reference grid underlays, and layer/floor plate isolation without video-game visual clutter.
   * *Takeaway for Saravana:* Use an architectural framing grid (`ArchGrid`) under the maquette with metric dimension ticks, and provide layer isolation buttons (`[FULL ENSEMBLE]`, `[PAVILION SHELL]`, `[SOFFIT RUNES]`, `[URBAN PLAZA]`).

2. **Graffico Office (`office.graffico.it`):**
   * *Core Mechanism:* Constrained orbit controls with pre-choreographed vantage points. Clicking a key architectural feature smoothly animates the camera to that specific viewpoint, preventing the visitor from getting disoriented in empty 3D space.
   * *Takeaway for Saravana:* Provide 4 curated camera presets:
     1. `[AERIAL AXONOMETRIC]`: Classic architectural 45° overhead vantage.
     2. `[EYE-LEVEL PLAZA APPROACH]`: Human-height perspective looking toward the soaring timber arch.
     3. `[SOFFIT RUNES DETAIL]`: Low-angle perspective looking directly upward into the Old Norse runic inscriptions along the underside of the loop.
     4. `[PLAN / TOP DOWN]`: True plan overlook demonstrating the mathematical figure-eight circulation.

3. **Three.js Architectural Walkthrough (`MuhammadMuzamil-dev/threejs-architectural-walkthrough`):**
   * *Core Mechanism:* Lightweight Three.js `GLTFLoader`, soft directional sunlight, and shadow maps running at 60 FPS in a pure browser context.
   * *Takeaway for Saravana:* Use soft PCF directional lighting with warm sunlight (`#FFF5E8`) and cool skylight fill (`#D8E2ED`) to accentuate the curvature of the timber Möbius loop.

4. **ERA Residence (`era-residence.com`):**
   * *Core Mechanism:* Editorial monograph feel; slow, confident pacing; interactive CAD floor plan / drawing-over-render curtain slider.
   * *Takeaway for Saravana:* Pair the 3D maquette viewer directly with the authentic competition process drawing (`mobius-process-01.webp`), allowing visitors to cross-reference the 2D algorithmic Grasshopper diagram against the 3D realized form.

5. **God's Eye View (`bilawalsidhu/gods-eye-view`):**
   * *Core Mechanism:* Spatial continuity from macro coordinates down to regional 3D volume.
   * *Takeaway for Saravana:* The spatial narrative flows seamlessly: Oslo on the Digital Atlas globe $\rightarrow$ Tullinløkka Square $\rightarrow$ Möbius Pavilion 3D maquette $\rightarrow$ Soffit Runes detail.

---

## 2. INTERACTION PRINCIPLES ADAPTED FOR MÖBIUS

| Feature | Reference Pattern | Implementation in Saravana Portfolio |
|---|---|---|
| **Architectural Orbit** | Graffico / Pascal | Constrained polar angles (`minPolarAngle: 0.1`, `maxPolarAngle: π/2.05`) preventing underground clipping; smooth damping (`0.05`). |
| **Curated Vantage Presets** | Graffico | Instant GSAP slerp to 4 architectural vantage points (`Axonometric`, `Eye-Level`, `Soffit Runes`, `Plan`). |
| **Architectural Grid Underlay** | Pascal Editor | Subtle 5-meter drafting grid (`ArchGrid`) resting on $Y=0$ ground datum with meter labels. |
| **Layer / Component Isolation** | Pascal Editor | Toggle visibility between `Full Ensemble` (Pavilion + Plaza + Context) and `Isolated Pavilion` (Shell + Runes). |
| **Drawing-to-Model Connection** | ERA Residence | Process section presenting `mobius-process-01.webp` directly beneath the 3D maquette. |
| **Enter The Space Trigger** | Walkthrough Repo | Architectural action button `[ ENTER THE SPACE ]` setting up the spatial threshold for Step 4C walkthrough. |
| **Material Shading Modes** | Architectural Maquette | Switchable between `[TIMBER PBR]` (warm glulam with bronze runes), `[CLAY MAQUETTE]` (museum white plaster), and `[DRAFTING WIREFRAME]`. |

---

## 3. IDEAS REJECTED (ANTI-PATTERNS)

1. **Unconstrained Video-Game Camera:** Replaced with bounded architectural orbit that keeps the pavilion centered and readable.
2. **Dense Multi-Panel CAD Gizmos:** Replaced with minimal, elegant editorial buttons in `DM Mono`.
3. **Heavy Procedural Noise & Neon Shaders:** Banned by `MASTER_CREATIVE_DIRECTION_FINAL.md`. Lighting remains calm, warm, and natural.
4. **Synthetic Geometry Generation:** Permanently forbidden; 100% of geometry originates from the client's verified Rhino file `MOBIUS_03.3dm`.
