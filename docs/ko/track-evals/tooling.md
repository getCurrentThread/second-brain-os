# 평가 도구

시장은 두 갈래로 굳어졌습니다. 평가(eval)를 중심으로 출발해 관측 가능성을 덧붙인 플랫폼, 그리고 트레이싱을 중심으로 출발해 평가를 덧붙인 플랫폼입니다. 아래 도구는 모두 2026년 말 기준으로 살아 있고 유지보수되고 있습니다. 하나를 골라 다음 일로 넘어가십시오. [평가가 필요한 이유](why-evals.md)의 플라이휠이 벤더보다 훨씬 중요합니다.

<a id="platforms"></a>

## 플랫폼

- [Braintrust](https://www.braintrust.dev/): 평가 우선 상용 플랫폼으로, `Eval()` 루프를 중심으로 만들어졌습니다. 데이터셋, 실험, 나란히 비교하는 회귀 diff, CI 게이트를 제공합니다. 대시보드가 아니라 평가로 시작한 엔지니어링 주도 팀의 기본 선택지입니다.
- [Langfuse](https://langfuse.com/): 가장 성숙한 오픈소스 선택지입니다. OpenTelemetry 스타일 트레이싱을 오후 한나절이면 직접 호스팅할 수 있고, 그 위에 데이터셋과 LLM 판정자(LLM-as-judge) 평가가 얹혀 있습니다. 데이터 레지던시(저장 위치)나 오픈 라이선스가 양보할 수 없는 조건이라면 이것을 고르십시오.
- [LangSmith](https://www.langchain.com/langsmith): LangChain의 플랫폼입니다. LangChain/LangGraph를 쓴다면 계측은 한 줄 변경이면 되고 데이터셋 워크플로도 탄탄합니다. 쓰지 않는다면 굳이 여기로 올 이유가 거의 없습니다.
- [W&B Weave](https://weave-docs.wandb.ai/): Weights & Biases의 평가 및 트레이싱 도구입니다. 함수에 데코레이터를 붙이면 버전이 관리되는 트레이스와 평가 대시보드를 얻습니다. 조직이 이미 W&B를 쓰고 있다면 자연스러운 선택입니다.

<a id="frameworks-and-clis"></a>

## 프레임워크와 CLI

- [promptfoo](https://www.promptfoo.dev/): 오픈소스 CLI입니다. YAML로 프롬프트, 제공사, 단언을 선언하면 비교 매트릭스를 얻습니다. "어떤 프롬프트/모델이 더 나은가"에 가장 빨리 답하는 길이며, 본격적인 레드팀 모드도 있습니다. CI에서 쓰기 좋습니다.
- [Inspect](https://inspect.aisi.org.uk/): 영국 AI Security Institute의 오픈소스 Python 프레임워크입니다. 조합 가능한 솔버, 스코어러, 샌드박스 에이전트 환경을 갖추었고, [inspect_evals](https://github.com/UKGovernmentBEIS/inspect_evals)에 바로 쓸 수 있는 평가가 200개 이상 있습니다. 엄밀함을 위해 만들어졌으며 안전성 테스트 분야의 표준이고, 일반적인 [에이전트 평가](agent-evals.md)에도 매우 좋습니다.
- [OpenAI Evals](https://github.com/openai/evals): 2023년의 레지스트리 저장소는 여전히 남아 있지만, OpenAI가 지원하는 경로는 이제 API와 대시보드 안의 Evals 제품이며 [평가 모범 사례 가이드](https://developers.openai.com/api/docs/guides/evaluation-best-practices)도 있습니다. 저장소가 아니라 문서를 쓰십시오.
- [DeepEval](https://github.com/confident-ai/deepeval): pytest 스타일의 평가 프레임워크로, 기성 지표(충실성, 답변 관련성)를 제공합니다. CI에 편리합니다. 내장 지표는 정답이 아니라 출발점으로 취급하고, [LLM 판정자](llm-as-judge.md)의 방법대로 보정하십시오.

<a id="claude-code-plugin-evals"></a>

## Claude Code 플러그인 평가

Anthropic은 Claude Code 안에 평가 하네스를 직접 넣었습니다(v2.1.269+, 2026년 9월). `claude plugin eval`은 현실적인 프롬프트 모음으로 플러그인이나 스킬을 실행하고, 여섯 가지 채점기 유형(`regex`, `tool_used`, `tool_order`, `file_exists`, `llm`, `baseline`)으로 결과를 채점하며, 그리고(정직한 대목입니다) 플러그인 *없이* 다시 실행해 플러그인이 실제로 더하는 차이를 보고합니다. `claude plugin eval init`은 케이스를 대화형으로 제안하고, `--threshold`로 CI에 게이트를 걸 수 있습니다. 문서는 [code.claude.com/docs/en/plugin-evals](https://code.claude.com/docs/en/plugin-evals)에 있습니다. 에이전트용 스킬을 쓴다면, 이는 프롬프트 스캐폴딩에 같은 규율을 적용하는 일입니다.

<a id="honest-advice"></a>

## 솔직한 조언

모든 플랫폼은 장난감 데이터셋으로 시연하면 멋지게 보입니다. 차이를 만드는 것은 팀이 그 안에서 실제로 매주 트레이스를 읽느냐입니다. 무엇이든 계약서에 서명하기 전에, 자신의 실패 분류로 2주간 써 보십시오.
