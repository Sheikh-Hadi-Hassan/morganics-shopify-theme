# Phase 11 Hero Surgical Refinement Report

## Scope

Refined the active Shopify homepage hero inside `02_SHOPIFY_THEME_BUILD` only. The work stayed limited to the Morganics hero section assets and did not touch cart, checkout, product, collection, search, mega menu, mobile drawer, or other commerce logic.

## Changed Files

- `assets/morganics-hero.css`
- `assets/morganics-hero.js`

## What Was Fixed

- Re-centered the pouch, dry-fruit pile, and stone as one locked visual group.
- Restored Shopify hero product layers that were being overridden by older global homepage hero CSS.
- Tuned product stack sizing so the pouch remains dominant while the stone clearly grounds the pile.
- Rebalanced floating ingredient positions with varied scale, rotation, height, and distance from the pouch.
- Softened and enlarged corner plants so they read as blurred background depth instead of foreground clutter.
- Improved quick category card hover states without changing card links or Shopify navigation.
- Prevented the right tagline from splitting awkwardly on desktop.

## Alignment Decisions

- The pouch, dry-fruit pile, shadow, and stone are aligned from the same center point using shared CSS variables.
- The product group is centered within the visual stage and slightly offset away from the headline to preserve negative space.
- The stone remains the widest layer; the fruit pile sits above it; the pouch anchors the composition vertically.
- Scoped `body[data-template="index"] .morganics-hero.hero-v3` overrides are intentionally kept in the hero stylesheet to win against old global `morganics-theme.css` rules without editing unrelated global theme CSS.

## Hover And Tap Behavior

- Floating ingredient triggers keep the existing Shopify product data binding.
- Hover/focus/click opens the existing ingredient spotlight card.
- The active floater now receives a controlled `.is-active` state so the same ingredient scales smoothly and stays visually anchored.
- The spotlight clone scales to roughly 2x with eased timing.
- Background layers dim/blur during spotlight mode.
- Touch devices continue to use tap behavior and outside-tap close behavior.

## Responsive Decisions

- Desktop uses a three-column composition: editorial headline, central product stage, and quick category cards/tagline.
- Laptop/tablet breakpoints reduce stone and pouch width to avoid crowding headline or cards.
- Tablet portrait collapses to a centered single-column rhythm while preserving the hero stack.
- Mobile keeps the same visual identity with reduced floating ingredient count, tighter product-stack sizing, and bottom quick cards.
- Decorative plants are hidden or softened at smaller sizes where they would compete with text or controls.

## Validation

- `shopify theme check` passed with `0 offenses`.
- `node --check assets/morganics-hero.js` passed.
- `curl -I http://127.0.0.1:9292/` returned `HTTP/1.1 200 OK`.
- Shopify preview loaded in Chrome at `http://127.0.0.1:9292/`.
- Desktop visual pass confirmed the header/nav remained intact, the pouch/fruit/stone group was visible and grounded, quick cards remained on the right, and plants rendered as soft corner decor.

## Remaining Limitations

- Browser automation in the active Chrome session was unstable because focus kept returning to an unrelated YouTube tab. Final validation therefore combines Theme Check, JavaScript syntax validation, HTTP load validation, and a manual Chrome visual pass of the Shopify preview.
