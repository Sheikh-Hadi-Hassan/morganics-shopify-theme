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
    const powderCheckbox = root.querySelector('input[name="properties[Powder form required]"]');

    const updateVariantPrice = (priceCents, hasCompare, compareText, isAvailable) => {
      if (priceWrapper && regularPriceEl && priceCents !== undefined) {
        priceWrapper.dataset.basePrice = priceCents;
        regularPriceEl.classList.toggle('morganics-price__regular--sale', hasCompare);
      }
      if (comparePrice) {
        comparePrice.textContent = compareText || '';
        comparePrice.hidden = !hasCompare;
      }
      if (add) {
        add.disabled = !isAvailable;
        add.textContent = isAvailable ? 'Add to Cart' : 'Sold Out';
      }
    };

    root.querySelectorAll('[data-variant-input]').forEach((input) => {
      input.addEventListener('change', () => {
        updateVariantPrice(
          input.dataset.variantPriceCents,
          input.dataset.variantHasCompare === 'true',
          input.dataset.variantComparePrice || '',
          input.dataset.variantAvailable === 'true'
        );
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
