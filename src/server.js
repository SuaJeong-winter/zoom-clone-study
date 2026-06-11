import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.use((req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    done();
    console.log(roomName);
    console.log(socket.id);
    // id 속성은 해당 소켓만의 고유한 값 -> 사용자 여러 명이 서버에 접속해 소켓을 형성해도 서로 구별할 수 있다는 뜻.
    console.log(socket.rooms);
    // rooms 속성은 소켓이 현재 어떤 룸에 있는지를 나타냄. 이때, 소켓이 접속한 방이 하나가 아닐수도 있다
    socket.join(roomName);
    console.log(socket.rooms);
  });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handleListen);
