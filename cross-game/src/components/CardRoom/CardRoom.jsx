import React from 'react';
import "./CardRoom.css"
import { Link } from 'react-router-dom';

function CardRoom(props) {
    return (
        <>

            {/* Rooms ind */}
            <div className="roomUniqueContainer">
                <div className="roomUniqueContent">
                    <div className="roomUniqueNameAndInformation">
                        <h2>{props.nomeEquipe ? props.nomeEquipe : "NA"}</h2>
                        <h3>{props.faltantes ? `${props.faltantes} vagas restantes  ` : ""} </h3>
                    </div>
                    <div className="roomUniqueInformationRoomFilters">
                        {
                            props.gameName ?
                                <div className="roomUniqueGame">
                                    {props.gameName}
                                </div>
                                : null
                        }

                        {
                            props.rankGame ?
                                <div className="roomUniqueFiltersTags">
                                    Ranking {props.rankGame}
                                </div>
                                : null
                        }
                        {
                            props.levelGame ?
                                <div className="roomUniqueFiltersTags">
                                    Level {props.levelGame}
                                </div>
                                : null
                        }
                    </div>

                    {/* decidiremos se vamos recuperar as imagens dos jogadores */}
                    <div className="divGamersContent"></div>
                    {/*  */}

                    <div className="divDescriptionAndButtonContainer">
                        <div className="descriptionRoomContainer">
                            <p>{props.descricao}</p>
                        </div>
                        <div className="buttonRoomDivContainer">
                            <Link className="buttonEnterRoom" to={`${props.idchat}`}>
                                Entrar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
        </>
    )
}

export default CardRoom;