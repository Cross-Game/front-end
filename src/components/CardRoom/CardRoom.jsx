import React, { useEffect, useState } from 'react';
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



    const obterImagemUsuario = async (jogadorId) => {
        try {
            const response = await axios.get(`${currentURL}/users/${jogadorId}/picture`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                responseType: 'blob',
            });
            console.log(response)
            if (response.data.size > 0) {
                const blobData = response.data;
                const imageUrl = await convertBlobToBase64(blobData);
                return imageUrl;
            }
            else {
                return imgTest;
            }
        } catch (error) {
            console.log(error);
            return imgTest;
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

    const [userImage, setUserImage] = useState([]);

    useEffect(() => {
        const usersData = async () => {
            try {

                const response = await axios.get(`${currentURL}/team-rooms/${props.idGroup}`);
                console.log(response)
                if (response.status === 200) {
                    const usuarios = response.data.user.map(async (usuario) => {
                        const imagem = await obterImagemUsuario(usuario.id);
                        return {
                            ...usuario,
                            id: usuario.id,
                            imgUser: imagem,
                        };
                    });
                    const usuariosTeste = await Promise.all(usuarios);
                    setUserImage(usuariosTeste)
                    console.log("buscar imagens dos usuarios", response)
                }
            } catch (error) {
                console.error('Erro ao buscar imagens usuários:', error);
            }
        };
        usersData();
    }, []);

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
                        {userImage.map((element, index) => (
                            <React.Fragment key={element.id}>
                                <img style={{
                                    zIndex: index + 1,
                                    left: index * 30
                                }} src={element.imgUser} className='divGamersContentImgs' alt="" />
                            </React.Fragment>
                        ))}
                    </div>
                    {/*  */}

                    <div className="divDescriptionAndButtonContainer">
                        <div className="descriptionRoomContainer">
                            <p>{props.descricao}</p>
                        </div>
                        <div className="buttonRoomDivContainer">
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