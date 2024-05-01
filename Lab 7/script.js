let beta = 0;
let gamma = 0;
let holeIndex = 0;
let holes = []; 
let startTime = Date.now();
let score = 0;

window.addEventListener('deviceorientation', onDeviceMove);
window.addEventListener('DOMContentLoaded', init);

function init() {
    createHoles(5);
    positionBall();
    requestAnimationFrame(animate);
}

function onDeviceMove(event) {
    beta = event.beta - 90;
    gamma = event.gamma;
}

function createHoles(numberOfHoles) {
    const board = document.getElementById('board');
    for (let i = 0; i < numberOfHoles; i++) {
        let hole = document.createElement('div');
        let number = document.createElement('span');

        hole.className = 'hole';
        number.className = 'number';
        number.textContent = i + 1;

        hole.appendChild(number);
        board.appendChild(hole);
        positionHole(hole);
        holes.push(hole);
    }
}


function positionBall() {
    const boardRect = document.getElementById('board').getBoundingClientRect();
    document.getElementById('ball').style.left = `${boardRect.width / 2}px`;
    document.getElementById('ball').style.top = `${boardRect.height / 2}px`;
}

function positionHole(hole) {
    const boardRect = document.getElementById('board').getBoundingClientRect();
    hole.style.left = `${Math.random() * (boardRect.width - hole.offsetWidth)}px`;
    hole.style.top = `${Math.random() * (boardRect.height - hole.offsetHeight)}px`;
}

function animate() {
    moveBall();
    checkCollision();
    updateTime();
    requestAnimationFrame(animate);
}

function moveBall() {
    const boardRect = document.getElementById('board').getBoundingClientRect();
    const maxAngle = 45;
    const radius = Math.min(boardRect.width, boardRect.height) / 2;
    const x = Math.min(Math.max(0, (gamma / maxAngle) * radius + boardRect.width / 2), boardRect.width - document.getElementById('ball').offsetWidth);
    const y = Math.min(Math.max(0, (beta / maxAngle) * radius + boardRect.height / 2), boardRect.height - document.getElementById('ball').offsetHeight);
    document.getElementById('ball').style.left = `${x}px`;
    document.getElementById('ball').style.top = `${y}px`;
}

function checkCollision() {
    const ballRect = document.getElementById('ball').getBoundingClientRect();
    const holeRect = holes[holeIndex].getBoundingClientRect();
    const distance = Math.sqrt(Math.pow((ballRect.x + ballRect.width / 2) - (holeRect.x + holeRect.width / 2), 2) + Math.pow((ballRect.y + ballRect.height / 2) - (holeRect.y + holeRect.height / 2), 2));

    if (distance < 15) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        holeIndex++;
        if (holeIndex >= holes.length) {
            let time = document.getElementById('time').textContent;
            alert(`All holes completed! Time: ${time}`);
            holeIndex = 0;
        }
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
