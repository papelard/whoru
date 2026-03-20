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
const scoreboardList = document.getElementById("scoreboard");
const leaderPanel = document.getElementById("leaderPanel");
const guessBlock = document.getElementById("guessBlock");

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
  if (!photo || !hiddenText) return;
  photo.removeAttribute("src");
  photo.style.display = "none";
  hiddenText.style.display = "block";
}

function showPhoto(image) {
  if (!photo || !hiddenText || !image) return;
  photo.src = image;
  photo.style.display = "block";
  hiddenText.style.display = "none";
}

function clearRoundUI() {
  if (logList) logList.innerHTML = "";
  if (questionInput) questionInput.value = "";
  if (guessInput) guessInput.value = "";
  hidePhoto();
}

function addLog(text) {
  if (!logList) return;
  const li = document.createElement("li");
  li.textContent = text;
  logList.appendChild(li);
  logList.scrollTop = logList.scrollHeight;
}

function updateRoleUI() {
  if (leaderPanel) {
    leaderPanel.style.display = isLeader ? "flex" : "none";
  }
  if (guessBlock) {
    guessBlock.style.display = isLeader ? "none" : "flex";
  }
}

if (joinForm) {
  joinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput?.value.trim() || "";
    const roomCode = roomCodeInput?.value.trim() || "";
    const password = roomPasswordInput?.value.trim() || "";

    if (!name || !roomCode || !password) {
      if (joinError) joinError.textContent = "Введите имя, номер комнаты и пароль";
      return;
    }

    if (joinError) joinError.textContent = "";
    myName = name;

    socket.emit("joinRoom", { name, roomCode, password });
  });
}

socket.on("joinError", function (message) {
  if (joinError) joinError.textContent = message;
});

socket.on("joinedRoom", function (data) {
  if (roomLabel) roomLabel.textContent = "Комната: " + data.roomCode;
  if (joinScreen) joinScreen.style.display = "none";
  if (gameScreen) gameScreen.style.display = "flex";
  clearRoundUI();
});

socket.on("role", function (text) {
  if (roleText) roleText.textContent = text;
  isLeader = text === "Ты ведущий";
  updateRoleUI();
});

socket.on("leader", function () {
  isLeader = true;
  if (roleText) roleText.textContent = "Ты ведущий";
  updateRoleUI();
});

socket.on("players", function (players) {
  if (!playersList) return;
  playersList.innerHTML = "";

  players.forEach(function (player) {
    const li = document.createElement("li");
    li.textContent = player.name;
    playersList.appendChild(li);
  });
});

socket.on("scoreboard", function (scoreboard) {
  if (!scoreboardList) return;
  scoreboardList.innerHTML = "";

  scoreboard.forEach(function (player) {
    const li = document.createElement("li");
    li.textContent = `${player.name} — Победы: ${player.wins}, Ведущий: ${player.leaderTurns}`;
    scoreboardList.appendChild(li);
  });
});

socket.on("roundStarted", function () {
  clearRoundUI();
  addLog("Раунд начался");
});

socket.on("revealPhoto", function (data) {
  showPhoto(data.image);
});

socket.on("prepareNextRound", function () {
  clearRoundUI();

  if (correctAnswerInput) correctAnswerInput.value = "";
  if (imageUpload) imageUpload.value = "";
});

socket.on("log", function (text) {
  addLog(text);
});

function startRound() {
  if (!isLeader) return;

  const answer = correctAnswerInput?.value.trim() || "";
  if (!answer) {
    alert("Введите правильный ответ");
    return;
  }

  const file = imageUpload?.files?.[0];
  if (!file) {
    alert("Сначала выбери фото");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    socket.emit("startRound", {
      answer: answer,
      image: event.target.result
    });

    if (correctAnswerInput) correctAnswerInput.value = "";
    if (imageUpload) imageUpload.value = "";
    clearRoundUI();
  };

  reader.onerror = function () {
    alert("Не удалось прочитать файл");
  };

  reader.readAsDataURL(file);
}

function sendQuestion() {
  const text = questionInput?.value.trim() || "";
  if (!text) return;

  socket.emit("question", `${myName}: ${text}`);
  if (questionInput) questionInput.value = "";
}

function sendAnswer(answer) {
  if (!answer) return;
  socket.emit("answer", answer);
}

function sendGuess() {
  if (isLeader) return;

  const guess = guessInput?.value.trim() || "";
  if (!guess) return;

  socket.emit("guess", guess);
  if (guessInput) guessInput.value = "";
}

window.startRound = startRound;
window.sendQuestion = sendQuestion;
window.sendAnswer = sendAnswer;
window.sendGuess = sendGuess;