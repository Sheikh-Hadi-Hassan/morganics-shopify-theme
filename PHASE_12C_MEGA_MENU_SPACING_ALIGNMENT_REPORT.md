# Phase 12C Mega Menu Spacing Alignment Report

## Scope

Fixed the desktop Categories mega menu in `02_SHOPIFY_THEME_BUILD`.

No edits were made to `01_FRONTEND_MASTER_DO_NOT_TOUCH`. Hero, footer, product grid, cart, checkout, collection templates, search behavior, and mobile drawer structure were not redesigned.

## Files Changed

- `assets/morganics-header.css`
- `PHASE_12C_MEGA_MENU_SPACING_ALIGNMENT_REPORT.md`

## Issue Summary

The mega menu was breaking visually because the desktop nav link styling was leaking into the mega card anchors, while the wide translucent panel made card artwork and hero content bleed through the menu. The fix restores a controlled reference-style panel and isolates each category card.

Follow-up root-cause fix: the selector `.mrg-desktop-nav a` was still styling every anchor inside the mega menu. It has been scoped to `.mrg-desktop-nav > a` and `.mrg-desktop-nav > .mega-wrap > .mega-trigger`, including the `max-width: 1260px` breakpoint, so `.mega-cat` anchors can remain real grid cards.

## Exact CSS/Layout Values Changed

- Replaced older competing mega menu CSS with:
  `/* Phase 12C mega menu spacing alignment fix */`
- Scoped top-level nav link styling:
  - from `.mrg-desktop-nav a`
  - to `.mrg-desktop-nav > a`
  - and `.mrg-desktop-nav > .mega-wrap > .mega-trigger`
- Mega menu:
  - `top: calc(100% + 9px)`
  - `left: 50%`
  - `width: min(1060px, calc(100vw - 38px))`
  - `z-index: 760`
- Panel:
  - `grid-template-columns: 300px 1fr`
  - `gap: 18px`
  - `padding: 18px`
  - `border-radius: 34px`
  - `background: rgba(247, 241, 230, 0.98)`
  - `border: 1px solid rgba(132, 99, 69, 0.18)`
  - `box-shadow: 0 30px 80px rgba(31, 41, 38, 0.18)`
  - `backdrop-filter: blur(14px)`
  - `overflow: hidden`
  - `isolation: isolate`
- Left intro block:
  - `border-radius: 26px`
  - `padding: 24px`
  - `h3 font-size: 30px`
  - body `font-size: 14px`
  - CTA `min-height: 46px`
- Card grid:
  - `grid-template-columns: repeat(2, minmax(0, 1fr))`
  - `gap: 10px`
  - `min-width: 0`
  - `overflow: hidden`
- Category cards:
  - `display: grid`
  - `grid-template-columns: 70px 1fr`
  - `min-height: 92px`
  - `padding: 10px`
  - `border-radius: 16px`
  - `background: #fffaf1`
  - `opacity: 1`
  - `white-space: normal`
  - `overflow: hidden`
  - `justify-content: stretch`
- Icon boxes:
  - `width: 70px`
  - `height: 70px`
  - `min-width: 70px`
  - `border-radius: 14px`
  - image `max-width: 100%`
  - image `max-height: 100%`
  - image `object-fit: contain`
- Text:
  - title `font-size: 14px`, `line-height: 1.15`, `font-weight: 850`
  - examples `font-size: 11px`, `line-height: 1.35`, `font-weight: 700`
- Pointer:
  - `18px` cream diamond
  - `top: calc(100% + 5px)`
  - centered under Categories
- Medium desktop:
  - intro column `260px`
  - icon boxes `62px`
  - card title `13px`

## Before/After

Before:
- Card images could visually bleed outside their intended card boxes.
- Card anchors inherited generic desktop-nav `white-space`, `opacity`, and pill behavior.
- Panel opacity and card opacity made the menu look like a broken transparent overlay.
- Text and images did not read as a clean premium card grid.

After:
- Cards are opaque, clipped, and isolated from nav-link styling.
- Mega category anchors no longer inherit the top-level nav pill display, opacity, padding, and nowrap rules.
- Icon images are contained inside fixed icon boxes.
- Text wraps normally and stays inside its card.
- The panel uses a cleaner reference-scale `1060px` shell with stronger cream opacity.
- Hero hotspot pointer interactions are disabled while the mega menu is open.

## Validation

- `shopify theme check` passed with `0 offenses`.
- `node --check assets/morganics-header.js` passed.
- `node --check assets/morganics-hero.js` passed.
- Shopify preview returned `HTTP/1.1 200 OK`.
- Served CSS confirms the active values:
  - `.mrg-desktop-nav > a`
  - `width: min(1060px, calc(100vw - 38px))`
  - `background: rgba(247, 241, 230, 0.98)`
  - `isolation: isolate`
  - `.mega-cat opacity: 1`
  - `.mega-cat white-space: normal`
- `.mega-cat-icon width: 70px`
- `.mega-cat border-radius: 16px`
- `.mega-cat-icon border-radius: 14px`

## Remaining Differences

Exact pixel parity may vary slightly by browser zoom and device pixel ratio. The active Shopify CSS now follows the approved HTML structure and adds containment fixes needed for Shopify's header/nav CSS cascade.
