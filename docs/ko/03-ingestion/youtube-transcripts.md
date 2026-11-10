# YouTube와 팟캐스트

영상은 대부분의 사람에게 분량은 가장 많고 기억에 남는 것은 가장 적은 자료입니다. 컨퍼런스 강연 한 시간은 일주일 뒤에 거의 아무것도 남기지 않습니다. 트랜스크립트가 그 문제를 해결하며, 트랜스크립트는 그저 텍스트이니 볼트가 바로 원하는 형태입니다.

<a id="pulling-a-transcript"></a>

## 트랜스크립트 가져오기

대부분의 영상에는 자동 생성되었거나 업로드된 자막이 있습니다. 믿을 만한 방법은 두 가지입니다.

```bash
# yt-dlp: subtitles only, no video download
yt-dlp --write-auto-sub --skip-download --sub-format vtt --sub-lang en URL
```

```python
# youtube-transcript-api, if you want it in a script
from youtube_transcript_api import YouTubeTranscriptApi
lines = YouTubeTranscriptApi.get_transcript("VIDEO_ID")
```

결과는 영상 제목, 채널, URL을 밝힌 프론트매터와 함께 `raw/`에 저장합니다. URL이 없으면 트랜스크립트는 출처를 알 수 없는 글자 덩어리이고, 에이전트는 이를 제대로 인용할 수 없습니다.

<a id="keep-the-timestamps"></a>

## 타임스탬프 유지

자동 생성 트랜스크립트는 타임스탬프가 붙은 조각으로 도착합니다. 서식은 걷어 내되, 몇 분마다 대략적인 타임스탬프는 남깁니다.

이유는 검색입니다. 위키가 어떤 주장이 강연 34분 지점에서 나왔다고 적어 두면 10초 만에 검증할 수 있습니다. 그것이 없으면 검증은 다시 보는 일이 되고, 그러면 아무도 검증하지 않게 됩니다.

<a id="clean-before-ingest"></a>

## 인제스트 전에 정리하기

자동 자막에는 문장부호도 화자 표시도 없고, 기술 용어는 엉뚱하게 옮겨집니다. 먼저 에이전트에게 한 차례 손보게 합니다.

```
Read raw/talk-transcript.md. Add punctuation and paragraph breaks, label
speakers where they change, and fix obvious mistranscriptions of technical
terms. Do not summarise, do not cut anything, and flag anything you could not
make sense of.
```

원본 자막 덤프를 그대로 인제스트하는 쪽으로 건너뛰지 않습니다. 문장부호 없는 텍스트로 만든 개념 페이지는 눈에 띄게 질이 떨어지는데, 모델이 주장을 이해하는 대신 문장 경계를 복원하는 데 어텐션을 쓰기 때문입니다.

<a id="long-videos"></a>

## 긴 영상

세 시간짜리 팟캐스트는 자료 하나가 아닙니다. 인제스트하기 전에 주제별로 나눕니다. 올린 사람이 챕터 표시를 달아 두었다면 그것으로, 아니라면 에이전트에게 트랜스크립트를 보고 나눌 지점을 제안하게 합니다.

통째로 인제스트하면 긴 인터뷰는 부푼 자료 페이지 하나와 모호한 개념 두세 개를 낳습니다. 나누면 그 안에 실제로 있던 네 가지 아이디어가 나옵니다.

<a id="podcasts-and-audio"></a>

## 팟캐스트와 오디오

팟캐스트는 트랜스크립트가 딸려 오는 일이 드뭅니다. 수고가 적은 순서대로 선택지는 이렇습니다. 쇼 노트를 확인합니다(지금은 트랜스크립트를 싣는 곳이 많습니다). Whisper로 로컬 전사를 돌립니다. 또는 전사 서비스를 씁니다.

매일 듣는다면 로컬 전사를 설정해 둘 만합니다. 오디오가 내 컴퓨터를 떠나지 않으며, 이는 팟캐스트보다 회의 녹음에서 더 중요합니다.

<a id="what-is-worth-transcribing"></a>

## 전사할 가치가 있는 것

강연, 강의, 실무자 인터뷰, 나중에 필요할 수 있는 구체적인 주장이 담긴 모든 것.

작업을 한 번 하려고 본 튜토리얼이나, 글이었다면 다시 읽지 않았을 모든 것은 해당하지 않습니다. 영상은 한 시간이 걸리기 때문에 보는 동안 가치 있게 느껴집니다. 그 느낌은 내용에 관한 신호가 아닙니다.

<a id="next"></a>

## 다음

[PDF, 논문, 책](pdfs-and-books.md)
