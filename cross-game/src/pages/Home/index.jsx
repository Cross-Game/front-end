import React from 'react';
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


function Home() {
  return (
    <>
      <section className='bannerContainer'>
        <NavBar />
      </section>

      <div className='explanatoryContent'>
        <div className='container'>
          <ItemSection section="Vantagens" text="Faça amigos e crie partidas épicas" />
          <div className='itensExplainContainer'>
            <div className='leftGroup'>

              <div className='findPlayersContainer'>
                <img src={userIcon} alt="" />
              </div>
              <div className='discordContainer'>
                <img src={discordIcon} alt="" />
              </div>

            </div>
            <div className='midGroup'>

              <div className='friendsContainer'>
                <img src={friendIcon} alt="" />
              </div>

              <div className='bottomMidContainer'>

                <div className='leftBottomMidContainer'>
                  <div className='calendarContainer'>
                    <img src={calendarIcon} alt="" />
                  </div>
                  <div className='chatContainer'>
                    <img src={chatIcon} alt="" />
                  </div>
                </div>

                <div className='platformsContainer'>
                  <img src={xboxIcon} alt="" />
                  <img src={playIcon} alt="" />
                  <img src={pcIcon} alt="" />
                </div>
              </div>
            </div>

            <div className='rightGroup'>
              <div className='riotContainer'>
                <img src={riotIcon} alt="" />
              </div>
              <div className='avaliationContainer'>
                <img src={likeIcon} alt="" />
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
    </>
  );
}

export default Home;