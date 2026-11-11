# 볼트 구조

볼트는 서로 다른 두 가지 일을 하고, 두 일은 서로 다른 모양을 원합니다. 둘을 폴더 트리 하나에 두되 모양은 분리해 두어야 첫 달이 지나도 시스템이 무너지지 않습니다.

**지식 계층**은 읽고 이해한 것입니다. 끝없이 커지며 아이디어별로 정리됩니다.

**프로젝트 계층**은 지금 하고 있는 일입니다. 파이프라인별로 정리되며 대부분은 프로젝트가 끝나면 식어 버립니다.

```
brain/
  CLAUDE.md            who you are, how the vault works
  raw/                 source material, never edited after it lands
    assets/
  wiki/                the knowledge layer
    sources/           one page per ingested item
    entities/          people, organisations, products, tools
    concepts/          ideas, methods, frameworks
    synthesis/         comparisons, themes, open questions
    index.md           catalog of every page
    log.md             what the agent did, chronologically
  projects/            the project layer
    youtube-channel/
      CLAUDE.md        this project only
      Inputs/          ideas, briefs, raw material
      Process/         work in progress
      Outputs/         finished work
      Feedback/        results, metrics, what happened
  output/              generated reports and drafts
```

<a id="why-the-split"></a>

## 나누는 이유

프로젝트 파이프라인은 "이번 주에 나는 무엇을 하는가"에 답합니다. 위키는 "X에 대해 나는 무엇을 아는가"에 답합니다. 구조 하나에 둘을 다 시키면 죽은 작업 폴더로 가득 찬 지식 베이스가 되거나, 일하는 동안 아무도 열지 않는 개념 페이지 밑에 프로젝트가 묻히게 됩니다.

둘은 링크로 연결됩니다. 프로젝트 페이지는 자신이 의존하는 개념 페이지를 링크하고, 개념 페이지에는 그것을 쓴 프로젝트의 참조가 쌓입니다. 복리 효과가 드러나는 곳이 여기입니다. 한 분야에서 두 번째 프로젝트를 시작할 때는 지식 계층에 이미 그 내용이 있습니다.

<a id="set-the-projects-up-by-asking"></a>

## 에이전트에게 요청해서 프로젝트 설정하기

```
Create a project folder in my vault called youtube-channel. Inside it, create
four folders: Inputs, Process, Outputs, Feedback. Then write a CLAUDE.md inside
that project folder describing what this project is, its one goal, and your
specific role in helping me hit it. Interview me if you need details.
```

영역마다 반복합니다. 콘텐츠, 재무, 고객이 그렇습니다. 프로젝트마다 목표는 하나이며, 프로젝트 자체의 `CLAUDE.md`에 적습니다. 목표가 셋인 프로젝트는 어느 것에도 도움이 되지 않는 결과물을 냅니다.

<a id="rules-that-keep-it-working"></a>

## 계속 작동하게 하는 규칙

- **`raw/`는 절대 편집하지 마십시오.** 아카이브입니다. 자료가 잘못되었다면 파일을 교체하고 다시 인제스트해서, 실제로 저장한 것의 충실한 기록으로 남게 하십시오.
- **깊게 중첩하지 마십시오.** 네 단계 깊이의 폴더는 열리지 않게 됩니다. 탐색은 트리가 아니라 그래프가 합니다.
- **에이전트가 외부용으로 생성하는 모든 것은 `output/`이나 프로젝트의 `Outputs/`에 둡니다.** 볼트 루트에 아무렇게나 두지 마십시오.

<a id="next"></a>

## 다음

[프로젝트 범위 지정](project-scoping.md)
