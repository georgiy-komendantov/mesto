const setButtonActive = (buttonActive) => {
    buttonActive.setAttribute('disabled', true)
}

const setButtonDisable = (buttonActive) => {
    buttonActive.removeAttribute('disabled');
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const showInputError = (settings, formElement, inputElement, errorMessage) => {
    const errorElement = inputElement.closest(settings.inputContainer).querySelector(settings.errorClass);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (settings, formElement, inputElement) => {
    const errorElement = inputElement.closest(settings.inputContainer).querySelector(settings.errorClass);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        setButtonActive(buttonElement);
    } else {
        setButtonDisable(buttonElement);
    }
};

const checkInputValidity = (settings, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(settings, formElement, inputElement);
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);


    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(settings, formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputContainer: '.popup__input-container',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: '.popup__input-error-text',
};
enableValidation(settings);
