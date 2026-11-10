# 실습: Jev로 교체하기

앞의 두 페이지는 이 페이지를 밋밋하게 만들려는 것이었습니다. [결정 엔드포인트](build-decision-endpoint.md)와 [라우터](build-router.md)는 `decide(schema, question, state)`가 값과 신뢰도를 돌려준다는 하나의 계약에 합의해 두었으므로, LLM 대용품을 Jev로 바꾸는 일은 다시 쓰기가 아니라 파일 하나의 수정이어야 합니다. 지금 바꿀 수 있는지는 대기자 명단에 달려 있습니다. 현재 접근 상태는 [시작하기](getting-started.md)에 있습니다.

<a id="the-seam"></a>

## 접점

라우터에 구현 이름을 드러내지 않는 import 지점을 하나 두십시오. 앞으로 바뀌는 파일은 이것 하나뿐입니다.

```python
# decider.py — the seam. Swapping implementations is an edit here, nowhere else.
from decision import decide  # today: the LLM stand-in

# from jev_decider import decide  # later: Jev, once access arrives
```

`router.py`를 `from decider import decide`로 바꾸면 교체 준비가 끝납니다. Jev 쪽은 스키마 모양을 기본 요소에 대응시킵니다. 열거형(enum)은 `Choice`, 불리언은 `Noul`이 되고, 열린 형태는 모두 거부합니다. Jev는 한정된 질문에만 답하기 때문입니다.

```python
# jev_decider.py — written from TypeSafe's published docs, UNTESTED until you
# have quota. Verify call shapes against docs.typesafe.ai before relying on it.
from typesafe import TypeSafe, Choice, Noul  # pip install typesafe-sdk

client = TypeSafe()  # reads TYPESAFE_API_KEY

def decide(schema: dict, question: str, state: str) -> dict:
    if "enum" in schema:
        q = Choice(instructions=question,
                   criteria={str(o): str(o) for o in schema["enum"]})
    elif schema.get("type") == "boolean":
        q = Noul(instructions=question)
    else:
        raise ValueError("Jev answers bounded questions only; keep this on the LLM.")
    answer = client.decide(state=state, questions={"value": q})["value"]
    return {"value": answer.value, "confidence": answer.probability}
```

<a id="shadow-mode-first"></a>

## 섀도 모드 먼저

첫날부터 import를 전환하지 마십시오. Jev를 섀도 모드로 돌리십시오. 대용품이 계속 모든 요청에 답하고, Jev는 옆에서 같은 요청에 답하며, 둘 다 로그에 남습니다. 아직 누구도 Jev의 답을 읽지 않으므로 Jev가 실패해도 프로덕션에는 해가 없습니다.

```python
# shadow.py — point the seam here during the trial period.
import json
import time

import decision as standin
import jev_decider as jev

LOG_PATH = "shadow.jsonl"

def decide(schema: dict, question: str, state: str) -> dict:
    t0 = time.perf_counter()
    live = standin.decide(schema, question, state)
    live_ms = round((time.perf_counter() - t0) * 1000)
    try:
        t1 = time.perf_counter()
        shadow = jev.decide(schema, question, state)
        shadow_ms = round((time.perf_counter() - t1) * 1000)
    except Exception as exc:
        shadow, shadow_ms = {"error": str(exc)}, None
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": time.time(), "state": state,
                            "live": live, "live_ms": live_ms,
                            "shadow": shadow, "shadow_ms": shadow_ms}) + "\n")
    return live  # callers only ever see the stand-in
```

<a id="what-to-measure-before-flipping"></a>

## 전환하기 전에 측정할 것

대용품의 기준선을 일주일 쌓은 다음, 섀도 로그로 비교합니다.

- **지연.** `live_ms`와 `shadow_ms`의 p50과 p95를 서로 비교하되, TypeSafe가 내세우는 70–500ms가 아니라 자신의 인프라에서 측정한 값으로 합니다.
- **비용.** 결정 1,000건당, 결정마다 Haiku 호출 다섯 번의 비용과 Jev의 과금되는 입력 토큰 비용을 비교합니다.
- **일치율.** 두 `value`가 얼마나 자주 같은가. 일치율이 높고 지연이 더 낮으면 청신호입니다. 일치율이 낮다면 누군가 틀린 것이고, 누가 틀렸는지는 레이블만 알려 줍니다.
- **보정.** Jev의 확률을 구간별로 묶어 구간마다의 정확도를 자신의 레이블로 확인합니다. 벤더의 핵심 주장을 자신의 트래픽에서 시험하는 것입니다.

숫자가 그럴 자격을 보여 주면 `decider.py`의 import를 전환하고, 대용품은 주석 한 줄만 바꾸면 되돌릴 수 있게 롤백용으로 남겨 두십시오.
