const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "The average of first 50 natural numbers is",
    choice1: "25.30",
    choice2: "25.5",
    choice3: "25.00",
    choice4: "12.25",
    answer: 2
  },
  {
    question:"The number of 3-digit numbers divisible by 6, is",
    choice1: "149",
    choice2: "166",
    choice3: "150",
    choice4: "151",
    answer: 3
  },
  {
    question: "106 × 106 – 94 × 94 = ?",
    choice1: "2004",
    choice2: "2400",
    choice3: "1904",
    choice4: "1906",
    answer: 2
  },
  {
    question: "Which of the following numbers gives 240 when added to its own square?",
    choice1: "15",
    choice2: "23",
    choice3: "54",
    choice4: "16",
    answer: 1
  },
  {
    question: "The simplest form of 1.5 : 2.5 is",
    choice1: "6 : 10",
    choice2: "15 : 25",
    choice3: "0.75 : 1.25",
    choice4: "3 : 5",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

  

if(classToApply === "incorrect") {     window.location.replace("Maths-Fail1.html");}  selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
