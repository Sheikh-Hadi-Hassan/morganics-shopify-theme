# Phase 15 Content Structure Audit

## Scope

Workspace audited: `02_SHOPIFY_THEME_BUILD`

Goal: keep the active Shopify theme structure stable, improve content inside existing sections where the theme already supports it, and add missing trust/static page templates.

## Files Inspected

- `layout/theme.liquid`
- `snippets/meta-tags.liquid`
- `sections/footer.liquid`
- `sections/footer-group.json`
- `sections/main-collection-morganics.liquid`
- `sections/main-product-morganics.liquid`
- `sections/page.liquid`
- `templates/page.json`
- `templates/index.json`
- Existing active CSS under `assets/*.css`
- Existing snippets and sections referenced by product, collection, header, footer and homepage flows

## Existing Structure Findings

- The homepage already contains the expected Morganics sections and should not be reordered.
- Product pages already support structured content through existing product metafields and fallback section settings.
- Collection pages already support an intro card through collection metafields and fallback section settings.
- The footer already renders hardcoded menu groups and CTA cards, so missing trust links can be added without changing the footer structure.
- The default Shopify `page` section is minimal and not sufficient for polished Morganics trust pages.

## Content Gaps Found

- Missing dedicated Shopify templates for:
  - About Us
  - Contact
  - FAQ
  - Shipping Policy
  - Return & Refund Policy
  - Payment Policy
  - Privacy Policy
  - Terms & Conditions
  - Storage Guide
  - Bulk / Corporate Orders
  - Ingredient Guide
  - Guides
- Footer did not expose all trust and guide destinations.
- Page metadata did not provide template-specific SEO descriptions for the new trust pages.
- Product fallback guidance was too generic for future products without metafields.
- Collection fallback copy needed category-specific safe wording instead of a single generic fallback.

## Font and Style Audit Notes

- The active theme uses a tokenized design system in `assets/morganics-design-tokens.css`.
- `Brownberries` remains the primary display font.
- `Poppins` remains the primary UI/body font.
- Urdu content is currently routed through the configured Urdu font token.
- This phase did not redesign typography, cards, header, hero, footer, product cards, cart, checkout, or collection grids.

## Spacing and Layout Audit Notes

- Existing spacing and responsive cleanup from prior phases remains in place.
- Static page styling needed Morganics-specific spacing, form styling and CTA treatment.
- This phase intentionally avoided broad spacing or visual redesign work outside the new static page surface and content fallbacks.

## Claim Safety Notes

- Content was written as pantry, sourcing, storage, order support and practical use guidance.
- Medical, treatment, cure and guaranteed-result claims were avoided.
- Where needed, precaution copy frames product information as non-medical guidance.

## Implementation Plan

1. Add a reusable Morganics static page section.
2. Add JSON page templates for all missing trust/support pages.
3. Add footer links for trust, policies, guides and business order pages.
4. Add template-specific meta titles and descriptions.
5. Tighten collection intro fallback copy by collection handle.
6. Tighten product fallback usage, storage, precaution and category copy.
7. Keep all existing Shopify forms, product forms, cart, checkout, search, header, hero and footer logic intact.

