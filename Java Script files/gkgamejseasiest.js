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
    question: "When did Sachin Tendulkar lift the World Cup?",
    choice1: "1983",
    choice2: "2003",
    choice3: "2011",
    choice4: "2007",
    answer: 3
  },
  {
    question:"Which country did Adolf Hitler belong to?",
    choice1: "Germany ",
    choice2: "England ",
    choice3: "France ",
    choice4: "Italy ",
    answer: 1  },
  {
    question: "Which of the following is the most spoken language of India?",
    choice1: "Hindi ",
    choice2: "Telugu ",
    choice3: "Tamil ",
    choice4: "Bengali ",
    answer: 1
  },
  {
    question: "For which of the following disciplines is Nobel Prize awarded?",
    choice1: "Literature, Peace and Economics",
    choice2: "Physics and Chemistry",
    choice3: "Physiology or Medicine",
    choice4: "All of the above",
    answer: 4  },
  {
    question: "Who established the Mughal Dynasty?",
    choice1: "Akbar ",
    choice2: "Babur",
    choice3: "Shah Jahan",
    choice4: "Humayun",
    answer: 2 }
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
