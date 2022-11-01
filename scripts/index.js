const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popups');
const popupsAddWrapper = document.querySelector('.addpopups');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const allPopups = document.querySelector('.allpopups');

const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoText = document.querySelector('.popup-photo__text');

const popupAddInputName = document.querySelector('.addpopups__input_type_name');
const popupAddInputLink = document.querySelector('.addpopups__input_type_link');

const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup-photo');

// Я установил слушатель для элемента elements, который является родителем для всех карточек мест.
// При добавлении новой карточки места не нужно повторно задавать addEventListener, т.к. она будет отслеживаться через родителя.

elements.addEventListener('click',  openPhotoCard);

initialCards.forEach((item) => {
    createCard('beforeend', item.link, item.name);
})

function createCard(position, link, name){
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

function addElement(e){
    if(e.target.classList.contains('addpopups__button-save')) {
        createCard('afterbegin', popupAddInputLink.value, popupAddInputName.value);
        popupAddInputLink.value = '';
        popupAddInputName.value = '';
    }
}

function saveForm(e){
    if(e.target.classList.contains('popup__button-save')) {
        profileText.textContent = popupInputName.value;
        profileAbout.textContent = popupInputAbout.value;
    }
}

function likeButton(e) {
    e.preventDefault();
    if(e.target.classList.contains('elements__card-like')){
        e.target.classList.toggle('elements__card-like_active');
    }
}

function deleteCard (e) {
    e.preventDefault();
    if(e.target.classList.contains('elements__card-delete')) {
        e.target.closest('.elements__card').remove();
    }
}

function openPopup(popup){
    popup.classList.remove('popupsection_status_disabled');
    popup.classList.add('popupsection_status_enabled');
}

function exitPopup(e){
    if(e.target.classList.contains('popupsection__button-exit')){
        e.target.closest('.popupsection').classList.add('popupsection_status_disabled');
        e.target.closest('.popupsection').classList.remove('popupsection_status_enabled');
    }
}

function setPhotoData(e){
    popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
    popupPhotoImg.setAttribute('alt', e.target.getAttribute('alt'));
    popupPhotoText.textContent = e.target.parentNode.querySelector('.elements__card-text').textContent;
}

function setUserData(){
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
    openPopup(popupWrapper);
}

function openAddCard(e){
    e.preventDefault();
    openPopup(popupsAddWrapper);
}

function submitForm(e){
    e.preventDefault();
    addElement(e);
    saveForm(e);
    exitPopup(e);
}

function openPhotoCard(e){
    e.preventDefault();
    if(e.target.classList.contains('elements__card-img')) {
        openPopup(popupPhoto);
        setPhotoData(e);
    }
}

elements.addEventListener('click', likeButton);
elements.addEventListener('click', deleteCard);
profileEditButton.addEventListener('click', setUserData);
profileButton.addEventListener('click', openAddCard);
allPopups.addEventListener('click', submitForm)


