import { Link } from "react-router-dom"

function Footer() {
     return(
            <footer className="footer">
            <h5 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
            <div className="footer__note">
                <div className="footer__year">© 2020</div>

                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru"  rel='noreferrer'  target='_blank'>Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/alinamz"  rel='noreferrer'  target='_blank' >Github</a>
                </div>
            </div>
        </footer>
     )
}
export default Footer