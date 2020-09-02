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
    question: "Which element is found in pencil lead?",
    choice1: "Carbon",
    choice2: "Chlorine",
    choice3: "Argon",
    choice4: "Graphite",
    answer: 1 },
  {
    question:"Which element is found in computer chips?",
    choice1: "Silicon",
    choice2: "Fluorine",
    choice3: "Caesium",
    choice4: "Thorium",
    answer: 1 },
  {
    question: "Which chemical is called Table Salt?",
    choice1: "Sodium Fluoride",
    choice2: "Sodium Nitrate",
    choice3: "Sodium Chloride ",
    choice4: "Sodium Silicate",
    answer: 2
  },
  {
    question: "Who discovered quantum physics?",
    choice1: "Alexander Graham Bell",
    choice2: "Benjamin Franklin",
    choice3: "Jacques Rougeau",
    choice4: "Albert Einstein",
    answer: 4  },
  {
    question: "Which of the following gases is found most abundantlyfound in Earth's atmosphere?",
    choice1: "Nitrogen",
    choice2: "Fluorine",
    choice3: "Oxygen",
    choice4: "Hydrogen",
    answer: 1
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

    selectedChoice.parentElement.classList.add(classToApply);

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
