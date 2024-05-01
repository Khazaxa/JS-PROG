let beta = 0;
let gamma = 0;
let counter = 0;
let lastTime = Date.now();
let startTime = Date.now();
let score = 0;

window.addEventListener('deviceorientation', onDeviceMove);
window.addEventListener('DOMContentLoaded', init);

function init() {
    positionBallAndHole();
    requestAnimationFrame(animate);
}

function onDeviceMove(event) {
    beta = event.beta - 90;
    gamma = event.gamma;
}

function positionBallAndHole() {
    const boardRect = document.getElementById('board').getBoundingClientRect();

    document.getElementById('ball').style.left = `${boardRect.width / 2}px`;
    document.getElementById('ball').style.top = `${boardRect.height / 2}px`;

    const hole = document.querySelector('.hole');
    const maxLeft = boardRect.width - hole.offsetWidth;
    const maxTop = boardRect.height - hole.offsetHeight;
    hole.style.left = `${Math.random() * maxLeft}px`;
    hole.style.top = `${Math.random() * maxTop}px`;
}

function animate() {
    const boardRect = document.getElementById('board').getBoundingClientRect();
    const maxAngle = 45; 
    const radius = Math.min(boardRect.width, boardRect.height) / 2;
    const x = Math.min(Math.max(0, (gamma / maxAngle) * radius + boardRect.width / 2), boardRect.width - document.getElementById('ball').offsetWidth);
    const y = Math.min(Math.max(0, (beta / maxAngle) * radius + boardRect.height / 2), boardRect.height - document.getElementById('ball').offsetHeight);

    document.getElementById('ball').style.left = `${x}px`;
    document.getElementById('ball').style.top = `${y}px`;

    checkCollision();
    updateTime();
    requestAnimationFrame(animate)
}

function checkCollision() {
    const ballRect = document.getElementById('ball').getBoundingClientRect();
    const holeRect = document.querySelector('.hole').getBoundingClientRect();
    const distance = Math.sqrt(Math.pow((ballRect.x + ballRect.width / 2) - (holeRect.x + holeRect.width / 2), 2) + Math.pow((ballRect.y + ballRect.height / 2) - (holeRect.y + holeRect.height / 2), 2));

    if (distance < 15) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        positionBallAndHole();
    }
}

function updateTime() {
    const now = Date.now();
    const elapsed = now - startTime;

    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const centiseconds = Math.floor((elapsed % 1000) / 10);

    document.getElementById('time').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}
