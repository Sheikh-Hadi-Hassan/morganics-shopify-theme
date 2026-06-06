(() => {
  const header = document.querySelector('[data-morganics-header]');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const initStoryCarousel = (carousel) => {
    if (carousel.dataset.carouselReady === 'true') return;

    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const autoplay = carousel.dataset.autoplay !== 'false' && !reducedMotion && slides.length > 1;
    const autoplaySpeed = Number.parseInt(carousel.dataset.autoplaySpeed || '6000', 10);
    let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let timer = null;

    if (!slides.length) return;

    const normalize = (index) => (index + slides.length) % slides.length;

    const render = (index = active) => {
      active = normalize(index);
      const previous = normalize(active - 1);
      const upcoming = normalize(active + 1);

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === active;
        const isPrev = slides.length > 1 && slideIndex === previous;
        const isNext = slides.length > 1 && slideIndex === upcoming;

        slide.classList.toggle('is-active', isActive);
        slide.classList.toggle('is-prev', isPrev);
        slide.classList.toggle('is-next', isNext);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        slide.tabIndex = isActive ? 0 : -1;
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === active;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        dot.tabIndex = isActive ? 0 : -1;
      });
    };

    const stop = () => {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    };

    const start = () => {
      stop();
      if (!autoplay) return;
      timer = window.setInterval(() => render(active + 1), Math.max(3000, autoplaySpeed));
    };

    const go = (index) => {
      render(index);
      start();
    };

    prev?.addEventListener('click', () => go(active - 1));
    next?.addEventListener('click', () => go(active + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    carousel.__morganicsStoryGoTo = render;
    carousel.dataset.carouselReady = 'true';
    render(active);
    start();
  };

  const initStoryCarousels = (scope = document) => {
    if (scope.matches?.('[data-story-carousel]')) initStoryCarousel(scope);
    scope.querySelectorAll('[data-story-carousel]').forEach(initStoryCarousel);
  };

  initStoryCarousels();

  document.addEventListener('shopify:section:load', (event) => initStoryCarousels(event.target));
  document.addEventListener('shopify:block:select', (event) => {
    const slide = event.target?.closest?.('[data-carousel-slide]');
    const carousel = slide?.closest?.('[data-story-carousel]');
    if (!slide || !carousel || typeof carousel.__morganicsStoryGoTo !== 'function') return;
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    carousel.__morganicsStoryGoTo(slides.indexOf(slide));
  });

  document.querySelectorAll('[data-whatsapp-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const base = form.dataset.whatsappBase || 'https://wa.me/923223338110';
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const need = String(data.get('need') || '').trim();
      const status = form.querySelector('[data-form-status]');

      if (!name || !phone || !need) {
        if (status) status.textContent = 'Please add your name, phone and required product.';
        form.reportValidity?.();
        return;
      }

      const message = [
        'Hello Morganics, I need help finding a product.',
        '',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Required product: ${need}`,
        '',
        'Please check availability and guide me.'
      ].join('\n');
      if (status) status.textContent = 'Opening WhatsApp inquiry...';
      window.open(`${base}${base.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  });

  const initFavorites = () => {
    const key = 'morganics_favorites';
    const legacyKeys = ['morganicsWishlist', 'MorganicsWishlist', 'wishlist', 'morganics-wishlist'];
    const drawer = document.querySelector('[data-wishlist-drawer]');
    const backdrop = document.querySelector('[data-wishlist-backdrop]');
    const body = document.querySelector('[data-wishlist-drawer-body]');

    const read = () => {
      try {
        const current = window.localStorage.getItem(key);
        if (current) {
          const parsed = JSON.parse(current);
          return Array.isArray(parsed) ? parsed : [];
        }

        for (const legacyKey of legacyKeys) {
          const raw = window.localStorage.getItem(legacyKey);
          if (!raw) continue;
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return parsed;
          if (parsed && Array.isArray(parsed.items)) return parsed.items;
          if (parsed && typeof parsed === 'object') return Object.values(parsed);
        }
      } catch (error) {
        return [];
      }
      return [];
    };

    const write = (items) => {
      window.localStorage.setItem(key, JSON.stringify(items));
      window.localStorage.setItem('morganicsWishlist', JSON.stringify(items));
      document.dispatchEvent(new CustomEvent('morganics:favorites-updated', { detail: items }));
      document.dispatchEvent(new CustomEvent('morganics:wishlist-updated', { detail: items }));
    };

    const escapeHtml = (value) => {
      const div = document.createElement('div');
      div.textContent = value == null ? '' : String(value);
      return div.innerHTML;
    };

    const updateCount = (items = read()) => {
      document.querySelectorAll('[data-wishlist-count]').forEach((node) => {
        node.textContent = String(items.length);
        node.hidden = items.length <= 0;
      });
    };

    const findProductImage = (product) => {
      if (product?.image) return product.image;
      const identity = String(product?.id || product?.handle || '');
      if (!identity) return '';
      const matchedButton = Array.from(document.querySelectorAll('[data-favorite-toggle]')).find((button) => (
        String(button.dataset.productId || button.dataset.productHandle || '') === identity ||
        String(button.dataset.productHandle || '') === identity
      ));
      const card = matchedButton?.closest('[data-product-card]');
      const cardImage = card?.querySelector('.product-img img');
      return matchedButton?.dataset.productImage || cardImage?.currentSrc || cardImage?.src || '';
    };

    const collect = (button) => {
      const card = button.closest('[data-product-card]');
      const cardImage = card?.querySelector('.product-img img');
      return {
        id: button.dataset.productId || button.dataset.productHandle || '',
        handle: button.dataset.productHandle || '',
        title: button.dataset.productTitle || 'Morganics product',
        url: button.dataset.productUrl || '/collections/all',
        image: button.dataset.productImage || cardImage?.currentSrc || cardImage?.src || '',
        price: button.dataset.productPrice || '',
        variantId: button.dataset.variantId || ''
      };
    };

    const render = (items = read()) => {
      updateCount(items);
      document.querySelectorAll('[data-favorite-toggle]').forEach((button) => {
        const id = button.dataset.productId || button.dataset.productHandle;
        const active = !!id && items.some((item) => String(item.id || item.handle) === String(id));
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
        if (button.dataset.productTitle) {
          button.setAttribute('aria-label', `${active ? 'Remove' : 'Add'} ${button.dataset.productTitle} ${active ? 'from' : 'to'} wishlist`);
        }
      });

      if (!body) return;
      if (!items.length) {
        body.innerHTML = [
          '<div class="empty-wishlist">',
          '<h3>No saved products yet.</h3>',
          '<p>Tap the heart on any product card to save it here.</p>',
          '<a class="btn primary" href="/collections/all">Shop Products</a>',
          '</div>'
        ].join('');
        return;
      }

      body.innerHTML = items.map((item) => {
        const imageSrc = findProductImage(item);
        const image = imageSrc
          ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}" width="112" height="112" loading="lazy">`
          : '<span class="wishlist-item-placeholder" aria-hidden="true">M</span>';
        const addButton = item.variantId
          ? `<button class="wishlist-add-cart" type="button" data-wishlist-add-cart data-variant-id="${escapeHtml(item.variantId)}">Add to Cart</button>`
          : '';
        return [
          `<article class="wishlist-line" data-wishlist-item data-product-id="${escapeHtml(item.id)}" data-product-handle="${escapeHtml(item.handle)}">`,
          `<a class="wishlist-line-media" href="${escapeHtml(item.url)}">${image}</a>`,
          '<div class="wishlist-line-info">',
          `<a class="wishlist-line-title" href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a>`,
          item.price ? `<span class="wishlist-line-price">${escapeHtml(item.price)}</span>` : '',
          '<div class="wishlist-line-actions">',
          `<a class="wishlist-view" href="${escapeHtml(item.url)}">View Details</a>`,
          addButton,
          `<button class="wishlist-remove" type="button" data-wishlist-remove data-product-id="${escapeHtml(item.id)}" data-product-handle="${escapeHtml(item.handle)}">Remove</button>`,
          '</div>',
          '</div>',
          '</article>'
        ].join('');
      }).join('');
    };

    const open = () => {
      render();
      drawer?.classList.add('open');
      drawer?.setAttribute('aria-hidden', 'false');
      backdrop?.classList.add('open');
      backdrop?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('wishlist-open');
    };

    const close = () => {
      drawer?.classList.remove('open');
      drawer?.setAttribute('aria-hidden', 'true');
      backdrop?.classList.remove('open');
      backdrop?.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('wishlist-open');
    };

    document.addEventListener('click', (event) => {
      const favoriteButton = event.target.closest('[data-favorite-toggle]');
      const wishlistToggle = event.target.closest('[data-wishlist-toggle]');
      const closeButton = event.target.closest('[data-wishlist-close]');
      const removeButton = event.target.closest('[data-wishlist-remove]');
      const addCartButton = event.target.closest('[data-wishlist-add-cart]');

      if (favoriteButton && favoriteButton.dataset.productId) {
        event.preventDefault();
        event.stopPropagation();
        const product = collect(favoriteButton);
        const items = read();
        const exists = items.some((item) => String(item.id || item.handle) === String(product.id || product.handle));
        const next = exists
          ? items.filter((item) => String(item.id || item.handle) !== String(product.id || product.handle))
          : [product, ...items].slice(0, 80);
        write(next);
        render(next);
        document.dispatchEvent(new CustomEvent(exists ? 'morganics:favorite-removed' : 'morganics:favorite-added', { detail: product }));
        return;
      }

      if (wishlistToggle) {
        event.preventDefault();
        open();
      }

      if (closeButton) {
        event.preventDefault();
        close();
      }

      if (removeButton) {
        event.preventDefault();
        const id = removeButton.dataset.productId || removeButton.dataset.productHandle;
        const next = read().filter((item) => String(item.id || item.handle) !== String(id));
        write(next);
        render(next);
      }

      if (addCartButton) {
        event.preventDefault();
        addCartButton.disabled = true;
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: addCartButton.dataset.variantId, quantity: 1 })
        })
          .then((response) => {
            if (!response.ok) throw new Error('Cart add failed');
            return response.json();
          })
          .then(() => {
            document.dispatchEvent(new CustomEvent('cart:refresh'));
            document.dispatchEvent(new CustomEvent('cart:open'));
            document.dispatchEvent(new CustomEvent('morganics:cart-updated'));
            window.MorganicsCart?.refresh?.(true);
          })
          .finally(() => {
            addCartButton.disabled = false;
          });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });

    window.MorganicsWishlist = { open, close, render, read };
    render();
  };

  initFavorites();
})();
