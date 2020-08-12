import Popup from './Popup.js';
import {popupImagePhotoUrl, popupImageTitle } from '../utils/constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupElement){
    super(popupElement);
  }
 
  openPopup(name, link){
    super.openPopup();
    popupImageTitle.alt = name;
    popupImageTitle.textContent = name;
    popupImagePhotoUrl.src = link;
  }
}