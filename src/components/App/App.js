import React from "react";
import { Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
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
import ApiMain from "../../utils/MainApi";
import ProtectedRoute from '../ProtectedRoute'
import Popup from "../popup/Popup.js";


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [burgerMenu, setBurgerMenu] = React.useState(true);
  const [displayNav, setDisplayNav] = React.useState(true);


  const [isShort, setIsShort] = React.useState(localStorage.getItem('filterChekbox') ? JSON.parse(localStorage.getItem('filterChekbox')) : false);

  const [shortFilms, setShortFilm] = React.useState(localStorage.getItem('shortFilm') ? JSON.parse(localStorage.getItem('shortFilm')) : []);
  const [shortSaveFilms, setSaveShortFilm] = React.useState([])


  const [saveMovie, setSaveMovie] = React.useState([]);

  // константа для отправки не зарегестрированных пользователей в окно регистарции
  const [loggedIn, setLoggedIn] = React.useState(true);

  const [isInputData, setInputData] = React.useState('');

  const [infoResult, setInfoResult] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const history = useHistory();

  function handleCheckboxActive(movies) {
    let films = movies.filter(arr => arr.duration <= 40);
    setShortFilm(films)
    localStorage.setItem('shortFilm', JSON.stringify(films))
  }

  function handleSaveMovieCheckboxActive(saveMovie) {
    let films = Array.isArray(saveMovie) ? saveMovie.filter(arr => arr.duration <= 40) : [];
    setSaveShortFilm(films)
  }

  function OpenMenu() {
    setDisplayNav(!displayNav);
    setBurgerMenu(!burgerMenu)
  }

  function closePopup() {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  }

  // функция проверки токена 
  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    ApiMain.getToken(jwt)
    if (jwt) {
      ApiMain
      .getContent()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res)
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        })
    } else {
      setLoggedIn(false);
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
        setInfoResult(true)
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
        ApiMain
          .authorization(emailUser, passwordUser)
          .then((data) => {
            if (data.token) {
              localStorage.setItem("jwt", data.token);
              tokenCheck();
              history.push('/movies');
            } else {
              return;
            }
          })
        history.push('/movies')
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
    setSaveMovie([]);
    setCurrentUser({});
    localStorage.clear()
    history.push('/')
  }


  // добавляем карточку в сохраненные
  function handleAddSaveMovie(movie) {
    ApiMain
      .addSaveMovies(movie)
      .then((newMovie) => {
        setSaveMovie([...saveMovie, newMovie]);
        setIsOpen(true)
        closePopup()
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
    tokenCheck();
    if (localStorage.getItem("jwt")) {
      ApiMain
        .getSavedMovies()
        .then((savedMovies) => {
          setSaveMovie(savedMovies)
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn])

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

              
              <ProtectedRoute loggedIn={loggedIn} path='/movies'>
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
                  />
                  <Footer />
                </ProtectedRoute>
           
                <ProtectedRoute loggedIn={loggedIn} path='/saved-movies'>
                  <SavedMovies
                    handleCheckboxActive={handleSaveMovieCheckboxActive}
                    shortFilms={shortSaveFilms}
                    onClick={handleDeleteSaveMovie}
                    setSaveMovie={setSaveMovie}
                    saveMovie={saveMovie} />
                  <Footer />
                </ProtectedRoute>

                <ProtectedRoute loggedIn={loggedIn} path='/profile'>
                  <Profile setInfoResult={setInfoResult} handleProfileInfo={handleProfileInfo} currentUser={currentUser} handleLogout={handleLogout} infoResult={infoResult} />
                  <Popup closePopup={closePopup} isOpen={isOpen} />
                </ProtectedRoute>

                <Route path='/signup'>
                { loggedIn ? 
                 (<Redirect to='/movies' />) :  ( <Register handleRegist={handleRegist} />)}
                 
                </Route>

                <Route path='/signin'>
                 { loggedIn ? 
                 (<Redirect to='/movies' />) :  (<Login handleAuthorization={handleAuthorization} />)}
                </Route>
                 
                

                <Route path='*'>
                  <NotFound />
                </Route>

              </Switch>

              <Popup isOpen={isOpen} />

            </div>
          </div>
        </CurrentContext.Provider>
    </Router>

  );
}

export default App;
