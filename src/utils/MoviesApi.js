class MoviesApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    _fetch(partUrl, method='GET', body = null) {
        return fetch (`${this._baseUrl}${partUrl}`, {
        headers: this._headers,
        method: method,
        body: body
    })

    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    }

    getMovies() {
        return this._fetch('/beatfilm-movies')
    }
    
}

const ApiMovies = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
    },
});
export default ApiMovies;