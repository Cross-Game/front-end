import React, { useState } from "react";
import { BsController, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsArrowRightShort, BsDiscord, BsFillEyeFill, BsFillEyeSlashFill, BsGoogle, BsPersonCircle } from "react-icons/bs";
import "./Cadastro.css";



function Cadastro() {

    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [estadoSenha, setEstadoSenha] = useState(false)
    const [email, setEmail] = useState('');
    const [bordaEmail, setBordaEmail] = useState({})
    const [ativarProximo, setAtivarProximo] = useState({})
    const [ativarAnterio, setAtivarAnterior] = useState({ display: 'none' })

    function validarEmail() {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regexEmail.test(email)) {
            setBordaEmail({ border: '1px solid #00ff03' })
        } else {
            setBordaEmail({ border: '1px solid red' })
        }
        return regexEmail.test(email);
    }

    function handleMostrarSenha() {
        setMostrarSenha(!mostrarSenha);
    }

    function validarSenha() {
        const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[{\]};:<>|./?,-])[A-Za-z\d!@#$%^&*()_+=[{\]};:<>|./?,-]{8,}$/;
        return regexSenha.test(senha);
    }

    function handleSubmit() {
        validarEmail();
        validarSenha() ? setEstadoSenha(true) : setEstadoSenha(false);
        if (validarEmail() && validarSenha()) {
            setAtivarProximo({ display: 'none' });
            setAtivarAnterior({ display: '' });
        }
    }

    function cadastrar() {

    }

    function voltar() {
        setAtivarProximo({ display: '' });
        setAtivarAnterior({ display: 'none' });
    }

    return (
        <>
            <div className="container">
                <div className="botaoVoltar" >
                    <p className="voltar">Voltar</p>
                </div>
                <form className="cardCadastro" style={ativarProximo}>
                    <div className="img">

                    </div>
                    <div className="cardFormCadastro">
                        <div className="tituloCadastro">Cadastrar</div>
                        <div className="inputCadastro">

                            <label htmlFor="">Email</label>
                            <input
                                style={bordaEmail}
                                type="text"
                                placeholder="email@email.com"
                                value={email}
                                onChange={event => setEmail(event.target.value)} />
                            <label htmlFor="">Usuário</label>
                            <input type="text" placeholder="HOmonster" />

                            <label htmlFor="">Senha</label>
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                placeholder="********" />
                            <span className="show-password">
                                <span className="iconPassword" onClick={handleMostrarSenha}>{mostrarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                            </span>
                            <span className="estiloEstadoSenha">{estadoSenha ? "Senha Forte  🟢" : "Senha Fraca  🔴"}</span>
                        </div>
                        <div className="botaoCadastro" onClick={handleSubmit}>
                            <div>Próximo</div>
                            <BsArrowRightShort className="arrowProximo" />
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord" /></div>
                            <div><BsGoogle className="loginGoogle" /></div>
                        </div>
                    </div>
                </form>
                <form className="cardCadastroTwo" style={ativarAnterio}>
                    <BsPersonCircle className="iconAvatar" />
                    <div>Selecione Seu Avatar</div>
                    <div className="iconsEscolha">
                        <BsFillArrowLeftCircleFill className="iconArrow" />
                        <BsPersonCircle className="iconEscolhaAvatar" />
                        <BsPersonCircle className="iconEscolhaAvatar" />
                        <BsPersonCircle className="iconEscolhaAvatar" />
                        <BsPersonCircle className="iconEscolhaAvatar" />
                        <BsPersonCircle className="iconEscolhaAvatar" />
                        <BsFillArrowRightCircleFill className="iconArrow" />
                    </div>
                    <div>Selecione um jogo você irá jogar</div>
                    <div className="containerJogos">
                        <div className="contornoJogo">
                            <span><BsController /></span>
                        </div>
                        <div className="contornoJogo">
                            <span><BsController /></span>
                        </div>
                        <div className="contornoJogo">
                            <span><BsController /></span>
                        </div>
                    </div>
                    <div>Digite o seu Username do jogo</div>
                    <div>input de Username</div>
                    <div>Botoes de cadastrar e coltar
                        <div onClick={cadastrar}>Cadastrar <BsArrowRightShort className="arrowProximo" /></div>
                        <div onClick={voltar}><BsArrowRightShort className="arrowProximo" /> Voltar</div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Cadastro;