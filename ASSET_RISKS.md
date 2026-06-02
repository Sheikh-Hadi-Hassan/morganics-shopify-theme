# Morganics Asset Risks

Phase: 1 - safe asset preparation  
Scope: copied assets under `02_SHOPIFY_THEME_BUILD/assets/morganics`

No theme templates were updated, so these risks are preparation notes only.

## High Priority

1. Nested asset folders may not be upload-safe for every Shopify workflow.
   - The copied files are isolated under `assets/morganics/...` to avoid activating anything.
   - Shopify theme assets are commonly flat in production themes.
   - Before Liquid conversion, confirm whether the connected Shopify workflow accepts nested `assets` paths. If not, flatten or move final production assets into Shopify-supported asset names.

2. Several category icon PNGs are very large.
   - `category-icons/8.png` - about 8.9 MB.
   - `category-icons/9.png` - about 7.3 MB.
   - `category-icons/dry-fruits-icon.png` and `category-icons/dry-fruits.png` - about 12 MB each.
   - `category-icons/herbs-botanicals-icon.png` and `category-icons/herbs-botanicals.png` - about 10 MB each.
   - `category-icons/natural-sweeteners-icon.png` and `category-icons/natural-sweeteners.png` - about 10 MB each.
   - `category-icons/roots-adaptogens-icon.png` and `category-icons/roots-adaptogens.png` - about 11 MB each.
   - `category-icons/seeds-grains-icon.png` and `category-icons/seeds-grains.png` - about 9.7 MB each.
   - These should be optimized or replaced with correctly sized exports before launch.

3. Reference JS contains old commerce behavior.
   - `assets/morganics/js-reference/site.js` includes old localStorage cart, custom checkout, order tracking, Google Apps Script submission, and product data rendering logic.
   - It is copied only as a reference and is not linked from Liquid.
   - During conversion, do not activate this file directly. Extract only safe UI behavior and replace all commerce behavior with Shopify cart, checkout, orders, products, collections, and inventory.

## Medium Priority

1. Total staged asset weight is high.
   - `assets/morganics` total is approximately 288 MB.
   - Largest folders:
     - `category-icons` - about 153 MB.
     - `banners` - about 46 MB.
     - `review-images` - about 46 MB.
     - `products` - about 16 MB.
     - `morganics-hero` - about 11 MB.
     - `video` - about 9.7 MB.

2. Banner assets have duplicate JPG and PNG versions.
   - Every major banner appears in both `.jpg` and `.png`.
   - Later conversion should choose one production format per banner, usually the smaller acceptable image.

3. Category icon assets have duplicate `*-icon.png` and non-icon versions.
   - Examples: `dry-fruits-icon.png` and `dry-fruits.png`, `nuts-icon.png` and `nuts.png`.
   - Static code references the non-icon names for category cards, but the duplicates were preserved for visual parity.
   - Later conversion should identify which versions are actually used and remove unused duplicates.

4. Product image count is lower than product record count.
   - Static catalog has 81 product records and 72 unique image references.
   - This is not currently a missing-file issue: every referenced source image exists.
   - Some product records share image files, and inactive products are also represented in the copied product image folder.

5. Inactive product images were copied.
   - The copied product folder includes images referenced by inactive static products:
     - `53-pecan-nut.jpg`
     - `54-brazil-nuts.jpg`
     - `56-mixed-dried-fruits.jpg`
     - `60-daliya-oats.jpg`
   - `zarishk-pakistani` shares `01-zarishk.jpg`.
   - These should not automatically create published Shopify products.

6. Hero video is large.
   - `assets/morganics/video/pouch-reveal.mp4` is about 9.7 MB.
   - Confirm it is still required before launch; if used, compress and test mobile loading.

## Low Priority

1. `hero-banner/hero-image.png` may be legacy or supporting only.
   - It was copied because it exists in the approved visual assets.
   - The current approved homepage hero primarily uses `assets/morganics-hero`.

2. `lifestyle/family-routine.png` and `lifestyle/family-routine1.png` may not be actively used by current homepage markup.
   - They were copied for routine/lifestyle parity checks.
   - Confirm actual use during section conversion.

3. `banner-manifest.json` is not a visual file.
   - It was copied with banners because it documents/organizes banner assets.
   - It should not become live storefront data unless intentionally used.

4. `morganicsIngredients.json` is a data reference.
   - It supports the visual ingredient library but should be evaluated before being made live.
   - Product/catalog data must still come from Shopify, not old static data.

## Missing Asset Check

- Product image reference check against the static catalog: 0 missing source image files.
- Backup/meta exclusion check in copied folder: no `.DS_Store` or `*.bak-*` files found.
- `assets/products.js` was intentionally not copied; product data migration should happen through Shopify products, variants, collections, metafields, and media import.
