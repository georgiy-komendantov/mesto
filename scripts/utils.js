function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', exitPopup);
    document.removeEventListener('keydown', closePopupByEsc)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', exitPopup);
    document.addEventListener('keydown', closePopupByEsc)
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