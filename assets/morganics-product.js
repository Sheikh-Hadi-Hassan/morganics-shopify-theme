(() => {
  const URDU_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+(?:[\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u200C\u200D\u064B-\u065F\u0670.,،؛؟!?()\-–—]+[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]+)*/g;
  const SKIP_URDU_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'BUTTON', 'PRICE']);

  const wrapUrduText = (root) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !URDU_RE.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        URDU_RE.lastIndex = 0;
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, noscript, textarea, input, select, option, button, .morganics-price, .price-row, .variant-pills, .morganics-urdu')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (SKIP_URDU_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const text = node.nodeValue;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      text.replace(URDU_RE, (match, index) => {
        if (index > lastIndex) fragment.append(document.createTextNode(text.slice(lastIndex, index)));
        const span = document.createElement('span');
        span.className = 'morganics-urdu';
        span.lang = 'ur';
        span.dir = 'rtl';
        span.textContent = match;
        fragment.append(span);
        lastIndex = index + match.length;
        return match;
      });
      if (lastIndex < text.length) fragment.append(document.createTextNode(text.slice(lastIndex)));
      node.parentNode.replaceChild(fragment, node);
    });
  };

  const cleanFaqQuestion = (value) => String(value || '')
    .replace(/^\s*\d+[\).:-]?\s*/g, '')
    .replace(/^\s*Q(?:uestion)?\s*[:：-]\s*/i, '')
    .trim();

  const cleanFaqAnswer = (value) => String(value || '')
    .replace(/^\s*A(?:nswer)?\s*[:：-]\s*/i, '')
    .trim();

  const parseFaqSource = (source) => {
    const text = String(source || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|li|h2|h3|div)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\r/g, '\n')
      .replace(/\s+(\d+[\).:-]\s*Q(?:uestion)?\s*[:：-])/gi, '\n$1')
      .replace(/\s+(Q(?:uestion)?\s*[:：-])/gi, '\n$1')
      .replace(/\u00a0/g, ' ')
      .trim();

    if (!text || !/(^|\n|\s)(\d+[\).:-]\s*)?Q(?:uestion)?\s*[:：-]/i.test(text)) return [];

    const entries = [];
    const compact = text.replace(/\n+/g, '\n');
    const blockRe = /(?:^|\n)\s*(?:\d+[\).:-]\s*)?Q(?:uestion)?\s*[:：-]\s*([\s\S]*?)\s+A(?:nswer)?\s*[:：-]\s*([\s\S]*?)(?=\n\s*(?:\d+[\).:-]\s*)?Q(?:uestion)?\s*[:：-]|$)/gi;
    let match;
    while ((match = blockRe.exec(compact))) {
      const question = cleanFaqQuestion(match[1]);
      const answer = cleanFaqAnswer(match[2]);
      if (question && answer) entries.push({ question, answer });
    }
    if (entries.length) return entries;

    const lines = compact.split('\n').map((line) => line.trim()).filter(Boolean);
    let pendingQuestion = '';
    lines.forEach((line) => {
      if (/^(?:\d+[\).:-]\s*)?Q(?:uestion)?\s*[:：-]/i.test(line)) {
        pendingQuestion = cleanFaqQuestion(line);
      } else if (/^A(?:nswer)?\s*[:：-]/i.test(line) && pendingQuestion) {
        const answer = cleanFaqAnswer(line);
        if (answer) entries.push({ question: pendingQuestion, answer });
        pendingQuestion = '';
      }
    });
    return entries;
  };

  const renderFaqAccordion = (root) => {
    const accordion = root.querySelector('[data-faq-accordion]');
    if (!accordion) return;
    const faqSource = root.dataset.productFaqSource || '';
    const descriptionSource = root.dataset.productDescriptionFaqSource || '';
    const metafieldFaqs = parseFaqSource(faqSource);
    const descriptionFaqs = parseFaqSource(descriptionSource);
    const faqs = metafieldFaqs.length ? metafieldFaqs : descriptionFaqs;
    if (!faqs.length) return;

    accordion.innerHTML = faqs.map((faq, index) => {
      const id = `product-faq-js-${index + 1}`;
      return `
        <details class="product-faq__item product-faq-item">
          <summary class="product-faq__summary product-faq-question">
            <span data-urdu-wrap>${escapeHtml(faq.question)}</span><span class="faq-icon" aria-hidden="true"></span>
          </summary>
          <div class="product-faq__answer product-faq-answer" id="${id}">
            <p data-urdu-wrap>${escapeHtml(faq.answer)}</p>
          </div>
        </details>
      `;
    }).join('');
    accordion.dataset.faqSource = faqSource ? 'metafield' : 'description';
    wrapUrduText(accordion);
  };

  const suppressRawDescriptionFaq = (root) => {
    const description = root.querySelector('[data-product-description]');
    if (!description) return;
    const children = Array.from(description.children);
    let faqIndex = children.findIndex((child) => /^FAQs?$/i.test(child.textContent.trim()));
    if (faqIndex === -1) {
      faqIndex = children.findIndex((child) => /^(STRONG|B|H2|H3|P|DIV|SUMMARY)$/i.test(child.tagName) && /FAQs?/i.test(child.textContent.trim()));
    }
    if (faqIndex === -1) {
      faqIndex = children.findIndex((child) => /^(OL|UL)$/i.test(child.tagName) && /Q(?:uestion)?\s*[:：-].*A(?:nswer)?\s*[:：-]/is.test(child.textContent.trim()));
    }
    if (faqIndex === -1) {
      faqIndex = children.findIndex((child) => /(?:^|\s)\d+[\).:-]?\s*Q(?:uestion)?\s*[:：-]|(?:^|\s)Q(?:uestion)?\s*[:：-]/i.test(child.textContent.trim()));
    }
    if (faqIndex !== -1) {
      children.slice(faqIndex).forEach((child) => child.remove());
    } else if (/(?:^|\n|\s)FAQs?/i.test(description.textContent) && /Q(?:uestion)?\s*[:：-]/i.test(description.textContent)) {
      const text = description.textContent;
      const faqTextIndex = text.search(/(?:^|\n|\s)FAQs?/i);
      if (faqTextIndex > -1) description.textContent = text.slice(0, faqTextIndex).trim();
    }
    if (!description.textContent.trim()) description.remove();
  };

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  document.querySelectorAll('[data-morganics-product]').forEach((root) => {
    const priceWrapper = root.querySelector('[data-product-price]');
    const regularPriceEl = root.querySelector('[data-product-price] .morganics-price__regular');
    const comparePrice = root.querySelector('[data-product-price] .morganics-price__compare');
    const add = root.querySelector('[data-add-to-cart]');
    const qty = root.querySelector('input[name="quantity"]');
    const powderCheckbox = root.querySelector('[data-powder-toggle]');
    const formatMoney = (cents) => {
      if (window.Shopify && typeof window.Shopify.formatMoney === 'function') {
        return window.Shopify.formatMoney(cents);
      }
      return 'Rs.' + (Number(cents || 0) / 100).toLocaleString('en-PK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };

    const updateVariantUI = (variant) => {
      if (!variant) return;
      if (priceWrapper && regularPriceEl) {
        priceWrapper.dataset.basePrice = variant.price;
        regularPriceEl.textContent = formatMoney(variant.price);
        const hasCompare = variant.compare_at_price && variant.compare_at_price > variant.price;
        regularPriceEl.classList.toggle('morganics-price__regular--sale', !!hasCompare);
        if (comparePrice) {
          comparePrice.textContent = hasCompare ? formatMoney(variant.compare_at_price) : '';
          comparePrice.hidden = !hasCompare;
        }
      }
      if (add) {
        add.disabled = !variant.available;
        add.textContent = variant.available ? 'Add to Cart' : 'Sold Out';
      }
      const mobilePrice = document.querySelector('#mobBarPrice');
      const mobileSize = document.querySelector('#mobBarSize');
      const mobileButton = document.querySelector('#mobBarAddBtn');
      if (mobilePrice) mobilePrice.textContent = formatMoney(variant.price);
      if (mobileSize) {
        const sizeLabel = getVariantSizeLabel(variant);
        mobileSize.textContent = sizeLabel ? `${document.querySelector('h1')?.textContent?.trim() || ''} · ${sizeLabel}` : mobileSize.textContent;
      }
      if (mobileButton) {
        mobileButton.disabled = !variant.available;
        mobileButton.textContent = variant.available ? 'Add to Cart' : 'Sold Out';
      }
      syncSelectedSizePills(variant);
    };

    // ── Variant-switching powder logic ───────────────────────────────────────
    // Powder variants are identified by having an option value that equals
    // "Powder" (case-insensitive). Their non-powder siblings share all other
    // option values. This matches structures like:
    //   Size: 100g  /  Form: Regular   →  regular variant
    //   Size: 100g  /  Form: Powder    →  powder variant
    // OR single-option products with titles "100g" and "100g - Powder".

    const parseVariants = () => {
      try {
        return JSON.parse(root.dataset.productVariants || '[]');
      } catch (error) {
        return window.morganicsProductVariants || [];
      }
    };

    const allVariants = parseVariants();

    const getVariantOptions = (v) => {
      if (Array.isArray(v?.options)) return v.options;
      return [v?.option1, v?.option2, v?.option3].filter(Boolean);
    };

    const isFormOption = (value) => /^(regular|powder)$/i.test(String(value || '').trim());

    const isPowderVariant = (v) =>
      getVariantOptions(v).some((o) => /^powder$/i.test(String(o).trim()));

    const getNonPowderOptions = (v) =>
      getVariantOptions(v).filter((o) => !isFormOption(o));

    const getVariantSizeKey = (v) => getNonPowderOptions(v).map((o) => String(o).trim()).join(' / ');

    const getVariantSizeLabel = (v) => {
      const key = getVariantSizeKey(v);
      if (key) return key;
      return String(v?.title || '')
        .replace(/\s*\/\s*(Regular|Powder)\s*/gi, '')
        .replace(/\s*-\s*(Regular|Powder)\s*/gi, '')
        .trim();
    };

    const syncSelectedSizePills = (variant) => {
      const selectedSize = getVariantSizeLabel(variant);
      root.querySelectorAll('[data-size-pill]').forEach((pill) => {
        pill.classList.toggle('is-selected', pill.dataset.variantSize === selectedSize);
      });
    };

    const getCurrentVariantId = () => {
      const checked = root.querySelector('[data-variant-input]:checked');
      return checked ? String(checked.value) : null;
    };

    const setVariantById = (variantId) => {
      const strId = String(variantId);
      // Try radio buttons first (multi-variant products)
      const radio = root.querySelector(`[data-variant-input][value="${strId}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }
      // Fallback: hidden input (single-variant or default-variant products)
      const hidden = root.querySelector('input[name="id"]');
      if (hidden) {
        hidden.value = strId;
        hidden.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    root.querySelectorAll('[data-size-pill]').forEach((pill) => {
      pill.addEventListener('click', (event) => {
        event.preventDefault();
        const input = pill.querySelector('[data-variant-input]');
        if (!input || input.disabled) return;
        setVariantById(input.value);
      });
    });

    const findPowderSibling = (currentVariantId) => {
      const current = allVariants.find((v) => String(v.id) === String(currentVariantId));
      if (!current || isPowderVariant(current)) return null;
      const currentNonPowder = getNonPowderOptions(current);
      return allVariants.find((v) => {
        if (!isPowderVariant(v)) return false;
        const vNonPowder = getNonPowderOptions(v);
        return JSON.stringify(vNonPowder) === JSON.stringify(currentNonPowder);
      }) || null;
    };

    const findRegularSibling = (currentVariantId) => {
      const current = allVariants.find((v) => String(v.id) === String(currentVariantId));
      if (!current || !isPowderVariant(current)) return null;
      const currentNonPowder = getNonPowderOptions(current);
      return allVariants.find((v) => {
        if (isPowderVariant(v)) return false;
        const vNonPowder = getNonPowderOptions(v);
        return JSON.stringify(vNonPowder) === JSON.stringify(currentNonPowder);
      }) || null;
    };

    // Sync variant pills → when user changes size, keep powder state consistent
    root.querySelectorAll('[data-variant-input]').forEach((input) => {
      input.addEventListener('change', () => {
        const variant = allVariants.find((v) => String(v.id) === String(input.value));
        if (variant) updateVariantUI(variant);

        if (powderCheckbox && powderCheckbox.checked && input.dataset.variantForm !== 'powder') {
          // User switched size while powder is checked — find powder sibling of new size
          const powderSibling = findPowderSibling(input.value);
          if (powderSibling) {
            // Switch to the powder variant silently (without re-triggering this listener)
            const targetRadio = root.querySelector(`[data-variant-input][value="${powderSibling.id}"]`);
            if (targetRadio && targetRadio !== input) {
              targetRadio.checked = true;
              updateVariantUI(powderSibling);
            }
          }
        }
      });
    });

    const initialVariant = allVariants.find((v) => String(v.id) === getCurrentVariantId());
    if (initialVariant) {
      if (powderCheckbox) powderCheckbox.checked = isPowderVariant(initialVariant);
      updateVariantUI(initialVariant);
    }

    if (powderCheckbox) {
      powderCheckbox.closest('.powder-toggle')?.addEventListener('click', (event) => {
        event.preventDefault();
        powderCheckbox.checked = !powderCheckbox.checked;
        powderCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
      });

      powderCheckbox.addEventListener('change', () => {
        const currentId = getCurrentVariantId();
        if (!currentId || !allVariants.length) return;

        if (powderCheckbox.checked) {
          const powderVariant = findPowderSibling(currentId);
          if (powderVariant) {
            setVariantById(powderVariant.id);
            updateVariantUI(powderVariant);
          } else {
            // No powder variant exists for this product — uncheck and warn
            powderCheckbox.checked = false;
            const label = powderCheckbox.closest('.powder-toggle');
            if (label) {
              const existing = label.querySelector('.powder-unavailable-note');
              if (!existing) {
                const note = document.createElement('small');
                note.className = 'powder-unavailable-note';
                note.style.cssText = 'color:#c0392b;display:block;margin-top:4px;font-size:11px;';
                note.textContent = 'Powder option not available for this pack size.';
                label.appendChild(note);
                setTimeout(() => note.remove(), 3000);
              }
            }
          }
        } else {
          const regularVariant = findRegularSibling(currentId);
          if (regularVariant) {
            setVariantById(regularVariant.id);
            updateVariantUI(regularVariant);
          }
        }
      });
    }

    root.querySelector('[data-qty-minus]')?.addEventListener('click', () => {
      if (!qty) return;
      qty.value = String(Math.max(1, Number(qty.value || 1) - 1));
    });

    root.querySelector('[data-qty-plus]')?.addEventListener('click', () => {
      if (!qty) return;
      qty.value = String(Math.max(1, Number(qty.value || 1) + 1));
    });

    suppressRawDescriptionFaq(root);
    renderFaqAccordion(root);
    root.querySelectorAll('[data-urdu-wrap], .product-name, .urdu-line, .description-html, .product-faq-accordion').forEach(wrapUrduText);
  });

  document.querySelectorAll('body[data-template="product"] .product-name, body[data-template="product"] .mob-product-bar-size').forEach(wrapUrduText);

  document.querySelectorAll('[data-faq-accordion]').forEach((accordion) => {
    accordion.addEventListener('click', (event) => {
      const button = event.target.closest('.product-faq-question');
      if (!button || !accordion.contains(button) || button.tagName === 'SUMMARY') return;
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
})();
