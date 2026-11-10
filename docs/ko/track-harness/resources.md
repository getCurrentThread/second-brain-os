# 자료

엄선했을 뿐 전부를 다루지는 않습니다. 여기 있는 것은 모두 2026년 9월에 확인했고, 실릴 만해서 실렸습니다. 용어를 익히려면 [하네스란 무엇인가](what-a-harness-is.md)와 함께 읽으십시오.

<a id="foundational-posts"></a>

## 기초가 되는 글

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — Anthropic, 2024년 12월. 여전히 가장 명료한 분류입니다. 워크플로 대 에이전트, 그리고 모두가 인용하지만 따르는 사람은 드문 조언인 "단순하게 시작하라"가 담겨 있습니다.
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic. [컨텍스트 엔지니어링](context-engineering.md)에서 다룬 분야에 이름을 붙인 글입니다.
- [Context engineering for AI agents: lessons from building Manus](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus) — 프로덕션에서 겪으며 얻은 쓰라린 교훈들: KV 캐시 경제학, 추가만 하는 컨텍스트, 도구를 제거하는 대신 마스킹하기.
- [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — [도구와 MCP](tools-and-mcp.md)의 짝이 되는 도구 설계 글.

<a id="deep-guides-and-talks"></a>

## 깊이 있는 가이드와 강연

- [How to build an agent](https://ampcode.com/notes/how-to-build-an-agent) — Thorsten Ball. 400줄이 채 안 되는 Go로 만든 코드 편집 에이전트. 어떤 프레임워크든 채택하기 전에 해 보십시오. 이만큼 빨리 신비를 걷어 내는 것은 없습니다.
- [12-factor agents](https://github.com/humanlayer/12-factor-agents) — HumanLayer. 프로덕션에서 살아남는 에이전트의 원칙: 프롬프트를 직접 소유하고, 컨텍스트 윈도를 직접 소유하고, 작고 집중된 에이전트를 쓰라.
- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — Anthropic. 오케스트레이터-워커 패턴, 그리고 멀티 에이전트는 토큰을 약 15배 태운다는 솔직한 인정.
- [Context rot](https://www.trychroma.com/research/context-rot) — Chroma. 윈도가 차기 한참 전부터 입력이 늘수록 모델 성능이 떨어진다는 증거.
- [The lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) — Simon Willison. 신뢰할 수 없는 콘텐츠를 읽는 모든 에이전트를 위한 보안 틀. 그가 계속 쓰는 블로그는 에이전트 전반에 대한 가장 좋은 연속 논평입니다.
- [The 2026-07-28 MCP specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/) — MCP가 상태 없는 방식으로 바뀔 때 무엇이 달라졌는지, 프로토콜 팀이 설명합니다.

- [Improved token efficiency](https://cursor.com/blog/improved-token-efficiency) — Cursor. 여섯 단계로 슬림해진 프로덕션 하네스: 모델이 나아지면서 시스템 프롬프트의 3분의 2 삭제, 도구를 필요할 때 로드(정적 도구 토큰의 60% 제거), 명시적 캐시 브레이크포인트, 더 성긴 줄 번호, 서브에이전트 규율. 변경마다 숫자가 붙은 드문 글입니다. [이 재현 프롬프트](https://x.com/undefinedKi/status/2103219508605555033)는 같은 감사를 자신의 환경에 적용합니다.

- [Palantir AIP architecture](https://www.palantir.com/docs/foundry/architecture-center/aip-architecture) — 실제로 엄격히 통제된 조직 안에서 돌아가는 플랫폼의 에이전트 스택으로, 대부분은 작은 프로젝트에도 그대로 옮길 수 있습니다. 원시 데이터 접근 대신 타입이 있는 객체와 허용된 행동으로 이뤄진 온톨로지, 모든 모델 호출 앞의 단일 게이트웨이(마스킹, 캐싱, 재시도, 토큰 집계), 설정 뒤에서 바꿔 끼울 수 있는 모델, 세 가지 트리거(스케줄, 이벤트, API), 릴리스 주기 안에 든 평가(eval), 모든 행동의 트레이스. [이 분석](https://x.com/undefinedKi/status/2103883647501652057)은 각 요소를 집에서 쓸 만한 도구에 대응시킵니다.

<a id="repos-worth-reading"></a>

## 읽어 볼 만한 저장소

- [pi](https://github.com/earendil-works/pi) — 실제로 읽을 수 있을 만큼 작은 완전한 하네스. 루프, 도구, 확장이 허례 없이 들어 있습니다.
- [smolagents](https://github.com/huggingface/smolagents) — 코드를 행동으로 쓰는 패턴을 핵심 약 1,000줄에 담았습니다.
- [OpenHands](https://github.com/OpenHands/OpenHands) — 샌드박스 런타임과 이벤트 스트림이 프로덕션 규모에서 어떤 모습인지 보여 줍니다.
- [Claude Code docs](https://code.claude.com/docs/en/overview) — 저장소는 아니지만 참조 하네스의 매뉴얼입니다. [훅 레퍼런스](https://code.claude.com/docs/en/hooks)만으로도 생명주기 설계 공부가 됩니다.

<a id="start-here"></a>

## 여기서 시작하기

1. **벌거벗은 루프를 만드십시오.** 원하는 언어로 Thorsten Ball의 튜토리얼을 따라 하십시오. 오후 한나절이면 되고, 프레임워크 문서를 읽는 눈이 영구히 달라집니다.
2. **글 두 편을 읽으십시오.** Building effective agents, 그다음 effective context engineering. 둘을 합하면 앞으로 마주칠 판단의 80%를 다룹니다.
3. **하네스 하나를 채택하고 계측하십시오.** [지형](harness-landscape.md)에서 하나를 고르고, 실제 작업을 연결하고, 모든 실패의 원본 트랜스크립트를 읽으십시오. 트랜스크립트가 곧 교과 과정이며, 이 핸드북의 모든 것이 거기에 보입니다.
