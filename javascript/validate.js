// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const myObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_type_active'
};



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(myObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(myObj.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(myObj.inputErrorClass);
  errorElement.classList.remove(myObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const isValid = function(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { // проходим по этому массиву методом some
  /*Если поле не валидно, колбэк вернёт true
   Обход массива прекратится и вся фунцкция
   hasInvalidInput вернёт true */
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(myObj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(myObj.inactiveButtonClass);
  }
};


const setEventListeners = (formElement) => {
const inputList = Array.from(formElement.querySelectorAll(myObj.inputSelector));  // Найдём все поля формы и сделаем из них массив
const buttonElement = formElement.querySelector(myObj.submitButtonSelector); // Найдём в текущей форме кнопку отправки
toggleButtonState(inputList, buttonElement);  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
});
};


function enableValidation() {
  const formList = Array.from(document.querySelectorAll(myObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
