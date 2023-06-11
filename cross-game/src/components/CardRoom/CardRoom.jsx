import React, { useState } from 'react';
import "./CardRoom.css"
import { Link, redirect, useNavigate } from 'react-router-dom';
import { TOKEN, USERID, USERNAMESESSION, currentURL } from '../../data/constants'
import imgTest from "../../assets/index-page/testeImg.png";

import axios from 'axios';

function CardRoom(props) {

    const handleEnterRoom = () => {
        if (!window.location.pathname.includes("/rooms/")) {
            axios.put(`${currentURL}/team-rooms/add-users/${USERID}/${props.idAdmin}/${props.idGroup}`
            ).then((response) => {
                if (response.status === 200) {
                    window.location.href = `/rooms/${props.idGroup}`;
                }
                console.log("Requisição entrar na sala", response)
            }).catch((error) => {
                console.error('erro ao entrar na sala', error);
            });
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
                    <div className="divGamersContent">
                        <img src={imgTest} className='divGamersContentImgs' alt="" />
                        <img src={imgTest} className='divGamersContentImgs' alt="" />
                        <img src={imgTest} className='divGamersContentImgs' alt="" />
                    </div>
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