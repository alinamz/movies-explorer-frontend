import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from './SearchForm/SearchForm.js';
import React from 'react';

function Movies({
    setInputData,
    isShort,
    shortFilms,
    setIsShort,
    handleCheckboxActive,
    isInputData,
    saveMovie,
    handleDeleteSaveMovie,
    movies,
    isLoading,
    handleAddSaveMovie }) {

    const [addMovie, setAddMovie] = React.useState(12);
    const [isButton, setIsButton] = React.useState(false)
    const width = window.innerWidth;

    const [isSearchMovie, setIsSearchMovie] = React.useState([]);

    
    function filterMovies(searchString, movies) {
        if(searchString !== 0) {
        searchString = searchString?.toLowerCase();
        let filteredMovies = movies?.filter(movie =>
            movie.nameRU.toLowerCase().includes(searchString) ||
            movie.nameEN.toLowerCase().includes(searchString) ||
            movie.country.toLowerCase().includes(searchString) ||
            movie.description.toLowerCase().includes(searchString) ||
            movie.director.toLowerCase().includes(searchString));
           
        setIsSearchMovie(filteredMovies);
        }
    }

    function showNewMovies() {
        let shift = 0;

        if (width > 780) {
            shift = 3;
        } else if (width > 480) {
            shift = 2;
        } else {
            shift = 5;
        }

        const allMoviesLength = isSearchMovie.length;

        if (allMoviesLength !== 0 && allMoviesLength - addMovie) {
            setAddMovie(addMovie + shift);
            setIsButton(addMovie + shift < allMoviesLength);
        } else {
            setIsButton(false);
        }
    }

    React.useEffect(() => {
        if(isShort === false) {
            if (isSearchMovie.length > addMovie) 
            { setIsButton(true); 
            } else { setIsButton(false) }
        } else {
            if (shortFilms.length > addMovie) 
            { setIsButton(true); 
            } else { setIsButton(false) }
            }
    }, [width, isSearchMovie, isShort]);


    React.useEffect(() => {
        JSON.parse(localStorage.getItem('filter'))
    }, [isSearchMovie])
    
    React.useEffect(() => {
        filterMovies(isInputData, movies)
        handleCheckboxActive(shortFilms)
    }, [isInputData, isShort])

    React.useEffect(() => {
       localStorage.setItem('filter', JSON.stringify([isSearchMovie, isShort]))
    },[isSearchMovie])

    return (
        <main>
            <SearchForm
                isInputData={isInputData}
                setInputData={setInputData}
                isShort={isShort}
                setIsShort={setIsShort}
                movies={isSearchMovie}
                handleCheckboxActive={handleCheckboxActive} />
            <MoviesCardList
                isShort={isShort}
                shortFilms={shortFilms}
                isSearchMovie={isSearchMovie}
                saveMovie={saveMovie}
                handleDeleteSaveMovie={handleDeleteSaveMovie}
                handleAddSaveMovie={handleAddSaveMovie}
                isLoading={isLoading}
                movies={movies}
                addMovie={addMovie} />
            <div className='add-movie'>
                <button className={isButton ? 'add-movie__button' : 'add-movie__button-disabled'} onClick={showNewMovies}>Ещё</button>
            </div>
        </main>
    )

}
export default Movies;