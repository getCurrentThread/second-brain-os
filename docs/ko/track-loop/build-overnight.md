# 실습: 야간 루프

마지막 실습은 무인으로 돌아갑니다. [1부와 2부](build-goal-test.md)의 내용은 모두 그대로 적용됩니다. 달라지는 것은 아무도 지켜보지 않는다는 점이므로, 가드레일은 최악의 경우도 평범하게 만들어야 합니다. 반복 횟수 예산, 진전이 멈추는 순간 실행을 끝내는 래칫, 마크다운 아침 보고서, 그리고 안전망인 git입니다. 전용 브랜치를 쓰고, 퇴보하면 하드 리셋하며, 아무것도 푸시하지 않습니다.

래칫이 핵심입니다. 매 반복은 이전 최고 점수(여기서는 통과한 테스트 수)를 넘어서야 하고, 그렇지 못하면 루프가 그 시도를 되돌리고 멈춥니다. 단조로운 진전이 아니면 아무것도 아닙니다. 밤새 옆으로 움직이도록 허락받은 루프는 정말 그렇게 합니다. 이유는 [종료 조건](stop-conditions.md)에 있습니다.

<a id="the-code"></a>

## 코드

```python
#!/usr/bin/env python3
"""overnight.py — unattended agent loop: budgeted, ratcheted, reported."""
import datetime
import json
import pathlib
import re
import subprocess

TASK = ("Open TODO.md. Implement the top unchecked item, add tests for it, "
        "and tick the item off. Do not delete, skip or weaken any existing test.")
MAX_ITERATIONS = 10
RATCHET = pathlib.Path("ratchet.json")
REPORT = pathlib.Path("MORNING-REPORT.md")


def sh(cmd, timeout=2400):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True,
                          timeout=timeout)


def score():
    """Progress metric: tests passing. Higher is better; it must never fall."""
    out = sh("python -m pytest -q --tb=no").stdout
    m = re.search(r"(\d+) passed", out)
    return int(m.group(1)) if m else 0


def main():
    stamp = datetime.datetime.now().strftime("%Y%m%d-%H%M")
    sh(f"git checkout -b overnight/{stamp}")  # rail 1: own branch, never pushed
    best = score()
    RATCHET.write_text(json.dumps({"best": best}))
    lines = [f"# Overnight report {stamp}", "",
             f"Baseline: {best} tests passing.", ""]

    for i in range(1, MAX_ITERATIONS + 1):
        sh('claude -p "{}" '
           '--allowedTools "Read,Edit,Bash(python -m pytest *)" '
           '--permission-mode acceptEdits '
           '--permission-prompts none'.format(TASK))
        now = score()
        if now > best:
            best = now
            RATCHET.write_text(json.dumps({"best": best}))
            sh(f'git add -A && git commit -m "overnight {i}: {now} passing"')
            lines.append(f"- iteration {i}: improved to {now} passing, committed")
        else:
            sh("git reset --hard")            # rail 2: a bad attempt never survives
            lines.append(f"- iteration {i}: {now} passing, no improvement; stopped")
            break
    else:
        lines.append(f"- iteration budget of {MAX_ITERATIONS} spent")

    lines += ["", f"Final: {best} passing on branch overnight/{stamp}. "
                  "Nothing was pushed; review and merge by hand."]
    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
```

자기 전에 `python overnight.py`를 돌리고, 아침에 커피를 마시며 `MORNING-REPORT.md`를 읽으십시오.

<a id="the-rails-spelled-out"></a>

## 가드레일 하나씩 살펴보기

**브랜치에 커밋하고, 푸시는 하지 않습니다.** 개선은 모두 `overnight/<stamp>`에 커밋되므로, 아침의 결정은 평범한 브랜치에 대한 평범한 코드 리뷰가 됩니다. 스크립트에는 푸시가 없고 에이전트에게는 git 권한이 전혀 없습니다. `--allowedTools`는 읽기, 편집, pytest만 허용하고 그 밖에는 아무것도 허용하지 않습니다. `--permission-prompts none`은 하네스에게 대답해 줄 사람이 없다고 알립니다. 확인을 요청하게 될 동작은 새벽까지 멈춘 채 매달려 있지 않고 거부됩니다.

**퇴보하면 리셋합니다.** 점수가 오르지 못하면 `git reset --hard`가 멈추기 전에 그 시도를 버립니다. 래칫과 합치면 불변 조건이 강력해집니다. 브랜치에는 직전보다 측정 가능하게 나은 상태만 들어 있으므로, 모든 diff를 다시 읽지 않고도 보고서를 믿을 수 있습니다.

**보고서가 우편함입니다.** 무인 루프는 무인 실수를 저지르며, 보고서는 그 실수가 반복마다, 작동한 브레이크와 함께 드러나는 자리입니다. 반복 사이에 남는 것은 `TODO.md`와 래칫 파일뿐입니다. [컨텍스트 위생](context-hygiene.md)에 따라 일부러 그렇게 했습니다. 세션은 매번 맨 처음 상태로 깨어나 할 일을 읽고 범위가 정해진 일 하나만 합니다.
