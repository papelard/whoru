const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const packs = require("./packs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const rooms = {};
const TURN_TIMER_SECONDS = 30;

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do {
    code = "";
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (rooms[code]);
  return code;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

function isCorrectAnswer(input, answer) {
  const a = normalizeText(input);
  const b = normalizeText(answer);
  if (a === b) return true;
  const bWords = b.split(" ");
  for (const word of bWords) {
    if (word.length > 3 && a === word) return true;
  }
  return false;
}

function getRandomCharacter(category = "") {
  let list = packs.celebrities || [];
  if (category) list = list.filter((item) => item.category === category);
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

function getSocketRoomCode(socket) {
  return socket.data.roomCode || null;
}

function getRoomBySocket(socket) {
  const roomCode = getSocketRoomCode(socket);
  if (!roomCode) return null;
  return rooms[roomCode] || null;
}

function emitRoomPlayers(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  io.to(roomCode).emit(
    "playersUpdated",
    room.players.map((player, index) => ({
      id: player.id,
      name: player.name,
      score: player.score,
      isHost: player.id === room.hostId,
      isTurn: room.gameStarted && index === room.currentTurnIndex
    }))
  );
}

function emitRoomMessage(roomCode, text) {
  io.to(roomCode).emit("systemMessage", text);
}

function clearTurnTimer(room) {
  if (room._turnTimer) {
    clearInterval(room._turnTimer);
    room._turnTimer = null;
  }
}

function startTurnTimer(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  clearTurnTimer(room);
  let remaining = TURN_TIMER_SECONDS;
  room._turnTimerRemaining = remaining;
  io.to(roomCode).emit("timerUpdate", { remaining });
  room._turnTimer = setInterval(() => {
    remaining--;
    room._turnTimerRemaining = remaining;
    io.to(roomCode).emit("timerUpdate", { remaining });
    if (remaining <= 0) {
      clearTurnTimer(room);
      const currentPlayer = room.players[room.currentTurnIndex];
      if (currentPlayer) {
        emitRoomMessage(roomCode, `⏰ Время вышло! Ход ${currentPlayer.name} пропущен`);
      }
      room.questionCount = (room.questionCount || 0) + 1;
      io.to(roomCode).emit("questionCountUpdate", { count: room.questionCount });
      nextTurn(roomCode);
    }
  }, 1000);
}

function startRound(roomCode, category = "") {
  const room = rooms[roomCode];
  if (!room || !room.players.length) return;
  const character = getRandomCharacter(category);
  if (!character) {
    emitRoomMessage(roomCode, "Персонаж не найден для этой категории");
    return;
  }
  room.currentCharacter = character;
  room.gameStarted = true;
  room.selectedCategory = category || "";
  room.questionCount = 0;
  if (room.currentTurnIndex >= room.players.length) room.currentTurnIndex = 0;
  const currentPlayer = room.players[room.currentTurnIndex];
  io.to(roomCode).emit("roundStarted", {
    category: room.currentCharacter.category,
    turnPlayerId: currentPlayer?.id || null,
    turnPlayerName: currentPlayer?.name || "—",
    questionCount: 0
  });
  if (room.hostId) {
    io.to(room.hostId).emit("hostRoundData", {
      image: room.currentCharacter.image,
      name: room.currentCharacter.name,
      category: room.currentCharacter.category
    });
  }
  for (const player of room.players) {
    if (player.id !== room.hostId) {
      io.to(player.id).emit("playerRoundData", { image: null });
    }
  }
  emitRoomPlayers(roomCode);
  startTurnTimer(roomCode);
}

function nextTurn(roomCode) {
  const room = rooms[roomCode];
  if (!room || !room.players.length) return;
  room.currentTurnIndex++;
  if (room.currentTurnIndex >= room.players.length) room.currentTurnIndex = 0;
  const currentPlayer = room.players[room.currentTurnIndex];
  io.to(roomCode).emit("turnChanged", {
    turnPlayerId: currentPlayer?.id || null,
    turnPlayerName: currentPlayer?.name || "—"
  });
  emitRoomPlayers(roomCode);
  startTurnTimer(roomCode);
}

function cleanupRoomIfEmpty(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  if (!room.players.length) {
    clearTurnTimer(room);
    delete rooms[roomCode];
  }
}

io.on("connection", (socket) => {
  socket.on("createRoom", ({ nickname, password }) => {
    const cleanName = String(nickname || "").trim().slice(0, 20);
    const cleanPassword = String(password || "").trim().slice(0, 30);
    if (!cleanName) { socket.emit("joinError", "Введите ник"); return; }
    const roomCode = generateRoomCode();
    rooms[roomCode] = {
      code: roomCode,
      password: cleanPassword,
      hostId: socket.id,
      players: [{ id: socket.id, name: cleanName, score: 0 }],
      currentCharacter: null,
      currentTurnIndex: 0,
      gameStarted: false,
      selectedCategory: "",
      questionCount: 0,
      _turnTimer: null,
      _turnTimerRemaining: 0
    };
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    socket.emit("joined", { roomCode, isHost: true, playerName: cleanName });
    emitRoomPlayers(roomCode);
    emitRoomMessage(roomCode, `${cleanName} создал комнату`);
  });

  socket.on("joinRoom", ({ nickname, roomCode, password }) => {
    const cleanName = String(nickname || "").trim().slice(0, 20);
    const cleanRoomCode = String(roomCode || "").trim().toUpperCase();
    const cleanPassword = String(password || "").trim();
    if (!cleanName) { socket.emit("joinError", "Введите ник"); return; }
    if (!cleanRoomCode) { socket.emit("joinError", "Введите код комнаты"); return; }
    const room = rooms[cleanRoomCode];
    if (!room) { socket.emit("joinError", "Комната не найдена"); return; }
    if ((room.password || "") !== cleanPassword) { socket.emit("joinError", "Неверный пароль"); return; }
    const sameName = room.players.find((p) => p.name.toLowerCase() === cleanName.toLowerCase());
    if (sameName) { socket.emit("joinError", "Ник уже занят в комнате"); return; }
    room.players.push({ id: socket.id, name: cleanName, score: 0 });
    socket.join(cleanRoomCode);
    socket.data.roomCode = cleanRoomCode;
    socket.emit("joined", { roomCode: cleanRoomCode, isHost: false, playerName: cleanName });
    emitRoomPlayers(cleanRoomCode);
    emitRoomMessage(cleanRoomCode, `${cleanName} вошёл в игру`);
  });

  socket.on("startRound", (category) => {
    const room = getRoomBySocket(socket);
    if (!room) return;
    if (socket.id !== room.hostId) { socket.emit("systemMessage", "Только ведущий может начать раунд"); return; }
    if (!room.players.length) { socket.emit("systemMessage", "Нет игроков"); return; }
    startRound(room.code, category || "");
  });

  socket.on("questionResult", (result) => {
    const room = getRoomBySocket(socket);
    if (!room || !room.gameStarted || !room.players.length) return;
    const currentPlayer = room.players[room.currentTurnIndex];
    if (!currentPlayer) return;
    if (socket.id !== currentPlayer.id) { socket.emit("systemMessage", "Сейчас не твой ход"); return; }
    room.questionCount = (room.questionCount || 0) + 1;
    io.to(room.code).emit("questionCountUpdate", { count: room.questionCount });
    if (result === "yes") {
      clearTurnTimer(room);
      socket.emit("systemMessage", "Ответ: да");
      startTurnTimer(room.code);
      return;
    }
    if (result === "no") { clearTurnTimer(room); nextTurn(room.code); }
    if (result === "dontknow") {
      clearTurnTimer(room);
      emitRoomMessage(room.code, `${currentPlayer.name} не знает — ход переходит`);
      nextTurn(room.code);
    }
  });

  socket.on("submitAnswer", (answer) => {
    const room = getRoomBySocket(socket);
    if (!room || !room.gameStarted || !room.currentCharacter || !room.players.length) return;
    const currentPlayer = room.players[room.currentTurnIndex];
    if (!currentPlayer) return;
    if (socket.id !== currentPlayer.id) { socket.emit("systemMessage", "Сейчас не твой ход"); return; }
    if (isCorrectAnswer(answer, room.currentCharacter.name)) {
      clearTurnTimer(room);
      currentPlayer.score += 1;
      io.to(room.code).emit("roundWinner", {
        winnerId: currentPlayer.id,
        winnerName: currentPlayer.name,
        correctName: room.currentCharacter.name,
        image: room.currentCharacter.image
      });
      emitRoomPlayers(room.code);
      setTimeout(() => { startRound(room.code, room.selectedCategory || ""); }, 4000);
    } else {
      socket.emit("answerWrong");
      room.questionCount = (room.questionCount || 0) + 1;
      io.to(room.code).emit("questionCountUpdate", { count: room.questionCount });
      nextTurn(room.code);
    }
  });

  socket.on("disconnect", () => {
    const roomCode = getSocketRoomCode(socket);
    if (!roomCode) return;
    const room = rooms[roomCode];
    if (!room) return;
    const disconnected = room.players.find((p) => p.id === socket.id);
    room.players = room.players.filter((p) => p.id !== socket.id);
    if (socket.id === room.hostId) {
      room.hostId = room.players.length ? room.players[0].id : null;
      if (room.hostId) io.to(room.hostId).emit("becameHost");
    }
    if (!room.players.length) { clearTurnTimer(room); delete rooms[roomCode]; return; }
    if (room.currentTurnIndex >= room.players.length) room.currentTurnIndex = 0;
    if (disconnected) emitRoomMessage(roomCode, `${disconnected.name} вышел из игры`);
    emitRoomPlayers(roomCode);
    cleanupRoomIfEmpty(roomCode);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
