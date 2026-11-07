"""Check generated routes, metadata, evidence links and English source fidelity."""
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import build
import xml.etree.ElementTree as ET


class Inspect(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.tags, self.texts, self.ids, self.stack = [], [], set(), []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'Duplicate id: ' + attrs['id']
            self.ids.add(attrs['id'])
        if tag == 'nav' and attrs.get('class') == 'language-switch':
            self.stack.append('language-switch')

    def handle_endtag(self, tag):
        if tag == 'nav':
            self.stack.clear()

    def handle_data(self, data):
        if not self.stack and data.strip():
            self.texts.append(' '.join(data.split()))


build.build(check=True)
pages = {}
for page in build.PAGES:
    for chinese in (False, True):
        name = ('zh/' if chinese else '') + page
        pages[name] = Inspect((build.ROOT / name).read_text(encoding='utf-8'))

links_checked = 0
for name, dom in pages.items():
    chinese = name.startswith('zh/')
    page = name.removeprefix('zh/')
    lang = 'zh-CN' if chinese else 'en'
    tags = dom.tags
    assert ('html', {'lang': lang}) in tags, name
    expected_url = build.BASE + build.route(page, chinese)
    canonical = [a['href'] for t, a in tags if t == 'link' and a.get('rel') == 'canonical']
    assert canonical == [expected_url], name + ': canonical'
    alternates = {a['hreflang']: a['href'] for t, a in tags if t == 'link' and a.get('rel') == 'alternate'}
    assert alternates == {'en': build.BASE + build.route(page),
        'zh-CN': build.BASE + build.route(page, True), 'x-default': build.BASE + build.route(page)}, name
    social = {a.get('property', a.get('name')): a.get('content') for t, a in tags if t == 'meta'}
    assert social.get('og:url') == expected_url, name + ': social URL'
    assert social.get('og:locale') == ('zh_CN' if chinese else 'en_US'), name + ': social locale'
    for key in ('description', 'og:title', 'og:description', 'twitter:title', 'twitter:description'):
        assert social.get(key), name + ': missing ' + key
    choices = [a for t, a in tags if t == 'a' and 'data-language' in a]
    assert len(choices) == 2 and sum(a.get('aria-current') == 'page' for a in choices) == 1, name
    assert next(a for a in choices if a.get('aria-current') == 'page')['data-language'] == lang, name
    if not chinese:
        original = Inspect((build.SOURCE / page).read_text(encoding='utf-8'))
        assert dom.texts == original.texts, name + ': English prose changed'
    for tag, attrs in tags:
        for attr in ('href', 'src'):
            if attr not in attrs:
                continue
            url = urlsplit(attrs[attr])
            if url.scheme or url.netloc:
                continue
            path = unquote(url.path).lstrip('/') if url.path else name
            target = build.ROOT / path
            if target.is_dir():
                target = target / 'index.html'
            assert target.is_file(), f'{name}: missing {attrs[attr]}'
            links_checked += 1
            relative = target.relative_to(build.ROOT).as_posix()
            if url.fragment and relative in pages:
                assert unquote(url.fragment) in pages[relative].ids, f'{name}: missing anchor {attrs[attr]}'
            if tag == 'a' and relative in pages and 'data-language' not in attrs:
                assert relative.startswith('zh/') == chinese, f'{name}: navigation crossed language'
sitemap = ET.parse(build.ROOT / 'sitemap.xml')
locations = [node.text for node in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
expected = {build.BASE + build.route(page, chinese) for page in build.PAGES for chinese in (False, True)}
assert len(locations) == 12 and set(locations) == expected, 'Sitemap must list exactly the twelve language routes'
assert 'Sitemap: ' + build.BASE + '/sitemap.xml' in (build.ROOT / 'robots.txt').read_text(), 'Crawler sitemap discovery missing'
print(f'Passed: {len(pages)} pages, {links_checked} local links/assets, anchors, language pairs, SEO and unchanged English prose.')
