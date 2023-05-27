import React from "react";
import "./CardPc.css"
import xbox from "../../pages/Profile/Plataforma/assets/computador.png"

function cardPc() {
    return (
        <>
            <div className="cardPc">
                <div className="cardPcInfo">
                    <img src={xbox} className="cardPcIcone"  alt="" />
                    <p className="cardPcTitulo">Desktop</p>
                </div>
            </div>
        </>
    )
}

export default cardPc;