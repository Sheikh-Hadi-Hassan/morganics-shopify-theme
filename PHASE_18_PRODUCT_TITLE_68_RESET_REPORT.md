# Phase 18 Product Title 68 Reset Report

## Scope

Updated the Shopify product data artifacts so the approved launch catalog uses the owner-provided 68 product titles in the format:

`English Title - Urdu Title`

No theme UI, layout, section, cart, checkout, header, footer, or JavaScript behavior was changed.

## Changed Files

- `data/morganics-active-product-allowlist.csv`
- `data/morganics-shopify-product-status-title-update.csv`
- `data/morganics-shopify-products-68-title-reset.csv`
- `data/morganics-product-title-image-filename-map.csv`
- `data/morganics-products-missing-admin-create-needed.csv`
- `PHASE_18_PRODUCT_TITLE_68_RESET_REPORT.md`

Backups were created in `data/backups/` before overwriting the existing allowlist and title-update CSV.

## What Was Fixed

- Replaced older/mismatched Urdu spellings with the owner-approved spellings.
- Corrected product title format to match the image-title naming style.
- Preserved existing Shopify handles where the products already exist.
- Generated a clean 68-product allowlist.
- Generated a title-reset Shopify import CSV that:
  - keeps approved matched products active,
  - drafts non-approved existing products,
  - updates product titles and image alt text on matched product rows.
- Generated a product title to image filename map for Shopify Files synchronization.

## Owner-Approved Catalog Count

- Approved product titles: 68
- Duplicate final titles: 0
- Existing matched Shopify handles: 65
- Missing approved products in the current Shopify CSV export: 3

## Missing Products To Create In Shopify Admin

These products are approved by the owner but are not present in the current Shopify export, so they are listed separately instead of being created with guessed price/image data:

- `Kali Darakh - کالی دراکھ`
- `Beet Root Powder - بیٹ روٹ پاؤڈر`
- `Maghaz Sunflower Seeds - مغز سورج مکھی`

Use `data/morganics-products-missing-admin-create-needed.csv` for the create list.

## Import Artifacts

Use this for the title/status cleanup import:

- `data/morganics-shopify-products-68-title-reset.csv`

Use this for title/image filename matching:

- `data/morganics-product-title-image-filename-map.csv`

## Validation

- Allowlist rows: 68
- Allowlist active existing products: 65
- Allowlist missing create-needed products: 3
- Reset import active product rows: 65
- Reset import draft product rows: 16
- Approved title mismatches in active import: 0

## Intentionally Not Changed

- No product descriptions were rewritten.
- No prices were guessed.
- No image URLs were guessed.
- No theme UI files were edited.
- The original full product export `data/morganics-shopify-products.csv` was not overwritten.
