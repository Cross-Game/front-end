import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import Teste from './pages/Teste/index.jsx';
import NotFound from './pages/PagNotFound/NotFound.jsx';
function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/teste" element={<Teste />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default routes;