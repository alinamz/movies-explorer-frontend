import { useForm } from 'react-hook-form';
import React from "react";
import { Link } from "react-router-dom";

function Register({handleRegist}) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({
        mode: 'onChange',
    });

    function onSubmit({email, name, password}) {
        handleRegist(email, name,password)
    }

    return (
        <div className="register">

            <h2 className="register__titile">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit(onSubmit)} >

                <label className="register__label">
                    <p className="register__designation">Имя</p>
                    <input
                        {...register('name', {
                            required: true,
                            minLength: {
                                value: 3,
                                message: 'Длина имени должна быть минимум 3 символа'
                            },
                            maxLength: {
                                value: 30,
                                message: 'Допускается максимум 30 символов'
                            },
                            pattern: {
                                value: /^[а-яА-ЯёЁa-zA-Z -]+$/g,
                                message: 'Имя не валидно'
                            }
                        })}
                        className={`register__input ${errors.name ? "register__input_active" : ""}`} type='text' name='name' />
                    {errors?.name &&
                        (<span className="register__span-error">{errors.name.message}</span>)}
                </label>

                <label className="register__label">
                    <p className="register__designation">Email</p>
                    <input
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Email не корректен'
                            }
                        })}
                        className={`register__input ${errors.email ? "register__input_active" : ""}`} type='email' name="email" />
                    {errors?.email &&
                        (<span className="register__span-error">{errors.email.message}</span>)}
                </label>

                <label className="register__label">
                    <p className="register__designation">Пароль</p>
                    <input
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
                        className={`register__input ${errors.password ? "register__input_active" : ""}`} type='password' name='password' />
                        {errors?.password &&
                    (<span className="register__span-error">{errors.password.message}</span>)}
                </label>


                <div className="register__buttons">
                    <button type="submit" className={isValid ? 'register__btn-submit' : 'register__btn-submit-disabled'} disabled={!isValid} >Зарегистрироваться</button>
                    <div className="register__link">
                        <p className="register__text-entry">Уже зарегистрированы?</p>
                        <Link className="register__link-entry"  to='/signin'>Войти</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Register;