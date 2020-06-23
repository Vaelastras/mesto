//переменные
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {popupImage, openPopup, closePopup} from './utils.js';
import {FormValidator} from './FormValidator.js';

// export const popupImage = document.querySelector('.popup_type_image'); //ищем попап открытия изображений (попап 3)
// export const popupImagePhotoUrl = document.querySelector('.popup__image') //ищем картинку места (попап имг)
// export const popupImageTitle = document.querySelector('.popup__image-title')// ищем название места (попап имг)

// export const popupParent = document.querySelector('.popups'); // общая секция для всех попапов
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
// const elementTemplate = document.querySelector('#template').content; 

export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
};

// // Обработчики закрытия попапа кнопкой
// // user-type handlers
// const escapeHandler = (evt) => {
//   if (evt.key ==='Escape') {
//     const openedPopup = document.querySelector('.popup_active')
//     closePopup(openedPopup)
//   }
// };

// const overlayHandlerClose = (evt) => {
//   if (evt.target.classList.contains('popup')) {
//     const openedPopup = document.querySelector('.popup_active');
//     closePopup(openedPopup);
//   }
// };

// function handlePopupClose(evt) {
//   if (evt.target.classList.contains('popup__close')) {
//     closePopup(evt.target.closest('.popup'));
//   }
// }

// export function setListenersOnPopup (element) {
//   document.addEventListener('keydown', escapeHandler); // клик по эккейпу
//   element.addEventListener('mousedown', overlayHandlerClose) // клик в оверлей;
//   popupParent.addEventListener('click', handlePopupClose)//клик в крест
// }

// function removeListenersOnPopup(element) {
//   document.removeEventListener('keydown', escapeHandler); // клик по эккейпу
//   element.removeEventListener('mousedown', overlayHandlerClose) // клик в оверлей
//   popupParent.removeEventListener('click', handlePopupClose) //клик в крест
// }

// function
// Антон, не совсем понял что имеется в виду под вызовом экземпляра класса 
const clearPopupValidationErrors = (element) => {
  if (element !==  popupImage) {
    const inputsList = Array.from(element.querySelectorAll(validationConfig.inputSelector));
    const submitButton = element.querySelector(validationConfig.submitButtonSelector);
  
    inputsList.forEach((formInput) => {
      const formError = element.querySelector(`#${formInput.id}-error`);
      formInput.classList.remove(validationConfig.inputErrorClass);
      formError.classList.remove(validationConfig.errorClass);
      formError.textContent = '';
    })
  submitButton.classList.remove(validationConfig.inactiveButtonClass);
  submitButton.disabled = false;
  };
}

const submitDeactivator =  (element) => {
  const submitButton = element.querySelector(validationConfig.submitButtonSelector)  
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
}

// export const openPopup = (element) => {
//   element.classList.add('popup_active');
//   setListenersOnPopup(element);
// }

// const closePopup = (element) => {
//   element.classList.remove('popup_active');
//   removeListenersOnPopup(element);
// }

const profileContainer= new FormValidator(validationConfig, checkProfileContainer);
profileContainer.enableValidation();

const placeContainer = new FormValidator(validationConfig, checkPlaceContainer);
placeContainer.enableValidation();

//получить текущее имя пользователя в инпуты
const openProfileEditPopup = () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  submitDeactivator(checkProfileContainer);
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
  submitDeactivator(popupPlace);
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
  // console.warn('if you show it - you will die in 7th day!');
  pasteCardIntoDocument(card);
  }
)


showInitialCardsOnPage()

//eventListeners
popupEditProfile.addEventListener('submit', profileFormSubmitHandler);
checkPlaceContainer.addEventListener('submit', userCardHandler);
editProfileButton.addEventListener('click', openProfileEditPopup);
addPlaceButton.addEventListener('click', openPopupPlaceAdd)

