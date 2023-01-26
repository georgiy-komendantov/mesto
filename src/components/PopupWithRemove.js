import Popup from './Popup.js';

export default class PopupWithRemove extends Popup {
    constructor(popupSelector, { callbackSubmitForm }) {
        super(popupSelector);
        this._popupFormItem = this._popupItem.querySelector('.popup__form');
        this._callbackSubmitForm = callbackSubmitForm;
    }

    open(_id, cardRemove) {
        super.open()
        this._id = _id;
        this._cardRemove = cardRemove;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._id).then((res)=>{
                if (res.ok) {
                    this._cardRemove();
                    super.close();
                }
            });
        });
    }
}