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
    popupInputName, popupInputAbout, popupProfileEditWrapper,
    profileAvatarButton, popupAddInputAvatar
} from '../components/utils/consts';
import PopupWithAvatar from "../components/PopupWithAvatar";

const popupImageZoom = new PopupWithImage('.popup_type_image');
popupImageZoom.setEventListeners();

const popupRemove = new PopupWithRemove('.popup_type_alert', {
    callbackSubmitForm: (_id) => api.deleteCard(_id).catch((e) => console.log(e))
});
popupRemove.setEventListeners();

const userInfo = new UserInfo({
    userName: '.profile__text',
    userDescription: '.profile__about',
    userAvatar: '.profile__avatar-img',
    getUserInfo: () => Promise.all([api.getUserInfo(), api.getCards()]).then(([userData, cards]) => {
        renderInitialCards.updateItems(cards)
        return userData;
    }).catch((e) => console.log(e)),
    updateCards: () => renderInitialCards.rendererItems()
});

const renderInitialCards = new Section({
    renderer: (cardData) => {
        const card = renderCard(cardData);
        renderInitialCards.addItem(card);
    }
}, '.elements');

const popupAvatar = new PopupWithAvatar('.popup_type_new-ava', {
    selectors: selectors,
    callbackSubmitForm: (getInputValues) => {
        api.patchUserAvatar(getInputValues.link)
            .then((res) => {
                if (res) {
                    userInfo.getUpdate(res)
                    popupAvatar.close()
                }
            })
            .catch((e) => console.log(e))
            .finally(() => {
                popupAvatar.resetButtonTextBeforeLoad()
            })
    },
    inputAvatar: popupAddInputAvatar,
    getUserInfo: () => api.getUserInfo().catch((e) => console.log(e)),
});
popupAvatar.setEventListeners();

const popupEditeProfile = new PopupWithForm('.popup_type_profile', {
    callbackSubmitForm: (profileData) => {
        api.patchUserInfo(profileData.name, profileData.about).then(result => {
            if (result) {
                userInfo.getUpdate(result)
                popupEditeProfile.close();
            }
        }).catch((e) => console.log(e))
            .finally(() => {
                popupEditeProfile.resetButtonTextBeforeLoad();
            });
    },
    selectors: selectors,
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
        handleCardPutLike: (_id) => api.putLikeOnCard(_id).catch((e) => console.log(e)),
        handleCardRemoveLike: (_id) => api.deleteLikeOnCard(_id).catch((e) => console.log(e)),
        userData: () => userInfo.getInfo().catch((e) => console.log(e))
    });
    return renderCardItem.makeCard();
};

const popupAddCard = new PopupWithForm('.popup_type_new-photo', {
    callbackSubmitForm: (getInputValues) => {
        api.postNewCard(getInputValues.topic, getInputValues.link).then((result) => {
            if (result) {
                renderInitialCards.addItem(renderCard({
                    _id: result._id,
                    name: result.name,
                    link: result.link,
                    likes: result.likes,
                    owner: result.owner
                }));
                popupAddCard.close();
            }
        })
            .catch((e) => console.log(e))
            .finally(() => {
                popupAddCard.resetButtonTextBeforeLoad();
            });
    },
    selectors: selectors,
});
popupAddCard.setEventListeners();

const addCardValidate = new FormValidator(selectors, popupCardAddWrapper);
addCardValidate.enableValidation();
const editProfileValidate = new FormValidator(selectors, popupProfileEditWrapper);
editProfileValidate.enableValidation();

profileEditButton.addEventListener('click', function () {
    popupEditeProfile.open();
    userInfo.getInfo().then((result) => {
        popupInputName.setAttribute('value', result.userName);
        popupInputAbout.setAttribute('value', result.description);
    }).catch((e) => console.log(e));
});

profileChangeButton.addEventListener('click', function () {
    popupAddCard.open();
    addCardValidate.setButtonActive();
});

profileAvatarButton.addEventListener('click', async function () {
    popupAvatar.open();
});
