# Phase 14 Morganics Design-System Layout Cleanup Report

Date: 2026-06-07

## Files Changed

- `assets/morganics-design-tokens.css`
- `assets/morganics-theme.css`
- `assets/morganics-header.css`
- `PHASE_14_MORGANICS_DESIGN_SYSTEM_LAYOUT_AUDIT.md`
- `PHASE_14_MORGANICS_DESIGN_SYSTEM_LAYOUT_CLEANUP_REPORT.md`

Note: `sections/morganics-customer-stories.liquid` was already modified before this Phase 14 cleanup for the editable customer stories carousel. It was not changed again for this design-system pass.

## Tokens Added Or Updated

Updated `assets/morganics-design-tokens.css` with additional system aliases and normalized component tokens:

- Font aliases:
  - `--mrg-font-display`
  - `--mrg-font-ui`
- Typography tokens:
  - `--type-section-title`
  - `--type-section-copy`
  - `--type-card-title`
  - `--type-card-copy`
  - `--type-form`
  - `--type-footer-title`
- Spacing/layout tokens:
  - `--section-pad-y-compact`
  - `--section-pad-y-roomy`
  - `--section-gutter`
  - `--container-width`
  - `--card-pad-tight`
  - `--card-pad-normal`
  - `--grid-gap-tight`
  - `--grid-gap-normal`
  - `--grid-gap-wide`
- Control sizing tokens:
  - `--button-height-sm`
  - `--button-height`
  - `--button-height-lg`
  - `--input-height`

The existing required font tokens remain intact:

- `--font-display: Brownberries, Poppins, sans-serif`
- `--font-ui: Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

## Font Imports Removed

No remote Google font imports were present in the inspected active theme files, so no removal was required.

Confirmed absent:

- `fonts.googleapis.com`
- `fonts.gstatic.com`
- Baloo Bhaijaan
- Figtree
- Plus Jakarta Sans
- Georgia
- Times New Roman
- Noto fonts
- Jameel Noori Nastaleeq

The only `Inter` text match was inside JavaScript timer method names such as `clearInterval` and `setInterval`; this is not a font usage.

## Typography Rules Applied

Added final design-system normalization in `assets/morganics-theme.css`:

- Body, inputs, buttons, selects, and textareas use Poppins through `--font-ui`.
- Major display moments keep Brownberries through `--font-display`.
- Product cards, category cards, promise cards, routine cards, ingredient cards, forms, cart, wishlist, and footer surfaces use Poppins.
- Heading line-height, body line-height, button line-height, card title sizing, card copy sizing, form text sizing, and price sizing now have tokenized fallbacks.
- Global title letter spacing was tightened into a readable system value instead of random per-section values.

## Spacing Rules Applied

Added scoped cleanup for:

- Section vertical rhythm.
- Section/container width using `--container-width`.
- Mobile full-width section overflow protection.
- Grid gaps for cards.
- Card padding.
- Button sizing.
- Input sizing.
- Mobile section gutters.

This avoids changing section order or Liquid structure.

## Components Normalized

The Phase 14 CSS layer targets the following active surfaces:

- Header/nav controls
- Header search panel/results
- Mega menu typography/radius
- Mobile drawer
- Bottom app nav
- Mobile product bar
- Category cards
- Promise cards
- Product cards
- Routine cards
- Ingredient cards
- Mini inquiry form
- Footer action cards
- Cart drawer rows
- Wishlist drawer rows

## Intentionally Not Changed

To keep this as a controlled cleanup, the following were not redesigned or structurally changed:

- Hero composition
- Header structure
- Footer structure
- Section order
- Product card Liquid/forms
- Cart logic
- Checkout handoff
- Search logic
- Mobile drawer logic
- Bottom app nav logic
- Mega menu behavior
- Hero hotspot behavior

## Responsive QA Result

Responsive cleanup was applied with fluid CSS primitives:

- `width: min(calc(100% - gutter), max-width)`
- `clamp()` typography and spacing
- mobile-specific gutter and gap reductions
- `overflow-x: clip/hidden` protections on main section wrappers
- tokenized control heights for buttons/forms

Target widths covered by the CSS rules:

- 360
- 375
- 390
- 412
- 430
- 768
- 820
- 1024
- 1280
- 1366
- 1440
- 1512
- 1728
- 1920

Local preview check:

- `curl -I --max-time 5 http://127.0.0.1:9292/`
- Result: `HTTP/1.1 200 OK`

Screenshot automation note:

- `playwright` and `puppeteer` are not installed in this theme workspace, so full per-width screenshot automation was not available in this run.

## Theme Check Result

Command:

```bash
shopify theme check
```

Result:

```text
71 files inspected with no offenses found.
```

## Remaining Risks

- The theme still contains many legacy hardcoded pixel declarations. They are now overridden by tokenized active layers where safe, but a full mechanical rewrite would be a larger refactor and was intentionally avoided.
- Per-width visual screenshot QA should still be done in the browser before launch because browser automation dependencies are not installed locally.
- The requested markdown file `MORGANICS_SHOPIFY_DESIGN_SYSTEM_LAYOUT_TOKENS.md` was not found locally during this run; this cleanup used the active token file and the explicit design-system rules from the request.
