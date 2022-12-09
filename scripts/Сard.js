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
        this._viewImg = this._view.querySelector('.elements__card-img')
        this._viewText = this._view.querySelector('.elements__card-text')
    }

    renderCard() {
        this._getCardTemplate()
        this._setEventListeners()
        this._viewImg.src = this._link
        this._viewImg.alt = this._name
        this._viewText.textContent = this._name
        return this._view
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
            .remove()
        this._view = null
        this._viewImg
            .remove()
        this._viewImg = null
        this._viewText
            .remove()
        this._viewText = null
    }

    _openPhotoCard() {
        popupImage.src = this._link
        popupCaption.textContent = this._name
        openPopup(modalFigurePopup)
    }
}


