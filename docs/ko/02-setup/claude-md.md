# CLAUDE.md 작성하기

볼트 루트의 `CLAUDE.md`는 에이전트가 세션을 시작할 때마다 읽는 파일입니다. 내 상황을 아는 어시스턴트와, 매번 처음부터 설명해야 하는 어시스턴트를 가르는 것이 이 파일입니다.

좋은 `CLAUDE.md`가 있는 빈 볼트는 `CLAUDE.md` 없이 가득 찬 볼트보다 쓸모가 있습니다. 사용자에 대한 컨텍스트가 이후 에이전트가 쓰는 모든 페이지의 모양을 정하기 때문입니다.

<a id="do-not-type-it-get-interviewed"></a>

## 직접 쓰지 않고 인터뷰에 답하기

아무 준비 없이 이 파일을 쓰면 빈약하고 뻔한 버전이 나옵니다. 질문에 답하면 구체적인 버전이 나옵니다. 다음을 에이전트에 붙여 넣으십시오:

```
You are setting up my second brain. Interview me ONE question at a time to
build my profile. Ask about: who I am and what I do, my goals for this year,
how I want you to talk to me, my strengths and weaknesses, and my current
projects. Wait for each answer before the next question. When finished, write
everything into CLAUDE.md at the vault root, structured with headers.
```

공동 창업자의 첫날에 상황을 설명하듯 답하십시오. 모호하게 답하면 모호한 파일이 나오고, 모든 세션이 그것을 물려받습니다.

<a id="what-belongs-in-it"></a>

## 들어갈 내용

- **누구이고 무슨 일을 하는지.** 낯선 사람이 읽고 행동에 옮길 수 있을 만큼 충분히.
- **기한이 있는 목표.** 올해, 이번 분기. 기한 없는 목표는 빨리 낡습니다.
- **나에게 말하는 방식.** 길이, 어조, 반박을 얼마나 원하는지.
- **강점과 약점.** 에이전트가 언제 동의하지 않고 반박해야 하는지 알 수 있는 근거가 됩니다.
- **현재 프로젝트,** 한 줄씩, 각 폴더로 링크해서.
- **볼트 자체의 규칙:** 폴더 배치, 페이지 규약, 링크 규칙. [`vault-template/CLAUDE.md`](../../../vault-template/CLAUDE.md)의 버전이 쓸 만한 출발점입니다.

<a id="what-does-not-belong-in-it"></a>

## 넣지 말 것

- 매주 바뀌는 모든 것. 그런 것은 프로젝트 파일에 넣습니다.
- 모델이 이미 아는 내용에 대한 긴 설명.
- 어떤 종류든 자격 증명.
- 지키지 않을 거창한 다짐. 에이전트는 그것을 글자 그대로 받아들입니다.

<a id="two-levels"></a>

## 두 수준

루트의 `CLAUDE.md`는 전략 계층입니다. 내가 누구이고, 무엇을 목표로 하며, 볼트가 어떻게 돌아가는지를 담습니다. 프로젝트 폴더마다 해당 프로젝트만 다루는 자기 `CLAUDE.md`를 둡니다. 프로젝트를 독립된 볼트로 열면 에이전트는 그 파일 하나만 읽고, 모든 작업에 내 삶 전체를 끌고 다니지 않게 됩니다. [프로젝트 범위 지정](project-scoping.md)을 보십시오.

<a id="iterate-on-it"></a>

## 반복해서 다듬기

에이전트가 같은 잘못을 두 번 하면 프롬프트의 문제가 아니라 `CLAUDE.md`의 문제입니다. 규칙을 추가하되 이유를 함께 적으십시오. 이유 없는 규칙은 예상하지 못한 경우에 지나치게 글자 그대로 적용되기 때문입니다.

매달 파일을 다시 읽으십시오. 목표는 바뀌고, 프로젝트는 끝나고, 낡은 프로필은 에이전트가 쓰는 모든 것의 품질을 조용히 떨어뜨립니다.

<a id="next"></a>

## 다음

[볼트 구조](vault-structure.md)
