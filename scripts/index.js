const profileEditButton = document.querySelector('.profile__edit-button');
const profileButton = document.querySelector('.profile__button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popups');
const popupsAddWrapper = document.querySelector('.addpopups');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupButtonExit = document.querySelector('.allpopups');

const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoText = document.querySelector('.popup-photo__text');

const popupAddInputName = document.querySelector('.addpopups__input_type_name');
const popupAddInputLink = document.querySelector('.addpopups__input_type_link');

const elements = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup-photo');

function createCard(link, name){
    return `<div class="elements__card">
        <img class="elements__card-delete" src="./images/Trash.svg" alt="удалить">
        <img class="elements__card-img" src="${link}" alt="${name}">
        <div class="elements__card-info">
            <h2 class="elements__card-text">${name}</h2>
            <button type="button" class="elements__card-like "></button>
        </div>
    </div>`;
}

initialCards.forEach((item) => {
    const card = createCard(item.link, item.name);
    elements.insertAdjacentHTML('beforeend', card);
})

function addElement(){
    const card = createCard(popupAddInputLink.value, popupAddInputName.value);
    elements.insertAdjacentHTML('afterbegin', card);
    popupAddInputLink.value = '';
    popupAddInputName.value = '';
}

function saveForm(){
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
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
        e.target.parentNode.remove();
    }
}

function openPopup(e){
    e.preventDefault();
    if(e.target.classList.contains('elements__card-img')) {
        popupPhoto.classList.remove('popupsection_status_disabled');
        popupPhoto.classList.add('popupsection_status_enabled');
        popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
        popupPhotoImg.setAttribute('alt', e.target.getAttribute('alt'));
        popupPhotoText.textContent = e.target.parentNode.querySelector('.elements__card-text').textContent;
    } else if(e.target.classList.contains('profile__button')){
        popupsAddWrapper.classList.remove('popupsection_status_disabled');
        popupsAddWrapper.classList.add('popupsection_status_enabled');
    } else if(e.target.classList.contains('profile__edit-button')){
        popupWrapper.classList.remove('popupsection_status_disabled');
        popupWrapper.classList.add('popupsection_status_enabled');
        popupInputName.value = profileText.textContent;
        popupInputAbout.value = profileAbout.textContent;
    }
}

function exitPopup(e){
    e?.preventDefault();
    if(e.target.classList.contains('addpopups__button-save')){
        addElement();
    } else if(e.target.classList.contains('popup__button-save')){
        saveForm();
    }

    if(e.target.classList.contains('popupsection_button-exit')){
        e.target.parentNode.parentNode.classList.add('popupsection_status_disabled');
        e.target.parentNode.parentNode.classList.remove('popupsection_status_enabled');
    } else if(e.target.classList.contains('addpopups__button-save') || e.target.classList.contains('popup__button-save')) {
        e.target.parentNode.parentNode.parentNode.classList.add('popupsection_status_disabled');
        e.target.parentNode.parentNode.parentNode.classList.remove('popupsection_status_enabled');
    }
}

elements.addEventListener('click', likeButton);
elements.addEventListener('click', deleteCard);
elements.addEventListener('click', openPopup);
profileEditButton.addEventListener('click', openPopup);
profileButton.addEventListener('click', openPopup);
popupButtonExit.addEventListener('click', exitPopup);

