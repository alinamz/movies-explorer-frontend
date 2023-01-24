import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from './SearchForm/SearchForm.js';

function Movies({isCardButton, setIsCardButton, movies}) {
    return (
        <main>
            <SearchForm />
            <MoviesCardList isCardButton={isCardButton} setIsCardButton={setIsCardButton} movies={movies}/>
            <div className='add-movie'>
                <button className='add-movie__button'>Ещё</button>
            </div>
        </main>
    )

}
export default Movies;