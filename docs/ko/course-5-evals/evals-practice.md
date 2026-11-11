# 평가 실습

이 글은 최소한의 실습입니다. 한나절, 다섯 단계, 케이스 파일 하나와 러너 하나, 인프라는 없습니다. [평가 엔지니어링 핸드북](../track-evals/why-evals.md)은 세 번의 실습으로 전체 파이프라인을 조립합니다. 여기서 만든 것은 모두 그대로 이어집니다.

> 아래 실습 전체는 스킬로도 묶여 있습니다. [강좌 플러그인](../../../plugins/README.md)을 설치하고 에이전트의 저장소에서 `/agents-course:evals-bootstrap`을 실행하십시오.

<a id="step-1-mine-twenty-failures-into-cases"></a>

## 1단계: 실패 스무 건을 케이스로 캐내기

에이전트의 최근 실행을 가져와, 상상이 아닌 실제 실패가 스무 건 모일 때까지 읽습니다. 건마다 한 줄을 씁니다. 입력이 무엇이었는지, 그리고 일어났어야 하는데 일어나지 않은 구체적인 행동 하나입니다. "볼트를 검색하지 않고 답했다." "승인을 묻지 않고 환불했다." "노트가 만들어졌다고 주장했지만 만들어지지 않았다." 스무 건의 실패는 보통 네 가지에서 여덟 가지 행동으로 묶입니다.

<a id="step-2-write-one-behavioural-check-per-case"></a>

## 2단계: 케이스마다 행동 점검 하나 쓰기

케이스는 하나하나가 YAML 항목이 됩니다. 입력, 말로 적은 기대 행동, 트레이스를 대상으로 기계가 확인할 수 있는 단언입니다.

```yaml
- id: refund_1042
  input: "Refund order #1042, customer says it arrived broken"
  expect: looks up the order before replying; asks approval before refund
  check:
    - trace has get_order before send_reply
    - trace has approval_request before refund
```

스무 건을 모두 `cases.yaml`로 저장합니다. `expect` 줄은 사람을 위한 것이고, 테스트는 `check` 줄입니다.

<a id="step-3-run-the-checks-on-traces"></a>

## 3단계: 트레이스에 점검 돌리기

실행마다 트레이스를 `traces/<id>.json`으로 저장합니다. 도구 호출을 포함한 이벤트 목록입니다.

```json
[
  {"type": "tool_call", "name": "get_order", "args": {"order_id": "1042"}},
  {"type": "tool_result", "name": "get_order", "ok": true},
  {"type": "tool_call", "name": "approval_request", "args": {"action": "refund"}},
  {"type": "tool_call", "name": "refund", "args": {"order_id": "1042"}},
  {"type": "tool_call", "name": "send_reply", "args": {"channel": "email"}}
]
```

다음 러너를 `check_traces.py`로 저장합니다(`pip install pyyaml`이 필요합니다).

```python
import json
import re
import sys
from pathlib import Path

import yaml


def tool_calls(trace: list) -> list:
    return [e["name"] for e in trace if e.get("type") == "tool_call"]


def check_rule(rule: str, calls: list) -> tuple[bool, str]:
    m = re.fullmatch(r"trace has (\w+) before (\w+)", rule.strip())
    if m:
        first, second = m.group(1), m.group(2)
        if first not in calls:
            return False, f"{first} never called"
        if second not in calls:
            return False, f"{second} never called"
        if calls.index(first) < calls.index(second):
            return True, "ok"
        return False, f"{second} came before {first}"
    m = re.fullmatch(r"trace has (\w+)", rule.strip())
    if m:
        name = m.group(1)
        return name in calls, "ok" if name in calls else f"{name} never called"
    m = re.fullmatch(r"trace lacks (\w+)", rule.strip())
    if m:
        name = m.group(1)
        return name not in calls, "ok" if name not in calls else f"{name} was called"
    return False, f"unparseable rule: {rule!r}"


def main() -> None:
    cases = yaml.safe_load(Path(sys.argv[1]).read_text(encoding="utf-8"))
    trace_dir = Path(sys.argv[2])
    failures = 0
    for case in cases:
        trace_file = trace_dir / f"{case['id']}.json"
        trace = json.loads(trace_file.read_text(encoding="utf-8"))
        calls = tool_calls(trace)
        for rule in case["check"]:
            passed, reason = check_rule(rule, calls)
            print(f"{'PASS' if passed else 'FAIL'}  {case['id']}  {rule}  ({reason})")
            failures += not passed
    print(f"\n{failures} failing check(s)")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
```

`python check_traces.py cases.yaml traces/`를 실행합니다. 모델을 호출하지 않으므로 5초 예산 안에 넉넉히 끝나고, CI를 위해 0이 아닌 값으로 종료합니다. 점검마다 출력된 그대로 보고하십시오. 이것을 하나의 통과율로 뭉개서는 절대 안 됩니다.

<a id="step-4-calibrate-one-narrow-judge"></a>

## 4단계: 범위가 좁은 판정자 하나 보정하기

코드가 볼 수 없는 행동("답변이 검색된 노트에 근거한다")에는 질문 하나에 이진 판정을 내리는 판정자 하나를 씁니다. 믿기 전에 출력 열 개에 직접 레이블을 붙이고 일치도를 재십시오. [스위트 실습](../track-evals/build-suite.md)의 레이블 열 개짜리 스크립트가 서른 줄로 이 일을 하고, [LLM 판정자(LLM-as-judge)](../track-evals/llm-as-judge.md)는 조심할 편향을 다룹니다. 일치도가 열 건 중 여덟 건 미만이면 임계값이 아니라 루브릭을 고치십시오.

<a id="step-5-schedule-weekly-hand-grading"></a>

## 5단계: 주간 수작업 채점 일정 잡기

매주 실제 실행 다섯 건을 무작위로 뽑아 자신의 기대에 맞춰 직접 채점합니다. 스위트와 의견이 갈린 것은 새 케이스가 되고, 스위트가 한 번도 보지 못한 실패는 새 점검이 됩니다. 세트가 노후화되는 것을 막아 주는 것은 매주 15분입니다.

<a id="tips"></a>

## 팁

- 판정자와 `trace has` 단언 둘 다 되는 곳에서는 언제나 단언을 택하십시오.
- 케이스 id는 grep할 수 있고 바뀌지 않게 유지하십시오. 여섯 달 뒤에 검색하게 될 것입니다.
- 점검이 통과와 실패를 오간다면 그 행동이 실제로 비결정론적이라는 뜻입니다. 테스트의 버그가 아니라 발견입니다.
- 행동마다 정상 경로 케이스를 하나씩 추가해, 과잉 교정을 알아챌 수 있게 하십시오.

<a id="prove-it-to-yourself"></a>

## 직접 확인하기

1. 트레이스에서 `get_order` 이벤트를 지우고, 러너가 올바른 이유로 실패하는지 확인하십시오.
2. 출력 하나에 판정자를 세 번 돌려 보십시오. 판정이 엇갈리면 엇갈리지 않을 때까지 루브릭을 조이십시오.
3. 환불 행동을 일부러 망가뜨리고, 총합은 거의 움직이지 않는데 해당 개별 점검은 실패로 바뀌는지 확인하십시오.

다음 모듈: [프로토타입에서 프로덕션으로](../course-6-production/from-prototype.md).

더 깊이 → 방금 쓴 `cases.yaml`에서 출발하는 핸드북의 세 가지 실습입니다. 분류 체계를 만드는 단계부터 시작하는 [트레이스 읽기](../track-evals/build-traces.md)(수집은 끝났습니다), 보정된 판정자를 위한 [스위트 실습](../track-evals/build-suite.md), 그리고 [CI 게이트](../track-evals/build-ci.md)입니다. 여기서 한 일 가운데 버릴 것은 하나도 없습니다.
