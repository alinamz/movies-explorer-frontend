import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="error">
            <h2 className="error__number">404</h2>
            <p className="error__text">Страница не найдена</p>

            <Link className="error__exit">Назад</Link>
        </div>
    )
}

export default NotFound;