
export default class Section {
  constructor ({
    // items, 
    renderer}, containerSelector) {
    // this._items = items
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  
  addItemAppend(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }
}