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
    var record = panel.querySelector('.trace-steps');
    var steps = Array.from(panel.querySelectorAll('[data-step]'));
    if (!record || steps.length < 2) return;

    // Read the published HTML record: no generated outcomes or network requests.
    var viewer = document.createElement('section');
    viewer.className = 'replay-viewer';
    viewer.setAttribute('aria-label', 'Browse the recorded synthetic interaction');
    var heading = document.createElement('h4');
    heading.textContent = 'Browse the recorded sequence';
    var hint = document.createElement('p');
    hint.textContent = 'Select an input to inspect its recorded state. This replays the published synthetic record; it does not execute the Runtime.';
    var timeline = document.createElement('div');
    timeline.className = 'replay-timeline';
    timeline.setAttribute('role', 'group');
    timeline.setAttribute('aria-label', 'Recorded inputs');
    var snapshot = document.createElement('div');
    snapshot.className = 'replay-snapshot';
    snapshot.id = 'replay-snapshot';
    var status = document.createElement('p');
    status.className = 'replay-status';
    status.setAttribute('aria-live', 'polite');
    var controls = document.createElement('div');
    controls.className = 'evidence-nav';
    var previous = document.createElement('button');
    var next = document.createElement('button');
    previous.type = next.type = 'button';
    previous.textContent = 'Previous input';
    next.textContent = 'Next input';
    controls.append(previous, next);
    var index = 0;
    var buttons = steps.map(function (step, position) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(position + 1);
      button.setAttribute('aria-label', step.querySelector('h4').textContent.trim());
      button.setAttribute('aria-controls', snapshot.id);
      button.addEventListener('click', function () { show(position); });
      timeline.appendChild(button);
      return button;
    });
    function show(position) {
      index = position;
      snapshot.replaceChildren();
      Array.from(steps[index].children).forEach(function (element) {
        snapshot.appendChild(element.cloneNode(true));
      });
      buttons.forEach(function (button, position) {
        button.setAttribute('aria-pressed', String(position === index));
      });
      previous.disabled = index === 0;
      next.disabled = index === steps.length - 1;
      status.textContent = 'Input ' + (index + 1) + ' of ' + steps.length;
    }
    previous.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });
    viewer.append(heading, hint, timeline, status, snapshot, controls);
    record.before(viewer);
    var fullRecord = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = 'Read all eight recorded inputs together';
    fullRecord.appendChild(summary);
    record.before(fullRecord);
    fullRecord.appendChild(record);
    show(0);
  });
})();
