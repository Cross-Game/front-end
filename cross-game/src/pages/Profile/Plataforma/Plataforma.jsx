import React, { useState } from "react";
import "./Plataforma.css";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import Sidebar from "../../../components/Sidebar/Sidebar"
import CardPlay from "../../../components/CardPlataforma/CardPlaystation";
import CardXbox from "../../../components/CardPlataforma/CardXbox";
import CardPc from "../../../components/CardPlataforma/CardPc";
import CardMobile from "../../../components/CardPlataforma/CardMobile";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { BsCheck, BsGridFill } from "react-icons/bs";


function ProfileJogo() {
    const [showModalAdicionarPlataforma, setShowModalAdicionarPlataforma] = useState(false);

    function limparPlataformas(){
        console.log("TO DO")
    }

    function cadastrarPlataforma(){
        console.log("TO DO")
    }

    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={()=> setShowModalAdicionarPlataforma(true)}>
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
                {showModalAdicionarPlataforma && (
                    <Modal title="Plataformas" icon={<BsGridFill />} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck />} clearAll={true} onClear={limparPlataformas} onClick={cadastrarPlataforma} onClose={()=> setShowModalAdicionarPlataforma(false)}>
                    <div className="ModalPlataforma-cadastrarPlataforma">
                    <CardPlay/>
                    <CardXbox/>
                    <CardPc/>
                    <CardMobile/>
                    </div>
                    </Modal>
                )}
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