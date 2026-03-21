const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const packs = require("./packs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = [];
let hostId = null;
let currentCharacter = null;
let currentTurnIndex = 0;
let gameStarted = false;

function getRandomCharacter(category = "") {
  let list = packs.celebrities || [];

  if (category) {
    list = list.filter((item) => item.category === category);
  }

  if (!list.length) return null;

  return list[Math.floor(Math.random() * list.length)];
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

function isCorrectAnswer(input, answer) {
  return normalizeText(input) === normalizeText(answer);
}

function emitPlayers() {
  io.emit(
    "playersUpdated",
    players.map((player, index) => ({
      id: player.id,
      name: player.name,
      score: player.score,
      isHost: player.id === hostId,
      isTurn: gameStarted && index === currentTurnIndex
    }))
  );
}

function startRound(category = "") {
  if (!players.length) return;

  const character = getRandomCharacter(category);
  if (!character) {
    io.emit("systemMessage", "Персонаж не найден");
    return;
  }

  currentCharacter = character;
  gameStarted = true;

  if (currentTurnIndex >= players.length) {
    currentTurnIndex = 0;
  }

  io.emit("roundStarted", {
    image: currentCharacter.image,
    category: currentCharacter.category,
    turnPlayerId: players[currentTurnIndex]?.id || null,
    turnPlayerName: players[currentTurnIndex]?.name || "—"
  });

  if (hostId) {
    io.to(hostId).emit("hostAnswer", {
      name: currentCharacter.name,
      category: currentCharacter.category
    });
  }

  emitPlayers();
}

function nextTurn() {
  if (!players.length) return;

  currentTurnIndex++;
  if (currentTurnIndex >= players.length) {
    currentTurnIndex = 0;
  }

  io.emit("turnChanged", {
    turnPlayerId: players[currentTurnIndex]?.id || null,
    turnPlayerName: players[currentTurnIndex]?.name || "—"
  });

  emitPlayers();
}

io.on("connection", (socket) => {
  socket.on("joinGame", (nickname) => {
    const cleanName = String(nickname || "").trim().slice(0, 20);

    if (!cleanName) {
      socket.emit("joinError", "Введите ник");
      return;
    }

    const exists = players.find((p) => p.id === socket.id);
    if (exists) return;

    players.push({
      id: socket.id,
      name: cleanName,
      score: 0
    });

    if (!hostId) {
      hostId = socket.id;
    }

    socket.emit("joined", {
      id: socket.id,
      isHost: socket.id === hostId
    });

    io.emit("systemMessage", `${cleanName} вошёл в игру`);
    emitPlayers();
  });

  socket.on("startRound", (category) => {
    if (socket.id !== hostId) {
      socket.emit("systemMessage", "Только ведущий может начать раунд");
      return;
    }

    if (!players.length) {
      socket.emit("systemMessage", "Нет игроков");
      return;
    }

    startRound(category || "");
  });

  socket.on("questionResult", (result) => {
    if (!gameStarted || !players.length) return;

    const currentPlayer = players[currentTurnIndex];
    if (!currentPlayer) return;

    if (socket.id !== currentPlayer.id) {
      socket.emit("systemMessage", "Сейчас не твой ход");
      return;
    }

    if (result === "yes") {
      socket.emit("systemMessage", "Ответ: да");
      return;
    }

    if (result === "no") {
      nextTurn();
    }
  });

  socket.on("submitAnswer", (answer) => {
    if (!gameStarted || !currentCharacter || !players.length) return;

    const currentPlayer = players[currentTurnIndex];
    if (!currentPlayer) return;

    if (socket.id !== currentPlayer.id) {
      socket.emit("systemMessage", "Сейчас не твой ход");
      return;
    }

    if (isCorrectAnswer(answer, currentCharacter.name)) {
      currentPlayer.score += 1;

      io.emit("roundWinner", {
        winnerId: currentPlayer.id,
        winnerName: currentPlayer.name,
        correctName: currentCharacter.name
      });

      emitPlayers();

      setTimeout(() => {
        startRound(currentCharacter.category || "");
      }, 2000);
    } else {
      socket.emit("answerWrong");
      nextTurn();
    }
  });

  socket.on("disconnect", () => {
    const disconnected = players.find((p) => p.id === socket.id);
    players = players.filter((p) => p.id !== socket.id);

    if (socket.id === hostId) {
      hostId = players.length ? players[0].id : null;
      if (hostId) {
        io.to(hostId).emit("becameHost");
      }
    }

    if (!players.length) {
      currentCharacter = null;
      currentTurnIndex = 0;
      gameStarted = false;
    } else if (currentTurnIndex >= players.length) {
      currentTurnIndex = 0;
    }

    if (disconnected) {
      io.emit("systemMessage", `${disconnected.name} вышел из игры`);
    }

    emitPlayers();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});