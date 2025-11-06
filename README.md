# 우리 아이의 강점은?

한국어 아동 강점 진단 애플리케이션입니다.

## GitHub Pages 배포 방법

### 1. 저장소 설정

1. GitHub에서 저장소의 Settings로 이동
2. 왼쪽 메뉴에서 "Pages" 선택
3. Source 섹션에서:
   - **Branch**: `main` (또는 사용 중인 기본 브랜치)
   - **Folder**: `/ (root)`
   - "Save" 버튼 클릭

### 2. 배포 확인

- 설정 후 약 1-2분 내에 사이트가 배포됩니다
- 배포된 URL: `https://[username].github.io/[repository-name]/`

## 프로젝트 구조

```
/
├── index.html              # 배포용 메인 HTML 파일
├── assets/                 # 배포용 빌드 파일 (JS, CSS, 폰트)
├── questions_v1.json       # 질문 데이터
├── descriptions_ko_v2.json # 강점 설명 데이터
├── og-image.jpg           # OG 이미지
│
├── client/                # React 소스 코드
├── server/                # Express 서버 코드
├── shared/                # 공유 타입 정의
├── package.json           # 프로젝트 설정
└── vite.config.ts         # Vite 빌드 설정
```

## 로컬 개발

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5000 접속

### 프로덕션 빌드

```bash
npm run build
cp -r dist/public/* .
```

빌드 후 루트 폴더에 배포 파일이 생성됩니다.

### 빌드된 파일 로컬 테스트

⚠️ **중요**: `index.html`을 크롬에서 직접 열지 마세요 (`file://` 프로토콜은 CORS 에러 발생)

빌드 후 로컬에서 테스트하려면 간단한 HTTP 서버 사용:

```bash
# Python이 설치되어 있다면
python3 -m http.server 8080

# 또는 Node.js npx 사용
npx serve -p 8080
```

브라우저에서 http://localhost:8080 으로 접속하세요.

## 기능

- 54개 질문을 통한 2단계 강점 진단
- 34개 강점 테마 중 상위 5개 도출
- 각 강점별 상세 설명:
  - 강점 기르기 (5가지 상세 방법)
  - 학습 방법 (5가지 상세 방법)
  - 추천 직업 (5가지 상세 설명)
- PDF 저장 기능 (브라우저 인쇄)
- Web Share API를 통한 결과 공유

## 기술 스택

- **Frontend**: React, TypeScript, Vite
- **UI**: Shadcn/ui, Tailwind CSS
- **State**: React Hooks, TanStack Query
- **Routing**: Wouter

## 라이선스

MIT
