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
    question: "Who is honored as Father of Modern Chemistry?",
    choice1: "Antoine Lavoisier",
    choice2: "Dimitri Mendeleev",
    choice3: "Jan Kirchoff",
    choice4: "Pierre Curie",
    answer: 1 },
  {
    question:"Who invented periodic table?",
    choice1: "Antoine Lavoisier",
    choice2: "Dimitri Mendeleev",
    choice3: "Jan Kirchoff",
    choice4: "Pierre Curie",
    answer: 2
  },
  {
    question: "Which gas is evolved from marshes and agricultural fields?",
    choice1: "Hydrogen ",
    choice2: "Methane ",
    choice3: "Oxygen ",
    choice4: "Nitrogen",
    answer: 2
  },
  {
    question: "Who invented telephone?",
    choice1: "Alexander Graham Bell",
    choice2: "Benjamin Franklin",
    choice3: "Jacques Rougeau",
    choice4: "Albert Einstein",
    answer: 1
  },
  {
    question: "What is the solvent of gold?",
    choice1: "Aquaregia",
    choice2: "Fluorine",
    choice3: "Bilirubin",
    choice4: "Sulphuric Acid",
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

if(classToApply === "incorrect") {     return window.location.replace("Science-Fail1.html");}    selectedChoice.parentElement.classList.add(classToApply);

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