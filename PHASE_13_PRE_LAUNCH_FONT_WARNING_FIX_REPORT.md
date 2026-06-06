# PHASE 13 - Pre-Launch Font Warning Fix Report

## Scope

Workspace edited:
- `02_SHOPIFY_THEME_BUILD`

Protected workspace not edited:
- `01_FRONTEND_MASTER_DO_NOT_TOUCH`

## Theme Check Errors Fixed

Removed unauthorized remote Google font assets from `layout/theme.liquid`:
- `https://fonts.googleapis.com`
- `https://fonts.gstatic.com`
- Google Fonts stylesheet for `Baloo Bhaijaan 2`
- Google Fonts stylesheet for `Figtree`

Removed disallowed font-family references:
- `Baloo Bhaijaan 2`
- `Figtree`

## Changed Files

- `layout/theme.liquid`
  - Removed Google Fonts `preconnect` tags.
  - Removed the Google Fonts stylesheet link.
  - Kept local Brownberries `@font-face` implementation.
  - Kept Shopify CDN font strategy from the existing `css-variables` snippet.

- `assets/morganics-design-tokens.css`
  - Confirmed and normalized approved font tokens:
    - `--font-display: Brownberries, Poppins, sans-serif`
    - `--font-ui: Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- `snippets/css-variables.liquid`
  - Confirmed and normalized the same approved font tokens used by the theme.

- `assets/morganics-theme.css`
  - Normalized local fallback token declarations.
  - Replaced the remaining `Baloo Bhaijaan 2` references with `var(--font-ui)`.

- `assets/morganics-header.css`
  - Normalized the header UI font stack to the approved Poppins/system stack.

- `sections/morganics-customer-stories.liquid`
  - Replaced fallback hardcoded `/collections/all` links with `{{ routes.all_products_collection_url }}` to clear theme check route warnings found during validation.

## Font Policy Confirmation

The active Shopify theme now uses only:
- Brownberries
- Poppins

No remote Google Fonts are referenced in:
- `layout/`
- `assets/`
- `sections/`
- `snippets/`
- `config/`

## Validation

Command run:

```bash
shopify theme check
```

Result:

```text
68 files inspected with no offenses found.
```

Expected result achieved:
- 0 offenses
- 0 warnings
