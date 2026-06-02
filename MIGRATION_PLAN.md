# Morganics Shopify Migration Plan

## Scope Guardrails

- Source/reference only: `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`
- Editable Shopify theme only: `02_SHOPIFY_THEME_BUILD`
- Do not redesign the approved Morganics front end.
- Do not copy source files until the conversion phase starts.
- Shopify must replace the static site's product data, collections, cart, checkout, orders, and inventory.
- Current static behavior to preserve visually: header, navigation, homepage sections, product cards, product detail layout, collection/category presentation, mobile menu, footer, contact/inquiry experience, and responsive styling.

## Static Website Inventory

### Page Files Found

- `index.html` - approved homepage.
- `shop.html` - complete catalog with search, category filter, sort, product grid.
- `category.html` - dynamic category/collection page rendered into `#categoryRoot`.
- `product.html` - dynamic product detail page rendered into `#productRoot`.
- `cart.html` - localStorage cart page rendered into `#cartRoot`.
- `checkout.html` - custom COD checkout rendered into `#checkoutRoot`.
- `order-track.html` - local localStorage order tracking rendered into `#trackRoot`.
- `contact.html` - contact and custom product inquiry page.
- `about.html` - brand/about content page.
- `bulk-corporate-orders.html` - bulk inquiry content page.
- `ingredient-guide.html` - ingredient education/category guide page.
- `faq.html` - FAQ content page.
- `storage-guide.html` - storage guide content page.
- `shipping-policy.html` - policy page with placeholders requiring business confirmation.
- `payment-policy.html` - policy page with placeholders requiring business confirmation.
- `return-refund-policy.html` - policy page with placeholders requiring business confirmation.
- `privacy-policy.html` - policy page with placeholders requiring business confirmation.
- `terms-conditions.html` - terms content page.

### Homepage Sections Identified

From `index.html`, preserve section order and visual treatment:

1. Site header with logo, primary nav, search button/panel, product bar, shop CTA.
2. Hero section: `.morganics-hero.hero-v3#hero`
   - Layered hero background.
   - Corner plants.
   - Hero copy: "Rooted in Nature."
   - Product stage with pouch, dry fruit pile, stone, floating ingredients, hotspots.
   - Hero actions/sidebar area and spotlight card behavior.
3. Marquee category strip: `.marquee`
4. Shop by Category: `.section#categories`
   - Populated by `#categoryGrid`.
5. Promise strip: `.section.promise-strip`
   - Pakistan-wide COD Delivery.
   - Premium Natural Ingredients.
   - Freshly Packed.
   - Custom Sourcing Support.
6. Shop by Routine / day carousel: `.routine-section#dayCarousel`
7. Featured Products: `.section.featured-products-section#featured`
   - Populated by `#featuredGrid`.
8. Customer Stories: `.ritual-film-section#story`
   - Populated from `assets/reviews.js`.
9. Shop by Daily Ritual: `.section.ritual-section#routines`
   - Populated by `#ritualGrid`.
10. Ingredient Library: `.home-ingredient-showcase.ingredient-library#ingredientShowcase`
   - Uses `#ingredientFilter` and `#ingredientMarquees`.
11. Mini inquiry section: `.mini-inquiry-section#customInquiry`
12. Premium footer injected into `.premium-footer`.
13. Floating cart, mobile bottom nav, mobile menu/drawer, sticky/mobile product helpers injected by JS.

## Data Model Migration

### Current Static Product Source

- Current product source: `assets/products.js`
- Global object: `window.MORGANICS_PRODUCTS`
- Current observed product count: 81 total, 76 active.
- Active products are filtered by `status !== 'inactive'`, `active !== false`, and `isActive !== false`.

### Current Product Fields to Map

- Shopify native product fields:
  - `name` -> product title.
  - `slug` / `id` -> product handle.
  - `descriptionHtml` -> product description.
  - `image` -> product media.
  - `variants` / `sizesGram` / `size` / `price` -> Shopify variants/options.
  - `sku` -> variant SKU.
  - `category` -> collection assignment.
  - `title` / `metaDescription` -> SEO title and meta description.
  - `active`, `isActive`, `status` -> product publish status.

- Product metafields required:
  - `urduName`
  - `urduTitle`
  - `shortDescription`
  - `features`
  - `useCases`
  - `benefits`
  - `usage`
  - `precautions`
  - `keywords`
  - `aliases`
  - `storage`
  - `faqs`
  - `pairingIdeas`
  - Optional "Powder form required" behavior if still wanted as line-item property.

### Collections to Create in Shopify

Current active product categories:

- Dry Fruits - 13 active products.
- Nuts - 13 active products.
- Botanicals - 18 active products.
- Herbs - 10 active products.
- Natural Sweeteners - 4 active products.
- Seeds - 10 active products.
- Gums & Specialties - 3 active products.
- Premium Snacks - 3 active products.
- Wellness Blends - 2 active products.

Collection metadata currently lives in `CATEGORY_META` inside `assets/site.js`. Move collection titles, banners, kicker text, body copy, ritual copy, usage, storage, safety, SEO title, meta description, and FAQs into Shopify collection metafields or section settings.

## CSS Needed

### Must Preserve / Port

- `assets/MORGANICS_DESIGN_TOKENS.css`
  - Brand colors, typography variables, tokens.
- `assets/site.css`
  - Main design system, layout, product cards, header, footer, shop/category/product/cart/contact/policy styling, mobile drawer, responsive rules.
- `assets/mob-hero-fix.css`
  - Mobile hero and responsive corrections.
- `assets/hero-v2.css`
  - Approved homepage hero styling.

### Supporting Font Asset

- `assets/fonts/Brown-Beige.otf`
  - Keep only if still referenced by CSS after audit.

### Shopify CSS Target

- Create Shopify asset equivalents later, likely:
  - `assets/morganics-tokens.css`
  - `assets/morganics-site.css`
  - `assets/morganics-hero.css`
  - `assets/morganics-mobile.css`

Do not rewrite the design system during migration. Convert URL paths and Liquid asset references only.

## JavaScript Needed

### Current JS Files

- `assets/site.js`
  - Shared runtime for product rendering, category rendering, header/footer injection, mobile menu, search, cart, wishlist, product detail, category page, shop filters, forms, hero interactions, sticky/mobile helpers.
- `assets/products.js`
  - Static catalog data. Shopify must replace this.
- `assets/reviews.js`
  - Customer story/review data for homepage story carousel and product review fallbacks.
- `assets/morganicsIngredients.js`
  - Ingredient library data.
- `assets/ingredientCarousel.js`
  - Ingredient marquee/library rendering.

### Must Preserve / Refactor

- Preserve visual and interaction logic for:
  - Hero parallax and hotspots.
  - Header search panel.
  - Mobile drawer/menu.
  - Customer story carousel.
  - Ingredient library carousel.
  - Product card hover/favorite affordances if compatible.
  - Mobile bottom navigation.
  - Sticky mobile product bar.

### Must Replace with Shopify Native APIs

- `assets/products.js` static product source.
- Product lookup by query string `product.html?id=...`.
- Category lookup by query string `category.html?category=...`.
- localStorage cart and cart totals.
- localStorage order tracking.
- Google Apps Script order submission.
- Custom checkout form.
- Manual inventory/status handling.

### Shopify JS Target

- Later split `site.js` into smaller Shopify-safe files:
  - `morganics-ui.js` - header, drawer, footer polish, reveal, general UI.
  - `morganics-search.js` - Shopify predictive/search behavior.
  - `morganics-cart.js` - Shopify AJAX cart drawer/update behavior.
  - `morganics-product.js` - variant selection, price update, quantity, line-item properties.
  - `morganics-home.js` - hero, stories, routines, ingredient carousel.

Keep JS split conservative. Do not change customer-visible behavior unless required by Shopify.

## Image Asset Folders Needed

### Must Migrate as Theme Assets or Shopify Files

- `assets/logos`
  - Header/footer/brand lockup images.
- `assets/morganics-hero`
  - Hero background, pouch, dry fruit pile, stone, plants, ingredient floaters.
- `assets/category-icons`
  - Category cards, routine cards, mobile drawer categories.
- `assets/banners`
  - Collection/category banners.
- `assets/products`
  - Existing product images for Shopify product media import.
- `images/reviews`
  - Customer story and review images.
- `morganics/ingredients`
  - Ingredient library batch/sprite images.
- `assets/video`
  - `pouch-reveal.mp4`, if the scroll/video hero variant is retained.
- `assets/hero-banner`
  - Keep if referenced after final audit.
- `assets/lifestyle`
  - Keep if referenced after final audit.

### Do Not Migrate by Default

- `archive-unused-pages`
- `test-results`
- `scripts` unless needed for one-time data extraction.
- Backup files such as `*.bak-*`.
- Documentation reports unless useful as migration references.

## Shopify Theme Architecture

### Sections to Build

Homepage:

- `morganics-hero.liquid`
  - Current `.morganics-hero.hero-v3#hero`.
  - Preserve layered assets, hotspots, copy, CTA links, spotlight behavior.
- `morganics-marquee.liquid`
  - Category marquee strip.
- `morganics-category-grid.liquid`
  - Shop by Category grid.
  - Use Shopify collections instead of `categories()` from JS.
- `morganics-promise-strip.liquid`
  - Four promise cards.
- `morganics-routine-carousel.liquid`
  - Shop by Routine section.
- `morganics-featured-products.liquid`
  - Use selected Shopify collection/product list instead of `#featuredGrid`.
- `morganics-customer-stories.liquid`
  - Customer story carousel. Data can be section blocks or metaobjects.
- `morganics-daily-rituals.liquid`
  - Daily ritual grid.
- `morganics-ingredient-library.liquid`
  - Ingredient library filter/marquee. Data can remain JSON initially or move to metaobjects later.
- `morganics-mini-inquiry.liquid`
  - WhatsApp/custom sourcing inquiry.

Commerce pages:

- `main-collection-morganics.liquid`
  - Replacement for `category.html`.
  - Collection hero/banner, collection copy, product grid, collection FAQs.
- `main-product-morganics.liquid`
  - Replacement for `product.html`.
  - Product media, title, Urdu name, variant pills, price, add to cart, quantity, powder line-item property, info boxes, FAQs, reviews, related products.
- `main-cart-morganics.liquid`
  - Replacement for `cart.html`.
  - Shopify cart lines, quantities, subtotal, checkout button.
- `main-search-morganics.liquid`
  - Search results and product discovery.

Content pages:

- `main-page-morganics.liquid`
  - Generic approved content page style for about, FAQ, ingredient guide, storage guide, policies, bulk orders, contact if simple.
- `morganics-contact.liquid`
  - If contact page needs the richer current layout and inquiry handling.

Global:

- `header.liquid`
  - Preserve approved header, logo, nav, search, shop CTA, mobile menu trigger.
- `footer.liquid`
  - Preserve `.premium-footer` content currently injected by JS.
- `cart-drawer.liquid`
  - Shopify AJAX cart drawer matching existing drawer styling.
- `mobile-menu.liquid`
  - Mobile drawer with category cards and contact links.

### Snippets to Build

- `morganics-product-card.liquid`
  - Replacement for JS `card(p)`.
- `morganics-price.liquid`
  - Money display and sale/compare-at support if needed.
- `morganics-variant-pills.liquid`
  - Variant/pack selector.
- `morganics-category-card.liquid`
  - Replacement for `categoryIconCard(cat)`.
- `morganics-icon.liquid`
  - Inline SVG icon helper if reused.
- `morganics-review-card.liquid`
  - Customer/product review card markup.
- `morganics-faq-accordion.liquid`
  - Product and collection FAQ accordion.
- `morganics-info-box.liquid`
  - Reusable usage/storage/precaution/detail boxes.
- `morganics-mobile-bottom-nav.liquid`
  - Mobile bottom navigation.
- `morganics-search-result-card.liquid`
  - Header/search product result card.
- `morganics-asset-image.liquid`
  - Helper for theme assets that preserves alt/loading patterns.

### Templates to Build / Update

- `templates/index.json`
  - Homepage section order exactly matching approved `index.html`.
- `templates/product.json`
  - Use `main-product-morganics`.
- `templates/collection.json`
  - Use `main-collection-morganics`.
- `templates/cart.json`
  - Use `main-cart-morganics`.
- `templates/search.json`
  - Use Shopify search section.
- `templates/page.about.json`
- `templates/page.contact.json`
- `templates/page.bulk-corporate-orders.json`
- `templates/page.ingredient-guide.json`
- `templates/page.faq.json`
- `templates/page.storage-guide.json`
- `templates/page.shipping-policy.json`
- `templates/page.payment-policy.json`
- `templates/page.return-refund-policy.json`
- `templates/page.privacy-policy.json`
- `templates/page.terms-conditions.json`

No Shopify template should recreate `checkout.html` or `order-track.html` as custom static checkout/order pages.

## Old Code to Remove or Replace

### Remove / Do Not Port

- `assets/products.js` as live storefront data.
- `window.MORGANICS_PRODUCTS` dependency for products/collections/cart.
- Query-string product routing:
  - `product.html?id=...`
- Query-string category routing:
  - `category.html?category=...`
- localStorage cart:
  - `morganics_cart_v1`
  - `getCart()`
  - `setCart()`
  - `cartTotal()`
  - `addToCart()` implementation.
- localStorage order tracking:
  - `morganics_last_order`
  - `renderTrackPage()`
  - `order-track.html` flow.
- Google Apps Script order submission:
  - `ORDER_API`
  - `submitCODOrder()`
- Custom COD checkout:
  - `checkout.html`
  - `renderCheckoutPage()`
- Any hardcoded inventory/active-product logic once Shopify controls publish status and inventory.
- Inline `onclick` cart/wishlist handlers where Shopify section rendering should use event listeners.

### Replace with Shopify

- Products -> Shopify products.
- Variants / pack sizes -> Shopify variants/options.
- Categories -> Shopify collections.
- Product SEO -> Shopify product SEO fields.
- Category SEO/meta -> Shopify collection SEO fields/metafields.
- Cart drawer/page -> Shopify cart and AJAX cart API.
- Checkout -> Shopify checkout.
- Orders -> Shopify admin orders.
- Inventory -> Shopify inventory.
- Search -> Shopify search/predictive search.
- Customer inquiries -> Shopify contact form or WhatsApp link, depending business preference.
- Reviews/customer stories -> section blocks, metaobjects, or review app integration.

## Migration Phases

### Phase 1 - Data and Asset Preparation

- Export `assets/products.js` into a clean product import sheet/JSON.
- Confirm active/inactive product handling before Shopify import.
- Import product images from `assets/products` into Shopify product media.
- Build metafield definitions for product usage, precautions, Urdu fields, aliases, FAQs, pairings, and storage.
- Create collections matching current categories.
- Add collection metafields based on `CATEGORY_META`.
- Confirm policy placeholders before publishing policy pages.

### Phase 2 - Base Theme Shell

- Port global tokens/CSS into Shopify assets.
- Rebuild approved header and footer in Liquid.
- Add mobile drawer and mobile bottom nav.
- Keep all colors, typography, spacing, logo usage, and nav labels aligned with the static site.

### Phase 3 - Homepage Sections

- Convert homepage section by section in the exact approved order.
- Use Liquid/section settings for static content.
- Use Shopify collections/products for product/category grids.
- Preserve hero assets and interactions.
- Preserve customer stories and ingredient library behavior.

### Phase 4 - Commerce Templates

- Build product template with Shopify variants and add-to-cart.
- Build collection template with product grid/filter/sort behavior.
- Build cart drawer/page with Shopify cart.
- Replace custom checkout links with Shopify checkout URLs.
- Implement search using Shopify search/predictive search.

### Phase 5 - Content and Policy Pages

- Convert static pages to Shopify page templates.
- Replace placeholder policy values after business confirmation.
- Keep contact/inquiry path functional through Shopify contact form and/or WhatsApp.

### Phase 6 - QA

- Compare static master vs Shopify theme visually page by page.
- Test desktop and mobile:
  - Header/nav.
  - Mobile drawer.
  - Homepage hero and all homepage sections.
  - Collection browsing.
  - Product variant selection.
  - Add to cart.
  - Cart quantity updates/removal.
  - Shopify checkout handoff.
  - Search.
  - Contact/inquiry links/forms.
- Confirm no references remain to `product.html`, `category.html`, `checkout.html`, `order-track.html`, or localStorage order/cart code.

## Key Risk Notes

- `assets/site.js` currently mixes UI behavior, data rendering, cart, checkout, order tracking, search, category metadata, product detail rendering, and footer/header injection. It should be split carefully during migration so visual behavior is preserved while Shopify owns commerce data.
- The approved homepage depends on many asset paths. Liquid `asset_url` replacements must be systematic to avoid broken hero/category/review imagery.
- Product aliases and client-facing spellings such as `Kajo`, `Ispaghol`, `Dar Chini`, and `Zarishk` should be preserved in metafields/search keywords.
- Shopify checkout cannot be redesigned from the theme in the same way as the custom static `checkout.html`; the theme should hand off cleanly to Shopify checkout.
- Policy pages contain placeholders like `[CONFIRM_PAYMENT_METHODS]`, `[CONFIRM_BUSINESS_ADDRESS]`, `[CONFIRM_RETURN_WINDOW]`, and similar values. These need business confirmation before launch.
