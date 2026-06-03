(function(){
  'use strict';

  const ingredients = Array.isArray(window.MORGANICS_INGREDIENTS) ? window.MORGANICS_INGREDIENTS : [];
  const prods       = Array.isArray(window.MORGANICS_PRODUCTS)    ? window.MORGANICS_PRODUCTS    : [];

  const filterEl = document.getElementById('ingredientFilter');
  const rowsEl   = document.getElementById('ingredientMarquees');
  const countEl  = document.getElementById('ingredientCount');
  if(!rowsEl) return;

  /* helpers */
  function esc(v){ return String(v==null?'':v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function money(n){ return 'Rs '+Number(n||0).toLocaleString('en-PK'); }
  function normImg(src){ return String(src||'').replace(/^\//,''); }
  function slugify(v){ return String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }

  /* product lookup — match by slug→id, name, or fuzzy */
  const byId   = new Map(prods.map(p=>[p.id, p]));
  const byName = new Map(prods.map(p=>[slugify(p.name), p]));
  function matchProduct(ing){
    return byId.get(ing.slug) || byId.get(String(ing.id||'')) ||
           byName.get(slugify(ing.name)) ||
           prods.find(p=>slugify(p.name).includes(slugify(ing.name))||slugify(ing.name).includes(slugify(p.name)));
  }
  function productUrl(p){ return 'product.html?id='+encodeURIComponent(p.id); }

  /* state */
  const cats = ['All', ...Array.from(new Set(ingredients.map(i=>i.category)))];
  let activeCat = 'All';

  function filtered(){ return activeCat==='All' ? ingredients : ingredients.filter(i=>i.category===activeCat); }

  function chunkRows(items){
    if(activeCat==='All') return [items.slice(0,26), items.slice(26,52), items.slice(52)];
    const rows=[[],[],[]]; items.forEach((item,i)=>rows[i%3].push(item));
    return rows.filter(r=>r.length);
  }

  function loopItems(items){
    if(!items.length) return [];
    const out=[];
    while(out.length<18) out.push(...items);
    return [...out,...out];
  }

  /* thumbnail — prefers matched product image, then directImage, then crop sprite */
  function thumb(ing, p){
    const label = ing.name.split(/\s+/).slice(0,2).map(s=>s[0]).join('').toUpperCase();
    const fallback = `<span class="fallback-thumb" aria-hidden="true"><span>${esc(label)}</span></span>`;
    const src = normImg((p&&p.image) || ing.directImage || '');
    if(src) return `<div class="ingredient-thumb">${fallback}<img class="direct-thumb" src="${esc(src)}" alt="${esc(ing.name)}" loading="lazy" onerror="this.remove()"></div>`;
    const c    = ing.crop || {x:0,y:0,sourceWidth:1024,sourceHeight:1024,scale:1};
    const src2 = normImg(ing.sourceImage || 'assets/products/01-zarishk.jpg');
    return `<div class="ingredient-thumb crop-thumb">${fallback}<div class="crop-frame" aria-hidden="true"><img src="${esc(src2)}" style="width:${c.sourceWidth}px;height:${c.sourceHeight}px;transform:translate(-${c.x}px,-${c.y}px) scale(${c.scale||1})" loading="lazy" onerror="this.remove()"></div></div>`;
  }

  /* card — <a> so every card links to a product page */
  function card(ing){
    const p    = matchProduct(ing);
    const href = p ? productUrl(p) : 'shop.html?search='+encodeURIComponent(ing.name);
    const price= p ? money(p.price) : 'View product';
    const cat  = (p&&p.category) || ing.category || '';
    const name = (p&&p.name)     || ing.name;
    return `<a class="ingredient-card" href="${esc(href)}" title="${esc(name)}" aria-label="${esc(name)} — ${esc(price)}">
      ${thumb(ing,p)}
      <div class="ingredient-card-copy">
        <span class="ingredient-number">${esc(cat)}</span>
        <h2>${esc(name)}</h2>
        <p class="ing-price">${esc(price)}</p>
      </div>
      <span class="leaf-dot" aria-hidden="true">✦</span>
    </a>`;
  }

  /* filters — removed by design */
  function renderFilters(){ if(filterEl) filterEl.innerHTML=''; }

  /* rows */
  function renderRows(){
    const items  = filtered();
    const rows   = chunkRows(items);
    const speeds = ['45s','55s','50s'];
    const dirs   = ['left','right','left'];
    if(countEl) countEl.textContent = `${items.length} ingredient${items.length===1?'':'s'}${activeCat!=='All'?' in '+activeCat:''}`;
    rowsEl.innerHTML = rows.map((row,i)=>{
      const cards = loopItems(row).map(card).join('');
      return `<div class="marquee-shell" style="--speed:${speeds[i%speeds.length]}">
        <div class="marquee-row ${dirs[i%dirs.length]}">
          <div class="marquee-track">${cards}</div>
        </div>
      </div>`;
    }).join('');
  }

  function render(){ renderFilters(); renderRows(); }

  if(!ingredients.length){
    if(rowsEl) rowsEl.innerHTML='<p style="color:#F7F1E6;text-align:center;padding:40px">Ingredient data not loaded.</p>';
    return;
  }
  render();
})();
