import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USERID, currentURL, TOKEN, USERNAMESESSION } from "../../data/constants";

import Sidebar from '../../components/Sidebar/Sidebar'
import './Users.css';

import imgUserProfile from "../../assets/index-page/testeImg.png";
import iconHeart from "./assets/iconHeart.svg"
import iconHeartDisabled from "./assets/iconHeartDisabled.svg"
import iconPending from "./assets/iconPending.svg"
import { NothingContentRooms } from '../Rooms/Rooms';
import ChatWithUser from '../../components/ChatWithUser/ChatWithUser';
import iconChatNormal from "../../pages/ChatRoom/assets/chatNormalIcon.svg"
import Modal from '../../components/Modal';
import { BsArrowRightShort, BsFilterLeft } from 'react-icons/bs';
import Option from './Option';
import RangeBar from '../../components/RangeBar';
import Toast from '../../components/Toast';

import Tag from '../../components/Tag';

import { HiSearch } from 'react-icons/hi';

import medalPrata from '../../assets/index-page/medalPrata.svg'
import medalOuro from '../../assets/index-page/medalOuro.svg'
import medalDiamante from '../../assets/index-page/medalDiamante.svg'
import medalMestre from '../../assets/index-page/medalMestre.svg'

function Users() {

    const [usersGeneric, setUsersGeneric] = useState([]);
    const [users, setUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    const [showModalFiltroJogadores, setShowModalFiltroJogadores] = useState(false);
    const [meusInteresses, setMeusInteresses] = useState([])



    var [minLevelHabilidade, setMinLevelHabilidade] = useState(0);
    var [maxLevelHabilidade, setMaxLevelHabilidade] = useState(5);
    var [minLevelComportamento, setMinLevelComportamento] = useState(0);
    var [maxLevelComportamento, setMaxLevelComportamento] = useState(5);

    const [currentValuesHabilidade, setCurrentValuesHabilidade] = useState({ min: minLevelHabilidade, max: maxLevelHabilidade });
    const [currentValuesComportamento, setCurrentValuesComportamento] = useState({ min: minLevelComportamento, max: maxLevelComportamento });

    useEffect(() => {
        setCurrentValuesHabilidade({ min: minLevelHabilidade, max: maxLevelHabilidade });
    }, [minLevelHabilidade, maxLevelHabilidade]);
    const handleValuesChangeHabilidade = (newValues) => {
        setMinLevelHabilidade(newValues.min);
        setMaxLevelHabilidade(newValues.max);
    };

    useEffect(() => {
        setCurrentValuesComportamento({ min: minLevelComportamento, max: maxLevelComportamento });
    }, [minLevelComportamento, maxLevelComportamento]);
    const handleValuesChangeComportamento = (newValues) => {
        setMinLevelComportamento(newValues.min);
        setMaxLevelComportamento(newValues.max);
    };
    useEffect(() => { filtrarJogadores() }, [])
    const removeFriendsFromUsers = () => {
        const usersWithoutFriends = usersGeneric.filter(user => {
            // Verifica se o usuário não possui amigos com a flag CONFIRMED
            return !friends.some(friend => friend.friendUserId === user.id && friend.friendshipState === 'CONFIRMED');
        });

        setUsersGeneric(usersWithoutFriends);
    };


    const [listaOriginal, setListaOriginal] = useState([]);

    var chamadas = 0;
    var jogadoresFiltrados = [];
    var chamadas = 0;
    var jogadoresFiltrados = [];



    function filtrarJogadores() {
        // TO DO basear filtros do interesse.
        try {
            // Verifica se a lista original já foi definida
            if (listaOriginal.length === 0) {
                setListaOriginal([...usersGeneric]);
            }

            jogadoresFiltrados = listaOriginal.filter((jogador) => {
                const habilidade = jogador.mediaHabilidade;
                const comportamento = jogador.mediaComportamento;
                return (
                    habilidade >= minLevelHabilidade &&
                    habilidade <= maxLevelHabilidade &&
                    comportamento >= minLevelComportamento &&
                    comportamento <= maxLevelComportamento
                );
            });


            setUsersGeneric(jogadoresFiltrados);
            setShowModalFiltroJogadores(false);

            axios
                .get(
                    `https://localhost:8080/users-filter?preference=${meusInteresses[0]}&gameName=${jogoSelecionado.toUpperCase()}&gameFunction=TOP}`,
                    {
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`
                        }
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.fila.length !== 0) {
                            const jogadoresFilaUsernames = response.data.fila.map((jogador) => jogador.username);

                            setUsersGeneric((usersGeneric) =>
                                usersGeneric.filter((jogador) => jogadoresFilaUsernames.includes(jogador.username))
                            );

                            mudarToast("sucesso", "Filtro aplicado!");

                        }
                        else if (chamadas < 1) {
                            chamadas++;
                            setMeusInteresses((meusInteresses) => {
                                const novosInteresses = [...meusInteresses];
                                novosInteresses[0] = "";
                                return novosInteresses;
                            });
                            filtrarJogadores();
                        }
                        else if (chamadas === 1) {
                            mudarToast("erro", "Não foram encontrados jogadores.");
                        }
                    } else {
                        mudarToast("erro", "Erro ao buscar jogadores.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar plataformas:", error);
                });
        } catch (error) {
            console.error("Erro ao filtrar jogadores:", error);
            mudarToast("Erro", "Erro ao filtrar jogadores.");
        }
    }

    const [jogos, setJogos] = useState([]);
    const [jogoSelecionado, setJogoSelecionado] = useState("");

    useEffect(() => {
        console.log("retrieve information games");
        axios.get(
            `${currentURL}/games-api/`
        ).then(response => {
            if (response.status === 200) {
                // mudarToast("sucesso", "Sala criada!");
                console.log("Buscado jogos da api", response.data);
                setJogos(response.data)
            }
        }).catch(error =>
            mudarToast("erro", "ao buscar jogos")

        )

    }, [])

    function limparModalFiltrarSalas() {
        setMinLevelHabilidade(0);
        setMaxLevelHabilidade(5);
        setMinLevelComportamento(0);
        setMaxLevelComportamento(5);
        setJogoSelecionado("");
    }

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        obterMeusInteresses();
        const obterUsuarios = async () => {
            try {
                const response = await axios.get(`${currentURL}/users`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                });
                if (response.status === 200) {
                    const usuarios = response.data.map(async (usuario) => {
                        const mediaFeedbacks = await obterMediaFeedback(usuario.id);
                        const nivel = await obterQuantidadeAmigos(usuario.id);
                        const imagem = await obterImagemUsuario(usuario.id);
                        return {
                            ...usuario,
                            mediaComportamento: mediaFeedbacks.mediaComportamento,
                            mediaHabilidade: mediaFeedbacks.mediaHabilidade,
                            nivel: nivel,
                            imagem: imagem,
                        };
                    });
                    const usuariosComFeedbacks = await Promise.all(usuarios);
                    const shuffledUsuarios = shuffleArray(usuariosComFeedbacks);
                    setUsersGeneric(shuffledUsuarios);
                    setUsers(shuffledUsuarios)
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                mudarToast('Erro', 'Erro ao buscar jogadores.');
            }
        };
        obterUsuarios();
    }, [setUsersGeneric]);


    useEffect(() => {
        const obterAmigos = async () => {
            try {
                const response = await axios.get(`${currentURL}/friends/${USERID}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                });
                if (response.status === 200) {
                    console.log("Amigos", response)
                    const usuarios = response.data.map(async (usuario) => {
                        const mediaFeedbacks = await obterMediaFeedback(usuario.friendUserId);
                        const nivel = await obterQuantidadeAmigos(usuario.friendUserId);
                        const imagem = await obterImagemUsuario(usuario.friendUserId);
                        return {
                            ...usuario,
                            mediaComportamento: mediaFeedbacks.mediaComportamento,
                            mediaHabilidade: mediaFeedbacks.mediaHabilidade,
                            nivel: nivel,
                            imagem: imagem,
                        };
                    });
                    const usuariosComFeedbacks = await Promise.all(usuarios);
                    const shuffledUsuarios = shuffleArray(usuariosComFeedbacks);

                    setFriends(shuffledUsuarios);
                    console.log("friends here", friends)
                }
            } catch (error) {
                console.error('Erro ao buscar amigos:', error);
            }
        };
        obterAmigos();
        console.log("amigos", friends);
    }, []);

    const obterQuantidadeAmigos = async (idUsuario) => {
        try {
            const response = await axios.get(`${currentURL}/friends/${idUsuario}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            if (response.status === 200) {
                var contador = 0;
                response.data.forEach(amigo => {
                    if (amigo.friendshipState === 'CONFIRMED') { contador++ }
                })

                if (contador <= 5) {
                    return "Prata"
                }
                else if (contador <= 12) {
                    return "Ouro"
                }
                else if (contador <= 22) {
                    return "Diamante"
                }
                else {
                    return "Mestre"
                }
            }
            else if (response.status === 204) {
                return "Prata"
            }
        }
        catch (error) {
            console.error('Erro ao buscar quantidade de amigos', error);
            mudarToast('Erro', 'Erro ao buscar quantidade de amigos.');
            return "Prata"
        }
    };

    const obterMeusInteresses = async () => {
        try {
            const response = await axios.get(`${currentURL}/preferences/${USERID}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            if (response.status === 200) {
                setMeusInteresses(response.data.preferences.map((preferencia) => preferencia.preferences));
            }
            else {
                console.log("usuário nao tem nenhuma preferencia cadastrada")
            }
        } catch (error) {
            console.log(error);
        }
    };


    const obterMediaFeedback = async (idUsuario) => {
        try {
            const response = await axios.get(`${currentURL}/feedbacks/${idUsuario}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });
            if (response.status === 200) {
                const feedbacks = response.data;

                const somaComportamento = feedbacks.reduce((total, jogador) => total + jogador.behavior, 0);
                const mediaComportamento = somaComportamento / feedbacks.length;

                const somaHabilidade = feedbacks.reduce((total, jogador) => total + jogador.skill, 0);
                const mediaHabilidade = somaHabilidade / feedbacks.length;

                return {
                    mediaComportamento: Math.round(mediaComportamento),
                    mediaHabilidade: Math.round(mediaHabilidade)
                };
            }
            if (response.status === 204) {
                return {
                    mediaComportamento: 0,
                    mediaHabilidade: 0
                };
            }
        } catch (error) {
            console.error('Erro ao buscar feedbacks:', error);
            return {
                mediaComportamento: 0,
                mediaHabilidade: 0
            };
        }
    };

    const obterImagemUsuario = async (jogadorId) => {
        try {
            const response = await axios.get(`${currentURL}/users/${jogadorId}/picture`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                responseType: 'blob',
            });
            if (response.data.size > 0) {
                const blobData = response.data;
                const imageUrl = await convertBlobToBase64(blobData);
                return imageUrl;
            }
            else {
                return imgUserProfile;
            }
        } catch (error) {
            return imgUserProfile;
        }
    };

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(blob);
        });
    };

    const [filterAplicado, setfilteAplicado] = useState(false);

    
    function filtrarJogadorPorNome(userBusca) {
        // TO DO basear filtros do interesse.
        try {
            // Verifica se a lista original já foi definida
            if (listaOriginal.length === 0) {
                setListaOriginal([...usersGeneric]);
            }
            setfilteAplicado(true)
            setUsersGeneric(listaOriginal);
            jogadoresFiltrados = listaOriginal.filter((jogador) => {

                if (jogador.username.toLowerCase().startsWith(userBusca.toLowerCase())) {
                    console.log("ta passando aqui")
                    console.log(jogador.username)
                    return true;
                }
                return false;
            });
            setUsersGeneric(jogadoresFiltrados);
            setShowModalFiltroJogadores(false);

        } catch (error) {
            console.error("Erro ao filtrar jogadores pelo campo de busca:", error);
            mudarToast("Erro", "Erro ao filtrar jogadores.");
        }
    }

    const idsGenerics = usersGeneric.map((element) => element.id);
    const idsFriendsAccepted = friends.filter((friend) => (friend.friendshipState === "CONFIRMED")).map((element) => (element.friendUserId));
    const idsFriendsPending = friends.filter((friend) => (friend.friendshipState === "SENDED")).map((element) => (element.friendUserId));

    const usersFilterIdsAccepted = idsGenerics.filter(numero => idsFriendsAccepted.includes(numero));

    return (
        <div className='containerRooms'>
            <Sidebar />
            <div className='bodyRooms'>
                <div className="topDiv">
                    <div className="inputDiv">
                        <input type="text" className='inputRooms' placeholder='Buscar jogadores' onChange={(event) => filtrarJogadorPorNome(event.target.value)} />
                        <BsFilterLeft className='salas-icon-filtro' onClick={() => setShowModalFiltroJogadores(true)} />
                        <HiSearch className='salas-icon-search' />
                    </div>
                    <div className="divRoomsAllContainer">
                        {usersGeneric == [] || usersGeneric.length === 0 || usersGeneric == null || usersGeneric === undefined ?
                            filterAplicado ?
                                <NothingContentRooms
                                    text1={"Nenhum amigo encontrado pelo filtro"}
                                    text2={"tente por outro filtro"}
                                    isInteractive={false}
                                />
                                :
                                <NothingContentRooms
                                    text1={"Nenhum jogador encontrado"}
                                    text2={"Convide pessoas e ajude nosso servidor a crescer ainda mais"}
                                    isInteractive={false}
                                />
                            : usersGeneric.filter((user) => (user.id !== USERID && !usersFilterIdsAccepted.includes(user.id)))
                                .map((element) => (
                                    idsFriendsPending.includes(element.id) ?
                                        <React.Fragment key={element.id}>
                                            <User id={element.id}
                                                username={element.username}
                                                friendStatus={"pending"}
                                                mediaComportamento={element.mediaComportamento}
                                                mediaHabilidade={element.mediaHabilidade}
                                                nivel={element.nivel}
                                                imagem={element.imagem} />
                                        </React.Fragment>
                                        :
                                        <React.Fragment key={element.id}>
                                            <User
                                                id={element.id}
                                                username={element.username}
                                                friendStatus={"teste"}
                                                mediaComportamento={element.mediaComportamento}
                                                mediaHabilidade={element.mediaHabilidade}
                                                nivel={element.nivel}
                                                imagem={element.imagem} />
                                        </React.Fragment>
                                ))
                        }
                    </div>
                </div>

                <div className="bottomDiv">
                    <div className="inputDiv">
                        <input type="text" className='inputRooms' placeholder='Buscar amigos' />
                        {/* <BsFilterLeft className='salas-icon-filtro' onClick={() => setShowModalFiltroJogadores(true)} /> */}
                        <HiSearch className='salas-icon-search' />
                    </div>
                    <div className="divRoomsAllContainer">

                        {friends.length === 0 || friends === null || friends === undefined ?
                            <NothingContentRooms
                                text1={"Nenhum amigo encontrado"}
                                text2={"Adicione as pessoas para interagir e adicionar em grupos"}
                                isInteractive={false}
                            />
                            :
                            friends.filter((friend) => (friend.friendshipState === "CONFIRMED"))
                                .map((element) => (
                                    <React.Fragment key={element.id}>
                                        {
                                            <User
                                                friendshipState={element.friendshipState}
                                                idSender={USERID}
                                                idReceiver={element.friendUserId}
                                                username={element.username}
                                                friendStatus={"accepted"}
                                                mediaHabilidade={element.mediaHabilidade}
                                                mediaComportamento={element.mediaComportamento}
                                                nivel={element.nivel}
                                                imagem={element.imagem}
                                            />

                                        }
                                    </React.Fragment>
                                ))}
                    </div>
                </div>
            </div>

            {showModalFiltroJogadores && (
                <Modal title="Filtrar por" icon={<BsFilterLeft />} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort />} textButton='Filtrar' onClose={() => setShowModalFiltroJogadores(false)} onClickButton={filtrarJogadores} onClear={limparModalFiltrarSalas}>
                    <div className="container_filtro_modal_users">
                        <p className='title_container_users'>Perfil Pessoal</p>
                        <div className="container_sliders">
                            <div className="filtro_comportamento"><p className="titleFiltro">Comportamento</p> <RangeBar min='0' max='5' values={currentValuesComportamento} onChange={handleValuesChangeComportamento} /> </div>
                            <div className="filtro_habilidade"><p className="titleFiltro">Habilidade</p>  <RangeBar min='0' max='5' values={currentValuesHabilidade} onChange={handleValuesChangeHabilidade} /> </div>
                        </div>

                    </div>
                </Modal>
            )}

            {showToast && (
                <Toast
                    type={toastType}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}

        </div>
    );
}

export const User = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    const sendNotifyToUserForFriendship = () => {

        fetch(`${currentURL}/notifies/${Number(props.id)}?type=FRIEND_REQUEST&message=${USERNAMESESSION} enviou um pedido de amizade&description=${USERNAMESESSION}&state=AWAITING`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    const sendFriendShip = () => {
        const friendRequestPayload = {
            username: props.username
        };

        fetch(`${currentURL}/friends/${USERID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(friendRequestPayload),
        })
            .then(response => {
                if (response.ok) {
                    mudarToast("Sucesso", "Convite enviado")
                    sendNotifyToUserForFriendship()
                } else if (response.status === 409) {
                    mudarToast("Erro", "Você já enviou ou recebeu um convite do esse usuário")

                } else {
                    mudarToast("Erro", "Falha ao enviar o convite")
                }
            })
            .catch(error => (console.log(error)))
    }


    return (
        <>
            {isOpen &&
                <ChatWithUser
                    friendName={props.username}
                    isOpen={isOpen}
                    onCloseModal={closeModal}
                    idSender={props.idSender}
                    idReceiver={props.idReceiver}
                    mediaHabilidade={props.mediaHabilidade}
                    mediaComportamento={props.mediaComportamento}
                    nivel={props.nivel}
                    imagem={props.imagem}
                />
            }
            <div className="divUserRoomCardContainer">
                <div className="divLeftUser">
                    {props.nivel === "Prata" &&
                        <img className='imgRankUsersUser' src={medalPrata} alt="" />
                    }
                    {props.nivel === "Ouro" &&
                        <img className='imgRankUsersUser' src={medalOuro} alt="" />
                    }
                    {props.nivel === "Diamante" &&
                        <img className='imgRankUsersUser' src={medalDiamante} alt="" />
                    }
                    {props.nivel === "Mestre" &&
                        <img className='imgRankUsersUser' src={medalMestre} alt="" />
                    }
                </div>

                <div className="divMidUser">
                    <div className="divUserImgAndNameContainerUsers">
                        <img className='imgUserUsers' src={props.imagem} alt="" />
                        <p>{props.username ? props.username : "Usuário"}</p>
                    </div>

                    <div className="UsersDivContainerTitulos">
                        <p>C</p>
                        <p>H</p>
                    </div>

                    <div className="divLevelsOfBehaviorAndSkillContainer">
                        <div className="divSKillBehaviorContainer divSKillBehaviorContainerRed">
                            {props.mediaComportamento}
                        </div>
                        <div className="divSKillBehaviorContainer divSKillBehaviorContainerGreen">
                            {props.mediaHabilidade}
                        </div>
                    </div>
                </div>
                <div className="divRightUser">
                    {
                        props.friendStatus === "pending" ?
                            <img className='imgForFriend' onClick={sendFriendShip} src={iconPending} alt="" />
                            :
                            props.friendStatus === "accepted" ?
                                <img className='imgForFriend' onClick={sendFriendShip} src={iconHeart} alt="" />
                                :
                                <img className='imgForFriend' style={{ cursor: 'pointer' }} onClick={sendFriendShip} src={iconHeartDisabled} alt="" />
                    }
                    {props.friendshipState === "CONFIRMED" &&
                        <button
                            className='buttonOpenModalForMessagesWithUser'
                            onClick={openModal}>
                            <img className='imgButtonChatForMeesageWithUser' src={iconChatNormal} alt="" />
                        </button>
                    }
                </div>
            </div>
            {showToast && (
                <Toast
                    type={toastType}
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    )
}

export default Users;