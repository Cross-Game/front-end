import React from "react";
import "./Plataforma.css";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import Sidebar from "../../../components/Sidebar/Sidebar"
import CardPlay from "../../../components/CardPlataforma/CardPlaystation";
import CardXbox from "../../../components/CardPlataforma/CardXbox";
import CardPc from "../../../components/CardPlataforma/CardPc";
import CardMobile from "../../../components/CardPlataforma/CardMobile";
import { AiFillPlusCircle } from "react-icons/ai";


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
                <CardPlay/>
                <CardXbox/>
                <CardPc/>
                <CardMobile/>
                
                
                
                   
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