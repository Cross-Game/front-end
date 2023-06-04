import React, { useEffect, useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar/ProfileNavbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Interesse.css";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { MdOutlineInterests } from "react-icons/md";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { interesses as listaInteresses } from "../../../utils/interesses.js"
import Tag from "../../../components/Tag";
import UserProfile from "../../../components/UserProfile";
import { TOKEN, USERID } from "../../../data/constants";
import axios from "axios";
import Toast from "../../../components/Toast";

function ProfileJogo() {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('erro');

    const [showModalAdicionarInteresse, setShowModalAdicionarInteresse] = useState(false);

    const [interesses, setInteresses] = useState(listaInteresses);
    const [interesseSelecionado, setInteresseSelecionado] = useState("");
    const [categoriaSelecionadas, setCategoriaSelecionadas] = useState([]);

    function limparInteresses() {
        setCategoriaSelecionadas([]);
        setInteresseSelecionado("");
    }


    function obterMeusInteresses(){
        console.log("Obtendo meus interesses")
        axios.get(`http://localhost:8080/preferences/${USERID}`, 
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            },
        }
        ).then((response) => {
            if (response.status === 200) {
                var listaComidas = response.data.food 
                var listaGames = response.data.gameGenre
                var listaMusicas = response.data.musicGenre
                var listaSeries= response.data.serieGenre
                console.log("Sucesso ao obter interesses")
                console.log(response);
            } else {
                mudarToast("erro", "Erro ao obter interesses");
            }
        })
        .catch((error) => {
            console.error("Erro ao obter interesses:", error);
        });
    };

    useEffect(() => {
        obterMeusInteresses();
    }, []);

    function removerInteresse() {
        // lembrar de passar o nome em CAIXA ALTA
        // axios.delete(`http://localhost:8080/preferences/${USERID}/${tipo}/${nome}`,
        //     {
        //         headers: {
        //             'X-Requested-With': 'XMLHttpRequest',
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${TOKEN}`
        //         },
        //     }
        // )
        //     .then((response) => {
        //         if (response.status === 201) {
        //             console.log(response);
        //             mudarToast("sucesso", "Interesse deletado!");
        //         } else {
        //             mudarToast("erro", "Erro ao deletar interesse");
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Erro ao deletar interesse:", error);
        //     });
    };


    function cadastrarInteresse() {
        var campoBody = "";
        console.log(interesseSelecionado)

        switch (interesseSelecionado) {
            case "Comidas": campoBody = "food"; break;
            case "Estilo de jogos": campoBody = "gameGenre"; break;
            case "Filmes": campoBody = "movieGenre"; break;
            case "Musicas": campoBody = "musicGenre"; break;
            case "Séries": campoBody = "seriesGenre"; break;
        }
        console.log(campoBody)

        axios.post(
            `http://localhost:8080/preferences/${USERID}`,
            {
                [campoBody]: categoriaSelecionadas.map(categoria => categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/ /g, "_"))
            },
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                },
            }
        )
            .then((response) => {
                if (response.status === 201) {
                    console.log(response);
                    mudarToast("sucesso", "Interesses cadastrados com sucesso");
                    setCategoriaSelecionadas([]);
                    setInteresseSelecionado([]);
                    setTimeout(() => {
                        setShowModalAdicionarInteresse(false);
                    }, 1000);
                } else {
                    mudarToast("erro", "Erro ao cadastrar interesses");
                }
            })
            .catch((error) => {
                console.error("Erro ao cadastrar plataformas:", error);
            });
    };

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }


    function adicionar() {
        return (
            <>
                <div className="ProfileJogoMiniContainer">
                    <div className="ProfileJogoContainerButtonAdicionar">
                        <span className="ProfileJogoButtonAdicionar" onClick={() => setShowModalAdicionarInteresse(true)}>
                            Adicionar
                            <AiFillPlusCircle className="ProfileIconAdicionar" /></span>
                    </div>
                </div>
                <div className="ProfileInteresseContainer">
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                    <div className="ProfileInteresseMiniContainer">
                        <div className="ProfileInteresseCategoria">
                            <p>Músicas</p>
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Rock</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                        <div className="ProfileInteresseGenero">
                            <p>Eletronica</p>
                            <AiOutlineDelete className="ProfileInteresseIconExcluir" />
                        </div>
                    </div>
                </div>

                {showModalAdicionarInteresse && (
                    <Modal title="Interesses" icon={<MdOutlineInterests />} temFooter={true} ativarBotao={true} textButton="Adicionar" iconButton={<BsCheck />} clearAll={true} onClear={limparInteresses} onClickButton={cadastrarInteresse} onClose={() => setShowModalAdicionarInteresse(false)}>
                        <div className="ModalCadastrarInteresse-body">
                            {/* <UserProfile nome={"Nome"} img={<BsArrowRightShort />} /> */}

                            Interesse
                            <div className="ModalCadastrarInteresse-interesses">

                                {
                                    interesses.map((interesse) => (
                                        <React.Fragment key={interesse.id}>
                                            <Tag
                                                text={interesse.nome}
                                                isSelected={interesseSelecionado === interesse.nome ? true : false}
                                                onClick={() => { setInteresseSelecionado(interesse.nome); setCategoriaSelecionadas([]) }}
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
                                                isSelected={categoriaSelecionadas.includes(categoria)}
                                                onClick={() =>
                                                    setCategoriaSelecionadas((prevCategorias) => {
                                                        if (prevCategorias.includes(categoria)) {
                                                            return prevCategorias.filter((cat) => cat !== categoria);
                                                        } else {
                                                            return [...prevCategorias, categoria];
                                                        }
                                                    })
                                                }
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </Modal>

                )}

                {showToast && (
                    <Toast
                        type={toastType}
                        message={toastMessage}
                        onClose={() => setShowToast(false)}
                    />
                )}

            </>
        )
    }


    return (
        <>
            <ProfileNavbar interesses={{ color: '#fff', borderBottom: '2px solid #0f3' }}
                sidebar={<Sidebar />}
                adicionar={adicionar()}
            />
        </>
    )
}

export default ProfileJogo;