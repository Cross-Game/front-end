import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/index.jsx';
import Rooms  from './pages/Rooms/Rooms.jsx';
import ProfileJogo from './pages/Profile/ProfileJogo/ProfileJogo.jsx';
import Interesse from './pages/Profile/Interesse/Interesse.jsx';
import Feedback from './pages/Profile/Feedback/Feedback.jsx';
import Plataforma from './pages/Profile/Plataforma/Plataforma.jsx';

import Login from './pages/Login/Login.jsx';

function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/teste" element={<Teste />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/profilejogo" element={<ProfileJogo />} />
                <Route path="/interesse" element={<Interesse />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/plataforma" element={<Plataforma />} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;