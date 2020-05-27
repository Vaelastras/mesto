//переменные
const popup = document.querySelector('.popup'); // ищем обычный попап (попап1)
const popupPlace = document.querySelector('.popup-newplace'); // ищем попап новых мест (попап 2)
const popupImage = document.querySelector('.popup-image'); //ищем попап открытия изображений (попап 3)

const editProfileButton = document.querySelector('.profile__edit-button'); // ищем кнопку вызова попапа редактирования профиля
const addPlaceButton = document.querySelector('.profile__add-button'); // ищем кнопку вызова попапа добавления нового места

const checkPopupContainer = document.querySelector('.popup__container'); // опрередяем форму, откуда будем тянуть инпуты имени пользователя и его профессии (попап 1)
const checkPlaceContainer = document.querySelector('.popup-newplace__container'); // определяем форму, откуда будем тянуть инпуты названия места и ссылку (попап2)

const closePopupEditButton = document.querySelector('.popup__close'); // ищем кнопку закрытия (попап 1)
const closePopupPlaceButton = document.querySelector('.popup-newplace__close'); // ищем кнопку закрытия (попап 2)
const closePopupImageButton = document.querySelector('.popup-image__close'); // ищем кнопку закрытия (попап 3)

const currentName = document.querySelector('.profile__title'); // ищем текущее имя юзера на странице
const currentJob = document.querySelector('.profile__job-description'); //ищем текущуюю профессию юзера на странице
const nameInput = document.querySelector('.popup__input_type_name'); // ищем инпут имени (попап 1)
const jobInput = document.querySelector('.popup__input_type_job'); //ищем инпут профессии (попап 1)

const popupPlaceName = document.querySelector('.popup-newplace__input_type_name'); // ищем инпут названия места (попап 2)
const popupPlaceUrl = document.querySelector('.popup-newplace__input_type_url'); // ищем инпут ссылки (попап 2)
const popupImagePhotoUrl = document.querySelector('.popup-image__picture') //ищем картинку места (попап 3)
const popupImageTitle = document.querySelector(".popup-image__title")// ищем название места (попап 3)


const elements = document.querySelector('.elements'); //определяем место где будут создаваться карточки


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

//f открытия попапа профиля

function openCloseEditPopup () {
  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
  } else {
      popup.classList.remove('popup_opened');
  }
}

// //f закрытия попапа профиля
// function closeEditPopup () {

// }

//f получения данных в попап с страницы
function formSubmitHandler(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  openCloseEditPopup()
}

function openClosePlacePopup() {
  popupPlace.classList.toggle('popup-newplace_opened');
  console.log('открыт попап добавления места')
}

function openCloseImagePopup() {
  popupImage.classList.toggle('popup-image_opened')
  console.log('открыт попап имаги');
}

// потом передалаю открытие и закрытие попапов по одном


function renderCard(name, link) {
  const card = elementTemplate.cloneNode(true); // клонируем шаблон
  const cardImage = card.querySelector('.element__photo'); // находим изображение
  const cardTitle = card.querySelector('.element__title'); // находим титл
  const likeButton = card.querySelector('.element__like'); // находим лайк
  const trashButton = card.querySelector('.element__trash'); // находим кнопку удаления

  cardTitle.textContent = name; // присваиваем текст на параметр функции
  cardImage.src = link; // присваиваем сслку на параметр
  cardImage.setAttribute('alt', name); // устанавливаем аттрибут альт для картинки с названием нейма

  //вешаем слушатель на лайк, при клике - меняем класс
  likeButton.addEventListener('click', (event) => event.target.classList.toggle('element__like_active'));
  //вешаем слушатель на кнопку удаления карточки, при клике - сносим всю карточку. Из массива пока что не удаляем.
  trashButton.addEventListener('click', (event) => event.target.closest('.element').remove());

/* открываем увеличенное изображение в попапе */
  cardImage.addEventListener('click', function () {
    const popupImagePhotoUrl = document.querySelector('.popup-image__picture') //ищем картинку места (попап 3)
    const popupImageTitle = document.querySelector('.popup-image__title')// ищем название места (попап 3)

    popupImageTitle.textContent = name;
    popupImagePhotoUrl.src = link;
    popupImagePhotoUrl.setAttribute('alt', name);
     console.log(popupImagePhotoUrl,'это элемент картинки');
    openCloseImagePopup()
  });

  return card;
}
 /*
 добавляем каждую карту на страницу. данные берутся из массива initial.cards.
 Потом как-нибудь сделаю, чтобы новые карты  добавлялись в массив */
initialCards.forEach(element => elements.append(renderCard(element.name, element.link)));


//отображаем шаблон
function renderTemplate(event) {
  //отмена стандартного submit
  event.preventDefault();
  const element = renderCard(popupPlaceName.value, popupPlaceUrl.value); //вставляем ссылку и название карточки

  elements.prepend(element);

  popupPlaceName.value = '';
  popupPlaceUrl.value = '';

  openClosePlacePopup()
};


//Слушатели

editProfileButton.addEventListener('click', openCloseEditPopup);
closePopupEditButton.addEventListener('click', openCloseEditPopup);
checkPopupContainer.addEventListener('submit', formSubmitHandler);
addPlaceButton.addEventListener('click', openClosePlacePopup);
closePopupPlaceButton.addEventListener('click', openClosePlacePopup);
checkPlaceContainer.addEventListener('submit', renderTemplate);
closePopupImageButton.addEventListener('click', openCloseImagePopup);
