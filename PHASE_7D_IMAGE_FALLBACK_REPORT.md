# Phase 7D Product Image Fallback System Report

## Outputs Created

- `data/morganics-shopify-products-no-images.csv`
- `data/morganics-product-image-fallback-map.json`
- `snippets/morganics-product-image-fallback.liquid`
- Updated `snippets/morganics-product-card.liquid`
- Updated `sections/main-product-morganics.liquid`
- `PHASE_7D_IMAGE_FALLBACK_REPORT.md`

## Goal

Create a temporary product image fallback system so Shopify products can display the approved Morganics product images from theme assets when Shopify product media is not ready.

## Source of Truth Rules Preserved

- Shopify product object remains the source of truth for title, price, variants, URL, cart behavior, and availability.
- Shopify `product.featured_image` / product media is still used first.
- Theme asset fallback is used only when Shopify product media is missing.
- `products.js` was not activated, copied into the theme as storefront data, or loaded by Liquid.
- No localStorage cart or custom checkout logic was introduced.
- The master folder was not edited.

## Import CSV Output

- `data/morganics-shopify-products-no-images.csv` keeps the original product rows and blanks only the `Image Src` column.
- Product titles, descriptions, SEO fields, variants, SKUs, and prices remain intact.
- Rows in no-image CSV: 161
- Blank `Image Src` cells in no-image CSV: 161
- Protected product data fields changed during no-image CSV generation: 0

## Fallback Map Summary

- Mapped product handles: 81
- Unique theme asset filenames used: 72
- Duplicate/shared filenames: 6
- Asset base path: `assets/morganics/products/`

## Shared Image Filenames

- `01-zarishk.jpg` is shared by: zarishk-imported, zarishk-pakistani
- `14-almond-with-shell.jpg` is shared by: badam-abdul-wahidi, maghaz-badam-abdul-wahidi
- `41-alsi.jpg` is shared by: alsi, chia-seeds
- `51-maghaz-chilgoza.jpg` is shared by: maghaz-chilgoza-full-roast, maghaz-chilgoza-half-roast
- `56-mixed-dried-fruits.jpg` is shared by: dried-kiwi, dried-mango, dried-pineapple, dried-strawberry, mixed-dried-fruits
- `59-sunflower-seeds.jpg` is shared by: pumpkin-seeds, sunflower-seeds

## Liquid Integration

- `snippets/morganics-product-image-fallback.liquid` contains a static handle-to-asset `case` map generated from `data/morganics-product-image-fallback-map.json`.
- `snippets/morganics-product-card.liquid` now renders the fallback snippet only inside the existing `product.featured_image` missing branch.
- `sections/main-product-morganics.liquid` now renders the fallback snippet only when no Shopify product media or featured image exists.
- Related products on the product page also use the fallback only when their Shopify image is missing.
- `sections/main-collection-morganics.liquid` did not need a direct edit because collection grids already render `morganics-product-card`.

## Temporary Nature

This is a temporary safety layer until Shopify product media URLs/import can be fixed. Once Shopify product media is complete, Shopify images will automatically take precedence and this fallback will stop being visible for those products.
