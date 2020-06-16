//переменные
const popupParent = document.querySelector('.popups'); // общая секция для всех попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');// ищем обычный попап (попап1)
const popupPlace = document.querySelector('.popup_type_new-place'); // ищем попап новых мест (попап 2)
const popupImage = document.querySelector('.popup_type_image'); //ищем попап открытия изображений (попап 3)
const editProfileButton = document.querySelector('.profile__edit-button'); // ищем кнопку вызова попапа редактирования профиля
const addPlaceButton = document.querySelector('.profile__add-button'); // ищем кнопку вызова попапа добавления нового места
const checkPlaceContainer = document.querySelector('.popup__container_type_card'); // определяем форму, откуда будем тянуть инпуты названия места и ссылку (попап2)
const currentName = document.querySelector('.profile__title'); // ищем текущее имя юзера на странице
const currentJob = document.querySelector('.profile__job-description'); //ищем текущуюю профессию юзера на странице
const nameInput = document.querySelector('.popup__input_type_name'); // ищем инпут имени (попап 1)
const jobInput = document.querySelector('.popup__input_type_job'); //ищем инпут профессии (попап 1)
const popupPlaceName = document.querySelector('.popup__input_type_title'); // ищем инпут названия места (попап 2)
const popupPlaceUrl = document.querySelector('.popup__input_type_url'); // ищем инпут ссылки (попап 2)
const elements = document.querySelector('.elements'); //определяем место где будут создаваться карточки
const popupImagePhotoUrl = document.querySelector('.popup__image') //ищем картинку места (попап имг)
const popupImageTitle = document.querySelector('.popup__image-title')// ищем название места (попап имг)
const elementTemplate = document.querySelector('#template').content; // ищем шаблон темплейта для клонирования карточек

// Обработчики закрытия попапа кнопкой
// user-type handlers
const escapeHandler = (evt) => {
  if (evt.key ==='Escape') {
    const openedPopup = document.querySelector('.popup_active')
    closePopup(openedPopup)
  }
};

const overlayHandlerClose = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
};

function handlePopupClose(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.closest('.popup'));
  }
}

function setListenersOnPopup (element) {
  document.addEventListener('keydown', escapeHandler); // клик по эккейпу
  element.addEventListener('mousedown', overlayHandlerClose) // клик в оверлей;
  popupParent.addEventListener('click', handlePopupClose)//клик в крест
}

function removeListenersOnPopup(element) {
  document.removeEventListener('keydown', escapeHandler); // клик по эккейпу
  element.removeEventListener('mousedown', overlayHandlerClose) // клик в оверлей
  popupParent.addEventListener('click', handlePopupClose) //клик в крест
}

// function
const clearPopupValidationErrors = (element) => {
  if (element !==  popupImage) {
    const inputsList = Array.from(element.querySelectorAll(validationConfig.inputSelector));
    const submitButton = element.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputsList, submitButton);
    inputsList.forEach((inputElement) => {
      hideInputError(element, inputElement)
    });
  }
}

const openPopup = (element) => {
  element.classList.add('popup_active');
  setListenersOnPopup(element);
}

const closePopup = (element) => {
  element.classList.remove('popup_active');
  removeListenersOnPopup(element);
}

//получить текущее имя пользователя в инпуты
const openProfileEditPopup = () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  clearPopupValidationErrors(popupEditProfile);
  openPopup(popupEditProfile);
};

const profileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

const toggleLike = (evt) => evt.target.classList.toggle('element__like_active');

const removeCard = (evt) => evt.target.closest('.element').remove()

const showPictureInPopup = (evt) => {
  popupImageTitle.innerText = evt.target.closest('.element').innerText; //берем текст c ближайшего эла
  popupImagePhotoUrl.src = evt.target.src; // берем ссылку из объекта
  popupImagePhotoUrl.alt = evt.target.alt; // установим альт
  openPopup(popupImage);
}

/* Друзья! В очередной раз переименовываю функцию. Каждый ревьювер требует своё название  :( */

function createCard(name, link) {
  const card = elementTemplate.cloneNode(true); // клонируем шаблон
  const cardImage = card.querySelector('.element__photo'); // находим изображение
  const cardTitle = card.querySelector('.element__title'); // находим титл
  const likeButton = card.querySelector('.element__like'); // находим лайк
  const removeButton = card.querySelector('.element__trash'); // находим кнопку удаления

  cardTitle.textContent = name; // присваиваем текст на параметр функции
  cardImage.src = link; // присваиваем сслку на параметр
  cardImage.setAttribute('alt', name); // устанавливаем аттрибут альт для картинки с названием нейма
  likeButton.addEventListener('click', toggleLike);
  removeButton.addEventListener('click', removeCard);
  cardImage.addEventListener('click', showPictureInPopup);

  return card;   // возвращаем карту с элементами слушателями и параметрами
}

//добавить карты на страницу.
const pasteCardIntoDocument = (element) => elements.prepend(element);

const addCard = (name, link) => {
  const cardOnShow = createCard(name, link);
  pasteCardIntoDocument(cardOnShow);
};

const openPopupPlaceAdd = () => {
  checkPlaceContainer.reset();
  clearPopupValidationErrors(popupPlace);
  openPopup(popupPlace);
};

//отображаем карточку пользователя
const userCardHandler = (event) => {
  event.preventDefault();
  addCard(popupPlaceName.value, popupPlaceUrl.value);
  closePopup(popupPlace)
};

// добавляем каждую карту на страницу. данные берутся из массива initial.cards.
const showInitialCardsOnPage = () =>   initialCards.forEach(element => addCard(element.name, element.link));

showInitialCardsOnPage()
enableValidation(validationConfig)

//eventListeners
popupEditProfile.addEventListener('submit', profileFormSubmitHandler);
checkPlaceContainer.addEventListener('submit', userCardHandler);
editProfileButton.addEventListener('click', openProfileEditPopup);
addPlaceButton.addEventListener('click', openPopupPlaceAdd);

