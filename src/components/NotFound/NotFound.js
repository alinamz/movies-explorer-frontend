import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function NotFound() {
    let history = useHistory();


    return(
        <div className="error">
            <h2 className="error__number">404</h2>
            <p className="error__text">Страница не найдена</p>

            <button onClick={history.goBack} className="error__exit">Назад</button>
        </div>
    )
}

export default NotFound;