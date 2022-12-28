export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name
        this._link = data.link
        this._cardSelector = cardSelector
        this._handleCardClick = handleCardClick;
        this._elementCard = document.querySelector(this._cardSelector).content.querySelector('.elements__card').cloneNode(true);
        this._elementImages = this._elementCard.querySelector('.elements__card-img');
        this._elementName = this._elementCard.querySelector('.elements__card-text');
        this._likeIcon = this._elementCard.querySelector('.elements__card-like');
        this._deleteIcon = this._elementCard.querySelector('.elements__card-delete');
    }

    _addLikeCard = (e) => {
        e.target.classList.toggle('elements__card-like_active');
    }

    _deleteCard() {
        this._elementCard.remove();
    }

    makeCard() {
        this._elementName.textContent = this._name;
        this._elementImages.src = this._link;
        this._elementImages.alt = this._name;
        this._addEventHandler();
        return this._elementCard;
    }

    _addEventHandler = () => {
        this._likeIcon.addEventListener('click', event => this._addLikeCard(event))
        this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
        this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
}


