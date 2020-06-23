

export const popupImage = document.querySelector('.popup_type_image'); //ищем попап открытия изображений (попап 3)
export const popupImagePhotoUrl = document.querySelector('.popup__image') //ищем картинку места (попап имг)
export const popupImageTitle = document.querySelector('.popup__image-title')// ищем название места (попап имг)
export const popupParent = document.querySelector('.popups'); // общая секция для всех попапов

export const openPopup = (element) => {
  element.classList.add('popup_active');
  setListenersOnPopup(element);
}

export const closePopup = (element) => {
  element.classList.remove('popup_active');
  removeListenersOnPopup(element);
}

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

const setListenersOnPopup = (element) => {
  document.addEventListener('keydown', escapeHandler); // клик по эккейпу
  element.addEventListener('mousedown', overlayHandlerClose) // клик в оверлей;
  popupParent.addEventListener('click', handlePopupClose)//клик в крест
}

const removeListenersOnPopup = (element) => {
  document.removeEventListener('keydown', escapeHandler); // клик по эккейпу
  element.removeEventListener('mousedown', overlayHandlerClose) // клик в оверлей
  popupParent.removeEventListener('click', handlePopupClose) //клик в крест
}