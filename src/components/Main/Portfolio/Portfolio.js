import { Link } from "react-router-dom";

function Portfolio() {
 return( 
    <section className='portfolio'>
    <h2 className="potrfolio__title">Портфолио</h2>
    <ul className="portfolio__nav">
        <li className="potfolio__element">
            <p className="potfolio__element-subtitle">Статичный сайт</p>
            <a className="portfolio__element-link" href="https://github.com/alinamz/how-to-learn" target='_blank'></a>
        </li>

        <li className="potfolio__element">
            <p className="potfolio__element-subtitle">Адаптивный сайт</p>
            <a className='portfolio__element-link' href="https://github.com/alinamz/russian-travel"  target='_blank'></a>
        </li>

        <li className="potfolio__element">
            <p className="potfolio__element-subtitle">Одностраничное приложение</p>
            <a className='portfolio__element-link' href='https://github.com/alinamz/react-mesto-auth'  target='_blank'></a>
        </li>
    </ul>
    </section>
 )
}

export default Portfolio