let name = 'Жак-Ив Кусто';
let about = 'Исследователь океана';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');
const popupWrapper = document.querySelector('.popup__wraper');

const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAbout = document.querySelector('.popup__input_type_about');

profileText.innerHTML = name;
profileAbout.innerHTML = about;


function exitForm(event){
    event?.preventDefault();
    popupWrapper.style.visibility= "hidden";
}

function onProfileClick(e) {
    e.preventDefault();
    popupWrapper.style.visibility= "visible";
    const popupButtonExit = document.querySelector('.popup__button-exit');

    popupButtonExit.addEventListener('click', exitForm);

    popupInputName.value = name;
    popupInputAbout.value = about;

    const formElement = document.querySelector('.popup');
    function saveForm(event){
        event.preventDefault();
        name = popupInputName.value;
        about = popupInputAbout.value;
        profileText.innerHTML = name;
        profileAbout.innerHTML = about;
        exitForm();
    }
    formElement.addEventListener('submit', saveForm)
}

profileEditButton.addEventListener('click', onProfileClick)