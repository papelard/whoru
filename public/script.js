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

let myName = "";
let isLeader = false;

function hidePhoto() {
  photo.removeAttribute("src");
  photo.style.display = "none";
  hiddenText.style.display = "block";
}

function showPhoto(image) {
  if (!image) return;
  photo.src = image;
  photo.style.display = "block";
  hiddenText.style.display = "none";
}

function clearRoundUI() {
  logList.innerHTML = "";
  questionInput.value = "";
  guessInput.value = "";
  hidePhoto();
}

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
  clearRoundUI();
});

socket.on("role", function (text) {
  roleText.textContent = text;
});

socket.on("leader", function () {
  isLeader = true;
  leaderPanel.style.display = "flex";
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
  clearRoundUI();
  addLog("Раунд начался");
});

socket.on("revealPhoto", function (data) {
  showPhoto(data.image);
});

socket.on("log", function (text) {
  addLog(text);
});

function addLog(text) {
  const li = document.createElement("li");
  li.textContent = text;
  logList.appendChild(li);
  logList.scrollTop = logList.scrollHeight;
}

function startRound() {
  if (!isLeader) return;

  const answer = correctAnswerInput.value.trim();
  if (!answer) {
    alert("Введите правильный ответ");
    return;
  }

  const file = imageUpload.files && imageUpload.files[0];
  if (!file) {
    alert("Сначала выбери фото");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageBase64 = event.target.result;

    socket.emit("startRound", {
      answer: answer,
      image: imageBase64
    });

    correctAnswerInput.value = "";
    imageUpload.value = "";
    clearRoundUI();
  };

  reader.onerror = function () {
    alert("Не удалось прочитать файл");
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