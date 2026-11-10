# 버전 관리

Git은 에이전트를 무인으로 돌려도 안전하게 만들어 주는 것입니다. Git이 없으면 잘못된 실행은 수수께끼이고, 있으면 모든 변경이 읽을 수 있고 명령 하나로 되돌릴 수 있는 diff입니다.

<a id="commit-granularity"></a>

## 커밋 단위

실행 한 번에 커밋 하나, 그리고 그 실행의 이름을 붙입니다.

```
ingest 2026-09-07: 4 sources, 9 pages
lint 2026-09-07: 3 broken links, 1 merge
```

파일마다 커밋 하나는 아니고, 주마다 커밋 하나도 아닙니다. 전자는 이력을 묻어 버리고, 후자는 좋은 실행을 잃지 않고서는 나쁜 실행 하나만 되돌리는 것을 불가능하게 만듭니다.

예약된 작업은 실행의 일부로 자기 작업을 직접 커밋합니다. [예약 유지보수](../06-agents/scheduled-maintenance.md)를 보십시오.

<a id="reading-diffs-of-generated-pages"></a>

## 생성된 페이지의 diff 읽기

처음 몇 주 동안, 그리고 그 뒤에도 가끔 해 볼 만합니다.

볼 것은 두 가지입니다. 바뀌어서는 안 되는데 바뀐 페이지, 그리고 업데이트가 예상되는 곳에서 일어난 통째 재작성입니다. 덧붙이라고만 요청한 페이지를 에이전트가 조용히 다시 쓰는 것은 diff에서만 드러나는 종류의 행동입니다.

일주일 뒤의 `git log --stat`은 자동화가 어느 페이지를 가장 많이 건드리는지 알려 주며, 대개 참고가 됩니다.

<a id="reverting"></a>

## 되돌리기

```bash
git revert HEAD          # undo one run, keep the history
git checkout .           # discard uncommitted work
git checkout HEAD~3 -- wiki/concepts/some-page.md   # one page back
```

가운데 명령이 큰 작업 전에 커밋해야 하는 이유입니다. 중간에 잘못된 백필은 볼트가 아니라 그 실행 하나만 잃게 합니다.

<a id="branches"></a>

## 브랜치

구조를 건드리는 실험에는 그럴 가치가 있습니다. 새 페이지 규약, 스키마 변경, 다른 지시로 하는 일괄 재인제스트 같은 것입니다.

```bash
git checkout -b new-schema
```

실행하고, 결과를 읽고, 브랜치를 병합하거나 삭제합니다. 이것을 `main`에서 하고 나중에 결정하면, 볼트가 아무도 끝내고 싶지 않은 반쯤 이전된 상태로 남게 됩니다.

<a id="what-not-to-commit"></a>

## 커밋하지 말 것

`.obsidian/workspace*`, 캐시, 키가 들어 있는 모든 것. Local REST API 키는 플러그인 데이터에 있으므로, 첫 푸시 전에 `.obsidian/plugins/`를 확인하십시오.

볼트를 일부러 공개한 것이 아니라면 원격 저장소는 비공개로 두십시오.

<a id="next"></a>

## 다음

[백업과 이식성](backups-and-portability.md)
