import {Card} from "./Сard.js";
import {FormValidator} from "./FormValidator.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileChangeButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');

const popupProfileEditWrapper = document.querySelector('.popup_type_profile');
const popupCardAddWrapper = document.querySelector('.popup_type_new-photo');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const elementsContainer = document.querySelector('.elements');

const cardAddForm = popupCardAddWrapper.querySelector('.popup__form');
const profileOpen = popupProfileEditWrapper.querySelector('.popup__form');
const popupAddInputName = document.querySelector('.popup__input_type_topic');
const popupAddInputLink = document.querySelector('.popup__input_type_link');

initialCards.forEach((item) => {
    addCard(item);
});

function addCard(item){
    const newCard = new Card(item, '#elements__container-add')
    newCard.renderCard(elementsContainer)
}

const profileEditFormValidator = new FormValidator(selectors, profileOpen)
profileEditFormValidator.enableValidation()
const cardAddFormValidator = new FormValidator(selectors, cardAddForm)
cardAddFormValidator.enableValidation()

function openProfile(e){
    e.preventDefault();
    setUserData();
    openPopup(popupProfileEditWrapper);
}

function setUserData() {
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
}

function openAddCard(e) {
    e.preventDefault();
    t buttonActive = popupCardAddWrapper.querySelector(selectors.submitButtonSelector);
    cardAddFormValidator._setButtonActive(buttonActive);
    openPopup(popupCardAddWrapper);
}

profileEditButton.addEventListener('click', openProfile);
profileChangeButton.addEventListener('click', openAddCard);


function saveForm(e) {
    e.preventDefault();
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    closePopup(popupProfileEditWrapper);
}

function addElement(e) {
    e.preventDefault();
    addCard({name: popupAddInputName.value, link: popupAddInputLink.value});
    popupAddInputLink.value = '';
    popupAddInputName.value = '';
    closePopup(e.target.closest('.popup'));
}

popupProfileEditWrapper.querySelector('.popup__form').addEventListener('submit', saveForm);
popupCardAddWrapper.querySelector('.popup__form').addEventListener('submit', addElement);