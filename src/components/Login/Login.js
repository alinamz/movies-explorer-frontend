import { Link } from "react-router-dom";
import React from "react";

function Login({setIsLoged}) {
    function handleLogged() {
        setIsLoged(false)
    }

  React.useEffect(() => {
    handleLogged()
  })
    return(
        <div className="login__area">
            <h1 className='login__title'>Рады видеть!</h1>

            <form className="login__form">
                <p className="login__text">E-mail</p>
                <input className="login__input login__input-email"></input>

                <p className="login__text">Пароль</p>
                <input className="login__input login__input-password"></input>
            </form>

            <div className="login__buttons">
                <button className="login__btn-submit">Войти</button>
                <div className="login__link">
                    <p className="login__text-register">Ещё не зарегистрированы?</p>
                    <Link className="login__link-register" to='signup'  target='_blank'>Регистрация</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;