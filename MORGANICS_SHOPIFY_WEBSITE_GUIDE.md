# Morganics Shopify Website Guide

This file documents the current Morganics Shopify storefront, the theme structure, the key custom features, and the operating steps for local preview, live publishing, and Shopify Admin updates.

## Store Overview

- Brand: Morganics
- Live domain: https://morganics.store
- Shopify shop: `my-store-300000000000000008578.myshopify.com`
- Live theme name: `Morganics 3.6`
- Live theme ID: `153502941378`
- Local Shopify preview URL: `http://127.0.0.1:9292`
- Main local theme folder:
  `/Users/sheikhhadihassan/Documents/Morganics-Order-Confirmation-App/Morganics_Ecommerce_Website/morganics-shopify-theme`

The storefront is a custom Shopify theme built around a rich Morganics visual identity: dark botanical backgrounds, cream UI surfaces, mobile-first bottom navigation, custom product cards, a custom product page, and Shopify Admin-driven product content.

## Main Theme Files

### Layout

- `layout/theme.liquid`
  - Main Shopify theme layout.
  - Loads global CSS and JavaScript.
  - Hosts shared storefront structure.

### Homepage

- `templates/index.json`
  - Controls homepage section order and section settings.
  - Includes the Morganics hero, featured products, and new arrivals sections.

- `sections/morganics-hero.liquid`
  - Custom homepage hero section.
  - Uses the Morganics hero stage, ingredient/product composition, and mobile-safe layout.

- `assets/morganics-hero.css`
  - Hero-specific styling.
  - Controls responsive stage sizing, header spacing, and bottom-app-bar spacing.

- `assets/morganics-hero.js`
  - Hero interactions and slider behavior.

### Featured Products And New Arrivals

- `sections/morganics-featured-products.liquid`
  - Shared section for homepage product showcases.
  - Used for both Featured Products and New Arrivals.
  - Supports manually selected products through Shopify theme settings.
  - Supports fallback collection products.
  - Supports newest-product ordering for New Arrivals.

- `assets/morganics-theme.css`
  - Contains shared product showcase styles.
  - Includes responsive grids, product cards, mobile spacing, and bottom navigation spacing.

Current homepage product sections:

- Featured Products
  - Heading: `Seasonal pantry favorites`
  - Product count: 8
  - Editable in Shopify theme editor.
  - Currently configured with seasonal/manual product selection.

- New Arrivals
  - Heading: `New Arrivals`
  - Product count: 8
  - Uses newest-product ordering.

### Product Page

- `sections/main-product-morganics.liquid`
  - Main custom product page section.
  - Handles title, media, price, variants, quantity, buy buttons, product tabs/metafields, payment options, and Powder Form logic.

- `assets/morganics-product-layout.css`
  - Product page layout and styling.

- `assets/morganics-product-gallery.js`
  - Product gallery behavior.

- `assets/morganics-product.js`
  - Product variant behavior.
  - Handles Regular/Powder variant switching.
  - Handles cart property behavior for Powder Form.

- `snippets/morganics-variant-pills.liquid`
  - Renders variant pills.
  - Hides Powder variants from the visible size selector.
  - Keeps Powder variants available internally for the checkbox behavior.

- `snippets/morganics-payment-options.liquid`
  - Payment/COD/support UI for product pages.

### Product Cards And Collections

- `snippets/morganics-product-card.liquid`
  - Product card UI used in homepage sections and collection pages.
  - Hides Powder-only variants from normal size chips.

- `assets/morganics-collection-layout.css`
  - Collection page layout and responsive styling.

## Local Development

Run the Shopify theme preview from the theme folder:

```bash
cd /Users/sheikhhadihassan/Documents/Morganics-Order-Confirmation-App/Morganics_Ecommerce_Website/morganics-shopify-theme
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme dev --host 127.0.0.1 --port 9292
```

Open:

```text
http://127.0.0.1:9292
```

Useful test URLs:

```text
http://127.0.0.1:9292/
http://127.0.0.1:9292/collections/all
http://127.0.0.1:9292/collections/all?page=2
http://127.0.0.1:9292/products/aqarqara
```

If the preview returns `401 Unauthorized`, the Shopify CLI preview session probably expired. Restart `shopify theme dev` and complete Shopify CLI authentication if prompted.

## Live Deployment

The live theme previously used this live push target:

```bash
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme push --live --allow-live --nodelete \
  --only assets/morganics-cart.js \
  --only assets/morganics-hero.css \
  --only assets/morganics-hero.js \
  --only assets/morganics-theme.css \
  --only assets/morganics-collection-layout.css \
  --only assets/morganics-product-gallery.js \
  --only assets/morganics-product-layout.css \
  --only config/settings_schema.json \
  --only layout/theme.liquid \
  --only sections/main-product-morganics.liquid \
  --only sections/morganics-featured-products.liquid \
  --only sections/morganics-hero.liquid \
  --only snippets/morganics-payment-options.liquid \
  --only snippets/morganics-product-card.liquid \
  --only templates/index.json
```

Use scoped `--only` pushes for theme changes. Avoid pushing the entire working tree unless that is intentional.

## Homepage Behavior

### Hero

The homepage hero is built to stay centered and avoid overlap with the mobile bottom app bar.

Important behavior:

- Hero stage scales responsively.
- Stage should remain visually dominant on mobile.
- Bottom app bar must not overlap the hero content.
- The mobile layout includes safe spacing for the sticky bottom navigation.

### Featured Products

Featured Products are editable through Shopify theme editor.

Admin path:

```text
Shopify Admin -> Online Store -> Themes -> Customize -> Homepage -> Featured Products
```

Expected setup:

- Choose products manually for seasonal features.
- Keep at least 8 products selected.
- Use active products with images, prices, and available variants.

### New Arrivals

New Arrivals uses the same showcase section, but should be configured to show newest products.

Admin path:

```text
Shopify Admin -> Online Store -> Themes -> Customize -> Homepage -> New Arrivals
```

Expected setup:

- Product order: newest.
- Limit: 8 products.
- Collection fallback: all products or the intended arrival collection.

## Powder Form Feature

The product page has a Powder Form checkbox.

The checkbox appears only when:

1. The product has at least one real variant with option value `Powder`.
2. The product is not in the theme-level powder exclusion list.

Recommended variant structure:

```text
Option 1: Size
Values: 100g, 200g, 500g

Option 2: Form
Values: Regular, Powder
```

Example variants:

```text
100g / Regular
100g / Powder
200g / Regular
200g / Powder
500g / Regular
500g / Powder
```

The visible size selector should show only normal size choices. Powder variants are hidden from the visible pill row and used internally when the checkbox is selected.

When the customer checks Powder Form:

- JavaScript finds the matching Powder sibling variant.
- Price updates to the Powder variant price.
- Add-to-cart includes the cart property:

```text
Powder Form: Yes
```

If the selected size has no Powder sibling, the checkbox is unchecked and a warning is shown.

### Powder Exclusion Rule

The theme currently blocks Powder Form for the excluded products requested by the store owner.

Excluded product names include:

- Maghaz Badam Gurbandi
- Dar Chini Gol
- Goond Katira
- Anjeer / Fig
- Maghaz Chilgoza Half Roasted
- Maghaz Chilgoza Full Roasted
- Maghaz Akhrot / Walnut
- Banana Dried
- Mabroom dates
- Khajoor Ajwa
- Mixed Berries
- Cranberry
- Honey
- Luban
- Sogi Gol Mewa
- Pista Namkeen
- Sarson Black
- Elaichi Sabz
- Gur
- Chilka Ispaghol
- Kajo Fry
- Kajo Roasted
- Kajo Plain
- Til Black
- Zarishk
- Harmal
- Saffron
- Pista Maghaz
- Shakar
- Sogi Sundarhani Mewa
- Badam Abdul Wahidi
- Kali Darakh
- Goji Berry
- Musabbar
- Salajeet
- hibiscus herb
- Sunflower Seeds
- Maghaz Sunflower Seeds

The current implementation is in:

```text
sections/main-product-morganics.liquid
```

## Shopify Admin Product Workflow

### Add Or Edit A Product

Admin path:

```text
Shopify Admin -> Products -> Open product
```

Check:

- Title
- Description
- Product images
- Category
- Product type
- Vendor
- Collections
- Tags
- Search engine listing
- Variants
- Inventory
- Product metafields

### Add Powder Variants

For a product that should support Powder Form:

1. Open the product in Shopify Admin.
2. Go to Variants.
3. Add option `Form`.
4. Add values:
   - `Regular`
   - `Powder`
5. Make sure every supported size has a matching Powder sibling.
6. Set Powder variant price.
7. Set SKU and inventory.
8. Save.

If a product is in the theme exclusion list, the Powder checkbox will stay hidden even if Powder variants exist.

### Bulk Product Editing

Admin path:

```text
Shopify Admin -> Products -> Select products -> Bulk edit
```

Use bulk editor for:

- Status
- Price
- Inventory
- Tags
- Product type
- Vendor
- Metafields, when exposed as columns

For large variant changes, CSV import/export is usually safer than manually editing one product at a time.

## Product Metafields

Visible product metafields in the admin include content such as:

- Benefits
- Use Cases
- Precautions
- Usage
- FAQs
- Custom Key Features
- Short Description

These support richer product page content without hardcoding everything in the theme.

General content rules:

- Keep claims practical and safe.
- Do not write disease-treatment claims.
- Do not claim products cure, treat, diagnose, or prevent disease.
- Use food, pantry, traditional use, freshness, aroma, texture, and sensible daily-use language.

Avoid unsafe words or claims such as:

```text
cure
treat
treatment
cancer
diabetes
testosterone
fertility
sexual
disease
detox
weight loss
blood pressure
cholesterol
guaranteed
miracle
```

## Mobile UX Notes

The storefront is strongly mobile-first.

Key mobile elements:

- Cream top navigation/header.
- Sticky bottom app bar.
- Home, Categories, Shop, Cart, and WhatsApp shortcuts.
- Product and collection layouts must leave enough bottom spacing so content does not sit behind the app bar.

When editing CSS, always check:

```text
390 x 844 mobile viewport
desktop viewport
collection page
product page
homepage hero
cart interaction
```

## QA Checklist

### Homepage

- Hero is centered and not clipped.
- Hero content does not overlap mobile bottom app bar.
- Featured Products shows at least 8 products.
- New Arrivals shows at least 8 products.
- Product cards have images, prices, and variant chips where appropriate.
- Mobile spacing feels intentional.

### Collection Pages

- `/collections/all` loads correctly.
- Pagination works.
- Product cards are consistent.
- Bottom app bar does not cover final row content.

### Product Pages

- Product title, media, price, and description render correctly.
- Variant pills work.
- Add to cart works.
- Powder checkbox appears only for valid non-excluded products with Powder variants.
- Excluded products do not show Powder checkbox.
- Cart line item shows Powder Form property when selected.

### Live Site

After pushing:

- Check https://morganics.store
- Check at least one homepage section.
- Check one collection page.
- Check one product with Powder Form.
- Check one excluded product.
- Check cart.

## Common Troubleshooting

### Local Preview Shows 401

Restart Shopify CLI preview:

```bash
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme dev --host 127.0.0.1 --port 9292
```

Then complete authentication if prompted.

### CSS Change Does Not Show

Check whether a later rule in `assets/morganics-theme.css` overrides the file you edited. The final authority block may be later in the cascade.

### Powder Checkbox Does Not Show

Check:

1. Product has a `Powder` variant.
2. Variant option value is exactly `Powder`, case-insensitive.
3. Product is not in the exclusion list.
4. Product page JavaScript is loading.

### Powder Checkbox Shows But Does Not Switch

Check that every Regular size has a matching Powder sibling.

Example:

```text
100g / Regular
100g / Powder
```

If `100g / Powder` is missing, the checkbox cannot switch for `100g`.

## Maintenance Notes

- Keep code edits scoped to the theme files being changed.
- Prefer Shopify Admin for content/product changes.
- Prefer theme code for behavior and layout rules.
- Prefer scoped live pushes with `--only`.
- Verify local preview before pushing live.
- For public-facing changes, verify the live site after deployment.

