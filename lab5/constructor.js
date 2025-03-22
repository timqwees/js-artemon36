//################### тема ###################
/**
 * Модуль управления темой приложения
 * @module themeManager
 * @type {HTMLElement} Кнопка переключения темы
  */
const themeToggle = document.getElementById('themeToggle');

/** @type {HTMLElement} Корневой HTML элемент */
const html = document.documentElement;

/** 
 * @type {string} Сохраненная тема из localStorage или значение по умолчанию 'light'
 */
const savedTheme = localStorage.getItem('theme') || 'light';

// Устанавливаем начальную тему
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';

/**
 * Обработчик клика по кнопке переключения темы
 * @listens click
 * @function
 */
themeToggle.addEventListener('click', () => {
    /** @type {string} Текущая тема */
    const currentTheme = html.getAttribute('data-theme');

    /** @type {string} Новая тема */
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
});

// //базовый вариант
// const themeToggle = document.getElementById('themeToggle');
// const html = document.documentElement;
// const savedTheme = localStorage.getItem('theme') || 'light';//получаем текущюю тему или устанавливаем светлую
// html.setAttribute('data-theme', savedTheme);//устанавливаем тему
// themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';

// themeToggle.addEventListener('click', () => {
//     const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
//     html.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     themeToggle.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
// });

// //еще базовее вариант
// const themeToggle = document.getElementById('themeToggle');
// themeToggle.textContent = 'Dark Mode';
// document.documentElement.setAttribute('data-theme', 'light');
// themeToggle.addEventListener('click', () => {
//     if (document.documentElement.getAttribute('data-theme') === 'light') {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         themeToggle.textContent = 'Light Mode';
//     } else {
//         document.documentElement.setAttribute('data-theme', 'light');
//         themeToggle.textContent = 'Dark Mode';
//     }
// });

//################### Toast ###################
class Toast {
    constructor(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.element = this.createToastElement();
        this.container = document.getElementById('toastContainer');
    }

    createToastElement() {
        const toast = document.createElement('div');
        toast.className = `toast ${this.type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        const content = document.createElement('div');
        content.className = 'toast-content';
        content.textContent = this.message;

        const closeButton = document.createElement('button');
        closeButton.className = 'toast-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close notification');
        closeButton.onclick = () => this.hide();

        toast.appendChild(content);
        toast.appendChild(closeButton);
        return toast;
    }

    show() {
        this.container.appendChild(this.element);
        this.element.offsetHeight;
        this.element.classList.add('show');
    }

    hide() {
        this.element.classList.remove('show');
        setTimeout(() => {
            this.element.remove();
        }, 300);
    }
}

function showToast(message, type = 'success') {
    const toast = new Toast(message, type);
    toast.show();
}

//################### галерея ###################
const galleryContent = document.getElementById('galleryContent');
const galleryLoader = document.getElementById('galleryLoader');
const refreshButton = document.getElementById('refreshGallery');

async function fetchImages(retryCount = 0) {
    try {
        const response = await fetch('http://194.67.93.117:80/images');

        // Проверяем статус ответа
        if (response.status === 500) {
            throw new Error('Ошибка сервера. Попробуйте позже.');
        }

        if (!response.ok) {
            throw new Error('Не удалось загрузить изображения');
        }

        const data = await response.json();

        // Проверяем, что получили массив изображений
        if (!Array.isArray(data)) {
            throw new Error('Некорректный формат данных');
        }

        displayImages(data);
    } catch (error) {
        if (retryCount < 3) {
            // Показываем сообщение о повторной попытке
            showToast(`Попытка ${retryCount + 1} из 3...`, 'error');
            setTimeout(() => fetchImages(retryCount + 1), 1000 * (retryCount + 1));
        } else {
            showToast('Не удалось загрузить изображения. Пожалуйста, попробуйте позже.', 'error');
        }
    }
}

function displayImages(images) {
    galleryLoader.style.display = 'none';

    if (!images || images.length === 0) {
        galleryContent.innerHTML = '<p>Изображения не найдены</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = image.url;
        const item_alt = document.createElement('div');
        item_alt.className = 'gallery-item-alt';
        item_alt.textContent = image.alt || 'Изображение';

        const caption = document.createElement('div');
        caption.className = 'gallery-item-caption';
        caption.textContent = image.description || 'Без описания';

        item.appendChild(img);
        item.appendChild(caption);
        grid.appendChild(item);
    });

    galleryContent.innerHTML = '';
    galleryContent.appendChild(grid);
}

refreshButton.addEventListener('click', () => {
    galleryLoader.style.display = 'block';
    refreshButton.disabled = true;
    fetchImages().finally(() => {
        refreshButton.disabled = false;
    });
});

//################### температура ###################
const temperatureForm = document.getElementById('temperatureForm');
const submitButton = temperatureForm.querySelector('.submit-button');

temperatureForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        class: document.getElementById('roomNumber').value,
        temp: parseFloat(document.getElementById('temperature').value)//получение температуры (приобразуем в число)
    };

    submitButton.disabled = true;

    try {
        const response = await fetch('http://194.67.93.117:80/temp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();//получение данных в формате json

        if (!response.ok) throw new Error(data.message || 'ошибка');

        showToast(data.message);
        temperatureForm.reset();
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        submitButton.disabled = false;
    }
});


fetchImages();
const demoContainer = document.createElement('div');
demoContainer.style.position = 'fixed';
demoContainer.style.top = '20px';
demoContainer.style.left = '20px';
demoContainer.style.display = 'flex';
demoContainer.style.gap = '10px';
document.body.appendChild(demoContainer);

const successButton = document.createElement('button');
successButton.textContent = 'показать успех';
successButton.onclick = () => showToast('Успешно', 'success');
demoContainer.appendChild(successButton);

const errorButton = document.createElement('button');
errorButton.textContent = 'показать ошибку';
errorButton.onclick = () => showToast('Ошибка', 'error');
demoContainer.appendChild(errorButton);