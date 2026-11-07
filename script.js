/* Progressive enhancement: every exported record remains readable without JavaScript. */
(function () {
  'use strict';
  var chinese = document.documentElement.lang === 'zh-CN';
  function localized(en, zh) { return chinese ? zh : en; }

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
    viewer.setAttribute('aria-label', localized('Browse the recorded synthetic interaction', '浏览已记录的合成交互'));
    var heading = document.createElement('h4');
    heading.textContent = localized('Browse the recorded sequence', '浏览已记录的执行序列');
    var hint = document.createElement('p');
    hint.textContent = localized('Select an input to inspect its recorded state. This replays the published synthetic record; it does not execute the Runtime.', '选择一次输入，查看其记录的状态。这里重放的是已发布的合成记录，并不执行运行时。');
    var timeline = document.createElement('div');
    timeline.className = 'replay-timeline';
    timeline.setAttribute('role', 'group');
    timeline.setAttribute('aria-label', localized('Recorded inputs', '已记录的输入'));
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
    previous.textContent = localized('Previous input', '上一次输入');
    next.textContent = localized('Next input', '下一次输入');
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
      snapshot.appendChild(steps[index].querySelector('h4').cloneNode(true));
      var fields = document.createElement('dl');
      fields.className = 'snapshot-fields';
      Array.from(steps[index].querySelectorAll('p')).forEach(function (element) {
        var row = document.createElement('div');
        var label = document.createElement('dt');
        var value = document.createElement('dd');
        var text = element.textContent.trim();
        var separator = text.search(/[:：]/);
        label.textContent = separator > -1 ? text.slice(0, separator) : localized('Transition', '状态转换');
        value.innerHTML = separator > -1 ? element.innerHTML.replace(/^[^:：]+[:：]\s*/, '') : element.innerHTML;
        row.append(label, value);
        fields.appendChild(row);
      });
      snapshot.appendChild(fields);
      buttons.forEach(function (button, position) {
        button.setAttribute('aria-pressed', String(position === index));
      });
      previous.disabled = index === 0;
      next.disabled = index === steps.length - 1;
      status.textContent = chinese ? '输入 ' + (index + 1) + ' / ' + steps.length : 'Input ' + (index + 1) + ' of ' + steps.length;
    }
    previous.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });
    viewer.append(heading, hint, timeline, status, snapshot, controls);
    record.before(viewer);
    var fullRecord = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = localized('Read all eight recorded inputs together', '展开阅读全部八次输入记录');
    fullRecord.appendChild(summary);
    record.before(fullRecord);
    fullRecord.appendChild(record);
    show(0);
  });
})();
