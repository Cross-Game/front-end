import React from "react";
import "./CardPc.css"
import xbox from "../../pages/Profile/Plataforma/assets/computador.png"
import { RiDeleteBinLine } from "react-icons/ri";

function cardPc() {
    return (
        <>
            <div className="cardPc">
                <div className="cardPcInfo">
                <button className="cardPlatform-close-btn"><RiDeleteBinLine /></button>
                    <img src={xbox} className="cardPcIcone"  alt="" />
                    <p className="cardPcTitulo">Desktop</p>
                </div>
            </div>
        </>
    )
}

export default cardPc;