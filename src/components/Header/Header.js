import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import BurgerNav from './BurgerNav/BurgerNav';

function Header({ displayNav, onClick, burgerMenu, isLoged }) {
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isLogo = location.pathname === '/signin' || location.pathname === '/signup';
    const isError = location.pathname === '/404'
    return (
        <>
        { isError ? (<header />) : 
        (<header className={ isMainPage ? "header" : "header__basic" }>
            <div className={isLogo ? "header__logo_active" : "header__logo"}></div>
            {isLoged ?
                (<BurgerNav displayNav={displayNav} onClick={onClick} burgerMenu={burgerMenu}></BurgerNav>) :
                (<div className={isMainPage ? "header__links" : "header__links_disabled"}>
                    <Link className="header__link header__link_register" to='/signup'  target='_blank'>Регистрация</Link>
                    <Link className="header__link header__link_open" to='/signin'  target='_blank'>Вход</Link></div>)

            }

        </header>)}
        </>
    )
}

export default Header;