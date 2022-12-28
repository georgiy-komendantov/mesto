export default class UserInfo {
    constructor({ userName, userDescription }) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
    }

    getInfo() {
        return {
            userName: this._userName.textContent,
            description: this._userDescription.textContent
        };
    }

    setInfo({ userName, description }) {
        this._userName.textContent = userName;
        this._userDescription.textContent = description;
    }
}