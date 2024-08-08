const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const loader = document.getElementById("loader");

let currentQuestion = {};
let acceptingAnswers = false; //To accept incoming questions
let score = 0; //default
let questionCounter = 0;
let availableQuesions = []; //include questions on array

let questions = [];

fetch("questions.jsson")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    alert("Failed to load Questions!, Try Again Later:(");
  });

const correct_bonus = 10; //Points for every correct answer
const max_questions = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions]; //To make a copy of it so the can be unique
  getNewQuestion();

  game.classList.remove("hidden");
  loader.classList.remove("hidden");
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= max_questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Questions ${questionCounter}/${max_questions}`;

  progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length); // Randomly choose questions
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question; //display the question from the array in the web

  choices.forEach((choice) => {
    const number = choice.dataset["number"]; // retreive info data forEach choice
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correct_bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
