# Phase 3: Perceived Performance & UX Optimization

## Overview
This branch focuses on the **User Experience** during the loading state. We implement patterns to make the wait feel shorter and more professional.

## UI/UX Enhancements
1. **Skeleton Screen:** Implemented a shimmering CSS animation that acts as a placeholder for the Thor image.
2. **Fade-in Transition:** Added a smooth opacity transition to the \<img>\ tag.
3. **Layout Stability (CLS):** Used \spect-ratio: 16/9\ to ensure zero layout shift.

## Current Bottleneck
The **FOUT** (font flickering) remains because the font is still fetched from an external CDN.

## # Phase 4: Root Solution (COMPLETED) 

### Self-hosting & Optimization
- **Font Format**: Migrated from `.ttf` (91KB) to optimized `.woff2` (28KB).
- **Zero FOUC/FOIT**: Implemented `font-display: swap` and `<link rel="preload">`.
- **Final Performance**: Reduced 3G load time from 7.5s to 6.2s.

## ⚡ Portfolio Featured Projects
- **3D Paralax Gallery**: Experimentos con tilt interactions y GSAP.
- **Modal Logic**: Estructura de modales dinámicos con stagger entrance.