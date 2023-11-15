const express = require("express"); // Express 모듈을 불러옴
const usersRouter = require("./usersRouter");

const app = express(); // Express 애플리케이션을 생성
const PORT = 5500; //서버 포트 정의

app.use(express.json());
app.use(`/users`, usersRouter);

// 정적 파일 불러오기
app.use(express.static(__dirname + "/Capstone"));

app.get("/", (req, res) => {
  // 루트 경로에 대한 GET 요청에 대한 라우터를 정의

  res.sendFile(__dirname + "/Capstone/index.html"); // 루트 경로에 접근할 경우, "/MAin/Main.html" 파일을 응답으로 전송
});

app.get("/tables", (req, res) => {
  // 루트 경로에 대한 GET 요청에 대한 라우터를 정의

  res.sendFile(__dirname + "/Capstone/tables.html"); // 루트 경로에 접근할 경우, "/MAin/Main.html" 파일을 응답으로 전송
});

app.get("/Main", (req, res) => {
  // 루트 경로에 대한 GET 요청에 대한 라우터를 정의

  res.sendFile(__dirname + "/Capstone/Main.html"); // 루트 경로에 접근할 경우, "/MAin/Main.html" 파일을 응답으로 전송
});

app.get("/test", (req, res) => {
  // 루트 경로에 대한 GET 요청에 대한 라우터를 정의

  res.sendFile(__dirname + "/Capstone/test.html"); // 루트 경로에 접근할 경우, "/MAin/Main.html" 파일을 응답으로 전송
});

// 서버 실행
app.listen(5500, () => {
  console.log(`Listen : ${PORT}`);
});
