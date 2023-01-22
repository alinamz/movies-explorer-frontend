import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";

function Register({ setIsLoged, setSpanEmail, setSpanName, setSpanPassword, isSpanName, isSpanEmail, isSpanPassword }) {
    const spanActiveName = `${isSpanName ? "register__span-error-disabled" : "register__span-error"}`;
    const spanActiveEmail = `${isSpanEmail ? "register__span-error-disabled" : "register__span-error"}`;
    const spanActivePassword = `${isSpanPassword ? "register__span-error-disabled" : "register__span-error"}`;

    const errorMessageName = `register__input register__input__name ${isSpanName ? " " : "register__input_active"}`;
    const errorMessageEmail = `register__input register__input__email ${isSpanEmail ? "" : "register__input_active"}`;
    const errorMessagePassword = `register__input register__input__password ${isSpanPassword ? " " : "register__input_active"}`;

    function handleChangeName() {
        setSpanName(true)
    }

    function handleClickName() {
        setSpanName(false)
    }

    function handleClickEmail() {
        setSpanEmail(false);
    }

    function handleChangeEmail() {
        setSpanEmail(true)
    }

    function handleChangePassword() {
        setSpanPassword(true)
    }

    function handleClickPassword() {
        setSpanPassword(false)
    }
    function handleLogged() {
        setIsLoged(false)
    }

    React.useEffect(() => {
        handleLogged();
    }, [isSpanEmail, isSpanName, isSpanPassword])

    return (
        <div className="register__area">

            <h2 className="register__titile">Добро пожаловать!</h2>
            <form className="register__form" >

                <label className="register__label">
                    <p className="register__designation">Имя</p>
                    <input className={errorMessageName} onClick={handleClickName} onChange={handleChangeName} type='text' id='name' name='name' minLength={3} required />
                    <span className={spanActiveName}>Что-то пошло не так...</span>
                </label>

                <label className="register__label">
                    <p className="register__designation">Email</p>
                    <input className={errorMessageEmail} onClick={handleClickEmail} onChange={handleChangeEmail} id='email' minLength={3} name='email' type='email' required />
                    <span className={spanActiveEmail}>Что-то пошло не так...</span>
                </label>

                <label className="register__label">
                    <p className="register__designation">Пароль</p>
                    <input className={errorMessagePassword} onClick={handleClickPassword} onChange={handleChangePassword} type='password' minLength='5' maxLength='20' required />
                    <span className={spanActivePassword}>Что-то пошло не так...</span>
                </label>
            </form>

            <div className="register__buttons">
                <button className="register__btn-submit" >Зарегистрироваться</button>
                <div className="register__link">
                    <p className="register__text-entry">Уже зарегистрированы?</p>
                    <Link className="register__link-entry"  target='_blank' to='/signin'>Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;