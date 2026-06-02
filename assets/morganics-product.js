(() => {
  document.querySelectorAll('[data-morganics-product]').forEach((root) => {
    const price = root.querySelector('[data-product-price] .morganics-price__regular');
    const add = root.querySelector('[data-add-to-cart]');
    const qty = root.querySelector('input[name="quantity"]');

    root.querySelectorAll('[data-variant-input]').forEach((input) => {
      input.addEventListener('change', () => {
        if (price && input.dataset.variantPrice) price.textContent = input.dataset.variantPrice;
        if (add) {
          const available = input.dataset.variantAvailable === 'true';
          add.disabled = !available;
          add.textContent = available ? 'Add to Cart' : 'Sold Out';
        }
      });
    });

    root.querySelector('[data-qty-minus]')?.addEventListener('click', () => {
      if (!qty) return;
      qty.value = String(Math.max(1, Number(qty.value || 1) - 1));
    });

    root.querySelector('[data-qty-plus]')?.addEventListener('click', () => {
      if (!qty) return;
      qty.value = String(Math.max(1, Number(qty.value || 1) + 1));
    });
  });

  document.querySelectorAll('[data-faq-accordion]').forEach((accordion) => {
    accordion.addEventListener('click', (event) => {
      const button = event.target.closest('.product-faq-question');
      if (!button || !accordion.contains(button)) return;
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
