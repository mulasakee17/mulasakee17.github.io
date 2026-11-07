/* Static URLs remain usable without scripting or storage. Chinese paths and
   ?lang=en are explicit; default English paths negotiate on first visit. */
(function () {
  'use strict';
  var preference = null;
  try { preference = localStorage.getItem('portfolio-language'); } catch (_) {}
  var explicit = new URLSearchParams(window.location.search).get('lang');
  if (explicit === 'en' || explicit === 'zh-CN') {
    preference = explicit;
    try { localStorage.setItem('portfolio-language', explicit); } catch (_) {}
  }
  document.querySelectorAll('[data-language]').forEach(function (link) {
    var target = new URL(link.href);
    target.search = window.location.search;
    target.hash = window.location.hash;
    target.searchParams.delete('lang');
    if (link.dataset.language === 'en') target.searchParams.set('lang', 'en');
    link.href = target.href;
    link.addEventListener('click', function () {
      try { localStorage.setItem('portfolio-language', link.dataset.language); } catch (_) {}
    });
  });
  if (window.location.pathname.indexOf('/zh/') === 0) return;
  var languages = navigator.languages || [navigator.language || 'en'];
  var preferred = preference === 'en' || preference === 'zh-CN' ? preference :
    (/^zh(?:-|$)/i.test(languages[0] || '') ? 'zh-CN' : 'en');
  if (preferred === 'zh-CN') {
    window.location.replace('/zh' + window.location.pathname + window.location.search + window.location.hash);
  }
})();
