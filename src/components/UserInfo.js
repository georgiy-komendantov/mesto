export default class UserInfo {
    constructor({ userName, userDescription, userAvatar, getUserInfo}) {
        // this._getUserInfo = getUserInfo;
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);

        getUserInfo().then((result) => {
            this.getUpdate(result)
            this.setInfo({userName: this._name, description: this._description})
            this.setAvatar({avatar: this._avatar})
        });
    }

    getUpdate(result) {
        this._id = result._id;
        this._name = result.name;
        this._description = result.about;
        this._avatar = result.avatar;
    }

    async getInfo() {
         return {
            _id: this._id,
            userName: this._name,
            description: this._description,
            avatar: this._avatar
        };
    }

    setInfo({ userName, description }) {
        this._userName.textContent = userName;
        this._userDescription.textContent = description;
    }

    setAvatar({avatar}){
        if(avatar) {
            this._userAvatar.setAttribute('src', avatar)
        }
    }
}