export default class Section {
    constructor({ renderer }, template) {
        this._renderer = renderer;
        this._templateContainer = document.querySelector(template);
    }

    rendererItems() {
       this._renderItems.reverse().forEach(item => {
           this._renderer(item);
       });
    }

    addItem(cardElement) {
        this._templateContainer.prepend(cardElement);
    }

    updateItems(items) {
        this._renderItems = items;
    }
}

