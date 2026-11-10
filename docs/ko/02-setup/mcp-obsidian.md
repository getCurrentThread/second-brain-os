# Obsidian용 MCP

MCP는 Claude가 다른 애플리케이션과 대화하는 표준 방식입니다. 볼트의 경우 그 아래 폴더가 아니라 Obsidian 자체로 통하는 문을 하나 더 내는 것이며, 그 디렉터리 안에서 시작한 세션만이 아니라 어떤 세션에서든 에이전트가 볼트를 다룰 수 있게 됩니다.

시작하는 데는 필요하지 않습니다. 예약 작업을 쓰고 싶을 때, 또는 볼트 안의 터미널이 아니라 데스크톱 앱에서 작업할 때 추가하십시오.

<a id="two-routes"></a>

## 두 가지 경로

[Local REST API 플러그인](https://github.com/coddingtonbear/obsidian-local-rest-api)은 이제 `/mcp/`에 내장 MCP 서버를 포함하므로 별도의 서버가 더는 필요 없습니다. 먼저 README를 확인하십시오. 내장 서버가 필요한 것을 모두 다룬다면 곧바로 클라이언트에 등록하고, 아래 2단계는 무시하십시오.

여기서 설명하는 서드파티 경로, 즉 플러그인의 REST API 위에서 `mcp-obsidian`을 쓰는 방식은 여전히 문서가 가장 많고 대부분의 가이드가 설명하는 방식입니다. 두 경로는 같은 곳에 도착합니다.

<a id="step-1-enable-the-plugin"></a>

## 1단계: 플러그인 켜기

Obsidian에서: **Settings**(왼쪽 아래 톱니바퀴) → **Community plugins** → **Turn on community plugins** → **Browse** → `Local REST API` 검색 → **Install** → **Enable**.

플러그인 설정을 엽니다. **API Key**가 있는데, 글자와 숫자로 된 긴 문자열입니다. 이것을 복사하십시오.

Obsidian은 키 앞에 `Bearer`라는 단어를 붙여 보여 줍니다. 이 단어는 키의 일부가 아닙니다. 그 뒤의 문자열만 복사하십시오. 첫 시도에서 연결이 실패하는 가장 흔한 단일 원인입니다.

<a id="step-2-register-the-server"></a>

## 2단계: 서버 등록하기

Claude Code 탭이나 터미널에서 `PASTE-YOUR-KEY-HERE` 자리에 키를 붙여 넣어 실행합니다:

```bash
claude mcp add-json obsidian-vault '{
  "type": "stdio",
  "command": "uvx",
  "args": ["mcp-obsidian"],
  "env": {
    "OBSIDIAN_API_KEY": "PASTE-YOUR-KEY-HERE",
    "OBSIDIAN_HOST": "127.0.0.1",
    "OBSIDIAN_PORT": "27124"
  }
}'
```

`uvx`는 영구 설치 없이 서버를 실행합니다. 명령을 찾을 수 없다면 먼저 `uv`를 설치하십시오.

<a id="step-3-test-it"></a>

## 3단계: 시험하기

```
List every file in my Obsidian vault.
```

에이전트가 노트를 읽어 되돌려 준다면 연결이 된 것입니다.

<a id="when-it-does-not-work"></a>

## 작동하지 않을 때

- **Obsidian이 닫혀 있습니다.** 플러그인이 앱 안에서 API를 제공하므로 Obsidian이 실행 중일 때만 연결이 존재합니다.
- **키에 `Bearer`가 들어 있습니다.** 지우십시오.
- **포트가 틀렸습니다.** 플러그인 설정에 표시된 포트를 설정 파일의 값과 비교하십시오. 기본값은 27124입니다.
- **플러그인이 꺼져 있습니다.** 업데이트 뒤에 제한 모드가 다시 켜지면 커뮤니티 플러그인이 꺼집니다.

<a id="do-you-need-this-at-all"></a>

## 정말 필요한가

`mcp-obsidian`의 유지 보수되던 포크 하나는, 볼트가 디스크 위의 마크다운 파일일 뿐인데 REST 플러그인을 거치면 복잡도만 늘어난다는 이유로 아카이브되었습니다. 이 가이드가 파일시스템으로 시작하라고 하는 것과 같은 논거이며, 진지하게 받아들일 만합니다. MCP는 볼트 안에서 실행되지 않는 세션에서 볼트에 닿아야 할 때 비로소 제값을 하며, 그 전에는 그렇지 않습니다.

<a id="security"></a>

## 보안

이 설정은 노트에 대한 전체 읽기와 쓰기 권한을 주는 키가 달린 로컬 HTTP 서버를 엽니다. `127.0.0.1`에만 두고, 포트를 절대 노출하지 말고, 키를 비밀번호처럼 다루십시오. 공개된 곳에 붙여 넣었다면 플러그인 설정에서 키를 교체하십시오.

<a id="next"></a>

## 다음

[CLAUDE.md 작성하기](claude-md.md)
