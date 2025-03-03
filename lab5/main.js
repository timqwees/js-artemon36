//### canclulator степени
function calculateSquareRoot(number) {
    if (number < 0) {
        throw new Error("Число не может быть отрицательным");
    }
    return Math.sqrt(number);//степень
}

//запуск системы
try {
    console.log(calculateSquareRoot(9)); // 3 вызов функции на число 9
    console.log(calculateSquareRoot(-4)); // проверка на наличие ошибки с отрицательным числом
} catch (error) {// в случаи отказа системы
    console.log(error.message);//выводим ошибка с системы
}

//### создание счетчика

/**
 * @desctiption - создание счетчика
 */

function createCounter() {
    let count = 0;//начала 0
    return function () {// вызов функции
        count++;
        return count;
    };
}

const counter1 = createCounter();//при вызове counter1 - вызовиться функция счетчика
console.log(counter1()); // вызвов 1 раз фукнции +1 = 1
console.log(counter1()); // вызов 2 раз функции +1 число = 2

//#### функция интервала

function periodicLogger(message, interval) {//сообщение, тики врмени 1000 => 1с
    let count = 0;
    const timerId = setInterval(() => {// создание функциии интервала времени
        console.log(message);
        count++;
    }, interval);//, interval тики (время) CallBackTask

    return function stopLogger() {//возвраяем функции
        clearInterval(timerId);//очищяем интервал повтора
        console.log(`Логгер остановлен после ${count} интервалов.`);//сообщение
    };
}

/**
 * @description функция остановки интервла
 */

const stopLogger = periodicLogger("Сообщение", 1000);//сообщение, тикит
setTimeout(stopLogger, 5000);//вызов функции остановка времени после 5с

//### получения пользователя
function getUserData(userId, callback) {
    if (typeof userId !== 'number') {
        return callback("userId должен быть числом", null);
    }

    setTimeout(() => {
        const userData = {//функция
            id: userId,//пользовательский id
            name: "Пользователь" + userId,
            email: `timqwees${userId}@gmail.com`
        };
        callback(null, userData);
    }, 1000);
}

// Пример вызова
getUserData(123, (error, userData) => {
    if (error) {
        console.log(error);
    } else {
        console.log(userData);
    }
});

function sendEmail({ emailAddress, subject = "Без темы", message = "это timqwees" }, callback) {
    if (!emailAddress.includes('@')) {//если нету @
        return callback("Неверный адрес электронной почты", null);
    }

    setTimeout(() => {
        callback(null, `Письмо отправлено на ${emailAddress}`);
    }, 1000);
}

// Пример вызова
sendEmail({ emailAddress: "timqwees@gamil.com" }, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});