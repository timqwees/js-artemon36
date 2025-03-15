//#### modal__open / modal__close
document.getElementById('registerBtn').addEventListener('click', () => {
    document.getElementById('registrationDialog').showModal();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('registrationDialog').close();
});

document.getElementById('registrationForm').addEventListener('input', (event) => {
    const target = event.target;
    let isValid = false;
    if (target.tagName === 'INPUT') {
        if (!target.validity.valid) {
            target.setAttribute('aria-invalid', 'true');
        } else {
            target.removeAttribute('aria-invalid');
        }
    }

    //check valid

    const status = document.querySelector('[data-nameError]');
    document.getElementById('name').value.length >= 3 ? (status.textContent = '', status.className = '') : (status.textContent = 'Длина имени не должна быть меньше 3 символов!', status.className = 'error');

    //### email

    const status2 = document.querySelector('[data-emailError]');
    document.getElementById('email').value.includes('@') ? (status2.innerText = '', status2.className = '') : (status2.innerText = `Некорректный адрес: ${document.getElementById('email').value}, используйте @`, status2.className = 'error');

    //### password

    const status3 = document.querySelector('[data-passwordError]');
    document.getElementById('password').value.length > 5 ? (status3.innerText = '', status3.className = '') : (status3.innerText = 'Длина пароля не должна быть меньше 5 символов!', status3.className = 'error');

    //### set isValid

    (document.getElementById('name').value.length >= 3 && document.getElementById('email').value.includes('@') && document.getElementById('password').value.length > 5) ? isValid = true : isValid = false;

    //### isValid
    isValid == true ? (document.getElementById('val').disabled = false, document.getElementById('val').style.opacity = '1') : (document.getElementById('val').disabled = true, document.getElementById('val').style.opacity = '.5');
});

/**
 * @params {array} usersArray
 */

let usersArray = [];

document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    for (const [key, value] of formData.entries()) {
        userData[key] = value;
    }
    usersArray.push(userData);
    console.log('Массив пользователей:', usersArray);
    console.log('Добавлен новый пользователь:', userData);
    event.target.reset();
    document.getElementById('registrationDialog').close();
});


//### [OPEN/CLOSE] Password

document.getElementById('showPassword').addEventListener('click', (event) => {
    const type = document.getElementById('password').type === 'password' ? 'text' : 'password';
    document.getElementById('password').type = type;
    event.target.innerText = type === 'password' ? '👁' : '👁‍🗨';
});