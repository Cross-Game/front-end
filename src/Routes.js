import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/index.jsx';
import { ChatRoom } from './pages/ChatRoom/ChatRoom.jsx';

import Rooms from './pages/Rooms/Rooms.jsx';
import ProfileJogo from './pages/Profile/ProfileJogo/ProfileJogo.jsx';
import Interesse from './pages/Profile/Interesse/Interesse.jsx';
import Feedback from './pages/Profile/Feedback/Feedback.jsx';
import Plataforma from './pages/Profile/Plataforma/Plataforma.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import NotFound from './pages/PagNotFound/NotFound.jsx'
import Login from './pages/Login/Login.jsx';
import Salas from './pages/Salas/salas.jsx';
import Users from './pages/Users/Users.jsx';

function routes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/teste" element={<Teste />} />
                <Route path='/profile' >
                    <Route path='' element={<ProfileJogo />} />
                    <Route path='interesse' element={<Interesse />} />
                    <Route path='feedback' element={<Feedback />} />
                    <Route path='plataforma' element={<Plataforma />} />
                </Route>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/salas' element={<Salas />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<ChatRoom />} />
                <Route path='/users' element={<Users />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;