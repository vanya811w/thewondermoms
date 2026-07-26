/* ==========================================================================
   The Wonder Moms — Shared Header/Footer Component Loader
   Injects consistent nav and footer across all pages.
   ========================================================================== */

(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectHeader();
    injectFooter();
  }

  /* ----- Header ----- */
  function injectHeader() {
    const placeholder = document.querySelector('[data-component="header"]');
    if (!placeholder) return;

    const page = placeholder.getAttribute('data-current-page') || '';

    placeholder.outerHTML = `
      <header class="site-header">
        <div class="container nav-bar">
          <a class="brand" href="index.html">The Wonder Moms</a>
          <button class="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <nav class="nav-links" role="navigation" aria-label="Main navigation">
            <a href="index.html#trending" class="${page === 'trending' ? 'active' : ''}">Trending</a>
            <a href="index.html#products" class="${page === 'products' ? 'active' : ''}">Products</a>
            <a href="index.html#tools" class="${page === 'tools' ? 'active' : ''}">Tools</a>
            <a href="index.html#topics" class="${page === 'topics' ? 'active' : ''}">Topics</a>
            <a href="index.html#community" class="${page === 'community' ? 'active' : ''}">Community</a>
          </nav>
          <a class="btn nav-signup" href="index.html#community">Join</a>
        </div>
      </header>`;

    // Hamburger menu toggle
    setTimeout(initHamburger, 0);
  }

  /* ----- Footer ----- */
  function injectFooter() {
    const placeholder = document.querySelector('[data-component="footer"]');
    if (!placeholder) return;

    placeholder.outerHTML = `
      <footer class="site-footer">
        <div class="container footer-content">
          <p>&copy; 2026 The Wonder Moms. Made for families, with care.</p>
          <nav>
            <a href="about.html">About</a> &middot;
            <a href="contact.html">Contact</a> &middot;
            <a href="privacy.html">Privacy Policy</a>
          </nav>
        </div>
      </footer>`;
  }

  /* ----- Mobile Hamburger Menu ----- */
  function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('nav-open');
      btn.classList.toggle('open');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on nav link click
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
