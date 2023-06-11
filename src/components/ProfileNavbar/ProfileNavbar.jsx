import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./ProfileNavbar.css";
import imgUserProfile from "../../assets/index-page/testeImg.png";
import medalUserProfile from "../../assets/index-page/medalOuro.svg";
import { useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../Notification";
import UserProfile from "../UserProfile";
import Modal from "../Modal";
import { RiFileEditFill } from "react-icons/ri";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { USERID, currentURL } from "../../data/constants";
import axios from "axios";
import Toast from "../Toast";
import medalPrata from '../../assets/index-page/medalPrata.svg'
import medalOuro from '../../assets/index-page/medalOuro.svg'
import medalDiamante from '../../assets/index-page/medalDiamante.svg'
import medalMestre from '../../assets/index-page/medalMestre.svg'


function ProfileJogo(props) {
  const navigate = useNavigate();
  const [showModalNotification, setShowModalNotification] = useState(false);
  const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
  const [imageData, setImageData] = useState();
  const [temImg, setTemImg] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [nivel, setNivel] = useState("Prata");

  useLayoutEffect(() => {

    handleUpdateImage()

  }, []);

  const handleUpdateImage = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
      },
      responseType: 'arraybuffer'
    };
    axios.get(`${currentURL}/users/${USERID}/picture`,
      config
    ).then((response) => {
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      
      sessionStorage.setItem("IMAGEM", `${base64Image}`)
      if(sessionStorage.getItem("IMAGEM") !== '') {
        sessionStorage.setItem("IMAGEM", `data:image/jpeg;base64,${base64Image}`)
        setImageData(sessionStorage.getItem("IMAGEM"))
        setTemImg(true)
      }
      
    }).catch((error) => {
      console.error('Erro ao obter a imagem do perfil:', error);
    });

  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    try {

      const response = await axios.patch(`http://localhost:8080/users/${USERID}/picture`, file, {
        headers: {
          'Content-Type': 'image/jpeg',
          Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
        },
      });

      console.log('Imagem enviada com sucesso:' + response.data);
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }

    setImageData(sessionStorage.getItem("IMAGEM"))
    handleUpdateImage()
  };

  const [qtdAmigos, setQtdAmigos] = useState(null);

  useEffect(() => {
    const obterQuantidadeAmigos = async () => {

      try {
        const config = {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
          }
        };

        const response = await axios.get(`${currentURL}/friends/${USERID}`, config)
          .then(response => {
            if (response.status === 200) {
              var contador = 0;
              response.data.forEach(amigo => {
                if (amigo.friendshipState === 'CONFIRMED') { contador++ }
              })
              setQtdAmigos(contador)
            }
            else {
              mudarToast("erro", "Erro ao obter nível");
              setQtdAmigos(0)
            }
          })
      }
      catch (error) {
        mudarToast("erro", "Erro ao obter nível");
      }
    };

    obterQuantidadeAmigos();
  }, []);

  const obterMedalhaNivel = () => {
    if (qtdAmigos <= 5) {
      return (
        <>
          <img className="profileJogoMedalUser" src={medalPrata} alt="" ></img>
          <div className="profileJogoXpUser">
            <div className="profileJogoNivelUser">Nivel: <span>Prata</span></div>
            <div className="profileJogoBarsNiveis">
              <div className="profileJogoBarAtivo"></div>
              <div className="profileJogoBarDesativado"></div>        <div className="profileJogoBarDesativado"></div>        <div className="profileJogoBarDesativado"></div>
            </div>
          </div>
        </>
      );
    }
    else if (qtdAmigos <= 12) {
      return (
        <>
          <img className="profileJogoMedalUser" src={medalOuro} alt="" ></img>
          <div className="profileJogoXpUser">
            <div className="profileJogoNivelUser">Nivel: <span>Ouro</span></div>
            <div className="profileJogoBarsNiveis">
              <div className="profileJogoBarAtivo"></div>      <div className="profileJogoBarAtivo"></div>
              <div className="profileJogoBarDesativado"></div>        <div className="profileJogoBarDesativado"></div>
            </div>
          </div>
        </>
      );
    }
    else if (qtdAmigos <= 22) {
      return (
        <>
          <img className="profileJogoMedalUser" src={medalDiamante} alt="" ></img>
          <div className="profileJogoXpUser">
            <div className="profileJogoNivelUser">Nivel: <span>Diamante</span></div>
            <div className="profileJogoBarAtivo"></div>       <div className="profileJogoBarAtivo"></div>       <div className="profileJogoBarAtivo"></div>
            <div className="profileJogoBarsNiveis">
              <div className="profileJogoBarDesativado"></div>
            </div>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <img className="profileJogoMedalUser" src={medalMestre} alt="" ></img>
          <div className="profileJogoXpUser">
            <div className="profileJogoNivelUser">Nivel: <span>Mestre</span></div>
            <div className="profileJogoBarsNiveis">
              <div className="profileJogoBarAtivo"></div>       <div className="profileJogoBarAtivo"></div>       <div className="profileJogoBarAtivo"></div>       <div className="profileJogoBarAtivo"></div>
            </div>
          </div>
        </>
      )
    }
  }

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('erro');

  function mudarToast(tipo, mensagem) {
    setShowToast(true);
    setToastType(tipo.toLowerCase());
    setToastMessage(mensagem);
  }

  return (
    <>
      <div className="profileJogoContainer">
        {props.sidebar}
        <div className="profileJogoCore">
          <div className="profileJogoTop">
            <div className="profileJogoDataUser">
              <img className="ImgPerfilUsuario" src={temImg ? imageData : imgUserProfile} width={'100px'}  alt="Imagem de Perfil" />
              <div className="profileJogoEditProfileUser">
                <div id="nameUsername">{sessionStorage.getItem("NICKNAME")}</div>
                <div className="profileJogoIconEditProfile" onClick={() => setShowModalEditarPerfil(true)}><RiFileEditFill className="iconTiEdit" />Editar Perfil</div>
              </div>
            </div>
            <div className="profileJogoDetailsUser">
              {obterMedalhaNivel()}
              <MdNotificationsActive className="profileJogoIconNotificacao" onClick={() => setShowModalNotification(true)} />
            </div>
          </div>
          <div className="profileJogoCenter" >

            <div style={props.profiles} className="profileJogoButtonNvigation"
              onClick={() => navigate("/profile")}
            >Profiles</div>
            <div style={props.interesses} className="profileJogoButtonNvigation"
              onClick={() => navigate("/profile/interesse")}
            > Interesses</div>
            <div style={props.feedbacks} className="profileJogoButtonNvigation"
              onClick={() => navigate("/profile/feedback")}
            >Feedbacks</div>
            <div style={props.plataformas} className="profileJogoButtonNvigation"
              onClick={() => navigate("/profile/plataforma")}
            >Plataformas</div>


          </div>
          <div>
            {props.adicionar}
          </div>
        </div>
      </div>

      {showModalNotification && (
        <Notification onClose={() => setShowModalNotification(false)} />
      )}

      {showModalEditarPerfil && (
        <Modal
          title="Editar Perfil"
          icon={<RiFileEditFill />}
          temFooter={true}
          onClick={handleUpdateImage()}
          ativarBotao={false}
          textButton="Atualizar"
          iconButton={<BsCheck />}
          onClose={() => setShowModalEditarPerfil(false)}
        >
          <div className="modalEditarPerfil-container">
            <UserProfile
              nome={sessionStorage.getItem("NICKNAME")}
              img={imageData}
            />
            <div className="modalEditarPerfilInput">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <button className="modalEditarPerfilButton" onClick={() => { fileInputRef.current.click() }}>
                Alterar Foto
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </>

  );
}

export default ProfileJogo;
