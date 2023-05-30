import React, { useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Interesse.css";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { MdOutlineInterests } from "react-icons/md";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { interesses as listaInteresses } from "../../../utils/interesses.js"
import Tag from "../../../components/Tag";
import UserProfile from "../../../components/UserProfile";

function ProfileJogo() {

    const [showModalAdicionarInteresse, setShowModalAdicionarInteresse] = useState(false);

    const [interesses, setInteresses] = useState(listaInteresses);
    const [interesseSelecionado, setInteresseSelecionado] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    function limparInteresses(){
        setCategoriaSelecionada("");
        setInteresseSelecionado("");
    }

    function cadastrarInteresse(){
        console.log("To DO")
    }


    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={() => setShowModalAdicionarInteresse(true)}>
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

                {showModalAdicionarInteresse && (
                    <Modal title="Interesses" icon={<MdOutlineInterests />} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck />} clearAll={true} onClear={limparInteresses} onClick={cadastrarInteresse} onClose={()=> setShowModalAdicionarInteresse(false)}>
                        <div className="ModalCadastrarInteresse-body">
                            <UserProfile nome={"Nome"} img={<BsArrowRightShort />} />
                            
                            Interesse
                            <div className="ModalCadastrarInteresse-interesses">

                                {
                                    interesses.map((interesse) => (
                                        <React.Fragment key={interesse.id}>
                                            <Tag
                                                text={interesse.nome}
                                                isSelected={interesseSelecionado === interesse.nome ? true : false}
                                                onClick={() => setInteresseSelecionado(interesse.nome)}
                                            />
                                        </React.Fragment>
                                    ))}
                            </div>

                            Categoria
                            <div className="ModalCadastrarInteresse-categorias">
                                {interesses &&
                                    interesses.find((interesse) => interesse.nome === interesseSelecionado)?.categorias.map((categoria, index) => (
                                        <React.Fragment key={categoria}>
                                            <Tag
                                                text={categoria}
                                                isSelected={categoriaSelecionada === categoria ? true : false}
                                                onClick={() => setCategoriaSelecionada(categoria)}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal>

                )}
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