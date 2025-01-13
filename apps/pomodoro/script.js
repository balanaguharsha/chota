let startTime = 25 * 60; // 25 minutes in seconds
let timeLeft = startTime;
let timerInterval;

const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeLeftDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert('Time for a break!');
            resetTimer();
        }
    }, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = startTime;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();