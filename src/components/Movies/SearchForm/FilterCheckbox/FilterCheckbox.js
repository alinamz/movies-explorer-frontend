import { useLocation } from "react-router-dom";
import React from 'react';

function FilterCheckbox({ isShort, setIsShort, handleCheckboxActive, movies }) {
    const location = useLocation();
    const isMargin = location.pathname === '/saved-movies';
    const isBorder = `checkbox-filter ${isMargin ? "checkbox-filter_movie" : ""}`;

    function onChange() {
        if (isShort !== true) {
            handleCheckboxActive(movies)
            setIsShort(true)
            if (isMargin !== true) {
                localStorage.setItem('filterChekbox', JSON.stringify(isShort))
            }
        } else {
            setIsShort(false)
        }
    }

    React.useEffect(() => {
        if (isMargin !== true) {
            localStorage.setItem('filterChekbox', JSON.stringify(isShort))
        }
    })
    return (
        <div className={isBorder}>
            <label className='checkbox-filter__label'>
                <input onChange={onChange} type='checkbox' className={`input ${isShort ? "input_active" : "input_dis"} `} />
                <span></span>
            </label>
            <div className="checkbox-filter__name">Короткометражки</div>
        </div>
    )
}

export default FilterCheckbox;