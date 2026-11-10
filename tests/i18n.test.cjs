const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = () => fs.readFileSync(path.join(__dirname, '../assets/site/i18n.js'), 'utf8');

// A small DOM boundary keeps these locale regressions dependency-free. Layout,
// real browser events and page-specific redraws are checked in the local preview.
class Element {
  constructor(attributes = {}, text = '') {
    this.attributes = new Map();
    this.dataset = {};
    this.children = [];
    this.textContent = text;
    this.nodeType = 1;
    for (const [key, value] of Object.entries(attributes)) this.setAttribute(key, value);
  }
  setAttribute(key, value) {
    this.attributes.set(key, String(value));
    if (key.startsWith('data-')) {
      const name = key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      this.dataset[name] = String(value);
    }
  }
  getAttribute(key) { return this.attributes.get(key) ?? null; }
  hasAttribute(key) { return this.attributes.has(key); }
  matches(selector) {
    return selector.split(',').some(part => {
      const attribute = part.trim().match(/^\[([^\]=]+)(?:="([^"]*)")?\]$/);
      return attribute && this.hasAttribute(attribute[1]) &&
        (attribute[2] === undefined || this.getAttribute(attribute[1]) === attribute[2]);
    });
  }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [
      ...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector),
    ]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  closest(selector) { return this.matches(selector) ? this : null; }
}

function environment({ saved, languages = ['en-US'], language = 'en-US', siteDefault, blockedStorage = false, elements = [] } = {}) {
  const listeners = new Map();
  const documentListeners = new Map();
  const storage = new Map(saved === undefined ? [] : [['sbos:language', saved]]);
  const documentElement = new Element();
  if (siteDefault) documentElement.setAttribute('data-default-language', siteDefault);
  documentElement.children = elements;
  const listen = (map, type, callback) => map.set(type, [...(map.get(type) || []), callback]);
  const fire = (map, event) => (map.get(event.type) || []).forEach(callback => callback(event));
  const document = {
    documentElement,
    readyState: 'loading',
    nodeType: 9,
    querySelectorAll: selector => documentElement.querySelectorAll(selector),
    querySelector: selector => documentElement.querySelector(selector),
    addEventListener: (type, callback) => listen(documentListeners, type, callback),
    dispatchEvent: event => fire(documentListeners, event),
  };
  const context = {
    document,
    navigator: { languages, language },
    localStorage: {
      getItem(key) { if (blockedStorage) throw new Error('Storage unavailable'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blockedStorage) throw new Error('Storage unavailable'); storage.set(key, value); },
    },
    Element,
    CustomEvent: class { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } },
    addEventListener: (type, callback) => listen(listeners, type, callback),
    dispatchEvent: event => fire(listeners, event),
    console,
  };
  context.window = context;
  vm.runInNewContext(source(), context, { filename: 'i18n.js' });
  document.dispatchEvent({ type: 'DOMContentLoaded' });
  return { i18n: context.SBOS_I18N, context, document, storage };
}

test('saved language takes precedence over browser language', () => {
  assert.equal(environment({ saved: '"en"', languages: ['ko'] }).i18n.locale, 'en');
  assert.equal(environment({ saved: '"ko"', languages: ['en-US'] }).i18n.locale, 'ko');
});

test('the Korean learning site defaults to Korean while honoring an explicit saved choice', () => {
  assert.equal(environment({ siteDefault: 'ko', languages: ['en-US'] }).i18n.locale, 'ko');
  assert.equal(environment({ siteDefault: 'ko', saved: '"en"' }).i18n.locale, 'en');
});

test('first browser preference chooses Korean, with English as the fallback', () => {
  for (const language of ['ko', 'ko-KR', 'ko-Kore-KR']) {
    assert.equal(environment({ languages: [language] }).i18n.locale, 'ko');
  }
  assert.equal(environment({ languages: ['en-US', 'ko'] }).i18n.locale, 'en');
  assert.equal(environment({ languages: ['fr-FR'] }).i18n.locale, 'en');
  assert.equal(environment({ languages: [], language: 'ko' }).i18n.locale, 'ko');
});

test('malformed or unsupported stored choices fall back to the browser', () => {
  for (const saved of ['broken json', '"fr"', 'null', '42', '{}']) {
    assert.equal(environment({ saved, languages: ['ko'] }).i18n.locale, 'ko');
  }
});

test('unavailable storage does not prevent choosing or switching languages', () => {
  const { i18n } = environment({ blockedStorage: true, languages: ['ko'] });
  assert.equal(i18n.locale, 'ko');
  assert.doesNotThrow(() => i18n.setLocale('en'));
  assert.equal(i18n.locale, 'en');
});

test('catalog translations interpolate values and preserve English fallbacks', () => {
  const { i18n } = environment();
  i18n.register('ko', { 'Found {count} pages': '{count}개 페이지를 찾음' });
  assert.equal(i18n.t('Found {count} pages', { count: 0 }), 'Found 0 pages');
  i18n.setLocale('ko');
  assert.equal(i18n.t('Found {count} pages', { count: 12 }), '12개 페이지를 찾음');
  assert.equal(i18n.t('New upstream message {count}', { count: 3 }), 'New upstream message 3');
});

test('language changes persist and notify page renderers', () => {
  const { i18n, context, document, storage } = environment();
  const changes = [];
  context.addEventListener('sbos:languagechange', event => changes.push(event.detail.locale));
  i18n.setLocale('ko');
  assert.equal(document.documentElement.lang, 'ko');
  assert.equal(storage.get('sbos:language'), '"ko"');
  assert.deepEqual(changes, ['ko']);
  i18n.setLocale('en');
  assert.equal(document.documentElement.lang, 'en');
  assert.equal(storage.get('sbos:language'), '"en"');
  assert.deepEqual(changes, ['ko', 'en']);
});

test('static text, attributes and graph labels can round-trip between languages', () => {
  const title = new Element({ 'data-i18n': 'Example heading' });
  const search = new Element({
    'data-i18n-placeholder': 'Find a page',
    'data-i18n-aria-label': 'Find a page',
    'data-i18n-title': 'Search help',
  });
  const node = new Element({ 'data-node-label': 'example-node' }, 'Original label');
  const description = new Element({ 'data-node-description': 'example-node' }, 'Original description');
  const { i18n, context } = environment({ elements: [title, search, node, description] });
  context.SBOS_NODE_KO = { 'example-node': { label: '예시 노드', desc: '예시 설명' } };
  i18n.register('ko', {
    'Example heading': '예시 제목', 'Find a page': '페이지 찾기', 'Search help': '검색 도움말',
  });
  i18n.setLocale('ko');
  assert.equal(title.textContent, '예시 제목');
  assert.equal(search.getAttribute('placeholder'), '페이지 찾기');
  assert.equal(search.getAttribute('aria-label'), '페이지 찾기');
  assert.equal(search.getAttribute('title'), '검색 도움말');
  assert.equal(node.textContent, '예시 노드');
  assert.equal(description.textContent, '예시 설명');
  i18n.setLocale('en');
  assert.equal(title.textContent, 'Example heading');
  assert.equal(search.getAttribute('placeholder'), 'Find a page');
  assert.equal(search.getAttribute('aria-label'), 'Find a page');
  assert.equal(node.textContent, 'Original label');
  assert.equal(description.textContent, 'Original description');
});

test('localized text remains plain text and counts support zero', () => {
  const count = new Element({ 'data-i18n': '{count} matches', 'data-i18n-params': '{"count":0}' });
  const label = new Element({ 'data-i18n': 'Example label' });
  const { i18n } = environment({ elements: [count, label] });
  i18n.register('ko', { '{count} matches': '결과 {count}건', 'Example label': '<strong>예시</strong>' });
  i18n.setLocale('ko');
  assert.equal(count.textContent, '결과 0건');
  assert.equal(label.textContent, '<strong>예시</strong>');
  assert.equal(label.children.length, 0);
});

test('the shared language switch updates its target language on click', () => {
  const button = new Element({ 'data-language-toggle': '' });
  const { i18n, document } = environment({ elements: [button] });
  assert.equal(button.textContent, '한국어');
  document.dispatchEvent({ type: 'click', target: button });
  assert.equal(i18n.locale, 'ko');
  assert.equal(button.textContent, 'English');
  assert.ok(button.getAttribute('aria-label'));
  document.dispatchEvent({ type: 'click', target: button });
  assert.equal(i18n.locale, 'en');
  assert.equal(button.textContent, '한국어');
});

test('invalid language choices cannot corrupt the saved preference', () => {
  const { i18n, storage } = environment({ saved: '"ko"' });
  for (const locale of ['fr', '', null, undefined]) i18n.setLocale(locale);
  assert.equal(i18n.locale, 'ko');
  assert.equal(storage.get('sbos:language'), '"ko"');
});

test('graph translations reference existing nodes and only override display metadata', () => {
  const context = { window: {} };
  for (const filename of ['graph-data.js', 'graph-i18n.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/site', filename), 'utf8'), context);
  }
  const ids = new Set(context.window.SBOS_GRAPH.nodes.map(node => node.id));
  const translations = Object.entries(context.window.SBOS_NODE_KO);
  assert.ok(translations.length > 0, 'The Korean graph catalog must not be empty');
  for (const [id, fields] of translations) {
    assert.ok(ids.has(id), `Translation references an unknown graph node: ${id}`);
    assert.equal(typeof fields.label, 'string', `${id} needs a display label`);
    for (const [field, value] of Object.entries(fields)) {
      assert.ok(['label', 'desc', 'sub'].includes(field), `${id} cannot override ${field}`);
      assert.equal(typeof value, 'string', `${id}.${field} must be a string`);
      assert.ok(value.trim().length > 0, `${id}.${field} must not be empty`);
    }
  }
  // Newly added upstream nodes may intentionally use the English fallback.
});

test('catalog translations retain the source message placeholders', () => {
  const catalogs = [];
  const context = { window: { SBOS_I18N: { register: (locale, catalog) => catalogs.push({ locale, catalog }) } } };
  const filename = path.join(__dirname, '../assets/site/catalog-i18n.js');
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context);
  assert.ok(catalogs.length > 0, 'The catalog script must register its translations');
  const placeholders = text => [...new Set([...text.matchAll(/\{(\w+)\}/g)].map(match => match[1]))].sort();
  for (const { locale, catalog } of catalogs) {
    assert.equal(locale, 'ko');
    for (const [source, translation] of Object.entries(catalog)) {
      assert.equal(typeof translation, 'string', `${source} needs a string translation`);
      assert.deepEqual(placeholders(translation), placeholders(source), `Placeholder mismatch: ${source}`);
    }
  }
});

test('every catalog resource has a Korean description without changing its URL or name', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/site/resource-i18n.js'), 'utf8'), context);
  const page = fs.readFileSync(path.join(__dirname, '../resources.html'), 'utf8');
  const resources = JSON.parse(page.match(/<script id="rdata" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  const catalog = context.window.SBOS_RESOURCE_KO;
  const names = resources.map(resource => resource.name.replace(/\s+/g, ' ').trim());
  assert.deepEqual(Object.keys(catalog).sort(), [...new Set(names)].sort());
  for (const name of names) assert.match(catalog[name], /[\uac00-\ud7a3]/u, name);
});
