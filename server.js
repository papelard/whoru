const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// ❗ ВАЖНО — отдаём папку public
app.use(express.static("public"))

let players = []
let leader = null
let currentAnswer = ""
let currentImage = ""

io.on("connection", (socket) => {
    socket.on("join", (name) => {
        if (!name || !name.trim()) return

        players.push({
            id: socket.id,
            name: name.trim(),
            score: 0
        })

        if (!leader) leader = socket.id

        io.emit("players", players)
        io.emit("leader", leader)
    })

    socket.on("setRound", ({ answer, image }) => {
        if (socket.id !== leader) return
        if (!answer || !image) return

        currentAnswer = answer.trim().toLowerCase()
        currentImage = image

        io.emit("hideImage")
        io.emit("logMessage", "🎯 Новый раунд начался")
    })

    socket.on("question", (q) => {
        if (!q || !q.trim()) return
        io.emit("question", q.trim())
    })

    socket.on("answer", (a) => {
        if (socket.id !== leader) return
        io.emit("answer", a)
    })

    socket.on("guess", (guess) => {
        if (!guess || !guess.trim()) return

        const clean = guess.trim()
        io.emit("guess", clean)

        if (clean.toLowerCase() === currentAnswer && currentAnswer !== "") {
            const winner = players.find(p => p.id === socket.id)

            if (winner) {
                winner.score++
                leader = socket.id
            }

            io.emit("players", players)
            io.emit("leader", leader)
            io.emit("roundWon", socket.id)
            io.emit("image", currentImage)
            io.emit("logMessage", `🏆 ${winner ? winner.name : "Игрок"} угадал`)

            currentAnswer = ""
            currentImage = ""
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