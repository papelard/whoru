const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const MAX_ROOMS = 10;

const rooms = {};
for (let i = 1; i <= MAX_ROOMS; i++) {
  rooms[String(i)] = {
    password: "",
    players: [],
    leaderId: null,
    currentAnswer: "",
    currentImage: "",
    roundActive: false,
    scores: {}
  };
}

function emitPlayersAndScores(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  io.to(roomCode).emit("players", room.players);

  const scoreboard = room.players.map((player) => {
    const stats = room.scores[player.id] || {
      name: player.name,
      wins: 0,
      leaderTurns: 0
    };

    return {
      id: player.id,
      name: player.name,
      wins: stats.wins || 0,
      leaderTurns: stats.leaderTurns || 0
    };
  });

  io.to(roomCode).emit("scoreboard", scoreboard);
}

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ name, roomCode, password }) => {
    const cleanName = (name || "").trim();
    const cleanRoom = String(roomCode || "").trim();
    const cleanPassword = (password || "").trim();

    if (!cleanName || !cleanRoom || !cleanPassword) {
      socket.emit("joinError", "Введите имя, комнату и пароль");
      return;
    }

    if (!rooms[cleanRoom]) {
      socket.emit("joinError", "Такой комнаты нет. Доступны комнаты 1–10");
      return;
    }

    const room = rooms[cleanRoom];

    if (!room.password) {
      room.password = cleanPassword;
    } else if (room.password !== cleanPassword) {
      socket.emit("joinError", "Неверный пароль комнаты");
      return;
    }

    const alreadyInRoom = room.players.some((player) => player.id === socket.id);
    if (alreadyInRoom) return;

    socket.join(cleanRoom);
    socket.roomCode = cleanRoom;

    const player = {
      id: socket.id,
      name: cleanName
    };

    room.players.push(player);

    if (!room.scores[socket.id]) {
      room.scores[socket.id] = {
        name: cleanName,
        wins: 0,
        leaderTurns: 0
      };
    }

    if (!room.leaderId) {
      room.leaderId = socket.id;
      room.scores[socket.id].leaderTurns += 1;
    }

    emitPlayersAndScores(cleanRoom);

    if (socket.id === room.leaderId) {
      socket.emit("role", "Ты ведущий");
      socket.emit("leader");
    } else {
      socket.emit("role", "Ты игрок");
    }

    socket.emit("joinedRoom", { roomCode: cleanRoom });
  });

  socket.on("startRound", ({ answer, image }) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];
    if (socket.id !== room.leaderId) return;

    const cleanAnswer = (answer || "").trim();
    if (!cleanAnswer) return;

    room.currentAnswer = cleanAnswer;
    room.currentImage = image || "";
    room.roundActive = true;

    io.to(roomCode).emit("roundStarted");
    io.to(roomCode).emit("log", "Раунд начался");
  });

  socket.on("question", (text) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const cleanText = (text || "").trim();
    if (!cleanText) return;

    io.to(roomCode).emit("log", cleanText);
  });

  socket.on("answer", (text) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const cleanText = (text || "").trim();
    if (!cleanText) return;

    io.to(roomCode).emit("log", `Ответ: ${cleanText}`);
  });

  socket.on("guess", (guess) => {
    const roomCode = socket.roomCode;
    if (!roomCode || !rooms[roomCode]) return;

    const room = rooms[roomCode];
    if (!room.roundActive) return;

    const cleanGuess = (guess || "").trim();
    const cleanAnswer = (room.currentAnswer || "").trim();

    if (!cleanGuess) return;

    if (cleanGuess.toLowerCase() === cleanAnswer.toLowerCase()) {
      room.roundActive = false;

      const oldLeaderId = room.leaderId;
      const newLeaderId = socket.id;

      if (!room.scores[newLeaderId]) {
        const winner = room.players.find((p) => p.id === newLeaderId);
        room.scores[newLeaderId] = {
          name: winner ? winner.name : "Игрок",
          wins: 0,
          leaderTurns: 0
        };
      }

      room.scores[newLeaderId].wins += 1;

      if (oldLeaderId !== newLeaderId) {
        room.leaderId = newLeaderId;
        room.scores[newLeaderId].leaderTurns += 1;
      }

      io.to(roomCode).emit("log", `Угадано: ${cleanGuess}`);
      io.to(roomCode).emit("revealPhoto", {
        image: room.currentImage,
        answer: room.currentAnswer
      });

      if (oldLeaderId && oldLeaderId !== newLeaderId) {
        io.to(oldLeaderId).emit("role", "Ты игрок");
      }

      io.to(newLeaderId).emit("role", "Ты ведущий");
      io.to(newLeaderId).emit("leader");

      emitPlayersAndScores(roomCode);

      setTimeout(() => {
        room.currentAnswer = "";
        room.currentImage = "";

        io.to(roomCode).emit("prepareNextRound");
        io.to(roomCode).emit("log", "Новый ведущий готовит следующий раунд");
      }, 2500);
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
        if (!room.scores[room.leaderId]) {
          const nextLeader = room.players.find((p) => p.id === room.leaderId);
          room.scores[room.leaderId] = {
            name: nextLeader ? nextLeader.name : "Игрок",
            wins: 0,
            leaderTurns: 0
          };
        }

        room.scores[room.leaderId].leaderTurns += 1;

        io.to(room.leaderId).emit("role", "Ты ведущий");
        io.to(room.leaderId).emit("leader");
      }
    }

    emitPlayersAndScores(roomCode);

    if (room.players.length === 0) {
      room.password = "";
      room.leaderId = null;
      room.currentAnswer = "";
      room.currentImage = "";
      room.roundActive = false;
      room.scores = {};
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});