# Phase 8E Category + Promise Pixel-Parity Report

## Scope

Phase 8E repaired only the homepage "Shop by Category / Find the ingredient your table needs today" section and the promise cards directly below it.

The approved static site remains read-only. Shopify products, collections, cart, and checkout logic were not changed.

## Changed Files

- `templates/index.json`
- `sections/morganics-category-grid.liquid`
- `sections/morganics-promise-strip.liquid`
- `assets/morganics-theme.css`
- `PHASE_8E_CATEGORY_PROMISE_PIXEL_PARITY_REPORT.md`

## Before / After

### Heading Alignment

Before:
- Shopify heading was visually centered and constrained by older Phase 8 section max-width rules.
- The heading used the oversized all-caps/display treatment from prior approximation passes.

After:
- Category content is left-aligned inside the wide original-style container.
- Desktop measured at 2048px viewport:
  - Section head x-position: `104px`
  - Section head width: `1840px`
  - Heading x-position: `104px`
  - Heading text-align: `left`
- Heading now uses sentence-case styling, tighter line-height, and the original-style two-line rhythm.

### Category Card Dimensions

Before:
- Cards were short, wide-feeling, and too sparse compared with the approved tall ingredient-card system.
- Earlier CSS forced compact 128px cards that did not match the current approved reference.

After:
- Desktop category cards now render as tall compact cards.
- Desktop measured at 2048px viewport:
  - 9 category cards
  - Each card: `190px x 300px`
  - Grid width: `1840px`
  - Grid x-position: `104px`
- Cards use a square ingredient image well, soft cream background, subtle border, rounded corners, and centered multiline titles.

### Image Usage

Before:
- Shopify collection banner images were taking over several category cards.
- This made the section look like generic collection tiles instead of the approved ingredient icon cards.

After:
- Category cards use the original copied `assets/morganics/category-icons/*-icon.png` visual assets.
- Shopify collection links are preserved where matching collections exist.
- Current visible category order:
  1. Roots, Botanicals & Traditional Ingredients
  2. Dry Fruits & Heritage Mewa
  3. Gums & Specialties
  4. Herbs & Daily Botanicals
  5. Natural Sweeteners & Salts
  6. Premium Nuts
  7. Premium Snacks & Pantry Staples
  8. Seeds & Functional Grains
  9. Wellness Blends

### Promise Card Structure

Before:
- Promise cards used visible text bubbles such as `COD`, `Leaf`, `Pack`, and `Chat`.
- Layout did not match the approved icon-box card structure.

After:
- Promise cards now use left icon square boxes with inline SVG icons.
- The text bubbles are gone.
- Desktop measured at 2048px viewport:
  - Promise strip count: `1`
  - Promise cards: `4`
  - Each promise card: `443px x 168px`
- Promise copy now matches the approved-style content:
  - Pakistan-wide COD Delivery
  - Premium Natural Ingredients
  - Freshly Packed
  - Custom Sourcing Support

### Responsive Changes

Before:
- Prior overrides created inconsistent card rhythm across breakpoints.
- Mobile behavior risked oversized gaps or wrong card proportions.

After:
- Desktop keeps the original 9-card row.
- Tablet steps down to 3 columns for clean wrapping.
- Mobile measured at 390px viewport:
  - 9 category cards
  - First category card: `114px x 158px`
  - Category grid: `358px` wide
  - Promise strip count: `1`
  - First promise card: `358px x 118px`
  - Horizontal overflow: `false`

## Validation

- `shopify theme check`: passed
  - `69 files inspected with no offenses found`
- Homepage loaded at `http://127.0.0.1:9292/`.
- Category labels/order now match the approved list.
- Category images use theme icon assets, not collection banner thumbnails.
- Collection links remain functional for available Shopify collections.
- Promise strip appears once only.
- Promise cards use icon-box layout, not text bubbles.
- Product, cart, checkout, and product image fallback logic were not touched.

## Remaining Notes

- Two category entries use safe `/collections/all?q=...` fallback links because there may not be exact Shopify collections for those approved visible labels yet:
  - Premium Snacks & Pantry Staples
  - Wellness Blends
- If exact Shopify collections are later created for those labels, only the section block link/collection settings need updating.
