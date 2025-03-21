//  тема
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
});

//упрощенная версия


// Toast
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

// галерея
const galleryContent = document.getElementById('galleryContent');
const galleryLoader = document.getElementById('galleryLoader');
const refreshButton = document.getElementById('refreshGallery');

async function fetchImages(retryCount = 0) {
    try {
        const response = await fetch('https://api.example.com/images');
        if (!response.ok) throw new Error('Failed to fetch images');

        const images = await response.json();
        displayImages(images);
    } catch (error) {
        if (retryCount < 3) {
            setTimeout(() => fetchImages(retryCount + 1), 1000 * (retryCount + 1));
        } else {
            showToast('Ошибка при загрузке изображений. Пожалуйста, попробуйте позже.', 'error');
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
        img.alt = image.caption;

        const caption = document.createElement('div');
        caption.className = 'gallery-item-caption';
        caption.textContent = image.caption;

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

// температура
const temperatureForm = document.getElementById('temperatureForm');
const submitButton = temperatureForm.querySelector('.submit-button');

temperatureForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        roomNumber: document.getElementById('roomNumber').value,
        temperature: parseFloat(document.getElementById('temperature').value)
    };

    submitButton.disabled = true;

    try {
        const response = await fetch('https://api.example.com/temperature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

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
successButton.textContent = 'Show Success Toast';
successButton.onclick = () => showToast('Успешно', 'success');
demoContainer.appendChild(successButton);

const errorButton = document.createElement('button');
errorButton.textContent = 'Show Error Toast';
errorButton.onclick = () => showToast('Ошибка', 'error');
demoContainer.appendChild(errorButton);