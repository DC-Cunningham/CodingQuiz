// join to all the document elements
var quizBlockEl = document.querySelector("#quiz-block");
var timerMinutes = document.querySelector("#minutes");
var timerSeconds = document.querySelector("#seconds");
var startQuizBtn = document.querySelector("#timer-button");
var questionBox = document.querySelector("#question");
var answerBox = document.querySelector("#answers");
var highScores = document.querySelector("#high-scores");
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
  var questionIndex = 0;
  quizQuestions();
}

function nextQuestion() {
  questionIndex++;
  quizQuestions();
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
  console.log(Q_N_A[questionIndex].correct);
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
  debugger;
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
  var minutes = 5;
  clearInterval(interval);
  totalSeconds = minutes * 60;
}

function startTimer() {
  clearQnA();
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
  secondsElapsed = 0;
  setTime();
  renderTime();
  //   youhaveLost();
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
