const socket = io();

const joinForm = document.getElementById("joinForm");
const nameInput = document.getElementById("name");
const joinScreen = document.getElementById("joinScreen");
const gameScreen = document.getElementById("game");

const roleText = document.getElementById("role");
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

joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  if (!name) {
    alert("Введите имя");
    return;
  }

  myName = name;
  socket.emit("join", name);

  joinScreen.style.display = "none";
  gameScreen.style.display = "block";
});

socket.on("role", function (text) {
  roleText.textContent = text;
});

socket.on("leader", function () {
  isLeader = true;
  leaderPanel.style.display = "block";
});

socket.on("players", function (players) {
  playersList.innerHTML = "";

  players.forEach(function (player) {
    const li = document.createElement("li");
    li.textContent = player.name;
    playersList.appendChild(li);
  });
});

socket.on("roundStarted", function (data) {
  logList.innerHTML = "";
  questionInput.value = "";
  guessInput.value = "";

  if (data.image) {
    photo.src = data.image;
    photo.style.display = "block";
    hiddenText.style.display = "none";
  } else {
    photo.src = "";
    photo.style.display = "none";
    hiddenText.style.display = "block";
  }
});

socket.on("log", function (text) {
  const li = document.createElement("li");
  li.textContent = text;
  logList.appendChild(li);
});

function startRound() {
  if (!isLeader) return;

  const answer = correctAnswerInput.value.trim();
  if (!answer) {
    alert("Введите ответ");
    return;
  }

  const file = imageUpload.files[0];

  if (!file) {
    socket.emit("startRound", { answer: answer, image: "" });
    correctAnswerInput.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    socket.emit("startRound", {
      answer: answer,
      image: e.target.result
    });
    correctAnswerInput.value = "";
  };

  reader.readAsDataURL(file);
}

function sendQuestion() {
  const text = questionInput.value.trim();
  if (!text) return;

  socket.emit("question", myName + ": " + text);
  questionInput.value = "";
}

function sendAnswer(answer) {
  socket.emit("answer", answer);
}

function sendGuess() {
  const guess = guessInput.value.trim();
  if (!guess) return;

  socket.emit("guess", guess);
  guessInput.value = "";
}

window.startRound = startRound;
window.sendQuestion = sendQuestion;
window.sendAnswer = sendAnswer;
window.sendGuess = sendGuess;