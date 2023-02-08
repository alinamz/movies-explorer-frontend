import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ saveMovie, handleDeleteSaveMovie, movie, handleAddSaveMovie, onClick }) {
  const location = useLocation();
  const MovieButton = location.pathname === '/movies';
  const allMovies = `https://api.nomoreparties.co/${movie.image.url}`;
  const saveMovieImg = movie.image;

  const [isSaveMovieButton, setIsSaveMovieButton] = React.useState(movie.isSaveMovieButton);
  const id = movie.movieId !== undefined ? movie.movieId : movie.id;
  let saveId = saveMovie?.find(item => item.id === movie.movieId)?._id;

  function StorageSaveMovieById(id, isSaved) {
    const savedMovies = localStorage.getItem('savedMovies');
    const newSavedMovies = savedMovies == null ? {} : JSON.parse(savedMovies);
    if (isSaved)
      newSavedMovies[id] = true;
    else
      delete newSavedMovies[id];
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
  }

  function SaveAddMovie() {
    handleAddSaveMovie({
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: "https://api.nomoreparties.co" + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail:
        "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
      movieId: id,
    })
  }

  const handleClickButton = () => {
    if (isSaveMovieButton !== true) {
      setIsSaveMovieButton(true)
      SaveAddMovie(movie)
    } else {
      handleDeleteSaveMovie(saveId)
      setIsSaveMovieButton(false)
      StorageSaveMovieById(id, false)
    }
  }

  function DeleteSaveMovie() {
    onClick(movie._id);
    setIsSaveMovieButton(false);
    StorageSaveMovieById(id, false)
  }

  useEffect(() => {
    const stateStr = localStorage.getItem('savedMovies');
    const state = stateStr != null ? JSON.parse(stateStr) : null; 
    if (state != null && state[id]) {
      setIsSaveMovieButton(state[id]);
    }
  }, []);

  useEffect(() => {
    if (isSaveMovieButton !== undefined) {
      StorageSaveMovieById(id, isSaveMovieButton)
    }
  }, [isSaveMovieButton])

  return (
    <li className="element">
      <a
        href={movie.trailerLink}
        rel="noreferrer"
        target="_blank"
      >
        <img className="element__image" src={MovieButton ? allMovies : saveMovieImg} alt={movie.name} />
      </a>
      <div className="element__info">
        <h2 className="element__name">{movie.nameRU}</h2>
        <h3 className="element__time">{movie.duration}</h3>
        {MovieButton ? (<label className={`element__button ${isSaveMovieButton ? "element__button_active" : "element__button_disabled"}`}>
          <input isSaveMovieButton={isSaveMovieButton} onClick={handleClickButton} type='checkbox' className={`element__input ${isSaveMovieButton ? "element__input_active" : "element__input_disabled"}`} />
          <span></span>
        </label>) : (<button onClick={DeleteSaveMovie} className="element__delete"></button>)}
      </div>

    </li>
  )
}

export default MoviesCard;