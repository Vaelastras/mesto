//Антон, приветствую! По рекомендациям все поправил - теперь должно быть вообще все супер! 
//Хотел добавить большей интерактивности на отрисовке кард: сделать красивые блюры - но тогда будет отступление от макета - а это не гуд :( Поэтому будет простое выбеливание при ховереэx`
//Отдельно спасибо за простые и понятные комментарии, иной раз приходится пытать наставника игрой в шарады :)


import {popupImagePhotoUrl, popupImageTitle, popupImage, openPopup} from './utils.js'

export class Card {

  constructor (name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplateLayout () {
    const elementTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true); // ищем шаблон темплейта для клонирования карточек
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
    this._card = null;
  } 

  _setCardListeners () {
    this._card.querySelector('.element__like').addEventListener('click', () => this._toggleLike()); // находим лайк
    this._card.querySelector('.element__trash').addEventListener('click', () => this._removeCard());; // находим кнопку удаления
    this._card.querySelector('.element__photo').addEventListener('click',() => this._showPictureInPopup());
  }
// remove method  => review recommendations
  // _removeCardListeners () {
  //   this._card.querySelector('.element__like').removeEventListener('click', () => this._toggleLike()); // находим лайк
  //   this._card.querySelector('.element__trash').removeEventListener('click', () => this._removeCard()); // находим кнопку удаления
  //   this._card.querySelector('.element__photo').removeEventListener('click', () => this._showPictureInPopup());
  // }

  _showPictureInPopup = () => {
    popupImageTitle.textContent = this._name; //берем текст
    popupImagePhotoUrl.alt = this._name; // установим альт
    popupImagePhotoUrl.src = this._link; // берем ссылку из объекта
    openPopup(popupImage);
  }

}
