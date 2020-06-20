/*
класс - шаблон в классе все отсылки на свойства конфига должны быть с this. -
*/

export class FormValidator {
    constructor (validationConfig, form) {
        this._form = form; // посмотреть на приватность
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass
        this._errorClass = validationConfig.errorClass
    }
    //показ ошибок в спане
    _showInputError = (form, inputElement, errorMessage) => {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
    //удаление ошибок из спана
    _hideInputError = (form, inputElement) => {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    
      // проверка валидности инпутов - бывшая isValid: переписал под тернарник 4fun 
    _checkInputValidity = function(form, inputElement) {
        !inputElement.validity.valid ? 
            this._showInputError(form, inputElement, inputElement.validationMessage) :
            this._hideInputError(form, inputElement);
        
    };
    //проверка валидности по каждому элементу
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    };
    //смена состояния кнопки
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            // buttonElement.setAttrubute('disabled', 'true');
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            // buttonElement.removeAttribure('disabled');
            buttonElement.disabled = false;
        }
    };
    _setEventListeners = (form) => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));  // Найдём все поля формы и сделаем из них массив
        const buttonElement = this._form.querySelector(this._submitButtonSelector); // Найдём в текущей форме кнопку отправки
        this._toggleButtonState(inputList, buttonElement);  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._form, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };
    enableValidation = () =>  this._setEventListeners();
}