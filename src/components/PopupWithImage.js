import Popup from './Popup.js';

export default class extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupText = document.querySelector('.popup__text');
        this._popupImg = document.querySelector('.popup__img');
    }

    open(description, image) {
        this._popupText.textContent = description;
        this._popupImg.src = image;
        this._popupImg.alt = description;
        super.open();
    }
}