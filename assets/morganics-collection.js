(() => {
  document.querySelectorAll('[data-collection-tools]').forEach((form) => {
    form.querySelectorAll('select').forEach((select) => {
      select.addEventListener('change', () => form.submit());
    });
  });
})();
