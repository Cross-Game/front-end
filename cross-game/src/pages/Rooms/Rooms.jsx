import React from 'react';
import './Rooms.css'
import Sidebar from '../../components/Sidebar/Sidebar';
function Rooms() {
    return (
        <>
            <div className='containerRooms'>
                <Sidebar />
                <div style={{ backgroundColor: "red", width: "100%" }}>
                    teste
                </div>
            </div>
        </>
    );
}
export default Rooms;