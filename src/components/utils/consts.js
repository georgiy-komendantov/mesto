const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: '.popup__input-error-text',
    inputContainer: '.popup__input-container'
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const profileChangeButton = document.querySelector('.profile__button');

const popupProfileEditWrapper = document.querySelector('.popup_type_profile');
const popupCardAddWrapper = document.querySelector('.popup_type_new-photo');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupAddInputName = document.querySelector('.popup__input_type_topic');
const popupAddInputLink = document.querySelector('.popup__input_type_link');

export {
    selectors, initialCards, profileEditButton, profileChangeButton,
    popupProfileEditWrapper, popupCardAddWrapper, popupInputName,
    popupInputAbout, popupAddInputName, popupAddInputLink,
};