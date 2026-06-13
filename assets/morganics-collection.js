(() => {
  const normalize = (value) => String(value || '').toLowerCase().trim();
  const tokenize = (value) => normalize(value).replace(/[^a-z0-9]+/g, ' ').trim();
  const toCents = (value) => {
    const amount = Number.parseFloat(String(value || '').replace(/[^\d.]/g, ''));
    return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
  };
  const debounce = (fn, delay = 180) => {
    let timer;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), delay);
    };
  };

  // Set active sorting option label on page load to handle Most Popular vs Best Selling values
  document.querySelectorAll('select[name="sort_by"]').forEach((select) => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortSelected = urlParams.get('sort_by');
    if (sortSelected === 'best-selling') {
      const lastLabel = localStorage.getItem('morganics-last-sort-label') || 'Best Selling';
      const options = Array.from(select.options);
      const matched = options.find((opt) => opt.text === lastLabel);
      if (matched) {
        options.forEach((opt) => opt.selected = (opt === matched));
        select.value = matched.value;
      }
    }
  });

  document.querySelectorAll('[data-collection-tools]').forEach((form) => {
    form.querySelectorAll('select').forEach((select) => {
      select.addEventListener('change', () => {
        const option = select.options[select.selectedIndex];
        if (option) {
          localStorage.setItem('morganics-last-sort-label', option.text);
        }
        form.submit();
      });
    });
  });

  document.querySelectorAll('[data-collection-filter-root]').forEach((root) => {
    const sidebar = root.querySelector('[data-collection-sidebar]');
    const cards = Array.from(root.querySelectorAll('[data-filter-card]'));
    const count = root.querySelector('[data-filter-count]');
    const emptyState = root.querySelector('[data-filter-empty]');
    const activeFilters = root.querySelector('[data-active-filters]');
    const searchInput = root.querySelector('[data-filter-search]');
    const priceMin = root.querySelector('[data-filter-price-min]');
    const priceMax = root.querySelector('[data-filter-price-max]');
    const priceRange = root.querySelector('[data-filter-price-range]');
    const priceOutput = root.querySelector('[data-filter-price-output]');
    const categoryButtons = Array.from(root.querySelectorAll('[data-filter-category]'));
    const chipButtons = Array.from(root.querySelectorAll('[data-filter-size], [data-filter-type], [data-filter-tag]'));
    const checkboxes = Array.from(root.querySelectorAll('[data-filter-availability], [data-filter-collection]'));
    const clearButtons = Array.from(root.querySelectorAll('[data-filter-clear]'));
    const applyButton = root.querySelector('[data-filter-apply]');
    const openButton = root.querySelector('[data-filter-open]');
    const closeButtons = Array.from(root.querySelectorAll('[data-filter-close]'));

    if (!sidebar || !cards.length) return;

    const getChecked = (selector) => Array.from(root.querySelectorAll(`${selector}:checked`)).map((input) => normalize(input.value));
    const getActive = (selector) => Array.from(root.querySelectorAll(`${selector}.is-active`)).map((button) => normalize(button.dataset.filterSize || button.dataset.filterType || button.dataset.filterTag || button.dataset.filterCategory));

    const getState = () => {
      const activeCategory = categoryButtons.find((button) => button.classList.contains('is-active')) || categoryButtons[0];
      const maxRange = priceRange ? toCents(priceRange.value) : 0;
      const maxInput = priceMax ? toCents(priceMax.value) : 0;
      const minInput = priceMin ? toCents(priceMin.value) : 0;

      return {
        search: tokenize(searchInput?.value),
        category: normalize(activeCategory?.dataset.filterCategory || 'all'),
        availability: getChecked('[data-filter-availability]'),
        collections: getChecked('[data-filter-collection]'),
        sizes: getActive('[data-filter-size]'),
        types: getActive('[data-filter-type]'),
        tags: getActive('[data-filter-tag]'),
        priceMin: minInput,
        priceMax: maxInput || maxRange
      };
    };

    const includesAny = (source, values) => !values.length || values.some((value) => source.includes(tokenize(value)));

    const cardMatches = (card, state) => {
      const title = tokenize(card.dataset.title);
      const tags = tokenize(card.dataset.tags);
      const type = tokenize(card.dataset.productType);
      const category = tokenize(card.dataset.category);
      const collections = tokenize(card.dataset.collections);
      const variants = tokenize(card.dataset.variants);
      const sizes = tokenize(card.dataset.sizes);
      const sku = tokenize(card.dataset.sku);
      const haystack = [title, tags, type, category, collections, variants, sizes, sku].join(' ');
      const price = Number.parseInt(card.dataset.price || '0', 10);
      const available = normalize(card.dataset.available);

      if (state.search && !haystack.includes(state.search)) return false;
      if (state.category && state.category !== 'all' && !includesAny(haystack, state.category.split(/\s+/))) return false;
      if (state.availability.length && !state.availability.includes(available)) return false;
      if (!includesAny(collections, state.collections)) return false;
      if (!includesAny(sizes, state.sizes)) return false;
      if (!includesAny(type, state.types)) return false;
      if (!includesAny(tags, state.tags)) return false;
      if (state.priceMin && price < state.priceMin) return false;
      if (state.priceMax && price > state.priceMax) return false;

      return true;
    };

    const makeChip = (label, onClick) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'active-filter-chip';
      button.textContent = `${label} ×`;
      button.addEventListener('click', onClick);
      return button;
    };

    const renderActiveFilters = (state) => {
      if (!activeFilters) return;
      activeFilters.innerHTML = '';
      const active = [];

      if (state.search) {
        active.push(makeChip(`Search: ${searchInput.value}`, () => {
          searchInput.value = '';
          applyFilters();
        }));
      }

      const category = categoryButtons.find((button) => button.classList.contains('is-active'));
      if (category && state.category !== 'all') {
        active.push(makeChip(category.textContent.trim(), () => {
          categoryButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filterCategory === 'all'));
          applyFilters();
        }));
      }

      checkboxes.filter((input) => input.checked).forEach((input) => {
        active.push(makeChip(input.closest('label')?.textContent.trim() || input.value, () => {
          input.checked = false;
          applyFilters();
        }));
      });

      chipButtons.filter((button) => button.classList.contains('is-active')).forEach((button) => {
        active.push(makeChip(button.textContent.trim(), () => {
          button.classList.remove('is-active');
          applyFilters();
        }));
      });

      if (state.priceMin > 0 || (priceRange && state.priceMax < toCents(priceRange.max))) {
        active.push(makeChip(`Rs ${Math.round(state.priceMin / 100)}-${Math.round(state.priceMax / 100)}`, () => {
          if (priceMin) priceMin.value = '0';
          if (priceMax && priceRange) priceMax.value = priceRange.max;
          if (priceRange) priceRange.value = priceRange.max;
          updatePriceOutput();
          applyFilters();
        }));
      }

      active.forEach((chip) => activeFilters.append(chip));
      if (active.length) {
        const clear = document.createElement('button');
        clear.type = 'button';
        clear.className = 'active-filter-clear';
        clear.textContent = 'Clear all';
        clear.addEventListener('click', clearFilters);
        activeFilters.append(clear);
      }
      activeFilters.hidden = !active.length;
    };

    const applyFilters = () => {
      const state = getState();
      let visible = 0;

      cards.forEach((card) => {
        const match = cardMatches(card, state);
        card.hidden = !match;
        card.classList.toggle('is-filter-hidden', !match);
        if (match) visible += 1;
      });

      if (count) count.textContent = String(visible);
      if (emptyState) emptyState.hidden = visible !== 0;
      renderActiveFilters(state);
    };

    const debouncedApply = debounce(applyFilters);

    const updatePriceOutput = () => {
      if (!priceRange || !priceMax || !priceOutput) return;
      priceMax.value = priceRange.value;
      priceOutput.textContent = priceRange.value;
    };

    const clearFilters = () => {
      if (searchInput) searchInput.value = '';
      categoryButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.filterCategory === 'all'));
      chipButtons.forEach((button) => button.classList.remove('is-active'));
      checkboxes.forEach((input) => {
        input.checked = false;
      });
      if (priceMin) priceMin.value = '0';
      if (priceMax && priceRange) priceMax.value = priceRange.max;
      if (priceRange) priceRange.value = priceRange.max;
      updatePriceOutput();
      applyFilters();
    };

    const openDrawer = () => {
      document.body.classList.add('collection-filter-open');
      sidebar.setAttribute('aria-modal', 'true');
      sidebar.querySelector('input, button')?.focus({ preventScroll: true });
    };

    const closeDrawer = () => {
      document.body.classList.remove('collection-filter-open');
      sidebar.removeAttribute('aria-modal');
      openButton?.focus({ preventScroll: true });
    };

    searchInput?.addEventListener('input', debouncedApply);
    priceRange?.addEventListener('input', () => {
      updatePriceOutput();
      debouncedApply();
    });
    priceMin?.addEventListener('input', debouncedApply);
    priceMax?.addEventListener('input', debouncedApply);
    checkboxes.forEach((input) => input.addEventListener('change', applyFilters));
    clearButtons.forEach((button) => button.addEventListener('click', clearFilters));
    applyButton?.addEventListener('click', () => {
      applyFilters();
      closeDrawer();
    });
    openButton?.addEventListener('click', openDrawer);
    closeButtons.forEach((button) => button.addEventListener('click', closeDrawer));

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        categoryButtons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        applyFilters();
      });
    });

    chipButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('is-active');
        applyFilters();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && document.body.classList.contains('collection-filter-open')) {
        closeDrawer();
      }
    });

    // Grid / List View Toggle
    const gridContainer = root.querySelector('.morganics-product-grid');
    const viewToggleButtons = root.querySelectorAll('.morganics-view-toggle [data-view]');
    if (gridContainer && viewToggleButtons.length) {
      const savedView = localStorage.getItem('morganics-shop-view') || 'grid';
      
      const setView = (view) => {
        gridContainer.setAttribute('data-view', view);
        if (view === 'list') {
          gridContainer.classList.add('is-list-view');
        } else {
          gridContainer.classList.remove('is-list-view');
        }
        viewToggleButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.view === view);
        });
        localStorage.setItem('morganics-shop-view', view);
      };

      // Apply saved view on load
      setView(savedView);

      viewToggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          setView(btn.dataset.view);
        });
      });
    }

    updatePriceOutput();
    applyFilters();
  });

  // Global List Row event delegation for both homepage and collection pages
  document.addEventListener('change', (event) => {
    const select = event.target.closest('[data-list-row-variant-selector]');
    if (!select) return;
    const option = select.options[select.selectedIndex];
    const row = select.closest('[data-list-row-item]');
    if (!row) return;

    const variantId = option.value;
    const priceMoney = option.dataset.priceMoney;
    
    // Update form hidden input
    const formInput = row.querySelector('[data-list-row-form-variant-id]');
    if (formInput) formInput.value = variantId;

    // Update price display
    const priceDisplay = row.querySelector('[data-list-row-price-display]');
    if (priceDisplay && priceMoney) priceDisplay.textContent = priceMoney;

    // Update wishlist button variant dataset
    const wishlistBtn = row.querySelector('.product-card-wishlist');
    if (wishlistBtn) wishlistBtn.setAttribute('data-variant-id', variantId);
  });

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-qty-change]');
    if (!btn) return;
    
    const change = parseInt(btn.dataset.qtyChange, 10);
    const row = btn.closest('[data-list-row-item]');
    if (!row) return;

    const qtyInput = row.querySelector('[data-qty-input]');
    if (qtyInput) {
      let val = parseInt(qtyInput.value, 10) || 1;
      val += change;
      if (val < 1) val = 1;
      qtyInput.value = val;
    }
  });
})();
