import React from "react";
import "./Cadastro.css"
import { BsDiscord, BsGoogle, BsArrowRightShort } from "react-icons/bs";


function Cadastro() {
    return (
        <>
            <div className="container">
                <div className="botaoVoltar">
                    <p className="voltar">Voltar</p>
                </div>
                <div className="cardCadastro">
                    <div className="img">

                    </div>
                    <div className="cardFormCadastro">
                        <div className="tituloCadastro">Cadastrar</div>
                        <div className="inputCadastro">
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder="email@email.com"/>
                            <label htmlFor="">Usuario</label>
                            <input type="text" placeholder="HOmonster"/>
                            <label htmlFor="">Senha</label>
                            <input type="password" placeholder="********" />
                        </div>
                        <div className="botaoCadastro">
                            <div>Proximo</div>
                            <BsArrowRightShort className="arrowProximo"/>
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord"/></div>
                            <div><BsGoogle className="loginGoogle"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastro;