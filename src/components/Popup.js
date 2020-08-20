export default class Popup {
  constructor (popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose= this._handleOverlayClose.bind(this)
  }

  openPopup() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keydown',this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_active');
    document.removeEventListener('keydown',this._handleEscClose);
    document.removeEventListener('click',this._handleOverlayClose);

  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup()
    }
  }
  
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupElement.querySelector('.popup__close').addEventListener('click', () => this.closePopup())
    
  }
}