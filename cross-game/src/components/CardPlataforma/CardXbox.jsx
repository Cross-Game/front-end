import React from "react";
import "./CardXbox.css"
import xbox from "../../pages/Profile/Plataforma/assets/xbox.png"
import { RiDeleteBinLine } from "react-icons/ri";

function cardXbox() {
    return (
        <>
            <div className="cardXbox">
                <div className="cardXboxInfo">
                <button className="cardPlatform-close-btn"><RiDeleteBinLine /></button>
                    <img src={xbox} className="cardXboxIcone"  alt="" />
                    <p className="cardXboxTitulo">Xbox</p>
                </div>
            </div>
        </>
    )
}

export default cardXbox;