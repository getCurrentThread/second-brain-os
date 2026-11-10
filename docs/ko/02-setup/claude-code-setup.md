# 볼트 안의 Claude Code

Claude Code는 읽고 쓰는 쪽 절반입니다. 실행하는 방법은 두 가지이며, 선택은 어디에 입력하느냐에만 영향을 줄 뿐 일어나는 일에는 영향을 주지 않습니다.

<a id="option-a-the-desktop-app"></a>

## 옵션 A: 데스크톱 앱

[claude.com/download](https://claude.com/download)에서 Claude Desktop을 내려받아 로그인합니다. 앱에는 **Code** 탭이 있으며, 터미널 없이 쓰는 Claude Code입니다. 명령줄을 써 본 적이 없다면 여기서 시작하십시오.

<a id="option-b-the-terminal"></a>

## 옵션 B: 터미널

Claude Code를 설치한 뒤 볼트 폴더 안에서 `claude`를 실행합니다:

```bash
cd ~/brain
claude
```

이렇게 시작하면 에이전트는 플러그인도 MCP 서버도 거치지 않고 파일시스템을 통해 볼트를 직접 읽고 씁니다. 가능한 가장 단순한 설정이며, 이 가이드의 인제스트, 구조화, 검색 섹션에 나오는 모든 작업에 충분합니다.

플랫폼별 설치 방법은 [공식 설정 문서](https://code.claude.com/docs/en/setup)에 있습니다.

<a id="option-c-inside-obsidian"></a>

## 옵션 C: Obsidian 안에서

커뮤니티 플러그인이 이제 에이전트를 편집기 안에 넣어 주며, 사용량도 많습니다. [Claudian](https://github.com/yishentu/claudian)은 설치 수가 200만을 넘고 [Copilot](https://github.com/logancyang/obsidian-copilot)이 바짝 뒤를 쫓습니다. 둘 다 노트 옆 패널에서 Claude Code, Codex 또는 로컬 에이전트를 실행합니다.

창을 오가는 일이 완전히 사라진다는 점에서 알아 둘 만합니다. 이 가이드가 인제스트를 일정에 따라 돌리는 것과 같은 이유로 조심할 만하기도 합니다. 편집기 안의 에이전트는 `log.md`에 남지 않는 즉흥 편집을 부르고, 기록되지 않은 볼트는 감사할 수 없기 때문입니다.

합리적인 분담은 대화와 초안에는 플러그인을 쓰고, 위키 페이지를 쓰는 일에는 터미널이나 예약 작업을 쓰는 것입니다.

<a id="plan-requirement"></a>

## 요금제 요건

Claude Code에는 유료 계정이 필요합니다. Pro, Max, Team, Enterprise, 또는 토큰당 과금되는 Console 계정입니다. Anthropic의 설정 문서에 따르면 무료 Claude.ai 요금제에는 Claude Code 접근이 포함되지 않습니다. Code 탭에서 업그레이드하라는 안내가 뜬다면 그 때문입니다.

<a id="filesystem-or-mcp"></a>

## 파일시스템 또는 MCP

둘 다 됩니다. 차이는 크지 않지만 고르기 전에 알아 둘 만합니다:

| | 파일시스템 | MCP |
|---|---|---|
| 설정 | 없음, 볼트로 `cd`만 하면 됨 | 플러그인과 설정 명령 |
| Obsidian 실행 | 불필요 | 필요, 플러그인이 API를 제공 |
| 범위 | 시작한 폴더 그대로 | 어디서든 볼트 전체 |
| 실패 모드 | 거론할 만한 것 없음 | 플러그인 꺼짐, 앱 닫힘, 잘못된 포트 |

파일시스템으로 시작하십시오. 볼트 안에서 실행하지 않는 세션에서도 에이전트가 볼트에 닿게 하고 싶을 때 [MCP](mcp-obsidian.md)로 옮기십시오. 예약 작업을 추가하면 대개 그때부터 중요해집니다.

<a id="first-run"></a>

## 첫 실행

무엇이든 시키기 전에 먼저 구조를 읽게 합니다:

```
Read CLAUDE.md and wiki/index.md, then tell me what this vault currently
contains and what is missing.
```

답을 보면 에이전트가 지시를 이해했는지 바로 알 수 있습니다. 요청하지 않은 구조를 지어내기 시작한다면 `CLAUDE.md`가 너무 모호한 것입니다. [CLAUDE.md 작성하기](claude-md.md)를 보십시오.

<a id="permissions"></a>

## 권한

에이전트는 파일을 편집하기 전에 허락을 구합니다. 볼트에 대한 쓰기 권한만 주고 그 밖에는 주지 마십시오. 잃으면 안 되는 것이 들어 있는 폴더에는 포괄적인 셸 접근을 허용하지 말고, 무엇이든 일정에 따라 자동화하기 전에 [가드레일](../06-agents/safety-and-guardrails.md)을 읽으십시오.

<a id="next"></a>

## 다음

[Obsidian용 MCP](mcp-obsidian.md)
