function animate() {
    const elapsed = Date.now() - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const hundredths = Math.floor((elapsed % 1000) / 10);
    
    const maxAngle = 45; 
    const boardRect = board.getBoundingClientRect(); 

    const x = (gamma / maxAngle) * (boardRect.width - ball.offsetWidth);
    const y = (beta / maxAngle) * (boardRect.height - ball.offsetHeight);

    // Obliczamy procenty x i y
    const xPercent = (x / boardRect.width) * 100;
    const yPercent = (y / boardRect.height) * 100;

    // Ustawiamy left i top dla piłki na procenty x i y
    ball.style.left = `${xPercent}%`;
    ball.style.top = `${yPercent}%`;

    document.querySelector('#time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;

    counter++
    if (counter % 100 === 0) {
        const time = Date.now()
        const interval = time - lastTime
        console.log(`Render 100 klatek trwał: ${interval} [${1000 / (interval / 100)}fps]`)
        lastTime = time
    }
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)