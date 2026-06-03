# Phase 11A Hero Theme Check Fix Report

## Scope

Repaired Shopify Theme Check errors from the Morganics hero implementation inside `02_SHOPIFY_THEME_BUILD` only.

## Files Changed

- `sections/morganics-hero.liquid`
- `assets/morganics-hero.js`
- `assets/morganics-hero.css`
- `PHASE_11A_HERO_THEME_CHECK_FIX_REPORT.md`

## Exact Errors Fixed

1. `ImgWidthAndHeight` on `.hero-spotlight-clone`
   - Added explicit placeholder dimensions:
     - `width="320"`
     - `height="320"`

2. `ImgWidthAndHeight` on `.hero-spotlight-media img`
   - Added explicit placeholder dimensions:
     - `width="188"`
     - `height="188"`

3. `ParserBlockingScript` on `morganics-hero.js`
   - Replaced parser-blocking `script_tag` usage with:
     - `<script src="{{ 'morganics-hero.js' | asset_url }}" defer></script>`

4. Missing hero asset concern
   - Confirmed `assets/morganics-hero.js` exists and contains the hero-specific spotlight, parallax, and AJAX cart behavior.
   - Confirmed `assets/morganics-hero.css` exists because `sections/morganics-hero.liquid` references it.

## Validation

Ran:

```bash
shopify theme check
```

Result:

```text
68 files inspected with no offenses found.
```
