import React from "react";
import "./CardPlaystation.css"
import play from "../../pages/Profile/Plataforma/assets/Play.png"
import { RiDeleteBinLine } from "react-icons/ri";

function CardPlaystation() {
    return (
        <>
            <div className="cardPlaystation">
                <div className="cardPlaystationInfo">
                <button className="cardPlatform-close-btn"><RiDeleteBinLine /></button>
                    <img src={play} className="cardPlaystationIcone"  alt="" />
                    <p className="cardPlaystationTitulo">Playstation</p>
                </div>
            </div>
        </>
    )
}

export default CardPlaystation;