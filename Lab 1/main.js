// SHAME
{

    //const liczba1 = document.querySelector('#liczba1')
    //const liczba2 = document.querySelector('#liczba2')
    //const liczba3 = document.querySelector('#liczba3')
    //const liczba4 = document.querySelector('#liczba4')
    //const btnPrzelicz = document.querySelector('#przelicz')
    //const wynikiPojemnik = document.querySelector('#wyniki')
    
    //btnPrzelicz.addEventListener('click', () => {
        //const liczby = [liczba1, liczba2, liczba3, liczba4].map(input => Number(input.value));
        
        //const suma = liczby[0] + liczby[1] + liczby[2] + liczby[3];
        //const srednia = suma / liczby.length;
        //const min = Math.min(...liczby);
        //const max = Math.max(...liczby);
        
        //wynikiPojemnik.innerHTML = `Suma: ${suma}<br/>Średnia: ${srednia}<br/>Minimum: ${min}<br/>Maksimum: ${max}`;
    //})
}
    
// ZIEEW
{
    //const liczba1 = document.querySelector('#liczba1')
    //const liczba2 = document.querySelector('#liczba2')
    //const liczba3 = document.querySelector('#liczba3')
    //const liczba4 = document.querySelector('#liczba4')
    //const wynikiPojemnik = document.querySelector('#wyniki')
    //const btnPrzelicz = document.querySelector('#przelicz');

    //if (btnPrzelicz) {
    //    btnPrzelicz.remove();
    //}
    
    //const przelicz = () => {
    //    const liczby = [liczba1, liczba2, liczba3, liczba4].map(input => Number(input.value));
        
    //    const suma = liczby[0] + liczby[1] + liczby[2] + liczby[3];
    //    const srednia = suma / liczby.length;
    //    const min = Math.min(...liczby);
    //    const max = Math.max(...liczby);
        
    //    wynikiPojemnik.innerHTML = `Suma: ${suma}<br/>Średnia: ${srednia}<br/>Minimum: ${min}<br/>Maksimum: ${max}`;
    //}
    
    //[liczba1, liczba2, liczba3, liczba4].forEach(input => input.addEventListener('input', przelicz));
}

// NORMAL
{
    const container = document.querySelector('#pola');
    const addButton = document.querySelector('#dodaj');
    const wynikiPojemnik = document.querySelector('#wyniki');

    let inputs = ['liczba1', 'liczba2', 'liczba3'];

    document.addEventListener('DOMContentLoaded', () => {
        inputs.forEach(addRemoveButton);
    });

    addButton.addEventListener('click', () => {
        let newInputId = `liczba${inputs.length + 1}`;
        inputs.push(newInputId);
        addInput(newInputId);
    });

    const createButton = (inputId) => {
        const newButton = document.createElement('button');
        newButton.textContent = '-';
        newButton.id = `button${inputId}`;
        newButton.addEventListener('click', () => {
            removeInput(inputId);
        });
        return newButton;
    }

    const addRemoveButton = (inputId) => {
        const input = document.querySelector(`#${inputId}`);
        const newButton = createButton(inputId);
        input.parentNode.insertBefore(newButton, input.nextSibling);
        input.addEventListener('input', () => {
            newButton.style.display = input.value ? 'none' : 'inline';
            calculate();
        });
        input.dispatchEvent(new Event('input'));
    }

    const addInput = (inputId) => {
        const newLabel = document.createElement('label');
        newLabel.textContent = `Liczba ${inputs.length}: `;
        newLabel.id = `label${inputId}`;

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = inputId;

        const newButton = createButton(inputId);

        newInput.addEventListener('input', () => {
            newButton.style.display = newInput.value ? 'none' : 'inline';
            calculate();
        });

        newInput.dispatchEvent(new Event('input'));

        const breakLine = document.createElement('br');
        breakLine.id = `br${inputId}`;

        container.appendChild(newLabel);
        container.appendChild(newInput);
        container.appendChild(newButton);
        container.appendChild(breakLine);
    }

    const removeInput = (inputId) => {
        const inputToRemove = document.querySelector(`#${inputId}`);
        
        if (inputToRemove.value) {
            return;
        }

        let index = inputs.indexOf(inputId);
        if (index > -1) {
            inputs.splice(index, 1);
        }

        const labelToRemove = inputToRemove.previousSibling;
        const buttonToRemove = document.querySelector(`#button${inputId}`);
        const breakLineToRemove = document.querySelector(`#br${inputId}`);

        container.removeChild(labelToRemove);
        container.removeChild(inputToRemove);
        container.removeChild(buttonToRemove);
        container.removeChild(breakLineToRemove);

        updateLabels();
    }

    const updateLabels = () => {
        for (let i = 0; i < inputs.length; i++) {
            const label = document.querySelector(`#label${inputs[i]}`);
            const input = document.querySelector(`#${inputs[i]}`);
            const button = document.querySelector(`#button${inputs[i]}`);
            const breakLine = document.querySelector(`#br${inputs[i]}`);

            let newId = `liczba${i + 1}`;

            label.textContent = `Liczba ${i + 1}: `;
            label.id = `label${newId}`;
            input.id = newId;
            button.id = `button${newId}`;
            breakLine.id = `br${newId}`;

            inputs[i] = newId;
        }
    }

    const calculate = () => {
        const liczby = inputs.map(inputId => Number(document.querySelector(`#${inputId}`).value));

        const suma = liczby.reduce((a, b) => a + b, 0);
        const srednia = suma / liczby.length;
        const min = Math.min(...liczby);
        const max = Math.max(...liczby);

        wynikiPojemnik.textContent = `Suma: ${suma}\nŚrednia: ${srednia}\nMinimum: ${min}\nMaksimum: ${max}`;
    }
}