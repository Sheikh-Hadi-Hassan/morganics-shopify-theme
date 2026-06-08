# Phase 17C Admin Image Sync From Export Report

Generated: 2026-06-08T08:28:35

## Scope

This phase is product media CSV preparation only. No theme design, homepage, hero, header, footer, product-card, cart, checkout, or collection layout files were changed for the product media workflow.

## Products Scanned

- Source CSV inspected: `data/morganics-shopify-product-status-title-update.csv`
- Backup created: `data/backups/products_export_before_image_sync.csv`
- CSV rows scanned: 161
- Unique product handles scanned: 81
- Active products scanned: 65
- Draft products scanned: 16
- Products with variants/multiple CSV rows: 43
- First product rows with blank `Image Src`: 0

## Export Column Status

- Required image columns: Handle, Title, Image Src, Image Position, Image Alt Text, Variant Image, Status
- Missing from available CSV: Image Position, Variant Image
- `products_export.csv` present: no

Because the full current Shopify export and public Shopify Files CDN URL mapping are not available yet, the final import CSV was not created.

## Files Created

- `data/morganics-admin-image-sync-working-map.csv`
- `data/morganics-shopify-file-url-paste-template.csv`
- `PHASE_17C_NEEDS_SHOPIFY_FILE_URLS.md`
- `PHASE_17C_ADMIN_IMAGE_SYNC_FROM_EXPORT_REPORT.md`

## Expected Image Filenames Generated

Expected filename candidates were generated from product titles and handles. Matching rules include spaces/hyphens, case differences, `.png/.jpg/.jpeg/.webp`, English-only titles, English plus Urdu titles, and the alias rules specified in the brief.

## Shopify CDN URLs Found/Missing

- Shopify CDN URLs available in mapping file: 0
- Products waiting for pasted Shopify Files URLs: 81
- Final CSV created: no, waiting for URLs and a full current Shopify product export with `Image Position` and `Variant Image` columns.

## Duplicate / Alias Risks

- `Zarishk`, `Zarishk Pakistani`, and `Zarishk Imported` are treated as equivalent filename candidates.
- `Kajo Plain` and `Kajo Sada` are treated as equivalent filename candidates.
- `Maghaz Akhrot` and `Walnut` are treated as equivalent filename candidates.
- `Anjeer` and `Fig` are treated as equivalent filename candidates.
- `Badam Abdul Wihidi` and `Badam Abdul Wahidi` are treated as equivalent filename candidates.

## Import Instructions After URLs Are Added

1. Export all products from Shopify Admin to get a current `products_export.csv`.
2. Place that file in `02_SHOPIFY_THEME_BUILD/products_export.csv` or `02_SHOPIFY_THEME_BUILD/data/products_export.csv`.
3. Paste CDN URLs into `data/morganics-shopify-file-url-paste-template.csv`.
4. Generate the final CSV `data/morganics-shopify-admin-image-update-final.csv`.
5. Shopify Admin -> Products -> Import.
6. Upload `data/morganics-shopify-admin-image-update-final.csv`.
7. Enable overwrite/update products with matching handles.
8. Review Shopify preview carefully before importing.

## Rollback Instructions

Re-import the backed up source CSV if needed:

- `data/backups/products_export_before_image_sync.csv`

## Validation

- Working map CSV parses cleanly.
- Paste template CSV parses cleanly.
- No local machine paths were added.
- No theme asset URLs were added.
- No duplicate handles were created.
- Final import CSV was intentionally not generated because CDN URLs/current full export are missing.
