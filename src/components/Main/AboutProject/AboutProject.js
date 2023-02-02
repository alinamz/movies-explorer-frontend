function AboutProject() {
    return(
        <section className="project" id='project'>
            <h2 className="project__title">О проекте</h2>

            <div className="project__description-basic">
             <div className="project__description project__description_content">
                <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
             </div>

             <div className="project__description project__description_time">
                <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
             </div>
        
            </div>

            <div className="project__description-time">
                <div className="project__time">
                    <h4 className="project__time-duration project__time-duration_backend">1 неделя</h4>
                    <h4 className="project__time-duration project__time-duration_frontend">4 недели</h4>
                </div>

                <div className="project__definition">
                    <p className="project__definition-activity project__definition-activity_backend">Back-end</p>
                    <p className="project__definition-activity project__definition-activity_frontend">Front-end</p>
                </div>
            
            
            </div>
        </section>
    )
}
export default AboutProject;