import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USERID, currentURL, TOKEN, USERNAMESESSION } from "../../data/constants";

import Sidebar from '../../components/Sidebar/Sidebar'
import './Users.css';

import imgTest from "../../assets/index-page/medalDiamante.svg"
import iconHeart from "./assets/iconHeart.svg"
import iconHeartDisabled from "./assets/iconHeartDisabled.svg"
import iconPending from "./assets/iconPending.svg"
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


    const idsGenerics = usersGeneric.map((element) => element.id);
    const idsFriendsAccepted = friends.filter((friend) => (friend.friendshipState === "CONFIRMED")).map((element) => (element.friendUserId));
    const idsFriendsPending = friends.filter((friend) => (friend.friendshipState === "SENDED")).map((element) => (element.friendUserId));

    const usersFilterIdsAccepted = idsGenerics.filter(numero => idsFriendsAccepted.includes(numero));

    console.log("testes", usersFilterIdsAccepted);

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
                            : usersGeneric.filter((user) => (user.id !== USERID && !usersFilterIdsAccepted.includes(user.id)))
                                .map((element) => (
                                    idsFriendsPending.includes(element.id) ?
                                        <React.Fragment key={element.id}>
                                            <User id={element.id} username={element.username} friendStatus={"pending"} />
                                        </React.Fragment>
                                        :
                                        <React.Fragment key={element.id}>
                                            <User id={element.id} username={element.username} friendStatus={"teste"} />
                                        </React.Fragment>
                                ))
                        }
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

    const sendNotifyToUserForFriendship = () => {

        fetch(`${currentURL}/notifies/${Number(props.id)}?type=FRIEND_REQUEST&message=Convite para Amigo&description=${USERNAMESESSION}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        })
            .then(response => console.log(response.json()))
            .then(data => console.log("Notificação enviada:", data))
            .catch(error => console.log(error))
    }

    const sendFriendShip = () => {
        console.log("Eu:" + USERID + " Amigo: " + props.username)

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
                    // após a requisição de amizade fazemos uma notificação 
                    console.log("// A requisição de amizade foi bem-sucedida")
                    sendNotifyToUserForFriendship()
                } else if (response.status === 409) {

                    console.log("você já fez uma requisição para esse usuário")

                } else {
                    console.log("Falha ao enviar a requisição de amizade.");
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
                    {
                        props.friendStatus == "pending" ?
                            <img className='imgForFriend' onClick={sendFriendShip} src={iconPending} alt="" />
                            :
                            props.friendStatus == "accepted" ?
                            <img className='imgForFriend' onClick={sendFriendShip} src={iconHeart} alt="" />
                            :
                            <img className='imgForFriend' onClick={sendFriendShip} src={iconHeartDisabled} alt="" />
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
        </>
    )
}

export default Users;