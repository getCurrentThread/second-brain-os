# 채팅 내보내기

채팅 기록은 가진 자료 중 가장 저평가되어 있으면서 가장 민감합니다. 수년에 걸쳐 풀어 낸 문제, 따져 본 결정, 당시에 이해하지 못한 부분에 맞춰 받은 설명이 들어 있습니다.

나중에 공유할지도 모르는 파일에는 넣고 싶지 않을 내용도 가득합니다. 여기서 무엇이든 실행하기 전에 아래 개인정보 절을 먼저 읽으십시오.

<a id="exporting"></a>

## 내보내기

Claude와 ChatGPT 모두 계정 설정에서 전체 기록을 JSON으로 내보낼 수 있습니다. 내보낸 결과는 다운로드 링크가 담긴 이메일로 도착하며, 보통 몇 분 안에 옵니다.

<a id="converting-to-markdown"></a>

## 마크다운으로 변환

JSON 덩어리 하나는 인제스트할 수 없습니다. 대화 하나당 파일 하나로 쪼갭니다.

```bash
python3 scripts/chat_export_to_md.py conversations.json ./raw --min-words 150
```

스크립트는 [`scripts/`](../../../scripts/README.md)에 있습니다. 흔한 내보내기 형식을 처리하고, 제목과 날짜가 든 프론트매터를 쓰며, 단어 수 기준보다 짧은 대화는 건너뜁니다.

출력이 한 줄짜리 주고받기로 채워지면 `--min-words`를 올립니다. 대부분 사람의 기록은 약 90%가 짧은 일회성 질문이고, 그런 대화는 분량만 늘릴 뿐 보태는 것이 없습니다.

<a id="filter-before-ingesting"></a>

## 인제스트 전에 거르기

내보낸 기록 전체를 인제스트하지 않습니다. 대화 1,000개는 자료 페이지 1,000개를 만들고, 모든 것이 모든 것과 희미하게 이어진 위키가 됩니다.

세 무더기로 나눕니다.

- **인제스트할 가치가 있는 것.** 무언가를 풀어냈거나, 결정을 내렸거나, 와닿는 설명을 얻은 대화입니다. 사실만이 아니라 추론이 담겨 있습니다.
- **보관할 가치는 있지만 인제스트하지 않는 것.** `raw/`에 아카이브로 남겨 둡니다. 에이전트는 모든 대화에 위키 페이지가 없어도 필요할 때 검색할 수 있습니다.
- **삭제할 것.** 디버깅 세션, 일회성 조회, 검색 결과에 나오면 짜증스러울 모든 것.

분류는 손으로 하지 말고 에이전트에게 도움을 받습니다.

```
Read the titles and first exchange of every file in raw/chats/. Group them into
worth-ingesting, archive, and delete, with one line of reasoning each. Do not
move or delete anything, just give me the lists.
```

<a id="what-makes-these-sources-different"></a>

## 이 자료가 다른 이유

채팅 로그는 생각하는 사람의 기록이므로, 쓸모 있는 추출물은 답이 아닌 경우가 많습니다. 던진 질문, 처음에 잘못 알고 있던 점, 생각을 바꾼 계기입니다.

에이전트에게 그렇게 알려 줍니다.

```
These are my own past conversations. Build pages around what I was trying to
work out and what conclusion I reached, not around the assistant's explanations.
Note where I changed position, and record the date, because my views may have
moved since.
```

<a id="privacy"></a>

## 개인정보

채팅 기록에는 볼트의 어떤 파일보다 본인에 관한 정보가 많이 들어 있습니다. 건강, 돈, 말할 수 없는 업무, 우연히 언급한 다른 사람의 정보까지.

인제스트하기 전에 볼트에 아예 들어오면 안 되는 것을 정해 `raw/`에서 해당 파일을 삭제합니다. 사후 마스킹은 믿을 수 없습니다. 그때쯤이면 내용이 이미 개념 페이지와 링크로 퍼져 있기 때문입니다.

볼트가 Git 저장소에 있다면 원격 저장소를 비공개로 유지합니다. [개인정보](../09-maintenance/privacy-and-secrets.md)를 참고하십시오.

<a id="next"></a>

## 다음

[음성 메모와 회의](voice-and-meetings.md)
