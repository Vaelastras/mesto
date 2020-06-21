import {popupImagePhotoUrl, popupImageTitle, popupImage} from './index.js'

export class Card {
  constructor (name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }
  _getTemplate () {
    const elementTemplate = document.querySelector('#template').content.querySelector('.element').cloneNode(true); // ищем шаблон темплейта для клонирования карточек
    return elementTemplate;
  }

  _toggleLike = (evt) => evt.target.classList.toggle('element__like_active');
  
  _removeCard = (evt) => evt.target.closest('.element').remove()

  _showPictureInPopup = (evt) => {
    popupImageTitle.textContent = evt.target.closest('.element').textContent; //берем текст c ближайшего эла
    popupImagePhotoUrl.src = evt.target.src; // берем ссылку из объекта
    popupImagePhotoUrl.alt = evt.target.alt; // установим альт
    openPopup(popupImage);
  }

  _setCardListeners () {
    this._card.querySelector('.element__like').addEventListener('click', this._toggleLike); // находим лайк
    this._card.querySelector('.element__trash').addEventListener('click', this._removeCard);; // находим кнопку удаления
    this._card.querySelector('.element__photo').addEventListener('click', this._showPictureInPopup);
    // likeButton.addEventListener('click', this._toggleLike);
    // removeButton.addEventListener('click', this._removeCard);
    // cardImage.addEventListener('click', this._showPictureInPopup);
  }


  _createCard(name, link) {
    this._card = this._getTemplate(); // клонируем шаблон
    this._card.querySelector('.element__photo').src = this._link; // находим изображение и присваиваем ссылку на параметр
    this._card.querySelector('.element__photo').alt = this._name; // устанавливаем аттрибут альт для картинки с названием нейма
    this._card.querySelector('.element__title').textContent = this._name; // находим титл и присваиваем текст на параметр функции

    this._setCardListeners()

    return this._card;   // возвращаем карту с элементами слушателями и параметрами
  }
}
