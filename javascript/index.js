
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {popupImage, openPopup, closePopup} from './utils.js';
import {FormValidator} from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_type_edit-profile');// ищем обычный попап (попап1)
const popupPlace = document.querySelector('.popup_type_new-place'); // ищем попап новых мест (попап 2)
const editProfileButton = document.querySelector('.profile__edit-button'); // ищем кнопку вызова попапа редактирования профиля
const addPlaceButton = document.querySelector('.profile__add-button'); // ищем кнопку вызова попапа добавления нового места
const checkProfileContainer = document.querySelector('.popup__container_type_profile'); // определяем форму редактирования профиля
const checkPlaceContainer = document.querySelector('.popup__container_type_card'); // определяем форму, откуда будем тянуть инпуты названия места и ссылку (попап2)
const currentName = document.querySelector('.profile__title'); // ищем текущее имя юзера на странице
const currentJob = document.querySelector('.profile__job-description'); //ищем текущуюю профессию юзера на странице
const nameInput = document.querySelector('.popup__input_type_name'); // ищем инпут имени (попап 1)
const jobInput = document.querySelector('.popup__input_type_job'); //ищем инпут профессии (попап 1)
const popupPlaceName = document.querySelector('.popup__input_type_title'); // ищем инпут названия места (попап 2)
const popupPlaceUrl = document.querySelector('.popup__input_type_url'); // ищем инпут ссылки (попап 2)
const elements = document.querySelector('.elements'); //определяем место где будут создаваться карточки

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
};

const profileContainer= new FormValidator(validationConfig, checkProfileContainer);
profileContainer.enableValidation();

const placeContainer = new FormValidator(validationConfig, checkPlaceContainer);
placeContainer.enableValidation();

// function
const clearPopupValidationErrors = (element) => {
/* Будет круто, если для очистки ошибок полей и деактивации кнопки сабмита при повторном открытии форм 
будет использовать методы класса FormValidator, так как там они уже реализованы. 
Их можно сделать публичными и использовать в этом файле для каждого экземпляра FormValidator.

Anton Mishchenkov

*/  
  if (element ===  popupEditProfile) { profileContainer.clearValidationErrors();}
  else if (element ===  popupPlace) { placeContainer.clearValidationErrors()};
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

//добавить карты на страницу.
const pasteCardIntoDocument = (element) => elements.prepend(element);

const addCard = (name, link, cardTemplateSelector) => {
  const cardOnShow = new Card(name, link, '#template').createCard();
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
const showInitialCardsOnPage = () => initialCards.forEach((element) => {
  const cardTemplate = new Card(element.name, element.link, '#template')
  const card = cardTemplate.createCard();
  pasteCardIntoDocument(card);
  }
)


showInitialCardsOnPage()

//eventListeners
popupEditProfile.addEventListener('submit', profileFormSubmitHandler);
checkPlaceContainer.addEventListener('submit', userCardHandler);
editProfileButton.addEventListener('click', openProfileEditPopup);
addPlaceButton.addEventListener('click', openPopupPlaceAdd)

