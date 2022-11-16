const setButtonActive = (submitButtonSelector) => {
    const ButtonActive = document.querySelector(submitButtonSelector);
    ButtonActive.setAttribute('disabled', true)
}

const setButtonDisable = (submitButtonSelector) => {
    const ButtonActive = document.querySelector(submitButtonSelector);
    ButtonActive.removeAttribute('disabled');
}

const isValid = (e, formInputs, submitButtonSelector, inputErrorClass) => {
    if (!e.target.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        setButtonActive(submitButtonSelector);


        e.target.classList.add(inputErrorClass);

        if(e.target.value === ''){
            e.target.parentNode.querySelector('label').textContent = 'Вы пропустили это поле.';
        } else if (e.target.validity.tooShort) {
            e.target.parentNode.querySelector('label').textContent = 'Минимальное кол-во символов: 2. Длина текста\nсейчас: ' + e.target.value.length + ' символ.';
        } else if (e.target.validity.tooLong && e.target.type !== 'url') {
            e.target.parentNode.querySelector('label').textContent = 'Максимальное кол-во символов: 30. Длина текста\nсейчас: ' + e.target.value.length + ' символ.';
        } else if (e.target.type === 'url') {
            e.target.parentNode.querySelector('label').textContent = 'Введите адрес сайта.';
        } else {
            e.target.parentNode.querySelector('label').textContent = 'Какая-то ошибка.';
        }

    } else {
        // Если проходит, скроем
        let formEnabled = true;
        formInputs.forEach((formInput) => {
            if(!formInput.validity.valid){
                formEnabled = false
            }
        });
        if(formEnabled) {
            setButtonDisable(submitButtonSelector);
        }

        e.target.classList.remove(inputErrorClass);

        e.target.parentNode.querySelector('label').textContent = '';
    }
};

const enableValidation = ({inputSelector, submitButtonSelector, inputErrorClass}) => {
    const formInputs = document.querySelectorAll(inputSelector);

    formInputs.forEach((formInput) => {
        formInput.addEventListener('input', (e) => {
            isValid(e, formInputs, submitButtonSelector, inputErrorClass)
        });
    });
}

enableValidation({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input-error',
});


enableValidation({
    inputSelector: '.addpopups__input',
    submitButtonSelector: '.addpopups__button-save',
    inputErrorClass: 'addpopups__input-error',
});




