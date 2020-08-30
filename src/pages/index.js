import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
        validationConfig,
        checkProfileContainer,
        checkPlaceContainer,
        checkAvatarContainer,
        userSetting,
        popupImage,
        popupAvatar,
        popupConfirm,
        editProfileButton,
        popupProfile,
        nameInput,
        jobInput,
        addPlaceButton,
        popupPlace,
        apiConfig,
        avatarEditButton
                        } from '../utils/constants.js'

//---------------------------
//      popups validation
//---------------------------
const profileContainer= new FormValidator(validationConfig, checkProfileContainer);
profileContainer.enableValidation();
const placeContainer = new FormValidator(validationConfig, checkPlaceContainer);
placeContainer.enableValidation();
const avatarContainer = new FormValidator(validationConfig, checkAvatarContainer);
avatarContainer.enableValidation()

//---------------------------
//      Class unit section
//---------------------------
const userInfoProfile = new UserInfo(userSetting);// userprofile unit class
const api = new Api(apiConfig);
const myID = api.userID;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, res]) => {
    userInfoProfile.setUserInfo(userData);
    starterCards.renderItems(res);
  })
  .catch(err => console.log(err))
  

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

const openPopupAvatar = new PopupWithForm(popupAvatar, {
  submitForm: (item) => {
    api.patchAvatar(item)
      .then((data) => {
        userInfoProfile.setUserAvatar(data);
        openPopupAvatar.closePopup()
      })
      .catch((err) => {
        console.log(err);
      })
  }
})
openPopupAvatar.setEventListeners();

const profileForm = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    api.patchUserProfile(item)
    .then((res)=> {
      userInfoProfile.setUserInfo(res)
      profileForm.closePopup()
    })
    .catch((err) => {
      console.log(err);
    })
  }
})

profileForm.setEventListeners();

const openPopupPlaceAdd = new PopupWithForm(popupPlace, {
  submitForm: (item) => {
    api.postUserCard(item)
    .then((item) => {
      createCard(item, false)
      openPopupPlaceAdd.closePopup()
    })
    .catch((err) => {
      console.log(err);
    })
  }
})
openPopupPlaceAdd.setEventListeners();

const openPopupConfirm = new PopupWithConfirm(popupConfirm)
openPopupConfirm.setEventListeners();

/* ----- end class unit section ----- */

const starterCards = new Section({
  renderer: (item => createCard(item, true))
}, '.elements');


//генерация карты
function createCard(item, boolean) {
  const card = new Card(item, '#template', myID, {
    
    handleCardClick: () => {
      popupWithImage.openPopup(item.name, item.link);
    },

    handleRemoveCard: () => {
      openPopupConfirm.openPopup();
      openPopupConfirm.setHandleSubmit(() => {
          api.deleteCard(card._id)
            .then(() => {
              card.removeCard();
            })
            .catch((err) => {
              console.log(err);
            })
        }
      );
    },

    handleLikeSet: () => {
      api.putLike(item._id) // обмен данными с сервером
        .then((item) => {      
          card.counterLike(item.likes); // записываем в разметку длину массива из ответа сервера
          card.toggleLike(); // меняем стиль лайка
        })
        .catch((err) => {
          console.log(err);
        })
    },

    handleLikeRemover: () => {
      api.deleteLike(item._id)
        .then((item) => {
          card.counterLike(item.likes);
          card.toggleLike();
        })
        .catch((err) => {
          console.log(err);
        })
    },

  })
  if (boolean === true) {starterCards.addItemAppend(card.generateCard())}
  else starterCards.addItemPrepend(card.generateCard())

  
}




//---------------------------
//      Popup handlers section
//---------------------------

editProfileButton.addEventListener('click', () => {
  const profile = userInfoProfile.getUserInfo();
  nameInput.value = profile.name;
  jobInput.value = profile.about;
  profileContainer.clearValidationErrors()
  profileForm.openPopup();
});

addPlaceButton.addEventListener('click', () => {
  placeContainer.clearValidationErrors()
  openPopupPlaceAdd.openPopup();
})

avatarEditButton.addEventListener('click', () => {
  avatarContainer.clearValidationErrors()
  openPopupAvatar.openPopup()
});
