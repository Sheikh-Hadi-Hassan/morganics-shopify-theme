// assets/morganics-quick-view.js
// Handles opening, populating, and closing the Quick View modal.

(function() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.quick-view-overlay');
  const closeBtn = modal.querySelector('[data-action="close-quick-view"]');
  const imgEl = modal.querySelector('.quick-view-img');
  const titleEl = modal.querySelector('.quick-view-title');
  const priceEl = modal.querySelector('.quick-view-price');
  const variantSelect = modal.querySelector('.quick-view-variant');
  const qtyInput = modal.querySelector('.qty-input');
  const addToCartBtn = modal.querySelector('.quick-view-add-to-cart');

  function openModal(productHandle) {
    fetch(`/products/${productHandle}.js`)
      .then((res) => res.json())
      .then((data) => {
        // Populate modal fields
        titleEl.textContent = data.title;
        priceEl.textContent = Shopify.formatMoney(data.price, Shopify.currency.active);
        imgEl.src = data.featured_image ? data.featured_image : '';
        imgEl.alt = data.title;
        // Build variant selector (single‑variant view – default variant only)
        variantSelect.innerHTML = '';
        const option = document.createElement('option');
        option.value = data.id;
        option.textContent = `${data.title} - ${Shopify.formatMoney(data.price, Shopify.currency.active)}`;
        variantSelect.appendChild(option);
        // Reset quantity
        qtyInput.value = 1;
        // Show modal
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      })
      .catch(() => {
        console.error('Quick view fetch failed');
      });
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event delegation for Quick‑View buttons
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action="quick-view"]');
    if (btn) {
      const handle = btn.getAttribute('data-product-handle');
      openModal(handle);
    }
  });

  // Close handlers
  overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Add‑to‑Cart via AJAX
  addToCartBtn.addEventListener('click', function () {
    const variantId = variantSelect.value;
    const quantity = parseInt(qtyInput.value, 10) || 1;
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity }),
    })
      .then((r) => r.json())
      .then(() => {
        // Show toast (reuse existing toast if available)
        const event = new CustomEvent('cart:added', { detail: { variantId, quantity } });
        document.dispatchEvent(event);
        closeModal();
      })
      .catch(() => console.error('Add to cart failed'));
  });
})();
