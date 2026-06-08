# Phase 17C Needs Shopify File URLs

Generated: 2026-06-08T08:28:35

The requested input file `products_export.csv` is not present in `02_SHOPIFY_THEME_BUILD`, and the available product CSV does not include every image-media column needed for a safe final Shopify import.

## Current Source Used For Working Map

- Source inspected: `data/morganics-shopify-product-status-title-update.csv`
- Backup created: `data/backups/products_export_before_image_sync.csv`
- Unique products scanned: 81
- CSV rows scanned: 161
- Missing required export columns: Image Position, Variant Image

## Files Created For Owner URL Pasting

- `data/morganics-admin-image-sync-working-map.csv`
- `data/morganics-shopify-file-url-paste-template.csv`

## Required Owner Step

Copy public Shopify CDN URLs from Shopify Admin -> Content -> Files, then paste each URL into the `shopify_cdn_image_url` column in `data/morganics-shopify-file-url-paste-template.csv`.

URLs must start with `https://cdn.shopify.com/` or another public Shopify Files CDN URL. Do not use local paths, theme asset URLs, or password-protected storefront URLs.

After URLs are pasted, run the final image update generation step to create `data/morganics-shopify-admin-image-update-final.csv` from a full Shopify product export.
