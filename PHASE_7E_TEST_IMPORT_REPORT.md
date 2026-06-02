# Phase 7E Test Import Report

## Output Created

- `data/morganics-shopify-products-test-5.csv`

## Source

- `data/morganics-shopify-products-no-images.csv`

## Selection Rules Applied

- Kept the exact same Shopify CSV columns as the source file.
- Selected 5 products with complete primary product data.
- Included all variant rows for each selected product so Shopify can import size options correctly.
- Chose products from different categories where possible.
- Kept `Image Src` blank for every row.
- Did not modify Liquid, theme layout, snippets, sections, or the master folder.

## Selected Products

- `zarishk-imported`: Zarishk Imported | Category: Dry Fruits | Variant rows: 2 | Sizes: 200g, 500g
- `kajo-roasted`: Kajo Roasted | Category: Nuts | Variant rows: 3 | Sizes: 200g, 500g, 1kg
- `hareer-sabaz`: Hareer Sabaz | Category: Botanicals | Variant rows: 1 | Sizes: Premium Pack
- `gur`: Gur | Category: Natural Sweeteners | Variant rows: 1 | Sizes: Premium Pack
- `sarson-black`: Sarson Black | Category: Seeds | Variant rows: 3 | Sizes: 100g, 200g, 500g

## Why These Products

- They provide a small but varied import test across key Morganics categories.
- They include both single-variant and multi-variant structures from the generated Shopify CSV.
- They keep product titles, descriptions, SEO, variants, SKUs, prices, and inventory fields intact while avoiding blocked image URLs.

## Counts

- Products selected: 5
- CSV rows written excluding header: 10
- Columns: 23
