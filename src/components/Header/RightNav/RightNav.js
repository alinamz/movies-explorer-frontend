import { NavLink } from 'react-router-dom';

function RightNav({ displayNav }) {
    const headerMenu = `header__container-links header__container-links_movies header__container-links_transform ${displayNav ? " " : "header__container-links_transform-change" }`;
    return (
        <div className="header__links" >
            <ul className={headerMenu}>
                <li  className='header__link header__link_movie'><NavLink className='header__link-decor' to='/movies'>Фильмы</NavLink> </li>
                <li className='header__link header__link_home'><NavLink className='header__link-decor'  target='_blank' to='/'>Главная</NavLink></li>
                <li className='header__link header__link_saved-movies'><NavLink className='header__link-decor' to='/saved-movies'>Сохраненные фильмы</NavLink></li>
                <li className='header__link header__link_profile'><NavLink className='header__link-decor header__link-decor_profile' to='/profile'>Аккаунт</NavLink></li>
            </ul>
        </div>
    )
}

export default RightNav;