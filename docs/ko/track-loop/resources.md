# 자료

먼저 주의 사항이 있습니다. "loop engineering"이라는 말은 2026년 6월에 만들어졌고, 이 페이지를 쓰는 지금 석 달밖에 되지 않았습니다. 밑바탕의 실천은 이름보다 단단합니다. Steinberger 본인도 7월 중순에 이미 대화가 루프에서 그래프로 옮겨 갔는지를 묻고 있었습니다. 원리를 얻으려고 읽고, 용어는 느슨하게 쥐십시오.

<a id="the-naming"></a>

## 이름이 붙기까지

- [Peter Steinberger's post](https://x.com/steipete/status/2063697162748260627) — 2026년 6월에 퍼진 문장: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."
- [Loop Engineering](https://www.oreilly.com/radar/loop-engineering/) — O'Reilly Radar에 전재된 Addy Osmani의 에세이. 자동화, 워크트리, 스킬, 커넥터, 서브에이전트, 외부 상태라는 해부도를 그리고, 검증 부담과 이해 부채에 대한 솔직한 경고로 마무리합니다.
- [Code review in the age of AI](https://addyosmani.com/blog/code-review-ai/) — Osmani의 짝이 되는 글. "your job is to ship code you confirmed works"는 영어로 아홉 단어에 이 핸드북을 담았습니다.
- [What is loop engineering?](https://www.ibm.com/think/topics/loop-engineering) — IBM의 주제 페이지. 차분한 기관의 정의로서 쓸모 있고, 위험(이해 부채, 의도 부채, 인지적 항복)에 강합니다.

<a id="papers"></a>

## 논문

- [Stop Hand-Holding Your Coding Agent](https://arxiv.org/pdf/2607.00038) — Sandeco Macedo. 학술적 논의로, 종료 조건과 검증, 크리틱 구성 요소를 루프의 1급 인프라로 다룹니다.
- [Less Context, Better Agents](https://arxiv.org/pdf/2606.10209) — 장기 작업을 하는 도구 사용 에이전트를 위한 효율적인 컨텍스트 엔지니어링. [컨텍스트 위생](context-hygiene.md)이 주장하는 솎아 내기를 측정으로 뒷받침합니다.

<a id="anthropic-material"></a>

## Anthropic 자료

- [Managing context on the Claude Developer Platform](https://claude.com/blog/context-management) — 컨텍스트 편집과 메모리 도구, 그리고 이 핸드북이 인용한 수치. 100턴 평가에서 토큰 84% 절감, 편집만으로 29%, 결합하면 39%.
- 하네스 핸드북의 [자료 페이지](../track-harness/resources.md)에는 나머지 Anthropic 정전(building effective agents, effective context engineering)이 있으며, 이 핸드북은 이를 되풀이하지 않고 전제로 삼습니다.

<a id="practice"></a>

## 실천

- [Ralph Wiggum as a "software engineer"](https://ghuntley.com/ralph/) — Geoffrey Huntley. 모든 것의 시작이 된 bash 루프이며, 드물게 솔직한 실패 기록이 있습니다.
- [Designing agentic loops](https://simonwillison.net/2025/Sep/30/designing-agentic-loops/) — Simon Willison, 2025년 9월. 어떤 작업이 루프에 잘 맞는지, 그리고 루프를 돌려 둘 때의 보안 자세.

<a id="repos-worth-reading"></a>

## 읽어 볼 만한 저장소

- [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) — 프로덕션에서 살아남는 에이전트를 위한 원칙. 여러 요소가 이름만 다른 루프 규율입니다.
- [anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md) — `ralph-wiggum` 플러그인: 루프로 계속 돌리기 패턴을 관리되고 들여다볼 수 있는 코드로 만든 것.
- [vercel-labs/ralph-loop-agent](https://github.com/vercel-labs/ralph-loop-agent) — 같은 패턴을 AI SDK 위에 다시 만든 것으로, 검증과 반복을 명시적으로 드러냅니다.

<a id="start-here"></a>

## 여기서 시작

1. **목표 테스트를 하나 쓰십시오.** 계속 손으로 프롬프트하는 작업을 하나 골라, 완료를 0으로 종료하는 스크립트로 표현하십시오. 쓸 수 없다면 [루프 엔지니어링이란](what-loop-engineering-is.md)에서 말한 대로 아직 루프 후보가 아닙니다.
2. **재시도 루프를 만드십시오.** 실패하는 테스트가 있는 작은 저장소에서 [실습: 목표 테스트](build-goal-test.md)를 따라 해 보십시오. 하룻저녁이면 됩니다.
3. **판정자를 더하고, 그다음 가드레일을 더하십시오.** 크리틱 패스, 그다음 래칫과 보고서. 그리고 루프가 매번 알아보기 쉽게 멈추게 된 뒤에야 자는 동안 돌리십시오.
