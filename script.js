// Sample data for leaderboard
let attendingScores = [
  { name: 'Dr. 🦄', points: 1 },
  { name: 'Dr. 🤖', points: 2 },
  { name: 'Dogtor 🐕‍🦺', points: 3 }
];

// Function to display leaderboard
function displayLeaderboard() {
  const attendingList = document.getElementById('attending-scores');
  
  // Clear previous list
  attendingList.innerHTML = '';

  // Sort by points in descending order
  attendingScores.sort((a, b) => b.points - a.points);

  // Display top three attendings
  attendingScores.slice(0,3).forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.name} - ${entry.points} Points`;
      attendingList.appendChild(li);
  });
}

// Call function to display leaderboard on page load
window.onload = displayLeaderboard;

// Function to handle trust-based scoring form submission
document.getElementById('trust-form').addEventListener('submit', function(event) {
   event.preventDefault();

   const attendingName = document.getElementById('attending-name').value.trim();
   const riddlesSolved = parseInt(document.getElementById('riddles-solved').value);

   // Find or create entry for this attending
   let attending = attendingScores.find(a => a.name === attendingName);
   if (!attending) {
       attending = { name: attendingName, points: riddlesSolved };
       attendingScores.push(attending);
   } else {
       attending.points += riddlesSolved;
   }

   // Update leaderboard
   displayLeaderboard();

   // Reset form
   document.getElementById('trust-form').reset();
});

// Function to change language
function changeLanguage() {
   const selectedLanguage = document.getElementById('language-select').value;

   if (selectedLanguage === "he") {
       document.getElementById("welcome-message").textContent = "ברוכים הבאים ל-Brain Teasers! תגרמו למוח שלכם לחשוב ותהנו! 😜";
       document.getElementById("trust-explanation").textContent = "ברוכים הבאים למערכת הנאמנות! כאן תוכלו לתת נקודות לרופא שהשתתף אתכם בפתרון חידות.";
   } else if (selectedLanguage === "ar") {
       document.getElementById("welcome-message").textContent = "مرحبًا بكم في Brain Teasers! اجعلوا عقولكم تفكر واستمتعوا!";
       document.getElementById("trust-explanation").textContent = "مرحبًا بكم في نظام الثقة! هنا يمكنك إعطاء النقاط للطبيب الذي شارك معك في حل الألغاز.";
   } else if (selectedLanguage === "ru") {
       document.getElementById("welcome-message").textContent = "Добро пожаловать в Brain Teasers! Заставьте свой мозг работать и получайте удовольствие!";
       document.getElementById("trust-explanation").textContent = "Добро пожаловать в систему доверия! Здесь вы можете дать очки врачу, который участвовал с вами в решении головоломок.";
   }
}
