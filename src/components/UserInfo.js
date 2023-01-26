export default class UserInfo {
    constructor({ userName, userDescription, userAvatar, getUserInfo}) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);

        getUserInfo().then((result) => {
            this.getUpdate(result)
        });
    }

    getUpdate(result) {
        this._id = result._id;
        this._name = result.name;
        this._description = result.about;
        this._avatar = result.avatar;

        this.setInfo()
    }

    async getInfo() {
         return {
            _id: this._id,
            userName: this._name,
            description: this._description,
            avatar: this._avatar
        };
    }

    setInfo() {
        this._userName.textContent = this._name;
        this._userDescription.textContent = this._description;
        this._userAvatar.setAttribute('src', this._avatar);
    }
}