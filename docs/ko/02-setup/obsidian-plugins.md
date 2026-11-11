# 설치할 만한 플러그인

이 중 아무것도 설치하지 않아도 Obsidian은 잘 작동합니다. 각 플러그인이 풀어 주는 구체적인 문제에 부딪혔을 때 추가하십시오.

<a id="local-rest-api"></a>

## Local REST API

[MCP 경로](mcp-obsidian.md)에서만 필요합니다. 볼트를 로컬 HTTP API로 제공하므로 Obsidian이 열려 있는 동안 에이전트가 어떤 세션에서든 볼트에 접근할 수 있습니다.

<a id="dataview"></a>

## Dataview

프론트매터를 대상으로 질의하고 그 결과를 노트 안에 표시합니다. 대시보드가 필요할 만큼 페이지가 쌓였다면 쓸 만합니다:

````
```dataview
TABLE updated, tags
FROM "wiki/concepts"
WHERE updated < date(today) - dur(90 days)
SORT updated ASC
```
````

이 질의는 석 달 동안 아무도 건드리지 않은 개념 페이지를 나열하며, 볼트에서 가장 유용한 검토 질의입니다.

<a id="templater"></a>

## Templater

변수와 날짜를 쓰는 템플릿으로, [`vault-template/templates/`](../../../vault-template/templates/)에 있는 페이지 형태를 위한 것입니다. 손으로 쓰는 노트에 유용합니다. 에이전트는 프론트매터를 직접 쓰므로 필요하지 않습니다.

<a id="worth-adding-later"></a>

## 나중에 추가할 만한 것

- **[Git](https://github.com/Vinzent03/obsidian-git)**, 카탈로그에서 세 번째로 많이 설치된 플러그인입니다. Obsidian 안에서 커밋할 수 있으며, [버전 관리](../09-maintenance/versioning-with-git.md)와 짝을 이룹니다.
- **[Importer](https://github.com/obsidianmd/obsidian-importer)**, 공식 플러그인으로 Notion, Evernote, Roam, Bear, Apple Notes에서 가져옵니다. 기존에 쌓아 둔 노트를 옮긴다면 첫 단계입니다.
- **[Find orphaned files and broken links](https://github.com/Vinzent03/find-unlinked-files)**, 앱을 떠나지 않고 [린트](../09-maintenance/lint-and-health.md)와 같은 점검을 합니다.
- **[Omnisearch](https://github.com/scambier/obsidian-omnisearch)**, 더 나은 전문 검색을 제공하며 PDF 안까지 검색합니다.

설치 수가 포함된 전체 순위 목록: [resources/plugins.md](../../../resources/plugins.md).

<a id="what-to-avoid"></a>

## 피할 것

백그라운드에서 파일을 고쳐 쓰는 플러그인. 자동으로 서식을 정리하거나, 프론트매터를 자동으로 정렬하거나, 스케줄에 따라 이름을 바꾸는 것은 모두 에이전트와 충돌하며, 둘 중 누가 페이지를 망가뜨렸는지 밝히느라 하룻저녁을 쓰게 됩니다.

볼트에 볼 만한 자료가 쌓이기 전에는 무거운 그래프나 대시보드 플러그인도 피하십시오. 플러그인이 열다섯 개 깔린 빈 볼트는 시스템이 아니라 일을 미룬 흔적일 뿐입니다.

<a id="next"></a>

## 다음

[Git, 동기화, 백업](git-and-sync.md)
