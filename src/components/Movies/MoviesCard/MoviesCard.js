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
    }
  }

  function DeleteSaveMovie() {
    onClick(movie._id);
    setIsSaveMovieButton(movie.isSaveMovieButton)
  }

  useEffect(() => {
    const state = window.localStorage.getItem('saveMovieClick'+ id);
    if (state !== 'undefined') {
      const isSaveMovieButton = JSON.parse(state)
      if (isSaveMovieButton) {
        setIsSaveMovieButton(isSaveMovieButton)
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saveMovieClick'+ id, JSON.stringify(isSaveMovieButton))
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