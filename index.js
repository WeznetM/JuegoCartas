// script.js
const numCards = 16; // Número de cartas (8 pares)
let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 100;
let timer;

function init() {
    generateCards();
    renderCards();
    startTimer();
}

function generateCards() {
    const images = [
        "img/cartasP.jpeg",
        "img/celu.jpeg",
        "img/linux.jpeg",
        "img/compu.jpeg",
        "img/mario.jpeg",
        "img/ropa.jpeg",
        "img/signo.jpeg",
        "img/mouse.jpeg"
    ];

    const imagesToUse = images.slice(0, numCards / 2);
    const duplicatedImages = [...imagesToUse, ...imagesToUse];

    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * duplicatedImages.length);
        const randomImage = duplicatedImages.splice(randomIndex, 1)[0];
        cards.push({ image: randomImage, isFlipped: false });
    }
}

function renderCards() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.isFlipped || matchedCards.includes(index)) {
            const img = document.createElement('img');
            img.src = card.image;
            cardElement.appendChild(img);
        } else {
            cardElement.textContent = ' ';
        }
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', () => cardClick(index));
        gameContainer.appendChild(cardElement);
    });
}

function cardClick(index) {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
        cards[index].isFlipped = true;
        flippedCards.push(index);
        renderCards();
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCardIndex, secondCardIndex] = flippedCards;
    if (cards[firstCardIndex].image === cards[secondCardIndex].image) {
        matchedCards.push(firstCardIndex, secondCardIndex);
        if (matchedCards.length === numCards) {
            endGame('¡Felicidades! Has encontrado todos los pares de cartas.');
        }
    } else {
        score -= 10;
        updateScore();
        if (score <= 0) {
            endGame('¡Eres débil BAKII!');
        } else {
            cards[firstCardIndex].isFlipped = false;
            cards[secondCardIndex].isFlipped = false;
        }
    }
    flippedCards = [];
    renderCards();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    let minutes = 3;
    let seconds = 0;
    timer = setInterval(() => {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            endGame('¡Tiempo agotado! Intenta de nuevo.');
        }
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function endGame(message) {
    clearInterval(timer);
    alert(message);
}

function restartGame() {
    cards = [];
    flippedCards = [];
    matchedCards = [];
    score = 100;
    clearInterval(timer);
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = '3:00';
    init();
}

init();
