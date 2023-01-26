import api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithRemove from '../components/PopupWithRemove.js'

import './index.css';

import {
    selectors,
    profileEditButton, profileChangeButton,
    popupCardAddWrapper,
    popupAddInputName, popupAddInputLink,
    popupInputName, popupInputAbout, popupProfileEditWrapper,
    profileAvatarButton, popupAddInputAvatar
} from '../components/utils/consts';
import PopupWithAvatar from "../components/PopupWithAvatar";

const popupImageZoom = new PopupWithImage('.popup_type_image');
popupImageZoom.setEventListeners();

const popupRemove = new PopupWithRemove('.popup_type_alert', {
    callbackSubmitForm: (_id) => api.deleteCard(_id)
});
popupRemove.setEventListeners();

const userInfo = new UserInfo({
    userName: '.profile__text',
    userDescription: '.profile__about',
    userAvatar: '.profile__avatar-img',
    getUserInfo: () => api.getUserInfo(),
});


const popupAvatar = new PopupWithAvatar('.popup_type_new-ava', {
    callbackSubmitForm: (_id) => api.patchUserAvatar(_id, popupAddInputAvatar.value),
    inputAvatar: popupAddInputAvatar,
    getUserInfo: () => api.getUserInfo(),
    setAvatar: (avatar) => userInfo.setAvatar({avatar: avatar}),
});
popupAvatar.setEventListeners();


const popupEditeProfile = new PopupWithForm('.popup_type_profile', {
    callbackSubmitForm: (profileData) => {
        api.patchUserInfo(profileData.name, profileData.about).then(result => {
            userInfo.setInfo({
                userName: result.name,
                description: result.about
            });

            popupEditeProfile.resetButtonTextBeforeLoad();
        });

        return popupEditeProfile.close();
    }
});

popupEditeProfile.setEventListeners();

const handleCardClick = function (name, link) {
    popupImageZoom.open(name, link);
};
const handleCardRemove = function (_id, cardRemove) {
    popupRemove.open(_id, cardRemove)
}

const renderCard = function (cardData) {
    const renderCardItem = new Card({
        data: cardData,
        cardSelector: '#elements__container-add',
        handleCardClick: handleCardClick,
        handleCardRemove: handleCardRemove,
        handleCardPutLike: (_id) => api.putLikeOnCard(_id),
        handleCardRemoveLike: (_id) => api.deleteLikeOnCard(_id),
        userData: () => userInfo.getInfo()
    });
    return renderCardItem.makeCard();
};

const renderInitialCards = new Section({
    items: () => api.getCards(),
    renderer: (cardData) => {
        const card = renderCard(cardData);
        renderInitialCards.addItem(card);
    }
}, '.elements');
renderInitialCards.rendererItems();

const popupAddCard = new PopupWithForm('.popup_type_new-photo', {
    callbackSubmitForm: () => {
        api.postNewCard(popupAddInputName.value, popupAddInputLink.value).then((result) => {
            renderInitialCards.addItem(renderCard({
                _id: result._id,
                name: result.name,
                link: result.link,
                likes: result.likes,
                owner: result.owner
            }));

            popupAddCard.resetButtonTextBeforeLoad();
            popupAddCard.close();
        })
    }
});
popupAddCard.setEventListeners();

const addCardValidate = new FormValidator(selectors, popupCardAddWrapper);
addCardValidate.enableValidation();
const editProfileValidate = new FormValidator(selectors, popupProfileEditWrapper);
editProfileValidate.enableValidation();

profileEditButton.addEventListener('click', function () {
    popupEditeProfile.open();
    userInfo.getUpdate().then(() => {
        userInfo.getInfo().then((result) => {
            popupInputName.setAttribute('value', result.userName);
            popupInputAbout.setAttribute('value', result.description);
        })
    })
});

profileChangeButton.addEventListener('click', function () {
    popupAddCard.open();
    addCardValidate.setButtonActive();
});

profileAvatarButton.addEventListener('click', async function () {
    popupAvatar.open();
});
