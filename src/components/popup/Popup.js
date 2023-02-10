function Popup (props) {
 
   return(
    <div className={props.isOpen ? "popup__opened" : "popup__dis"}>
        <h1 className="popup__text">Фильм успешно сохранен</h1>
    </div>
)}

export default Popup;