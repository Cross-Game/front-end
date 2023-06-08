import React, { useState, useEffect } from "react";
import "./ProfileNavbar.css";
import imgUserProfile from "../../assets/index-page/testeImg.png";
import medalUserProfile from "../../assets/index-page/medalOuro.svg";
import { useNavigate } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import Notification from "../Notification";
import UserProfile from "../UserProfile";
import ModalNotification from "../ModalNotification";
import { RiFileEditFill } from "react-icons/ri";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { USERID } from "../../data/constants";
import axios from "axios";

function ProfileJogo(props) {
  const navigate = useNavigate();
  const [showModalNotification, setShowModalNotification] = useState(false);
  const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
  const [imageData, setImageData] = useState('');

  useEffect(() => {

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
      console.log(base64Image)
      setImageData(base64Image);
    }).catch((error) => {
      console.error('Erro ao obter a imagem do perfil:', error);
    });
  },[]);


  const handleImageChange = (event) => {
    setImageData(event.target.files[0]);
  };

  return (
    <>
      <div className="profileJogoContainer">
        {props.sidebar}
        <div className="profileJogoCore">
          <div className="profileJogoTop">
            <div className="profileJogoDataUser">
              <img className="ImgPerfilUsuario" src={`data:image/jpeg;base64,${imageData}`} width={'100px'} alt="Imagem de Perfil" />
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
        <ModalNotification
          title="Editar Perfil"
          icon={<RiFileEditFill />}
          temFooter={true}
          ativarBotao={true}
          textButton="Editar"
          iconButton={<BsCheck />}
          onClose={() => setShowModalEditarPerfil(false)}
        >
          <div className="modalEditarPerfil-container">
            <UserProfile
              nome={"Nome"}
              img={<BsArrowRightShort />}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </ModalNotification>
      )}
    </>
  );
}

export default ProfileJogo;
