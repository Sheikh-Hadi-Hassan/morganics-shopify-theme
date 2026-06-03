# Phase 8D Visual Regression Repair Report

## Changed Files

- `qa-screenshots/phase-8d/original-desktop.png`
- `qa-screenshots/phase-8d/shopify-desktop.png`
- `qa-screenshots/phase-8d/original-laptop.png`
- `qa-screenshots/phase-8d/shopify-laptop.png`
- `qa-screenshots/phase-8d/original-tablet.png`
- `qa-screenshots/phase-8d/shopify-tablet.png`
- `qa-screenshots/phase-8d/original-mobile.png`
- `qa-screenshots/phase-8d/shopify-mobile.png`
- `qa-screenshots/phase-8d/phase-8d-metrics.json`
- `PHASE_8D_VISUAL_REGRESSION_AUDIT.md`
- `PHASE_8D_VISUAL_REGRESSION_REPAIR_REPORT.md`
- `assets/morganics-theme.css`
- `templates/index.json`
- `sections/morganics-featured-products.liquid`
- `sections/morganics-ingredient-library.liquid`
- `sections/footer.liquid`

## Repairs Applied

1. Captured full-page original and Shopify screenshots at desktop, laptop, tablet, and mobile widths.
2. Wrote section metrics to `qa-screenshots/phase-8d/phase-8d-metrics.json`.
3. Verified `templates/index.json` has only one promise strip and one routine section.
4. Restored homepage section shells to full-bleed width where Shopify was 40px narrower than the original.
5. Restored the hero to viewport-height behavior at all tested widths:
   - Desktop: original 1200px, Shopify 1200px.
   - Laptop: original 1000px, Shopify 1000px.
   - Tablet: original 1024px, Shopify 1024px.
   - Mobile: original 844px, Shopify 844px.
6. Increased featured products from 8 to 9 to match original product-card count.
7. Rebuilt the ingredient-linked section from one short row into three Shopify product rows:
   - Before: 24 ingredient cards.
   - After: 100 ingredient cards.
8. Added footer fallback menu/social links so sparse Shopify menus do not collapse the original footer structure.
9. Kept Shopify products, product forms, cart, and checkout as the active commerce system.

## Validation

- `shopify theme check`: passed, 69 files inspected with no offenses.
- Homepage loads.
- Routine section count: 1.
- Promise strip count: 1.
- No empty black section remains.
- Featured product cards render dynamic Shopify products: 9.
- Ingredient-linked product cards render dynamically: 100.
- Broken Shopify image placeholders: 0.
- Product page loads.
- Add to cart works.
- Cart drawer works.
- Checkout handoff works.
- Mobile screenshot is usable.

## Remaining Visual Mismatches

- The ingredient linked section is improved but still lower density than the static reference: 100 cards vs 155 generated static items.
- Footer remains less dense than the static footer: 17 links vs 29 links.
- Static category/product inner grids are wider than Shopify by about 116px on desktop.
- Stories, daily rituals, inquiry, and footer heights still differ from the original.
- Pixel parity is not claimed. The screenshot set proves specific improvements and remaining mismatches.
