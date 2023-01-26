export default class Card {
    constructor({data, cardSelector, handleCardClick, handleCardRemove, handleCardPutLike, handleCardRemoveLike, userData}) {
        this._id = data._id;
        this._likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._me = userData;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardPutLike = handleCardPutLike;
        this._handleCardRemoveLike = handleCardRemoveLike;
        this._elementCard = document.querySelector(this._cardSelector).content.querySelector('.elements__card').cloneNode(true);
        this._elementImages = this._elementCard.querySelector('.elements__card-img');
        this._elementName = this._elementCard.querySelector('.elements__card-text');
        this._likeIcon = this._elementCard.querySelector('.elements__card-like');
        this._deleteIcon = this._elementCard.querySelector('.elements__card-delete');
        this._likesCount = this._elementCard.querySelector('.elements__card-number');
    }

    _addLikeCard = (e) => {
        // Я не делаю запрос на сервер, функция _me() в данном случае возвращает уже сохраненные данные в классе UserInfo, но получаю их через then, т.к. при обновлении этих данных и при первоначальном запросе, они могут вернуться асинхронно
        this._me().then(result => {
            if (this._likes.findIndex((el) => el._id === result._id) === -1){
                this._handleCardPutLike(this._id).then(item => {
                    this._likes = item.likes;
                    this._likesCount.textContent = this._likes.length;
                    e.target.classList.toggle('elements__card-like_active');
                }).catch((e)=>console.log(e));
            } else {
                this._handleCardRemoveLike(this._id).then(item => {
                    this._likes = item.likes;
                    this._likesCount.textContent = this._likes.length;
                    e.target.classList.toggle('elements__card-like_active');
                }).catch((e)=>console.log(e));
            }

        }).catch((e)=>console.log(e));
    }

    _deleteCard() {
        this._handleCardRemove(this._id, () => this._elementCard.remove());
    }

    makeCard() {
        this._elementName.textContent = this._name;
        this._elementImages.src = this._link;
        this._elementImages.alt = this._name;
        this._likesCount.textContent = this._likes.length;


        this._me().then(result => {
            if (this._owner._id !== result._id) {
                this._deleteIcon.remove();
            }
        }).catch((e)=>console.log(e));

        this._me().then(result => {
            if (this._likes.findIndex((el) => el._id === result._id) > -1) {
                this._likeIcon.classList.toggle('elements__card-like_active');
            }
        }).catch((e)=>console.log(e));

        this._addEventHandler();
        return this._elementCard;
    }

    _addEventHandler = () => {
        this._likeIcon.addEventListener('click', event => this._addLikeCard(event))
        this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
        this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
}


