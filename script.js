// Sample data for leaderboard
const attendingScores = [
  { name: 'Dr. Smith', points: 120 },
  { name: 'Dr. Adams', points: 100 },
  { name: 'Dr. Lee', points: 90 }
];

const studentScores = [
  { name: 'John Doe', points: 80 },
  { name: 'Jane Roe', points: 70 },
  { name: 'Sam Roe', points: 60 }
];

// Function to display leaderboard
function displayLeaderboard() {
  const attendingList = document.getElementById('attending-scores');
  attendingScores.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name} - ${entry.points} Points`;
      attendingList.appendChild(li);
  });

  const studentList = document.getElementById('student-scores');
  studentScores.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name} - ${entry.points} Points`;
      studentList.appendChild(li);
  });
}

// Call function to display leaderboard on page load
window.onload = displayLeaderboard;

// Function to change language
function changeLanguage() {
   const selectedLanguage = document.getElementById('language-select').value;

   if (selectedLanguage === "he") {
       document.getElementById("welcome-message").textContent = "ברוכים הבאים ל-Brain Teasers! תגרמו למוח שלכם לחשוב ותהנו! 😜";
       document.getElementById("crossword-description").textContent = "Words party! 🎉";
       document.getElementById("riddles-description").textContent = "Riddi-diculous! 🤪";
       document.getElementById("connections-description").textContent = "Link fast! ⚡";
       document.getElementById("trivia-description").textContent = "C = answer? 🤔";
   } else if (selectedLanguage === "ar") {
       document.getElementById("welcome-message").textContent = "مرحبًا بكم في Brain Teasers! اجعلوا عقولكم تفكر واستمتعوا!";
       document.getElementById("crossword-description").textContent = "حفلة الكلمات!";
       document.getElementById("riddles-description").textContent = "ألغاز رائعة!";
       document.getElementById("connections-description").textContent = "اربط بسرعة!";
       document.getElementById("trivia-description").textContent = "C = الجواب؟";
   } else if (selectedLanguage === "ru") {
       document.getElementById("welcome-message").textContent = "Добро пожаловать в Brain Teasers! Заставьте свой мозг работать и получайте удовольствие!";
       document.getElementById("crossword-description").textContent = "Словесная вечеринка!";
       document.getElementById("riddles-description").textContent = "Загадки!";
       document.getElementById("connections-description").textContent = "Свяжитесь быстро!";
       document.getElementById("trivia-description").textContent = "C = ответ?";
   }
}
