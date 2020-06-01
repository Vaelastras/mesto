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

/* определяем массив изначальных элементов. каждый элемент - объект с свойствами
Свойства name и link - пригодятся как параметры функции при создании дефолтных карт
*/
const initialCards = [
  {
      name: 'Cочи',
      link: './images/photo-grid-sochi.jpg'
  },
  {
      name: 'Эльбрус',
      link: './images/photo-grid-elbrus.jpg'
  },
  {
      name: 'Камчатка',
      link: './images/photo-grid-kamchatka-2.jpg'
  },
  {
      name: 'Карелия',
      link: './images/place-karelia.jpg'
  },
  {
      name: 'Кольский',
      link: './images/place-kolsky.jpg'
  },
  {
      name: 'Куршская коса',
      link: './images/place-kosa.jpg'
  }
]
const elementTemplate = document.querySelector('#template').content; // ищем шаблон темплейта для клонирования карточек

// Функции

//открытие/закрытие попапов
function openPopup(element) {
  element.classList.toggle('popup_active');
}

// закрытие попапов кнопкой
function closePopup(evt) {
  if (evt.target.classList.contains('popup__close')) {
    evt.target.closest('.popup').classList.toggle('popup_active');
  }
}

//получить текущее имя пользователя в инпуты
function getProfileName() {
  nameInput.value = currentName.textContent; // а заодно и подставим в поле значение с страницы
  jobInput.value = currentJob.textContent;
  openPopup(popupEditProfile);
}

//f получения данных в попап с страницы
function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  openPopup(popupEditProfile);
}

// функция постановки лаек
function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

//функция удаления карточек
function removeCard(evt) {
  evt.target.closest('.element').remove()
}

//отображаем карточку пользователя
function renderUserCard(event) {
  event.preventDefault();

  addCard(popupPlaceName.value, popupPlaceUrl.value);
  popupPlaceName.value = ''; // обнуляем значение инпута
  popupPlaceUrl.value =''; // обнуляем значение инпута
  openPopup(popupPlace)
};

function renderCard(name, link) {
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
  cardImage.addEventListener('click', showPictureinPopup);

  return card;   // возвращаем карту с элементами слушателями и параметрами
}


// отрисовать карточки из шаблона

//добавить карты на страницу.
function pasteCardIntoDocument(element) {
  elements.prepend(element)
};

function showPictureinPopup(evt) {
  openPopup(popupImage)
  popupImageTitle.textContent = evt.target.closest('.element').textContent; //берем текст c ближайшего эла
  popupImagePhotoUrl.src = evt.target.src; // берем ссылку из объекта
  popupImagePhotoUrl.setAttribute('alt', name); // установим альт
}

const addCard = function (name, link) {
  let cardOnShow = renderCard(name, link); // единственное изменение в последней строке: теперь вместо вызова pasteCardIntoDocument возвращаем DOM-элемент card
  pasteCardIntoDocument(cardOnShow); // этот элемент передаем дальше
  };

  // добавляем каждую карту на страницу. данные берутся из массива initial.cards.
function showCardOnPage() {
  initialCards.forEach(element => addCard(element.name, element.link))
};

showCardOnPage()

//Слушатели

popupEditProfile.addEventListener('submit', formSubmitHandler);
checkPlaceContainer.addEventListener('submit', renderUserCard);
editProfileButton.addEventListener('click', getProfileName);
popupParent.addEventListener('click', closePopup)
addPlaceButton.addEventListener('click', () => openPopup(popupPlace));

