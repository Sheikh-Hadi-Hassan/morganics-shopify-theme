# Shopify Morganics Design System

## Font Rule

The active Shopify theme may use only:

- Brownberries
- Poppins

Approved stacks:

```css
--font-display: 'Brownberries', 'Poppins', sans-serif;
--font-ui: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

No Inter, Plus Jakarta Sans, Georgia, Times New Roman, Noto fonts, Jameel fonts, Brown Beige as a font-family name, or fallback-first random stacks are allowed in active theme code.

## Font Usage Map

Brownberries:

- Approved hero/display headlines
- Major brand-impact section headings
- Short premium title moments
- Selected high-impact labels only

Poppins:

- Body copy
- Product cards
- Product descriptions
- Navigation
- Buttons
- Forms
- Footer
- Cart drawer and cart page
- Product page functional content
- Collection/search functional content
- Static, legal, policy, blog, article, 404, password, and gift card pages
- Labels, captions, badges, FAQ, and microcopy

## Heading Scale

- H1: page title, `--type-h1`
- H2: major section heading, `--type-h2` or `--type-display-lg` for approved brand-impact sections
- H3: card/group heading, `--type-h3`
- H4: component heading, `--type-h4`
- H5: small label heading, `--type-h5`
- H6: micro heading, `--type-h6`

Hero keeps its approved hero-specific scale and composition.

## Line Height

- Display heading: `--lh-display`
- Heading: `--lh-heading`
- Product/card title: `--lh-title`
- Body: `--lh-body`
- Caption: `--lh-caption`
- Button/nav: `--lh-button`

## Spacing

- Desktop section padding: `--section-pad-y` / `--section-pad-x`
- Tablet section padding: same tokens with clamp behavior
- Mobile section padding: tokenized overrides with `--space-16`/`--space-18` equivalent rhythm
- Heading-to-body gap: `--heading-gap`
- Card padding: `--card-pad`
- Product grid gap: `--grid-gap`
- Category gap: section-specific parity rules, still token-aware
- Footer gap: `--grid-gap` and `--content-gap`
- Form field gap: `--form-gap`
- Button gap: `--button-gap`

## Component Rules

Header/navbar:

- Poppins only.
- Nav uses `--type-nav`.
- Buttons and cart/search controls keep 44px minimum touch targets.
- Mobile menu must remain click/keyboard friendly.

Buttons:

- Poppins only.
- `--type-button`, `--lh-button`.
- Pill radius unless the component is a product/card action requiring compact radius.
- Disabled state must remain visually distinct.

Product cards:

- Shopify product object is source of truth.
- Poppins for title, price, badges, and buttons.
- Fallback images allowed only when Shopify product image is missing.
- No static `products.js` data.

Category cards:

- Poppins for labels.
- Use approved ingredient icon assets where visible labels need parity.
- Collection links should remain dynamic where a matching Shopify collection exists.

Promise cards:

- Poppins body/copy.
- Left icon square layout.
- Four-card desktop rhythm, clean stacked mobile rhythm.

Story/review cards:

- Brownberries may be used for the section title only.
- Story body, names, ratings, and buttons use Poppins.

Ingredient cards:

- Poppins for all dense card text.
- Dark section typography must stay compact and readable.

Footer:

- Poppins only.
- Compact columns, contact text, support bars, social links, and legal row.

Forms:

- Poppins only.
- Fields inherit `--type-body-sm`.
- Use `--form-gap` and 42px minimum field height.

Cart drawer:

- Poppins only.
- Product title, variant, quantity, price, subtotal, and checkout CTA are functional UI.

Product page:

- Poppins for product title, description, price, variants, quantity selector, product form, FAQ, and info boxes.
- Display font may appear only in non-dense brand banners.

Collection/search pages:

- Poppins for filters, sorting, product count, cards, pagination, and empty states.

Static Shopify pages:

- Poppins only.
- Readable line-height and tokenized spacing.
