(function () {
  const root = document.documentElement;
  const key = 'oxship-theme';
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  function syncLabel() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    const browserColor = document.querySelector('meta[name="theme-color"]');
    if (browserColor) {
      browserColor.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim());
    }
  }

  syncLabel();
  toggle.addEventListener('click', function () {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem(key, dark ? 'dark' : 'light'); } catch (_) {}
    syncLabel();
  });
})();
