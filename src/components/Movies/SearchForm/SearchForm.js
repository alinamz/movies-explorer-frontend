import FilterCheckbox from './FilterCheckbox/FilterCheckbox.js';
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import React from 'react';

function SearchForm({
    isInputData,
    setInputData,
    isShort,
    setIsShort,
    handleCheckboxActive,
    movies
}) {
    const location = useLocation();
    const isMargin = location.pathname === '/movies';
    const isForm = `form__search ${isMargin ? "form__search_movies" : ""}`;
    const [isSpan, setIsSpan] = React.useState(false);

    const [valueInput, setValue] = React.useState(isInputData)

    const inputRef = useRef(null);


    React.useEffect(() => {
        JSON.parse(localStorage.getItem('value'))
    }, [valueInput])

    function onClick(e) {
        const movieSearch = inputRef.current.value
        if (movieSearch >= 1) {
            e.preventDefault();
            setIsSpan(true)
        } else {
            e.preventDefault();
            setInputData(valueInput)
            setIsSpan(false)
            localStorage.setItem('value', JSON.stringify(movieSearch))
        }
        e.preventDefault();
    }

    function onChange(e) {
        setValue(e.target.value)
    }

    return (
        <form className="form" >
            <div className={isForm}>
                <input onChange={onChange} value={valueInput} className="form__input" name='movie' placeholder="Фильм" id='movie' ref={inputRef} />
                <span className={isSpan ? "form__error" : "form__error-disabled"}>Нужно ввести ключевое слово</span>
                <button onClick={onClick} className="form__button" type='submit' id='submit'>Поиск</button>
            </div>
            <FilterCheckbox
                isShort={isShort}
                setIsShort={setIsShort}
                movies={movies}
                handleCheckboxActive={handleCheckboxActive}></FilterCheckbox>
        </form>
    )
}


export default SearchForm;