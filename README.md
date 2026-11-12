# Second Brain OS

AI 엔지니어를 위한 에이전트 구축 강좌, 분야별 심화 핸드북 다섯 권, 실습 프로젝트와 엄선한 참고 자료를 제공합니다.

**웹에서 읽기:** [secondbrainos.dev](https://secondbrainos.dev/)에서 이 저장소의 문서·용어·도구를 인터랙티브 지도로 탐색할 수 있습니다.

## 이 저장소를 만든 이유

AI 엔지니어링의 유용한 정보는 백서, 기술 블로그, 저장소에 흩어져 있습니다. 이 프로젝트는 출처가 명확한 이론, 모듈별 실습, 선정 이유가 있는 참고 자료를 하나의 학습 경로로 묶습니다.

- **에이전트 강좌:** 단일 프롬프트부터 실서비스 에이전트까지, 컨텍스트·루프·게이트·하네스·평가·운영을 다루는 7개 모듈
- **다섯 권의 핸드북:** 지식 그래프, 게이트, 하네스, 루프, 평가에 대한 심화 학습
- **실습 프로젝트:** 에이전트가 일반 마크다운으로 구축하고 관리하는 개인 지식 베이스, 세컨드 브레인
- **실전 도구:** 강좌용 Claude Code 플러그인과 스킬 18개, 슬래시 명령어 72개, 서브에이전트 6개
- **검증한 참고 자료 114개:** 원문을 확인한 최신 정보 포함
- **마크다운과 MIT 라이선스:** 가입이나 설치 없이 읽을 수 있습니다.

## 목차

- [시작하기](#시작하기)
- [이번 달 새로운 소식](#이번-달-새로운-소식)
- [수준별 학습](#수준별-학습)
  - [🟢 초급 (30개 문서)](#-초급)
  - [🟡 중급 (47개 문서)](#-중급)
  - [🔴 고급 (53개 문서)](#-고급)
- [도구 모음](#도구-모음)
- [참고 자료](#참고-자료)
- [세컨드 브레인의 작동 원리](#세컨드-브레인의-작동-원리)
- [기여하기](#기여하기)
- [라이선스 및 출처](#라이선스-및-출처)

---

## 시작하기

1. **에이전트가 처음이라면:** [에이전트란 무엇인가](docs/course-0-map/what-an-agent-is.md)를 읽고 [에이전트 강좌](docs/README.md#the-agents-course)를 순서대로 학습하세요. 7개 모듈에 각 3개 수업이 있습니다.
2. **에이전트의 특정 영역이 문제라면:** [심화 핸드북](#-고급)에서 그래프·게이트·하네스·루프·평가를 살펴보세요. 각각 실습으로 끝납니다.
3. **실전 프로젝트가 필요하다면:** 에이전트가 관리하는 지식 베이스인 [세컨드 브레인](docs/01-concepts/what-is-a-second-brain.md)을 만들어 보세요.
4. **최근 소식을 확인하려면:** 출처를 확인한 [이번 달 새로운 소식](#이번-달-새로운-소식)을 읽어 보세요.

<details>
<summary><b>세컨드 브레인 빠른 시작</b></summary>

```bash
# 시작용 볼트와 스킬, 명령어, 에이전트, 스크립트 복사
git clone https://github.com/undefined-ui/second-brain-os.git
cp -r second-brain-os/vault-template ~/brain

mkdir -p ~/brain/.claude
cp -r second-brain-os/skills   ~/brain/.claude/skills
cp -r second-brain-os/commands ~/brain/.claude/commands
cp -r second-brain-os/agents   ~/brain/.claude/agents
cp -r second-brain-os/scripts  ~/brain/scripts

# 각 폴더의 README는 에이전트용이 아닌 GitHub 열람용입니다
rm ~/brain/.claude/*/README.md ~/brain/scripts/README.md

cd ~/brain && claude
```

그다음 [설정](docs/02-setup/README.md)의 9개 문서를 순서대로 따라 하세요. `scripts/`를 복사하면 볼트 안에서 `/metrics`, `/health`, `/graph-export`를 실행할 수 있습니다. Windows에서는 안내의 `python3` 대신 `python`을 사용하세요.

</details>

---

## 이번 달 새로운 소식

2026년 9~10월에 공개된 주요 소식입니다. 2026년 11월 1일에 확인했고 별 수는 당시 GitHub API 기준입니다. 자세한 내용은 [`resources/`](resources/README.md)에서 확인할 수 있습니다.

#### 세컨드 브레인과 메모리
- [**Basic Memory 1.0**](https://github.com/basicmachines-co/basic-memory/releases/tag/v1.0.0) - Obsidian 볼트를 읽고 쓰는 일반 마크다운 그래프 기반 로컬 MCP 서버 · 4.4K, AGPL-3.0
- [**ai-memory 3.0**](https://github.com/akitaonrails/ai-memory/releases/tag/v3.0.0) - 20개 이상 에이전트의 훅으로 구성하는 Git 기반 위키, Claude Code 플러그인 설치 지원 · 14.9K, MIT
- [**agent-memory**](https://github.com/tigerless-labs/agent-memory) - 메모리별 마크다운 파일과 삭제·재구축 가능한 검색 색인 · 4.3K, MIT
- [**Hindsight 1.0**](https://github.com/vectorize-io/hindsight/releases/tag/v1.0.0) - 지식 페이지를 마크다운으로 내보낼 수 있는 데이터베이스 기반 대안 · 57.7K, MIT
- [**LLM Wikis From First Principles**](https://github.com/decodingai-magazine/llm-wiki-workshop) - 기초 위키 구조부터 질의를 통해 학습하는 위키까지 세 가지 실습
- [**EvalMem**](https://arxiv.org/abs/2609.22231) - 메모리 실패를 저장·검색·활용 문제로 분류, 위키 계층 추가로 2.5점 향상

#### 그래프와 검색
- [**Follow the Entities**](https://arxiv.org/abs/2609.37226) - 엔터티별 페이지를 관련 문서에 연결해 더 적은 토큰으로 더 많은 근거 제공
- [**Context as Infrastructure**](https://arxiv.org/abs/2610.41172) - 벡터 색인 없이 grep·BM25로 BrowseComp-Plus의 85% 해결, 위키 컴파일로 토큰 절감
- [**Keep Your Receipts**](https://arxiv.org/abs/2610.17719) - 병합·연결의 근거를 기록해 출처가 철회되어도 모델 호출 없이 관련 내용 제거
- [**LiteRAG**](https://arxiv.org/abs/2609.10239) - 매 단계 LLM 호출 없는 그래프 검색으로 GraphRAG 대비 속도 100배 이상, 비용 99% 절감
- [**LightRAG 1.5.7**](https://github.com/HKUDS/LightRAG/releases/tag/v1.5.7) - 임베딩 없이 그래프를 먼저 만들고 벡터는 나중에 추가 가능
- [**Ladybug**](https://github.com/LadybugDB/ladybug) - Kuzu의 유지보수를 잇는 내장형 Cypher 데이터베이스 · 1.9K, MIT

#### Claude Code와 스킬
- [**Agent Skills move to the Linux Foundation**](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation) - SKILL.md 표준을 Agentic AI Foundation에 기증해 중립적인 형식으로 전환
- [**Mods**](https://code.claude.com/docs/en/plugins/mods/overview) - 도구 호출·프롬프트를 감시 및 변경하고 전용 패널을 표시하는 JS/TS 플러그인 모듈
- [**claude plugin eval**](https://code.claude.com/docs/en/plugin-evals) - 플러그인 적용 전후를 비교 평가해 기준 미달 시 CI 실패 처리
- [**/skill-doctor**](https://code.claude.com/docs/en/skills#find-unused-skills) - 스킬별 컨텍스트 비용과 호출되지 않는 스킬 파악
- [**AGENTS.md support**](https://code.claude.com/docs/en/memory#agents-md) - CLAUDE.md가 없을 때 AGENTS.md를 읽어 여러 에이전트가 설정 공유
- [**When to fold subagents into your main loop**](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop) - 여러 서브에이전트 대신 단일 루프와 스킬을 쓰는 접근 및 전환 계획
- [**Elephant-Goldfish Model**](https://github.com/google/elephant-goldfish-model) - 사전 맥락 없는 검토자가 명세를 확인하는 Google 플러그인 · 9.1K, Apache-2.0

#### 에이전트 엔지니어링
- [**Harness²**](https://github.com/google-research/harness2) - 모델 가중치 대신 프롬프트·도구·메모리를 작업에 맞게 조정 · 21.9K, Apache-2.0
- [**SoL-Pi**](https://github.com/NVlabs/SoL-Pi) - Pi 하네스 확장으로 점수를 유지하면서 토큰 사용량 45~49% 절감 · 3.6K, MIT
- [**CliffCompaction**](https://arxiv.org/abs/2609.26779) - 요약의 재요약 없이 잘라내거나 제거하는 압축, 비용 최대 50% 절감
- [**The Unreliable Progress Bar**](https://arxiv.org/abs/2609.08589) - 모델의 진행률 자기 보고는 부정확하므로 종료는 런타임이 관리
- [**Building effective agent automations**](https://claude.dev/blog/building-effective-agent-automations/) - 정기 실행 에이전트를 위한 북마크·작업 기록·지출 상한
- [**Automating eval design and hillclimbing**](https://claude.dev/blog/automating-eval-design-and-hillclimbing/) - 학습용과 별도 검증용 데이터가 모두 좋아질 때만 변경 채택
- [**Frozen Judges, Moving Agents**](https://arxiv.org/abs/2609.34198) - 고정된 LLM 평가자 점수만으로 에이전트 개선을 입증하기 어려움
- [**OpenAI Decisions API**](https://developers.openai.com/api/docs/guides/decisions) - 10월 22일 일반 공개된 구조화된 의사결정 API와 저비용 평가 활용
- [**How the Claude Code team does code review**](https://claude.dev/blog/solving-code-review-at-anthropic/) - 병렬 탐색·투표 검증·3회 제한으로 첫 코드 검토 통과율 65%→78% 개선

---

## 수준별 학습

모든 문서를 권장 학습 순서대로 정리했습니다. 강좌는 세 수준에 걸쳐 있고, 세컨드 브레인 프로젝트는 초급부터 중급까지 이어집니다. 특정 영역에 문제가 생겼을 때는 심화 핸드북을 참고하세요.

### 🟢 초급

에이전트가 무엇이고 실제로 무엇을 보는지 배운 뒤, 첫 프로젝트로 에이전트가 만드는 지식 베이스를 구축합니다. 사전 경험은 필요하지 않습니다.

#### [학습 지도](docs/course-0-map/README.md) <sub>강좌 모듈 0</sub>
- [**에이전트란 무엇인가**](docs/course-0-map/what-an-agent-is.md) - An application that plans and acts toward a goal, not a model
- [**하나의 시스템을 이루는 다섯 계층**](docs/course-0-map/five-layers.md) - Context, loop, gate, harness, evals: the system around the model
- [**에이전트와 워크플로**](docs/course-0-map/agents-or-workflows.md) - If you can write the steps down, build a workflow

#### [컨텍스트](docs/course-1-context/README.md) <sub>강좌 모듈 1</sub>
- [**모델이 컨텍스트를 읽는 방법**](docs/course-1-context/how-models-read.md) - Attention, caching and why a bigger window is not free
- [**컨텍스트의 네 영역**](docs/course-1-context/the-four-places.md) - System prompt, tools, history, tail: what goes where
- [**컨텍스트 실습**](docs/course-1-context/context-practice.md) - Audit and restructure a real agent's context

#### [개념](docs/01-concepts/README.md) <sub>세컨드 브레인 01</sub>
- [**세컨드 브레인이란**](docs/01-concepts/what-is-a-second-brain.md) - One folder of plain text an agent reads, writes and answers from
- [**나중에 읽기의 역설**](docs/01-concepts/the-save-for-later-paradox.md) - Why saved links never compound, and what has to change
- [**LLM 위키 패턴**](docs/01-concepts/llm-wiki-pattern.md) - Karpathy's April 2026 gist, the pattern this repo implements
- [**두 계층**](docs/01-concepts/two-layers.md) - A wiki for what you know, projects for what you are doing
- [**마크다운과 일반 텍스트를 선택한 이유**](docs/01-concepts/why-markdown-and-plain-text.md) - Why the file format decides whether the system survives
- [**제텔카스텐·PARA·에버그린 노트**](docs/01-concepts/pkm-lineage.md) - The old methods were mostly right; which parts still apply
- [**위키와 RAG 비교**](docs/01-concepts/wiki-vs-rag.md) - Why a linked wiki beats a vector database for a personal corpus
- [**좋은 시스템의 모습**](docs/01-concepts/what-good-looks-like.md) - Concrete signs it is working, from week one to month six

#### [설정](docs/02-setup/README.md) <sub>세컨드 브레인 02</sub>
- [**Obsidian과 첫 볼트**](docs/02-setup/obsidian-install-and-vault.md) - The storage half: free, local, plain text, with a graph view
- [**볼트에서 Claude Code 사용하기**](docs/02-setup/claude-code-setup.md) - Run Claude Code in the vault, in the terminal or the desktop app
- [**Obsidian용 MCP**](docs/02-setup/mcp-obsidian.md) - Give the agent a door into Obsidian over MCP. Optional on day one
- [**CLAUDE.md 작성하기**](docs/02-setup/claude-md.md) - Get interviewed for the file the agent reads every session
- [**볼트 구조**](docs/02-setup/vault-structure.md) - Lay out the wiki and project layers in one folder tree
- [**프로젝트 범위 지정**](docs/02-setup/project-scoping.md) - Scope the agent to one project so quality holds as the vault grows
- [**실시간 데이터 연결**](docs/02-setup/live-data.md) - Connect calendar, email and chat so the vault sees what changes
- [**설치할 만한 플러그인**](docs/02-setup/obsidian-plugins.md) - The plugins worth adding, each for one specific problem
- [**Git·동기화·백업**](docs/02-setup/git-and-sync.md) - Git, sync and backups that make unattended runs safe

#### [자료 수집](docs/03-ingestion/README.md) <sub>세컨드 브레인 03</sub>
- [**웹 문서**](docs/03-ingestion/web-clipper.md) - Clip articles into raw/ in one click
- [**YouTube와 팟캐스트**](docs/03-ingestion/youtube-transcripts.md) - Turn videos and podcasts into transcripts the agent can file
- [**PDF·논문·책**](docs/03-ingestion/pdfs-and-books.md) - Get PDFs, papers and books in without garbled text
- [**대화 기록 가져오기**](docs/03-ingestion/chat-exports.md) - Import your chat history, your richest and most sensitive source
- [**음성 메모와 회의**](docs/03-ingestion/voice-and-meetings.md) - Capture voice notes and meetings away from the desk
- [**뉴스레터와 이메일**](docs/03-ingestion/newsletters-and-email.md) - Automate newsletter capture without flooding the wiki
- [**과거 자료 일괄 가져오기**](docs/03-ingestion/bulk-backfill.md) - Import years of bookmarks and downloads in controlled batches

---

### 🟡 중급

에이전트의 반복 실행과 의사결정 방식을 배우고, 세컨드 브레인을 자체 유지·관리하며 실제 질문에 답하는 그래프로 발전시킵니다.

#### [루프](docs/course-2-loop/README.md) <sub>강좌 모듈 2</sub>
- [**루프와 워크플로 비교**](docs/course-2-loop/loops-vs-workflows.md) - When the model, not your code, should choose the next step
- [**루프의 네 요소**](docs/course-2-loop/the-four-parts.md) - Goal, an outside checker, a stop rule, a budget
- [**루프 실습: 필터·반복·대체 처리**](docs/course-2-loop/loop-practice.md) - Filter first, loop briefly, fall back: the production pattern

#### [게이트](docs/course-3-gate/README.md) <sub>강좌 모듈 3</sub>
- [**저비용 의사결정**](docs/course-3-gate/cheap-decisions.md) - Cheap classifiers in front of expensive models
- [**실전 게이트**](docs/course-3-gate/gates-in-practice.md) - Measuring a gate: how often it is right, and how sure it is
- [**게이트 실습**](docs/course-3-gate/gate-practice.md) - Label a few hundred examples and train a baseline first

#### [구조화](docs/04-structuring/README.md) <sub>세컨드 브레인 04</sub>
- [**한 페이지에 하나의 아이디어**](docs/04-structuring/atomic-pages.md) - One idea per page, explained so it stands alone
- [**네 가지 페이지 유형**](docs/04-structuring/page-types.md) - Source, concept, entity, synthesis: four types, four jobs
- [**링크 규칙**](docs/04-structuring/linking-rules.md) - The rules that turn a folder of files into a graph
- [**프런트매터 스키마**](docs/04-structuring/frontmatter-schema.md) - The YAML fields that make the vault queryable
- [**이름과 별칭**](docs/04-structuring/naming-and-aliases.md) - Names and aliases, the keys every wikilink resolves by
- [**중복 제거와 병합**](docs/04-structuring/dedupe-and-merge.md) - Find and merge duplicate pages without breaking links
- [**모순과 정보 변경**](docs/04-structuring/contradictions-and-supersession.md) - Record disagreements with dates and sources, never overwrite
- [**index.md와 log.md**](docs/04-structuring/index-and-log.md) - The catalog the agent reads first and the log that makes runs auditable

#### [그래프](docs/05-graphs/README.md) <sub>세컨드 브레인 05</sub>
- [**지식 베이스 그래프 기초**](docs/05-graphs/graph-basics.md) - Your vault is already a graph: what that means in practice
- [**Obsidian 그래프 보기 해석**](docs/05-graphs/obsidian-graph-view.md) - The graph views that actually tell you something
- [**유형이 지정된 링크**](docs/05-graphs/typed-links.md) - Links that say how two pages relate, and when to type them
- [**그래프와 임베딩 비교**](docs/05-graphs/graph-vs-vectors.md) - Why structured links answer what similarity search cannot
- [**GraphRAG와 활용 시점**](docs/05-graphs/graphrag.md) - What GraphRAG is and why you probably do not need it yet
- [**그래프 내보내기**](docs/05-graphs/exporting-your-graph.md) - Get the graph out of Obsidian to compute on it
- [**그래프 핵심 지표**](docs/05-graphs/metrics.md) - Four numbers, checked monthly, that show whether it works

#### [에이전트](docs/06-agents/README.md) <sub>세컨드 브레인 06</sub>
- [**에이전트 역할**](docs/06-agents/agent-roles.md) - Ingestor, linker, reviewer: one job per agent
- [**실행 일정 관리**](docs/06-agents/scheduled-maintenance.md) - Scheduled runs that file, link and report while you sleep
- [**서브에이전트와 병렬 작업**](docs/06-agents/subagents.md) - Subagents with their own context for parallel reading
- [**훅**](docs/06-agents/hooks.md) - Hooks for the rules a prompt instruction will eventually forget
- [**스킬과 슬래시 명령어**](docs/06-agents/skills-and-commands.md) - Skills vs slash commands, and when to use each
- [**안전장치**](docs/06-agents/safety-and-guardrails.md) - What the agent may touch, and the walls that hold when it is wrong

#### [검색](docs/07-retrieval/README.md) <sub>세컨드 브레인 07</sub>
- [**볼트에 질문하기**](docs/07-retrieval/asking-questions.md) - Answers grounded in your pages, not the model's memory
- [**질문 패턴**](docs/07-retrieval/query-patterns.md) - The questions a vault answers better than a search engine
- [**검색 도구**](docs/07-retrieval/search-tools.md) - Grep, ripgrep and Obsidian search: almost always enough
- [**필요할 때 RAG 추가하기**](docs/07-retrieval/rag-on-top.md) - The threshold where adding RAG starts to pay
- [**컨텍스트 예산**](docs/07-retrieval/context-budget.md) - Why reading more pages makes answers worse, and the budget rules

#### [결과물](docs/08-outputs/README.md) <sub>세컨드 브레인 08</sub>
- [**볼트를 바탕으로 글쓰기**](docs/08-outputs/writing-from-the-vault.md) - Write from research that is already done, cited and linked
- [**리서치 보고서**](docs/08-outputs/research-reports.md) - Reports for questions the vault cannot answer yet
- [**게시와 내보내기**](docs/08-outputs/publishing-and-export.md) - Publish the public part of your vault, keep the rest private
- [**볼트로 배우기**](docs/08-outputs/teaching-yourself.md) - Quizzes and review that turn saved pages into things you know

#### [유지보수](docs/09-maintenance/README.md) <sub>세컨드 브레인 09</sub>
- [**볼트 린트 검사**](docs/09-maintenance/lint-and-health.md) - Catch broken links, orphans and missing fields before they rot
- [**정기 검토 주기**](docs/09-maintenance/review-cadence.md) - Weekly and monthly reviews that keep you in the loop
- [**버전 관리**](docs/09-maintenance/versioning-with-git.md) - Every agent change as a diff you can read and revert
- [**백업과 이식성**](docs/09-maintenance/backups-and-portability.md) - The backup mistake almost everyone makes
- [**개인정보 보호**](docs/09-maintenance/privacy-and-secrets.md) - Keep secrets out of pages, prompts and public exports
- [**천 페이지 이상 확장하기**](docs/09-maintenance/scaling.md) - What strains past a thousand pages, and what to change

#### [문제 해결](docs/10-troubleshooting/README.md) <sub>세컨드 브레인 10</sub>
- [**흔히 겪는 실패**](docs/10-troubleshooting/common-failures.md) - The failures everyone hits, usually in capture, with fixes
- [**에이전트가 쓸모없는 글을 쓸 때**](docs/10-troubleshooting/agent-writes-garbage.md) - Fix pages that are on topic and useless to read
- [**깨진 링크와 고립된 페이지**](docs/10-troubleshooting/broken-links.md) - Repair broken links and orphans after agent renames
- [**볼트가 너무 커졌을 때**](docs/10-troubleshooting/vault-too-big.md) - When answers get slow and vague as the vault grows
- [**자주 묻는 질문**](docs/10-troubleshooting/faq.md) - MCP, other agents, cost, local models, Notion imports

---

### 🔴 고급

에이전트의 안정성을 높이고 성능을 측정해 배포합니다. 이어서 각 영역을 깊이 학습하며, 모든 핸드북은 짧은 실습으로 마무리됩니다.

#### [하네스](docs/course-4-harness/README.md) <sub>강좌 모듈 4</sub>
- [**에이전트의 사무실**](docs/course-4-harness/the-office.md) - 모델 성능은 주변 실행 환경에 좌우됩니다
- [**네 겹의 계층**](docs/course-4-harness/the-four-rings.md) - 격리·가이드·감지·권한을 외부부터 구축
- [**하네스 실습**](docs/course-4-harness/harness-practice.md) - 실제 코딩 에이전트를 단계적으로 강화

#### [평가](docs/course-5-evals/README.md) <sub>강좌 모듈 5</sub>
- [**두 가지 검증 방식**](docs/course-5-evals/two-kinds-of-checks.md) - 실행 추적의 동작 검증과 종단 간 평가
- [**평가자와 골든 세트**](docs/course-5-evals/judges-and-golden-sets.md) - 신뢰할 수 있는 LLM 평가자와 실패를 포함한 골든 세트
- [**평가 실습**](docs/course-5-evals/evals-practice.md) - 반나절 만에 최소 평가 모음 구축

#### [프로덕션](docs/course-6-production/README.md) <sub>강좌 모듈 6</sub>
- [**프로토타입에서 프로덕션으로**](docs/course-6-production/from-prototype.md) - What changes when other people, or a 3am scheduler, depend on it
- [**에이전트 운영**](docs/course-6-production/operating-agents.md) - What it is doing, what it costs, what it could break
- [**첫날 실행 계획**](docs/course-6-production/day-one-plan.md) - The whole course compressed into one working day

#### [지식 그래프](docs/track-graph/README.md) <sub>핸드북 T1</sub>
- [**지식 그래프가 필요한 이유**](docs/track-graph/why-graphs.md) - 사실 사이의 관계를 그래프로 보존
- [**GraphRAG**](docs/track-graph/graphrag.md) - GraphRAG 작동 원리와 도입 시점
- [**LLM으로 그래프 만들기**](docs/track-graph/building-graphs-with-llms.md) - LLM을 활용한 엔터티·관계 추출
- [**그래프 저장소**](docs/track-graph/graph-stores.md) - 일반 텍스트부터 그래프 저장 방식 비교
- [**도구**](docs/track-graph/tools.md) - The graph tooling landscape, September 2026
- [**실습: 그래프 추출**](docs/track-graph/build-extract.md) - 실습 1: 볼트에서 그래프 추출
- [**실습: 그래프 질의**](docs/track-graph/build-query.md) - 실습 2: 그래프 질의
- [**실습: 루프에 그래프 적용**](docs/track-graph/build-use.md) - 실습 3: 에이전트 루프에 통합
- [**참고 자료**](docs/track-graph/resources.md) - Papers, repos and tools, checked September 2026

#### [Jev 엔지니어링](docs/track-jev/README.md) <sub>핸드북 T2</sub>
- [**System One 모델**](docs/track-jev/system-one-models.md) - 텍스트 대신 타입이 지정된 결정을 반환하는 소형 모델
- [**Jev의 활용 사례**](docs/track-jev/what-jev-is-good-for.md) - 스키마에서 답을 선택하는 작업
- [**에이전트에서 Jev 활용**](docs/track-jev/jev-in-an-agent-stack.md) - LLM 옆에서 작은 의사결정을 수행하는 Jev
- [**Jev 시작하기**](docs/track-jev/getting-started.md) - Access, the API shape and a realistic first project
- [**실습: 결정 엔드포인트**](docs/track-jev/build-decision-endpoint.md) - Build 1: a typed decision endpoint
- [**실습: 신뢰도 기반 라우터**](docs/track-jev/build-router.md) - Build 2: a confidence-gated router
- [**실습: Jev 교체**](docs/track-jev/build-swap-in-jev.md) - Build 3: swap Jev in behind the same contract
- [**Jev 참고 자료**](docs/track-jev/resources.md) - Links on Jev and System One models

#### [에이전트 하네스](docs/track-harness/README.md) <sub>핸드북 T3</sub>
- [**하네스란 무엇인가**](docs/track-harness/what-a-harness-is.md) - 루프·도구·프롬프트·권한 등 모델 주변 구성
- [**하네스로서의 Claude Code**](docs/track-harness/claude-code-as-harness.md) - Claude Code and the Agent SDK as a reference harness
- [**컨텍스트 엔지니어링**](docs/track-harness/context-engineering.md) - What the model sees at each step, and why
- [**도구와 MCP**](docs/track-harness/tools-and-mcp.md) - Tool design and MCP, where agents quietly fail
- [**하네스 생태계**](docs/track-harness/harness-landscape.md) - The harnesses alive in September 2026, one honest take each
- [**실습: 루프**](docs/track-harness/build-the-loop.md) - Build 1: an agent loop in about seventy lines of Python
- [**실습: 권한과 컨텍스트**](docs/track-harness/build-guardrails.md) - Build 2: permissions and context limits
- [**실습: 프레임워크 전환**](docs/track-harness/build-graduate.md) - Build 3: when to move to a real framework
- [**참고 자료**](docs/track-harness/resources.md) - Harness reading, checked September 2026

#### [루프 엔지니어링](docs/track-loop/README.md) <sub>핸드북 T4</sub>
- [**루프 엔지니어링이란**](docs/track-loop/what-loop-engineering-is.md) - 에이전트를 실행하는 제어 시스템
- [**종료 조건**](docs/track-loop/stop-conditions.md) - 실제 성공 없이 완료를 보고하지 않도록 종료 조건 설정
- [**비평가와 검증**](docs/track-loop/critics-and-verification.md) - 모델 외부에서 결과를 검증하는 평가자
- [**컨텍스트 관리**](docs/track-loop/context-hygiene.md) - 매 시도마다 새 컨텍스트를 사용하는 이유
- [**패턴**](docs/track-loop/patterns.md) - 다섯 가지 루프 패턴과 실패 양상
- [**실습: 목표 검사**](docs/track-loop/build-goal-test.md) - Build 1: define done as a script
- [**실습: 비평가**](docs/track-loop/build-critic.md) - Build 2: add a critic pass
- [**실습: 야간 루프**](docs/track-loop/build-overnight.md) - Build 3: an overnight loop you can trust by morning
- [**참고 자료**](docs/track-loop/resources.md) - Loop engineering reading

#### [평가 엔지니어링](docs/track-evals/README.md) <sub>핸드북 T5</sub>
- [**평가가 필요한 이유**](docs/track-evals/why-evals.md) - AI 제품을 검증하는 테스트
- [**평가 설계**](docs/track-evals/designing-evals.md) - 실패 유형에서 테스트 사례 도출
- [**평가자로서의 LLM**](docs/track-evals/llm-as-judge.md) - 모델을 평가자로 쓸 때와 평가자 검증 방법
- [**에이전트 평가**](docs/track-evals/agent-evals.md) - 최종 답변뿐 아니라 실행 경로도 평가
- [**평가 도구**](docs/track-evals/tooling.md) - Eval platforms, frameworks and CLIs worth knowing
- [**실습: 실행 기록**](docs/track-evals/build-traces.md) - Build 1: from traces to a golden set
- [**실습: 평가 모음**](docs/track-evals/build-suite.md) - Build 2: a runnable suite in one Python file
- [**실습: 게이트**](docs/track-evals/build-ci.md) - Build 3: gate every pull request in GitHub Actions
- [**평가 참고 자료**](docs/track-evals/resources.md) - A short eval reading list

---

## 도구 모음

#### [에이전트 강좌 플러그인](plugins/README.md) <sub>저장소 안에서 각 모듈의 실습을 수행하는 도구</sub>

```bash
claude plugin marketplace add undefined-ui/second-brain-os
claude plugin install agents-course@second-brain-os
```

- [**context-audit**](plugins/agents-course/skills/context-audit/SKILL.md) - Measure the four places, find cache killers and window bloat
- [**goal-test**](plugins/agents-course/skills/goal-test/SKILL.md) - Turn a task into a testable done, with the script and a bounded loop
- [**gate-check**](plugins/agents-course/skills/gate-check/SKILL.md) - Find the decisions that do not need the big model
- [**harness-audit**](plugins/agents-course/skills/harness-audit/SKILL.md) - Walk the four rings, state the blast radius, rank the fixes
- [**evals-bootstrap**](plugins/agents-course/skills/evals-bootstrap/SKILL.md) - Mine real failures into cases and generate the trace checker
- [**loop-critic**](plugins/agents-course/agents/loop-critic.md) - An agent that reviews loop results in a clean context

#### [스킬](skills/README.md) <sub>세컨드 브레인, 워크플로당 하나</sub>
- [**second-brain-ingest**](skills/second-brain-ingest/SKILL.md) - 원본 자료를 연결된 위키 페이지로 변환
- [**second-brain-backfill**](skills/second-brain-backfill/SKILL.md) - 대규모 자료를 체크포인트 단위로 가져오기
- [**second-brain-chat-import**](skills/second-brain-chat-import/SKILL.md) - 대화 기록을 분류하되 개인정보를 먼저 점검
- [**second-brain-transcript**](skills/second-brain-transcript/SKILL.md) - 수집 전 원본 전사문 정리
- [**second-brain-lint**](skills/second-brain-lint/SKILL.md) - Find and repair broken links, orphans, stubs and bad frontmatter
- [**second-brain-merge**](skills/second-brain-merge/SKILL.md) - 주장과 링크를 보존하면서 중복 페이지 병합
- [**second-brain-rename**](skills/second-brain-rename/SKILL.md) - 페이지 이름과 모든 인바운드 링크 수정
- [**second-brain-graph**](skills/second-brain-graph/SKILL.md) - Report the graph's shape: orphans, hubs, bridges, clusters
- [**second-brain-metrics**](skills/second-brain-metrics/SKILL.md) - Dated health snapshots so trends are visible
- [**second-brain-query**](skills/second-brain-query/SKILL.md) - 볼트 페이지를 근거로 출처를 제시하며 답변
- [**second-brain-changed-my-mind**](skills/second-brain-changed-my-mind/SKILL.md) - Trace where your recorded position has shifted
- [**second-brain-report**](skills/second-brain-report/SKILL.md) - Research reports with gaps, citations and disagreements
- [**second-brain-write**](skills/second-brain-write/SKILL.md) - Draft from your concept pages, citations kept
- [**second-brain-quiz**](skills/second-brain-quiz/SKILL.md) - 저장만 하고 학습하지 않은 내용 확인
- [**second-brain-review**](skills/second-brain-review/SKILL.md) - The periodic review: what grew, what conflicts, what is open
- [**second-brain-project**](skills/second-brain-project/SKILL.md) - 전용 CLAUDE.md가 있는 프로젝트 파이프라인 구성
- [**second-brain-publish**](skills/second-brain-publish/SKILL.md) - Check what would leak before anything is published
- [**second-brain-privacy**](skills/second-brain-privacy/SKILL.md) - 볼트에서 인증 정보와 비공개 자료 탐색

#### [서브에이전트](agents/README.md) <sub>세컨드 브레인, 그중 네 개는 읽기 전용</sub>
- [**ingestor**](agents/ingestor.md) - raw/의 새 자료를 연결된 위키 페이지로 처리
- [**linker**](agents/linker.md) - 기존 페이지 사이의 누락된 연결 추가
- [**researcher**](agents/researcher.md) - Answers a question that spans many pages and flags what is missing. Read-only
- [**reviewer**](agents/reviewer.md) - Writes the periodic review of what the vault learned. Read-only
- [**graph-analyst**](agents/graph-analyst.md) - Reports graph metrics, hubs, bridges and clusters. Read-only
- [**curator**](agents/curator.md) - Proposes what to prune, archive or merge, never acts. Read-only

#### [슬래시 명령어](commands/README.md) <sub>세컨드 브레인, 72개</sub>
스킬을 실행하는 명령어는 수집·구조화·그래프·검색·유지보수·출력·프로젝트·안전·설정의 9개 그룹으로 구성됩니다. `/ingest`, `/ask`, `/lint`, `/review`부터 사용하세요.

#### [스크립트](scripts/README.md) <sub>외부 의존성 없는 Python</sub>
- [**link_check.py**](scripts/link_check.py) - Broken wikilinks, orphan pages, stubs
- [**vault_stats.py**](scripts/vault_stats.py) - Page counts, link density, orphan rate, most-linked pages
- [**graph_export.py**](scripts/graph_export.py) - The wikilink graph as CSV edges or GraphML for Gephi
- [**chat_export_to_md.py**](scripts/chat_export_to_md.py) - 대화 기록을 대화별 마크다운으로 변환

#### [시작용 볼트](vault-template/)
- [**vault-template/**](vault-template/) - `CLAUDE.md` with page contracts and linking rules, the `raw/` to `wiki/` layout, a project pipeline and four page templates

---

## 참고 자료

모든 자료를 망라하기보다 유용한 자료를 엄선했습니다. 필터링 가능한 전체 목록은 [웹의 자료실](https://secondbrainos.dev/resources.html)에, 항목별 설명은 [`resources/`](resources/README.md)에 있습니다.

#### 주제별 읽을거리
- [**Agent harnesses**](docs/track-harness/resources.md) - Harness reading, checked September 2026
- [**Loop engineering**](docs/track-loop/resources.md) - Long-running loops, critics and stop conditions
- [**Eval engineering**](docs/track-evals/resources.md) - A short eval reading list where everything earns its place
- [**Knowledge graphs**](docs/track-graph/resources.md) - Papers, repos and tools, checked September 2026
- [**Jev and System One models**](docs/track-jev/resources.md) - Links on decision models, checked a week after Jev launched

#### 그래프·RAG·메모리 <sub>2026년 9월 기준 별 수</sub>
- [**Graphify**](https://github.com/Graphify-Labs/graphify) - 모든 폴더에서 그래프 구축 · 116K
- [**LightRAG**](https://github.com/HKUDS/LightRAG) - 증분 업데이트를 지원하는 그래프 RAG · 39K
- [**microsoft/graphrag**](https://github.com/microsoft/graphrag) - GraphRAG 참조 구현 · 36K
- [**nano-graphrag**](https://github.com/gusye1234/nano-graphrag) - The same pipeline in readable code · 4.0K
- [**HippoRAG**](https://github.com/OSU-NLP-Group/HippoRAG) - 지식 그래프 기반 다중 홉 검색 · 4.0K
- [**Awesome-GraphRAG**](https://github.com/DEEP-PolyU/Awesome-GraphRAG) - The landscape in one list · 2.6K
- [**mem0**](https://github.com/mem0ai/mem0) - 에이전트용 메모리 · 65K
- [**graphiti**](https://github.com/getzep/graphiti) - 시간 기반 지식 그래프 · 31K
- [**cognee**](https://github.com/topoteretes/cognee) - 그래프와 벡터 메모리 · 31K
- [**awesome-mcp-servers**](https://github.com/punkpeye/awesome-mcp-servers) - MCP 서버 목록 · 95K

#### 세컨드 브레인: 여기서 시작하기
- [**Karpathy's llm-wiki gist**](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) - The pattern the project builds on, 4 April 2026. Read it first
- [**From Local to Global: GraphRAG**](https://arxiv.org/abs/2404.16130) - Why chunk retrieval fails on questions about a whole corpus
- [**HippoRAG**](https://arxiv.org/abs/2405.14831) - Graph retrieval with personalised PageRank, the closest analogue of an agent walking links
- [**Lost in the Middle**](https://arxiv.org/abs/2307.03172) - The evidence for keeping context small, and the basis for the [context budget](docs/07-retrieval/context-budget.md)
- [**Andy Matuschak's notes**](https://notes.andymatuschak.org) - Evergreen notes, and the strongest argument against delegating the writing
- **How to Take Smart Notes** (Ahrens) and **Building a Second Brain** (Forte) - Zettelkasten and PARA, the methods an agent now does the upkeep for

#### 세컨드 브레인: Obsidian 플러그인 <sub>2026년 9월 기준 설치 수</sub>
- [**Claudian**](https://github.com/yishentu/claudian) - 편집기 안의 에이전트 · 2.0M
- [**Copilot**](https://github.com/logancyang/obsidian-copilot) - 편집기 안의 에이전트 · 1.8M
- [**Smart Connections**](https://github.com/brianpetro/obsidian-smart-connections) - 링크 추천 · 1.2M
- [**Local REST API with MCP**](https://github.com/coddingtonbear/obsidian-local-rest-api) - MCP를 통한 볼트 접근 · 712K
- [**Dataview**](https://github.com/blacksmithgu/obsidian-dataview) - 프런트매터 기반 질의 · 4.9M
- [**Templater**](https://github.com/SilentVoid13/Templater) - 템플릿 · 5.5M
- [**Git**](https://github.com/Vinzent03/obsidian-git) - 버전 관리 · 3.1M
- [**Importer**](https://github.com/obsidianmd/obsidian-importer) - Migrating in from other apps · 1.6M
- [**Find unlinked files**](https://github.com/Vinzent03/find-unlinked-files) - Broken links and orphans · 225K
- [**Spaced Repetition**](https://github.com/st3v3nmw/obsidian-spaced-repetition) - Flashcards from your notes · 592K
- [**ExcaliBrain**](https://github.com/zsviczian/excalibrain) - A structured mind map · 336K
- [**Juggl**](https://github.com/HEmile/juggl) - 인터랙티브 그래프 · 136K

#### 세컨드 브레인: 다른 구현 사례 <sub>2026년 9월 기준 별 수</sub>
- [**AgriciDaniel/claude-obsidian**](https://github.com/AgriciDaniel/claude-obsidian) - 16 skills, 3 subagents, role presets · 14.7K
- [**Astro-Han/karpathy-llm-wiki**](https://github.com/Astro-Han/karpathy-llm-wiki) - 1 skill covering ingest, compile, query and lint · 2.2K
- [**ballred/obsidian-claude-pkm**](https://github.com/ballred/obsidian-claude-pkm) - 13 skills, 4 subagents, a full starter kit · 1.9K
- [**coleam00/second-brain-starter**](https://github.com/coleam00/second-brain-starter) - 1 skill that interviews you first · 768
- [**NicholasSpisak/second-brain**](https://github.com/NicholasSpisak/second-brain) - 4 skills with an npm installer · 704
- [**eugeniughelbur/obsidian-second-brain**](https://github.com/eugeniughelbur/obsidian-second-brain) - 47 commands across three agents
- [**micuintus/llm-wiki**](https://github.com/micuintus/llm-wiki) - 1 skill, deliberately minimal
- Where the skill format itself is defined: [anthropics/skills](https://github.com/anthropics/skills), [obra/superpowers](https://github.com/obra/superpowers) and the [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) index of 1,000+

#### 세컨드 브레인: Obsidian 외부 도구
[Web Clipper](https://obsidian.md/clipper) for capture,
[Claude Code](https://code.claude.com/docs/en/setup) for maintenance,
[yt-dlp](https://github.com/yt-dlp/yt-dlp) and
[OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) for processing,
[ripgrep](https://github.com/BurntSushi/ripgrep),
[NetworkX](https://networkx.org), [Ladybug](https://github.com/LadybugDB/ladybug) and
[Gephi](https://gephi.org) for the graph, and
[Quartz](https://github.com/jackyzha0/quartz) to publish.

---

## 세컨드 브레인의 작동 원리

```
   you                    raw/                 agent                 wiki/
 ┌───────┐          ┌──────────────┐      ┌────────────┐      ┌──────────────┐
 │ clip  │  ──────> │ articles     │ ───> │  ingest    │ ───> │ sources/     │
 │ save  │          │ transcripts  │      │  extract   │      │ concepts/    │
 │ dump  │          │ pdfs         │      │  link      │      │ entities/    │
 └───────┘          │ chat exports │      │  lint      │      │ synthesis/   │
                    └──────────────┘      └────────────┘      └──────────────┘
                                                │                     │
                                                │   ask anything      │
                                                └─────────────────────┘
```

원본 자료는 아카이브이며, 실제 결과물은 위키입니다. 위키는 이해하기 쉬운 언어로 한 페이지에 한 가지 개념을 담고 촘촘하게 연결됩니다. 새로운 출처는 문서를 무작정 늘리는 대신 기존 문서를 갱신하므로, 볼트는 커질수록 더 유용해집니다. 위키 옆에는 프로젝트별 `CLAUDE.md`가 있는 프로젝트 계층이 있습니다. 위키는 **알고 있는 것**, 프로젝트는 **진행 중인 일**을 담습니다. 두 영역을 분리하는 이유는 [두 계층](docs/01-concepts/two-layers.md)을 참고하세요.

이 프로젝트의 세 가지 핵심 원칙은 다음과 같습니다.

- **연결되기 전에는 수집이 완료된 것이 아닙니다.** 고립된 문서는 금세 찾기 어려워지므로 같은 실행 과정에서 링크를 만들어야 합니다.
- **모순은 덮어쓰지 않고 기록합니다.** 상반된 주장도 날짜와 출처를 함께 남깁니다. 무엇을 왜 믿었는지에 대한 기록은 검색 엔진과 구별되는 볼트의 강점입니다.
- **필요해질 때까지 벡터 데이터베이스를 사용하지 않습니다.** 구조화된 페이지와 링크로 청크 유사도 검색이 답하지 못하는 질문을 별도 인프라 비용 없이 해결할 수 있습니다. 도입 기준은 [RAG가 필요한 시점](docs/07-retrieval/rag-on-top.md)을 참고하세요.

---

## 기여하기

오류 수정과 자료 및 실제 사례의 기여를 환영합니다. 먼저 [CONTRIBUTING.md](CONTRIBUTING.md)를 읽어 주세요. 사실 주장은 1차 출처가 필요하며, 도구 목록에는 선정 이유가 있어야 합니다.

## 라이선스 및 출처

MIT 라이선스입니다. 에이전트 강좌는 Google의 에이전트 백서를 바탕으로 합니다. 세컨드 브레인 프로젝트는 Andrej Karpathy가 2026년 4월 4일 공개한 [Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)의 LLM 위키 패턴을 구현하고, 원문에서 정의하지 않은 부분도 보완합니다.

<!-- 공개 전 TODO:
     - 원본 기사 링크 추가
     - 스크린샷: 30일 차 그래프 보기, 개념 페이지 예시
     - Settings -> General에서 소셜 미리보기 이미지 추가 -->
