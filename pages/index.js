//переменные

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const checkContainer = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__job-description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// Функции

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}


function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup()
}


//Слушатели

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
checkContainer.addEventListener('submit', formSubmitHandler);






