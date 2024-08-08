const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("Clicked!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScores.push(score); //Add scores to the array highScores
  highScores.sort((a, b) => b.score - a.score); //Sorting the array in which a and b are compared
  //and so, if b is greater than a, the put b value before a.(Note: .sort is a function in js)
  highScores.splice(5); //Top 5 scores only be displayed.

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/index.html");

  console.log(highScores);
};
