const express = require("express");
const http = require("http");
const https = require("https");
const { Server } = require("socket.io");
const packs = require("./packs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// ─── IMAGE PROXY ──────────────────────────────────────────────────────────────
const imageCache = new Map();

app.get("/img", (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith("https://upload.wikimedia.org/")) {
    return res.status(400).send("Bad url");
  }
  if (imageCache.has(url)) {
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(imageCache.get(url));
  }
  https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (upstream) => {
    if (upstream.statusCode !== 200) return res.status(502).send("Upstream error");
    const chunks = [];
    upstream.on("data", (chunk) => chunks.push(chunk));
    upstream.on("end", () => {
      const buf = Buffer.concat(chunks);
      imageCache.set(url, buf);
      res.setHeader("Content-Type", upstream.headers["content-type"] || "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(buf);
    });
  }).on("error", () => res.status(502).send("Fetch error"));
});
// ─────────────────────────────────────────────────────────────────────────────

const rooms = {};
const TURN_TIMER_SECONDS = 60;

function proxyImage(url) {
  if (!url) return null;
  // base64 custom images — pass through as-is
  if (url.startsWith("data:")) return url;
  return `/img?url=${encodeURIComponent(url)}`;
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  do {
    code = "";
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  } while (rooms[code]);
  return code;
}

function normalizeText(text) {
  return String(text || "").toLowerCase().trim().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ");
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

function getSocketRoomCode(socket) { return socket.data.roomCode || null; }
function getRoomBySocket(socket) {
  const roomCode = getSocketRoomCode(socket);
  if (!roomCode) return null;
  return rooms[roomCode] || null;
}
function getPlayers(room) { return room.players.filter(p => p.id !== room.hostId); }

function rotateHost(room) {
  if (room.players.length < 2) return;
  const currentHostIndex = room.players.findIndex(p => p.id === room.hostId);
  const nextHostIndex = (currentHostIndex + 1) % room.players.length;
  const newHost = room.players[nextHostIndex];
  room.hostId = newHost.id;
  room.currentTurnIndex = 0;
  io.to(room.code).emit("systemMessage", `👑 Теперь ведущий: ${newHost.name}`);
  io.to(newHost.id).emit("becameHost");
  for (const player of room.players) {
    if (player.id !== newHost.id) io.to(player.id).emit("lostHost");
  }
}

function emitRoomPlayers(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  const players = getPlayers(room);
  io.to(roomCode).emit("playersUpdated",
    room.players.map((player) => ({
      id: player.id,
      name: player.name,
      score: player.score,
      isHost: player.id === room.hostId,
      isTurn: room.gameStarted && players[room.currentTurnIndex]?.id === player.id
    }))
  );
}

function emitRoomMessage(roomCode, text) { io.to(roomCode).emit("systemMessage", text); }

function clearTurnTimer(room) {
  if (room._turnTimer) { clearInterval(room._turnTimer); room._turnTimer = null; }
}

function startTurnTimer(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  clearTurnTimer(room);
  let remaining = TURN_TIMER_SECONDS;
  io.to(roomCode).emit("timerUpdate", { remaining });
  room._turnTimer = setInterval(() => {
    remaining--;
    io.to(roomCode).emit("timerUpdate", { remaining });
    if (remaining <= 0) {
      clearTurnTimer(room);
      const players = getPlayers(room);
      const currentPlayer = players[room.currentTurnIndex];
      if (currentPlayer) emitRoomMessage(roomCode, `⏰ Время вышло! Ход ${currentPlayer.name} пропущен`);
      room.questionCount = (room.questionCount || 0) + 1;
      io.to(roomCode).emit("questionCountUpdate", { count: room.questionCount });
      nextTurn(roomCode);
    }
  }, 1000);
}

function beginRound(roomCode, character) {
  const room = rooms[roomCode];
  if (!room || !character) return;

  const players = getPlayers(room);
  if (!players.length) { emitRoomMessage(roomCode, "Нет игроков для игры"); return; }

  room.currentCharacter = character;
  room.gameStarted = true;
  room.questionCount = 0;
  room.currentTurnIndex = 0;

  const currentPlayer = players[0];

  io.to(roomCode).emit("roundStarted", {
    category: character.category || "custom",
    turnPlayerId: currentPlayer?.id || null,
    turnPlayerName: currentPlayer?.name || "—",
    questionCount: 0
  });

  if (room.hostId) {
    io.to(room.hostId).emit("hostRoundData", {
      image: proxyImage(character.image),
      name: character.name,
      category: character.category || "custom"
    });

    // Prefetch into cache (only for external URLs)
    if (character.image && !character.image.startsWith("data:")) {
      https.get(character.image, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => imageCache.set(character.image, Buffer.concat(chunks)));
      }).on("error", () => {});
    }
  }

  for (const player of players) io.to(player.id).emit("playerRoundData", { image: null });

  emitRoomPlayers(roomCode);
  startTurnTimer(roomCode);
}

function startRound(roomCode, category = "") {
  const character = getRandomCharacter(category);
  if (!character) { emitRoomMessage(roomCode, "Персонаж не найден"); return; }
  rooms[roomCode].selectedCategory = category || "";
  beginRound(roomCode, character);
}

function nextTurn(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  const players = getPlayers(room);
  if (!players.length) return;
  room.currentTurnIndex++;
  if (room.currentTurnIndex >= players.length) room.currentTurnIndex = 0;
  const currentPlayer = players[room.currentTurnIndex];
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
  if (!room.players.length) { clearTurnTimer(room); delete rooms[roomCode]; }
}

io.on("connection", (socket) => {

  socket.on("createRoom", ({ nickname, password }) => {
    const cleanName = String(nickname || "").trim().slice(0, 20);
    const cleanPassword = String(password || "").trim().slice(0, 30);
    if (!cleanName) { socket.emit("joinError", "Введите ник"); return; }
    const roomCode = generateRoomCode();
    rooms[roomCode] = {
      code: roomCode, password: cleanPassword, hostId: socket.id,
      players: [{ id: socket.id, name: cleanName, score: 0 }],
      currentCharacter: null, currentTurnIndex: 0,
      gameStarted: false, selectedCategory: "", questionCount: 0, _turnTimer: null
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

  // Standard round (from pack)
  socket.on("startRound", (category) => {
    const room = getRoomBySocket(socket);
    if (!room) return;
    if (socket.id !== room.hostId) { socket.emit("systemMessage", "Только ведущий может начать раунд"); return; }
    const players = getPlayers(room);
    if (!players.length) { socket.emit("systemMessage", "Нет игроков — подожди пока кто-то войдёт"); return; }
    if (room.gameStarted) { clearTurnTimer(room); room.gameStarted = false; }
    startRound(room.code, category || "");
  });

  // Custom round (host uploads own photo)
  socket.on("startRoundCustom", ({ answer, image }) => {
    const room = getRoomBySocket(socket);
    if (!room) return;
    if (socket.id !== room.hostId) { socket.emit("systemMessage", "Только ведущий может начать раунд"); return; }
    const players = getPlayers(room);
    if (!players.length) { socket.emit("systemMessage", "Нет игроков"); return; }
    const cleanAnswer = String(answer || "").trim().slice(0, 60);
    if (!cleanAnswer) { socket.emit("systemMessage", "Введите имя персонажа"); return; }
    if (!image) { socket.emit("systemMessage", "Выберите фото"); return; }
    beginRound(room.code, { name: cleanAnswer, category: "custom", image });
  });

  // Player sends a question (visible to all, host answers with buttons)
  socket.on("playerQuestion", (text) => {
    const room = getRoomBySocket(socket);
    if (!room || !room.gameStarted) return;
    if (socket.id === room.hostId) return;

    const players = getPlayers(room);
    const currentPlayer = players[room.currentTurnIndex];
    if (!currentPlayer || socket.id !== currentPlayer.id) {
      socket.emit("systemMessage", "Сейчас не твой ход — подожди");
      return;
    }

    const cleanText = String(text || "").trim().slice(0, 120);
    if (!cleanText) return;

    const sender = room.players.find(p => p.id === socket.id);
    io.to(room.code).emit("playerQuestionBroadcast", {
      playerName: sender?.name || "Игрок",
      question: cleanText
    });
  });

  // Player suggests a photo to the host
  socket.on("suggestPhoto", (imageData) => {
    const room = getRoomBySocket(socket);
    if (!room) return;
    if (socket.id === room.hostId) return;
    if (!imageData || !imageData.startsWith("data:image/")) return;
    const sender = room.players.find(p => p.id === socket.id);
    if (room.hostId) {
      io.to(room.hostId).emit("photoSuggested", {
        image: imageData,
        fromName: sender?.name || "Игрок"
      });
    }
  });

  socket.on("questionResult", (result) => {
    const room = getRoomBySocket(socket);
    if (!room || !room.gameStarted) return;
    if (socket.id !== room.hostId) { socket.emit("systemMessage", "Только ведущий отвечает на вопросы"); return; }

    room.questionCount = (room.questionCount || 0) + 1;
    io.to(room.code).emit("questionCountUpdate", { count: room.questionCount });

    if (result === "yes") {
      clearTurnTimer(room);
      io.to(room.code).emit("systemMessage", "✅ Да!");
      startTurnTimer(room.code);
    } else if (result === "no") {
      clearTurnTimer(room);
      io.to(room.code).emit("systemMessage", "❌ Нет!");
      nextTurn(room.code);
    } else if (result === "dontknow") {
      clearTurnTimer(room);
      io.to(room.code).emit("systemMessage", "🤷 Не знаю!");
      nextTurn(room.code);
    }
  });

  socket.on("submitAnswer", (answer) => {
    const room = getRoomBySocket(socket);
    if (!room || !room.gameStarted || !room.currentCharacter) return;
    if (socket.id === room.hostId) { socket.emit("systemMessage", "Ведущий не может угадывать"); return; }

    const players = getPlayers(room);
    const currentPlayer = players[room.currentTurnIndex];
    if (!currentPlayer || socket.id !== currentPlayer.id) { socket.emit("systemMessage", "Сейчас не твой ход"); return; }

    if (isCorrectAnswer(answer, room.currentCharacter.name)) {
      clearTurnTimer(room);
      currentPlayer.score += 1;
      io.to(room.code).emit("roundWinner", {
        winnerId: currentPlayer.id,
        winnerName: currentPlayer.name,
        correctName: room.currentCharacter.name,
        image: proxyImage(room.currentCharacter.image)
      });
      emitRoomPlayers(room.code);
      setTimeout(() => { rotateHost(room); emitRoomPlayers(room.code); }, 4000);
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
    const players = getPlayers(room);
    if (room.currentTurnIndex >= players.length) room.currentTurnIndex = 0;
    if (disconnected) emitRoomMessage(roomCode, `${disconnected.name} вышел из игры`);
    emitRoomPlayers(roomCode);
    cleanupRoomIfEmpty(roomCode);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
