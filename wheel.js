const phrases = [
  'Front End Web Developer',
  'JavaScript is the future',
  'Writing code is fun',
  'I love designing websites',
  'Career Change or Bust'
];

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const gameReset = document.getElementById('overlay');
const phraseUL = document.querySelector('#phrase');
const keyButton = document.getElementsByTagName('button');
const score = document.getElementById('scoreboard').firstElementChild;
const resetButton =document.querySelector('.btn__reset');

let keys = [];
let missed = 0;
let letterFound = null;


//Function for chooseing a random phrase from the phrases array
function getRandomPhraseAsArray(arr){
  let phrase = Math.floor(Math.random() * arr.length);
  return(arr[phrase]);
};
const phraseArray = getRandomPhraseAsArray(phrases);

//Function for displaying the chosen random phrase to the browser
function addPhraseToDisplay(arr){
  for (let i = 0; i < arr.length; i ++){
    const item = document.createElement('LI');
    item.textContent = arr[i];
    phraseUL.appendChild(item);
    if ( item.innerText !== '' ) {
      item.className = 'letter';
    } else {
      item.className = 'space';
    }
  }
};

//Initiate game and display phrase to display
gameReset.addEventListener('click', (event) => {
  if ( event.target.className === 'btn__reset' ) {
    gameReset.style.display = 'none';
  }
  addPhraseToDisplay(phraseArray);
});

//Function for checking each keyboard character against characters in phrase
function checkLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let correctGuess = null;
  for (let i = 0; i < letters.length; i ++) {
    let letter = letters[i].textContent.toLowerCase();
    if ( letter === button.toLowerCase() ) {
      letters[i].className = 'letter show animation';
      correctGuess = letter;
      letterFound = correctGuess;
    }
  }
  return correctGuess;
};

//Function to reset the game after winning or losing
function resetGame() {
  gameReset.addEventListener('click', (event) => {
    if ( event.target.className === 'btn__reset' ) {
      phraseUL.innerHTML = '';
      for ( let i = 0; i < keyButton.length; i ++ ) {
        keyButton[i].className = '';
      }
      for ( let i = 0; i < score.children.length; i ++ ) {
        score.children[i].style.display = '';
      }
      keys = [];
      missed = 0;
      letterFound = null;
      gameReset.style.display = 'none';
      const newPhrase = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(newPhrase);
    }
  });
}

//Function to check if the player has won or lost
function checkWin() {
  const shownLetters = document.querySelectorAll('.show');
  const letters = document.querySelectorAll('.letter');
  const title = document.querySelector('.title');
  if ( letters.length === shownLetters.length ) {
    gameReset.style.display = '';
    gameReset.className = 'win';
    title.textContent = 'YOU WON!!';
    resetButton.textContent = 'Play Again';
    resetGame();
  } else if ( missed === 5 ) {
    gameReset.style.display = '';
    gameReset.className = 'lose';
    title.textContent = 'GAME OVER!!';
    resetButton.textContent = 'Try Again';
    resetGame();
  }
};

//Listen for keyboard ... initiate 'checkLetter' & 'checkWin' functions each time
document.addEventListener('keyup', (event) => {
  letterFound = null;
  const letterChoice = event.key;
  checkLetter(letterChoice);
  if ( letterFound === null ) {
    //Remove life & increase count of missed variable
    score.children[missed].style.display = 'none';
    missed += 1;
  };
  //Reveal matching letters and disable from selecting again
  for ( var i = 0; i < keyButton.length; i ++ ) {
    if ( keyButton[i].textContent === event.key ) {
      keyButton[i].className = 'chosen';
      keyButton[i].disabled = true;
  }
  }
  checkWin();
});
