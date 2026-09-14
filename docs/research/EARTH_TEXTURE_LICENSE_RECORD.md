# EARTH TEXTURE ASSET PROVENANCE & LICENSE RECORD
## Digital Atlas Spatial Foundation — Saravana Kumar K Portfolio

**Document Reference:** `docs/research/EARTH_TEXTURE_LICENSE_RECORD.md`  
**Governing Standard:** `docs/research/MASTER_CREATIVE_DIRECTION_FINAL.md`  
**Date:** September 13, 2026  
**Auditor:** Senior Digital Art Director + Creative Technologist  
**Status:** Verified Legal & Technical Clearance Complete  

---

## 1. ASSET SPECIFICATIONS & IDENTIFICATION

The real 3D Earth in the Digital Atlas (`/atlas`) utilizes three high-performance, equirectangular planetary maps:

| Asset Name | Local File Path | Format & Resolution | Size | Visual Channel & Purpose |
|---|---|---|---|---|
| **Earth Daytime Albedo** | `public/assets/textures/earth/earth_atmos_2048.jpg` | 2048 × 1024 JPEG (sRGB) | 512,606 bytes (~501 KB) | Photographic color landmasses, forests, deserts, mountain ranges, icecaps, and ocean basins. |
| **Earth Ocean Specular** | `public/assets/textures/earth/earth_specular_2048.jpg` | 2048 × 1024 JPEG (Grayscale) | 223,421 bytes (~218 KB) | Specular reflection mask. Landmasses are matte; ocean surfaces produce physical sunlight glints. |
| **Earth Topo Normal** | `public/assets/textures/earth/earth_normal_2048.jpg` | 2048 × 1024 JPEG (Tangent Normal) | 336,774 bytes (~329 KB) | Tangent-space surface normals imparting 3D relief to the Himalayas, Western Ghats, Scandinavian shield, and Alps. |

* **Total Offline Footprint:** **1,072,801 bytes (~1.02 MB)**.
* **Storage Integrity:** Assets are stored strictly offline in `public/assets/textures/earth/` on Drive `D:`. The application has zero runtime dependency on third-party tile servers, Mapbox, Google Maps, or external CDNs.

---

## 2. PROVENANCE & SOURCE DOCUMENTATION

* **Originating Primary Data Source:**
  - **Color & Specular Imagery:** NASA Goddard Space Flight Center, Visible Earth / Blue Marble project (lead authors: Reto Stöckli, Robert Simmon, NASA GSFC Earth Observatory).
  - **Topographic Normal Data:** Derived from NASA Shuttle Radar Topography Mission (SRTM) and USGS GTOPO30 digital elevation models, processed by the open-source graphics community.
* **Curating Repository:**
  - Official Three.js project asset directory:
    - `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg`
    - `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg`
    - `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg`

---

## 3. INTELLECTUAL PROPERTY & USAGE RIGHTS VERIFICATION

### 3.1 NASA Public Domain Status
* **Legal Baseline:** 17 U.S.C. § 105 states that copyright protection under U.S. law is not available for any work of the United States Government.
* **NASA Policy Guidelines:** Under NASA's official Media Usage Guidelines:
  > *"NASA content - images, audio, video, and computer files used in the rendition of 3-dimensional models, such as texture maps and polygonal data in any format - generally are not subject to copyright in the United States. You may use this material for educational, informational, and commercial purposes, including client websites and commercial publications, without explicit permission."*
* **Commercial / Client Portfolio Clearance:** **APPROVED (Unrestricted Public Domain).**

### 3.2 Three.js Repository License
* **Repository License:** The Three.js repository, including its public examples and packaged demonstrative planet textures, is licensed under the **MIT License**:
  > *Copyright © 2010-2026 Three.js authors.*  
  > *Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files... to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies...*
* **Attribution Provision:** Documented herein and maintained within this audit trail.

---

## 4. CONCLUSION & LEGAL CLEARANCE

1. **Usage Rights:** Fully cleared for deployment in Saravana Kumar K's professional architectural portfolio.
2. **Offline Resilience:** All textures are committed locally to the Git repository under `public/assets/textures/earth/`.
3. **Bandwidth Efficiency:** At ~1.02 MB total payload, the entire Earth dataset is smaller than a single high-resolution architectural photography spread, ensuring rapid cold starts across desktop and mobile networks.
