import React from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
import CardRoom from '../../components/CardRoom/CardRoom';
function Rooms() {
    return (
        <>
            <div className='containerRooms'>
                <Sidebar />
                <div className='bodyRooms'>
                    <div className="topDiv">
                        <div className="inputDiv"></div>
                        <div className="divRoomsAllContainer">
                            <CardRoom nomeEquipe={"MinhaEquipe"} faltantes={10} gameName={"Valorant"} rankGame={"gold"} levelGame={10} descricao={"Minha Descrição"} idchat={2}/>
                        </div>
                    </div>
                    <div className="bottomDiv">
                        <div className="inputDiv">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Rooms;