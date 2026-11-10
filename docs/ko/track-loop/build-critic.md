# 실습: 크리틱

[1부](build-goal-test.md)는 초록불에서 멈춥니다. 이 글은 두 번째 판단을 더합니다. 초록불이면서 깔끔해야 합니다. 별도의 크리틱 패스가 좁은 루브릭에 맞춰 diff를 검토하고, 막연한 조언이 아니라 구체적인 결함이 다음 시도로 이어집니다. 이론은 [크리틱과 검증](critics-and-verification.md)에 있고, 여기서는 추가되는 마흔 줄을 다룹니다.

설계 규칙 두 가지가 전체를 떠받칩니다. 크리틱은 **별도의 세션**입니다. 새로운 `claude -p` 호출이 diff와 루브릭만 보고 작업 트랜스크립트는 결코 보지 않으므로, 만드는 쪽의 합리화를 물려받을 수 없습니다. 그리고 루브릭은 **좁고 검사할 수 있어야** 합니다. 규칙 네 개, 요구하는 판정 형식, 그 밖의 것에 대한 논평을 명시적으로 금지하는 조항입니다.

<a id="the-code"></a>

## 코드

```bash
#!/usr/bin/env bash
# critic-loop.sh — the goal test decides correct; a critic pass decides acceptable.
set -u

TASK="Make every test under tests/ pass. Do not delete, skip or weaken any test."
MAX_ATTEMPTS=5
BASE_REF=$(git rev-parse HEAD)

goal_test() {
    python -m pytest -q --tb=short && ruff check .
}

critic() {
    git diff "$BASE_REF" | claude -p \
"You are a code reviewer. Judge this diff against exactly four rules:
1. No test was deleted, skipped or weakened.
2. No debug prints, dead code or commented-out blocks were added.
3. Errors are handled, not silently swallowed.
4. The change stays inside the task; no drive-by refactoring.
If all four hold, reply with the single word PASS.
Otherwise list each violation as: file, the problem, the one-line fix.
Judge only these rules. Never comment on style or architecture." \
        --output-format json | jq -r '.result'
}

feedback=""
for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
    echo "=== attempt $attempt of $MAX_ATTEMPTS ==="

    prompt="$TASK"
    if [ -n "$feedback" ]; then
        prompt="$TASK

The previous attempt was rejected:
$feedback

Fix exactly these points, nothing else."
    fi

    claude -p "$prompt" \
        --allowedTools "Read,Edit,Bash(python -m pytest *),Bash(ruff *)" \
        --permission-mode acceptEdits > /dev/null

    if ! feedback=$(goal_test 2>&1); then
        echo "goal test red; retrying with failures"
        continue
    fi

    verdict=$(critic)
    case "$verdict" in
        PASS*)
            echo "green and clean on attempt $attempt"
            exit 0
            ;;
        *)
            feedback="The goal test passes, but the reviewer found defects:
$verdict"
            echo "critic rejected; retrying with defects"
            ;;
    esac
done

echo "STOP: $MAX_ATTEMPTS attempts spent; handing back to the human"
exit 1
```

<a id="how-the-pieces-fit"></a>

## 각 부분의 맞물림

순서가 중요합니다. 목표 테스트가 먼저, 크리틱이 나중입니다. 동작하지 않는 코드를 검토하는 데 돈을 쓸 이유는 없으므로, 결정론적 크리틱이 LLM 크리틱 앞에서 걸러 줍니다. 싼 판정자를 먼저, 비싼 판정자를 나중에 쓰는 것입니다. diff는 루프가 시작되기 전에 고정해 둔 `BASE_REF`를 기준으로 가져오므로, 크리틱은 마지막 증분이 아니라 항상 전체 변경을 검토합니다.

크리틱의 출력이 무엇이 되는지 보십시오. 다음 시도의 `feedback`이 되고, "정확히 이 항목들만 고치고 다른 것은 건드리지 마라"는 문구로 표현됩니다. 위치가 명시되어 조치할 수 있는 결함은 곧바로 범위가 정해진 작업으로 바뀝니다. 그래서 루브릭이 스타일 논평을 금지합니다. "더 함수형으로 접근해 보라"고 말하는 크리틱은 다음 시도가 엉뚱한 리팩터링에 한눈팔게 하고, 다섯 번의 시도는 이리저리 뜯어고치는 동안 증발합니다.

크리틱도 모든 LLM 판정자와 같은 실패 모드를 여전히 공유합니다. 관대함, 그리고 만드는 쪽과 체커가 모델을 공유할 때의 자기 선호입니다. 여기서는 루브릭의 첫 번째 규칙도 크리틱 말고는 아무것도 강제하지 않습니다. 더 엄격하게 만든다면 에이전트의 `tests/` 쓰기 권한을 아예 막을 것입니다. 이 두 가지 방어선과 전체를 무인으로 돌리는 방법은 [3부](build-overnight.md)에서 다룹니다.
