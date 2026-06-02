# Phase 7B Shopify CDN Image URL Mapping Report

## Outputs Created

- `data/morganics-shopify-products-ready-for-image-urls.csv`
- `data/shopify-files-url-mapping-template.csv`
- `PHASE_7B_IMAGE_URL_MAPPING_REPORT.md`

## Inputs Used

- `data/morganics-shopify-products.csv`
- `data/morganics-product-image-upload-checklist.csv`: not found, so mapping was built from product CSV only
- `assets/morganics/products/`

## Image Mapping Summary

- Product CSV rows: 161
- Product rows with image source: 81
- Unique image filenames extracted: 72
- Local product image files found: 72
- Ready CSV image placeholders inserted: 81
- Missing local image files referenced by CSV: 0
- Duplicate image filenames used by multiple products: 6
- Unused local product image files: 0

## How To Paste Shopify CDN URLs

1. Open Shopify Admin > Content > Files.
2. Search for the filename from `Local Image Filename`, for example `01-zarishk.jpg`.
3. Copy the full Shopify CDN file URL for that uploaded file.
4. Paste it into the `Shopify CDN URL` column in `data/shopify-files-url-mapping-template.csv` on the matching filename row.
5. In `data/morganics-shopify-products-ready-for-image-urls.csv`, replace every `PASTE_SHOPIFY_CDN_URL_FOR_filename.jpg` marker with the pasted Shopify CDN URL for that same filename.
6. After all placeholders are replaced, import the ready CSV into Shopify Admin.

## Duplicate Image Filenames

- `01-zarishk.jpg` is used by: zarishk-imported, zarishk-pakistani
- `14-almond-with-shell.jpg` is used by: badam-abdul-wahidi, maghaz-badam-abdul-wahidi
- `41-alsi.jpg` is used by: alsi, chia-seeds
- `51-maghaz-chilgoza.jpg` is used by: maghaz-chilgoza-half-roast, maghaz-chilgoza-full-roast
- `56-mixed-dried-fruits.jpg` is used by: mixed-dried-fruits, dried-strawberry, dried-kiwi, dried-pineapple, dried-mango
- `59-sunflower-seeds.jpg` is used by: sunflower-seeds, pumpkin-seeds

## Missing Images

- No CSV image filenames are missing from `assets/morganics/products/`.

## Product Rows Missing Image Src

- No primary product rows are missing image sources. Variant rows without `Image Src` are expected in Shopify product CSV format because the product image is set on the main product row.

## Notes

- No Liquid, theme layout, section, snippet, CSS, or JS files were edited in this phase.
- `products.js` was not activated or copied as storefront data.
- The ready CSV intentionally contains visible `PASTE_SHOPIFY_CDN_URL_FOR_...` markers so it is clear where final Shopify CDN URLs must be inserted before import.
