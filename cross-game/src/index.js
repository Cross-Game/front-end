import "./assets/reset.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Teste from "./pages/Teste";


// configuração do router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/teste",
    element: <Teste />
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

