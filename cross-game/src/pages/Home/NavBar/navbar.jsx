import React from "react";
import iconLogo from "../../../assets/index-page/Union.png"
import facebook from "../../../assets/index-page/Facebook.svg"
import discord from "../../../assets/index-page/Discord.svg"
import instagram from "../../../assets/index-page/Instagram.svg"
import youtube from "../../../assets/index-page/Youtube.svg"
import { BiGroup } from "react-icons/bi"
import "@fontsource/krona-one";
import "./style.css"
import { useNavigate } from "react-router-dom"

function NavBar() {

    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar-navbar">
                <div className="navbar-logo">
                    <div className="navbar-imgNavbar">
                        <img src={iconLogo} alt="" />
                    </div>
                </div>
                <div className="navbar-linhaVertical"></div>
                <div className="navbar-esquerdaLogo">
                    <div className="navbar-navBarDireitaCima">
                        <div className="navbar-nomeGrupo">Cross Game</div>
                        <div className="navbar-redeSocial">Nos acompanhe na redes sociais
                            <span className="navbar-span"><img src={facebook} alt="" /></span>
                            <span className="navbar-span"><img src={discord} alt="" /></span>
                            <span className="navbar-span"><img src={instagram} alt="" /></span>
                            <span className="navbar-span"><img src={youtube} alt="" /></span>
                        </div>
                    </div>
                    <div className="navbar-linhaDireitaMeio"></div>
                    <div className="navbar-navBarDireitaBaixo">
                        <div className="navbar-baixoEsquerda">
                            <div><BiGroup className="navbar-iconeNavBar" /></div>
                            <div> +<span>1000</span> Players</div>
                        </div>
                        <div className="navbar-baixoMeio">
                            <div className="navbar-linkPages">
                                <span>
                                    Inicio
                                </span>
                            </div>

                            <div className="navbar-linkPages">
                                <span>
                                    Noticias
                                </span>
                            </div>
                        </div>

                        <div className="navbar-baixoDireita">
                            <div>
                                <button className="navbar-buttonLink">Entrar</button>
                            </div>
                            <div>
                                <button className="navbar-buttonLink" onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;