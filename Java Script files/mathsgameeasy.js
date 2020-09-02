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
    question: "If David’s age is 27 years old in 2011. What was his age in 2003?",
    choice1: "19",
    choice2: "18",
    choice3: "17",
    choice4: "20",
    answer: 1
  },
  {
    question:"What is 7% equal to?",
    choice1: "0.7",
    choice2: "7",
    choice3: "0.07",
    choice4: "0.007",
    answer: 3
  },
  {
    question: "I am a number. I have 7 in the ones place. I am less than 80 but greater than 70. What is my number?",
    choice1: "71",
    choice2: "77",
    choice3: "72",
    choice4: "73",
    answer: 2
  },
  {
    question: "What is the value of x if x^2 = 169",
    choice1: "15",
    choice2: "13",
    choice3: "14",
    choice4: "16",
    answer: 2
  },
  {
    question: "In a century how many months are there?",
    choice1: "12",
    choice2: "120",
    choice3: "1200",
    choice4: "12000",
    answer: 3  }
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

   

if(classToApply === "incorrect") {     window.location.replace("Maths-Fail2.html");} selectedChoice.parentElement.classList.add(classToApply);

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
