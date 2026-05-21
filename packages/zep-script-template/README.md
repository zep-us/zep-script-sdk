# ZEP Script Webpack Template

## 🇰🇷 한국어

### 개요
이 프로젝트는 TypeScript와 Webpack을 사용하여 ZEP 스크립트를 개발하기 위한 템플릿입니다. 현대적인 개발 환경에서 ZEP 스크립트를 작성하고 빌드할 수 있습니다.

### 기능
- TypeScript 지원
- Webpack을 통한 모듈 번들링
- 자동 코드 분할 (chunk splitting)
- Babel을 통한 코드 변환
- 자동 배포 스크립트

### 프로젝트 구조
```
zep-script-webpack-template/
├── src/                    # 소스 코드 디렉토리
├── res/                   # 빌드된 파일이 저장되는 디렉토리
├── main.ts                # 메인 진입점
├── package.json           # 프로젝트 설정 및 의존성
├── webpack.config.js      # Webpack 설정
├── babel.config.js        # Babel 설정
├── tsconfig.json          # TypeScript 설정
└── zep-script.json        # ZEP 스크립트 배포 설정
```

### 설치 및 설정

1. **의존성 설치**
   ```bash
   npm install
   # 또는
   pnpm install
   ```

2. **ZEP Script 배포 설정**
   - `zep-script.json` 파일에서 앱 정보를 수정하세요:
   ```json
   {
     "appId": "your-app-id",
     "name": "your-app-name",
     "description": "your-app-description",
     "type": "normal"
   }
   ```

### 사용법

#### 개발 및 빌드

1. **빌드만 실행**
   ```bash
   npm run build
   ```

2. **빌드 + 패키징**
   ```bash
   npm run pack
   ```

3. **패키징만 실행**
   ```bash
   npm run archive
   ```

4. **배포**
   ```bash
   npm run deploy
   ```

5. **전체 프로세스 (빌드 + 패키징 + 배포)**
   ```bash
   npm run yaho
   ```

#### 코드 작성

1. **src** 폴더에 TypeScript 파일을 생성합니다
2. **main.ts**에서 필요한 모듈을 import하고 초기화합니다
3. 예제 코드:
   ```typescript
   import type { ScriptPlayer } from "zep-script";
   import { OnJoinPlayer } from "./src/OnJoinPlayer";

   ScriptApp.onInit.Add(()=>{
       new OnJoinPlayer();
   })
   ```

### 빌드 과정
- TypeScript → JavaScript 변환
- 코드 분할 및 최적화
- `res/` 폴더에 빌드 결과물 생성
- 자동으로 `.zepapp.zip` 파일 생성

---

## 🇺🇸 English

### Overview
This project is a template for developing ZEP scripts using TypeScript and Webpack. It provides a modern development environment for writing and building ZEP scripts.

### Features
- TypeScript support
- Module bundling with Webpack
- Automatic code splitting (chunk splitting)
- Code transformation with Babel
- Automated deployment scripts

### Project Structure
```
zep-script-webpack-template/
├── src/                    # Source code directory
├── res/                   # Directory for built files
├── main.ts                # Main entry point
├── package.json           # Project configuration and dependencies
├── webpack.config.js      # Webpack configuration
├── babel.config.js        # Babel configuration
├── tsconfig.json          # TypeScript configuration
└── zep-script.json        # ZEP script configuration
```

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure ZEP Script Deploy**
   - Modify app information in `zep-script.json`:
   ```json
   {
     "appId": "your-app-id",
     "name": "your-app-name",
     "description": "your-app-description",
     "type": "normal"
   }
   ```

### Usage

#### Development & Build

1. **Build only**
   ```bash
   npm run build
   ```

2. **Build + Package**
   ```bash
   npm run pack
   ```

3. **Package only**
   ```bash
   npm run archive
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Full process (Build + Package + Deploy)**
   ```bash
   npm run yaho
   ```

#### Writing Code

1. Create TypeScript files in the **src** folder
2. Import and initialize required modules in **main.ts**
3. Example code:
   ```typescript
   import type { ScriptPlayer } from "zep-script";
   import { OnJoinPlayer } from "./src/OnJoinPlayer";

   ScriptApp.onInit.Add(()=>{
       new OnJoinPlayer();
   })
   ```

### Build Process
- TypeScript → JavaScript transformation
- Code splitting and optimization
- Build output generated in `res/` folder
- Automatically creates `.zepapp.zip` file

### Development Tips
- Add your custom modules in the `src/` directory
- Modify `main.ts` to initialize your modules
- Use TypeScript for better development experience
- The webpack configuration automatically handles code splitting for optimal performance

### Requirements
- Node.js
- npm or pnpm
- ZEP Script CLI (installed as dependency)
