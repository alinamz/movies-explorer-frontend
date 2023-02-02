import { useLocation } from "react-router-dom";

function FilterCheckbox () {
    const location = useLocation();
    const isMargin = location.pathname === '/saved-movies';
    const isBorder = `checkbox-filter ${isMargin ? "checkbox-filter_movie" : ""}`
    return(
        <div className={isBorder}>
            <label className='checkbox-filter__label'>
            <input  type='checkbox' />
            <span></span>
            </label>
            <div className="checkbox-filter__name">Короткометражки</div>
        </div>
    )
}

export default FilterCheckbox;