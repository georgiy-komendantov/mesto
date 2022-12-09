export class FormValidator{
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector
        this._submitButtonSelector = data.submitButtonSelector
        this._inputErrorClass = data.inputErrorClass
        this._inputContainer = data.inputContainer
        this._errorClass = data.errorClass
        this._formElement = formElement

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    }

    _setButtonActive(){
        this._buttonElement.setAttribute('disabled', true)
    }

    _setButtonDisable() {
        this._buttonElement.removeAttribute('disabled');
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement, errorMessage){
        const errorElement = inputElement.closest(this._inputContainer).querySelector(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement){
        const errorElement = inputElement.closest(this._inputContainer).querySelector(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState(){
        if (this._hasInvalidInput(this._inputList)) {
            this._setButtonActive();
        } else {
            this._setButtonDisable();
        }
    }

    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const _this = this;
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                _this._checkInputValidity(inputElement);
                _this._toggleButtonState();
            });
        });
    }

    enableValidation = () => {
        this._setEventListeners();
    }
}