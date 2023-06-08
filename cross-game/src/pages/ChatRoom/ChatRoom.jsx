import { getAuth, signInAnonymously } from "firebase/auth";
import { addDoc, and, collection, limit, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatRoom.css";
import { app, databaseApp } from "../../data/firebaseConfig";
import { Link, NavLink, redirect, useNavigate, useParams } from "react-router-dom";
import { TOKEN } from "../../data/constants";
import { USERID } from "../../data/constants";
import axios from "axios";

import enviarIcon from "./assets/enviarIcon.svg"
import imgTest from "../../assets/index-page/medalDiamante.svg"
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



// const auth = getAuth(app);
// const auth = signInAnonymously();

export const ChatRoom = () => {

  // TODO adicionar buscar dos jogadores da sala

  let testeUsers = [
    {
      id: 1,
      nomeUser: "limbo782354823548",
      imgUser: imgTest
    }, {
      id: 2,
      nomeUser: "mayra",
      imgUser: imgTest
    }, {
      id: 3,
      nomeUser: "teste",
      imgUser: imgTest
    }, {
      id: 4,
      nomeUser: "teste2",
      imgUser: imgTest
    }, {
      id: 2,
      nomeUser: "mayra",
      imgUser: imgTest
    }, {
      id: 3,
      nomeUser: "teste",
      imgUser: imgTest
    }, {
      id: 4,
      nomeUser: "teste2",
      imgUser: imgTest
    }, {
      id: 2,
      nomeUser: "mayra",
      imgUser: imgTest
    }, {
      id: 3,
      nomeUser: "teste",
      imgUser: imgTest
    }, {
      id: 4,
      nomeUser: "teste2",
      imgUser: imgTest
    }
  ]

  const [usersRoom, setUsersRoom] = useState(testeUsers);

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [showModalConvidar, setShowModalConvidar] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    if (!document.referrer || document.referrer === window.location.href) {
      navigate("/notFound");
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  function copiarLinkSala(){
    const link = document.getElementById("salas-linkSala").innerText;
    navigator.clipboard.writeText(link);
  }
  

  return (
    <>
      <div className="chatRoomContainerMessages">
        <div className="divPainelControllerContainer">
          <div className="chatRoomHeader">
            <ExitFromRoom />
            <div className="chatRoomHeaderNameId">
              <h2 className="chatRoomHeaderName">Teste</h2>
              <p className="chatRoomHeaderId">Id: {id}</p>
            </div>
          </div>
          <div className="divPainelAllInformationRoom">
            <div className="divInformationOfFilter">

              <div className="chatRoomFilterContainer gameFilter">
                Valorant
              </div>

              <div className="chatRoomFilterContainer greenFilter">
                Ranking Gold
              </div>

              <div className="chatRoomFilterContainer greenFilter">
                Level 50
              </div>
            </div>
            <div className="playersOnRoomChatRoom">

              {!(usersRoom.length === 0) ? usersRoom.map((users) => (
                <PortraitUsers nomeUser={users.nomeUser} />
              ))
                :
                "Teste sem Participantes" // TODO adicionar div com estilo para sem participantes
              }

            </div>
            <div className="divPainelControllOfAdminGroup">
              <div className="divPainelControllOfAdminGroupContainer">
                <LockButton />
                <Button text="Convide seus amigos" icon={<BsArrowRightShort/>} onClick={() => setShowModalConvidar(true)}/>
              </div>
            </div>
          </div>
        </div>
        <section className="chatRoomContainerMessagesBox">
          {<ChatBox idGroup={id} />}
        </section>
      </div>

      {showModalConvidar && ( 
          <Modal title='Convide seus amigos' icon={<BsPersonFillAdd/>} temFooter={false} onClose={()=> setShowModalConvidar(false)}>
            <div className="salas-convidados">
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              <UserProfile nome='teste' img='teste'/>
              
            </div>
            <div className="salas-groupLink" onClick={copiarLinkSala}>
              <HiLink/>
              <span className="salas-link"><a id="salas-linkSala">Aqui fica o link da sala</a></span>
              <MdContentCopy/>
            </div>
          </Modal>
        )}
    </>
  );
};

export const PortraitUsers = (props) => {
  let id = 1  /* TODO: id logado  */

  const [showModalFeedback, setShowModalFeedback] = useState(false);
  
  const [jogadorSelecionado, setJogadorSelecionado] = useState({id: 1,nome: 'João Silva',foto: 'https://example.com/joao_silva.jpg',idade: 27,posicao: 'Atacante',pais: 'Brasil'},);
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

  function enviarFeedback() {
    console.log("Chamei enviar feedback")
    axios.post(`http://localhost:8080/feedbacks/${USERID}`, 
    {
      userGivenFeedback: jogadorSelecionado.nome,
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
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <>
      <div className="portraitUserContainer">
        <div className="divPortraitUserImg">
          <img src={imgTest} alt="" />
        </div>
        <div className="divProtraitUserName">
          {props.nomeUser == null || String.toString(props.nomeUser).trim === "" ? null : props.nomeUser}
        </div>

        <div className="portraitUserContainerEdit"> {/* TODO: alterar abaixo para verificar se usuario logado é owner da sala */}
          {id === 1 ?
            <div className="optionsPortraitUsersDivs">
              <RiCloseLine/>
            </div>
            : null}
          <div className="optionsPortraitUsersDivs">
            <BsFillChatLeftTextFill/>
          </div>
          <div className="optionsPortraitUsersDivs" onClick={()=> setShowModalFeedback(true)}>
            <MdOutlineFeedback/>
          </div>
        </div>
      </div>

      {showModalFeedback && (
            <Modal title='Feedback' icon={<MdFeedback/>} clearAll={true}  temFooter='true' ativarBotao='true' textButton="Enviar avaliação" iconButton={<BsArrowRightShort/>} onClose={()=> setShowModalFeedback(false)} onClear={() => limparModalFeedback()} onClickButton={enviarFeedback}>
              <UserProfile 
                nome={jogadorSelecionado.nome}   
                img={jogadorSelecionado.foto}  
                />

                <div className="salas-group-avaliacao">

                <div className="salas-modalFeedback-avaliacao ">
                  Habilidade
                  <Avaliacao initialValue={ratingHabilidade} setRating={setRatingHabilidade} key={`habilidade-${resetAvaliacao}`}/>
                </div>

                <div className="salas-modalFeedback-avaliacao ">
                  Comportamento
                  <Avaliacao initialValue={ratingComportamento} setRating={setRatingComportamento} key={`comportamento-${resetAvaliacao}`}/>
                </div>
                  

                </div>

                <div className="salas-modalFeedback-avaliacao-comentario">
                  <span>Comentário</span>
                  <textarea className="my-textarea" value={comentarioFeedback} onChange={(e) => setComentarioFeedback(e.target.value)}></textarea>
                </div>
            </Modal>
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

  const idGroup = Number(props.idGroup);
  const dummy = useRef()
  const messagesRef = collection(databaseApp, "messages");
  const q = query(messagesRef, orderBy("createdAt"), where("idGroup", "==", idGroup));

  const [messages] = useCollectionData(q, { idField: "id" });

  console.log("Mensagens :", messages)

  //rolagem automatica
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    // const { } = auth.currentUser;
    // const { photoURL, uid } = auth.currentUser;
    const uid = 2;
    await addDoc(messagesRef, {
      text: formValue,
      uid,
      // photoURL,
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
  const { uid, text } = props.message;
  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const messageClass = uid === 5 ? 'sent' : 'received';  // TODO : id Logado
  return (
    <div className={`message ${messageClass}`}>
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <img className="messageImgChatRoom" src={imgTest} />
      <p className="messageText">{text}</p>
    </div>
  );
};

export const ExitFromRoom = () => {
  const navigate = useNavigate();
  function exit() {
    navigate("/rooms", { replace: true })
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


//   export const SignIn = () => {
//     const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

//     return <button className="sign-in" onClick={() => signInWithGoogle()}>logar com Google</button>;
//   };

// export const SignIn = () => {
//   const signIn = async () => {
//     await signInAnonymously(auth);
//   };

//   return (
//     <>
//       <button className="sign-in" onClick={signIn}>
//       </button>
//     </>
//   );
// };

// export const SignOut = () => {
//   return (
//     <Link className="sign-out" to={"/rooms"}>Sair</Link>
//   );
// };