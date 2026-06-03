const allProducts = window.MORGANICS_PRODUCTS || [];
const products = allProducts.filter(p => p.status !== 'inactive' && p.active !== false && p.isActive !== false);
const money = n => `Rs ${Number(n||0).toLocaleString('en-PK')}`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const qs = new URLSearchParams(location.search);
const productUrl = p => `product.html?id=${encodeURIComponent(p.id)}`;
const categoryUrl = cat => `category.html?category=${encodeURIComponent(cat)}`;
const CONTACT = {
  phoneDisplay: '+92 322 3338110',
  phoneTel: '+923223338110',
  whatsappDigits: '923223338110',
  website: 'www.morganics.store',
  websiteUrl: 'https://www.morganics.store',
  hello: 'hello@morganics.store',
  support: 'support@morganics.store'
};
function siteRootPath(){return location.pathname.includes('/ingredient-carousel/') ? '../' : '';}
function whatsappInquiryUrl(message){return `https://wa.me/${CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;}


const CATEGORY_META = {
  'Dry Fruits': {slug:'dry-fruits', banner:'/assets/banners/dry-fruits-dates-sogi.jpg', title:'Dry Fruits & Heritage Mewa', seoTitle:'Dry Fruits & Heritage Mewa Online in Pakistan | Morganics', metaDescription:'Shop Morganics dry fruits & heritage mewa for tea-time, Ramadan tables, lunch boxes, breakfast bowls and gift trays. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Premium dried fruits, dates and traditional gifting staples', copy:'Morganics dry fruits and heritage mewa are selected for tea-time, Ramadan tables, lunch boxes, breakfast bowls and gift trays, with clear storage care and sensible portion guidance for Pakistani homes.', ritual:'Tea-time, Ramadan tables, lunch boxes, breakfast bowls and gift trays.', usage:'Eat as a snack, pair with nuts, add to breakfast, serve at tea-time, or use in desserts and gift boxes.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Use sensible portions, especially if managing sugar intake or specific dietary advice.', faqs:['What are Morganics dry fruits & heritage mewa used for? They are used for practical Pakistani routines such as tea-time, Ramadan tables, lunch boxes, breakfast bowls and gift trays.','How should I choose from this category? Compare pack size, freshness needs, taste, use case and any personal dietary restrictions.','Are these products medicines? No. They are food and pantry ingredients, not medicines.']},
  'Nuts': {slug:'nuts', banner:'/assets/banners/nuts-dry-fruits.jpg', title:'Premium Nuts', seoTitle:'Premium Nuts Online in Pakistan | Morganics', metaDescription:'Shop Morganics premium nuts for clean snacking, tea-time serving, breakfast bowls, desserts and premium gifting. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Almonds, cashews, pistachios, walnuts and everyday protein-rich staples', copy:'Morganics premium nuts are selected for clean snacking, tea-time serving, breakfast bowls, desserts and premium gifting, with freshness-led packing and practical storage guidance.', ritual:'Clean snacking, tea-time serving, breakfast bowls, desserts and premium gifting.', usage:'Snack directly, add to desserts, breakfast bowls, trail mixes, kheer, halwa or gift boxes.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Contains tree nuts and may not suit customers with nut allergies.', faqs:['What are Morganics premium nuts used for? They are used for clean snacking, tea-time serving, breakfast bowls, desserts and premium gifting.','How should I store nuts after opening? Keep them sealed, dry and away from sunlight; refrigerate opened packs in hot or humid weather if needed.','Are these products medicines? No. They are food and pantry ingredients, not medicines.']},
  'Seeds': {slug:'seeds', banner:'/assets/banners/seeds-grains.jpg', title:'Seeds & Functional Grains', seoTitle:'Seeds & Functional Grains Online in Pakistan | Morganics', metaDescription:'Shop Morganics seeds & functional grains for breakfast bowls, soaked drinks, salads, baking and clean snack portions. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Chia, pumpkin, sunflower, flax and mixed seeds for modern nutrition', copy:'Morganics seeds and functional grains are selected for breakfast bowls, soaked drinks, salads, baking and clean snack portions, with practical portion and storage guidance.', ritual:'Breakfast bowls, soaked drinks, salads, baking and clean snack portions.', usage:'Sprinkle on bowls or salads, mix into yogurt or smoothies, or soak where the product is commonly used that way.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Use moderate portions and drink enough water when using fiber-rich seeds.', faqs:['What are Morganics seeds & functional grains used for? They are used for breakfast bowls, soaked drinks, salads, baking and clean snack portions.','How should I use seeds safely? Start with moderate portions and follow product-specific use guidance.','Are these products medicines? No. They are food and pantry ingredients, not medicines.']},
  'Herbs': {slug:'herbs', banner:'/assets/banners/herbs-rituals.jpg', title:'Herbs & Daily Botanicals', seoTitle:'Herbs & Daily Botanicals Online in Pakistan | Morganics', metaDescription:'Shop Morganics herbs & daily botanicals for tea, kitchen, aroma, traditional pantry and careful daily routines. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Traditional herbs presented with modern clarity', copy:'Morganics herbs and daily botanicals are selected for tea, kitchen, aroma, traditional pantry and careful daily routines, with safe guidance instead of exaggerated promises.', ritual:'Tea, kitchen, aroma, traditional pantry and careful daily routines.', usage:'Use in tea, cooking, infusions or traditional preparations in small sensible amounts.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Herbs may not suit every body; ask a qualified professional if pregnant, nursing, medicated or managing a condition.', faqs:['What are Morganics herbs used for? They are used for tea, kitchen, aroma, traditional pantry and careful daily routines.','How should I choose an herb? Compare the product, use case, pack size and personal suitability.','Are these products medicines? No. They are herbal or pantry ingredients, not medicines.']},
  'Botanicals': {slug:'botanicals', banner:'/assets/banners/roots-adaptogens.jpg', title:'Roots, Botanicals & Traditional Ingredients', seoTitle:'Roots, Botanicals & Traditional Ingredients Online in Pakistan | Morganics', metaDescription:'Shop Morganics roots, botanicals & traditional ingredients for traditional pantry routines, guided wellness use and specialist ingredient needs. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Traditional-use ingredients with careful guidance', copy:'Morganics roots, botanicals and traditional ingredients are selected for traditional pantry routines, guided use and specialist ingredient needs, with clear precautions and practical storage care.', ritual:'Traditional pantry routines, guided wellness use and specialist ingredient needs.', usage:'Use only in sensible quantities according to familiar traditional practice or professional guidance.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Use botanicals with professional guidance if pregnant, nursing, medicated, allergic or managing a health condition.', faqs:['What are Morganics roots and botanicals used for? They are used for traditional pantry routines, guided use and specialist ingredient needs.','How should I use botanicals safely? Use small sensible amounts and seek professional guidance where appropriate.','Are these products medicines? No. They are traditional-use ingredients, not medicines.']},
  'Premium Snacks': {slug:'premium-snacks', banner:'/assets/banners/premium-snacks-grains.jpg', title:'Premium Snacks & Pantry Staples', seoTitle:'Premium Snacks & Pantry Staples Online in Pakistan | Morganics', metaDescription:'Shop Morganics premium snacks & pantry staples for breakfast, office snacking, lunch bowls and family pantry use. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Light snacks, grains and everyday kitchen-friendly essentials', copy:'Morganics premium snacks and pantry staples are selected for breakfast, office snacking, lunch bowls and family pantry use, with easy serving and storage guidance.', ritual:'Breakfast, office snacking, lunch bowls and family pantry use.', usage:'Use as a ready pantry item for breakfast bowls, snack portions or family serving.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Check ingredients and portion sizes according to your dietary needs.', faqs:['What are Morganics premium snacks used for? They are used for breakfast, office snacking, lunch bowls and family pantry use.','How should I store them? Keep sealed, dry and away from heat, moisture and sunlight.','Are these products medicines? No. They are food and pantry ingredients, not medicines.']},
  'Wellness Blends': {slug:'wellness-blends', banner:'/assets/banners/oils-gums-specialties.jpg', title:'Wellness Blends', seoTitle:'Wellness Blends Online in Pakistan | Morganics', metaDescription:'Shop Morganics wellness blends for careful routine use, herbal pantry planning and guided daily use. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Ready-to-use blends for careful routines', copy:'Morganics wellness blends are selected for careful routine use, herbal pantry planning and guided daily use, with clear instructions and responsible safety notes.', ritual:'Careful routine use, herbal pantry planning and guided daily use.', usage:'Use according to the label or qualified professional guidance; start small and observe suitability.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Wellness blends should be used carefully and are not a substitute for medical care.', faqs:['What are Morganics wellness blends used for? They are used for careful routine use, herbal pantry planning and guided daily use.','How should I use a wellness blend? Follow label guidance and ask a qualified professional if unsure.','Are these products medicines? No. They are traditional-use blends, not medicines.']},
  'Gums & Specialties': {slug:'gums-specialties', banner:'/assets/banners/oils-gums-specialties.jpg', title:'Gums & Specialties', seoTitle:'Gums & Specialties Online in Pakistan | Morganics', metaDescription:'Shop Morganics gums & specialties for summer drinks, desserts, texture-led recipes and traditional pantry use. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Cooling, texture and traditional utility ingredients', copy:'Morganics gums and specialties are selected for summer drinks, desserts, texture-led recipes and traditional pantry use, with preparation and storage guidance.', ritual:'Summer drinks, desserts, texture-led recipes and traditional pantry use.', usage:'Soak or prepare according to product type, then use in drinks, desserts or traditional recipes.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Prepare specialty gums correctly and start with small amounts.', faqs:['What are Morganics gums & specialties used for? They are used for summer drinks, desserts, texture-led recipes and traditional pantry use.','How should I prepare them? Follow product-specific preparation guidance and start with small amounts.','Are these products medicines? No. They are pantry or traditional-use ingredients, not medicines.']},
  'Natural Sweeteners': {slug:'natural-sweeteners', banner:'/assets/banners/natural-sweeteners-salts.jpg', title:'Natural Sweeteners & Salts', seoTitle:'Natural Sweeteners Online in Pakistan | Morganics', metaDescription:'Shop Morganics natural sweeteners for tea, breakfast, desserts, cooking and family pantry restocking. Clear usage, storage guidance and freshness-led packing in Pakistan.', kicker:'Gur, shakar, honey and digestive salts', copy:'Morganics natural sweeteners are selected for tea, breakfast, desserts, cooking and family pantry restocking, with practical usage and storage care.', ritual:'Tea, breakfast, desserts, cooking and family pantry restocking.', usage:'Use in tea, milk, desserts, breakfast, baking or everyday kitchen recipes as preferred.', storage:'Keep sealed in a cool, dry place away from sunlight, heat and moisture. Use clean, dry utensils; refrigerate sensitive opened packs in hot or humid weather when needed.', safety:'Natural sweeteners are still sweet foods; use according to your dietary needs.', faqs:['What are Morganics natural sweeteners used for? They are used for tea, breakfast, desserts, cooking and family pantry restocking.','How should I store natural sweeteners? Keep sealed, dry and away from heat, moisture and sunlight.','Are these products medicines? No. They are food and pantry ingredients, not medicines.']}
};
const FALLBACK_BANNERS = ['/assets/banners/botanicals-heritage.jpg','/assets/banners/cold-pressed-oils.jpg','/assets/banners/berries-fruits.jpg'];
function categories(){return [...new Set(products.map(p=>p.category))].sort((a,b)=>a.localeCompare(b));}
function catMeta(cat){return CATEGORY_META[cat] || {slug:cat.toLowerCase().replace(/[^a-z0-9]+/g,'-'), banner:FALLBACK_BANNERS[0], title:cat, kicker:'Premium Morganics category', copy:'Curated natural products with real imagery, safe product copy and practical daily usage guidance.', ritual:'Daily pantry, wellness and gifting.'};}
const CATEGORY_ICONS = {
  'Dry Fruits': 'assets/category-icons/dry-fruits.png',
  'Nuts': 'assets/category-icons/nuts.png',
  'Seeds': 'assets/category-icons/seeds-grains.png',
  'Herbs': 'assets/category-icons/herbs-botanicals.png',
  'Botanicals': 'assets/category-icons/roots-adaptogens.png',
  'Premium Snacks': 'assets/category-icons/seeds-grains.png',
  'Wellness Blends': 'assets/category-icons/oils-gums-specialties.png',
  'Gums & Specialties': 'assets/category-icons/oils-gums-specialties.png',
  'Natural Sweeteners': 'assets/category-icons/natural-sweeteners.png'
};
function categoryIcon(cat){return CATEGORY_ICONS[cat] || 'assets/category-icons/herbs-botanicals.png';}
function categoryIconCard(cat, compact=false){
  const ps=products.filter(p=>p.category===cat), m=catMeta(cat), examples=ps.slice(0,3).map(p=>p.name).join(' · ');
  return `<a class="category-icon-card ${compact?'compact':''}" href="${categoryUrl(cat)}" aria-label="Shop ${esc(m.title)}"><span class="category-icon-art"><img src="${esc(categoryIcon(cat))}" alt="${esc(m.title)} ingredient icon" loading="lazy"></span><span class="category-icon-copy"><small>Shop category</small><b>${esc(m.title)}</b><em>${esc(compact?m.kicker:(examples||m.kicker))}</em><span>Explore category →</span></span></a>`;
}
/* ── Wishlist (localStorage) ──────────────────────────────────── */
const WL_KEY='morganics_wishlist_v1';
function getWishlist(){try{return new Set(JSON.parse(localStorage.getItem(WL_KEY)||'[]'))}catch(e){return new Set()}}
function setWishlist(s){localStorage.setItem(WL_KEY,JSON.stringify([...s]))}
function toggleWishlist(id,btn){const s=getWishlist();s.has(id)?s.delete(id):s.add(id);setWishlist(s);const on=s.has(id);if(btn){btn.classList.toggle('wishlisted',on);btn.setAttribute('aria-label',on?'Remove from favourites':'Add to favourites');btn.innerHTML=on?heartFull():heartEmpty();}updateWishlistBadge();}
function heartEmpty(){return`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`}
function heartFull(){return`<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`}

function card(p){
  const wished=getWishlist().has(p.id);
  return `<div class="product-card-wrap" data-pid="${esc(p.id)}">
    <button class="card-fav-btn${wished?' wishlisted':''}" type="button" aria-label="${wished?'Remove from favourites':'Add to favourites'}" data-fav="${esc(p.id)}">${wished?heartFull():heartEmpty()}</button>
    <a class="product-card" href="${productUrl(p)}">
      <div class="product-img"><img src="${esc(p.image)}" alt="${esc(p.name)} product pack by Morganics" loading="lazy"></div>
      <div class="product-info">
        <small class="product-meta">${esc(p.category)} · ${esc(p.sku)}</small>
        <b class="product-name">${esc(p.name)}</b>
        ${p.urduName?`<span class="urdu-line">${esc(p.urduName)}</span>`:''}
        <div class="price-row"><span class="price">${money(p.price)}</span></div>
      </div>
    </a>
    <div class="card-actions">
      <button class="card-cart-btn" type="button" data-cart="${esc(p.id)}" aria-label="Add ${esc(p.name)} to cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H7"/></svg>
        Add to Cart
      </button>
      <a class="card-view-btn" href="${productUrl(p)}" aria-label="View ${esc(p.name)} details">View Details</a>
    </div>
  </div>`;
}

// Delegated listeners for card actions — fires once on document
(function installCardDelegation(){
  if(document._cardDelegation) return;
  document._cardDelegation = true;
  document.addEventListener('click', e => {
    // Favourite
    const favBtn = e.target.closest('[data-fav]');
    if(favBtn){ e.stopPropagation(); toggleWishlist(favBtn.dataset.fav, favBtn); return; }
    // Add to Cart
    const cartBtn = e.target.closest('[data-cart]');
    if(cartBtn){
      e.stopPropagation();
      const pid = cartBtn.dataset.cart;
      const p = products.find(x=>x.id===pid); if(!p) return;
      const vars = variantOptions(p);
      addToCart({id:p.id,sku:p.sku,name:p.name,urduName:p.urduName,category:p.category,
        image:p.image,size:vars[0]?.size||'Standard Pack',form:'Whole / Regular',
        price:vars[0]?.price||Number(p.price||0),qty:1,
        key:p.id+'|'+(vars[0]?.size||'Standard Pack')+'|Whole / Regular'});
      cartBtn.classList.add('added');
      setTimeout(()=>cartBtn.classList.remove('added'),600);
    }
  });
})();
function categoryBanner(cat, compact=false){const ps=products.filter(p=>p.category===cat);const m=catMeta(cat);return `<a class="category-banner ${compact?'compact':''}" href="${categoryUrl(cat)}"><img class="category-banner-img" src="${esc(m.banner)}" alt="${esc(m.title)} category banner" loading="lazy"><div class="category-overlay"><span class="eyebrow">${ps.length} products</span><h3>${esc(m.title)}</h3><p>${esc(m.kicker)}</p><span class="category-link">Explore category →</span></div></a>`}
function productRail(ids){return ids.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(card).join('')}
function installHeaderActive(){const page=document.body.dataset.page;document.querySelectorAll('nav a').forEach(a=>{const href=a.getAttribute('href')||'';if((page==='home'&&href.includes('index'))||(page==='shop'&&href.includes('shop')))a.classList.add('active')})}
function initFooter(){
  const f=document.querySelector('footer.premium-footer'); if(!f)return;
  const root=siteRootPath();
  const ig='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>';
  const tt='<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.41a8.16 8.16 0 0 0 4.78 1.52V7.48a4.85 4.85 0 0 1-1.01-.79z"/></svg>';
  const fb='<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
  const yt='<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>';
  const wa='<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

  f.innerHTML=`
  <div class="footer-bg-fx" aria-hidden="true"></div>

  <!-- Trust strip -->
  <div class="footer-trust">
    <div class="footer-inner">
      <div class="ft-trust-grid">
        <div class="ft-trust-item"><span class="ft-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M3 7h10v9H3z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span><span>Pakistan-wide COD Delivery</span></div>
        <div class="ft-trust-item"><span class="ft-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M5 19c8-2 13-7 14-14-7 1-12 6-14 14Z"/><path d="M5 19c3-4 7-7 12-10"/></svg></span><span>Premium Natural Ingredients</span></div>
        <div class="ft-trust-item"><span class="ft-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span><span>Freshly Packed</span></div>
        <div class="ft-trust-item"><span class="ft-trust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span>Custom Sourcing Support</span></div>
      </div>
    </div>
  </div>

  <!-- Main grid -->
  <div class="footer-inner footer-grid-wrap">
    <div class="footer-grid">

      <!-- Brand -->
      <div class="footer-col footer-brand-col">
        <a href="${root}index.html" class="footer-logo-link" aria-label="Morganics home">
          <img src="${root}assets/logos/morganics-logo-footer.png" alt="Morganics — Chemistry of Nutrients" class="footer-logo">
        </a>
        <p class="footer-brand-desc">Premium natural pantry essentials for Pakistani homes, sourced with care and packed with purity.</p>
        <div class="footer-brand-pills">
          <span>COD Delivery</span>
          <span>Premium Pantry</span>
          <span>Natural Ingredients</span>
        </div>
      </div>

      <!-- Shop -->
      <div class="footer-col">
        <h4 class="footer-col-title">Shop</h4>
        <nav class="footer-links">
          <a href="${root}shop.html">All Products</a>
          <a href="${root}category.html?category=Nuts">Nuts</a>
          <a href="${root}category.html?category=Seeds">Seeds</a>
          <a href="${root}category.html?category=Herbs">Herbs</a>
          <a href="${root}category.html?category=Dry%20Fruits">Dry Fruits</a>
          <a href="${root}category.html?category=Botanicals">Botanicals</a>
          <a href="${root}category.html?category=Gums%20%26%20Specialties">Gums &amp; Specialties</a>
          <a href="${root}ingredient-guide.html">Ingredient Guide</a>
          <a href="${root}storage-guide.html">Storage Guide</a>
        </nav>
      </div>

      <!-- Customer Care -->
      <div class="footer-col">
        <h4 class="footer-col-title">Customer Care</h4>
        <nav class="footer-links">
          <a href="${root}contact.html">Contact Morganics</a>
          <a href="${root}faq.html">FAQ</a>
          <a href="${root}shipping-policy.html">Delivery Information</a>
          <a href="${root}return-refund-policy.html">Return Policy</a>
          <a href="${root}payment-policy.html">Payment Policy</a>
          <a href="${root}bulk-corporate-orders.html">Bulk Orders</a>
          <a href="${root}contact.html?custom=1">Custom Sourcing</a>
        </nav>
      </div>

      <!-- Connect -->
      <div class="footer-col footer-connect-col">
        <h4 class="footer-col-title">Connect</h4>
        <div class="footer-contact-list">
          <a href="https://wa.me/${CONTACT.whatsappDigits}" target="_blank" rel="noopener" class="footer-contact-link">${wa}<span>${CONTACT.phoneDisplay}</span></a>
          <a href="mailto:${CONTACT.hello}" class="footer-contact-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg><span>${CONTACT.hello}</span></a>
        </div>
        <div class="footer-socials">
          <a href="https://www.instagram.com/morganics_official" target="_blank" rel="noopener" aria-label="Instagram" class="footer-social-pill">${ig}<span>Instagram</span></a>
          <a href="https://www.facebook.com/morganics10" target="_blank" rel="noopener" aria-label="Facebook" class="footer-social-pill">${fb}<span>Facebook</span></a>
          <a href="https://www.tiktok.com/@morganics_official" target="_blank" rel="noopener" aria-label="TikTok" class="footer-social-pill">${tt}<span>TikTok</span></a>
          <a href="https://www.youtube.com/@Morganicsofficial" target="_blank" rel="noopener" aria-label="YouTube" class="footer-social-pill">${yt}<span>YouTube</span></a>
        </div>
        <div class="footer-newsletter">
          <p class="footer-newsletter-label">Seasonal wellness drops</p>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault();this.querySelector('input').value='';this.querySelector('button').textContent='✓ Subscribed'">
            <input type="email" placeholder="your@email.com" aria-label="Email for wellness updates">
            <button type="submit">Join</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA contact bar -->
  <div class="footer-inner">
    <div class="footer-cta-bar">
      <a href="https://wa.me/${CONTACT.whatsappDigits}" target="_blank" rel="noopener" class="footer-cta-card">
        <span class="fcc-icon">${wa}</span>
        <span class="fcc-body"><b>WhatsApp Order</b><small>Chat with us to place your order</small></span>
        <span class="fcc-arrow">→</span>
      </a>
      <a href="mailto:${CONTACT.support}" class="footer-cta-card">
        <span class="fcc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg></span>
        <span class="fcc-body"><b>Support Email</b><small>${CONTACT.support}</small></span>
        <span class="fcc-arrow">→</span>
      </a>
      <a href="${root}contact.html?bulk=1" class="footer-cta-card">
        <span class="fcc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></span>
        <span class="fcc-body"><b>Bulk &amp; Custom Sourcing</b><small>Wholesale &amp; special requirements</small></span>
        <span class="fcc-arrow">→</span>
      </a>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="footer-bottom-bar">
    <div class="footer-inner footer-bottom-inner">
      <span class="footer-copyright">© 2026 Morganics. Pure by Nature · Premium by Choice.</span>
      <div class="footer-policy-links">
        <a href="${root}privacy-policy.html">Privacy Policy</a>
        <a href="${root}terms-conditions.html">Terms</a>
        <a href="${root}contact.html">Shipping</a>
      </div>
      <p class="footer-disclaimer">For wellness products, ask your doctor/dietitian if you are pregnant, nursing, taking medicine, or managing a health condition.</p>
    </div>
  </div>`;
}


function installMegaMenu(){
  const header=document.querySelector('.site-header'); if(!header || header.dataset.mega==='1')return;
  const nav=header.querySelector('nav'); if(!nav)return;
  const cats=categories();
  const mega=document.createElement('div'); mega.className='mega-menu';
  mega.innerHTML=`<div class="mega-panel"><div class="mega-intro"><span class="eyebrow">Shop by Category</span><h3>Morganics Pantry</h3><p>Choose by category, routine and product type. Every category uses clean ingredient icons instead of heavy banners for faster browsing.</p><a class="btn primary" href="shop.html">Open Full Shop</a></div><div class="mega-cats">${cats.map(cat=>{const m=catMeta(cat);const ps=products.filter(p=>p.category===cat);return `<a class="mega-cat" href="${categoryUrl(cat)}"><span class="mega-cat-icon"><img src="${esc(categoryIcon(cat))}" alt="${esc(cat)} icon" loading="lazy"></span><span><b>${esc(m.title||cat)}</b><small>${esc(ps.slice(0,3).map(p=>p.name).join(', ')||'Explore category')}</small></span></a>`}).join('')}</div></div>`;
  const trigger=document.createElement('a'); trigger.href='shop.html'; trigger.className='mega-trigger'; trigger.textContent='Categories';
  const wrap=document.createElement('div'); wrap.className='mega-wrap'; wrap.appendChild(trigger); wrap.appendChild(mega);
  const existing=[...nav.querySelectorAll('a')].find(a=>(a.textContent||'').trim().toLowerCase()==='categories');
  if(existing) existing.replaceWith(wrap); else nav.appendChild(wrap);
  header.dataset.mega='1';

  // Fix hover gap: use JS with a small leave-delay so cursor can travel from
  // trigger into the menu panel without it disappearing
  let leaveTimer=null;
  function showMega(){clearTimeout(leaveTimer);wrap.classList.add('mega-open')}
  function hideMega(){leaveTimer=setTimeout(()=>wrap.classList.remove('mega-open'),120)}
  wrap.addEventListener('mouseenter',showMega);
  wrap.addEventListener('mouseleave',hideMega);
  mega.addEventListener('mouseenter',showMega);
  mega.addEventListener('mouseleave',hideMega);
}


function installTopTicker(){ /* removed */ }

function installContactNav(){
  const header=document.querySelector('.site-header'); if(!header || header.dataset.contactNav==='1')return;
  const root=siteRootPath();
  const nav=header.querySelector('nav');
  if(nav && ![...nav.querySelectorAll('a')].some(a=>(a.textContent||'').trim().toLowerCase()==='contact')){
    nav.insertAdjacentHTML('beforeend', `<a href="${root}contact.html">Contact</a>`);
  }
  header.dataset.contactNav='1';
}

function installHeaderSearch(){
  const header=document.querySelector('.site-header'); if(!header || header.dataset.search==='1')return;
  // Wire up the search button and panel injected in HTML (index.html + other pages via installCartShell path)
  // If no search button exists yet, inject it (non-home pages that use dynamic header injection)
  let btn=header.querySelector('#headerSearchBtn');
  let panel=header.querySelector('#headerSearchPanel');
  if(!btn){
    // Inject search button before cart or at end
    btn=document.createElement('button');
    btn.className='header-search-btn'; btn.id='headerSearchBtn';
    btn.type='button'; btn.setAttribute('aria-label','Search products');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="19" height="19"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>';
    const cart=header.querySelector('.cart-header-btn');
    if(cart) header.insertBefore(btn,cart); else header.appendChild(btn);
  }
  if(!panel){
    panel=document.createElement('div');
    panel.className='header-search-panel'; panel.id='headerSearchPanel';
    panel.setAttribute('aria-hidden','true');
    panel.innerHTML=`<input class="header-search-input" id="globalSearchInput" autocomplete="off" placeholder="Search: badam, chia, ajwain, شہد..." type="search" aria-label="Search Morganics products"><button class="header-search-close" id="headerSearchClose" type="button" aria-label="Close search">×</button><div class="header-search-results" id="globalSearchResults" role="listbox"></div>`;
    header.appendChild(panel);
  }
  // Ensure product bar placeholder exists
  if(!header.querySelector('#headerProductBar')){
    const bar=document.createElement('div'); bar.className='header-product-bar'; bar.id='headerProductBar';
    header.appendChild(bar);
  }
  const input=panel.querySelector('.header-search-input');
  const results=panel.querySelector('.header-search-results');
  const renderResults=(q)=>{
    const term=(q||'').trim().toLowerCase();
    if(!term){results.innerHTML='';results.classList.remove('has-results');return;}
    const matches=products.filter(p=>[p.name,p.urduName,p.category,p.sku,p.keywords].join(' ').toLowerCase().includes(term)).slice(0,7);
    if(!matches.length){results.innerHTML='<div class="search-result-empty">No product found — try a category or Urdu name.</div>';results.classList.add('has-results');return;}
    results.innerHTML=matches.map(p=>`<a href="${productUrl(p)}" class="search-result-item" role="option"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"><span><b>${esc(p.name)}</b><small>${esc(p.category)} · ${esc(p.urduName||p.sku||'')}</small></span><em>Rs ${Number(p.price||0).toLocaleString()}</em></a>`).join('');
    results.classList.add('has-results');
  };
  const openSearch=()=>{header.classList.add('search-open');panel.setAttribute('aria-hidden','false');document.body.classList.add('hero-search-open');setTimeout(()=>input&&input.focus(),60);};
  const closeSearch=()=>{header.classList.remove('search-open');panel.setAttribute('aria-hidden','true');document.body.classList.remove('hero-search-open');if(input){input.value='';} results.innerHTML='';results.classList.remove('has-results');};
  btn.addEventListener('click',openSearch);
  panel.querySelector('.header-search-close')?.addEventListener('click',closeSearch);
  input?.addEventListener('input',e=>renderResults(e.target.value));
  input?.addEventListener('keydown',e=>{if(e.key==='Escape')closeSearch();if(e.key==='Enter'){const first=results.querySelector('a');if(first)location.href=first.href;}});
  document.addEventListener('click',e=>{if(!header.contains(e.target))closeSearch();});
  header.dataset.search='1';
}

function initStickyHeader(){
  const header=document.querySelector('.site-header'); if(!header||header.dataset.sticky==='1')return;
  header.dataset.sticky='1';
  const THRESH=80;
  const tick=()=>{
    const scrolled=window.scrollY>THRESH;
    header.classList.toggle('scrolled',scrolled);
  };
  window.addEventListener('scroll',tick,{passive:true});
  tick();
  // Product page: populate sticky product info bar when content is ready
  if(document.body.dataset.page==='product'){
    const productRoot=document.getElementById('productRoot'); if(!productRoot)return;
    const bar=document.getElementById('headerProductBar'); if(!bar)return;
    const observer=new MutationObserver(()=>{
      const h1=productRoot.querySelector('h1');
      const priceEl=productRoot.querySelector('.detail-price');
      const imgEl=productRoot.querySelector('.detail-image img');
      if(!h1||!priceEl)return;
      bar.innerHTML='';
      if(imgEl){const t=document.createElement('img');t.className='header-product-thumb';t.src=imgEl.src;t.alt=h1.textContent||'';bar.appendChild(t);}
      const info=document.createElement('div'); info.className='header-product-name';
      info.innerHTML=`<b>${esc(h1.textContent||'')}</b><span>${esc(priceEl.textContent||'')}</span>`;
      bar.appendChild(info);
      const cta=document.createElement('button'); cta.className='header-product-cta'; cta.type='button'; cta.textContent='Add to Cart';
      cta.addEventListener('click',()=>{const addBtn=document.querySelector('.add-cart-btn');if(addBtn)addBtn.click();else window.scrollTo({top:400,behavior:'smooth'});});
      bar.appendChild(cta);
      header.classList.add('has-product');
      observer.disconnect();
    });
    observer.observe(productRoot,{childList:true,subtree:true});
  }
}

function installMobileMenu(){
  const header=document.querySelector('.site-header'); if(!header || header.dataset.mobileMenu==='1')return;
  const root=siteRootPath();
  const cats=categories();
  const page=document.body.dataset.page || '';
  const isActive=target => page===target ? ' active' : '';
  const phoneIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L9 10.75a16 16 0 0 0 4.25 4.25l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92Z"/></svg>';
  const mailIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
  const chatIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.8 8.8 0 0 1-3.9-.9L3 21l2.1-5.2a8 8 0 0 1-1-4.3 8.5 8.5 0 0 1 17 0Z"/><path d="M8 10h8M8 14h5"/></svg>';
  const btn=document.createElement('button');
  btn.className='mobile-menu-btn'; btn.type='button'; btn.setAttribute('aria-label','Open menu'); btn.setAttribute('aria-expanded','false');
  btn.innerHTML='<span></span><span></span><span></span>';
  const panel=document.createElement('aside'); panel.className='mobile-menu-panel mobile-drawer'; panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`<div class="mobile-drawer-inner"><div class="mobile-menu-header mobile-menu-top"><a class="brand mobile-menu-logo mobile-panel-brand" href="${root}index.html" aria-label="Morganics home"><img class="brand-logo-img" src="${root}assets/logos/morganics-logo-header.png" alt="Morganics — Chemistry of Nutrients"></a><button type="button" class="mobile-menu-close mobile-close" aria-label="Close menu">×</button></div><nav class="mobile-nav mobile-primary-links" aria-label="Mobile navigation"><a class="mobile-nav-item${isActive('home')}" href="${root}index.html">Home</a><a class="mobile-nav-item${isActive('shop')}" href="${root}shop.html">Shop All Products</a><a class="mobile-nav-item${isActive('contact')}" href="${root}contact.html">Contact / Inquiry</a><a class="mobile-nav-item${isActive('cart')}" href="${root}cart.html"><span>Cart</span><b class="mobile-nav-badge" data-cart-count>0</b></a><a class="mobile-nav-item" href="${root}index.html#story">Reviews</a></nav><div class="mobile-contact mobile-contact-strip" aria-label="Morganics contact links"><a class="mobile-contact-link" href="tel:${CONTACT.phoneTel}">${phoneIcon}<span>${CONTACT.phoneDisplay}</span></a><a class="mobile-contact-link" href="mailto:${CONTACT.hello}">${mailIcon}<span>${CONTACT.hello}</span></a><a class="mobile-contact-link mobile-whatsapp-link" href="${whatsappInquiryUrl('Hi Morganics, I want to inquire about your products.')}" target="_blank" rel="noopener">${chatIcon}<span>WhatsApp Morganics</span></a></div><section class="mobile-menu-section" aria-labelledby="mobileCategoriesTitle"><span class="section-kicker" id="mobileCategoriesTitle">Categories</span><p class="section-helper">Tap any category to shop Morganics products.</p><div class="mobile-category-list mobile-cat-grid">${cats.map(cat=>{const m=catMeta(cat);const count=products.filter(p=>p.category===cat).length;return `<a class="mobile-category-card" href="${root}${categoryUrl(cat)}"><img src="${root}${esc(categoryIcon(cat))}" alt="${esc(cat)} icon" loading="lazy"><span><b class="mobile-category-title">${esc(m.title||cat)}</b><small class="mobile-category-subtitle">${count} products · Shop category</small></span></a>`}).join('')}</div></section><div class="mobile-menu-cta"><a class="mobile-menu-primary" href="${root}shop.html">Shop Now</a><a class="mobile-menu-secondary" href="${whatsappInquiryUrl('Hi Morganics, I want to place an order.')}" target="_blank" rel="noopener">WhatsApp / Contact</a></div></div>`;
  document.body.appendChild(panel);
  header.appendChild(btn);
  const open=()=>{document.body.classList.add('mobile-menu-open','menu-open');btn.setAttribute('aria-expanded','true');panel.setAttribute('aria-hidden','false')};
  const close=()=>{document.body.classList.remove('mobile-menu-open','menu-open');btn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true')};
  btn.addEventListener('click',()=>{document.body.classList.contains('mobile-menu-open')?close():open();});
  panel.querySelector('.mobile-close')?.addEventListener('click',close);
  panel.addEventListener('click',e=>{if(e.target.closest('a'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  header.dataset.mobileMenu='1';
}


function initHome(){
  const oldHeroStage=document.getElementById('heroStage');
  const heroSection=oldHeroStage && oldHeroStage.closest('.premium-hero');
  if(heroSection && heroSection.dataset.scrollHero!=='1'){
    heroSection.dataset.scrollHero='1';
    heroSection.classList.add('scroll-video-hero');
    const heroCategories=[
      {label:'Summer Cooling', sub:'Goond Katira · Chia · Seeds', cat:'Gums & Specialties', q:'cooling', icon:'seed'},
      {label:'Daily Energy', sub:'Dates · Badam · Mewa', cat:'Dry Fruits', q:'energy', icon:'nut'},
      {label:'Herbal Rituals', sub:'Ajwain · Moringa · Hibiscus', cat:'Herbs', q:'herbs', icon:'leaf'},
      {label:'Gift Ready', sub:'Dates · Honey · Premium Nuts', cat:'Natural Sweeteners', q:'gifting', icon:'gift'}
    ];
    heroSection.innerHTML=`
      <div class="hero-scroll-pin" aria-label="Morganics premium product reveal">
        <div class="hero-video-wrap hero-video-full">
          <video class="hero-video hero-scroll-video" src="assets/video/pouch-reveal.mp4" muted playsinline preload="auto" poster="assets/banners/nuts-dry-fruits.jpg"></video>
          <div class="hero-video-veil"></div>
        </div>
        <div class="hero-scroll-copy hero-intro-panel">
          <span class="eyebrow">Premium natural pantry for Pakistan</span>
          <h1>Premium pantry for daily rituals.</h1>
          <p>Dry fruits, nuts, seeds, herbs and natural pantry essentials — selected for Pakistani homes, summer routines and thoughtful gifting.</p>
          <div class="hero-actions">
            <a class="btn primary" href="shop.html">Explore Shop</a>
            <a class="btn ghost" href="#categories">Explore Categories</a>
          </div>
          <div class="trust-row"><span>Summer cooling</span><span>Daily energy</span><span>Gift ready</span></div>
        </div>
        <div class="hero-scroll-side hero-season-panel" aria-label="Seasonal Morganics categories">
          <span class="eyebrow">Seasonal picks</span>
          <h2>Shop by what your day needs.</h2>
          <div class="hero-season-grid">
            ${heroCategories.map(item=>`<a class="hero-season-card" href="shop.html?search=${esc(item.q)}"><span class="hero-season-icon">${icon(item.icon)}</span><b>${esc(item.label)}</b><small>${esc(item.sub)}</small></a>`).join('')}
          </div>
        </div>
        <div class="hero-orbit-chip hero-orbit-nuts"><span>${icon('nut')}</span><b>Nuts</b></div>
        <div class="hero-orbit-chip hero-orbit-seeds"><span>${icon('seed')}</span><b>Seeds</b></div>
        <div class="hero-orbit-chip hero-orbit-herbs"><span>${icon('leaf')}</span><b>Herbs</b></div>
        <div class="hero-orbit-chip hero-orbit-gifting"><span>${icon('gift')}</span><b>Gifting</b></div>
        <div class="hero-bottom-glass">
          <span>Scroll-controlled reveal</span>
          <b>Natural foods, herbs, seeds and mewa</b>
          <small>The video moves with your scroll so the product reveal feels intentional, not automatic.</small>
        </div>
        <div class="hero-scroll-cue" aria-hidden="true"><span></span><em>Scroll to reveal</em></div>
      </div>`;

    const video=heroSection.querySelector('.hero-scroll-video');
    const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
    let ticking=false;
    const syncHero=()=>{
      const rect=heroSection.getBoundingClientRect();
      const scrollable=Math.max(1, heroSection.offsetHeight - window.innerHeight);
      const progress=clamp((-rect.top) / scrollable);
      const intro=clamp(1 - progress*3.2);
      const season=clamp((progress-.22)*3.3);
      const focus=clamp((progress-.36)*2.4);
      heroSection.style.setProperty('--heroProgress', progress.toFixed(3));
      heroSection.style.setProperty('--heroIntroOpacity', intro.toFixed(3));
      heroSection.style.setProperty('--heroSeasonOpacity', season.toFixed(3));
      heroSection.style.setProperty('--heroFocus', focus.toFixed(3));
      heroSection.style.setProperty('--heroVideoScale', (1.02 + focus*.08).toFixed(3));
      heroSection.style.setProperty('--heroIntroShift', `${(1-intro)*-42}px`);
      heroSection.style.setProperty('--heroSeasonShift', `${(1-season)*34}px`);
      heroSection.style.setProperty('--heroChipShift', `${(1-season)*18}px`);
      heroSection.style.setProperty('--heroChipOpacity', (0.34 + season*.66).toFixed(3));
      heroSection.style.setProperty('--heroGlassShift', `${focus*-14}px`);
      heroSection.classList.toggle('is-product-focus', progress>.30);
      heroSection.classList.toggle('is-season-active', progress>.22);
      if(video && Number.isFinite(video.duration) && video.duration>0){
        const target=Math.min(video.duration-.05, Math.max(.05, progress*video.duration));
        if(Math.abs((video.currentTime||0)-target)>.045){
          try{ video.currentTime=target; }catch(e){}
        }
      }
    };
    const requestSync=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;syncHero();});};
    if(video){
      video.pause();
      video.addEventListener('loadedmetadata',()=>{try{video.currentTime=.05;}catch(e){} syncHero();},{once:true});
      video.addEventListener('canplay',syncHero,{once:true});
    }
    window.addEventListener('scroll',requestSync,{passive:true});
    window.addEventListener('resize',requestSync);
    syncHero();
  }
  const cg=document.getElementById('categoryGrid'); if(cg) cg.innerHTML=categories().map(c=>categoryIconCard(c)).join('');
  const ritual=document.getElementById('ritualGrid'); if(ritual){
    const data=[['Daily Energy','Dates, almonds, chia and oats for office, school and breakfast routines.','energy'],['Summer Cooling','Goond Katira, chia, basil-style seeds and cooling herbs for hot Pakistani weather.','cooling'],['Premium Gifting','Saffron-style luxury, dates, mewa and nuts for family occasions.','gifting'],['Digestive Pantry','Ajwain, psyllium husk, fruit salt and GutEase-style ingredients for careful routines.','digestive']];
    ritual.innerHTML=data.map(([t,d,q])=>`<a class="ritual-card" href="shop.html?search=${q}"><span>${esc(q)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></a>`).join('')
  }
  const bannerStrip=document.getElementById('bannerStrip'); if(bannerStrip){bannerStrip.innerHTML=['Dry Fruits','Nuts','Seeds','Herbs','Natural Sweeteners'].map(c=>categoryIconCard(c,true)).join('')}
  const story=document.getElementById('storyImages'); if(story){['/assets/banners/botanicals-heritage.jpg','/assets/banners/cold-pressed-oils.jpg','/assets/banners/berries-fruits.jpg'].forEach((src,i)=>story.insertAdjacentHTML('beforeend',`<img src="${src}" alt="Morganics editorial banner ${i+1}" loading="lazy">`))}
  const fg=document.getElementById('featuredGrid'); if(fg){const picks=['ajwa-dates','ashwagandha','chia-seeds','honey','american-almonds','phool-makhana','goji-berry','gond-katira','pista-maghaz','kajo-sada','saffron']; fg.innerHTML=productRail(picks) || products.slice(0,8).map(card).join('')}
  initRitualFilmCarousel();
}

/* ── Proof section carousel ─────────────────────────────────────────
   Powers the cinematic “Real People. Real Routines. Real Morganics.”
   section. Continuous CSS marquee + arrow nudge + touch swipe.
   Cards open a bottom-sheet drawer with full review story.
   ─────────────────────────────────────────────────────────────────── */
function initSignalCarousel(){
  const track  = document.getElementById('proofTrack');
  const dotsEl = document.getElementById('proofDots');
  const wrap   = document.querySelector('[data-proof-carousel]');
  const reviews = window.MORGANICS_REVIEWS || [];
  if(!track || !reviews.length || track.dataset.ready==='1') return;

  /* ── Helpers ── */
  const star = n => '★'.repeat(Math.round(Number(n)||5));
  const productHref = r => {
    const norm = s => (s||'').toLowerCase().replace(/[^a-z0-9]/g,' ').trim();
    const exact = products.find(p => norm(p.name) === norm(r.product));
    const fuzzy = exact || products.find(p =>
      norm(p.name).includes(norm(r.product)) || norm(r.product).includes(norm(p.name)));
    return fuzzy ? productUrl(fuzzy) : `shop.html?search=${encodeURIComponent(r.product)}`;
  };

  /* ── Build a single card ── */
  const buildCard = (r, globalIdx) => {
    const el = document.createElement('article');
    el.className = 'proof-card';
    el.setAttribute('data-lang', esc(r.language));
    el.setAttribute('data-idx', String(globalIdx % reviews.length));
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `${esc(r.name)} — ${esc(r.review.slice(0,60))}…`);
    el.innerHTML = `
      <div class=”proof-card-photo”>
        <img src=”${esc(r.image)}” alt=”${esc(r.name)} with Morganics ${esc(r.product)}” loading=”lazy”>
        <div class=”proof-card-tags”>
          <span class=”proof-card-product”>${esc(r.product)}</span>
          <span class=”proof-card-lang”>${esc(r.language)}</span>
        </div>
        <span class=”proof-card-badge”>Customer Story</span>
      </div>
      <span class=”proof-card-quote” aria-hidden=”true”>”</span>
      <div class=”proof-card-body”>
        <div class=”proof-card-stars” aria-label=”${esc(String(r.rating))} out of 5 stars”>${star(r.rating)}</div>
        <p class=”proof-card-text”>${esc(r.review)}</p>
        <div class=”proof-card-person”>
          <div class=”proof-card-avatar”>
            <img src=”${esc(r.image)}” alt=”${esc(r.name)}” loading=”lazy” aria-hidden=”true”>
          </div>
          <div class=”proof-card-meta”>
            <span class=”proof-card-name”>${esc(r.name)}</span>
            <span class=”proof-card-role”>${esc(r.role)}</span>
          </div>
          ${r.city ? `<span class=”proof-card-city”>📍${esc(r.city)}</span>` : ''}
        </div>
      </div>`;
    return el;
  };

  /* ── Populate track with 2 full sets for seamless loop ── */
  const allCards = [...reviews, ...reviews];
  track.innerHTML = '';
  allCards.forEach((r, i) => track.appendChild(buildCard(r, i)));

  /* ── Dots ── */
  const renderDots = (active = 0) => {
    if(!dotsEl) return;
    dotsEl.innerHTML = reviews.map((_, i) =>
      `<button class=”proof-dot${i===active?' active':''}” data-dot=”${i}” aria-label=”Review ${i+1}”></button>`
    ).join('');
  };
  renderDots(0);

  /* ── Arrow nudge ── */
  let currentIdx = 0;
  const nudge = (delta) => {
    const first = track.querySelector('.proof-card');
    if(!first) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 18;
    const cardW = first.getBoundingClientRect().width + gap;
    currentIdx = ((currentIdx + delta) % reviews.length + reviews.length) % reviews.length;
    track.classList.add('is-stepped');
    track.style.setProperty('--proof-offset', `${-currentIdx * cardW}px`);
    renderDots(currentIdx);
    clearTimeout(track._resumeT);
    track._resumeT = setTimeout(() => {
      track.classList.remove('is-stepped');
      track.style.removeProperty('--proof-offset');
    }, 2800);
  };

  document.getElementById('proofPrev')?.addEventListener('click', () => nudge(-1));
  document.getElementById('proofNext')?.addEventListener('click', () => nudge(1));
  dotsEl?.addEventListener('click', e => {
    const b = e.target.closest('[data-dot]');
    if(b){ const t = Number(b.dataset.dot); nudge(t - currentIdx); }
  });

  /* ── Touch swipe ── */
  let sx = 0;
  wrap?.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
  wrap?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if(Math.abs(dx) > 48) nudge(dx < 0 ? 1 : -1);
  }, {passive:true});

  /* ── Keyboard on cards ── */
  track.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const card = e.target.closest('.proof-card');
      if(card) openDrawer(Number(card.dataset.idx));
    }
  });

  /* ── Card click → drawer ── */
  track.addEventListener('click', e => {
    const card = e.target.closest('.proof-card');
    if(card) openDrawer(Number(card.dataset.idx));
  });

  /* ── Review drawer ── */
  const drawer   = document.getElementById('proofDrawer');
  const drawerBd = document.getElementById('proofDrawerBody');
  const closeBtn = document.getElementById('proofDrawerClose');
  const backdrop = document.getElementById('proofDrawerBackdrop');

  const openDrawer = (idx) => {
    const r = reviews[idx];
    if(!r || !drawer || !drawerBd) return;
    drawerBd.innerHTML = `
      <div class=”pd-photo”><img src=”${esc(r.image)}” alt=”${esc(r.name)}” loading=”lazy”></div>
      <div class=”pd-stars” aria-label=”${esc(String(r.rating))} out of 5 stars”>${star(r.rating)} <small style=”color:rgba(247,241,230,.52);font-size:13px;font-weight:800;vertical-align:middle;margin-left:6px”>${r.rating}/5</small></div>
      <p class=”pd-review” data-lang=”${esc(r.language)}”>”${esc(r.review)}”</p>
      <div class=”pd-person”>
        <img src=”${esc(r.image)}” alt=”${esc(r.name)}”>
        <div>
          <b>${esc(r.name)}</b>
          <small>${esc(r.role)}${r.city ? ' · ' + esc(r.city) : ''}</small>
        </div>
      </div>
      <a class=”pd-cta” href=”${esc(productHref(r))}”>Shop ${esc(r.product)} →</a>`;
    drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer?.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if(e.key==='Escape') closeDrawer(); });

  track.dataset.ready = '1';
}

function initRitualFilmCarousel(){
  const root = document.querySelector('[data-ritual-film]');
  const track = root?.querySelector('[data-ritual-track]');
  const dots = root?.querySelector('[data-ritual-dots]');
  const reviews = window.customerStories || [];
  if(!root || !track || !dots || !reviews.length || root.dataset.ready === '1') return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stars = rating => '★'.repeat(Math.max(1, Math.min(5, Math.round(Number(rating)||5))));
  const slugify = value => String(value||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const productHref = story => {
    const productSlug = slugify(story.product);
    const urlSlug = String(story.productUrl||'').split('/').filter(Boolean).pop();
    const aliases = {
      'maghaz-akhrot': 'maghaz-akhrot-walnut',
      'badam-sabat': 'almond-with-shell',
      'black-munaqqa': 'munakka-black',
      'chia-seeds': '',
      'pumpkin-seeds': ''
    };
    const candidates = [urlSlug, productSlug, aliases[urlSlug], aliases[productSlug]].filter(Boolean);
    const matched = products.find(p => candidates.includes(p.id)) ||
      products.find(p => candidates.some(slug => slugify(p.name) === slug || slugify(p.name).includes(slug) || slug.includes(slugify(p.name))));
    return matched ? productUrl(matched) : `shop.html?search=${encodeURIComponent(story.product)}`;
  };
  const imageSrc = src => String(src||'').replace(/^\//,'');

  const cardHtml = (story, index, role) => {
    const href = productHref(story);
    const isActive = role === 'active';
    return `<article class="ritual-film-card ritual-film-card--${role}" data-ritual-card data-index="${index}" data-href="${esc(href)}" tabindex="0" role="link" aria-label="${esc(story.name)} customer story for ${esc(story.product)}">
      <div class="ritual-film-media">
        <img src="${esc(imageSrc(story.image))}" alt="${esc(story.name)} using Morganics ${esc(story.product)}" loading="eager">
        <div class="ritual-film-overlay">
          <div class="ritual-film-meta">
            <span>${esc(story.ritual)}</span>
            <b>${esc(story.product)}</b>
          </div>
          ${isActive ? `<p>${esc(story.quote)}</p>
          <div class="ritual-film-footer">
            <span class="ritual-film-rating" aria-label="${esc(String(story.rating))} out of 5 stars">${stars(story.rating)} <em>${esc(Number(story.rating).toFixed(1))}</em></span>
            <span class="ritual-film-person">${esc(story.name)} · ${esc(story.city)}</span>
            <a class="ritual-film-cta" href="${esc(href)}">View Product</a>
          </div>` : ''}
        </div>
      </div>
    </article>`;
  };

  let activeIndex = 0;
  let startX = 0;
  let dragging = false;
  let pointerCardIndex = null;
  const moodColors = {
    'warm-cream': 'rgba(223,165,36,.20)',
    'deep-gym-green': 'rgba(40,93,83,.34)',
    'family-amber': 'rgba(190,121,45,.24)',
    'tea-brown': 'rgba(132,99,69,.30)',
    'fitness-green': 'rgba(65,112,71,.30)',
    'creator-warmth': 'rgba(223,165,36,.24)',
    'outdoor-green': 'rgba(93,135,82,.28)'
  };

  function wrapped(index){
    return (index + reviews.length) % reviews.length;
  }

  function render(){
    const prev = wrapped(activeIndex - 1);
    const next = wrapped(activeIndex + 1);
    track.innerHTML = [
      cardHtml(reviews[prev], prev, 'side ritual-film-card--left'),
      cardHtml(reviews[activeIndex], activeIndex, 'active'),
      cardHtml(reviews[next], next, 'side ritual-film-card--right')
    ].join('');
    dots.innerHTML = reviews.map((story,index)=>`<button type="button" class="${index===activeIndex?'is-active':''}" data-ritual-dot="${index}" aria-label="Open ${esc(story.name)} story"></button>`).join('');
    const mood = reviews[activeIndex].mood || {};
    root.style.setProperty('--ritual-glow', moodColors[mood.glow] || 'rgba(223,165,36,.18)');
    root.style.setProperty('--ritual-accent', mood.accent || '#DFA524');
  }

  function setActive(index){
    activeIndex = wrapped(index);
    root.classList.remove('is-switching');
    void root.offsetWidth;
    root.classList.add('is-switching');
    render();
  }

  function move(delta){
    setActive(activeIndex + delta);
  }

  root.querySelector('[data-ritual-prev]')?.addEventListener('click',()=>move(-1));
  root.querySelector('[data-ritual-next]')?.addEventListener('click',()=>move(1));

  dots.addEventListener('click',e=>{
    const button = e.target.closest('[data-ritual-dot]');
    if(button) setActive(Number(button.dataset.ritualDot));
  });

  track.addEventListener('click',e=>{
    if(e.target.closest('.ritual-film-cta')) return;
    const card = e.target.closest('[data-ritual-card]');
    if(!card) return;
    const index = Number(card.dataset.index);
    if(index === activeIndex){
      window.location.href = card.dataset.href || 'shop.html';
    }else{
      setActive(index);
    }
  });

  track.addEventListener('keydown',e=>{
    if(e.key === 'ArrowLeft'){ e.preventDefault(); move(-1); }
    if(e.key === 'ArrowRight'){ e.preventDefault(); move(1); }
    if(e.key === 'Enter'){
      const card = e.target.closest('[data-ritual-card].ritual-film-card--active');
      if(card) window.location.href = card.dataset.href || 'shop.html';
    }
  });

  track.addEventListener('pointerdown',e=>{
    dragging = true;
    startX = e.clientX;
    const card = e.target.closest?.('[data-ritual-card]');
    pointerCardIndex = card ? Number(card.dataset.index) : null;
    track.setPointerCapture?.(e.pointerId);
  });

  track.addEventListener('pointerup',e=>{
    if(!dragging) return;
    dragging = false;
    const delta = e.clientX - startX;
    if(Math.abs(delta) > 46){
      move(delta < 0 ? 1 : -1);
    }else if(Number.isFinite(pointerCardIndex) && pointerCardIndex !== activeIndex){
      setActive(pointerCardIndex);
    }
    pointerCardIndex = null;
  });
  track.addEventListener('pointercancel',()=>{dragging=false;pointerCardIndex=null;});
  track.addEventListener('touchstart',e=>{
    startX = e.changedTouches?.[0]?.clientX || 0;
  },{passive:true});
  track.addEventListener('touchend',e=>{
    const endX = e.changedTouches?.[0]?.clientX || startX;
    const delta = endX - startX;
    if(Math.abs(delta) > 46) move(delta < 0 ? 1 : -1);
  },{passive:true});

  if(!reduced){
    root.addEventListener('pointermove',e=>{
      const active = root.querySelector('.ritual-film-card--active');
      if(!active || matchMedia('(max-width: 760px)').matches) return;
      const rect = active.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - .5) * 2;
      const py = ((e.clientY - rect.top) / rect.height - .5) * 2;
      active.style.setProperty('--tilt-x', `${(-py * 3).toFixed(2)}deg`);
      active.style.setProperty('--tilt-y', `${(px * 4).toFixed(2)}deg`);
    }, {passive:true});
    root.addEventListener('pointerleave',()=>{
      const active = root.querySelector('.ritual-film-card--active');
      active?.style.removeProperty('--tilt-x');
      active?.style.removeProperty('--tilt-y');
    });
  }

  render();
  root.dataset.ready = '1';
}

function initDayCarousel(){
  const root=document.getElementById('dayCarousel');
  if(!root || root.dataset.ready==='1')return;
  const slides=[
    {nav:'Family', title:'Family Pantry', sub:'Dates, mewa and nuts for home tables and hospitality.', cta:'Shop Family Staples', href:'shop.html?search=dates', bg:catMeta('Dry Fruits').banner, icon:categoryIcon('Dry Fruits')},
    {nav:'Energy', title:'Daily Energy', sub:'Badam, chia and dates for breakfast, office and school.', cta:'Shop Energy Picks', href:'shop.html?search=energy', bg:catMeta('Nuts').banner, icon:categoryIcon('Nuts')},
    {nav:'Cooling', title:'Summer Cooling', sub:'Goond Katira, chia and seeds for hot Pakistani days.', cta:'Shop Cooling Rituals', href:'shop.html?search=cooling', bg:catMeta('Seeds').banner, icon:categoryIcon('Seeds')},
    {nav:'Digestive', title:'Digestive Pantry', sub:'Ajwain, isabgol and fruit salt for careful daily use.', cta:'Shop Digestive Pantry', href:'shop.html?search=digestive', bg:catMeta('Herbs').banner, icon:categoryIcon('Herbs')},
    {nav:'Gifting', title:'Ramadan & Gifting', sub:'Dates, saffron, honey and mewa for thoughtful occasions.', cta:'Shop Gift Ready', href:'shop.html?search=gifting', bg:catMeta('Natural Sweeteners').banner, icon:categoryIcon('Natural Sweeteners')}
  ];
  const stage=root.querySelector('[data-day-stage]');
  const nav=root.querySelector('[data-day-nav]');
  const dots=root.querySelector('[data-day-dots]');
  const prev=root.querySelector('[data-day-prev]');
  const next=root.querySelector('[data-day-next]');
  if(!stage || !nav || !dots)return;
  let active=0,timer=null,startX=0;
  const mod=n=>(n+slides.length)%slides.length;
  const slideHtml=(idx)=>{const r=slides[mod(idx)];return `<a class="life-routine-card" href="${esc(r.href)}"><img src="${esc(r.icon)}" alt="" loading="lazy"><span><small>${esc(r.nav)} Routine</small><b>${esc(r.title)}</b><em>${esc(r.sub)}</em><strong>${esc(r.cta)} <i>→</i></strong></span></a>`};
  function render(){
    stage.innerHTML=slideHtml(active);
    nav.innerHTML=slides.map((r,i)=>`<button type="button" class="${i===active?'active':''}" data-day-i="${i}"><span>${esc(r.nav)}</span></button>`).join('');
    dots.innerHTML=slides.map((_,i)=>`<button type="button" class="${i===active?'active':''}" data-day-i="${i}" aria-label="Show routine ${i+1}"></button>`).join('');
  }
  function go(n){active=mod(n);render();}
  function start(){stop();timer=setInterval(()=>go(active+1),5600)}
  function stop(){if(timer)clearInterval(timer);timer=null;}
  prev&&prev.addEventListener('click',()=>go(active-1));
  next&&next.addEventListener('click',()=>go(active+1));
  root.addEventListener('click',e=>{const b=e.target.closest('[data-day-i]');if(b)go(Number(b.dataset.dayI));});
  root.addEventListener('mouseenter',stop); root.addEventListener('mouseleave',start);
  root.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});
  root.addEventListener('touchend',e=>{const dx=(e.changedTouches[0].clientX-startX); if(Math.abs(dx)>45)go(active+(dx<0?1:-1));},{passive:true});
  root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(active-1); if(e.key==='ArrowRight')go(active+1);});
  render(); start(); root.dataset.ready='1';
}

function initHomeIngredientShowcase(){
  const root=document.getElementById('homeIngredientRows');
  if(!root || root.dataset.ready==='1')return;
  const ingredients=Array.isArray(window.MORGANICS_INGREDIENTS)?window.MORGANICS_INGREDIENTS:[];
  if(!ingredients.length){root.innerHTML='<p class="home-ingredient-empty">Ingredient data is not loaded.</p>';return;}

  // Normalise an image path: strip leading "/" so it works as a relative URL
  const normImg=src=>String(src||'').replace(/^\//,'');

  const slugify=v=>String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const byId=new Map(products.map(p=>[p.id,p]));
  const byName=new Map(products.map(p=>[slugify(p.name),p]));
  const ingredientToProduct=(ing)=>
    byId.get(ing.slug)||
    byId.get(ing.id)||
    byName.get(slugify(ing.name))||
    products.find(p=>slugify(p.name).includes(slugify(ing.name))||slugify(ing.name).includes(slugify(p.name)));

  const thumb=(ing,p)=>{
    const label=String(ing.name||'M').split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
    // Prefer product image (relative), then ingredient directImage (normalised), then crop sprite
    const src=normImg((p&&p.image)||ing.directImage||'');
    if(src) return `<span class="home-ing-thumb"><span>${esc(label)}</span><img src="${esc(src)}" alt="${esc(ing.name)}" loading="lazy" onerror="this.style.display='none'"></span>`;
    const c=ing.crop||{x:0,y:0,sourceWidth:1024,sourceHeight:1024,scale:1};
    const source=normImg(ing.sourceImage||'assets/products/01-zarishk.jpg');
    return `<span class="home-ing-thumb crop"><span>${esc(label)}</span><i><img src="${esc(source)}" style="width:${Number(c.sourceWidth)||1024}px;height:${Number(c.sourceHeight)||1024}px;transform:translate(-${Number(c.x)||0}px,-${Number(c.y)||0}px) scale(${Number(c.scale)||1})" loading="lazy" alt=""></i></span>`;
  };

  const card=(ing)=>{
    const p=ingredientToProduct(ing);
    const href=p?productUrl(p):`shop.html?search=${encodeURIComponent(ing.name)}`;
    const price=p?money(p.price):'View product';
    const cat=(p&&p.category)||ing.category||'';
    const name=(p&&p.name)||ing.name;
    return `<a class="home-ing-card" href="${esc(href)}" title="${esc(name)}" aria-label="${esc(name)} — ${esc(price)}">${thumb(ing,p)}<span class="home-ing-copy"><small>${esc(cat)}</small><b>${esc(name)}</b><em>${esc(price)}</em></span></a>`;
  };

  // Split into 3 rows; repeat x3 so seamless infinite loop
  const rows=[ingredients.slice(0,26),ingredients.slice(26,52),ingredients.slice(52,76)];
  root.innerHTML=rows.map((row,i)=>{
    const cards=[...row,...row,...row].map(card).join('');
    return `<div class="home-ing-row" data-dir="${i===1?'1':'-1'}"><div class="home-ing-track">${cards}</div></div>`;
  }).join('');
  root.dataset.ready='1';

  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  // Base speeds (px/frame at 60fps) — row 1 left, row 2 right, row 3 left
  const BASE=[0.55, 0.42, 0.48];
  const rowEls=[...root.querySelectorAll('.home-ing-row')].map((row,i)=>({
    track:row.querySelector('.home-ing-track'),
    pos:0,
    dir:i===1?1:-1,
    base:BASE[i]||0.5,
    boost:0
  }));

  let paused=false;
  const showcase=root.closest('.home-ingredient-showcase');
  if(showcase){
    showcase.addEventListener('mouseenter',()=>{paused=true;},{passive:true});
    showcase.addEventListener('mouseleave',()=>{paused=false;},{passive:true});
  }

  // Scroll boost: extra speed when user scrolls
  let lastY=window.scrollY, scrollBoost=0;
  window.addEventListener('scroll',()=>{
    const y=window.scrollY; scrollBoost=Math.abs(y-lastY)*0.12; lastY=y;
  },{passive:true});

  let rafId;
  function tick(){
    if(!paused){
      rowEls.forEach(r=>{
        const half=(r.track.scrollWidth||0)/3;
        if(!half){rafId=requestAnimationFrame(tick);return;}
        const speed=r.base+(scrollBoost*r.base);
        r.pos += speed*r.dir;
        if(r.pos<=-half) r.pos+=half;
        if(r.pos>=half)  r.pos-=half;
        r.track.style.transform=`translate3d(${r.pos.toFixed(2)}px,0,0)`;
      });
      scrollBoost*=0.88; // decay boost
    }
    rafId=requestAnimationFrame(tick);
  }
  tick();
}

function renderShop(){
  const grid=document.getElementById('shopGrid'); if(!grid)return;
  const search=document.getElementById('searchInput'),catSel=document.getElementById('categorySelect'),sort=document.getElementById('sortSelect'),count=document.getElementById('shopCount');
  if(!catSel.dataset.ready){
    categories().forEach(c=>catSel.insertAdjacentHTML('beforeend',`<option>${esc(c)}</option>`));
    catSel.value=qs.get('category')||''; search.value=qs.get('search')||'';
    document.getElementById('sideCategories').innerHTML=`<button class="cat-filter active" data-cat="">All Products (${products.length})</button>`+categories().map(c=>`<button class="cat-filter" data-cat="${esc(c)}">${esc(c)} (${products.filter(p=>p.category===c).length})</button>`).join('');
    document.querySelectorAll('.cat-filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.cat-filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');catSel.value=b.dataset.cat;renderShop()});
    ['input','change'].forEach(e=>{search.addEventListener(e,renderShop);catSel.addEventListener(e,renderShop);sort.addEventListener(e,renderShop)});
    document.getElementById('clearFilters').onclick=()=>{search.value='';catSel.value='';sort.value='name';renderShop()}; catSel.dataset.ready='1';
  }
  let q=(search.value||'').toLowerCase().trim(),cat=catSel.value;
  let arr=products.filter(p=>!cat||p.category===cat).filter(p=>!q||[p.name,p.urduName,p.urduTitle,p.sku,p.category,p.shortDescription,p.keywords,...(p.aliases||[]),...(p.useCases||[]),...(p.benefits||[])].join(' ').toLowerCase().includes(q));
  if(sort.value==='category')arr.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name)); else if(sort.value==='priceLow')arr.sort((a,b)=>a.price-b.price); else if(sort.value==='priceHigh')arr.sort((a,b)=>b.price-a.price); else arr.sort((a,b)=>a.name.localeCompare(b.name));
  count.textContent=`Showing ${arr.length} of ${products.length} products`; grid.innerHTML=arr.map(card).join('')||'<p>No products found.</p>';
}

function faqListHtml(faqs){
  return (faqs||[]).filter(Boolean).map(item=>{
    if(typeof item === 'string') return `<li>${esc(item)}</li>`;
    return `<li><b>${esc(item.q||'Question')}</b><span>${esc(item.a||'')}</span></li>`;
  }).join('');
}
function normalizeFaqItem(item,idx=0){
  if(!item)return null;
  if(typeof item === 'string'){
    const cut=item.indexOf('?');
    if(cut>-1)return {q:item.slice(0,cut+1).trim(),a:item.slice(cut+1).trim()};
    return {q:`Product question ${idx+1}`,a:item.trim()};
  }
  return {q:String(item.q||item.question||`Product question ${idx+1}`).trim(),a:String(item.a||item.answer||'').trim()};
}
function productFaqItems(p,m){
  const source=Array.isArray(p?.faqs)&&p.faqs.length?p.faqs:(Array.isArray(m?.faqs)?m.faqs:[]);
  const normalized=source.map(normalizeFaqItem).filter(item=>item&&item.q&&item.a);
  if(normalized.length)return normalized;
  const usage=p?.usage||m?.usage||'Use this product in sensible portions as part of your daily routine.';
  const storage=p?.storage||m?.storage||'Keep sealed in a cool, dry place away from sunlight, heat and moisture.';
  const safety=p?.precautions||m?.safety||'Use according to your routine and personal dietary needs.';
  return [
    {q:`How can I use ${p?.name||'this product'}?`,a:usage},
    {q:`How should I store ${p?.name||'this product'}?`,a:storage},
    {q:`Is ${p?.name||'this product'} a medicine?`,a:`No. ${p?.name||'This product'} is a food, pantry, or traditional-use ingredient. It is not a medicine and does not diagnose, cure, treat, or prevent disease.`},
    {q:'What should I know before using it?',a:safety}
  ];
}
function productFaqSection(p,m){
  const items=productFaqItems(p,m);
  if(!items.length)return '';
  const slug=String(p?.id||'product').replace(/[^a-z0-9_-]+/gi,'-');
  return `<section class="product-faq-section" id="product-faq"><div class="product-faq-container"><p class="section-eyebrow">Product FAQ</p><h2>Questions about this product</h2><div class="product-faq-accordion">${items.map((item,idx)=>{
    const answerId=`product-faq-${esc(slug)}-${idx+1}`;
    return `<div class="product-faq-item"><button class="product-faq-question" type="button" aria-expanded="false" aria-controls="${answerId}"><span>${esc(item.q)}</span><span class="faq-icon" aria-hidden="true"></span></button><div class="product-faq-answer" id="${answerId}" hidden><p>${esc(item.a)}</p></div></div>`;
  }).join('')}</div></div></section>`;
}
function initProductFaqAccordion(scope=document){
  const accordions=scope.querySelectorAll('.product-faq-accordion');
  accordions.forEach(acc=>{
    if(acc.dataset.ready==='1')return;
    acc.dataset.ready='1';
    acc.querySelectorAll('.product-faq-answer').forEach(panel=>{
      panel.hidden=true;
      panel.style.maxHeight='0px';
    });
    acc.addEventListener('click',e=>{
      const btn=e.target.closest('.product-faq-question');
      if(!btn||!acc.contains(btn))return;
      const panel=document.getElementById(btn.getAttribute('aria-controls'));
      if(!panel)return;
      const isOpen=btn.getAttribute('aria-expanded')==='true';
      acc.querySelectorAll('.product-faq-question[aria-expanded="true"]').forEach(openBtn=>{
        if(openBtn===btn)return;
        const openPanel=document.getElementById(openBtn.getAttribute('aria-controls'));
        openBtn.setAttribute('aria-expanded','false');
        if(openPanel){
          openPanel.style.maxHeight=`${openPanel.scrollHeight}px`;
          requestAnimationFrame(()=>{openPanel.style.maxHeight='0px';});
          setTimeout(()=>{if(openBtn.getAttribute('aria-expanded')!=='true')openPanel.hidden=true;},260);
        }
      });
      btn.setAttribute('aria-expanded',String(!isOpen));
      if(isOpen){
        panel.style.maxHeight=`${panel.scrollHeight}px`;
        requestAnimationFrame(()=>{panel.style.maxHeight='0px';});
        setTimeout(()=>{if(btn.getAttribute('aria-expanded')!=='true')panel.hidden=true;},260);
      }else{
        panel.hidden=false;
        panel.style.maxHeight='0px';
        requestAnimationFrame(()=>{panel.style.maxHeight=`${panel.scrollHeight}px`;});
      }
    });
  });
}

function initCategoryPage(){
  const root=document.getElementById('categoryRoot'); if(!root)return;
  const requested=qs.get('category')||categories()[0]; const cat=categories().find(c=>c.toLowerCase()===requested.toLowerCase())||requested; const m=catMeta(cat); const arr=products.filter(p=>p.category===cat);
  document.title=m.seoTitle||`${m.title} | Morganics Pakistan`; document.querySelector('meta[name="description"]')?.setAttribute('content',m.metaDescription||`${m.kicker}. Shop ${arr.length} Morganics ${cat} products online in Pakistan with premium product pages and real images.`);
  root.innerHTML=`<section class="category-hero" style="--banner:url('${esc(m.banner)}')"><div><a class="crumb" href="shop.html">← All products</a><span class="eyebrow">${arr.length} products</span><h1>${esc(m.title)}</h1><p>${esc(m.copy)}</p><div class="hero-actions"><a class="btn primary" href="#categoryProducts">Shop ${esc(cat)}</a><a class="btn ghost" href="shop.html">Open full shop</a></div></div></section><section class="category-intro"><div class="intro-card"><span class="eyebrow">Best for</span><h2>${esc(m.ritual)}</h2><p>${esc(m.usage||'Choose the ingredient, understand its daily use, and add it to your kitchen, wellness routine or gift box.')}</p></div></section><section class="section"><div class="detail-grid"><div class="info-box"><h3>Storage Care</h3><p>${esc(m.storage||'Keep products sealed in a cool, dry place away from sunlight and moisture.')}</p></div><div class="info-box"><h3>Safety Note</h3><p>${esc(m.safety||'Use according to your routine and personal dietary needs.')}</p></div><div class="info-box"><h3>Category FAQs</h3><ul>${faqListHtml(m.faqs)}</ul></div></div></section><section class="section" id="categoryProducts"><div class="section-head"><span class="eyebrow">${esc(cat)}</span><h2>Products in this category.</h2><p>Open any product to see its use, benefits, usage guidance, storage and precautions.</p></div><div class="product-grid">${arr.map(card).join('')}</div></section><section class="section category-more"><div class="section-head"><span class="eyebrow">Explore more</span><h2>More ways to shop Morganics.</h2></div><div class="category-grid mini">${categories().filter(c=>c!==cat).slice(0,4).map(c=>categoryBanner(c,true)).join('')}</div></section>`;
}


const ORDER_API={url:'https://script.google.com/macros/s/AKfycbyohRbD5j5PcpVNRRzryqP-kgkD_0Aaw2cryKLGrvzkQ-qOqtfZfj4aJ7MKBmAV4CI/exec',key:'MORGANICS_2026_PRIVATE'};
const CART_KEY='morganics_cart_v1';
const icon=(name)=>{const paths={
cart:'<circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H7"/>',
truck:'<path d="M3 7h10v9H3z"/><path d="M13 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
cash:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9h.01M18 15h.01"/>',
leaf:'<path d="M5 19c8-2 13-7 14-14-7 1-12 6-14 14Z"/><path d="M5 19c3-4 7-7 12-10"/>',
gift:'<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M12 9v11M4 13h16"/><path d="M8 9c-2-2-1-5 2-4 2 1 2 4 2 4M16 9c2-2 1-5-2-4-2 1-2 4-2 4"/>',
shield:'<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
minus:'<path d="M5 12h14"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
trash:'<path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13"/>',
seed:'<path d="M12 4v16"/><path d="M12 8C8 5 5 7 4 10c4 2 6 1 8-2Z"/><path d="M12 14c4-3 7-1 8 2-4 2-6 1-8-2Z"/>',
nut:'<path d="M12 3c4 3 7 6 7 11a7 7 0 0 1-14 0c0-5 3-8 7-11Z"/><path d="M9 13c1.7 1.2 4.3 1.2 6 0"/>',
cup:'<path d="M5 8h10v5a5 5 0 0 1-10 0V8Z"/><path d="M15 9h2a2 2 0 0 1 0 4h-2"/><path d="M4 20h13"/>',
star:'<path d="m12 3 2.4 5 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L12 3Z"/>'};const body=paths[name]||paths.leaf;return `<svg class="svg-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`}

function getCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []}}
function setCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartBadge()}
function cartCount(){return getCart().reduce((s,i)=>s+Number(i.qty||0),0)}
function updateCartBadge(){
  const count=cartCount();
  document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=count);
  const fab=document.querySelector('.cart-fab');
  if(fab){
    fab.classList.toggle('is-hidden',count===0);
    fab.classList.remove('is-updated');
    void fab.offsetWidth;
    if(count>0) fab.classList.add('is-updated');
  }
}
function lineTotal(i){return Number(i.price||0)*Number(i.qty||1)}
function cartTotal(){return getCart().reduce((s,i)=>s+lineTotal(i),0)}
function formatPackSize(grams){return Number(grams)===1000?'1kg':`${Number(grams)}g`}
function variantOptions(p){
  const base=Number(p.price||0);
  const gramVariants=Array.isArray(p.sizesGram)&&p.sizesGram.length?p.sizesGram.map(g=>({size:formatPackSize(g),grams:Number(g)})):null;
  const storedVariants=Array.isArray(p.variants)&&p.variants.length?p.variants.map(v=>({size:v.size||formatPackSize(v.grams),grams:Number(v.grams)||null,price:v.price})):null;
  const exact=gramVariants||storedVariants;
  if(exact){
    const multipliers=exact.length===2?[1,2.25]:exact.length===3?[1,2.25,4.15]:[1,1.85,4.15,7.7];
    return exact.map((v,idx)=>({size:v.size,grams:v.grams,price:Number(v.price)||Math.max(199,Math.round(base*(multipliers[idx]||1))),label:v.size}));
  }
  const cat=p.category||'';
  let sizes=['100g','250g','500g','1kg'];
  if(/Honey|Sweeteners/.test(cat))sizes=['250g','500g','1kg'];
  if(/Botanicals|Herbs|Gums/.test(cat))sizes=['50g','100g','200g'];
  if(/Saffron/i.test(p.name))sizes=['1g','2g','5g'];
  return sizes.map((size,idx)=>({size,price:Math.max(199,Math.round(base*([.55,1,1.85,3.55][idx]||1))),label:size}))
}
function selectedProductForCart(p){const size=document.querySelector('input[name="packSize"]:checked')?.value || (p.size||'Standard Pack');const vo=variantOptions(p).find(v=>v.size===size);const powder=document.getElementById('powderToggle')?.checked||false;const qty=Math.max(1,Number(document.getElementById('qtyInput')?.value||1));return {id:p.id,sku:p.sku,name:p.name,urduName:p.urduName,category:p.category,image:p.image,size,form:powder?'Powder Form':'Whole / Regular',price:vo?vo.price:Number(p.price||0),qty}}
function addToCart(item){const cart=getCart();const key=[item.id,item.size,item.form].join('|');const found=cart.find(i=>i.key===key);if(found)found.qty+=item.qty;else cart.push({...item,key});setCart(cart);openCartDrawer()}
function changeQty(key,delta){const cart=getCart().map(i=>i.key===key?{...i,qty:Math.max(1,Number(i.qty||1)+delta)}:i);setCart(cart);renderCartDrawer();renderCartPage()}
function removeCartItem(key){setCart(getCart().filter(i=>i.key!==key));renderCartDrawer();renderCartPage()}
function installCartShell(){if(document.getElementById('cartDrawer'))return;document.body.insertAdjacentHTML('beforeend',`<button class="cart-fab floating-cart" type="button" aria-label="Open cart" onclick="openCartDrawer()"><span>${icon('cart')}</span><b class="floating-cart-count" data-cart-count>0</b></button><aside class="cart-drawer" id="cartDrawer"><div class="cart-head"><div><b>${icon('cart')} Shopping Cart</b><small>Cash on Delivery checkout</small></div><button onclick="closeCartDrawer()">×</button></div><div id="cartDrawerBody" class="cart-body"></div></aside><div class="cart-backdrop" id="cartBackdrop" onclick="closeCartDrawer()"></div><aside class="wishlist-drawer" id="wishlistDrawer"><div class="cart-head"><div><b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="18" height="18" style="vertical-align:middle;margin-right:6px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Favourites</b><small>Your saved products</small></div><button onclick="closeWishlistDrawer()">×</button></div><div id="wishlistDrawerBody" class="cart-body"></div></aside>`);const h=document.querySelector('.site-header');if(h&&!h.querySelector('.cart-header-btn')){h.insertAdjacentHTML('beforeend',`<a class="cart-header-btn" href="cart.html">${icon('cart')}<span class="cart-text">Cart</span><b data-cart-count>0</b></a>`);}if(h&&!h.querySelector('.wishlist-header-btn')){h.insertAdjacentHTML('beforeend',`<button class="wishlist-header-btn" onclick="openWishlistDrawer()" aria-label="Favourites"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><b class="wl-badge" data-wl-count style="display:none">0</b></button>`);}updateCartBadge();updateWishlistBadge();}
function installFloatingCartVisibility(){
  const fab=document.querySelector('.floating-cart');
  if(!fab || !('IntersectionObserver' in window))return;
  const targets=[document.querySelector('#story'),document.querySelector('#ingredientShowcase'),document.querySelector('footer.premium-footer')].filter(Boolean);
  if(!targets.length)return;
  const visible=new Set();
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting)visible.add(entry.target);
      else visible.delete(entry.target);
    });
    fab.classList.toggle('is-context-hidden',visible.size>0);
  },{root:null,threshold:0.08,rootMargin:'0px 0px -12% 0px'});
  targets.forEach(t=>io.observe(t));
}
function installHeroMobileNavVisibility(){
  const hero=document.getElementById('hero');
  if(!hero || !('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(entries=>{
    const visible=entries.some(entry=>entry.isIntersecting && entry.intersectionRatio>0.18);
    document.body.classList.toggle('hero-in-view',visible);
  },{threshold:[0,0.18,0.45],rootMargin:'0px 0px -12% 0px'});
  io.observe(hero);
}
const heroSpotlightProducts=[
  {id:"almond",productId:"almond-with-shell",title:"Badam Sabat",urduTitle:"بادام",category:"Premium Nuts",description:"Whole almonds for daily snacking, soaking, family serving, and premium pantry use.",fallbackImage:"assets/morganics-hero/almond.png",note:"Catalog product currently named Badam Abdul Wahidi."},
  {id:"pistachio",productId:"pista-maghaz",title:"Pista Maghaz",urduTitle:"پستہ مغز",category:"Premium Nuts",description:"Clean pistachio kernels for premium snacking, gifting, desserts, and everyday family routines.",fallbackImage:"assets/morganics-hero/pistachio.png"},
  {id:"cashew",productId:"kajo-sada",title:"Kajo Sada",urduTitle:"سادہ کاجو",category:"Premium Nuts",description:"Creamy cashews with a naturally rich bite for clean snacking, serving, and daily energy routines.",fallbackImage:"assets/morganics-hero/cashew.png"},
  {id:"fig",productId:"anjeer-fig",title:"Anjeer",urduTitle:"انجیر",category:"Dry Fruits",description:"Naturally sweet dried figs for clean snacking, breakfast bowls, and everyday nourishment.",fallbackImage:"assets/morganics-hero/fig.png"},
  {id:"date",productId:"khajoor-ajwa",title:"Ajwa Khajoor",urduTitle:"عجوہ کھجور",category:"Dry Fruits",description:"Soft premium Ajwa dates for daily nourishment, Ramadan tables, gifting, and traditional routines.",fallbackImage:"assets/morganics-hero/date.png",note:"Catalog product currently named Ajwa Dates."},
  {id:"black-raisin",productId:"munakka-black",title:"Black Munaqqa",urduTitle:"منقہ",category:"Dry Fruits",description:"Naturally sweet dried grapes for tea-time, family routines, and traditional pantry use.",fallbackImage:"assets/morganics-hero/black-raisin.png",note:"Catalog product currently named Munaqqa."},
  {id:"golden-raisin",productId:"sogi-small-mewa",title:"Munaqqa / Golden Raisin",urduTitle:"کشمش / منقہ",category:"Dry Fruits",description:"Naturally sweet golden dried grapes for snacking, breakfast bowls, gifting, and everyday pantry use.",fallbackImage:"assets/morganics-hero/golden-raisin.png",note:"No exact golden raisin product exists; using closest active raisin/kishmish product, Sogi Small Kishmish Mewa."}
];
function installHeroSpotlight(){
  const hero=document.getElementById('hero');
  const card=document.getElementById('heroSpotlightCard');
  const layer=hero?.querySelector('.hero-spotlight-layer');
  const clone=hero?.querySelector('.hero-spotlight-clone');
  if(!hero||!card||!layer||!clone)return;
  const spotlightMap=new Map(heroSpotlightProducts.map(item=>[item.id,item]));
  const isCoarse=()=>window.matchMedia('(pointer: coarse)').matches||window.innerWidth<768;
  let activeHotspot=null,closeTimer=null;
  const imgFor=hotspot=>hotspot.parentElement?.querySelector('img');
  const productForSpotlight=item=>products.find(p=>
    (item.productId && p.id===item.productId) ||
    (item.productSlug && p.slug===item.productSlug) ||
    (item.productSku && p.sku===item.productSku) ||
    (item.productName && p.name===item.productName)
  );
  const spotlightPrice=(product,storeProduct)=>{
    if(storeProduct?.price)return `From ${money(storeProduct.price)}`;
    return product.price || '';
  };
  function spotlightCartItem(p){
    const variant=variantOptions(p)[1]||variantOptions(p)[0]||{size:p.size||'Premium Pack',price:Number(p.price||0)};
    return {id:p.id,sku:p.sku,name:p.name,urduName:p.urduName,category:p.category,image:p.image,size:variant.size,form:'Whole / Regular',price:Number(variant.price||p.price||0),qty:1};
  }
  function render(product){
    const storeProduct=productForSpotlight(product);
    const media=card.querySelector('.hero-spotlight-media img');
    if(media){
      media.src=storeProduct?.image || product.fallbackImage || product.image;
      media.alt=`${product.title || storeProduct?.name || 'Morganics ingredient'} by Morganics`;
    }
    card.querySelector('h3').textContent=product.title || storeProduct?.name || '';
    const urdu=card.querySelector('.hero-spotlight-urdu');
    if(urdu){
      urdu.textContent=product.urduTitle || storeProduct?.urduName || '';
      urdu.hidden=!(product.urduTitle || storeProduct?.urduName);
    }
    card.querySelector('p').textContent=product.description || storeProduct?.shortDescription || storeProduct?.description || '';
    card.querySelector('strong').textContent=spotlightPrice(product,storeProduct);
    const cta=card.querySelector('.hero-spotlight-cta');
    cta.href=storeProduct?productUrl(storeProduct):product.url;
    cta.textContent='View Details';
    const add=card.querySelector('.hero-spotlight-add');
    if(add){
      add.hidden=!storeProduct;
      add.disabled=!storeProduct;
      add.dataset.productId=storeProduct?.id||'';
    }
    card.dataset.productId=storeProduct?.id||'';
  }
  function positionClone(img,hotspot){
    const stageRect=layer.getBoundingClientRect(),imgRect=img.getBoundingClientRect();
    const scale=isCoarse()?1.42:1.86;
    clone.src=img.currentSrc||img.src;
    clone.style.setProperty('left',`${imgRect.left-stageRect.left}px`,'important');
    clone.style.setProperty('top',`${imgRect.top-stageRect.top}px`,'important');
    clone.style.setProperty('width',`${imgRect.width}px`,'important');
    clone.style.setProperty('height',`${imgRect.height}px`,'important');
    clone.classList.add('is-visible');
    requestAnimationFrame(()=>{clone.style.setProperty('transform',`translate3d(0,0,0) scale(${scale})`,'important');});
  }
  function positionCard(imgRect){
    if(isCoarse())return;
    const heroRect=hero.getBoundingClientRect(),cardWidth=320,gap=24;
    let left=imgRect.right-heroRect.left+gap;
    if(left+cardWidth>heroRect.width-18)left=imgRect.left-heroRect.left-cardWidth-gap;
    left=Math.max(18,Math.min(left,heroRect.width-cardWidth-18));
    const top=Math.max(112,Math.min(imgRect.top-heroRect.top-18,heroRect.height-240));
    card.style.left=`${left}px`;card.style.top=`${top}px`;card.style.right='auto';card.style.bottom='auto';
  }
  function open(hotspot){
    const product=spotlightMap.get(hotspot?.dataset.spotlight),img=imgFor(hotspot);
    if(!product||!img)return;
    clearTimeout(closeTimer);
    activeHotspot=hotspot;
    render(product);
    positionClone(img,hotspot);
    positionCard(img.getBoundingClientRect());
    hero.classList.add('is-spotlight-active');
    card.classList.add('is-visible');
    card.setAttribute('aria-hidden','false');
  }
  function close(){
    activeHotspot=null;
    hero.classList.remove('is-spotlight-active');
    card.classList.remove('is-visible');
    card.setAttribute('aria-hidden','true');
    clone.classList.remove('is-visible');
    clone.style.setProperty('transform','translate3d(0,0,0) scale(1)','important');
  }
  function scheduleClose(){clearTimeout(closeTimer);closeTimer=setTimeout(close,120)}
  hero.addEventListener('mouseover',e=>{if(isCoarse())return;const h=e.target.closest?.('.hero-hotspot');if(h&&h!==activeHotspot)open(h)});
  hero.addEventListener('mouseout',e=>{if(isCoarse())return;const h=e.target.closest?.('.hero-hotspot');if(h&&!card.contains(e.relatedTarget))scheduleClose()});
  hero.addEventListener('focusin',e=>{const h=e.target.closest?.('.hero-hotspot');if(h)open(h)});
  hero.addEventListener('focusout',e=>{if(e.relatedTarget&&(hero.contains(e.relatedTarget)||card.contains(e.relatedTarget)))return;scheduleClose()});
  hero.addEventListener('click',e=>{const h=e.target.closest?.('.hero-hotspot');if(!h)return;e.preventDefault();e.stopPropagation();open(h)});
  card.addEventListener('mouseenter',()=>clearTimeout(closeTimer));
  card.addEventListener('mouseleave',()=>{if(!isCoarse())scheduleClose()});
  card.querySelector('.hero-spotlight-close')?.addEventListener('click',close);
  card.querySelector('.hero-spotlight-add')?.addEventListener('click',e=>{
    e.preventDefault();
    const p=products.find(item=>item.id===card.dataset.productId);
    if(!p)return;
    addToCart(spotlightCartItem(p));
    close();
  });
  document.addEventListener('click',e=>{
    if(!activeHotspot||!isCoarse())return;
    if(card.contains(e.target)||e.target.closest?.('.hero-hotspot'))return;
    close();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeHotspot)close()});
  window.addEventListener('resize',()=>{if(activeHotspot)open(activeHotspot)},{passive:true});
}
function updateWishlistBadge(){
  const c=getWishlist().size;
  document.querySelectorAll('[data-wl-count]').forEach(x=>{x.textContent=c;x.style.display=c?'grid':'none';});
  document.querySelectorAll('.wishlist-header-btn').forEach(btn=>{btn.classList.toggle('has-items',c>0);});
}
function renderWishlistDrawer(){const el=document.getElementById('wishlistDrawerBody');if(!el)return;const ids=[...getWishlist()];const items=ids.map(id=>products.find(p=>p.id===id)).filter(Boolean);el.innerHTML=items.length?items.map(p=>`<a href="${productUrl(p)}" class="wl-item" onclick="closeWishlistDrawer()"><img src="${esc(p.image)}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><small>${esc(p.category)}</small><em>${money(p.price)}</em></div><button class="wl-remove" aria-label="Remove" onclick="event.preventDefault();toggleWishlist('${esc(p.id)}',this.closest('.wl-item').querySelector('button'));renderWishlistDrawer();updateWishlistBadge();">&times;</button></a>`).join(''):`<div class="empty-cart"><b>No favourites yet.</b><p>Tap the ♡ on any product to save it here.</p><a class="btn primary" href="shop.html">Browse Products</a></div>`;}
function openWishlistDrawer(){renderWishlistDrawer();document.getElementById('wishlistDrawer')?.classList.add('open');document.getElementById('cartBackdrop')?.classList.add('open');}
function closeWishlistDrawer(){document.getElementById('wishlistDrawer')?.classList.remove('open');document.getElementById('cartBackdrop')?.classList.remove('open');}
function cartRows(){const cart=getCart();return cart.map(i=>`<div class="cart-line"><img class="cart-img" src="${esc(i.image)}" alt="${esc(i.name)}"><div class="cart-info"><b class="cart-name">${esc(i.name)}</b><small class="cart-meta">${esc(i.size)} · ${esc(i.form)}</small></div><div class="cart-foot"><div class="qty"><button class="qty-btn" onclick="changeQty('${esc(i.key)}',-1)">${icon('minus')}</button><span class="qty-val">${i.qty}</span><button class="qty-btn" onclick="changeQty('${esc(i.key)}',1)">${icon('plus')}</button></div><b class="cart-total">${money(lineTotal(i))}</b><button class="cart-del" onclick="removeCartItem('${esc(i.key)}')" aria-label="Remove">${icon('trash')}</button></div></div>`).join('')}
function renderCartDrawer(){const el=document.getElementById('cartDrawerBody');if(!el)return;const cart=getCart();el.innerHTML=cart.length?`${cartRows()}<div class="cart-summary"><span>Total</span><b>${money(cartTotal())}</b></div><div class="cart-actions"><a class="btn ghost" href="cart.html">View Cart</a><a class="btn primary" href="checkout.html">Checkout COD</a></div>`:`<div class="empty-cart"><b>Your cart is empty.</b><p>Add Morganics products to continue.</p><a class="btn primary" href="shop.html">Shop Products</a></div>`}
function openCartDrawer(){installCartShell();renderCartDrawer();document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartBackdrop').classList.add('open')}
function closeCartDrawer(){document.getElementById('cartDrawer')?.classList.remove('open');document.getElementById('cartBackdrop')?.classList.remove('open')}
function renderCartPage(){const root=document.getElementById('cartRoot');if(!root)return;const cart=getCart();root.innerHTML=`<section class="shop-hero cart-hero"><span class="eyebrow">${icon('cart')} Cart</span><h1>Your Morganics cart.</h1><p>Review quantities, pack size and form before placing a Cash on Delivery order.</p></section><section class="cart-page"><div class="cart-list">${cart.length?cartRows():'<div class="empty-cart"><b>Your cart is empty.</b><p>Start shopping premium Morganics products.</p></div>'}</div><aside class="checkout-card"><h3>Order Summary</h3><div><span>Products</span><b>${cartCount()}</b></div><div><span>Subtotal</span><b>${money(cartTotal())}</b></div><div><span>Payment</span><b>Cash on Delivery</b></div><a class="btn primary" href="checkout.html">Continue to Checkout</a><a class="btn ghost" href="shop.html">Add More Products</a></aside></section>`}
async function submitCODOrder(e){e.preventDefault();const cart=getCart();if(!cart.length){alert('Cart is empty');return}const fd=new FormData(e.target);const order={orderId:'MOR-'+Date.now().toString().slice(-8),status:'New COD',paymentMethod:'Cash on Delivery',createdAt:new Date().toISOString(),customerName:fd.get('name'),phone:fd.get('phone'),city:fd.get('city'),address:fd.get('address'),notes:fd.get('notes'),items:cart,total:cartTotal()};localStorage.setItem('morganics_last_order',JSON.stringify(order));try{await fetch(ORDER_API.url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({key:ORDER_API.key,action:'createOrder',order})})}catch(err){}setCart([]);location.href=`order-track.html?order=${encodeURIComponent(order.orderId)}`}
function renderCheckoutPage(){const root=document.getElementById('checkoutRoot');if(!root)return;const cart=getCart();root.innerHTML=`<section class="shop-hero cart-hero"><span class="eyebrow">${icon('cash')} COD Checkout</span><h1>Place your order.</h1><p>Cash on Delivery order form. Your order will be saved for Morganics order management.</p></section><section class="checkout-layout"><form class="cod-form" onsubmit="submitCODOrder(event)"><h3>Delivery Information</h3><label>Full Name<input name="name" required placeholder="Your name"></label><label>Phone / WhatsApp<input name="phone" required placeholder="03xx xxxxxxx"></label><label>City<input name="city" required placeholder="Karachi, Lahore, Islamabad..."></label><label>Complete Address<textarea name="address" required placeholder="House, street, area, city"></textarea></label><label>Notes<textarea name="notes" placeholder="Any delivery note"></textarea></label><button class="btn primary" ${cart.length?'':'disabled'}>${icon('truck')} Confirm COD Order</button></form><aside class="checkout-card"><h3>Cart Summary</h3>${cartRows()}<div class="cart-summary"><span>Total</span><b>${money(cartTotal())}</b></div></aside></section>`}
function renderTrackPage(){const root=document.getElementById('trackRoot');if(!root)return;const order=JSON.parse(localStorage.getItem('morganics_last_order')||'{}');const id=qs.get('order')||order.orderId||'';root.innerHTML=`<section class="shop-hero cart-hero"><span class="eyebrow">${icon('truck')} Order Tracking</span><h1>Order ${esc(id||'')}</h1><p>Your COD order has been received locally. Morganics team can track it in the Orders module after Apps Script deployment.</p></section><section class="track-card"><div class="track-steps"><span class="done">1 Order Placed</span><span>2 Confirm by WhatsApp</span><span>3 Packed</span><span>4 Out for Delivery</span></div><div class="checkout-card"><h3>Order Details</h3><div><span>Status</span><b>${esc(order.status||'New COD')}</b></div><div><span>Total</span><b>${money(order.total||0)}</b></div><div><span>Phone</span><b>${esc(order.phone||'')}</b></div><a class="btn primary" href="shop.html">Continue Shopping</a></div></section>`}

function normReviewText(value){return String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function localReviewStore(){try{return JSON.parse(localStorage.getItem('morganics_local_reviews_v1')||'[]')}catch(err){return []}}
function saveLocalReview(entry){const next=localReviewStore().concat(entry).slice(-80);localStorage.setItem('morganics_local_reviews_v1',JSON.stringify(next))}
function reviewCategoryMatch(product,review){
  const productText=normReviewText([product.name,product.category,product.keywords].join(' '));
  const reviewText=normReviewText([review.product,review.role].join(' '));
  if(/nut|dry fruit|mewa|maghaz|badam|pista|kajo|munaqqa|akhrot|almond|cashew/.test(productText))return /pista|maghaz|badam|munaqqa|kajo|mewa|akhrot|american/.test(reviewText);
  if(/seed|chia|pumpkin/.test(productText))return /chia|pumpkin|seed/.test(reviewText);
  if(/herb|botanical|moringa|wellness/.test(productText))return /moringa|herbal|wellness/.test(reviewText);
  if(/snack|sogi|mix/.test(productText))return /sogi|mewa|snack|school/.test(reviewText);
  return false;
}
function reviewsForProduct(product){
  const base=window.MORGANICS_REVIEWS||[];
  const local=localReviewStore().filter(r=>r.productId===product.id || normReviewText(r.productName)===normReviewText(product.name));
  const exact=base.filter(r=>{
    const pn=normReviewText(product.name), rp=normReviewText(r.product);
    return pn===rp || pn.includes(rp) || rp.includes(pn);
  });
  const picked=exact.length?exact:base.filter(r=>reviewCategoryMatch(product,r));
  return local.concat(picked.length?picked:base.slice(0,4));
}
function reviewAverage(reviews){return reviews.length?reviews.reduce((sum,r)=>sum+Number(r.rating||0),0)/reviews.length:0}
function ratingDistribution(reviews){
  const counts={5:0,4:0,3:0,2:0,1:0};
  reviews.forEach(r=>{const bucket=Math.max(1,Math.min(5,Math.round(Number(r.rating||5))));counts[bucket]+=1});
  return counts;
}
function reviewStars(rating){const full=Math.round(Number(rating||5));return '★'.repeat(Math.max(1,Math.min(5,full)))}
function productReviewCard(review){
  return `<article class="product-review-card" data-language="${esc(review.language||'English')}">
    <div class="product-review-head">
      <img src="${esc(review.image||'assets/logos/morganics-logo-header.png')}" alt="${esc(review.name)}" loading="lazy">
      <div><b>${esc(review.name)}</b><small>${esc(review.role||'Morganics Customer')}</small></div>
      <span>Customer Story</span>
    </div>
    <div class="product-review-meta" aria-label="${esc(String(review.rating||5))} out of 5 stars"><strong aria-hidden="true">${reviewStars(review.rating)}</strong><em>${esc(String(review.rating||5))}/5</em><i>${esc(review.language||'English')}</i></div>
    <p>${esc(review.review)}</p>
    <div class="product-review-product">${esc(review.product||review.productName||'Morganics Product')}</div>
  </article>`;
}
function productReviewsSection(product){
  const reviews=reviewsForProduct(product);
  const avg=reviewAverage(reviews);
  const distribution=ratingDistribution(reviews);
  const total=reviews.length;
  const bars=[5,4,3,2,1].map(n=>`<span><b>${n}</b><i><em style="width:${total?Math.round((distribution[n]/total)*100):0}%"></em></i><small>${distribution[n]}</small></span>`).join('');
  return `<section class="product-reviews-section" id="reviews" data-product-reviews="${esc(product.id)}">
    <div class="product-review-shell">
      <div class="product-review-summary">
        <span class="review-eyebrow">Product Reviews</span>
        <h2>Customer stories for ${esc(product.name)}.</h2>
        <p>Reviews support English, Roman Urdu and Urdu. Purchase verification is not shown unless the backend confirms it.</p>
        <div class="rating-overview"><strong>${avg.toFixed(1)}</strong><span aria-label="${esc(avg.toFixed(1))} out of 5 stars">${reviewStars(avg)}</span><small>Average rating from ${total} customer ${total===1?'story':'stories'}.</small></div>
        <div class="rating-bars" aria-label="Rating distribution">${bars}</div>
      </div>
      <div class="product-review-list">${reviews.slice(0,6).map(productReviewCard).join('')}</div>
      <form class="write-review-card" onsubmit="submitLocalReview(event,'${esc(product.id)}')">
        <div><span class="review-eyebrow">Write a Review</span><h3>Share your Morganics routine.</h3><p>Your review is saved locally first and structured for future Shopify metafields or review app integration.</p></div>
        <label>Name<input name="name" required placeholder="Your name"></label>
        <label>Rating<select name="rating" required><option value="5">5 - Excellent</option><option value="4">4 - Good</option><option value="3">3 - Okay</option><option value="2">2 - Needs work</option><option value="1">1 - Poor</option></select></label>
        <label>Product Variant<input name="variant" placeholder="100g, 250g, powder, whole..."></label>
        <label>Review Text<textarea name="review" required placeholder="Write in English, Roman Urdu or Urdu"></textarea></label>
        <label>Optional Image<input name="image" type="file" accept="image/*"></label>
        <button class="btn primary" type="submit">Save Review</button>
        <small class="review-form-status" data-review-form-status></small>
      </form>
    </div>
  </section>`;
}
function submitLocalReview(event,productId){
  event.preventDefault();
  const form=event.currentTarget;
  const product=products.find(p=>p.id===productId);
  const fd=new FormData(form);
  const text=String(fd.get('review')||'').trim();
  const entry={
    id:`local-${Date.now()}`,
    productId,
    productName:product?.name||'Morganics Product',
    product:product?.name||'Morganics Product',
    name:String(fd.get('name')||'Customer').trim(),
    role:'Morganics Customer',
    rating:Number(fd.get('rating')||5),
    language:/[\u0600-\u06FF]/.test(text)?'Urdu':'English',
    review:text,
    variant:String(fd.get('variant')||'').trim(),
    image:'',
    imageFileName:form.querySelector('input[type="file"]')?.files?.[0]?.name||'',
    badge:'Customer Story',
    source:'local_pending_shopify',
    createdAt:new Date().toISOString()
  };
  saveLocalReview(entry);
  const status=form.querySelector('[data-review-form-status]');
  if(status)status.textContent='Review saved locally as a Customer Story.';
  const section=document.querySelector(`[data-product-reviews="${CSS.escape(productId)}"]`);
  if(product && section){
    section.outerHTML=productReviewsSection(product);
    const nextStatus=document.querySelector(`[data-product-reviews="${CSS.escape(productId)}"] [data-review-form-status]`);
    if(nextStatus)nextStatus.textContent='Review saved locally as a Customer Story.';
  }
}

function initProduct(){
  const root=document.getElementById('productRoot'); if(!root)return; const id=qs.get('id')||products[0]?.id; const p=products.find(x=>x.id===id)||products[0];
  if(!p){root.innerHTML='<section class="shop-hero"><h1>No product found.</h1></section>';return}
  document.title=`${p.name} | Morganics Pakistan`; document.querySelector('meta[name="description"]')?.setAttribute('content',p.metaDescription||p.shortDescription||'Morganics product page');
  const m=catMeta(p.category);const vars=variantOptions(p);
  const pairings=(p.pairingIdeas||[]).map(name=>products.find(x=>x.name===name)||products.find(x=>x.name.toLowerCase().includes(String(name).toLowerCase())||String(name).toLowerCase().includes(x.name.toLowerCase()))).filter(Boolean).slice(0,4);
  root.innerHTML=`<section class="product-detail"><div class="detail-image reveal"><img src="${esc(p.image)}" alt="${esc(p.name)} product pack by Morganics"><a class="back-chip" href="${categoryUrl(p.category)}">← ${esc(p.category)}</a></div><div class="detail-content reveal"><span class="eyebrow">${esc(p.category)} · ${esc(p.sku)}</span><h1>${esc(p.name)}</h1><div class="urdu-name">${esc(p.urduName||'')}</div><div class="detail-price" id="productPrice">${money(vars[0]?.price||p.price)}</div><p>${esc(p.shortDescription)}</p><div class="buy-box"><h3>${icon('cart')} Choose Pack</h3><div class="variant-pills">${vars.map((v,i)=>`<label><input type="radio" name="packSize" value="${esc(v.size)}" ${i===0?'checked':''} onchange="document.getElementById('productPrice').textContent='${money(v.price)}'"><span>${esc(v.label)} <b>${money(v.price)}</b></span></label>`).join('')}</div><label class="powder-toggle"><input id="powderToggle" type="checkbox"><span>Powder form required</span><small>If you want this product powdered before packing.</small></label><div class="qty-row"><button onclick="document.getElementById('qtyInput').value=Math.max(1,Number(document.getElementById('qtyInput').value)-1)">−</button><input id="qtyInput" value="1" type="number" min="1"><button onclick="document.getElementById('qtyInput').value=Number(document.getElementById('qtyInput').value)+1">+</button></div><button class="btn primary add-cart-btn" onclick='addToCart(selectedProductForCart(${JSON.stringify(p).replace(/'/g,"&#39;")}))'>${icon('cart')} Add to Cart</button><a class="btn ghost" href="checkout.html">Checkout COD</a></div><div class="feature-icons"><span>${icon('leaf')} Natural pantry product</span><span>${icon('truck')} COD ready</span><span>${icon('shield')} Care guidance included</span><span>${icon('gift')} Gift-friendly category</span></div><div class="detail-grid"><div class="info-box"><h3>Best Use Cases</h3><ul>${(p.useCases||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="info-box"><h3>Key Benefits</h3><ul>${(p.benefits||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="info-box"><h3>How to Use</h3><p>${esc(p.usage)}</p></div><div class="info-box"><h3>Storage</h3><p>${esc(p.storage||m.storage||'Keep sealed in a cool, dry place away from sunlight and moisture.')}</p></div><div class="info-box"><h3>Precautions</h3><p>${esc(p.precautions)}</p></div></div><div class="description-html">${p.descriptionHtml||''}</div></div></section>${productReviewsSection(p)}<section class="product-category-band" style="--banner:url('${esc(m.banner)}')"><div><span class="eyebrow">More in ${esc(p.category)}</span><h2>${esc(m.title)}</h2><p>${esc(m.copy)}</p><a class="btn ghost" href="${categoryUrl(p.category)}">Open category</a></div></section>${pairings.length?`<section class="section"><div class="section-head"><span class="eyebrow">Pairs well with</span><h2>Complete the routine.</h2><p>Related Morganics pantry products customers often compare or serve together.</p></div><div class="product-grid">${pairings.map(card).join('')}</div></section>`:''}<section class="section"><div class="section-head"><span class="eyebrow">Related Products</span><h2>More from ${esc(p.category)}</h2></div><div class="product-grid">${products.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4).map(card).join('')}</div></section>${productFaqSection(p,m)}`;
  initProductFaqAccordion(root);
}
function initContactForms(){
  const root=siteRootPath();
  document.querySelectorAll('.inquiry-form').forEach(form=>{
    if(form.dataset.ready==='1')return; form.dataset.ready='1';
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());
      const inquiry={
        name:String(data.name||'').trim(),
        phone:String(data.phone||'').trim(),
        email:String(data.email||'').trim(),
        need:String(data.need||'').trim(),
        quantity:String(data.quantity||'').trim(),
        message:String(data.message||'').trim(),
        source:location.pathname,
        createdAt:new Date().toISOString()
      };
      try{
        const old=JSON.parse(localStorage.getItem('morganics_inquiries')||'[]');
        old.push(inquiry);
        localStorage.setItem('morganics_inquiries',JSON.stringify(old.slice(-50)));
      }catch(err){}
      const lines=[
        'Assalam o Alaikum Morganics,',
        'I want to inquire about a product.',
        inquiry.name ? `Name: ${inquiry.name}` : '',
        inquiry.phone ? `Phone: ${inquiry.phone}` : '',
        inquiry.email ? `Email: ${inquiry.email}` : '',
        inquiry.need ? `Required product: ${inquiry.need}` : '',
        inquiry.quantity ? `Quantity: ${inquiry.quantity}` : '',
        inquiry.message ? `Details: ${inquiry.message}` : '',
        'Please guide me about availability, quality, price and delivery.'
      ].filter(Boolean).join('\n');
      const status=form.querySelector('[data-form-status]');
      if(status){status.textContent='Inquiry saved. WhatsApp is opening with your message.'; status.classList.add('is-visible');}
      window.open(whatsappInquiryUrl(lines),'_blank','noopener');
    });
  });
  document.querySelectorAll('[data-whatsapp-inquiry]').forEach(link=>{
    if(link.dataset.ready==='1')return; link.dataset.ready='1';
    link.setAttribute('href', whatsappInquiryUrl('Assalam o Alaikum Morganics, I need help finding a herbal product / seed / dry fruit / nut. Please guide me.'));
    link.setAttribute('target','_blank'); link.setAttribute('rel','noopener');
  });
}

/* ── Cinematic hero parallax (home page only) ───────────────────
   Smooth mouse-tracking depth effect.
   Respects prefers-reduced-motion. Desktop only (≥768px).
   ─────────────────────────────────────────────────────────────── */
function initHeroParallax(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.body.dataset.page !== 'home') return;
  const hero = document.getElementById('hero');
  if(!hero) return;
  const targets = Array.from(hero.querySelectorAll('[data-px], [data-py]'));
  if(!targets.length) return;
  const LERP = 0.055;
  const MOBILE_BREAK = 768;
  const IDLE_THRESH = 0.0006;
  let mouseNX=0, mouseNY=0, smoothX=0, smoothY=0, rafId=null, active=false;
  function onMove(e){
    if(window.innerWidth < MOBILE_BREAK) return;
    const r = hero.getBoundingClientRect();
    mouseNX = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
    mouseNY = ((e.clientY - r.top)   / r.height - 0.5) * 2;
    if(!active){ active=true; hero.classList.add('hero-parallax-active'); rafId=requestAnimationFrame(tick); }
  }
  function onLeave(){ mouseNX=0; mouseNY=0; hero.classList.remove('hero-parallax-active'); }
  function tick(){
    smoothX += (mouseNX - smoothX) * LERP;
    smoothY += (mouseNY - smoothY) * LERP;
    targets.forEach(el => {
      const dx = +(smoothX * (parseFloat(el.dataset.px)||0)).toFixed(3);
      const dy = +(smoothY * (parseFloat(el.dataset.py)||0)).toFixed(3);
      el.style.transform = `translate(${dx}px,${dy}px)`;
    });
    const residual = Math.abs(mouseNX-smoothX) + Math.abs(mouseNY-smoothY);
    if(residual > IDLE_THRESH){ rafId=requestAnimationFrame(tick); }
    else { active=false; }
  }
  hero.addEventListener('mousemove',  onMove,  {passive:true});
  hero.addEventListener('mouseleave', onLeave, {passive:true});
  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      if(window.innerWidth < MOBILE_BREAK){
        hero.removeEventListener('mousemove',  onMove);
        hero.removeEventListener('mouseleave', onLeave);
        if(rafId) cancelAnimationFrame(rafId);
        active=false;
        targets.forEach(el=>{ el.style.transform=''; });
      }
    }, 200);
  },{passive:true});
}


/* ── Mobile bottom nav & product bar installer ──────────────────────── */
function installMobileBottomNav(){
  if(document.getElementById('mobBottomNav')) return;
  const page = document.body.dataset.page || '';
  const root = (location.pathname.includes('/ingredient-carousel/')) ? '../' : '';

  const navItems = [
    { label:'Home',       href:root+'index.html',              icon:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', page:'home' },
    { label:'Categories', href:root+'index.html#categories',   icon:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', page:'category' },
    { label:'Shop',       href:root+'shop.html',               icon:'<circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H7"/>', page:'shop' },
    { label:'Wishlist',   href:'#',                             icon:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', page:'wishlist', isWishlist:true },
    { label:'Menu',       href:'#',                             icon:'<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>', page:'menu', isMenu:true }
  ];

  const nav = document.createElement('nav');
  nav.id = 'mobBottomNav';
  nav.className = 'mob-bottom-nav';
  nav.setAttribute('aria-label', 'App navigation');

  nav.innerHTML = navItems.map(item => {
    const isActive = (item.page === page) || (item.page === 'home' && page === 'home');
    const isWishlist = item.isWishlist;
    const isMenu = item.isMenu;
    const wlCount = isWishlist ? getWishlist().size : 0;
    return `<${isMenu ? 'button' : 'a'}
      href="${isMenu ? undefined : item.href}"
      class="mob-nav-item${isActive ? ' active' : ''}${isWishlist ? ' mob-nav-wishlist' : ''}"
      ${isMenu ? 'type="button" id="mobNavMenuBtn"' : ''}
      ${isWishlist ? 'id="mobNavWishlistBtn"' : ''}
      aria-label="${item.label}"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">${item.icon}</svg>
      ${isWishlist ? `<span class="mob-nav-wl-badge${wlCount > 0 ? ' visible' : ''}" id="mobNavWlBadge">${wlCount}</span>` : ''}
      <span class="mob-nav-label">${item.label}</span>
    </${isMenu ? 'button' : 'a'}>`;
  }).join('');

  document.body.appendChild(nav);

  // Wire wishlist button to open wishlist drawer
  const wlBtn = document.getElementById('mobNavWishlistBtn');
  if(wlBtn){
    wlBtn.addEventListener('click', e => {
      e.preventDefault();
      if(typeof openWishlistDrawer === 'function') openWishlistDrawer();
    });
  }

  // Wire menu button to open mobile menu panel
  const menuBtn = document.getElementById('mobNavMenuBtn');
  if(menuBtn){
    menuBtn.addEventListener('click', () => {
      const panel = document.querySelector('.mobile-menu-panel');
      const hamburger = document.querySelector('.mobile-menu-btn');
      if(panel && hamburger) hamburger.click();
    });
  }

  // Keep wishlist badge in sync
  const origUpdateWishlistBadge = window.updateWishlistBadge;
  window.updateWishlistBadge = function(){
    if(typeof origUpdateWishlistBadge === 'function') origUpdateWishlistBadge();
    const badge = document.getElementById('mobNavWlBadge');
    if(!badge) return;
    const c = getWishlist().size;
    badge.textContent = c;
    badge.classList.toggle('visible', c > 0);
  };
}

function installMobileProductBar(){
  if(document.body.dataset.page !== 'product') return;
  if(document.getElementById('mobProductBar')) return;

  const bar = document.createElement('div');
  bar.id = 'mobProductBar';
  bar.className = 'mob-product-bar';
  bar.setAttribute('aria-label', 'Add to cart');
  bar.innerHTML = `
    <div class="mob-product-bar-price">
      <span class="mob-product-bar-label">Price</span>
      <span class="mob-product-bar-amount" id="mobBarPrice">—</span>
      <span class="mob-product-bar-size" id="mobBarSize"></span>
    </div>
    <button class="mob-product-bar-btn" id="mobBarAddBtn" type="button" aria-label="Add to cart">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H7"/></svg>
      Add to Cart
    </button>`;

  document.body.appendChild(bar);

  // Sync the bar's price with the product detail page state
  function syncBarPrice(){
    const priceEl = document.getElementById('productPrice');
    const selectedSize = document.querySelector('input[name="packSize"]:checked');
    const barPrice = document.getElementById('mobBarPrice');
    const barSize = document.getElementById('mobBarSize');
    if(priceEl && barPrice) barPrice.textContent = priceEl.textContent || '—';
    if(selectedSize && barSize) barSize.textContent = selectedSize.value || '';
    else if(barSize) barSize.textContent = '';
  }

  // Observe the product root for render completion, then sync
  const productRoot = document.getElementById('productRoot');
  if(productRoot){
    const obs = new MutationObserver(() => {
      syncBarPrice();
      // Watch for pack size changes
      document.querySelectorAll('input[name="packSize"]').forEach(radio => {
        radio.addEventListener('change', syncBarPrice);
      });
      // Watch for price text changes
      const priceEl = document.getElementById('productPrice');
      if(priceEl){
        const priceObs = new MutationObserver(syncBarPrice);
        priceObs.observe(priceEl, { childList:true, characterData:true, subtree:true });
      }
    });
    obs.observe(productRoot, { childList:true, subtree:true });
  }

  // Add to cart button wires to the existing add-cart-btn on the product page
  const addBtn = document.getElementById('mobBarAddBtn');
  if(addBtn){
    addBtn.addEventListener('click', () => {
      const existing = document.querySelector('.add-cart-btn');
      if(existing){
        existing.click();
        // Visual feedback
        addBtn.textContent = '✓ Added!';
        addBtn.style.background = '#173f36';
        setTimeout(() => {
          addBtn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:18px;height:18px;display:block;flex-shrink:0;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round"><circle cx="9" cy="20" r="1.8"/><circle cx="17" cy="20" r="1.8"/><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H7"/></svg>Add to Cart`;
          addBtn.style.background = '';
        }, 1200);
      }
    });
  }
}

/* ── Hero Interactions v4 ─────────────────────────────────────────────
   Pouch hover glow · Pouch click pulse · Floater micro-hover
   Category pill active state · Parallax enhanced with translate3d
   Disabled on touch devices and prefers-reduced-motion.
   ─────────────────────────────────────────────────────────────────── */
function initHeroInteractions(){
  if(document.body.dataset.page !== 'home') return;
  const hero  = document.getElementById('hero');
  if(!hero) return;

  const isTouch   = window.matchMedia('(pointer: coarse)').matches;
  const noMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Pouch hover glow + scale ──────────────────────────────── */
  const isHeroV3 = hero.classList.contains('hero-v3');
  const pouchWrap = isHeroV3 ? hero.querySelector('.product-core') : hero.querySelector('.hero-pouch');
  const pouchImg  = hero.querySelector('.stage-pouch, .pouch-img');

  if(pouchWrap && pouchImg && !isTouch && !noMotion){
    /* CSS handles filter via .pouch-hovered; JS handles scale inline */
    pouchWrap.addEventListener('mouseenter', ()=>{
      pouchWrap.classList.add('pouch-hovered');
      if(!isHeroV3){
        pouchImg.style.transition = 'transform 0.3s cubic-bezier(0.2,0.8,0.3,1)';
        pouchImg.style.transform  = 'translate3d(0,-6px,0) scale(1.024)';
      }
    }, {passive:true});
    pouchWrap.addEventListener('mouseleave', ()=>{
      pouchWrap.classList.remove('pouch-hovered');
      if(!isHeroV3){
        /* Clear inline transform so the CSS float animation resumes */
        pouchImg.style.transition = 'transform 0.32s cubic-bezier(0.2,0.8,0.3,1)';
        pouchImg.style.transform  = '';
        /* After transition ends, clear transition so animation runs freely */
        setTimeout(()=>{ pouchImg.style.transition = ''; }, 340);
      }
    }, {passive:true});
  }

  /* ── 2. Pouch click pulse ─────────────────────────────────────── */
  if(pouchWrap){
    pouchWrap.style.cursor = 'pointer';
    pouchWrap.addEventListener('click', ()=>{
      pouchWrap.classList.remove('pouch-pulse');
      /* Force reflow so animation replays */
      void pouchWrap.offsetWidth;
      pouchWrap.classList.add('pouch-pulse');
      setTimeout(()=> pouchWrap.classList.remove('pouch-pulse'), 620);
    });
  }

  /* ── 3. Floater micro-hover ───────────────────────────────────── */
  if(!isTouch && !noMotion){
    hero.querySelectorAll('.floater').forEach(f => {
      f.addEventListener('mouseenter', ()=>{
        f.classList.add('floater-hovered');
        f.style.transition = 'transform 0.28s ease';
        const cur = f.style.transform || '';
        /* append a tiny lift — works on top of parallax transform */
        f.dataset.hoverActive = '1';
      }, {passive:true});
      f.addEventListener('mouseleave', ()=>{
        f.classList.remove('floater-hovered');
        f.dataset.hoverActive = '';
      }, {passive:true});
    });
  }

  /* ── 4. Category pill click — active state toggle ─────────────── */
  const pills = Array.from(hero.querySelectorAll('.benefit-card'));
  pills.forEach(pill => {
    pill.addEventListener('click', e => {
      /* Don't prevent default — still navigates — but flash active state */
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      /* Micro-bounce */
      if(!noMotion){
        pill.style.transition = 'transform 0.14s cubic-bezier(0.2,0,0,1.6)';
        pill.style.transform  = 'translateY(-5px) scale(1.04)';
        setTimeout(()=>{
          pill.style.transform = '';
          pill.style.transition = '';
        }, 200);
      }
    });
  });

  /* ── 5. Enhanced cursor parallax with translate3d + depth ─────── */
  /* Builds on top of the existing initHeroParallax() but uses       */
  /* translate3d for GPU compositing and per-layer depth factors.    */
  if(isTouch || noMotion) return;

  const MOBILE_BREAK = 900;
  const LERP         = 0.06;
  const IDLE_THRESH  = 0.0004;

  /* ── depth config ──────────────────────────────────────────────────
     The product elements (.pouch-img, .stone-img, .pile-img) have
     transform: translateX(-50%) applied for horizontal centering.
     Using style.transform overrides that and breaks layout.
     SOLUTION: for images, use CSS `translate` individual property
     which COMPOSES on top of `transform` — centering stays intact.
     Background and plants/floaters have no centering transform, so
     they still use style.transform.
  ─────────────────────────────────────────────────────────────────── */
  const depthMap = [
    { sel: '.hero-bg',                   dx:  4,  dy:  3,   useCSSTranslate: false },
    { sel: '.hero-plants',               dx: 12,  dy:  7,   useCSSTranslate: false },
    /* Product IMAGES: use CSS translate prop to preserve translateX(-50%) centering */
    { sel: '.pouch-img',                 dx:  6,  dy: -4,   useCSSTranslate: true  },
    { sel: '.stone-img',                 dx:  2,  dy:  1.5, useCSSTranslate: true  },
    { sel: '.pile-img',                  dx:  4,  dy:  3.5, useCSSTranslate: true  },
    /* Floater container: no centering transform — use transform */
    { sel: '.floating-fruits-layer, .hero-floaters', dx: 13, dy: 11, useCSSTranslate: false },
  ];

  /* Build layer list — for multi-selector entries, find first match */
  const layers = depthMap.map(cfg => {
    const selectors = cfg.sel.split(',').map(s => s.trim());
    let el = null;
    for(const s of selectors){ el = hero.querySelector(s); if(el) break; }
    return el ? { el, dx: cfg.dx, dy: cfg.dy, useCSSTranslate: cfg.useCSSTranslate } : null;
  }).filter(Boolean);

  let mx=0, my=0, sx=0, sy=0, raf=null, running=false;

  function onMove(e){
    if(window.innerWidth < MOBILE_BREAK) return;
    const r = hero.getBoundingClientRect();
    mx = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
    my = ((e.clientY - r.top)   / r.height - 0.5) * 2;
    if(!running){ running=true; raf=requestAnimationFrame(tick); }
  }
  function onLeave(){ mx=0; my=0; }

  function tick(){
    sx += (mx - sx) * LERP;
    sy += (my - sy) * LERP;

    layers.forEach(l => {
      const existPX = parseFloat(l.el.dataset.px) || 0;
      const existPY = parseFloat(l.el.dataset.py) || 0;
      const px = +(sx * (existPX || l.dx)).toFixed(3);
      const py = +(sy * (existPY || l.dy)).toFixed(3);
      if(l.useCSSTranslate){
        /* Composes ON TOP of transform:translate(-50%,-50%) — centering safe */
        l.el.style.translate = `${px}px ${py}px`;
      } else {
        l.el.style.transform = `translate3d(${px}px,${py}px,0)`;
      }
    });

    const residual = Math.abs(mx-sx) + Math.abs(my-sy);
    if(residual > IDLE_THRESH){ raf = requestAnimationFrame(tick); }
    else { running = false; }
  }

  hero.addEventListener('mousemove',  onMove,  {passive:true});
  hero.addEventListener('mouseleave', onLeave, {passive:true});

  let resizeT;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeT);
    resizeT = setTimeout(()=>{
      if(window.innerWidth < MOBILE_BREAK){
        hero.removeEventListener('mousemove',  onMove);
        hero.removeEventListener('mouseleave', onLeave);
        if(raf) cancelAnimationFrame(raf);
        running = false;
        layers.forEach(l => {
          l.el.style.transform  = '';
          l.el.style.translate  = ''; /* clear CSS translate too */
        });
      }
    }, 200);
  }, {passive:true});
}

const homepageJourneySections=[
  {id:"hero",label:"Rooted in Nature",short:"Hero"},
  {id:"ingredient-finder",label:"Find the ingredient",short:"Ingredients"},
  {id:"daily-needs",label:"Choose your day needs",short:"Needs"},
  {id:"popular-products",label:"Popular Morganics",short:"Essentials"},
  {id:"routines",label:"Pakistani routines",short:"Routines"},
  {id:"customer-stories",label:"Real customer stories",short:"Stories"},
  {id:"ingredients-linked",label:"Ingredients linked to products",short:"Linked"},
  {id:"contact",label:"Let's begin",short:"Contact"}
];

function installHomepageJourneyRail(){
  if(document.body.dataset.page!=='home'||document.querySelector('.journey-rail'))return;
  if(window.matchMedia('(max-width: 1194px)').matches)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targetFor=item=>document.getElementById(item.id)||document.querySelector(`[data-journey-id="${item.id}"]`);
  const sections=homepageJourneySections.map((item,index)=>({...item,index,el:targetFor(item)})).filter(item=>item.el);
  if(sections.length<2)return;

  const rail=document.createElement('nav');
  rail.className='journey-rail';
  rail.setAttribute('aria-label','Morganics homepage journey');
  rail.innerHTML=`<span class="journey-track" aria-hidden="true"><span class="journey-progress"></span></span>${sections.map((item,index)=>`<button class="journey-node" type="button" data-journey-target="${esc(item.id)}" aria-label="Scroll to ${esc(item.label)}"><span class="journey-tip">${esc(item.label)}</span></button>`).join('')}`;

  const pill=document.createElement('div');
  pill.className='journey-pill';
  pill.setAttribute('aria-label','Morganics journey progress');
  pill.innerHTML=`<div class="journey-pill-main"><span class="journey-pill-title"></span><span class="journey-pill-count"></span><span class="journey-pill-line" aria-hidden="true"><span class="journey-pill-fill"></span></span></div><button class="journey-pill-toggle" type="button" aria-label="Open section navigation"></button>`;

  const menu=document.createElement('div');
  menu.className='journey-menu';
  menu.setAttribute('aria-label','Homepage sections');
  menu.innerHTML=sections.map(item=>`<button type="button" data-journey-target="${esc(item.id)}">${esc(item.short)}</button>`).join('');

  document.body.append(rail,pill,menu);

  const nodes=[...rail.querySelectorAll('.journey-node')];
  const menuButtons=[...menu.querySelectorAll('button')];
  const progress=rail.querySelector('.journey-progress');
  const pillTitle=pill.querySelector('.journey-pill-title');
  const pillCount=pill.querySelector('.journey-pill-count');
  const pillFill=pill.querySelector('.journey-pill-fill');
  let activeIndex=0,scrollRaf=0,hideTimer=0,railHover=false,railFocus=false;

  function showJourney(){
    clearTimeout(hideTimer);
    rail.classList.add('is-visible');
    pill.classList.add('is-visible');
  }

  function scheduleJourneyHide(delay=900){
    clearTimeout(hideTimer);
    hideTimer=setTimeout(()=>{
      if(railHover||railFocus||menu.classList.contains('is-open'))return;
      rail.classList.remove('is-visible');
      pill.classList.remove('is-visible');
    },delay);
  }

  function scrollToItem(id){
    const item=sections.find(s=>s.id===id);
    if(!item)return;
    showJourney();
    item.el.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    menu.classList.remove('is-open');
    pill.querySelector('.journey-pill-toggle')?.setAttribute('aria-expanded','false');
    scheduleJourneyHide(1250);
  }

  function setActive(index){
    activeIndex=Math.max(0,Math.min(index,sections.length-1));
    nodes.forEach((node,i)=>node.classList.toggle('is-active',i===activeIndex));
    menuButtons.forEach((button,i)=>button.classList.toggle('is-active',i===activeIndex));
    const item=sections[activeIndex];
    pillTitle.textContent=item.short;
    pillCount.textContent=`${String(activeIndex+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;
  }

  function updateProgress(){
    scrollRaf=0;
    const doc=document.documentElement;
    const max=Math.max(1,doc.scrollHeight-window.innerHeight);
    const pct=Math.max(0,Math.min(1,window.scrollY/max));
    progress.style.height=`${pct*100}%`;
    pillFill.style.width=`${pct*100}%`;
  }

  function requestProgress(){
    if(scrollRaf)return;
    scrollRaf=requestAnimationFrame(updateProgress);
  }

  function handleJourneyScroll(){
    showJourney();
    requestProgress();
    scheduleJourneyHide(900);
  }

  nodes.concat(menuButtons).forEach(button=>{
    button.addEventListener('click',()=>scrollToItem(button.dataset.journeyTarget));
  });

  pill.querySelector('.journey-pill-toggle')?.addEventListener('click',()=>{
    showJourney();
    const isOpen=menu.classList.toggle('is-open');
    pill.querySelector('.journey-pill-toggle')?.setAttribute('aria-expanded',String(isOpen));
    if(!isOpen)scheduleJourneyHide(900);
  });

  rail.addEventListener('mouseenter',()=>{railHover=true;showJourney();});
  rail.addEventListener('mouseleave',()=>{railHover=false;scheduleJourneyHide(900);});
  rail.addEventListener('focusin',()=>{railFocus=true;showJourney();});
  rail.addEventListener('focusout',()=>{railFocus=rail.contains(document.activeElement);if(!railFocus)scheduleJourneyHide(900);});

  document.addEventListener('click',event=>{
    if(!menu.classList.contains('is-open'))return;
    if(menu.contains(event.target)||pill.contains(event.target))return;
    menu.classList.remove('is-open');
    pill.querySelector('.journey-pill-toggle')?.setAttribute('aria-expanded','false');
    scheduleJourneyHide(900);
  });

  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    const index=sections.findIndex(item=>item.el===visible.target);
    if(index>=0)setActive(index);
  },{root:null,threshold:[0.18,0.32,0.55],rootMargin:'-20% 0px -45% 0px'});

  sections.forEach(item=>observer.observe(item.el));
  window.addEventListener('scroll',handleJourneyScroll,{passive:true});
  window.addEventListener('resize',requestProgress,{passive:true});
  setActive(0);
  updateProgress();
  requestAnimationFrame(()=>rail.classList.add('is-ready'));
}

function init(){installTopTicker();installHeaderActive();installContactNav();initFooter();installMegaMenu();installCartShell();installFloatingCartVisibility();installHeaderSearch();initStickyHeader();installMobileMenu();initHome();initDayCarousel();/* initHomeIngredientShowcase — handled by ingredientCarousel.js */initHeroParallax();initHeroInteractions();installHeroSpotlight();installHomepageJourneyRail();renderShop();initCategoryPage();initProduct();renderCartPage();renderCheckoutPage();renderTrackPage();initContactForms();updateCartBadge();installMobileBottomNav();installHeroMobileNavVisibility();installMobileProductBar();}init();
