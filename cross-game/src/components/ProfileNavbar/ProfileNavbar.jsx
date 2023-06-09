import React, { useState, useEffect, useRef } from "react";
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
import { USERID } from "../../data/constants";
import axios from "axios";

function ProfileJogo(props) {
  const navigate = useNavigate();
  const [showModalNotification, setShowModalNotification] = useState(false);
  const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
  const [imageData, setImageData] = useState(sessionStorage.getItem("IMAGEM"));
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    
    handleUpdateImage()
    
  }, [1000]);

  const handleUpdateImage = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("ACESS_TOKEN")
      },
      responseType: 'arraybuffer'
    };
    axios.get(`http://localhost:8080/users/${USERID}/picture`,
      config
    ).then((response) => {
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
        sessionStorage.setItem("IMAGEM", `data:image/jpeg;base64,${base64Image}`)
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
    window.location.reload()
  };

  return (
    <>
      <div className="profileJogoContainer">
        {props.sidebar}
        <div className="profileJogoCore">
          <div className="profileJogoTop">
            <div className="profileJogoDataUser">
              <img className="ImgPerfilUsuario" src={imageData} width={'100px'} alt="Imagem de Perfil" />
              <div className="profileJogoEditProfileUser">
                <div id="nameUsername">{sessionStorage.getItem("NICKNAME")}</div>
                <div className="profileJogoIconEditProfile" onClick={() => setShowModalEditarPerfil(true)}><RiFileEditFill className="iconTiEdit" />Editar Perfil</div>
              </div>
            </div>
            <div className="profileJogoDetailsUser">
              <img className="profileJogoMedalUser" src={medalUserProfile} alt="" />
              <div className="profileJogoXpUser">
                <div className="profileJogoNivelUser">Nivel: <span>Diamante</span></div>
                <div className="profileJogoBarsNiveis">
                  <div className="profileJogoBarNivelUm"></div>
                  <div className="profileJogoBarNivelDois"></div>
                  <div className="profileJogoBarNivelTres"></div>
                  <div className="profileJogoBarNivelQuatro"></div>
                </div>
              </div>
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
          ativarBotao={true}
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
                Adicionar Foto
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileJogo;
