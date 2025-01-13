let startTime = 25 * 60; // Initial time in seconds
let timeLeft = startTime;
let timerInterval;

const pomodoroTimeInput = document.getElementById('pomodoro-time');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const categoryInput = document.getElementById('category');
const notesInput = document.getElementById('notes');
const saveButton = document.getElementById('save-btn');
const pomodoroList = document.getElementById('pomodoro-list');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeLeftDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    startTime = pomodoroTimeInput.value * 60; // Get time from input
    timeLeft = startTime; // Update timeLeft with the new startTime
    updateDisplay(); // Update display immediately

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert('Time for a break!');
            savePomodoro();
            resetTimer();
            playSound('done'); // Play done sound
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
    if (timeLeft < startTime) {
        savePomodoro();
    }
    timeLeft = startTime;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    playSound('reset'); // Play reset sound
}

function savePomodoro() {
    const category = categoryInput.value;
    const notes = notesInput.value;
    const endTime = new Date();
    const elapsedTime = startTime - timeLeft;

    const pomodoro = {
        category: category,
        notes: notes,
        endTime: endTime,
        elapsedTime: elapsedTime
    };

    let pomodoros = loadPomodoros();
    pomodoros.push(pomodoro);
    savePomodoros(pomodoros);

    renderPomodoros();
    categoryInput.value = '';
    notesInput.value = '';
}

function loadPomodoros() {
    const storedPomodoros = localStorage.getItem('pomodoros');
    return storedPomodoros ? JSON.parse(storedPomodoros) : [];
}

function savePomodoros(pomodoros) {
    localStorage.setItem('pomodoros', JSON.stringify(pomodoros));
}

function renderPomodoros() {
    pomodoroList.innerHTML = '';
    const pomodoros = loadPomodoros();
    pomodoros.forEach((pomodoro, index) => {
        const li = document.createElement('li');
        const formattedElapsedTime = formatTime(pomodoro.elapsedTime);
        const formattedEndTime = pomodoro.endTime.toLocaleString();
        li.textContent = `${formattedEndTime} - ${pomodoro.category} (${formattedElapsedTime}) - ${pomodoro.notes}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deletePomodoro(index);
        });
        li.appendChild(deleteButton);

        pomodoroList.appendChild(li);
    });
}

function deletePomodoro(index) {
    let pomodoros = loadPomodoros();
    pomodoros.splice(index, 1);
    savePomodoros(pomodoros);
    renderPomodoros();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minutes}:${remainingSeconds}`;
}

function playSound(type) {
    let audio;
    if (type === 'reset') {
        audio = new Audio('reset_sound.mp3'); // Replace with your reset sound file
    } else if (type === 'done') {
        audio = new Audio('done_sound.mp3'); // Replace with your done sound file
    }
    if (audio) {
        audio.play();
    }
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
saveButton.addEventListener('click', savePomodoro);

// Call renderPomodoros() on page load
window.addEventListener('load', () => {
    renderPomodoros();
    playSound('reset'); // Play reset sound on page load (optional)
});