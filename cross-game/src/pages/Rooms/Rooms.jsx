import React, { useEffect, useState } from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import CardRoom from '../../components/CardRoom/CardRoom';
import axios from "axios"
import { currentURL } from '../../data/constants';
// import { useHistory } from 'react-router-dom';
// import { use } from 'react-router-dom';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${currentURL}/team-rooms`);
                setRooms(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='containerRooms'>
                <Sidebar />
                <div className='bodyRooms'>
                    <div className="topDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar salas' />
                        </div>
                        <div className="divRoomsAllContainer">
                            {rooms === [] || rooms.length === 0 || null || undefined ?

                                <NothingContentRooms
                                    text1={"Não temos nenhuma sala pública"}
                                    text2={"Seja o primeiro a criar"}
                                    isInteractive={true}
                                />

                                : rooms.map((element) => (
                                    <React.Fragment key={element.id}>
                                        <CardRoom nomeEquipe={element.roomName} faltantes={element.capacity} gameName={element.gameName} rankGame={element.rankGame} levelGame={element.levelGame} descricao={element.description} isClick={false} idGroup={element.id} />
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                    <div className="bottomDiv">
                        <div className="inputDiv">
                            <input type="text" className='inputRooms' placeholder='Buscar salas' />
                            <div className='divButtonCriarSala'>
                                Criar sala
                            </div>
                            <div className="divButtonBuscaRapida">
                                Busca rápida
                            </div>
                        </div>
                        <div className="divRoomsAllContainer">
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                            <CardRoom nomeEquipe={"Teste"} faltantes={10} gameName={"Valorant"} rankGame={10} isClick={false} levelGame={10} idGroup={5} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export const NothingContentRooms = (props) => {
    return (
        <>
            <div className='nothingContentRooms'>
                <h1 className='nothingContentRoomsH1'>{props.text1} </h1>
                <p className='nothingContentRoomsP'>{props.text2}</p>
                {props.isInteractive && <div className='divButtonCriarSala'>
                    Criar sala
                </div>}
            </div>
        </>
    )
}
export default Rooms;