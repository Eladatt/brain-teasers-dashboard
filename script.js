// Sample words for connections
const leftWords = ["Apple", "Banana", "Orange", "Grapes"];
const rightWords = ["Fruit", "Yellow", "Citrus", "Purple"];

// Correct connections (indices match correct pairs)
const correctConnections = [0, 1, 2, 3]; // Apple -> Fruit, Banana -> Yellow, etc.

// Shuffle arrays using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Populate columns with shuffled words
function populateColumns() {
  const leftColumn = document.getElementById('left-column');
  const rightColumn = document.getElementById('right-column');

  // Shuffle both columns
  shuffleArray(leftWords);
  shuffleArray(rightWords);

  // Populate left column
  leftWords.forEach((word, index) => {
      const div = document.createElement('div');
      div.textContent = word;
      div.classList.add('left-word');
      div.setAttribute('data-index', index); // Store index for matching
      div.onclick = () => selectLeftWord(index);
      leftColumn.appendChild(div);
  });

  // Populate right column
  rightWords.forEach((word, index) => {
      const div = document.createElement('div');
      div.textContent = word;
      div.classList.add('right-word');
      div.setAttribute('data-index', index); // Store index for matching
      div.onclick = () => selectRightWord(index);
      rightColumn.appendChild(div);
  });
}

// Variables to track selected words
let selectedLeftIndex = null;
let selectedRightIndex = null;

// Select a word from left column
function selectLeftWord(index) {
  selectedLeftIndex = index;
}

// Select a word from right column
function selectRightWord(index) {
  selectedRightIndex = index;

  if (selectedLeftIndex !== null && selectedRightIndex !== null) {
      checkConnection();
      selectedLeftIndex = null; // Reset selections after checking connection
      selectedRightIndex = null;
  }
}

// Check if connection is correct
function checkConnection() {
  const resultDisplay = document.getElementById('result-display');

  if (correctConnections[selectedLeftIndex] === selectedRightIndex) {
      resultDisplay.textContent = "Correct Connection!";
      resultDisplay.style.color = "green";
  } else {
      resultDisplay.textContent = "Incorrect Connection!";
      resultDisplay.style.color = "red";
  }
}

// Check all answers at once (for final check button)
function checkAnswers() {
  let correctCount = 0;

  // Compare each left word's connection with correct answer
  leftWords.forEach((word, index) => {
      if (correctConnections[index] === parseInt(document.querySelector(`.right-word[data-index="${index}"]`).getAttribute("data-index"))) {
          correctCount++;
      }
  });

  const resultDisplay = document.getElementById('result-display');
  
  if (correctCount === leftWords.length) {
      resultDisplay.textContent = "All connections are correct!";
      resultDisplay.style.color = "green";
  } else {
      resultDisplay.textContent = `${correctCount} out of ${leftWords.length} connections are correct.`;
      resultDisplay.style.color = "orange";
  }
}

// Initialize columns on page load
window.onload = populateColumns;
