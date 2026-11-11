# 실습: 루프

[구성 요소 페이지](what-a-harness-is.md)는 모든 하네스의 핵심이 while 루프라고 주장했습니다. 이 페이지가 그것을 증명합니다. 약 70줄의 Python으로, 실제 Claude API를 상대로 파일을 읽고 명령을 실행하는 에이전트를 만듭니다. [2부](build-guardrails.md)는 이것을 하네스로 만들어 주는 장치를 더합니다. 세 페이지를 모두 하는 데 하룻저녁이면 되고, 코드는 합쳐서 약 150줄입니다.

Python 3.10 이상, `pip install anthropic`(1.x SDK), 그리고 환경 변수로 설정한 `ANTHROPIC_API_KEY`가 필요합니다.

<a id="two-tools"></a>

## 도구 두 개

도구는 JSON 스키마와 함수입니다. 설명은 코드만큼 중요합니다. 모델이 설명을 읽고 고르기 때문이며, 이 점은 [도구와 MCP](tools-and-mcp.md)에서 길게 다룹니다.

<a id="the-code"></a>

## 코드

```python
import json
import subprocess
import sys

import anthropic

MODEL = "claude-opus-5"
SYSTEM = "You are a coding agent working in the current directory. Investigate before you conclude."

TOOLS = [
    {
        "name": "read_file",
        "description": "Read a text file and return its full contents. Use for source files, configs and logs. Paths are relative to the working directory.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string", "description": "File path, e.g. src/main.py"}},
            "required": ["path"],
        },
    },
    {
        "name": "run_command",
        "description": "Run a shell command and return its exit code, stdout and stderr. Use for listing files, searching and running tests. Times out after 30 seconds.",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string", "description": "The command, e.g. ls -la"}},
            "required": ["command"],
        },
    },
]


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def run_command(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
    return f"exit code {result.returncode}\n{result.stdout}{result.stderr}"


def execute(name, tool_input):
    if name == "read_file":
        return read_file(tool_input["path"])
    if name == "run_command":
        return run_command(tool_input["command"])
    raise ValueError(f"unknown tool: {name}")


def agent(task):
    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": task}]
    while True:
        response = client.messages.create(
            model=MODEL, max_tokens=8000, system=SYSTEM, tools=TOOLS, messages=messages
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


if __name__ == "__main__":
    agent(" ".join(sys.argv[1:]) or "List the files here and describe this project.")
```

<a id="what-each-part-is-doing"></a>

## 각 부분이 하는 일

API는 `stop_reason`으로 의도를 알립니다. 그 값이 `tool_use`인 동안 응답에는 `tool_use` 블록이 들어 있고, 각 블록에는 `id`, `name`, 파싱된 `input` 딕셔너리가 있습니다. 어시스턴트의 `response.content` 전체를 그대로 다시 덧붙이고(현재 모델은 함께 전달되어야 하는 생각(thinking) 블록을 포함합니다), 모든 도구 호출을 실행한 뒤, 결과를 전부 `tool_result` 블록으로 만들어 사용자 메시지 하나에 담아 돌려줍니다. 각 결과는 `tool_use_id`로 짝을 맞춥니다. 실패도 `is_error` 표시를 달아 돌려줍니다. 좋은 오류 메시지가 있으면 모델이 추측하지 않고 한 턴 만에 복구할 수 있습니다.

`agent.py`로 저장하고 `python agent.py "find the TODO comments in this repo and summarise them"`을 실행해 루프가 도는 것을 지켜보십시오. [자료](resources.md)에 있는 Thorsten Ball의 튜토리얼은 같은 일을 Go로 합니다. 요점은 직접 쓰는 터미널에서 눈으로 확인하는 것입니다.

<a id="what-it-is-not-yet"></a>

## 아직 없는 것

이것은 데모입니다. 모델이 내키는 명령이면 무엇이든 실행하고, 긴 작업에서는 트랜스크립트가 한없이 커집니다. 이 두 가지, 곧 권한과 컨텍스트를 고치는 것이 [2부](build-guardrails.md)입니다.
