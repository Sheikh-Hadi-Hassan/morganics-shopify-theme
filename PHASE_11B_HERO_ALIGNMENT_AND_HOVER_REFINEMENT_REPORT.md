# Phase 11B Hero Alignment And Hover Refinement Report

## Scope

Surgical refinement of the active Morganics Shopify homepage hero only. Work stayed inside `02_SHOPIFY_THEME_BUILD` and did not edit `01_FRONTEND_MASTER_DO_NOT_TOUCH`.

## Files Changed

- `assets/morganics-hero.css`
- `assets/morganics-hero.js`

## What Was Adjusted

- Moved the main hero product stack to a slightly lower optical anchor under the header.
- Raised the stone, dry-fruit pile, pouch contact shadow, and pouch base inside the stack so the base sits slightly higher while the whole group still feels slightly lower overall.
- Tightened left hero text spacing by adjusting the copy block vertical offset, text max width, and title/rule/description spacing.
- Repositioned corner plants farther into the edges with stronger blur and lower opacity so they read as background atmosphere.
- Rearranged desktop floating ingredients around the pouch with less symmetry and more even surrounding coverage.
- Preserved the existing Shopify product bindings, Add to Cart logic, View Details links, and hero data JSON.

## Exact Alignment Decisions

- The product stack now uses `--hero-product-anchor: 47.5%`, placing the full pouch/pile/stone group slightly lower than geometric center.
- The base stone now uses `--stone-bottom: calc(var(--stone-w) * 0.025)`, raising the stone within the locked stack.
- The dry-fruit pile uses `--dryfruits-bottom: calc(var(--stone-w) * 0.13)` so it overlaps the stone surface more convincingly.
- The pouch uses `--pouch-bottom: calc(var(--stone-w) * 0.205)` so it remains planted behind the pile instead of separating from the base.
- The scoped `body[data-template="index"]` overrides were updated to match the same anchor and stone-bottom variables so older global hero rules cannot override the dedicated hero layout.

## Text Positioning

- The left copy block now sits slightly lower to better match the approved HTML rhythm under the header.
- The headline/rule/description stack is tighter and closer to the HTML reference through a reduced rule margin.
- The copy width increased slightly to keep the editorial block stable without pushing into the pouch composition.

## Hover Behavior Correction

- The hovered floater itself now scales in place to roughly `2x`.
- Inactive floaters fade and blur during spotlight mode, while the active floater remains crisp and visually anchored.
- The JavaScript now applies `.is-active`, then waits one animation frame before measuring the ingredient image. This positions the hover card from the enlarged ingredient’s actual on-screen bounds.
- The spotlight clone remains aligned to the same hovered ingredient as a visual echo, while the original ingredient remains visible and attached to the interaction.
- Touch behavior remains tap-based through the existing click/focus spotlight listeners.

## Responsive Notes

- Desktop keeps the three-column layout with protected negative space around headline, central product group, and quick category cards.
- Tablet and mobile product-stack sizing remains unchanged except for inheriting the safer locked-stack alignment variables.
- Mobile still reduces visible floaters to the main four to avoid overlap with text and bottom cards.
- The hover-only enlargement is naturally limited to hover-capable devices; tap/focus still opens the card on touch devices.

## Validation

- `shopify theme check` passed with `0 offenses`.
- `node --check assets/morganics-hero.js` passed.
- `curl -I http://127.0.0.1:9292/` returned `HTTP/1.1 200 OK`.
- Existing required hero Theme Check fixes remain in place:
  - `.hero-spotlight-clone` has explicit `width="320"` and `height="320"`.
  - `.hero-spotlight-media img` has explicit `width="188"` and `height="188"`.
  - `morganics-hero.js` loads with a normal deferred script tag.

## Remaining Small Gaps

- The separate `MORGANICS_SHOPIFY_HERO_SECTION_BUILD_PROMPT(2).md` file referenced in the pasted request was not found in the searched prompt/workspace paths, so this pass followed the pasted Phase 11B brief and the existing hero implementation conventions.
- Browser UI automation in the active Chrome profile remains unreliable because focus can jump to unrelated tabs, so final verification used Theme Check, JavaScript syntax validation, HTTP load validation, and source-level review.
