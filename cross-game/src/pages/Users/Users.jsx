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

function Users() {
    
    const [usersGeneric, setUsersGeneric] = useState([]);
    const [friends, setFriends] = useState([]);

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
                        <input type="text" className='inputRooms' placeholder='Buscar pessoa' />
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
                        <input type="text" className='inputRooms' placeholder='Buscar Amigos' />
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