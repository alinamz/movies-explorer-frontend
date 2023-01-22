import RightNav from '../RightNav/RightNav';
import React from "react";

function BurgerNav({displayNav, onClick, burgerMenu}) {
    const BurgerMenuStatus = `burger__style ${burgerMenu ?"burger__style_disabled" : "burger__style_active" }`

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