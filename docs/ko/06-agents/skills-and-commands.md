# 스킬과 슬래시 커맨드

비슷해 보이지만 하는 일이 다른 두 가지 메커니즘입니다.

**스킬**은 반복 가능한 동작을 가르칩니다. 관련이 있을 때 로드되어, 직접 호출했든 작업을 말로 설명했을 뿐이든 에이전트가 일하는 방식을 형성합니다.

**커맨드**는 자주 돌리는 작업의 단축키입니다. 스킬을 가리켜서, 지시문을 일일이 입력하지 않아도 되게 해 줍니다.

동작은 스킬에 두어야 합니다. 그래야 인제스트가 `/ingest`로 시작되든, 예약 작업으로 시작되든, "이걸 내 볼트에 추가해 줘"라고 말해서 시작되든 똑같이 동작합니다.

<a id="what-this-repo-ships"></a>

## 이 저장소가 제공하는 것

[`skills/`](../../../skills/README.md)에 스킬 18개가 있으며, 이 안내서의 워크플로 하나에 하나씩입니다. [`commands/`](../../../commands/README.md)에는 커맨드 72개가 있으며, 각각 스킬 하나를 가리키고 그 범위를 정하는 몇 줄짜리입니다.

이 비율은 의도한 것입니다. 동작은 잘 쓴 소수의 스킬에 두어야 합니다. 커맨드는 값싸므로, 매주 하는 요청을 어떻게 표현하는지 기억하게 할 이유가 없습니다.

이것들은 볼트 안의 `.claude/skills/`와 `.claude/commands/`에 설치하십시오. 그러면 노트와 함께 버전 관리되고 볼트와 함께 이동합니다.

<a id="writing-your-own"></a>

## 직접 만들기

만들 가치가 있는 스킬에는 세 가지 성질이 있습니다. 반복해서 하는 일이고, 어떻게 할지에 대한 견해가 있고, 그 견해가 모델이 짐작할 수 있을 만큼 뻔하지는 않다는 것입니다.

잘 통하는 구조는 이렇습니다.

```markdown
---
name: skill-name
description: >-
  What it does. When to use it, written pushy, because agents under-trigger
  skills. Do NOT use for the tempting near-misses.
---

# Name

[Why this skill exists: what failure it prevents. This paragraph is the rubric
for every case the rules below do not cover.]

## Core rule
## Workflow
## Output format
## Calibration
## Example
```

첫 단락이 규칙보다 더 많은 일을 합니다. 규칙은 생각해 둔 경우를 다루고, 이유는 나머지를 다룹니다.

<a id="explain-the-why"></a>

## 이유를 설명하기

"모순을 절대 덮어쓰지 마십시오"는 문자 그대로 적용되어 경계 사례에서 실패합니다. "모순을 절대 덮어쓰지 마십시오. 무엇을 믿어 왔는지의 이력은 검색 엔진에는 없고 이 볼트에만 있는 것이기 때문입니다"는 설명한 적 없는 상황으로까지 일반화됩니다.

이유 없이 대문자로 쓴 NEVER는 대개 빠진 설명입니다.

<a id="versioning"></a>

## 버전 관리

스킬은 볼트에 있으므로 git이 추적합니다. 출력 품질이 달라졌다면 스킬의 diff가 가장 먼저 볼 곳입니다.

예약 작업이 스킬을 쓰게 하기 전에 실제 사례 서너 개로 시험하십시오. 매일 밤 도는 스킬의 결함은 연말이면 페이지 삼백 개의 결함이 됩니다.

<a id="next"></a>

## 다음

[가드레일](safety-and-guardrails.md)
