# 실습: 트레이스 읽기

세 개의 실습 페이지 중 첫 번째입니다. 이 페이지는 "봇이 가끔 틀린다"에서 디스크에 저장된 골든 세트 파일까지 데려다 줍니다. [스위트 만들기](build-suite.md)에서 그것을 실행 가능하게 만들고, 게이트 페이지에서 CI에 연결합니다. 오후 한나절이면 셋을 모두 마칠 수 있습니다. 배경을 건너뛰었다면 [평가가 필요한 이유](why-evals.md)를 보십시오.

[모듈 5의 실습](../course-5-evals/evals-practice.md)에서 오셨습니까? 이미 케이스 스무 개와 러너가 있습니다. 수집은 건너뛰고 곧장 아래의 분류 체계 단계로 가십시오. 골든 세트는 이미 가진 것에서 자라납니다.

<a id="collect-30-traces"></a>

## 트레이스 30개 수집

프로덕션에서 실제 트랜스크립트 서른 개를 가져옵니다. 로그든 데이터베이스 내보내기든, 있는 것이면 됩니다. 실제 입력은 지어낸 입력보다 언제나 낫습니다. 아직 트래픽이 없습니까? 자신의 앱을 대상으로 시작용 세트를 생성하십시오. 그럴듯한 사용자가 물을 법한 질문 서른 개를 `starter_inputs.txt`에 쓰고(페르소나, 표현, 길이를 다양하게 하고, 거절해야 하는 질문도 몇 개 넣습니다), 실제 진입점으로 돌립니다.

```python
import json

from app import answer  # your product's entry point: str -> str

with open("starter_inputs.txt", encoding="utf-8") as f:
    inputs = [line.strip() for line in f if line.strip()]

with open("traces.jsonl", "w", encoding="utf-8") as out:
    for text in inputs:
        out.write(json.dumps({"input": text, "output": answer(text)}) + "\n")
```

<a id="the-error-analysis-pass"></a>

## 오류 분석 단계

트레이스를 순서대로 모두 읽고, 일반 텍스트 파일에 트레이스당 한 줄씩 씁니다. 쓸 만한 형식은 이렇습니다.

```
trace_id | verdict | one-sentence failure note | verbatim quote
014 | fail | invented an order number not present in context | "your order #88412 shipped"
015 | ok   |  |
016 | fail | apologised and asked a question instead of acting | "could you clarify which invoice"
```

규칙은 네 가지입니다. 실패마다 한 문장만 쓰고, 출력은 항상 인용하고, 성공은 `ok`로 기록해 분모를 알 수 있게 하고, 서른 개를 다 읽기 전에는 아무것도 고치지 않습니다. 여기에 드는 한 시간이 실습 전체에서 가장 효과가 큰 한 시간입니다.

<a id="cluster-into-a-taxonomy"></a>

## 분류 체계로 묶기

메모가 서른 개면 손으로 묶을 수 있지만, LLM도 첫 분류기로는 쓸 만합니다. 메모를 다음 프롬프트에 붙여 넣으십시오.

```text
Below are failure notes from an error-analysis pass over one AI product,
one note per line, prefixed with a trace id.

Cluster them into 3 to 8 failure modes. For each mode give:
- a snake_case name
- a one-sentence definition
- the trace ids it covers

Every note must land in exactly one mode. Put genuine one-offs in a mode
called "other" rather than inventing a mode for a single note. Do not
propose fixes. Return a markdown list.

<notes>
PASTE YOUR NOTES HERE
</notes>
```

결과는 초안으로 취급하십시오. 사실상 같은 것인 모드는 병합하고, 모호한 이름은 바꾸고, 동의하지 않는 항목은 우선순위를 낮춥니다. 분류는 모델이 하지만, 분류 체계는 사람이 책임집니다.

<a id="write-the-golden-set"></a>

## 골든 세트 쓰기

분류 체계를 `golden.jsonl`로 옮깁니다. 한 줄에 케이스 하나입니다.

```json
{"id": "hallucinated_id_003", "failure_mode": "hallucinated_order_id", "input": "where is my order?", "checks": {"must_not_contain": ["#"]}, "judge_expectation": null, "source": "trace 014"}
{"id": "clarify_loop_001", "failure_mode": "clarify_instead_of_acting", "input": "cancel my March invoice", "checks": null, "judge_expectation": "The reply cancels or begins cancelling the invoice rather than asking a clarifying question.", "source": "trace 016"}
{"id": "happy_path_002", "failure_mode": "none", "input": "what is your refund window?", "checks": {"must_contain": ["30 days"]}, "judge_expectation": null, "source": "trace 015"}
```

필드는 다섯 개입니다. `id`는 바뀌지 않고 grep하기 쉽습니다. `failure_mode`는 분류 체계에서 가져옵니다(정상 경로 케이스는 `none`). `input`은 제품이 받는 입력입니다. `checks`(코드가 채점할 수 있는 문자열 단언: `must_contain`, `must_not_contain`)와 `judge_expectation`(판정자가 확인하는 한 문장) 중 정확히 하나만 설정합니다. `checks`로 케이스를 감당할 수 있는 곳에서는 `checks`를 쓰십시오. `source`는 트레이스를 가리킵니다. 케이스가 실패하기 시작하면 원본이 필요해지기 때문입니다.

이름 붙은 실패 모드마다 케이스를 몇 개씩 넣고, 실패 사례에만 과적합하지 않도록 평범한 성공 사례도 넣습니다. 이유는 [평가 설계](designing-evals.md)에 있습니다. 파일을 코드 옆에 커밋하고 스위트로 넘어가십시오.
