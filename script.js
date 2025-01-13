const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 16; // size of each grid cell
let snake = [{ x: 160, y: 160 }]; // initial snake position
let dx = grid; // horizontal velocity (start moving right)
let dy = 0; // vertical velocity
let foodX, foodY;
let score = 0;

function generateFood() {
    foodX = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    foodY = Math.floor(Math.random() * (canvas.height / grid)) * grid;
}

generateFood();

function gameLoop() {
    requestAnimationFrame(gameLoop);
    // Limit frame rate to 10fps
    if (++lastRenderTime < (1000 / 10)) return;

    lastRenderTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
}

let lastRenderTime = 0;

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX, foodY, grid, grid);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, grid, grid));
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const didEatFood = head.x === foodX && head.y === foodY;
    if (didEatFood) {
        score++;
        document.title = 'Snake Game - Score: ' + score;
        generateFood();
    } else {
        snake.pop();
    }

    // Game over conditions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
        alert('Game Over!');
        snake = [{ x: 160, y: 160 }];
        dx = grid;
        dy = 0;
        score = 0;
        generateFood();
    }
}

document.addEventListener('keydown', function(e) {
    // Left (37), Up (38), Right (39), Down (40)
    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;
    const keyPressed = e.keyCode;

    const goingUp = dy === -grid;
    const goingDown = dy === grid;
    const goingRight = dx === grid;
    const goingLeft = dx === -grid;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -grid;
        dy = 0;
    } else if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -grid;
    } else if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = grid;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = grid;
    }
});

requestAnimationFrame(gameLoop);