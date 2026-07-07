# Morganics Shopify Final QA Audit

Audit role: Senior Quality Assurance Lead  
Store: Morganics Shopify storefront  
Local preview: `http://127.0.0.1:9292`  
Live site: `https://morganics.store`  
Theme: `Morganics 3.6`  
Theme ID: `153502941378`

## Audit Status

Status: Conditional Pass

The storefront has the right structural pieces for launch: custom Morganics homepage, product listing pages, custom product page, product cards, mobile bottom navigation, Featured Products, New Arrivals, and Powder Form behavior.

The remaining risk is not architecture. The main risks are regression verification, content safety, Powder Form product data accuracy, and mobile spacing around the bottom app bar.

## Executive Summary

The Morganics Shopify theme is production-oriented and contains the required storefront functionality:

- Homepage hero.
- Featured Products section.
- New Arrivals section.
- Collection product grids.
- Product detail pages.
- Variant selection.
- Powder Form variant switching.
- Cart line item property support.
- Mobile bottom app navigation.
- Shopify Admin-editable product and homepage content.

The store should not be considered fully QA-approved until the final live pass confirms:

- Featured Products renders 8 products.
- New Arrivals renders 8 products.
- Powder Form appears only on valid non-excluded products.
- Excluded products never show Powder Form.
- Product pages and collection pages have no mobile bottom-bar overlap.
- Cart accurately reflects selected variants and Powder Form properties.
- Product content avoids unsafe medical claims.

## Tested Areas

The QA scope covers:

- Homepage UI and content structure.
- Hero layout and responsive behavior.
- Featured Products.
- New Arrivals.
- Collection pages.
- Product pages.
- Product cards.
- Variant pills.
- Powder Form.
- Cart behavior.
- Mobile bottom app bar.
- Shopify Admin editability.
- Product content safety.
- Deployment readiness.

## Required Test URLs

Use these URLs for final verification:

```text
http://127.0.0.1:9292/
http://127.0.0.1:9292/collections/all
http://127.0.0.1:9292/collections/all?page=2
http://127.0.0.1:9292/products/aqarqara
```

Live equivalents:

```text
https://morganics.store/
https://morganics.store/collections/all
https://morganics.store/collections/all?page=2
```

## Findings

### P1 - Final live verification is still required before launch sign-off

Area: Live storefront QA  
Status: Open  
Risk: High

The theme has been built and documented, but a final live QA pass must confirm that the live site matches the intended local behavior.

Impact:

- Customers may see stale theme behavior if the latest files were not pushed.
- Powder Form exclusions may differ between local and live.
- Homepage product sections may have different products/counts on live.

Required fix:

Run a final post-deploy QA pass on:

```text
https://morganics.store/
https://morganics.store/collections/all
https://morganics.store/collections/all?page=2
```

Acceptance criteria:

- Live homepage loads.
- Featured Products shows at least 8 products.
- New Arrivals shows at least 8 products.
- Collection pagination works.
- Product pages render.
- Cart works.

### P1 - Powder Form depends on correct Shopify variant data

Area: Product page / variants  
Status: Open  
Risk: High

Powder Form behavior requires real matching Powder variants.

Valid setup:

```text
100g / Regular
100g / Powder
200g / Regular
200g / Powder
```

Impact:

- If a Powder sibling is missing, customer cannot select Powder for that size.
- If variant options are named inconsistently, Powder switching can fail.
- If price/inventory is wrong on Powder variant, cart will be wrong.

Required fix:

For each powder-supported product, verify:

- Option value is exactly `Powder`.
- Regular sibling exists for every supported size.
- Powder sibling exists for every supported size.
- Powder price is correct.
- Powder inventory is correct.

Acceptance criteria:

- Checking Powder switches to the matching Powder variant.
- Add-to-cart submits the Powder variant.
- Cart line item shows `Powder Form: Yes`.

### P1 - Powder exclusion list must be verified against actual product titles

Area: Product page / product title matching  
Status: Open  
Risk: High

The current theme-level Powder exclusion rule uses product title matching. This blocks Powder Form for the excluded products requested by the store owner.

Impact:

- If a product title changes, exclusion may stop matching.
- If two products contain the same phrase, exclusion can affect both.
- Products containing broad phrases like `Sunflower Seeds` may be blocked as intended, but this should be verified.

Required fix:

Verify these excluded products do not show Powder Form:

```text
Maghaz Badam Gurbandi
Dar Chini Gol
Goond Katira
Anjeer / Fig
Maghaz Chilgoza Half Roasted
Maghaz Chilgoza Full Roasted
Maghaz Akhrot / Walnut
Banana Dried
Mabroom dates
Khajoor Ajwa
Mixed Berries
Cranberry
Honey
Luban
Sogi Gol Mewa
Pista Namkeen
Sarson Black
Elaichi Sabz
Gur
Chilka Ispaghol
Kajo Fry
Kajo Roasted
Kajo Plain
Til Black
Zarishk
Harmal
Saffron
Pista Maghaz
Shakar
Sogi Sundarhani Mewa
Badam Abdul Wahidi
Kali Darakh
Goji Berry
Musabbar
Salajeet
hibiscus herb
Sunflower Seeds
Maghaz Sunflower Seeds
```

Acceptance criteria:

- All excluded products hide Powder Form.
- Non-excluded products with Powder variants show Powder Form.

Recommended future improvement:

Use a Shopify product metafield for exclusion instead of title matching, for example:

```text
custom.disable_powder_form = true
```

This is safer than title-string matching.

### P1 - Mobile bottom app bar overlap must be checked on every key page

Area: Mobile UI  
Status: Open  
Risk: High

The site uses a sticky mobile bottom app bar. Any page without enough bottom padding can hide product cards, pagination, cart controls, or buy buttons.

Required pages:

```text
/
/collections/all
/collections/all?page=2
/products/aqarqara
```

Acceptance criteria:

- Last visible product row scrolls fully above the app bar.
- Pagination remains tappable.
- Add-to-cart controls are not hidden.
- Hero stage is not covered.
- Cart controls are not covered.

### P2 - Homepage product sections require ongoing Admin discipline

Area: Homepage / Shopify theme editor  
Status: Open  
Risk: Medium

Featured Products and New Arrivals are editable through Shopify theme settings. This is correct, but it creates an operational risk if fewer than 8 products are selected or inactive products are used.

Acceptance criteria:

- Featured Products contains at least 8 active products.
- New Arrivals contains at least 8 active products.
- Product images exist.
- Product prices exist.
- Product cards do not show broken media.

Required owner action:

When updating homepage products in Shopify Admin, always verify the homepage after saving.

### P2 - Product content safety requires review before bulk publishing

Area: Product copy / SEO / metafields  
Status: Open  
Risk: Medium

Natural product content can easily drift into unsafe medical claims.

Search for these risky terms:

```text
cure
treat
treatment
cancer
diabetes
testosterone
fertility
sexual
disease
detox
weight loss
blood pressure
cholesterol
guaranteed
miracle
```

Allowed only as part of the required disclaimer:

```text
This product is not intended to diagnose, treat, cure, or prevent any disease.
```

Acceptance criteria:

- No product claims to cure, treat, diagnose, or prevent disease.
- Usage copy is practical.
- Precautions are present.
- SEO descriptions are safe.

### P2 - Product cards must be checked for mixed Urdu/English title wrapping

Area: Product cards / collection pages  
Status: Open  
Risk: Medium

Morganics product titles often mix English and Urdu. This can cause wrapping and spacing issues in product cards.

Acceptance criteria:

- Titles wrap without overflow.
- Cards remain equal enough in height.
- Price and variant chips remain visible.
- No text overlaps images or buttons.

### P3 - QA documents should be kept separate by purpose

Area: Documentation  
Status: Passed  
Risk: Low

The theme now has separate handoff documents:

```text
MORGANICS_SHOPIFY_WEBSITE_GUIDE.md
MORGANICS_UI_AND_STYLING_GUIDE.md
MORGANICS_TECHNICAL_FUNCTIONALITY_GUIDE.md
MORGANICS_CONTENT_GUIDE.md
MORGANICS_QA_AUDIT_REPORT.md
MORGANICS_FINAL_QA_AUDIT.md
```

This separation is useful:

- Website guide: full overview.
- UI guide: styling and responsive rules.
- Technical guide: functionality and implementation.
- Content guide: copy, SEO, safety.
- QA report: checklist and test matrix.
- Final QA audit: findings and sign-off risks.

## Functional Acceptance Criteria

The storefront passes functional QA when:

```text
[ ] Homepage loads without broken layout.
[ ] Hero is correctly sized on mobile.
[ ] Featured Products shows at least 8 products.
[ ] New Arrivals shows at least 8 products.
[ ] /collections/all loads.
[ ] /collections/all?page=2 loads.
[ ] Product page loads.
[ ] Variant pills work.
[ ] Add-to-cart works.
[ ] Cart badge updates.
[ ] Powder Form appears on valid non-excluded products.
[ ] Powder Form stays hidden on excluded products.
[ ] Cart displays Powder Form line item property when selected.
[ ] Mobile bottom app bar does not cover important content.
```

## Content Acceptance Criteria

Product content passes QA when:

```text
[ ] Product title is clear.
[ ] Urdu/English naming is consistent.
[ ] Product description explains use.
[ ] Usage guidance is practical.
[ ] Storage guidance is included.
[ ] Precautions are included.
[ ] FAQs are useful.
[ ] SEO title is readable.
[ ] SEO description is safe.
[ ] No unsafe medical claims are present.
```

## UI Acceptance Criteria

UI passes QA when:

```text
[ ] Header is readable and tappable.
[ ] Bottom app bar is readable and tappable.
[ ] Product cards are aligned.
[ ] Product images load correctly.
[ ] Text does not overflow.
[ ] Buttons do not overflow.
[ ] No content is hidden behind fixed navigation.
[ ] Mobile and desktop layouts both look intentional.
```

## Launch Recommendation

Recommendation: Do not mark as final approved until a live browser QA pass is completed.

The implementation is structurally ready, but final approval should wait for live evidence on:

- Homepage.
- Collection page 1.
- Collection page 2.
- Product with Powder Form.
- Product excluded from Powder Form.
- Cart.
- Mobile bottom app bar.

## Final Sign-Off Format

Use this section after final verification:

```text
Final QA status:
Date:
Tester:
Environment:
Theme:

P0 open issues:
P1 open issues:
P2 open issues:
P3 open issues:

Approved for live:
Approved with conditions:
Not approved:

Notes:
```

---

# Evidence-Based QA Verification Pass

Date: 2026-07-05  
Tester: Codex QA  
Environment used: live public storefront content available from `https://morganics.store` indexed pages  
Local browser automation status: blocked; shell runner and stable Chrome/in-app browser control were not available  
Code changes made during this pass: none

## Verification Method

This pass uses real live storefront page content retrieved from public indexed Shopify pages. It is not a full visual/interactive Playwright pass because the local command runner and stable browser automation were unavailable.

Evidence sources observed:

- Homepage: `https://morganics.store/`
- Product: `https://morganics.store/products/alsi`
- Product: `https://morganics.store/products/ashwagandha`
- Product: `https://morganics.store/products/elaichi-sabz`
- Product: `https://morganics.store/products/musabbar`

## Final Launch Status

Status: Not approved

Reason: The content and page-structure evidence is strong enough to show that the live storefront is populated and functional at a static HTML/content level, but final launch approval requires interactive browser verification for responsive layout, cart operations, Powder Form switching, collection pagination, and bottom app bar overlap. Those tests were not technically executable in this session.

Overall QA score: 72 / 100

## Open Issues

### P0 Open Issues

None confirmed from available evidence.

### P1 Open Issues

1. Interactive cart flow not verified.
2. Powder Form switching and cart line item property not verified.
3. Responsive visual pass not verified across required viewport matrix.
4. `/collections/all` and `/collections/all?page=2` pagination not verified interactively.

### P2 Open Issues

1. Product content contains risky SEO/benefit wording on Alsi: "weight control", "weight management", "detox drinks", "heart wellness", and "metabolism".
2. Ashwagandha page uses claim-heavy language: "Stress Relief Herb", "stress balance", "sleep quality", "mental clarity", and "fitness recovery".
3. Product FAQ sections appear present as a heading, but actual FAQ Q/A content was not visible in the indexed page text.
4. Homepage source shows Featured Products, but New Arrivals section was not visible in the indexed homepage evidence.

### P3 Open Issues

1. Some content appears duplicated between metafield summaries and long descriptions.
2. Category count shows `Oil, Gums & Specialties 0 products` while specialty products such as Musabbar exist elsewhere; taxonomy may need review.

## Homepage Live Test

| Check | Actual Result | Status | Evidence |
| --- | --- | --- | --- |
| Homepage loads correctly | Public homepage content loaded in indexed live result. | Pass | Homepage shows navigation, category menu, hero content, shop routines, featured products, cart shell, footer. |
| Hero looks correct on mobile/desktop | Not visually verifiable in this session. Text/content exists. | Not verified | Homepage includes hero headings `Rooted in Nature`, `Everyday Nourishment`, and `Driven by Wellness`. |
| Featured Products show at least 8 active products | 9 product cards visible in homepage evidence. | Pass | Ajwain, Alsi, American almond, Amla, Aqarqara, Ashwagandha, Badam Abdul Wahidi, Beet Root Powder, Bheray. |
| New Arrivals show at least 8 active products | New Arrivals was not visible in indexed homepage evidence. | Fail / Needs verification | Homepage evidence showed Featured Products but not New Arrivals. |
| Product cards aligned | Not visually verifiable. | Not verified | Product-card content exists with titles, prices, variants, Add to Cart and View links. |
| Prices/images/titles visible | Titles, prices, variants, and image alt text visible. | Pass | Example: `Aqarqara`, `Rs.900.00`, `50g`, `100g`; images have product alt text. |

## Collection Page Test

| Page | Actual Result | Status | Evidence |
| --- | --- | --- | --- |
| `/collections/all` | Could not verify interactively. | Not verified | No stable local or live browser automation available. |
| `/collections/all?page=2` | Could not verify interactively. | Not verified | No stable local or live browser automation available. |
| Pagination works | Not verified. | Not verified | Requires browser interaction. |
| Final row not hidden by bottom app bar | Not verified. | Not verified | Requires viewport screenshot/scroll test. |
| Product cards consistent | Partially evidenced from homepage/product related cards, not collection pages. | Partial | Related product cards show consistent title, price, variant summary, Add to Cart, View Details. |

## Product Page Test

| Category | Product URL | Product | Actual Results | Status |
| --- | --- | --- | --- | --- |
| Seeds | `/products/alsi` | Alsi – السی | Title, images, price, variants, add-to-cart, usage, storage, precautions and related products present. Content has risky weight/detox/heart/metabolism claims. | Pass with content conditions |
| Herbs | `/products/ashwagandha` | Ashwagandha – اشوگندھا | Title, images, price, variants, add-to-cart, usage, storage, precautions and related products present. SEO/benefit claims are too strong. | Pass with content conditions |
| Spices | `/products/elaichi-sabz` | Elaichi Sabz – الائچی سبز | Title, images, price, variants, add-to-cart, usage, storage, precautions and related products present. Content is comparatively safer. | Pass |
| Resins / specialty | `/products/musabbar` | Musabbar – مصبر | Title, images, price, variants, add-to-cart, usage, storage and strong precautions present. Good caution language for specialty item. | Pass |
| Nuts / dry fruits | Homepage evidence only | American almond / Badam Abdul Wahidi | Product cards visible on homepage, but individual product page not verified. | Partial |
| Dates | Homepage evidence only | Ajwa Khajoor | Product appears in hero/category evidence, but individual product page not verified. | Partial |

## Powder Form Deep Test

| Scenario | Actual Result | Status | Evidence |
| --- | --- | --- | --- |
| Product with Powder variants | Not interactively verified. | Not verified | Requires product page JS interaction and cart check. |
| Excluded product | Badam Abdul Wahidi appears in Featured Products and is in the requested exclusion list, but checkbox behavior was not interactively verified. | Not verified | Requires rendered product page inspection. |
| Product without Powder variants | Alsi, Ashwagandha, Elaichi Sabz, Musabbar product content shows Regular variants in sticky product summary; no Powder property observed in static evidence. | Partial | Static evidence shows `100g / Regular` or `50g / Regular`, but not enough to confirm checkbox absence. |
| Missing Powder sibling | No such product identified from available evidence. | Not verified | Requires Admin/product variant inspection or interactive testing. |
| Checkbox appears/hides correctly | Not verified. | Not verified | Requires browser interaction. |
| Variant switches correctly | Not verified. | Not verified | Requires browser interaction. |
| Price updates correctly | Not verified. | Not verified | Requires browser interaction. |
| Add-to-cart adds correct variant | Not verified. | Not verified | Requires cart interaction. |
| Cart shows exactly `Powder Form: Yes` | Not verified. | Not verified | Requires cart interaction after selecting Powder. |
| Powder hidden from normal size chips | Static evidence only shows normal pack sizes, no Powder chip observed. | Partial | Product pages show pack sizes such as `100g`, `200g`, `500g`. |

## Cart Flow Test

| Test | Actual Result | Status | Evidence |
| --- | --- | --- | --- |
| Add regular product | Not interactively verified. | Not verified | Static page includes Add to Cart controls. |
| Add Powder product | Not verified. | Not verified | Requires Powder product interaction. |
| Update quantity | Not verified. | Not verified | Requires cart interaction. |
| Remove item | Not verified. | Not verified | Requires cart interaction. |
| Cart badge update | Not verified. | Not verified | Static evidence shows cart badge starts at `0 Cart`. |
| Checkout button visibility | Static cart shell includes `Checkout` and payment options. | Partial | Product pages include cart drawer text and checkout controls. |
| Mobile bottom app bar overlap | Not verified. | Not verified | Requires screenshots at requested viewports. |

## Responsive Testing Matrix

| Page | 360px Mobile | 390x844 Mobile | 768px Tablet | 1280px Desktop | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Homepage | Not verified | Not verified | Not verified | Not verified | Not verified | Static content loaded, visual layout not tested. |
| `/collections/all` | Not verified | Not verified | Not verified | Not verified | Not verified | Requires browser viewport control. |
| `/collections/all?page=2` | Not verified | Not verified | Not verified | Not verified | Not verified | Requires browser viewport control. |
| Product with Powder Form | Not verified | Not verified | Not verified | Not verified | Not verified | Powder product not interactively identified. |
| Product without Powder Form | Not verified | Not verified | Not verified | Not verified | Partial | Static product pages loaded for Alsi, Ashwagandha, Elaichi, Musabbar. |
| Cart | Not verified | Not verified | Not verified | Not verified | Partial | Static cart drawer content visible in page text. |

## Product Content Audit

| Product | Category | Title Quality | Description Quality | Usage Quality | Storage | Precautions | FAQs | SEO | Metafields | Medical Claim Risk | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Alsi – السی | Seeds | Good bilingual title. | Mixed: useful but includes repeated content and strong claims. | Good practical use instructions. | Present. | Present. | Heading visible, Q/A not visible in evidence. | Risky: title/SEO says `Natural Superfoods`; text includes weight/detox/heart/metabolism. | Present: Best Use Cases, Key Benefits, Usage, Storage, Precautions. | Medium-high | Rewrite benefits/SEO to remove weight control, detox, heart/metabolism claims. |
| Ashwagandha – اشوگندھا | Herbs | Good bilingual title. | Useful but claim-heavy. | Practical but should be framed cautiously. | Present. | Present and appropriate. | Heading visible, Q/A not visible. | Risky: `Stress Relief Herb`, stress/sleep/mental clarity claims. | Present. | High | Soften to traditional-use/practitioner-guided language. |
| Elaichi Sabz – الائچی سبز | Spices | Good bilingual title. | Strong and category-appropriate. | Good culinary usage. | Present. | Present. | Heading visible, Q/A not visible. | Mostly safe. | Present. | Low-medium | Keep, but avoid digestive-health wording where possible. |
| Musabbar – مصبر | Resins / specialty | Good bilingual title. | Good specialty positioning. | Strong caution: practitioner-guided use. | Present. | Strong and appropriate. | Heading visible, Q/A not visible. | Mostly safe. | Present. | Medium | Good direction; keep warning prominent. |
| American almond – مغز بادام امریکن | Nuts / dry fruits | Visible on homepage only. | Product card only verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Unknown | Verify individual product page. |
| Badam Abdul Wahidi – بادام عبدالواحدی | Nuts / dry fruits | Visible on homepage only. | Product card only verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Unknown | Verify individual product page and Powder exclusion. |
| Ajwa Khajoor | Dates | Visible in hero/category evidence only. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Not verified. | Unknown | Verify individual date product page. |

## Final Scorecard

| Area | Score / 10 | Status | Actual Evidence |
| --- | ---: | --- | --- |
| Brand/category fit | 8 | Pass | Homepage positions Morganics around nuts, dates, seeds, herbs, botanicals, pantry staples, COD delivery and Pakistani homes. |
| Product content quality | 6 | Conditional | Product pages are populated, but Alsi and Ashwagandha contain claim-risk language. |
| SEO content | 5 | Conditional | Some SEO titles are useful; Alsi/Ashwagandha are too claim-forward. |
| Homepage UX | 7 | Partial | Homepage content and Featured Products are present; visual/mobile layout and New Arrivals not verified. |
| Collection UX | 4 | Not verified | Collection page interaction and pagination not verified. |
| Product page UX | 7 | Partial | Product pages expose title, images, price, variants, add-to-cart and metafields in static content. |
| Powder Form functionality | 2 | Not verified | Static evidence insufficient; requires JS/cart interaction. |
| Cart flow | 4 | Partial | Cart shell, payment options and checkout controls are present; interaction not verified. |
| Mobile responsiveness | 3 | Not verified | Requires viewport screenshots. |
| Accessibility | 5 | Partial | Image alt text appears; full keyboard/focus/contrast not verified. |
| Visual design consistency | 6 | Partial | Static content and image alt/title structure consistent; rendered alignment not verified. |
| Technical stability | 6 | Partial | Public pages are indexable and content-rich; JS/cart behavior not verified. |
| Shopify data quality | 6 | Conditional | Product metafields and variants exist; some category/taxonomy/content claim issues remain. |

## Launch Decision

Final answer: Not approved

This is not a rejection of the build quality. It is a QA evidence decision. The site has strong content/page coverage, but final approval requires interactive browser evidence for the exact areas the store depends on: responsive layout, collection pagination, Powder Form variant switching, cart updates, and checkout button visibility.

## Required Before Approval

1. Run a real Playwright or browser-device pass at 360px, 390x844, 768px, and 1280px.
2. Verify `/collections/all` and `/collections/all?page=2` visually and interactively.
3. Identify one real Powder-enabled product and test full Powder-to-cart flow.
4. Verify excluded products hide Powder Form.
5. Rewrite claim-risk content on Alsi and Ashwagandha.
6. Verify New Arrivals section renders at least 8 active products on the live homepage.
