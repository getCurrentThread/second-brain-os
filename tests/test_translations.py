"""Check translation coverage and preserve executable examples and navigation.

Run after building the site: python3 -m unittest discover -s tests -p 'test_*.py'
Requires the same Markdown package as tools/build_graph_site.py.
"""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import unittest
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

import markdown

ROOT = Path(__file__).resolve().parents[1]
ZH = ROOT / 'docs/ko'


def data(filename, name):
    source = (ROOT / 'assets/site' / filename).read_text(encoding='utf-8')
    return json.loads(source.split(f'window.{name}=', 1)[1].rstrip(';\n'))


class Structure(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags = Counter()
        self.links = []
        self.node_links = []
        self.images = []
        self.heads = []
        self.code = []
        self.in_pre = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags[tag] += 1
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
            self.node_links.append(attrs.get('data-node'))
        if tag == 'img':
            self.images.append(attrs['src'])
        if re.fullmatch('h[1-6]', tag):
            self.heads.append((tag, attrs.get('id')))
        if tag == 'pre':
            self.in_pre = True
            self.code.append('')

    def handle_endtag(self, tag):
        if tag == 'pre':
            self.in_pre = False

    def handle_data(self, text):
        if self.in_pre:
            self.code[-1] += text


def structure(source):
    source = re.sub(r'^<a id="[^"]+"></a>\s*\n', '', source, flags=re.M)
    return Structure(markdown.markdown(source, extensions=['tables', 'fenced_code', 'toc', 'sane_lists']))


def canonical_link(href, source):
    url = urlsplit(href)
    if url.scheme or url.netloc or not url.path:
        return href
    target = (source.parent / unquote(url.path)).resolve()
    if target.is_relative_to(ZH):
        target = ROOT / 'docs' / target.relative_to(ZH)
    return target.relative_to(ROOT).as_posix() + ('#' + url.fragment if url.fragment else '')


class TranslationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.en = data('pages-data.js', 'SBOS_PAGES')
        cls.ko = data('pages-ko.js', 'SBOS_PAGES_KO')
        cls.sources = [ROOT / 'docs/README.md'] + sorted(
            file for directory in (ROOT / 'docs').iterdir()
            if directory.is_dir() and directory != ZH
            for file in directory.glob('*.md'))

    def test_every_article_and_section_has_a_translation(self):
        self.assertEqual(set(self.en), set(self.ko))
        for source in self.sources:
            with self.subTest(file=source.relative_to(ROOT)):
                self.assertTrue((ZH / source.relative_to(ROOT / 'docs')).is_file())

    def test_translation_structure_links_and_code(self):
        for source in self.sources:
            with self.subTest(file=source.relative_to(ROOT)):
                translated = ZH / source.relative_to(ROOT / 'docs')
                en_raw = source.read_text(encoding='utf-8')
                ko_raw = translated.read_text(encoding='utf-8')
                en, ko = structure(en_raw), structure(ko_raw)
                self.assertRegex(ko_raw, r'[\uac00-\ud7a3]', 'Missing Korean prose')
                self.assertEqual([h[0] for h in en.heads], [h[0] for h in ko.heads], 'Heading structure')
                # Paragraph, list and table counts catch dropped body sections.
                for tag in ('p', 'li', 'table', 'tr', 'td', 'th', 'blockquote', 'pre', 'img'):
                    self.assertEqual(en.tags[tag], ko.tags[tag], f'{tag} count')
                self.assertEqual(en.code, ko.code, 'Executable examples must remain unchanged')
                self.assertEqual([canonical_link(h, source) for h in en.links],
                                 [canonical_link(h, translated) for h in ko.links], 'Link targets')
                self.assertEqual([canonical_link(h, source) for h in en.images],
                                 [canonical_link(h, translated) for h in ko.images], 'Image targets')
                # Long unchanged prose is usually a missed paragraph. Code is
                # separately preserved and excluded from this check.
                for paragraph in re.findall(r'<p>(.*?)</p>', markdown.markdown(ko_raw, extensions=['fenced_code']), re.S):
                    prose = re.sub(r'<code>.*?</code>|<[^>]+>', '', paragraph, flags=re.S)
                    if len(re.findall(r'[A-Za-z]', prose)) > 80:
                        self.assertRegex(prose, r'[\uac00-\ud7a3]', f'Untranslated paragraph: {prose[:100]}')

    def test_rendered_articles_keep_stable_anchors_and_language(self):
        for pid, english in self.en.items():
            with self.subTest(page=pid):
                korean = self.ko[pid]
                self.assertEqual(korean['lang'], 'ko')
                self.assertEqual(korean['path'], f'docs/ko/{pid}.md')
                en, ko = Structure(english['html']), Structure(korean['html'])
                self.assertEqual(en.heads, ko.heads)
                self.assertEqual(en.code, ko.code)
                self.assertEqual(en.node_links, ko.node_links, 'Graph previews on article links')
                self.assertEqual([h['id'] for h in english['heads']], [h['id'] for h in korean['heads']])
                self.assertRegex(korean['text'], r'[\uac00-\ud7a3]')
                raw = (ROOT / korean['path']).read_text(encoding='utf-8')
                for _, anchor in en.heads:
                    self.assertIn(f'<a id="{anchor}"></a>', raw, 'Stable GitHub heading anchor')
                for image in ko.images:
                    if not urlsplit(image).scheme:
                        self.assertTrue((ROOT / image).is_file(), f'Missing rendered image: {image}')

    def test_diagrams_have_translated_text_and_preserve_geometry(self):
        for source in (ROOT / 'docs').glob('*/*.svg'):
            with self.subTest(image=source.relative_to(ROOT)):
                translated = ZH / source.relative_to(ROOT / 'docs')
                self.assertTrue(translated.is_file())
                en, ko = ET.parse(source), ET.parse(translated)
                en_elements, ko_elements = list(en.iter()), list(ko.iter())
                self.assertEqual([e.tag for e in en_elements], [e.tag for e in ko_elements])
                # IDs, paths and element geometry remain aligned with the source.
                for a, b in zip(en_elements, ko_elements):
                    for key in ('id', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'width', 'height', 'd', 'viewBox'):
                        self.assertEqual(a.get(key), b.get(key), key)
                self.assertRegex(''.join(ko.getroot().itertext()), r'[\uac00-\ud7a3]')


if __name__ == '__main__':
    unittest.main()
