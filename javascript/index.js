 
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
      userInfoProfile.setUserInfo(item);
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

//---------------------------
//      Popup handlers section
//---------------------------
// popupProfile handler
editProfileButton.addEventListener('click', () => {
  const profile = userInfoProfile.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.job;
  profileContainer.clearValidationErrors();
  profileForm.openPopup();
});

// popupPlace handler
addPlaceButton.addEventListener('click', () => {
  placeContainer.clearValidationErrors()
  openPopupPlaceAdd.openPopup();
})
