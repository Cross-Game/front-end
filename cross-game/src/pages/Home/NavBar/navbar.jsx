import React from "react";
import iconLogo from "../assets/Union.png"
import facebook from "../assets/Facebook.svg"
import discord from "../assets/Discord.svg"
import instagram from "../assets/Instagram.svg"
import youtube from "../assets/Youtube.svg"
import { BiGroup } from "react-icons/bi"
import "@fontsource/krona-one";
import "./style.css"

function NavBar() {
    return (
        <>
            <nav>
                <div className="logo">
                    <div className="img">
                        <img src={iconLogo} alt="" />
                    </div>
                </div>
                <div className="linhaVertical"></div>
                <div className="esquerdaLogo">
                    <div className="navBarDireitaCima">
                        <div className="nomeGrupo">Cross Game</div>
                        <div className="redeSocial">Nos acompanhe na redes sociais
                            <span><img src={facebook} alt="" /></span>
                            <span><img src={discord} alt="" /></span>
                            <span><img src={instagram} alt="" /></span>
                            <span><img src={youtube} alt="" /></span>
                        </div>
                    </div>
                    <div className="linhaDireitaMeio"></div>
                    <div className="navBarDireitaBaixo">
                        <div className="baixoEsquerda">
                            <div><BiGroup className="iconeNavBar" /></div>
                            <div> +<span>1000</span> Players</div>
                        </div>
                        <div className="baixoMeio">
                            <div className="botaoInicio">
                                <button>Inicio</button>
                            </div>
                            <div className="botaoNoticias">
                                <button>Noticias</button>
                            </div>
                        </div>
                        <div className="baixoDireita">
                            <div>
                                <button>Entrar</button>
                            </div>
                            <div>
                                <button>Cadastrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;