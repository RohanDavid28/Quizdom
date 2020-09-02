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
    question: "Where was the first AC suburban train flagged off from in India?",
    choice1: "Mumbai",
    choice2: "Chennai",
    choice3: "Bangalore ",
    choice4: "New Delhi",
    answer: 1 },
  {
    question:"Which Indian firm has started an initiative to use plastics in road construction?",
    choice1: "Reliance Industries",
    choice2: "Tata Group",
    choice3: "Adithya Birla",
    choice4: "India Cements",
    answer: 1
  },
  {
    question: "Which Indian city has been declared as the world's most traffic congested city by a Netherlands based firm,TomTom?",
    choice1: "Bengaluru",
    choice2: "Hyderabad ",
    choice3: "Mumbai ",
    choice4: "Chennai",
    answer: 1
  },
  {
    question: "Which Hindi word was declared as Oxford Hindi word of the year for 2019?",
    choice1: "Ayushmaan",
    choice2: "Ahimsa",
    choice3: "Samvidhaan",
    choice4: "Karma",
    answer: 3
  },
  {
    question: "Which Indian State had recently introduced Virtual Police Station?",
    choice1: "Punjab ",
    choice2: "Maharashtra",
    choice3: "Gujarat",
    choice4: "Odisha",
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

if(classToApply === "incorrect") {     return window.location.replace("Currentaffairs-Fail2.html");}    selectedChoice.parentElement.classList.add(classToApply);

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
