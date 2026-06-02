# Phase 3 Homepage Conversion Report

## Scope

Converted the approved static homepage into Shopify Online Store 2.0 sections in the same section order as the original homepage.

## Created / Updated Files

- `sections/morganics-hero.liquid`
  - Layered Morganics hero using copied hero assets and editable quick-link blocks.

- `sections/morganics-marquee.liquid`
  - Editable category marquee using repeatable blocks.

- `sections/morganics-category-grid.liquid`
  - Editable category cards using repeatable blocks and copied category icon assets.

- `sections/morganics-promise-strip.liquid`
  - Editable promise cards using repeatable blocks.

- `sections/morganics-routine-carousel.liquid`
  - Routine section with editable routine cards and copied category icon assets.

- `sections/morganics-featured-products.liquid`
  - Shopify product-list driven featured products with fallback visual product cards.

- `sections/morganics-customer-stories.liquid`
  - Customer story carousel using repeatable blocks and copied review images.

- `sections/morganics-daily-rituals.liquid`
  - Editable daily ritual cards using repeatable blocks.

- `sections/morganics-ingredient-library.liquid`
  - Ingredient marquee/library using repeatable blocks and copied product imagery.

- `sections/morganics-mini-inquiry.liquid`
  - WhatsApp inquiry form section; no order or checkout logic.

- `templates/index.json`
  - Replaced the temporary base-shell homepage with the ten converted homepage sections in original order:
    1. Hero
    2. Marquee
    3. Category grid
    4. Promise strip
    5. Routine carousel
    6. Featured products
    7. Customer stories
    8. Daily rituals
    9. Ingredient library
    10. Mini inquiry

- `assets/morganics-theme.css`
  - Added homepage section styling to preserve Morganics visual identity and layout.

- `assets/morganics-theme.js`
  - Added lightweight customer story carousel behavior and WhatsApp inquiry handling.

## Guardrails Confirmed

- Did not edit `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`.
- Did not activate old `products.js`.
- Did not add old localStorage cart logic.
- Did not add old checkout, order tracking, or Google Apps Script order submission.
- Product, collection, cart, and checkout templates were not built in this phase.
- All homepage images use copied assets from `assets/morganics/` through Shopify `asset_url`.

## Validation

- `templates/index.json` parsed successfully.
- Active homepage scan found no forbidden references to:
  - `products.js`
  - `ORDER_API`
  - `submitCODOrder`
  - `morganics_cart_v1`
  - `localStorage`
  - `checkout.html`
  - `order-track.html`
  - `script.google.com`
- `shopify theme check --path 02_SHOPIFY_THEME_BUILD` result:
  - 52 files inspected.
  - No offenses found.

## Remaining Mismatches

- The approved static hero had more detailed hotspot/product spotlight behavior. Phase 3 preserves the protected layered hero look, but does not connect hero hotspots to products yet.
- The original category, ritual, review, and ingredient content was JS-data driven. In Shopify, these are now editable section blocks or Shopify product settings; final content should be reviewed in the theme editor.
- Featured products can use Shopify `product_list`, but fallback cards currently use copied static images until real Shopify products are assigned.
- Ingredient library is block-driven rather than using the old `morganicsIngredients.js` data source.
- The customer story carousel is simpler than the static film carousel. It preserves the story section structure and visuals but not every original animation state.

## Risks / Next Steps

- Category icon assets remain heavy; optimize before launch if these sections are used as-is.
- Some homepage links default to Shopify all-products or collections routes until final menus, collections, and pages are configured.
- Product and collection handles are not mapped yet, so block links should be updated after Shopify catalog migration.
- The homepage should be visually compared against the approved static site in browser preview after the preview URL is available in this thread.
