let dishes = [];
let remainingDishes = [];
let errorsCount = 0;

async function loadPizza() {
    const response = await fetch('data/pizza.json');
    dishes = await response.json();
    remainingDishes = [...dishes];
    startQuiz();
}

function startQuiz() {
    const menuSection = document.getElementById('pizza');
    menuSection.innerHTML = '';

    if (remainingDishes.length === 0) {
        showResults();
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingDishes.length);
    const correctDish = remainingDishes[randomIndex];

    let wrongDishes = dishes.filter(d => d.name !== correctDish.name);
    wrongDishes = shuffleArray(wrongDishes).slice(0, 2);

    const options = [
        { text: correctDish.composition, correct: true },
        { text: wrongDishes[0].composition, correct: false },
        { text: wrongDishes[1].composition, correct: false }
    ];

    const shuffledOptions = shuffleArray(options);

    const dishTitle = document.createElement('h2');
    dishTitle.textContent = `Какой состав у пиццы: ${correctDish.name}?`;
    menuSection.appendChild(dishTitle);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.className = "answer-button";

        button.addEventListener('click', () => {
            if (option.correct) {
                remainingDishes.splice(randomIndex, 1);
                startQuiz();
            } else {
                errorsCount++;
                alert('Неправильно! ❌ Следующий вопрос!');
                remainingDishes.splice(randomIndex, 1);
                startQuiz();
            }
        });

        menuSection.appendChild(button);
    });
}

function showResults() {
    const menuSection = document.getElementById('pizza');
    menuSection.innerHTML = '';

    const resultText = document.createElement('p');
    resultText.textContent = `Ошибок: ${errorsCount} из ${dishes.length}`;
    menuSection.appendChild(resultText);

    const backButton = document.createElement('button');
    backButton.textContent = 'На главную';
    backButton.className = "answer-button";
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    menuSection.appendChild(backButton);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

window.onload = loadPizza;
