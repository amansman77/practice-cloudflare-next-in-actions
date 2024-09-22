# NextJS 를 CloudFlare Pages 에 배포해보는 프로젝트입니다.

해당 프로젝트는 [Learn Next.js](https://nextjs.org/learn) 의 스타터 템플릿을 활용했습니다.

## 프로젝트 구조

```
next-in-action/
├── node_modules/
├── pages/
├── public/
├── styles/
├── .gitignore
├── next.config.js
├── package.json
├── package-lock.json
└── README.md
```

### 주요 디렉토리 및 파일 설명

- `node_modules/`: 프로젝트 종속성이 설치되는 디렉토리
- `pages/`: Next.js 페이지 컴포넌트가 위치하는 디렉토리
- `public/`: 정적 파일(이미지, 폰트 등)을 저장하는 디렉토리
- `styles/`: CSS 파일을 저장하는 디렉토리
- `.gitignore`: Git이 무시해야 할 파일 및 디렉토리 목록
- `next.config.js`: Next.js 설정 파일
- `package.json`: 프로젝트 메타데이터 및 종속성 정보
- `package-lock.json`: 종속성 버전을 고정하는 파일
- `README.md`: 프로젝트 설명 및 문서화

## 설정 및 실행

현재 이 프로젝트는 정적 내보내기(`output: export`) 설정이 되어 있습니다. 
프로젝트를 실행하려면 다음 단계를 따르세요:

1. 종속성 설치:
   ```
   npm install
   ```

2. 프로젝트 빌드:
   ```
   npm run build
   ```

3. 정적 파일 서빙:
   ```
   npx serve@latest out
   ```

참고: 서버 사이드 렌더링이 필요한 경우, `next.config.js`에서 `output: export` 설정을 제거하고 
`npm run start`를 사용하여 프로젝트를 실행할 수 있습니다.
