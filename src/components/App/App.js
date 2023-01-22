import logo from '../../logo.svg';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import SaveMovies from '../../utils/saveMovies.js';
import AllMovies from '../../utils/movies.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [burgerMenu, setBurgerMenu] = React.useState(true);
  const [displayNav, setDisplayNav] = React.useState(true);
  const [isLoged, setIsLoged] = React.useState(true);
  const [isSpanName, setSpanName] = React.useState(true);
  const [isSpanEmail, setSpanEmail] = React.useState(true);
  const [isSpanPassword, setSpanPassword] = React.useState(true);

  const [isCardButton, setIsCardButton] = React.useState(true);

   function OpenMenu() {
    setDisplayNav(!displayNav);
    setBurgerMenu(!burgerMenu)
   }

  return (
    <CurrentContext.Provider value={currentUser}>
    <div className="background">
      <div className='page'>
      <Header displayNav={displayNav} onClick={OpenMenu} burgerMenu={burgerMenu} isLoged={isLoged} />

      <Switch>

      <Route exact path="/">
        <Main setIsLoged={setIsLoged} isLoged={isLoged}/>
        <Footer />
      </Route>

       <Route path="/movies">
        <Movies isCardButton={isCardButton} setIsCardButton={setIsCardButton} movies={AllMovies}/>
        <Footer />
      </Route>

       <Route path='/saved-movies'>
        <SavedMovies movies={SaveMovies}/>
        <Footer />
      </Route>

       <Route path='/profile'>
        <Profile />
      </Route>

       <Route path='/signup'>
        <Register setIsLoged={setIsLoged} setSpanName={setSpanName} isSpanName={isSpanName} setSpanEmail={setSpanEmail} isSpanEmail={isSpanEmail} isSpanPassword={isSpanPassword} setSpanPassword={setSpanPassword}/>
      </Route>

      <Route path='/signin'>
        <Login setIsLoged={setIsLoged}/>
      </Route>  

      <Route path='/404'>
        <NotFound />
      </Route>

      </Switch>

      </div>
    </div>
    </CurrentContext.Provider>
  );
}

export default App;
