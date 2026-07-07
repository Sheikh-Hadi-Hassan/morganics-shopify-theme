# Morganics Shopify UI And Styling Guide

This file is the focused UI/styling handoff for the Morganics Shopify theme. It covers the visual system, layout behavior, responsive rules, component styling, and the files that control the storefront appearance.

## Purpose

Use this file when editing or rebuilding the Morganics storefront UI.

The goal is to keep the website visually consistent:

- Premium natural pantry brand.
- Botanical, earthy, dark green visual world.
- Cream/off-white surfaces.
- Rounded but not overly soft UI.
- Mobile-first shopping experience.
- Strong product photography and readable product information.
- No generic Shopify default look.

## Core UI Direction

The Morganics storefront should feel:

- Natural
- Premium
- Warm
- Trustworthy
- Practical
- Mobile-first
- Product-focused

Avoid:

- Generic ecommerce templates.
- Oversized marketing sections with weak product visibility.
- Excessive gradients.
- One-color monotone layouts.
- Decorative UI that makes shopping slower.
- Text overlapping images or navigation.
- Content hidden behind the mobile app bar.

## Main Styling Files

### Global Theme Styling

```text
assets/morganics-theme.css
```

Primary shared stylesheet for:

- Header/navigation styling.
- Bottom app bar spacing.
- Homepage product showcase styling.
- Product card styling.
- Shared layout utilities.
- Responsive overrides.

This file often wins the CSS cascade. If a style change is not appearing, check whether a later rule in this file is overriding another stylesheet.

### Hero Styling

```text
assets/morganics-hero.css
```

Controls the homepage hero:

- Hero viewport height.
- Stage size.
- Stage position.
- Ingredient/product composition.
- Header offset.
- Mobile safe spacing.
- Bottom app bar clearance.

### Product Page Styling

```text
assets/morganics-product-layout.css
```

Controls product detail page layout:

- Product media/gallery.
- Product info panel.
- Variant pills.
- Price layout.
- Buy button area.
- Product metafield sections.
- Mobile stacking behavior.

### Collection Styling

```text
assets/morganics-collection-layout.css
```

Controls collection/listing pages:

- Collection header.
- Product grid.
- Filters/sorting if present.
- Pagination.
- Mobile spacing.

## Visual Identity

### Color Direction

Primary visual world:

- Deep botanical green.
- Cream/off-white panels.
- Warm gold accents.
- Muted earthy shadows.
- Dark text on light surfaces.
- Light text on dark green surfaces.

Common roles:

```text
Deep green: backgrounds, app bar, primary UI surfaces
Cream: cards, header, bottom nav, readable panels
Gold: highlights, badges, active states, small accents
Muted gray/green: secondary text and icons
Warm red/orange: warnings only
```

Avoid making the whole page one shade of green. Use cream, gold, neutral, and image content to create contrast.

### Typography

Typography should be:

- Bold for hero and major headings.
- Clear and compact for product cards.
- Easy to scan on mobile.
- Not oversized inside small cards or buttons.

Rules:

- Do not use negative letter spacing.
- Do not scale font size with viewport width.
- Keep button text short.
- Product card text must not overflow.
- Urdu text should be allowed to wrap naturally.

## Layout Principles

### Mobile First

The site is mainly used on mobile. Always check mobile before calling a change done.

Primary test viewport:

```text
390 x 844
```

Also check:

```text
desktop width
tablet-ish width
very narrow mobile width
```

### Safe Area For Bottom App Bar

The mobile bottom app bar is sticky and must not cover content.

Every long page needs enough bottom padding so the final content can scroll above the app bar.

Check these pages:

```text
/
/collections/all
/collections/all?page=2
/products/aqarqara
```

No important CTA, product card, pagination, or hero content should sit behind the bottom nav.

### No UI Overlap

Strict rule:

- Text must not overlap images.
- Cards must not overlap navigation.
- Hero stage must not collide with the header.
- Product cards must not collapse into each other.
- Buttons must not overflow their containers.

## Header

The header uses a cream surface over the dark green page background.

Expected behavior:

- Brand/logo visible.
- Search, wishlist/cart/menu controls aligned.
- Rounded cream container.
- Header should feel like part of the mobile app shell.
- Header must not cover hero content.

On mobile:

- Keep controls large enough to tap.
- Do not add long text labels inside header action buttons.
- Use icons where possible.

## Mobile Bottom App Bar

The bottom app bar is a key Morganics UI element.

Expected items:

```text
Home
Categories
Shop
Cart
WhatsApp
```

Styling direction:

- Cream/off-white rounded container.
- Dark green icons/text.
- Gold active indicator or accent.
- Active item can use a raised or highlighted shape.
- Cart badge should be small and readable.

Rules:

- App bar must remain readable over dark backgrounds.
- App bar should not cover page content.
- Content should have bottom padding on mobile.
- Do not put important controls directly underneath it.

## Homepage Hero

Hero goal:

- Make Morganics brand and product world obvious in the first viewport.
- Keep the product/stage composition large and centered.
- Preserve safe spacing above the bottom app bar.

Important rules:

- Stage should use maximum practical size.
- Do not leave excessive empty side gaps around the stage.
- Do not let the stage overlap the bottom app bar.
- Header and hero text must remain readable.
- Botanical background should support the product, not hide it.

Hero should include:

- Brand/header visible.
- Strong heading.
- Supporting line.
- Product/stage visual.
- Hint of next section on normal screens.

Avoid:

- Tiny product stage.
- Overly empty hero.
- Decorative-only hero without product signal.
- Text covering the product.

## Homepage Product Sections

The shared section is:

```text
sections/morganics-featured-products.liquid
```

Used for:

- Featured Products
- New Arrivals

Styling comes mainly from:

```text
assets/morganics-theme.css
```

Expected UI:

- Section heading clearly visible.
- Product cards in a clean responsive grid.
- At least 8 products in Featured Products.
- At least 8 products in New Arrivals.
- Product card images consistent in size.
- Prices readable.
- Variant/size chips compact.

Mobile grid:

- Prefer 2 columns when space allows.
- Cards must remain readable.
- Product titles should wrap cleanly.
- No card should be hidden under the bottom app bar.

## Product Cards

Product card snippet:

```text
snippets/morganics-product-card.liquid
```

Product card styling should support:

- Product image.
- Product title.
- Price.
- Variant/size chips.
- Add-to-cart or quick action if present.
- Badges where needed.

Rules:

- Image area should have stable dimensions.
- Cards should not jump when content changes.
- Titles should use compact line height.
- Price should be easy to find.
- Urdu/English mixed titles must wrap without breaking layout.
- Powder variants should not show as normal size chips.

Avoid:

- Oversized card padding.
- Long product titles pushing buttons out.
- Images with inconsistent heights causing layout shift.
- Badges covering important product details.

## Collection Pages

Collection styling file:

```text
assets/morganics-collection-layout.css
```

Collection pages should feel like a dense but clean shopping grid.

Expected behavior:

- Collection title/header visible.
- Products arranged in responsive grid.
- Pagination visible and tappable.
- Last product row can scroll above bottom app bar.
- Cards match homepage card styling.

Check:

```text
/collections/all
/collections/all?page=2
```

Avoid:

- Too much top whitespace.
- Pagination hidden behind bottom nav.
- Grid becoming one very narrow column unless absolutely necessary.
- Product images cropping badly.

## Product Page UI

Main product section:

```text
sections/main-product-morganics.liquid
```

Styling:

```text
assets/morganics-product-layout.css
assets/morganics-theme.css
```

Expected layout:

- Product gallery/media first.
- Product title clear.
- Price visible near variants and purchase controls.
- Variant pills easy to tap.
- Buy/add-to-cart area obvious.
- Product details/metafields readable below.

Mobile product page:

- Use stacked layout.
- Keep variant and cart controls easy to reach.
- Avoid sticky app bar covering buy buttons.
- Product image should not be too small.

## Variant Pills

Variant pill snippet:

```text
snippets/morganics-variant-pills.liquid
```

Expected UI:

- Size pills are compact and tappable.
- Selected pill has clear active state.
- Unavailable state is visibly different.
- Powder variants are hidden from normal size pill display.

Rules:

- Pill text must fit.
- Keep sizes stable.
- Do not let pills wrap into messy uneven clusters.

## Powder Form UI

Powder Form appears as a checkbox/toggle area on supported products.

Behavior:

- Hidden for excluded products.
- Visible only when a product has Powder variants.
- Checking it switches to matching Powder variant.
- Cart shows `Powder Form: Yes`.

UI expectations:

- Checkbox label should be clear.
- Price update should feel natural.
- Warning state should be readable if Powder is unavailable for selected size.
- It should not look like a separate product or confusing add-on.

## Buttons

Button rules:

- Primary action should be obvious.
- Icons should be used where appropriate.
- Text must not overflow.
- Tap targets must be comfortable on mobile.
- Active/disabled/loading states should be clear.

Avoid:

- Long text labels inside small buttons.
- Weak contrast.
- Multiple competing primary buttons.

## Icons And Badges

Use icons for:

- Search
- Menu
- Cart
- Wishlist
- Home
- Categories
- WhatsApp

Badges:

- Cart count badge should be compact.
- Gold/yellow accent works for count badges.
- Badge text must remain readable.

## Images

Product images are central to the UI.

Rules:

- Use real product images where possible.
- Maintain consistent image boxes.
- Avoid dark, blurry, overly cropped images.
- Do not let image backgrounds fight with the card background.
- Product must be inspectable.

Hero/product-stage images:

- Product should be large enough to inspect.
- Background can be atmospheric, but product remains the focus.

## Spacing

General spacing rules:

- Use generous breathing room in hero.
- Use tighter, scannable spacing in product grids.
- Use clear vertical rhythm between homepage sections.
- Keep mobile spacing compact but not cramped.
- Always include bottom safe space above app bar.

Avoid:

- Extra unused side space around hero stage.
- Huge vertical gaps before product sections.
- Nested card-on-card layouts.

## Responsive Rules

Check these states:

```text
Mobile portrait: 390 x 844
Small mobile: around 360px wide
Tablet: around 768px wide
Desktop: 1280px+ wide
```

Required:

- Header fits.
- Hero stage remains visible.
- Product cards stay aligned.
- Text wraps cleanly.
- Bottom app bar does not overlap content.
- Product controls remain tappable.

## Accessibility And Readability

Minimum expectations:

- Good contrast.
- Tap targets large enough.
- Text readable over backgrounds.
- Icons recognizable.
- Important states not communicated by color alone.
- Focus/active states should be visible where browser defaults are not enough.

## UI QA Checklist

### Homepage

- Header looks polished.
- Hero stage is large and centered.
- No excessive side gaps around hero stage.
- Hero does not overlap mobile app bar.
- Featured Products shows 8 products.
- New Arrivals shows 8 products.
- Product cards are aligned.

### Collection Pages

- Product grid loads cleanly.
- Product cards match homepage style.
- Pagination is visible.
- Last row is not covered by app bar.
- Page 2 layout matches page 1.

### Product Pages

- Product gallery is clear.
- Title and price are readable.
- Variant pills are tappable.
- Powder checkbox styling is clean when visible.
- Excluded products hide Powder checkbox.
- Add-to-cart area is not hidden by bottom nav.

### Mobile Navigation

- Bottom app bar is readable.
- Active item is clear.
- Cart badge is positioned correctly.
- WhatsApp item is visible.
- No page content is trapped behind it.

## Common UI Problems To Fix

### Content Hidden Behind Bottom App Bar

Add or increase mobile bottom padding on the page wrapper or section.

### Product Cards Uneven

Set stable image dimensions and consistent title/price spacing.

### Hero Looks Too Small

Increase stage width/height within safe responsive constraints. Keep bottom safe spacing.

### CSS Change Does Not Apply

Check later rules in:

```text
assets/morganics-theme.css
```

The final rule in the cascade may be overriding the file you edited.

### Text Overflows

Use wrapping, smaller compact text, stable min/max widths, and avoid long button labels.

## Final Styling Standard

Before finishing any UI change:

1. Check homepage mobile.
2. Check homepage desktop.
3. Check `/collections/all`.
4. Check `/collections/all?page=2`.
5. Check at least one product page.
6. Check one product with Powder Form.
7. Check one excluded product without Powder Form.
8. Confirm bottom app bar does not overlap important content.

