(() => {
  const body = document.body;
  const header = document.querySelector('[data-morganics-header]');
  const toggle = document.querySelector('[data-mobile-menu-toggle]');
  const panel = document.querySelector('[data-mobile-menu-panel]');
  const close = document.querySelector('[data-mobile-menu-close]');

  const setMenuOpen = (open) => {
    if (!panel || !toggle) return;
    body.classList.toggle('mobile-menu-open', open);
    panel.classList.toggle('is-open', open);
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle?.addEventListener('click', () => {
    setMenuOpen(!body.classList.contains('mobile-menu-open'));
  });

  close?.addEventListener('click', () => setMenuOpen(false));

  panel?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-story-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (!slides.length) return;
    let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    const render = () => {
      slides.forEach((slide, index) => slide.classList.toggle('is-active', index === active));
    };
    const go = (delta) => {
      active = (active + delta + slides.length) % slides.length;
      render();
    };
    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    render();
  });

  document.querySelectorAll('[data-whatsapp-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const base = form.dataset.whatsappBase || 'https://wa.me/923223338110';
      const message = [
        'Hi Morganics, I want to inquire about a product.',
        `Name: ${data.get('name') || ''}`,
        `Phone: ${data.get('phone') || ''}`,
        `Need: ${data.get('need') || ''}`
      ].join('\n');
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = 'Opening WhatsApp inquiry...';
      window.open(`${base}${base.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  });
})();
