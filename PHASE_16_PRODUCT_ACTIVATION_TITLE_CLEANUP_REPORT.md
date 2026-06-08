# Phase 16 Product Activation and Title Cleanup Report

Generated: 2026-06-08T05:59:26

## Files Created

- `data/morganics-active-product-allowlist.csv`
- `data/morganics-shopify-product-status-title-update.csv`
- `data/backups/morganics-shopify-products.csv.20260608-055926.bak`
- `PHASE_16_PRODUCT_STATUS_TITLE_MAPPING_REPORT.md`
- `PHASE_16_PRODUCT_ACTIVATION_TITLE_CLEANUP_REPORT.md`

## Counts

- Requested active products in allowlist: 68
- Existing Shopify products matched and set active: 65
- Existing Shopify products set draft: 16
- Unmatched requested products: 3
- Source CSV rows preserved in update CSV: 161

## Unmatched Products

- Beet Root Powder - بیٹ روٹ پاؤڈر: No matching handle/title/alias found in current Shopify export or product JSON.
- Maghaz Sunflower Seeds - مغز سورج مکھی: No unique matching handle found. Existing sunflower-seeds is used for Sunflower Seeds, so this is left unmatched to avoid duplicate handle/title risk.
- Kali Darakh - کالی دارک: No matching handle/title/alias found in current Shopify export or product JSON.

## Duplicate Title Risks

- Duplicate active final titles: None.
- Review `Sogi Gol Mewa` and `Sogi Sundarhani Mewa` mappings because current export uses `Sogi Big Kishmish Mewa` and `Sogi Small Kishmish Mewa` handles.
- Review `Zarishk` mapping because current export contains both imported and Pakistani Zarishk products.

## CSV Behavior

The update CSV preserves the original Shopify export columns and all variant rows. On the first row for each product handle:

- Allowlisted/matched products have `Status=active`, `Published=TRUE`, and the exact requested title.
- Non-allowlist products have `Status=draft` and `Published=FALSE`.
- Handles, variants, prices, inventory, images, descriptions, product type, vendor, tags, and SEO fields are preserved.

## Import Instructions

1. Open Shopify Admin.
2. Go to `Products`.
3. Import `data/morganics-shopify-product-status-title-update.csv`.
4. Choose the option to overwrite/update products with matching handles.
5. Review the three unmatched products and create them separately only if the store owner confirms source images, variants, and pricing.
6. After import, verify active product count and spot-check titles on collection/product pages.

## Rollback Instructions

Use the backup source CSV if the import needs to be reverted:

- Backup: `data/backups/morganics-shopify-products.csv.20260608-055926.bak`

Re-import the backup CSV through Shopify Admin with overwrite/update matching handles.

## Validation

- Source CSV present and backed up.
- Generated CSV parses cleanly.
- No blank handles were introduced.
- All requested allowlist products are present in `data/morganics-active-product-allowlist.csv`.
- Every existing non-allowlist product is marked draft in the update CSV first product row.
- No Shopify import was run automatically.
- No theme, layout, header, hero, footer, product-card, cart, or checkout file was edited.

## Theme Check

Not rerun for this product-data-only task. Previous theme files were not changed, so theme-check status should remain unaffected.
