import React from "react";
import "./ProfileNavbar.css"
import { TiEdit } from "react-icons/ti";
import { TbBellRingingFilled } from "react-icons/tb";
import imgUserProfile from "../../assets/index-page/testeImg.png"
import medalUserProfile from "../../assets/index-page/medalOuro.svg"
import { useNavigate } from "react-router-dom"


function ProfileJogo(props) {
    const navigate = useNavigate();

    return (
        <>
            <div className="profileJogoContainer">
                {props.sidebar}
                <div className="profileJogoCore">
                    <div className="profileJogoTop">
                        <div className="profileJogoDataUser">
                            <img src={imgUserProfile} alt="" />
                            <div className="profileJogoEditProfileUser">
                                <div id="nameUsername">Mauricio Maxuel</div>
                                <div className="profileJogoIconEditProfile"><TiEdit className="iconTiEdit" />Editar Perfil</div>
                            </div>
                        </div>
                        <div className="profileJogoDetailsUser">
                            <img className="profileJogoMedalUser" src={medalUserProfile} alt="" />
                            <div className="profileJogoXpUser">
                                <div className="profileJogoNivelUser">Nivel: <span>Diamante</span></div>
                                <div className="profileJogoBarsNiveis">
                                    <div className="profileJogoBarNivelUm"></div>
                                    <div className="profileJogoBarNivelDois"></div>
                                    <div className="profileJogoBarNivelTres"></div>
                                    <div className="profileJogoBarNivelQuatro"></div>
                                </div>
                            </div>
                            <TbBellRingingFilled className="profileJogoIconNotificacao" />
                        </div>
                    </div>
                    <div className="profileJogoCenter" >

                        <div style={props.profiles} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/profilejogo")}
                        >Profiles</div>
                        <div style={props.interesses} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/interesse")}
                        > Interesses</div>
                        <div style={props.feedbacks} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/feedback")}
                        >Feedbacks</div>
                        <div style={props.plataformas} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/plataforma")}
                        >Plataformas</div>


                    </div>
                    <div>
                        {props.adicionar}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileJogo;