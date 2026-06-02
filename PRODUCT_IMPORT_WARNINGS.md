# Product Import Warnings

Source file: `01_FRONTEND_MASTER_DO_NOT_TOUCH/Morganics_Ecommerce_Website/assets/products.js`
Parsed products: 81
Shopify product CSV rows: 161
Warnings generated: 254

## Summary

- Generated variant pricing: 80
- Image URL requires public hosting: 81
- Inactive source status: 5
- Medical or health-risk language review: 81
- Missing Urdu name: 7

## Import-Critical Notes

- Image Src values use `https://morganics.store/...` source paths. The current storefront redirects protected asset requests to `/password`, so product images may not import until the image URLs are made public or replaced with stable CDN URLs.
- Variant prices not present in `products.js` were generated proportionally from the base size and base price. Review these prices before Shopify Admin import.
- Inventory quantity is set to `0` with Shopify inventory tracking enabled and inventory policy `deny`; real inventory must be entered in Shopify before publishing.
- Inactive source products are mapped to Shopify `draft` status and `Published=FALSE`.

## Detailed Warnings

| Severity | Handle | Product | Issue | Detail |
| --- | --- | --- | --- | --- |
| High | zarishk-imported | Zarishk Imported | Image URL requires public hosting | https://morganics.store/assets/products/01-zarishk.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | kajo-roasted | Kajo Roasted | Image URL requires public hosting | https://morganics.store/assets/products/02-kajo-roasted.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | hareer-sabaz | Hareer Sabaz | Image URL requires public hosting | https://morganics.store/assets/products/03-hareer-sabaz.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | kajo-fry | Kajo Fry | Image URL requires public hosting | https://morganics.store/assets/products/04-kajo-fry.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | chasko-herb | Chasko Herb | Image URL requires public hosting | https://morganics.store/assets/products/05-chasko-herb.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ginseng-white | Ginseng White | Image URL requires public hosting | https://morganics.store/assets/products/06-ginseng-white.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ashwagandha | Ashwagandha | Image URL requires public hosting | https://morganics.store/assets/products/07-ashwagandha.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | gur | Gur | Image URL requires public hosting | https://morganics.store/assets/products/08-gur.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | konch | Konch | Image URL requires public hosting | https://morganics.store/assets/products/09-konch.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sarson-black | Sarson Black | Image URL requires public hosting | https://morganics.store/assets/products/10-sarson-black.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | luban | Luban | Image URL requires public hosting | https://morganics.store/assets/products/11-luban.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | musabbar | Musabbar | Image URL requires public hosting | https://morganics.store/assets/products/12-musabbar.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | munaqqa | Munaqqa | Image URL requires public hosting | https://morganics.store/assets/products/13-munakka-black.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | badam-abdul-wahidi | Badam Abdul Wahidi | Image URL requires public hosting | https://morganics.store/assets/products/14-almond-with-shell.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sogi-big-kishmish-mewa | Sogi Big Kishmish Mewa | Image URL requires public hosting | https://morganics.store/assets/products/15-sogi-big-mewa.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | pista-maghaz | Pista Maghaz | Image URL requires public hosting | https://morganics.store/assets/products/16-pista-maghaz.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | kajo-sada | Kajo Sada | Image URL requires public hosting | https://morganics.store/assets/products/17-kajo-sada.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sikakai | Sikakai | Image URL requires public hosting | https://morganics.store/assets/products/18-sikakai.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | harmal | Harmal | Image URL requires public hosting | https://morganics.store/assets/products/19-harmal.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | amla | Amla | Image URL requires public hosting | https://morganics.store/assets/products/20-amla.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | moringa | Moringa | Image URL requires public hosting | https://morganics.store/assets/products/21-moringa.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | satawar | Satawar | Image URL requires public hosting | https://morganics.store/assets/products/22-satawar.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | fruit-salt | Fruit Salt | Image URL requires public hosting | https://morganics.store/assets/products/23-fruit-salt.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | til-black | Til Black | Image URL requires public hosting | https://morganics.store/assets/products/24-til-black.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | chilka-ispaghol | Chilka Ispaghol | Image URL requires public hosting | https://morganics.store/assets/products/25-chilka-ispaghol.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sabz-elaichi | Sabz Elaichi | Image URL requires public hosting | https://morganics.store/assets/products/26-elaichi-sabz.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | pista-namkeen-roasted | Pista Namkeen Roasted | Image URL requires public hosting | https://morganics.store/assets/products/27-pista-namkeen.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | four-seeds | Four Seeds | Image URL requires public hosting | https://morganics.store/assets/products/28-char-maghaz.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sogi-small-kishmish-mewa | Sogi Small Kishmish Mewa | Image URL requires public hosting | https://morganics.store/assets/products/29-sogi-small-mewa.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | moosli-white | Moosli White | Image URL requires public hosting | https://morganics.store/assets/products/30-moosli-white.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | tukhm-methi | Tukhm Methi | Image URL requires public hosting | https://morganics.store/assets/products/31-tukhm-methi.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sarson-yellow | Sarson Yellow | Image URL requires public hosting | https://morganics.store/assets/products/32-mustard-seeds.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | multani-mitti | Multani Mitti | Image URL requires public hosting | https://morganics.store/assets/products/33-multani-mitti.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maghaz-badam-desi-gurbandi | Maghaz Badam Desi Gurbandi | Image URL requires public hosting | https://morganics.store/assets/products/34-badam-giri-gurbandi.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | guggul | Guggul | Image URL requires public hosting | https://morganics.store/assets/products/35-guggul.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | rosemary-leaves | Rosemary Leaves | Image URL requires public hosting | https://morganics.store/assets/products/36-rosemary-leaves.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | bheray | Bheray | Image URL requires public hosting | https://morganics.store/assets/products/37-bheray.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | salab-punja | Salab Punja | Image URL requires public hosting | https://morganics.store/assets/products/38-salab-punja.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | quinoa | Quinoa | Image URL requires public hosting | https://morganics.store/assets/products/39-quinoa.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | kalonji | Kalonji | Image URL requires public hosting | https://morganics.store/assets/products/40-kalonji.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | alsi | Alsi | Image URL requires public hosting | https://morganics.store/assets/products/41-alsi.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ajwain | Ajwain | Image URL requires public hosting | https://morganics.store/assets/products/42-ajwain.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | california-almonds-maghaz-badam | California Almonds Maghaz Badam | Image URL requires public hosting | https://morganics.store/assets/products/43-american-almonds.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ginseng-root-red | Ginseng Root Red | Image URL requires public hosting | https://morganics.store/assets/products/44-ginseng-root-red.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | salab-misri | Salab Misri | Image URL requires public hosting | https://morganics.store/assets/products/45-salab-misri.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dar-chini-cigar-gol | Dar Chini Cigar Gol | Image URL requires public hosting | https://morganics.store/assets/products/46-dar-chini-gil-gol.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | saffron | Saffron | Image URL requires public hosting | https://morganics.store/assets/products/47-saffron.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | phool-makhana | Phool Makhana | Image URL requires public hosting | https://morganics.store/assets/products/48-phool-makhana.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | goond-katira | Goond Katira | Image URL requires public hosting | https://morganics.store/assets/products/49-goond-katira.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | anjeer | Anjeer | Image URL requires public hosting | https://morganics.store/assets/products/50-anjeer-fig.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maghaz-chilgoza-half-roast | Maghaz Chilgoza Half Roast | Image URL requires public hosting | https://morganics.store/assets/products/51-maghaz-chilgoza.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maghaz-akhrot | Maghaz Akhrot | Image URL requires public hosting | https://morganics.store/assets/products/52-maghaz-akhrot-walnut.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | pecan-nuts | Pecan Nuts | Image URL requires public hosting | https://morganics.store/assets/products/53-pecan-nut.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | brazil-nuts | Brazil Nuts | Image URL requires public hosting | https://morganics.store/assets/products/54-brazil-nuts.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dried-banana | Dried Banana | Image URL requires public hosting | https://morganics.store/assets/products/55-banana-dried.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | mixed-dried-fruits | Mixed Dried Fruits | Image URL requires public hosting | https://morganics.store/assets/products/56-mixed-dried-fruits.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | mabroom-khajoor | Mabroom Khajoor | Image URL requires public hosting | https://morganics.store/assets/products/57-mabroom-dates.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ajwa-dates | Ajwa Dates | Image URL requires public hosting | https://morganics.store/assets/products/58-khajoor-ajwa.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | sunflower-seeds | Sunflower Seeds | Image URL requires public hosting | https://morganics.store/assets/products/59-sunflower-seeds.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | daliya-oats | Daliya Oats | Image URL requires public hosting | https://morganics.store/assets/products/60-daliya-oats.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | hibiscus-herb | Hibiscus Herb | Image URL requires public hosting | https://morganics.store/assets/products/61-hibiscus-herb.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | ginkgo-biloba | Ginkgo Biloba | Image URL requires public hosting | https://morganics.store/assets/products/62-ginkgo-biloba.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | aqarqara | Aqarqara | Image URL requires public hosting | https://morganics.store/assets/products/63-aqarqara.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | triphala-blend | Triphala Blend | Image URL requires public hosting | https://morganics.store/assets/products/64-triphala-blend.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maca-root-whole | Maca Root Whole | Image URL requires public hosting | https://morganics.store/assets/products/65-maca-root-whole.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maca-root-powder | Maca Root Powder | Image URL requires public hosting | https://morganics.store/assets/products/66-maca-root-powder.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | salajeet | Salajeet | Image URL requires public hosting | https://morganics.store/assets/products/67-salajeet.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | goji-berry | Goji Berry | Image URL requires public hosting | https://morganics.store/assets/products/68-goji-berry.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | mixed-berries | Mixed Berries | Image URL requires public hosting | https://morganics.store/assets/products/69-mixed-berries.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | cranberry | Cranberry | Image URL requires public hosting | https://morganics.store/assets/products/70-cranberry.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | shakar | Shakar | Image URL requires public hosting | https://morganics.store/assets/products/71-shakar.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | honey | Honey | Image URL requires public hosting | https://morganics.store/assets/products/72-honey.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maghaz-badam-abdul-wahidi | Maghaz Badam Abdul Wahidi | Image URL requires public hosting | https://morganics.store/assets/products/14-almond-with-shell.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | maghaz-chilgoza-full-roast | Maghaz Chilgoza Full Roast | Image URL requires public hosting | https://morganics.store/assets/products/51-maghaz-chilgoza.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dried-strawberry | Dried Strawberry | Image URL requires public hosting | https://morganics.store/assets/products/56-mixed-dried-fruits.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dried-kiwi | Dried Kiwi | Image URL requires public hosting | https://morganics.store/assets/products/56-mixed-dried-fruits.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dried-pineapple | Dried Pineapple | Image URL requires public hosting | https://morganics.store/assets/products/56-mixed-dried-fruits.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | dried-mango | Dried Mango | Image URL requires public hosting | https://morganics.store/assets/products/56-mixed-dried-fruits.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | zarishk-pakistani | Zarishk Pakistani | Image URL requires public hosting | https://morganics.store/assets/products/01-zarishk.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | chia-seeds | Chia Seeds | Image URL requires public hosting | https://morganics.store/assets/products/41-alsi.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | pumpkin-seeds | Pumpkin Seeds | Image URL requires public hosting | https://morganics.store/assets/products/59-sunflower-seeds.jpg currently depends on public access and may be blocked by the password-protected storefront |
| High | zarishk-imported | Zarishk Imported | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | zarishk-imported | Zarishk Imported | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | kajo-roasted | Kajo Roasted | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | kajo-roasted | Kajo Roasted | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | kajo-roasted | Kajo Roasted | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| Medium | hareer-sabaz | Hareer Sabaz | Missing Urdu name | No urduName or urduTitle found |
| Review | hareer-sabaz | Hareer Sabaz | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | kajo-fry | Kajo Fry | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | kajo-fry | Kajo Fry | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | kajo-fry | Kajo Fry | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| Review | chasko-herb | Chasko Herb | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Medium | ginseng-white | Ginseng White | Missing Urdu name | No urduName or urduTitle found |
| Review | ginseng-white | Ginseng White | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | ashwagandha | Ashwagandha | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | gur | Gur | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | konch | Konch | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | sarson-black | Sarson Black | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | sarson-black | Sarson Black | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | sarson-black | Sarson Black | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Medium | luban | Luban | Missing Urdu name | No urduName or urduTitle found |
| Review | luban | Luban | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | musabbar | Musabbar | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | munaqqa | Munaqqa | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | munaqqa | Munaqqa | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | badam-abdul-wahidi | Badam Abdul Wahidi | Generated variant pricing | 1kg price generated proportionally from 500g base price |
| Review | badam-abdul-wahidi | Badam Abdul Wahidi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | sogi-big-kishmish-mewa | Sogi Big Kishmish Mewa | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | sogi-big-kishmish-mewa | Sogi Big Kishmish Mewa | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | pista-maghaz | Pista Maghaz | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | pista-maghaz | Pista Maghaz | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | pista-maghaz | Pista Maghaz | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | kajo-sada | Kajo Sada | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | kajo-sada | Kajo Sada | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | kajo-sada | Kajo Sada | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| Medium | sikakai | Sikakai | Missing Urdu name | No urduName or urduTitle found |
| Review | sikakai | Sikakai | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| Review | harmal | Harmal | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Medium | amla | Amla | Missing Urdu name | No urduName or urduTitle found |
| Review | amla | Amla | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| Review | moringa | Moringa | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| Review | satawar | Satawar | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | fruit-salt | Fruit Salt | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | til-black | Til Black | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | til-black | Til Black | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | til-black | Til Black | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | chilka-ispaghol | Chilka Ispaghol | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | chilka-ispaghol | Chilka Ispaghol | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | chilka-ispaghol | Chilka Ispaghol | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| High | sabz-elaichi | Sabz Elaichi | Generated variant pricing | 100g price generated proportionally from 50g base price |
| High | sabz-elaichi | Sabz Elaichi | Generated variant pricing | 200g price generated proportionally from 50g base price |
| High | sabz-elaichi | Sabz Elaichi | Generated variant pricing | 500g price generated proportionally from 50g base price |
| Review | sabz-elaichi | Sabz Elaichi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | pista-namkeen-roasted | Pista Namkeen Roasted | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | pista-namkeen-roasted | Pista Namkeen Roasted | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | pista-namkeen-roasted | Pista Namkeen Roasted | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | four-seeds | Four Seeds | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | four-seeds | Four Seeds | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | four-seeds | Four Seeds | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Review | four-seeds | Four Seeds | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | sogi-small-kishmish-mewa | Sogi Small Kishmish Mewa | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | sogi-small-kishmish-mewa | Sogi Small Kishmish Mewa | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | moosli-white | Moosli White | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | tukhm-methi | Tukhm Methi | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | tukhm-methi | Tukhm Methi | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | tukhm-methi | Tukhm Methi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | sarson-yellow | Sarson Yellow | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | sarson-yellow | Sarson Yellow | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | sarson-yellow | Sarson Yellow | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | multani-mitti | Multani Mitti | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | maghaz-badam-desi-gurbandi | Maghaz Badam Desi Gurbandi | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | maghaz-badam-desi-gurbandi | Maghaz Badam Desi Gurbandi | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | maghaz-badam-desi-gurbandi | Maghaz Badam Desi Gurbandi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| Medium | guggul | Guggul | Missing Urdu name | No urduName or urduTitle found |
| Review | guggul | Guggul | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, nursing, allerg |
| Review | rosemary-leaves | Rosemary Leaves | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| Medium | bheray | Bheray | Missing Urdu name | No urduName or urduTitle found |
| Review | bheray | Bheray | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | salab-punja | Salab Punja | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | quinoa | Quinoa | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | quinoa | Quinoa | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | quinoa | Quinoa | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | kalonji | Kalonji | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | kalonji | Kalonji | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | kalonji | Kalonji | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | alsi | Alsi | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | alsi | Alsi | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | alsi | Alsi | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Review | alsi | Alsi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | ajwain | Ajwain | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| High | california-almonds-maghaz-badam | California Almonds Maghaz Badam | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | california-almonds-maghaz-badam | California Almonds Maghaz Badam | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | california-almonds-maghaz-badam | California Almonds Maghaz Badam | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| Review | ginseng-root-red | Ginseng Root Red | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | salab-misri | Salab Misri | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | dar-chini-cigar-gol | Dar Chini Cigar Gol | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | dar-chini-cigar-gol | Dar Chini Cigar Gol | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | dar-chini-cigar-gol | Dar Chini Cigar Gol | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | saffron | Saffron | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| High | phool-makhana | Phool Makhana | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | phool-makhana | Phool Makhana | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | phool-makhana | Phool Makhana | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | goond-katira | Goond Katira | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | anjeer | Anjeer | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | anjeer | Anjeer | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | anjeer | Anjeer | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | maghaz-chilgoza-half-roast | Maghaz Chilgoza Half Roast | Generated variant pricing | 200g price generated proportionally from 100g base price |
| Review | maghaz-chilgoza-half-roast | Maghaz Chilgoza Half Roast | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | maghaz-akhrot | Maghaz Akhrot | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | maghaz-akhrot | Maghaz Akhrot | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | maghaz-akhrot | Maghaz Akhrot | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | pecan-nuts | Pecan Nuts | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Medium | pecan-nuts | Pecan Nuts | Inactive source status | Mapped to Shopify draft. Source status: inactive |
| Review | pecan-nuts | Pecan Nuts | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | brazil-nuts | Brazil Nuts | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Medium | brazil-nuts | Brazil Nuts | Inactive source status | Mapped to Shopify draft. Source status: inactive |
| Review | brazil-nuts | Brazil Nuts | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | dried-banana | Dried Banana | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | dried-banana | Dried Banana | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| Medium | mixed-dried-fruits | Mixed Dried Fruits | Inactive source status | Mapped to Shopify draft. Source status: inactive |
| Review | mixed-dried-fruits | Mixed Dried Fruits | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | mabroom-khajoor | Mabroom Khajoor | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | mabroom-khajoor | Mabroom Khajoor | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | mabroom-khajoor | Mabroom Khajoor | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | ajwa-dates | Ajwa Dates | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | ajwa-dates | Ajwa Dates | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | ajwa-dates | Ajwa Dates | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | sunflower-seeds | Sunflower Seeds | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | sunflower-seeds | Sunflower Seeds | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | sunflower-seeds | Sunflower Seeds | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Review | sunflower-seeds | Sunflower Seeds | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | daliya-oats | Daliya Oats | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | daliya-oats | Daliya Oats | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | daliya-oats | Daliya Oats | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Medium | daliya-oats | Daliya Oats | Inactive source status | Mapped to Shopify draft. Source status: inactive |
| Review | daliya-oats | Daliya Oats | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | hibiscus-herb | Hibiscus Herb | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing |
| Review | ginkgo-biloba | Ginkgo Biloba | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | aqarqara | Aqarqara | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | triphala-blend | Triphala Blend | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, medical |
| Review | maca-root-whole | Maca Root Whole | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | maca-root-powder | Maca Root Powder | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, pregnant, nursing, allerg |
| Review | salajeet | Salajeet | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, medical, nursing, allerg |
| Review | goji-berry | Goji Berry | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| Review | mixed-berries | Mixed Berries | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| Review | cranberry | Cranberry | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| Review | shakar | Shakar | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| Review | honey | Honey | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | maghaz-badam-abdul-wahidi | Maghaz Badam Abdul Wahidi | Generated variant pricing | 500g price generated proportionally from 200g base price |
| High | maghaz-badam-abdul-wahidi | Maghaz Badam Abdul Wahidi | Generated variant pricing | 1kg price generated proportionally from 200g base price |
| Review | maghaz-badam-abdul-wahidi | Maghaz Badam Abdul Wahidi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | maghaz-chilgoza-full-roast | Maghaz Chilgoza Full Roast | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | maghaz-chilgoza-full-roast | Maghaz Chilgoza Full Roast | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Review | maghaz-chilgoza-full-roast | Maghaz Chilgoza Full Roast | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, allerg |
| High | dried-strawberry | Dried Strawberry | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | dried-strawberry | Dried Strawberry | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | dried-kiwi | Dried Kiwi | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | dried-kiwi | Dried Kiwi | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | dried-pineapple | Dried Pineapple | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | dried-pineapple | Dried Pineapple | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | dried-mango | Dried Mango | Generated variant pricing | 500g price generated proportionally from 200g base price |
| Review | dried-mango | Dried Mango | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | zarishk-pakistani | Zarishk Pakistani | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | zarishk-pakistani | Zarishk Pakistani | Generated variant pricing | 500g price generated proportionally from 100g base price |
| Medium | zarishk-pakistani | Zarishk Pakistani | Inactive source status | Mapped to Shopify draft. Source status: inactive |
| Review | zarishk-pakistani | Zarishk Pakistani | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine, sugar intake |
| High | chia-seeds | Chia Seeds | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | chia-seeds | Chia Seeds | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | chia-seeds | Chia Seeds | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Review | chia-seeds | Chia Seeds | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
| High | pumpkin-seeds | Pumpkin Seeds | Generated variant pricing | 200g price generated proportionally from 100g base price |
| High | pumpkin-seeds | Pumpkin Seeds | Generated variant pricing | 500g price generated proportionally from 100g base price |
| High | pumpkin-seeds | Pumpkin Seeds | Generated variant pricing | 1kg price generated proportionally from 100g base price |
| Review | pumpkin-seeds | Pumpkin Seeds | Medical or health-risk language review | diagnose, cure, treat, prevent, disease, medicine |
