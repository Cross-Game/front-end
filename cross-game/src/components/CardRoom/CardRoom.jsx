import React, { useState } from 'react';
import "./CardRoom.css"
import { Link, redirect, useNavigate } from 'react-router-dom';

function CardRoom(props) {
    
    const handleEnterRoom = () => {
        // Redirecionar para a sala apenas se o redirecionamento não estiver ocorrendo a partir da URL
        if (!window.location.pathname.includes("/rooms/")) {
            // Aqui você pode adicionar qualquer lógica adicional antes de redirecionar para a sala
            // ...
            // Redirecionar para a sala
            window.location.href = `/rooms/${props.idGroup}`;
        }
    };

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
                            {/* <Link className="buttonEnterRoom" to={`${1}`}> */}
                            {/* <IsClickedRoom idGroup={props.idGroup} />
                             */}
                            <div onClick={handleEnterRoom} className="buttonEnterRoom">
                                Entrar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CardRoom;