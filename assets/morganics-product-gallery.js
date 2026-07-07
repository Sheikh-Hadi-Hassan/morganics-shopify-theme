(() => {
  const initializeGallery = (gallery) => {
    if (gallery.dataset.galleryInitialized === 'true') return;

    const stage = gallery.querySelector('[data-gallery-stage]');
    const slides = Array.from(gallery.querySelectorAll('[data-gallery-slide]'));
    const thumbs = Array.from(gallery.querySelectorAll('[data-gallery-thumb]'));
    const thumbRail = gallery.querySelector('[data-gallery-thumbs]');
    const currentLabel = gallery.querySelector('[data-gallery-current]');

    if (!stage || !slides.length) return;
    gallery.dataset.galleryInitialized = 'true';

    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerId = null;

    const pauseVideo = (slide) => {
      const video = slide?.querySelector('video');
      if (video && !video.paused) video.pause();
    };

    const syncVideoControls = (slide) => {
      const video = slide?.querySelector('video');
      if (!video) return;
      const playButton = slide.querySelector('[data-video-play]');
      const muteButton = slide.querySelector('[data-video-mute]');
      const playIcon = slide.querySelector('[data-play-icon]');
      const muteIcon = slide.querySelector('[data-mute-icon]');

      playButton?.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
      muteButton?.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      if (playIcon) playIcon.textContent = video.paused ? '▶' : 'Ⅱ';
      if (muteIcon) muteIcon.textContent = video.muted ? '⌁' : '♪';
    };

    const show = (nextIndex, focusThumb = false) => {
      const normalizedIndex = (nextIndex + slides.length) % slides.length;
      if (normalizedIndex === activeIndex && slides[normalizedIndex].classList.contains('is-active')) {
        syncVideoControls(slides[activeIndex]);
        return;
      }

      slides.forEach((slide, index) => {
        const isActive = index === normalizedIndex;
        if (!isActive) pauseVideo(slide);
        slide.hidden = !isActive;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      thumbs.forEach((thumb, index) => {
        const isActive = index === normalizedIndex;
        thumb.classList.toggle('is-active', isActive);
        thumb.setAttribute('aria-current', String(isActive));
        if (isActive) {
          thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          if (focusThumb) thumb.focus({ preventScroll: true });
        }
      });

      activeIndex = normalizedIndex;
      if (currentLabel) currentLabel.textContent = String(activeIndex + 1);
      syncVideoControls(slides[activeIndex]);
    };

    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(activeIndex - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(activeIndex + 1));

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => show(index));
    });

    gallery.querySelector('[data-thumb-prev]')?.addEventListener('click', () => {
      show(activeIndex - 1);
      thumbRail?.scrollBy({ left: -Math.max(120, thumbRail.clientWidth * 0.5), behavior: 'smooth' });
    });

    gallery.querySelector('[data-thumb-next]')?.addEventListener('click', () => {
      show(activeIndex + 1);
      thumbRail?.scrollBy({ left: Math.max(120, thumbRail.clientWidth * 0.5), behavior: 'smooth' });
    });

    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(activeIndex - 1, true);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(activeIndex + 1, true);
      }
    });

    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target.closest('button, a, input, select, textarea, [role="button"]')) return;
      pointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      stage.setPointerCapture?.(event.pointerId);
    });

    stage.addEventListener('pointerup', (event) => {
      if (pointerId !== event.pointerId) return;
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      pointerId = null;
      if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
      show(activeIndex + (deltaX < 0 ? 1 : -1));
    });

    stage.addEventListener('pointercancel', () => {
      pointerId = null;
    });

    gallery.querySelectorAll('video').forEach((video) => {
      const slide = video.closest('[data-gallery-slide]');
      const playButton = slide?.querySelector('[data-video-play]');
      const muteButton = slide?.querySelector('[data-video-mute]');

      playButton?.addEventListener('click', () => {
        if (video.paused) {
          const playRequest = video.play();
          if (playRequest?.catch) playRequest.catch(() => {});
        } else {
          video.pause();
        }
      });

      muteButton?.addEventListener('click', () => {
        video.muted = !video.muted;
        syncVideoControls(slide);
      });

      video.addEventListener('click', () => {
        if (video.paused) {
          const playRequest = video.play();
          if (playRequest?.catch) playRequest.catch(() => {});
        } else {
          video.pause();
        }
      });

      ['play', 'pause', 'volumechange', 'ended'].forEach((eventName) => {
        video.addEventListener(eventName, () => syncVideoControls(slide));
      });

      syncVideoControls(slide);
    });

    document.querySelectorAll('[data-variant-input]').forEach((input) => {
      input.addEventListener('change', () => {
        let variants = [];
        try {
          variants = JSON.parse(document.querySelector('[data-morganics-product]')?.dataset.productVariants || '[]');
        } catch (error) {
          variants = [];
        }
        const variant = variants.find((item) => String(item.id) === String(input.value));
        const mediaId = variant?.featured_media?.id || variant?.featured_media_id;
        if (!mediaId) return;
        const mediaIndex = slides.findIndex((slide) => String(slide.dataset.mediaId) === String(mediaId));
        if (mediaIndex >= 0) show(mediaIndex);
      });
    });

    slides.forEach((slide) => {
      slide.querySelectorAll('img').forEach((image) => image.setAttribute('draggable', 'false'));
    });

    const initialIndex = activeIndex;
    activeIndex = -1;
    show(initialIndex);
  };

  const initializeAllGalleries = (root = document) => {
    root.querySelectorAll('[data-product-media-gallery]').forEach(initializeGallery);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeAllGalleries(), { once: true });
  } else {
    initializeAllGalleries();
  }

  document.addEventListener('shopify:section:load', (event) => {
    initializeAllGalleries(event.target);
  });
})();
