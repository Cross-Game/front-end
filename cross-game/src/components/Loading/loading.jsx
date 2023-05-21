import React from "react";
import "./loading.css";
import imgLoading from './assets/Union.png'

function Loading() {
  return (
    <div className="loading-container">
      <img className="loading-image" src={imgLoading} alt="Loading" />
      <h4 className="loading">Carregando...</h4>
    </div>
  );
}

export default Loading;