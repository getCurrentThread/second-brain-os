# 자료

엄선한 목록이며, 포괄적이지는 않습니다. 여기 있는 것은 모두 2026년 9월에 접속 가능함을 확인했습니다.

<a id="papers"></a>

## 논문

- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](https://arxiv.org/abs/2404.16130): Microsoft GraphRAG 논문입니다. 방법만큼이나 문제를 어떻게 설정했는지를 보며 읽으십시오. [GraphRAG](graphrag.md) 페이지가 요약판입니다.
- [HippoRAG: Neurobiologically Inspired Long-Term Memory for LLMs](https://arxiv.org/abs/2405.14831): 지식 그래프에 개인화 PageRank를 더한 멀티홉 검색으로, NeurIPS 2024에 실렸습니다. 에이전트가 한 페이지에서 링크를 따라 바깥으로 걸어 나가는 방식을 형식화한 것 중 가장 가까운 사례입니다.
- [From RAG to Memory: Non-Parametric Continual Learning for LLMs](https://arxiv.org/abs/2502.14802): HippoRAG 2입니다. 그래프 메모리가 단순 조회에서 지지 않으면서 벡터 RAG를 이길 수 있다고 주장합니다.
- [LightRAG: Simple and Fast Retrieval-Augmented Generation](https://arxiv.org/abs/2410.05779): 2026년의 시스템 대부분이 조용히 베낀, 이중 수준의 그래프+벡터 설계입니다.
- [Zep: A Temporal Knowledge Graph Architecture for Agent Memory](https://arxiv.org/abs/2501.13956): Graphiti 뒤의 설계 논문입니다. 에이전트 메모리의 엣지에 왜 시간이 필요한지를 가장 잘 풀어 쓴 설명입니다.
- [When to Use Graphs in RAG](https://arxiv.org/abs/2506.05690): 그래프 검색이 어디서 도움이 되고 어디서 오버헤드인지 냉정하게 비교한 분석입니다. 위의 열광적인 논문들을 읽은 뒤에 읽으면 균형을 잡아 주는 글입니다.

<a id="guides-and-courses"></a>

## 가이드와 강좌

- [Knowledge Graphs for RAG](https://www.deeplearning.ai/courses/knowledge-graphs-rag): Neo4j와 함께 만든 DeepLearning.AI 단기 강좌입니다. 몇 시간짜리 실습 중심이며 Cypher도 포함됩니다.
- [Neo4j GraphAcademy: knowledge graphs and GraphRAG](https://graphacademy.neo4j.com/knowledge-graph-rag/): 무료이고, 더 깊으며, 자기 속도로 진행합니다.
- [Building Knowledge Graphs with LLM Graph Transformer](https://medium.com/data-science/building-knowledge-graphs-with-llm-graph-transformer-a91045c49b59): Tomaz Bratanic이 스키마 제약 추출을 차근차근 보여 줍니다. 이 주제에서 실용적으로 가장 쓸모 있는 글 하나입니다.
- [Implementing "from local to global" GraphRAG with Neo4j and LangChain](https://neo4j.com/blog/developer/global-graphrag-neo4j-langchain/): 전체 파이프라인을 단계별로 재현해, 비용이 어디서 드는지 구체적으로 볼 수 있습니다.
- [LazyGraphRAG](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/): 인덱싱 비용을 질의 시점으로 미루는 방법을 다룬 Microsoft Research의 글입니다.

<a id="repos-worth-reading"></a>

## 읽어 볼 만한 저장소

시간적 엣지 처리와 제대로 된 엔티티 해소를 보려면 [Graphiti](https://github.com/getzep/graphiti)를, 머릿속에 담을 수 있는 간결한 엔드투엔드 파이프라인을 보려면 [LightRAG](https://github.com/HKUDS/LightRAG)를, 동결된 참조 구현으로는 [microsoft/graphrag](https://github.com/microsoft/graphrag)를 읽으십시오. 최신 개관은 [도구](tools.md)에 있습니다.

<a id="start-here"></a>

## 여기서 시작

1. [지식 그래프가 필요한 이유](why-graphs.md)를 읽고, 자신의 실제 코퍼스와 실제 질문에 기준선 테스트를 적용하십시오. 선 아래라면 멈추십시오. 위키의 링크가 이미 그래프입니다.
2. DeepLearning.AI 단기 강좌를 듣고, 자신의 문서 백 개에 LightRAG를 돌려 추출된 트리플을 읽으십시오. 추출의 실패 모드를 이보다 빨리 가르쳐 주는 것은 없습니다.
3. Zep 논문을 읽은 뒤, [그래프 저장소](graph-stores.md)로 저장소를 의도적으로 정하십시오. 먼저 파일, 서버는 동시 쓰기가 강제할 때만입니다.
