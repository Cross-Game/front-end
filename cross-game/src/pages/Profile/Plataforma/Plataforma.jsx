import React, { useState } from "react";
import "./Plataforma.css";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar"
import Sidebar from "../../../components/Sidebar/Sidebar"
import CardPlay from "../../../components/CardPlataforma/CardPlaystation";
import CardXbox from "../../../components/CardPlataforma/CardXbox";
import CardPc from "../../../components/CardPlataforma/CardPc";
import CardMobile from "../../../components/CardPlataforma/CardMobile";
import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { BsCheck, BsGridFill } from "react-icons/bs";
import imgXbox from "../Plataforma/assets/xbox.png"
import imgPs from "../Plataforma/assets/Play.png"
import imgPc from "../Plataforma/assets/computador.png"
import imgCelular from "../Plataforma/assets/celular.png"


function ProfileJogo() {
    const [showModalAdicionarPlataforma, setShowModalAdicionarPlataforma] = useState(false);
    const [plataformasSelecionadas, setPlataformasSelecionadas] = useState([]);

    function limparPlataformas(){
        setPlataformasSelecionadas("")
    }

    function cadastrarPlataforma(){
        console.log("TO DO")
    }

    const handleClickPlataforma = (plataforma) => {
        if (plataformasSelecionadas.includes(plataforma)) {
          setPlataformasSelecionadas(plataformas => plataformas.filter(plat => plat !== plataforma));
        } else {
          setPlataformasSelecionadas(plataformas => [...plataformas, plataforma]);
        }
      };

    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={()=> setShowModalAdicionarPlataforma(true)}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" />
                        </span>
                    </div>
                </div>
                <div className="ProfilePlataformaContainer">
                <CardPlay/>
                <CardXbox/>
                <CardPc/>
                <CardMobile/>
                
                
                
                   
                </div>
                {showModalAdicionarPlataforma && (
                    <Modal title="Plataformas" icon={<BsGridFill />} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck />} clearAll={true} onClear={limparPlataformas} onClick={cadastrarPlataforma} onClose={()=> setShowModalAdicionarPlataforma(false)}>
                    <div className="ModalPlataforma-cadastrarPlataforma">
                    <CardAddPlataforma 
                        text="Playstation" 
                        color={"rgb(65, 88, 208)"} 
                        isSelected={plataformasSelecionadas.includes("Playstation")} 
                        onClick={() => handleClickPlataforma("Playstation")}
                        icon={<img src={imgPs} alt="playstation"/>}
                        /> 
                    <CardAddPlataforma 
                        text="Xbox" 
                        color={"#33ff339c"} 
                        isSelected={plataformasSelecionadas.includes("Xbox")} 
                        onClick={() => handleClickPlataforma("Xbox")}
                        icon={<img src={imgXbox} alt="xbox"/>}
                        /> 
                    <CardAddPlataforma 
                        text="Desktop" 
                        color={"#880c0c"} 
                        isSelected={plataformasSelecionadas.includes("Desktop")} 
                        onClick={() => handleClickPlataforma("Desktop")}
                        icon={<img src={imgPc} alt="desktop"/>}
                        />
                    <CardAddPlataforma 
                        text="Mobile" 
                        color={"#5d1969"} 
                        isSelected={plataformasSelecionadas.includes("Mobile")} 
                        onClick={() => handleClickPlataforma("Mobile")}
                        icon={<img src={imgCelular} alt="mobile"/>}
                        />
                    </div>
                    </Modal>
                )}
            </>
        )
    }


    return (
        <>
            <ProfileNavbar plataformas={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

function CardAddPlataforma(props) {
    const { text, icon, color, isSelected, onClick} = props;
    const className = isSelected ? 'plataforma-cardAddPlataforma-selected' : 'plataforma-cardAddPlataforma';
    const cardStyle = {
       boxShadow: isSelected ? `0px 0px 30px ${color}` : 'none',
       border: isSelected? `5px solid ${color}` : 'none',
       color: isSelected? `${color}` : '#fff',
       fontWeight: isSelected? `500` : '600',
    };
  
    return (
      <div className={className} style={cardStyle} onClick={onClick}>
        <span className="plataforma-cardAddPlataforma-icon">{icon}</span>
        <span className="plataforma-cardAddPlataforma-text">{text}</span>
      </div>
    );
}

export default ProfileJogo;