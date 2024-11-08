// Questions and Answers Data
const questions = [
   { question: "What has keys but can't open locks?", correctAnswer: "Piano", options: ["Piano", "Lock", "Keyboard", "Map"] },
   { question: "What has legs but doesn't walk?", correctAnswer: "Table", options: ["Chair", "Table", "Dog", "Man"] },
   { question: "What can travel around the world while staying in one corner?", correctAnswer: "Stamp", options: ["Stamp", "Letter", "Envelope", "Postcard"] },
   { question: "What gets wetter as it dries?", correctAnswer: "Towel", options: ["Towel", "Water", "Sponge", "Soap"] }
];

let selectedAnswers = {};
let attemptsLeft = 4;

// Initialize questions
const questionsContainer = document.getElementById('questions-container');
questions.forEach((q, index) => {
   const questionDiv = document.createElement('div');
   questionDiv.classList.add('question');

   const questionText = document.createElement('p');
   questionText.textContent = q.question;

   // Create answer options
   const answerOptions = document.createElement('div');
   q.options.forEach(option => {
       const answerDiv = document.createElement('div');
       answerDiv.classList.add('answer');
       answerDiv.textContent = option;

       // Add click event to select/deselect answer
       answerDiv.addEventListener('click', () => selectAnswer(index, option));

       answerOptions.appendChild(answerDiv);
   });

   questionDiv.appendChild(questionText);
   questionDiv.appendChild(answerOptions);
   questionsContainer.appendChild(questionDiv);
});

// Select an answer
function selectAnswer(questionIndex, option) {
   selectedAnswers[questionIndex] = option;

   // Highlight selected answer
   const answers = document.querySelectorAll('.question')[questionIndex].querySelectorAll('.answer');
   answers.forEach(answer => {
       if (answer.textContent === option) {
           answer.classList.add('selected');
       } else {
           answer.classList.remove('selected');
       }
   });
}

// Submit answers function
function submitAnswers() {
   if (Object.keys(selectedAnswers).length !== questions.length) {
       alert("Please select an answer for each question.");
       return;
   }

   let correctCount = checkAnswers();
   giveFeedback(correctCount);

   attemptsLeft--;
   document.getElementById('attempts-left').textContent = `Attempts Left: ${attemptsLeft}`;

   if (correctCount === questions.length || attemptsLeft === 0) {
       endGame(correctCount);
   }

   // Reset selections after submission
   selectedAnswers = {};
}

// Check selected answers against correct answers
function checkAnswers() {
   let correctCount = 0;

   questions.forEach((q, index) => {
       if (selectedAnswers[index] === q.correctAnswer) {
           correctCount++;
       }
   });

   return correctCount; // Return number of correct answers
}

// Provide feedback with colored cubes
function giveFeedback(correctCount) {
   const feedbackContainer = document.getElementById('feedback');
   feedbackContainer.innerHTML = ''; // Clear previous feedback

   for (let i = 0; i < correctCount; i++) {
       const cube = document.createElement('div');
       cube.classList.add('feedback-cube', 'cube-correct');
       feedbackContainer.appendChild(cube);
   }

   for (let i = correctCount; i < questions.length; i++) {
       const cube = document.createElement('div');
       cube.classList.add('feedback-cube', 'cube-wrong');
       feedbackContainer.appendChild(cube);
   }
}

// End game function
function endGame(correctCount) {
   const finalScoreContainer = document.getElementById('final-score');

   let message = "<h3>Game Over!</h3>";
   
   if (correctCount === questions.length) message += "<p>Congratulations! You answered all questions correctly!</p>";
   else message += `<p>You answered ${correctCount} out of ${questions.length} correctly.</p>`;

   message += "<h4>Correct Answers:</h4><ul>";

   questions.forEach(q => {
      message += `<li><strong>${q.question}</strong>: ${q.correctAnswer}</li>`;
   });

   message += "</ul>";
   
   finalScoreContainer.innerHTML = message;

   // Disable further submissions
   document.getElementById('submit-btn').disabled = true;
}
