import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import "./home.css";
import NavBar from './NavBar/navbar.jsx';
import ItemSection from './ItemSection/index'
import userIcon from '../../assets/index-page/userExplainSection.svg'
import discordIcon from '../../assets/index-page/discordIconExplain.svg'
import friendIcon from '../../assets/index-page/friendIcon.svg'
import calendarIcon from '../../assets/index-page/calendarIcon.svg'
import chatIcon from '../../assets/index-page/chatIcon.svg'
import xboxIcon from '../../assets/index-page/xboxIcon.svg'
import playIcon from '../../assets/index-page/playstationIcon.svg'
import pcIcon from '../../assets/index-page/pcIcon.svg'
import twitchIcon from '../../assets/index-page/iconTwitch.svg'
import likeIcon from '../../assets/index-page/likeIcon.svg'
import medalPrata from '../../assets/index-page/medalPrata.svg'
import medalOuro from '../../assets/index-page/medalOuro.svg'
import medalDiamante from '../../assets/index-page/medalDiamante.svg'
import medalMestre from '../../assets/index-page/medalMestre.svg'

import axios from 'axios';
import { Link, redirect } from 'react-router-dom';
import { URLSITE } from '../../data/constants';

function Home() {
  const [noticies, setNoticies] = useState([]);
  const [teste, setTeste] = useState(false)


  useEffect(() => {
    let config = {
      method: 'get',
      url: 'https://newsapi.org/v2/everything?q=games&pageSize=10&apiKey=3fb0a50ddad34afba1de6566711173b2',
      headers: {
        'Authorization': 'Basic dXNlcjp1c2Vy'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setNoticies(response.data.articles)
        setTeste(true)
      })
      .catch((error) => {
        console.log(error);
        setTeste(false)
      });
  }, []);

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };


  return (
    <>
      <section className='home-bannerContainer'>
        <NavBar />

        <h2>UMA EQUIPE FORTE COMEÇA AQUI !</h2>

      </section>

      <div className='home-explanatoryContent'>
        <div className='home-container'>
          <ItemSection section="Vantagens" text="Faça amigos e crie partidas épicas" />
          <div className='home-itensExplainContainer'>
            <div className='home-leftGroup'>

              <div className='home-findPlayersContainer'>
                <img src={userIcon} alt="" />
                <div>Conheça novos players e faça amizades incríveis</div>
              </div>
              <div className='home-discordContainer'>
                <img src={discordIcon} alt="" />
                <div>Faça login de forma rápida com o discord</div>
              </div>

            </div>
            <div className='home-midGroup'>

              <div className='home-friendsContainer'>
                <img src={friendIcon} alt="" />
                <div>Crie salas com seus amigos</div>
              </div>

              <div className='home-bottomMidContainer'>

                <div className='home-leftBottomMidContainer'>
                  <div className='home-calendarContainer'>
                    <img src={calendarIcon} alt="" />
                    <div>Agende partidas com seus amigos</div>
                  </div>
                  <div className='home-chatContainer'>
                    <img src={chatIcon} alt="" />
                    <div>Converse e conheça jogadores através do chat</div>
                  </div>
                </div>

                <div className='home-platformsContainer'>
                  <img src={xboxIcon} alt="" />
                  <img src={playIcon} alt="" />
                  <img src={pcIcon} alt="" />
                  <div>Faça amigos
                    em todas as plataformas</div>
                </div>
              </div>
            </div>

            <div className='home-rightGroup'>
              <div className='home-riotContainer'>
                <img src={twitchIcon} alt="" />
                <div>Adicione jogos direto da Twitch</div>
              </div>
              <div className='home-avaliationContainer'>
                <img src={likeIcon} alt="" />
                <div>Avalie os jogadores, e ganhe recompensas</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='home-medalsContent'>
        <div className="home-container">
          <ItemSection section="Conquiste sua patente" text="Imagine uma em seu perfil" />
          <div className="home-medalsContainer">
            <div className="home-itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Prata
                </h2>
              </div>
              <div className="home-medalIconContainer home-prata">
                <img src={medalPrata} alt="" />
              </div>
            </div>

            <div className="home-itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Ouro
                </h2>
              </div>
              <div className="home-medalIconContainer home-ouro">
                <img src={medalOuro} alt="" />
              </div>
            </div>

            <div className="home-itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Diamante
                </h2>
              </div>
              <div className="home-medalIconContainer home-diamante">
                <img src={medalDiamante} alt="" />
              </div>
            </div>

            <div className="home-itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Mestre
                </h2>
              </div>
              <div className="home-medalIconContainer home-mestre">
                <img src={medalMestre} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* noticies */}
      {/* <div className="home-noticiesContent">
        <AwesomeSlider >
          {

            teste ?
              noticies.map((element, index) => (

                <div className="home-imgNoticies" onClick={() => handleLinkClick(element.url)} data-src={element.urlToImage}>

                  <div className='teste2'>{element.title}</div>

                </div>


              ))
              // setando imagem de erro quando der erro na api
              : <div className="home-imgNoticies" data-src={medalDiamante} />
          }
        </AwesomeSlider>

      </div> */}


      <div className="home-contactContent">
        <div className="home-container">
          <div className="home-contactContainerCard">
            <div className="home-content">
              <h2>Entre em Contato</h2>
              <div className="home-inputsContact">
                <form className="home-search-wrapper cf">
                  <input type="text" placeholder="Email" />
                  <input type="text" placeholder="Mensagem" />
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
          <div className="home-reservedRights">
            <h3> © 2022 Todos os direitos reservados à Cross Game </h3>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;