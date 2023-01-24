import React from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import BurgerNav from './BurgerNav/BurgerNav';

function Header({ displayNav, onClick, burgerMenu, isLoged }) {
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isLogo = location.pathname === '/signin' || location.pathname === '/signup';
    const isError = location.pathname === '/404';
    return (
        <>
            {isError ? (<header />) :
                (<header className="header">
                    <div className={isMainPage ? "header__black" : "header__basic"}>
                        <Link to='/' className={isLogo ? "header__logo-active" : "header__logo"}></Link>
                        {isLoged ?
                            (<BurgerNav displayNav={displayNav} onClick={onClick} burgerMenu={burgerMenu}></BurgerNav>) :
                            (<div className={isMainPage ? "header__links" : "header__links-disabled"}>
                                <Link className="header__link header__link_register" to='/signup' >Регистрация</Link>
                                <Link className="header__link header__link_open" to='/signin' >Войти</Link></div>)

                        }
                    </div>
                </header>)}
        </>
    )
}

export default Header;
