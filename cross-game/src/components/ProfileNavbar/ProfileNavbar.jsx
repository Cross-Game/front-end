import React, { useEffect, useState } from "react";
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
  const [image, setImage] = useState(null);
  const [nivel, setNivel] = useState("Prata");

  const changeAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", image);

      await axios.patch(
        `${currentURL}/user/${USERID}/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully");
      // Faça qualquer outra ação necessária após o upload da imagem
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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

        const response = await axios.get(`http://localhost:8080/friends/${sessionStorage.getItem("ID")}`, config)
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
    else if (qtdAmigos <= 12){
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
    else if (qtdAmigos <= 22){
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
              <img src={imgUserProfile} alt="" />
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
          ativarBotao={true}
          textButton="Editar"
          iconButton={<BsCheck />}
          onClose={() => setShowModalEditarPerfil(false)}
        >
          <div className="modalEditarPerfil-container">
            <UserProfile
              nome={"Nome"}
              img={<BsArrowRightShort />}
              onClick={changeAvatar}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={changeAvatar}>Upload</button>
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
