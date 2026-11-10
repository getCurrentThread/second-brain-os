# Jev 시작하기

Jev가 공개 문서로 나온 지 약 일주일입니다. 이 페이지는 2026년 9월 21일 기준으로 공개된 내용을 반영하며, 금방 낡을 것으로 예상하십시오.

<a id="access"></a>

## 접근 권한

Jev는 대기자 명단 방식의 얼리 액세스입니다. [console.typesafe.ai](https://console.typesafe.ai/)에서 신청하며, TypeSafe는 대기자 명단에서 개발자를 묶음으로 받아들이고 있다고 밝혔습니다. API 키는 `console.typesafe.ai/settings/keys`에 있고, 일부 게이트웨이(Vercel AI Gateway, Netlify, Cloudflare)도 프록시로 제공합니다. 콘솔에는 할당량이 생기기 전에 만져 볼 수 있는 무료 플레이그라운드가 있습니다.

<a id="the-api-shape"></a>

## API의 모양

API 전체가 엔드포인트 하나입니다. `POST https://api.typesafe.ai/v1/systemone`이고, 기본 모델은 `jev-latest`(현재 `jev-1.13.0`)입니다. 공식 SDK는 `pip install typesafe-sdk`와 `npm install @typesafe-ai/sdk`이며, 둘 다 환경 변수에서 `TYPESAFE_API_KEY`를 읽습니다.

요청은 `state`(문자열, JSON 객체, 텍스트 배열. 지금은 텍스트만 지원)와, 세 가지 기본 요소로 만든 이름 붙은 질문들로 이뤄집니다.

```python
from typesafe import Choice, Score, Noul

questions = {
    "team": Choice(instructions="Which team should handle this",
                   criteria={"billing": "Payment issues", "technical": "Bugs"}),
    "frustration": Score(instructions="Customer frustration level",
                         criteria=["Calm", "Frustrated but civil", "Very angry"]),
    "refund": Noul(instructions="Customer explicitly requesting a refund"),
}
```

모든 질문은 한 번의 병렬 처리로 답합니다. 문서에 적힌 한도는 state 64k 토큰, state와 가장 긴 질문을 합쳐 32k 토큰, `Choice`당 최대 255개 선택지입니다. 가격은 입력 100만 토큰당 0.042달러이고, 출력은 과금하지 않습니다.

<a id="a-realistic-first-project"></a>

## 현실적인 첫 프로젝트

지원 티켓 선별이 대표적인 입문 과제입니다. 이미 라벨을 붙여 둔 과거 티켓 200건을 가져와 위의 세 질문을 Jev에 던지고, 그 답과 확률을 자신의 라벨과 비교합니다. 이렇게 하면 중요한 두 가지를 얻습니다. *자신의* 분포에서의 정확도, 그리고 [에이전트 스택 속의 Jev](jev-in-an-agent-stack.md)에서 말하듯 신뢰도 점수가 임계값을 정할 만큼 정직한지입니다. 한 시간 안에 동작하는 데모를 만들었다는 초기 보고는 그럴듯하지만, 진짜 이정표는 자신의 평가(eval)로 삼으십시오.

문서에 기록된 함정에 유의하십시오. Jev는 글자 그대로 읽고(부정문이 발목을 잡습니다), 개수를 세지 못하고, 날짜 순서를 매기지 못하며, 컨텍스트가 부풀면 성능이 떨어집니다. state를 보내기 전에 코드에서 검색하고 걸러 내십시오. state에 사용자 텍스트가 들어 있다면 적대적 인젝션도 테스트하십시오.

<a id="what-is-still-unknown-or-unreleased"></a>

## 아직 알려지지 않았거나 출시되지 않은 것

솔직히 말하면, 아키텍처, 모델 크기, 가중치는 공개되지 않았습니다. 자체 호스팅도, 파인튜닝도, 이미지·오디오·비디오 입력도 없고, 공개된 속도 제한이나 SLA 문서도 없으며, 독립적인 벤치마크도 없고, 가격이 보조금이 아니라 지속 가능하다는 증거도 없습니다. 정식 출시일은 발표되지 않았습니다. 이 가운데 하나라도 걸림돌이라면 기다리십시오. 줄 설 가치가 있는지는 [Jev가 잘하는 일](what-jev-is-good-for.md)에서, 문서는 [Jev 자료](resources.md)에서 볼 수 있습니다.
