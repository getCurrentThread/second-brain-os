# 그래프 내보내기

Obsidian의 그래프 뷰는 뷰어입니다. 무엇이든 계산하려면 그래프를 뷰 밖으로 꺼내야 합니다.

<a id="export"></a>

## 내보내기

```bash
python3 scripts/graph_export.py ~/brain edges.csv
python3 scripts/graph_export.py ~/brain graph.graphml --format graphml
```

스크립트는 모든 위키링크를 엣지 목록으로 파싱하고, 페이지의 `type`을 노드 속성으로 싣고, 의존성이 없습니다. 코드용으로는 CSV, Gephi용으로는 GraphML입니다.

<a id="analysis"></a>

## 분석

```python
import networkx as nx, csv

g = nx.DiGraph()
with open("edges.csv") as f:
    next(f)
    g.add_edges_from(tuple(r) for r in csv.reader(f))

print(nx.number_weakly_connected_components(g))
print(sorted(nx.pagerank(g).items(), key=lambda kv: -kv[1])[:10])
print([n for n in g if g.in_degree(n) == 0])
```

열 줄로 세 가지 질문에 답합니다. 볼트가 얼마나 조각났는가, 어떤 페이지가 구조상 중심인가, 무엇에 닿을 수 없는가.

지식 그래프에는 PageRank를 한 번 돌려 볼 만합니다. 상위 페이지가 볼트가 실제로 무엇에 관한 것인지를 보여 주는데, 이것은 으레 스스로 말하는 내용과 다릅니다.

<a id="betweenness-the-one-worth-the-compute"></a>

## 매개 중심성, 계산할 가치가 있는 지표

```python
b = nx.betweenness_centrality(g)
```

매개 중심성은 한 페이지가 다른 두 페이지 사이의 최단 경로 위에 얼마나 자주 놓이는지를 잽니다. 매개 중심성이 높은 페이지가 클러스터 사이의 브리지입니다.

이들이 중요한 이유는 두 가지입니다. 가장 가치 있는 페이지이기 때문입니다. 어떤 단일 원본 자료에도 없던 연결을 담고 있습니다. 그리고 취약한 지점이기도 합니다. 브리지 페이지가 틀리거나 병합 중에 삭제되면, 볼트의 두 영역이 조용히 서로에게 도움이 되지 못하게 됩니다.

<a id="graph-databases"></a>

## 그래프 데이터베이스

[Ladybug](https://github.com/LadybugDB/ladybug)는 임베디드라 서버가 없고, [CSV를 바로 읽으며](https://docs.ladybugdb.com/import/csv), 자기 노트에 Cypher 질의를 던지는 것은 하룻저녁 즐기기에 정말 재미있습니다. 2025년 10월에 아카이브된 Kuzu의 유지보수되는 후속 프로젝트입니다. Neo4j는 완전한 버전이며, 그 위에 무언가를 만들 것이 아니라면 과합니다.

이것이 무엇인지 분명히 해 두십시오. 분석 계층이지 대체물이 아닙니다. 마크다운이 계속 기준이고, 데이터베이스는 다시 만들 수 있는 파생물입니다. 데이터베이스에만 존재하는 지식을 쓰기 시작하는 순간, 이 접근을 택할 가치가 있게 해 준 이식성을 잃습니다.

<a id="gephi"></a>

## Gephi

계산이 아니라 보기 위한 도구입니다. GraphML을 불러와 ForceAtlas2를 돌리고, 차수에 따라 노드 크기를 정하고, 유형에 따라 색을 입힙니다. Obsidian이 하지 못하는 방식으로 큰 그래프를 렌더링하며, 보여 줄 만한 스크린샷이 필요할 때 쓰는 도구입니다.

<a id="keep-it-in-sync"></a>

## 동기화 유지

내보낸 파일은 스냅샷이고 곧바로 낡습니다. 유지하지 말고 다시 생성하십시오. 내보낸 그래프를 고쳐 놓고 볼트가 따라오기를 기대해서도 안 됩니다.

<a id="next"></a>

## 다음

[추적할 가치가 있는 그래프 지표](metrics.md)
