// Importing question bank json to be able to use in js
import bank from './questionbank.json' assert { type: 'json' };

// declaring all of the selectors for each different id and class in the HTML code
const quizWrapper = document.getElementById('quiz');
const questionElem = document.querySelector('#question');
const answerA = document.querySelector("label[for='a']");
const answerB = document.querySelector("label[for='b']");
const answerC = document.querySelector("label[for='c']");
const answerD = document.querySelector("label[for='d']");
const submitBtn = document.getElementById('submitBtn');
const answerChoices = document.querySelectorAll("input[name='answer']");
const scoreLabel = document.getElementById('score');
const quizData = bank.questionBank;

let questionShown = 0;
let score = 0;

function loadQuestion() {
  resetSelection();
  let currentQuestion = quizData[questionShown];

  questionElem.innerHTML = currentQuestion.question;
  answerA.innerHTML = currentQuestion.a;
  answerB.innerHTML = currentQuestion.b;
  answerC.innerHTML = currentQuestion.c;
  answerD.innerHTML = currentQuestion.d;
}

submitBtn.addEventListener('click', () => {
  let selectedAnswer = getSelection();

  if (selectedAnswer == quizData[questionShown].correctAnswer) {
    score++;
  }

  scoreLabel.textContent = `Score: ${score}`;
  if (selectedAnswer != '') {
    questionShown++;
  }
  if (questionShown < quizData.length) {
    if (selectedAnswer != '') {
      loadQuestion();
    }
  } else {
    quizWrapper.innerHTML = `<h1> Quiz Completed! </h1> <h1> You Scored ${score}/${quizData.length} points! </h1> <button id="retryBtn" onclick="location.reload();"> Try again? </button>`;
  }
});

const getSelection = () => {
  let selectedAnswer = '';

  answerChoices.forEach(e => {
    if (e.checked) {
      selectedAnswer = e.id;
    }
  });
  return selectedAnswer;
};
const resetSelection = () => {
  answerChoices.forEach(e => {
    e.checked = false;
  });
};

loadQuestion();
