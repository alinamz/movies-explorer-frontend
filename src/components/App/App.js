import React from "react";
import { Router, Switch, Route, useHistory } from "react-router-dom";
import { CurrentContext } from "../../context/CurrentContext.js";
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js'
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound';
import ApiMovies from '../../utils/MoviesApi';
import ApiMain from "../../utils/MainApi";
import ProtectedRoute from '../ProtectedRoute'

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [burgerMenu, setBurgerMenu] = React.useState(true);
  const [displayNav, setDisplayNav] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShort, setIsShort] = React.useState(false);

  const [shortFilms, setShortFilm] = React.useState([]);
  const [shortSaveFilms, setSaveShortFilm] = React.useState({})

  const [movies, setMovies] = React.useState([]);
  const [saveMovie, setSaveMovie] = React.useState([]);

  // константа для отправки не зарегестрированных пользователей в окно регистарции
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isInputData, setInputData] = React.useState('');
  const [isInputDataSaveMovie, setInputDataSaveMovie] = React.useState('')

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    if (!loggedIn) {
      setMovies([]);
      return;
    }
     ApiMain
     .getSavedMovies()
      .then((savedMovies) => {
        setSaveMovie(savedMovies)
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }, [])

  function handleCheckboxActive(movies) {
    let films = movies.filter(arr => arr.duration <= 40);
    setShortFilm(films)
  }

  function handleSaveMovieCheckboxActive(saveMovie) {
    let films = Array.isArray(saveMovie) ? saveMovie.filter(arr => arr.duration <= 40) : [];
    setSaveShortFilm(films)
  }

  function OpenMenu() {
    setDisplayNav(!displayNav);
    setBurgerMenu(!burgerMenu)
  }

  // функция проверки токена 
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    ApiMain.getToken(jwt)
    if (jwt) {
      ApiMain.getContent()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res)
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }

  // меняем данные пользователя
  function handleProfileInfo(data) {
    ApiMain
      .changeUserInfo({
        name: data.name,
        email: data.email
      })
      .then((newDataProfile) => {
        setCurrentUser(newDataProfile)
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }

  // функция регистрации
  function handleRegist(emailUser, nameUser, passwordUser) {
    ApiMain
      .register(emailUser, nameUser, passwordUser)
      .then((res) => {
        console.log('Регистрация прошла успешно');
        setCurrentUser(res);
        history.push('/signin')
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }

  // функция авторизации
  function handleAuthorization(emailUser, passwordUser) {
    if (!emailUser || !passwordUser) {
      return;
    }
    ApiMain
      .authorization(emailUser, passwordUser)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
          setLoggedIn(true);
          history.push('/movies');
        } else {
          return;
        }
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }

  // функция выхода из аккаунта 
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/')
  }

  // добавляем карточку в сохраненные
  function handleAddSaveMovie(movie) {
    ApiMain
      .addSaveMovies(movie)
      .then((newMovie) => {
        setSaveMovie([newMovie, ...saveMovie]);
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }

  // удаляем карточку
  function handleDeleteSaveMovie(movieId) {
    ApiMain
      .deleteSaveMovies(movieId)
      .then((data) => {
        const newSavedMovies = saveMovie.filter((movie) => movie._id !== data._id);
        setSaveMovie([...newSavedMovies]);
      })
      .catch(() => console.log('Что-то пошло не так!'))
  }


  React.useEffect(() => {
    if (!loggedIn) {
      console.log('Не авторизован, фильмы не запрашиваем');
      setMovies([]);
      return;
    }
    setIsLoading(true)
    ApiMovies
      .getMovies()
      .then((movies) => {
        setMovies(movies)
      })
      .catch(() => console.log('Что-то пошло не так!'))
      .finally(() => {
        setIsLoading(false);
      })
  }, [isInputData, loggedIn])

  return (
    <Router history={history}>
      <CurrentContext.Provider value={currentUser} >
        <div className="background">
          <div className='page'>
            <Header displayNav={displayNav} onClick={OpenMenu} burgerMenu={burgerMenu} loggedIn={loggedIn} />
            <Switch>
              <Route exact path="/">
                <Main />
                <Footer />
              </Route>

              <ProtectedRoute loggedIn={loggedIn} path="/movies">
                <Movies
                  setInputData={setInputData}
                  isShort={isShort}
                  shortFilms={shortFilms}
                  setIsShort={setIsShort}
                  handleCheckboxActive={handleCheckboxActive}
                  isInputData={isInputData}
                  saveMovie={saveMovie}
                  handleDeleteSaveMovie={handleDeleteSaveMovie}
                  handleAddSaveMovie={handleAddSaveMovie}
                  isLoading={isLoading}
                  movies={movies}
                 />
                <Footer />
              </ProtectedRoute>

              <ProtectedRoute loggedIn={loggedIn} path='/saved-movies'>
                <SavedMovies
                  setInputData={setInputDataSaveMovie}
                  handleCheckboxActive={handleSaveMovieCheckboxActive}
                  isShort={isShort}
                  shortFilms={shortSaveFilms}
                  setIsShort={setIsShort}
                  isInputData={isInputDataSaveMovie}
                  onClick={handleDeleteSaveMovie}
                  setSaveMovie={setSaveMovie}
                  saveMovie={saveMovie} />
                <Footer />
              </ProtectedRoute>

              <ProtectedRoute loggedIn={loggedIn} path='/profile'>
                <Profile handleProfileInfo={handleProfileInfo} currentUser={currentUser} handleLogout={handleLogout} />
              </ProtectedRoute>

              <Route path='/signup'>
                <Register handleRegist={handleRegist} />
              </Route>

              <Route path='/signin'>
                <Login handleAuthorization={handleAuthorization} />
              </Route>

              <Route path='*'>
                <NotFound />
              </Route>

            </Switch>

          </div>
        </div>
      </CurrentContext.Provider>
    </Router>

  );
}

export default App;
