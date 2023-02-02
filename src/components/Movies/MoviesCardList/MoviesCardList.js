import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";


function MoviesCardList({ isShort, shortFilms, isSearchMovie, saveMovie, handleDeleteSaveMovie, addMovie, isLoading, handleAddSaveMovie, onClick }) {
    addMovie = addMovie ? addMovie : 100;

    const movies = isShort
        ? shortFilms
        : isSearchMovie;

    const isMoviesEmpty = movies == null ||
        !Array.isArray(movies) ||
        movies.length === 0 ||
        movies.filter(movie => !movie._hide).length === 0;

    return (
        <>
            {isMoviesEmpty ? (<div className="no-elements">Ничего не найдено</div>) :
                (<div className="elements">
                    {isLoading ? (<Preloader></Preloader>) :
                        (<ul className="elements__movies">
                            {movies?.filter(movie => !movie._hide).slice(0, addMovie).map((movie) => {
                                return <MoviesCard saveMovie={saveMovie} handleDeleteSaveMovie={handleDeleteSaveMovie} onClick={onClick} handleAddSaveMovie={handleAddSaveMovie} movie={movie} key={movie.id || movie.movieId} />
                            })
                            }
                        </ul>)}
                </div>)}
        </>
    )
}

export default MoviesCardList;