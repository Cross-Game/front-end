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
import { useEffect } from "react";


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
    const [showModalAdicionarPerfilJogo, setShowModalAdicionarPerfilJogo] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState("");
    const [jogos, setJogos] = useState(listaJogos);
    const [selectedGameFunction, setSelectedGameFunction] = useState("");
    const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
    const [usernameRiot, setUsernameRiot] = useState("");
    const [listaProfile, setListaProfile] = useState([]);
    const levelOptions = Object.values(levels);
    let idRemoveProfile = 0;

    useEffect(() => {
        axios.get(`http://localhost:8080/user-games/${USERID}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                console.log(response.data[0]);
                idRemoveProfile = response.data[0].id
                setUsernameRiot(response.data[0].userNickname)
                setSelectedSkillLevel(response.data[0].skillLevel)
                setSelectedGameFunction(response.data[0].gameFunction)
                let idJogo = response.data[0].gameId;
                axios.get(`http://localhost:8080/games/${idJogo}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                }).then((response) => {
                    setJogoSelecionado(response.data.gameName)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    })

    function remove() {
        axios.delete(`http://localhost:8080/user-games/${USERID}/${idRemoveProfile}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        }).then((response) => {
            console.log(response)
            window.location.reload()
        }).catch((error) => {
            console.error(error);
        })
    }

    function getProfile() {
        axios.get(`http://localhost:8080/user-games/${USERID}/${usernameRiot}/${jogoSelecionado}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                console.log(response)
                linkGameToUser();
            })
            .catch((error) => {
                console.error(error);
                console.log(`Username não encontrado`);
            });
    }

    function linkGameToUser() {
        let gameId = 0;

        if (jogoSelecionado == "League of Legends") {
            gameId = 1;
        }
        if (jogoSelecionado == "Teamfight Tactics") {
            gameId = 2;

        }
        if (jogoSelecionado == "Valorant") {
            gameId = 3;

        }

        const userGameCreate = {
            isFavoriteGame: true,
            userNickname: usernameRiot,
            gamerId: "aleatorio",
            gameFunction: selectedGameFunction,
            skillLevel: selectedSkillLevel,
        };
        console.log(usernameRiot)
        console.log(selectedGameFunction)
        console.log(selectedSkillLevel)
        axios.post(`http://localhost:8080/user-games/${gameId}/${USERID}`, userGameCreate, {
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
                setShowModalAdicionarPerfilJogo(false)
                alert("Cadastro Realizado !")
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleDelete = () => {
        handleOpenModal();
    };

    const handleCadastrar = () => {
        getProfile();

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
                    <div className="card">
                        <div className="header">Detalhes do Profile</div>
                        <div className="body">
                            <div className="skill">
                                <div className="skill-name">NickName</div>
                                <div className="skill-percent-number">{usernameRiot}</div>
                            </div>
                            <hr />
                            <div className="skill">
                                <div className="skill-name">Habilidade</div>
                                <div className="skill-percent-number">{selectedSkillLevel}</div>
                            </div>
                            <hr />
                            <div className="skill">
                                <div className="skill-name">Função</div>
                                <div className="skill-percent-number">{selectedGameFunction}</div>
                            </div>
                            <hr />
                            <div className="skill">
                                <div className="skill-name">Jogo</div>
                                <div className="skill-percent-number">{jogoSelecionado}</div>
                            </div>
                            <hr />
                            <div className="ProfileJogoCardRemover">
                                <button className="ProfileJogoCardRemoverButton" onClick={remove}>
                                    Remover Profile
                                </button>
                            </div>
                        </div>
                    </div>
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
                                            isSelected={jogoSelecionado === jogo.nome ? true : false}
                                            onClick={() => setJogoSelecionado(jogo.nome)} />
                                    </React.Fragment>
                                ))}
                            </div>

                            <label>Username</label>
                            <input type="text" onChange={(event) => setUsernameRiot(event.target.value)} />

                            <label>Game Function</label>
                            <div className="modalCadastrarProfileJogo-jogos">
                                {jogos &&
                                    jogos.find((jogo) => jogo.nome === jogoSelecionado)?.gameFunction.map((gameFunction, index) => (
                                        <React.Fragment key={gameFunction} >
                                            <br />
                                            <Tag
                                                text={gameFunction}
                                                isSelected={selectedGameFunction === gameFunction ? true : false}
                                                onClick={() => setSelectedGameFunction(gameFunction)}
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
