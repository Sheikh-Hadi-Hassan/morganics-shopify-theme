(function () {
  'use strict';

  var instances = new WeakMap();

  function hashString(value) {
    var hash = 2166136261;
    for (var index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    var state = seed || 1;
    return function () {
      state += 0x6d2b79f5;
      var value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function rectanglesOverlap(a, b, gap) {
    return !(
      a.right + gap <= b.left ||
      a.left >= b.right + gap ||
      a.bottom + gap <= b.top ||
      a.top >= b.bottom + gap
    );
  }

  function readConfig(root) {
    var node = root.querySelector('[data-hero-config]');
    if (!node) return {};
    try {
      return JSON.parse(node.textContent || '{}');
    } catch (error) {
      console.warn('Morganics hero configuration could not be parsed.', error);
      return {};
    }
  }

  function MorganicsHeroSlider(root) {
    this.root = root;
    this.config = readConfig(root);
    this.slides = Array.prototype.slice.call(root.querySelectorAll('[data-mhs-slide]'));
    this.navCards = Array.prototype.slice.call(root.querySelectorAll('[data-mhs-nav]'));
    this.currentIndex = Math.max(0, this.slides.findIndex(function (slide) {
      return slide.classList.contains('is-active');
    }));
    this.timer = null;
    this.frame = null;
    this.paused = false;
    this.spotlightOpen = false;
    this.destroyController = new AbortController();
    this.signal = this.destroyController.signal;
    this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resizeObserver = null;

    if (!this.slides.length) return;
    this.root.dataset.motionReduced = String(Boolean(this.prefersReducedMotion || this.config.reduceMotion));
    this.root.dataset.floatingIngredients = String(this.config.floatingIngredients !== false);
    this.root.dataset.floatingAnimation = String(this.config.floatingAnimation !== false);
    this.root.dataset.burstGlow = String(this.config.burstGlow !== false);
    this.bindControls();
    this.bindPauseBehavior();
    this.bindIngredients();
    this.bindParallax();
    this.bindShopifyEditor();
    this.observeStage();
    this.activate(this.currentIndex, false);
  }

  MorganicsHeroSlider.prototype.bindControls = function () {
    var self = this;
    this.navCards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        self.activate(index, true);
      }, { signal: self.signal });
    });

    this.root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft' && event.target.closest('.mhs-slide-nav')) self.activate(self.currentIndex - 1, true);
      if (event.key === 'ArrowRight' && event.target.closest('.mhs-slide-nav')) self.activate(self.currentIndex + 1, true);
      if (event.key === 'Escape') self.closeSpotlight();
    }, { signal: this.signal });
  };

  MorganicsHeroSlider.prototype.bindPauseBehavior = function () {
    var self = this;
    if (this.config.pauseOnHover) {
      this.root.addEventListener('mouseenter', function () {
        self.pause();
      }, { signal: this.signal });
      this.root.addEventListener('mouseleave', function () {
        self.resume();
      }, { signal: this.signal });
    }

    if (this.config.pauseOnHover || this.config.pauseOnFocus) {
      this.root.addEventListener('focusin', function () {
        self.pause();
      }, { signal: this.signal });
      this.root.addEventListener('focusout', function (event) {
        if (!self.root.contains(event.relatedTarget)) self.resume();
      }, { signal: this.signal });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) self.pause();
      else self.resume();
    }, { signal: this.signal });
  };

  MorganicsHeroSlider.prototype.bindIngredients = function () {
    var self = this;
    this.root.querySelectorAll('[data-mhs-ingredient]').forEach(function (ingredient) {
      ingredient.addEventListener('click', function () {
        self.openSpotlight(ingredient);
      }, { signal: self.signal });
    });

    var close = this.root.querySelector('[data-spotlight-close]');
    if (close) {
      close.addEventListener('click', function () {
        self.closeSpotlight();
      }, { signal: this.signal });
    }

    document.addEventListener('pointerdown', function (event) {
      if (!self.spotlightOpen) return;
      if (event.target.closest('[data-mhs-spotlight]') || event.target.closest('[data-mhs-ingredient]')) return;
      self.closeSpotlight();
    }, { signal: this.signal });
  };

  MorganicsHeroSlider.prototype.bindParallax = function () {
    var self = this;
    if (!this.config.parallax || this.prefersReducedMotion || this.config.reduceMotion) return;

    this.root.addEventListener('pointermove', function (event) {
      if (window.innerWidth < 1025) return;
      var rect = self.root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var x = ((event.clientX - rect.left) / rect.width) - .5;
      var y = ((event.clientY - rect.top) / rect.height) - .5;
      self.root.style.setProperty('--stage-parallax-x', (x * 10).toFixed(2) + 'px');
      self.root.style.setProperty('--stage-parallax-y', (y * 7).toFixed(2) + 'px');
      self.root.style.setProperty('--ingredient-parallax-x', (x * 7).toFixed(2) + 'px');
      self.root.style.setProperty('--ingredient-parallax-y', (y * 5).toFixed(2) + 'px');
    }, { signal: this.signal, passive: true });

    this.root.addEventListener('pointerleave', function () {
      self.root.style.setProperty('--stage-parallax-x', '0px');
      self.root.style.setProperty('--stage-parallax-y', '0px');
      self.root.style.setProperty('--ingredient-parallax-x', '0px');
      self.root.style.setProperty('--ingredient-parallax-y', '0px');
    }, { signal: this.signal, passive: true });
  };

  MorganicsHeroSlider.prototype.bindShopifyEditor = function () {
    var self = this;
    document.addEventListener('shopify:block:select', function (event) {
      if (!self.root.contains(event.target)) return;
      var slide = event.target.closest('[data-mhs-slide]');
      if (!slide && event.detail && event.detail.blockId) {
        slide = self.root.querySelector('[data-block-id="' + event.detail.blockId + '"]');
      }
      if (slide) self.activate(Number(slide.dataset.slideIndex), false);
      self.pause();
    }, { signal: this.signal });

    document.addEventListener('shopify:block:deselect', function (event) {
      if (self.root.contains(event.target)) self.resume();
    }, { signal: this.signal });
  };

  MorganicsHeroSlider.prototype.observeStage = function () {
    var self = this;
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(function () {
        self.schedulePlacement();
      });
      this.slides.forEach(function (slide) {
        var stage = slide.querySelector('[data-mhs-stage]');
        if (stage) self.resizeObserver.observe(stage);
      });
    }

    window.addEventListener('resize', function () {
      self.schedulePlacement();
    }, { signal: this.signal, passive: true });
    window.addEventListener('orientationchange', function () {
      self.schedulePlacement();
    }, { signal: this.signal, passive: true });
  };

  MorganicsHeroSlider.prototype.activate = function (index, userInitiated) {
    if (!this.slides.length) return;
    var normalized = (index + this.slides.length) % this.slides.length;
    this.closeSpotlight();
    this.currentIndex = normalized;

    this.slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === normalized;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.querySelectorAll('a, button').forEach(function (control) {
        if (active) control.removeAttribute('tabindex');
        else control.setAttribute('tabindex', '-1');
      });
    });

    this.navCards.forEach(function (card, cardIndex) {
      var active = cardIndex === normalized;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-current', active ? 'true' : 'false');
    });

    this.schedulePlacement();
    if (userInitiated) this.restartAutoplay();
    else this.startAutoplay();
  };

  MorganicsHeroSlider.prototype.schedulePlacement = function () {
    var self = this;
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.frame = window.requestAnimationFrame(function () {
      self.frame = null;
      self.placeIngredients(self.slides[self.currentIndex]);
    });
  };

  MorganicsHeroSlider.prototype.placeIngredients = function (slide) {
    if (!slide || !slide.classList.contains('is-active')) return;
    var field = slide.querySelector('[data-floating-field]');
    var stack = slide.querySelector('[data-product-stack]');
    if (!field || !stack) return;

    var fieldRect = field.getBoundingClientRect();
    if (!fieldRect.width || !fieldRect.height) return;
    var stone = slide.querySelector('.mhs-stone');
    var stoneRect = stone ? stone.getBoundingClientRect() : null;
    var stoneLimit = stoneRect ? stoneRect.bottom - fieldRect.top : fieldRect.height;

    var ingredients = Array.prototype.slice.call(field.querySelectorAll('[data-mhs-ingredient]'));
    ingredients.sort(function (a, b) {
      return Number(b.dataset.priority || 0) - Number(a.dataset.priority || 0);
    });

    var viewportWidth = window.innerWidth;
    var counts = this.config.ingredientCounts || {};
    var maximum = this.config.floatingIngredients === false ? 0 : viewportWidth <= 720 ? Number(counts.mobile || 4) : viewportWidth <= 1024 ? Number(counts.tablet || 8) : Number(counts.desktop || 12);
    var scaleMultiplier = Number(this.config.ingredientScale || 1);
    var spread = Number(this.config.ingredientSpread || 1);
    var jitterEnabled = this.config.ingredientJitter !== false;
    var zones = viewportWidth <= 720 ? [
      { x: 50, y: 9, scale: .72, rotate: -8, depth: .34, blur: .30 },
      { x: 24, y: 25, scale: .84, rotate: 13, depth: .68, blur: .08 },
      { x: 76, y: 25, scale: .82, rotate: -12, depth: .64, blur: .10 },
      { x: 33, y: 48, scale: .70, rotate: -16, depth: .42, blur: .28 },
      { x: 68, y: 46, scale: .68, rotate: 14, depth: .40, blur: .30 }
    ] : viewportWidth <= 1024 ? [
      { x: 50, y: 5, scale: .62, rotate: -5, depth: .26, blur: .46 },
      { x: 34, y: 11, scale: .76, rotate: 13, depth: .50, blur: .20 },
      { x: 66, y: 12, scale: .74, rotate: -12, depth: .48, blur: .22 },
      { x: 20, y: 27, scale: .86, rotate: -17, depth: .74, blur: .05 },
      { x: 80, y: 27, scale: .84, rotate: 16, depth: .70, blur: .06 },
      { x: 24, y: 49, scale: .70, rotate: 11, depth: .42, blur: .30 },
      { x: 76, y: 50, scale: .69, rotate: -11, depth: .40, blur: .30 },
      { x: 50, y: 66, scale: .56, rotate: 6, depth: .22, blur: .56 }
    ] : [
      { x: 18, y: 16, scale: .75, rotate: -25, depth: .52, blur: .18 },
      { x: 36, y: 8, scale: .90, rotate: 18, depth: .70, blur: .04 },
      { x: 52, y: 10, scale: .65, rotate: -12, depth: .36, blur: .34 },
      { x: 68, y: 12, scale: .85, rotate: 28, depth: .66, blur: .06 },
      { x: 78, y: 25, scale: .70, rotate: -18, depth: .48, blur: .20 },
      { x: 24, y: 38, scale: .70, rotate: 20, depth: .44, blur: .24 },
      { x: 74, y: 40, scale: .80, rotate: -22, depth: .72, blur: .04 },
      { x: 18, y: 55, scale: .65, rotate: -35, depth: .40, blur: .28 },
      { x: 82, y: 58, scale: .75, rotate: 32, depth: .64, blur: .08 },
      { x: 28, y: 70, scale: .55, rotate: 15, depth: .28, blur: .44 },
      { x: 42, y: 76, scale: .50, rotate: -10, depth: .20, blur: .58 },
      { x: 62, y: 72, scale: .60, rotate: 20, depth: .32, blur: .38 },
      { x: 76, y: 68, scale: .55, rotate: -18, depth: .24, blur: .50 }
    ];
    var suppressed = 0;
    var seedBase = String(this.config.sectionId || '') + ':' + String(slide.dataset.slideHandle || '');

    function visualKeyFor(ingredient) {
      var image = ingredient.querySelector('img');
      return String(
        ingredient.dataset.fallbackAsset ||
        ingredient.dataset.productImage ||
        (image ? image.currentSrc || image.src : '') ||
        ingredient.dataset.title ||
        ''
      ).trim().toLowerCase();
    }

    function clampIngredientY(value, height) {
      var bottomClearance = viewportWidth <= 720 ? 16 : viewportWidth <= 1024 ? 18 : 22;
      var maximumY = Math.min(fieldRect.height - height, stoneLimit - height - bottomClearance);
      return Math.max(0, Math.min(maximumY, value));
    }

    function spreadPoint(percent) {
      return 50 + ((percent - 50) * spread);
    }

    function distancePercent(a, b) {
      var dx = a.xPercent - b.xPercent;
      var dy = a.yPercent - b.yPercent;
      return Math.sqrt((dx * dx) + (dy * dy));
    }

    function clampedPercent(value) {
      return Math.max(0, Math.min(100, value));
    }

    function scatterFromOrigin(index, random, zone) {
      var originX = viewportWidth <= 720 ? 50 : viewportWidth <= 1024 ? 50 : 50;
      var originY = viewportWidth <= 720 ? 30 : viewportWidth <= 1024 ? 32 : 34;
      var baseAngles = viewportWidth <= 720 ? [-92, -152, -28, 160, 20] : viewportWidth <= 1024 ? [-94, -130, -56, -164, -18, 145, 35, -88] : [-115, -90, -65, -155, -25, 145, 35, 178, 2, 125, 55, -135, -45];
      var baseRadii = viewportWidth <= 720 ? [23, 32, 32, 35, 35] : viewportWidth <= 1024 ? [30, 38, 38, 51, 51, 54, 54, 36] : [38, 36, 40, 58, 58, 56, 56, 64, 64, 72, 72, 50, 50];
      var angle = baseAngles[index % baseAngles.length] + (jitterEnabled ? ((random() - .5) * 18) : 0);
      var radius = baseRadii[index % baseRadii.length] * spread * (jitterEnabled ? (.92 + random() * .16) : 1);
      var radians = angle * Math.PI / 180;
      return {
        originX: originX,
        originY: originY,
        angle: angle,
        radius: radius,
        xPercent: clampedPercent(originX + Math.cos(radians) * radius),
        yPercent: clampedPercent(originY + Math.sin(radians) * radius * .72),
        scale: zone.scale,
        rotate: zone.rotate,
        depth: zone.depth,
        blur: zone.blur
      };
    }

    var usedVisuals = new Set();
    var placedPoints = [];
    var placedBoxes = [];
    var placedCount = 0;
    ingredients.forEach(function (ingredient, ingredientIndex) {
      ingredient.classList.remove('is-placed', 'is-suppressed');
      ingredient.style.removeProperty('z-index');
      var visualKey = visualKeyFor(ingredient);
      if (visualKey && usedVisuals.has(visualKey)) {
        ingredient.classList.add('is-suppressed');
        suppressed += 1;
        return;
      }
      if (placedCount >= maximum) {
        ingredient.classList.add('is-suppressed');
        suppressed += 1;
        return;
      }
      if (visualKey) usedVisuals.add(visualKey);

      var random = seededRandom(hashString(seedBase + ':' + ingredientIndex));
      var width = ingredient.offsetWidth;
      var height = ingredient.offsetHeight;
      var zone = zones[placedCount % zones.length];
      var point = scatterFromOrigin(placedCount, random, zone);
      var scale = point.scale * scaleMultiplier * (1 + (jitterEnabled ? ((random() - .5) * .24) : 0));
      var rotation = point.rotate + (jitterEnabled ? ((random() - .5) * 24) : 0);
      var minDistance = viewportWidth <= 720 ? 12 : viewportWidth <= 1024 ? 10 : 12;
      var ingredientGap = viewportWidth <= 720 ? 14 : viewportWidth <= 1024 ? 16 : 22;
      function boxForPoint(candidatePoint) {
        var rawX = (candidatePoint.xPercent / 100 * fieldRect.width) - (width / 2);
        var rawY = (candidatePoint.yPercent / 100 * fieldRect.height) - (height / 2);
        var clampedX = Math.max(0, Math.min(fieldRect.width - width, rawX));
        var clampedY = clampIngredientY(rawY, height);
        var rotationReserve = viewportWidth <= 720 ? 1.22 : viewportWidth <= 1024 ? 1.26 : 1.36;
        var scaledWidth = width * scale * rotationReserve;
        var scaledHeight = height * scale * rotationReserve;
        var visualLeft = clampedX + ((width - scaledWidth) / 2);
        var visualTop = clampedY + ((height - scaledHeight) / 2);
        return {
          x: clampedX,
          y: clampedY,
          left: visualLeft,
          top: visualTop,
          right: visualLeft + scaledWidth,
          bottom: visualTop + scaledHeight
        };
      }
      function boxesTouch(a, b) {
        return !(
          a.right + ingredientGap <= b.left ||
          a.left >= b.right + ingredientGap ||
          a.bottom + ingredientGap <= b.top ||
          a.top >= b.bottom + ingredientGap
        );
      }
      var finalBox = boxForPoint(point);
      for (var spacingAttempt = 0; spacingAttempt < 16; spacingAttempt += 1) {
        var tooClose = placedPoints.some(function (placedPoint) {
          return distancePercent(point, placedPoint) < minDistance;
        }) || placedBoxes.some(function (placedBox) {
          return boxesTouch(finalBox, placedBox);
        });
        if (!tooClose) break;
        var direction = spacingAttempt % 2 === 0 ? 1 : -1;
        var adjustedAngle = point.angle + (direction * (12 + spacingAttempt * 4));
        var adjustedRadius = point.radius * (1.04 + spacingAttempt * .025);
        var adjustedRadians = adjustedAngle * Math.PI / 180;
        point.xPercent = clampedPercent(point.originX + Math.cos(adjustedRadians) * adjustedRadius);
        point.yPercent = clampedPercent(point.originY + Math.sin(adjustedRadians) * adjustedRadius * .72);
        finalBox = boxForPoint(point);
      }
      var stillTouching = placedBoxes.some(function (placedBox) {
        return boxesTouch(finalBox, placedBox);
      });
      if (stillTouching) {
        ingredient.classList.add('is-suppressed');
        suppressed += 1;
        return;
      }
      var x = finalBox.x;
      var y = finalBox.y;
      ingredient.style.setProperty('--x', x.toFixed(1) + 'px');
      ingredient.style.setProperty('--y', y.toFixed(1) + 'px');
      ingredient.style.setProperty('--ingredient-x', x.toFixed(1) + 'px');
      ingredient.style.setProperty('--ingredient-y', y.toFixed(1) + 'px');
      ingredient.style.setProperty('--scale', scale.toFixed(2));
      ingredient.style.setProperty('--ingredient-scale', scale.toFixed(2));
      ingredient.style.setProperty('--rotate', rotation.toFixed(1) + 'deg');
      ingredient.style.setProperty('--ingredient-rotation', rotation.toFixed(1) + 'deg');
      ingredient.style.setProperty('--delay', (-ingredientIndex * .52).toFixed(2) + 's');
      ingredient.style.setProperty('--duration', (5 + random() * 4).toFixed(2) + 's');
      ingredient.style.setProperty('--depth', Number(point.depth || .4).toFixed(2));
      ingredient.style.setProperty('--depth-blur', Number(point.blur || 0).toFixed(2) + 'px');
      ingredient.style.setProperty('--float-x', (((random() - .5) * 4) + ((point.xPercent - 50) * .03)).toFixed(1) + 'px');
      ingredient.style.setProperty('--float-y', (((random() - .5) * 4) - (point.depth || .4) * 2.5).toFixed(1) + 'px');
      ingredient.style.setProperty('--float-rotate', (((random() - .5) * 4) + (point.rotate > 0 ? .8 : -.8)).toFixed(1) + 'deg');
      ingredient.style.setProperty('--float-duration', (8.4 + random() * 3.2).toFixed(2) + 's');
      ingredient.style.zIndex = String(Math.round(20 + point.depth * 32));
      ingredient.style.setProperty('--z', String(Math.round(20 + point.depth * 32)));
      ingredient.classList.add('is-placed');
      placedPoints.push(point);
      placedBoxes.push(finalBox);
      placedCount += 1;
    });

    if (suppressed > 0 && window.Shopify && window.Shopify.designMode) {
      console.warn('Morganics hero: ' + suppressed + ' low-priority ingredient(s) were hidden because the active stage has no collision-safe placement space.');
    }
  };

  MorganicsHeroSlider.prototype.openSpotlight = function (ingredient) {
    var spotlight = this.root.querySelector('[data-mhs-spotlight]');
    if (!spotlight) return;
    var ingredientImage = ingredient.querySelector('img');
    var image = spotlight.querySelector('[data-spotlight-image]');
    var title = spotlight.querySelector('[data-spotlight-title]');
    var link = spotlight.querySelector('[data-spotlight-link]');
    var productImage = ingredient.dataset.productImage;
    var href = ingredient.dataset.link;

    image.src = productImage || (ingredientImage ? ingredientImage.currentSrc || ingredientImage.src : '');
    image.alt = ingredient.dataset.title || '';
    title.textContent = ingredient.dataset.title || 'Featured ingredient';
    link.href = href || '#';
    link.hidden = !href;
    spotlight.classList.add('is-visible');
    spotlight.setAttribute('aria-hidden', 'false');
    this.spotlightOpen = true;
    this.pause();
  };

  MorganicsHeroSlider.prototype.closeSpotlight = function () {
    var spotlight = this.root.querySelector('[data-mhs-spotlight]');
    if (!spotlight) return;
    spotlight.classList.remove('is-visible');
    spotlight.setAttribute('aria-hidden', 'true');
    this.spotlightOpen = false;
    this.resume();
  };

  MorganicsHeroSlider.prototype.getDuration = function () {
    var slideConfig = this.config.slides && this.config.slides[this.currentIndex];
    var duration = slideConfig && Number(slideConfig.duration);
    return duration > 0 ? duration : Number(this.config.defaultDuration || 7000);
  };

  MorganicsHeroSlider.prototype.startAutoplay = function () {
    var self = this;
    window.clearTimeout(this.timer);
    if (!this.config.autoplay || this.slides.length < 2 || this.paused || this.spotlightOpen || this.prefersReducedMotion || this.config.reduceMotion) return;
    this.timer = window.setTimeout(function () {
      self.activate(self.currentIndex + 1, false);
    }, this.getDuration());
  };

  MorganicsHeroSlider.prototype.restartAutoplay = function () {
    window.clearTimeout(this.timer);
    this.startAutoplay();
  };

  MorganicsHeroSlider.prototype.pause = function () {
    this.paused = true;
    window.clearTimeout(this.timer);
  };

  MorganicsHeroSlider.prototype.resume = function () {
    if (this.spotlightOpen || document.hidden) return;
    this.paused = false;
    this.startAutoplay();
  };

  MorganicsHeroSlider.prototype.destroy = function () {
    window.clearTimeout(this.timer);
    if (this.frame) window.cancelAnimationFrame(this.frame);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.destroyController.abort();
    instances.delete(this.root);
  };

  function initialize(root) {
    if (!root || instances.has(root)) return;
    instances.set(root, new MorganicsHeroSlider(root));
  }

  function initializeAll(scope) {
    var parent = scope || document;
    if (parent.matches && parent.matches('[data-morganics-hero-slider]')) initialize(parent);
    parent.querySelectorAll('[data-morganics-hero-slider]').forEach(initialize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initializeAll(document);
    }, { once: true });
  } else {
    initializeAll(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initializeAll(event.target);
  });

  document.addEventListener('shopify:section:unload', function (event) {
    var root = event.target.matches('[data-morganics-hero-slider]') ? event.target : event.target.querySelector('[data-morganics-hero-slider]');
    var instance = root && instances.get(root);
    if (instance) instance.destroy();
  });

  window.MorganicsHeroSlider = MorganicsHeroSlider;
})();
(() => {
  const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  const ingredientSelector = '.mhs-ingredient, [data-mhs-ingredient], .morganics-hero-ingredient';
  const heroSelector = '[data-morganics-hero], .morganics-hero, .mhs-hero, .mhs-section, .shopify-section';
  let activeCard = null;
  let activeRoot = null;
  let activeIngredient = null;

  const getConfig = () => window.MorganicsHeroIngredientConfig || {};

  const findHeroRoot = (ingredient) => {
    return ingredient.closest(heroSelector) || document.body;
  };

  const getSlideIndex = (ingredient) => {
    const slide = ingredient.closest('[data-slide-index], [data-mhs-slide], .mhs-slide, .swiper-slide, .splide__slide');
    if (!slide) return 0;
    if (slide.dataset.slideIndex) return Number(slide.dataset.slideIndex) || 0;
    if (slide.dataset.mhsSlide) return Number(slide.dataset.mhsSlide) || 0;
    const siblings = [...slide.parentElement.children].filter((child) => child.matches('.mhs-slide, .swiper-slide, .splide__slide, [data-slide-index], [data-mhs-slide]'));
    return Math.max(0, siblings.indexOf(slide));
  };

  const getIngredientIndex = (ingredient) => {
    const root = findHeroRoot(ingredient);
    return [...root.querySelectorAll(ingredientSelector)].indexOf(ingredient);
  };

  const getConfiguredMeta = (ingredient) => {
    const config = getConfig();
    const slideIndex = getSlideIndex(ingredient);
    const ingredientIndex = getIngredientIndex(ingredient);
    const slideConfig = config.slides?.[slideIndex] || config[slideIndex] || {};
    const itemConfig = slideConfig.ingredients?.[ingredientIndex] || {};
    return itemConfig;
  };

  const readMeta = (ingredient) => {
    const configured = getConfiguredMeta(ingredient);
    const image = ingredient.dataset.ingredientImage || ingredient.dataset.productImage || ingredient.dataset.image || configured.image || ingredient.currentSrc || ingredient.src || ingredient.querySelector('img')?.currentSrc || ingredient.querySelector('img')?.src || '';
    const name = ingredient.dataset.ingredientName || ingredient.dataset.name || ingredient.dataset.title || configured.name || ingredient.getAttribute('aria-label') || ingredient.alt || ingredient.title || 'Morganics ingredient';
    const description = ingredient.dataset.ingredientDescription || ingredient.dataset.description || configured.description || 'A carefully selected Morganics ingredient for everyday pantry routines.';
    const productUrl = ingredient.dataset.productUrl || ingredient.dataset.ingredientUrl || ingredient.dataset.link || configured.productUrl || configured.url || ingredient.closest('a')?.href || '/collections/all';

    return { image, name, description, productUrl };
  };

  const buildCard = () => {
    const card = document.createElement('aside');
    card.className = 'mhs-ingredient-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.innerHTML = `
      <button class="mhs-ingredient-card__close" type="button" aria-label="Close ingredient details">&times;</button>
      <div class="mhs-ingredient-card__media"><img alt="" loading="lazy"></div>
      <div class="mhs-ingredient-card__body">
        <h3 class="mhs-ingredient-card__title"></h3>
        <p class="mhs-ingredient-card__description"></p>
        <a class="mhs-ingredient-card__cta" href="/collections/all">View Product</a>
      </div>
    `;
    document.body.appendChild(card);
    card.querySelector('.mhs-ingredient-card__close').addEventListener('click', closeCard);
    return card;
  };

  const positionCard = (card, ingredient) => {
    const rect = ingredient.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const gap = 18;
    const margin = 16;
    let left = rect.right + gap;
    let top = rect.top + rect.height / 2 - cardRect.height / 2;

    if (left + cardRect.width + margin > window.innerWidth) {
      left = rect.left - cardRect.width - gap;
    }
    if (left < margin) {
      left = Math.min(window.innerWidth - cardRect.width - margin, Math.max(margin, rect.left));
      top = rect.bottom + gap;
    }
    if (top + cardRect.height + margin > window.innerHeight) {
      top = window.innerHeight - cardRect.height - margin;
    }
    if (top < margin) top = margin;

    card.style.left = `${Math.round(left)}px`;
    card.style.top = `${Math.round(top)}px`;
  };

  function closeCard() {
    if (activeCard) activeCard.classList.remove('is-visible');
    if (activeRoot) activeRoot.classList.remove('mhs-ingredient-focus');
    if (activeIngredient) activeIngredient.classList.remove('is-ingredient-selected');
    activeRoot = null;
    activeIngredient = null;
  }

  const openCard = (ingredient) => {
    if (!desktopQuery.matches) return;
    const root = findHeroRoot(ingredient);
    const meta = readMeta(ingredient);
    const card = activeCard || buildCard();
    activeCard = card;

    if (activeIngredient && activeIngredient !== ingredient) {
      activeIngredient.classList.remove('is-ingredient-selected');
    }
    if (activeRoot && activeRoot !== root) {
      activeRoot.classList.remove('mhs-ingredient-focus');
    }

    card.querySelector('.mhs-ingredient-card__media img').src = meta.image;
    card.querySelector('.mhs-ingredient-card__media img').alt = meta.name;
    card.querySelector('.mhs-ingredient-card__title').textContent = meta.name;
    card.querySelector('.mhs-ingredient-card__description').textContent = meta.description;
    card.querySelector('.mhs-ingredient-card__cta').href = meta.productUrl;

    activeRoot = root;
    activeIngredient = ingredient;
    root.classList.add('mhs-ingredient-focus');
    ingredient.classList.add('is-ingredient-selected');

    card.classList.add('is-visible');
    positionCard(card, ingredient);
  };

  const hydrateIngredient = (ingredient) => {
    if (ingredient.dataset.ingredientHydrated === 'true') return;
    ingredient.dataset.ingredientHydrated = 'true';
    if (!ingredient.hasAttribute('tabindex')) ingredient.setAttribute('tabindex', '0');
    if (!ingredient.getAttribute('role')) ingredient.setAttribute('role', 'button');
    ingredient.addEventListener('click', (event) => {
      if (!desktopQuery.matches) return;
      event.preventDefault();
      event.stopPropagation();
      openCard(ingredient);
    });
    ingredient.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCard(ingredient);
      }
    });
  };

  const applySlideIngredientConfig = (root) => {
    const config = getConfig();
    if (!config.slides && !Object.keys(config).length) return;

    const slides = [...root.querySelectorAll('[data-slide-index], [data-mhs-slide], .mhs-slide, .swiper-slide, .splide__slide')];
    slides.forEach((slide, slideIndex) => {
      const slideConfig = config.slides?.[slideIndex] || config[slideIndex];
      if (!slideConfig?.ingredients) return;
      const ingredients = [...slide.querySelectorAll(ingredientSelector)];
      ingredients.forEach((ingredient, ingredientIndex) => {
        const itemConfig = slideConfig.ingredients[ingredientIndex];
        if (!itemConfig) {
          ingredient.hidden = true;
          return;
        }
        ingredient.hidden = false;
        if (itemConfig.name) ingredient.dataset.ingredientName = itemConfig.name;
        if (itemConfig.description) ingredient.dataset.ingredientDescription = itemConfig.description;
        if (itemConfig.productUrl || itemConfig.url) ingredient.dataset.productUrl = itemConfig.productUrl || itemConfig.url;
        if (itemConfig.image) {
          if (ingredient.tagName === 'IMG') ingredient.src = itemConfig.image;
          else {
            const img = ingredient.querySelector('img');
            if (img) img.src = itemConfig.image;
          }
          ingredient.dataset.ingredientImage = itemConfig.image;
        }
      });
    });
  };

  const init = () => {
    document.querySelectorAll(heroSelector).forEach(applySlideIngredientConfig);
    document.querySelectorAll(ingredientSelector).forEach(hydrateIngredient);
  };

  document.addEventListener('click', (event) => {
    if (!activeCard) return;
    if (activeCard.contains(event.target) || activeIngredient?.contains(event.target)) return;
    closeCard();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCard();
  });

  window.addEventListener('resize', () => {
    if (!desktopQuery.matches) {
      closeCard();
      return;
    }
    if (activeCard && activeIngredient) positionCard(activeCard, activeIngredient);
  }, { passive: true });

  document.addEventListener('DOMContentLoaded', init);
  init();
})();
