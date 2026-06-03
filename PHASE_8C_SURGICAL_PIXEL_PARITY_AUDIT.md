# Phase 8C Surgical Pixel-Parity Audit

Reference source: `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/index.html` and original CSS files in `assets/`.

Editable target: `02_SHOPIFY_THEME_BUILD` only.

## Visual Mismatch Checklist

| Section | Current Issue | Original Target | Surgical Fix |
| --- | --- | --- | --- |
| Header | Header is functional but still slightly generic in height/spacing. | Compact fixed pill header over hero with tight logo, nav pill, search, cart, and Shop Now rhythm. | Tighten header shell height, nav item sizing, logo max height, and action button spacing through scoped 8C CSS. |
| Hero | Full viewport behavior can become too vertically loose on tall preview windows; stage and cards are close but not tight enough. | Original desktop crop: fixed-feeling dark green hero, left headline near mid-left, pouch/stone/pile centered, quick cards right, tagline bottom-right. | Cap desktop hero height, tighten grid columns, adjust stage asset scale/position, quick-card sizing, tagline position, and ticker height. |
| Category / Ingredient Cards | Cards render at about `211px` high on desktop because long Shopify collection titles expand the row. | Original compact single-row ingredient-card system, roughly 9 dense cards with short labels and small thumbnails. | Set fixed compact card height, smaller thumbnail, label line clamp, reduced section padding, and fallback/collection cards remain dynamic. |
| Promise Strip | DOM count is correct, but the strip feels too tall and too separated from routine. | Original compact promise strip immediately after categories. | Reduce strip padding, card height, icon size, and spacing. |
| Routine Section | DOM count is one, but the scene is visually too tall and banner-like. | Original lifestyle image section with tight left copy/list over a warm background scene. | Reduce section height/padding, use original background image treatment, keep routine list compact and left-aligned. |
| Featured Products | Product cards are still too large (`306x480` at desktop) and section is too tall. | Dense original product grid with compact image, title, price, add-to-cart, view-details controls. | Reduce grid max width, card height rhythm, image area, text sizes, buttons, and section padding while preserving Shopify product forms. |
| Customer Stories | Section is populated but too tall. | Original dark cinematic carousel with center card and side previews in a tighter section. | Reduce vertical padding, track height, active/side card scale, and overlay text scale. |
| Daily Rituals | Section is present but too vertically spaced. | Compact premium ritual card grid after stories. | Tighten section padding, heading spacing, and ritual card height. |
| Ingredients Linked To Products | Section becomes viewport-height and too sparse on tall screens. | Dense dark horizontal strips/cards, compact typography and mini thumbnails. | Remove viewport-height feel, cap padding/height, make multiple dense rows, reduce card width/height, hide empty helper images. |
| Mini Inquiry | Card is functional but too tall. | Original compact inquiry card with tight input/button rhythm. | Reduce section height, card width, padding, input/button height. |
| Footer | Footer is still too tall (`902px` desktop). | Original compact premium footer with badges, links, contact/social/support bars, legal row. | Reduce footer padding, trust strip/card heights, grid gaps, logo scale, link spacing, and bottom bar spacing. |
| Broken Image Placeholders | Hidden hero spotlight image elements have empty `src` before activation. | No broken image placeholders visible. | Hide empty-src image elements until JS assigns a source. |

## Data Safety

- Shopify remains the source for product objects, variants, price, availability, URLs, cart, and checkout.
- Old `products.js` is not activated.
- No localStorage cart, custom checkout, Google Apps Script order flow, or old order tracking is used.
- Fallback product images remain only for missing Shopify product media.
