class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _sendRequest(endpoint, options) {
    options.headers = this._headers;
    return fetch(`${this._baseUrl}/${endpoint}`, options)
      .then(this._checkResponse);
  }

  getUserInfo() {
    return this._sendRequest('users/me', { method: 'GET' });
  }

  getInitialCards() {
    return this._sendRequest('cards', { method: 'GET' });
  }

  editUserInfo(userInfo) {
    return this._sendRequest('users/me', {
      method: 'PATCH',
      body: JSON.stringify(userInfo)
    });
  }

  editUserAvatar(avatar) {
    return this._sendRequest('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(avatar)
    });
  }

  addCard(card) {
    return this._sendRequest('cards', {
      method: 'POST',
      body: JSON.stringify(card)
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`cards/${cardId}`, { method: 'DELETE' });
  }

  addLike(cardId) {
    return this._sendRequest(`cards/${cardId}/likes`, { method: 'PUT' });
  }

  deleteLike(cardId) {
    return this._sendRequest(`cards/${cardId}/likes`, { method: 'DELETE' });
  }

  toggleLike(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '1ef1b3d5-edaa-4946-a8b9-3e3aa212cdf2',
    'Content-Type': 'application/json'
  }
});
