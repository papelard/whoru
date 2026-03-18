const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

let players = []
let leader = null
let currentAnswer = ""
let currentImage = ""

io.on("connection", (socket) => {
    socket.on("join", (name) => {
        players.push({ id: socket.id, name, score: 0 })

        if (!leader) leader = socket.id

        io.emit("players", players)
        io.emit("leader", leader)
    })

    socket.on("setRound", ({ answer, image }) => {
        if (socket.id !== leader) return

        currentAnswer = answer.trim().toLowerCase()
        currentImage = image

        io.emit("logMessage", "🎯 Новый раунд начался")
        io.emit("hideImage")
    })

    socket.on("question", (q) => {
        io.emit("question", q)
    })

    socket.on("answer", (a) => {
        io.emit("answer", a)
    })

    socket.on("guess", (guess) => {
        io.emit("guess", guess)

        if (guess.trim().toLowerCase() === currentAnswer && currentAnswer !== "") {
            const player = players.find(p => p.id === socket.id)
            if (player) {
                player.score += 1
                leader = socket.id
            }

            io.emit("players", players)
            io.emit("leader", leader)
            io.emit("roundWon", socket.id)
            io.emit("image", currentImage)

            currentAnswer = ""
        }
    })

    socket.on("disconnect", () => {
        players = players.filter(p => p.id !== socket.id)

        if (leader === socket.id) {
            leader = players.length ? players[0].id : null
        }

        io.emit("players", players)
        io.emit("leader", leader)
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log("Сервер запущен")
})