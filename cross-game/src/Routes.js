import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/index.jsx';
import Rooms from './pages/Rooms/Rooms.jsx';
import { App, ChatRoom } from './pages/ChatRoom/ChatRoom.jsx';


function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;