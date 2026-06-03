# Phase 9 Shopify Font/Layout Cleanup Report

## 1. Files Scanned

Scanned active Shopify theme files in:

- `layout/`
- `sections/`
- `snippets/`
- `templates/`
- `config/`
- `assets/*.css`
- `assets/*.js`

The typography/layout grep found 666 active declarations related to font, spacing, size, line-height, margin, padding, and gap before normalization.

## 2. Shopify Templates/Sections/Snippets Found

Active templates kept:

- `index.json`
- `product.json`
- `collection.json`
- `search.json`
- `cart.json`
- `page.json`
- `blog.json`
- `article.json`
- `404.json`
- `list-collections.json`
- `password.json`
- `gift_card.liquid`

Active Morganics sections kept:

- header/footer
- homepage sections
- product, collection, search, and cart sections
- Shopify system sections for page/blog/article/404/password/list-collections

Active snippets kept:

- `css-variables`
- `meta-tags`
- `image`
- Morganics product/card/cart/collection/price/FAQ/image-fallback snippets

## 3. Files Kept

Kept all active templates, Morganics homepage sections, commerce sections, cart drawer snippets, product fallback image snippets, settings, locales, data import files, and active assets required by Shopify pages.

## 4. Files Archived

Archived into `archive-unused-shopify-files/`:

- `assets/morganics/css-reference/`
- `assets/morganics/js-reference/`
- `assets/morganics/data-reference/`
- `assets/shoppy-x-ray.svg`
- `blocks/group.liquid.txt`
- `blocks/text.liquid.txt`
- `sections/cart.liquid.txt`
- `sections/collection.liquid.txt`
- `sections/custom-section.liquid.txt`
- `sections/hello-world.liquid.txt`
- `sections/morganics-home-shell.liquid.txt`
- `sections/product.liquid.txt`

The archive folder was added to `.shopifyignore`.

## 5. Font Families Found Before

Before cleanup, the active Shopify theme could load:

- Work Sans through the starter `type_primary_font` default
- Brownberries
- Poppins token references

The copied reference folder also contained historical static CSS with Google font import/reference material, but it was not active.

## 6. Font Families After Cleanup

Active theme source now resolves to:

- `Brownberries, Poppins, sans-serif`
- `Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

Remaining font-related active source:

- Brownberries `@font-face` in `layout/theme.liquid`
- Shopify CDN Poppins loading through `snippets/css-variables.liquid`
- approved token stacks in `assets/morganics-design-tokens.css`, `assets/morganics-theme.css`, and `snippets/css-variables.liquid`

## 7. Font Imports Removed

- Removed active Google Fonts links from Shopify layouts after Theme Check flagged remote assets.
- Replaced starter Work Sans default with Poppins.
- Removed dynamic font-family variable usage from `critical.css`.

## 8. Font Tokens Updated

Created `assets/morganics-design-tokens.css` with:

- `--font-display`
- `--font-ui`
- `--font-hero`
- `--font-editorial`
- `--font-urdu`

Compatibility aliases now resolve to the approved two-font system.

## 9. Typography Tokens Updated

Added:

- `--type-hero`
- `--type-display-xl`
- `--type-display-lg`
- `--type-h1`
- `--type-h2`
- `--type-h3`
- `--type-h4`
- `--type-h5`
- `--type-h6`
- `--type-body-lg`
- `--type-body-md`
- `--type-body-sm`
- `--type-caption`
- `--type-button`
- `--type-nav`
- `--type-product-title`
- `--type-product-price`
- `--type-badge`

Line-height tokens added:

- `--lh-display`
- `--lh-heading`
- `--lh-title`
- `--lh-body`
- `--lh-caption`
- `--lh-button`

## 10. Spacing Tokens Updated

Added:

- `--space-2`
- `--space-4`
- `--space-6`
- `--space-8`
- `--space-12`
- `--space-16`
- `--space-20`
- `--space-24`
- `--space-32`
- `--space-40`
- `--space-48`
- `--space-64`
- `--space-80`
- `--space-96`
- `--space-120`

Component spacing:

- `--section-pad-y`
- `--section-pad-x`
- `--card-pad`
- `--grid-gap`
- `--content-gap`
- `--heading-gap`
- `--button-gap`
- `--form-gap`

## 11. Components Normalized

Normalized non-hero font/layout behavior for:

- header/nav
- buttons
- product cards
- category cards
- promise cards
- ingredient cards
- forms
- product page functional UI
- collection/search UI
- cart drawer and cart page
- footer
- static Shopify pages

## 12. Layout Spacing Fixes

- Added a Phase 9 component consistency layer in `assets/morganics-theme.css`.
- Removed unused `morganics-home-shell` CSS.
- Kept the approved hero composition protected.
- Preserved Phase 8E category/promise parity overrides.

## 13. Shopify Theme Cleanup

- Archived unused starter/demo/reference files.
- Renamed archived `.liquid` files to `.liquid.txt` so Theme Check does not treat them as live theme files.
- Added `archive-unused-shopify-files/` to `.shopifyignore`.

## 14. Broken References Fixed

- Checked active references for archived files; no active templates reference them.
- `shopify theme check` confirms no missing section/snippet/asset offenses.

## 15. Viewports Tested

Attempted automated preview checks at:

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

Successful real theme loads:

- 390px: homepage loaded, no horizontal overflow, Poppins active, 9 category cards, 4 promise cards, header/footer present.
- 1024px: homepage loaded once with Poppins active, 9 category cards, 4 promise cards, header/footer present. Automation reported horizontal overflow before the final `html, body { overflow-x: clip; }` guard was added.

Preview limitation:

- Shopify local preview intermittently returned `Something went wrong` / HTTP 500 pages during repeated viewport automation. Those failed responses were preview-server failures, not Liquid/theme-check failures.
- Preview console also showed Shopify CDN/CSP noise from Shopify-hosted storefront scripts during localhost testing.

## 16. Remaining Risks

- The Shopify font picker remains only to load Poppins from Shopify CDN. It must not be changed in the theme editor.
- Browser QA should be rerun manually or with a refreshed Shopify preview token because repeated automated preview loads produced intermittent Shopify 500 responses.
- Some older Phase 8 parity CSS remains by design to protect visual parity; future cleanup should avoid deleting those rules without screenshot comparison.

## 17. Items Needing Human Approval

- Whether to permanently delete archived starter/reference files after another successful Shopify preview pass.
- Whether to upload local Poppins font files later, which would remove the need for the Shopify font picker entirely.

## Final Validation

- `shopify theme check`: passed
- Result: `61 files inspected with no offenses found`
- Product/cart/checkout Liquid and JS logic were not modified in this phase.
