import React, { useCallback } from "react";
import { CurrentContext } from "../../context/CurrentContext.js";

function Profile({ handleProfileInfo, handleLogout }) {

    const currentUser = React.useContext(CurrentContext);
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    const isCompare = (currentUser.name !== values.name) || (currentUser.email !== values.email);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    function updateProfileInfo(e) {
        e.preventDefault();
        handleProfileInfo(values)
    }

    function handleProfileExit() {
        handleLogout()
    }

    return (
        <div className="profile">

            <h2 className="profile__title" id='formProfile'>Привет, {currentUser.name}!</h2>

            <form className="profile__form" onSubmit={updateProfileInfo}>
                <div className="profile__info">
                    <h3 className="profile__subtitle">Имя</h3>
                    <input className="profile__name"
                        required
                        minLength={3}
                        pattern="[a-zA-Zа-яА-Я\-\s]+"
                        name='name' value={values.name || ''} onChange={handleChange} />
                    {errors?.name && (<span className="profile__span-error">Не корректное имя</span>)}
                </div>

                <div className="profile__info">
                    <h3 className="profile__subtitle">E-mail</h3>
                    <input className="profile__email"
                        required
                        type='email'
                        name='email' value={values.email} onChange={handleChange} />
                    {errors?.email && (<span className="profile__span-error">Не корректный email</span>)}
                </div>


                <div className="profile__doing">
                    <button className={`profile__redaction-btn  ${(!isValid || !isCompare) && 'profile__redaction-btn_disabled'}`}
                        type='submit'
                        disabled={!isValid || !isCompare}
                    >Редактировать</button>
                    <button className="profile__exit-btn" onClick={handleProfileExit}>Выйти из аккаунта</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;