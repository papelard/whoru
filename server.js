const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let players = [];
let leaderId = null;
let currentAnswer = "";
let currentImage = "";

io.on("connection", (socket) => {
  socket.on("join", (name) => {
    const player = {
      id: socket.id,
      name: name || "Игрок"
    };

    players.push(player);

    if (!leaderId) {
      leaderId = socket.id;
    }

    io.emit("players", players);

    if (socket.id === leaderId) {
      socket.emit("role", "Ты ведущий");
      socket.emit("leader");
    } else {
      socket.emit("role", "Ты игрок");
    }
  });

  socket.on("startRound", ({ answer, image }) => {
    currentAnswer = answer || "";
    currentImage = image || "";
    io.emit("roundStarted", { image: currentImage });
    io.emit("log", "Раунд начался");
  });

  socket.on("question", (text) => {
    io.emit("log", text);
  });

  socket.on("answer", (text) => {
    io.emit("log", text);
  });

  socket.on("guess", (guess) => {
    if (
      currentAnswer &&
      guess &&
      guess.trim().toLowerCase() === currentAnswer.trim().toLowerCase()
    ) {
      io.emit("log", `Угадано: ${guess}`);
    } else {
      io.emit("log", `Неверно: ${guess}`);
    }
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== socket.id);

    if (leaderId === socket.id) {
      leaderId = players.length ? players[0].id : null;

      if (leaderId) {
        io.to(leaderId).emit("role", "Ты ведущий");
        io.to(leaderId).emit("leader");
      }
    }

    io.emit("players", players);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});