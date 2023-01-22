import { Link } from "react-router-dom";

function NavTab() {
    return(
        <nav className="nav">
            <li className="nav__elements">
                <ul className="nav__element">
                    <a className="nav__link" href='#project'> О проекте</a>
                </ul>
                <ul className="nav__element">
                    <a className="nav__link" href="#techs">Технологии</a>
                </ul>
                <ul className="nav__element">
                    <a className="nav__link" href="#me">Студент</a>
                </ul>
            </li>
        </nav>
)
}
export default NavTab;