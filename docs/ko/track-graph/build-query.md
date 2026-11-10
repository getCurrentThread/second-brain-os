# 실습: 그래프 질의

실습의 두 번째 부분입니다. [실습: 그래프 추출](build-extract.md)은 볼트 루트에 파일 두 개를 남겼습니다. 단순 링크를 담은 `edges.csv`와, 타입 패스의 결과를 담은 `typed_edges.csv`입니다. 이 페이지는 그 파일들을 답으로 바꿉니다. Python으로 마흔 줄 남짓입니다.

저장소는 메모리 안의 NetworkX이며, 호출할 때마다 CSV에서 새로 불러옵니다. [그래프 저장소](graph-stores.md)의 사다리에서 두 번째 단입니다. 서버도, 스키마 마이그레이션도 없고, 개인 볼트 규모에서는 전체 로드에 몇 밀리초가 걸립니다. 의존성은 하나입니다.

```
pip install networkx
```

집필 시점의 NetworkX는 3.7이며, 3.x 계열이면 어느 버전이든 동작합니다.

<a id="the-script"></a>

## 스크립트

볼트의 `scripts/graph_query.py`로 저장합니다.

```python
#!/usr/bin/env python3
"""Query the vault graph. Reads edges.csv and typed_edges.csv from the
current directory.

Usage:
    python graph_query.py neighbors "Page"
    python graph_query.py path "Page A" "Page B"
    python graph_query.py communities
    python graph_query.py connects "Page A" "Page B"
"""
import csv
import os
import sys

import networkx as nx

FILES = ["edges.csv", "typed_edges.csv"]


def load():
    g = nx.DiGraph()
    for name in FILES:
        if not os.path.exists(name):
            continue
        with open(name, encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                g.add_edge(row["source"], row["target"],
                           type=row.get("type", "links-to"))
    return g


def neighbors(g, node):
    out = [f"-> {t} ({g.edges[node, t]['type']})" for t in sorted(g.successors(node))]
    out += [f"<- {s} ({g.edges[s, node]['type']})" for s in sorted(g.predecessors(node))]
    return "\n".join(out) or "No links."


def path(g, a, b):
    try:
        return nx.shortest_path(g.to_undirected(as_view=True), a, b)
    except (nx.NetworkXNoPath, nx.NodeNotFound):
        return None


def communities(g):
    found = nx.community.label_propagation_communities(g.to_undirected())
    groups = sorted((sorted(c) for c in found), key=len, reverse=True)
    return "\n".join(f"[{len(c)}] " + ", ".join(c) for c in groups)


def connects(g, a, b):
    p = path(g, a, b)
    if p is None:
        return f"Nothing connects {a} and {b}."
    hops = []
    for s, t in zip(p, p[1:]):
        d = g.get_edge_data(s, t)
        hop = f"{s} -[{d['type']}]-> {t}" if d else f"{s} <-[{g.edges[t, s]['type']}]- {t}"
        hops.append(hop)
    return "\n".join(hops)


if __name__ == "__main__":
    g = load()
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "neighbors":
        print(neighbors(g, args[0]))
    elif cmd == "path":
        print(" -> ".join(path(g, args[0], args[1]) or ["No path."]))
    elif cmd == "communities":
        print(communities(g))
    elif cmd == "connects":
        print(connects(g, args[0], args[1]))
    else:
        print(__doc__)
```

설계 메모를 간단히 적습니다. 단순 엣지 뒤에 타입 엣지를 불러오므로, 같은 쌍 사이에서는 타입 엣지가 `links-to`를 덮어씁니다. 의도한 동작입니다. 같은 링크를 더 잘 설명하는 것이 타입 엣지이기 때문입니다. 경로는 무방향 뷰에서 찾습니다. "이 둘은 어떻게 관련되는가"는 어느 페이지가 어느 페이지를 링크했는지 신경 쓰지 않기 때문입니다. 그리고 레이블 전파(label propagation)는 [GraphRAG](graphrag.md)의 Leiden 단계를 대신합니다. 더 거칠지만 표준 라이브러리에 NetworkX만 있으면 되고, 이 규모에서는 즉시 끝납니다.

<a id="what-each-command-answers"></a>

## 명령마다 답하는 것

```
$ python scripts/graph_query.py neighbors "RAG"
-> GraphRAG (links-to)
-> LlamaIndex (uses)
<- GraphRAG (extends)
<- Lost in the Middle (links-to)

$ python scripts/graph_query.py communities
[4] GraphRAG, Long context replaces RAG, Lost in the Middle, RAG
[2] Jerry Liu, LlamaIndex
```

`neighbors`는 한 페이지의 한 홉 뷰로, 양방향이며 관계 이름이 붙습니다. `communities`는 주제 계층입니다. 한 줄이 클러스터 하나이고, 큰 것부터 나옵니다.

<a id="what-connects-x-and-y"></a>

## X와 Y를 잇는 것

이 실습이 존재하는 이유입니다. `connects`는 두 페이지 사이의 가장 짧은 사슬을, 모든 홉에 타입을 붙여 돌려줍니다.

```
$ python scripts/graph_query.py connects "Jerry Liu" "Lost in the Middle"
Jerry Liu -[built]-> LlamaIndex
LlamaIndex <-[uses]- RAG
RAG <-[links-to]- Lost in the Middle
```

이것은 추측이 아니라 계산한 멀티홉 조인이며, [지식 그래프가 필요한 이유](why-graphs.md)가 벡터 검색이 실패한다고 말한 바로 그 질문입니다. 동시에 문자열 두 개를 받아 문자열 하나를 돌려주는 평범한 함수이고, 이는 에이전트 도구가 원하는 바로 그 형태입니다. 이를 연결하는 것이 [실습: 루프에 넣기](build-use.md)입니다.
