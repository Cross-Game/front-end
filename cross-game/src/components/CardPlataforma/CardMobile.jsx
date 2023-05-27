import React from "react";
import "./CardMobile.css"
import xbox from "../../pages/Profile/Plataforma/assets/celular.png"

function cardMobile() {
    return (
        <>
            <div className="cardMobile">
                <div className="cardMobileInfo">
                    <img src={xbox} className="cardMobileIcone"  alt="" />
                    <p className="cardMobileTitulo">Mobile</p>
                </div>
            </div>
        </>
    )
}

export default cardMobile;