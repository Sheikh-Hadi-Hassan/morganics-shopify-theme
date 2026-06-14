(function () {
  var drawer = document.querySelector('[data-cart-drawer]');
  var backdrop = document.querySelector('[data-cart-backdrop]');
  var body = document.querySelector('[data-cart-drawer-body]');
  var subtotalNodes = document.querySelectorAll('[data-cart-subtotal]');
  var countNodes = document.querySelectorAll('[data-cart-count]');
  var checkoutButtons = document.querySelectorAll('[data-cart-checkout]');
  var COD_LIMIT_CENTS = 450000;
  var currentCartState = null;
  var paymentState = {
    method: 'Cash on Delivery',
    kind: 'cod',
    provider: '',
    proof: null
  };

  function cartRoute(path) {
    var root = window.Shopify && window.Shopify.routes && window.Shopify.routes.root
      ? window.Shopify.routes.root
      : '/';
    return root.replace(/\/$/, '') + path;
  }

  if (!drawer || !body) return;

  // ─────────────────────────────────────────────────────────────────────────
  // STEP NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────

  var currentStep = 1;

  function goToStep(n) {
    currentStep = n;

    // Show / hide step panels
    drawer.querySelectorAll('[data-cart-step]').forEach(function (panel) {
      var panelStep = Number(panel.dataset.cartStep);
      panel.hidden = panelStep !== n;
    });

    // Show / hide footer action bars
    drawer.querySelectorAll('[data-step-actions]').forEach(function (bar) {
      var barStep = Number(bar.dataset.stepActions);
      bar.hidden = barStep !== n;
    });

    // Update step indicator dots
    drawer.querySelectorAll('[data-step-dot]').forEach(function (dot) {
      var dotStep = Number(dot.dataset.stepDot);
      dot.classList.toggle('active', dotStep === n);
      dot.classList.toggle('done', dotStep < n);
    });

    // When entering step 3, sync the selected payment method from step 2 chooser
    if (n === 3) {
      syncChooserToDetails();
    }
  }

  function syncChooserToDetails() {
    var chooser = drawer.querySelector('[data-payment-chooser]');
    var panel   = drawer.querySelector('[data-payment-panel]');
    if (!chooser || !panel) return;

    var selectedInput = chooser.querySelector('[data-chooser-method]:checked');
    if (selectedInput) setPaymentState(selectedInput);
    updatePaymentPanel(panel, false);
  }

  function setPaymentState(input) {
    var nextMethod = input ? input.value : 'Cash on Delivery';
    var methodChanged = paymentState.method !== nextMethod;

    paymentState.method = nextMethod;
    paymentState.kind = input ? (input.dataset.paymentKind || 'cod') : 'cod';
    paymentState.provider = input ? (input.dataset.paymentProvider || '') : '';

    if (!methodChanged) return;

    paymentState.proof = null;

    drawer.querySelectorAll('[data-payment-proof]').forEach(function (proofInput) {
      proofInput.value = '';
    });
    drawer.querySelectorAll('[data-payment-proof-name]').forEach(function (label) {
      label.textContent = 'No file selected';
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // IMAGE FALLBACKS
  // ─────────────────────────────────────────────────────────────────────────

  function getImageFallbacks() {
    var fallbackNode = document.getElementById('MorganicsCartImageFallbacks');
    if (!fallbackNode) return {};

    try {
      return JSON.parse(fallbackNode.textContent || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  var imageFallbacks = getImageFallbacks();

  // ─────────────────────────────────────────────────────────────────────────
  // MONEY + HTML UTILS
  // ─────────────────────────────────────────────────────────────────────────

  function formatMoney(cents) {
    if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
      return window.Shopify.formatMoney(cents);
    }

    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'PKR',
      maximumFractionDigits: 0
    }).format((cents || 0) / 100);
  }

  function escapeHtml(value) {
    var div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PAYMENT VALIDATION
  // ─────────────────────────────────────────────────────────────────────────

  function setPaymentError(panel, message) {
    var node = panel && panel.querySelector('[data-payment-error]');
    if (!node) return;
    node.textContent = message || '';
    node.hidden = !message;
  }

  function cartTotalForPanel(panel) {
    return Number(panel && panel.dataset.cartTotal ? panel.dataset.cartTotal : 0) || 0;
  }

  function paymentValidationMessage(panel, showSoftMessage) {
    if (paymentState.kind === 'cod' && cartTotalForPanel(panel) > COD_LIMIT_CENTS) {
      return 'Cash on Delivery is unavailable for orders above Rs 4,500.';
    }

    if (paymentState.kind !== 'online') return '';
    if (!paymentState.proof) return showSoftMessage ? 'Please choose a payment screenshot or PDF receipt before checkout.' : '';
    return '';
  }

  function isPaymentReady(panel) {
    if (paymentState.kind === 'cod') return cartTotalForPanel(panel) <= COD_LIMIT_CENTS;
    return paymentState.kind === 'online' && !!paymentState.proof;
  }

  function updatePaymentPanel(panel, showSoftMessage) {
    if (!panel) return;
    var proofFields = panel.querySelector('[data-payment-proof-fields]');
    var checkoutButton = drawer.querySelector('[data-payment-checkout]');
    var isOnline = paymentState.kind === 'online';
    var confirmLabel = panel.querySelector('[data-payment-confirm-label]');

    if (confirmLabel) confirmLabel.textContent = paymentState.method;

    panel.querySelectorAll('[data-payment-detail]').forEach(function (detail) {
      var visible = detail.dataset.paymentDetail === 'cod-confirm'
        ? paymentState.kind === 'cod'
        : isOnline && detail.dataset.paymentDetail === paymentState.provider;
      detail.hidden = !visible;
    });

    if (proofFields) proofFields.hidden = !isOnline;
    setPaymentError(panel, paymentValidationMessage(panel, showSoftMessage));

    if (checkoutButton) {
      checkoutButton.disabled = checkoutButton.hasAttribute('data-cart-empty') || !isPaymentReady(panel);
    }
  }

  function updatePaymentPanels(showSoftMessage) {
    document.querySelectorAll('[data-payment-panel]').forEach(function (panel) {
      updatePaymentPanel(panel, showSoftMessage);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PAYMENT ATTRIBUTES + NOTE
  // ─────────────────────────────────────────────────────────────────────────

  function paymentNote(existingNote) {
    var cleanNote = String(existingNote || '')
      .replace(/\n*\[Morganics Payment\][\s\S]*?(?=\n\n|$)/, '')
      .trim();
    var paymentSection = [
      '[Morganics Payment]',
      'Payment Method: ' + paymentState.method,
      'Payment Proof: ' + (paymentState.kind === 'online' ? 'Customer selected file before checkout' : 'Not required')
    ].join('\n');
    return cleanNote ? cleanNote + '\n\n' + paymentSection : paymentSection;
  }

  function savePaymentSelection() {
    var proofSelected = paymentState.kind === 'online' && !!paymentState.proof;
    var attributes = {
      'Payment Method': paymentState.method,
      'Payment Proof Required': paymentState.kind === 'online' ? 'Yes' : 'No',
      'Payment Proof Status': proofSelected ? 'Customer selected file before checkout' : 'Not Uploaded',
      'Payment Instructions Shown': paymentState.kind === 'online' ? 'Yes' : 'No'
    };

    if (proofSelected) {
      attributes['Payment Proof File Name'] = paymentState.proof.name;
    }

    // TODO: Shopify Ajax cart attributes cannot store binary files. Connect an
    // upload app/backend here and save its returned URL as "Payment Proof URL".
    return fetch(cartRoute('/cart/update.js'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        attributes: attributes,
        note: paymentNote(currentCartState && currentCartState.note)
      })
    }).then(function (response) {
      if (!response.ok) throw new Error('Unable to save payment method. Please try again.');
      return response.json();
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // IMAGE HELPERS (unchanged)
  // ─────────────────────────────────────────────────────────────────────────

  function normalizeImageUrl(image) {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (typeof image === 'object') return image.url || image.src || '';
    return '';
  }

  function productHandle(item) {
    if (item.handle) return item.handle;
    if (item.product_handle) return item.product_handle;

    var url = item.url || '';
    var match = url.match(/\/products\/([^/?#]+)/);
    return match ? match[1] : '';
  }

  function imageForLineItem(item) {
    var image = normalizeImageUrl(item.image || item.featured_image);
    var handle = productHandle(item);

    if (image) return image;
    if (handle && imageFallbacks[handle]) return imageFallbacks[handle];

    return imageFallbacks['ajwa-dates'] || '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CART OPEN / CLOSE (unchanged + reset to step 1 on open)
  // ─────────────────────────────────────────────────────────────────────────

  function openCart() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.documentElement.classList.add('cart-open');
    document.body.classList.add('cart-open');
    goToStep(1); // always start from step 1
  }

  function closeCart() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.documentElement.classList.remove('cart-open');
    document.body.classList.remove('cart-open');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER (unchanged + reset to step 1 on re-render)
  // ─────────────────────────────────────────────────────────────────────────

  function renderEmptyCart() {
    return [
      '<div class="empty-cart">',
      '<h3>Your cart is empty.</h3>',
      '<p>Start with pantry essentials, dry fruits, spices, or daily rituals.</p>',
      '<a class="btn primary" href="/collections/all">Shop Products</a>',
      '</div>'
    ].join('');
  }

  function renderPowderBadge(item) {
    var props = item.properties || {};
    var isPowdered = props['Powder Form'] === 'Yes';
    if (!isPowdered) return '';
    return '<span class="mrg-powder-badge" aria-label="Powder form selected">' +
           '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
           ' Powder Form</span>';
  }

  function renderVisibleProperties(item) {
    var props = item.properties || {};
    var keys = Object.keys(props);
    var lines = keys.filter(function (k) {
      // Skip underscore-prefixed internal keys and the Powder Form key (shown as badge)
      return k.charAt(0) !== '_' && k !== 'Powder Form';
    }).map(function (k) {
      return '<span class="cart-line-property"><b>' + escapeHtml(k) + ':</b> ' + escapeHtml(String(props[k])) + '</span>';
    });
    return lines.join('');
  }

  function injectPowderBadgeStyles() {
    if (document.getElementById('mrg-powder-badge-styles')) return;
    var style = document.createElement('style');
    style.id = 'mrg-powder-badge-styles';
    style.textContent = [
      '.mrg-powder-badge {',
      '  display: inline-flex;',
      '  align-items: center;',
      '  gap: 5px;',
      '  font-size: 11px;',
      '  font-weight: 700;',
      '  color: #173f36;',
      '  background: rgba(23,63,54,0.09);',
      '  border: 1px solid rgba(23,63,54,0.18);',
      '  border-radius: 999px;',
      '  padding: 2px 9px 2px 6px;',
      '  margin-top: 5px;',
      '  letter-spacing: 0.01em;',
      '  line-height: 1.4;',
      '  white-space: nowrap;',
      '}',
      '.mrg-powder-badge svg {',
      '  flex-shrink: 0;',
      '  color: #2d7a5c;',
      '}',
      '.cart-line-property {',
      '  display: block;',
      '  font-size: 11px;',
      '  color: rgba(23,63,54,0.6);',
      '  margin-top: 2px;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function renderLineItem(item) {
    injectPowderBadgeStyles();
    var imageUrl = imageForLineItem(item);
    var image = imageUrl
      ? '<img src="' + escapeHtml(imageUrl) + '" alt="' + escapeHtml(item.product_title) + '" width="180" height="180" loading="lazy">'
      : '';
    var variant = item.variant_title && item.variant_title !== 'Default Title'
      ? '<span class="cart-line-variant">' + escapeHtml(item.variant_title) + '</span>'
      : '';
    var discounts = item.discounts && item.discounts.length
      ? '<ul class="cart-line-discounts">' + item.discounts.map(function (discount) {
          return '<li>' + escapeHtml(discount.title) + '</li>';
        }).join('') + '</ul>'
      : '';
    var originalPrice = item.original_line_price !== item.final_line_price
      ? '<s>' + formatMoney(item.original_line_price) + '</s>'
      : '';
    var powderBadge = renderPowderBadge(item);
    var visibleProps = renderVisibleProperties(item);

    return [
      '<div class="cart-line cart-line-drawer" data-cart-line-item data-line-key="' + escapeHtml(item.key) + '">',
      '<a class="cart-line-image" href="' + escapeHtml(item.url) + '">' + image + '</a>',
      '<div class="cart-line-info">',
      '<a class="cart-line-title" href="' + escapeHtml(item.url) + '">' + escapeHtml(item.product_title) + '</a>',
      variant,
      powderBadge,
      visibleProps,
      discounts,
      '<div class="qty cart-line-qty">',
      '<button type="button" data-cart-qty data-line-key="' + escapeHtml(item.key) + '" data-quantity="' + (item.quantity - 1) + '" aria-label="Decrease quantity">−</button>',
      '<span data-cart-line-quantity>' + item.quantity + '</span>',
      '<button type="button" data-cart-qty data-line-key="' + escapeHtml(item.key) + '" data-quantity="' + (item.quantity + 1) + '" aria-label="Increase quantity">+</button>',
      '</div>',
      '</div>',
      '<div class="cart-line-price">',
      originalPrice,
      '<strong>' + formatMoney(item.final_line_price) + '</strong>',
      '<button class="cart-del" type="button" data-cart-remove data-line-key="' + escapeHtml(item.key) + '">Remove</button>',
      '</div>',
      '</div>'
    ].join('');
  }

  function updateCount(count) {
    countNodes.forEach(function (node) {
      node.textContent = count;
    });

    // Update step 1 "Continue to Payment" disabled state
    drawer.querySelectorAll('[data-step-next-requires-items]').forEach(function (btn) {
      btn.disabled = count === 0;
    });

    checkoutButtons.forEach(function (button) {
      button.toggleAttribute('data-cart-empty', count === 0);
      button.disabled = count === 0;
    });
    updatePaymentPanels(false);
  }

  function renderCart(cart) {
    currentCartState = cart;
    var visibleItems = cart.item_count ? cart.items : [];

    body.innerHTML = visibleItems.length ? visibleItems.map(renderLineItem).join('') : renderEmptyCart();
    subtotalNodes.forEach(function (node) {
      node.textContent = formatMoney(cart.total_price);
    });
    document.querySelectorAll('[data-payment-panel]').forEach(function (panel) {
      panel.dataset.cartTotal = cart.total_price;
    });
    document.querySelectorAll('[data-payment-chooser]').forEach(function (chooser) {
      chooser.dataset.cartTotal = cart.total_price;
    });

    var visibleCount = visibleItems.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
    updateCount(visibleCount);

    // Reset to step 1 whenever cart data refreshes
    goToStep(1);
  }

  function refreshCart(shouldOpen) {
    return fetch(cartRoute('/cart.js'), { headers: { Accept: 'application/json' } })
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to refresh cart.');
        return response.json();
      })
      .then(function (cart) {
        renderCart(cart);
        if (shouldOpen) openCart();
        return cart;
      });
  }

  function changeCart(key, quantity) {
    body.classList.add('is-loading');

    var qty = Math.max(0, Number(quantity) || 0);
    var updates = {};
    updates[key] = qty;

    return fetch(cartRoute('/cart/update.js'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ updates: updates })
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to update cart.');
        return response.json();
      })
      .then(function (cart) {
        renderCart(cart);
      })
      .finally(function () {
        body.classList.remove('is-loading');
      });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EVENT DELEGATION
  // ─────────────────────────────────────────────────────────────────────────

  document.addEventListener('click', function (event) {
    var openButton      = event.target.closest('[data-cart-open]');
    var closeButton     = event.target.closest('[data-cart-close]');
    var quantityButton  = event.target.closest('[data-cart-qty]');
    var removeButton    = event.target.closest('[data-cart-remove]');
    var pageQtyButton   = event.target.closest('[data-cart-page-qty]');
    var stepNextButton  = event.target.closest('[data-step-next]');
    var stepBackButton  = event.target.closest('[data-step-back]');

    if (openButton) {
      event.preventDefault();
      refreshCart(true);
    }

    if (closeButton && !closeButton.href) {
      event.preventDefault();
      closeCart();
    }

    if (quantityButton) {
      event.preventDefault();
      changeCart(quantityButton.dataset.lineKey, quantityButton.dataset.quantity);
    }

    if (removeButton) {
      event.preventDefault();
      changeCart(removeButton.dataset.lineKey, 0);
    }

    if (pageQtyButton) {
      var qtyWrap = pageQtyButton.closest('.cart-line-qty');
      var input = qtyWrap && qtyWrap.querySelector('.cart-qty-input');
      var nextValue = input ? Math.max(0, Number(input.value || 0) + Number(pageQtyButton.dataset.step || 0)) : 0;
      if (input) {
        input.value = nextValue;
        var form = input.closest('form');
        if (form) form.submit();
      }
    }

    // ── Step navigation ──────────────────────────────────────────────────
    if (stepNextButton) {
      event.preventDefault();
      var nextStep = Number(stepNextButton.dataset.stepNext);
      if (nextStep) goToStep(nextStep);
    }

    if (stepBackButton) {
      event.preventDefault();
      var backStep = Number(stepBackButton.dataset.stepBack);
      if (backStep) goToStep(backStep);
    }
  });

  document.addEventListener('change', function (event) {
    var proofInput  = event.target.closest('[data-payment-proof]');
    var chooser     = event.target.closest('[data-chooser-method]');
    var qtyInput    = event.target.closest('.cart-qty-input');

    if (qtyInput) {
      var form = qtyInput.closest('form');
      if (form) form.submit();
    }

    if (chooser) {
      setPaymentState(chooser);
      updatePaymentPanels(false);
    }

    if (proofInput) {
      var panel = proofInput.closest('[data-payment-panel]');
      var file = proofInput.files && proofInput.files[0];
      var label = panel && panel.querySelector('[data-payment-proof-name]');

      if (!file) {
        paymentState.proof = null;
        if (label) label.textContent = 'No file selected';
        updatePaymentPanel(panel, true);
        return;
      }

      var allowedType = /^image\//.test(file.type) || file.type === 'application/pdf';
      if (!allowedType || file.size > 10000000) {
        proofInput.value = '';
        paymentState.proof = null;
        if (label) label.textContent = 'No file selected';
        setPaymentError(panel, allowedType
          ? 'Payment proof must be smaller than 10 MB.'
          : 'Please choose an image or PDF receipt.');
        updatePaymentPanel(panel, true);
        return;
      }

      paymentState.proof = {
        name: file.name,
        type: file.type || 'file',
        size: file.size,
        selectedAt: new Date().toISOString()
      };

      if (label) label.textContent = 'Selected: ' + file.name;
      updatePaymentPanel(panel, true);
    }
  });

  document.addEventListener('submit', function (event) {
    var checkoutForm = event.target.closest('[data-payment-checkout-form]');
    if (checkoutForm) {
      var panel = checkoutForm.querySelector('[data-payment-panel]');
      var checkoutButton = drawer.querySelector('[data-payment-checkout], [data-cart-checkout]');

      event.preventDefault();
      updatePaymentPanel(panel, true);

      if (!isPaymentReady(panel)) return;
      if (checkoutButton) {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('is-loading');
        checkoutButton.textContent = 'Saving...';
      }

      savePaymentSelection()
        .then(function () {
          window.location.href = cartRoute('/checkout');
        })
        .catch(function (error) {
          setPaymentError(panel, error.message || 'Unable to save payment method. Please try again.');
          if (checkoutButton) {
            checkoutButton.disabled = false;
            checkoutButton.classList.remove('is-loading');
            checkoutButton.textContent = 'Checkout';
          }
        });
      return;
    }

    var form = event.target.closest('form[action*="/cart/add"]');
    if (!form) return;

    event.preventDefault();
    var submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    fetch(cartRoute('/cart/add.js'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Cart add failed');
        return response.json();
      })
      .then(function () {
        if (submitButton) submitButton.classList.add('is-success');
        return refreshCart(true);
      })
      .catch(function () {
        form.submit();
      })
      .finally(function () {
        if (submitButton) submitButton.disabled = false;
        if (submitButton) {
          window.setTimeout(function () { submitButton.classList.remove('is-success'); }, 900);
        }
      });
  });

  document.addEventListener('cart:refresh', function () {
    refreshCart(false);
  });

  document.addEventListener('cart:open', function () {
    refreshCart(true);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeCart();
  });

  // ─────────────────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────────────────

  var initialChooser = drawer.querySelector('[data-chooser-method]:checked');
  if (initialChooser) setPaymentState(initialChooser);
  updatePaymentPanels(false);
  goToStep(1); // ensure correct initial state

  window.MorganicsCart = {
    open: openCart,
    close: closeCart,
    refresh: refreshCart,
    goToStep: goToStep
  };
})();
