# Phase 8 Visual QA Audit

## Scope

Approved visual source: `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`

Editable Shopify theme: `02_SHOPIFY_THEME_BUILD`

The static HTML project remains the visual source of truth. Shopify products, collections, cart, checkout, variants, prices, inventory, and availability must remain Shopify-powered.

## Audit Table

| Page / Section | Original static HTML reference | Current Shopify file responsible | What is missing | What is visually wrong | Shopify data source | Priority | Exact fix plan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Global header | `index.html`, `shop.html`, `contact.html`; CSS in `assets/site.css`, `assets/mob-hero-fix.css` | `sections/header.liquid`, `assets/morganics-theme.css`, `assets/morganics-theme.js` | Original search button/panel, header product bar behavior, stronger nav pill treatment, direct cart trigger, tighter glass header rhythm | Current header is functional but flatter and more generic; search is only a link, mobile panel is not close enough to original compact drawer behavior | Shopify menus, routes, search route, cart object | Critical | Replace search link with original-style button and panel, keep Shopify menu links, add cart trigger, add accessible JS open/close/search-submit behavior, tighten desktop/mobile header CSS to match original glass header. |
| Homepage hero | `index.html` hero `.morganics-hero.hero-v3`; CSS in `assets/hero-v2.css`, `assets/mob-hero-fix.css` | `sections/morganics-hero.liquid`, `assets/morganics-theme.css` | Original hotspot wrappers, stronger layered sizing, hero action card proportions, mobile hero safeguards | Shopify hero uses the right assets but looks lighter/less cinematic; product stack and quicklinks are not as anchored as original | Section settings and theme assets | Critical | Preserve Shopify section settings but adjust markup classes and CSS to match original 3-column hero, stronger pouch/stone/pile hierarchy, glass category pills, desktop-height rhythm, and mobile stacking. |
| Hero quick category cards | `index.html` `.benefit-card` inside `.hero-quicklinks` | `sections/morganics-hero.liquid` | Original SVG-like premium icon treatment and card sizing | Current image icons are too plain and not enough like the approved pill cards | Section blocks, Shopify links | High | Keep block editability but restyle icons/cards to original rounded glass cards; keep three quick links visible on desktop and compact on mobile. |
| Homepage category grid | `index.html` `#categories`, static `site.js` rendered `categoryGrid` | `sections/morganics-category-grid.liquid`, `templates/index.json` | Shopify collection support; product counts; collection image/banner awareness | Current grid is block-only and may not reflect real Shopify categories | Shopify collections or editable blocks fallback | Critical | Add collection block support, collection title/count/image fallback, preserve static icon-card layout, keep manual blocks as fallback for editor compatibility. |
| Homepage featured products | `index.html` `#featured`, static `site.js` rendered `featuredGrid` | `sections/morganics-featured-products.liquid`, `snippets/morganics-product-card.liquid` | Reusable Shopify product card, fallback images, quick add | Current selected-products branch bypasses fallback snippet and quick add; placeholder branch can look static/generic | Shopify product list / collection products | Critical | Render all Shopify products through `morganics-product-card`; add collection setting fallback; preserve static visual card design and quick-add behavior. |
| Promise strip | `index.html` `.promise-strip` | `sections/morganics-promise-strip.liquid`, `assets/morganics-theme.css` | Minor visual icon parity and compact rhythm | Close, but card spacing/shadow needs alignment to original | Section blocks/settings | Medium | Tighten cards, icon badges, four-column to mobile behavior using original values. |
| Routine carousel | `index.html` `.routine-section` | `sections/morganics-routine-carousel.liquid`, `assets/morganics-theme.css` | Horizontal scroll feel and stronger background atmosphere | Content exists but needs stronger original dark/green editorial band and card rhythm | Section blocks/settings | High | Adjust CSS to match original full-width routine band, background overlay, rounded routine cards, responsive horizontal overflow. |
| Customer stories | `index.html` `.ritual-film-section`, `assets/reviews.js` | `sections/morganics-customer-stories.liquid`, `assets/morganics-theme.js` | Dots and stronger carousel styling | Current version is simpler and may feel unfinished with missing review images | Section blocks/settings | Medium | Improve film shell/card styling and add dots only if safe; keep existing lightweight JS. |
| Daily rituals | `index.html` `.ritual-section` | `sections/morganics-daily-rituals.liquid` | Static grid parity and spacing | Needs closer original card hover/rhythm | Section blocks/settings | Medium | Reuse static ritual-grid styling and responsive grid. |
| Ingredient library | `index.html` `.home-ingredient-showcase.ingredient-library` | `sections/morganics-ingredient-library.liquid` | Filter row and richer marquee treatment | Current marquee exists but is simplified | Section blocks/settings and asset images | Medium | Tighten dark library section, card sizing, marquee animation, and responsive masks without heavy JS. |
| Mini inquiry | `index.html` `.mini-inquiry-section` | `sections/morganics-mini-inquiry.liquid`, `assets/morganics-theme.js` | Exact card split spacing and WhatsApp copy flow | Functional but needs original card density and button rhythm | Section settings, WhatsApp URL | Medium | Align CSS with original split card and form controls. |
| Shop/catalog page | `shop.html` | `sections/main-collection-morganics.liquid`, `snippets/morganics-sort-filter-bar.liquid`, `snippets/morganics-product-card.liquid` | Stronger shop tools, category count, product card parity | Collection page works but reads like a generic grid; filter/sort bar is under-styled | Shopify collection, filters, products, sort | Critical | Tighten shop hero, filter panel, product cards, sort bar; preserve Shopify filters and product URLs. |
| Category page | `category.html` | `snippets/morganics-collection-hero.liquid`, `sections/main-collection-morganics.liquid` | Static category hero image/rich intro parity | Category banner/intro not visually strong enough | Shopify collection title, description, image, metafields | High | Match original category hero with large dark image band, breadcrumbs, intro cards, and collection count. |
| Product page | `product.html` | `sections/main-product-morganics.liquid`, snippets `morganics-price`, `morganics-variant-pills`, `morganics-info-box`, fallback image snippet | Stronger buy box/card hierarchy, static visual scale, fallback image consistency | Product page is functional but generic compared with original detail layout | Shopify product, variants, media, metafields | Critical | Tighten detail grid, image panel, sticky behavior, buy box, variant pills, info boxes; keep Shopify product form and fallback image only when no Shopify image exists. |
| Product card | Static card styling in `assets/site.css` and `shop.html` output | `snippets/morganics-product-card.liquid`, `assets/morganics-theme.css` | Original image padding, metadata, Urdu line, badges, hover lift, action row | Current cards are serviceable but not premium enough and featured cards bypass snippet | Shopify product object, fallback images | Critical | Consolidate card styling around one snippet, add polished action row, stable dimensions, fallback-image support, availability badges. |
| Cart page and drawer | `cart.html`, static drawer in `assets/site.js`/`assets/site.css` | `sections/main-cart-morganics.liquid`, `snippets/morganics-cart-drawer.liquid`, `snippets/morganics-cart-line-item.liquid`, `assets/morganics-cart.js` | Minor drawer/header polish and card density | Functional but needs closer static drawer visual treatment | Shopify cart object and AJAX cart API | High | Tighten drawer dimensions, line-item cards, summary/action styling; preserve AJAX cart and Shopify checkout form. |
| Contact page / footer links | `contact.html`, footer injected by static `site.js` | `sections/footer.liquid`; contact page template not yet implemented in this phase | Dedicated contact page parity may be incomplete if Shopify page template is generic | Footer is close but lacks original dense premium footer rhythm and contact/inquiry emphasis | Shopify menus, footer settings, page content | High | Repair footer parity now; leave dedicated contact template as remaining gap unless page template is in scope later. |
| Mobile menu and mobile hero | `assets/mob-hero-fix.css` | `sections/header.liquid`, `assets/morganics-theme.css`, `assets/morganics-theme.js` | Original compact mobile header buttons, search overlay, safe hero stacking | Mobile can feel generic and hero may lose approved hierarchy | Shopify menu/search/cart, section assets | Critical | Add mobile search panel behavior, tighter menu panel, hero responsive sizing, no horizontal overflow. |
| Search UI | Static `headerSearchPanel` and `site.js` search | `sections/header.liquid`, `assets/morganics-theme.js` | Search panel and clear route handoff | Current search link opens Shopify search page only | Shopify search route | High | Add header search form panel that submits to Shopify search, without old product JS live search. |

## Pass Plan

### Pass 1: Homepage + Hero + Header

- Rework header Liquid for original-style search panel, Shopify menu links, search button, cart trigger, CTA, and accessible mobile panel.
- Tighten header and mobile menu CSS.
- Tighten hero CSS to better match approved static layered hero.
- Keep all asset paths using `asset_url`.

### Pass 2: Dynamic Homepage Sections

- Make category grid optionally powered by Shopify collection blocks while retaining manual fallback blocks.
- Make featured products render real Shopify product objects through the shared product-card snippet.
- Add collection setting fallback for featured products.
- Align promise strip, routine carousel, customer stories, ingredient library, and mini inquiry spacing/styling.

### Pass 3: Commerce + Global UI

- Consolidate product-card visual style and quick-add layout.
- Repair product, collection, cart, drawer, footer, and search UI styling.
- Preserve Shopify product forms, collection filters, AJAX cart, and checkout handoff.

## Verification Plan

- Run `shopify theme check`.
- Start or reuse Shopify preview if available and load homepage, product page, collection page, cart page.
- Confirm header search opens/submits, mobile menu toggles, fallback images render when Shopify media is missing, cart drawer opens, quantity controls work, and checkout button still hands off to Shopify checkout.
