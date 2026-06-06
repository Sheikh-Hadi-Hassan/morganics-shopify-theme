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
