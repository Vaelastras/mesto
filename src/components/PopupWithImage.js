import Popup from './Popup.js';
// import {popupImagePhotoUrl, popupImageTitle } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupElement){
    super(popupElement);
    this._title = this._popupElement.querySelector('.popup__image-title');
    this._image = this._popupElement.querySelector('.popup__image')
  }
 
  openPopup(name, link){
    super.openPopup();
    this._title.alt = name;
    this._title.textContent = name;
    this._image.src = link;
  }
}