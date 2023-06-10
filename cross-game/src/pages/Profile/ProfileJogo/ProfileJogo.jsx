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

const GameFunction = {
    TOP: "TOP",
    JUNGLE: "JUNGLE",
    MID: "MID",
    ADC: "ADC",
    SUPPORT: "SUPPORT",
    DUELIST: "DUELIST",
    INITIATOR: "INITIATOR",
    CONTROLLER: "CONTROLLER",
    SENTINEL: "SENTINEL"
};

const levels = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    EXPERT: "EXPERT"
};

function ProfileJogo() {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const gameFunctionOptions = Object.values(GameFunction);
    const levelOptions = Object.values(levels);

    const [showModalAdicionarPerfilJogo, setShowModalAdicionarPerfilJogo] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState("");
    const [jogos, setJogos] = useState(listaJogos);
    const [selectedGameFunction, setSelectedGameFunction] = useState("");
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
    const [usernameRiot, setUsernameRiot] = useState("");
    const [listaProfile, setListaProfile] = useState([]);

    function linkGameToUser(gameId, userId, userGameCreate) {
        axios.post(`http://localhost:8080/${gameId}/${userId}`, userGameCreate, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                const updatedList = [...listaProfile, response.data];
                setListaProfile(updatedList);
                sessionStorage.setItem("LISTA_PROFILE", JSON.stringify(updatedList));
                console.log(response.data);
                console.log(jogoSelecionado);
            })
            .catch((error) => {
                console.error(error);
                alert(`Erro ao vincular o jogo ao usuário`);
            });
    }

    function getProfile() {
        axios.get(`http://localhost:8080/user-games/${USERID}/${usernameRiot}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                const updatedList = [...listaProfile, response.data];
                setListaProfile(updatedList);
                sessionStorage.setItem("LISTA_PROFILE", JSON.stringify(updatedList));
                console.log(response.data);
                console.log(jogoSelecionado);
            })
            .catch((error) => {
                console.error(error);
                alert(`Username: "${usernameRiot}" não encontrado`);
            });
    }

    const handleDelete = () => {
        handleOpenModal();
    };

    const handleCadastrar = () => {
        const gameId = 1; // Defina o ID do jogo
        const userId = USERID; // Utilizando o ID do usuário do exemplo
        const userGameCreate = {
            username: usernameRiot,
            gameFunction: selectedGameFunction,
            skillLevel: selectedSkillLevel,
        };
        linkGameToUser(gameId, userId, userGameCreate);
        console.log(linkGameToUser)
    };

    function adicionar() {
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
                        onClickButton={handleCadastrar}
                    >
                        <div className="modalEditarPerfil-container">
                            <label>Jogo</label>
                            <div className="modalCadastrarProfileJogo-jogos">
                                {jogos.map((jogo) => (
                                    <React.Fragment key={jogo.id}>
                                        <Tag
                                            text={jogo.nome}
                                            isSelected={jogoSelecionado === jogo.nome}
                                            onClick={() => setJogoSelecionado(jogo.nome)}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>

                            <label>Username</label>
                            <input type="text" onChange={(event) => setUsernameRiot(event.target.value)} />

                            <label>Game Function</label>
                            <div className="modalCadastrarProfileJogo-jogos">
                                {gameFunctionOptions.map((functionValue) => (
                                    <React.Fragment key={functionValue}>
                                        <Tag
                                            text={functionValue}
                                            isSelected={selectedGameFunction === functionValue}
                                            onClick={() => setSelectedGameFunction(functionValue)}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>

                            <label>Skill Level</label>
                            <div className="modalCadastrarProfileJogo-jogos">
                                {levelOptions.map((levelValue) => (
                                    <React.Fragment key={levelValue}>
                                        <Tag
                                            text={levelValue}
                                            isSelected={selectedSkillLevel === levelValue}
                                            onClick={() => setSelectedSkillLevel(levelValue)}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
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
