import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import "./ProfileJogo.css"
import Sidebar from "../../../components/Sidebar/Sidebar"

function ProfileJogo() {
    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar">Adicionar</span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <ProfileNavbar
                profiles={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )


}

export default ProfileJogo;