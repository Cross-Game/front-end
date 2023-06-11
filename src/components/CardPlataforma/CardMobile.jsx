import React from "react";
import "./CardMobile.css"
import xbox from "../../pages/Profile/Plataforma/assets/celular.png"
import { RiCloseLine, RiDeleteBinLine } from "react-icons/ri";

function cardMobile() {
    return (
        <>
            <div className="cardMobile">
                <div className="cardMobileInfo">
                <button className="cardPlatform-close-btn"><RiDeleteBinLine /></button>
                    <img src={xbox} className="cardMobileIcone"  alt="" />
                    <p className="cardMobileTitulo">Mobile</p>
                </div>
            </div>
        </>
    )
}

export default cardMobile;