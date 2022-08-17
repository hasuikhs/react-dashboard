# ts-react-board

- `.env`
  - jwt 토큰 생성
  ```bash
    # mac/linux
    $ openssl rand -hex 64
  ```

### 1. 실행
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