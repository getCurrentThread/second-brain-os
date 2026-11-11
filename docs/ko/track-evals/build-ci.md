# 실습: 게이트

사람이 기억할 때만 도는 스위트는 결국 돌지 않게 되는 스위트입니다. 이 페이지는 [스위트 만들기](build-suite.md)의 `eval_suite.py`를 GitHub Actions에 연결합니다. 부분 집합이 모든 PR의 게이트가 되고, 전체 스위트는 매일 밤 돌며, 그 숫자는 저장소에 커밋되는 점수판에 쌓입니다. 원칙은 [에이전트 평가](agent-evals.md)의 CI 절에 있습니다.

<a id="the-workflow"></a>

## 워크플로

`.github/workflows/evals.yml`로 저장합니다. 먼저 저장소 시크릿에 `ANTHROPIC_API_KEY`를 추가하십시오.

```yaml
name: evals

on:
  pull_request:
  schedule:
    - cron: "30 2 * * *"

permissions:
  contents: write

concurrency:
  group: evals-${{ github.ref }}
  cancel-in-progress: true

env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

jobs:
  pr-gate:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v6
        with:
          python-version: "3.12"
      - run: pip install anthropic
      - name: Run the smoke subset
        run: python eval_suite.py golden.jsonl --limit 20 --threshold 0.85

  nightly:
    if: github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-python@v6
        with:
          python-version: "3.12"
      - run: pip install anthropic
      - name: Run the full suite
        run: python eval_suite.py golden.jsonl --threshold 0.85
      - name: Append to the scoreboard
        if: always()
        run: |
          rate=$(python -c "import json; print(f\"{json.load(open('results.json'))['pass_rate']:.0%}\")")
          echo "| $(date -u +%Y-%m-%d) | ${rate} | ${GITHUB_SHA::7} |" >> scoreboard.md
          git config user.name "eval-bot"
          git config user.email "actions@users.noreply.github.com"
          git add scoreboard.md
          git commit -m "scoreboard: nightly eval run"
          git push
```

<a id="choosing-the-threshold"></a>

## 임계값 정하기

임계값은 현재 통과율에 맞추지 말고 그보다 낮게 잡으십시오. 판정이 들어가는 케이스는 확률적입니다. 90%에 있는 스위트는 아무것도 바뀌지 않았는데도 가끔 87%를 출력하고, 90%에 둔 게이트는 그 노이즈를 아무도 믿지 않는 빨간 빌드로 바꿔 놓습니다. 전체 스위트를 세 번 돌려 가장 나쁜 숫자를 고르고, 그보다 2포인트쯤 아래에 게이트를 두십시오. 기준은 진짜 개선이 매일 밤 실행에서 한 주 동안 유지된 뒤에만 올립니다. 그리고 스크립트에 모델 ID를 고정하십시오. 모델 별칭이 조용히 다른 모델을 가리키게 되는 것도 변경이며, 다른 변경과 똑같이 게이트를 거치는 PR로 들어와야 합니다.

<a id="cost-control"></a>

## 비용 관리

PR 잡은 처음 스무 개 케이스를 실행합니다. 그 스무 개는 가장 싸고 실패 원인을 잘 짚어 주는 것으로 유지하십시오. 가장 큰 실패 모드에서 나온, 코드로 채점되는 케이스입니다. `golden.jsonl`의 순서를 정하는 일은 공짜이고 비싼 것은 판정자 호출이기 때문입니다. 케이스 스무 개에 케이스당 호출이 두 번이면 PR당 비용은 푼돈입니다. 판정 케이스를 전부 포함한 전체 스위트는 저장소가 얼마나 활발하든 하루에 한 번만 돕니다. `cancel-in-progress`는 강제 푸시가 중복 실행을 쌓지 못하게 막습니다. 그래도 야간 비용이 부담스럽다면 스위트가 오후 한나절 버전을 넘어 자랐다는 신호이며, [평가 설계](designing-evals.md)의 표본 크기 지침이 어떤 케이스가 제 몫을 하고 있는지 알려 줍니다.

<a id="the-scoreboard"></a>

## 점수판

`scoreboard.md`는 손으로 만들어 둡니다.

```markdown
# Eval scoreboard

| date | pass rate | commit |
|---|---|---|
```

야간 잡은 행을 하나 덧붙이고 커밋합니다. 실패한 실행에서도 마찬가지입니다. 로그에 찍힌 나쁜 숫자는 사실이지만, 빠진 행은 미스터리이기 때문입니다. 점수판의 요점은 형식적인 절차가 아니라, 숫자가 저장소의 모든 클론에서 보이는 이력이 된다는 것입니다. 숫자가 떨어지면 `git log scoreboard.md`와 야간 로그가 정확히 어느 날, 어느 커밋인지 알려 줍니다. 트레이스를 읽고, 실패를 코드로 옮기고, 게이트를 걸고, 숫자를 지켜보는 이 루프가 바로 [평가가 필요한 이유](why-evals.md)의 플라이휠이며, 이제는 사람 없이도 돌아갑니다.
