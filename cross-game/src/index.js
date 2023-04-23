import "./assets/reset.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Cadastro from "./pages/Cadastro/Cadastro.jsx";

// configuração do router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },{
    path: "/cadastro",
    element: <Cadastro />
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

