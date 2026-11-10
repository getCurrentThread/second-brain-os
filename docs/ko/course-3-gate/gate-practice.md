# 게이트 실습

규율을 한 문장으로 말하면 이렇습니다. 어떤 벤더든 평가하기 전에, 실제 예시 수백 개에 레이블을 달고 기본 분류기를 학습시키십시오. 30분이면 되고, 모든 주장은 내 데이터에서 이 기준선을 넘어야 파이프라인에 자리를 얻습니다.


> 이 감사와 기준선 절차는 스킬로 패키지되어 있습니다. [강좌 플러그인](../../../plugins/README.md)을 설치하고 파이프라인에서 `/agents-course:gate-check`를 실행하십시오.

<a id="label-two-hundred-real-examples"></a>

## 실제 예시 200개 레이블링

에이전트가 실제로 처리하는 스트림에서 최근 항목 200개를 가져옵니다. 합성 예시도, 남이 만든 공개 데이터셋도 안 됩니다. 레이블은 세 가지를 씁니다.

- `file`: 순수 참고 자료입니다. 뉴스레터, 영수증, 다이제스트가 해당합니다. 곧장 보관소로 가며 모델이 필요 없습니다.
- `act`: 구체적인 할 일을 만듭니다. 내야 할 청구서, 서명할 양식, 확정할 회의가 해당합니다.
- `judge`: 실제 판단이 필요합니다. 모호한 요청, 제안, 큰 이해관계가 걸린 모든 것이 해당합니다.

레이블링하는 동안 지킬 규칙이 셋 있습니다. 항목이 무엇인지를 기준으로 달고, 분류 체계가 이랬으면 하는 바람을 기준으로 달지 마십시오. 두 레이블 사이에서 갈등하면 `judge`를 고르십시오. 내가 망설이는 항목은 게이트도 망설입니다. 도중에 새 범주를 만들지 마십시오. 후보는 적어 두고 이번 패스를 끝내십시오. 항목당 5초면 약 15분입니다. `labels.csv`로 저장합니다.

```csv
text,label
"Weekly digest: ten AI papers you missed",file
"Invoice 2214 attached, due Friday, please confirm receipt",act
"Fwd: any thoughts on this partnership proposal?",judge
```

<a id="train-the-baseline"></a>

## 기준선 학습

`pip install scikit-learn pandas joblib`로 한 번 설치한 다음 실행합니다.

```python
# train_gate.py
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

df = pd.read_csv("labels.csv")

X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.25,
    stratify=df["label"], random_state=42,
)

gate = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=2, sublinear_tf=True)),
    ("clf", LogisticRegression(max_iter=1000, class_weight="balanced")),
])
gate.fit(X_train, y_train)

print(classification_report(y_test, gate.predict(X_test), digits=3))
joblib.dump(gate, "gate.joblib")
```

<a id="measure-then-decide"></a>

## 측정한 뒤 결정

겉으로 드러나는 전체 정확도만 보지 말고 클래스별 정밀도와 재현율을 읽으십시오. 이 숫자가 기준선입니다. 이제야 벤더에 대한 질문이 제대로 성립합니다. 더 화려한 어떤 것이 이 데이터에서 이 기준선을, 네트워크 호출과 청구서와 의존성을 정당화할 만큼 넘어서는가? 지금까지의 독립 증거로 보면([실전 게이트](gates-in-practice.md) 참조) 고정되어 있고 레이블이 있는 작업에서는 대체로 아니라는 답이 나옵니다.

<a id="wire-the-winner-in"></a>

## 이긴 쪽 연결하기

```python
# gate.py
import joblib

gate = joblib.load("gate.joblib")
THRESHOLD = 0.85
HANDLED = {"file", "act"}

def route(text: str) -> tuple[str, float]:
    probs = gate.predict_proba([text])[0]
    best = probs.argmax()
    label = gate.classes_[best]
    confidence = float(probs[best])
    if label not in HANDLED or confidence < THRESHOLD:
        return "escalate", confidence
    return label, confidence
```

`escalate`를 돌려주는 것은 모두 메인 모델로 갑니다. 페일 클로즈드입니다. 로깅과 LLM으로 넘어가는 경로까지 갖춘 전체 라우팅 스캐폴딩은 [신뢰도 게이트 라우터](../track-jev/build-router.md)에 있으며, 이 파이프라인은 그 빠른 경로에 수정 없이 들어갑니다.

<a id="tips"></a>

## 팁

- 모든 결정을 신뢰도와 함께 기록합니다. 라우팅되었든 아니든 마찬가지입니다. 이 로그가 앞으로의 평가 세트입니다.
- 매주 다시 학습합니다. 메인 모델이 해결한 에스컬레이션은 공짜 레이블이므로 `labels.csv`에 덧붙입니다.
- `judge`는 영원히 남겨 둡니다. 탈출구가 없는 게이트는 추측하는 게이트입니다.
- 임계값은 0.85에서 시작하고, 따로 떼어 둔 데이터에서 신뢰도 구간별 정확도를 구한 뒤에만 움직입니다.

<a id="prove-it-to-yourself"></a>

## 직접 확인하기

1. 따로 떼어 둔 데이터의 예측을 신뢰도 구간(0–0.5, 0.5–0.85, 0.85–1.0)으로 묶고 구간별 정확도를 보고합니다. 최상위 구간이 거의 완벽하지 않다면 임계값을 올리십시오.
2. 임계값 0.7, 0.85, 0.95에서 보고서를 다시 돌리고, 각각의 에스컬레이션 비율과 빠른 경로 오류율을 기록합니다. 트레이드오프를 의도적으로 고르십시오.
3. 일주일 동안 섀도 실행을 합니다. 게이트가 결정하지만 실제 처리는 여전히 메인 모델이 전부 맡습니다. 빠른 경로를 믿기 전에 불일치 건수를 세어 보십시오.

게이트가 스트림을 분류해 주면 값비싼 모델은 마침내 제 본업을 할 여유를 얻습니다. 다음 모듈의 주제입니다. [사무실](../course-4-harness/the-office.md).

더 깊이 → [Jev 엔지니어링 핸드북](../track-jev/system-one-models.md): 시스템 1 모델, 그것이 잘하는 일, 그리고 신뢰도 게이트 라우터 실습을 다룹니다.
