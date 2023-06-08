import { getAuth, signInAnonymously } from "firebase/auth";
import { addDoc, and, collection, limit, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatRoom.css";
import { app, databaseApp } from "../../data/firebaseConfig";
import { Link, NavLink, redirect, useNavigate, useParams } from "react-router-dom";


import enviarIcon from "./assets/enviarIcon.svg"
import imgTest from "../../assets/index-page/medalDiamante.svg"
import iconBack from "./assets/arrow-right.svg"
import iconLockYes from "./assets/lockYes.svg"
import iconLockNo from "./assets/lockNo.svg"
import iconClose from "./assets/closeIcon.svg"
import iconChatNormal from "./assets/chatNormalIcon.svg"
import iconChatAddIconUser from "./assets/chatAddUserIcon.svg"

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
                <div className="divinviteFriendsToRoom">
                  Convide seus amigos <img src={iconBack} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="chatRoomContainerMessagesBox">
          {<ChatBox idGroup={id} />}
        </section>
      </div>
    </>
  );
};

export const PortraitUsers = (props) => {
  let id = 1  /* TODO: id logado  */
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
              <img src={iconClose} alt="" />
            </div>
            : null}
          <div className="optionsPortraitUsersDivs">
            <img src={iconChatNormal} alt="" />
          </div>
          <div className="optionsPortraitUsersDivs">
            <img src={iconChatAddIconUser} alt="" />
          </div>
        </div>

      </div>
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