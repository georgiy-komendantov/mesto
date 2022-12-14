export default class Section {
    constructor({ items, renderer }, template) {
        this._renderer = renderer;
        this._renderItems = items;
        this._templateContainer = document.querySelector(template);
    }

    rendererItems() {
        this._renderItems.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(cardElement) {
        this._templateContainer.prepend(cardElement);
    }
}

