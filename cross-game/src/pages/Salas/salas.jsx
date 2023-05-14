import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useEffect } from 'react';
import moment from 'moment';
import { MdContentCopy, MdFeedback, MdGroupRemove, MdGroups } from "react-icons/md";
import Tag from "../../components/Tag";
import RangeBar from "../../components/RangeBar";
import { HiLink, HiMinusSm } from "react-icons/hi";
import { BsArrowLeftShort, BsArrowRightShort, BsChatLeftTextFill, BsChevronLeft, BsChevronRight, BsFillCalendarFill, BsFillCalendarWeekFill, BsFillChatLeftTextFill, BsFillStarFill, BsFillUnlockFill, BsLink, BsLink45Deg, BsLockFill, BsPersonFillAdd, BsPlus, BsUnlockFill } from "react-icons/bs";
import { jogos as listaJogos } from "../../utils/jogos";
import Button from "../../components/Button";
import Option from "../Teste/Option/index";
import { RiCloseLine } from "react-icons/ri";
import "./salas.css";


function Salas() {
    const [jogos, setJogos] = useState(listaJogos);
    const [adminSala, setAdminSala] = useState(true);

    const [showModalCriarSala, setShowModalCriarSala] = useState(false);
    const [showModalCalendario, setShowModalCalendario] = useState(true);
    const [showModalSala, setShowModalSala] = useState(false);
    const [showModalConvidar, setShowModalConvidar] = useState(false);
    const [showModalFeedback, setShowModalFeedback] = useState(false);

    const [ratingHabilidade, setRatingHabilidade] = useState(null);
    const [ratingComportamento, setRatingComportamento] = useState(null);


    const [jogoSelecionado, setJogoSelecionado] = useState("");
    const [rankSelecionado, setRankSelecionado] = useState("");
    var [qtdJogadoresSelecionados, setQtdJogadoresSelecionados] = useState(10);
    const [horarioSelecionado, setHorarioSelecionado] = useState();

    var [minLevel, setMinLevel] = useState(1);
    var [maxLevel, setMaxLevel] = useState(100);

    const [conteudoBodyModal, setConteudoBodyModal] = useState("jogadores") // [chat, jogadores,]

    const [salaIsPublic, setSalaIsPublic] = useState(true);

    const [jogadorSelecionado, setJogadorSelecionado] = useState({
      id: 1,
      nome: 'João Silva',
      foto: 'https://example.com/joao_silva.jpg',
      idade: 27,
      posicao: 'Atacante',
      pais: 'Brasil'
    },); 
    

    const bancoDeJogadores = [
      {
        id: 1,
        nome: 'João Silva',
        foto: 'https://example.com/joao_silva.jpg',
        idade: 27,
        posicao: 'Atacante',
        pais: 'Brasil'
      },
      {
        id: 2,
        nome: 'Maria Souza',
        foto: 'https://example.com/maria_souza.jpg',
        idade: 23,
        posicao: 'Meio-campo',
        pais: 'Argentina'
      },
      {
        id: 3,
        nome: 'Pedro Santos',
        foto: 'https://example.com/pedro_santos.jpg',
        idade: 25,
        posicao: 'Defesa',
        pais: 'Portugal'
      },
      {
        id: 4,
        nome: 'Lucas Lima',
        foto: 'https://example.com/lucas_lima.jpg',
        idade: 24,
        posicao: 'Meio-campo',
        pais: 'Brasil'
      },
      {
        id: 5,
        nome: 'Ana Torres',
        foto: 'https://example.com/ana_torres.jpg',
        idade: 26,
        posicao: 'Atacante',
        pais: 'Espanha'
      }
    ];


    const handleOpenModal = () => {setShowModalCriarSala(true);};

    function mudarSalaStatus() {
      setSalaIsPublic(!salaIsPublic);
    }

    function handleInputFocus(e) {
        const label = e.target.parentNode;
        label.classList.add('salas-whiteText');
      }
      
      function handleInputBlur(e) {
        const label = e.target.parentNode;
        label.classList.remove('salas-whiteText');
      }



      function removerUsuarios(){
        console.log("To do")
      }

      const [currentDayNow, setCurrentDayNow] = useState(moment().format("DD"));
      const [currentMonthNow, setCurrentMonthNow] = useState(moment().format("MM"));
      const [currentHourNow, setCurrentHourNow] = useState(moment().format("HH"));
      const [currentMinuteNow, setCurrentMinuteNow] = useState(moment().format("mm"));

      useEffect(() => {
        const interval = setInterval(() => {
          const now = moment();
          console.log(now)
          setCurrentDayNow(now.format("DD"));
          setCurrentMonthNow(now.format("MM"));
          setCurrentHourNow(now.format("HH"));
          setCurrentMinuteNow(now.format("mm"));
        }, 5000);
        
        return () => clearInterval(interval);
      }, []);

    return (
        <div>
          <button onClick={handleOpenModal}>Open Modal Criar sala</button>
          {showModalCriarSala && (
    
            <Modal title="Criar uma sala" icon={<MdGroups/>} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort/>} textButton='Criar' onClose={()=> setShowModalCriarSala(false)}>
              <div className="container_filtro">
                 <div className="filtro_jogos">
               <p className="titleFiltro">Escolha um Jogo</p>
               <div className="jogos">
                 {jogos.map((jogo) => (
                    <React.Fragment key={jogo.id}>
                    <Tag 
                    text={jogo.nome} 
                    isSelected={jogoSelecionado === jogo.nome ? true : false}
                    onClick={() => setJogoSelecionado(jogo.nome)}/>
                    </React.Fragment>
                  ))}
                  </div>
               </div>
    
                 <div className="filtro_level">
               <p className="titleFiltro">Level</p>
                 <RangeBar min={minLevel} max={maxLevel} />
               </div>
    
               <div className="filtro_qtdPlayers">
               <p className="titleFiltro">Qtd de Players</p>
               <div className="container_input_qtd">
                 <input type="text" value={qtdJogadoresSelecionados} className="input_qtd_players"></input>
                 <div className="container_valor">
                 <HiMinusSm className="valor" onClick={() => setQtdJogadoresSelecionados(qtdJogadoresSelecionados--)}/>
                 <BsPlus className="valor" onClick={() => setQtdJogadoresSelecionados(qtdJogadoresSelecionados++)}/>
                 </div>
                 </div>
               </div>
    
               
               <div className="filtro_rank" >
                <p className="titleFiltro">Rank</p>
                {jogos &&
                jogos.find((jogo) => jogo.nome === jogoSelecionado)?.rank.map((rank, index) => (
                <React.Fragment key={rank}>
                  <br/>
                      <Tag 
                        text={rank} 
                        isSelected={rankSelecionado === rank ? true : false}
                        onClick={() => setRankSelecionado(rank)}
                        />
                </React.Fragment>
                ))}
                </div>
    
              <div className="filtro_descricao">
               <p className="titleFiltro">Descrição</p>
                <textarea className="my-textarea"></textarea>
              </div>
    
                <div className="filtro_horario">
                  <form>
              <p className="titleFiltro">Quando?</p>
              <label><input type="radio" name='quando' value='agora' onFocus={handleInputFocus} onBlur={handleInputBlur} checked/> Agora</label>
              <div className="">
              <label><input type="radio" name='quando' value='agendado' onFocus={handleInputFocus} onBlur={handleInputBlur}/> Apartir de <span>______________________</span> <BsFillCalendarWeekFill className="iconCalendario" onClick={() => setShowModalCalendario(true)}/></label>
              </div>
              </form>
              </div>
    
    
            </div>
            </Modal>
          )}




        {showModalSala && (
        <Modal title='Sala'>
          <div className="salas-subtitleModalSala">
            <div>
            <span className="salas-span-idsala-modalsubtitle">id sala</span>
            <div className="salas-group-tagsModalSala">
            <Tag text='Jogo'/>
            <Tag text='Ranking'/>
            <Tag text='LevelMin'/>
            </div>
            </div>
            <Button text='Ver Chat' icon={<BsChatLeftTextFill/>} onClick={() => setConteudoBodyModal('chat')}/>
          </div>

          {
           conteudoBodyModal === 'jogadores' ? (
          <div className="salas-convidados">
            
            {bancoDeJogadores.map((jogador) => (
              <>
                <UserProfile
                key = {jogador.id} 
                nome={jogador.nome}   
                img={jogador.foto}  
                onClick={() => setJogadorSelecionado(jogador)} 
                onMouseEnter={() => setJogadorSelecionado(jogador)}
                onMouseLeave={() => setJogadorSelecionado(null)}
                />
        
              {jogadorSelecionado.id === jogador.id && (
                <div className="salas-jogador-selecionado-icons">
                <span className="icon-jogadorSelecionado"><RiCloseLine/></span>
                <span className="icon-jogadorSelecionado"><BsFillChatLeftTextFill/></span>
                <span className="icon-jogadorSelecionado"><MdFeedback/></span>
                </div>
              )}
              </>
          ))}
          
        </div>

          ) : 
          
          (
          conteudoBodyModal === 'chat' &&
          <>
          </>
          )}

            <div className="salas-ModalSalaFooter">
            {adminSala && (
                <div className="salas-group-buttonsFooter">
                <button className="salas-botaoClose" onClick={removerUsuarios}><MdGroupRemove/> <span>Excluir</span></button>
                
                <button className={`salas-botaoCadeado ${salaIsPublic ? 'salas-botaoCadeado--public' : 'salas-botaoCadeado--private'}`} onClick={mudarSalaStatus}>
                {salaIsPublic ? <BsUnlockFill /> : <BsLockFill />}
                <span>{salaIsPublic ? 'Pública' : 'Privada'}</span>
                </button>
                </div>
            )
            }
            <Button text="Convide seus amigos" icon={<BsArrowRightShort/>} onClick={() => setShowModalConvidar(true)}/>
            </div>
            </Modal>
        )}



        {showModalCalendario && (
            
            <Modal onClose={()=> setShowModalCalendario(false)} title='Agendar partida' icon={<BsFillCalendarWeekFill/>} clearAll='true' temFooter='true' ativarBotao='true' iconButton={<BsArrowRightShort/>} textButton='Agendar'> 
            <div className="salas-groupCalendario">
            Dia
            {currentDayNow && <NumberList min={1} max={31} step={1} initialValue={parseInt(currentDayNow)} />}
            Hora
            {currentHourNow && <NumberList min={0} max={23} step={1} initialValue={parseInt(currentHourNow)} />}
            Minutos
            {currentMinuteNow && <NumberList min={0} max={55} step={5} initialValue={Math.ceil(currentMinuteNow / 5) * 5} />}
            </div>
            </Modal>
        )}

        {showModalFeedback && (
            <Modal title='Feedback' icon={<MdFeedback/>} clearAll={true}  temFooter='true' ativarBotao='true' textButton="Enviar avaliação" iconButton={<BsArrowRightShort/>} onClose={()=> setShowModalFeedback(false)}>
              <UserProfile 
                nome={jogadorSelecionado.nome}   
                img={jogadorSelecionado.foto}  
                />

                <div className="salas-group-avaliacao">

                <div className="salas-modalFeedback-avaliacao ">
                  Habilidade
                  <Avaliacao setRating={setRatingHabilidade}/> 
                </div>

                <div className="salas-modalFeedback-avaliacao ">
                  Comportamento
                  <Avaliacao setRating={setRatingComportamento} />
                </div>
                  

                </div>

                <div className="salas-modalFeedback-avaliacao-comentario">
                  <span>Comentário</span>
                  <textarea className="my-textarea"></textarea>
                </div>
            </Modal>
        )}

        {showModalConvidar && ( 
          <Modal title='Convide seus amigos' icon={<BsPersonFillAdd/>} temFooter={false}>
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
            </div>
            <div className="salas-groupLink">
              <HiLink/>
              <span className="salas-link"><a id="salas-linkSala">Aqui fica o link da sala</a></span>
              <MdContentCopy/>
            </div>
          </Modal>
        )}

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

const Avaliacao = ({ setRating }) => {
  const [avaliacao, setAvaliacao] = useState(0);
  const [tempAvaliacao, setTempAvaliacao] = useState(0);

  const handleClick = (value) => {
    if (value === avaliacao) {
      setAvaliacao(0);
      setRating(null);
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

const NumberList = ({ min, max, step, initialValue }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(initialValue || min);

  const handleNextClick = () => {
    const nextNumber = currentNumber + step;
    if (nextNumber > max) {
      setCurrentNumber(min);
      setSelectedNumber(min);
    } else {
      setCurrentNumber(nextNumber);
    }
  };

  const handlePrevClick = () => {
    const prevNumber = currentNumber - step;
    if (prevNumber < min) {
      setCurrentNumber(max - step + 1);
      setSelectedNumber(max);
    } else {
      setCurrentNumber(prevNumber);
    }
  };

  const numbers = [];
  for (let i = 0; i < 6; i++) {
    const number = currentNumber + i * step;
    if (number > max) {
      numbers.push(number - max + min - 1);
    } else {
      numbers.push(number);
    }
  }

  return (
    <div className="numberList">
     <BsArrowLeftShort onClick={handlePrevClick} className="numberList-seta" size={'40px'}/>
      {numbers.map((number) => (
        <span key={number} className={selectedNumber === number ? "salas-spanNumber-selected" : "salas-spanNumber"} onClick={() => setSelectedNumber(number)}>
          {number}
        </span>
      ))}
      <BsArrowRightShort onClick={handleNextClick} className="numberList-seta" size={'40px'}/>
    </div>
  );
};



export default Salas;