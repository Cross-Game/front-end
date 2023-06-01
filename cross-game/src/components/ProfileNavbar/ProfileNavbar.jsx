import React, { useState } from "react";
import "./ProfileNavbar.css"
import { TiEdit } from "react-icons/ti";
import { TbBellRingingFilled } from "react-icons/tb";
import imgUserProfile from "../../assets/index-page/testeImg.png"
import medalUserProfile from "../../assets/index-page/medalOuro.svg"
import { useNavigate } from "react-router-dom"
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../Notification";
import UserProfile from "../UserProfile";
import Modal from "../Modal";
import { RiFileEditFill } from "react-icons/ri";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";


function ProfileJogo(props) {
    const navigate = useNavigate();
    const [showModalNotification, setShowModalNotification] = useState(false);
    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);

    function changeAvatar(){
        console.log("To Do")
    }

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
                                <div className="profileJogoIconEditProfile" onClick={() => setShowModalEditarPerfil(true)}><RiFileEditFill className="iconTiEdit" />Editar Perfil</div>
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
                            <MdNotificationsActive className="profileJogoIconNotificacao" onClick={() => setShowModalNotification(true)} />
                        </div>
                    </div>
                    <div className="profileJogoCenter" >

                        <div style={props.profiles} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/profile")}
                        >Profiles</div>
                        <div style={props.interesses} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/profile/interesse")}
                        > Interesses</div>
                        <div style={props.feedbacks} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/profile/feedback")}
                        >Feedbacks</div>
                        <div style={props.plataformas} className="profileJogoButtonNvigation"
                            onClick={() => navigate("/profile/plataforma")}
                        >Plataformas</div>


                    </div>
                    <div>
                        {props.adicionar}
                    </div>
                </div>
            </div>

            {showModalNotification && (
                <Notification onClose={() => setShowModalNotification(false)} />
            )}

            {showModalEditarPerfil && (
                <Modal title="Editar Perfil" icon={<RiFileEditFill />} temFooter={true} ativarBotao={true} textButton="Editar" iconButton={<BsCheck />} onClose={()=> setShowModalEditarPerfil(false)}>
                    <div className="modalEditarPerfil-container">
                        <UserProfile nome={"Nome"} img={<BsArrowRightShort />} onClick={changeAvatar} />
                        <label>Usuário</label>
                        <input type="text"></input>
                        <label>E-mail</label>
                        <input type="text"></input>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default ProfileJogo;