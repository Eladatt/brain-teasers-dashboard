// Words to be used in the puzzle (randomly selected from previous links)
const words = [
    "Crossword", "Riddles", "Connections", "Trivia",
    "Puzzle", "Brain", "Teasers", "Fun",
    "Challenge", "Logic", "Quiz", "Mind",
    "Solve", "Think", "Play", "Game"
];

// Categories (each category has its own secret color)
const categories = [
    { name: 'Games', words: ["Crossword", "Riddles", "Trivia", "Connections"], color: 'green' },
    { name: 'Brain Activities', words: ["Puzzle", "Brain", "Teasers", "Fun"], color: 'blue' },
    { name: 'Mental Actions', words: ["Challenge", "Logic", "Quiz", "Mind"], color: 'purple' },
    { name: 'Verbs', words: ["Solve", "Think", "Play", "Game"], color: 'red' }
];

let selectedTiles = [];
let attemptsLeft = 4;

// Shuffle words array for randomness
const shuffledWords = words.sort(() => Math.random() - 0.5);

// Create grid dynamically
const gridContainer = document.getElementById('grid');
shuffledWords.forEach((word, index) => {
   const tile = document.createElement('div');
   tile.classList.add('grid-item');
   tile.textContent = word;
   tile.addEventListener('click', () => selectTile(index));
   gridContainer.appendChild(tile);
});

// Select tile function
function selectTile(index) {
   const tile = document.querySelectorAll('.grid-item')[index];
   if (selectedTiles.includes(index)) {
       // Deselect tile if already selected
       selectedTiles = selectedTiles.filter(i => i !== index);
       tile.classList.remove('selected');
   } else if (selectedTiles.length < 4) {
       // Select up to 4 tiles
       selectedTiles.push(index);
       tile.classList.add('selected');
   }
}

// Submit selection function
function submitSelection() {
   if (selectedTiles.length !== 4) {
       alert("Please select exactly 4 tiles.");
       return;
   }

   let correctCount = checkSelection();
   giveFeedback(correctCount);

   attemptsLeft--;
   document.getElementById('attempts-left').textContent = `Attempts Left: ${attemptsLeft}`;

   if (correctCount === 4 || attemptsLeft === 0) {
       endGame();
   }

   // Reset selection after submission
   selectedTiles.forEach(index => document.querySelectorAll('.grid-item')[index].classList.remove('selected'));
   selectedTiles = [];
}

// Check selection against categories
function checkSelection() {
   let correctCount = 0;

   const selectedWords = selectedTiles.map(index => shuffledWords[index]);
   
   categories.forEach(category => {
       const matches = selectedWords.filter(word => category.words.includes(word));
       if (matches.length > correctCount) correctCount = matches.length; // Track max matches in one category
   });

   return correctCount; // Return how many are in the same category
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

   for (let i = correctCount; i < 4; i++) {
       const cube = document.createElement('div');
       cube.classList.add('feedback-cube', 'cube-wrong');
       feedbackContainer.appendChild(cube);
   }
}

// End game function
function endGame() {
   const finalFeedbackContainer = document.getElementById('final-feedback');
   
   let message = "<h3>Game Over!</h3>";
   
   if (attemptsLeft > 0) message += "<p>Congratulations! You found all categories!</p>";
   else message += "<p>You've used all your attempts.</p>";

   message += "<h4>Categories and Terms:</h4><ul>";

   categories.forEach(category => {
      message += `<li><strong>${category.name}</strong>: ${category.words.join(', ')}</li>`;
      message += `<span style="color:${category.color}">Category Color</span><br>`;
   });

   message += "</ul>";
   
   finalFeedbackContainer.innerHTML = message;

   // Disable further submissions
   document.getElementById('submit-btn').disabled = true;
}
