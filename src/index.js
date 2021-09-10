import './style.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/3BZDDcKWho21O92Dwi8P/scores/';
const form = document.getElementById('form');
const refreshBtn = document.getElementById('refreshBtn');
const userName = document.getElementById('name-input');
const userScore = document.getElementById('score-input');

const sendScores = async (url, userName, userScore) => {
  const gameResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user: userName.value,
      score: userScore.value,
    }),
  });
  userName.value = '';
  userScore.value = '';
  return gameResult.json();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendScores(url, userName, userScore);
});

const getScore = async (url) => {
  const score = await fetch(url);
  return score.json();
};

const displayScores = ((scores) => {
  const scoreArray = scores.result;
  const scoreDetail = scoreArray.map((b) => `
    <li>${b.user} : ${b.score}</li>
  `).join('');
  document.getElementById('scores-box').innerHTML = `${scoreDetail}`;
});

refreshBtn.addEventListener('click', () => {
getScore(url).then((data) =>{ displayScores(data); });
});
getScore(url).then((data) =>{ displayScores(data); });

