const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinGame", (nickname) => {
    const cleanName = String(nickname || "").trim();

    if (!cleanName) {
      socket.emit("joinError", "Введите ник");
      return;
    }

    const exists = players.find((p) => p.id === socket.id);
    if (exists) return;

    const player = {
      id: socket.id,
      name: cleanName
    };

    players.push(player);

    socket.emit("joined", {
      id: socket.id,
      name: cleanName
    });

    io.emit("playersUpdated", players);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    players = players.filter((p) => p.id !== socket.id);
    io.emit("playersUpdated", players);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});