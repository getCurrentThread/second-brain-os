# 사무실

세상에서 가장 뛰어난 엔지니어를 채용해 형편없는 사무실에 앉혀 보십시오. 필요한 방의 열쇠도, 문서도, 테스트 스위트도 없고, 무엇이든 확인 없이 도장을 찍어 주는 관리자만 있다면 결과물도 형편없을 것입니다. 에이전트는 모델에 하네스를 더한 것입니다. 모델은 채용한 사람이고 하네스는 사무실입니다. [하네스란 무엇인가](../track-harness/what-a-harness-is.md)는 그 구성(루프, 도구, 프롬프트, 권한, 컨텍스트)을 다룹니다. 이 모듈은 그것을 다루는 방식을 다룹니다. 사무실은 설계하고 측정해야 하는 하나의 제품이지, 영리한 부분을 감싸는 포장이 아닙니다.

<a id="you-buy-a-model-and-a-harness"></a>

## 모델과 하네스를 함께 삽니다

모델만 맨몸으로 돌리는 사람은 없습니다. Claude Code나 LangChain의 deepagents를 도입하는 순간, 혹은 직접 짠 일흔 줄짜리 루프를 쓰는 순간, 자체 품질 곡선을 가진 두 번째 제품을 산 것입니다. 벤더는 모델에는 토큰 단위로 값을 매기면서 하네스는 덤으로 내줍니다. 그래서 팀은 하네스를 공짜이니 중요하지 않다고 여기기 쉽습니다. 2026년의 측정 결과는 정반대를 말합니다. 사무실만 바꿔도 벤치마크 점수가 프런티어 모델 사이의 격차보다 더 크게 움직입니다.

<a id="six-points-from-container-resources"></a>

## 컨테이너 자원이 가져온 6점

2026년 3월 Anthropic은 Kubernetes 클러스터에서 여섯 가지 자원 설정으로 Terminal-Bench 2.0을 다시 돌렸습니다. 각 과제의 CPU와 메모리 사양을 엄격하게 강제하는 설정부터 상한을 완전히 푼 설정까지였고, 모델과 하네스와 과제는 모두 같았습니다. 자원이 가장 많은 설정과 가장 적은 설정의 격차는 6퍼센트포인트(p < 0.01)였습니다. 엄격하게 강제한 설정에서는 과제의 5.8%가 인프라 오류로 실패했는데, 모델이 답을 틀린 것이 아니라 일시적인 메모리 급증으로 컨테이너가 죽은 경우였습니다. 이 글은 [Quantifying infrastructure noise in agentic coding evals](https://www.anthropic.com/engineering/infrastructure-noise)입니다. RAM 상한 하나가 6점의 값어치를 한다면, 환경은 사소한 세부 사항이 아닙니다. 점수의 일부입니다.

<a id="thirteen-points-from-the-harness-alone"></a>

## 하네스만으로 얻은 13점

2026년 2월 LangChain은 모델을 완전히 고정하고(내내 GPT-5.2-Codex) deepagents-cli의 하네스만 손보았습니다. 시스템 프롬프트 구조, 도구 설계, 그리고 루프 감지와 완료 전 체크리스트 같은 미들웨어였습니다. 에이전트는 Terminal-Bench 2.0에서 52.8점에서 66.5점이 되었고, 학습 없이 13.7점을 얻었습니다. 이 글은 [Improving Deep Agents with harness engineering](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)입니다. 13점은 같은 벤치마크에서 대부분의 모델 세대 교체가 가져오는 향상보다 큽니다.

<a id="a-cheaper-model-in-a-better-office"></a>

## 더 나은 사무실의 더 싼 모델

2026년 7월의 후속 글 [Tuning the harness, not the model](https://www.langchain.com/blog/tuning-the-harness-not-the-model-a-nemotron-3-ultra-playbook)은 같은 방법을 NVIDIA의 오픈 웨이트 모델 Nemotron 3 Ultra에 적용했습니다. 하네스 튜닝만으로 LangChain의 Deep Agents 스위트에서 최고 기록 0.86을 냈고, Claude Opus 4.8의 최고 기록은 0.87이었습니다. 실행당 비용은 약 4.48달러 대 43.48달러로, 대략 10분의 1입니다. 스위트 하나이고 점수를 매긴 사람도 하네스를 만든 쪽이므로 너무 믿지는 마십시오. 다만 방향은 올해 측정된 다른 모든 결과와 일치합니다. 튼튼한 사무실은 더 싼 사람에게도 일을 해내게 합니다.

<a id="when-you-need-one"></a>

## 언제 필요한가

에이전트가 실제 무언가에 손대는 순간입니다. 답을 엉망으로 하는 챗봇은 얼굴을 찡그리고 다시 시도하면 그만입니다. 그 글을 보고 행동하기 전까지는 아무 일도 일어나지 않았으니까요. 셸, 데이터베이스 연결, 전송 버튼을 가진 에이전트는 자신의 출력대로 직접 행동합니다. 틀린 답이 이제는 푸시된 커밋, 삭제된 테이블, 발송된 이메일이 됩니다. 이것이 경계선입니다. 출력이 검토할 수 있는 텍스트인 동안에는 마음껏 프롬프트를 다듬고 격식은 건너뛰십시오. 출력이 그대로 실행되는 행동으로 바뀌는 날에는 벽, 가이드, 센서, 게이트가 필요하고, 이 순서로 갖춥니다. [네 개의 고리](the-four-rings.md)가 그 구축 순서이고, [하네스 실습](harness-practice.md)은 실제 에이전트를 처음부터 끝까지 단단하게 만드는 과정을 보여 줍니다.
