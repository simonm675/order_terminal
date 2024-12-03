import React from "react";
import './popup.css'


function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
            <h3>Möchtest du das Produkt wirklich aus dem Warenkorb entfernen?</h3>
            <button className="bg-gray-200 text-black font-bold py-2 px-4 rounded-xl mt-4" onClick={() => props.setTrigger(false)}>Abbrechen</button>
            
                {props.children}
            </div>
            
        </div>
    ) : "";
}

export default Popup