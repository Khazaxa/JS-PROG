// tworzenie img w js
// const img1 = document.createElement('img');
// const img2 = new Image();

// img1.src = "";

// setTimeout(), setInterval()
// setTimeout(() => {
//     console.log('hello')
//     const box = document.querySelector('#slider-inner')
// }, 5000);

let positionX = 0;
const anim = setInterval(() => {
    const box = document.querySelector('#slider-inner');
    const firstImage = box.querySelector('img');
    box.style.transform = `translate(${positionX}px, 0px)`;
    positionX--;

    if (firstImage.getBoundingClientRect().right <= 0) {
        box.appendChild(firstImage);
       // box.style.transform = 'translate(0px, 0px)';
        positionX = 0;
    }
}, 10);

//setTimeout(() => {
//    clearInterval(anim);
//}, 50_000);