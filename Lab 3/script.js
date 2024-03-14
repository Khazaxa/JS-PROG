const clap = document.querySelector('#s1');
const kick = document.querySelector('#s2');
const hihat = document.querySelector('#s3');
const tom = document.querySelector('#s4');

const date = Date.now();
let record = [];
let recording = false;
const sounds = {
    "a": clap, 
    "s": kick, 
    "d": hihat,
    "f": tom
};

function startRecord() {
    record = [];
    recording = true;
    addEventListener("keypress", recordKeyPress);
};

function stopRecord() {
    recording = false;
};

function recordKeyPress(ev) {
    if (!recording) return;
    const key = ev.key;
    const time = Date.now() - date;

    const sound = sounds[key];
    sound.currentTime = 0;
    sound.play();
    record.push({key, time});
};

function playRecord() {
    let lastTime = 0;
    record.forEach(({key, time}) => {
        const sound = sounds[key];
        setTimeout(() => {
            sound.currentTime = 0;
            sound.play();
        }, time - lastTime);
        lastTime = time;
    });
};

document.querySelector('#playRecord').addEventListener('click', playRecord);
document.querySelector('#startRecord').addEventListener('click', startRecord);
document.querySelector('#stopRecord').addEventListener('click', stopRecord);