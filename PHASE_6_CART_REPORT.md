# Phase 6 Cart Page and Cart Drawer Report

## Changed Files

- `sections/main-cart-morganics.liquid`
  - Replaces the starter cart page with a Morganics-styled Shopify cart page.
  - Uses the Shopify `cart` object for empty and populated states, line items, quantities, prices, subtotal, discounts, total, and checkout submission.

- `snippets/morganics-cart-drawer.liquid`
  - Adds the global floating cart button, drawer, backdrop, drawer line-item area, subtotal, continue shopping link, and Shopify checkout form.

- `snippets/morganics-cart-line-item.liquid`
  - Adds a reusable Shopify line-item renderer for both cart page and cart drawer.
  - Supports product image, title, variant, properties, discounts, quantity controls, line price, and remove control.

- `templates/cart.json`
  - Points the Shopify cart template to `main-cart-morganics`.

- `assets/morganics-cart.js`
  - Adds Shopify AJAX Cart API behavior for drawer refresh, add-to-cart interception, quantity changes, item removal, cart count updates, and subtotal updates.
  - Does not use localStorage or the old static cart/order logic.

- `assets/morganics-theme.css`
  - Adds Morganics cart page, cart drawer, line-item, empty-cart, summary, and responsive styles based on the approved static cart visual language.

- `layout/theme.liquid`
  - Renders the Morganics cart drawer globally and loads `morganics-cart.js`.

## Shopify Source of Truth

- Products and variants come from Shopify product forms.
- Cart contents come from Shopify `cart` Liquid and `/cart.js`.
- Quantity and remove actions use `/cart/change.js`.
- Checkout uses Shopify cart form submission with `name="checkout"`.

## Old Code Replaced or Avoided

- Did not use old `assets/products.js`.
- Did not use old localStorage cart state.
- Did not use `checkout.html`.
- Did not use Google Apps Script order submission.
- Did not use old `order-track.html` logic.

## Limitations

- Drawer line items are re-rendered client-side from Shopify AJAX cart JSON after updates, so advanced Shopify line-item rendering that exists only in Liquid may need mirrored JS support later.
- Cart drawer money formatting uses Shopify `formatMoney` when available, with a PKR fallback if Shopify's helper is unavailable in the preview.
- Shipping, taxes, and payment details remain intentionally deferred to Shopify checkout.
- The theme stores the custom payment selection in Shopify cart attributes and the cart note. Native checkout gateway selection remains controlled by Shopify Admin and checkout settings.
- Payment proof file selection is validated in the drawer, but theme Ajax APIs cannot upload binary files. A file-upload app or backend endpoint must store the screenshot and return a URL before `Payment Proof URL` can be saved.
- Automatic native payment-method selection, hiding, or reordering requires Shopify Plus payment customization or an approved app integration. The theme does not attempt to force checkout payment controls.

## Shopify Admin Payment Setup

Enable manual payment methods whose labels match the drawer: `Cash on Delivery`, `EasyPaisa`, `JazzCash`, and `Bank Transfer / Meezan Bank`.

## Remaining Risks

- The final product imagery depends on Shopify product media being populated.
- Discount display is basic and may need expanded styling after real discount rules are configured.
- The floating cart button may need placement adjustment after final mobile header QA against the live preview.
