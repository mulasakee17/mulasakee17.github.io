/* Progressive enhancement: every exported record remains readable without JavaScript. */
(function () {
  'use strict';

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
