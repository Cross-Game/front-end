import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Feedback.css";
import imgUserProfile from "../../../assets/index-page/testeImg.png"


function ProfileJogo() {

    function adicionar() {
        return (
            <>
                <div className="ProfileFeedbackContainer">
                    <div className="ProfileFeedbackCard">
                        <div className="ProfileFeedbackCardTop">
                            <div className="ProfileFeedbackCardTopFistChild">
                                <img src={imgUserProfile} alt="" />
                                <span>Mauricio Maxuel</span>
                            </div>
                            <div>Estrelas</div>
                        </div>
                        <div className="ProfileFeedbackCardCenter">
                            <span>Descrição do Feedback deskmcklsdmclkscdsc scdcsdcsd scdcsd scsdcsd sdcscw dsadasd sdasda sdasdasd asdsad adasd adsda sdasda dada sdasd asdasda d</span>
                        </div>
                        <div className="ProfileFeedbackCardBottom">
                            <div>Comportamento
                                <span className="ProfileFeedbackValor" >5</span>
                            </div>
                            <div>Habilidade
                                <span className="ProfileFeedbackValor" >3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <ProfileNavbar feedbacks={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;