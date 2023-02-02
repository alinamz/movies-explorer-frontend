import FilterCheckbox from './FilterCheckbox/FilterCheckbox.js';
import { useLocation } from "react-router-dom";

function SearchForm() {
    const location = useLocation();
    const isMargin = location.pathname === '/movies';
    const isForm = `form__search ${isMargin ? "form__search_movies" : ""}`;
    return (
        <form className="form">
            <div className={isForm}>
            <input className="form__input" name='movie' placeholder="Фильм" required/>
            <button className="form__button" type='submit'>Поиск</button>
            </div>
            <FilterCheckbox></FilterCheckbox>
        </form>
    )
}

export default SearchForm;