'use strict';

// all needed objects
const scores = document.querySelectorAll('.score');
const rollBtn = document.querySelector('.btn--roll');
const changedScores = document.querySelectorAll('.current-score');
const newGameBtn = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const holdBtn = document.querySelector('.btn--hold');

// needed valriable in logic
let playerId = 0;
const playerScore = [0, 0];
let someoneWon = false;
let curScore = 0;

// to reset the game
const reset = function () {
  playerId = 0;
  curScore = 0;
  someoneWon = false;
  diceImg.classList.add('hidden');
  for (let i = 0; i < playerScore.length; i++) {
    playerScore[i] = 0;
    players[i].classList.remove('player--winner');
    players[i].classList.remove('player--active');
    scores[i].textContent = 0;
    changedScores[i].textContent = 0;
  }
  players[playerId].classList.add('player--active');
};

//
const switchPlayer = function () {
  playerScore[playerId] += curScore;
  players[playerId].classList.remove('player--active');
  if (playerScore[playerId] >= 20) {
    players[playerId].classList.add('player--winner');
    someoneWon = true;
  }
  scores[playerId].textContent = playerScore[playerId];
  changedScores[playerId].textContent = 0;
  playerId = 1 - playerId;
  players[playerId].classList.add('player--active');
  curScore = 0;
};

// call function reset at the beginning to reset all variables
reset();

// playing logic
rollBtn.addEventListener('click', function () {
  if (!someoneWon) {
    const rand = Math.floor(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${rand}.png`;
    if (rand === 1) switchPlayer();
    else {
      curScore += rand;
      changedScores[playerId].textContent = curScore;
    }
  }
});

newGameBtn.addEventListener('click', reset);

holdBtn.addEventListener('click', switchPlayer);
