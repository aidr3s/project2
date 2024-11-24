const images = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
]; // Reemplazar con las rutas de las imágenes de tu elección

let flippedCards = [];
let foundPairs = 0; // Cambio de unidades a parejas
let remainingCount = 16;
let timer;
let seconds = 0;
let minutes = 0;
let isGameStarted = false;

// Selección de elementos del DOM
const startButton = document.getElementById('startButton');
const gameBoard = document.getElementById('gameBoard');
const foundCountDisplay = document.getElementById('foundCount');
const remainingCountDisplay = document.getElementById('remainingCount');
const timerDisplay = document.getElementById('timer');

// Función para iniciar el juego
function startGame() {
    resetGameState();
    updateDisplay();
    clearBoard();
    createCards();
    startTimer();
}

function resetGameState() {
    isGameStarted = true;
    flippedCards = [];
    foundPairs = 0; // Reiniciar parejas encontradas
    remainingCount = 16;
    seconds = 0;
    minutes = 0;
}

function updateDisplay() {
    foundCountDisplay.textContent = foundPairs; // Actualizar parejas encontradas
    remainingCountDisplay.textContent = remainingCount;
    timerDisplay.textContent = "00:00";
}

function clearBoard() {
    gameBoard.innerHTML = '';
    gameBoard.classList.remove('game-over');
}

function createCards() {
    const gameImages = [...images, ...images];
    shuffleArray(gameImages);

    gameImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);
        card.addEventListener('click', () => flipCard(card, img));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, img) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push({ card, img });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.img.src === secondCard.img.src) {
        handleMatch();
    } else {
        setTimeout(resetFlippedCards, 1000);
    }
}

function handleMatch() {
    foundPairs++; // Contar parejas encontradas
    remainingCount -= 2;
    updateDisplay();

    if (remainingCount === 0) {
        clearInterval(timer);
        alert('¡Felicidades, ganaste!');
    }

    flippedCards = [];
}

function resetFlippedCards() {
    flippedCards.forEach(({ card }) => card.classList.remove('flipped'));
    flippedCards = [];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Inicializar el juego al hacer clic en el botón
startButton.addEventListener('click', startGame);
