import PopupWithForm from "./PopupWithForm";

export default class PopupWithAvatar extends PopupWithForm {
    constructor(popupSelector, { callbackSubmitForm, selectors, inputAvatar, getUserInfo }) {
        super(popupSelector, { callbackSubmitForm, selectors })
        this._popupFormItem = this._popupItem.querySelector('.popup__form');
        this._callbackSubmitForm = callbackSubmitForm;
        this._inputAvatar = inputAvatar;
        this._getUserInfo = getUserInfo;
        this._buttonSubmit = this._popupFormItem.querySelector(selectors.submitButtonSelector);
        this._textButton = this._buttonSubmit.textContent;
    }

    open(_id, cardRemove) {
        super.open()
        this._getUserInfo().then((result)=>{
           this._inputAvatar.value = result.avatar;
        }).catch((e)=>console.log(e));
    }
}