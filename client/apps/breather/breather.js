const container = document.getElementById('container');
const text = document.getElementById('text');

// Back to front button
const backBtn = document.getElementById('back-btn');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  text.innerText = 'Breathe In !';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breath Out';
      container.className = 'container shrink';
    }, holdTime);
    
  }, breathTime);
}

setInterval(breathAnimation, totalTime);

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});