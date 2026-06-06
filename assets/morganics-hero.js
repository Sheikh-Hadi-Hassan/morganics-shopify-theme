(function () {
  var closeTimers = new WeakMap();
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function parseProductData(hero) {
    var node = hero.querySelector('[data-hero-spotlight-products]');
    if (!node) return {};
    try {
      return JSON.parse(node.textContent || '{}');
    } catch (error) {
      return {};
    }
  }

  function getCardParts(card) {
    return {
      image: card.querySelector('.hero-spotlight-media img'),
      title: card.querySelector('.hero-spotlight-copy h3'),
      urdu: card.querySelector('.hero-spotlight-urdu'),
      description: card.querySelector('.hero-spotlight-copy p'),
      category: card.querySelector('.hero-spotlight-foot strong'),
      add: card.querySelector('.hero-spotlight-add'),
      cta: card.querySelector('.hero-spotlight-cta')
    };
  }

  function positionCard(hero, card, imgRect) {
    if (window.innerWidth <= 767) return;

    var heroRect = hero.getBoundingClientRect();
    var cardWidth = 364;
    var gap = 24;
    var left = imgRect.right - heroRect.left + gap;

    if (left + cardWidth > heroRect.width - 18) {
      left = imgRect.left - heroRect.left - cardWidth - gap;
    }

    left = Math.max(18, Math.min(left, heroRect.width - cardWidth - 18));
    var top = Math.max(112, Math.min(imgRect.top - heroRect.top - 18, heroRect.height - 240));

    card.style.left = left + 'px';
    card.style.top = top + 'px';
    card.style.right = 'auto';
    card.style.bottom = 'auto';
  }

  function clearActiveFloaters(hero) {
    hero.querySelectorAll('.floater.is-active').forEach(function (floater) {
      floater.classList.remove('is-active');
    });
  }

  function openSpotlight(hero, hotspot, products) {
    var id = hotspot && hotspot.dataset.spotlight;
    var product = products[id];
    var floater = hotspot && hotspot.closest('.floater');
    var sourceImage = floater && floater.querySelector('.fi');
    var card = hero.querySelector('.hero-spotlight-card');

    if (!product || !sourceImage || !card) return;

    clearActiveFloaters(hero);
    floater.classList.add('is-active');

    var parts = getCardParts(card);
    var imageUrl = product.productImage || product.fallbackImage;
    parts.image.src = imageUrl;
    parts.image.alt = product.title;
    parts.title.textContent = product.title;
    parts.urdu.textContent = product.urduTitle || '';
    parts.urdu.hidden = !product.urduTitle;
    parts.description.textContent = product.description;
    parts.category.textContent = product.category;
    parts.cta.href = '/products/' + product.handle;
    parts.add.dataset.variantId = product.variantId || '';
    parts.add.disabled = !product.variantId;
    parts.add.textContent = product.variantId ? 'Add to Cart' : 'View Product';

    hero.classList.add('is-spotlight-active');

    window.requestAnimationFrame(function () {
      var imgRect = sourceImage.getBoundingClientRect();
      positionCard(hero, card, imgRect);
      card.classList.add('is-visible');
      card.setAttribute('aria-hidden', 'false');
    });
  }

  function closeSpotlight(hero) {
    var card = hero.querySelector('.hero-spotlight-card');
    hero.classList.remove('is-spotlight-active');
    clearActiveFloaters(hero);
    if (card) {
      card.classList.remove('is-visible');
      card.setAttribute('aria-hidden', 'true');
    }
  }

  function scheduleClose(hero) {
    clearTimeout(closeTimers.get(hero));
    closeTimers.set(hero, window.setTimeout(function () {
      closeSpotlight(hero);
    }, 180));
  }

  function cancelClose(hero) {
    clearTimeout(closeTimers.get(hero));
  }

  function addHeroProductToCart(variantId, button) {
    if (!variantId) return Promise.resolve();

    if (button) {
      button.disabled = true;
      button.textContent = 'Adding...';
    }

    return fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ id: Number(variantId), quantity: 1 })
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Cart add failed');
        return response.json();
      })
      .then(function () {
        document.dispatchEvent(new CustomEvent('cart:refresh'));
        document.dispatchEvent(new CustomEvent('cart:open'));
        if (window.MorganicsCart && typeof window.MorganicsCart.refresh === 'function') {
          return window.MorganicsCart.refresh(true);
        }
        return null;
      })
      .finally(function () {
        if (button) {
          button.disabled = false;
          button.textContent = 'Add to Cart';
        }
      });
  }

  function initParallax(hero) {
    if (reducedMotion || !canHover || window.innerWidth < 900) return;

    var depthMap = [
      { sel: '.hero-bg', dx: 4, dy: 3, useCSSTranslate: false },
      { sel: '.hero-plants', dx: 12, dy: 7, useCSSTranslate: false },
      { sel: '.pouch-img', dx: 6, dy: -4, useCSSTranslate: true },
      { sel: '.stone-img', dx: 2, dy: 1.5, useCSSTranslate: true },
      { sel: '.pile-img', dx: 4, dy: 3.5, useCSSTranslate: true },
      { sel: '.floating-zone', dx: 13, dy: 11, useCSSTranslate: false }
    ];
    var entries = depthMap.map(function (item) {
      return Array.prototype.slice.call(hero.querySelectorAll(item.sel)).map(function (element) {
        return {
          element: element,
          dx: item.dx,
          dy: item.dy,
          useCSSTranslate: item.useCSSTranslate
        };
      });
    }).flat();
    var pointer = { x: 0, y: 0 };
    var frame = null;

    function render() {
      frame = null;
      entries.forEach(function (entry) {
        var x = pointer.x * entry.dx;
        var y = pointer.y * entry.dy;
        if (entry.useCSSTranslate) {
          entry.element.style.translate = x.toFixed(2) + 'px ' + y.toFixed(2) + 'px';
        } else {
          entry.element.style.transform = 'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, 0)';
        }
      });
    }

    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!frame) frame = window.requestAnimationFrame(render);
    });

    hero.addEventListener('pointerleave', function () {
      pointer.x = 0;
      pointer.y = 0;
      if (!frame) frame = window.requestAnimationFrame(render);
    });
  }

  function initHero(hero) {
    var products = parseProductData(hero);
    var card = hero.querySelector('.hero-spotlight-card');
    var closeButton = hero.querySelector('.hero-spotlight-close');
    var addButton = hero.querySelector('.hero-spotlight-add');

    hero.querySelectorAll('.hero-hotspot').forEach(function (hotspot) {
      hotspot.addEventListener('focus', function () {
        openSpotlight(hero, hotspot, products);
      });

      hotspot.addEventListener('click', function (event) {
        event.preventDefault();
        openSpotlight(hero, hotspot, products);
      });

      if (canHover) {
        hotspot.addEventListener('mouseenter', function () {
          cancelClose(hero);
          openSpotlight(hero, hotspot, products);
        });
        hotspot.addEventListener('mouseleave', function () {
          scheduleClose(hero);
        });
      }
    });

    if (card) {
      card.addEventListener('mouseenter', function () {
        cancelClose(hero);
      });
      card.addEventListener('mouseleave', function () {
        if (canHover) scheduleClose(hero);
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        closeSpotlight(hero);
      });
    }

    if (addButton) {
      addButton.addEventListener('click', function () {
        var variantId = addButton.dataset.variantId;
        if (!variantId) {
          var cta = hero.querySelector('.hero-spotlight-cta');
          if (cta) window.location.href = cta.href;
          return;
        }
        addHeroProductToCart(variantId, addButton).catch(function () {
          addButton.textContent = 'Try Again';
        });
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeSpotlight(hero);
    });

    document.addEventListener('click', function (event) {
      if (window.innerWidth > 767) return;
      if (event.target.closest('.hero-spotlight-card') || event.target.closest('.hero-hotspot')) return;
      closeSpotlight(hero);
    });

    initParallax(hero);
  }

  function initAll() {
    document.querySelectorAll('[data-morganics-hero]').forEach(initHero);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
