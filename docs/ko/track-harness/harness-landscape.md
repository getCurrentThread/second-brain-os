# 하네스 지형도

2026년 9월 현재 살아 있는 것들을 훑어보고, 각각에 솔직한 평가를 하나씩 붙입니다. 모두 [하네스란 무엇인가](what-a-harness-is.md)에서 설명한 것과 같은 루프를 돌립니다. 다른 점은 루프 둘레에 장치를 얼마나 두르는지, 그리고 누구의 설계 방침을 물려받는지입니다.

<a id="the-main-options"></a>

## 주요 선택지

- **[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)** (Anthropic, Python/TS). 라이브러리로 만든 Claude Code 루프입니다. 권한, 훅, 서브에이전트, 스킬, 압축이 모두 들어 있습니다. 통째로 채택할 수 있는 가장 완성도 높은 하네스이며, 대가는 Anthropic의 설계 방침을 따라야 하고 그 안에서 가장 잘 일하는 것도 Anthropic 모델이라는 점입니다. 자세한 내용은 [하네스로서의 Claude Code](claude-code-as-harness.md)에 있습니다.

- **[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)** (Python, TS는 뒤처짐). 가볍습니다. 에이전트, 인수인계, 가드레일, 세션을 제공합니다. 2026년 4월 업데이트에서 네이티브 샌드박싱과, GPT-5급 모델에 맞춰 튜닝한 "모델 네이티브 하네스"가 추가되었습니다. 더 큰 [AgentKit](https://openai.com/index/introducing-agentkit/) 묶음의 일부이며, 끌어다 놓는 방식의 Agent Builder는 2026년 11월에 폐기될 예정이니 캔버스가 아니라 SDK에 거십시오.

- **[LangGraph](https://www.langchain.com/langgraph)** (LangChain, Python/JS). 에이전트를 명시적인 상태 그래프로 다룹니다. 2025년 말부터 1.0이며, 내구성 있는 실행과 사람 개입(human-in-the-loop) 인터럽트를 지원합니다. 프로덕션에서 검증되었고, 그만큼 무겁습니다. 유명해서가 아니라 감사할 수 있는 제어 흐름이 필요할 때 고르십시오.

- **[Vercel AI SDK 6](https://ai-sdk.dev)** (TypeScript). 스트리밍 툴킷에서 진짜 하네스로 올라섰습니다. `ToolLoopAgent`, 도구 승인, 완전한 MCP 지원이 있습니다. 에이전트가 웹 제품 안에 있을 때의 합리적인 기본값입니다. 릴리스 노트: [AI SDK 6](https://vercel.com/blog/ai-sdk-6).

- **[smolagents](https://github.com/huggingface/smolagents)** (Hugging Face, Python). 핵심이 약 1,000줄이며, 에이전트가 JSON 도구 호출 대신 Python 코드를 행동으로 씁니다. 동작하는 루프에 가장 빨리 닿는 길이고, 배우기에 가장 좋은 코드베이스입니다. 설계상 프로덕션 관심사는 얕게 다룹니다.

- **[OpenHands](https://github.com/OpenHands/OpenHands)** (옛 OpenDevin. 조직이 All-Hands-AI에서 OpenHands로 옮겼습니다). 오픈소스 자율 소프트웨어 엔지니어링입니다. 샌드박스 런타임, 브라우저, [openhands.dev](https://www.openhands.dev/)의 클라우드 플랫폼이 있습니다. 완전히 샌드박스화된 코딩 하네스가 어떤 모습인지 보여 주는 기준점이며, CLI보다 자체 호스팅이 무겁습니다.

- **[pi](https://github.com/earendil-works/pi)** (Mario Zechner, 옛 badlogic/pi-mono, 현재 Earendil 소속. 문서는 [pi.dev](https://pi.dev)). 일부러 최소한으로 만든 터미널 하네스로, 설정이 난립하는 대신 TypeScript로 확장합니다. Databricks 벤치마크에서 더 무거운 하네스를 통과율로 앞섰고, 턴당 보내는 컨텍스트는 약 3분의 1이었습니다. 미니멀리즘이 곧 [컨텍스트 엔지니어링](context-engineering.md)이라는 사례이며, 하네스가 숫자를 움직인다는 증거입니다.

- **[Pydantic AI](https://ai.pydantic.dev)** (Python). 검증 라이브러리를 만든 사람들의 타입 안전 에이전트입니다. 가장 좋은 의미에서 무난합니다. 구조화된 출력이 일의 전부일 때 강력한 선택입니다.

<a id="how-to-choose"></a>

## 고르는 법

Claude 위에서 만든다면 Agent SDK. TypeScript 웹 제품이면 Vercel AI SDK. 명시적인 워크플로 제어가 필요하면 LangGraph. 배우려면 smolagents, 그다음 pi의 소스. 자율 코딩 인프라는 OpenHands. 대부분의 팀에 필요한 것은 하네스 하나와 그것을 잘 먹이는 규율이지, 프레임워크 순례가 아닙니다.
