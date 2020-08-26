import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor (popupElement) {
    super(popupElement);
    this._submitButton = this._popupElement.querySelector('.popup__submit_type_confirm')
  }
  
  setEventListeners() {
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.loaderHandler('Удаление...');
      this._handleSubmit();
      this.closePopup();
    });
    super.setEventListeners();
  }


  setHandleSubmit(func) {
    this._handleSubmit = func;
  }
  

  openPopup() {
    this.loaderHandler('Да');
    super.openPopup();
  }
}