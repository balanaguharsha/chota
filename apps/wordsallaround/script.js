let sentence = "";
let words = [];
let foundWordIndexes = [];
const emojis = ["✨", "🌟", "💫", "💖", "🔥", "💯", "🎉", "🎶", "🌈", "⭐", "🌙", "🌟"];
const targetLine = document.getElementById("target-line");
const sentenceInput = document.getElementById("sentence-input");
const startButton = document.getElementById("start-button");
const winMessage = document.getElementById("win-message");

startButton.addEventListener("click", () => {
    sentence = sentenceInput.value;
    if (!sentence) {
        sentence = "This is a default sentence for the word game.";
    }
    words = sentence.split(/\s+/).filter(word => word !== "");
    startGame();
});

function startGame() {
    document.querySelectorAll('.word').forEach(el => el.remove());
    document.querySelectorAll('.emoji').forEach(el => el.remove());
    targetLine.innerHTML = "";
    foundWordIndexes = [];

    words.forEach((word, index) => createWord(word, index));

    for (let i = 0; i < 5; i++) {
        createEmoji();
    }
}

function createWord(word, index) {
    const wordElement = document.createElement("div");
    wordElement.classList.add("word");
    wordElement.textContent = word;
    document.body.appendChild(wordElement);

    wordElement.style.setProperty("--random-y", Math.random() * 2 - 1);
    wordElement.style.setProperty("--random-rotation", Math.random() * 360);
    wordElement.style.left = -20 + "vw";

    wordElement.addEventListener("click", () => handleWordClick(wordElement, word, index));

    setInterval(() => createSparkles(wordElement), 400);

    return wordElement;
}

function handleWordClick(wordElement, word, index) {
    if (!foundWordIndexes.includes(index)) {
        wordElement.classList.add("found");
        foundWordIndexes.push(index);

        foundWordIndexes.sort((a, b) => a - b);

        targetLine.innerHTML = "";
        foundWordIndexes.forEach(foundIndex => {
            const targetWord = document.createElement("span");
            targetWord.textContent = words[foundIndex];
            targetLine.appendChild(targetWord);
        });

        if (foundWordIndexes.length === words.length) {
            winMessage.style.display = "block";
        }
    }
}

function createSparkles(wordElement) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        sparkle.style.left = wordElement.offsetLeft + (Math.random() * wordElement.offsetWidth) + "px";
        sparkle.style.top = wordElement.offsetTop + (Math.random() * wordElement.offsetHeight) + "px";
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

function createEmoji() {
    const emojiElement = document.createElement("div");
    emojiElement.classList.add("emoji");
    emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    emojiElement.style.left = Math.random() * 100 + "vw";
    emojiElement.style.top = Math.random() * 100 + "vh";

    emojiElement.style.animationDuration = (Math.random() * 6 + 8) + "s";
    if (Math.random() > 0.5) {
        emojiElement.style.animationDirection = "reverse";
    }
    document.body.appendChild(emojiElement);
}