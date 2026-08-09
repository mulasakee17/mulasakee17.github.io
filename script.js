/* ============================================================
   Mengyuan He — Independent Researcher
   Vanilla JavaScript, no dependencies.

   Responsibilities:
     1. Add `js` class so scroll-reveal CSS only applies when JS is on.
     2. Sticky header hairline border after a little scroll.
     3. Scroll reveal via IntersectionObserver.
     4. WeChat modal (open / close / Escape / focus management).
     5. Graceful fallback when assets/wechat-qr.webp is missing.

   All motion respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  /* ---------- 1. Sticky header hairline ---------- */
  var header = document.querySelector('.site-header');

  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 6);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var heroEls = document.querySelectorAll('.hero [data-reveal]');

  function revealImmediately() {
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-visible');
    });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // No JS observer needed — everything stays visible.
    revealImmediately();
  } else {
    // Gentle stagger for the hero lines only.
    Array.prototype.forEach.call(heroEls, function (el, i) {
      el.style.transitionDelay = (i * 90) + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 3. WeChat modal ---------- */
  var modal = document.getElementById('wechat-modal');
  var openBtn = document.getElementById('wechat-open');
  var closeBtn = document.getElementById('wechat-close');
  var qrImg = document.getElementById('wechat-qr');
  var lastFocused = null;
  // Match the CSS transition duration; 0 when motion is reduced.
  var closeDelay = prefersReducedMotion ? 0 : 260;

  function openModal() {
    if (!modal || !closeBtn) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    // Force a reflow so the open transition actually plays.
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    window.setTimeout(function () {
      modal.hidden = true;
    }, closeDelay);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // Keyboard handling while the dialog is open: Escape closes it,
  // Tab stays trapped inside the dialog (focus loop).
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea';

  function onModalKey(event) {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    if (event.key !== 'Tab' || modal.hidden) return;

    var focusables = modal.querySelectorAll(FOCUSABLE);
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    // Click on the dimming layer (outside the card) closes the dialog.
    modal.addEventListener('click', function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', onModalKey);
  }

  /* ---------- 4. QR image graceful fallback ---------- */
  if (qrImg) {
    function showQRFallback() {
      var frame = qrImg.closest('.qr-frame');
      if (!frame || frame.querySelector('.wechat-fallback')) return;
      qrImg.remove();
      var p = document.createElement('p');
      p.className = 'wechat-fallback';
      p.textContent = 'WeChat QR coming soon.';
      frame.appendChild(p);
    }

    if (qrImg.complete && qrImg.naturalWidth === 0) {
      // Image already failed before listeners attached.
      showQRFallback();
    } else {
      qrImg.addEventListener('error', showQRFallback, { once: true });
    }
  }
})();
