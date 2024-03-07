let positionX = 0;
let currentImage = 5;

const anim = setInterval(() => {
    const box = document.querySelector('#slider-inner');
    const firstImage = box.querySelector('img');
    box.style.transform = `translate(${positionX}px, 0px)`;
    positionX--;

    if (firstImage.getBoundingClientRect().right <= 0) {
        box.appendChild(firstImage);
        positionX = 0;
    }
}, 10);

function showNextImage() {
    const images = document.querySelectorAll('#slider-inner img');
    images.forEach(img => img.style.display = 'none');
    if (currentImage < 1) {
        currentImage = images.length;
    }
    const nextImage = document.getElementById('image' + currentImage);
    nextImage.style.display = 'block';
    
    const radios = document.querySelectorAll('input[type=radio]');

    radios[currentImage - 1].checked = true;
    
    currentImage--;
}

function changeImage(imageNumber) {
    const images = document.querySelectorAll('#slider-inner img');
    images.forEach(img => img.style.display = 'none');
    const selectedImage = document.getElementById('image' + imageNumber);
    selectedImage.style.display = 'block';
    
    currentImage = imageNumber;
}

setInterval(showNextImage, 3000);