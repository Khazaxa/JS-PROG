const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const btnPrzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')

btnPrzelicz.addEventListener('click', () => {
    const liczby = [liczba1, liczba2, liczba3, liczba4].map(input => Number(input.value));

    const suma = liczby[0] + liczby[1] + liczby[2] + liczby[3];
    const srednia = suma / liczby.length;
    const min = Math.min(...liczby);
    const max = Math.max(...liczby);

    wynikiPojemnik.innerHTML = `Suma: ${suma}<br/>Średnia: ${srednia}<br/>Minimum: ${min}<br/>Maksimum: ${max}`;
})