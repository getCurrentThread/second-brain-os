# 실시간 데이터 커넥터

정적인 노트는 세컨드 브레인의 절반입니다. 나머지 절반은 변하는 것들입니다. 캘린더, 받은편지함, 결정이 실제로 내려지는 채널입니다.

MCP는 Obsidian을 연결할 때와 같은 방식으로 이것들도 연결합니다.

<a id="calendar"></a>

## 캘린더

```bash
claude mcp add google-workspace uvx workspace-mcp --tools calendar
```

OAuth 로그인 창이 브라우저에서 열립니다. 읽기 권한을 허용하십시오.

그러면 볼트가 그것을 바탕으로 움직일 수 있습니다:

```
Read my calendar for today, log what I committed to in each meeting into my
tasks project, and flag anything without a clear next step.
```

이메일, Slack, Notion은 각자의 MCP 서버를 통해 연결하며, 등록하는 방식은 같습니다.

<a id="grant-read-not-write"></a>

## 읽기만 허용하고 쓰기는 허용하지 않기

모든 커넥터에는 일을 해내는 가장 좁은 범위의 권한만 주고, 선택지가 있는 곳에서는 읽기 전용을 택하십시오. 세컨드 브레인은 데이터를 읽어야지, 삭제하거나 대신 무언가를 보내서는 안 됩니다.

<a id="the-rule-that-matters-most"></a>

## 가장 중요한 규칙

**프롬프트가 아니라 키입니다.**

에이전트에게 "이것을 삭제하지 마라"라고 말하는 것은 제안입니다. 안전 설정이 아닙니다. 에이전트가 기술적으로 파일을 삭제하거나, 폴더를 비우거나, 이메일을 보낼 수 있다면, 언젠가 예측하지 못한 어떤 상황에서 실제로 그렇게 합니다.

가능한 일을 권한 수준에서 통제하십시오. 읽기 전용 토큰, 범위가 제한된 키, 커넥터마다 별도의 자격 증명입니다. 그러면 `CLAUDE.md`의 지시는 경계 위에 얹은 선호가 되고, 받은편지함을 잘못된 실행으로부터 지키는 유일한 방어선이 되지 않습니다.

내 볼트에도 같은 원칙이 적용됩니다. [가드레일](../06-agents/safety-and-guardrails.md)을 보십시오.

<a id="what-is-worth-connecting"></a>

## 연결할 만한 것

결정과 약속이 있는 곳을 연결하십시오. 캘린더가 먼저이고, 그다음은 업무에 실제로 쓰는 이메일이나 채팅 중 하나입니다.

양만 많고 쓸모 있는 정보는 없는 것은 건너뛰십시오. 알림이 쏟아져 들어오는 커넥터는 이후 모든 질의의 품질을 떨어뜨립니다. 에이전트가 그 알림을 전부 걸러 가며 읽어야 하기 때문입니다.

<a id="next"></a>

## 다음

[설치할 만한 플러그인](obsidian-plugins.md)
