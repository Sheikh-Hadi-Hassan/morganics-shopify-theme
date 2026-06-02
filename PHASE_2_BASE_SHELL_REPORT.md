# Phase 2 Base Shell Report

## Scope

Built the Shopify base shell only. No product page, collection page, cart, checkout, order tracking, or full homepage conversion was added.

## Changed / Created Files

- `layout/theme.liquid`
  - Added Morganics global shell structure.
  - Loads `critical.css`, `morganics-theme.css`, and `morganics-theme.js`.
  - Adds local `Brownberries` font with Shopify `asset_url`.
  - Renders Shopify header and footer section groups.

- `sections/header.liquid`
  - Replaced starter header with Morganics header shell.
  - Supports editable logo, announcement text, Shopify navigation menu, search link, header CTA, contact info, and mobile menu.
  - Uses copied fallback logo from `assets/morganics/logos/morganics-logo-header.png`.
  - Uses Shopify routes where available.

- `sections/footer.liquid`
  - Replaced starter footer with Morganics footer shell.
  - Supports editable footer logo, trust strip, brand text, menu columns, text columns, contact info, social links, and bottom policy menu.
  - Uses copied fallback logo from `assets/morganics/logos/morganics-logo-footer.png`.

- `sections/header-group.json`
  - Points the header group at the updated `header` section.
  - Adds default Morganics announcement, CTA, and contact settings.

- `sections/footer-group.json`
  - Points the footer group at the updated `footer` section.
  - Adds starter footer blocks and Morganics contact/trust defaults.

- `sections/morganics-home-shell.liquid`
  - New minimal homepage shell section.
  - Uses copied Morganics hero assets via Shopify `asset_url`.
  - Intentionally does not render products, collections, cart, checkout, or old data.

- `assets/morganics-theme.css`
  - New base shell styling for Morganics tokens, body background, header, mobile menu, minimal homepage shell, and footer.
  - Does not import or activate old full static CSS.

- `assets/morganics-theme.js`
  - New lightweight shell JS for mobile menu accessibility and sticky header state.
  - No localStorage, cart, checkout, product, collection, or order logic.

- `templates/index.json`
  - Replaced starter `hello-world` homepage with the minimal `morganics-home-shell` section.

## Guardrails Confirmed

- Did not edit `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`.
- Did not update product, collection, cart, search, page, or password templates.
- Did not activate `products.js`.
- Did not activate old checkout logic, order tracking, Google Apps Script, or localStorage cart.
- Header uses Shopify menus where configured, with safe fallbacks.
- Footer uses Shopify menus and section blocks where configured.
- Homepage remains a simple visual shell only.

## Validation

- JSON parse check passed for:
  - `sections/header-group.json`
  - `sections/footer-group.json`
  - `templates/index.json`
- Active shell scan found no forbidden references to:
  - `products.js`
  - `ORDER_API`
  - `submitCODOrder`
  - `morganics_cart_v1`
  - `localStorage`
  - `checkout.html`
  - `order-track.html`
  - `script.google.com`
- `shopify theme check --path 02_SHOPIFY_THEME_BUILD` result:
  - 42 files inspected.
  - No offenses found.

## Issues / Notes

- The new CSS is a conservative shell stylesheet, not the full approved static stylesheet. Full section-level styling should be migrated section by section in later phases.
- The local `Brownberries` font is loaded from copied assets. Poppins remote loading was not added to avoid Theme Check remote asset warnings; the UI stack falls back to system sans fonts until typography is finalized.
- The mobile menu is structural and menu-driven. Category cards from the static mobile drawer were not rebuilt yet because collection migration is a later phase.
- Product, collection, cart, and checkout links use Shopify-native routes or configured menu links but the corresponding page templates were not built in this phase.
