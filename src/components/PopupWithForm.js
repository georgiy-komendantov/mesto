import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackSubmitForm }) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupFormItem = this._popupItem.querySelector('.popup__form');
        this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this.getInputValues());
        });
    }

    getInputValues() {
        this._formValues = {};
        this._inputList.forEach(inputItem => {
            this._formValues[inputItem.name] = inputItem.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._popupFormItem.reset();
    }
}