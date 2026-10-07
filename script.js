/* Progressive enhancement: every exported record remains readable without JavaScript. */
(function () {
  'use strict';

  /* Restore the original ordinary scroll reveal; native scrolling is unchanged. */
  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  var observer = null;

  function revealAll() {
    revealElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
    document.documentElement.classList.remove('js-reveal');
    if (observer) observer.disconnect();
  }

  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    try {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

      document.querySelectorAll('.hero [data-reveal], .case-hero [data-reveal]')
        .forEach(function (element, index) {
          element.style.transitionDelay = (index * 90) + 'ms';
        });
      revealElements.forEach(function (element) { observer.observe(element); });
      /* Enable hidden starting states only after observer setup succeeds. */
      document.documentElement.classList.add('js-reveal');
    } catch (error) {
      revealAll();
    }
  } else {
    revealAll();
  }

  document.addEventListener('focusin', function (event) {
    var element = event.target.closest('[data-reveal]');
    if (!element) return;
    element.classList.add('is-visible');
    if (observer) observer.unobserve(element);
  });

  motionPreference.addEventListener('change', function (event) {
    if (event.matches) revealAll();
  });

  /* The original passive header hairline follows the native scroll position. */
  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 6);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll('[data-trace-browser]').forEach(function (panel) {
    var steps = Array.from(panel.querySelectorAll('[data-step]'));
    if (steps.length < 2) return;

    var nav = document.createElement('div');
    nav.className = 'evidence-nav';
    var previous = document.createElement('button');
    var next = document.createElement('button');
    var status = document.createElement('span');
    previous.type = next.type = 'button';
    previous.textContent = 'Previous event';
    next.textContent = 'Next event';
    status.setAttribute('aria-live', 'polite');
    nav.append(previous, next, status);
    panel.appendChild(nav);

    var index = -1;
    function move(delta) {
      index = Math.max(0, Math.min(steps.length - 1, index + delta));
      steps[index].scrollIntoView({
        block: 'center',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth'
      });
      status.textContent = 'Event ' + (index + 1) + ' of ' + steps.length;
    }

    previous.addEventListener('click', function () { move(-1); });
    next.addEventListener('click', function () { move(1); });
  });
})();
