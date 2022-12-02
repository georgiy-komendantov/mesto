export class Card {
    constructor(data, cardSelector) {
        this._name = data.name
        this._link = data.link
        this._cardSelector = cardSelector
    }

    _getCardTemplate() {
        this._view = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__card')
            .cloneNode(true)
    }

    renderCard(container) {
        this._getCardTemplate()
        this._setEventListeners()
        this._view.querySelector('.elements__card-img').src = this._link
        this._view.querySelector('.elements__card-img').alt = this._name
        this._view.querySelector('.elements__card-text').textContent = this._name
        container.prepend(this._view)
    }

    _setEventListeners() {
        this._view
            .querySelector('.elements__card-like')
            .addEventListener('click', () => {
                this._likeButton()
            })

        this._view
            .querySelector('.elements__card-delete')
            .addEventListener('click', () => {
                this._deleteCard()
            })

        this._view
            .querySelector('.elements__card-img')
            .addEventListener('click', () => {
                this._openPhotoCard()
            })
    }

    _likeButton() {
        this._view
            .querySelector('.elements__card-like').
        classList.
        toggle('elements__card-like_active')
    }

    _deleteCard() {
        this._view
            .closest('.elements__card')
            .remove()
    }

    _openPhotoCard() {
        const popupCaption = document.querySelector('.popup__text');
        const popupImage = document.querySelector('.popup__img');
        const modalFigurePopup = document.querySelector('.popup_type_image');

        popupImage.src = this._link
        popupCaption.textContent = this._name
        openPopup(modalFigurePopup)
    }
}


