(function () {
  var drawer = document.querySelector('[data-cart-drawer]');
  var backdrop = document.querySelector('[data-cart-backdrop]');
  var body = document.querySelector('[data-cart-drawer-body]');
  var subtotalNodes = document.querySelectorAll('[data-cart-subtotal]');
  var countNodes = document.querySelectorAll('[data-cart-count]');
  var checkoutButtons = document.querySelectorAll('[data-cart-checkout]');
  var paymentProofStore = new WeakMap();
  var COD_LIMIT_CENTS = 450000;
  var currentCartState = null;

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

  /**
   * Read the selected radio from [data-payment-chooser] (step 2)
   * and activate the matching hidden radio in the [data-payment-panel] (step 3)
   * so all existing payment validation logic continues to work unchanged.
   */
  function syncChooserToDetails() {
    var chooser = drawer.querySelector('[data-payment-chooser]');
    var panel   = drawer.querySelector('[data-payment-panel]');
    if (!chooser || !panel) return;

    var selectedInput = chooser.querySelector('[data-chooser-method]:checked');
    var value    = selectedInput ? selectedInput.value : 'Cash on Delivery';
    var kind     = selectedInput ? selectedInput.dataset.paymentKind : 'cod';
    var provider = selectedInput ? (selectedInput.dataset.paymentProvider || '') : '';

    // Tick the matching hidden radio in the details panel
    panel.querySelectorAll('[data-payment-method]').forEach(function (radio) {
      radio.checked = (radio.value === value);
    });

    // Update the confirm header label
    var confirmLabel = panel.querySelector('[data-payment-confirm-label]');
    if (confirmLabel) confirmLabel.textContent = value;

    // Show / hide the COD confirm block vs online details
    var codConfirm = panel.querySelector('[data-payment-detail="cod-confirm"]');
    if (codConfirm) codConfirm.hidden = (kind !== 'cod');

    // Run the existing panel update so QR/proof visibility updates correctly
    updatePaymentPanel(panel, false);
  }

  // Re-sync whenever the chooser selection changes while on step 2
  function onChooserChange(event) {
    var method = event.target.closest('[data-chooser-method]');
    if (!method) return;
    // If user is on step 2, keep step 3 in sync proactively
    var chooser = method.closest('[data-payment-chooser]');
    if (chooser) {
      // Nothing to do yet — sync happens when user navigates to step 3
    }
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
  // PAYMENT VALIDATION (unchanged)
  // ─────────────────────────────────────────────────────────────────────────

  function selectedPayment(panel) {
    return panel && panel.querySelector('[data-payment-method]:checked');
  }

  function paymentProviderName(method) {
    return method ? method.value : 'Cash on Delivery';
  }

  function paymentProof(panel) {
    return paymentProofStore.get(panel) || null;
  }

  function paymentReference(panel) {
    var input = panel && panel.querySelector('[data-payment-reference]');
    return input ? String(input.value || '').trim() : '';
  }

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
    var method = selectedPayment(panel);
    var isOnline = method && method.dataset.paymentKind === 'online';
    var isCod = method && method.dataset.paymentKind === 'cod';

    if (isCod && cartTotalForPanel(panel) > COD_LIMIT_CENTS) {
      return 'Cash on Delivery is unavailable for orders above Rs 4,500.';
    }

    if (!isOnline) return '';
    if (!paymentProof(panel)) return showSoftMessage ? 'Please upload payment screenshot before checkout.' : '';
    if (!paymentReference(panel)) return showSoftMessage ? 'Please enter transaction/reference number.' : '';
    return '';
  }

  function isPaymentReady(panel) {
    var method = selectedPayment(panel);
    if (!method) return false;
    if (method.dataset.paymentKind === 'cod') return cartTotalForPanel(panel) <= COD_LIMIT_CENTS;
    return !!paymentProof(panel) && !!paymentReference(panel);
  }

  function updatePaymentPanel(panel, showSoftMessage) {
    if (!panel) return;
    var method = selectedPayment(panel);
    var provider = method && method.dataset.paymentProvider;
    var proofFields = panel.querySelector('[data-payment-proof-fields]');
    var checkoutButton = panel.closest('form') && panel.closest('form').querySelector('[data-payment-checkout], [data-cart-checkout]');
    var isOnline = method && method.dataset.paymentKind === 'online';

    panel.querySelectorAll('[data-payment-detail]').forEach(function (detail) {
      // Skip the COD confirm block — that is managed by syncChooserToDetails
      if (detail.dataset.paymentDetail === 'cod-confirm') return;
      var visible = isOnline && detail.dataset.paymentDetail === provider;
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
  // PROOF SERIALIZATION + SAVE (unchanged)
  // ─────────────────────────────────────────────────────────────────────────

  function serializeProof(panel) {
    var proof = paymentProof(panel);
    if (!proof) return {};
    return {
      name: proof.name,
      type: proof.type,
      size: proof.size,
      uploadedAt: proof.uploadedAt,
      dataUrl: proof.dataUrl || ''
    };
  }

  function savePaymentSelection(panel) {
    var method = selectedPayment(panel);
    var proof = serializeProof(panel);
    var reference = paymentReference(panel);
    var methodName = paymentProviderName(method);

    try {
      window.localStorage.setItem('morganics_payment_proof', JSON.stringify({
        paymentMethod: methodName,
        transactionReference: reference,
        proof: proof,
        paymentStatus: 'Pending Verification'
      }));
    } catch (error) {}

    return fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        attributes: {
          'Selected Payment Method': methodName,
          'Transaction Reference': reference,
          'Payment Proof Upload': proof.name || '',
          'Payment Status': method && method.dataset.paymentKind === 'online' ? 'Pending Verification' : 'COD Pending'
        }
      })
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

  function renderLineItem(item) {
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

    return [
      '<div class="cart-line cart-line-drawer" data-cart-line-item data-line-key="' + escapeHtml(item.key) + '">',
      '<a class="cart-line-image" href="' + escapeHtml(item.url) + '">' + image + '</a>',
      '<div class="cart-line-info">',
      '<a class="cart-line-title" href="' + escapeHtml(item.url) + '">' + escapeHtml(item.product_title) + '</a>',
      variant,
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
    var powderAddonId = window.morganicsPowderAddonVariantId || "45464500000000";
    var visibleItems = cart.item_count ? cart.items.filter(function (item) {
      return String(item.variant_id) !== String(powderAddonId) && item.handle !== 'powdering-service';
    }) : [];

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
    return fetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (response) { return response.json(); })
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

    if (currentCartState && currentCartState.items) {
      var itemToChange = currentCartState.items.find(function (item) {
        return item.key === key;
      });
      if (itemToChange && itemToChange.properties && itemToChange.properties._powder_link) {
        var linkId = itemToChange.properties._powder_link;
        var powderAddonId = window.morganicsPowderAddonVariantId || "45464500000000";
        var linkedItem = currentCartState.items.find(function (item) {
          return String(item.variant_id) === String(powderAddonId) &&
                 item.properties &&
                 item.properties._powder_link === linkId;
        });
        if (linkedItem) {
          updates[linkedItem.key] = qty;
        }
      }
    }

    return fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ updates: updates })
    })
      .then(function (response) { return response.json(); })
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
    var method      = event.target.closest('[data-payment-method]');
    var proofInput  = event.target.closest('[data-payment-proof]');
    var chooser     = event.target.closest('[data-chooser-method]');
    var qtyInput    = event.target.closest('.cart-qty-input');

    if (qtyInput) {
      var form = qtyInput.closest('form');
      if (form) form.submit();
    }

    if (method) {
      updatePaymentPanel(method.closest('[data-payment-panel]'), true);
    }

    if (chooser) {
      onChooserChange(event);
    }

    if (proofInput) {
      var panel = proofInput.closest('[data-payment-panel]');
      var file = proofInput.files && proofInput.files[0];
      var label = panel && panel.querySelector('[data-payment-proof-name]');

      if (!file) {
        paymentProofStore.delete(panel);
        if (label) label.textContent = 'No file selected';
        updatePaymentPanel(panel, true);
        return;
      }

      var proofMeta = {
        name: file.name,
        type: file.type || 'file',
        size: file.size,
        uploadedAt: new Date().toISOString()
      };

      if (label) label.textContent = file.name;
      paymentProofStore.set(panel, proofMeta);
      updatePaymentPanel(panel, true);

      if (file.size <= 2000000 && window.FileReader) {
        var reader = new FileReader();
        reader.onload = function () {
          proofMeta.dataUrl = reader.result;
          paymentProofStore.set(panel, proofMeta);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  document.addEventListener('input', function (event) {
    var referenceInput = event.target.closest('[data-payment-reference]');
    if (referenceInput) updatePaymentPanel(referenceInput.closest('[data-payment-panel]'), true);
  });

  document.addEventListener('submit', function (event) {
    var checkoutForm = event.target.closest('[data-payment-checkout-form]');
    if (checkoutForm) {
      var panel = checkoutForm.querySelector('[data-payment-panel]');
      var checkoutButton = checkoutForm.querySelector('[data-payment-checkout], [data-cart-checkout]');

      event.preventDefault();
      updatePaymentPanel(panel, true);

      if (!isPaymentReady(panel)) return;
      if (checkoutButton) checkoutButton.disabled = true;

      savePaymentSelection(panel)
        .catch(function () {})
        .finally(function () {
          window.location.href = '/checkout';
        });
      return;
    }

    var form = event.target.closest('form[action*="/cart/add"]');
    if (!form) return;

    event.preventDefault();
    var submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    var powderCheckbox = form.querySelector('input[name="properties[Powder form required]"]');
    var isPowderChecked = powderCheckbox && powderCheckbox.checked;

    var requestPromise;

    if (isPowderChecked) {
      var variantId = form.querySelector('[name="id"]').value;
      var quantity = Number(form.querySelector('[name="quantity"]')?.value || 1);
      var powderAddonId = window.morganicsPowderAddonVariantId || "47807857328322";
      var linkId = "pw-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);

      var items = [
        {
          id: variantId,
          quantity: quantity,
          properties: {
            "Powder Form": "Yes",
            "_powder_link": linkId
          }
        },
        {
          id: powderAddonId,
          quantity: quantity,
          properties: {
            "_powder_link": linkId
          }
        }
      ];

      requestPromise = fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ items: items })
      });
    } else {
      requestPromise = fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
    }

    requestPromise
      .then(function (response) {
        if (!response.ok) throw new Error('Cart add failed');
        return response.json();
      })
      .then(function () {
        document.dispatchEvent(new CustomEvent('cart:refresh'));
        document.dispatchEvent(new CustomEvent('cart:open'));
        document.dispatchEvent(new CustomEvent('morganics:cart-updated'));
        if (submitButton) submitButton.classList.add('is-success');
        return refreshCart(true);
      })
      .catch(function () {
        if (!isPowderChecked) {
          form.submit();
        } else {
          console.error('Failed to add items to cart via AJAX');
        }
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

  updatePaymentPanels(false);
  goToStep(1); // ensure correct initial state

  window.MorganicsCart = {
    open: openCart,
    close: closeCart,
    refresh: refreshCart,
    goToStep: goToStep
  };
})();
