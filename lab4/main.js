/**
 * @param {*} event 
 * @param {*} interval 
 * @returns 
 */

function periodicLogger(event, interval) {
    let count = 0;
    const message = document.querySelector('[data-result-test1]');
    const log_mess = setInterval(onMessage);
    event.style.transition = '1s ease-out all';

    const timerId = setInterval(() => {
        event.style.background = 'red';
        event.innerText = 'недоступен';
        count++;
        isValid = true;
    }, 1000);

    setTimeout(stopLogger, interval);

    function onMessage() {
        message.className = 'active';
        message.innerText = `Кнопка будет недосупна в течении: ${count} секунд`;
    }

    function stopLogger() {
        clearInterval(timerId);
        clearInterval(log_mess);
        isValid = false;
        message.classList.remove('active');
        console.log(`Логгер остановлен после ${count} интервалов.`);
        event.style.background = 'none';
        event.innerHTML = `<div class="service-icon-box"><img src = "https://i.postimg.cc/ZqgqrqzG/icon-dev.png" alt = "icon" width = "40" ></div ><div class="service-content-box"><h4 class="h4 service-item-title" data-test1>Активна</h4><p class="service-item-text">Кнопкаактивации/Дисактивации с промежутком времени</p></div>`;
    };

    return timerId;
}



//### 

function getData(probability, dataString) {
    // Добавляем префикс к строке данных
    const prefixedData = `Синтетические данные: ${dataString}`;

    return function (value) {
        // Проверяем, является ли аргумент числом и не NaN
        if (typeof value === 'number' && !isNaN(value)) {
            // Генерируем случайное число от 0 до 1 и сравниваем с вероятностью
            if (Math.random() < probability) {
                return console.log(prefixedData);
            } else {
                return null;
            }
        } else {
            throw new Error("Аргумент должен быть числом и не NaN.");
        }
    };
}

const dataFunction = getData(0.5, "123");
const resultElement = document.getElementById('result');

function button_test() {
    const test2 = document.getElementById('test2').value;
    const number = parseFloat(test2);

    try {
        const result = dataFunction(number);
        resultElement.innerText = result || 'Данные не получены';
    } catch (error) {
        resultElement.innerText = error.message;
    }
};

//new
let selectedItem = null; // Переменная для хранения выбранного предмета

// Функция для проверки результата крафта
function validateCraftingResult(grid) {
    const gridPattern = grid.map(slot => slot.dataset.type || null);

    // Определение рецептов крафта
    const recipes = {
        woodenPickaxe: {
            pattern: [
                'tree', 'tree', 'tree', null, 'wood', null, null, 'wood', null
            ],
            result: 'woodenPickaxe'
        },
        ironPickaxe: {
            pattern: [
                'ironIngot', 'ironIngot', 'ironIngot', null, 'wood', null, null, 'wood', null
            ],
            result: 'ironPickaxe'
        },
        wood: {
            pattern: [
                'tree', 'tree', null, null, null, null, null, null, null
            ],
            result: 'wood'
        },
        wood2: {
            pattern: [
                null, 'tree', 'tree', null, null, null, null, null, null
            ],
            result: 'wood'
        },
        wood3: {
            pattern: [
                null, null, null, 'tree', 'tree', null, null, null, null
            ],
            result: 'wood'
        },
        wood4: {
            pattern: [
                null, null, null, null, 'tree', 'tree', null, null, null
            ],
            result: 'wood'
        },

        wood5: {
            pattern: [
                null, null, null, null, null, null, 'tree', 'tree', null
            ],
            result: 'wood'
        },
        wood6: {
            pattern: [
                null, null, null, null, null, null, null, 'tree', 'tree'
            ],
            result: 'wood'
        },

        wood7: {
            pattern: [
                'tree', null, null, 'tree', null, null, null, null, null
            ],
            result: 'wood'
        },
        wood8: {
            pattern: [
                null, 'tree', null, null, 'tree', null, null, null, null
            ],
            result: 'wood'
        },
        wood9: {
            pattern: [
                null, null, null, 'tree', null, null, 'tree', null, null
            ],
            result: 'wood'
        },
        wood10: {
            pattern: [
                null, null, null, null, 'tree', null, null, 'tree', null
            ],
            result: 'wood'
        },
        wood11: {
            pattern: [
                null, null, null, null, null, 'tree', null, null, 'tree'
            ],
            result: 'wood'
        },
        woodtree: {
            pattern: [
                'tree', 'tree', null, 'tree', 'wood', null, null, 'wood', null
            ],
            result: 'woodtree'
        },
        woodtree2: {
            pattern: [
                null, 'tree', 'tree', null, 'wood', 'tree', null, 'wood', null
            ],
            result: 'woodtree'
        },
        woodiron: {
            pattern: [
                'ironIngot', 'ironIngot', null, 'ironIngot', 'wood', null, null, 'wood', null
            ],
            result: 'woodiron'
        },
        woodiron2: {
            pattern: [
                null, 'ironIngot', 'ironIngot', null, 'wood', 'ironIngot', null, 'wood', null
            ],
            result: 'woodiron'
        }
    };

    // Проверка на совпадение с любым рецептом
    for (const recipe of Object.values(recipes)) {
        if (JSON.stringify(gridPattern) === JSON.stringify(recipe.pattern)) {
            return recipe.result;
        }
    }

    return null;
}

// Добавить обработчик клика для инвентарных предметов
document.querySelectorAll('.inventory-item').forEach(item => {
    item.addEventListener('click', (e) => {
        if (selectedItem) {
            selectedItem.classList.remove('selected');
        }
        selectedItem = item;
        selectedItem.classList.add('selected');
    });
});

// Добавить обработчик клика для слотов крафта
document.querySelectorAll('.craft-slot').forEach(slot => {
    slot.addEventListener('click', (e) => {
        if (selectedItem) {
            const itemType = selectedItem.dataset.type;
            const countSpan = selectedItem.querySelector('.count');
            let count = parseInt(countSpan.textContent, 10);

            // Проверка наличия предмета
            if (count > 0) {
                // Добавление предмета в слот
                slot.innerHTML = `<img src="img/${itemType}.png" alt="${itemType}">`;
                slot.dataset.type = itemType;

                // Уменьшение количества предмета в инвентаре
                count--;
                countSpan.textContent = count;

                // Обновление результата крафта
                updateCraftingResult();
            }
        }
    });
});

// Обновление результата крафта
function updateCraftingResult() {
    const grid = Array.from(document.querySelectorAll('.craft-slot'));
    const result = validateCraftingResult(grid);
    const resultSlot = document.querySelector('.result-slot');

    if (result) {
        resultSlot.innerHTML = `<img src="img/${result}.png" alt="${result}">`;
        resultSlot.dataset.type = result;
    } else {
        resultSlot.innerHTML = '';
        resultSlot.removeAttribute('data-type');
    }
}

// Удалить предмет из ячейки крафта (правый клик)
document.querySelectorAll('.craft-slot').forEach(slot => {
    slot.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const itemType = slot.dataset.type;
        if (itemType) {
            // Удаление предмета из слота
            slot.innerHTML = '';
            slot.removeAttribute('data-type');

            // Возвращение предмета в инвентарь
            const inventoryItem = Array.from(document.querySelectorAll('.inventory-item')).find(item => item.dataset.type === itemType);
            if (inventoryItem) {
                const countSpan = inventoryItem.querySelector('.count');
                let count = parseInt(countSpan.textContent, 10);
                count++; // Увеличение количества предмета
                countSpan.textContent = count;
            }

            // Обновление результата крафта
            updateCraftingResult();
        }
    });
});