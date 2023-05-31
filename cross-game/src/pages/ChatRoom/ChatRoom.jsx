import { getAuth, signInAnonymously } from "firebase/auth";
import { addDoc, and, collection, limit, or, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatRoom.css";
import { app, databaseApp } from "../../data/firebaseConfig";
import { Link, NavLink, redirect, useNavigate, useParams } from "react-router-dom";


import enviarIcon from "./assets/enviarIcon.svg"
import imgTest from "../../assets/index-page/medalDiamante.svg"
import iconBack from "./assets/arrow-right.svg"


const auth = getAuth(app);
// const auth = signInAnonymously();

export const ChatRoom = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // const [user] = useAuthState(auth);
  // const [renderComponent, setRenderComponent] = useState(false);
  // const navigate = useNavigate();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    if (!document.referrer || document.referrer === window.location.href) {
      navigate("/rooms");
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
              <p className="chatRoomHeaderId">Id: 5</p>
            </div>
          </div>
          <div className="divPainelAllInformationRoom">

            <div className="divInformationOfFilter">
              
            </div>

          </div>
        </div>
        <section className="chatRoomContainerMessagesBox">{<ChatBox idGroup={id} />}</section>
      </div>
    </>
  );
};

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
    await addDoc(messagesRef, {
      text: formValue,
      // uid,
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
  const { text } = props.message;
  // const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className="message">
      {/* <div className={`message ${messageClass}`}> */}
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <img className="messageImgChatRoom" src={imgTest} />
      <p className="messageText">{text}</p>
    </div>
  );
};



export const ExitFromRoom = () => {
  const navigate = useNavigate();

  // requisição para retirar id da sala e depois mover ele para rooms

  function exit() {
    // retira id da lista e redireciona ele para rooms
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