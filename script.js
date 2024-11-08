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

   // Logic to change language based on selection
   if (selectedLanguage === "he") {
       document.documentElement.lang = "he";
       alert("שפה שונתה לעברית");
   } else if (selectedLanguage === "ar") {
       document.documentElement.lang = "ar";
       alert("تم تغيير اللغة إلى العربية");
   } else if (selectedLanguage === "ru") {
       document.documentElement.lang = "ru";
       alert("Язык изменен на русский");
   }
}
