# 모순과 대체

세컨드 브레인과 검색 엔진을 가르는 규칙이며, 대부분의 구현이 틀리는 규칙입니다.

새 자료가 페이지가 이미 말하는 내용과 어긋나면, 페이지는 둘 다 기록합니다. 덮어쓰지 않습니다.

<a id="why-overwriting-is-the-worst-failure-mode"></a>

## 덮어쓰기가 최악의 실패 모드인 이유

조용히 최신 주장으로 갱신되는 볼트는 무엇을 왜 믿었는지 기억하지 못합니다. 가장 최근에 읽은 것을 언제나 진실로 내놓는데, 이는 증거가 아니라 최신성에 따른 순위입니다.

더 나쁜 것은 눈에 보이지 않는다는 점입니다. 오류가 나지 않습니다. 페이지는 지난달과 다른 말을 같은 확신으로 할 뿐이고, 알아차릴 방법도 무엇이 바뀌었는지 확인할 방법도 없습니다.

이력이 자산입니다. 2024년 자료 때문에 X를 믿었다가 더 나은 증거가 나온 뒤 Y로 고쳤다는 사실을 아는 것은 어느 한쪽 주장만 아는 것보다 가치가 큽니다. Y가 실제로 얼마나 단단한지 알려 주기 때문입니다.

<a id="what-a-contradiction-looks-like-on-a-page"></a>

## 페이지에서 모순은 어떤 모습인가

두 입장을 각각 출처와 날짜를 달아 적습니다.

```markdown
## Current position

Retrieval quality degrades past roughly 50k tokens of context
([[Lost in the Middle]], 2023).

## Contested

[[Some 2026 benchmark]] reports no degradation up to 200k on the same task
family. The two use different evaluation setups: the first measures position
sensitivity, the second end-task accuracy. Unresolved.
```

독자는 이를 바탕으로 행동할 수 있습니다. 마지막에 인제스트한 쪽을 조용히 채택한 페이지로는 전혀 행동할 수 없습니다.

<a id="supersession"></a>

## 대체

진짜 불일치가 아니라 낡은 정보인 경우도 있습니다. 도구가 API를 바꿨거나, 회사가 인수되었거나, 논문이 철회된 경우입니다.

옛 주장을 대체된 것으로 표시하고 남겨 둡니다.

```markdown
~~Requires Node 18 or later~~ superseded 2026-05: the native installer no
longer requires Node ([[source]]).
```

지워 버리면 변경 이전에 쓰인 글을 읽을 때, 그 내용을 볼트가 지금 하는 말과 맞춰 볼 방법이 없습니다.

<a id="confidence"></a>

## 신뢰도

인제스트한 모든 것이 같은 비중을 가질 만한 것은 아닙니다. 태그나 프론트매터 필드 하나면 충분합니다.

- **진술(stated)**: 신뢰하는 1차 자료가 직접 밝힌 것
- **보도(reported)**: 2차 보도를 통해 전해진 것
- **자체 발표(self-reported)**: 그로부터 이득을 보는 당사자가 밝힌 것
- **미검증(unverified)**

특히 자체 발표 수치는 그 표시를 절대 잃어서는 안 됩니다. 회사가 스스로 내놓은 성능 주장이 개념 페이지에서 사실처럼 반복되는 것이, 볼트가 확신에 차서 틀리게 되는 경로입니다.

<a id="the-instruction"></a>

## 지시문

`CLAUDE.md`에 적되, 뻔한 경우만 다루지 않고 일반화되도록 표현합니다.

```
When a new source disagrees with an existing page, do not overwrite. Record both
positions with sources and dates, and say what would settle it. If the new
source is clearly better evidence, mark the older claim superseded rather than
deleting it. Never resolve a contradiction by picking the more recent source.
```

<a id="next"></a>

## 다음

[index.md와 log.md](index-and-log.md)
