import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { BsDiscord, BsGoogle, BsArrowRightShort,  BsArrowLeftShort, BsFillEyeSlashFill, BsFillEyeFill} from "react-icons/bs";
import axios from "axios";
import Toast from "../../components/Toast";

function Login() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [usuario, setUsuario] = useState('');
    const [token, setToken] = useState(null);

    function handleMostrarSenha() {
        setMostrarSenha(!mostrarSenha);
    }

    const handleUsuarioChange = (event) => {
        const newUser = event.target.value;
        setUsuario(newUser);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };
    
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');
    
    function mudarToast(tipo,mensagem){
        setShowToast(true)
        setToastType(tipo.toLowerCase())
        setToastMessage(mensagem)
    }
    

    const realizarLogin = async () => {
        mudarToast('carregando', 'Requisição solicitada');
        console.log(usuario, password);
        axios.post("http://localhost:8080/user-auth", { username: usuario, password }, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            sessionStorage.setItem('ACESS_TOKEN', response.data.encodedToken);
            setToken(response.data.encodedToken)
            console.log("Sucesso ao realizar login: ", response.data.encodedToken);
            mudarToast('sucesso', 'Login realizado!');

            setTimeout(() => {
                navigate('/perfil');
              }, 2000);

          } else {
            console.error('Erro ao realizar login: status', response.status);
            mudarToast('erro', 'Erro ao realizar login');
          }
        })
        .catch((error) => {
          console.error('Erro ao realizar login:', error);
          mudarToast('erro', 'Erro ao realizar login');
        });
    }

    return (
        <>
            <div className="container">
                <div className="botaoVoltar" >
                    <p><BsArrowLeftShort className="arrowVoltarInicio" />Voltar</p>
                </div>
                <div className="cardCadastro">
                
                    
                <div className="cardFormLogin">
                        <div className="titulo">Entrar</div>
                        
                        <div className="inputsForm">

                        <label htmlFor="">Usuário</label>

                        <input 
                        type="text" 
                        placeholder="HOmonster" 
                        onChange={handleUsuarioChange}
                        id="usuario"
                        name="usuario"
                        value={usuario}
                        />

                        <label htmlFor="">Senha</label>

                        <input 
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="********" 
                            value={password}
                            id="password"
                            name="password"
                            onChange={handlePasswordChange}
                        />
                        <span className="show-password">
                                <span className="iconPassword" onClick={handleMostrarSenha}>{mostrarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}</span>
                            </span>



                        <div className="subInputs">
                            <a>Esqueceu a senha?</a> 
                            <a>Não possui conta?</a>
                        
                        </div>

                        </div>
                        <div className="botaoCadastro">
                            <div onClick={realizarLogin}>Entrar</div>
                            <BsArrowRightShort className="arrowProximo"/>
                        </div>
                        <div className="subTitulo">ou com as seguintes plataformas</div>
                        <div className="loginRapido">
                            <div><BsDiscord className="loginDiscord"/></div>
                            <div><BsGoogle className="loginGoogle"/></div>
                        </div>
                    </div>

                    <div className="imgLogin"></div>
                    <div className="tituloImg">
                        <p>Constinue sua jornada conosco</p>
                        <h1>Seja Bem Vindo !</h1>
                    </div>
                   
                </div>

        {showToast && (
            <Toast
                type={toastType}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        )}

            </div>
        </>

        
    )
}

export default Login;