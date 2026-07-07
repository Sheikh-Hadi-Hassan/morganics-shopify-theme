# Morganics Shopify Store QA Audit Report

Role: Senior Quality Assurance Lead

Scope: Morganics Shopify storefront, local preview, theme UI, product pages, collection pages, cart behavior, content quality, Shopify Admin-editable sections, and live deployment readiness.

Primary local preview:

```text
http://127.0.0.1:9292
```

Primary live site:

```text
https://morganics.store
```

## QA Objective

Verify that the Morganics Shopify website is ready for customers across the most important storefront flows:

- Homepage discovery.
- Product browsing.
- Product detail review.
- Variant selection.
- Powder Form behavior.
- Add-to-cart.
- Cart display.
- Mobile navigation.
- Shopify Admin-editable homepage sections.
- Content safety and consistency.
- Responsive UI and styling.

## Critical Test URLs

Use these pages for every QA pass:

```text
/
/collections/all
/collections/all?page=2
/products/aqarqara
```

Also test:

```text
One product with Powder variants
One Powder-excluded product
One product without Powder variants
Cart page or cart drawer
Homepage Featured Products section
Homepage New Arrivals section
```

## Test Devices And Viewports

Required:

```text
Mobile: 390 x 844
Small mobile: 360px wide
Tablet: 768px wide
Desktop: 1280px+
```

Mobile is the priority. No QA pass is complete until mobile is checked.

## Severity Levels

Use these severity labels when reporting bugs:

```text
P0 - Site-breaking, checkout-blocking, or revenue-critical issue.
P1 - Major shopping flow issue or severe mobile layout break.
P2 - Important UX/content issue that should be fixed before launch.
P3 - Minor polish issue or non-blocking improvement.
```

## Homepage QA

### Hero Section

Check:

- Header/logo is visible.
- Hero headline is readable.
- Product/stage visual is large enough.
- Stage is not too small on mobile.
- Stage does not overlap the header.
- Stage does not overlap the bottom app bar.
- There is not excessive empty space around the stage.
- A hint of the next section is visible where possible.

Expected result:

```text
Hero feels premium, product-focused, centered, and mobile-safe.
```

Fail examples:

```text
Hero stage too small.
Product covered by text.
Bottom app bar covering hero.
Huge empty margins around product stage.
Header covering headline.
```

### Featured Products

Check:

- Section appears on homepage.
- Heading is visible.
- At least 8 products render.
- Products have images.
- Product names are readable.
- Prices are visible.
- Product cards are aligned.
- Section is editable in Shopify theme editor.

Expected result:

```text
Featured Products shows at least 8 seasonal/manual products and looks consistent on mobile and desktop.
```

### New Arrivals

Check:

- Section appears after Featured Products.
- Heading is visible.
- At least 8 products render.
- Products are ordered by newest where configured.
- Product cards match Featured Products styling.

Expected result:

```text
New Arrivals shows 8 products and uses the shared product showcase layout.
```

## Collection Page QA

Test:

```text
/collections/all
/collections/all?page=2
```

Check:

- Page loads successfully.
- Product grid renders.
- Product images load.
- Product names and prices are visible.
- Product cards do not overlap.
- Pagination works.
- Page 2 has consistent styling.
- Last row can scroll above the bottom app bar.
- Bottom app bar does not cover pagination.

Expected result:

```text
Collection browsing is clear, stable, and mobile-friendly.
```

Common issues:

```text
Pagination hidden behind app bar.
Product cards uneven.
Image boxes inconsistent.
Long product names overflow.
Final row cannot be tapped because bottom nav covers it.
```

## Product Page QA

Test:

```text
/products/aqarqara
```

Also test at least one product from each important category:

```text
Nuts
Seeds
Herbs
Spices
Dry fruits
Specialty items
```

Check:

- Product title is readable.
- Product image/gallery works.
- Price is visible.
- Variant pills are visible and tappable.
- Selected variant state is clear.
- Add-to-cart button is visible.
- Quantity selector works if present.
- Product description/metafields render correctly.
- Payment/support sections render correctly.
- Product page has enough bottom spacing on mobile.

Expected result:

```text
Customer can understand the product, select a variant, and add to cart without friction.
```

## Powder Form QA

The Powder Form checkbox must follow the store rule:

```text
Show Powder Form only for non-excluded products that have real Powder variants.
Hide Powder Form for excluded products.
Hide Powder Form for products without Powder variants.
```

### Supported Product Test

Use a product that has:

```text
100g / Regular
100g / Powder
200g / Regular
200g / Powder
```

Check:

- Powder Form checkbox appears.
- Size pills show normal sizes only.
- Powder variants do not appear as separate visible size pills.
- Checking Powder switches to matching Powder variant.
- Price updates to Powder variant price.
- Add-to-cart adds Powder variant.
- Cart line item shows:

```text
Powder Form: Yes
```

### Excluded Product Test

Excluded examples:

```text
Kajo Roasted
Pista Maghaz
Badam Abdul Wahidi
Maghaz Sunflower Seeds
Honey
Saffron
Mixed Berries
Cranberry
```

Check:

- Powder Form checkbox does not appear.
- Product can still be added to cart normally.

### Missing Powder Sibling Test

If a product has:

```text
100g / Regular
200g / Powder
```

Check:

- Selecting 100g and checking Powder should not silently add the wrong variant.
- Checkbox should uncheck or show warning.

Expected result:

```text
Powder logic never adds the wrong size or wrong form.
```

## Cart QA

Check:

- Add regular product to cart.
- Add Powder product to cart.
- Cart opens or page updates correctly.
- Cart item title is readable.
- Variant information is readable.
- Powder item shows `Powder Form: Yes`.
- Quantity changes work.
- Remove item works.
- Cart subtotal updates.
- Cart badge count updates.
- Cart UI is not hidden by bottom app bar.

Expected result:

```text
Cart accurately reflects selected variants and line item properties.
```

## Mobile Navigation QA

Check bottom app bar:

```text
Home
Categories
Shop
Cart
WhatsApp
```

Verify:

- All items are visible.
- Active state is clear.
- Cart badge is readable.
- Buttons are tappable.
- App bar remains fixed/sticky as intended.
- Content scrolls above it.
- WhatsApp link works if configured.

Expected result:

```text
Bottom app bar supports mobile shopping and never blocks important content.
```

## Header QA

Check:

- Logo is visible.
- Search button is visible.
- Wishlist/cart/menu controls are visible if configured.
- Header does not cover page content.
- Header styling is consistent with Morganics brand.
- Header actions are tappable on mobile.

Expected result:

```text
Header is polished, readable, and functional.
```

## Content QA

Check product content:

- Title uses consistent English/Urdu format.
- Description explains the product clearly.
- Usage instructions are practical.
- Storage instructions are included.
- Precautions are included.
- FAQs are useful.
- SEO title and description are safe.
- Product content does not make medical claims.

Risky words to search:

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

Allowed disclaimer:

```text
This product is not intended to diagnose, treat, cure, or prevent any disease.
```

Expected result:

```text
Content is useful, safe, customer-friendly, and not medically risky.
```

## Shopify Admin Editability QA

Check in Shopify Admin theme editor:

```text
Online Store -> Themes -> Customize -> Homepage
```

Verify:

- Featured Products section is editable.
- Featured Products can use manual products.
- Featured Products can show at least 8 products.
- New Arrivals section is editable.
- New Arrivals can use newest ordering or collection fallback.
- Section headings can be edited.

Expected result:

```text
Store owner can update homepage products without editing code.
```

## Responsive Layout QA

For every key page, check:

- 360px mobile width.
- 390 x 844 mobile.
- 768px tablet.
- 1280px desktop.

Verify:

- No horizontal scrolling.
- No text overflow.
- No button overflow.
- No image collapse.
- Product cards stay aligned.
- Header remains usable.
- Bottom app bar does not cover content.

Expected result:

```text
Storefront is stable across common screen sizes.
```

## Performance Smoke QA

Check:

- Homepage loads within a reasonable time.
- Product images appear quickly.
- No obvious layout jumping.
- No broken images.
- No repeated JavaScript errors in console.
- Cart interaction feels responsive.

Expected result:

```text
Storefront feels fast enough for mobile shopping.
```

## Accessibility Smoke QA

Check:

- Text contrast is readable.
- Buttons are large enough to tap.
- Icons have understandable labels or context.
- Keyboard focus is not completely broken.
- Product images have sensible alt text where possible.
- Important state is not only color-based.

Expected result:

```text
Basic accessibility expectations are met.
```

## Regression Checklist After Any Theme Change

Run this after every code change:

```text
[ ] Homepage loads.
[ ] Hero is correctly sized.
[ ] Featured Products shows 8 products.
[ ] New Arrivals shows 8 products.
[ ] /collections/all loads.
[ ] /collections/all?page=2 loads.
[ ] Product page loads.
[ ] Variant selection works.
[ ] Powder Form works on supported product.
[ ] Powder Form is hidden on excluded product.
[ ] Add-to-cart works.
[ ] Cart badge updates.
[ ] Mobile bottom app bar does not overlap content.
```

## Bug Report Template

Use this format for QA findings:

```text
Severity:
Page/URL:
Viewport/device:
Steps to reproduce:
Actual result:
Expected result:
Evidence:
Suggested fix:
Owner:
Status:
```

Example:

```text
Severity: P1
Page/URL: /collections/all?page=2
Viewport/device: 390 x 844
Steps to reproduce:
1. Open collection page 2.
2. Scroll to the bottom.

Actual result:
Pagination is partially hidden behind the bottom app bar.

Expected result:
Pagination should scroll above the app bar and remain tappable.

Suggested fix:
Increase mobile bottom padding on collection page wrapper.
```

## Launch Readiness Criteria

The store is ready when:

- No P0 issues remain.
- No P1 mobile shopping flow issues remain.
- Homepage product sections are correct.
- Collection browsing works.
- Product page and cart work.
- Powder Form behavior is correct.
- Content is safe.
- Live site matches local verified behavior.

