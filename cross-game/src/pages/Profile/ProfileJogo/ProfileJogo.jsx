import React, { useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import "./ProfileJogo.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

function ProfileJogo() {

    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar">
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfileJogoCardContainer">
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                    <div className="ProfileJogoCardUsername">
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Username: <span>HOmonster</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">GamerId: <span>215478166</span></p>
                        </div>
                        <div>
                            <p className="ProfileJogoEstiloParagrafo">Jogo: <span>League of Legends</span></p>
                        </div>
                        <div>
                            <AiOutlineDelete
                                className="ProfileJogoEstilo"
                                onClick={handleOpenModal}
                                style={{ color: '#0f3', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <ProfileNavbar
                profiles={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )


}

export default ProfileJogo;