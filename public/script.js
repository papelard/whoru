const socket = io()

let myId = null
let leaderId = null
let selectedImage = ""

socket.on("connect", () => {
    myId = socket.id
})

function join() {
    const name = document.getElementById("name").value
    socket.emit("join", name)
    document.getElementById("game").style.display = "block"
}

socket.on("players", (players) => {
    const list = document.getElementById("players")
    list.innerHTML = ""

    players.forEach(p => {
        const li = document.createElement("li")
        li.textContent = `${p.name} (${p.score})`
        list.appendChild(li)
    })
})

socket.on("leader", (id) => {
    leaderId = id
    const isLeader = myId === id

    document.getElementById("role").innerText =
        isLeader ? "Ты ведущий" : "Ты игрок"

    document.getElementById("leaderPanel").style.display =
        isLeader ? "block" : "none"
})

document.getElementById("imageUpload").addEventListener("change", e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => selectedImage = reader.result
    reader.readAsDataURL(file)
})

function startRound() {
    const answer = document.getElementById("correctAnswer").value

    socket.emit("setRound", {
        answer,
        image: selectedImage
    })
}

socket.on("hideImage", () => {
    document.getElementById("photo").style.display = "none"
    document.getElementById("hiddenText").style.display = "block"
})

socket.on("image", (img) => {
    const photo = document.getElementById("photo")
    photo.src = img
    photo.style.display = "block"
    document.getElementById("hiddenText").style.display = "none"
})

function sendQuestion() {
    const q = document.getElementById("question").value
    socket.emit("question", q)
}

function sendAnswer(a) {
    socket.emit("answer", a)
}

function sendGuess() {
    const g = document.getElementById("guess").value
    socket.emit("guess", g)
}

socket.on("question", q => log("❓ " + q))
socket.on("answer", a => log("👉 " + a))
socket.on("guess", g => log("💡 " + g))
socket.on("logMessage", m => log(m))

function log(t) {
    const li = document.createElement("li")
    li.textContent = t
    document.getElementById("log").appendChild(li)
}