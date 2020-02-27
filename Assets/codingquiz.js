// join to the "quiz-block" div
var quizBlockEl = document.querySelector("#quiz-block");
var timerMinutes = document.querySelector("#minutes");
var timerSeconds = document.querySelector("#seconds");
var startQuizBtn = document.querySelector("#timer-button");
var questionBox = document.querySelector("#question");
var answerBox = document.querySelector("#answers");
var question = "Question 1";
var answer = [1, "Answer1", "Answer2", "Answer3", "Answer4"];
var totalSeconds = 00;
var secondsElapsed = 0;
var interval;

// create questions area in quiz-block
function quizQuestions() {
  var quizQuestion = document.createElement("h3");
  quizQuestion.setAttribute(
    "style",
    "margin:auto; width:100%; text-align:center; padding-top:10px; margin-bottom:10px;"
  );
  questionBox.appendChild(quizQuestion);
  quizQuestion.textContent = question;
}

// create answers area in quiz-block

// function quizAnswers() {
function quizAnswers() {
  for (var i = 1; i < answer.length; i++) {
    var quizAnswer = answer[i];
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "btn btn-warning btn-block");
    answerBox.appendChild(answerButton);
    answerButton.textContent = quizAnswer;
  }
}

// Parse Questions and Answers to quiz-block
function startQuestions() {
  quizQuestions();
  quizAnswers();
}
function nextQuestion() {
  quizBlockEl.innerHTML = "";
  quizQuestions();
  quizAnswers();
}

// create function to determine if answer selected is correct or not

// create link to timer and timer function

//  timer
function setTime() {
  var minutes = 10;
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

function startTimer() {
  setTime();
  startQuestions();
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
  }, 1000);
}

function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function getFormattedMinutes() {
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}
function renderTime() {
  timerMinutes.textContent = getFormattedMinutes();
  timerSeconds.textContent = getFormattedSeconds();
}
startQuizBtn.addEventListener("click", startTimer);

// link to High Scores Listing
