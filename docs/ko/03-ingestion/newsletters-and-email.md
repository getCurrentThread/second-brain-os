# 뉴스레터와 이메일

뉴스레터는 가장 자동화하기 쉬운 자료이자 가장 과하게 인제스트하기 쉬운 자료입니다. 수집은 자동화하되, 어느 것에 위키 페이지를 줄지는 엄격하게 정합니다. 스스로 정리되는 피드는 요청한 적도 없는 페이지를 한 달에 백 개씩 볼트에 기꺼이 채워 넣기 때문입니다.

<a id="a-dedicated-address"></a>

## 전용 주소

볼트 전용으로만 쓰는 주소를 만들고, 뉴스레터 구독을 그 주소로 옮깁니다. 이 한 가지로 보관하고 싶은 자료가 받은편지함의 나머지와 분리되고, 자동화가 실제 메일에 손대는 일도 없어집니다.

그다음에는 이미 쓰고 있는 자동화 도구로 그 주소를 `raw/`로 전달합니다. 파일을 쓸 수 있는 규칙이면 무엇이든 됩니다.

<a id="deduplicate"></a>

## 중복 제거

뉴스레터는 같은 이야기를 되풀이합니다. 같은 출시 소식이 같은 주에 서로 다른 다이제스트 네 곳에 실리는데, 사실은 같고 첫 문장만 다릅니다.

그대로 인제스트하면 같은 말을 하는 자료 페이지 네 개가 생기고, 개념 페이지는 그 넷을 모두 인용해 마치 교차 확인이 된 것처럼 보입니다. 뉴스레터끼리 서로 가리키는 것은 독립적인 확인이 아니며, 그렇게 취급하는 위키는 어떤 사실이 얼마나 확립되었는지를 과장하게 됩니다.

인제스트 지시를 명시적으로 내립니다.

```
These are newsletters. Several will cover the same item. Group them by topic
first, write one source page per actual item citing every newsletter that
mentioned it, and note where they disagree. Do not treat repetition across
newsletters as confirmation.
```

<a id="what-deserves-a-page"></a>

## 페이지를 줄 만한 것

뉴스레터는 대부분 해설이 붙은 링크입니다. 해설은 개념 페이지로 만들 가치가 드물고, 링크가 가리키는 대상은 가끔 그만한 가치가 있습니다.

유용한 패턴은 에이전트가 다이제스트를 읽고 후보 목록을 건네게 하는 것입니다.

```
Read this week's newsletters in raw/newsletters/. List anything worth reading in
full, with one line on why. Ingest nothing yet.
```

그다음 1차 자료 두세 개를 제대로 클리핑해 그것들을 인제스트합니다. 뉴스레터는 필터 구실을 다했고, 볼트에는 요약이 아니라 실제 원본이 남습니다.

<a id="regular-email"></a>

## 일반 이메일

대부분의 이메일은 세컨드 브레인에 들어갈 것이 아닙니다. 일정 조율 스레드, 영수증, 세부 진행을 놓고 오가는 대화. 어느 것도 지식이 아니고, 전부 분량일 뿐입니다.

인제스트할 가치가 있는 것은 실제 결정이 내려졌거나 무언가가 제대로 설명된 스레드입니다. 그런 스레드는 수집 주소로 전달해 들여오되, 한 번에 스레드 하나씩 의도적으로 넣습니다.

받은편지함 전체를 정해진 일정에 따라 `raw/`에 연결하는 일은 절대 하지 않습니다. 편지를 주고받는 모든 사람에 관한 모든 내용을 인제스트하게 되는데, 그 대부분은 본인이 보관할 몫이 아닙니다.

<a id="next"></a>

## 다음

[수년 치 자료 백필](bulk-backfill.md)
