import React, { useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import "./ProfileJogo.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi"
import img from "../../../assets/index-page/medalPrata.svg"
import Modal from "../../../components/Modal";
import { RiFileEditFill } from "react-icons/ri";
import { BsArrowRightShort, BsCheck, BsPersonBadge } from "react-icons/bs";
import Tag from "../../../components/Tag";
import { jogos as listaJogos } from "../../../utils/jogos";
import { MdGamepad } from "react-icons/md";
import { USERID, TOKEN, currentURL } from "../../../data/constants";
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
        axios.get(`${currentURL}/user-games/${USERID}`, {
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
                axios.get(`${currentURL}/games/${idJogo}`, {
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
        axios.delete(`${currentURL}/user-games/${USERID}/${idRemoveProfile}`, {
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
        axios.get(`${currentURL}/user-games/${USERID}/${usernameRiot}/${jogoSelecionado}`, {
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
        axios.post(`${currentURL}/user-games/${gameId}/${USERID}`, userGameCreate, {
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

    const handlerSelecionarJogo = () => {
        console.log("Jogo Selecionado")
    }

    const handlerMeusJogo = () => {
        console.log("Meus Jogos")
    }

    const handlerBuscarJogo = () => {
        console.log("Buscando Jogos")
    }

    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={() => handlerMeusJogo()}>
                            Meus Jogos
                            <GiConsoleController className="ProfileIconAdicionar" />
                        </span>
                        <span className="ProfileJogoButtonAdicionar" onClick={() => console.log("Adicionando jogo")}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfileJogoCardContainerTitulo">
                    
                    <div className="search">
                        <input type="text" className="search__input" placeholder="Busque pelo nome do jogo"/>
                            <button className="search__button" onClick={handlerBuscarJogo}>
                                <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                    <g>
                                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                    </g>
                                </svg>
                            </button>
                    </div>
                </div>
                <div className="ProfileJogoCardContainerJogo">
                    <div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div>
                    <div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div><div className="cardJogo" onClick={handlerSelecionarJogo}>
                        <div class="card-details">
                            <img src={img} className="imgJogo" />
                        </div>
                    </div>
                </div>
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
