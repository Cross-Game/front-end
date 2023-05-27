import React from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Interesse.css";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

function ProfileJogo() {
    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar">
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" /></span>
                    </div>
                </div>
                <div className="ProfileInteresseContainer">
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir"/>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir"/>
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            <ProfileNavbar interesses={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;