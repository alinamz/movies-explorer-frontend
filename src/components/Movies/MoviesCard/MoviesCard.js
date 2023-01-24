import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard ({movie}) {
    const location = useLocation();
    const MovieButton = location.pathname === '/movies'
    return(
        <li className="element">
             <img className="element__image" src={movie.link} alt={movie.name} />
             <div className="element__info">
                <h2 className="element__name">{movie.name}</h2>
                <h3 className="element__time">{movie.time}</h3>
                {MovieButton ? (<label className="element__button">
                <input type='checkbox' />
                <span></span>
                </label>) : (<div className="element__delete"></div>)}
           </div>

        </li>
    )
}

export default MoviesCard;