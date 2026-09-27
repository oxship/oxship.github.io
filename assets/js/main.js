(function () {
  const root = document.documentElement;
  const key = 'oxship-theme';
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  try {
    if (localStorage.getItem(key) === 'dark') root.dataset.theme = 'dark';
  } catch (_) {
    // The site remains usable when storage is unavailable.
  }

  function syncLabel() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  syncLabel();
  toggle.addEventListener('click', function () {
    const dark = root.dataset.theme !== 'dark';
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    try { localStorage.setItem(key, dark ? 'dark' : 'light'); } catch (_) {}
    syncLabel();
  });
})();
