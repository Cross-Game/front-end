import React, { useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import "./ProfileJogo.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import UserProfile from "../../../components/UserProfile";
import Modal from "../../../components/Modal";
import { RiFileEditFill } from "react-icons/ri";
import { BsArrowRightShort, BsCheck, BsPersonBadge } from "react-icons/bs";
import Tag from "../../../components/Tag";
import { jogos as listaJogos } from "../../../utils/jogos";
import { MdGamepad } from "react-icons/md";
import { USERID, TOKEN } from "../../../data/constants";
import axios from "axios";

function ProfileJogo() {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [showModalAdicionarPerfilJogo, setShowModalAdicionarPerfilJogo] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState("");
    const [jogos, setJogos] = useState(listaJogos);

    function getProfile() {
        
        const username = "xaropinho"; 

        axios
            .get(`http://localhost:8080/user-games/${USERID}/${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function adicionar() {
        const handleDelete = () => {
            handleOpenModal();
        };

        const handleCadastrar = () => {
            getProfile()
            setShowModalAdicionarPerfilJogo(false);
            
        };

        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={() => setShowModalAdicionarPerfilJogo(true)}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfileJogoCardContainer">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div className="ProfileJogoCardUsername" key={index}>
                            <div>
                                <p className="ProfileJogoEstiloParagrafo">
                                    Username: <span>HOmonster</span>
                                </p>
                            </div>
                            <div>
                                <p className="ProfileJogoEstiloParagrafo">
                                    GamerId: <span>215478166</span>
                                </p>
                            </div>
                            <div>
                                <p className="ProfileJogoEstiloParagrafo">
                                    Jogo: <span>League of Legends</span>
                                </p>
                            </div>
                            <div>
                                <AiOutlineDelete
                                    className="ProfileJogoEstilo"
                                    onClick={handleDelete}
                                    style={{ color: "#0f3", cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {showModalAdicionarPerfilJogo && (
                    <Modal
                        title="Perfil de Jogo"
                        icon={<BsPersonBadge />}
                        temFooter={true}
                        ativarBotao={true}
                        textButton="Cadastrar"
                        iconButton={<BsCheck />}
                        onClose={() => setShowModalAdicionarPerfilJogo(false)}
                        onButtonClick={handleCadastrar()}
                    >
                        <div className="modalEditarPerfil-container">
                            {/* <UserProfile nome={"Nome"} img={<BsArrowRightShort />} /> */}

                            <label>Jogo</label>

                            <div className="modalCadastrarProfileJogo-jogos">
                                {jogos.map((jogo) => (
                                    <React.Fragment key={jogo.id}>
                                        <Tag
                                            text={jogo.nome}
                                            isSelected={jogoSelecionado === jogo.nome ? true : false}
                                            onClick={() => setJogoSelecionado(jogo.nome)}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>

                            <label>Username</label>
                            <input type="text" />
                        </div>
                    </Modal>
                )}
            </>
        );
    }

    return (
        <>
            <ProfileNavbar profiles={{ color: "#fff", borderBottom: "2px solid #0f3" }} sidebar={<Sidebar />} adicionar={adicionar()} />
        </>
    );
}

export default ProfileJogo;
