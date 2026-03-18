const socket = io()

let myId = null
let leaderId = null
let selectedImageBase64 = ""

socket.on("connect", () => {
    myId = socket.id
})

function join() {
    const name = document.getElementById("name").value
    if (name.trim() === "") {
        alert("Введите имя")
        return
    }

    socket.emit("join", name)
    document.getElementById("game").style.display = "block"
}

socket.on("players", (players) => {
    const list = document.getElementById("players")
    list.innerHTML = ""

    players.forEach((p) => {
        const li = document.createElement("li")
        li.textContent = `${p.name} (${p.score})`
        list.appendChild(li)
    })
})

socket.on("leader", (id) => {
    leaderId = id
    const isLeader = myId === leaderId

    document.getElementById("role").innerText =
        isLeader ? "👑 Ты ведущий" : "🙂 Ты игрок"

    document.getElementById("leaderPanel").style.display =
        isLeader ? "block" : "none"
})

document.getElementById("imageUpload").addEventListener("change", function (event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = function (e) {
        selectedImageBase64 = e.target.result
    }
    reader.readAsDataURL(file)
})

function startRound() {
    const answer = document.getElementById("correctAnswer").value

    if (answer.trim() === "" || selectedImageBase64 === "") {
        alert("Нужно ввести ответ и выбрать фото")
        return
    }

    socket.emit("setRound", {
        answer,
        image: selectedImageBase64
    })

    document.getElementById("correctAnswer").value = ""
    document.getElementById("imageUpload").value = ""
    selectedImageBase64 = ""
}

socket.on("hideImage", () => {
    const photo = document.getElementById("photo")
    const hiddenText = document.getElementById("hiddenText")

    photo.src = ""
    photo.style.display = "none"
    hiddenText.style.display = "block"
})

socket.on("image", (image) => {
    const photo = document.getElementById("photo")
    const hiddenText = document.getElementById("hiddenText")

    if (image) {
        photo.src = image
        photo.style.display = "block"
        hiddenText.style.display = "none"
    } else {
        photo.src = ""
        photo.style.display = "none"
        hiddenText.style.display = "block"
    }
})

function sendQuestion() {
    const q = document.getElementById("question").value
    if (q.trim() === "") return

    socket.emit("question", q)
    document.getElementById("question").value = ""
}

function sendAnswer(a) {
    if (myId !== leaderId) return
    socket.emit("answer", a)
}

function sendGuess() {
    const g = document.getElementById("guess").value
    if (g.trim() === "") return

    socket.emit("guess", g)
    document.getElementById("guess").value = ""
}

socket.on("question", (q) => log("❓ " + q))
socket.on("answer", (a) => log("👉 " + a))
socket.on("guess", (g) => log("💡 " + g))
socket.on("logMessage", (msg) => log(msg))

socket.on("roundWon", (winnerId) => {
    if (winnerId === myId) {
        log("🎉 Ты угадал и стал ведущим")
    } else {
        log("🏆 Кто-то угадал и стал ведущим")
    }
})

function log(text) {
    const li = document.createElement("li")
    li.textContent = text
    document.getElementById("log").appendChild(li)
}