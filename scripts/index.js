const profileEditButton = document.querySelector('.profile__edit-button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popups');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

const popupButtonExit = document.querySelector('.popups__button-exit');
const formElement = document.querySelector('.popup');

function exitForm(e){
    e.preventDefault();
    popupWrapper.classList.remove('popups_enabled');
}

function saveForm(e){
    e.preventDefault();
    profileText.textContent = popupInputName.value;
    profileAbout.textContent = popupInputAbout.value;
    exitForm(e);
}

function openPopup(e) {
    e.preventDefault();
    popupWrapper.classList.add('popups_enabled');
    popupInputName.value = profileText.textContent;
    popupInputAbout.value = profileAbout.textContent;
}

profileEditButton.addEventListener('click', openPopup);
popupButtonExit.addEventListener('click', exitForm);
formElement.addEventListener('submit', saveForm);