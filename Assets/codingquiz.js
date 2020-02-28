// join to all the document elements
var quizBlockEl = document.querySelector("#quiz-block");
var timerMinutes = document.querySelector("#minutes");
var timerSeconds = document.querySelector("#seconds");
var startQuizBtn = document.querySelector("#timer-button");
var questionBox = document.querySelector("#question");
var answerBox = document.querySelector("#answers");
var highScoreRender = document.querySelector("#high-scores");
var Q_N_A = [
  {
    question: "Question 1",
    answers: ["Answer1", "Answer2", "Answer3", "Answer4"],
    correct: 0
  },
  {
    question: "Question 2",
    answers: ["Answer2-1", "Answer2-2", "Answer2-3", "Answer2-4"],
    correct: 0
  }
];
var questionIndex = 0;
var totalSeconds = 00;
var secondsElapsed = 0;
var interval;
var initials = "";
var highScore;
var highScores;

// create questions area in quiz-block

// create answers area in quiz-block

// function quizAnswers() {
function quizQuestions() {
  var quizQuestion = document.createElement("h3");
  quizQuestion.setAttribute(
    "style",
    "margin:auto; width:100%; text-align:center; padding-top:10px; margin-bottom:10px;"
  );
  questionBox.appendChild(quizQuestion);
  quizQuestion.textContent = Q_N_A[questionIndex].question;
  Q_N_A[questionIndex].answers.forEach(function(answer, index) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("class", "btn btn-warning btn-block");
    answerBox.appendChild(answerButton);
    answerButton.textContent = answer;
    answerButton.setAttribute("value", index);
    answerButton.addEventListener("click", assessor);
  });
}

// Parse Questions and Answers to quiz-block
function startQuestions() {
  quizQuestions();
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex < Q_N_A.length) {
    quizQuestions();
  } else {
    stopTimer();
    aHighScore();
  }
}
function clearQnA() {
  while (questionBox.hasChildNodes()) {
    questionBox.removeChild(questionBox.firstChild);
  }
  while (answerBox.hasChildNodes()) {
    answerBox.removeChild(answerBox.firstChild);
  }
}
// create function to determine if answer selected is correct or not
function assessor() {
  // if button clicked id is equal to answer[0] value, answer is correct

  var answerTarget = event.target;
  if (answerTarget.value == Q_N_A[questionIndex].correct) {
    congratulate();
    // if button clicked id isn't equal to answer[0] value, answer is incorrect
  } else {
    secondsElapsed = secondsElapsed + 15;
    renderTime();
    incorrect();
  }
}

// Congratulate on a correct answer
function congratulate() {
  clearQnA();
  var correctEl = document.createElement("h3");
  correctEl.setAttribute(
    "style",
    "margin:auto; width:100%; text-align:center; padding-top:10px; margin-bottom:10px;"
  );
  questionBox.appendChild(correctEl);
  correctEl.textContent = "Correct!";
  setTimeout(function() {
    clearQnA();
    nextQuestion();
  }, 2000);
}
function incorrect() {
  clearQnA();
  var correctEl = document.createElement("h3");
  correctEl.setAttribute(
    "style",
    "margin:auto; width:100%; text-align:center; padding-top:10px; margin-bottom:10px;"
  );
  questionBox.appendChild(correctEl);
  correctEl.textContent = "Incorrect!";
  setTimeout(function() {
    clearQnA();
    nextQuestion();
  }, 2000);
}

// create link to timer and timer function

//  timer
function setTime() {
  var minutes = 1;
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

function startTimer() {
  clearQnA();
  questionIndex = 0;
  setTime();
  startQuestions();
  interval = setInterval(function() {
    secondsElapsed++;
    renderTime();
    if (secondsElapsed === totalSeconds) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
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

function aHighScore() {
  clearQnA();
  var highScoreTime = secondsElapsed;
  var highScoreEl = document.createElement("h3");
  highScoreEl.setAttribute(
    "style",
    "margin:auto; width:100%; text-align:center; padding-top:10px; margin-bottom:10px;"
  );
  questionBox.appendChild(highScoreEl);
  highScoreEl.textContent = "Congratulations you got a High Score!";
  setTimeout(function() {
    clearQnA();
    initials = prompt(
      "Please supply your Initials so that we can put you up on the score board"
    );
    highScores = initials + " in " + highScoreTime + " seconds";
    storeHighScores();
  }, 2000);
}

// function renderHighScores() {
//   debugger;
//   if (highScores === null) {
//   } else {
//     for (var i = 0; highScores.length; i++) {
//       var highScore = highScores[i];
//       var h4 = document.createElement("h4");
//       h4.textContent = highScore;
//       highScoreRender.appendChild(h4);
//     }
//   }
// }

function highScoreDisplay() {
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  // renderHighScores();
}
highScoreDisplay();

function storeHighScores() {
  debugger;
  localStorage.setItem("highScores", JSON.stringify(highScores));
  // highScores.push(highScore);
  // renderHighScores();
}
