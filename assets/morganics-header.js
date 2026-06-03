(() => {
  const body = document.body;
  const header = document.querySelector('[data-morganics-header]');
  if (!header) return;

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function initStickyHeader() {
    const tick = () => {
      const scrolled = window.scrollY > 80;
      header.classList.toggle('is-scrolled', scrolled);
      header.classList.toggle('scrolled', scrolled);
    };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
  }

  function initMegaMenu() {
    qsa('[data-mega-wrap]').forEach((wrap) => {
      const trigger = qs('[data-mega-trigger]', wrap);
      const menu = qs('[data-mega-menu]', wrap);
      let leaveTimer = null;

      const show = () => {
        clearTimeout(leaveTimer);
        wrap.classList.add('mega-open');
        menu?.setAttribute('aria-hidden', 'false');
        trigger?.setAttribute('aria-expanded', 'true');
      };

      const hide = () => {
        leaveTimer = window.setTimeout(() => {
          wrap.classList.remove('mega-open');
          menu?.setAttribute('aria-hidden', 'true');
          trigger?.setAttribute('aria-expanded', 'false');
        }, 120);
      };

      wrap.addEventListener('mouseenter', show);
      wrap.addEventListener('mouseleave', hide);
      wrap.addEventListener('focusin', show);
      wrap.addEventListener('focusout', hide);
    });
  }

  function initSearch() {
    const btn = qs('[data-header-search-toggle]');
    const panel = qs('[data-header-search-panel]');
    const input = qs('[data-header-search-input]');
    const close = qs('[data-header-search-close]');
    const results = qs('.header-search-results', panel || document);
    if (!btn || !panel || !input) return;

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
      if (results) results.innerHTML = '';
    };

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      header.classList.contains('search-open') ? closeSearch(false) : openSearch();
    });

    close?.addEventListener('click', () => closeSearch(true));

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeSearch(false);
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
