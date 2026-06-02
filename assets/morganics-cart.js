(function () {
  var drawer = document.querySelector('[data-cart-drawer]');
  var backdrop = document.querySelector('[data-cart-backdrop]');
  var body = document.querySelector('[data-cart-drawer-body]');
  var subtotalNodes = document.querySelectorAll('[data-cart-subtotal]');
  var countNodes = document.querySelectorAll('[data-cart-count]');
  var checkoutButtons = document.querySelectorAll('[data-cart-checkout]');

  if (!drawer || !body) return;

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

  function openCart() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('cart-open');
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
    var image = item.image
      ? '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.product_title) + '" width="180" height="180" loading="lazy">'
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
    checkoutButtons.forEach(function (button) {
      button.disabled = count === 0;
    });
  }

  function renderCart(cart) {
    body.innerHTML = cart.item_count ? cart.items.map(renderLineItem).join('') : renderEmptyCart();
    subtotalNodes.forEach(function (node) {
      node.textContent = formatMoney(cart.total_price);
    });
    updateCount(cart.item_count);
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

    return fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ id: key, quantity: Math.max(0, Number(quantity) || 0) })
    })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
        renderCart(cart);
      })
      .finally(function () {
        body.classList.remove('is-loading');
      });
  }

  document.addEventListener('click', function (event) {
    var openButton = event.target.closest('[data-cart-open]');
    var closeButton = event.target.closest('[data-cart-close]');
    var quantityButton = event.target.closest('[data-cart-qty]');
    var removeButton = event.target.closest('[data-cart-remove]');
    var pageQtyButton = event.target.closest('[data-cart-page-qty]');

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
      if (input) input.value = nextValue;
    }
  });

  document.addEventListener('submit', function (event) {
    var form = event.target.closest('form[action*="/cart/add"]');
    if (!form) return;

    event.preventDefault();
    var submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Cart add failed');
        return response.json();
      })
      .then(function () {
        return refreshCart(true);
      })
      .catch(function () {
        form.submit();
      })
      .finally(function () {
        if (submitButton) submitButton.disabled = false;
      });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeCart();
  });

  window.MorganicsCart = {
    open: openCart,
    close: closeCart,
    refresh: refreshCart
  };
})();
