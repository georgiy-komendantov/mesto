export default class Popup {
    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._popupItem.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-exit')) {
                this.close();
            }
        });
    }
}
