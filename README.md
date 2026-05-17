# 🍚 밥약 투자 제안서 — Meal Sponsorship Proposal

> 선배의 밥약을 벤처 투자로 재해석한 풍자 인터랙티브 웹사이트

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff4154?style=flat-square)](https://www.framer.com/motion)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vite.dev)

---

## 기획 의도

한국 대학 문화에서 선배가 후배에게 밥을 사주는 **"밥약"**은 진심 어린 배려와 멘토십의 표현입니다. 그러나 이를 단순한 공짜 밥으로만 소비하는 경우도 적지 않습니다.

이 프로젝트는 그 아이러니를 정면으로 포착합니다. 밥약을 **벤처 투자 제안**으로, 선배를 **Patron Investor**로, 밥 한 끼를 **ROI 지표가 붙은 포트폴리오**로 재해석함으로써, 얻어먹기에 익숙해진 시선을 한번 비틀어 보게 만드는 **밈적 풍자 사이트**입니다.

> *"당신이 그냥 얻어먹은 삼겹살은, 사실 ₩134,000 규모의 Premium Pork Investment였습니다."*

---

## 주요 기능 및 UX 흐름

프로젝트는 세 단계로 구성된 스토리텔링 구조를 가집니다.

### 1단계 — 봉투 씬 (Envelope Scene)

스크롤 기반 인터랙티브 애니메이션으로 구성된 도입부입니다.

- **300vh 스크롤 컨테이너** 안에 `position: sticky` 패널이 고정되어 스크롤 진행에 따라 장면이 변화합니다.
- 스크롤 진행률에 따라 봉투 **플랩이 열리고**, 내부의 편지지가 **위로 솟아오르며**, 봉투가 **페이드아웃**됩니다.
- 애니메이션이 완료되면 **"제안서 열어보기"** CTA 버튼이 나타나고 스크롤이 잠깁니다.

### 2단계 — 제안서 (Proposal Letter)

오마카세급 투자 제안서 형식으로 밥약의 조건과 기대 효과를 서술합니다.

- "투자 유치 제안서"의 형식을 빌린 유머러스한 텍스트 레이아웃
- 제안 수락 버튼 클릭 시 다음 단계로 전환

### 3단계 — 명예의 전당 (Hall of Fame)

실제 밥을 사준 선배·동기를 **Legendary / Gold / Silver / Bronze / Starter / Survival** 티어로 분류한 리더보드입니다.

- 후배 행복 지수, 도덕적 우월감, Gratitude Index 등 가상의 KPI를 시각화
- 카드 클릭 시 상세 모달 (Contribution Impact Report)
- 티어별 필터 탭

---

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| UI 라이브러리 | React 19 |
| 애니메이션 | Framer Motion 12 (`useScroll`, `useTransform`, `AnimatePresence`) |
| 번들러 | Vite 8 |
| 스타일링 | CSS Modules + CSS 커스텀 프로퍼티 (Design Token) |
| 언어 | JavaScript (ESM) |

---

## 구현 포인트

### 스크롤 구동 애니메이션

Framer Motion의 `useScroll` + `useTransform`을 활용해 스크롤 진행률(`scrollYProgress`)을 각 요소의 transform 값에 직접 매핑했습니다. `position: sticky` 컨테이너를 이용해 스크롤이 진행되는 동안 뷰포트에 고정된 채 애니메이션이 재생됩니다.

```js
// 스크롤 0% → 38% 구간에서 플랩이 열림
const flapRotateX = useTransform(scrollYProgress, [0, 0.38], [0, -185]);

// 스크롤 28% → 68% 구간에서 편지지가 위로 솟아오름
const paperY = useTransform(scrollYProgress, [0.28, 0.68], ['60px', '-150px']);
```

### 스크롤 잠금

CTA 버튼이 완전히 나타나는 시점(`scrollYProgress >= 0.85`)에 `document.body.style.overflow = 'hidden'`으로 스크롤을 잠급니다. iOS 포함 크로스 브라우저에서 가장 신뢰도 높은 방식입니다. `MotionValue.on('change', ...)` 구독을 통해 진행률 변화를 감지합니다.

### Framer Motion과 CSS transform 충돌 해결

Framer Motion이 엘리먼트의 `transform` 속성을 직접 제어하기 때문에, 모달의 `translate(-50%, -50%)` 센터링이 덮어씌워지는 문제가 발생합니다. 이를 **Flexbox 센터링 래퍼**(`position: fixed; inset: 0; display: flex`)로 분리하여 해결했습니다. 모달 자체는 애니메이션 transform만 담당합니다.

---

## 디렉토리 구조

```
src/
├── components/
│   ├── EnvelopeScene/     # 봉투 스크롤 인터랙션
│   ├── ProposalLetter/    # 제안서 페이지
│   ├── HallOfFame/        # 명예의 전당 + 모달
│   └── ScrollIndicator/   # 스크롤 유도 인디케이터
├── data/
│   └── sponsors.js        # 스폰서 데이터 및 티어 설정
└── styles/
    └── globals.css        # 디자인 토큰 (색상, 타이포그래피, 간격)
```

---

## 만든 이유

*"선배님, 그거 그냥 밥 아닙니다. ₩213,000짜리 Legendary급 위장 투자입니다."*

밥약 문화의 본질을 잊지 않되, 그 아이러니를 유머로 승화시켜 보는 시각을 환기하고자 만들었습니다.
