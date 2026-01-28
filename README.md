# Phase 3: Perceived Performance & UX Optimization

## Overview
This branch focuses on the **User Experience** during the loading state. We implement patterns to make the wait feel shorter and more professional.

## UI/UX Enhancements
1. **Skeleton Screen:** Implemented a shimmering CSS animation that acts as a placeholder for the Thor image.
2. **Fade-in Transition:** Added a smooth opacity transition to the \<img>\ tag.
3. **Layout Stability (CLS):** Used \spect-ratio: 16/9\ to ensure zero layout shift.

## Current Bottleneck
The **FOUT** (font flickering) remains because the font is still fetched from an external CDN.

## Next Goal
**Phase 4: Root Solution.** Self-hosting assets.
