# 볼트에 질문하기

볼트를 만든 이유는 실제로 읽은 내용에서 답이 나오게 하려는 것입니다. 에이전트가 슬그머니 자기 지식으로 돌아가면 그 목적이 무너지는데, 눈에 띄지도 않습니다. 답은 유창하고 그럴듯하지만 검증할 수 없습니다.

<a id="the-rule"></a>

## 규칙

답변의 모든 주장은 페이지에서 나와야 하고, 그 페이지를 밝혀야 합니다.

```
Answer from my vault only. Cite the page for each claim. If the vault does not
cover part of the question, say which part rather than filling it in.
```

이 지시는 매번 입력하지 말고 `CLAUDE.md`에 넣어 두십시오. 기억해야 지킬 수 있는 규칙은 정작 중요한 날 지켜지지 않는 규칙입니다.

<a id="start-from-the-index"></a>

## 인덱스에서 시작하기

에이전트는 먼저 `index.md`를 읽고, 관련 있어 보이는 페이지를 연 다음, 그 페이지들에서 링크를 따라 바깥으로 나아가야 합니다.

대안인 전체 텍스트 훑기는 더 느리고, 아깝게 빗나간 페이지에 컨텍스트를 쓰며, 표현이 질문과 다른 페이지를 놓칩니다. 인덱스는 이 일을 값싸게 만들려고 존재합니다. [index.md와 log.md](../04-structuring/index-and-log.md)를 보십시오.

<a id="outside-knowledge-labelled"></a>

## 볼트 밖의 지식은 표시하기

때로는 모델이 유용한 것을 알고 있는데 볼트에는 없을 수 있습니다. 표시만 해 두면 문제없습니다.

```
Cite vault pages for anything from my notes. Anything you know that my vault
does not contain, put under a separate heading marked outside the vault.
```

분리해 두면 유용한 배경 정보입니다. 섞어 버리면 어느 부분을 추적할 수 있는지 알 수 없게 되어 답 전체를 믿을 수 없게 됩니다.

<a id="empty-is-a-valid-answer"></a>

## 빈 결과도 유효한 답

볼트에 어떤 주제에 관한 내용이 없다면, 올바른 응답은 그렇다고 말하는 한 문장입니다.

빈 결과를 일반 지식으로 메우는 에이전트가 가장 조심해야 할 실패 모드입니다. 좋은 답처럼 느껴지기 때문입니다. 답에 페이지 참조가 하나도 없다면 그 점을 알아채십시오. 그것이 신호입니다.

<a id="answers-should-end-with-what-is-missing"></a>

## 답은 빠진 것으로 끝맺기

```
Read: [[page]], [[page]], [[page]]
Not covered: whether this holds for the streaming case
```

두 줄이지만 보기보다 많은 일을 합니다. 답이 볼트의 얼마만큼에 기대고 있는지 알려 주고, 빈틈을 적은 줄이 대개 더 쓸모 있는 쪽입니다. 다음에 무엇을 읽어야 하는지 정확히 말해 주기 때문입니다.

<a id="next"></a>

## 다음

[질의 패턴](query-patterns.md)
