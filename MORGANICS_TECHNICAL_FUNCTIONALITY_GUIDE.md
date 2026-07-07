# Morganics Shopify Technical Functionality Guide

This file documents the technical implementation of the Morganics Shopify theme: theme architecture, important files, Shopify data dependencies, storefront behavior, JavaScript responsibilities, Liquid rules, deployment workflow, and QA instructions.

## Project Location

Theme folder:

```text
/Users/sheikhhadihassan/Documents/Morganics-Order-Confirmation-App/Morganics_Ecommerce_Website/morganics-shopify-theme
```

Live store:

```text
https://morganics.store
```

Shopify shop:

```text
my-store-300000000000000008578.myshopify.com
```

Live theme:

```text
Morganics 3.6
Theme ID: 153502941378
```

## Local Development

Run local Shopify theme preview:

```bash
cd /Users/sheikhhadihassan/Documents/Morganics-Order-Confirmation-App/Morganics_Ecommerce_Website/morganics-shopify-theme
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme dev --host 127.0.0.1 --port 9292
```

Open:

```text
http://127.0.0.1:9292
```

Common local URLs:

```text
http://127.0.0.1:9292/
http://127.0.0.1:9292/collections/all
http://127.0.0.1:9292/collections/all?page=2
http://127.0.0.1:9292/products/aqarqara
```

If preview returns `401 Unauthorized`, restart `shopify theme dev` and complete Shopify CLI login/authentication.

## Theme Architecture

The theme uses Shopify Liquid for server-rendered structure, CSS assets for layout/styling, and JavaScript assets for client-side interactions such as product variant switching and cart behavior.

Main technical layers:

```text
layout/theme.liquid
templates/*.json
sections/*.liquid
snippets/*.liquid
assets/*.css
assets/*.js
config/settings_schema.json
```

## Important Files

### Layout

```text
layout/theme.liquid
```

Responsibilities:

- Base HTML document.
- Global theme wrapper.
- Loads global CSS and JS assets.
- Outputs Shopify content sections.
- Provides page-wide structure for header/footer/app-shell assets.

### Homepage Template

```text
templates/index.json
```

Responsibilities:

- Controls homepage section order.
- Stores section settings.
- Configures hero, featured products, and new arrivals.

### Hero

```text
sections/morganics-hero.liquid
assets/morganics-hero.css
assets/morganics-hero.js
```

Responsibilities:

- Renders homepage hero.
- Handles stage/product composition.
- Handles responsive hero sizing.
- Keeps hero clear of header and mobile bottom app bar.
- Handles slider/interaction behavior if configured.

### Featured Products / New Arrivals

```text
sections/morganics-featured-products.liquid
```

Responsibilities:

- Shared showcase section.
- Used for both Featured Products and New Arrivals.
- Supports manual product selection.
- Supports collection fallback.
- Supports newest-product ordering.
- Supports configurable product limit.
- Uses product card snippet for consistent cards.

Expected homepage behavior:

- Featured Products has at least 8 seasonal/manual products.
- New Arrivals has at least 8 newest products.

### Product Page

```text
sections/main-product-morganics.liquid
assets/morganics-product-layout.css
assets/morganics-product-gallery.js
assets/morganics-product.js
```

Responsibilities:

- Product detail layout.
- Product media/gallery.
- Price rendering.
- Variant rendering.
- Add-to-cart form.
- Product metafields.
- Powder Form checkbox.
- Variant switching.
- Cart property submission.

### Variant Pills

```text
snippets/morganics-variant-pills.liquid
```

Responsibilities:

- Renders visible variant pills.
- Detects Regular/Powder form variants.
- Hides Powder variants from normal size display.
- Keeps hidden inputs/data attributes for JS variant switching.

### Product Cards

```text
snippets/morganics-product-card.liquid
```

Responsibilities:

- Product card layout for homepage and collection grids.
- Product image/title/price.
- Variant chip display.
- Hides Powder-only variants from standard size chips.

### Payment Options

```text
snippets/morganics-payment-options.liquid
```

Responsibilities:

- Product page payment/support messaging.
- COD/payment trust UI.

### Cart

```text
assets/morganics-cart.js
```

Responsibilities:

- Cart interaction behavior.
- Cart drawer or cart updates if used by the theme.
- Display/support for line item properties such as `Powder Form: Yes`.

## CSS Asset Responsibilities

### `assets/morganics-theme.css`

Shared global styling.

Controls:

- Header.
- Bottom app bar.
- Product showcase sections.
- Product cards.
- Shared responsive layout.
- General Morganics theme rules.

Important note: this file can override earlier CSS because of cascade order. If a change does not appear, search this file for a later matching selector.

### `assets/morganics-hero.css`

Hero-only styling.

Controls:

- Hero section height.
- Stage size.
- Ingredient positioning.
- Responsive scale.
- Header offset.
- Bottom safe spacing.

### `assets/morganics-product-layout.css`

Product page styling.

Controls:

- Product grid/stack layout.
- Gallery.
- Info panel.
- Variant pills.
- Product form.
- Product details sections.

### `assets/morganics-collection-layout.css`

Collection page styling.

Controls:

- Collection header.
- Product grid.
- Pagination.
- Mobile spacing.
- Bottom app bar clearance.

## Shopify Data Model

### Products

Products are managed in Shopify Admin:

```text
Shopify Admin -> Products
```

Theme depends on:

- Product title.
- Product handle.
- Product media.
- Product variants.
- Price.
- Inventory.
- Product description.
- Product category.
- Collections.
- Product metafields.

### Collections

Collections power listing pages and product showcase fallbacks.

Important URLs:

```text
/collections/all
/collections/all?page=2
```

### Variants

Variants are critical for:

- Size selection.
- Price changes.
- Powder Form switching.
- Inventory/availability.

Recommended variant structure for powder-enabled products:

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

## Product Metafields

Product page content uses Shopify product metafields where available.

Common metafields:

```text
Benefits
Use Cases
Precautions
Usage
Faq's
custom Key Features
Short Description
```

Technical rule:

- Product metafields should provide content only.
- Layout and behavior should stay in theme code.

## Powder Form Functionality

The Powder Form feature is a product-page variant-switching system.

### User-Facing Behavior

When supported:

1. Customer selects a size.
2. Customer checks `Powder Form`.
3. Theme finds matching Powder variant.
4. Price changes to Powder variant price.
5. Add-to-cart submits the Powder variant.
6. Cart line item includes:

```text
Powder Form: Yes
```

If no matching Powder variant exists for the selected size:

- Checkbox unchecks.
- Warning is shown.
- Customer remains on regular variant.

### Technical Requirements

For Powder checkbox to appear:

1. Product must not be in the theme exclusion list.
2. Product must have at least one variant with option value `Powder`.

The theme now enables Powder Form by default for all non-excluded products that have Powder variants.

### Powder Variant Detection

JavaScript identifies Powder variants by option value:

```text
Powder
```

Matching is case-insensitive, but the correct admin value should be exactly:

```text
Powder
```

Regular variants should use:

```text
Regular
```

### Powder Sibling Matching

A Regular and Powder sibling should share the same non-form options.

Valid example:

```text
100g / Regular
100g / Powder
```

Invalid/incomplete example:

```text
100g / Regular
200g / Powder
```

In the invalid example, selecting `100g` and checking Powder will fail because no `100g / Powder` sibling exists.

### Excluded Products

The theme blocks Powder Form for the excluded product names requested by the store owner.

The exclusion rule is currently implemented in:

```text
sections/main-product-morganics.liquid
```

Excluded products include:

```text
Maghaz Badam Gurbandi
Dar Chini Gol
Goond Katira
Anjeer / Fig
Maghaz Chilgoza Half Roasted
Maghaz Chilgoza Full Roasted
Maghaz Akhrot / Walnut
Banana Dried
Mabroom dates
Khajoor Ajwa
Mixed Berries
Cranberry
Honey
Luban
Sogi Gol Mewa
Pista Namkeen
Sarson Black
Elaichi Sabz
Gur
Chilka Ispaghol
Kajo Fry
Kajo Roasted
Kajo Plain
Til Black
Zarishk
Harmal
Saffron
Pista Maghaz
Shakar
Sogi Sundarhani Mewa
Badam Abdul Wahidi
Kali Darakh
Goji Berry
Musabbar
Salajeet
hibiscus herb
Sunflower Seeds
Maghaz Sunflower Seeds
```

Important: because the current rule uses title matching, product title changes can affect the exclusion behavior.

## Add-To-Cart Flow

Product forms submit the selected variant ID.

For Powder Form:

- JS changes the selected variant to the Powder sibling.
- The form includes line item property:

```text
properties[Powder Form] = Yes
```

QA:

1. Select regular size.
2. Add to cart.
3. Confirm cart uses regular variant.
4. Select same size and check Powder.
5. Add to cart.
6. Confirm cart uses Powder variant and shows Powder Form property.

## Homepage Product Showcase Functionality

The shared product showcase section supports:

- Manual product list.
- Collection fallback.
- Newest sorting.
- Product limit.
- Section anchor.
- Product card rendering.

Technical behavior:

- If manual products are selected, those products should render first.
- If no manual products are selected, collection products can be used.
- New Arrivals should use newest ordering.
- Product count should stay at 8 where possible.

Admin editing path:

```text
Shopify Admin -> Online Store -> Themes -> Customize -> Homepage
```

## Collection Page Functionality

Collection pages should render Shopify collection products with pagination.

Important behavior:

- Product grid loads all products for current collection/page.
- Pagination should work.
- Product cards should be consistent with homepage cards.
- Powder variants should not appear as normal size chips.

QA URLs:

```text
/collections/all
/collections/all?page=2
```

## Product Page Functionality

Product page should support:

- Media gallery.
- Product title.
- Price.
- Variant selection.
- Powder Form where applicable.
- Quantity selector if present.
- Add-to-cart.
- Buy/payment options.
- Product details and metafields.
- Search engine listing managed in Shopify Admin.

QA product:

```text
/products/aqarqara
```

Also test:

- One product with Powder variants.
- One excluded product with Powder variants.
- One product without Powder variants.

## Shopify Admin Workflows

### Edit Product Content

```text
Shopify Admin -> Products -> Open product
```

Update:

- Title.
- Description.
- Media.
- Category.
- Type.
- Vendor.
- Collections.
- Tags.
- SEO listing.
- Metafields.

### Edit Variants

```text
Shopify Admin -> Products -> Open product -> Variants
```

Update:

- Size.
- Form.
- Price.
- Compare-at price.
- SKU.
- Barcode.
- Inventory.
- Image.

### Bulk Edit

```text
Shopify Admin -> Products -> Select products -> Bulk edit
```

Use for:

- Product status.
- Vendor/type.
- Tags.
- Prices.
- Inventory.
- Metafields if available as columns.

### CSV Import/Export

Use CSV for large variant updates.

Good for:

- Adding Powder variants to many products.
- Updating prices in bulk.
- Updating SKUs.
- Updating inventory columns.

Be careful:

- Same product must keep the same `Handle`.
- Option columns must be consistent.
- Test CSV import on a small set before doing all products.

## Deployment

Use scoped live pushes.

Known live push command pattern:

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
  --only snippets/morganics-variant-pills.liquid \
  --only templates/index.json
```

For a smaller change, push only changed files.

Example for product-page-only logic:

```bash
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme push --live --allow-live --nodelete \
  --only sections/main-product-morganics.liquid \
  --only assets/morganics-product.js \
  --only snippets/morganics-variant-pills.liquid
```

## Technical QA Checklist

### Before Push

- Local preview runs.
- Homepage loads.
- Collection page loads.
- Product page loads.
- Browser console has no major errors.
- Powder Form works on supported product.
- Powder Form hidden on excluded product.
- Add-to-cart works.
- Cart line item properties appear correctly.

### After Push

Check live site:

```text
https://morganics.store
https://morganics.store/collections/all
https://morganics.store/collections/all?page=2
```

Also check:

- One Powder-supported product.
- One Powder-excluded product.
- Cart behavior.
- Mobile bottom app bar.

## Common Bugs And Fixes

### Local Preview 401

Cause:

- Shopify CLI preview auth expired.

Fix:

```bash
SHOPIFY_CLI_AUTO_UPDATE=false shopify theme dev --host 127.0.0.1 --port 9292
```

Complete login if prompted.

### Powder Checkbox Missing

Check:

1. Product has a `Powder` variant.
2. Product is not in exclusion list.
3. Variant value is exactly `Powder`.
4. Product page JS is loading.
5. The product section contains the Powder Form block.

### Powder Checkbox Unchecks Itself

Cause:

- No matching Powder sibling for selected size.

Fix:

- Add matching Powder variant.

Example:

```text
100g / Regular
100g / Powder
```

### Product Card Shows Powder As Size

Cause:

- Product card or variant pill filtering is not recognizing Powder as a form option.

Check:

```text
snippets/morganics-product-card.liquid
snippets/morganics-variant-pills.liquid
```

### Styling Change Does Not Apply

Cause:

- Later CSS rule overrides the change.

Check:

```text
assets/morganics-theme.css
```

### Homepage Section Shows Fewer Than 8 Products

Check:

- Theme editor selected products.
- Collection fallback.
- Product status.
- Product availability.
- Product limit setting.

### New Arrivals Not Actually Newest

Check:

```text
templates/index.json
sections/morganics-featured-products.liquid
```

Ensure New Arrivals section uses newest ordering and correct fallback collection.

## Content Safety Rules

Avoid medical or exaggerated claims in product content.

Do not claim that products:

- Cure disease.
- Treat disease.
- Diagnose conditions.
- Prevent disease.
- Guarantee results.

Avoid risky claim words:

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

Prefer safe wording:

```text
traditional use
daily pantry use
balanced diet
freshness
aroma
texture
natural ingredient
sensible portions
wellness routine
```

## Maintenance Rules

- Keep Liquid behavior in sections/snippets.
- Keep styling in CSS assets.
- Keep product data in Shopify Admin.
- Keep product content in Shopify descriptions/metafields.
- Keep JS behavior in asset JS files.
- Do not hardcode product content unless it is a deliberate global behavior rule.
- Push only changed files to live theme.
- Verify local and live behavior after every functional change.

