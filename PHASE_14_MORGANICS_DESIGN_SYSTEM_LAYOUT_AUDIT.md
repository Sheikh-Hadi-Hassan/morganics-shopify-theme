# Phase 14 Morganics Design-System Layout Audit

Date: 2026-06-07

## Scope

Inspected active Shopify theme files only inside `02_SHOPIFY_THEME_BUILD`:

- `layout/theme.liquid`
- `assets/*.css`
- `assets/*.js`
- `sections/*.liquid`
- `snippets/*.liquid`
- `templates/*.json`
- `config/*.json`

The requested source file `MORGANICS_SHOPIFY_DESIGN_SYSTEM_LAYOUT_TOKENS.md` was not found under the local Documents, Desktop, or Downloads paths during this run, so the audit used the existing active theme token file plus the explicit rules from the request.

## Font-Family Declarations Found

- `layout/theme.liquid`: local `@font-face` for `Brownberries`.
- `assets/morganics-design-tokens.css`: `--font-display: Brownberries, Poppins, sans-serif` and `--font-ui: Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- `assets/critical.css`: uses `var(--font-ui)`.
- `assets/morganics-header.css`: uses Morganics font tokens and now has a final header normalization layer using `var(--font-ui)`.
- `assets/morganics-hero.css`: uses `var(--font-display, Brownberries, Poppins, sans-serif)` for display hero type.
- `assets/morganics-theme.css`: uses `var(--font-display)` and `var(--font-ui)` throughout, with a final Phase 14 normalization layer.
- `sections/collections.liquid`: inline section CSS uses `var(--font-display, Brownberries, Poppins, sans-serif)` and `var(--font-ui, Poppins, system-ui, sans-serif)`.

## Unauthorized Font Imports

No active remote Google font imports were found in `layout/theme.liquid` or theme assets:

- No `fonts.googleapis.com`.
- No `fonts.gstatic.com`.
- No Baloo Bhaijaan font import.
- No Figtree font import.

The string scan matched `clearInterval` / `setInterval` in JavaScript, but those are timer method names, not font usage.

## Unauthorized Font Families

No active `font-family` declarations were found for:

- Baloo Bhaijaan
- Figtree
- Inter
- Plus Jakarta Sans
- Georgia
- Times New Roman
- Noto fonts
- Jameel Noori Nastaleeq

## Hardcoded Font Sizes

The theme still contains many legacy hardcoded `font-size` declarations across component CSS. Rewriting all declarations directly would create a high regression risk, so the cleanup should use tokenized final layers for active components and leave isolated legacy values untouched where they do not affect current visible behavior.

Main risk areas:

- `assets/morganics-theme.css`
- `assets/morganics-header.css`
- `assets/morganics-hero.css`
- `sections/collections.liquid`

## Inconsistent Heading Sizes

Heading sizes are not fully centralized. Major display moments use `var(--font-display)`, but section headings have mixed clamp values and some older overrides. Active cleanup should normalize:

- Hero/display titles with Brownberries.
- Major section titles with Brownberries.
- Cards, forms, footer, nav, cart, mobile nav, and product surfaces with Poppins.

## Inconsistent Line Heights

Line-height values are mixed between decimal values, token references, and hardcoded component-specific values. Required cleanup:

- Display headings: `--lh-display`
- Normal headings/card titles: `--lh-title`
- Body copy/forms: `--lh-body`
- Buttons: `--lh-button`

## Random Margins And Paddings

Many legacy declarations use hardcoded pixel padding/margin. The most visible risks are:

- Section vertical rhythm between category, routine, featured, stories, ingredient library, inquiry, and footer.
- Mobile edge gutters in full-width sections.
- Card inner padding and button spacing.
- Header/search panel spacing on mobile.

## Inconsistent Grid Gaps

The active theme mixes hardcoded `gap` values with token-driven values. Areas to normalize:

- Category cards
- Product cards
- Promise cards
- Routine cards
- Ingredient cards
- Footer columns/actions
- Cart/wishlist rows

## Inconsistent Card Spacing

Card padding/radius varies by component and previous patch layers. Cleanup should standardize:

- `--card-pad-tight`
- `--card-pad-normal`
- `--radius-card`
- `--radius-button`
- `--radius-control`

## Mobile Spacing Risks

Known mobile risks from the inspected CSS and browser comments:

- Horizontal overflow caused by full-width sections plus fixed-width children.
- Right-side visual gaps on mobile full-width sections.
- Oversized section titles in compact viewports.
- Bottom app nav overlap with fixed purchase/cart surfaces.
- Search/header overlays requiring consistent responsive width.

## Audit Decision

Use token updates plus scoped final normalization layers. This avoids restructuring Liquid, avoids changing Shopify behavior, and reduces regression risk while enforcing the Morganics font, spacing, line-height, radius, and component rhythm rules.
