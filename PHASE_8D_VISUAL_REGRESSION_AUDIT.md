# Phase 8D Visual Regression Audit

Reference screenshots and final metrics are in `qa-screenshots/phase-8d/`.

## Screenshot Set

- `qa-screenshots/phase-8d/original-desktop.png`
- `qa-screenshots/phase-8d/shopify-desktop.png`
- `qa-screenshots/phase-8d/original-laptop.png`
- `qa-screenshots/phase-8d/shopify-laptop.png`
- `qa-screenshots/phase-8d/original-tablet.png`
- `qa-screenshots/phase-8d/shopify-tablet.png`
- `qa-screenshots/phase-8d/original-mobile.png`
- `qa-screenshots/phase-8d/shopify-mobile.png`
- `qa-screenshots/phase-8d/phase-8d-metrics.json`

## Desktop Metrics

| Section | Original height | Shopify height | Original width | Shopify width | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| Header | 68 | 64 | 1392 | 1404 | Minor height/width mismatch remains. |
| Hero | 1200 | 1200 | 1440 | 1440 | Locked to viewport height and full width. |
| Bottom hero ticker | 44 | 36 | 1440 | 1440 | Shopify ticker remains 8px shorter. |
| Category/ingredient section | 553 | 420 | 1440 | 1440 | Shopify is denser/shorter; cards match count but not height. |
| Category grid | 211 | 128 | 1296 | 1180 | Shopify cards are more compact than static reference metrics. |
| Promise strip | 184 | 185 | 1440 | 1440 | Height matches within 1px. |
| Choose what your day needs | 966 | 864 | 1440 | 1440 | Single section; Shopify 102px shorter. |
| Featured products | 1916 | 1522 | 1440 | 1440 | Shopify now has 9 cards but shorter product rhythm. |
| Product grid | 1488 | 1171 | 1296 | 1180 | Shopify grid still narrower/shorter. |
| Stories carousel | 1273 | 879 | 1440 | 1440 | Shopify populated but shorter than original. |
| Daily ritual section | 610 | 511 | 1440 | 1440 | Shopify slightly shorter. |
| Ingredient linked products | 1200 | 541 | 1440 | 1440 | Shopify denser than before but still much shorter. |
| Inquiry strip | 400 | 290 | 1440 | 1440 | Shopify shorter. |
| Footer | 902 | 698 | 1440 | 1440 | Shopify shorter; footer link count still lower. |

## Cross-Viewport Key Metrics

| Viewport | Original hero | Shopify hero | Original products | Shopify products | Original ingredients | Shopify ingredients | Shopify bad images |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop 1440 | 1200 | 1200 | 9 | 9 | 155 | 100 | 0 |
| Laptop 1280 | 1000 | 1000 | 9 | 9 | 155 | 100 | 0 |
| Tablet 768 | 1024 | 1024 | 9 | 9 | 155 | 100 | 0 |
| Mobile 390 | 844 | 844 | 9 | 9 | 155 | 100 | 0 |

## Section Audit

### Header

- Original height: 68 desktop / 58 mobile.
- Shopify height: 64 desktop / 60 mobile.
- Original max-width: full pill inset from viewport.
- Shopify max-width: close, but desktop width is 12px wider and mobile content area is 16px narrower.
- Typography mismatch: minor; Shopify menu uses dynamic menu labels, original labels are static.
- Spacing mismatch: minor action spacing differences remain.
- Image scale mismatch: logo is close but not exact.
- Missing/duplicated elements: none.
- Priority: Medium.
- Patch target: `assets/morganics-theme.css`, `.site-header`, `.header-shell`, `.header-nav`.

### Hero

- Original height: viewport height at all tested widths.
- Shopify height: now matches viewport height at all tested widths.
- Original max-width: full viewport.
- Shopify max-width: now full viewport.
- Typography mismatch: headline uses the same intended structure but exact glyph wrapping can vary because Shopify font loading differs from static reference.
- Spacing mismatch: right card and stage placement still need human visual sign-off, but measurable height/width mismatch is fixed.
- Image scale mismatch: pouch/stone scale is close but not mathematically identical.
- Missing/duplicated elements: none.
- Priority: High.
- Patch target: `assets/morganics-theme.css`, `.morganics-hero`, `.hero-inner`, `.stage-pouch`, `.stage-stone`, `.stage-dryfruits`.

### Bottom Hero Ticker

- Original height: 44px desktop/mobile.
- Shopify height: 36px.
- Typography mismatch: Shopify ticker is slightly tighter.
- Spacing mismatch: 8px shorter.
- Priority: Medium.
- Patch target: `assets/morganics-theme.css`, `.marquee`.

### Category / Ingredient Section

- Original desktop section height: 553px.
- Shopify desktop section height: 420px.
- Original category grid: 1296x211.
- Shopify category grid: 1180x128.
- Typography mismatch: Shopify collection titles are longer than static card labels; line clamps prevent blowout.
- Spacing mismatch: Shopify is intentionally compact after prior user feedback, but measured height is shorter.
- Image scale mismatch: thumbnails are smaller.
- Missing/duplicated elements: none; both render 9 cards.
- Priority: High.
- Patch target: `sections/morganics-category-grid.liquid`, `assets/morganics-theme.css`, `#categories`, `.category-icon-card`.

### Promise Strip

- Original desktop height: 184px.
- Shopify desktop height: 185px.
- Typography mismatch: minor icon text vs original SVG icon style.
- Spacing mismatch: within 1px on desktop.
- Missing/duplicated elements: none; both render one strip.
- Priority: Low.
- Patch target: `sections/morganics-promise-strip.liquid`, `.promise-strip`, `.promise-card`.

### Choose What Your Day Needs

- Original desktop height: 966px.
- Shopify desktop height: 864px.
- Missing/duplicated elements: no template duplicate found; both pages report one `.routine-section`.
- Spacing mismatch: Shopify section is shorter by 102px desktop.
- Image scale mismatch: Shopify uses the copied lifestyle image as background; exact crop is not identical.
- Priority: Critical because the user reported duplicate appearance.
- Patch target: `templates/index.json`, `sections/morganics-routine-carousel.liquid`, `.routine-section`, `.routine-card`.

### Featured Products

- Original product count: 9.
- Shopify product count before repair: 8.
- Shopify product count after repair: 9.
- Original desktop product grid height: 1488px.
- Shopify desktop product grid height: 1171px.
- Typography mismatch: Shopify product titles/prices are real imported products, not static JS display strings.
- Spacing mismatch: Shopify cards remain shorter and grid width is 1180px vs original 1296px.
- Image scale mismatch: fallback/media images render correctly, but exact product art differs by Shopify product data.
- Priority: Critical.
- Patch target: `templates/index.json`, `sections/morganics-featured-products.liquid`, `snippets/morganics-product-card.liquid`, `.featured-products-section`.

### Stories Carousel

- Original desktop height: 1273px.
- Shopify desktop height: 879px.
- Typography mismatch: Shopify fallback story content is shorter.
- Spacing mismatch: Shopify is populated but more compact.
- Missing/duplicated elements: none; both render three story cards.
- Priority: High.
- Patch target: `sections/morganics-customer-stories.liquid`, `.ritual-film-section`, `.ritual-film-card`.

### Daily Ritual Section

- Original desktop height: 610px.
- Shopify desktop height: 511px.
- Typography mismatch: close, but Shopify cards use fallback Liquid content.
- Spacing mismatch: Shopify shorter by 99px.
- Missing/duplicated elements: none.
- Priority: Medium.
- Patch target: `sections/morganics-daily-rituals.liquid`, `.ritual-section`, `.ritual-card`.

### Ingredient Linked Products

- Original ingredient item count: 155.
- Shopify ingredient item count before repair: 24.
- Shopify ingredient item count after repair: 100 across 3 rows.
- Original desktop height: 1200px.
- Shopify desktop height: 541px.
- Typography mismatch: Shopify card text comes from product objects.
- Spacing mismatch: still shorter than reference but much denser than before.
- Missing/duplicated elements: none; section is populated.
- Priority: Critical.
- Patch target: `sections/morganics-ingredient-library.liquid`, `.ingredient-library`, `.ingredient-row`, `.ingredient-card`.

### Inquiry Strip

- Original desktop height: 400px.
- Shopify desktop height: 290px.
- Typography mismatch: minor.
- Spacing mismatch: Shopify strip is shorter.
- Missing/duplicated elements: none.
- Priority: Medium.
- Patch target: `sections/morganics-mini-inquiry.liquid`, `.mini-inquiry-section`, `.mini-inquiry-card`.

### Footer

- Original desktop height: 902px.
- Shopify desktop height: 698px.
- Original footer links: 29.
- Shopify footer links before repair: 13.
- Shopify footer links after repair: 17.
- Typography mismatch: Shopify menu data is sparse compared with static footer.
- Spacing mismatch: Shopify remains shorter.
- Missing/duplicated elements: no duplicates; social links now render as fallback pills.
- Priority: High.
- Patch target: `sections/footer.liquid`, `.premium-footer`, `.footer-links`, `.footer-socials`.

### Mobile Layout

- Hero height now matches: original 844px, Shopify 844px.
- Product cards now match count: 9 vs 9.
- Ingredient cards improved: Shopify 100 vs original 155.
- Mobile story and daily sections remain taller than original by 208px and 211px respectively.
- Footer remains shorter than original by 858px because Shopify footer content is less dense.
- Priority: High.
- Patch target: mobile media rules in `assets/morganics-theme.css`.

## Confirmed Fix Targets Applied

- `assets/morganics-theme.css`: full-bleed home sections, viewport-height hero, reverse ingredient row, section shell fixes.
- `templates/index.json`: featured product limit set to 9.
- `sections/morganics-featured-products.liquid`: default product limit set to 9.
- `sections/morganics-ingredient-library.liquid`: multi-row Shopify product marquee added.
- `sections/footer.liquid`: fallback footer links and social pills added.

## Remaining Mismatches

- Shopify ingredient section still has fewer cards than static JS output: 100 vs 155.
- Shopify footer still has fewer links: 17 vs 29.
- Category/product grid widths still differ in inner max-width on desktop.
- Stories, daily rituals, inquiry, and footer heights still differ from static reference.
- Pixel parity is not claimed; screenshots and metrics show improvement but not exact equality.
