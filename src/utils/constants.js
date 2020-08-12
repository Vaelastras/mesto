export const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_type_active'
};



export const checkProfileContainer = document.querySelector('.popup__container_type_profile'); // определяем форму редактирования профиля
export const checkPlaceContainer = document.querySelector('.popup__container_type_card'); // определяем форму, откуда будем тянуть инпуты названия места и ссылку (попап2)
export const popupImage = document.querySelector('.popup_type_image'); //ищем попап открытия изображений (попап 3)
export const editProfileButton = document.querySelector('.profile__edit-button'); // ищем кнопку вызова попапа редактирования профиля
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');// ищем обычный попап (попап1)
export const nameInput = document.querySelector('.popup__input_type_name'); // ищем инпут имени (попап 1)
export const jobInput = document.querySelector('.popup__input_type_job'); //ищем инпут профессии (попап 1)
export const currentName = document.querySelector('.profile__title'); // ищем текущее имя юзера на странице
export const currentJob = document.querySelector('.profile__job-description'); //ищем текущуюю профессию юзера на странице
export const addPlaceButton = document.querySelector('.profile__add-button'); // ищем кнопку вызова попапа добавления нового места
export const popupPlace = document.querySelector('.popup_type_new-place'); // ищем попап новых мест (попап 2)


export const userSetting = {
    name: currentName,
    job: currentJob
  }