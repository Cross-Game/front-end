import React, { useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import "./style.css";
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
import riotIcon from '../../assets/index-page/riotIcon.svg'
import likeIcon from '../../assets/index-page/likeIcon.svg'
import medalPrata from '../../assets/index-page/medalPrata.svg'
import medalOuro from '../../assets/index-page/medalOuro.svg'
import medalDiamante from '../../assets/index-page/medalDiamante.svg'
import medalMestre from '../../assets/index-page/medalMestre.svg'

import axios from 'axios';

function Home() {
  const [noticies, setNoticies] = useState([]);

  const [teste, setTeste] = useState(false)

  let config = {
    method: 'get',
    maxBodyLength: 5,
    url: 'https://newsapi.org/v2/everything?q=games&pageSize=20&apiKey=6ac810e80de24125838316d999b45fc0',
    headers: {
      'Authorization': 'Basic dXNlcjp1c2Vy'
    }
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify());
      setNoticies(response.data.articles)
      setTeste(true)
    })
    .catch((error) => {
      console.log(error);
      setTeste(false)
    });



  return (
    <>
      <section className='bannerContainer'>
        <NavBar />

        <h2>UMA EQUIPE FORTE COMEÇA AQUI !</h2>

      </section>

      <div className='explanatoryContent'>
        <div className='container'>
          <ItemSection section="Vantagens" text="Faça amigos e crie partidas épicas" />
          <div className='itensExplainContainer'>
            <div className='leftGroup'>

              <div className='findPlayersContainer'>
                <img src={userIcon} alt="" />
                <div>Conheça novos players e faça amizades incríveis</div>
              </div>
              <div className='discordContainer'>
                <img src={discordIcon} alt="" />
                <div>Faça login de forma rápida com o discord</div>
              </div>

            </div>
            <div className='midGroup'>

              <div className='friendsContainer'>
                <img src={friendIcon} alt="" />
                <div>Crie salas com seus amigos</div>
              </div>

              <div className='bottomMidContainer'>

                <div className='leftBottomMidContainer'>
                  <div className='calendarContainer'>
                    <img src={calendarIcon} alt="" />
                    <div>Agende partidas com seus amigos</div>
                  </div>
                  <div className='chatContainer'>
                    <img src={chatIcon} alt="" />
                    <div>Converse e conheça jogadores através do chat</div>
                  </div>
                </div>

                <div className='platformsContainer'>
                  <img src={xboxIcon} alt="" />
                  <img src={playIcon} alt="" />
                  <img src={pcIcon} alt="" />
                  <div>Faça amigos
                    em todas as plataformas</div>
                </div>
              </div>
            </div>

            <div className='rightGroup'>
              <div className='riotContainer'>
                <img src={riotIcon} alt="" />
                <div>Adicione seu perfil
                  da Riot Games</div>
              </div>
              <div className='avaliationContainer'>
                <img src={likeIcon} alt="" />
                <div>Avalie os jogadores, e ganhe recompensas</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='medalsContent'>
        <div className="container">
          <ItemSection section="Conquiste sua patente" text="Imagine uma em seu perfil" />
          <div className="medalsContainer">
            <div className="itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Prata
                </h2>
              </div>
              <div className="medalIconContainer prata">
                <img src={medalPrata} alt="" />
              </div>
            </div>

            <div className="itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Ouro
                </h2>
              </div>
              <div className="medalIconContainer ouro">
                <img src={medalOuro} alt="" />
              </div>
            </div>

            <div className="itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Diamante
                </h2>
              </div>
              <div className="medalIconContainer diamante">
                <img src={medalDiamante} alt="" />
              </div>
            </div>

            <div className="itensMedalsContainer ">
              <div>
                <p>
                  NÍVEL
                </p>
                <h2>
                  Mestre
                </h2>
              </div>
              <div className="medalIconContainer mestre">
                <img src={medalMestre} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* noticies */}
      <div className="noticiesContent">
        <AwesomeSlider >
          {
            teste ?
              noticies.map((element) => (
                <div className="imgNoticies" data-src={element.urlToImage} />
              ))

              // setando imagem de erro quando der erro na api
              : <div className="imgNoticies" data-src={medalDiamante} />
          }
        </AwesomeSlider>

      </div>


      <div className="contactContent">
        <div className="container">
          <div className="contactContainerCard">
            <div className="content">
              <h2>Entre em Contato</h2>
              <div className="inputsContact">
                <form className="search-wrapper cf">
                  <input type="text" placeholder="Email" />
                  <input type="text" placeholder="Mensagem" />
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </div>
          <div className="reservedRights">
            <h3> © 2022 Todos os direitos reservados à Cross Game </h3>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;