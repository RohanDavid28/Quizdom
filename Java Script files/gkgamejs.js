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
    question: "India’s first-ever national police museum will establish in which city?",
    choice1: "Chennai",
    choice2: "Delhi",
    choice3: "Nagpur ",
    choice4: "Kolkata",
    answer: 2
  },
  {
    question:"Who has been appointed as the acting Chairman of the Union Public Service Commission (UPSC)?",
    choice1: "ArvindSaxena ",
    choice2: "SudhaJain ",
    choice3: "KirtiKumar ",
    choice4: "Omi Agrawa",
    answer: 1
  },
  {
    question: "Which country’s women cricket team has clinched the Asia Cup Twenty-20 tournament 2018?",
    choice1: "SouthKorea ",
    choice2: "Bangladesh ",
    choice3: "India ",
    choice4: "Pakistan",
    answer: 2
  },
  {
    question: "Which country’s football team has lifted the 2018 Intercontinental Cup football title?",
    choice1: "India",
    choice2: "SriLanka",
    choice3: "Kenya",
    choice4: "Argentina",
    answer: 1
  },
  {
    question: "Who has been appointed as the new chairman of Central Board of Indirect taxes and Customs (CBIC)?",
    choice1: "Johnjoseph ",
    choice2: "VanajaN.Sarna",
    choice3: "MahenderSingh",
    choice4: "S Ramesh",
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

    if(classToApply === "incorrect") 
    {   
       return window.location.replace('GK-Fail1.html');
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
