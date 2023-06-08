import React, { useEffect, useRef, useState } from 'react';
import { addDoc, and, collection, limit, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, databaseApp } from "../../data/firebaseConfig";

import './ChatWithUser.css';

import { ChatMessage } from "../../pages/ChatRoom/ChatRoom"

import enviarIcon from "../../pages/ChatRoom/assets/enviarIcon.svg"

function ChatWithUser(props) {
    const dummy = useRef(null)

    const idCurrentUser = props.idSender;
    const friendUserId = props.idReceiver;
    const friendshipIds = [idCurrentUser, friendUserId]
    const sortedfriendshipIds = friendshipIds.sort((a, b) => a - b);

    const messagesRef = collection(databaseApp, "messagesWithUsers");
    const q = query(messagesRef, orderBy("createdAt"), where('users', '==', sortedfriendshipIds),);
    const [messages] = useCollectionData(q, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    console.log("mensagens unicas dos amigos", messages)

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        // const { } = auth.currentUser;
        // const { photoURL, uid } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            uid: idCurrentUser,
            uid2: friendUserId,
            users: friendshipIds,
            // photoURL,
            createdAt: serverTimestamp()
        });
        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    };

    const closeModal = () => {
        props.onCloseModal();
    };

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <div className="modal-container-chat-user" onClick={handleModalClick}>
                <div className="modal-content">
                    <div className="headerModalChatUser">
                        <div className="divInformationOfUserInChatModal">
                            <h3>
                                {props.friendName}
                            </h3>
                            <h2>
                                id:{props.idReceiver}
                            </h2>
                        </div>
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                    </div>
                    <div className="chatContentModalWithUser">
                        {messages &&
                            messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
                        <div ref={dummy}></div>
                    </div>
                    <div className="chatInputModalFixed">
                        <form onSubmit={sendMessage} className="formChatModalUsers">
                            <input placeholder="Digite aqui..." className="inputMensagemChatUserModal"
                                type="text"
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                            />
                            <button type="submit" className="buttonSendMessageModalUser" disabled={!formValue}><img src={enviarIcon} alt="" /></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ChatWithUser;