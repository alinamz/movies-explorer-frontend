import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js"
import React from "react";

function SavedMovies({
    setInputData,
    shortFilms,
    handleCheckboxActive,
    setSaveMovie,
    saveMovie,
    onClick,
    isInputData,
    isShort,
    setIsShort }) {

    const [filterChanged, setFilterChanged] = React.useState(false);

    function filterMovies(searchString, saveMovie) {
        if (searchString != null) {
            searchString = searchString.toLowerCase();
            let isAnyMovieChanged = false;
            saveMovie?.forEach(movie => {
                const showMovie = movie.nameRU.toLowerCase().includes(searchString) ||
                    movie.nameEN.toLowerCase().includes(searchString) ||
                    movie.country.toLowerCase().includes(searchString) ||
                    movie.description.toLowerCase().includes(searchString) ||
                    movie.director.toLowerCase().includes(searchString);

                if ((movie._hide == null && showMovie) || (movie._hide != null && movie._hide === showMovie)) {
                    console.log('changed for movie', movie);
                    isAnyMovieChanged = true;
                }

                movie._hide = !showMovie;
            });

            if (isAnyMovieChanged) {
                setFilterChanged(!filterChanged);
            }

            return;
        }

        if (searchString === '') {
            let isAnyMovieChanged = false;
            saveMovie?.forEach(movie => {
                if (movie._hide) {
                    isAnyMovieChanged = true;
                }
                movie._hide = false;
            });
            
            if (isAnyMovieChanged) {
                setFilterChanged(!filterChanged);
            }

            return;
        }
    }

    React.useEffect(() => {
        console.log('do filter', isInputData);
        filterMovies(isInputData, saveMovie)
    }, [isInputData, isShort, saveMovie, filterChanged])

    React.useEffect(() => {
        handleCheckboxActive(saveMovie)
    }, [saveMovie])


    return (
        <div>
            <SearchForm
                setInputData={setInputData}
                isInputData={isInputData}
                movies={saveMovie}
                isShort={isShort}
                setIsShort={setIsShort}
                handleCheckboxActive={handleCheckboxActive} />
            <MoviesCardList isShort={isShort} shortFilms={shortFilms} onClick={onClick}
                isSearchMovie={saveMovie} />
            <div className="save-movie"></div>
        </div>
    )
}

export default SavedMovies;