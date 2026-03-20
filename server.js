const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const rooms = {};

io.on("connection", (socket) => {

  socket.on("joinRoom", ({ name, roomCode, password }) => {
    const cleanName = name?.trim();
    const cleanRoom = String(roomCode).trim();
    const cleanPassword = password?.trim();

    if (!cleanName || !cleanRoom || !cleanPassword) {
      socket.emit("joinError", "Введите имя, комнату и пароль");
      return;
    }

    if (!rooms[cleanRoom]) {
      rooms[cleanRoom] = {
        password: cleanPassword,
        players: [],
        leaderId: null,
        currentAnswer: "",
        currentImage: "",
        roundActive: false
      };
    }

    const room = rooms[cleanRoom];

    if (room.password !== cleanPassword) {
      socket.emit("joinError", "Неверный пароль");
      return;
    }

    socket.join(cleanRoom);
    socket.roomCode = cleanRoom;

    const player = {
      id: socket.id,
      name: cleanName
    };

    room.players.push(player);

    if (!room.leaderId) {
      room.leaderId = socket.id;
    }

    io.to(cleanRoom).emit("players", room.players);

    if (socket.id === room.leaderId) {
      socket.emit("role", "Ты ведущий");
      socket.emit("leader");
    } else {
      socket.emit("role", "Ты игрок");
    }

    socket.emit("joinedRoom", { roomCode: cleanRoom });
  });

  socket.on("startRound", ({ answer, image }) => {
    const room = rooms[socket.roomCode];
    if (!room) return;

    if (socket.id !== room.leaderId) return;

    room.currentAnswer = answer?.trim();
    room.currentImage = image;
    room.roundActive = true;

    io.to(socket.roomCode).emit("roundStarted");
    io.to(socket.roomCode).emit("log", "Раунд начался");
  });

  socket.on("question", (text) => {
    if (!text) return;
    io.to(socket.roomCode).emit("log", text);
  });

  socket.on("answer", (text) => {
    io.to(socket.roomCode).emit("log", "Ответ: " + text);
  });

  socket.on("guess", (guess) => {
    const room = rooms[socket.roomCode];
    if (!room || !room.roundActive) return;

    const g = guess?.trim().toLowerCase();
    const a = room.currentAnswer?.trim().toLowerCase();

    if (!g) return;

    if (g === a) {
      room.roundActive = false;

      io.to(socket.roomCode).emit("log", `Угадано: ${guess}`);
      io.to(socket.roomCode).emit("revealPhoto", {
        image: room.currentImage
      });
    } else {
      io.to(socket.roomCode).emit("log", `Неверно: ${guess}`);
    }
  });

  socket.on("disconnect", () => {
    const room = rooms[socket.roomCode];
    if (!room) return;

    room.players = room.players.filter(p => p.id !== socket.id);

    if (room.leaderId === socket.id) {
      room.leaderId = room.players[0]?.id || null;

      if (room.leaderId) {
        io.to(room.leaderId).emit("role", "Ты ведущий");
        io.to(room.leaderId).emit("leader");
      }
    }

    io.to(socket.roomCode).emit("players", room.players);

    if (room.players.length === 0) {
      delete rooms[socket.roomCode];
    }
  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Сервер запущен на " + PORT);
});