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
import Toast from "../../../components/Toast";
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
    const [jogoSelecionado, setJogoSelecionado] = useState();
    const [listaJogos, setListaJogos] = useState([]);
    const [jogoByName, setJogoByName] = useState()
    const [buscarJogo, setBuscarJogo] = useState()
    const [jogoVinculado, setjogoVinculado] = useState("");
    const [bordaJogo, setBordaJogo] = useState({ border: '1px solid #fff' })
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    useEffect(() => {
        axios.get(`${currentURL}/games-api/`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                setListaJogos(response.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    function handlerClickCard(event) {
        setJogoSelecionado(event)
        console.log(event)
        setBordaJogo({ border: '1px solid #00ff33' })

    }

    const handlerMeusJogo = () => {
        axios.get(`${currentURL}/user-games/${USERID}/games`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                if (response != null) {
                    setListaJogos(response.data)
                    setjogoVinculado(true)
                } else {
                    console.log()
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handlerBuscarValueInput = (event) => {
        const nameGame = event.target.value
        if (nameGame !== undefined) {
            setBuscarJogo(nameGame)
            console.log(nameGame)
        } else {
            mudarToast("erro", "Digite o nome de algum jogo !")
        }

    }

    const handlerBuscarJogos = () => {
        axios.get(`${currentURL}/games-api/${buscarJogo}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.data !== undefined) {
                    setJogoByName(response.data)
                    setListaJogos([])
                }
            })
            .catch((error) => {
                console.error(error);
                mudarToast("erro", "Digite o nome de algum jogo !")
            });
    }

    const handlerAdicionarJogo = () => {
        axios.post(`${currentURL}/user-games/1/${USERID}`,
            {
                isFavoriteGame: true,
                userNickname: "a",
                gamerId: "a",
                skillLevel: "MEDIUM",
                gameFunction: "TOP",
                GenericGamersIds: [
                    (jogoSelecionado + 1)
                ]
            }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
        })
            .then((response) => {

            })
            .catch((error) => {
                console.error(error);
            });
    }

    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={handlerMeusJogo}>
                            Meus Jogos
                            <GiConsoleController className="ProfileIconAdicionar" />
                        </span>
                        <span className="ProfileJogoButtonAdicionar" onClick={handlerAdicionarJogo}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfileJogoCardContainerTitulo">

                    <div className="search">
                        <input type="text" onChange={handlerBuscarValueInput} className="search__input" placeholder="Busque pelo nome do jogo" />
                        <button className="search__button" onClick={handlerBuscarJogos}>
                            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="ProfileJogoCardContainerJogo">
                    {listaJogos.length > 0 && listaJogos.map((jogo, index) => (
                        <div className="cardJogo" id="selectedCardJogo" style={index == jogoSelecionado ? bordaJogo : { border: '1px solid #000' }} key={index}
                            onClick={() => handlerClickCard(index)}
                        >
                            <div className="card-details">
                                <img src={jogo.imageGame.link} className="imgJogo" />
                            </div>
                        </div>
                    )) }
                    {jogoByName && <div className="cardJogo" id="selectedCardJogo">
                        <div className="card-details">
                            <img src={jogoByName.imageGame.link} className="imgJogo" />
                        </div>
                    </div>}
                    {showToast && (
                        <Toast
                            type={toastType}
                            message={toastMessage}
                            onClose={() => setShowToast(false)}
                        />
                    )}
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
