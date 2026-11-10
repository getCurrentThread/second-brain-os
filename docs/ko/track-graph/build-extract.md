# 실습: 그래프 추출

저녁 한나절 규모의 세 부분짜리 실습입니다. 에이전트가 이미 관리하는 볼트 위에, 질의할 수 있는 그래프 계층을 얹습니다. 이 페이지는 마크다운 폴더에서 엣지 파일 두 개까지 데려다 줍니다. [실습: 그래프 질의](build-query.md)는 그 파일들을 NetworkX에 불러오고, [실습: 루프에 넣기](build-use.md)는 그 질의를 에이전트에게 넘깁니다.

전제는 [지식 그래프가 필요한 이유](why-graphs.md)에서 옵니다. 가꾼 링크가 있는 위키는 이미 지식 그래프입니다. 없는 것은 타입입니다. 모든 엣지가 "관련됨"이라고만 말할 뿐 어떻게 관련되는지는 말하지 않습니다. 그래서 계획은 단순 링크 그래프를 기계적으로 내보낸 뒤, Claude Code가 페이지를 훑으며 타입을 붙이는 패스를 한 번 도는 것입니다.

<a id="the-link-graph-in-one-command"></a>

## 명령 하나로 링크 그래프 만들기

저장소에는 표준 라이브러리만 쓰는 `scripts/graph_export.py`가 들어 있습니다. 볼트 루트에서 실행하십시오.

```
python scripts/graph_export.py . edges.csv
```

Mac에서는 `python3`를 쓰십시오. Windows에서는 그 이름이 대개 Microsoft Store 스텁입니다. 스크립트는 숨김 폴더, 템플릿 폴더, 스크립트 폴더를 제외한 모든 페이지를 훑고, `[[wikilinks]]`를 파일 이름과 대소문자 구분 없이 대조해 해석한 뒤 다음을 씁니다.

```csv
source,target
GraphRAG,RAG
Lost in the Middle,RAG
```

존재하지 않는 페이지로 가는 링크는 버립니다. 이 실습에는 그것이 맞습니다. 어디로도 가지 않는 엣지는 질의할 관계가 아니라 메워야 할 빈틈이기 때문입니다. `--format graphml`을 주면 Gephi용 버전이 나옵니다. 그것으로 무엇을 할지는 [도구](tools.md)를 보십시오.

<a id="schema-before-extraction"></a>

## 추출 전에 스키마

[LLM으로 그래프 만들기](building-graphs-with-llms.md)는 온톨로지를 먼저 정하라고 말하는데, 볼트 규모에서도 마찬가지입니다. 페이지가 사람, 도구, 논문, 주장인 코퍼스라면 엣지 유형 여섯 개로 충분합니다. 유형이 많을수록 링크마다 잘못 고를 여지가 늘어나므로, 여섯 번째가 제 몫을 증명하기 전에는 일곱 번째를 더하고 싶은 마음을 참으십시오.

<a id="the-extraction-prompt"></a>

## 추출 프롬프트

볼트 루트의 Claude Code에서 실행합니다.

```text
Read every markdown page under wiki/, skipping templates and raw.
Build a typed edge list on top of the plain wikilinks.

For each page, note its type from the frontmatter (person, tool,
claim, concept, paper, note). Then emit one row per relationship
you can ground in the text, using only these edge types:

  built        person -> tool
  authored     person -> paper or claim
  uses         page -> tool
  supports     paper or claim -> claim
  contradicts  paper or claim -> claim
  extends      page -> page

Rules:
- Source and target must both be existing page names, spelt
  exactly as the filenames are, without the .md.
- Only record what a page states. If the relationship is your
  inference rather than the page's claim, skip it.
- Append rows to typed_edges.csv with the header
  source,target,type,found_in — where found_in is the page the
  relationship was stated on.

Work in batches of twenty pages and append after each batch, so
an interruption keeps partial work. When finished, report the row
count and the five most connected nodes.
```

두 줄이 일의 대부분을 합니다. 끝점을 기존 페이지 이름으로 제한하면 타입 엣지가 링크 그래프와 같은 네임스페이스에 머물러서, 다음 단계에서 두 파일이 하나의 구조로 들어갑니다. 그리고 "페이지가 진술한 것만 기록하라"는 이 볼트의 타입 링크 규칙입니다. 에이전트가 관계를 추론하게 두면, 자기 가정을 조용히 인코딩한 그래프가 만들어집니다.

<a id="what-comes-out"></a>

## 결과물

```csv
source,target,type,found_in
Jerry Liu,LlamaIndex,built,Jerry Liu
RAG,LlamaIndex,uses,RAG
Lost in the Middle,Long context replaces RAG,contradicts,Long context replaces RAG
```

`found_in` 열은 출처입니다. "그래프는 왜 이것을 믿는가"에 대한 답입니다. 더 풍부한 출처가 필요하면 JSONL을 요청하십시오. 한 줄에 객체 하나, 필드는 같고 엣지가 나온 문장을 담은 `quote` 키가 더해집니다. 다음 페이지가 불러오는 것은 CSV이므로, CSV를 기본 출력으로 두십시오.

<a id="read-it-before-you-trust-it"></a>

## 믿기 전에 읽기

넘어가기 전에, 행 스무 개를 뽑아 그것이 나온 페이지와 대조하십시오. 기술적으로는 근거가 있지만 쓸모없는 엣지가 몇 개, 방향이 뒤집힌 엣지가 간혹 있을 것입니다. 행이 아니라 프롬프트를 고치고 다시 돌리십시오. 페이지 몇백 개를 도는 데는 몇 분이면 됩니다. 그런 다음 [실습: 그래프 질의](build-query.md)에서 결과를 불러오십시오.
