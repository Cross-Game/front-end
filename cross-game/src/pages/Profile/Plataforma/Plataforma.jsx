import React from "react";
import "./Plataforma.css";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import Sidebar from "../../../components/Sidebar/Sidebar"
import CardPlataforma from "../../../components/CardPlataforma/CardPlataforma";
import { AiFillPlusCircle } from "react-icons/ai";
import Play from "./assets/Play.png"

function ProfileJogo() {
    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar">
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfilePlataformaContainer">
                    <CardPlataforma img={Play}/>
                </div>
            </>
        )
    }


    return (
        <>
            <ProfileNavbar plataformas={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;