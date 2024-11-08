// Sample data for leaderboard
let attendingScores = [
  { name: 'Dr. Smith', points: 120 },
  { name: 'Dr. Adams', points: 100 },
  { name: 'Dr. Lee', points: 90 }
];

// Function to submit trust form
function submitTrustForm(event) {
  event.preventDefault();
  
  const attendingName = document.getElementById('attending-name').value;
  const riddlesSolved = parseInt(document.getElementById('riddles-solved').value);

  // Check if attending already exists in leaderboard
  let found = false;
  for (let i = 0; i < attendingScores.length; i++) {
      if (attendingScores[i].name === attendingName) {
          attendingScores[i].points += riddlesSolved * 10; // Add points based on riddles solved
          found = true;
          break;
      }
  }

  // If attending not found, add new entry
  if (!found) {
      attendingScores.push({ name: attendingName, points: riddlesSolved * 10 });
  }

  // Update podium
  updatePodium();
}

// Function to update podium
function updatePodium() {
  // Sort attendings by points
  attendingScores.sort((a, b) => b.points - a.points);

  // Display top three attendings
  const podiumList = document.getElementById('podium-list');
  podiumList.innerHTML = ''; // Clear previous podium

  for (let i = 0; i < Math.min(3, attendingScores.length); i++) {
      const li = document.createElement('li');
      li.textContent = `${i + 1}. ${attendingScores[i].name} - ${attendingScores[i].points} Points`;
      podiumList.appendChild(li);
  }
}

// Function to change language
function changeLanguage() {
   const selectedLanguage = document.getElementById('language-select').value;

   if (selectedLanguage === "he") {
       document.getElementById("welcome-message").textContent = "ברוכים הבאים ל-Brain Teasers! תגרמו למוח שלכם לחשוב ותהנו! 😜";
       document.getElementById("trust-system-explanation").textContent = "במערכת הנאמנות שלנו, תוכלו להעניק נקודות לרופאים בכירים לפי מספר החידות שפתרתם יחד!";
   } else if (selectedLanguage === "ar") {
       document.getElementById("welcome-message").textContent = "مرحبًا بكم في Brain Teasers! اجعلوا عقولكم تفكر واستمتعوا!";
       document.getElementById("trust-system-explanation").textContent = "في نظام الثقة لدينا، يمكنك منح النقاط للأطباء بناءً على عدد الألغاز التي تم حلها معًا!";
   } else if (selectedLanguage === "ru") {
       document.getElementById("welcome-message").textContent = "Добро пожаловать в Brain Teasers! Заставьте свой мозг работать и получайте удовольствие!";
       document.getElementById("trust-system-explanation").textContent = "В нашей системе доверия вы можете давать очки врачам в зависимости от того, сколько загадок вы решили вместе!";
   }
}

// Initialize podium on page load
window.onload = updatePodium;
