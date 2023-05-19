import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./ProfileJogo.css"
import { TiUserAdd, TiEdit } from "react-icons/ti";

function ProfileJogo() {



    return (
        <>
        <div className="profileJogoContainer">
            <Sidebar/>
            <div className="profileJogoCore">
                <div className="profileJogoTop">
                    <div className="profileJogoDataUser">
                        <div className="profileJogoImgUser">
                            <span><TiUserAdd className="profileJogoImgIcon"/> </span>
                        </div>
                        <div className="profileJogoEditProfileUser">
                            <div id="nameUsername">Mauricio Maxuel</div>
                            <div><TiEdit className="profileJogoIconEditProfile"/>Editar Perfil</div>
                        </div>
                    </div>
                    <div className="profileJogoDetailsUser">
                        <div className="profileJogoMedalUser"><img src="../" alt="" /></div>
                        <div className="profileJogoXpUser">
                            <div>Nivel: <span>Diamante</span></div>
                            <div>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                            </div>
                        </div>
                        <div className="profileJogoIconNotificacao">Notificação</div>
                    </div>
                </div>
                <div className="profileJogoCenter" >
                    
                        <div>Profiles</div>
                        <div>Interesses</div>
                        <div>Feedbacks</div>
                        <div>Plataformas</div>

                    
                </div>
                <div className="profileJogoBottom">
                    baixo
                </div>
            </div>
        </div>
            
        </>
    )
}

export default ProfileJogo;