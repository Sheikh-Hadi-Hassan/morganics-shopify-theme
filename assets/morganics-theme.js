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
})();
