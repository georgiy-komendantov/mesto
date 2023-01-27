const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: '.popup__input-error-text',
    inputContainer: '.popup__input-container'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileChangeButton = document.querySelector('.profile__button');
const profileAvatarButton = document.querySelector('.profile__avatar');

const popupProfileEditWrapper = document.querySelector('.popup_type_profile');
const popupCardAddWrapper = document.querySelector('.popup_type_new-photo');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupAddInputAvatar = document.querySelector('.popup__input_type_avatar');



export {
    selectors, profileEditButton, profileChangeButton,
    popupProfileEditWrapper, popupCardAddWrapper, popupInputName,
    popupInputAbout, profileAvatarButton, popupAddInputAvatar
};