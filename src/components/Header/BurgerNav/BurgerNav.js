import RightNav from '../RightNav/RightNav';
import React from "react";

function BurgerNav({displayNav, onClick, burgerMenu}) {
    const BurgerMenuStatus = `header__burger-style ${burgerMenu ? "header__burger-style_disabled" : "header__burger-style_active" }`

    function handleClick() {
        onClick(displayNav);
    }

    return(
        <>
        <div onClick={handleClick} >
             <button className={BurgerMenuStatus}></button>
       </div>
        <RightNav displayNav={displayNav}></RightNav>
        </>
    )
}

export default BurgerNav;