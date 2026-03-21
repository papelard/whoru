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

function getRandomFromPack(category = null) {
  const pack = packs.celebrities;

  const filtered = category
    ? pack.filter((item) => item.category === category)
    : pack;

  return filtered[Math.floor(Math.random() * filtered.length)];
}

function normalize(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

function isCorrect(a, b) {
  return normalize(a) === normalize(b);
}

function updatePlayers() {
  io.emit("players", players.map((p, i) => ({
    ...p,
    isTurn: i === currentTurnIndex,
    isHost: p.id === hostId
  })));
}

function startRound(category) {
  currentCharacter = getRandomFromPack(category);

  io.emit("round", {
    image: currentCharacter.image,
    category: currentCharacter.category,
    turn: players[currentTurnIndex]?.id
  });

  if (hostId) {
    io.to(hostId).emit("answer", currentCharacter);
  }

  updatePlayers();
}

function nextTurn() {
  currentTurnIndex = (currentTurnIndex + 1) % players.length;

  io.emit("turn", players[currentTurnIndex].id);
  updatePlayers();
}

io.on("connection", (socket) => {
  socket.on("join", (name) => {
    if (!name) return;

    players.push({ id: socket.id, name, score: 0 });

    if (!hostId) hostId = socket.id;

    socket.emit("me", {
      id: socket.id,
      host: socket.id === hostId
    });

    updatePlayers();
  });

  socket.on("start", (category) => {
    if (socket.id !== hostId) return;
    startRound(category);
  });

  socket.on("yesno", (res) => {
    const current = players[currentTurnIndex];
    if (socket.id !== current.id) return;

    if (res === "no") nextTurn();
  });

  socket.on("answer", (ans) => {
    const current = players[currentTurnIndex];
    if (socket.id !== current.id) return;

    if (isCorrect(ans, currentCharacter.name)) {
      current.score++;

      io.emit("winner", {
        name: current.name,
        correct: currentCharacter.name
      });

      setTimeout(() => startRound(currentCharacter.category), 2000);
    } else {
      nextTurn();
    }

    updatePlayers();
  });

  socket.on("disconnect", () => {
    players = players.filter(p => p.id !== socket.id);

    if (socket.id === hostId) {
      hostId = players[0]?.id || null;
    }

    if (currentTurnIndex >= players.length) {
      currentTurnIndex = 0;
    }

    updatePlayers();
  });
});

server.listen(3000, () => console.log("Server started"));