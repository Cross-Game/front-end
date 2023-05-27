import React, { useState } from "react";
import Modal from '../../components/Modal';
import { FaAmazon } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import Button from '../../components/Button'
import Tag from '../../components/Tag'
import { MdGroups, MdNotificationsActive as MdNotificationsActive } from 'react-icons/md';
import Notification from '../../components/Notification';
import { BsArrowRightShort, BsFileMinus, BsFileMinusFill, BsFillCalendarFill, BsFillCalendarWeekFill, BsFilterLeft, BsPlus } from "react-icons/bs";
import "./style.css"
import Option from "./Option";
import RangeBar from "../../components/RangeBar";
import { HiMinusSm } from "react-icons/hi";
import { jogos as listaJogos } from "../../utils/jogos";


function Teste() {
  const [jogos, setJogos] = useState(listaJogos)
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
         <Notification/>
        
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

export default Teste;

