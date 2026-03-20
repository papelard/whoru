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
      name: name?.trim() || "Игрок",
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
    currentAnswer = answer?.trim() || "";
    currentImage = image || "";

    io.emit("roundStarted", { image: currentImage });
    io.emit("log", "Раунд начался");
  });

  socket.on("question", (text) => {
    if (!text?.trim()) return;
    io.emit("log", text.trim());
  });

  socket.on("answer", (text) => {
    if (!text?.trim()) return;
    io.emit("log", text.trim());
  });

  socket.on("guess", (guess) => {
    const cleanGuess = guess?.trim() || "";
    const cleanAnswer = currentAnswer?.trim() || "";

    if (!cleanGuess) return;

    if (cleanAnswer && cleanGuess.toLowerCase() === cleanAnswer.toLowerCase()) {
      io.emit("log", `Угадано: ${cleanGuess}`);
    } else {
      io.emit("log", `Неверно: ${cleanGuess}`);
    }
  });

  socket.on("disconnect", () => {
    players = players.filter((player) => player.id !== socket.id);

    if (leaderId === socket.id) {
      leaderId = players.length > 0 ? players[0].id : null;

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