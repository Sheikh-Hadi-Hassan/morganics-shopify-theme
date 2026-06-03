# Phase 9 Shopify Font/Layout Audit

## Source References

Read-only static reference files used:

- `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/MORGANICS_FONT_LAYOUT_CLEANUP_REPORT.md`
- `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/MORGANICS_DESIGN_SYSTEM.md`
- `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/assets/MORGANICS_DESIGN_TOKENS.css`

No files in the master static folder were edited.

## Active Shopify Files Audited

Active theme paths scanned:

- `layout/`
- `sections/`
- `snippets/`
- `templates/`
- `config/`
- `assets/*.css`
- `assets/*.js`
- active JSON templates

Archived/reference paths were evaluated separately before moving to `archive-unused-shopify-files/`.

## 1. Font Audit

### Fonts Found Before Cleanup

| File path | Selector/component | Current font source | Approved replacement | Risk | Safe change |
|---|---|---|---|---|---|
| `snippets/css-variables.liquid` | generated CSS variables | `settings.type_primary_font.family`, defaulted by schema to Work Sans | `--font-ui` hardcoded to Poppins stack | Critical | Yes |
| `layout/theme.liquid` | font preload | editable Shopify primary font | approved Poppins from Shopify font CDN | Critical | Yes |
| `assets/critical.css` | `body` | `var(--font-primary--family)` from editable font setting | `var(--font-ui)` | Critical | Yes |
| `assets/morganics-theme.css` | `body`, UI components | Mostly `var(--font-ui)` | keep `var(--font-ui)` | Low | Yes |
| `assets/morganics-theme.css` | hero/title moments | `var(--font-display)` | keep for approved display moments | Low | Yes |
| `assets/morganics/css-reference/site.css` | copied reference CSS | Google Poppins import and historical static CSS | archive; not active | High | Yes |
| `assets/morganics/js-reference/site.js` | copied static behavior | old static behavior references | archive; not active | High | Yes |

### Fonts Found After Cleanup

Active source now contains only:

- `--font-display: 'Brownberries', 'Poppins', sans-serif`
- `--font-ui: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- `@font-face` for `Brownberries`
- Shopify CDN `font_face` output for the approved Poppins setting

Notes:

- `font_picker` remains only to load Poppins from Shopify CDN. The setting label and help copy explicitly state it must remain Poppins.
- No active Google font links remain.
- Archived reference files may still contain old static CSS/JS, but `.shopifyignore` excludes the archive from Shopify CLI operations.

## 2. Shopify Template/Page Audit

### Keep

| Area | Files |
|---|---|
| Layout | `layout/theme.liquid`, `layout/password.liquid` |
| Core templates | `templates/index.json`, `templates/product.json`, `templates/collection.json`, `templates/search.json`, `templates/cart.json` |
| Shopify system templates | `templates/404.json`, `templates/page.json`, `templates/blog.json`, `templates/article.json`, `templates/list-collections.json`, `templates/password.json`, `templates/gift_card.liquid` |
| Header/footer | `sections/header.liquid`, `sections/footer.liquid`, `sections/header-group.json`, `sections/footer-group.json` |
| Morganics homepage | `sections/morganics-hero.liquid`, `morganics-marquee`, `morganics-category-grid`, `morganics-promise-strip`, `morganics-routine-carousel`, `morganics-featured-products`, `morganics-customer-stories`, `morganics-daily-rituals`, `morganics-ingredient-library`, `morganics-mini-inquiry` |
| Commerce | `sections/main-product-morganics.liquid`, `main-collection-morganics`, `main-search-morganics`, `main-cart-morganics` |
| Snippets | product card, price, variant pills, image fallback, cart drawer, cart line item, collection hero, sort/filter bar, FAQ/info snippets |
| Active JS/CSS | `assets/morganics-theme.css`, `morganics-design-tokens.css`, `critical.css`, `morganics-theme.js`, `morganics-cart.js`, `morganics-product.js`, `morganics-collection.js` |

### Archived

| Archived file/folder | Reason |
|---|---|
| `assets/morganics/css-reference/` | copied static CSS reference; not active; contained old external import/reference styles |
| `assets/morganics/js-reference/` | copied static JS reference; not active; contained old static cart/checkout/product behavior |
| `assets/morganics/data-reference/` | copied visual data reference; not active Shopify source |
| `sections/hello-world.liquid` | starter demo section |
| `sections/morganics-home-shell.liquid` | Phase 2 shell section replaced by full homepage sections |
| `sections/cart.liquid` | starter cart section replaced by `main-cart-morganics` |
| `sections/collection.liquid` | starter collection section replaced by `main-collection-morganics` |
| `sections/product.liquid` | starter product section replaced by `main-product-morganics` |
| `sections/custom-section.liquid` | starter generic section not used by templates |
| `blocks/group.liquid`, `blocks/text.liquid` | starter theme blocks only used by archived generic section |
| `assets/shoppy-x-ray.svg` | starter demo asset used only by archived `hello-world` |

### Needs Review

- Poppins font picker: kept only because Shopify Liquid needs a font object for Shopify CDN loading. Human/admin should not change it away from Poppins.

## 3. Typography Scale Audit

Issues found:

- Editable starter font setting could load Work Sans.
- Non-hero section headings used multiple hardcoded clamp values.
- Product/cart/form/footer UI used mostly Poppins tokens but lacked one final normalization layer.
- Product-detail page H1 and FAQ H2 used display font in dense commerce contexts.
- Form fields inherited fonts but lacked a shared tokenized sizing rule.

Fix plan implemented:

- Added `assets/morganics-design-tokens.css`.
- Rebased critical body font to `var(--font-ui)`.
- Added Phase 9 normalization layer for non-hero UI, cards, product titles, prices, captions, buttons, forms, footer, cart, and static pages.
- Kept hero typography family declarations only; no hero object/composition rules were changed.

## 4. Spacing/Layout Audit

Issues found:

- Several previous phase overrides used hardcoded values for card padding, gaps, and form spacing.
- Starter home-shell CSS remained after the section was no longer active.
- Archive/reference CSS still existed under active assets and could confuse future scans.
- Generic Skeleton blocks/sections were still present even though not used by Morganics templates.

Fix plan implemented:

- Added spacing tokens for section padding, cards, grids, content gaps, headings, buttons, and forms.
- Added non-hero component consistency layer.
- Removed unused home-shell CSS from active stylesheet.
- Archived unused starter/reference files and excluded archive from Shopify CLI operations.

## 5. Design-System Gaps

New Shopify-specific rules needed:

- Poppins is loaded through Shopify font CDN, but the design system must document that the theme font picker is not a design option.
- Archive folder must stay excluded from Shopify CLI operations.
- Product/image/card components should keep using Shopify objects and fallback images; no static products.js logic may return.
- Hero layout remains protected from token normalization except font-family compliance.
