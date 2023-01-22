function Profile () {
    return(
        <div className="profile__area">
            <h2 className="profile__title">Привет, Виталий!</h2>

            <form className="profile__form">
                <div className="profile__info">
                    <h3 className="profile__subtitle">Имя</h3>
                    <input className="profile__name" value='Виталий'/>
                </div>

                <div className="profile__info">
                    <h3 className="profile__subtitle">E-mail</h3>
                    <input className="profile__email" value='pochta@yandex.ru' />
                </div>
            </form>

            <div className="profile__doing">
                <button className="profile__redaction-btn">Редактировать</button>
                <button className="profile__exit-btn">Выйти из аккаунта</button>
            </div>

        </div>
    )
}

export default Profile;