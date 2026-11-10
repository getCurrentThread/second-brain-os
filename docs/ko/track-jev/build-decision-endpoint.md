# 실습: 타입 있는 결정 엔드포인트

Jev는 대기자 명단이 있어서 대부분의 독자는 아직 호출할 수 없습니다. 접근 상태는 [시작하기](getting-started.md)에 있습니다. 오늘 만들 수 있는 것은 Jev가 들어갈 자리의 모양입니다. 스키마와 state를 받아 신뢰도 점수가 붙은 타입 있는 결정을 돌려주는 함수입니다. 지금은 평범한 LLM으로 이 접점을 만들어 두면, 나중에 [시스템 1 모델](system-one-models.md)을 그대로 끼워 넣을 수 있습니다. 이 페이지는 엔드포인트를 만들고, 다음 페이지는 이것을 라우터에 연결합니다.

<a id="the-contract"></a>

## 계약

함수 하나, `decide(schema, question, state)`가 `{"value": ..., "confidence": ...}`를 돌려줍니다. `value`는 스키마를 따르고 `confidence`는 0과 1 사이입니다. 이는 Jev의 기본 요소가 주는 것, 곧 타입 있는 답과 확률을 그대로 본뜬 것이며, 그것을 만들어 내는 방식까지 따라 한다고 내세우지는 않습니다.

<a id="why-self-consistency-not-logprobs"></a>

## 왜 logprobs가 아니라 자기 일관성인가

LLM에서 신뢰도 숫자를 얻는 정직한 길은 두 가지입니다. 토큰 logprobs가 직접적인 길이겠지만 지금은 막혀 있습니다. Claude API는 logprobs를 아예 노출하지 않고, OpenAI의 현재 모델에서는 구조화된 출력(`json_schema`)을 켜면 logprobs 배열이 비어서 돌아온다는 개발자 보고가 있습니다. 이 패턴이 의존하는 모드가 바로 그것입니다. 통하는 길은 자기 일관성(self-consistency)입니다. 같은 질문을 여러 번 샘플링해서 다수 답을 취하고, 일치 비율을 신뢰도로 씁니다. 더 투박하지만 실제로 있는 것을 재 줍니다. 입력에 대한 모델 판단이 얼마나 안정적인가입니다.

<a id="the-code"></a>

## 코드

Claude API의 구조화된 출력(`output_config`, 정식 제공, 베타 헤더 불필요)으로 출력을 제약하고, 작고 빠른 모델에서 샘플 다섯 개를 병렬로 뽑습니다. `pip install anthropic`과 `ANTHROPIC_API_KEY`가 필요합니다.

```python
# decision.py
import json
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

import anthropic  # pip install anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY
MODEL = "claude-haiku-4-5"      # small and fast: this seat is System One work
SAMPLES = 5

def _ask_once(schema: dict, question: str, state: str) -> str:
    response = client.messages.create(
        model=MODEL,
        max_tokens=256,
        temperature=1.0,  # the default, stated on purpose: samples must vary
        messages=[{"role": "user", "content": f"{question}\n\nState:\n{state}"}],
        output_config={
            "format": {
                "type": "json_schema",
                "schema": {
                    "type": "object",
                    "properties": {"value": schema},
                    "required": ["value"],
                    "additionalProperties": False,
                },
            }
        },
    )
    text = next(b.text for b in response.content if b.type == "text")
    return json.dumps(json.loads(text)["value"], sort_keys=True)  # normalise for voting

def decide(schema: dict, question: str, state: str) -> dict:
    with ThreadPoolExecutor(max_workers=SAMPLES) as pool:
        futures = [pool.submit(_ask_once, schema, question, state) for _ in range(SAMPLES)]
        answers = [f.result() for f in futures]
    winner, votes = Counter(answers).most_common(1)[0]
    return {"value": json.loads(winner), "confidence": votes / SAMPLES}

if __name__ == "__main__":
    print(decide(
        schema={"type": "string", "enum": ["billing", "technical", "account", "other"]},
        question="Which team should handle this support ticket?",
        state="My card was charged twice for the same invoice this month.",
    ))
```

<a id="how-this-differs-from-a-real-system-one-model"></a>

## 진짜 시스템 1 모델과 어떻게 다른가

간극을 냉정하게 보십시오. Jev는 비자기회귀이고 질문 한 묶음에 한 번의 병렬 처리로 답하지만, 이 코드는 질문 하나당 생성 호출을 다섯 번 합니다. Jev의 신뢰도는 RLCD로 학습한 보정된 확률이지만, 여기 것은 여섯 가지 값만 가질 수 있는 득표 수이며 보정에 대해서는 아무것도 말해 주지 않습니다. 지연은 주장된 70–500ms에 비해 1~2초이고, 결정 하나의 비용은 100만 토큰당 0.042달러에 비해 Haiku 호출 다섯 번입니다. 교체한 뒤에도 남는 것은 계약이며, 코드가 의존하는 부분이 바로 그것입니다. 다음은 [신뢰도 게이트 라우터](build-router.md)입니다.
