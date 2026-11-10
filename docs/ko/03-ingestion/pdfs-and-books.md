# PDF, 논문, 책

PDF는 볼트에 쓰레기 상태로 들어올 가능성이 가장 높은 형식입니다. 2단 본문은 줄이 뒤섞이고, 표는 무너지고, 각주는 문장 한가운데 떨어지며, 에이전트는 그 난장판 위에 조용히 페이지를 쌓습니다.

인제스트하기 전에 추출 품질을 확인합니다. 10초면 되고, 나중에 페이지를 다시 쓰는 수고를 덜어 줍니다.

<a id="extraction"></a>

## 추출

```bash
# text, layout preserved reasonably well
pdftotext -layout paper.pdf raw/paper.md
```

구조가 있는 문서에는 `pymupdf`가 더 세밀한 제어를 제공하며, 이미지와 표를 따로 뽑을 수도 있습니다. 무엇을 쓰든 출력을 열어 중간쯤의 문단 하나를 읽어 봅니다. 문장이 이어지지 않으면 에이전트가 알아서 처리해 주기를 바라지 말고 추출부터 고칩니다.

<a id="scanned-documents"></a>

## 스캔 문서

스캔본은 이미지이므로 텍스트 추출은 아무것도, 혹은 거의 아무것도 돌려주지 않습니다. 먼저 `ocrmypdf`로 OCR을 돌립니다. 눈에 보이는 문서는 그대로 두고 텍스트 계층만 더해 줍니다. 고유명사와 숫자에는 오류가 있을 것으로 예상하고, OCR을 거친 자료의 수치는 사실로 위키 페이지에 넣기 전에 검증이 필요하다고 봅니다.

<a id="papers"></a>

## 논문

논문은 일반 글과 다르게 다뤄야 합니다. 나중에 필요해질 부분이 고르게 퍼져 있지 않기 때문입니다. 초록, 방법, 결과, 한계가 거의 전부를 담고 있습니다.

유용한 인제스트 지시는 다음과 같습니다.

```
This is an academic paper. Build the source page around: the question it asks,
the method, the result with its actual numbers, and the limitations the authors
state themselves. Record sample sizes. Do not report a finding without the
condition it holds under.
```

마지막 규칙이 위키를 정직하게 지켜 줍니다. 조건이 떨어져 나간 연구 결과는 2년 뒤 확신에 찬 헛소리가 됩니다.

논문을 자주 읽는다면 Zotero를 쓸 만합니다. 메타데이터를 관리하고 마크다운으로 내보내 주며, 그 파일은 `raw/`에 깔끔하게 들어옵니다.

<a id="books"></a>

## 책

책 한 권 전체는 하나의 자료로 인제스트하기에는 너무 크고, 대부분 그럴 가치도 없습니다. 가치가 있는 것은 하이라이트입니다.

Kindle 하이라이트는 Kindle 앱에서 내보내거나, Obsidian으로 바로 동기화되는 Readwise를 통해 가져올 수 있습니다. 하이라이트는 인용문 목록 형태로 도착하므로 책 한 권당 자료 페이지 하나로 인제스트하고, 에이전트가 인용문이 아니라 그 안의 아이디어를 바탕으로 개념 페이지를 만들게 합니다.

위키에서는 인용을 짧게 유지하고 출처 표기를 남깁니다. 한 장의 절반을 그대로 옮겨 놓은 페이지는 저작권 문제이자 검색 문제입니다.

<a id="figures-and-tables"></a>

## 그림과 표

텍스트 추출은 둘 다 떨어뜨립니다. 그림이 논증을 담고 있다면 스크린샷을 찍어 `raw/assets/`에 넣고 자료 페이지에서 참조해, 페이지의 주장에 뒷받침이 있게 합니다.

<a id="next"></a>

## 다음

[채팅 내보내기](chat-exports.md)
