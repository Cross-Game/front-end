import React, { useState } from "react";
import Modal from '../../components/Modal';
import { FaAmazon as FaAmazon } from 'react-icons/fa';
import { FaSearch as FaSearch } from 'react-icons/fa';
import Button from '../../components/Button'
import Tag from '../../components/Tag'
import { MdGroups, MdNotificationsActive as MdNotificationsActive, MdOutlineInterests } from 'react-icons/md';
import Notification from '../../components/Notification';
import { BsArrowRightShort, BsCheck, BsFileMinus, BsFileMinusFill, BsFillCalendarFill, BsFillCalendarWeekFill, BsFilterLeft, BsPlus } from "react-icons/bs";
import "./style.css"
import Option from "./Option";
import RangeBar from "../../components/RangeBar";
import { HiMinusSm } from "react-icons/hi";
import { jogos as listaJogos } from "../../utils/jogos";
import { interesses as listaInteresses } from "../../utils/interesses";
import { RiFileEditFill } from "react-icons/ri";
import IDUSER from "../../data/constants.js";



function Teste() {
  const [jogoSelecionado, setJogoSelecionado] = useState("");
  const [jogos, setJogos] = useState(listaJogos);
  const [interesses,setInteresses] = useState(listaInteresses);
  const [interesseSelecionado, setInteresseSelecionado] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

const  changeAvatar = () => {
  console.log("TO DO")
  }

  function limparInteresses(){
    setCategoriaSelecionada("");
    setInteresseSelecionado("");
  }

  function cadastrarInteresse(){
    console.log("To DO")
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {showModal && (

        // <Modal title="Criar uma sala" icon={<MdGroups/>} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort/>} textButton='Criar'>
        //   <div className="container_filtro">
        //      <div className="filtro_jogos">
        //    <p className="titleFiltro">Escolha um Jogo</p>
        //    <div className="jogos">
        //      {jogos.map((jogo) => (
        //         <React.Fragment key={jogo.id}>
        //         <Tag text={jogo.nome}/>
        //         </React.Fragment>
        //       ))}
        //       </div>
        //    </div>

        //      <div className="filtro_level">
        //    <p className="titleFiltro">Level</p>
        //      <RangeBar min='0' max='100' />
        //    </div>

        //    <div className="filtro_qtdPlayers">
        //    <p className="titleFiltro">Qtd de Players</p>
        //    <div className="container_input_qtd">
        //      <input type="text" value={10} className="input_qtd_players"></input>
        //      <div className="container_valor">
        //      <HiMinusSm className="valor"/>
        //      <BsPlus className="valor"/>
        //      </div>
        //      </div>
        //    </div>

           
        //    <div className="filtro_rank">
        //    <p className="titleFiltro">Rank</p>
        //    {jogos.rank.map((rank) => (
        //         <React.Fragment key={jogos.id}>
        //         <Tag text={rank}/>
        //         </React.Fragment>
        //       ))}
        //      </div>

        //   <div className="filtro_descricao">
        //    <p className="titleFiltro">Descrição</p>
        //     <textarea class="my-textarea"></textarea>
        //   </div>

        //     <div className="filtro_horario">
        //       <form>
        //   <p className="titleFiltro">Quando?</p>
        //   <label><input type="radio" name='quando'checked value='agora'/> Agora</label>
        //   <label><input type="radio" name='quando' value='agendado'/> Apartir de <span>______________________</span> <BsFillCalendarWeekFill className="iconCalendario"/></label>
        //   </form>
        //   </div>


        // </div>
        // </Modal>

        // <Modal title="Filtrar por" icon={<BsFilterLeft/>} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort/>} textButton='Filtrar'>
        // <div className="container_filtro">
         
        //   <div className="filtro_jogos">
        //   <p className="titleFiltro">Meus Jogos</p>
        //   <div className="jogos">
        //     {jogos.map((jogo) => (
        //        <React.Fragment key={jogo.toLowerCase()}>
        //         <Tag text={jogo}/>
        //        </React.Fragment>
        //      ))}
        //      </div>
        //   </div>
         
        //   <div className="filtro_level">
        //   <p className="titleFiltro">Level</p>
        //     <RangeBar min='0' max='100' />
        //   </div>

        //   <div className="filtro_rank">
        //   <p className="titleFiltro">Rank</p>
        //     // Fazer um GetRank de cada jogo
        //     </div>

        // </div>
        // </Modal>
        // <Modal title="Filtrar por" icon={<BsFilterLeft/>} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort/>} textButton='Filtrar'>
        // <div className="container_filtro">
        //   <div className="filtro_nivel">
        //     <p className="titleFiltro">Nivel</p>
        //     <div className="opcoesNivel">
        //     <Option backgroundColor='#4D4D4D'/>
        //     <Option backgroundColor='#604F00'/>
        //     <Option backgroundColor='#052D4F'/>
        //     <Option backgroundColor='#571618'/>
        //     </div>
        //   </div>
        //   <div className="container_sliders">
        //   <div className="filtro_comportamento"><p className="titleFiltro">Comportamento</p> <RangeBar min='0' max='5' /> </div>
        //   <div className="filtro_habilidade"><p className="titleFiltro">Habilidade</p>  <RangeBar min='0' max='5' /> </div>
        //   </div>
        // </div>
        // </Modal>
        //  <Notification/>
       
       
        // <Modal title="Editar Perfil" icon={<RiFileEditFill/> } temFooter={true} ativarBotao={true} textButton="Editar" iconButton={<BsCheck/>}>
        //   <div className="modalEditarPerfil-container">
        //   <UserProfile nome={"Nome"} img={<BsArrowRightShort/>} onClick={changeAvatar}/>
        //   <label>Usuário</label>
        //   <input type="text"></input>
        //   <label>E-mail</label>
        //   <input type="text"></input>
        //   <label>Nova Senha</label>
        //   <input type="text"></input>
        //   <label>Confirmar Senha</label>
        //   <input type="text"></input>
        //   </div>
        // </Modal>

      //   <Modal title="Cadastrar perfil de jogo" icon={<RiFileEditFill/> } temFooter={true} ativarBotao={true} textButton="Cadastrar" iconButton={<BsCheck/>}>
      //   <div className="modalEditarPerfil-container">
      //   <UserProfile nome={"Nome"} img={<BsArrowRightShort/>} onClick={changeAvatar}/>
       
      //   <label>Jogo</label>
       
      //   <div className="modalCadastrarProfileJogo-jogos">
      //     {jogos.map((jogo) => (
      //       <React.Fragment key={jogo.id}>
      //           <Tag
      //           text={jogo.nome}
      //           isSelected={jogoSelecionado === jogo.nome ? true : false}
      //           onClick={() => setJogoSelecionado(jogo.nome)}/>
      //           </React.Fragment>
      //       ))}
      //     </div>

      //   <label>Username</label>
      //   <input type="text"></input>
      //   <label>GameID</label>
      //   <input type="text"></input>
      //   </div>
      // </Modal>
     

<Modal title="Interesses" icon={<MdOutlineInterests/>} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck/>} clearAll={true} onClear={limparInteresses} onClick={cadastrarInteresse}>
  <div className="ModalCadastrarInteresse-body">
     <UserProfile nome={"Nome"} img={<BsArrowRightShort/>} onClick={changeAvatar}/>
  Interesse
  <div className="ModalCadastrarInteresse-interesses">
    {interesses.map((interesse) => (
      <React.Fragment key={interesse.id}>
        <Tag 
          text={interesse.nome}
          isSelected={interesseSelecionado === interesse.nome ? true : false}
          onClick={() => setInteresseSelecionado(interesse.nome)}
        />
      </React.Fragment>
    ))}
  </div>
  Categoria
  <div className="ModalCadastrarInteresse-categorias">
    {interesses &&
      interesses.find((interesse) => interesse.nome === interesseSelecionado)?.categorias.map((categoria, index) => (
        <React.Fragment key={categoria}>
          <Tag 
            text={categoria} 
            isSelected={categoriaSelecionada === categoria ? true : false}
            onClick={() => setCategoriaSelecionada(categoria)}
          />
        </React.Fragment>
      ))
    }
  </div>
  </div>
</Modal>
     

       
        // <Modal
        //   onClose={handleCloseModal}
        //   title="Notificações"
        //   clearAll={true}
        //   icon={<MdNotificationsActive />}
        //   ativarBotao={true}
        //   textButton="Action"
        //   iconButton={<FaSearch/>}
        // >
        //     <div>Teste</div>
        //     <div>
        //     <p>Aqui fica o conteudo</p>
        //     </div>
        // </Modal>
      )}
        <Button text="Search" icon={<FaSearch />} />
    </div>
  );
}


function UserProfile(props){
  const { img, nome } = props;
 
  return (
    <div className="salas-group-userAvatar" >
      <img className="salas-userAvatar__image" src={img} />
      <span className="salas-userAvatar__name">{nome}</span>
    </div>

  )
}

export default Teste;