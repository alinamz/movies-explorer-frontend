import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import React from "react";

function Login({ handleAuthorization}) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: 'onChange',
    });

    function onSubmit({email, password}) {
        handleAuthorization(email, password)
    }


    return(
        <div className="login">
            <h1 className='login__title'>Рады видеть!</h1>

            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                <p className="login__text">E-mail</p>
                <input className="login__input login__input-email"
                name="email"
                 {...register('email', {
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Email не корректен'
                    }
                })}
                />
                   {errors?.email &&
                        (<span className="register__span-error">{errors.email.message}</span>)}

                <p className="login__text">Пароль</p>
                <input className="login__input login__input-password"
                type='password'
                 name='password'
                 {...register('password', {
                    required: true,
                    minLength: {
                        value: 3,
                        message: 'Длина пароля должна быть минимум 3 символа'
                    },
                    maxLength: {
                        value: 30,
                        message: 'Допускается максимум 30 символов'
                    },
                })}
                />
                 {errors?.password &&
                    (<span className="register__span-error">{errors.password.message}</span>)}
            

            <div className="login__buttons">
                <button className={isValid ? 'login__btn-submit' : 'register__btn-submit-disabled'} disabled={!isValid}>Войти</button>
                <div className="login__link">
                    <p className="login__text-register">Ещё не зарегистрированы?</p>
                    <Link className="login__link-register" to='signup'  >Регистрация</Link>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Login;