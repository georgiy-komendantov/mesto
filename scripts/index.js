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


initialCards.forEach((item) => {
    createCard('beforeend', item.link, item.name);
})

// Клонирование элементов — это не технология темплейтов.
// В одном из прошлых код ревью просили убрать клонирование элементов и создать темплейт подобным образом, не сохраняя его при этом в отдельной переменной.
// Сейчас, если вынести его в html и сделать этот функционал через клонирование элементов, то, при удалении всех карточек, неоткуда будет копировать элемент.
function createCard(position, link, name) {
    elementsContainer.insertAdjacentHTML(position,
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
    popup.classList.add('popup_opened');
    popup.addEventListener('click', exitPopup);
    document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', exitPopup);
    document.removeEventListener('keydown', closePopupByEsc)
}

function exitPopup(e, isFormSubmit) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__button-exit') || isFormSubmit ) {
        closePopup(e.target.closest('.popup'));
    }
}

function closePopupByEsc (e, isFormSubmit) {
    const statusEnabled = document.querySelector('.popup_status_enabled');
    if ((e.key === 'Escape' || isFormSubmit ) && statusEnabled)  {
        statusEnabled.classList.remove('popup_status_enabled');
    }
}

function setPhotoData(e) {
    popupPhotoImg.setAttribute('src', e.target.getAttribute('src'));
    popupPhotoImg.setAttribute('alt', e.target.getAttribute('alt'));
    popupPhotoText.textContent = e.target.parentNode.querySelector('.elements__card-text').textContent;
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
    if (e.target.classList.contains('elements__card-img')) {
        openPopup(popupPhoto);
        setPhotoData(e);
    }
}

// При создании сотни addEventListener -ов, ресурсов будет тратиться ровно в 100 раз больше, если элементов будет 1000 – в 1000 и т.д.
// При добавлении addEventListener на какой-либо элемент, событие будет захватывать всех предков элемента, а так-же объекты document и window.
// То, что делаю я – это делегирование событий на родителя. При каждом клике будет срабатывать 1 событие вместо 1000. Не говоря уже о событиях создания события.
// При создании нескольких секций и делегирования этих событий на них, это так-же будет намного более оптимизировано, чем добавление каждого события отдельно.
// Это одна из распространённых задач и вопросов на собеседованиях, с которой я уже успел столкнуться.

elementsContainer.addEventListener('click', (e)=>{
    likeButton(e);
    deleteCard(e);

    // Я установил слушатель для элемента elements, который является родителем для всех карточек мест.
    // При добавлении новой карточки места не нужно повторно задавать addEventListener, т.к. она будет отслеживаться через родителя.
    // Это так-же было одним из советов практикума, т.к. добавление addEventListener каждому элементу по отдельности — это большие затраты для производительности.
    openPhotoCard(e);
});

profileEditButton.addEventListener('click', openProfile);
profileChangeButton.addEventListener('click', openAddCard);
popupProfileEditWrapper.querySelector('.popup__form').addEventListener('submit', saveForm);
popupCardAddWrapper.querySelector('.popup__form').addEventListener('submit', addElement);
