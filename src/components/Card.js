export default class Card {
  constructor (data, cardSelector, myID, {handleCardClick, handleRemoveCard, handleLikeSet, handleLikeRemover}) {
  
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._myID = myID;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeSet = handleLikeSet;
    this._handleLikeRemover = handleLikeRemover
    
  }

  _getTemplateLayout () {
    const elementTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true); // ищем шаблон темплейта для клонирования карточек
    return elementTemplate;
  }

  generateCard() {
    this._card = this._getTemplateLayout(); // клонируем шаблон

    const popupImage = this._card.querySelector('.element__photo') // находим имг на карте
    const popupImageText = this._card.querySelector('.element__title') // находим название карты
    const likeCounter = this._card.querySelector('.element__like-counter')

    popupImage.src = this._link; // находим изображение и присваиваем ссылку на параметр
    popupImage.alt = this._name; // устанавливаем аттрибут альт для картинки с названием нейма
    popupImageText.textContent = this._name; // находим титл и присваиваем текст на параметр функции
    likeCounter.textContent = `${this._likes.length}`; //вывести длину массива как значение количества лайков

     if (this._likes.find((like) => like._id === this._myID)) {
      this._card.querySelector('.element__like').classList.add('element__like_active');
    };

  
    if (this._owner._id === this._myID) {  // если создатель карты - я, то навесить на карту кнопку удаления
      this._card.querySelector('.element__trash').classList.add('element__trash_type_active')
    } 

    this._setCardListeners()
    return this._card;   // возвращаем карту с элементами слушателями и параметрами
  }
  
  counterLike(likeArray) {
    const counterValue = this._card.querySelector('.element__like-counter')
    counterValue.textContent = likeArray.length;
  }
  

  toggleLike() {  // смена состояния кнопки
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  } 

  _setLikeHandler() {
    const userLike = this._card.querySelector('.element__like');
    if (userLike.classList.contains('element__like_active')) {
      this._handleLikeRemover()
    } else {
      this._handleLikeSet()} 
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  } 

  _setCardListeners () {
    this._card.querySelector('.element__like').addEventListener('click', () => this._setLikeHandler()); // ставим слушатель на лайк
    this._card.querySelector('.element__trash').addEventListener('click', () => this._handleRemoveCard(this._card)); // слушатель на помойку
    this._card.querySelector('.element__photo').addEventListener('click',() => this._handleCardClick()); // коллбек на открытие попапа имг
  }
}
