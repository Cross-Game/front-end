import React from "react";
import "./CardXbox.css"
import xbox from "../../pages/Profile/Plataforma/assets/xbox.png"

function cardXbox() {
    return (
        <>
            <div className="cardXbox">
                <div className="cardXboxInfo">
                    <img src={xbox} className="cardXboxIcone"  alt="" />
                    <p className="cardXboxTitulo">Xbox</p>
                </div>
            </div>
        </>
    )
}

export default cardXbox;