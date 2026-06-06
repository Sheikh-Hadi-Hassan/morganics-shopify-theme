# Phase 12B Mega Menu Parity Fix Report

## Scope

Fixed only the desktop Categories mega menu in `02_SHOPIFY_THEME_BUILD`. The hero, product sections, cart, search markup, checkout, collection templates, and mobile drawer structure were left intact.

## Files Changed

- `snippets/morganics-mega-menu.liquid`
- `assets/morganics-header.css`
- `assets/morganics-header.js`

## What Was Wrong Before

- The desktop mega menu mixed dynamic collection output with product counts, so the card copy did not match the approved design.
- The panel used the wrong visual scale for the Shopify preview: it read too wide/heavy, sat too low, and had inconsistent radius/card proportions compared with the approved HTML reference.
- Cards were limited to a small dynamic set and could show cropped collection imagery or count text instead of curated examples.
- Header interaction only covered hover/focus on the wrapper and did not explicitly handle Escape or outside-click close.

## Positioning Fix

- Added a Phase 12B scoped CSS block for the mega menu.
- Deep visual correction pass: compared the Shopify preview against the approved HTML reference and corrected the dropdown as one proportional system instead of isolated tweaks.
- The panel is now centered below the header with a preview-matched scale: `width: min(1000px, calc(100vw - 72px))`, `280px` intro column, `18px` panel padding, and `18px` grid gap. This removes the previous full-width/heavy feel at the active browser scale.
- The dropdown is pulled upward with `top: calc(100% - 8px)` so it sits closer to the header and diamond pointer like the approved reference.
- Header and mega menu z-index were raised so the dropdown sits above the hero and hero hotspots.
- Added a small cream diamond pointer under the Categories trigger.
- The menu uses a near-cream translucent background, subtle border, corrected `28px` outer radius, softer shadow, and controlled blur without the hero bleeding through heavily.
- The left green intro card was resized and spaced to match the approved reference: narrower card, corrected `24px` radius, tighter text measure, and balanced CTA placement.
- Added final `.mrg-site-header` scoped overrides so the corrected panel/card geometry wins over the older base mega-menu rules in the same stylesheet.

## Card Rebuild

- Rebuilt the snippet as a curated nine-card reference layout.
- Left block is a forest-green intro panel with:
  - “SHOP BY CATEGORY” eyebrow
  - “Morganics Pantry” heading
  - required body copy
  - “Open Full Shop” CTA
- Right side uses a two-column card grid with controlled fixed rows, matching the approved HTML rhythm.
- Each card has a square contained icon on the left and title/examples on the right, with icon boxes set to `64px` for the active Shopify preview scale.
- Card images use `object-fit: contain` and compact icon boxes instead of banner crops.
- Desktop mega menu now uses product examples instead of product counts.
- Fixed the visible broken state where rows stretched vertically across the intro-card height by changing the category grid from stretch behavior to fixed rows with `align-content: start`.
- Replaced the oversized Shopify override with refined preview proportions: `86px` fixed rows, `64px` icon boxes, `14px` card titles, `11px` subtitles, `22px` card radius, and normal text wrapping so long category names no longer clip off the right edge.

## Link Resolution

- Matching Shopify collection handles are used where available:
  - `roots-adaptogens`
  - `nuts-dry-fruits`
  - `oil-gums-specialties`
  - `herbs-botanicals`
  - `natural-sweetners-salts`
  - `seeds-grains`
- Missing or broad categories safely fall back to `routes.all_products_collection_url`.
- No desktop mega card depends on inaccurate collection product counts.

## Interaction Behavior

- Hover over Categories opens the menu.
- Keyboard focus opens the menu.
- Hovering the panel keeps it open.
- Leaving the wrapper closes with a short delay to reduce flicker.
- Escape closes all mega menus.
- Clicking outside closes the menu.
- The script uses the existing header namespace and does not touch search/cart behavior.

## Responsive Behavior

- Desktop uses the full reference-style panel.
- Between `901px` and `1320px`, the panel tightens width, intro column, and card icon size.
- At `max-width: 900px`, the desktop mega overlay and pointer are hidden so mobile remains handled by the existing drawer.

## Validation

- `shopify theme check` passed with `0 offenses`.
- `node --check assets/morganics-header.js` passed.
- `node --check assets/morganics-hero.js` passed.
- `curl -I http://127.0.0.1:9292/` returned `HTTP/1.1 200 OK`.
- Rendered homepage HTML contains the new desktop mega menu content, including `Morganics Pantry` and `Triphala Blend, Salajeet`.

## Remaining Risks

- Chrome UI automation in the active profile repeatedly shifted focus to an unrelated YouTube tab, so detailed hover visual QA was limited. Source, rendered HTML, JavaScript syntax, Theme Check, and homepage load validation all passed.
- Mobile drawer still contains its existing product-count subtitles. That was left unchanged because this task was scoped to the desktop Categories mega menu and explicitly said not to break/rebuild mobile drawer behavior.
