let name = 'Жак-Ив Кусто';
let about = 'Исследователь океана';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileText = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__about');

profileText.innerHTML = name;
profileAbout.innerHTML = about;

const popups = document.querySelector('.popups');

function onProfileClick() {
    popups.innerHTML = `
    <div class="popup__wraper">
        <form class="popup">
            <h2 class="popup__title">Редактировать профиль</h2>

            <div class="popup_container">
                <input class="popup__input popup__input_type_name">
                <span class="popup__error"></span>
                <input class="popup__input popup__input_type_about">
                <span class="popup__error"></span>
            </div>

            <button class="popup__button-save">Сохранить</button>
            <button class="popup__button-exit"></button>
        </form>
    </div>
    `;
    const popupButtonExit = document.querySelector('.popup__button-exit');

    function exitForm(){
        popups.innerHTML = ``;
    }
    popupButtonExit.addEventListener('click', exitForm);

    const popupInputName = document.querySelector('.popup__input_type_name');
    const popupInputAbout = document.querySelector('.popup__input_type_about');
    popupInputName.value = name;
    popupInputAbout.value = about;

    const formElement = document.querySelector('.popup');
    function saveForm(){
        name = popupInputName.value;
        about = popupInputAbout.value;
        profileText.innerHTML = name;
        profileAbout.innerHTML = about;
        exitForm();
    }
    formElement.addEventListener('submit', saveForm)
}

profileEditButton.addEventListener('click', onProfileClick)