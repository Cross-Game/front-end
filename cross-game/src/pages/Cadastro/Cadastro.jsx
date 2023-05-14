import React, { useState } from "react";
import "./Cadastro.css";
import { BsArrowLeftShort, BsArrowRightShort, BsDiscord, BsFillEyeFill, BsFillEyeSlashFill, BsGoogle, BsPersonCircle } from "react-icons/bs";
import { GiCrossShield, GiCrenulatedShield, GiCrossedAxes, GiCrownedSkull, GiEyeShield } from "react-icons/gi";
import { SiValorant } from "react-icons/si";
import { LoginSocialGoogle } from "reactjs-social-login"
import axios from "axios";



function Cadastro() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [ativarProximo, setAtivarProximo] = useState({})
    const [ativarAnterio, setAtivarAnterior] = useState({ display: 'none' })
    const [bordaJogo, setBordaJogo] = useState({ border: '1px solid #fff' })
    const [valorant, setValorant] = useState(false);
    const [tft, setTft] = useState(false);
    const [lol, setLol] = useState(false);
    const [showModaSenha, setShowModalSenha] = useState(false);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [validationMessageSenha, setValidationMessageSenha] = useState('');
    const [validationMessageEmail, setValidationMessageEmail] = useState('');
    const [validadoSenha, setvalidadoSenha] = useState(false);
    const [validadoEmail, setValidadoEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    let username;
    let emailUsuario;

    const [selectedIcon, setSelectedIcon] = useState(<BsPersonCircle className="iconAvatar" />);
    const [token, setToken] = useState(null);
    const clientId = '1102730864972009612';
    const redirectUri = 'http://localhost:3000/cadastro';
    
    const handleLogin = () => {
        const scope = 'identify email';
        const responseType = 'code';
        const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=76832&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
        const response = axios.get(authUrl);
        window.location.href = authUrl;
        setToken(response.data)
        sessionStorage.setItem("Token", response.data);
        console.log(response.data)
    };

    const handleSelectIcon = (icon) => {
        setSelectedIcon(icon);
    }

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password) => {
        // Lógica para validar a senha
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            setShowModalSenha(true);
            setvalidadoSenha(false)
            setValidationMessageSenha('A senha deve ter pelo menos 8 caracteres, 1 numero, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.');
        } else {
            setShowModalSenha(false);
            setValidationMessageSenha('');
            setvalidadoSenha(true)
        }
    };

    const validateEmail = (email) => {
        // Lógica para validar o email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setShowModalEmail(true);
            setValidadoEmail(false)
            setValidationMessageEmail('O email esta sem o @ ou "."');
        } else {
            setShowModalEmail(false);
            setValidadoEmail(true)
            setValidationMessageEmail('');
        }
    };


    function handleMostrarSenha() {
        setMostrarSenha(!mostrarSenha);
    }

    function handleSubmit() {
        if (validadoEmail && validadoSenha) {
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

    const selecionarJogo = (indice) => {
        setBordaJogo({ border: '0.1px solid #fff' })
        if (indice === 1) {
            setValorant(true);
            setLol(false)
            setTft(false)
        } else if (indice === 2) {
            setValorant(false);
            setLol(true)
            setTft(false)
        } else {
            setValorant(false);
            setLol(false)
            setTft(true)
        }
    }



    return (
        <>
            <div className="container">
                <div className="botaoVoltar" >
                    <p><BsArrowLeftShort className="arrowVoltarInicio" />Voltar</p>
                </div>
                <form className="cardCadastro" style={ativarProximo}>
                    <div className="img">
                    </div>
                    <div className="tituloImg">
                        <p>Constinue sua jornada conosco</p>
                        <h1>Seja Bem Vindo !</h1>
                    </div>
                    <div className="cardFormCadastro">
                        <div className="tituloCadastro">Cadastrar</div>
                        <div className="inputCadastro">

                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                placeholder="email@email.com"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange} />
                            {showModalEmail && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <p>{validationMessageEmail}</p>
                                    </div>
                                </div>
                            )}
                            <label htmlFor="">Usuário</label>
                            <input type="text" placeholder="HOmonster" />

                            <label htmlFor="">Senha</label>
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="⁕⁕⁕⁕⁕⁕⁕⁕" />
                            <span className="show-password">
                                <span className="iconPassword" onClick={handleMostrarSenha}>{mostrarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                            </span>
                            {showModaSenha && (
                                <div className="modal">
                                    <div className="modal-content">
                                        {/* <p>{validhandleLoginationMessageSenha}</p> */}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="botaoCadastro" onClick={handleSubmit}>
                            <div>Próximo</div>
                            <BsArrowRightShort className="arrowProximo" />
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord" onClick={handleLogin} /></div>
                            <div>
                                <LoginSocialGoogle
                                    client_id={'885530994482-00qe1f2qo6m0htsqeprvua1tthf2kqdt.apps.googleusercontent.com'}
                                    scope="openid profile email"
                                    discoveryDocs="claims_supported"
                                    acess_type="offline"
                                    onResolve={({ providor, data }) => {
                                        console.log(data.name)
                                        emailUsuario = data.email;
                                        username = data.name;
                                    }}
                                    onReject={(err) => {
                                        console.log(err)
                                    }}
                                >
                                    <BsGoogle className="loginGoogle" />
                                </LoginSocialGoogle>
                            </div>
                        </div>
                    </div>
                </form>
                <form className="cardCadastroTwo" style={ativarAnterio}>
                    {selectedIcon}
                    <div>Selecione o icone do seu perfil</div>
                    <div className="iconsEscolha">
                        <GiCrossShield className="iconEscolhaAvatar"
                            onClick={() => handleSelectIcon(<GiCrossShield className="iconAvatar" />)} />

                        <GiCrenulatedShield className="iconEscolhaAvatar"
                            onClick={() => handleSelectIcon(<GiCrenulatedShield className="iconAvatar" />)} />

                        <GiEyeShield className="iconEscolhaAvatar"
                            onClick={() => handleSelectIcon(<GiEyeShield className="iconAvatar" />)} />

                        <GiCrossedAxes className="iconEscolhaAvatar"
                            onClick={() => handleSelectIcon(<GiCrossedAxes className="iconAvatar" />)} />

                        <GiCrownedSkull className="iconEscolhaAvatar"
                            onClick={() => handleSelectIcon(<GiCrownedSkull className="iconAvatar" />)} />

                    </div>
                    <div>Selecione um jogo você irá jogar:</div>
                    <div className="containerJogos">
                        <div className="contornoJogo" style={valorant ? bordaJogo : { border: '1px solid #000' }} onClick={() => selecionarJogo(1)}>
                            <SiValorant className="valorant" />
                        </div>
                        <div className="contornoJogo" style={lol ? bordaJogo : { border: '1px solid #000' }} onClick={() => selecionarJogo(2)}>
                            <span className="leagueOfLegends"></span>
                        </div>
                        <div className="contornoJogo" style={tft ? bordaJogo : { border: '1px solid #000' }} onClick={() => selecionarJogo(3)}>
                            <span className="teamfightTactics"></span>
                        </div>
                    </div>
                    <div className="inputUsername">
                        <label htmlFor="username" className="labelUsername">
                            Digite o seu Username do jogo:
                        </label>
                        <input type="text" id="username" className="inputUsernameEstilo" placeholder="HOmonster" />
                    </div>
                    <div className="botoes">
                        <div onClick={voltar} className="botaoVoltarCadastro" ><BsArrowLeftShort className="arrowFinalVoltar" />Voltar</div>
                        <div onClick={cadastrar} className="botaoCadastrar">Cadastrar<BsArrowRightShort className="arrowFinalCadastrar" /></div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Cadastro;