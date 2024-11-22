// Selezione del canvas e configurazione del contesto
const canvas = document.getElementById("countdown");
const ctx = canvas.getContext("2d");

// Configurazione del cerchio
const radius = 60; // Raggio del cerchio
const fullTime = 60;
let remainingTime = fullTime;

// Funzione per disegnare il cerchio
function drawCircle(progress) {
  // Pulizia del canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cerchio di sfondo
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "#ecf0f1";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Cerchio progressivo
  ctx.beginPath();
  ctx.arc(
    100,
    100,
    radius,
    -Math.PI / 2,
    -Math.PI / 2 + 2 * Math.PI * progress,
    false
  );

  ctx.strokeStyle = "#d20094";
  ctx.lineWidth = 10;
  ctx.stroke();
}


// Funzione per far partire il timer
function startTimer() {
  const interval = 50; // Intervallo di aggiornamento (50 ms)
  const totalSteps = (fullTime * 1000) / interval; // Numero totale di aggiornamenti
  let step = 0;

  const timer = setInterval(() => {
    step++;
    remainingTime = Math.max(0, fullTime - (step * interval) / 1000); // Calcolo del tempo rimanente
    const progress = remainingTime / fullTime; // Progresso percentuale
    drawCircle(progress); // Aggiornamento del cerchio

    ctx.font = "normal 10px Outfit";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SECONDS", 100, 78);
    ctx.font = "normal 45px Outfit";
    ctx.fillText(Math.floor(remainingTime), 100, 118);
    ctx.font = "normal 10px Outfit";
    ctx.fillText("REMAINING", 100, 135);

    // Fine del timer
    if (remainingTime <= 0) {
      clearInterval(timer);
      startTimer();
      resetAllAnswers();
      if(numberQuestion === questions.length) {
        location.href = "result.html";
      }
      else {
        nextQuestions();
        theQuestion();
        numberQuestion++;
        document.getElementById("numberQuestion").innerText = numberQuestion;
      }
      
    }

    document
      .getElementById("answerConfirm")
      .addEventListener("click", function (e) {
        e.preventDefault();
        clearInterval(timer);
      });
  }, interval);
}

// Disegna il cerchio iniziale e avvia il timer
drawCircle(1);
startTimer();

// DOMANDE

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let flagStateRandom = true;
let randomNumber = 0;
let numberQuestion = 1;
const arraySubmitAnswers = [];
let totalQuestions = 0;

function randomQuestion() {
  flagStateRandom = flagStateRandom
    ? (randomNumber = Math.floor(Math.random() * questions.length).toFixed())
    : false;
  flagStateRandom = randomNumber;
  return flagStateRandom;
}

randomQuestion();

const theQuestion = () => {

  document.getElementById("answerConfirm").setAttribute("disabled", "true");
  const incorrect_answers = [...questions[randomNumber].incorrect_answers];
  const questionHTML = document.getElementById("question");
  questionHTML.innerText = questions[randomNumber].question;
  const questionContaier = document.getElementById("quiz-container");
  //const incorrect_answers = questions[randomNumber].incorrect_answers;
  const correct_answer = questions[randomNumber].correct_answer;
  incorrect_answers.push(correct_answer);
  arraySubmitAnswers.push(randomNumber);
  incorrect_answers.sort(() => Math.floor(Math.random() - 0.5));

  for (let i = 0; i < incorrect_answers.length; i++) {
      const answer = document.createElement("button");
      answer.innerText = incorrect_answers[i];
      answer.classList.add("option");
      answer.setAttribute("onclick", `isCorrect(${i})`);
      questionContaier.appendChild(answer);
  }
};

theQuestion();

let incorrect_answers_number = 0;
let correct_answer_number = 0;
const btnAnswerChoise = document.querySelector(".option > .selected");

const isSelected = () => {
  const btnNotAnswers = document.querySelectorAll(".option:not(.selected)");
  const btnAnswerChoise = document.querySelector(".selected");
  if (btnAnswerChoise.classList.contains('selected')) {
      btnNotAnswers.forEach((element) => {
      element.classList.add("notSelected");  
      element.setAttribute("disabled", "true");
      
    });
  }
};

const isCorrect = (i) => {
  const InAnswerIncorrect = questions[randomNumber].incorrect_answers;
  const InAnswerCorrect = questions[randomNumber].correct_answer;

  if (!arraySubmitAnswers.includes(randomNumber)) {
    totalQuestions++;
    arraySubmitAnswers.push(randomNumber);
  }

  document.getElementById("answerConfirm").removeAttribute("disabled");
  const btnAnswers = document.querySelectorAll("button:not(#answerConfirm)")[i];
  btnAnswers.classList.add("selected");
  isSelected();

  if (InAnswerIncorrect.includes(btnAnswers.innerText)) {
    incorrect_answers_number++;
    localStorage.setItem("incorrectAnswer", incorrect_answers_number);
  } else if (InAnswerCorrect.includes(btnAnswers.innerText)) {
    correct_answer_number++;
    localStorage.setItem("correctAnswer", correct_answer_number);
  }
  numberQuestion++;
};

const nextQuestions = () => {
  if (arraySubmitAnswers.includes(randomNumber)) {
    flagStateRandom = true;
    randomQuestion();
    nextQuestions();
  }
};

const resetAllAnswers = () => {
  document.querySelectorAll("button:not(#answerConfirm)").forEach((element) => {
    element.remove();
  });
};

const goToResultPage = () => {
  if (numberQuestion === questions.length + 1 || arraySubmitAnswers.length === questions.length) {
    const totalQuestions = correct_answer_number + incorrect_answers_number;
    const percentageCorrect = (correct_answer_number / totalQuestions) * 100;
    const percentageWrong = (incorrect_answers_number / totalQuestions) * 100;
    localStorage.setItem("correctAnswer", correct_answer_number);
    localStorage.setItem("incorrectAnswer", incorrect_answers_number);
    
    location.href = "result.html";
  }
};

document.getElementById("answerConfirm").addEventListener("click", function () {
  startTimer();
  goToResultPage();
  resetAllAnswers();
  nextQuestions();
  theQuestion();
  document.getElementById("numberQuestion").innerText = numberQuestion;
});
