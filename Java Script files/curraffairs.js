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
    question: "How many sites were declared to become iconic sites in Budget 2020?",
    choice1: "5",
    choice2: "3",
    choice3: "7 ",
    choice4: "4",
    answer: 1 },
  {
    question:"When did the United Kingdom end its membership as a part of the EU?",
    choice1: "January 31st,2020",
    choice2: "January 1st,2020 ",
    choice3: "January 5th,2020",
    choice4: "January 21st,2020",
    answer: 1
  },
  {
    question: "Which Indian state has declared a state calamity in the wake of a Corona virus outburst in February?",
    choice1: "Tamilnadu ",
    choice2: "Kerela ",
    choice3: "Maharashtra ",
    choice4: "Uttar Pradesh",
    answer: 2
  },
  {
    question: "Who among these was a former Engliah royal family member till last year?",
    choice1: "Prince William",
    choice2: "Queen Elizabeth",
    choice3: "Prince Harry",
    choice4: "Princess Diana",
    answer: 3
  },
  {
    question: "Which Indian actor was the most recent recipient of the Chevalier award from France?",
    choice1: "Shah Rukh Khan ",
    choice2: "Kamal Hassan",
    choice3: "Aishwarya Rai",
    choice4: "Sanjana Kapoor",
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

if(classToApply === "incorrect") {     return window.location.replace("Currentaffairs-Fail1.html");}    selectedChoice.parentElement.classList.add(classToApply);

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
