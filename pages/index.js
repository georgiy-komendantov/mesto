const profileEditButton = document.querySelector('.profile__edit-button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popups');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupButtonExit = document.querySelector('.popups__button-exit');
const formElement = document.querySelector('.popup');

const formTitle = document.querySelector('.popup__title');

function exitForm(e){
    if(e) {
        e.preventDefault();
    }
    popupWrapper.classList.add('popups_disabled');
}

function saveForm(e){
    e.preventDefault();
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    formTitle.textContent = '';
    exitForm();
}

function onProfileClick(e) {
    e.preventDefault();

    popupWrapper.classList.remove('popups_disabled');
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
    formTitle.textContent = 'Редактировать профиль';
}

profileEditButton.addEventListener('click', onProfileClick);
popupButtonExit.addEventListener('click', exitForm);
formElement.addEventListener('submit', saveForm);