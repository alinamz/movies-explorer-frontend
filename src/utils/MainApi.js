class MainApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    register(emailUser, nameUser, passwordUser) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password: passwordUser, email: emailUser, name: nameUser })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    //авторизируем пользователя 
    authorization (email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`)})
    }

    // получение данных пользователя
    getContent ()  {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: this._headers,
        })
          .then(res => res.json())
          .then(data => data)
      }

    // получение  токена
    getToken(token) {
        this._headers.Authorization = `Bearer ${ token }`
    }

    // меняем данные пользователя 
    changeUserInfo({name, email}) {
        return  fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, email })
        })
        .then(res => res.json())
        .then(data => data)
    }

    // добвляем в  сохраненные карточки
    addSaveMovies(movie) {
        return  fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(movie)
        })
        .then(res => res.json())
        .then(data => data)
    }

    // получаем сохраненные карточки
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers,
          })
            .then(res => res.json())
            .then(data => data)
    }

    // убираем карточку из сохраненных
    deleteSaveMovies(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._headers,
          })
            .then(res => res.json())
            .then(data => data)
    }
}

const ApiMain = new MainApi ({
    baseUrl: 'https://api.diploma.movies.nomoredomains.club',
    headers: {
        "content-type": "application/json",
        "Authorization": "",
      }
})

export default ApiMain;