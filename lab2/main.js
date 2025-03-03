let cart = [];
let itemCount = 0;

//###### ADD / REMOVE / CHECK - Корзина

/**
 * @description - система добавления товара в массив корзины
 */

function addToCart(productName, productPrice) {
    const productInCart = cart.find(item => item.name === productName);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    itemCount += 1;
    displayCart();
    document.getElementById('itemCount').innerHTML = itemCount;
}

/**
 * @description - функция обновления содержания корзины
 */

function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `Имя: <font class="items">${item.name}</font>, Цена: <font class="items">${item.price}₽</font>, Количество: <font class="items">${item.quantity}</font>
        <button class="remove" onclick="removeFromCart('${item.name}')">Удалить</button>`;
        cartContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    const totalElement = document.getElementById('total');
    totalElement.innerHTML = `<p>Итого: <font class="count">${total}₽</font></p>`;
}

/**
 * @description - функция удаления с массива
 */

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    console.log(index);
    if (index > -1) {
        cart[index].quantity > 1 ? cart[index].quantity -= 1 : cart.splice(index, 1);
        itemCount -= 1;
    }
    displayCart(); // Обновляем отображение корзины
    document.getElementById('itemCount').innerHTML = itemCount;
}

//###### LIKE / DISLIKE

function toggleLike(button) {
    const dislikeButton = document.getElementById('dislikeButton');//dislike
    button.classList.toggle('active');//добавление / удаление like
    if (button.classList.contains('active')) {//если есть в лайке
        dislikeButton.classList.remove('active');//убираем актив а дислайте, пока в лайке toggle добавляет active
    }
}

function toggleDislike(button) {//анологично
    const likeButton = document.getElementById('likeButton');
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        likeButton.classList.remove('active');
    }
}

function toggleLikeDefault(event) {
    event.classList.toggle('active');//[on/off] active
}

//###### СПИСОК

let numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));

function displayNumbers() {//функция обновления списка
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = ''; // Очистить список перед отображением
    numbers.forEach(number => {//промежимся по массиву
        const li = document.createElement('li');//сосдадим li список
        li.textContent = number;//ну и внесес в него содержание текста
        numberList.appendChild(li);//добавим это содержание
    });
}

//сортировка по убыванию / уменьшению при вызове функции

/**
 * @params {string} order
 */

function sortItems(order) {//сортировка при вызове с кнопки onClick
    if (order === 'asc') {
        numbers.sort((a, b) => a - b);
    } else if (order === 'desc') {
        numbers.sort((a, b) => b - a);
    }
    displayNumbers();
}

function resetItems() {//сброс при вызове onClick
    numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    displayNumbers();
}

//##### Координаты мышки

document.addEventListener('pointerdown', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const targetElement = event.target.tagName.toLowerCase();//нижний регистр
    document.getElementById('mouse_point').innerHTML = `X: <font class="items"> ${x}</font>, Y:<font class="items"> ${y} </font> - <font class="count">${targetElement}</font>`;
});

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const targetElement = event.target.tagName.toLowerCase();//нижний регистр
    document.getElementById('mouse_move').innerHTML = `<br>X: <font class="items"> ${x}</font>, Y:<font class="items"> ${y} </font> - <font class="count">${targetElement}</font>`;
});

// Сначала отображаем случайные числа
displayNumbers();
displayCart();