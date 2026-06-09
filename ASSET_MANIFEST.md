# Morganics Shopify Asset Manifest

Phase: 1 - safe asset preparation  
Source: `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website`  
Destination: `02_SHOPIFY_THEME_BUILD/assets/morganics`

No Liquid templates were changed. These files are staged only; they are not activated by the Shopify theme yet.

## Copy Summary

- Total copied files: 174
- Total copied size: approximately 288 MB
- Excluded: `.DS_Store`, `*.bak-*`, archive/demo folders, test output, and `assets/products.js`
- Existing starter theme assets in `02_SHOPIFY_THEME_BUILD/assets` were left untouched.

## Copied Folders

- `assets/morganics/banners` - collection/category banners and banner manifest for later Shopify collection sections.
- `assets/morganics/category-icons` - homepage category grid, routine cards, and mobile drawer category imagery.
- `assets/morganics/css-reference` - approved static CSS reference files to preserve design tokens and approved styling during later conversion.
- `assets/morganics/data-reference` - ingredient JSON data for the visual ingredient library only.
- `assets/morganics/fonts` - approved brand/display font asset used by the static design system.
- `assets/morganics/hero-banner` - legacy/supporting hero image kept for audit because it exists in approved assets.
- `assets/morganics/ingredients` - ingredient batch images used by the ingredient library.
- `assets/morganics/js-reference` - approved static JS reference files for later refactor; not active and not linked from Liquid.
- `assets/morganics/lifestyle` - lifestyle routine imagery kept for section parity checks.
- `assets/morganics/logos` - approved Morganics logo files for header/footer/brand use.
- `assets/morganics/morganics-hero` - approved layered homepage hero images.
- `assets/morganics/products` - product images for Shopify product media import.
- `assets/morganics/review-images` - customer story/review carousel imagery.
- `assets/morganics/video` - hero/routine video asset used by the static site.

## Folder Counts

| Folder | Files | Why needed |
| --- | ---: | --- |
| `assets/morganics/banners` | 25 | Collection/category banner visuals and source manifest. |
| `assets/morganics/category-icons` | 16 | Category cards, routine cards, mobile drawer category visuals. |
| `assets/morganics/css-reference` | 4 | Static design reference; later CSS port source. |
| `assets/morganics/data-reference` | 1 | Ingredient library data reference. |
| `assets/morganics/fonts` | 1 | Brand/display font reference. |
| `assets/morganics/hero-banner` | 1 | Supporting hero/banner visual retained for audit. |
| `assets/morganics/ingredients` | 6 | Ingredient library batch images. |
| `assets/morganics/js-reference` | 4 | Static behavior reference; not live. |
| `assets/morganics/lifestyle` | 2 | Routine/lifestyle imagery retained for parity checks. |
| `assets/morganics/logos` | 3 | Header, footer, and horizontal logo assets. |
| `assets/morganics/morganics-hero` | 15 | Approved layered hero artwork. |
| `assets/morganics/products` | 72 | Product media import source. |
| `assets/morganics/review-images` | 23 | Customer story/review visuals. |
| `assets/morganics/video` | 1 | Hero reveal video. |

## Full Copied File Inventory

```text
assets/morganics-banners-banner-manifest.json
assets/morganics-banners-berries-fruits.jpg
assets/morganics-banners-berries-fruits.png
assets/morganics-banners-botanicals-heritage.jpg
assets/morganics-banners-botanicals-heritage.png
assets/morganics-banners-cold-pressed-oils.jpg
assets/morganics-banners-cold-pressed-oils.png
assets/morganics-banners-dry-fruits-dates-sogi.jpg
assets/morganics-banners-dry-fruits-dates-sogi.png
assets/morganics-banners-harmal-guggul-loban.jpg
assets/morganics-banners-harmal-guggul-loban.png
assets/morganics-banners-herbs-rituals.jpg
assets/morganics-banners-herbs-rituals.png
assets/morganics-banners-natural-sweeteners-salts.jpg
assets/morganics-banners-natural-sweeteners-salts.png
assets/morganics-banners-nuts-dry-fruits.jpg
assets/morganics-banners-nuts-dry-fruits.png
assets/morganics-banners-oils-gums-specialties.jpg
assets/morganics-banners-oils-gums-specialties.png
assets/morganics-banners-premium-snacks-grains.jpg
assets/morganics-banners-premium-snacks-grains.png
assets/morganics-banners-roots-adaptogens.jpg
assets/morganics-banners-roots-adaptogens.png
assets/morganics-banners-seeds-grains.jpg
assets/morganics-banners-seeds-grains.png
assets/morganics-category-icons-8.png
assets/morganics-category-icons-9.png
assets/morganics-category-icons-dry-fruits-icon.png
assets/morganics-category-icons-dry-fruits.png
assets/morganics-category-icons-herbs-botanicals-icon.png
assets/morganics-category-icons-herbs-botanicals.png
assets/morganics-category-icons-natural-sweeteners-icon.png
assets/morganics-category-icons-natural-sweeteners.png
assets/morganics-category-icons-nuts-icon.png
assets/morganics-category-icons-nuts.png
assets/morganics-category-icons-oils-gums-specialties-icon.png
assets/morganics-category-icons-oils-gums-specialties.png
assets/morganics-category-icons-roots-adaptogens-icon.png
assets/morganics-category-icons-roots-adaptogens.png
assets/morganics-category-icons-seeds-grains-icon.png
assets/morganics-category-icons-seeds-grains.png
assets/morganics/css-reference/MORGANICS_DESIGN_TOKENS.css
assets/morganics/css-reference/hero-v2.css
assets/morganics/css-reference/mob-hero-fix.css
assets/morganics/css-reference/site.css
assets/morganics/data-reference/morganicsIngredients.json
assets/morganics-fonts-Brown-Beige.otf
assets/morganics-hero-banner-hero-image.png
assets/morganics-ingredients-batch-1.png
assets/morganics-ingredients-batch-2.png
assets/morganics-ingredients-batch-3.png
assets/morganics-ingredients-batch-4.png
assets/morganics-ingredients-batch-5.png
assets/morganics-ingredients-batch-6.png
assets/morganics/js-reference/ingredientCarousel.js
assets/morganics/js-reference/morganicsIngredients.js
assets/morganics/js-reference/reviews.js
assets/morganics/js-reference/site.js
assets/morganics-lifestyle-family-routine.png
assets/morganics-lifestyle-family-routine1.png
assets/morganics-logos-morganics-logo-footer.png
assets/morganics-logos-morganics-logo-forest-horizontal.png
assets/morganics-logos-morganics-logo-header.png
assets/morganics-morganics-hero-almond.png
assets/morganics-morganics-hero-bg-gradient.png
assets/morganics-morganics-hero-black-raisin.png
assets/morganics-morganics-hero-cashew.png
assets/morganics-morganics-hero-date.png
assets/morganics-morganics-hero-dryfruit-pile.png
assets/morganics-morganics-hero-fig.png
assets/morganics-morganics-hero-golden-raisin.png
assets/morganics-morganics-hero-pistachio.png
assets/morganics-morganics-hero-plant-left-top.png
assets/morganics-morganics-hero-plant-left.png
assets/morganics-morganics-hero-plant-right-bottom.png
assets/morganics-morganics-hero-plant-right.png
assets/morganics-morganics-hero-pouch.png
assets/morganics-morganics-hero-stone.png
assets/morganics-products-01-zarishk.jpg
assets/morganics-products-02-kajo-roasted.jpg
assets/morganics-products-03-hareer-sabaz.jpg
assets/morganics-products-04-kajo-fry.jpg
assets/morganics-products-05-chasko-herb.jpg
assets/morganics-products-06-ginseng-white.jpg
assets/morganics-products-07-ashwagandha.jpg
assets/morganics-products-08-gur.jpg
assets/morganics-products-09-konch.jpg
assets/morganics-products-10-sarson-black.jpg
assets/morganics-products-11-luban.jpg
assets/morganics-products-12-musabbar.jpg
assets/morganics-products-13-munakka-black.jpg
assets/morganics-products-14-almond-with-shell.jpg
assets/morganics-products-15-sogi-big-mewa.jpg
assets/morganics-products-16-pista-maghaz.jpg
assets/morganics-products-17-kajo-sada.jpg
assets/morganics-products-18-sikakai.jpg
assets/morganics-products-19-harmal.jpg
assets/morganics-products-20-amla.jpg
assets/morganics-products-21-moringa.jpg
assets/morganics-products-22-satawar.jpg
assets/morganics-products-23-fruit-salt.jpg
assets/morganics-products-24-til-black.jpg
assets/morganics-products-25-chilka-ispaghol.jpg
assets/morganics-products-26-elaichi-sabz.jpg
assets/morganics-products-27-pista-namkeen.jpg
assets/morganics-products-28-char-maghaz.jpg
assets/morganics-products-29-sogi-small-mewa.jpg
assets/morganics-products-30-moosli-white.jpg
assets/morganics-products-31-tukhm-methi.jpg
assets/morganics-products-32-mustard-seeds.jpg
assets/morganics-products-33-multani-mitti.jpg
assets/morganics-products-34-badam-giri-gurbandi.jpg
assets/morganics-products-35-guggul.jpg
assets/morganics-products-36-rosemary-leaves.jpg
assets/morganics-products-37-bheray.jpg
assets/morganics-products-38-salab-punja.jpg
assets/morganics-products-39-quinoa.jpg
assets/morganics-products-40-kalonji.jpg
assets/morganics-products-41-alsi.jpg
assets/morganics-products-42-ajwain.jpg
assets/morganics-products-43-american-almonds.jpg
assets/morganics-products-44-ginseng-root-red.jpg
assets/morganics-products-45-salab-misri.jpg
assets/morganics-products-46-dar-chini-gil-gol.jpg
assets/morganics-products-47-saffron.jpg
assets/morganics-products-48-phool-makhana.jpg
assets/morganics-products-49-goond-katira.jpg
assets/morganics-products-50-anjeer-fig.jpg
assets/morganics-products-51-maghaz-chilgoza.jpg
assets/morganics-products-52-maghaz-akhrot-walnut.jpg
assets/morganics-products-53-pecan-nut.jpg
assets/morganics-products-54-brazil-nuts.jpg
assets/morganics-products-55-banana-dried.jpg
assets/morganics-products-56-mixed-dried-fruits.jpg
assets/morganics-products-57-mabroom-dates.jpg
assets/morganics-products-58-khajoor-ajwa.jpg
assets/morganics-products-59-sunflower-seeds.jpg
assets/morganics-products-60-daliya-oats.jpg
assets/morganics-products-61-hibiscus-herb.jpg
assets/morganics-products-62-ginkgo-biloba.jpg
assets/morganics-products-63-aqarqara.jpg
assets/morganics-products-64-triphala-blend.jpg
assets/morganics-products-65-maca-root-whole.jpg
assets/morganics-products-66-maca-root-powder.jpg
assets/morganics-products-67-salajeet.jpg
assets/morganics-products-68-goji-berry.jpg
assets/morganics-products-69-mixed-berries.jpg
assets/morganics-products-70-cranberry.jpg
assets/morganics-products-71-shakar.jpg
assets/morganics-products-72-honey.jpg
assets/morganics-review-images-ali-athlete.jpg
assets/morganics-review-images-athlete-promoting-morganics-on-track.png
assets/morganics-review-images-ayesha-kitchen.jpg
assets/morganics-review-images-bright-morning-in-a-welcoming-kitchen.png
assets/morganics-review-images-cozy-moments-with-morganics-snack-pack.png
assets/morganics-review-images-dr-hira-nutritionist.jpg
assets/morganics-review-images-elder-couple-sofa.jpg
assets/morganics-review-images-elder-couple.jpg
assets/morganics-review-images-herbal-nutrition-by-morganics-brand.png
assets/morganics-review-images-iqra-tennis.jpg
assets/morganics-review-images-mahnoor-creator.jpg
assets/morganics-review-images-mahnoor-influencer-camera.jpg
assets/morganics-review-images-modern-office-with-morganics-product-display.png
assets/morganics-review-images-mother-son-tv-lounge.jpg
assets/morganics-review-images-mother-son.jpg
assets/morganics-review-images-promoting-fitness-with-morganics-snack.png
assets/morganics-review-images-saad-school-boy.jpg
assets/morganics-review-images-smiling-boy-with-morganics-snack-pouch.png
assets/morganics-review-images-smiling-couple-with-morganics-product-package.png
assets/morganics-review-images-tennis-and-wellness-on-a-sunny-day.png
assets/morganics-review-images-umar-office.jpg
assets/morganics-review-images-warm-product-demo-in-cosy-setting.png
assets/morganics-review-images-zain-gym.jpg
assets/morganics-video-pouch-reveal.mp4
```

## Not Copied

- `assets/products.js` - intentionally not copied because Shopify must become the live product/catalog source.
- `assets/products.js.bak-*` - backup product files excluded.
- `assets/site.js.bak-*` - backup JS files excluded.
- `.DS_Store` files - metadata excluded.
- `archive-unused-pages` - unused demo/archive material excluded.
- `test-results` - QA output excluded.
- `scripts` and `src` - build/source helpers excluded because Phase 1 is visual asset preparation only.
