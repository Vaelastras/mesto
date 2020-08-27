import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, {submitForm}) {
    super(popupElement);
    this._submitForm = submitForm;
}

//метод собирает все поля формы
  _getInputValues() {
      this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input')); // найти все инпуты в попапе и сделать из них массив
      this._formValue = {}; // создать объект 
      this._inputList.forEach(item => { // в массиве инпутов для каждого элемента нужно
        this._formValue[item.name] = item.value; // записать ключом объекта значение аттрибута "name"
      });
      return this._formValue
  }
  
  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loaderHandler('Сохранение...');
      this._submitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this._popupElement.querySelector('.popup__container').reset();
  }

  openPopup() {
    super.openPopup();
    this.loaderHandler('Сохранить');
  }
}



