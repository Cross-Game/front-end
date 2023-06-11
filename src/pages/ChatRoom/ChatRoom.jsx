import { addDoc, collection, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatRoom.css";
import { databaseApp } from "../../data/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { TOKEN, currentURL } from "../../data/constants";
import { USERID } from "../../data/constants";
import axios from "axios";

import enviarIcon from "./assets/enviarIcon.svg"
import imgTest from "../../assets/index-page/testeImg.png";
import iconBack from "./assets/arrow-right.svg"
import iconLockYes from "./assets/lockYes.svg"
import iconLockNo from "./assets/lockNo.svg"
import iconClose from "./assets/closeIcon.svg"
import iconChatNormal from "./assets/chatNormalIcon.svg"
import iconChatAddIconUser from "./assets/chatAddUserIcon.svg"
import Button from "../../components/Button";
import { BsArrowRightShort, BsFillChatLeftTextFill, BsFillStarFill, BsPersonFillAdd } from "react-icons/bs";
import UserProfile from "../../components/UserProfile";
import Modal from "../../components/Modal";
import { HiLink } from "react-icons/hi";
import { MdContentCopy, MdFeedback, MdOutlineFeedback } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { getJogadorImagem } from "../../utils/getJogadorImagem";
import Toast from "../../components/Toast";


export const ChatRoom = () => {

  const [gameName, setGameName] = useState(null);
  const [rankRoom, setRankRoom] = useState(null);
  const [levelRoom, setLevelRoom] = useState(null);
  const [roomName, setRoomName] = useState(null);

  const [meusAmigos, setMeusAmigos] = useState([]);
  const [usersRoom, setUsersRoom] = useState([]);

  const [userAdmin, setUserAdmin] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [showModalConvidar, setShowModalConvidar] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('erro');



  const obterImagemUsuario = async (jogadorId) => {
    try {
      const response = await axios.get(`${currentURL}/users/${jogadorId}/picture`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        responseType: 'blob',
      });
      console.log(response)
      if (response.data.size > 0) {
        const blobData = response.data;
        const imageUrl = await convertBlobToBase64(blobData);
        return imageUrl;
      }
      else {
        console.log("entrei aqui")
        return imgTest;
      }
    } catch (error) {
      console.log(error);
      return imgTest;
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };


  useEffect(() => {
    const usersData = async () => {
      try {

        const response = await axios.get(`${currentURL}/team-rooms/${id}`);
        console.log(response)
        if (response.status === 200) {
          const usuarios = response.data.user.map(async (usuario) => {
            const imagem = await obterImagemUsuario(usuario.id);
            return {
              ...usuario,
              id: usuario.id,
              imgUser: imagem,
              username: usuario.username
            };
          });
          const usuariosTeste = await Promise.all(usuarios);
          setUsersRoom(usuariosTeste);
          setUserAdmin(response.data.idUserAdmin)

          setGameName(response.data.gameName)
          setRankRoom(response.data.rankGame)
          setLevelRoom(response.data.levelGame)
          setRoomName(response.data.name)
          console.log("Informações sala", response)
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        mudarToast('Erro', 'Erro ao buscar jogadores.');
      }
    };

    usersData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    if (!document.referrer || document.referrer === window.location.href) {
      navigate("/notFound");
    }
  }, []);

  useEffect(() => {
    const obterMeusAmigos = async () => {
      try {
        console.log("Chamei obterMeusAmigos");
        const response = await axios.get(
          `${currentURL}/friends/${USERID}`,
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`
            },
          }
        );
        if (response.status === 200) {
          console.log(response);
          var amigos = response.data.filter((amigo) => amigo.friendshipState === "CONFIRMED"); // TODO Mudar para CONFIRMED
          setMeusAmigos(amigos);
          console.log("Amigos de vdd: ")
          console.log(amigos)
        }
        else if (response.status === 204) {
          setMeusAmigos([]);
        }
        else {
          mudarToast("erro", "Erro ao obter amigos");
        }
      } catch (error) {
        console.error("Erro ao obterMeusAmigos:", error);
      }
    };

    obterMeusAmigos();
  }, []);

  if (!isVisible) {
    return null;
  }

  function copiarLinkSala() {
    const link = document.getElementById("salas-linkSala").innerText;
    navigator.clipboard.writeText(link);
  }



  function mudarToast(tipo, mensagem) {
    setShowToast(true);
    setToastType(tipo.toLowerCase());
    setToastMessage(mensagem);
  }


  async function enviarConviteSala(idConvidado) {
    try {
      console.log("Enviar convite sala");
      const response = await axios.post(
        `${currentURL}/notifies/${idConvidado}`,
        {
          type: "GROUP_INVITE",
          message: "Te convidou para uma sala de " + gameName, 
          description: "",
          state: "AWAITING"
        },
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        mudarToast("sucesso", "Convite enviado!");
      } else {
        mudarToast("erro", "Erro ao enviar convite.");
      }
    } catch (error) {
      console.error("Erro ao criar sala", error);
      mudarToast("erro", "Erro ao enviar convite.");
    }
  }



  return (
    <>
      <div className="chatRoomContainerMessages">
        <div className="divPainelControllerContainer">
          <div className="chatRoomHeader">
            <ExitFromRoom idGroup={id} idAdmin={userAdmin} />
            <div className="chatRoomHeaderNameId">
              <h2 className="chatRoomHeaderName">{roomName}</h2>
              <p className="chatRoomHeaderId">Id: {id}</p>
            </div>
          </div>
          <div className="divPainelAllInformationRoom">
            <div className="divInformationOfFilter">

              <div className="chatRoomFilterContainer gameFilter">
                {gameName}
              </div>

              <div className="chatRoomFilterContainer greenFilter">
                Ranking {rankRoom}
              </div>

              <div className="chatRoomFilterContainer greenFilter">
                Level {levelRoom}
              </div>
            </div>
            <div className="playersOnRoomChatRoom">

              {!(usersRoom.length === 0) ? usersRoom.map((users) => (
                <PortraitUsers imagem={users.imgUser} idUserRoom={users.id} nomeUser={users.username} idAdmin={userAdmin} idGroup={id} />
              ))
                :
                "Teste sem Participantes" // TODO adicionar div com estilo para sem participantes
              }

            </div>
            <div className="divPainelControllOfAdminGroup">
              <div className="divPainelControllOfAdminGroupContainer">
                {
                  USERID == userAdmin ?
                    <LockButton />
                    : null
                }
                <Button text="Convide seus amigos" icon={<BsArrowRightShort />} onClick={() => setShowModalConvidar(true)} />
              </div>
            </div>
          </div>
        </div>
        <section className="chatRoomContainerMessagesBox">
          {<ChatBox idGroup={id} />}
        </section>
      </div>

      {showModalConvidar && (
        <Modal title='Convide seus amigos' icon={<BsPersonFillAdd />} temFooter={false} onClose={() => setShowModalConvidar(false)}>
          <div className="salas-convidados">
            {meusAmigos.map((amigo) => (
              <UserProfile
                nome={amigo.username}
                hasUserId={amigo.friendUserId}
                key={amigo.id}
                onClick={() => enviarConviteSala(amigo.friendUserId)}
              />
            ))}
          </div>
          <div className="salas-groupLink" onClick={copiarLinkSala}>
            <HiLink />
            <span className="salas-link"><a id="salas-linkSala">Aqui fica o link da sala</a></span>
            <MdContentCopy />
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
};

export const PortraitUsers = (props) => {
  let id = USERID;

  const [showModalFeedback, setShowModalFeedback] = useState(false);

  const [jogadorSelecionado, setJogadorSelecionado] = useState({ id: 2, nome: 'João Silva', foto: 'https://example.com/joao_silva.jpg', idade: 27, posicao: 'Atacante', pais: 'Brasil' },);
  const [ratingHabilidade, setRatingHabilidade] = useState(0);
  const [ratingComportamento, setRatingComportamento] = useState(0);
  const [comentarioFeedback, setComentarioFeedback] = useState('');

  const [resetAvaliacao, setResetAvaliacao] = useState(false);

  function limparModalFeedback() {
    setRatingHabilidade(0);
    setRatingComportamento(0);
    setComentarioFeedback('');
    console.log("Limpando Modal Feedback")
    setResetAvaliacao(!resetAvaliacao);
  }

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('erro');

  function mudarToast(tipo, mensagem) {
    setShowToast(true);
    setToastType(tipo.toLowerCase());
    setToastMessage(mensagem);
  }

  function enviarFeedback() {
    console.log("Chamei enviar feedback")
    console.log(jogadorSelecionado)
    axios.post(`${currentURL}/feedbacks/${jogadorSelecionado.id}`,
      {
        userGivenFeedback: sessionStorage.getItem("NICKNAME"),
        behavior: ratingComportamento,
        skill: ratingHabilidade,
        feedbackText: comentarioFeedback
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      .then(response => {
        console.log(response.data);
        mudarToast("Sucesso", "Avaliação enviada")
        setTimeout(function () {
          setShowModalFeedback(false);
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        mudarToast("erro", "Erro ao enviar avaliação")
      });
  }

  function retirandoUsuarioDaSala() {

    axios.delete(`${currentURL}/team-rooms/remove-users/${props.idUserRoom}/${props.idAdmin}/${props.idGroup}`
    ).then((response) => {
      if (response.status === 200) {
        //  TODO ver como retirar o usuário da sala assim que expulsar
        mudarToast('Sucesso', 'usuário retirado com sucesso')
      }
      console.log("usuário retirado com sucesso", response.data)
    }).catch((error) => {
      mudarToast('erro', 'erro ao retirar usuário da sala')
      console.error('erro ao retirar usuário da sala', error);
    });
  }

  function selecionarUsuarioFeedback(nome, id, img){
    setShowModalFeedback(true); 
    setJogadorSelecionado({nome: nome, id: id, img: img});
  }


  return (
    <>
      <div className="portraitUserContainer">
        <div className="divPortraitUserImg">
          <img src={props.imagem} alt="" />
        </div>
        <div className="divProtraitUserName">
          {props.nomeUser == null || String.toString(props.nomeUser).trim === "" ? null : props.nomeUser}
        </div>

        <div className="portraitUserContainerEdit">
          {/* Expulsar da sala */}

            <div onClick={retirandoUsuarioDaSala} className="optionsPortraitUsersDivs">
              {/* <RiCloseLine /> */}
              <img src={iconClose} alt="" />
            </div>


          {/* Chamar chat individual */}
          { id != id ? (
          <div className="optionsPortraitUsersDivs">
            <img src={iconChatNormal} alt="" />
          </div>
          ) : null }

          {/* Enviar feedback */}
          { id != id ? (
          <div className="optionsPortraitUsersDivs" onClick={()=> selecionarUsuarioFeedback(props.nomeUser, props.idUserRoom, props.imagem)}>
          <span className="icon_feedback_optionsPortraitUsersDivs"><MdFeedback /></span>
          </div>
        ) : null }
        </div>
      </div>

      {showModalFeedback && (
        <Modal title='Feedback' icon={<MdFeedback />} clearAll={true} temFooter='true' ativarBotao='true' textButton="Enviar avaliação" iconButton={<BsArrowRightShort />} onClose={() => setShowModalFeedback(false)} onClear={() => limparModalFeedback()} onClickButton={enviarFeedback}>
          <UserProfile
            nome={jogadorSelecionado.nome}
            hasUserId={jogadorSelecionado.id}
            img={jogadorSelecionado.img}
          />

          <div className="salas-group-avaliacao">

            <div className="salas-modalFeedback-avaliacao ">
              Habilidade
              <Avaliacao initialValue={ratingHabilidade} setRating={setRatingHabilidade} key={`habilidade-${resetAvaliacao}`} />
            </div>

            <div className="salas-modalFeedback-avaliacao ">
              Comportamento
              <Avaliacao initialValue={ratingComportamento} setRating={setRatingComportamento} key={`comportamento-${resetAvaliacao}`} />
            </div>


          </div>

          <div className="salas-modalFeedback-avaliacao-comentario">
            <span>Comentário</span>
            <textarea className="my-textarea" value={comentarioFeedback} onChange={(e) => setComentarioFeedback(e.target.value)}></textarea>
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
  )
}

export const LockButton = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [showElement, setShowElement] = useState(false);

  const handleMouseEnter = () => {
    setShowElement(true);
  };

  const handleMouseLeave = () => {
    setShowElement(false);
  };

  const handleClick = () => {
    setIsPrivate(!isPrivate);
  };


  return (
    <>
      <div
        className={showElement === true && isPrivate === true ?
          "divPrivateRoomSet divPrivateRoomSetWithText divPrivateRoomSetIsLocked" :
          showElement === false && isPrivate === true ?
            "divPrivateRoomSet divPrivateRoomSetIsLocked"
            : showElement === true && isPrivate === false ?
              "divPrivateRoomSet divPrivateRoomSetWithText divPrivateRoomSetNotLocked"
              : "divPrivateRoomSet divPrivateRoomSetNotLocked"
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img src={isPrivate ? iconLockYes : iconLockNo} alt="" />
        {
          showElement &&
          <div className="divPrivateRoomSetText">{isPrivate ? "Abrir Sala" : "Fechar sala"}</div>
        }
      </div >
    </>
  )
}

export const ChatBox = (props) => {

  const obterImagemUsuario = async (jogadorId) => {
    try {
      const response = await axios.get(`${currentURL}/users/${jogadorId}/picture`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        responseType: 'blob',
      });
      console.log(response)
      if (response.data.size > 0) {
        const blobData = response.data;
        const imageUrl = await convertBlobToBase64(blobData);
        return imageUrl;
      }
      else {
        console.log("entrei aqui")
        // return imgUserProfile;
      }
    } catch (error) {
      console.log(error);
      // return imgUserProfile;
    }
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const idGroup = Number(props.idGroup);
  const dummy = useRef()
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"), where("idGroup", "==", idGroup));

  const [messages] = useCollectionData(q, { idField: "id" });

  console.log("Mensagens :", messages)

  const [testeImagem, setTesteImagem] = useState();

  const imagem = obterImagemUsuario(USERID).then((teste) => {
    setTesteImagem(teste)
  }).catch((error) => console.log("s"))




  // const imagen
  //rolagem automatica
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // const { } = auth.currentUser;
    // const { photoURL, uid } = auth.currentUser;
    const uid = USERID;
    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL: testeImagem,
      idGroup,
      createdAt: serverTimestamp()
    });
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  };

  return (
    <>
      <div className="mainBodyChatRoom">
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage} className="formChatRoom">
        <input placeholder="Digite aqui..." className="inputMensagemChatRoom"
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" className="buttonFormChatRoom buttonChatRoomDefault" disabled={!formValue}><img src={enviarIcon} alt="" /></button>
      </form>
    </>
  );
};

export const ChatMessage = (props) => {
  const { uid, text, photoURL } = props.message;
  const messageClass = uid === USERID ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img className="messageImgChatRoom" src={photoURL || imgTest} />
      <p className="messageText">{text}</p>
    </div>
  );
};

export const ExitFromRoom = (props) => {
  const navigate = useNavigate();
  function exit() {
    axios.delete(`${currentURL}/team-rooms/remove-users/${USERID}/${props.idAdmin}/${props.idGroup}`
    ).then((response) => {
      if (response.status === 200) {
        navigate("/rooms", { replace: true })
      }
      console.log("Buscando informações da sala", response.data)
    }).catch((error) => {
      console.error('erro ao buscar informações da sala', error);
    });
  }

  return (
    <>
      <div onClick={exit} className="divIconBackChatRoom">
        <img src={iconBack} alt="" />
      </div>
    </>
  )
}

const Avaliacao = ({ initialValue, setRating, reset }) => {
  var [avaliacao, setAvaliacao] = useState(initialValue);
  var [tempAvaliacao, setTempAvaliacao] = useState(0);

  useEffect(() => {
    if (reset) {
      setAvaliacao(0);
    }
  }, [reset]);


  const handleClick = (value) => {
    if (value === avaliacao) {
      setAvaliacao(0);
      setRating(0);
    } else {
      setAvaliacao(value);
      setRating(value);
    }
  };


  const handleMouseEnter = (value) => {
    setTempAvaliacao(value);
  };

  const handleMouseLeave = () => {
    setTempAvaliacao(0);
  };

  const getStarColor = (index) => {
    if (index < tempAvaliacao || index < avaliacao) {
      return "#19FF00";
    } else {
      return "#e4e5e9";
    }
  };

  return (
    <div className="estrelinhas">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <BsFillStarFill
            key={value}
            onClick={() => handleClick(value)}
            color={getStarColor(index)}
            size={14}
            style={{ marginRight: 5, cursor: "pointer" }}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={() => handleMouseLeave()}
          />
        );
      })}
    </div>
  );
};
