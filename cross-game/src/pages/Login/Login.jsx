import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import { BsDiscord, BsGoogle, BsArrowRightShort, BsArrowLeftShort, BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import axios from "axios";
import Toast from "../../components/Toast";
import { LoginSocialGoogle } from "reactjs-social-login";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState(null);
  const [passwordNew, setPasswordNew] = useState("");
  const [email, setEmail] = useState();

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

  function mudarToast(tipo, mensagem) {
    setShowToast(true);
    setToastType(tipo.toLowerCase());
    setToastMessage(mensagem);
  }

  const realizarLogin = async () => {
    mudarToast('carregando', 'Requisição solicitada');
    console.log(usuario, password);
    axios
      .post("http://localhost:8080/user-auth", { username: usuario, password }, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          sessionStorage.setItem('ACESS_TOKEN', response.data.encodedToken);
          setToken(response.data.encodedToken);
          decodificarToken();
          console.log("Sucesso ao realizar login: ", response.data.encodedToken);
          mudarToast('sucesso', 'Login realizado!');

          setTimeout(() => {
            navigate('/profile');
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
  };


  const redirectUri = 'http://localhost:3000/cadastro';

  const handleLogin = () => {
    const scope = 'identify email';
    const responseType = 'code';
    const clientId = '1102730864972009612';
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=76832&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  const resetPassword = async (usuario, email, password) => {
    console.log("Método para Reset de Senha");
    axios
      .patch(
        "http://localhost:8080/users/update-password-by-username-email",
        {
          username: usuario,
          email: email,
          password: password,
        },
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          realizarLogin();
          console.log("Chamei realizar login")
        } else {
          console.error("Erro ao resetar senha: status", response.status);
          mudarToast("erro", "Erro ao resetar senha");
        }
      })
      .catch((error) => {
        console.error("Erro ao resetar senha:", error);
      });
  };

  // Função para decodificar a parte dos dados (payload) do token
  const decodificarToken = () => {
    const token = sessionStorage.getItem("ACESS_TOKEN");
    try {
      const partesToken = token.split('.');
      const payloadBase64 = partesToken[1];
      const payloadDecodificado = JSON.parse(atob(payloadBase64));
      sessionStorage.setItem(("ID"), payloadDecodificado.id);
      sessionStorage.setItem(("ROLE"), payloadDecodificado.role);
      sessionStorage.setItem(("NICKNAME"), payloadDecodificado.sub);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  };

  const handleGoogleLoginResolve = ({ provider, data }) => {
    console.log(data);
    setEmail(data.email);
    setUsuario(data.name);
    setPassword(data.access_token);
    setPasswordNew(data.access_token);
    sessionStorage.setItem("ACESS_TOKEN_GOOGLE", data.access_token);
    sessionStorage.setItem("ACESS_TOKEN", data.access_token);
    sessionStorage.setItem("NICKNAME", data.name);
    sessionStorage.setItem("EMAIL", data.email);
    resetPassword(data.name, data.email, data.access_token);
  };

  const handleGoogleLoginReject = (err) => {
    console.log(err);
  };

  return (
    <>
      <div className="container">
        <div className="botaoVoltar" onClick={() => navigate("/")}>
          <p>
            Voltar
          </p>
        </div>
        <div className="cardCadastro">
          <div className="cardFormLogin">
            <div className="tituloLogin">Entrar</div>

            <div className="inputsForm">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                placeholder="usuario"
                id="usuario"
                name="usuario"
                value={usuario}
                onChange={handleUsuarioChange}
              />

              <label htmlFor="password">Senha</label>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                value={password}
                id="password"
                name="password"
                onChange={handlePasswordChange}
              />
              <span className="show-password">
                <span className="iconPassword" onClick={handleMostrarSenha}>
                  {mostrarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </span>
              </span>

              <div className="subInputs">
                <a>Esqueceu a senha?</a>
                <a onClick={() => navigate('/cadastro')}>Não possui conta?</a>
              </div>
            </div>

            <div className="botaoCadastro" onClick={realizarLogin}>
              <div>Entrar</div>
              <BsArrowRightShort className="arrowProximo" />
            </div>
            <div className="subTitulo">ou com as seguintes plataformas</div>

            <div className="loginRapido">
              <div>
                <BsDiscord className="loginDiscord" onClick={handleLogin} />
              </div>
              <div>
                <LoginSocialGoogle
                  client_id="885530994482-00qe1f2qo6m0htsqeprvua1tthf2kqdt.apps.googleusercontent.com"
                  scope="openid profile email"
                  discoveryDocs="claims_supported"
                  acess_type="offline"
                  onResolve={handleGoogleLoginResolve}
                  onReject={handleGoogleLoginReject}
                >
                  <BsGoogle className="loginGoogle" />
                </LoginSocialGoogle>
              </div>
            </div>
          </div>

          <div className="imgLogin"></div>
          <div className="tituloImgLogin">
            <p>Continue sua jornada conosco</p>
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
  );
}

export default Login;