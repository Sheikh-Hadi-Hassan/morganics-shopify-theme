# Phase 7 Product CSV and Content Import System Report

## Outputs Created

- `data/morganics-products-export.json`
- `data/morganics-shopify-products.csv`
- `data/morganics-metafields-map.csv`
- `data/morganics-collections-map.csv`
- `PRODUCT_IMPORT_WARNINGS.md`
- `PHASE_7_PRODUCT_IMPORT_REPORT.md`

## Source Handling

- Read `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/assets/products.js` as source data only.
- Did not edit the master folder.
- Did not activate `products.js` in the Shopify theme.
- Did not modify Liquid templates or storefront behavior for this phase.

## Export Summary

- Parsed source products: 81
- Shopify product CSV rows: 161
- Metafield map rows: 1056
- Collection map rows: 81
- Warning rows: 254
- Collection handles: dry-fruits, nuts, botanicals, herbs, natural-sweeteners, seeds, gums-specialties, premium-snacks, wellness-blends

## CSV Decisions

- Shopify handles are generated from source `slug`, falling back to `id` or product name.
- Product categories are mapped from source categories to broad Shopify product category text where practical.
- Product type preserves the old category name.
- Tags include Morganics, the source category, and aliases.
- Active products map to `Status=active` and `Published=TRUE`; inactive products map to `Status=draft` and `Published=FALSE`.
- Variants use `Size` as Option1 and preserve/generate SKUs from the source SKU plus size labels.
- Variant inventory tracking is set to Shopify with quantity `0` and policy `deny` until real stock is entered.

## Metafields Preserved

- Urdu names and Urdu titles.
- Short descriptions.
- Use cases, benefits, usage, precautions, and storage.
- FAQs as JSON.
- Keywords, aliases, and pairing ideas.
- Source IDs, source SKUs, and source status notes where present.

## Limitations and Risks

- Product image import depends on public URLs. Current `morganics.store` asset requests redirect to the Shopify password page, so image URLs may need replacement before Admin import.
- Variant-level prices were generated where missing in source data and must be reviewed.
- Shopify product category strings may need adjustment to exact Shopify taxonomy values during import review.
- Real inventory quantities were not available in the static catalog and must be entered in Shopify.
- Medical/health-risk language was flagged for review rather than automatically rewritten, so approved copy can remain source-aligned until a content cleanup phase.

## Validation

- Generated CSV files include the requested Shopify product import columns.
- Duplicate handle and duplicate SKU checks were run during generation.
- `products.js` remains inactive storefront data.
