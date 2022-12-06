# ts-react-board

### 1. 목표
- 관리 안되는 스프링 코드를 `React` `Express`로 변경
- 기존 서비스의 실시간 크롤링에 소요 되는 시간도 기다리기 싫다
- 데이터들을 쉽게 CRUD 가능하게 게시판 형태로 구현
- 서버 ID를 가져오는 방법은 잘 모르기 때문에 서버 ID를 가져오는 가이드라인 필요

### 2. 기술 스택
- **FrontEnd** : `React` `TypeScript` `Redux` `Material UI` `stlyed-components`
- **BackEnd** : `Express` `TypeScript`
- **DB** : `MySQL`

### 3. 구현 사항

#### 3.1 FrontEnd
- 로그인 성공시 발급받은 토큰을 header에 담아서 통신
- 새로고침해도 발급받은 토큰을 유지하게 `redux-persist`를 이용하여 `sessionStorage`에 저장
- `react-table`을 사용하여 Material 스타일 table과 pagination, search 기능 구현
- 데이터를 보기 쉽게 `chart.js`를 사용하여 차트 구현
- 서버의 상태를 보기 쉽게 card 형태의 데이터를 구현
  - 각 지표별로 최근 24시간 내의 데이터를 보여줌
- 추후 관리하기 쉽도록 가이드라인 구현

#### 3.2 BackEnd
- 라이센스, 서버, 그룹, 유저, 시트 기본 CRUD 구현
- 계정 로그인에 성공하면 jwt 토큰을 발급
  - header에 담긴 토큰이 유효하지 않으면 api통신 불가능
- `node-schedule`을 이용하여 30분마다 서버 데이터를 가져와서 DB에 저장
- 서버 용량 문제로 데이터가 너무 많아지면 안되기에 최근 일주일이 아닌 데이터는 매일 새벽 1시에 삭제

### 4. 추가 설정 사항
#### 4.1 `.env` 파일 
  - jwt 토큰 생성
  ```bash
  # mac/linux
  $ openssl rand -hex 64
  ```
  - `.env` 내용
  ```
  JWT_SECRET=[위의 토큰 or 임의 문자 대소문자 구분됨]
  PASS_SALT=[비밀번호 암호화 salt]

  DB_HOST=localhost
  DB_USER=[DB 접속 ID]
  DB_PASSWORD=[DB 접속 비밀번호]
  DB_DATABASE=[DB]
  DB_CONNECTION_LIMIT=20
  ```


#### 4.2 배포
- pm2 설치
  - 백그라운드 실행
  
    ```bash
    $ npm i -g pm2
    
    # typescript support
    $ pm2 install typescript
    
    # server
    $ cd ./ts-react-board/server
    $ pm2 start app.ts --name server --cron-restart="30 */6 * * *"
    
    # client
    $ cd ./ts-react-board/client
    $ pm2 start npm --name client -- start --watch
    
    # 서버 재기동시 자동실행
    $ pm2 startup
    # 변경사항 저장
    $ pm2 save
    ```
  - `service.json` 작성
  
    ```json
    {
      "apps": [{
        "name": "server",
        "cwd": "./server",
        "script": "./app.ts",
        "cron_restart": "30 */6 * * *",
        "watch": true
      }, {
        "name": "client",
        "cwd": "./client",
        "script": "npm",
        "args": "start",
        "watch": true
      }]
    }
    ```
  
    ```bash
    # root directory에서
    $ pm2 start service.json
    ```
