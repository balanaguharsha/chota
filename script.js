// JavaScript to make Mario move around randomly
const mario = document.querySelector('.mario');
let marioX = Math.random() * (window.innerWidth - 50); // Initial X position
let marioY = Math.random() * (window.innerHeight - 50); // Initial Y position
let dx = (Math.random() - 0.5) * 4; // Random horizontal velocity
let dy = (Math.random() - 0.5) * 4; // Random vertical velocity

function animateMario() {
  marioX += dx;
  marioY += dy;

  // Keep Mario within the screen bounds
  if (marioX < 0 || marioX > window.innerWidth - 50) {
    dx = -dx; // Reverse direction
  }
  if (marioY < 0 || marioY > window.innerHeight - 50) {
    dy = -dy;
  }

  mario.style.left = marioX + 'px';
  mario.style.top = marioY + 'px';

  requestAnimationFrame(animateMario);
}

animateMario(); // Start the animation