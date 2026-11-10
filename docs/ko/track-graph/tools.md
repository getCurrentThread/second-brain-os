# 도구

2026년 9월 기준의 생태계 개관입니다. 이 분야는 2025년에 크게 정리되었습니다. 배치 인덱싱 세대는 잠잠해지고, 증분 방식에 메모리 지향인 세대가 주도권을 가져갔습니다.

<a id="memory-and-graph-rag-frameworks"></a>

## 메모리와 그래프 RAG 프레임워크

- [Graphiti](https://github.com/getzep/graphiti): Zep의 에이전트 메모리용 시간적(temporal) 지식 그래프입니다. 모든 엣지가 유효 기간을 가지고, 모순은 덮어쓰지 않고 무효화하며, 특정 시점 기준의 질의가 됩니다. 장기 실행 에이전트에 가장 강한 선택지이며, Zep의 호스팅 [메모리 플랫폼](https://www.getzep.com)의 기반입니다.
- [Cognee](https://github.com/topoteretes/cognee): 그래프와 벡터를 하나의 파이프라인에서 결합하는 셀프 호스팅 메모리 엔진입니다. 통합 생태계(n8n, 에이전트 프레임워크)가 커지고 있고 Rust 코어를 개발 중입니다. 활발하고 관리가 잘 되고 있습니다.
- [LightRAG](https://github.com/HKUDS/LightRAG): 실용적인 GraphRAG입니다. 그래프와 벡터의 이중 인덱스, 증분 업데이트, 여러 저장소 백엔드(Neo4j, PostgreSQL, MongoDB)를 갖췄습니다. EMNLP 2025 논문이고, 지금도 활발히 개발 중입니다.
- [fast-graphrag](https://github.com/circlemind-ai/fast-graphrag): Circlemind의 PageRank 기반 구현입니다. 값싼 순회를 위해 커뮤니티 요약을 건너뜁니다.
- [microsoft/graphrag](https://github.com/microsoft/graphrag): 원조이며 지금은 유지보수 모드입니다. 읽기만 하고 그 위에 짓지는 마십시오. 맥락은 [GraphRAG](graphrag.md)에 있습니다.

<a id="framework-integrations"></a>

## 프레임워크 통합

- [LlamaIndex property graph index](https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/): 프레임워크 네이티브 선택지 중 가장 완전합니다. 교체 가능한 추출기(스키마 강제 또는 자유 형식)와, 어떤 프로퍼티 그래프 저장소 위에서도 동작하는 리트리버를 갖췄습니다.
- [LangChain LLMGraphTransformer](https://reference.langchain.com/python/langchain-neo4j/graph_transformers/llm/LLMGraphTransformer): 문서를 넣으면 그래프 문서가 나옵니다. `langchain-experimental`에서 `langchain-neo4j` 패키지로 옮겨졌고, 옛 import 경로는 더 이상 동작하지 않는다는 점에 유의하십시오.
- [Neo4j LLM Knowledge Graph Builder](https://neo4j.com/labs/genai-ecosystem/llm-graph-builder/): PDF, 웹 페이지, YouTube 트랜스크립트에서 Neo4j 그래프까지 이어지는, 호스팅되는 포인트 앤 클릭 파이프라인입니다. 코드를 쓰기 전에 추출이 자료에 무슨 일을 하는지 처음 살펴보기에 좋습니다.
- [FalkorDB GraphRAG-SDK](https://github.com/FalkorDB/GraphRAG-SDK): FalkorDB 위의 온톨로지 우선 SDK입니다. 프로덕션에서 안정적이고 빠르게 개선되고 있습니다.

<a id="visualisers"></a>

## 시각화 도구

[Gephi](https://gephi.org)는 내보낸 그래프를 오프라인으로 분석하는 데 여전히 주력 도구입니다. GraphML을 불러와 레이아웃과 커뮤니티 색칠을 돌리고, 거기 있는 줄 몰랐던 구조를 찾아내십시오. Neo4j에 번들된 Browser와 Bloom은 데이터베이스 네이티브 용도를 담당합니다.

<a id="obsidian-graph-tooling"></a>

## Obsidian 그래프 도구

내장 그래프 뷰는 계측기가 아니라 그림입니다. 진짜 일은 플러그인이 합니다. [InfraNodus](https://github.com/noduslabs/infranodus-obsidian-plugin)는 볼트에 대한 본격적인 네트워크 분석, 곧 주제 클러스터, 중심성, 구조적 공백을 더하고, 공백에 대한 AI 질문 생성도 제공합니다. [Extended Graph](https://www.obsidianstats.com/plugins/extended-graph)는 필터링과 유형별 스타일로 기본 뷰를 업그레이드합니다. Obsidian Hub는 최신 [그래프 플러그인 목록](https://publish.obsidian.md/hub/02+-+Community+Expansions/02.01+Plugins+by+Category/Graph+plugins)을 관리합니다.

<a id="choosing"></a>

## 고르기

에이전트 메모리: Graphiti 또는 Cognee. 문서 코퍼스 질의: LightRAG. 이미 LlamaIndex나 LangChain 안에 있다면: 그쪽의 네이티브 추출기를 쓰고, [그래프 저장소](graph-stores.md)에서 고른 저장소에 쓰십시오. 가꾼 볼트: 링크가 곧 그래프이며, 분석이 필요해지면 InfraNodus를 더하십시오.
