# Phase 8C Surgical Pixel-Parity Repair Report

## Important Preview Note

`http://127.0.0.1:8080/` is serving the approved static HTML reference site. It loads `assets/site.css`, `assets/mob-hero-fix.css`, and `assets/hero-v2.css`.

The Shopify theme preview checked for this repair was `http://127.0.0.1:9292/`, which loads `assets/morganics-theme.css`.

## Changed Files

- `assets/morganics-theme.css`
- `sections/morganics-category-grid.liquid`
- `PHASE_8C_SURGICAL_PIXEL_PARITY_AUDIT.md`
- `PHASE_8C_SURGICAL_PIXEL_PARITY_REPAIR_REPORT.md`

## Before / After By Section

| Section | Before | After |
| --- | --- | --- |
| Header | Header was functional but still too loose and generic against the original fixed pill header. | Tightened home header height, logo size, nav pill spacing, search button, cart button, and Shop Now CTA sizing. |
| Hero | Hero was close but too loose on tall desktop previews; headline, stage, quick cards, and ticker needed tighter crop. | Added a surgical hero cap, tighter grid, smaller quick cards, adjusted pouch/stone/dry-fruit scale, tighter headline sizing, and shorter category ticker rhythm. |
| Category section | Shopify collection labels expanded cards to about `211px` tall and only 7 cards rendered when collection data was incomplete. | Cards are compact at about `128px`, label text is clamped, thumbnails are smaller, and the section now fills to 9 cards with Shopify collections first and fallback cards only when needed. |
| Promise strip | Strip rhythm felt too tall and visually separated. | Reduced strip padding, card height, icon size, text scale, and retained exactly one promise strip. |
| Routine section | DOM was not duplicated, but visually it read like a large dark banner and was too loose. | Restored a lifestyle-scene treatment with a light overlay, compact left routine list, tighter heading/CTA/list spacing, and exactly one routine section. |
| Featured products | Cards were still large and section height felt loose. | Product grid is denser, card size reduced, image area tightened, title/price/badge/action controls scaled down while retaining Shopify product forms and fallback image logic. |
| Customer stories | Populated but too tall and generic in rhythm. | Reduced section padding and track scale to better match the original centered carousel with side previews. |
| Daily rituals | Present but vertically loose. | Tightened section padding and ritual card height. |
| Ingredients linked to products | Section could feel too sparse/viewport-height. | Removed viewport-height feel, tightened dark section padding, made ingredient cards smaller and denser, and kept Shopify product-driven cards populated. |
| Mini inquiry | Inquiry area was functional but tall. | Reduced card padding, input height, button height, and section spacing. |
| Footer | Footer was still tall at about `902px` in the Shopify preview. | Tightened footer padding, trust strip, logo scale, link spacing, social/support pills, and bottom row. |
| Broken image placeholders | Hidden hero spotlight helper images had empty `src` before JS activation. | Empty-src images are hidden until assigned, leaving no broken placeholders in preview validation. |

## Validation Results

- `shopify theme check`: passed, 68 files inspected with no offenses.
- Homepage loads.
- Header renders.
- Hero is tighter and closer to the original static crop.
- No duplicate routine section: `1`.
- No duplicate promise strip: `1`.
- Category section renders compact 9-card density.
- Featured product grid renders 8 Shopify product cards.
- Customer stories are populated: `3` cards.
- Ingredient-linked section is populated: `24` cards.
- Footer is compacted from the previous loose Shopify rhythm.
- Collection page loads with 24 product cards.
- Product page loads with Shopify product form and image.
- Add-to-cart works.
- Cart drawer works: cart count `1`, body class `cart-open`, drawer open state true.
- Cart page loads.
- Checkout handoff is present.
- Broken image placeholders: `0`.

## Remaining Gaps

- Exact category labels/order depend on Shopify collection data. The theme now fills missing collection density with original-style fallback cards.
- The local Shopify preview still logs Shopify CDN/Shop Pay/preview resource messages on localhost. These are external preview messages, not theme JavaScript errors.
- Final human pixel sign-off should compare `8080` static reference against the Shopify preview at the same browser width and zoom level.
