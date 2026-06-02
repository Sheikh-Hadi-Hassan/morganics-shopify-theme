# Phase 5 Collections and Search Report

## Scope

Built Shopify-native collection/category and search pages that visually follow the approved static `category.html` and `shop.html` layouts: large category hero, intro panel, sticky sort/filter controls, sidebar filters, product count, product grid, product cards, availability badges, quick add, and pagination.

## Changed / Created Files

- `sections/main-collection-morganics.liquid`
  - New collection page section using Shopify `collection` and `collection.products`.
  - Includes collection hero, intro content, sort bar, Shopify filters, product count, product grid, quick add, and pagination.

- `sections/main-search-morganics.liquid`
  - New search page section using Shopify `search` results.
  - Replaces old static shop search behavior with Shopify search.

- `snippets/morganics-product-card.liquid`
  - Shopify product-card component using Shopify product image, title, price, URL, availability, selected variant, SKU, and optional quick add.

- `snippets/morganics-collection-hero.liquid`
  - Reusable collection hero using collection title, description, image/banner, products count, and optional metafields.

- `snippets/morganics-sort-filter-bar.liquid`
  - Reusable sort/search controls.

- `templates/collection.json`
  - Points collection pages to `main-collection-morganics`.

- `templates/search.json`
  - Points search page to `main-search-morganics`.

- `assets/morganics-collection.js`
  - Lightweight auto-submit for sort dropdowns only.
  - No product rendering, cart drawer, localStorage, or checkout behavior.

- `layout/theme.liquid`
  - Loads `morganics-collection.js` globally with `defer`.

- `assets/morganics-theme.css`
  - Added collection/search styling to match Morganics static shop/category layouts.

## Guardrails Confirmed

- Did not edit `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`.
- Did not use `assets/products.js` as live data.
- Did not use old `category.html?category=` query routing.
- Did not use old `shop.html` JS product rendering.
- Did not add old localStorage cart logic.
- Did not build cart drawer.
- Did not build checkout.

## Optional Collection Metafields Supported

Recommended namespace/key format: `custom.*`

- `custom.category_title`
- `custom.category_copy`
- `custom.ritual`
- `custom.usage`

Fallbacks are provided when these metafields are empty.

## Validation

- `templates/collection.json` parsed successfully.
- `templates/search.json` parsed successfully.
- Active collection/search scan found no forbidden references to:
  - `products.js`
  - `category.html?category`
  - `shop.html`
  - `renderShop`
  - `initCategoryPage`
  - `morganics_cart_v1`
  - `localStorage`
  - `checkout.html`
  - `order-track.html`
  - `script.google.com`
  - `ORDER_API`
- `shopify theme check --path 02_SHOPIFY_THEME_BUILD` result:
  - 62 files inspected.
  - No offenses found.

## Limitations

- Shopify search replaces the old alias-aware JavaScript search. Search quality now depends on Shopify product titles, descriptions, tags, variants, and metafields.
- Sidebar filters only appear when Shopify filters are configured for the store/collection.
- Collection banners depend on Shopify collection images. If absent, the page uses the fallback Morganics banner asset.
- Quick add adds the selected or first available variant only. Full variant choice remains on the product page.
- Product-card Urdu names display only when `custom.urdu_name` exists.

## Visual Risks

- Collection hero appearance depends heavily on the uploaded Shopify collection image aspect ratio and quality.
- Product card consistency depends on product media import quality and transparent/contained pack imagery.
- Long product names, SKUs, or variant data may wrap differently from the static catalog and need preview QA.
- Sorting/filter UI is Shopify-native and may not exactly match the old client-side category/sidebar behavior until filters are configured.
