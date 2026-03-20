const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const rooms = {};

function createRoomIfNeeded(roomCode) {
  if (!rooms[roomCode]) {
    rooms[roomCode] = {
      players: [],
      leaderId: null,
      currentAnswer: "",
      currentImage: ""
    };
  }
}

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, roomCode }) => {
    const cleanName = name?.trim();
    const cleanRoomCode = roomCode?.trim().toUpperCase();

    if (!cleanName || !cleanRoomCode) return;

    createRoomIfNeeded(cleanRoomCode);

    const room = rooms[cleanRoomCode];

    socket.join(cleanRoomCode);
    socket.roomCode = cleanRoomCode;

    const player = {
      id: socket.id,
      name: cleanName
    };

    room.players.push(player);

    if (!room.leaderId) {
      room.leaderId = socket.id;
    }

    io.to(cleanRoomCode).emit("players", room.players);

    if (socket.id === room.leaderId) {
      socket.emit("role", "Ты ведущий");
      socket.emit("leader");
    } else {
      socket.emit("role", "Ты игрок");
    }
  });

  socket.on("startRound", ({ answer, image }) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];

    if (socket.id !== room.leaderId) return;

    room.currentAnswer = answer?.trim() || "";
    room.currentImage = image || "";

    io.to(roomCode).emit("roundStarted", {
      image: room.currentImage
    });

    io.to(roomCode).emit("log", "Раунд начался");
  });

  socket.on("question", (text) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const cleanText = text?.trim();
    if (!cleanText) return;

    io.to(roomCode).emit("log", cleanText);
  });

  socket.on("answer", (text) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const cleanText = text?.trim();
    if (!cleanText) return;

    io.to(roomCode).emit("log", `Ответ: ${cleanText}`);
  });

  socket.on("guess", (guess) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];
    const cleanGuess = guess?.trim() || "";
    const cleanAnswer = room.currentAnswer?.trim() || "";

    if (!cleanGuess) return;

    if (cleanAnswer && cleanGuess.toLowerCase() === cleanAnswer.toLowerCase()) {
      io.to(roomCode).emit("log", `Угадано: ${cleanGuess}`);
    } else {
      io.to(roomCode).emit("log", `Неверно: ${cleanGuess}`);
    }
  });

  socket.on("disconnect", () => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];

    room.players = room.players.filter((player) => player.id !== socket.id);

    if (room.leaderId === socket.id) {
      room.leaderId = room.players.length > 0 ? room.players[0].id : null;

      if (room.leaderId) {
        io.to(room.leaderId).emit("role", "Ты ведущий");
        io.to(room.leaderId).emit("leader");
      }
    }

    io.to(roomCode).emit("players", room.players);

    if (room.players.length === 0) {
      delete rooms[roomCode];
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});