# 루프 실습: 필터, 루프, 폴백

프로덕션 패턴은 "모든 것에 에이전트를 돌린다"가 아닙니다. 먼저 거르고, 짧게 돌리고, 폴백합니다. Atlan이 온콜 에이전트를 다룬 엔지니어링 글은 이 형태를 대규모로 보여 줍니다. 결정적인 비LLM 필터가 30일 동안의 알림 약 11,000건 중 약 86%를 토큰 하나 쓰기 전에 걸러 냈고, 에이전트에 도달한 것은 약 14%뿐이었습니다. 에이전트는 이어서 세 사이클 정도 추론했고, 신뢰도가 약 50% 아래에 머물면 순수 Python으로 짠 결정적 폴백 워크플로로 에스컬레이션했습니다. 10분이 넘고 몇 달러가 들던 조사는 건당 약 2분, 0.28달러로 줄었습니다. 값싼 코드가 흔한 경우를 처리하고, 모델이 나머지를 처리하며, 고정된 경로가 모델이 끝내지 못하는 것을 받아 냅니다.


> 이 패턴의 목표 테스트 쪽은 스킬로 패키지되어 있습니다. [강좌 플러그인](../../../plugins/README.md)을 설치하고 `/agents-course:goal-test`를 실행하십시오. 체커 역할은 `loop-critic` 에이전트로 제공됩니다.

코드 전에 틀 하나를 짚습니다. 이 실습은 분류(triage) 형태, 즉 거르고, 짧게 돌리고, 폴백하는 형태입니다. 또 다른 프로덕션 형태, 곧 코딩 에이전트를 루프로 감싸고 목표 테스트로 구동하는 형태는 [루프 핸드북의 실습](../track-loop/build-goal-test.md)입니다. 네 부분은 같고 몸통이 다릅니다.

<a id="the-build"></a>

## 만들기

하이브리드 전체가 파일 하나에 들어갑니다. 그대로 실행되며, `model_next_step`을 실제 API 호출로 바꿔도 제어 흐름은 바뀌지 않습니다.

```python
"""Hybrid alert triage: deterministic filter, bounded loop, fixed fallback."""

MAX_TURNS = 3          # Atlan runs about three reasoning cycles before escalating
BUDGET_USD = 0.10      # spend ceiling per alert
COST_PER_TURN = 0.02   # replace with real usage figures from your API responses

ALERTS = [
    {"id": 1, "source": "cron", "message": "nightly backup finished OK"},
    {"id": 2, "source": "api", "message": "TimeoutError in /sync after 30s"},
    {"id": 3, "source": "api", "message": "intermittent 502 from payments"},
]

def prefilter(alert):
    """Deterministic, costs nothing. Returns a verdict, or None for the loop."""
    message = alert["message"].lower()
    if alert["source"] == "cron" or "finished ok" in message:
        return {"cause": "known-benign pattern", "next_step": "close", "via": "filter"}
    return None

def checker(diagnosis):
    """External judge: a diagnosis must name a cause and a concrete next step."""
    return bool(diagnosis.get("cause")) and bool(diagnosis.get("next_step"))

def model_next_step(alert, history):
    """Stub standing in for the model call. Swap in a real API call here."""
    if "timeout" in alert["message"].lower():
        return {"cause": "client timeout on /sync", "next_step": "raise limit to 60s"}
    return {"cause": "", "next_step": ""}   # the stub cannot close this one

def fallback_workflow(alert):
    """Fixed path, no model: always produces a defensible answer."""
    return {"cause": "unresolved by agent", "next_step": "page on-call with raw alert",
            "via": "fallback"}

def triage(alert):
    verdict = prefilter(alert)
    if verdict is not None:
        return verdict                                   # most alerts stop here
    history, spent = [], 0.0
    for turn in range(MAX_TURNS):
        diagnosis = model_next_step(alert, history)
        history.append(diagnosis)
        spent += COST_PER_TURN
        if checker(diagnosis):
            diagnosis["via"] = "loop, turn %d" % (turn + 1)
            return diagnosis                             # exit 1: checker passed
        if len(history) >= 2 and history[-1] == history[-2]:
            break                                        # exit 2: spinning
        if spent > BUDGET_USD:
            break                                        # exit 3: over budget
    return fallback_workflow(alert)                      # every other exit lands here

if __name__ == "__main__":
    for alert in ALERTS:
        print(alert["id"], triage(alert))
```

알림 1은 모델을 전혀 거치지 않고, 알림 2는 루프의 첫 턴에 마무리되며, 알림 3은 두 번 헛돈 뒤 폴백에 떨어집니다. 어느 경로든 같은 모양을 돌려주므로 호출자는 어느 계층이 답했는지 알 필요가 없습니다.

<a id="tips"></a>

## 팁

- 루프가 아니라 필터를 키웁니다. 루프가 두 번 낸 진단은 모두 `prefilter` 규칙의 후보입니다.
- 모든 결과에 `via`를 기록합니다. 필터, 루프, 폴백의 비율이 상태 지표이며, 폴백 비중이 오른다면 루프가 조용히 실패하고 있다는 뜻입니다.
- 폴백은 심심하게 둡니다. 폴백의 일은 모델 없이 근거 있는 답을 내는 것이지, 영리함을 한 번 더 시도하는 것이 아닙니다.
- 체커는 예의상 느껴지는 것보다 엄격하게 만듭니다. 모델이 말로 구슬려 넘어갈 수 없는 유일한 부분입니다. 실제 코딩 에이전트에 맞서 체커를 단단하게 하는 방법은 [목표 테스트 실습](../track-loop/build-goal-test.md)에 있고, 브레이크의 전체 목록은 [종료 조건](../track-loop/stop-conditions.md)에 있습니다.

<a id="prove-it-to-yourself"></a>

## 직접 확인하기

1. 파일을 실행한 다음 `MAX_TURNS = 0`으로 바꿔 다시 실행합니다. 필터에 걸리지 않은 알림은 모두 폴백에 떨어져야 합니다. 대신 무언가 죽는다면 출구 경로가 빠져 있었던 것입니다.
2. `model_next_step`이 같은 틀린 답을 영원히 돌려주게 만듭니다. 헛돎 검사가 3턴이 아니라 2턴에 빠져나오는지 확인하십시오.
3. 필터가 걸러 내는 네 번째 알림을 추가하고, 이제 배치 전체가 모델을 몇 번 호출하는지 기록합니다. 커버리지는 유지되는데 그 숫자가 내려가는 것이 이 패턴의 경제성 전부입니다. 그리고 어떤 결정에 모델이 애초에 필요한지 가리는 것이 다음 모듈, [값싼 결정](../course-3-gate/cheap-decisions.md)입니다.

더 깊이 → [루프 엔지니어링 핸드북](../track-loop/what-loop-engineering-is.md): 종료 조건, 크리틱, 컨텍스트 위생, 그리고 아침까지 믿고 맡길 수 있는 밤샘 루프를 다룹니다.
