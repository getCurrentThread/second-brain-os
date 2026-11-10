# 실습: 목표 테스트

실습 페이지 세 편으로 헤드리스 코딩 에이전트를 둘러싼 동작하는 루프를 조립합니다. 이 글은 뼈대를 만듭니다. 완료를 스크립트로 정의하고, 에이전트를 돌리고, 목표 테스트를 돌리고, 실패를 되먹이고, 시도 횟수에 상한을 둡니다. 예제는 [하네스 핸드북](../track-harness/claude-code-as-harness.md)의 참조 구현인 Claude Code의 비대화형 모드(`claude -p`)를 쓰지만, 프롬프트를 받아 파일을 고치는 CLI 에이전트라면 무엇이든 끼워 넣을 수 있습니다.

`claude`와 `jq`가 경로에 있어야 하고, 테스트 스위트가 있는 저장소가 필요합니다. 아래 플래그는 2026년 9월 기준으로 유효합니다. `-p`는 비대화형 세션을 한 번 실행합니다. `--allowedTools`는 권한 규칙 문법으로 도구를 미리 승인합니다(끝의 ` *`는 접두사 일치입니다). `--permission-mode acceptEdits`는 확인 없이 파일을 쓰게 합니다. `--output-format json`은 `total_cost_usd`를 비롯한 메타데이터와 함께 결과를 돌려줍니다.

<a id="done-as-a-script"></a>

## 스크립트로 정의한 완료

목표 테스트가 설계의 전부입니다. 실행 가능하고, 이진적이고, 에이전트의 통제 밖에 있어야 합니다. 여기서는 테스트와 린트입니다.

```bash
#!/usr/bin/env bash
# goal-loop.sh — run a coding agent until the goal test passes or attempts run out.
set -u

TASK="Make every test under tests/ pass. Do not delete, skip or weaken any test."
MAX_ATTEMPTS=5

goal_test() {
    python -m pytest -q --tb=short && ruff check .
}

feedback=""
attempt=1
while [ "$attempt" -le "$MAX_ATTEMPTS" ]; do
    echo "=== attempt $attempt of $MAX_ATTEMPTS ==="

    prompt="$TASK"
    if [ -n "$feedback" ]; then
        prompt="$TASK

The previous attempt failed the goal test with this output:
$feedback

Fix these specific failures."
    fi

    claude -p "$prompt" \
        --allowedTools "Read,Edit,Bash(python -m pytest *),Bash(ruff *)" \
        --permission-mode acceptEdits \
        --output-format json | jq -r '.total_cost_usd as $c | "agent done (cost $\($c))"'

    if feedback=$(goal_test 2>&1); then
        echo "PASS: goal test green on attempt $attempt"
        exit 0
    fi
    echo "FAIL: goal test still red"
    attempt=$((attempt + 1))
done

echo "STOP: $MAX_ATTEMPTS attempts spent; handing back to the human"
exit 1
```

저장하고 `chmod +x goal-loop.sh`를 실행한 다음, 실패하는 테스트가 있는 저장소에서 돌려 보십시오. 수렴하든 멈추든 지켜보면 됩니다.

<a id="why-each-piece-is-there"></a>

## 각 부분이 있는 이유

**목표 테스트는 에이전트가 아니라 래퍼에서 돌아갑니다.** 에이전트도 작업하면서 pytest를 돌립니다. 그건 괜찮습니다. 그렇게 길을 찾으니까요. 하지만 루프를 끝내는 판정은 모델이 건드리지 못하는 프로세스, 곧 당신의 셸에서 나옵니다. [크리틱과 검증](critics-and-verification.md)의 "루프는 확인하지, 묻지 않는다"는 규칙을 가장 작게 구현한 모습입니다.

**앞으로 전달되는 것은 실패 출력뿐입니다.** 시도마다 새 `claude -p` 세션입니다. 깨끗한 컨텍스트, 작업, 그리고 무엇이 아직 잘못되었는지에 대한 정제한 증거만 있습니다. 지난 시도의 혼란을 담은 트랜스크립트는 따라오지 않습니다. [컨텍스트 위생](context-hygiene.md)에서 말한 시도마다 새 컨텍스트라는 논거입니다.

**상한은 작고 종료 코드는 정직합니다.** 다섯 번 시도하고, 평이한 문장과 함께 종료 코드 1로 끝납니다. 덕분에 스크립트를 조합할 수 있습니다. CI가 이것을 게이트로 삼을 수 있고, cron이 이것으로 알림을 보낼 수 있고, 다음 두 실습 페이지가 이것을 감쌀 수 있습니다.

<a id="what-it-is-not-yet"></a>

## 아직 없는 것

이 루프는 초록불이면 무엇이든 받아들입니다. 에이전트가 보기 흉한 방법으로 테스트를 통과해도(죽은 코드, 삼켜 버린 오류, 테스트가 닿지 않는 곳에 슬쩍 한 변경) 그냥 지나갑니다. 2부에서 바로 이것을 잡아낼 판정자를 더합니다. [실습: 크리틱](build-critic.md)입니다.
