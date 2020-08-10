export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {
    this._popupSelector.classList.add('popup_active');
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_active');

  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }
  
  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.closePopup())
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }
}