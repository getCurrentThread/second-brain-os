# 하네스 실습

이론은 끝났으니 이제 실제 에이전트를 보강해 봅니다. 예제는 Postgres 데이터베이스를 쓰는 웹 앱 위에서 Claude Code로 돌리는 코딩 에이전트이지만, 모든 단계는 [루프 실습](../track-harness/build-the-loop.md)의 일흔 줄짜리 루프를 포함해 어떤 하네스에도 그대로 옮길 수 있습니다. 고리를 순서대로 하나씩 진행합니다.

> 이 실습에서 하네스를 점검하는 절반은 스킬로 묶여 있습니다. [강좌 플러그인](../../../plugins/README.md)을 설치하고, 직접 보강하기 전에 `/agents-course:harness-audit`를 실행하십시오.

단계에 들어가기 전에 한 가지 전제가 있습니다. 이 세션은 이미 돌리고 있는 에이전트를 보강합니다. 하네스 자체를 처음부터 만드는 일, 즉 일흔 줄짜리 루프와 그 가드레일은 [하네스 핸드북의 실습](../track-harness/build-the-loop.md)에서 다룹니다.

<a id="step-one-build-the-walls"></a>

## 1단계: 벽 세우기

첫 프롬프트 전에, 에이전트가 닿을 수 없는 범위를 정합니다. 작업 중인 체크아웃 대신 워크트리를 주고, 읽기만 할 수 있는 데이터베이스 사용자를 줍니다.

```bash
git worktree add ../agent-workspace -b agent/task-one
```

```sql
CREATE USER agent_ro WITH PASSWORD 'rotate-me';
GRANT CONNECT ON DATABASE app TO agent_ro;
GRANT USAGE ON SCHEMA public TO agent_ro;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO agent_ro;
```

에이전트가 패키지를 설치하거나 API를 호출해야 한다면, 네트워크 허용 목록(패키지 레지스트리와 모델 API만, 나머지는 없음)을 건 컨테이너에서 돌리십시오. 이 단계를 제대로 마쳤는지는 이렇게 확인합니다. 일어날 수 있는 최악의 세션을 상상하고, 피해 범위가 삭제된 워크트리 하나인지 확인합니다.

<a id="step-two-write-the-guides"></a>

## 2단계: 가이드 쓰기

저장소 루트에 AGENTS.md 하나를 둡니다. 매 세션 읽힐 만큼 짧아야 합니다.

```markdown
- App code in src/, tests in tests/, run everything from the repo root.
- `make check` must pass before you call any task done.
- Never hand-edit files in migrations/ — generate them with `make migration`.
- Your database user is read-only. Ask before proposing any schema change.
```

모든 줄은 에이전트가 따라 움직일 수 있는 규칙 하나를 말합니다. 철학도, 내력도 없습니다.

<a id="step-three-wire-the-sensors"></a>

## 3단계: 센서 연결하기

결정론적인 검사를 명령 하나로 묶고, 모델이 기억해 주기를 바라는 대신 변경이 있을 때마다 하네스가 그 명령을 돌리게 합니다.

```make
check:
	ruff check .
	mypy src
	pytest -q
```

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "make check" }
        ]
      }
    ]
  }
}
```

실패는 곧바로 트랜스크립트에 남습니다. 실수가 생긴 지 편집 한 번밖에 지나지 않았을 때입니다.

<a id="step-four-strip-the-permissions"></a>

## 4단계: 권한 줄이기

최소 권한을 적용하고, 승인은 되돌릴 수 없는 일에만 둡니다.

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(make check)", "Bash(git diff:*)", "Bash(git status)"],
    "ask": ["Bash(git commit:*)", "Bash(git push:*)"],
    "deny": ["WebFetch", "Bash(rm:*)"]
  }
}
```

사람들은 눈앞에 뜨는 요청을 거의 다 승인하므로, 사람이 실제로 읽는 확인 목록은 짧은 것뿐입니다. 매일 생각 없이 승인하고 있는 것이 있다면 허용으로 옮기십시오. 더 좋은 방법은 아예 불가능하게 만들어 요청을 없애는 것입니다.

<a id="step-five-add-one-hook"></a>

## 5단계: 훅 하나 더하기

AGENTS.md의 규칙 중 어겼을 때 피해가 가장 큰 것을 골라 강제합니다.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | grep -q 'migrations/' && { echo 'Blocked: generate migrations with make migration' >&2; exit 2; } || exit 0"
          }
        ]
      }
    ]
  }
}
```

잘 고른 훅 하나가 쉴 새 없이 발동하는 훅 열 개보다 낫습니다.

<a id="the-quarterly-review"></a>

## 분기별 점검

하네스의 모든 부품은 모델이 무언가를 하지 못한다는 데 건 내기이고, 그 내기는 만료됩니다. Anthropic은 모델을 한 번 올리자 쓸모없는 짐이 된 스캐폴딩 구성 요소 하나(조기 마무리를 막는 컨텍스트 리셋)를 통째로 지웠습니다. 그러니 달력에 반복 일정을 넣으십시오. 훅, 가이드 줄, 거부한 권한마다 "이것은 모델이 X를 하지 못하기 때문에 있다"라는 문장을 쓰고, 현재 모델로 X를 시험해 보십시오. 더 이상 제값을 못 하는 것은 지웁니다. 늘어나기만 하는 하네스는 이미 사라진 모델을 보완하고 있는 것입니다.

<a id="tips"></a>

## 팁

- AGENTS.md에는 에이전트가 같은 것을 두 번 틀린 뒤에만 규칙을 추가하십시오. 추측으로 만든 규칙은 썩습니다.
- 훅이 발동해 호출을 막은 경우를 기록하십시오. 한 번도 발동하지 않는 훅은 점검 때 삭제 후보입니다.
- 도구 설명도 가이드입니다. 도구를 추가하기 전에 [도구와 MCP](../track-harness/tools-and-mcp.md)를 보십시오.

<a id="prove-it-to-yourself"></a>

## 직접 확인하기

1. 매번 새 세션에서 AGENTS.md가 있을 때와 없을 때 같은 작업을 돌려 보십시오. 트랜스크립트를 비교합니다.
2. 하루 근무 동안 권한 요청이 몇 번 떴고 그중 몇 번을 승인했는지 세어 보십시오. 자신의 승인율을 계산합니다.
3. 하네스 구성 요소 하나를 끄고, 그것이 지키려던 작업을 다시 돌려, 실제로 결과가 나빠지는지 확인하십시오.

다음: 센서는 모듈 하나를 따로 둘 만합니다. [두 가지 점검](../course-5-evals/two-kinds-of-checks.md)입니다.

더 깊이 → [에이전트 하네스 핸드북](../track-harness/what-a-harness-is.md): 장치의 깊은 구조, 생태계 지형, 그리고 약 150줄로 만드는 동작하는 하네스.
