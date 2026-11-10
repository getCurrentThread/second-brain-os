# 검색 도구

일반 텍스트 볼트의 검색은 대부분 grep입니다. 원시적으로 들리지만 거의 언제나 충분합니다.

<a id="ripgrep"></a>

## ripgrep

```bash
rg -i "graph rag" ~/brain --type md -l
rg -i "supersed" ~/brain -C 2
```

수만 개 파일에서도 즉시 끝납니다. 에이전트는 파일 시스템에서 작업할 때 기본으로 이것을 쓰며, "이걸 어디서 언급했지"를 찾는 데는 속도와 예측 가능성 양쪽에서 더 화려한 어떤 선택지보다 낫습니다.

한계는 정확한 표현입니다. 다르게 묘사한 개념의 페이지는 찾지 못하며, 그 일을 하라고 그래프와 인덱스가 있습니다.

<a id="obsidian-search"></a>

## Obsidian 검색

대화형으로 쓰기에 좋습니다. 알아 둘 만한 연산자는 `path:`, `file:`, `tag:`, 그리고 같은 줄에 함께 나타나는 용어를 찾는 `line:`이며, 마지막 것이 오탐 대부분을 줄여 줍니다.

<a id="dataview"></a>

## Dataview

프론트매터에 대한 질의로, 구조에 관한 질문은 여기서 답이 나옵니다.

````
```dataview
TABLE updated, tags FROM "wiki/concepts"
WHERE contains(tags, "unverified")
SORT updated ASC
```
````

"속성 P를 가진 페이지는 무엇인가"로 표현되는 모든 것은 Dataview 질의입니다. 이런 질문을 에이전트에게 파일을 읽어 답하게 하면 더 느리고 덜 믿을 만합니다.

<a id="combining-them"></a>

## 조합하기

효과가 있는 패턴은 이렇습니다. Dataview나 ripgrep으로 후보 집합을 얻고, 그래프로 거기서 확장하고, 에이전트가 읽고 종합합니다.

```
Find every page tagged unverified, follow their links, and tell me which claims
depend on unverified sources.
```

기계적 필터링이 먼저, 판단이 그다음입니다. 에이전트에게 전부 읽어서 거르게 하면, 질의가 몇 밀리초 만에 걸러 냈을 페이지에 컨텍스트를 낭비합니다.

<a id="when-search-gets-slow"></a>

## 검색이 느려질 때

개인 규모에서는 느려지지 않습니다. 마크다운 파일 만 개에 ripgrep을 돌려도 여전히 즉시 끝나며, 검색이 느리게 느껴진다면 원인은 대개 검색 자체가 아니라 에이전트가 너무 많은 파일을 읽는 것입니다.

이는 검색 문제가 아니라 컨텍스트 문제입니다. [컨텍스트 예산](context-budget.md)을 보십시오.

<a id="next"></a>

## 다음

[필요할 때 RAG 더하기](rag-on-top.md)
