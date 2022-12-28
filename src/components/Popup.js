export default class Popup {
    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.closeByEsc.bind(this));
    }

    open() {
        this._popupItem.classList.add('popup_opened');
        document.addEventListener('keydown', this.closeByEsc.bind(this))
    }

    closeByEsc(e) {
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
