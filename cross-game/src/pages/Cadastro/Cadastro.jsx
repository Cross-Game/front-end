/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Cadastro.css";
import { BsDiscord, BsArrowLeftShort, BsArrowRightShort, BsFillEyeFill, BsFillEyeSlashFill, BsGoogle, BsPersonCircle } from "react-icons/bs";
import { GiCrossShield, GiCrenulatedShield, GiCrossedAxes, GiCrownedSkull, GiEyeShield } from "react-icons/gi";
import { SiValorant } from "react-icons/si";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Loading from '../../components/Loading/loading';




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
    const [username, setUsername] = useState()
    const [password, setPassword] = useState();
    const [selectedIcon, setSelectedIcon] = useState(<BsPersonCircle className="iconAvatar" />);
    const CLIENT_ID = "1102730864972009612";
    const REDIRECT_URI = "http://localhost:3000/cadastro";
    const SCOPE = "identify email";
    const RESPONSE_TYPE = "code";
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {

            if (!(queryParams.get("code") == null)) {
                setAtivarProximo({ display: 'none' });
                setAtivarAnterior({ display: '' });
                handleCallback()
            }
        }, 1);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    const handleLogin = () => {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;
        window.location.href = url;

    };

    const handleCallback = async () => {
        const data = {
            code: queryParams.get("code"),
            redirect_uri: "http://localhost:3000/cadastro",
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: "Xrn0whYArSqBySPDGZbVGJlZj0sAL903"
        };

        try {
            const headersPost = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const body = Object.keys(data)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
                .join("&");
            const response = await axios.post("https://discord.com/api/oauth2/token", body, { headersPost });
            const userResponse = await axios.get("https://discord.com/api/users/@me", {
                headers: {
                    authorization: `Bearer ${response.data.access_token}`,
                },
            });
            setEmail(userResponse.data.email);
            setUsername(userResponse.data.username);
            setPassword(response.data.access_token);
            console.log(userResponse.data.email);
            console.log(userResponse.data.username);
            console.log(response.data.access_token);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectIcon = (icon) => {
        setSelectedIcon(icon);
    }

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handleUser = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername)
    }

    
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (password) => {
        // Lógica para validar a senha
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

        if (!passwordRegex.test(password)) {
            setShowModalSenha(true);
            setvalidadoSenha(false);
            setValidationMessageSenha('A senha deve ter pelo menos 12 caracteres, 1 numero, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.');
        } else {
            setShowModalSenha(false);
            setValidationMessageSenha('');
            setvalidadoSenha(true);
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
        handleCallback()
        console.log(queryParams.get("code"))
    }

    function cadastrar() {

        const filme = {
            username: username,
            email: email,
            password: password,
            role: "USER"
        };
        fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filme),
        })
            .then(response => response.json())
            .then(data => 
                    fetch('http://localhost:8080/user-auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        }).then(data => 
                            console.log(data)
                            // sessionStorage.setItem("Acess_Token", data)
                            ),
                    })
                )
            .catch(error =>
                console.error(error));
        console.log(username)
    }

    function voltar() {
        setAtivarProximo({ display: '' });
        setAtivarAnterior({ display: 'none' });
        setEmail('');
        setUsername('');
        setPassword('');
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
            {isLoading ? (
                <Loading />
            ) : <div className="container">
                <div className="botaoVoltar" onClick={() => navigate("/")}>
                    <p>Voltar</p>
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
                                <div className="modalForm">
                                    <div className="modal-content-none">
                                        <p>{validationMessageEmail}</p>
                                    </div>
                                </div>
                            )}
                            <label htmlFor="">Usuário</label>
                            <input type="text" placeholder="HOmonster" value={username} onChange={handleUser} />

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
                                <div className="modalForm">
                                    <div className="modal-content-none">
                                        <p>{validationMessageSenha}</p>
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
                                    acess_type="online"
                                    onResolve={({ providor, data }) => {
                                        setEmail(data.email);
                                        setUsername(data.name);
                                        setPassword(data.access_token);
                                        setAtivarProximo({ display: 'none' });
                                        setAtivarAnterior({ display: '' });
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
                            onClick={() => handleSelectIcon(<GiCrossShield className='iconAvatar' />)} />

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
            }</>
    )
}

export default Cadastro;