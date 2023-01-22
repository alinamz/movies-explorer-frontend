import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList ({movies}) {
    return(
        <div className="elements">
            <ul className="elements__movies">
               { movies.map((movie) => {
                return <MoviesCard  movie={movie} key={movie._id} />
               })
            }
            </ul>
        </div>

    )
}

export default MoviesCardList;