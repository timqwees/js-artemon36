
/*Напишите функцию convertTemperature, которая принимает два параметра: 
значение температуры и направление преобразования. 
Функция возвращает в виде строки температуру в других единицах измерения.*/
function convertTemperature(temp, direction) {
    if (direction === 'toC') {
        const celsius = (temp - 32) * 5 / 9;
        return `${celsius} C`;
    } else if (direction === 'toF') {
        const fahrenheit = temp * 9 / 5 + 32;
        return `${fahrenheit} F`;
    }
    return 'Invalid переменная';
}
console.log(convertTemperature(100, 'toC'));

//Триугольник (расчет площади и периметра по формуле Герона)
function triangle(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
        console.log('треугольника не существует');
        return;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = a + b + c;
    const ratio = perimeter / area;

    console.log('треугольник существует');
    console.log(`периметр = ${perimeter}`);
    console.log(`Площадь = ${area}`);
    console.log(`Соотношение = ${ratio}`);
}
console.log(triangle(3, 4, 5));

// Fizz - Buzz (работа с усовиями проверок на кратность)
/*Создайте переменную с целым числом и напишите цикл, 
который проходит от 0 до указанного в переменной значения 
и если текущее значение четно, то в консоль выводится buzz, 
если нечетно fizz, если число делится на 5 - fizz buzz. */
function fizzBuzz(limit) {
    for (let i = 0; i <= limit; i++) {
        let output = '';
        if (i % 3 === 0) {
            output += 'buzz';
        }
        if (i % 5 === 0) {
            output += 'fizz';
        }
        if (output === '') {
            output = i;
        }
    }
}
console.log(fizzBuzz(100));
// Елка путем повторования строк
/*Напишите программу, которая создает одну строку, 
представляющую елку, используя для разделения строк символы новой строки.
 В слоях елки чередуются ”*” и ”#” и на 
каждой строке символов больше на один, а в последнем ствол из символов ||. */
function generateChristmasTree(height) {
    let tree = '';
    for (let i = 1; i <= height; i++) {
        const spaces = ' '.repeat(height - i);
        const symbols = (i % 2 === 1 ? '*' : '#').repeat(2 * i - 1);
        tree += spaces + symbols + '\n';
    }
    tree += ' '.repeat(height - 1) + '||';
    return tree;
}
console.log(generateChristmasTree(5));
// Деление
/*
Напишите код, который проверяет,
 делится ли нацело число n на два числа x И y.
 Все входные данные - положительные ненулевые числа и хранятся в переменных. */
function isDivisible(n, x, y) {
    return n % x === 0 && n % y === 0;
}
console.log(isDivisible(3, 3, 4));
// Сэндвичи с сыром
/**
Для сэндвича требуется два ломтика хлеба и 
один ломтик сыра. Напишите функцию, которая посчитает максимально
 возможное количество сэндвичей. 
Информация о количестве ингридиентов храниться в объекте.
 */
function countSandwiches(ingredients) {
    const breadCount = ingredients.bread; // точечная нотация
    const cheeseCount = ingredients.cheese; // точечная нотация
    return Math.min(Math.floor(breadCount / 2), cheeseCount); // Возвращаем минимальное количество сэндвичей
}
console.log(countSandwiches({ bread: 20, cheese: 10 }));
// Абсолютное значение (: boolean)
/*
Напишите функцию absValue без Math.abs(x), 
которая в качестве параметра принимает
 число и возвращает его абсолютное значение (по модулю). */
function absValue(x) {
    return x < 0 ? -x : x;
}
console.log(absValue(-3));
// Случайные числа
/*
Используя методы объекта Math создать функцию, 
которая возвращает целое случайно сгенерированное
число в диапазоне от min до max. */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomNumber(0, 10));
// Значения из массива
/*
Используя функцию из прошлой задачи, 
реализовать функцию, которая возвращает случайные значения из массива 
в заданном количестве в виде нового массива. */
function sampleArray(arr, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = randomNumber(0, arr.length - 1);
        result.push(arr[randomIndex]);
    }
    return result;
}
console.log(sampleArray([1, 2, 3, 4, 5], 3));
// Фильтрация массива
/**Напишите функцию, которая является аналогом метода filter у массива. Функция в качестве параметров принимает сам массив и функцию-фильтр, а возвращает новый массив с элементами прошедшими отбор. Элемент прошел отбор, если функция-фильтр вернула истину для него.

Передаваемая функция-фильтр должна работать с одним параметром и возвращать истину или ложь.

В качестве функции-фильтра можете проверять минимальную/минимальную длину строки или деление без остатка. */
function myFilterArray(arr, filterFn) {
    const result = [];
    for (const item of arr) {
        if (filterFn(item)) {
            result.push(item);
        }
    }
    return result;
}
console.log(myFilterArray([1, 2, 3, 4, 5], (x) => x % 2 === 0));
// Равенство чисел с плавающей запятой
/*
Напишите функцию toBeCloseTo, 
которая принимает два числа (num1 и num2) в качестве аргументов и возвращает true, если они приблизительно равны, 
и false в противном случае. Может понадобиться Number.EPSILON. */
function toBeCloseTo(num1, num2) {
    const epsilon = Number.EPSILON;
    return Math.abs(num1 - num2) < epsilon;
}
console.log(toBeCloseTo(0.1 + 0.2, 0.3));