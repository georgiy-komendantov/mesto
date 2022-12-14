import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';

import {
    initialCards, selectors,
    profileEditButton, profileChangeButton,
    popupCardAddWrapper,
    popupAddInputName, popupAddInputLink,
    popupInputName, popupInputAbout, popupProfileEditWrapper
} from '../components/utils/consts';

const popupImageZoom = new PopupWithImage('.popup_type_image');
popupImageZoom.setEventListeners();

const userInfo = new UserInfo({
    userName: '.profile__text',
    userDescription: '.profile__about'
});

const popupEditeProfile = new PopupWithForm('.popup_type_profile', {
    callbackSubmitForm: (profileData) => {
        userInfo.setInfo({
            userName: profileData.name,
            description: profileData.about
        });
        popupEditeProfile.close();
    }
});

popupEditeProfile.setEventListeners();

const handleCardClick = function (name, link) {
    popupImageZoom.open(name, link);
}

const renderCard = function (cardData) {
    const renderCardItem = new Card(cardData, '#elements__container-add', handleCardClick);
    return renderCardItem.makeCard();
}

const renderInitialCards = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = renderCard(cardData);
        renderInitialCards.addItem(card);
    }
}, '.elements');
renderInitialCards.rendererItems();

const popupAddCard = new PopupWithForm('.popup_type_new-photo', {
    callbackSubmitForm: () => {
        renderInitialCards.addItem(renderCard({
            name: popupAddInputName.value,
            link: popupAddInputLink.value
        }));
        popupAddCard.close();
    }
});
popupAddCard.setEventListeners();

const addCardValidate = new FormValidator(selectors, popupCardAddWrapper);
addCardValidate.enableValidation();
const editProfileValidate = new FormValidator(selectors, popupProfileEditWrapper);
editProfileValidate.enableValidation();

profileEditButton.addEventListener('click', function () {
    popupEditeProfile.open();
    const info = userInfo.getInfo();
    popupInputName.setAttribute('value', info.userName);
    popupInputAbout.setAttribute('value', info.description);
});

profileChangeButton.addEventListener('click', function () {
    popupAddCard.open();
    addCardValidate.setButtonActive();
});