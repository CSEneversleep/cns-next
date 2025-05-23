# Afterglow

## 프로젝트 소개

**Afterglow**는 행사, 모임 등에서 함께한 소중한 순간들을 영상으로 기록하고 보존할 수 있는 웹 서비스입니다.  
시간이 지나도 언제든지 그날의 감동과 추억을 생생히 되살릴 수 있도록 돕는 것을 목표로 합니다.

### 영감

Afterglow는《그대에게》의의 가사 중 “이 세상 어느 곳에서도 나는 그대 숨결을 느낄 수 있어요”라는 문장에서 출발했습니다. SKYST처럼 특별한 순간은 당시에는 선명하지만 시간이 흐르면 점차 희미해지기 마련인데, 그 기억이 잊히지 않도록 행사 사진과 영상을 한곳에 모아 언제든지 한눈에 추억을 되돌아볼 수 있는 플랫폼을 만들고자 했습니다. 그래서 이용자가 영상 속 장면과 감동을 통해 마치 그 자리에 있는 듯한 몰입감을 느끼도록 서비스 경험을 설계했습니다.

---

## 주요 기능

Afterglow는 다음과 같은 주요 기능을 제공합니다:

### 0. Event 생성

- 원하는 이벤트의 목록을 만들어 자신만의 추억을 간직할 수 있습니다.
  ![Demo](public/demo/demo.gif)

### 1. QR 코드 발급

- 이벤트 목록마다 QR 코드를 생성하여 사진 업로드를 간편하게 지원합니다.
  ![Demo](public/demo/QR.png)

### 2. 사진 업로드 및 관리

- 업로드된 사진을 안전하게 저장합니다.

### 3. 하이라이트 영상 자동 생성

- AI를 활용하여 업로드된 사진을 분석하고 주요 장면을 선별하여 행사 영상을 자동으로 제작합니다.

### 4. 갤러리(List) 뷰

- 사용자가 업로드된 사진을 썸네일 형태로 한눈에 확인할 수 있습니다.
  ![Demo](public/demo/list.png)

### 5. 슬라이드 쇼 뷰

- 전체 사진을 순차적으로 넘겨 보며 감상할 수 있는 슬라이드 쇼 기능을 제공합니다.
  ![Demo](public/demo/slide.png)

---

## 개발 팀

Afterglow는 4명의 개발자가 협력하여 개발한 프로젝트입니다.

### 팀원 역할

- **강명석 (팀장)**

  - 프로젝트 총괄 관리
  - 백엔드 및 데이터베이스 설계 및 관리
  - Git Workflow 운영

- **김인서**

  - 프론트엔드: 사진 업로드, QR 코드 기능 구현
  - README.md 파일 등 문서 작성

- **김범준**

  - 프론트엔드: 사진 갤러리(List) 뷰 기능 구현, 사진 슬라이드 쇼 기능 구현
  - 배경 화면 디자인

- **이형주**
  - 프론트엔드: 사진 슬라이드 쇼 기능 구현
  - AI 기반 하이라이트 영상 생성 기능 구현
  - 발표자

---

## 기술 스택

### Frontend

- React.js
- Next.js

### Backend

- Firebase
- S3

### 기타

- AI 모델: OpenAI
- QR 코드 생성: QRServer API

---

## 설치 및 실행

Afterglow를 로컬 환경에서 실행하려면 다음 단계를 따르세요:

1. **레포지토리 클론**

   ```bash
   git clone https://github.com/CSEneversleep/cns-next
   cd afterglow
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**
   `.env.local.example` 파일을 복사하고 `.env.local`로 이름을 변경합니다.

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   [http://localhost:3000](http://localhost:3000)으로 이동하여 서비스를 확인합니다.

---

## 기여 방법

Afterglow에 기여하고 싶다면 다음 단계를 따라주세요:

1. 이 레포지토리를 포크합니다.
2. 새로운 브랜치를 생성합니다: `git checkout -b feature/your-feature-name`
3. 변경 사항을 커밋합니다: `git commit -m "Add your feature"`
4. 브랜치에 푸시합니다: `git push origin feature/your-feature-name`
5. Pull Request를 생성합니다.

---

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE)를 참조하세요.
