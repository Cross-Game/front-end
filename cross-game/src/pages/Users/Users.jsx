import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USERID, currentURL, TOKEN } from "../../data/constants";

import Sidebar from '../../components/Sidebar/Sidebar'
import './Users.css';

import imgTest from "../../assets/index-page/medalDiamante.svg"
import iconHeart from "./assets/iconHeart.svg"
import { NothingContentRooms } from '../Rooms/Rooms';
import ChatWithUser from '../../components/ChatWithUser/ChatWithUser';
import iconChatNormal from "../../pages/ChatRoom/assets/chatNormalIcon.svg"
import Modal from '../../components/Modal';
import { BsArrowRightShort, BsFilterLeft } from 'react-icons/bs';
import Option from './Option';
import RangeBar from '../../components/RangeBar';
import Toast from '../../components/Toast';

function Users() {
    
    const [usersGeneric, setUsersGeneric] = useState([]);
    const [friends, setFriends] = useState([]);
    const [showModalFiltroJogadores, setShowModalFiltroJogadores] = useState(false);



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

    function filtrarSalas() {
        setShowModalFiltroJogadores(true); // TODO Trocar para false
        mudarToast("Sucesso", "Filtro aplicado.")
        mudarToast("Erro", "Erro ao filtrar jogadores.")
        //TODO 
    }

    

    function limparModalFiltrarSalas() {
        setMinLevelHabilidade(0);
        setMaxLevelHabilidade(5);
        setMinLevelComportamento(0);
        setMaxLevelComportamento(5);
    }

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    // substituir ids, tokens e urls para dinamicos
    useEffect(() => {
        const obterUsuarios = async () => {
            try {
                const response = await axios.get(`${currentURL}/users`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                });
                if (response.status === 200) {
                    setUsersGeneric(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar usuarios:', error);
            }
        };
        obterUsuarios();
        console.log("users", usersGeneric);
    }, []);


    useEffect(() => {
        const obterAmigos = async () => {
            try {
                const response = await axios.get(`${currentURL}/friends/${USERID}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    }
                });
                if (response.status === 200) {
                    setFriends(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar amigos:', error);
            }
        };
        obterAmigos();
        console.log("amigos", friends);
    }, []);

    return (
        <div className='containerRooms'>
            <Sidebar />
            <div className='bodyRooms'>
                <div className="topDiv">
                    <div className="inputDiv">
                        <input type="text" className='inputRooms' placeholder='Buscar jogadores' />
                    </div>
                    <div className="divRoomsAllContainer">
                        {usersGeneric === [] || usersGeneric.length === 0 || null || undefined ?
                            <NothingContentRooms
                                text1={"Nenhum amigo encontrado"}
                                text2={"Adicione as pessoas para interagir e adicionar em grupos"}
                                isInteractive={false}
                            />
                            : usersGeneric.filter((user) => (user.id !== USERID))
                                .map((element) => (
                                    <React.Fragment key={element.id}>
                                        <User username={element.username} />
                                    </React.Fragment>
                                ))}
                    </div>
                </div>
                <div className="bottomDiv">
                    <div className="inputDiv">
                        <input type="text" className='inputRooms' placeholder='Buscar amigos' />
                    </div>
                    <div className="divRoomsAllContainer">
                        {friends === [] || friends.length === 0 || null || undefined ?
                            <NothingContentRooms
                                text1={"Nenhum amigo encontrado"}
                                text2={"Adicione as pessoas para interagir e adicionar em grupos"}
                                isInteractive={false}
                            />
                            : friends.map((element) => (
                                <React.Fragment key={element.id}>
                                    {
                                        <User
                                            friendshipState={element.friendshipState}
                                            idSender={USERID}
                                            idReceiver={element.friendUserId}
                                            username={element.username}
                                        />
                                    }
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>

            {showModalFiltroJogadores && (
                <Modal title="Filtrar por" icon={<BsFilterLeft />} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort />} textButton='Filtrar' onClose={() => setShowModalFiltroJogadores(false)} onClickButton={filtrarSalas} onClear={limparModalFiltrarSalas}>
                    <div className="container_filtro">
                        {/* <div className="filtro_nivel">
                            <p className="titleFiltro">Nivel</p>
                            <div className="opcoesNivel">
                                <Option backgroundColor='#4D4D4D' />
                                <Option backgroundColor='#604F00' />
                                <Option backgroundColor='#052D4F' />
                                <Option backgroundColor='#571618' />
                            </div>
                        </div> */}
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

    return (
        <>
            {isOpen &&
                <ChatWithUser
                    friendName={props.username}
                    isOpen={isOpen}
                    onCloseModal={closeModal}
                    idSender={props.idSender}
                    idReceiver={props.idReceiver}
                />
            }
            <div className="divUserRoomCardContainer">
                <div className="divLeftUser">
                    <img className='imgRankUsersUser' src={imgTest} alt="" />
                </div>

                <div className="divMidUser">
                    <div className="divUserImgAndNameContainerUsers">
                        <img className='imgUserUsers' src={imgTest} alt="" />
                        <p>{props.username ? props.username : "Usuário"}</p>
                    </div>

                    <div className="divLevelsOfBehaviorAndSkillContainer">
                        <div className="divSKillBehaviorContainer divSKillBehaviorContainerRed">
                            10
                        </div>
                        <div className="divSKillBehaviorContainer divSKillBehaviorContainerGreen">
                            10
                        </div>
                    </div>
                </div>
                <div className="divRightUser">
                    <img className='imgForFriend' src={iconHeart} alt="" />
                    {props.friendshipState &&
                        <button
                            className='buttonOpenModalForMessagesWithUser'
                            onClick={openModal}>
                            <img className='imgButtonChatForMeesageWithUser' src={iconChatNormal} alt="" />
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default Users;