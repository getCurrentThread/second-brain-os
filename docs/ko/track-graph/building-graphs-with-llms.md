# LLM으로 그래프 만들기

추출이 승부의 전부입니다. 그래프 저장소는 넣은 것이 무엇이든 충실히 보존하며, 그것이 지식인지 노이즈인지는 파이프라인에서 결정됩니다. 이 페이지는 그 파이프라인의 실용적인 형태입니다.

<a id="schema-before-extraction"></a>

## 추출 전에 스키마

제약 없는 추출은 잡동사니 서랍을 만듭니다. 사실 하나에 `WORKS_AT`, `WORKS_FOR`, `EMPLOYED_BY`가 서로 다른 세 엣지로 생기는 식입니다. 작더라도 온톨로지를 먼저 정하십시오. 엔티티 유형 다섯 개와 관계 유형 열 개면 대부분의 개인 코퍼스와 에이전트 코퍼스를 덮습니다. 진지한 도구는 모두 이를 제약으로 넘기게 해 줍니다. LangChain의 [LLMGraphTransformer](https://reference.langchain.com/python/langchain-neo4j/graph_transformers/llm/LLMGraphTransformer)는 `allowed_nodes`와 `allowed_relationships`를 받고, LlamaIndex의 [property graph index](https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/)에는 추출 시점에 타입을 강제하는 `SchemaLLMPathExtractor`가 있습니다.

처음에는 적당하다고 느끼는 것보다 더 좁게 시작하십시오. 스키마를 나중에 넓히는 것은 싸지만, 거의 중복인 술어 더미를 하나로 합치는 것은 싸지 않습니다.

<a id="the-extraction-pass"></a>

## 추출 패스

방식은 도구가 달라도 안정적입니다. 원본 자료를 청크로 나누고, 모델에게 타입이 있는 트리플과 엔티티별 짧은 설명을 내놓게 하고, 출처를 보존합니다. 트리플마다 어느 청크, 어느 문서, 어느 날짜에서 나왔는지를 남기는 것입니다. 출처가 있어야 "그래프는 왜 이것을 믿는가"에 답할 수 있고, 원본 자료가 철회되면 엣지를 삭제할 수 있습니다. 구조화된 출력 모드는 파싱을 믿을 만하게 만듭니다. 남는 실패는 구문이 아니라 의미의 문제이므로, 통과율을 믿지 말고 배치마다 트리플 수십 개를 표본으로 뽑아 읽으십시오.

<a id="incremental-updates"></a>

## 증분 업데이트

원래의 [GraphRAG](graphrag.md) 파이프라인은 배치 재인덱싱을 전제했는데, 매일 바뀌는 코퍼스에는 감당할 수 없는 방식입니다. 현재 세대는 증분을 우선으로 만들어집니다. 여기서는 [Graphiti](https://github.com/getzep/graphiti)가 가장 강한 설계입니다. 새 에피소드마다 추출하고, 기존 그래프와 대조하고, 모순되는 엣지는 삭제하지 않고 타임스탬프와 함께 무효로 표시합니다. 그래프는 "3월까지 참"과 "3월부터 참"을 모두 보존합니다. 에이전트 메모리에서 이 시간 계층이 메모리와 캐시를 가르는 차이입니다.

<a id="dedup-and-entity-resolution"></a>

## 중복 제거와 엔티티 해소

같은 사람이 `J. Smith`, `John Smith`, `john from ops`로 들어옵니다. 병합 정책을 비용이 오르는 순서로 늘어놓으면 이렇습니다. 정확 일치와 정규화된 이름 일치, 엔티티 설명에 대한 임베딩 유사도에 임계값을 둔 것, 후보 쌍을 LLM이 판정하는 것. 값싼 단계를 먼저 하고, 애매하게 남은 것만 모델에 보내십시오. 해소는 쓰기 시점에 하십시오. 중복 제거를 나중의 배치 작업으로 두면 그때까지 모든 질의가 쪼개진 그래프를 보게 됩니다.

<a id="keep-the-loop-small"></a>

## 루프를 작게 유지하기

문서 백 개에서 추출하고, 그래프를 보고, 스키마를 고치고, 다시 돌리십시오. 실패하는 파이프라인은 아무도 들여다보기 전에 코퍼스 전체를 처리해 버리는 파이프라인입니다. 결과가 어디에 있는지, 곧 임베디드 데이터베이스인지 파일인지 일반 위키링크인지는 [그래프 저장소](graph-stores.md)의 주제이고, 기성 구현은 [도구](tools.md)에서 개관합니다.
