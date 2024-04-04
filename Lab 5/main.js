let res = document.querySelector('#result');
let input = document.querySelector('#inputs input');
let sumButton = document.querySelector('#sum');
let time1 = document.querySelector('#time1');
let numbers = [];

//generating numbers from 1 to 100
for (let i = 1; i <= 100; i++) {
    numbers.push(i);
}
let output = numbers.join(' ');
console.log(output);


async function updateResult() {
    let numbers = input.value.split(' ').map(parseFloat);

    let result = await asyncAddMultiple(...numbers);
    res.innerHTML = 'Wynik: ' + result;
}

const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(a+b)
      }, 10)
    })
}

const asyncAddMultiple = async (...args) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'number') {
            return Promise.reject('Wszystkie argumenty muszą być liczbami!');
        }
        sum = await asyncAdd(sum, args[i]);
    }
    return sum;
};

async function measureExecutionTime(func) {
    const start = performance.now();

    await func();

    const end = performance.now();
    const time = end - start;

    return time;
}

sumButton.addEventListener('click', async () => {
    const time = await measureExecutionTime(updateResult);
    time1.innerHTML = ` Czas obliczeń: ${time.toFixed(2)}ms`;
});