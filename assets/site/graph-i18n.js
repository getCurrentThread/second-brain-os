// Korean navigation and glossary metadata, keyed by stable graph IDs.
// Keep source documents, file names, URLs and graph topology in their original form.
// New upstream nodes fall back to the English metadata in graph-data.js.
window.SBOS_NODE_KO = {
  'root': { label: 'Second Brain OS', desc: 'AI 엔지니어를 위한 가이드와 자료입니다. 프롬프트 한 줄에서 프로덕션까지 에이전트를 만드는 강좌, 계층 하나씩을 깊이 다루는 핸드북 다섯 권, 실습형 세컨드 브레인 프로젝트, 툴킷, 그리고 시간을 들일 만한 링크를 담았습니다.' },
  'col:course': { label: '에이전트 강좌', desc: '프롬프트 한 줄에서 프로덕션 에이전트까지 모듈 일곱 개로 이어집니다. 이론은 백서에서 가져오고, 모듈마다 실습이 있습니다. 순서대로 읽으십시오.' },
  'col:handbook': { label: '핸드북', desc: '학습 경로가 아니라 참고 자료입니다. 강좌의 한 계층에 대한 기법, 도구, 실습을 모두 모았습니다. 어디서든 골라 읽을 수 있습니다.' },
  'col:guide': { label: '세컨드 브레인', desc: '실습 프로젝트입니다. 에이전트가 순수 마크다운으로 지식 베이스를 만들고 관리해 줍니다. 설정에는 저녁 한 번이면 충분합니다.' },
  'col:glossary': { label: '용어집', desc: '사이트 전체에서 거듭 등장하는 핵심 개념입니다. 각 용어는 그 개념에 가장 크게 기대는 페이지로 연결됩니다.' },
  'col:toolkit': { label: '툴킷', desc: '설치해서 쓰는 것들입니다. 에이전트 스킬, 슬래시 커맨드, 서브에이전트, 스크립트, 강좌 플러그인, 스타터 볼트가 있습니다.' },
  'col:resources': { label: '자료', desc: '검증을 마친 모든 링크입니다. 논문, 도구, Obsidian 플러그인, 저장소, 읽을거리가 있습니다.' },

  'sec:course-0-map': { label: '0 · 지도', desc: '에이전트란 무엇인지, 모델을 둘러싼 다섯 계층, 그리고 워크플로가 루프보다 나은 때를 다룹니다.' },
  'sec:course-1-context': { label: '1 · 컨텍스트', desc: '모델이 보는 것: 어텐션, 캐싱, 네 곳, 세션과 메모리.' },
  'sec:course-2-loop': { label: '2 · 루프', desc: '다음 단계는 누가 정하는가: 목표, 체커, 종료 조건, 예산. 그리고 프로덕션에서 살아남는 하이브리드.' },
  'sec:course-3-gate': { label: '3 · 게이트', desc: '값비싼 모델 앞의 값싼 결정: 분류기를 먼저 쓰고, 시스템 1 모델은 제값을 하는 곳에 씁니다.' },
  'sec:course-4-harness': { label: '4 · 하네스', desc: '모델을 둘러싼 사무실입니다. 격리, 가이드, 센서, 권한을 바깥에서 안쪽으로 차례대로 세웁니다.' },
  'sec:course-5-evals': { label: '5 · 평가', desc: '매달 같은 시험을 칩니다. 트레이스에 대한 행동 점검, 판정을 받는 판정자, 실패를 포함한 골든 세트입니다.' },
  'sec:course-6-production': { label: '6 · 프로덕션', desc: '데모에서 배포까지 다룹니다. 게이트웨이, 트레이싱, 비용, 보안, 그리고 다섯 계층 전체에 걸친 첫날 계획입니다.' },
  'sec:track-graph': { label: '지식 그래프', desc: '에이전트 메모리로서의 그래프: GraphRAG, 추출 파이프라인, 저장소, 그리고 자신의 볼트 위에 그래프 계층을 얹는 저녁 한나절의 실습.' },
  'sec:track-jev': { label: 'Jev 엔지니어링', desc: '게이트는 하나의 계층이고, Jev는 그 계층을 만드는 한 가지 방법입니다. 생성한 텍스트 대신 신뢰도 점수가 붙은 타입 있는 결정을 쓰며, Jev 접근 권한이 나오기 전에도 돌려 볼 수 있는 실습이 있습니다.' },
  'sec:track-harness': { label: '에이전트 하네스', desc: '모델을 둘러싼 장치들, 곧 루프, 도구, 컨텍스트 엔지니어링, 생태계 지형을 다루고, 저녁 한 번에 만들 수 있는 약 150줄짜리 동작하는 하네스까지 갖췄습니다.' },
  'sec:track-loop': { label: '루프 엔지니어링', desc: '에이전트를 둘러싼 제어 시스템: 종료 조건, 크리틱, 컨텍스트 위생, 그리고 아침에 믿고 확인할 수 있는 야간 루프.' },
  'sec:track-evals': { label: '평가 엔지니어링', desc: '측정을 AI 제품의 규율로 삼는 법: 골든 세트, 거짓말하지 않는 판정자, 에이전트의 실행 궤적, 그리고 오후 한나절에 만드는 첫 스위트.' },
  'sec:01-concepts': { label: '개념', desc: 'LLM이 유지하는 지식 베이스가 왜 포기했던 노트 시스템보다 나은지, 그리고 그 패턴이 실제로 무엇인지 다룹니다.' },
  'sec:02-setup': { label: '설정', desc: '처음부터 시작해 하룻저녁 만에 에이전트가 유지하는 볼트를 갖추는 과정입니다. 처음에는 페이지를 순서대로 따라가십시오. 단계는 아홉 개이며, 타이핑에는 대략 20분이 들고, 네 번째 단계의 인터뷰는 답하는 만큼 걸립니다.' },
  'sec:03-ingestion': { label: '인제스트', desc: '읽고 보고 쓰는 모든 것을 최대한 적은 마찰로 raw/에 모은 다음, 위키가 넘치지 않게 위키로 들여옵니다.' },
  'sec:04-structuring': { label: '구조화', desc: '볼트가 그래프가 될지 쓰레기 매립지가 될지 가르는 규칙입니다.' },
  'sec:05-graphs': { label: '그래프', desc: '대부분의 세컨드 브레인 안내서가 건너뛰는 부분입니다. 그래프 뷰를 열어 보라고 하고, 뇌처럼 생겼다고 말한 뒤 넘어갑니다.' },
  'sec:06-agents': { label: '에이전트', desc: '한 번 해 놓고 끝나는 설정을 스스로 유지되는 시스템으로 바꿉니다.' },
  'sec:07-retrieval': { label: '검색', desc: '볼트에 실제로 질문하고, 믿을 만한 답을 얻는 방법입니다.' },
  'sec:08-outputs': { label: '산출물', desc: '볼트가 제값을 하는 것은 거기서 무언가가 나올 때입니다.' },
  'sec:09-maintenance': { label: '유지보수', desc: '신기함이 사라진 뒤에도 이것을 살아 있게 하는 것.' },
  'sec:10-troubleshooting': { label: '문제 해결', desc: '구체적인 실패와 그 해결법.' },

  'course-0-map/what-an-agent-is': { label: '에이전트란 무엇인가' },
  'course-0-map/five-layers': { label: '다섯 계층, 하나의 시스템' },
  'course-0-map/agents-or-workflows': { label: '에이전트인가 워크플로인가' },
  'course-1-context/how-models-read': { label: '모델은 컨텍스트를 어떻게 읽는가' },
  'course-1-context/the-four-places': { label: '네 곳' },
  'course-1-context/context-practice': { label: '컨텍스트 실습' },
  'course-2-loop/loops-vs-workflows': { label: '루프 대 워크플로' },
  'course-2-loop/the-four-parts': { label: '루프의 네 부분' },
  'course-2-loop/loop-practice': { label: '루프 실습: 필터, 루프, 폴백' },
  'course-3-gate/cheap-decisions': { label: '값싼 결정' },
  'course-3-gate/gates-in-practice': { label: '실전 게이트' },
  'course-3-gate/gate-practice': { label: '게이트 실습' },
  'course-4-harness/the-office': { label: '사무실' },
  'course-4-harness/the-four-rings': { label: '네 개의 고리' },
  'course-4-harness/harness-practice': { label: '하네스 실습' },
  'course-5-evals/two-kinds-of-checks': { label: '두 가지 점검' },
  'course-5-evals/judges-and-golden-sets': { label: '판정자와 골든 세트' },
  'course-5-evals/evals-practice': { label: '평가 실습' },
  'course-6-production/from-prototype': { label: '프로토타입에서 프로덕션으로' },
  'course-6-production/operating-agents': { label: '에이전트 운영' },
  'course-6-production/day-one-plan': { label: '첫날 계획' },

  'track-graph/why-graphs': { label: '지식 그래프가 필요한 이유' },
  'track-graph/graphrag': { label: 'GraphRAG' },
  'track-graph/building-graphs-with-llms': { label: 'LLM으로 그래프 만들기' },
  'track-graph/graph-stores': { label: '그래프 저장소' },
  'track-graph/tools': { label: '도구' },
  'track-graph/build-extract': { label: '실습: 그래프 추출' },
  'track-graph/build-query': { label: '실습: 그래프 질의' },
  'track-graph/build-use': { label: '실습: 루프에 넣기' },
  'track-graph/resources': { label: '자료' },
  'track-jev/system-one-models': { label: '시스템 1 모델' },
  'track-jev/what-jev-is-good-for': { label: 'Jev가 잘하는 일' },
  'track-jev/jev-in-an-agent-stack': { label: '에이전트 스택 속의 Jev' },
  'track-jev/getting-started': { label: 'Jev 시작하기' },
  'track-jev/build-decision-endpoint': { label: '실습: 타입 있는 결정 엔드포인트' },
  'track-jev/build-router': { label: '실습: 신뢰도 게이트 라우터' },
  'track-jev/build-swap-in-jev': { label: '실습: Jev로 교체하기' },
  'track-jev/resources': { label: 'Jev 자료' },
  'track-harness/what-a-harness-is': { label: '하네스란 무엇인가' },
  'track-harness/claude-code-as-harness': { label: '하네스로서의 Claude Code' },
  'track-harness/context-engineering': { label: '컨텍스트 엔지니어링' },
  'track-harness/tools-and-mcp': { label: '도구와 MCP' },
  'track-harness/harness-landscape': { label: '하네스 지형' },
  'track-harness/build-the-loop': { label: '실습: 루프' },
  'track-harness/build-guardrails': { label: '실습: 권한과 컨텍스트' },
  'track-harness/build-graduate': { label: '실습: 졸업 시점 알기' },
  'track-harness/resources': { label: '자료' },
  'track-loop/what-loop-engineering-is': { label: '루프 엔지니어링이란' },
  'track-loop/stop-conditions': { label: '종료 조건' },
  'track-loop/critics-and-verification': { label: '크리틱과 검증' },
  'track-loop/context-hygiene': { label: '컨텍스트 위생' },
  'track-loop/patterns': { label: '패턴' },
  'track-loop/build-goal-test': { label: '실습: 목표 테스트' },
  'track-loop/build-critic': { label: '실습: 크리틱' },
  'track-loop/build-overnight': { label: '실습: 야간 루프' },
  'track-loop/resources': { label: '자료' },
  'track-evals/why-evals': { label: '평가가 필요한 이유' },
  'track-evals/designing-evals': { label: '평가 설계' },
  'track-evals/llm-as-judge': { label: 'LLM 판정자' },
  'track-evals/agent-evals': { label: '에이전트 평가' },
  'track-evals/tooling': { label: '평가 도구' },
  'track-evals/build-traces': { label: '실습: 트레이스 읽기' },
  'track-evals/build-suite': { label: '실습: 평가 스위트' },
  'track-evals/build-ci': { label: '실습: 게이트' },
  'track-evals/resources': { label: '평가 자료' },

  '01-concepts/what-is-a-second-brain': { label: '세컨드 브레인이란 실제로 무엇인가' },
  '01-concepts/the-save-for-later-paradox': { label: '저장해 두기의 역설' },
  '01-concepts/llm-wiki-pattern': { label: 'LLM 위키 패턴' },
  '01-concepts/two-layers': { label: '두 계층' },
  '01-concepts/why-markdown-and-plain-text': { label: '왜 마크다운과 일반 텍스트인가' },
  '01-concepts/pkm-lineage': { label: '제텔카스텐, PARA, 에버그린 노트' },
  '01-concepts/wiki-vs-rag': { label: '위키 대 RAG' },
  '01-concepts/what-good-looks-like': { label: '좋은 상태란 어떤 모습인가' },
  '02-setup/obsidian-install-and-vault': { label: 'Obsidian과 첫 볼트' },
  '02-setup/claude-code-setup': { label: '볼트 안의 Claude Code' },
  '02-setup/mcp-obsidian': { label: 'Obsidian용 MCP' },
  '02-setup/claude-md': { label: 'CLAUDE.md 작성하기' },
  '02-setup/vault-structure': { label: '볼트 구조' },
  '02-setup/project-scoping': { label: '프로젝트 범위 지정' },
  '02-setup/live-data': { label: '실시간 데이터 커넥터' },
  '02-setup/obsidian-plugins': { label: '설치할 만한 플러그인' },
  '02-setup/git-and-sync': { label: 'Git, 동기화, 백업' },
  '03-ingestion/web-clipper': { label: '웹 글' },
  '03-ingestion/youtube-transcripts': { label: 'YouTube와 팟캐스트' },
  '03-ingestion/pdfs-and-books': { label: 'PDF, 논문, 책' },
  '03-ingestion/chat-exports': { label: '채팅 내보내기' },
  '03-ingestion/voice-and-meetings': { label: '음성 메모와 회의' },
  '03-ingestion/newsletters-and-email': { label: '뉴스레터와 이메일' },
  '03-ingestion/bulk-backfill': { label: '수년 치 자료 백필' },
  '04-structuring/atomic-pages': { label: '한 페이지, 한 아이디어' },
  '04-structuring/page-types': { label: '네 가지 페이지 유형' },
  '04-structuring/linking-rules': { label: '링크 규칙' },
  '04-structuring/frontmatter-schema': { label: '프론트매터 스키마' },
  '04-structuring/naming-and-aliases': { label: '이름 짓기와 별칭' },
  '04-structuring/dedupe-and-merge': { label: '중복 제거와 병합' },
  '04-structuring/contradictions-and-supersession': { label: '모순과 대체' },
  '04-structuring/index-and-log': { label: 'index.md와 log.md' },
  '05-graphs/graph-basics': { label: '지식 베이스를 위한 그래프 기초' },
  '05-graphs/obsidian-graph-view': { label: 'Obsidian 그래프 뷰 읽는 법' },
  '05-graphs/typed-links': { label: '타입 링크' },
  '05-graphs/graph-vs-vectors': { label: '그래프와 임베딩' },
  '05-graphs/graphrag': { label: 'GraphRAG와 그 자리' },
  '05-graphs/exporting-your-graph': { label: '그래프 내보내기' },
  '05-graphs/metrics': { label: '추적할 가치가 있는 그래프 지표' },
  '06-agents/agent-roles': { label: '에이전트 역할' },
  '06-agents/scheduled-maintenance': { label: '스케줄링' },
  '06-agents/subagents': { label: '서브에이전트와 병렬 작업' },
  '06-agents/hooks': { label: '훅' },
  '06-agents/skills-and-commands': { label: '스킬과 슬래시 커맨드' },
  '06-agents/safety-and-guardrails': { label: '가드레일' },
  '07-retrieval/asking-questions': { label: '볼트에 질문하기' },
  '07-retrieval/query-patterns': { label: '질의 패턴' },
  '07-retrieval/search-tools': { label: '검색 도구' },
  '07-retrieval/rag-on-top': { label: '필요할 때 RAG 더하기' },
  '07-retrieval/context-budget': { label: '컨텍스트 예산' },
  '08-outputs/writing-from-the-vault': { label: '볼트로 글쓰기' },
  '08-outputs/research-reports': { label: '리서치 보고서' },
  '08-outputs/publishing-and-export': { label: '게시와 내보내기' },
  '08-outputs/teaching-yourself': { label: '내 볼트에서 배우기' },
  '09-maintenance/lint-and-health': { label: '볼트 린트' },
  '09-maintenance/review-cadence': { label: '검토 주기' },
  '09-maintenance/versioning-with-git': { label: '버전 관리' },
  '09-maintenance/backups-and-portability': { label: '백업과 이식성' },
  '09-maintenance/privacy-and-secrets': { label: '개인정보' },
  '09-maintenance/scaling': { label: '천 페이지를 넘어 확장하기' },
  '10-troubleshooting/common-failures': { label: '누구나 겪는 실패' },
  '10-troubleshooting/agent-writes-garbage': { label: '엉터리 글을 쓰는 에이전트' },
  '10-troubleshooting/broken-links': { label: '깨진 링크와 고아 페이지' },
  '10-troubleshooting/vault-too-big': { label: '볼트가 너무 커졌을 때' },
  '10-troubleshooting/faq': { label: 'FAQ' },

  'hub:skills': { label: '스킬', desc: '세컨드 브레인 프로젝트의 워크플로마다 스킬이 하나씩 있습니다. 에이전트는 작업이 맞을 때만 스킬을 불러옵니다.' },
  'hub:commands': { label: '슬래시 커맨드', desc: '스킬로 들어가는, 범위가 정해진 진입점입니다. /name 형태로 입력합니다.' },
  'hub:agents': { label: '서브에이전트', desc: '서브에이전트 여섯 개 가운데 네 개는 설계상 읽기 전용입니다.' },
  'hub:scripts': { label: '스크립트', desc: '링크 검사, 통계, 그래프 내보내기, 채팅 가져오기를 위한 의존성 없는 Python 스크립트입니다.' },
  'hub:plugin': { label: 'agents-course 플러그인', desc: '에이전트 강좌의 도구 모음입니다. 컨텍스트 감사, 완료 조건을 스크립트로 쓰기, 평가 스위트 부트스트랩, 루프 크리틱 에이전트가 있습니다.' },
  'hub:vault': { label: '스타터 볼트', desc: 'vault-template/: 위키 구조, 프로젝트 파이프라인, CLAUDE.md, 페이지 템플릿이 들어 있어 그대로 복사해 쓸 수 있습니다.' },
  'rcat:papers': { label: '논문', desc: '지식 베이스가 검색하고 추론하는 방식과 관련된 연구입니다. 벡터 데이터베이스가 필요한지 직접 판단하고 싶다면 읽어 보십시오.' },
  'rcat:tools': { label: '도구', desc: 'Obsidian 플러그인 카탈로그 밖의 모든 도구입니다. 플러그인은 plugins.md를 보십시오. Star 수는 2026년 9월 GitHub 기준입니다.' },
  'rcat:plugins': { label: 'Obsidian 플러그인', desc: 'Obsidian 공식 커뮤니티 통계의 설치 수 순서이며, 2026년 9월 기준입니다. 카탈로그에는 플러그인이 7,400개 넘게 있고, 여기에는 에이전트가 관리하는 볼트에 중요한 것만 골랐습니다.' },
  'rcat:repositories': { label: '저장소', desc: '알아 둘 만한 그래프, 검색, 메모리 프로젝트입니다. Star 수는 GitHub API 기준(2026년 9월)입니다. 에이전트 스킬은 skills.md, Obsidian 플러그인은 plugins.md를 보십시오.' },
  'rcat:skills': { label: '스킬 카탈로그', desc: '하나씩 센 수치입니다. 스킬 열여섯 개를 담은 저장소는 열여섯 개로 셉니다. 실제로 설치하는 단위가 그것이기 때문입니다. 2026년 9월에 각 저장소의 파일 트리를 읽어 집계했습니다.' },
  'rcat:reading': { label: '읽을거리', desc: 'Karpathy가 2026년 4월 4일에 공개한 llm-wiki gist입니다. 이 저장소의 모든 것이 이 패턴 위에 서 있습니다.' },

  'term:second-brain': { label: '세컨드 브레인', desc: '에이전트가 읽고 쓰는 로컬 일반 텍스트 폴더 하나입니다. 내가 읽고 이해한 내용이 담겨 있고, 질문을 던질 수 있습니다.' },
  'term:llm-wiki': { label: 'LLM 위키', desc: 'Karpathy가 제안한 패턴입니다. 질문할 때마다 청크에서 다시 찾아내는 대신, 모델이 원본 자료를 한 번 컴파일해 서로 연결된 위키로 만듭니다.' },
  'term:vault': { label: '볼트', desc: '에이전트가 관리하는 마크다운 폴더입니다. Obsidian은 이것을 볼트라고 부르지만, 에이전트에게는 그저 파일 모음입니다.' },
  'term:obsidian': { label: 'Obsidian', desc: '볼트를 읽고, 그래프를 둘러보고, 원본 자료를 클리핑하는 데 쓰는 마크다운 편집기입니다. 에이전트는 이 앱이 실행 중일 필요가 없습니다.' },
  'term:claude-code': { label: 'Claude Code', desc: '정리를 맡는 에이전트입니다. 원본 자료를 읽고, 페이지를 쓰고 연결하며, 유지보수를 실행합니다.' },
  'term:claude-md': { label: 'CLAUDE.md', desc: '에이전트가 세션을 시작할 때마다 읽는 상시 지침입니다. 내가 누구인지, 페이지 규약, 볼트의 규칙이 담깁니다.' },
  'term:mcp': { label: 'MCP', desc: 'Model Context Protocol: 에이전트가 도구와 데이터(예를 들어 어디서든 내 볼트)에 닿게 해 주는 표준 연결 규격입니다.' },
  'term:raw': { label: 'raw/', desc: '수신함이자 보관소입니다. 클리핑한 글, 트랜스크립트, PDF가 들어갑니다. 한 번 쓰고 다시 수정하지 않으며, 다시 읽는 일도 드뭅니다.' },
  'term:two-layers': { label: '두 계층', desc: '아는 것을 담는 위키와 하는 일을 담는 프로젝트 계층을 분리해, 각각이 계속 쓸모 있게 유지합니다.' },
  'term:ingest': { label: '인제스트', desc: '원본 자료 하나를 서로 연결된 위키 페이지로 바꾸는 일입니다. 새 페이지가 기존 내용과 연결되어야 끝난 것입니다.' },
  'term:wikilink': { label: '위키링크', desc: '노트 사이를 잇는 [[페이지 이름]] 링크입니다. 가장 값싼 그래프 엣지이며, 볼트가 복리로 쌓이는 이유입니다.' },
  'term:backlinks': { label: '백링크', desc: '한 페이지를 가리키는 링크입니다. 검색하지 않고도 그 아이디어에 기대는 모든 것을 찾을 수 있습니다.' },
  'term:atomic-pages': { label: '원자 페이지', desc: '페이지 하나에 아이디어 하나만 담습니다. 그래서 링크의 의미가 하나로 정해지고, 페이지를 쓰일 수 있는 모든 곳에서 재사용할 수 있습니다.' },
  'term:page-types': { label: '페이지 유형', desc: '원본 자료, 개념, 엔티티, 종합입니다. 유형마다 무엇을 담고 어떻게 링크할지에 대한 고유한 규약이 있습니다.' },
  'term:frontmatter': { label: '프론트매터', desc: '페이지 맨 위의 YAML 블록으로, 유형, 출처, 날짜, 상태가 들어 있습니다. 데이터베이스 없이도 볼트를 질의할 수 있게 해 주는 것입니다.' },
  'term:aliases': { label: '별칭', desc: '한 페이지가 응답하는 다른 이름들입니다. 링크와 검색이 중복 페이지를 만들지 않고 하나의 페이지에 닿게 합니다.' },
  'term:contradictions': { label: '모순', desc: '새 원본 자료가 기존 내용과 어긋나면 두 입장을 날짜와 출처를 달아 모두 남깁니다. 내가 무엇을 왜 믿었는지의 기록입니다.' },
  'term:index-log': { label: 'index.md와 log.md', desc: '에이전트가 가장 먼저 읽는 목록과, 실행마다 한 줄씩 남기는 로그입니다. 덕분에 볼트의 모든 변경을 감사할 수 있습니다.' },
  'term:knowledge-graph': { label: '지식 그래프', desc: '페이지는 노드, 링크는 엣지입니다. 이 구성에서는 파일 시스템이 곧 그래프이므로 서버도, 별도 저장소도 필요 없습니다.' },
  'term:typed-links': { label: '타입 링크', desc: '두 페이지가 어떤 관계인지(지지, 모순, 확장 등) 알려 주는 링크입니다. 원본 자료가 그렇게 말할 때만 타입을 붙입니다.' },
  'term:orphans': { label: '고아 페이지', desc: '어떤 페이지도 링크하지 않는 페이지입니다. 일주일이면 보이지 않게 되며, 볼트가 쇠퇴할 때 가장 먼저 살펴볼 수치입니다.' },
  'term:hubs': { label: '허브와 브리지', desc: '허브는 모든 것이 링크하는 페이지이고, 브리지는 그렇지 않으면 닿지 않을 클러스터를 이어 줍니다. 둘 다 생각이 어디에 있는지 알려 줍니다.' },
  'term:clusters': { label: '클러스터', desc: '촘촘하게 링크된 페이지 묶음입니다. 계획하지 않았는데 생긴 클러스터에서 볼트가 무언가를 말해 줍니다.' },
  'term:graphrag': { label: 'GraphRAG', desc: '추출한 엔티티 그래프와 커뮤니티 요약을 대상으로 하는 검색입니다. 코퍼스 전체에 대한 전역적 질문을 위해 만들어졌습니다.' },
  'term:rag': { label: 'RAG', desc: '검색 증강 생성(Retrieval-Augmented Generation)입니다. 질문하는 시점에 유사도로 청크를 가져오며, 질문 사이에 쌓이는 것은 없습니다.' },
  'term:vectors': { label: '임베딩과 벡터', desc: '청크 임베딩에 대한 유사도 검색입니다. 구조화되고 링크된 볼트가 더는 답하지 못할 때에야 추가할 가치가 있습니다.' },
  'term:context-window': { label: '컨텍스트 윈도', desc: '모델이 한 번에 볼 수 있는 범위입니다. 에이전트가 세션에서 아는 모든 것이 이 예산을 두고 경쟁합니다.' },
  'term:lost-in-middle': { label: 'Lost in the middle', desc: '모델은 긴 컨텍스트의 처음과 끝은 훨씬 잘 기억하고 중간은 놓칩니다(중간 내용 소실). 전부 밀어 넣는 방식이 실패하는 이유입니다.' },
  'term:skills': { label: '스킬', desc: 'SKILL.md가 들어 있는 폴더로, 작업이 맞을 때만 에이전트가 불러오는 지침입니다. 워크플로마다 하나씩 있습니다.' },
  'term:slash-commands': { label: '슬래시 커맨드', desc: '스킬로 들어가는 짧고 범위가 정해진 진입점으로, /name 형태로 입력합니다. 날마다 실제로 쓰는 손잡이입니다.' },
  'term:subagents': { label: '서브에이전트', desc: '자체 컨텍스트와 좁은 도구 목록을 가진 별도의 에이전트입니다. 여기 있는 대부분은 설계상 읽기 전용입니다.' },
  'term:hooks': { label: '훅', desc: '도구 호출 전이나 편집 후 같은 이벤트에서 하네스가 실행하는 코드입니다. 모델이 잊을 수 없는 규칙입니다.' },
  'term:scheduled': { label: '예약 유지보수', desc: '린트, 링크 정리, 리뷰를 타이머로 실행해 자는 동안 볼트가 스스로 정리되게 합니다.' },
  'term:lint': { label: '린트와 상태 점검', desc: '깨진 링크, 고아 페이지, 누락된 프론트매터, 오래된 페이지에 대한 기계적 점검입니다. 볼트의 테스트 스위트입니다.' },
  'term:git': { label: 'Git', desc: '볼트의 버전 이력입니다. 에이전트가 실행할 때마다 검토할 수 있고, 잘못된 실행은 모두 되돌릴 수 있습니다.' },
  'term:privacy': { label: '개인정보와 시크릿', desc: '페이지, 프롬프트, 공개 내보내기에 절대 들어가면 안 되는 것과, 그것을 막아 주는 점검입니다.' },
  'term:web-clipper': { label: 'Web Clipper', desc: 'Obsidian의 브라우저 확장입니다. 클릭 한 번으로 글이 raw/의 마크다운 파일이 됩니다.' },
  'term:transcripts': { label: '트랜스크립트', desc: '영상, 음성, 회의를 텍스트로 바꿔 다른 자료처럼 인제스트할 수 있게 한 것입니다.' },
  'term:agent': { label: '에이전트', desc: '도구를 쥐고 루프를 도는 모델입니다. 목표를 달성하거나 종료 규칙이 작동할 때까지 다음 단계를 스스로 정합니다.' },
  'term:five-layers': { label: '다섯 계층', desc: '모델을 둘러싼 모든 것에 대한 강좌의 틀입니다. 컨텍스트, 루프, 게이트, 하네스, 평가입니다.' },
  'term:workflows': { label: '워크플로 대 에이전트', desc: '워크플로에서는 코드가 다음 단계를 정하고, 에이전트에서는 모델이 정합니다. 대부분의 프로덕션 시스템은 둘을 섞은 하이브리드입니다.' },
  'term:context-engineering': { label: '컨텍스트 엔지니어링', desc: '시스템 프롬프트, 도구, 히스토리, 끝부분에 무엇을 어떤 순서로 넣을지 정해 모델이 올바른 것을 보게 하는 일입니다.' },
  'term:caching': { label: '프롬프트 캐싱', desc: '호출 사이에 프롬프트의 안정된 앞부분을 재사용합니다. 컨텍스트를 그에 맞게 배치하면 더 싸고 빠릅니다.' },
  'term:memory': { label: '메모리', desc: '세션 사이에 남는 것입니다. 여기서는 모델의 숨은 기능이 아니라 에이전트가 다시 읽는 파일입니다.' },
  'term:loop': { label: '에이전트 루프', desc: '목표, 행동, 점검, 반복입니다. 루프는 모델을 둘러싼 제어 시스템이며, 실패 대부분이 여기서 일어납니다.' },
  'term:stop-conditions': { label: '종료 조건', desc: '루프가 끝나야 하는 때는 목표 달성, 예산 소진, 진전 없음입니다. 종료 조건이 없는 루프는 피해를 낼 때까지 계속 돕니다.' },
  'term:critics': { label: '크리틱과 체커', desc: '모델 밖에서 결과를 판단하는 검사로, 테스트, 컴파일러, 별도의 리뷰어가 해당합니다. 스스로 하는 리뷰는 여기 포함되지 않습니다.' },
  'term:gate': { label: '게이트', desc: '값비싼 모델 앞에 두는 값싸고 좁은 결정입니다. 항목마다 범위가 정해진 질문 하나를 던지고, 답에 따라 경로를 나눕니다.' },
  'term:system-one': { label: '시스템 1 모델', desc: '텍스트 대신 신뢰도가 붙은 타입 결정을 돌려주는 작고 빠른 모델입니다. Jev는 게이트를 만드는 한 가지 방법입니다.' },
  'term:harness': { label: '하네스', desc: '모델을 둘러싼 사무실입니다. 격리, 가이드, 센서, 권한을 바깥에서 안쪽으로 차례대로 세웁니다.' },
  'term:guardrails': { label: '가드레일과 권한', desc: '에이전트가 건드려도 되는 것, 반드시 물어봐야 하는 것, 에이전트가 틀렸을 때도 버티는 벽입니다.' },
  'term:tools-tool-use': { label: '도구 사용', desc: '모델이 하네스에 대신 무언가를 실행해 달라고 요청하는 것입니다. 에이전트가 가진 모든 능력은 이렇게 들어옵니다.' },
  'term:evals': { label: '평가', desc: '매달 같은 시험을 칩니다. 실제 행동을 점검하므로 프롬프트나 모델을 바꿔도 조용히 무언가가 깨지지 않습니다.' },
  'term:golden-set': { label: '골든 세트', desc: '모든 평가가 대상으로 삼는 고정된 사례 모음으로, 이미 본 실패도 포함합니다.' },
  'term:llm-judge': { label: 'LLM 판정자', desc: '루브릭에 따라 출력을 채점하는 모델입니다. 판정자 자체를 사람의 라벨과 대조해 검증한 뒤에야 쓸모가 있습니다.' },
  'term:traces': { label: '트레이스', desc: '에이전트가 한 모든 일을 단계별로 남긴 전체 기록입니다. 행동 평가와 디버깅이 모두 이것을 읽습니다.' },
  'term:production': { label: '프로덕션', desc: '한 번 돌아가는 데모에서 트레이싱, 비용 관리, 보안, 책임자가 있는 시스템으로 넘어가는 단계입니다.' },
};

// Keep executable tool names intact; translate their descriptions.
Object.assign(window.SBOS_NODE_KO, {
  "skill:second-brain-backfill": {
    "label": "second-brain-backfill",
    "desc": "대용량 아카이브를 통제된 배치로 볼트에 가져옵니다. 인제스트할 만한 것을 선별하고, 오래된 것부터 처리하며, 배치마다 체크포인트를 남기고, 비용이 계속 보이게 합니다. 사용자가 수년 치 북마크, 다른 노트 앱의 내보내기 파일, 다운로드 폴더, 채팅 기록 덤프를 가져오려 할 때마다 이 스킬을 사용합니다…"
  },
  "skill:second-brain-changed-my-mind": {
    "label": "second-brain-changed-my-mind",
    "desc": "사용자가 기록한 입장이 어디서 바뀌었는지 추적합니다. 대체된 주장, 날짜가 다른 원본 자료 사이의 모순, 입장을 움직인 근거를 살핍니다. 사용자가 무엇에 대해 생각을 바꿨는지, 한 주제에 대한 생각이 어떻게 발전했는지, 예전에는 무엇을 믿었는지 물을 때 이 스킬을 사용합니다…"
  },
  "skill:second-brain-chat-import": {
    "label": "second-brain-chat-import",
    "desc": "내보낸 채팅 기록을 인제스트할 것, 보관할 것, 삭제할 것으로 분류하되 개인정보 점검을 먼저 거칩니다. 사용자가 Claude나 ChatGPT 기록을 내보냈거나, 오래된 대화를 가져오고 싶어 하거나, 채팅 아카이브에서 간직할 만한 것이 무엇인지 물을 때 이 스킬을 사용합니다. 붙여 넣은 대화 하나를 인제스트하는 데는 사용하지 않습니다…"
  },
  "skill:second-brain-graph": {
    "label": "second-brain-graph",
    "desc": "볼트의 링크 그래프를 분석해 형태를 보고합니다. 고아 페이지 비율, 평균 차수, 연결 요소, 허브, 브리지, 클러스터를 다루고 각 수치가 검색에 갖는 의미를 설명합니다. 사용자가 그래프의 상태나 구조를 묻거나, 지표를 원하거나, 가장 많이 연결된 페이지나 가장 고립된 페이지가 무엇인지 물을 때 이 스킬을 사용합니다…"
  },
  "skill:second-brain-ingest": {
    "label": "second-brain-ingest",
    "desc": "second-brain 볼트의 원본 자료를 서로 연결된 위키 페이지로 바꿉니다. 원본을 읽고, 개념과 엔티티로 나누고, 페이지를 쓰거나 갱신하고, 기존 페이지와 연결하고, 실행 내용을 로그에 기록합니다. 사용자가 raw/에 파일을 넣거나 글, 트랜스크립트, PDF를 붙여 넣고 요청할 때마다 이 스킬을 사용합니다…"
  },
  "skill:second-brain-lint": {
    "label": "second-brain-lint",
    "desc": "second-brain 볼트의 구조적 문제를 점검하고 고칩니다. 깨진 위키링크, 고아 페이지, 비어 있는 스텁, 스키마를 어긴 프론트매터, 거의 중복된 페이지, 오래된 인덱스 항목이 대상입니다. 사용자가 볼트를 린트, 정리, 감사하거나 상태를 점검해 달라고 하거나, 페이지가 어수선하다고 말할 때마다 이 스킬을 사용합니다…"
  },
  "skill:second-brain-merge": {
    "label": "second-brain-merge",
    "desc": "같은 대상을 설명하는 두 페이지를 합칩니다. 서로 다른 주장은 모두 보존하고, 들어오는 링크를 리다이렉트하며, 병합 내용을 기록합니다. 사용자가 중복 병합을 승인하거나 '이 둘은 같은 페이지야', 'X를 Y로 합쳐 줘'라고 말하거나, 린트가 제안한 거의 중복된 페이지를 정리해 달라고 할 때 이 스킬을 사용합니다. 다음을 병합하는 데는 사용하지 않습니다…"
  },
  "skill:second-brain-metrics": {
    "label": "second-brain-metrics",
    "desc": "볼트의 상태 수치를 날짜가 붙은 스냅샷으로 기록하고 이전 스냅샷과 비교해 추세가 보이게 합니다. 월간이나 분기별 점검, 사용자가 볼트가 나아지고 있는지 물을 때, 수치를 시간에 따라 추적해 달라고 할 때 이 스킬을 사용합니다. 일회성 그래프 분석에는 사용하지 않습니다. 그것은…"
  },
  "skill:second-brain-privacy": {
    "label": "second-brain-privacy",
    "desc": "볼트에 있어서는 안 되는 자료를 점검합니다. 자격 증명, 다른 사람의 사적인 정보, 기밀 업무 내용, 사용자가 동기화하거나 백업하고 싶지 않을 모든 것이 대상입니다. 사용자가 개인정보를 묻거나, 볼트를 공유하거나 동기화하려 하거나, 채팅 기록이나 회의 노트를 막 가져온 경우 이 스킬을 사용합니다…"
  },
  "skill:second-brain-project": {
    "label": "second-brain-project",
    "desc": "볼트에서 프로젝트를 만들거나 갱신합니다. 4단계 폴더 파이프라인, 목표가 하나뿐인 프로젝트 전용 CLAUDE.md, 의존하는 개념 페이지로 가는 링크를 갖춥니다. 사용자가 시간을 들여 진행할 새 일을 시작하거나, '프로젝트 만들어 줘', 'X용 폴더 설정해 줘'라고 말하거나, 목표 정의를 요청할 때 이 스킬을 사용합니다…"
  },
  "skill:second-brain-publish": {
    "label": "second-brain-publish",
    "desc": "볼트의 일부를 게시할 수 있게 준비합니다. 공개 동의(opt-in) 플래그를 확인하고, 비공개 자료를 찾고, 내보내기 전에 링크를 통해 무엇이 새어 나갈지 보고합니다. 사용자가 노트를 사이트나 디지털 가든으로 게시하려 하거나, 공개해도 안전한 것이 무엇인지 묻거나, 내보내기를 설정할 때 이 스킬을 사용합니다. 다음 용도에는 사용하지 않습니다…"
  },
  "skill:second-brain-query": {
    "label": "second-brain-query",
    "desc": "second-brain 볼트에 있는 자체 페이지를 읽고 질문에 답합니다. 사용한 페이지를 인용하고, 볼트에 답이 없으면 분명하게 말합니다. 사용자가 어떤 주제에 대해 무엇을 아는지, 무엇을 읽었는지, 두 아이디어를 잇는 것이 무엇인지, 무엇에 대해 생각을 바꿨는지 물을 때마다 이 스킬을 사용합니다…"
  },
  "skill:second-brain-quiz": {
    "label": "second-brain-quiz",
    "desc": "사용자 자신의 개념 페이지에서 문제를 만들어, 저장만 하고 배우지는 못한 것이 무엇인지 알아내고 답을 페이지 내용과 비교합니다. 사용자가 스스로 시험해 보거나, 복습하거나, 노트로 플래시카드를 만들거나, 무엇을 잊었는지 물을 때 이 스킬을 사용합니다. 사용하지 않는 경우는 일반적인…"
  },
  "skill:second-brain-rename": {
    "label": "second-brain-rename",
    "desc": "페이지 이름을 안전하게 바꿉니다. 파일을 갱신하고, 들어오는 위키링크를 모두 고치고, 이전 이름을 별칭으로 추가하고, 로그에 남깁니다. 페이지에 다른 정식 제목이 필요하거나, 사용자가 'X를 Y로 이름 바꿔 줘'라고 말하거나, 일관되지 않은 제목을 고쳐 달라고 하거나, 린트가 이름 문제를 지적한 뒤에 이 스킬을 사용합니다. 두 페이지를 합치는 데는 사용하지 않습니다…"
  },
  "skill:second-brain-report": {
    "label": "second-brain-report",
    "desc": "볼트에서 리서치 보고서를 만듭니다. 기존 페이지를 기준으로 질문의 범위를 정하고, 빈틈을 짚고, 인용, 이견, 한계를 갖춘 결과를 씁니다. 사용자가 리서치 보고서나 한 주제에 대한 심층 정리를 요청하거나, 지금까지 모은 자료로 주제를 철저히 이해하고 싶을 때 이 스킬을 사용합니다…"
  },
  "skill:second-brain-review": {
    "label": "second-brain-review",
    "desc": "second-brain 볼트의 정기 리뷰를 만듭니다. 무엇이 추가되었는지, 어떤 주제가 자라고 있는지, 무엇이 무엇과 모순되는지, 어떤 질문이 아직 열려 있는지, 다음에 읽을 만한 것이 무엇인지를 다룹니다. 사용자가 주간이나 월간 리뷰를 요청하거나, 볼트에서 무엇이 바뀌었는지, 무엇을 배워 왔는지 물을 때마다 이 스킬을 사용합니다…"
  },
  "skill:second-brain-transcript": {
    "label": "second-brain-transcript",
    "desc": "인제스트하기 전에 원본 트랜스크립트를 정리합니다. 문장 부호를 넣고, 문단을 나누고, 화자를 표시하고, 잘못 받아쓴 기술 용어를 고치고, 긴 녹음을 주제별로 나눕니다. 사용자가 자동 생성 트랜스크립트, 자막 파일, 팟캐스트나 강의 트랜스크립트, 회의 녹음 텍스트를 넣거나 영상 처리를 요청할 때 이 스킬을 사용합니다…"
  },
  "skill:second-brain-write": {
    "label": "second-brain-write",
    "desc": "볼트를 바탕으로 초안을 씁니다. 개념 페이지에서 개요를 짜고, 사용자 자신의 출처에 대한 인용을 유지하며, 자료들이 서로 어긋나는 지점을 드러냅니다. 사용자가 모아 둔 내용을 바탕으로 글, 게시물, 에세이, 뉴스레터를 쓰려 하거나 한 주제로 무엇을 쓸 수 있는지 물을 때 이 스킬을 사용합니다. 다음 용도에는 사용하지 않습니다…"
  },
  "cmd:aliases": {
    "label": "/aliases",
    "desc": "누락된 별칭 찾기"
  },
  "cmd:archive": {
    "label": "/archive",
    "desc": "잘 쓰지 않는 자료를 위키 밖으로 옮기기"
  },
  "cmd:ask": {
    "label": "/ask",
    "desc": "볼트만 근거로 답하는 질문"
  },
  "cmd:audit": {
    "label": "/audit",
    "desc": "에이전트가 한 일 감사하기"
  },
  "cmd:backfill": {
    "label": "/backfill",
    "desc": "아카이브를 배치로 나눠 일괄 가져오기"
  },
  "cmd:bridges": {
    "label": "/bridges",
    "desc": "그래프를 지탱하는 페이지 찾기"
  },
  "cmd:changed-my-mind": {
    "label": "/changed-my-mind",
    "desc": "내가 수정한 입장"
  },
  "cmd:claude-md": {
    "label": "/claude-md",
    "desc": "CLAUDE.md 만들기 또는 갱신하기"
  },
  "cmd:clusters": {
    "label": "/clusters",
    "desc": "볼트가 실제로 무엇에 관한 것인지 보여 주기"
  },
  "cmd:commit": {
    "label": "/commit",
    "desc": "현재 상태를 의미 있는 메시지와 함께 커밋하기"
  },
  "cmd:commitments": {
    "label": "/commitments",
    "desc": "열려 있는 약속 목록"
  },
  "cmd:compare": {
    "label": "/compare",
    "desc": "내 자료를 바탕으로 두 가지 비교하기"
  },
  "cmd:connect": {
    "label": "/connect",
    "desc": "두 아이디어 사이의 경로 찾기"
  },
  "cmd:contradictions": {
    "label": "/contradictions",
    "desc": "해결되지 않은 모순 목록"
  },
  "cmd:contradicts": {
    "label": "/contradicts",
    "desc": "내 주장에 반박하기"
  },
  "cmd:decisions": {
    "label": "/decisions",
    "desc": "내린 결정 목록"
  },
  "cmd:dedupe": {
    "label": "/dedupe",
    "desc": "거의 중복된 페이지 찾기"
  },
  "cmd:doctor": {
    "label": "/doctor",
    "desc": "설정이 제대로 작동하는지 확인하기"
  },
  "cmd:draft": {
    "label": "/draft",
    "desc": "볼트를 바탕으로 초안 쓰기"
  },
  "cmd:dry-run": {
    "label": "/dry-run",
    "desc": "쓰지 않고 실행 결과 미리 보기"
  },
  "cmd:explain": {
    "label": "/explain",
    "desc": "되짚어 설명하고 빈틈 찾기"
  },
  "cmd:export": {
    "label": "/export",
    "desc": "페이지 하나 또는 여러 페이지 내보내기"
  },
  "cmd:gaps": {
    "label": "/gaps",
    "desc": "내 이해에서 빠진 것"
  },
  "cmd:graph-export": {
    "label": "/graph-export",
    "desc": "외부 분석용으로 그래프 내보내기"
  },
  "cmd:graph": {
    "label": "/graph",
    "desc": "그래프의 형태 보고하기"
  },
  "cmd:handoff": {
    "label": "/handoff",
    "desc": "인수인계 업무 지시서 준비하기"
  },
  "cmd:health": {
    "label": "/health",
    "desc": "빠른 상태 점검"
  },
  "cmd:hubs": {
    "label": "/hubs",
    "desc": "그래프를 삼켜 버린 페이지 찾기"
  },
  "cmd:index": {
    "label": "/index",
    "desc": "인덱스 다시 만들기"
  },
  "cmd:ingest-chats": {
    "label": "/ingest-chats",
    "desc": "내보낸 채팅 기록 가져오기"
  },
  "cmd:ingest-highlights": {
    "label": "/ingest-highlights",
    "desc": "책이나 글의 하이라이트 인제스트하기"
  },
  "cmd:ingest-mine": {
    "label": "/ingest-mine",
    "desc": "내가 끝낸 작업물 인제스트하기"
  },
  "cmd:ingest-newsletter": {
    "label": "/ingest-newsletter",
    "desc": "중복 없이 뉴스레터 인제스트하기"
  },
  "cmd:ingest-paper": {
    "label": "/ingest-paper",
    "desc": "학술 논문 인제스트하기"
  },
  "cmd:ingest-pdf": {
    "label": "/ingest-pdf",
    "desc": "PDF 인제스트하기"
  },
  "cmd:ingest-url": {
    "label": "/ingest-url",
    "desc": "웹 페이지를 클리핑해 인제스트하기"
  },
  "cmd:ingest-voice": {
    "label": "/ingest-voice",
    "desc": "음성 노트 인제스트하기"
  },
  "cmd:ingest-youtube": {
    "label": "/ingest-youtube",
    "desc": "영상이나 팟캐스트 트랜스크립트 인제스트하기"
  },
  "cmd:ingest": {
    "label": "/ingest",
    "desc": "raw/의 새 자료를 위키로 인제스트하기"
  },
  "cmd:init": {
    "label": "/init",
    "desc": "새 볼트의 뼈대 만들기"
  },
  "cmd:install": {
    "label": "/install",
    "desc": "스킬, 커맨드, 에이전트 설치하기"
  },
  "cmd:know": {
    "label": "/know",
    "desc": "한 주제에 대해 내가 아는 것"
  },
  "cmd:link": {
    "label": "/link",
    "desc": "누락된 연결 찾아 추가하기"
  },
  "cmd:lint": {
    "label": "/lint",
    "desc": "구조를 점검하고 기계적으로 고칠 수 있는 것 수정하기"
  },
  "cmd:merge": {
    "label": "/merge",
    "desc": "두 페이지 합치기"
  },
  "cmd:metrics": {
    "label": "/metrics",
    "desc": "날짜가 붙은 지표 스냅샷 기록하기"
  },
  "cmd:monthly": {
    "label": "/monthly",
    "desc": "월간 구조 리뷰"
  },
  "cmd:orphans": {
    "label": "/orphans",
    "desc": "도달할 수 없는 페이지 찾기"
  },
  "cmd:outline": {
    "label": "/outline",
    "desc": "개념 페이지로 글의 개요 짜기"
  },
  "cmd:privacy": {
    "label": "/privacy",
    "desc": "볼트에 있어서는 안 될 것 점검하기"
  },
  "cmd:project-status": {
    "label": "/project-status",
    "desc": "프로젝트의 현재 상태"
  },
  "cmd:project": {
    "label": "/project",
    "desc": "프로젝트 만들기"
  },
  "cmd:prune": {
    "label": "/prune",
    "desc": "안전하게 지울 수 있는 것 찾기"
  },
  "cmd:publish": {
    "label": "/publish",
    "desc": "게시해도 안전한 것 확인하기"
  },
  "cmd:quiz": {
    "label": "/quiz",
    "desc": "내 페이지로 스스로 시험하기"
  },
  "cmd:rename": {
    "label": "/rename",
    "desc": "페이지 이름을 바꾸고 모든 링크 고치기"
  },
  "cmd:report": {
    "label": "/report",
    "desc": "리서치 보고서 쓰기"
  },
  "cmd:retype": {
    "label": "/retype",
    "desc": "페이지 유형 고치기"
  },
  "cmd:review": {
    "label": "/review",
    "desc": "볼트가 배운 것의 정기 리뷰"
  },
  "cmd:rollback": {
    "label": "/rollback",
    "desc": "직전 실행 되돌리기"
  },
  "cmd:schedule": {
    "label": "/schedule",
    "desc": "예약 유지보수 설정하기"
  },
  "cmd:schema": {
    "label": "/schema",
    "desc": "스키마에 맞는지 프론트매터 점검하기"
  },
  "cmd:scope": {
    "label": "/scope",
    "desc": "프로젝트로 지식 끌어오기"
  },
  "cmd:secrets": {
    "label": "/secrets",
    "desc": "자격 증명 스캔하기"
  },
  "cmd:sources": {
    "label": "/sources",
    "desc": "주장의 근거 보여 주기"
  },
  "cmd:split": {
    "label": "/split",
    "desc": "너무 많은 것을 담은 페이지 나누기"
  },
  "cmd:stale": {
    "label": "/stale",
    "desc": "아무도 손대지 않은 개념 페이지 찾기"
  },
  "cmd:tags": {
    "label": "/tags",
    "desc": "태그 어휘 점검하기"
  },
  "cmd:timeline": {
    "label": "/timeline",
    "desc": "원본 자료가 시간에 따라 어떻게 발전했는지"
  },
  "cmd:trace": {
    "label": "/trace",
    "desc": "답에 쓰인 페이지 보여 주기"
  },
  "cmd:typed-links": {
    "label": "/typed-links",
    "desc": "중요한 곳에 관계 유형 추가하기"
  },
  "cmd:weekly": {
    "label": "/weekly",
    "desc": "주간 리뷰"
  },
  "agent:curator": {
    "label": "curator",
    "desc": "무엇을 정리하고, 보관하고, 합칠지 제안합니다. 읽기 전용이며 제안만 하고 실행은 하지 않습니다. 분기마다, 또는 볼트가 사용자가 감당할 수 있는 범위를 넘어 커졌을 때 사용합니다."
  },
  "agent:graph-analyst": {
    "label": "graph-analyst",
    "desc": "링크 그래프를 분석해 지표, 허브, 브리지, 클러스터를 보고합니다. 읽기 전용입니다. 월간 점검 때, 또는 볼트가 탐색하기 어렵게 느껴질 때 사용합니다."
  },
  "agent:ingestor": {
    "label": "ingestor",
    "desc": "raw/의 새 자료를 서로 연결된 위키 페이지로 처리합니다. 처리하지 않은 원본 자료가 대기 중일 때 사용합니다."
  },
  "agent:linker": {
    "label": "linker",
    "desc": "기존 위키 페이지 사이에 빠진 연결을 찾아 추가합니다. 일괄 가져오기 후나 일정에 따라 사용합니다."
  },
  "agent:researcher": {
    "label": "researcher",
    "desc": "볼트를 바탕으로 리서치 질문에 답하고 빠진 것을 짚어 줍니다. 여러 페이지에 걸친 질문에 사용합니다."
  },
  "agent:reviewer": {
    "label": "reviewer",
    "desc": "볼트가 배운 것에 대한 정기 리뷰를 만듭니다. 매주, 또는 무엇이 바뀌었는지 물을 때 사용합니다."
  },
  "script:chat_export_to_md.py": {
    "label": "chat_export_to_md.py",
    "desc": "내보낸 채팅 기록 JSON을 대화마다 마크다운 파일 하나로 변환합니다."
  },
  "script:graph_export.py": {
    "label": "graph_export.py",
    "desc": "볼트의 위키링크 그래프를 CSV 엣지 목록이나 GraphML로 내보냅니다."
  },
  "script:link_check.py": {
    "label": "link_check.py",
    "desc": "second-brain 볼트의 깨진 위키링크, 고아 페이지, 스텁을 점검합니다."
  },
  "script:vault_stats.py": {
    "label": "vault_stats.py",
    "desc": "second-brain 볼트의 상태 지표를 출력합니다."
  },
  "plug:context-audit": {
    "label": "context-audit",
    "desc": "에이전트의 컨텍스트 배치를 네 곳(시스템 프롬프트, 도구, 히스토리, 끝부분)에 맞춰 점검합니다. 사용자가 에이전트의 컨텍스트, 프롬프트 캐싱, 턴당 토큰 사용량, CLAUDE.md / AGENTS.md 배치를 감사, 검토, 수정해 달라고 할 때 사용합니다. 읽기 전용이며 결과와 수정 목록만 보고하고 아무것도 바꾸지 않습니다. 작성하는 데는 사용하지 않습니다…"
  },
  "plug:evals-bootstrap": {
    "label": "evals-bootstrap",
    "desc": "에이전트의 첫 평가 스위트를 만듭니다. 실제 실패에서 사례를 뽑아내고, 트레이스에 대한 행동 점검을 작성하고, 러너를 생성합니다. 사용자가 에이전트의 평가, 회귀 테스트, 골든 세트를 원하거나, 프롬프트나 모델 변경이 동작을 깨뜨리지 않았는지 어떻게 아는지 물을 때 사용합니다. 단일 작업의 완료 점검에는 사용하지 않습니다…"
  },
  "plug:gate-check": {
    "label": "gate-check",
    "desc": "비싼 모델이 필요 없는 파이프라인 속 결정을 찾아, 각각에 맞는 게이트(규칙, 고전적 분류기, 소형 모델)를 실패 시 닫히는(fail-closed) 라우팅과 함께 제안합니다. 사용자가 모델 비용이나 지연 시간을 줄이고 싶다고 하거나, 큰 모델이 모든 것을 처리한다고 말하거나, 앞단에 분류, 라우팅, 필터 계층을 두고 싶을 때 사용합니다…"
  },
  "plug:goal-test": {
    "label": "goal-test",
    "desc": "모호한 작업을 테스트할 수 있는 완료 정의로 바꾸고, 그에 대한 실행 가능한 목표 테스트 스크립트를 생성합니다. 원하면 헤드리스 에이전트 주위에 횟수가 제한된 재시도 루프도 붙입니다. 사용자가 에이전트를 루프로 실행하려 하거나, 에이전트 작업이 끝났는지 어떻게 아는지 묻거나, 'X 개선' 같은 목표를 구체화해야 한다고 말할 때 사용합니다…"
  },
  "plug:harness-audit": {
    "label": "harness-audit",
    "desc": "에이전트의 하네스를 네 개의 고리(격리, 가이드, 센서, 권한)에 맞춰 점검합니다. 사용자가 에이전트 설정이 안전한지 묻거나, 샌드박스, 권한, 훅, AGENTS.md 가드레일의 검토를 원하거나, 나쁜 세션이 무엇을 망가뜨릴 수 있는지 물을 때 사용합니다. 읽기 전용이며 영향 범위와 보강 목록을 보고합니다…"
  },
  "plug:loop-critic": {
    "label": "loop-critic",
    "desc": "에이전트 루프 한 번의 결과를 깨끗한 컨텍스트에서 검토합니다. 주장된 작업을 목표와 대조하고, 지름길과 테스트되지 않은 경로를 찾아내고, 구체적인 결함이 담긴 판정을 돌려줍니다. 작업 세션이나 루프 시도가 끝난 뒤, 결과를 받아들이기 전에 사용합니다."
  }
});
