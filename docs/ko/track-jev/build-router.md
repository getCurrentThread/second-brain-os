# 실습: 신뢰도 게이트 라우터

[타입 있는 결정 엔드포인트](build-decision-endpoint.md)는 에이전트 앞에 놓일 때 제값을 합니다. [에이전트 스택 속의 Jev](jev-in-an-agent-stack.md)에서 설명한 패턴은 이렇습니다. 들어오는 요청을 싸게 분류하고, 분류기가 확신하면 곧바로 행동하고, 확신하지 못하면 풀 LLM으로 넘깁니다. 결정 헤드는 빠른 경로이지 유일한 경로가 아닙니다.

<a id="the-design"></a>

## 설계

세 가지 규칙이 모든 일을 합니다.

- 결정론적 핸들러가 있는 경로는 큰 모델을 건드리지 않고도 처리할 수 있습니다.
- 빠른 경로는 신뢰도가 임계값을 넘고 *그리고* 그 경로에 핸들러가 있을 때만 작동합니다. 나머지는 모두 넘어갑니다.
- 모든 결정을 기록합니다. 빠른 경로로 갔든 아니든 마찬가지입니다. 이 로그가 앞으로의 평가(eval) 세트입니다. 이 티켓들에 사람이 레이블을 달고 나면, 분류기의 정확도를 측정하고, 실제 오류 비용에 맞춰 임계값을 조정하고, 나중에 같은 입력에 대한 Jev의 답과 비교할 수 있습니다.

<a id="the-code"></a>

## 코드

앞 페이지의 `decision.py`가 같은 디렉터리에 있으면 그대로 실행됩니다.

```python
# router.py
import json
import time

import anthropic

from decision import decide

client = anthropic.Anthropic()
FULL_MODEL = "claude-opus-5"   # the fall-through: full-strength, full price
THRESHOLD = 0.8                # start conservative; tune against labels later
LOG_PATH = "decisions.jsonl"

# Routes with a handler get a fast path. "other" is a deliberate catch-all
# with no handler, so anything unfamiliar always falls through.
ROUTES = {
    "billing": lambda t: "Routed to billing queue with a receipt request.",
    "password_reset": lambda t: "Sent the automated password-reset link.",
    "cancellation": lambda t: "Escalated to a human retention agent.",
    "other": None,
}
ROUTE_SCHEMA = {"type": "string", "enum": list(ROUTES)}
QUESTION = "Which route should handle this support ticket?"

def log_decision(entry: dict) -> None:
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry) + "\n")

def fall_through(ticket: str) -> str:
    response = client.messages.create(
        model=FULL_MODEL,
        max_tokens=16000,
        messages=[{"role": "user", "content": f"Handle this support ticket:\n{ticket}"}],
    )
    return next(b.text for b in response.content if b.type == "text")

def handle(ticket: str) -> str:
    start = time.perf_counter()
    decision = decide(ROUTE_SCHEMA, QUESTION, ticket)
    decide_ms = round((time.perf_counter() - start) * 1000)

    handler = ROUTES.get(decision["value"])
    fast = handler is not None and decision["confidence"] >= THRESHOLD
    outcome = handler(ticket) if fast else fall_through(ticket)

    log_decision({
        "ts": time.time(),
        "ticket": ticket,
        "value": decision["value"],
        "confidence": decision["confidence"],
        "threshold": THRESHOLD,
        "path": "fast" if fast else "fall_through",
        "decide_ms": decide_ms,
    })
    return outcome

if __name__ == "__main__":
    print(handle("I was charged twice for the same invoice this month."))
    print(handle("Your app deleted three years of my data and I am furious."))
```

<a id="what-to-watch"></a>

## 무엇을 지켜볼 것인가

임계값은 모델링의 결정이 아니라 비즈니스의 결정입니다. 위에 링크한 임계값 논의대로, 빠른 경로가 틀린 행동을 했을 때의 비용으로 값을 매기십시오. 대체 구현에서는 신뢰도가 보정된 확률이 아니라 샘플 일치도라는 점을 기억하십시오. 모호한 티켓에서도 다섯 샘플이 일치하는 일은 흔하므로, 포괄 경로를 유지하고 임계값을 낮추기 전에 매주 로그를 사람의 판단과 대조해 감사하십시오. 건너뛰지 말아야 할 단 하나는 로깅입니다. Jev 접근 권한이 생기면 입력, 결정, 신뢰도가 담긴 이 파일이 바로 Jev에 재생해 볼 자료가 되며, 다음 페이지가 그것입니다. [Jev로 교체하기](build-swap-in-jev.md).
