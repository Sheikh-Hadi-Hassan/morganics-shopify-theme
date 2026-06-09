# Morganics Broken Image Audit Guide

This audit checks the Shopify storefront preview/live URL and the local theme source for broken or missing image references. It does not use Shopify Admin API access and does not change the theme UI.

## Run The Audit

From the Shopify theme folder:

```bash
cd /Users/sheikhhadihassan/Documents/Morganics-Order-Confirmation-App/Morganics_Ecommerce_Website/morganics-shopify-theme
npm install
npm run audit:images -- "https://my-store-300000000000000008578.myshopify.com?preview_theme_id=152812683458"
```

You can use any password-page, preview-theme, or live-store URL. For preview themes, keep the `preview_theme_id` query parameter in the URL.

Optional page limit:

```bash
AUDIT_MAX_PAGES=120 npm run audit:images -- "https://store.myshopify.com?preview_theme_id=123"
```

## Report Files

The script writes reports into:

```text
reports/
```

Files created:

```text
reports/broken-images-report.csv
reports/all-images-found.csv
reports/missing-local-assets.csv
```

## What Each CSV Means

### `broken-images-report.csv`

Use this first. It lists image URLs that failed to load or rendered as invalid.

Columns:

- `page_url`: page where the image was found
- `image_src`: image URL or source candidate
- `status_code`: HTTP status or failure reason
- `alt_text`: `alt` text when available
- `element_selector`: approximate DOM selector
- `section_hint`: closest section/header/footer/container hint
- `recommended_filename`: filename inferred from the broken URL
- `likely_source_type`: `img`, `srcset`, lazy data attribute, CSS background, etc.
- `suggested_fix`: practical next fix

### `all-images-found.csv`

Lists every image candidate found during the crawl, including successful images. Use it when you need a complete inventory.

### `missing-local-assets.csv`

Scans local theme files in:

- `sections`
- `snippets`
- `templates`
- `layout`
- `assets` CSS/JS/JSON/Liquid
- `config`

It compares referenced Morganics image filenames against files present in `assets/`. If a referenced file is missing locally, it is reported here.

## How To Identify Missing Files

1. Open `reports/broken-images-report.csv`.
2. Sort by `status_code`.
3. For `404`, check `recommended_filename`.
4. Search the local theme:

```bash
rg "recommended-filename.png" .
```

5. If the file is referenced locally but missing from `assets/`, confirm it also appears in `reports/missing-local-assets.csv`.

## Uploading Files To Shopify Files

Use Shopify Admin when the image should be reusable content, product media, metafield content, or a file URL:

1. Open Shopify Admin.
2. Go to **Content -> Files**.
3. Upload the missing image.
4. Copy the Shopify file URL or use Liquid `file_url` with the exact filename when appropriate.
5. Re-run the audit.

## `file_url` vs `asset_url`

Use `asset_url` when the image is inside the theme `assets/` folder and ships with the theme:

```liquid
{{ 'morganics-logo.png' | asset_url }}
```

Use `file_url` when the image is uploaded in Shopify Admin -> Content -> Files:

```liquid
{{ 'morganics-product-photo.png' | file_url }}
```

General rule:

- Theme UI images, logos, icons, decorative hero assets: `asset_url`
- Merchant-managed images, downloadable content, product/metafield files: `file_url`
- Product images from Shopify products: use Shopify product image objects and `image_url`

## QA After Fixing Images

1. Re-run the audit command.
2. Confirm `reports/broken-images-report.csv` has no unexpected broken image rows.
3. Preview the theme in desktop, tablet, and mobile.
4. Check:
   - homepage hero images
   - navigation/mega-menu images
   - collection cards
   - product cards
   - product pages
   - password/launch page
   - cart page
5. Run Shopify Theme Check:

```bash
shopify theme check --path .
```

6. Only publish after the preview has no broken critical images.
