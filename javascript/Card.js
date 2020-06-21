import {popupImagePhotoUrl, popupImageTitle, popupImage, openPopup} from './index.js'

export class Card {

  constructor (name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplateLayout () {
    const elementTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true); // ищем шаблон темплейта для клонирования карточек
    // console.log(elementTemplate);
    return elementTemplate;
  }

  createCard() {
    this._card = this._getTemplateLayout(); // клонируем шаблон
    this._card.querySelector('.element__photo').src = this._link; // находим изображение и присваиваем ссылку на параметр
    this._card.querySelector('.element__photo').alt = this._name; // устанавливаем аттрибут альт для картинки с названием нейма
    this._card.querySelector('.element__title').textContent = this._name; // находим титл и присваиваем текст на параметр функции
    this._setCardListeners()
    return this._card;   // возвращаем карту с элементами слушателями и параметрами
  }
  
  _toggleLike() {
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  } 

  _removeCard() {
    this._card.remove();
  } 

  _setCardListeners () {
    this._card.querySelector('.element__like').addEventListener('click', () => this._toggleLike()); // находим лайк
    this._card.querySelector('.element__trash').addEventListener('click', () => this._removeCard());; // находим кнопку удаления
    this._card.querySelector('.element__photo').addEventListener('click',() => this._showPictureInPopup());
  }

  _removeCardListeners () {
    this._card.querySelector('.element__like').removeEventListener('click', () => this._toggleLike()); // находим лайк
    this._card.querySelector('.element__trash').removeEventListener('click', () => this._removeCard()); // находим кнопку удаления
    this._card.querySelector('.element__photo').removeEventListener('click', () => this._showPictureInPopup());
  }


  _showPictureInPopup = () => {
    popupImageTitle.textContent = this._name; //берем текст
    popupImagePhotoUrl.alt = this._name; // установим альт
    popupImagePhotoUrl.src = this._link; // берем ссылку из объекта
    // console.log(popupImagePhotoUrl, popupImageTitle)
    openPopup(popupImage);
  }
  
}
