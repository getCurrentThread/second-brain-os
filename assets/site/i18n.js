// Shared UI language support. English source strings are the fallback keys.
// This script is independent of the graph/CDN so navigation remains usable.
(function () {
  'use strict';
  const storageKey = 'sbos:language';
  const supported = ['en', 'ko'];
  const messages = { 'ko': {
    'Switch to Korean': '한국어로 전환',
    'Switch to English': 'Switch to English',
    'Second Brain OS - guides and resources for AI engineers': 'Second Brain OS - AI 엔지니어를 위한 가이드와 자료',
    'Guides and resources for AI engineers': 'AI 엔지니어를 위한 가이드와 자료',
    'the whole site, as one graph': '사이트 전체를 한 장의 그래프로',
    'A course on building agents from a single prompt to production, five handbooks that go deep on one layer each, a hands-on second-brain project, and the links worth your time. Free, plain markdown.': '프롬프트 하나에서 프로덕션까지 에이전트를 만드는 강좌, 계층 하나씩 깊이 파고드는 핸드북 다섯 권, 직접 해 보는 세컨드 브레인 프로젝트, 그리고 시간을 들일 만한 링크를 모았습니다. 무료이고, 순수 마크다운으로 되어 있습니다.',
    'Every page, term and tool on this site is a bubble. The lines are the real links between them. Click one to see what it leans on.': '이 사이트의 모든 페이지, 용어, 도구가 버블 하나입니다. 선은 그 사이의 실제 링크입니다. 버블을 클릭하면 무엇에 기대고 있는지 볼 수 있습니다.',
    'Back to the whole map': '전체 지도로 돌아가기',
    'Contents': '목차',
    'search pages, terms, tools': '페이지, 용어, 도구 검색',
    'Search the site': '사이트 검색',
    'Switch between light and dark theme': '라이트 테마와 다크 테마 전환',
    'Resources': '자료', 'Tree': '트리', 'Repo': '저장소', 'Map': '지도',
    'drag': '드래그', 'orbit': '회전', 'scroll': '스크롤', 'zoom': '줌',
    'click': '클릭', 'open': '열기', 'back': '뒤로', 'made by': '만든 이',
    'Selected item': '선택한 항목', 'Reader': '읽기 창',
    'Back to the graph (Esc)': '그래프로 돌아가기(Esc)', 'graph': '그래프',
    'Close (Esc)': '닫기(Esc)', 'Close the reader': '읽기 창 닫기',
    'Show or hide layers': '계층 표시 또는 숨기기',
    'Pause the rotation': '회전 일시 정지', 'Resume the rotation': '회전 다시 시작',
    'Whole map': '전체 지도', 'drawing the map…': '지도를 그리는 중…',
    'Course': '에이전트 강좌', 'Handbooks': '핸드북', 'Second brain': '세컨드 브레인',
    'Glossary': '용어집', 'Toolkit': '툴킷',
    'home': '홈', 'collection': '컬렉션', 'section': '섹션', 'page': '페이지',
    'term': '용어', 'group': '그룹', 'skill': '스킬', 'command': '커맨드',
    'subagent': '서브에이전트', 'script': '스크립트', 'resource': '자료',
    '+ {count} more': '+ {count}개 더',
    '{count} words': '영어 단어 {count}개', '{count} pages': '페이지 {count}개',
    'words': '영어 단어', 'pages': '페이지', 'terms': '용어', 'tools': '도구',
    'connections': '연결', 'sections': '섹션', 'min': '분',
    '{count}m': '{count}분',
    'links out': '나가는 링크', 'linked from': '들어오는 링크',
    'Read the page': '페이지 읽기', 'Source': '원본 파일',
    'On this page': '이 페이지 목차', 'Links to': '나가는 링크', 'Linked from': '들어오는 링크',
    'Terms on this page': '이 페이지의 용어', 'Toolkit and sources': '툴킷과 출처',
    'previous': '이전', 'next': '다음', 'Start reading': '읽기 시작',
    'Pages': '페이지', 'The module it deepens': '이 글이 더 깊이 파고드는 모듈', 'Its handbook': '짝이 되는 핸드북',
    'Leans on': '바탕이 되는 섹션', 'Leaned on by': '이 섹션을 바탕으로 하는 섹션', 'Sections': '섹션',
    'Start at the beginning': '처음부터 시작', 'Terms, by reach': '영향 범위순 용어',
    'Inside': '구성', 'glossary': '용어집',
    'on {count} pages': '{count}개 페이지에 등장', 'mentions': '언급',
    'Read where it is defined': '정의된 곳 읽기', 'Leans on it hardest': '가장 많이 기대는 페이지',
    'Often alongside': '자주 함께 나오는 용어', 'Open {host}': '{host} 열기',
    'Cited in': '인용된 페이지', 'Related terms': '관련 용어',
    'resources': '자료', 'toolkit': '툴킷', 'tools:': '도구:',
    'ingestion': '인제스트', 'structuring': '구조화', 'retrieval': '검색',
    'maintenance': '유지보수', 'outputs': '산출물', 'projects': '프로젝트',
    'safety': '안전', 'setup': '설정', 'plugin': '플러그인',
    'View on GitHub': 'GitHub에서 보기', 'Follows the skill': '따르는 스킬',
    'Called by': '호출한 커맨드', 'Mentioned in': '언급된 페이지',
    'page {position} of {count}': '{count}페이지 중 {position}번째',
    'This page did not load. Try reloading.': '페이지를 불러오지 못했습니다. 새로 고침해 보십시오.',
    'terms on this page': '이 페이지의 용어', 'source:': '원본 파일:',
    'This article is available in English.': '이 글은 아직 영어로만 있습니다.',
    'The agents course': '에이전트 강좌',
    'Seven modules from a single prompt to a production agent.': '프롬프트 하나에서 프로덕션 에이전트까지 이어지는 모듈 일곱 개입니다.',
    'One layer at a time, each ending in a build you can finish in an evening.': '한 번에 한 계층씩 다루며, 각 핸드북은 하룻저녁에 끝낼 수 있는 실습으로 마무리됩니다.',
    'A hands-on project: a knowledge base an agent builds and maintains for you.': '직접 해 보는 프로젝트입니다. 에이전트가 대신 만들고 관리해 주는 지식 베이스를 다룹니다.',
    'Show or hide: {layer}': '{layer} 표시 또는 숨기기',
    'the agents course': '에이전트 강좌', 'handbooks': '핸드북', 'second brain': '세컨드 브레인',
    'nothing on the site matches that': '일치하는 내용이 사이트에 없습니다',
    'Light theme': '라이트 테마', 'Dark theme': '다크 테마',
    'The 3D map needs WebGL, which is not available here.': '3D 지도에는 WebGL이 필요한데, 이 환경에서는 사용할 수 없습니다.',
    'Read the guide on GitHub': 'GitHub에서 가이드 읽기',
  } };
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch { /* Storage may be disabled. */ }
  const preferred = document.documentElement.getAttribute('data-default-language') ||
    (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  let locale = supported.includes(saved) ? saved : /^ko(?:-|$)/i.test(preferred) ? 'ko' : 'en';
  const originalLabels = new WeakMap();

  function t(source, params = {}, language = locale) {
    const catalog = messages[language];
    const value = catalog && Object.prototype.hasOwnProperty.call(catalog, source) ? catalog[source] : source;
    return String(value).replace(/\{(\w+)\}/g, (match, key) => Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match);
  }
  function register(language, catalog) {
    if (supported.includes(language)) Object.assign(messages[language] || (messages[language] = {}), catalog);
  }
  function translate(root = document) {
    const attributes = ['title', 'placeholder', 'aria-label', 'content'];
    const selector = ['[data-i18n]', '[data-language-toggle]', '[data-node-label]', '[data-node-description]', ...attributes.map(a => `[data-i18n-${a}]`)].join(',');
    const elements = [...root.querySelectorAll(selector)];
    if (root.matches && root.matches(selector)) elements.unshift(root);
    for (const el of elements) {
      let params = {};
      try { params = JSON.parse(el.getAttribute('data-i18n-params') || '{}') || {}; } catch { /* Ignore malformed optional parameters. */ }
      if (el.hasAttribute('data-i18n')) el.textContent = t(el.getAttribute('data-i18n'), params);
      for (const attr of attributes) {
        const key = el.getAttribute('data-i18n-' + attr);
        if (key !== null) el.setAttribute(attr, t(key, params));
      }
      if (el.hasAttribute('data-node-label') || el.hasAttribute('data-node-description')) {
        if (!originalLabels.has(el)) originalLabels.set(el, el.textContent);
        const field = el.hasAttribute('data-node-description') ? 'desc' : 'label';
        const id = el.getAttribute(field === 'desc' ? 'data-node-description' : 'data-node-label');
        const translated = window.SBOS_NODE_KO?.[id]?.[field];
        el.textContent = locale === 'ko' && translated ? translated : originalLabels.get(el);
      }
      if (el.hasAttribute('data-language-toggle')) {
        el.textContent = locale === 'en' ? '한국어' : 'English';
        el.setAttribute('lang', locale === 'en' ? 'ko' : 'en');
        const label = t(locale === 'en' ? 'Switch to Korean' : 'Switch to English');
        el.setAttribute('aria-label', label);
        el.setAttribute('title', label);
      }
    }
    document.documentElement.lang = locale;
  }
  function setLocale(next) {
    if (!supported.includes(next) || next === locale) return;
    locale = next;
    try { localStorage.setItem(storageKey, JSON.stringify(locale)); } catch { /* Keep the in-memory preference. */ }
    translate();
    window.dispatchEvent(new CustomEvent('sbos:languagechange', { detail: { locale } }));
  }
  window.SBOS_I18N = { t, register, translate, setLocale, get locale() { return locale; } };
  document.documentElement.lang = locale;
  document.addEventListener('click', event => {
    if (event.target.closest('[data-language-toggle]')) setLocale(locale === 'en' ? 'ko' : 'en');
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => translate());
  else translate();
}());
