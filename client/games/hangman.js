const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const backBtn = document.getElementById('back-btn');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'development',
  'frontend',
  'internet',
  'worldcup',
  'freedom',
  'happiness',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      // Split up the selected word into a new array of letters
      .split('')
      // map the through the array, if letter in array is in the correctLetters, show it, otherwise ''
      .map(
        (letter) => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>`
      )
      // make a word again of the array containing correctLetters and ''
      .join('')}
      `;

  // replace \n globally (on all places) with ''. \n - newline
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    setTimeout(() => {
      popup.style.display = 'flex';
    }, 1000);
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Update figure
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Display you lost message
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';

    setTimeout(() => {
      popup.style.display = 'flex';
    }, 1000);
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Key letter press
window.addEventListener('keydown', (e) => {
  // only letters keyCode 65 - 90
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      // push the letter - if it not already had been pushed
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again

playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  // Reset figure
  updateWrongLettersEl();
  // hide popup
  popup.style.display = 'none';
});

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../index.html';
});

displayWord();
