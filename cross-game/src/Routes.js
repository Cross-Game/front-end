import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/index.jsx';
import Rooms from './pages/Rooms/Rooms.jsx';
import ProfileJogo from './pages/Profile/ProfileJogo/ProfileJogo.jsx';
import Interesse from './pages/Profile/Interesse/Interesse.jsx';
import Feedback from './pages/Profile/Feedback/Feedback.jsx';
import Plataforma from './pages/Profile/Plataforma/Plataforma.jsx';


function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path='/profile' >
                    <Route path='' element={<ProfileJogo />} />
                    <Route path='interesse' element={<Interesse />} />
                    <Route path='feedback' element={<Feedback />} />
                    <Route path='plataforma' element={<Plataforma />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default routes;