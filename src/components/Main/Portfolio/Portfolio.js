function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__nav">
                <li className="portfolio__element">
                    <a className='portfolio__element-links'  rel='noreferrer' href="https://github.com/alinamz/how-to-learn" target='_blank'>
                        <p className="portfolio__element-subtitle">Статичный сайт</p>
                        <div className="portfolio__element-link"></div>
                    </a>
                </li>

                <li className="portfolio__element">
                    <a className='portfolio__element-links' rel='noreferrer' href="https://github.com/alinamz/russian-travel" target='_blank'>
                        <p className="portfolio__element-subtitle">Адаптивный сайт</p>
                        <div className='portfolio__element-link'></div>
                    </a>
                </li>

                <li className="portfolio__element">
                    <a className='portfolio__element-links' rel='noreferrer' href="https://github.com/alinamz/mesto-react" target='_blank'>
                        <p className="portfolio__element-subtitle">Одностраничное приложение</p>
                        <div className='portfolio__element-link'></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio