document.getElementById('rate').addEventListener('click', function () {
    location.href = 'feedback.html'
});

document.getElementById('regame').addEventListener('click', function () {
  localStorage.removeItem("correctAnswer");
  localStorage.removeItem("incorrectAnswer");
  location.href = 'exam.html';
});


// Recupera le risposte salvate
const correctAnswer = parseInt(localStorage.getItem("correctAnswer"));
const incorrectAnswer = parseInt(localStorage.getItem("incorrectAnswer"));

const totalQuestions = correctAnswer + incorrectAnswer;

if (totalQuestions === 0) {
    document.getElementById("percentageCorrect").innerText = "0%";
    document.getElementById("questionsCorrect").innerText = "No questions answered";
    document.getElementById("percentageWrong").innerText = "0%";
    document.getElementById("questionsWrong").innerText = "No questions answered";
} else {
    const percentageCorrect = parseFloat(((correctAnswer / totalQuestions) * 100).toFixed(1));
    const percentageWrong = ((incorrectAnswer / totalQuestions) * 100).toFixed(1);

    console.log("Percentage Correct:", percentageCorrect);
    console.log("Percentage Wrong:", percentageWrong);

    document.getElementById("percentageCorrect").innerText = `${percentageCorrect}%`;
    document.getElementById("questionsCorrect").innerText = `${correctAnswer}/${totalQuestions} questions`;

    document.getElementById("percentageWrong").innerText = `${percentageWrong}%`;
    document.getElementById("questionsWrong").innerText = `${incorrectAnswer}/${totalQuestions} questions`;

    if (percentageCorrect > 60) {
        document.querySelector("section").innerHTML = `<p id="result">Congratulations!<br><strong id="text">You passed the exam.</strong></p>
                                                       <p id="resultText">
                                                       We'll send you the certificate in a few minutes. <br>
                                                       Check your email (including promotions / spam folder)
                                                       </p>`;
    } else {
        document.querySelector("section").innerHTML = `<p id="result">OPS!<br><strong id="text">You don't pass the exam.</strong></p>
                                                       <p id="resultText"> Check or Try Again Quiz</p>`;
    }
}


  // Configura il grafico
  const ctx = document.getElementById("resultChart").getContext("2d");
  
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [{
        data: [correctAnswer, incorrectAnswer],
        backgroundColor: ["#4CAF50", "#F44336"], // Colori per corrette e sbagliate
        borderColor: ["#FFFFFF", "#FFFFFF"], // Bordo bianco
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
  

