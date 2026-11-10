# 실습: 루프에 넣기

세 번째 부분입니다. 그래프가 존재하고 질문에 답합니다. 이제 에이전트가 사람을 거치지 않고 그것에 닿아야 합니다. MCP 서버도, 프레임워크도 없습니다. 도구 인터페이스는 "텍스트를 출력하는 스크립트를 셸로 호출한다"는 것이며, Claude Code는 이미 이를 네이티브로 하고, 이 방식은 어떤 프레임워크 이전에도 살아남습니다.

<a id="a-slash-command-not-a-server"></a>

## 서버가 아니라 슬래시 커맨드

볼트에 `.claude/commands/connects.md`로 넣습니다.

```markdown
---
description: What connects two pages
---

Regenerate the edge list with `python scripts/graph_export.py . edges.csv`,
then run `python scripts/graph_query.py connects` with the two page names
from $ARGUMENTS, each in quotes. Explain the chain in one short paragraph,
naming the edge types, and say plainly if nothing connects them.
```

이제 `/connects "Jerry Liu" "Lost in the Middle"`은 에이전트에게 지어낼 연상이 아니라 설명할 계산된 사슬을 줍니다. 먼저 내보내기를 다시 하는 것이 중요합니다. 에이전트는 페이지를 끊임없이 편집하므로, 어제의 CSV에 대한 질의는 어제의 볼트에 대해 답합니다. 타입 엣지는 더 천천히 낡습니다. [실습: 그래프 추출](build-extract.md)의 추출 패스를 매달, 또는 대규모 인제스트 배치 뒤에 다시 돌리십시오.

더 깊은 변화는 에이전트의 상시 지침에 있습니다. 볼트의 `CLAUDE.md`에 한 줄을 추가하십시오.

```text
Before answering any question about how two topics relate, run
scripts/graph_query.py connects with both page names and ground
the answer in the chain it returns.
```

이렇게 하면 그래프는 에이전트가 쓸 수 있는 도구에서 실제로 쓰는 도구로 바뀝니다. 참고서를 갖고 있는 것과 인용하는 것의 차이입니다.

<a id="the-weekly-health-check"></a>

## 주간 상태 점검

그래프는 썩고, [지식 그래프가 필요한 이유](why-graphs.md)는 낡은 그래프가 그래프가 없는 것보다 나쁘다고 단호하게 말합니다. 그래서 그래프에도 볼트의 다른 모든 것처럼 유지보수 루프를 둡니다. 매주, 손으로 또는 일정에 따라 다음을 실행하십시오.

```text
Run python scripts/graph_export.py . edges.csv, then
python scripts/graph_query.py communities. Report three things:

1. Orphans: pages under wiki/ that appear in no edge at all
   (compare filenames against the nodes in edges.csv). Propose a
   page each should be linked from, or flag it for deletion.
2. Weak clusters: communities of three pages or fewer that are not
   from this week's ingestion. Say whether each should be linked
   into a larger cluster or left to grow.
3. One bridge worth building: the two largest communities with no
   typed edge between them, and the page or link that would
   connect them.

Keep the report to ten lines. Do not change anything without asking.
```

고아 페이지는 수집의 실패이고, 약한 클러스터는 끝내 자리 잡지 못한 주제이며, 빠진 브리지는 대개 보고서에서 가장 흥미로운 줄입니다. 자신이 가진 두 지식 덩어리가 한 번도 만난 적이 없다는 뜻이기 때문입니다. 읽기 전용 규칙이 중요합니다. 상태 점검이 조용히 링크를 다시 이어 버리는 것은 볼트가 더 이상 내 것이 아니게 되는 방식입니다.

<a id="when-to-graduate"></a>

## 졸업할 때

CSV와 NetworkX 계층으로는 더 이상 부족하다는 신호를, 대개 나타나는 순서대로 적습니다.

- 질의에 이력이 필요한데("3월에 나는 무엇을 믿었는가") 평평한 엣지에는 타임스탬프가 없습니다.
- 여러 에이전트가 동시에 쓰고, CSV에서 마지막 쓰기가 이기는 방식이 엣지를 삼키기 시작합니다.
- 노드가 수만 개를 넘어서면서, 다시 불러오는 데 밀리초가 아니라 몇 초가 걸립니다.

각각은 [그래프 저장소](graph-stores.md)의 사다리에 있는 한 단이며, 엣지 목록은 모든 도구가 가져올 수 있는 교환 형식이므로 이전은 오후 한나절이면 됩니다. 신호가 실제로 울리기 전까지는 지금 있는 곳에 머무르십시오. 이 계층 전체가 스크립트 둘, 프롬프트 하나, CSV 둘이고, 모든 부분을 그 주인이 읽을 수 있습니다.

<a id="what-you-have"></a>

## 지금 가진 것

추출기, 질의 도구, 슬래시 커맨드, 유지보수 루프. 저녁 한나절의 비용으로 자신의 노트 위에 동작하는 경량 GraphRAG를 만들었습니다. 여기서 욕심이 더 커지면, [도구](tools.md)에서 개관한 프레임워크가 같은 모양에 규모만 키운 것입니다.
