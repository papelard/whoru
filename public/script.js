const socket = io();

const joinForm = document.getElementById("joinForm");
const nameInput = document.getElementById("name");
const roomCodeInput = document.getElementById("roomCode");
const roomPasswordInput = document.getElementById("roomPassword");
const joinError = document.getElementById("joinError");

const joinScreen = document.getElementById("joinScreen");
const gameScreen = document.getElementById("game");

const roleText = document.getElementById("role");
const roomLabel = document.getElementById("roomLabel");
const playersList = document.getElementById("players");
const leaderPanel = document.getElementById("leaderPanel");

const photo = document.getElementById("photo");
const hiddenText = document.getElementById("hiddenText");
const logList = document.getElementById("log");

const correctAnswerInput = document.getElementById("correctAnswer");
const imageUpload = document.getElementById("imageUpload");
const questionInput = document.getElementById("question");
const guessInput = document.getElementById("guess");

const guessBlock = document.getElementById("guessBlock");

let myName = "";
let isLeader = false;

joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const roomCode = roomCodeInput.value.trim();
  const password = roomPasswordInput.value.trim();

  if (!name || !roomCode || !password) {
    joinError.textContent = "Введите имя, номер комнаты и пароль";
    return;
  }

  joinError.textContent = "";
  myName = name;

  socket.emit("joinRoom", { name, roomCode, password });
});

socket.on("joinError", function (message) {
  joinError.textContent = message;
});

socket.on("joinedRoom", function (data) {
  roomLabel.textContent = "Комната: " + data.roomCode;
  joinScreen.style.display = "none";
  gameScreen.style.display = "flex";
});

socket.on("role", function (text) {
  roleText.textContent = text;
});

socket.on("leader", function () {
  isLeader = true;
  leaderPanel.style.display = "flex";
  if (guessBlock) guessBlock.style.display = "none";
});

socket.on("players", function (players) {
  playersList.innerHTML = "";

  players.forEach(function (player) {
    const li = document.createElement("li");
    li.textContent = player.name;
    playersList.appendChild(li);
  });
});

socket.on("roundStarted", function () {
  logList.innerHTML = "";
  questionInput.value = "";
  guessInput.value = "";

  photo.src = "";
  photo.style.display = "none";
  hiddenText.style.display = "block";
});

socket.on("revealPhoto", function (data) {
  if (data.image) {
    photo.src = data.image;
    photo.style.display = "block";
    hiddenText.style.display = "none";
  }
});

socket.on("log", function (text) {
  const li = document.createElement("li");
  li.textContent = text;
  logList.appendChild(li);
  logList.scrollTop = logList.scrollHeight;
});

function startRound() {
  if (!isLeader) return;

  const answer = correctAnswerInput.value.trim();
  if (!answer) {
    alert("Введите правильный ответ");
    return;
  }

  const file = imageUpload.files[0];

  if (!file) {
    socket.emit("startRound", { answer, image: "" });
    correctAnswerInput.value = "";
    imageUpload.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    socket.emit("startRound", {
      answer,
      image: e.target.result
    });
    correctAnswerInput.value = "";
    imageUpload.value = "";
  };

  reader.readAsDataURL(file);
}

function sendQuestion() {
  const text = questionInput.value.trim();
  if (!text) return;

  socket.emit("question", `${myName}: ${text}`);
  questionInput.value = "";
}

function sendAnswer(answer) {
  if (!answer) return;
  socket.emit("answer", answer);
}

function sendGuess() {
  if (isLeader) return;

  const guess = guessInput.value.trim();
  if (!guess) return;

  socket.emit("guess", guess);
  guessInput.value = "";
}

window.startRound = startRound;
window.sendQuestion = sendQuestion;
window.sendAnswer = sendAnswer;
window.sendGuess = sendGuess;