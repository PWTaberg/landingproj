const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const backBtn = document.getElementById('back-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// 1. Create canvas context
const ctx = canvas.getContext('2d');

//2. Create draw ball props
const ball = {
  // Ball in the middle
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Draw ball on canvas - path
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// 3. Create paddle props
const paddle = {
  // Ball in the bottom. Paddle is 00 wide
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create brick
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    // include brickInfo
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection

  // right wall
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  // left wall
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x && // left
    ball.x + ball.size < paddle.x + paddle.w && // right
    ball.y + ball.size > paddle.y
  ) {
    // upper side of paddle
    ball.dy = -ball.speed;
  }

  // Bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side
          ball.x + ball.size < brick.x + brick.w && // right brick side
          ball.y + ball.size > brick.y && // top brick side
          ball.y - ball.size < brick.y + brick.h // bottom brick side
        ) {
          ball.dy *= -1;
          //ball.dx *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  // Hit wall bottom -> Lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase score
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Draw everything
function draw() {
  // clear canvas before redraw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// replace draw(), with animation update

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

update();
// Keydown event
function keyDown(e) {
  console.log('keyDown');
  if (e.key === 'right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

// Keydown event
function keyUp(e) {
  console.log('keyUp');
  if (
    e.key === 'right' ||
    e.key === 'ArrowRight' ||
    e.key === 'left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Keyboard events handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));

closeBtn.addEventListener('click', () => rules.classList.remove('show'));


// Back button
backBtn.addEventListener('click', () => rules.classList.remove('show'));