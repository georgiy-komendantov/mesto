const profileEditButton = document.querySelector('.profile__edit-button');
const profileChangeButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupProfileEditWrapper = document.querySelector('.popups');
const popupCardAddWrapper = document.querySelector('.addpopups');

const popupFormEditProfile = document.querySelector('.popup');
const popupFormAddCards = document.querySelector('.addpopups__form');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const allPopups = document.querySelector('.allpopups');

const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoText = document.querySelector('.popup-photo__text');

const popupAddInputName = document.querySelector('.addpopups__input_type_topic');
const popupAddInputLink = document.querySelector('.addpopups__input_type_link');

const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup-photo');

// Я установил слушатель для элемента elements, который является родителем для всех карточек мест.
// При добавлении новой карточки места не нужно повторно задавать addEventListener, т.к. она будет отслеживаться через родителя.

elements.addEventListener('click', openPhotoCard);

initialCards.forEach((item) => {
    createCard('beforeend', item.link, item.name);
})

function createCard(position, link, name) {
    elements.insertAdjacentHTML(position,
        `<div class="elements__card">
            <img class="elements__card-delete" src="./images/Trash.svg" alt="удалить">
            <img class="elements__card-img" src="${link}" alt="${name}">
            <div class="elements__card-info">
                <h2 class="elements__card-text">${name}</h2>
                <button type="button" class="elements__card-like"></button>
            </div>
        </div>`
    );
}

function addElement(e) {
    e.preventDefault();
    createCard('afterbegin', popupAddInputLink.value, popupAddInputName.value);
    popupAddInputLink.value = '';
    popupAddInputName.value = '';
    exitPopup(e, true);
}

function saveForm(e) {
    e.preventDefault();
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    exitPopup(e, true);
}

function likeButton(e) {
    e.preventDefault();
    if (e.target.classList.contains('elements__card-like')) {
        e.target.classList.toggle('elements__card-like_active');
    }
}

function deleteCard(e) {
    e.preventDefault();
    if (e.target.classList.contains('elements__card-delete')) {
        e.target.closest('.elements__card').remove();
    }
}

function openPopup(popup) {
    popup.classList.remove('popupsection_status_disabled');
    popup.classList.add('popupsection_status_enabled');
}

function exitPopup(e, isFormSubmit) {
    if (e.target.classList.contains('popupsection__button-exit') || isFormSubmit ) {
        e.target.closest('.popupsection').classList.remove('popupsection_status_enabled');
    }
}

function exitPopupOverlay(e, isFormSubmit) {
    if (e.target.classList.contains('popupsection__overlay') || isFormSubmit ) {
        e.target.closest('.popupsection').classList.remove('popupsection__overlay');
    }
}

function exitPopupEscape (e, isFormSubmit) {
    const statusEnabled = document.querySelector('.popupsection_status_enabled');
    if ((e.key === 'Escape' || isFormSubmit ) && statusEnabled)  {
        statusEnabled.classList.remove('popupsection_status_enabled');
    }
}

function setPhotoData(e) {
    popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
    popupPhotoImg.setAttribute('alt', e.target.getAttribute('alt'));
    popupPhotoText.textContent = e.target.parentNode.querySelector('.elements__card-text').textContent;
}

function setUserData() {
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
    openPopup(popupProfileEditWrapper);
}

function openAddCard(e) {
    e.preventDefault();

    setButtonActive('.addpopups__button-save');
    openPopup(popupCardAddWrapper);
}

function openPhotoCard(e) {
    e.preventDefault();
    if (e.target.classList.contains('elements__card-img')) {
        openPopup(popupPhoto);
        setPhotoData(e);
    }
}

elements.addEventListener('click', likeButton);
elements.addEventListener('click', deleteCard);
profileEditButton.addEventListener('click', setUserData);
profileChangeButton.addEventListener('click', openAddCard);

popupFormEditProfile.addEventListener('submit', saveForm);
popupFormAddCards.addEventListener('submit', addElement);

// Я не могу добавить один addEventListener к ряду элементов с одним классом, а добавлять каждому элементу addEventListener — выглядит странно,
// Я создал общий класс для всех элементов, и, делаю проверку, так что таргет события должен содержать класс popupsection__button-exit
allPopups.addEventListener('click', exitPopup);
allPopups.addEventListener('click', exitPopupOverlay);
window.addEventListener('keydown', exitPopupEscape);