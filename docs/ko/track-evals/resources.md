# 평가 자료

일부러 짧게 추렸습니다. 여기 있는 것은 모두 제 자리를 얻었고, 여기서 링크하는 것은 모두 선택 사항입니다. 이 자료들이 가르치는 개념은 [평가가 필요한 이유](why-evals.md)와 이 핸드북의 나머지에 대응합니다.

<a id="the-canon"></a>

## 핵심 자료

- [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/): Hamel Husain. 평가를 하나의 규율로 만든 에세이입니다. 단위 테스트, 사람의 검토, A/B 테스트를 세 수준으로 나누고, 자기 데이터를 직접 들여다봐야 하는 이유를 설명합니다. 여기서 시작하십시오.
- [AI Evals FAQ](https://hamel.dev/blog/posts/evals-faq/): Husain과 Shreya Shankar가 모든 팀이 묻는 질문에 계속 덧붙여 가는 답변입니다. 이진 판정 대 리커트 척도, 레이블이 몇 개 필요한가, 누가 주석을 달아야 하는가, 만들 것인가 살 것인가. 밀도가 높고 무료입니다.
- [AI Evals for Engineers & PMs](https://maven.com/parlance-labs/evals): 위 FAQ 뒤에 있는 Maven 강좌입니다. 수천 명의 엔지니어와 PM이 거쳐 갔고 2026년에도 기수가 이어지고 있습니다. 유료이며, 이 분야에서 돈을 낼 만한 유일한 강좌입니다.
- [Who Validates the Validators?](https://arxiv.org/abs/2404.12272): Shankar 외. LLM 판정자를 사람 레이블에 맞추는 작업의 연구적 토대입니다. 사람이 더 많은 출력을 채점할수록 채점 기준이 왜 표류하는지 설명합니다.
- [Demystifying Evals for AI Agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents): Anthropic의 엔지니어링 가이드(2026년 1월). 작업 선정, 궤적 채점 대 결과 채점, 판정자 보정, CI로서의 평가를 다룹니다. [에이전트 평가](agent-evals.md)에 관한 공식 플레이북에 가장 가까운 문서입니다.
- [Evaluation Best Practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices): OpenAI의 가이드입니다. 위 자료를 보완하며, 판정자의 완성된 예시를 보려면 [평가 쿡북 섹션](https://developers.openai.com/cookbook/topic/evals)과 함께 읽으십시오.

<a id="repos-worth-reading"></a>

## 읽어 볼 만한 저장소

- [inspect_evals](https://github.com/UKGovernmentBEIS/inspect_evals): UK AISI의 Inspect 아래 구현된 평가 200개 이상. 스코어러와 솔버 몇 개를 읽어 보면 프로덕션 수준의 평가 코드가 어떤 모습인지 알 수 있습니다.
- [terminal-bench](https://github.com/laude-institute/terminal-bench): Docker 안에서 돌아가는, 사람이 검수한 작업과 실행 가능한 채점기. 환경 기반 평가를 직접 만들 때 가장 깔끔한 참고 자료이며, 더 자세한 맥락은 [에이전트 평가](agent-evals.md)에 있습니다.

<a id="start-here-three-steps"></a>

## 여기서 시작: 세 단계

1. **트레이스 30개 읽기.** 오늘 밤 제품에서 실제(또는 실제에 가까운) 트랜스크립트 서른 개를 가져와 실패마다 한 문장씩 씁니다. 도구는 필요 없고 스프레드시트면 됩니다. 이것이 오류 분석이며, 로드맵을 다시 짜게 만들 것입니다.
2. **실패에 이름을 붙이고, 상위 셋을 코드로 옮기기.** 메모를 분류 체계로 묶고, 가장 자주 나오는 세 실패 모드를 검사로 바꿉니다. 가능하면 코드 단언으로, 불가능하면 보정된 좁은 판정자 하나로 합니다. 방법은 [평가 설계](designing-evals.md)와 [LLM 판정자](llm-as-judge.md)에 있습니다.
3. **스위트를 CI에 넣고 매주 다시 돌리기.** 임계값을 걸어 검사를 파이프라인에 연결하고, 가장 큰 실패 모드를 고친 뒤, 새 트레이스를 들고 1단계로 돌아갑니다. 이 루프를 반복하는 것이 규율의 전부입니다.
