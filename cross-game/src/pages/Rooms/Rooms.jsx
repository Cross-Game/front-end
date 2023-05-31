import React, { useEffect, useState } from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import CardRoom from '../../components/CardRoom/CardRoom';
import axios from "axios"
// import { useHistory } from 'react-router-dom';
// import { use } from 'react-router-dom';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await axios.get('http://localhost:8081/team-rooms');
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
                            {rooms == [] || rooms.length == 0 || null || undefined ? <NothingContentRooms /> : rooms.map((element) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export const NothingContentRooms = () => {
    return (
        <>
            <div className='nothingContentRooms'>
                <h1 className='nothingContentRoomsH1'>Não temos nenhuma sala pública </h1>
                <p className='nothingContentRoomsP'>Seja o primeiro a criar</p>
                <div className='divButtonCriarSala'>
                    Criar sala
                </div>
            </div>
        </>
    )
}
export default Rooms;