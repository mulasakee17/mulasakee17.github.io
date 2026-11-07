"""Build the six English/Chinese page pairs using only the Python standard library.

Edit source/ (English HTML) and zh-CN.json, never generated HTML files.
Run: python i18n/build.py [--check]
"""
from pathlib import Path
from html.parser import HTMLParser
from html import escape, unescape
from urllib.parse import urlsplit, urlunsplit
import argparse
import json
import posixpath
import re

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'i18n/source'
BASE = 'https://mulasakee17.github.io'
PAGES = sorted(p.relative_to(SOURCE).as_posix() for p in SOURCE.rglob('*.html'))
DICT = json.loads((ROOT / 'i18n/zh-CN.json').read_text(encoding='utf-8'))
MISSING = set()


def translate(value):
    key = ' '.join(unescape(value).split())
    if not key:
        return value
    if key not in DICT:
        MISSING.add(key)
        return value
    leading = value[:len(value) - len(value.lstrip())]
    trailing = value[len(value.rstrip()):]
    return leading + DICT[key] + trailing


def route(page, chinese=False):
    return '/' + ('zh/' if chinese else '') + page.removesuffix('index.html')


def local_url(value, page, chinese):
    url = urlsplit(value)
    if url.scheme or url.netloc or not url.path:
        return value
    target = posixpath.normpath(posixpath.join(posixpath.dirname(page), url.path))
    if target == '.':
        target = ''
    candidate = target if target.endswith('.html') else target.rstrip('/') + '/index.html'
    candidate = candidate.lstrip('/')
    if candidate in PAGES:
        path = route(candidate, chinese)
    else:
        path = '/' + target.lstrip('/')
    return urlunsplit(('', '', path, url.query, url.fragment))


class Page(HTMLParser):
    def __init__(self, page, chinese):
        super().__init__(convert_charrefs=False)
        self.page, self.chinese, self.parts, self.stack = page, chinese, [], []

    def language_switch(self):
        label = '语言' if self.chinese else 'Language'
        self.parts.append(f'<nav class="language-switch" aria-label="{label}">'
            f'<a data-language="en" lang="en" hreflang="en" href="{route(self.page)}?lang=en"'
            + (' aria-current="page"' if not self.chinese else '') + '>EN</a>'
            f'<a data-language="zh-CN" lang="zh-CN" hreflang="zh-CN" href="{route(self.page, True)}"'
            + (' aria-current="page"' if self.chinese else '') + '>中文</a></nav>')

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        output = []
        for key, value in attrs:
            if value is None:
                output.append(key)
                continue
            if tag == 'html' and key == 'lang':
                value = 'zh-CN' if self.chinese else 'en'
            elif key in ('href', 'src'):
                value = local_url(value, self.page, self.chinese)
            if tag == 'link' and values.get('rel') == 'canonical' and key == 'href':
                value = BASE + route(self.page, self.chinese)
            if tag == 'meta' and values.get('property') == 'og:url' and key == 'content':
                value = BASE + route(self.page, self.chinese)
            if self.chinese and (key in ('alt', 'aria-label', 'title', 'placeholder') or
                (tag == 'meta' and key == 'content' and
                 (values.get('name') in ('description', 'twitter:title', 'twitter:description') or
                  values.get('property') in ('og:title', 'og:description', 'og:image:alt')))):
                value = translate(value)
            output.append(f'{key}="{escape(value, quote=True)}"')
        self.parts.append('<' + tag + (' ' if output else '') + ' '.join(output) + '>')
        if tag == 'div' and 'header-inner' in values.get('class', '').split():
            self.language_switch()
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag == 'head':
            en, zh = BASE + route(self.page), BASE + route(self.page, True)
            self.parts.append(f'<link rel="alternate" hreflang="en" href="{en}">\n'
                f'<link rel="alternate" hreflang="zh-CN" href="{zh}">\n'
                f'<link rel="alternate" hreflang="x-default" href="{en}">\n'
                f'<meta property="og:locale" content="{"zh_CN" if self.chinese else "en_US"}">\n'
                '<script src="/i18n/language.js" defer></script>\n')
        self.parts.append(f'</{tag}>')
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack) - 1 - self.stack[::-1].index(tag)]

    def handle_data(self, value):
        if self.chinese and not any(t in self.stack for t in ('script', 'style', 'code')):
            value = escape(translate(value), quote=False)
        self.parts.append(value)

    def handle_entityref(self, name):
        self.parts.append('&' + name + ';')

    def handle_charref(self, name):
        self.parts.append('&#' + name + ';')

    def handle_comment(self, value):
        self.parts.append('<!--' + value + '-->')

    def handle_decl(self, value):
        self.parts.append('<!' + value + '>')


def build(check=False):
    results = {}
    for page in PAGES:
        source = (SOURCE / page).read_text(encoding='utf-8')
        for chinese in (False, True):
            parser = Page(page, chinese)
            parser.feed(source)
            results[('zh/' if chinese else '') + page] = ''.join(parser.parts)
    if MISSING:
        raise SystemExit('Missing Chinese translations:\n' + '\n'.join(sorted(MISSING)))
    stale = []
    for name, content in results.items():
        target = ROOT / name
        if check:
            if not target.exists() or target.read_text(encoding='utf-8') != content:
                stale.append(name)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding='utf-8', newline='\n')
    if stale:
        raise SystemExit('Generated pages need rebuilding: ' + ', '.join(stale))
    print(f'{"Verified" if check else "Built"} {len(results)} pages; all translatable strings covered.')


if __name__ == '__main__':
    cli = argparse.ArgumentParser()
    cli.add_argument('--check', action='store_true')
    build(cli.parse_args().check)
