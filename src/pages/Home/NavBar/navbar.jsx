import React, { useEffect, useState } from "react";
import iconLogo from "../../../assets/index-page/Union.png"
import { BiGroup } from "react-icons/bi"
import "@fontsource/krona-one";
import "./style.css"
import { useNavigate } from "react-router-dom"
import { BsDiscord } from "react-icons/bs";
import { RiFacebookBoxFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import axios from 'axios';
import { currentURL } from "../../../data/constants";

function NavBar() {
    const [users, setUsers] = useState(0)

    useEffect(() => {
      axios.get(`${currentURL}/users/count`).then((response) => {
        setUsers(response.data)
      })
    },[])
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
                            <span className="navbar-span"><RiFacebookBoxFill/></span>
                            <span className="navbar-span"><BsDiscord/></span>
                            <span className="navbar-span"><RiInstagramFill/></span>
                            <span className="navbar-span"><RiYoutubeFill/></span>
                        </div>
                    </div>
                    <div className="navbar-linhaDireitaMeio"></div>
                    <div className="navbar-navBarDireitaBaixo">
                        <div className="navbar-baixoEsquerda">
                            <div><BiGroup className="navbar-iconeNavBar" /></div>
                            <div>+<span>{users}</span> Players</div>
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
                                <button className="navbar-buttonLink" onClick={() => navigate("/login")}>Entrar</button>
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