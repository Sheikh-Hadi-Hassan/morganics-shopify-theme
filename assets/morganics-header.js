(() => {
  const body = document.body;
  const header = document.querySelector('[data-morganics-header]');
  if (!header) return;

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function updateMegaMenuTop() {
    // Set CSS var so fixed-position mega-menu always sits just below the header
    const rect = header.getBoundingClientRect();
    const top = Math.round(rect.bottom + 6);
    document.documentElement.style.setProperty('--mega-menu-top', top + 'px');
  }

  function initStickyHeader() {
    const tick = () => {
      const scrolled = window.scrollY > 80;
      header.classList.toggle('is-scrolled', scrolled);
      header.classList.toggle('scrolled', scrolled);
      updateMegaMenuTop();
    };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick, { passive: true });
  }

  function initMegaMenu() {
    const megaWraps = qsa('[data-mega-wrap]');
    
    // Track mouse locations for diagonal tracking
    let mouseLocs = [];
    document.addEventListener('mousemove', (e) => {
      mouseLocs.push({ x: e.clientX, y: e.clientY });
      if (mouseLocs.length > 8) mouseLocs.shift();
    });

    const closeAll = (except = null) => {
      megaWraps.forEach((wrap) => {
        if (wrap === except) return;
        const trigger = qs('[data-mega-trigger]', wrap);
        const menu = qs('[data-mega-menu]', wrap);
        wrap.classList.remove('mega-open');
        menu?.setAttribute('aria-hidden', 'true');
        trigger?.setAttribute('aria-expanded', 'false');
      });
      if (!except) body.classList.remove('mega-menu-open');
    };

    megaWraps.forEach((wrap) => {
      const trigger = qs('[data-mega-trigger]', wrap);
      const menu = qs('[data-mega-menu]', wrap);
      let leaveTimer = null;
      let enterTimer = null;

      const show = (delay = 0) => {
        clearTimeout(leaveTimer);
        clearTimeout(enterTimer);
        if (delay > 0) {
          enterTimer = window.setTimeout(() => {
            doShow();
          }, delay);
        } else {
          doShow();
        }
      };

      const doShow = () => {
        closeAll(wrap);
        updateMegaMenuTop();
        wrap.classList.add('mega-open');
        body.classList.add('mega-menu-open');
        menu?.setAttribute('aria-hidden', 'false');
        trigger?.setAttribute('aria-expanded', 'true');
      };

      const hide = (delay = 350) => {
        clearTimeout(leaveTimer);
        clearTimeout(enterTimer);
        if (delay === 0) {
          doHide();
        } else {
          leaveTimer = window.setTimeout(() => {
            doHide();
          }, delay);
        }
      };

      const doHide = () => {
        wrap.classList.remove('mega-open');
        menu?.setAttribute('aria-hidden', 'true');
        trigger?.setAttribute('aria-expanded', 'false');
        if (!qs('.mega-wrap.mega-open', header)) body.classList.remove('mega-menu-open');
      };

      wrap.addEventListener('mouseenter', () => show(150)); // 150ms hover delay on open to prevent accidental trigger
      
      wrap.addEventListener('mouseleave', () => {
        clearTimeout(enterTimer);
        if (!menu) {
          hide(350);
          return;
        }

        const menuRect = menu.getBoundingClientRect();
        
        // Diagonal tracking algorithm (sign, isPointInTriangle)
        const sign = (p1, p2, p3) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        const isPointInTriangle = (p, p1, p2, p3) => {
          const d1 = sign(p, p1, p2);
          const d2 = sign(p, p2, p3);
          const d3 = sign(p, p3, p1);
          const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
          const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
          return !(has_neg && has_pos);
        };

        const checkClose = () => {
          if (!wrap.classList.contains('mega-open')) return;
          
          if (mouseLocs.length >= 1) {
            const current = mouseLocs[mouseLocs.length - 1];
            const menuRect = menu.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();
            
            // Check if mouse is physically inside the mega menu or trigger bounds (with 10px buffer)
            if (
              current.x >= menuRect.left - 10 && current.x <= menuRect.right + 10 &&
              current.y >= menuRect.top - 10 && current.y <= menuRect.bottom + 10
            ) {
              leaveTimer = window.setTimeout(checkClose, 100);
              return;
            }
            if (
              current.x >= triggerRect.left - 10 && current.x <= triggerRect.right + 10 &&
              current.y >= triggerRect.top - 10 && current.y <= triggerRect.bottom + 10
            ) {
              leaveTimer = window.setTimeout(checkClose, 100);
              return;
            }

            if (mouseLocs.length >= 2) {
              const prev = mouseLocs[0];
              // If mouse is moving downwards towards the mega menu
              if (current.y > prev.y) {
                const p1 = prev;
                const p2 = { x: menuRect.left, y: menuRect.top };
                const p3 = { x: menuRect.right, y: menuRect.top };
                
                if (isPointInTriangle(current, p1, p2, p3)) {
                  // Diagonal cursor path is inside the aiming triangle, defer closing!
                  leaveTimer = window.setTimeout(checkClose, 100);
                  return;
                }
              }
            }
          }
          hide(0);
        };

        // Initial delay to let the user start moving their mouse
        clearTimeout(leaveTimer);
        leaveTimer = window.setTimeout(checkClose, 150);
      });

      wrap.addEventListener('focusin', () => show(0));
      wrap.addEventListener('focusout', (event) => {
        if (event.relatedTarget && wrap.contains(event.relatedTarget)) return;
        hide(100);
      });

      trigger?.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          hide(0);
          trigger.blur();
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAll();
    });

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-mega-wrap]')) return;
      closeAll();
    });
  }

  function initSearch() {
    const btn = qs('[data-header-search-toggle]');
    const panel = qs('[data-header-search-panel]');
    const input = qs('[data-header-search-input]');
    const close = qs('[data-header-search-close]');
    const form = panel?.querySelector('form');
    const results = qs('.header-search-results', panel || document);
    if (!btn || !panel || !input) return;
    const submit = qs('.header-search-submit', panel);
    const indexNode = qs('[data-header-search-index]', panel);
    const productIndexNode = qs('[data-header-product-index]', panel);
    const fallbackCategories = [
      {
        title: 'Roots, Botanicals & Traditional Ingredients',
        handle: 'roots-adaptogens',
        meta: 'Hareer Sabaz, Chasko Herb, Ginseng White'
      },
      {
        title: 'Dry Fruits & Heritage Mewa',
        handle: 'nuts-dry-fruits',
        meta: 'Zarishk Imported, Munaqqa, Anjeer'
      },
      {
        title: 'Gums & Specialties',
        handle: 'oil-gums-specialties',
        meta: 'Luban, Guggul, Goond Katira'
      },
      {
        title: 'Herbs & Daily Botanicals',
        handle: 'herbs-botanicals',
        meta: 'Ashwagandha, Sikakai, Amla'
      },
      {
        title: 'Natural Sweeteners & Salts',
        handle: 'natural-sweetners-salts',
        meta: 'Gur, Fruit Salt, Shakar'
      },
      {
        title: 'Premium Nuts',
        handle: 'nuts-dry-fruits',
        meta: 'Kajo Roasted, Kajo Fry, Badam Abdul Wahidi'
      },
      {
        title: 'Seeds & Functional Grains',
        handle: 'seeds-grains',
        meta: 'Sarson Black, Til Black, Tukhm Methi'
      },
      {
        title: 'Wellness Blends',
        handle: 'all',
        meta: 'Triphala Blend, Salajeet'
      }
    ];
    const categories = (() => {
      if (!indexNode) return fallbackCategories;
      try {
        const parsed = JSON.parse(indexNode.textContent || '[]');
        return Array.isArray(parsed) && parsed.length ? parsed : fallbackCategories;
      } catch (error) {
        return fallbackCategories;
      }
    })();
    const localProducts = (() => {
      if (!productIndexNode) return [];
      try {
        const parsed = JSON.parse(productIndexNode.textContent || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        return [];
      }
    })();
    let activeIndex = -1;
    let searchTimer = null;
    let activeRequest = null;

    const rootPath = () => window.Shopify?.routes?.root || '/';
    const collectionUrl = (handle) => handle === 'all' ? `${rootPath()}collections/all` : `${rootPath()}collections/${handle}`;

    const formatMoney = (value) => {
      if (value == null || value === '') return '';
      const numeric = Number(String(value).replace(/[^\d.]/g, ''));
      if (Number.isFinite(numeric) && numeric > 0) {
        const amount = numeric > 10000 ? numeric / 100 : numeric;
        return `Rs.${amount.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
      }
      return String(value).replace(/<[^>]*>/g, '');
    };

    const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9\s&-]/g, ' ').replace(/\s+/g, ' ').trim();

    const imageFromProduct = (product) => {
      if (!product) return '';
      if (typeof product.image === 'string') return product.image;
      if (product.image && typeof product.image === 'object') return product.image.url || product.image.src || '';
      if (typeof product.featured_image === 'string') return product.featured_image;
      if (product.featured_image && typeof product.featured_image === 'object') return product.featured_image.url || product.featured_image.src || '';
      return '';
    };

    const clearResults = () => {
      activeIndex = -1;
      if (results) {
        results.innerHTML = '';
        results.classList.remove('is-loading', 'has-results', 'is-empty');
      }
    };

    const resultRows = () => results ? qsa('.search-result-row', results) : [];

    const setActiveResult = (index) => {
      const rows = resultRows();
      if (!rows.length) return;
      activeIndex = (index + rows.length) % rows.length;
      rows.forEach((row, rowIndex) => {
        row.classList.toggle('is-active', rowIndex === activeIndex);
        row.setAttribute('aria-selected', String(rowIndex === activeIndex));
      });
      rows[activeIndex].scrollIntoView({ block: 'nearest' });
    };

    const createResultRow = ({ type, title, meta, price, url, image }) => {
      const row = document.createElement('a');
      row.className = `search-result-row search-result-${type}`;
      row.href = url;
      row.setAttribute('role', 'option');
      row.setAttribute('aria-selected', 'false');

      const media = document.createElement('span');
      media.className = 'search-result-media';
      if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.alt = '';
        img.width = 64;
        img.height = 64;
        img.loading = 'lazy';
        media.appendChild(img);
      } else {
        media.textContent = type === 'category' ? 'C' : 'M';
      }

      const copy = document.createElement('span');
      copy.className = 'search-result-copy';
      const label = document.createElement('span');
      label.className = 'search-result-label';
      label.textContent = type === 'category' ? 'Category' : 'Product';
      const name = document.createElement('b');
      name.textContent = title;
      const helper = document.createElement('small');
      helper.textContent = meta || (type === 'category' ? 'Shop category' : 'Morganics product');
      copy.append(label, name, helper);

      const aside = document.createElement('span');
      aside.className = 'search-result-aside';
      aside.textContent = price || 'Open';

      row.append(media, copy, aside);
      row.addEventListener('mouseenter', () => {
        activeIndex = resultRows().indexOf(row);
        setActiveResult(activeIndex);
      });
      return row;
    };

    const matchingCategories = (query) => {
      const term = normalize(query);
      if (!term) return [];
      return categories
        .filter((category) => normalize(`${category.title} ${category.meta} ${category.handle}`).includes(term))
        .slice(0, 4)
        .map((category) => ({
          type: 'category',
          title: category.title,
          meta: category.meta,
          url: category.url || collectionUrl(category.handle),
          image: category.image
        }));
    };

    const matchingProducts = (query) => {
      const term = normalize(query);
      if (!term) return [];
      return localProducts
        .map((product) => {
          const haystack = normalize(`${product.title} ${product.type} ${product.vendor} ${product.sku}`);
          if (!haystack.includes(term)) return null;
          const starts = normalize(product.title).startsWith(term) ? 2 : 0;
          const score = starts + Math.max(0, 1 - haystack.indexOf(term) / 80);
          return { product, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 7)
        .map(({ product }) => ({
          title: product.title,
          url: product.url,
          vendor: product.vendor,
          type: product.type,
          product_type: product.type,
          price: product.price,
          image: product.image
        }));
    };

    const renderResults = ({ query, products = [], collections = [], categoryMatches = [], localProductMatches = [] }) => {
      if (!results) return;
      results.innerHTML = '';
      const resultKey = (item) => {
        const url = String(item.url || '').split('?')[0];
        return `${normalize(item.title || item.name)}|${url}`;
      };
      const mergedProducts = [...localProductMatches, ...products]
        .filter((product, index, list) => list.findIndex((candidate) => resultKey(candidate) === resultKey(product)) === index)
        .slice(0, 6);
      const productRows = mergedProducts.map((product) => ({
        type: 'product',
        title: product.title || product.name || 'Morganics product',
        meta: product.vendor || product.type || product.product_type || 'Morganics pantry',
        price: formatMoney(product.price || product.min_price || product.price_min || product.compare_at_price),
        url: product.url || `${rootPath()}search?q=${encodeURIComponent(query)}`,
        image: imageFromProduct(product)
      }));
      const collectionRows = collections.slice(0, 3).map((collection) => ({
        type: 'category',
        title: collection.title || collection.name || 'Morganics category',
        meta: 'Shop category',
        url: collection.url || `${rootPath()}collections/${collection.handle || 'all'}`,
        image: imageFromProduct(collection)
      }));
      const rows = [...categoryMatches, ...productRows, ...collectionRows]
        .filter((row, index, list) => list.findIndex((candidate) => `${normalize(candidate.title)}|${String(candidate.url).split('?')[0]}` === `${normalize(row.title)}|${String(row.url).split('?')[0]}`) === index)
        .slice(0, 9);

      if (!rows.length) {
        results.classList.remove('is-loading', 'has-results');
        results.classList.add('is-empty');
        const empty = document.createElement('div');
        empty.className = 'search-empty-state';
        empty.innerHTML = `<b>No exact match yet</b><small>Press Enter to search the full Morganics shop.</small>`;
        results.appendChild(empty);
        return;
      }

      const list = document.createElement('div');
      list.className = 'search-result-list';
      rows.forEach((row) => list.appendChild(createResultRow(row)));

      const footer = document.createElement('a');
      footer.className = 'search-result-footer';
      footer.href = `${rootPath()}search?q=${encodeURIComponent(query)}&type=product`;
      footer.textContent = `View all results for "${query}"`;

      results.classList.remove('is-loading', 'is-empty');
      results.classList.add('has-results');
      results.append(list, footer);
    };

    const runSearch = (query) => {
      if (!results) return;
      const term = query.trim();
      if (term.length < 2) {
        clearResults();
        return;
      }

      if (activeRequest) activeRequest.abort();
      activeRequest = new AbortController();
      results.classList.add('is-loading');
      results.classList.remove('is-empty', 'has-results');
      const categoryMatches = matchingCategories(term);
      const localProductMatches = matchingProducts(term);
      const endpoint = `${rootPath()}search/suggest.json?q=${encodeURIComponent(term)}&resources[type]=product,collection&resources[limit]=8&resources[options][unavailable_products]=last&resources[options][fields]=title,product_type,variants.title,vendor`;

      if (localProductMatches.length || categoryMatches.length) {
        renderResults({ query: term, categoryMatches, localProductMatches });
      }

      fetch(endpoint, { headers: { Accept: 'application/json' }, signal: activeRequest.signal })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error('Search failed')))
        .then((data) => {
          const apiResults = data?.resources?.results || {};
          renderResults({
            query: term,
            products: apiResults.products || [],
            collections: apiResults.collections || [],
            categoryMatches,
            localProductMatches
          });
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;
          renderResults({ query: term, categoryMatches, localProductMatches });
        });
    };

    const scheduleSearch = () => {
      clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => runSearch(input.value), 180);
    };

    const openSearch = () => {
      header.classList.add('search-open');
      panel.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      window.setTimeout(() => input.focus(), 60);
    };

    const closeSearch = (clear = false) => {
      header.classList.remove('search-open');
      panel.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      if (clear) input.value = '';
      if (activeRequest) activeRequest.abort();
      clearResults();
    };

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      header.classList.contains('search-open') ? closeSearch(false) : openSearch();
    });

    close?.addEventListener('click', () => closeSearch(true));

    input.addEventListener('input', scheduleSearch);

    input.addEventListener('keydown', (event) => {
      const rows = resultRows();
      if (event.key === 'Escape') {
        closeSearch(false);
        return;
      }
      if (event.key === 'ArrowDown' && rows.length) {
        event.preventDefault();
        setActiveResult(activeIndex + 1);
        return;
      }
      if (event.key === 'ArrowUp' && rows.length) {
        event.preventDefault();
        setActiveResult(activeIndex - 1);
        return;
      }
      if (event.key === 'Enter' && activeIndex >= 0 && rows[activeIndex]) {
        event.preventDefault();
        window.location.href = rows[activeIndex].href;
      }
    });

    submit?.addEventListener('click', () => {
      if (input.value.trim().length < 2) return;
      form?.submit();
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('search-open')) return;
      if (event.target.closest('[data-header-search-panel]') || event.target.closest('[data-header-search-toggle]')) return;
      closeSearch(false);
    });
  }

  function initMobileDrawer() {
    const toggle = qs('[data-mobile-menu-toggle]');
    const drawer = qs('[data-mobile-menu-panel]');
    const close = qs('[data-mobile-menu-close]');
    if (!toggle || !drawer) return;

    const setOpen = (open) => {
      body.classList.toggle('mobile-menu-open', open);
      body.classList.toggle('menu-open', open);
      drawer.classList.toggle('is-open', open);
      drawer.hidden = false;
      drawer.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => {
      setOpen(!body.classList.contains('mobile-menu-open'));
    });

    close?.addEventListener('click', () => setOpen(false));

    drawer.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        if (header.classList.contains('search-open')) {
          header.classList.remove('search-open');
          qs('[data-header-search-panel]')?.setAttribute('aria-hidden', 'true');
          qs('[data-header-search-toggle]')?.setAttribute('aria-expanded', 'false');
        }
      }
    });

    qs('[data-bottom-menu-toggle]')?.addEventListener('click', () => setOpen(true));
  }

  function wishlistCount() {
    const keys = ['morganicsWishlist', 'MorganicsWishlist', 'wishlist', 'morganics-wishlist'];
    for (const key of keys) {
      try {
        const raw = window.localStorage && window.localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.length;
        if (parsed && Array.isArray(parsed.items)) return parsed.items.length;
        if (parsed && typeof parsed === 'object') return Object.keys(parsed).length;
      } catch (error) {
        return 0;
      }
    }
    return 0;
  }

  function setWishlistCount(count) {
    qsa('[data-wishlist-count]').forEach((node) => {
      node.textContent = String(count);
      node.hidden = count <= 0;
    });
  }

  function initWishlist() {
    setWishlistCount(wishlistCount());
    qsa('[data-wishlist-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        if (window.MorganicsWishlist && typeof window.MorganicsWishlist.open === 'function') {
          window.MorganicsWishlist.open();
        } else {
          setWishlistCount(wishlistCount());
          document.dispatchEvent(new CustomEvent('morganics:wishlist-requested'));
        }
      });
    });
  }

  function syncCartCount() {
    fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then((response) => response.ok ? response.json() : null)
      .then((cart) => {
        if (!cart) return;
        qsa('[data-cart-count]').forEach((node) => {
          node.textContent = String(cart.item_count || 0);
        });
      })
      .catch(() => {});
  }

  function initMobileProductBar() {
    const barBtn = qs('#mobBarAddBtn');
    const productForm = qs('form[action*="/cart/add"]');
    if (!barBtn || !productForm) return;

    barBtn.addEventListener('click', () => {
      const submit = productForm.querySelector('[type="submit"]');
      if (submit) submit.click();
    });

    qsa('[data-variant-input]').forEach((input) => {
      input.addEventListener('change', () => {
        const price = qs('#mobBarPrice');
        const size = qs('#mobBarSize');
        if (price && input.dataset.variantPrice) price.textContent = input.dataset.variantPrice;
        if (size) size.textContent = input.dataset.variantTitle || input.value || size.textContent;
        barBtn.disabled = input.dataset.variantAvailable === 'false';
        barBtn.textContent = barBtn.disabled ? 'Sold Out' : 'Add to Cart';
      });
    });
  }

  initStickyHeader();
  initMegaMenu();
  initSearch();
  initMobileDrawer();
  initWishlist();
  syncCartCount();
  initMobileProductBar();
})();
