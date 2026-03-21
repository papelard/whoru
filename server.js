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
let currentTurn = 0;

function getRandomCharacter(category = null) {
  let list = packs.celebrities;

  if (category) {
    list = list.filter(c => c.category === category);
  }

  return list[Math.floor(Math.random() * list.length)];
}

function normalize(text) {
  return text.toLowerCase().trim();
}

io.on("connection", (socket) => {
  socket.on("joinGame", (name) => {
    if (!name.trim()) return;

    players.push({
      id: socket.id,
      name,
      score: 0
    });

    if (!hostId) hostId = socket.id;

    socket.emit("joined", {
      isHost: socket.id === hostId
    });

    io.emit("players", players);
  });

  socket.on("startRound", (category) => {
    if (socket.id !== hostId) return;

    currentCharacter = getRandomCharacter(category);

    io.emit("round", {
      image: currentCharacter.image,
      category: currentCharacter.category,
      turn: players[currentTurn]?.id
    });

    io.to(hostId).emit("answer", currentCharacter.name);
  });

  socket.on("answer", (text) => {
    const player = players[currentTurn];
    if (!player || socket.id !== player.id) return;

    if (normalize(text) === normalize(currentCharacter.name)) {
      player.score++;

      io.emit("win", {
        name: player.name,
        answer: currentCharacter.name
      });

      setTimeout(() => {
        currentTurn = 0;
        currentCharacter = getRandomCharacter();
        io.emit("round", {
          image: currentCharacter.image,
          category: currentCharacter.category,
          turn: players[currentTurn]?.id
        });
      }, 2000);
    } else {
      currentTurn++;
      if (currentTurn >= players.length) currentTurn = 0;

      io.emit("turn", players[currentTurn].id);
    }
  });

  socket.on("disconnect", () => {
    players = players.filter(p => p.id !== socket.id);

    if (socket.id === hostId) {
      hostId = players[0]?.id || null;
    }

    io.emit("players", players);
  });
});

server.listen(process.env.PORT || 3000);