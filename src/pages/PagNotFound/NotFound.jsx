import React from "react";
import "./notFound.css";
import logo from "./assests/Union.svg"
import imgJinx from "./assests/Jinx.svg"

function NotFound() {

  function voltar(){
  window.location.href = "/";

  }


  return (
    <>
    <body className="body404">
    <div className="div-geral-not">
        <div className="div-not-found">
          <div className="imagem404">
            <img src={logo} className="logo404" alt="" />
            <div className="paragrafoCross">
              <p>Cross Game</p>
            </div>
            <div className="div-404">
              <p className="paragrafo404">404 <br />
                NOT FOUND</p>
              <div className="div-Texto">
                <p className="paragrafoTexto">Não encontramos essa página, <br />
                  É tempo de voltar para casa!
                </p>
                <div className="div-button">
              <button className="button-voltar" onClick={voltar}>Voltar</button>
            </div>
              </div>
            </div>
          </div>
        </div>
        <div className="jinx">
          <img className="jinx-img" src={imgJinx} alt="" />
        </div>
      </div>
    </body>
    </>

  );
}
export default NotFound;