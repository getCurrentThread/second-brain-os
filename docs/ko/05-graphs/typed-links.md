# 타입 링크

평범한 `[[wikilink]]`는 두 페이지가 관련 있다고만 말합니다. 어떻게 관련 있는지는 말하지 않으며, 규모가 커지면 이것은 실제 손실입니다.

타입 없는 그래프에는 무엇이 어떤 주장과 모순되는지, 어떤 증거가 그것을 뒷받침하는지, 어떤 페이지가 어떤 방법을 확장하는지 물을 수 없습니다. 모든 엣지가 같은 엣지이므로 모든 질문이 "근처에 무엇이 있는가"로 주저앉습니다.

<a id="a-minimal-vocabulary"></a>

## 최소한의 어휘

기억하기 쉬울 만큼 작으면서, 쓸 만한 표현력은 갖춘 어휘입니다.

- **supports** - 이 페이지가 저 페이지의 증거입니다
- **contradicts** - 이 페이지가 저 페이지에 반대하는 논거입니다
- **extends** - 저 페이지 위에 쌓거나 보탭니다
- **part-of** - 더 큰 것의 구성 요소입니다
- **applies** - 방법을 실제로 적용한 사례입니다

다섯 개는 일부러 적게 잡은 것입니다. 유형이 하나 늘 때마다 에이전트는 모든 링크에서 그 유형을 올바르게 가려내야 하고, 스무 개짜리 어휘는 일관성 없는 태깅을 낳습니다. 그것은 없느니만 못합니다.

<a id="two-ways-to-encode-it"></a>

## 인코딩하는 두 가지 방법

**인라인, 링크 바로 옆에:**

```markdown
The position sensitivity result (supports:: [[Lost in the Middle]]) suggests
context length alone does not fix retrieval.
```

Dataview는 인라인 필드를 읽으므로, 별도 도구 없이 Obsidian 안에서 질의할 수 있습니다.

**프론트매터에, 페이지 단위로:**

```yaml
contradicts: ["[[Long context replaces RAG]]"]
extends: ["[[Retrieval augmented generation]]"]
```

질의하기는 더 깔끔하지만, 링크가 나온 문장에서는 더 멉니다. 페이지 수준의 관계에는 프론트매터를, 주장 수준의 관계에는 인라인을 씁니다.

<a id="what-it-buys-you"></a>

## 얻는 것

```dataview
LIST FROM "wiki/concepts"
WHERE contains(contradicts, this.file.link)
```

이것은 "내 볼트에서 이 페이지에 반대하는 모든 것"이며, 평범한 그래프로는 전혀 답할 수 없는 질문입니다.

에이전트 차원에서는 더 강력합니다. 새 원본 자료를 기존 페이지에 `contradicts`로 기록하는 인제스트는, 누군가 그 페이지를 읽어야만 드러나는 산문 속에 의견 충돌을 묻어 두는 대신 구조로 표시하는 일을 해낸 것입니다.

<a id="do-not-type-everything"></a>

## 모든 링크에 타입을 달지 마십시오

대부분의 링크는 단순한 언급이므로 평범하게 두어야 합니다. 모든 링크에 타입을 달면 어휘가 의미를 잃고, 인제스트가 느려지고 오류가 늘어납니다.

관계 자체가 핵심인 링크에만 타입을 다십시오. 증거, 의견 충돌, 확장이 그런 경우입니다. 실제로는 링크 다섯 개 중 하나쯤입니다.

<a id="the-instruction"></a>

## 지시문

```
When a source supports, contradicts or extends a claim on an existing page,
record the relationship with a typed link. Plain wikilinks for ordinary
mentions. Do not type a relationship you are inferring; only type what the
source states.
```

마지막 문장이 중요합니다. 에이전트가 관계를 짐작하면 엄밀해 보이면서 자신의 가정을 인코딩한 그래프가 나옵니다.

<a id="next"></a>

## 다음

[그래프와 임베딩](graph-vs-vectors.md)
