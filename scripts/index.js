const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popups');
const AddPopupsWrapper = document.querySelector('.addpopups');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupButtonExit = document.querySelector('.popups__button-exit');
const popupAddButtonExit = document.querySelector('.addpopups__button-exit')
const popupPhotoButtonExit = document.querySelector('.popup-photo__button-exit');
const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoText = document.querySelector('.popup-photo__text');

const formElement = document.querySelector('.popup');
const addFormElement = document.querySelector('.addpopups__form');
const addPopupInputName = document.querySelector('.addpopups__input_type_name');
const addPopupInputLink = document.querySelector('.addpopups__input_type_link');


const elements = document.querySelector('.elements');

const photoButton = document.querySelector('.elements__card-img');
const popupPhoto = document.querySelector('.popup-photo');

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

initialCards.forEach((item)=>{
    elements.insertAdjacentHTML('beforeend',`<div class="elements__card">
            <img class="elements__card-delete" src="./images/Trash.svg" alt="удалить">
            <img class="elements__card-img" src="${item.link}" alt="замок">
            <div class="elements__card-info">
                <h2 class="elements__card-text">${item.name}</h2>
                <button type="button" class="elements__card-like "></button>
            </div>
        </div>`);
})

function addElement(e){
    e.preventDefault();
    elements.insertAdjacentHTML('afterbegin',`<div class="elements__card">
        <img class="elements__card-delete" src="./images/Trash.svg" alt="удалить">
        <img class="elements__card-img" src="${addPopupInputLink.value}" alt="замок">
        <div class="elements__card-info">
            <h2 class="elements__card-text">${addPopupInputName.value}</h2>
            <button type="button" class="elements__card-like "></button>
        </div>
    </div>`);
    addPopupInputLink.value='';
    addPopupInputName.value='';
    addExitForm(e);
}

function exitForm(e){
    e.preventDefault();
    popupWrapper.classList.add('popups_status_disabled');
    popupWrapper.classList.remove('popups_status_enabled');
}

function addExitForm(e){
    e.preventDefault();
    AddPopupsWrapper.classList.add('addpopups_status_disabled');
    AddPopupsWrapper.classList.remove('addpopups_status_enabled');
}

function photoExitForm(e){
    e.preventDefault();
    popupPhoto.classList.add('popup-photo_status_disabled');
    popupPhoto.classList.remove('popup-photo_status_enabled');
}

function saveForm(e){
    e.preventDefault();
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    exitForm(e);
}

function openPopup(e) {
    e.preventDefault();
    popupWrapper.classList.remove('popups_status_disabled');
    popupWrapper.classList.add('popups_status_enabled');
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
}


function openAddPopups (e) {
    e.preventDefault();
    AddPopupsWrapper.classList.remove('addpopups_status_disabled');
    AddPopupsWrapper.classList.add('addpopups_status_enabled');
}

function likeButton(e) {
    e.preventDefault();

    // console.log(e.target)
    if(e.target.classList.contains('elements__card-like')){
        e.target.classList.toggle('elements__card-like_active');
    }
}

function deleteCard (e) {
    e.preventDefault();
    if(e.target.classList.contains('elements__card-delete')) {
        e.target.parentNode.remove();
    }
}

function openPopupPhoto (e) {
    e.preventDefault();
    if(e.target.classList.contains('elements__card-img')) {
        popupPhoto.classList.remove('popup-photo_status_disabled');
        popupPhoto.classList.add('popup-photo_status_enabled');

        popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
        popupPhotoText.textContent = e.target.parentNode.querySelector('.elements__card-text').textContent;
    }
}


elements.addEventListener('click', likeButton);
elements.addEventListener('click', deleteCard);
elements.addEventListener('click', openPopupPhoto);
profileEditButton.addEventListener('click', openPopup);
profileButton.addEventListener('click', openAddPopups);
popupButtonExit.addEventListener('click', exitForm);
popupAddButtonExit.addEventListener('click', addExitForm);
popupPhotoButtonExit.addEventListener('click', photoExitForm);
formElement.addEventListener('submit', saveForm);
addFormElement.addEventListener('submit', addElement);

