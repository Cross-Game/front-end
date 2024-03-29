import React, { useState, useEffect } from "react";
import "./Cadastro.css";
import { BsDiscord, BsArrowRightShort, BsFillEyeFill, BsFillEyeSlashFill, BsGoogle, BsPersonCircle } from "react-icons/bs";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useNavigate } from "react-router-dom"
import axios from "axios";


import { currentURL, URLSITE } from "../../data/constants"



function Cadastro() {


    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [ativarProximo, setAtivarProximo] = useState({})
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
    const REDIRECT_URI = `${URLSITE}/cadastro`;
    const SCOPE = "identify email";
    const RESPONSE_TYPE = "code";
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [posDados, setPosDados] = useState(false);
    const [chamadaDiscord, setChamadaDiscord] = useState(false);

    useEffect(() => {
        setTimeout(() => {

            if (chamadaDiscord === false) {
                if (!(queryParams.get("code") == null)) {

                    handleCallback()
                    setChamadaDiscord(true)
                }

            }
        }, 1);
    }, [chamadaDiscord, queryParams]);


    const handleLogin = () => {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}`;
        window.location.href = url;

    };

    const handleCallback = async () => {

        const data = {
            code: queryParams.get("code"),
            redirect_uri: `${URLSITE}/cadastro`,
            grant_type: "authorization_code",
            client_id: CLIENT_ID,
            client_secret: "BTis6TVBX8_wSr7e6T-5QM3o10FvS8qa"
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
            cadastrar(userResponse.data.username, userResponse.data.email, response.data.access_token)
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
            //setShowModalSenha(true);
            setvalidadoSenha(false);
            setValidationMessageSenha('A senha deve conter pelo menos 12 caracteres sendo: 1 numero, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.');
            mudarToast('erro', "A senha deve conter pelo menos 12 caracteres sendo: 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.");
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
            //setShowModalEmail(true);
            mudarToast('erro', 'O email deve conter @ e "."')
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

 

    function cadastrar(usernameClient, emailClient, passwordClient) {
        fetch(`${currentURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameClient,
                email: emailClient,
                password: passwordClient,
                role: "USER"
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Resposta de rede não foi bem-sucedida.');
        })
        .then(userData => {
            return fetch(`${currentURL}/user-auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username, // Use o nome de usuário retornado da chamada anterior
                    password: passwordClient // Use a senha recebida ou qualquer parâmetro necessário
                }),
            });
        })
        .then(authResponse => {
            if (authResponse.ok) {
                return authResponse.json();
            }
            throw new Error('Resposta de rede não foi bem-sucedida.');
        })
        .then(authData => {
            console.log(currentURL);
            mudarToast('sucesso', 'Cadastro realizado!');
            window.location.href = `${URLSITE}/login`;
        })
        .catch(error => {
            console.error(error);
            console.log(currentURL);
            mudarToast('erro', 'Erro ao cadastrar.');
        });
    }
    



    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');



    return (
        <>
            <div className="container">
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
                            <input type="text" placeholder="usuario" value={username} onChange={handleUser} />

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
                        <div className="botaoCadastro" onClick={() => cadastrar(username, email, password)}>
                            <div>Cadastrar</div>
                            <BsArrowRightShort className="arrowProximo" />
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord" onClick={handleLogin} /></div>
                            <div>
                                <LoginSocialGoogle
                                    client_id={'159829132486-8p9g8nfvnkn0gbg53b5tkkncndolr53v.apps.googleusercontent.com'}
                                    scope="openid profile email"
                                    discoveryDocs="claims_supported"
                                    acess_type="online"
                                    onResolve={({ providor, data }) => {
                                        cadastrar(data.name, data.email, data.access_token)
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
            </div>
        </>
    )
}

export default Cadastro;