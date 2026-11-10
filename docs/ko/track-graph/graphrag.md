# GraphRAG

GraphRAG는 인덱스가 임베딩된 청크 더미가 아니라 코퍼스로 만든 그래프인 검색 증강 생성(retrieval-augmented generation)입니다. 표준 버전은 Microsoft Research의 2024년 논문 [From Local to Global](https://arxiv.org/abs/2404.16130)으로, 벡터 RAG가 가장 못 답하는 질문, 곧 코퍼스 전체에 대한 질의를 겨냥했습니다.

<a id="the-pattern"></a>

## 패턴

네 단계이며, 모두 인덱싱 시점에 일어납니다.

1. **엔티티 추출.** LLM이 모든 청크를 읽고 엔티티와 관계를 내놓습니다. 보통 설명이 붙은 `(subject, predicate, object)` 트리플 형태입니다.
2. **그래프 구성.** 트리플을 하나의 그래프로 병합하고, 중복된 엔티티를 해소합니다.
3. **커뮤니티 탐지.** 클러스터링 알고리즘(원본은 Leiden)이 촘촘히 연결된 이웃 영역을 찾습니다.
4. **커뮤니티 요약.** LLM이 커뮤니티마다 계층적으로 보고서를 써서, 코퍼스가 여러 확대 수준의 요약을 갖게 합니다.

지역 질의는 매칭된 엔티티에서 시작해 그래프를 따라 걷습니다. 전역 질의는 커뮤니티 요약 전체에 맵을 돌리고 하나의 답으로 리듀스합니다. "주요 주제가 무엇인가"가 마침내 통하는 것은 그래서입니다.

<a id="microsoft-graphrag-and-its-successors"></a>

## Microsoft GraphRAG와 그 후속작

[microsoft/graphrag](https://github.com/microsoft/graphrag) 저장소는 이제 유지보수 모드입니다. 버그 수정과 CVE 패치만 있고 새 기능은 없습니다. 도입할 프레임워크가 아니라 읽어 볼 참조 구현으로 취급하십시오.

흥미로운 작업은 더 저렴한 후손들로 옮겨 갔습니다. [LazyGraphRAG](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)는 거의 모든 LLM 작업을 질의 시점으로 미룹니다. 사전 요약이 없고 인덱싱 비용은 원본의 0.1%라고 주장되지만, 오픈 라이브러리가 아니라 Microsoft의 Azure 제품으로 출시되었습니다. 오픈소스에서는 [LightRAG](https://github.com/HKUDS/LightRAG)(EMNLP 2025, 지금도 활발히 개발 중)가 그래프와 벡터의 이중 인덱스를 증분 업데이트와 함께 유지하고, [fast-graphrag](https://github.com/circlemind-ai/fast-graphrag)는 커뮤니티 요약을 PageRank 순회로 대체합니다. 2026년의 새 배포 대부분은 이 중 하나를 고르며, [도구](tools.md) 페이지가 이 분야를 개관합니다.

<a id="costs-and-trade-offs"></a>

## 비용과 트레이드오프

원본 파이프라인은 특정한 방식으로 비쌉니다. 인제스트 때 모든 청크가 LLM을 거치고, 그다음 모든 커뮤니티가 요약되고, 다시 계층을 따라 올라가며 재요약됩니다. 소박한 코퍼스를 인덱싱하는 데도 실제 돈이 들고, 편집 뒤의 재인덱싱에는 같은 돈이 또 듭니다. 후속작들이 존재하는 이유가 바로 이 세금을 피하는 것입니다. 지연 평가, 증분 업데이트, 아니면 요약을 아예 생략하는 방식으로 말입니다.

조용한 트레이드오프는 충실도입니다. 추출은 뉘앙스를 트리플로 납작하게 만들고, 단서 표현이나 날짜 한정어, 출처 표시는 사라질 수 있습니다. 커뮤니티 요약은 요약일 뿐이며, 이해하지 못하는 텍스트를 모델에게 압축시킬 때 생기는 모든 실패 모드를 물려받습니다. GraphRAG는 벡터 RAG가 답하지 못하는 전역 질문에 답하지만, 그 답은 원본 자료에서 모델이 생성한 계층 하나만큼 더 멀어져 있습니다.

<a id="when-it-earns-its-keep"></a>

## 제값을 하는 때

진짜 멀티홉 질문과 주제 질문이 있는, 크고 가꾸지 않은 코퍼스입니다. 기준선 테스트는 [지식 그래프가 필요한 이유](why-graphs.md)를 보십시오. 가꾼 개인 볼트라면 추출은 이미 손으로 끝낸 셈이고, 남아서 쓸모 있는 것은 파이프라인의 형태이며 [LLM으로 그래프 만들기](building-graphs-with-llms.md)에서 다룹니다.
