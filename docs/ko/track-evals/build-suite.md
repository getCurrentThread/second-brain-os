# 실습: 평가 스위트

[트레이스 읽기](build-traces.md)에서 만든 `golden.jsonl`이 있습니다. 이 페이지는 그것을 실행 가능한 스위트로 바꿉니다. 프레임워크 없이 평범한 Python 파일 하나로 만듭니다. 코드 단언이 채점할 수 있는 것은 모두 코드에 맡기고, 나머지는 [LLM 판정자](llm-as-judge.md)에 따라 좁은 범위의 판정자 하나가 처리합니다. 예시 대상은 프롬프트 하나 뒤에 있는 지원 어시스턴트입니다. `run_target`은 자신의 앱을 호출하는 방식으로 바꿔 끼우십시오.

<a id="the-script"></a>

## 스크립트

`eval_suite.py`로 저장합니다. `pip install anthropic`이 필요하고 `ANTHROPIC_API_KEY`를 설정해야 합니다. 판정자는 일부러 대상과 다른 모델을 씁니다.

```python
import argparse
import json
import re
import sys

import anthropic

client = anthropic.Anthropic()

TARGET_MODEL = "claude-opus-5"
JUDGE_MODEL = "claude-sonnet-5"

SYSTEM_PROMPT = (
    "You are the support assistant for Acme Invoicing. Answer only from the "
    "provided account context. If the context does not contain the answer, say so."
)

JUDGE_PROMPT = """You are grading one output from an invoicing assistant.

Statement to verify:
{expectation}

Assistant output:
<output>
{output}
</output>

First write one or two sentences of reasoning. Then, on the final line, write
exactly VERDICT: pass if the statement is true of the output, or VERDICT: fail
if it is not. Do not reward length, politeness, or effort.
"""


def run_target(case: dict) -> str:
    response = client.messages.create(
        model=TARGET_MODEL,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": case["input"]}],
    )
    return "".join(b.text for b in response.content if b.type == "text")


def grade_code(output: str, checks: dict) -> tuple[bool, str]:
    for needle in checks.get("must_contain", []):
        if needle.lower() not in output.lower():
            return False, f"missing required text: {needle!r}"
    for needle in checks.get("must_not_contain", []):
        if needle.lower() in output.lower():
            return False, f"contains forbidden text: {needle!r}"
    return True, "code checks passed"


def grade_judge(output: str, expectation: str) -> tuple[bool, str]:
    response = client.messages.create(
        model=JUDGE_MODEL,
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": JUDGE_PROMPT.format(expectation=expectation, output=output),
        }],
    )
    text = "".join(b.text for b in response.content if b.type == "text")
    match = re.search(r"VERDICT:\s*(pass|fail)", text, re.IGNORECASE)
    passed = bool(match) and match.group(1).lower() == "pass"
    return passed, text.strip().splitlines()[0]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("golden", help="path to golden.jsonl")
    parser.add_argument("--limit", type=int, default=0, help="run only the first N cases")
    parser.add_argument("--threshold", type=float, default=0.0, help="exit 1 below this pass rate")
    args = parser.parse_args()

    with open(args.golden, encoding="utf-8") as f:
        cases = [json.loads(line) for line in f if line.strip()]
    if args.limit:
        cases = cases[: args.limit]

    results = []
    for case in cases:
        output = run_target(case)
        if case.get("checks"):
            passed, reason = grade_code(output, case["checks"])
        else:
            passed, reason = grade_judge(output, case["judge_expectation"])
        results.append({"id": case["id"], "passed": passed, "reason": reason})
        print(f"{'PASS' if passed else 'FAIL'}  {case['id']}  {reason}")

    rate = sum(r["passed"] for r in results) / len(results)
    print(f"\npass rate: {rate:.0%}")
    with open("results.json", "w", encoding="utf-8") as f:
        json.dump({"pass_rate": rate, "results": results}, f, indent=2)
    if args.threshold and rate < args.threshold:
        sys.exit(1)


if __name__ == "__main__":
    main()
```

`python eval_suite.py golden.jsonl`로 실행합니다. 케이스마다 한 줄씩 출력하고, `results.json`을 쓰고, `--threshold`를 주면 나쁜 실행에서 0이 아닌 코드로 종료합니다. CI에 필요한 것은 이것이 전부입니다.

<a id="calibrate-the-judge-before-trusting-it"></a>

## 믿기 전에 판정자 보정하기

먼저 판정자가 채점한 출력 열 개에 직접 레이블을 붙입니다. `labels.jsonl`에 출력마다 한 줄씩, `id`, `output`, `expectation`, 그리고 자신의 `label`(true/false)을 적습니다. 그런 다음 일치도를 확인합니다.

```python
import json

from eval_suite import grade_judge

with open("labels.jsonl", encoding="utf-8") as f:
    labels = [json.loads(line) for line in f if line.strip()]

agree = 0
for row in labels:
    verdict, reason = grade_judge(row["output"], row["expectation"])
    agree += verdict == row["label"]
    if verdict != row["label"]:
        print(f"disagree on {row['id']}: judge={verdict} you={row['label']} - {reason}")
print(f"agreement: {agree}/{len(labels)}")
```

불일치를 하나도 빠짐없이 읽으십시오. 대개는 기대치 문장이 모호했고, 가끔은 자신의 레이블이 그랬습니다. 레이블 열 개는 오후 한나절 버전이고, 50~100개를 붙이는 전체 절차는 [LLM 판정자](llm-as-judge.md)에 있습니다.

<a id="when-a-framework-earns-its-keep"></a>

## 프레임워크가 제값을 하는 때

이 파일은 대상 하나, 판정자 하나, 케이스 수백 개까지는 충분합니다. 비교 매트릭스를 직접 짜지 않고 여러 프롬프트나 모델을 나란히 비교하고 싶다면 promptfoo를, 샌드박스 에이전트 환경과 솔버, 단계별 채점이 필요하다면 Inspect를 찾으십시오. 둘 다 [평가 도구](tooling.md)에서 살펴보았습니다. 어느 쪽도 분류 체계 작업을 대신하지 못하고, 그 작업을 대규모로 돌릴 뿐입니다.
