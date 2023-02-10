import React from "react";
import NavTab from "./NavTab/NavTab.js";
import Promo  from "./Promo/Promo.js";
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import AboutMe from "./AboutMe/AboutMe.js";
import Portfolio from "./Portfolio/Portfolio.js";

function Main() {

    return(
        <main className="main">
           <Promo></Promo>
           <NavTab></NavTab>
           <AboutProject></AboutProject>
           <Techs></Techs>
           <AboutMe></AboutMe>
           <Portfolio></Portfolio>
        </main>
    )

}



export default Main;