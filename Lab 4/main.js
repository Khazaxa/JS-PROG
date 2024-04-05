const addButton = document.querySelector('button[type="submit"]');
const dateElement = document.querySelector('#date');

// dates
const nowTimestamp = Date.now()
const now = new Date(nowTimestamp)
console.log(now.toLocaleString())

// localStorage
// zapisywanie
// localStorage.setItem(key, value)
// pobieranie
// localStorage.getItem(key)


addButton.addEventListener('click', function() {
    const formattedDate = now.getFullYear() 
    + '-' + (now.getMonth() + 1).toString().padStart(2, '0') 
    + '-' + now.getDate().toString().padStart(2, '0')
    + '\u00A0\u00A0' + now.getHours().toString().padStart(2, '0')
    + ':' + now.getMinutes().toString().padStart(2, '0')
    + ':' + now.getSeconds().toString().padStart(2, '0');
    dateElement.textContent = formattedDate;
});