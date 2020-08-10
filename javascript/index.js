 
import {initialCards} from '../components/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {validationConfig,
        checkProfileContainer,
        checkPlaceContainer,
        userSetting,
        popupImage,
        editProfileButton,
        popupEditProfile,
        nameInput,
        jobInput,
        addPlaceButton,
        popupPlace,

        } from '../utils/constants.js'

// const popupPlace = document.querySelector('.popup_type_new-place'); // ищем попап новых мест (попап 2)
// const currentName = document.querySelector('.profile__title'); // ищем текущее имя юзера на странице
// const currentJob = document.querySelector('.profile__job-description'); //ищем текущуюю профессию юзера на странице
// const jobInput = document.querySelector('.popup__input_type_job'); //ищем инпут профессии (попап 1)
// const popupPlaceName = document.querySelector('.popup__input_type_title'); // ищем инпут названия места (попап 2)
// const popupPlaceUrl = document.querySelector('.popup__input_type_url'); // ищем инпут ссылки (попап 2)
// 

//---------------------------
//      popups validation
//---------------------------

const profileContainer= new FormValidator(validationConfig, checkProfileContainer);
profileContainer.enableValidation();
const placeContainer = new FormValidator(validationConfig, checkPlaceContainer);
placeContainer.enableValidation();

//---------------------------
//      Class unit section
//---------------------------
// photo popup unit class
const popupWithImage = new PopupWithImage(popupImage);
// profile popup unit class
const profileForm = new PopupWithForm(popupEditProfile, {
    submitForm: (item) => {
      userInfoProfile.setUserInfo(item)
      profileForm.closePopup();
    }
  }
  );
profileForm.setEventListeners();

// place popup unit class
const openPopupPlaceAdd = new PopupWithForm(popupPlace, {
  submitForm: (item) => {
    const newCard = {name: item.title, link: item.url};
    renderInitialCards(newCard)
    openPopupPlaceAdd.closePopup();
  }
});
openPopupPlaceAdd.setEventListeners();

// userprofile unit class
const userInfoProfile = new UserInfo(userSetting);

/* ----- end class unit section ----- */

/* render initial card from object */
const starterCards = new Section({
  items: initialCards,
  renderer: ((item) => {
    renderInitialCards(item);
  })
}, '.elements');
starterCards.renderItems();

function renderInitialCards(item) {
  const card = new Card(item, '#template', {
    handleCardClick: () => {
      popupWithImage.setEventListeners();
      popupWithImage.openPopup(item.name, item.link);
    }
  });
  starterCards.addItem(card.createCard())
}


//открываем попап Профиля и подставляем данные
editProfileButton.addEventListener('click', () => {
  const profile = userInfoProfile.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
  profileContainer.clearValidationErrors();
  profileForm.openPopup();
});

// создадим экземпляр класса для попапа формы


addPlaceButton.addEventListener('click', () => {
  // openPopupPlaceAdd.setEventListeners();
  placeContainer.clearValidationErrors()
  openPopupPlaceAdd.openPopup();
})



// // function
// //получить текущее имя пользователя в инпуты
// const openProfileEditPopup = () => {
//   nameInput.value = currentName.textContent;
//   jobInput.value = currentJob.textContent;
//   profileContainer.clearValidationErrors()
//   openPopup(popupEditProfile);
// };

// const profileFormSubmitHandler = (evt) => {
//   evt.preventDefault();
//   currentName.textContent = nameInput.value;
//   currentJob.textContent = jobInput.value;
//   closePopup(popupEditProfile);
// };

// //добавить карты на страницу.
// const pasteCardIntoDocument = (element) => elements.prepend(element);

// const addCard = (name, link, cardTemplateSelector) => {
//   const cardOnShow = new Card(name, link, '#template').createCard();
//   pasteCardIntoDocument(cardOnShow);
// };

// const openPopupPlaceAdd = () => {
//   checkPlaceContainer.reset();
//   placeContainer.clearValidationErrors()
//   openPopup(popupPlace);
// };

// //отображаем карточку пользователя
// const userCardHandler = (event) => {
//   event.preventDefault();
//   addCard(popupPlaceName.value, popupPlaceUrl.value);
//   closePopup(popupPlace)
// };

// // добавляем каждую карту на страницу. данные берутся из массива initial.cards.
// const showInitialCardsOnPage = () => initialCards.forEach((element) => {
//   const cardTemplate = new Card(element.name, element.link, '#template')
//   const card = cardTemplate.createCard();
//   pasteCardIntoDocument(card);
//   }
// )


// showInitialCardsOnPage()

// //eventListeners
// popupEditProfile.addEventListener('submit', profileFormSubmitHandler);
// checkPlaceContainer.addEventListener('submit', userCardHandler);
// editProfileButton.addEventListener('click', openProfileEditPopup);
// addPlaceButton.addEventListener('click', openPopupPlaceAdd)

