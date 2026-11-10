# 실습: 권한과 컨텍스트

[1편](build-the-loop.md)은 데모를 남겼습니다. 내키는 대로 실행하고, 트랜스크립트가 한없이 커지는 에이전트였습니다. 이번 편은 이것을 하네스로 만드는 세 가지, 곧 권한 게이트, 컨텍스트 예산, 종료 조건을 더합니다. [구성 요소 페이지](what-a-harness-is.md)는 이것들을 에이전트를 지켜보지 않고 맡겨 둘 수 있게 해 주는 부분이라고 불렀습니다. 여기서는 약 80줄이면 됩니다.

1편의 모든 것, 곧 import, `TOOLS`, `read_file`, `run_command`는 그대로 둡니다. `execute`와 `agent`를 교체하고, 나머지를 추가합니다.

<a id="the-code"></a>

## 코드

```python
MAX_TURNS = 30
CONTEXT_BUDGET = 100_000  # characters, roughly 25k tokens

ALLOWLIST = ["ls", "pwd", "cat", "head", "grep", "find",
             "git status", "git diff", "git log", "python", "pytest"]


def permitted(command):
    command = command.strip()
    if any(command == entry or command.startswith(entry + " ") for entry in ALLOWLIST):
        return True
    answer = input(f"\nAgent wants to run: {command}\nAllow? [y/N] ")
    return answer.strip().lower() in ("y", "yes")


def execute(name, tool_input):
    if name == "read_file":
        return read_file(tool_input["path"])
    if name == "run_command":
        if not permitted(tool_input["command"]):
            return "The user declined to run this command. Try another approach or ask them why."
        return run_command(tool_input["command"])
    raise ValueError(f"unknown tool: {name}")


def size_of(message):
    content = message["content"]
    if isinstance(content, str):
        return len(content)
    return sum(len(json.dumps(b)) if isinstance(b, dict) else len(b.model_dump_json())
               for b in content)


def describe(message):
    content = message["content"]
    if isinstance(content, str):
        return content[:150]
    parts = []
    for block in content:
        if isinstance(block, dict):
            parts.append(f"tool output, {len(json.dumps(block))} chars")
        elif block.type == "text":
            parts.append(block.text[:150])
        elif block.type == "tool_use":
            parts.append(f"ran {block.name}({json.dumps(block.input)[:100]})")
    return "; ".join(parts) or "(empty turn)"


def enforce_budget(messages, summaries):
    while sum(size_of(m) for m in messages) > CONTEXT_BUDGET and len(messages) > 5:
        summaries.append(describe(messages.pop(1)))
        summaries.append(describe(messages.pop(1)))


def with_summary(messages, task, summaries):
    if not summaries:
        return messages
    header = (task + "\n\n[Older turns were removed to fit the context budget. "
              "Summary of what happened in them:\n- " + "\n- ".join(summaries) + "]")
    return [{"role": "user", "content": header}] + messages[1:]


def agent(task):
    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": task}]
    summaries = []
    for turn in range(MAX_TURNS):
        enforce_budget(messages, summaries)
        response = client.messages.create(
            model=MODEL, max_tokens=8000, system=SYSTEM, tools=TOOLS,
            messages=with_summary(messages, task, summaries),
        )
        for block in response.content:
            if block.type == "text":
                print(block.text)
        if response.stop_reason != "tool_use":
            return
        messages.append({"role": "assistant", "content": response.content})
        results = []
        for block in response.content:
            if block.type != "tool_use":
                continue
            print(f"-> {block.name} {json.dumps(block.input)}")
            try:
                results.append({"type": "tool_result", "tool_use_id": block.id,
                                "content": execute(block.name, block.input)})
            except Exception as exc:
                results.append({"type": "tool_result", "tool_use_id": block.id,
                                "content": f"Error: {exc}", "is_error": True})
        messages.append({"role": "user", "content": results})
    print("Stopped: hit the turn limit without finishing.")
```

<a id="the-permission-gate"></a>

## 권한 게이트

허용 목록에 있는 읽기 전용 명령은 조용히 실행되고, 그 밖의 것은 `input()`으로 사용자에게 묻습니다. 거절된 명령은 예외가 아니라 평범한 도구 결과로 돌아갑니다. 모델은 그것을 데이터로 읽고 방향을 바꿉니다. 여기서는 솔직해야 합니다. 접두어 일치는 허술해서(`git diff; rm -rf ~`도 `git diff `로 시작합니다), 프로덕션 하네스가 명령을 제대로 파싱하고 실행까지 샌드박스에 가두는 이유가 이것입니다. 이 게이트가 가르치는 것은 구조이지 보안이 아닙니다.

<a id="the-context-budget"></a>

## 컨텍스트 예산

트랜스크립트가 예산을 넘으면 작업 메시지 다음의 가장 오래된 턴부터 쌍으로 버립니다. 어시스턴트 턴과 그 도구 결과가 한 쌍이라서 어떤 `tool_use` 블록도 짝을 잃지 않습니다. 버린 턴마다 한 줄 요지가 누적 요약에 더해지고, 이 요약은 첫 메시지에 실려 갑니다. 일부러 투박하게 만들었습니다. 도구 출력은 부피가 크고 다시 필요한 일이 드물다는, [컨텍스트 엔지니어링](context-engineering.md)에서 설명한 바로 그 거래입니다.

<a id="the-stop-condition"></a>

## 종료 조건

`MAX_TURNS`는 모델이 끝낼 수 없는 작업에서 계속 돌 때 청구 금액에 상한을 겁니다. 진짜 하네스에는 모두 이것이 있고, 만드는 사람은 누구나 한 번은 이것을 빼먹습니다.

이제 축소판 하네스가 생겼습니다. 아직 없는 것이 무엇이고 그것이 언제 문제가 되는지는 [3편](build-graduate.md)에 있습니다.
