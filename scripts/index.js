const profileEditButton = document.querySelector('.profile__edit-button');
const profileChangeButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');

const popupProfileEditWrapper = document.querySelector('.popup_type_profile');
const popupCardAddWrapper = document.querySelector('.popup_type_new-photo');
const popupPhoto = document.querySelector('.popup_type_image');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupPhotoImg = document.querySelector('.popup__img');
const popupPhotoText = document.querySelector('.popup__text');

const popupAddInputName = document.querySelector('.popup__input_type_topic');
const popupAddInputLink = document.querySelector('.popup__input_type_link');

const elementsContainer = document.querySelector('.elements');
const elementsContainerAdd = document.querySelector('#elements__container-add');


initialCards.forEach((item) => {
    addCard(item.link, item.name);
});

function addCard(link, name){
    const card = createCardTemplate(link, name);
    elementsContainer.prepend(card);
}

function createCardTemplate(link, name) {
    const addCard = elementsContainerAdd.cloneNode(true)?.content;
    addCard.querySelector('.elements__card-img').setAttribute('src', link);
    addCard.querySelector('.elements__card-img').setAttribute('alt', name);
    addCard.querySelector('.elements__card-text').textContent = name;

    const card = addCard.querySelector('.elements__card');
    card.querySelector('.elements__card-delete').addEventListener('click', deleteCard);
    card.querySelector('.elements__card-like').addEventListener('click', likeButton);
    card.querySelector('.elements__card-img').addEventListener('click', openPhotoCard);

    return card;
}

function addElement(e) {
    e.preventDefault();
    addCard(popupAddInputLink.value, popupAddInputName.value);

    popupAddInputLink.value = '';
    popupAddInputName.value = '';

    closePopup(e.target.closest('.popup'));
}

function saveForm(e) {
    e.preventDefault();

    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;

    closePopup(popupProfileEditWrapper);
}

function likeButton(e) {
    e.target.classList.toggle('elements__card-like_active');
}

function deleteCard(e) {
    const card = e.target.closest('.elements__card');
    e.target.removeEventListener('click', deleteCard);
    card.querySelector('.elements__card-like').removeEventListener('click', likeButton);
    card.querySelector('.elements__card-img').removeEventListener('click', openPhotoCard);
    card.remove();
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', exitPopup);
    document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', exitPopup);
    document.removeEventListener('keydown', closePopupByEsc)
}

function exitPopup(e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-exit')) {
        closePopup(e.currentTarget);
    }
}

function closePopupByEsc (e) {
    if (e.key === 'Escape')  {
        const statusEnabled = document.querySelector('.popup_opened');
        closePopup(statusEnabled);
    }
}

function setPhotoData(e) {
    popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
    popupPhotoImg.setAttribute('alt', e.target.getAttribute('alt'));
    popupPhotoText.textContent = e.target.closest('.elements__card').querySelector('.elements__card-text').textContent;
}

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

    const buttonActive = popupCardAddWrapper.querySelector(settings.submitButtonSelector);
    setButtonActive(buttonActive);
    openPopup(popupCardAddWrapper);
}

function openPhotoCard(e) {
    openPopup(popupPhoto);
    setPhotoData(e);
}

profileEditButton.addEventListener('click', openProfile);
profileChangeButton.addEventListener('click', openAddCard);
popupProfileEditWrapper.querySelector('.popup__form').addEventListener('submit', saveForm);
popupCardAddWrapper.querySelector('.popup__form').addEventListener('submit', addElement);
