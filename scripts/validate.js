const setButtonActive = (buttonActive) => {
    buttonActive.setAttribute('disabled', true)
}

const setButtonDisable = (buttonActive) => {
    buttonActive.removeAttribute('disabled');
}

const isValid = (e, settings) => {
    if (!e.target.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку

        const buttonActive = e.target.closest(settings.formSelector).querySelector(settings.submitButtonSelector);
        setButtonActive(buttonActive);

        e.target.classList.add(settings.inputErrorClass);

        // Кастомные тексты ошибок есть в описании и видеозаписям к заданиям. !!!
        if(e.target.value === ''){
            e.target.parentNode.querySelector('.popup__input-error-text').textContent = 'Вы пропустили это поле.';
        } else if (e.target.validity.tooShort) {
            e.target.parentNode.querySelector('.popup__input-error-text').textContent = 'Минимальное кол-во символов: 2. Длина текста\nсейчас: ' + e.target.value.length + ' символ.';
        } else if (e.target.validity.tooLong && e.target.type !== 'url') {
            e.target.parentNode.querySelector('.popup__input-error-text').textContent = 'Максимальное кол-во символов: 30. Длина текста\nсейчас: ' + e.target.value.length + ' символ.';
        } else if (e.target.type === 'url') {
            e.target.parentNode.querySelector('.popup__input-error-text').textContent = 'Введите адрес сайта.';
        }
    } else {
        // Кнопка должна оставаться выключенной, пока все input формы не проходят валидацию
        let formEnabled = true;

        e.target.closest(settings.formSelector).querySelectorAll(settings.inputSelector)
            .forEach((formInput) => {
            if(!formInput.validity.valid){
                formEnabled = false
            }
        });

        if(formEnabled) {
            const buttonActive = e.target.closest(settings.formSelector).querySelector(settings.submitButtonSelector);
            setButtonDisable(buttonActive);
        }

        e.target.classList.remove(settings.inputErrorClass);

        e.target.parentNode.querySelector('.popup__input-error-text').textContent = '';
    }
};

const setEventListeners = (formInputs, settings) => {
    formInputs.forEach((formInput) => {
        formInput.addEventListener('input', (e) => {
            isValid(e, settings)
        });
    });
};

const enableValidation = (settings) => {
    const formInputs = document.querySelectorAll(settings.inputSelector);
    setEventListeners(formInputs, settings);
};

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input-error',
};

enableValidation(settings);
