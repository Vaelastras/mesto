export default class Api {
  constructor({baseUrl, userID, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers,
    this.userID = userID
  }

  // обработчик респонсов сервера
  _handleResponse(res){
    if (res.ok) return res.json()
    return Promise.reject(`Error: ${res.status}`)
  }

  //обработчик ошибок ответа с сервера
  _handleResponseError(err){
    return Promise.reject(`Ошибка ${err.message}`)
  }

  // получение начальных данных от пользователя
  getUserInfo() { // Запрос на загрузку данных пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  
  // получение серверных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }
    )
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }
  
  //установка данных профиля  
  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }


  // смена аватары
  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

 

 postUserCard(item) {
  return fetch(`${this._baseUrl}/cards`,  {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
        name: item.title,
        link: item.url
      })
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  //  постановка лаек
  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // снятие лаека
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,  {
      method: 'DELETE',
      headers: this._headers
      }
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
  

}
