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
    question: "What is the name of the disease that has recently become a pandemic?",
    choice1: "Corona",
    choice2: "Ebola",
    choice3: "SARS",
    choice4: "Pandora",
    answer: 1 },
  {
    question:"When was the Indian Budget declared in 2020?",
    choice1: "January 31st",
    choice2: "January 30th",
    choice3: "February 3rd",
    choice4: "February 1st",
    answer: 4 },
  {
    question: "Which famous Indian temple was consecrated recently?",
    choice1: "Brihadeeswara temple",
    choice2: "Konark temple",
    choice3: "Mahabaleswara Temple",
    choice4: "Golden Temple",
    answer: 1
  },
  {
    question: "Which country recently had conflicts with the USA?",
    choice1: "Russia",
    choice2: "China",
    choice3: "Iran",
    choice4: "Iraq",
    answer: 3
  },
  {
    question: "India celebrated its _______ Republic Day on Jan 26,2020?",
    choice1: "70th",
    choice2: "69th",
    choice3: "68th",
    choice4: "71st",
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
    }    selectedChoice.parentElement.classList.add(classToApply);

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
