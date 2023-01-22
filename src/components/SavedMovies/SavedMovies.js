import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js"

function SavedMovies ({movies}) {
    return(
        <div>
        <SearchForm />
        <MoviesCardList movies={movies} />
        <div className="saved__btn"></div>
        </div>
    )
}

export default SavedMovies;