const showPopupBtn = document.getElementById('showPopup');
const popup = document.getElementById('popup');
const submitTimeBtn = document.getElementById('submitTime');
const datetimeInput = document.getElementById('datetimeInput');
const timeSinceHeading = document.getElementById('timeSinceHeading');
let enteredTime;
let intervalId;
let heartInterval;

// Get all digit elements (store the parent containers)
const daysTensContainer = document.getElementById('days-tens').parentNode;
const daysOnesContainer = document.getElementById('days-ones').parentNode;
const hoursTensContainer = document.getElementById('hours-tens').parentNode;
const hoursOnesContainer = document.getElementById('hours-ones').parentNode;
const minutesTensContainer = document.getElementById('minutes-tens').parentNode;
const minutesOnesContainer = document.getElementById('minutes-ones').parentNode;
const secondsTensContainer = document.getElementById('seconds-tens').parentNode;
const secondsOnesContainer = document.getElementById('seconds-ones').parentNode;

const timeDisplay = document.getElementById('timeDisplay');

showPopupBtn.addEventListener('click', () => {
    popup.style.display = 'block';
});

submitTimeBtn.addEventListener('click', () => {
    enteredTime = new Date(datetimeInput.value);
    popup.style.display = 'none';
    timeDisplay.style.display = 'flex';
    timeSinceHeading.textContent = `Time Since ${enteredTime.toLocaleString()}`;

    clearInterval(intervalId);
    intervalId = setInterval(updateTime, 1000);

    clearInterval(heartInterval);
    heartInterval = setInterval(() => {
        createHearts(2);
    }, 500);
});

function updateTime() {
    const now = new Date();
    const diff = now - enteredTime;

    let seconds = Math.floor((diff / 1000) % 60);
    let minutes = Math.floor((diff / 1000 / 60) % 60);
    let hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    let days = Math.floor(diff / 1000 / 60 / 60 / 24);

    updateDigit(daysTensContainer, Math.floor(days / 10));
    updateDigit(daysOnesContainer, days % 10);
    updateDigit(hoursTensContainer, Math.floor(hours / 10));
    updateDigit(hoursOnesContainer, hours % 10);
    updateDigit(minutesTensContainer, Math.floor(minutes / 10));
    updateDigit(minutesOnesContainer, minutes % 10);
    updateDigit(secondsTensContainer, Math.floor(seconds / 10));
    updateDigit(secondsOnesContainer, seconds % 10);
}

function updateDigit(container, newDigit) {
    const currentDigit = container.querySelector('.digit') || container.firstChild;

    if (parseInt(currentDigit.textContent) !== newDigit) {
        const flipCard = document.createElement('div');
        flipCard.classList.add('flip-card');
        flipCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">${currentDigit.textContent}</div>
                <div class="flip-card-back">${newDigit}</div>
            </div>
        `;

        container.replaceChild(flipCard, currentDigit);
        flipCard.classList.add('do-flip');

        flipCard.addEventListener('transitionend', () => {
            container.replaceChild(document.createTextNode(newDigit), flipCard);
        }, { once: true });
    }
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '♥';
        document.body.appendChild(heart);

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2;

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        const size = Math.random() * 20 + 10;
        heart.style.fontSize = `${size}px`;

        const colors = ['#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFB6C1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.color = randomColor;

        const animationDuration = Math.random() * 2 + 1;
        heart.style.animationDuration = `${animationDuration}s`;

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}