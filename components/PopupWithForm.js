import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm;
}

//метод собирает все поля формы
  _getInputValues() {
      this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input')); // найти все инпуты в попапе и сделать из них массив
      this._formValue = {}; // создать объект 
      this._inputList.forEach(item => { // в массиве инпутов для каждого элемента нужно
        this._formValue[item.name] = item.value; // записать ключом объекта значение аттрибута "name"
      });
      return this._formValue
  }
  
  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues())
    });
    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this._popupSelector.querySelector('.popup__container').reset();
  }
}