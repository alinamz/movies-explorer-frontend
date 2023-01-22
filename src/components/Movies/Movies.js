import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import SearchForm from './SearchForm/SearchForm.js';

function Movies({isCardButton, setIsCardButton, movies}) {
    return (
        <main>
            <SearchForm />
            <MoviesCardList isCardButton={isCardButton} setIsCardButton={setIsCardButton} movies={movies}/>
            <div className='add__movies'>
                <button className='add__button'>Ещё</button>
            </div>
        </main>
    )

}
export default Movies;