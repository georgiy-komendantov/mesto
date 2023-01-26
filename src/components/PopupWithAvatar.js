import Popup from './Popup.js';
import {selectors} from "./utils/consts";

export default class PopupWithAvatar extends Popup {
    constructor(popupSelector, { callbackSubmitForm, inputAvatar, getUserInfo, setAvatar }) {
        super(popupSelector);
        this._popupFormItem = this._popupItem.querySelector('.popup__form');
        this._callbackSubmitForm = callbackSubmitForm;
        this._inputAvatar = inputAvatar;
        this._getUserInfo = getUserInfo;
        this._setAvatar = setAvatar;
        this._buttonSubmit = this._popupFormItem.querySelector(selectors.submitButtonSelector);
        this._textButton = this._buttonSubmit.textContent;
    }

    changeButtonTextForLoad() {
        this._textButton = this._buttonSubmit.textContent;
        this._buttonSubmit.textContent = "Сохранение...";
    }

    resetButtonTextBeforeLoad() {
        this._buttonSubmit.textContent = this._textButton;
    }

    open(_id, cardRemove) {
        super.open()
        this._id = _id;

        this._getUserInfo().then((result)=>{
           this._inputAvatar.value = result.avatar;
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupFormItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.changeButtonTextForLoad();
            this._callbackSubmitForm(this._id).then((res) => {
                this._setAvatar(res.avatar);
                this.resetButtonTextBeforeLoad();
            })
            super.close();
        });
    }
}