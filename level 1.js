// Function to move to the next question
let correctCount = 0; // number of correct answers
function goToNextQuestion(currentQuestionId, nextQuestionId) {
  document.getElementById(currentQuestionId).style.display = "none"; 
  document.getElementById(nextQuestionId).style.display = "block"; 
}

// Stopwatch Timer (continuous)
let elapsedTime = 0;
const timerDisplay = document.getElementById("time");

// Helper to highlight answers
function markAnswer(button, isCorrect, currentId, nextId) {
  const skipQuestions = ["question11", "question12", "question13", "question14", "question15"];
  if (skipQuestions.includes(currentId)) {
    if (isCorrect) {
      correctCount++;
    } else {
      // do nothing
    }
  } else {
    if (isCorrect) {
      correctCount++;
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  }

  setTimeout(() => {
    goToNextQuestion(currentId, nextId);
    console.log(correctCount);
    console.log(nextId);

    if (nextId == 'passed!') {
      const username = localStorage.getItem("username");
      console.log(correctCount);
      console.log(username);

      // 👇 Replace with your Render backend URL
      const backendUrl = "https://your-backend.onrender.com/api/save_result";

      fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          language: "html",
          score: correctCount,
          time: elapsedTime
        })
      })
        .then(res => res.json())
        .then(data => console.log("Result saved:", data))
        .catch(err => console.log("Error saving result:", err));
    }
  }, 800);
}

// Correct answers
document.getElementById("answer1").addEventListener("click", () => markAnswer(document.getElementById("answer1"), true, "question1", "question2"));
document.getElementById("answer2").addEventListener("click", () => markAnswer(document.getElementById("answer2"), true, "question2", "question3"));
document.getElementById("answer3").addEventListener("click", () => markAnswer(document.getElementById("answer3"), true, "question3", "question4"));
document.getElementById("answer4").addEventListener("click", () => markAnswer(document.getElementById("answer4"), true, "question4", "question5"));
document.getElementById("answer5").addEventListener("click", () => markAnswer(document.getElementById("answer5"), true, "question5", "question6"));
document.getElementById("answer6").addEventListener("click", () => markAnswer(document.getElementById("answer6"), true, "question6", "question7"));
document.getElementById("answer7").addEventListener("click", () => markAnswer(document.getElementById("answer7"), true, "question7", "question8"));
document.getElementById("answer8").addEventListener("click", () => markAnswer(document.getElementById("answer8"), true, "question8", "question9"));
document.getElementById("answer9").addEventListener("click", () => markAnswer(document.getElementById("answer9"), true, "question9", "question10"));
document.getElementById("answer10").addEventListener("click", () => markAnswer(document.getElementById("answer10"), true, "question10", "question11"));

// Wrong answers → highlight red + go next
let wrongAnswers = [
  { wrongId: "wrong1", current: "question1", next: "question2" },
  { wrongId: "wrong1b", current: "question1", next: "question2" },
  { wrongId: "wrong1c", current: "question1", next: "question2" },

  { wrongId: "wrong2", current: "question2", next: "question3" },
  { wrongId: "wrong2b", current: "question2", next: "question3" },
  { wrongId: "wrong2c", current: "question2", next: "question3" },

  { wrongId: "wrong3", current: "question3", next: "question4" },
  { wrongId: "wrong3b", current: "question3", next: "question4" },
  { wrongId: "wrong3c", current: "question3", next: "question4" },

  { wrongId: "wrong4a", current: "question4", next: "question5" },
  { wrongId: "wrong4b", current: "question4", next: "question5" },
  { wrongId: "wrong4c", current: "question4", next: "question5" },

  { wrongId: "wrong5", current: "question5", next: "question6" },
  { wrongId: "wrong5b", current: "question5", next: "question6" },
  { wrongId: "wrong5c", current: "question5", next: "question6" },

  { wrongId: "wrong6a", current: "question6", next: "question7" },
  { wrongId: "wrong6b", current: "question6", next: "question7" },
  { wrongId: "wrong6c", current: "question6", next: "question7" },

  { wrongId: "wrong7", current: "question7", next: "question8" },
  { wrongId: "wrong7b", current: "question7", next: "question8" },
  { wrongId: "wrong7c", current: "question7", next: "question8" },

  { wrongId: "wrong8", current: "question8", next: "question9" },
  { wrongId: "wrong8b", current: "question8", next: "question9" },
  { wrongId: "wrong8c", current: "question8", next: "question9" },

  { wrongId: "wrong9", current: "question9", next: "question10" },
  { wrongId: "wrong9b", current: "question9", next: "question10" },
  { wrongId: "wrong9c", current: "question9", next: "question10" },

  { wrongId: "wrong10", current: "question10", next: "question11" },
  { wrongId: "wrong10b", current: "question10", next: "question11" },
  { wrongId: "wrong10c", current: "question10", next: "question11" },
];

wrongAnswers.forEach(item => {
  document.getElementById(item.wrongId).addEventListener("click", () => markAnswer(document.getElementById(item.wrongId), false, item.current, item.next));
});

// Track attempts for each question
let attempts = {};

// Function to check text answers with max 3 tries
function checkTextAnswer(inputId, correctAnswer, currentId, nextId) {
  const userAnswer = document.getElementById(inputId).value.trim().toLowerCase();
  const feedback = document.getElementById("feedback" + inputId.replace("input", ""));
  const correct = correctAnswer.toLowerCase();

  if (!attempts[inputId]) attempts[inputId] = 0;

  if (userAnswer.includes(correct)) {
    feedback.textContent = "✅ Correct! Moving on...✅";
    feedback.style.color = "white";
    attempts[inputId] = 0; // reset counter
    setTimeout(() => {
      document.getElementById(currentId).style.display = "none";
      document.getElementById(nextId).style.display = "block";
    }, 1200);
    markAnswer(this, true, currentId, nextId);
  } else {
    attempts[inputId]++;
    if (attempts[inputId] === 1) feedback.textContent = "❌ Wrong! You have 2 more attempts.";
    else if (attempts[inputId] === 2) feedback.textContent = "❌ Wrong! You have 1 more attempt.";
    else if (attempts[inputId] >= 3) {
      feedback.textContent = "❌ Wrong 3 times! Moving on to the next question...";
      feedback.style.color = "orange";
      attempts[inputId] = 0;
      setTimeout(() => {
        document.getElementById(currentId).style.display = "none";
        document.getElementById(nextId).style.display = "block";
      }, 1500);
      markAnswer(this, false, currentId, nextId);
    }
    feedback.style.color = "red";
  }
}

// Start timer
setInterval(() => {
  elapsedTime++;
  timerDisplay.textContent = elapsedTime;
}, 1000);
