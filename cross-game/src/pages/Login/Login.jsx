import React from "react";
import "./Login.css"
import { BsDiscord, BsGoogle, BsArrowRightShort,  BsArrowLeftShort} from "react-icons/bs";


function Login() {
    return (
        <>
            <div className="container">
                <div className="botaoVoltar">
                    <p className="voltar">Voltar</p>
                </div>
                <div className="cardCadastro">
                <div className="cardFormLogin">
                        <div className="titulo">Entrar</div>
                        
                        <div className="inputsForm">

                        <label htmlFor="">Usuário</label>
                        <input type="text" placeholder="HOmonster"/>

                        <label htmlFor="">Senha</label>
                        <input type="password" placeholder="********" />

                        <div className="subInputs">
                            <a>Esqueceu a senha?</a> 
                            <a>Não possui conta?</a>
                        
                        </div>

                        </div>
                        <div className="botaoCadastro">
                            <div>Entrar</div>
                            <BsArrowRightShort className="arrowProximo"/>
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord"/></div>
                            <div><BsGoogle className="loginGoogle"/></div>
                        </div>
                    </div>

                    <div className="imgLogin">
                        <div className="divWelcome">
                        <p className="title">Continue sua jornada conosco,</p>
                        <p className="subtitle">Seja bem vindo!</p>
                        </div>
                        

                    </div>

                   
                </div>
            </div>
        </>
    )
}

export default Login;