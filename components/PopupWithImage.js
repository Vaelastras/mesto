import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }
 
  openPopup(name, link){
    super.openPopup();
    this._popupSelector.querySelector('.popup__image-title').alt = name;
    this._popupSelector.querySelector('.popup__image-title').textContent = name;
    this._popupSelector.querySelector('.popup__image').src = link;
  }
  
}