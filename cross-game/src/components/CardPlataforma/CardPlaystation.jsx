import React from "react";
import "./CardPlaystation.css"
import play from "../../pages/Profile/Plataforma/assets/Play.png"

function CardPlaystation() {
    return (
        <>
            <div className="cardPlaystation">
                <div className="cardPlaystationInfo">
                    <img src={play} className="cardPlaystationIcone"  alt="" />
                    <p className="cardPlaystationTitulo">Playstation</p>
                </div>
            </div>
        </>
    )
}

export default CardPlaystation;