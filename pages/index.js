//переменные

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const checkContainer = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__container');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__job-description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');


//Слушатели

closeButton.addEventListener('click', openPopup);     //ищем клики по кнопке закрытия попапа и запускаем функцию-закрытие
editButton.addEventListener('click', swithAuthor);  //ищем клики по кнопки редактирования профиля и запускаем функцию-смены автора
checkContainer.addEventListener('submit', formSubmitHandler); // ищем событие отправки формы и запускаем фукнцию-отправки формы

// Функции

// открытие/закрытие попапа
function openPopup () {
  if (popup.classList.contains('popup_opened')) { // логика  если в переменной popup есть опенер -
    popup.classList.remove('popup_opened');     // то удали опенер и попап пропадёт
  } else {                                        // а если нет
    popup.classList.add('popup_opened');        // то добавь
  }
}

//получение дефолтных данных с форм попапа
function swithAuthor () {
  openPopup();                                    // открываем попап
  nameInput.value = currentName.textContent;      // получить значение из поля имя и записать его текстом
  jobInput.value = currentJob.textContent;        // получить значение из поля работая и записать его текстом
}

//смена автора в профиле страницы
function formSubmitHandler(event) {
  event.preventDefault();
  currentName.textContent = nameInput.value;      // вписать значение имени из попапа в страницу
  currentJob.textContent = jobInput.value;        // вписать значение работы из попапа в страницу
  openPopup();
}









