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
import { TOKEN, USERID, currentURL } from "../../../data/constants";
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

    const [listaComidas, setListaComidas] = useState([]);
    const [listaJogos, setListaJogos] = useState([]);
    const [listaMusicas, setListaMusicas] = useState([]);
    const [listaSeries, setListaSeries] = useState([]);
    const [listaFilmes, setListaFilmes] = useState([]);


    function limparInteresses() {
        setCategoriaSelecionadas([]);
        setInteresseSelecionado("");
    }


    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const obterMeusInteresses = () => {
            axios
                .get(`${currentURL}/preferences/${USERID}`, {
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.preferences !== undefined) {
                            setListaComidas(response.data.preferences.food);
                            setListaJogos(response.data.preferences.gameGenre);
                            setListaMusicas(response.data.preferences.musicGenre);
                            setListaSeries(response.data.preferences.serieGenre);
                            setListaFilmes(response.data.preferences.movieGenre);
                        }
                        // mudarToast("sucesso", "Sucesso ao obter interesses");
                    } else {
                        mudarToast("erro", "Erro ao obter interesses");
                    }
                })
                .catch((error) => {
                    mudarToast("erro", "Erro ao obter interesses");
                });
        };
        obterMeusInteresses();
    }, []);

    useEffect(() => {
        setDadosCarregados(true);
    }, [listaComidas, listaFilmes, listaJogos, listaMusicas, listaSeries]);

    function removerInteresse(tipo, nome) {
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

    function formatarPalavraLegivel(palavra) {
        const partes = palavra.split('_');
        const palavrasCapitalizadas = partes.map(parte => parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase());
        const palavraFormatada = palavrasCapitalizadas.join(' ');
        return palavraFormatada;
    }

    function cadastrarInteresse() {
        var campoBody = "";

        switch (interesseSelecionado) {
            case "Comidas": campoBody = "food"; break;
            case "Estilo de Jogos": campoBody = "gameGenre"; break;
            case "Filmes": campoBody = "movieGenre"; break;
            case "Músicas": campoBody = "musicGenre"; break;
            case "Séries": campoBody = "seriesGenre"; break;
        }

        let data = categoriaSelecionadas.map(categoria => categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/ /g, "_"));
        axios.post(
            `${currentURL}/preferences/${USERID}`,
            {
                [campoBody]: data
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
                mudarToast("erro", "Erro ao cadastrar interesses");
            });
    };

    function mudarToast(tipo, mensagem) {
        setShowToast(true);
        setToastType(tipo.toLowerCase());
        setToastMessage(mensagem);
    }

    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        setHasData(
            (listaComidas?.length ?? 0) > 0 ||
            (listaJogos?.length ?? 0) > 0 ||
            (listaMusicas?.length ?? 0) > 0 ||
            (listaSeries?.length ?? 0) > 0 ||
            (listaFilmes?.length ?? 0) > 0
        );
    }, [listaComidas, listaFilmes, listaJogos, listaMusicas, listaSeries]);


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

                {hasData && (
                    <div className="ProfileInteresseContainer">

                        {listaComidas && listaComidas.length > 0 && (
                            <div className="ProfileInteresseMiniContainer">
                                <div className="ProfileInteresseCategoria">
                                    <p>Comidas</p>
                                </div>
                                {listaComidas.map((comida, index) => (
                                    <div className="ProfileInteresseGenero" key={index}>
                                        <p key={index}>{formatarPalavraLegivel(comida)}</p>
                                        <AiOutlineDelete className="ProfileInteresseIconExcluir" onClick={() => removerInteresse("food", { comida })} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {listaJogos && listaJogos.length > 0 && (
                            <div className="ProfileInteresseMiniContainer">
                                <div className="ProfileInteresseCategoria">
                                    <p>Estilo de Jogos</p>
                                </div>
                                {listaJogos.map((jogo, index) => (
                                    <div className="ProfileInteresseGenero" key={index}>
                                        <p key={index}>{formatarPalavraLegivel(jogo)}</p>
                                        <AiOutlineDelete className="ProfileInteresseIconExcluir" onClick={() => removerInteresse("gameGenre", { jogo })} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {listaFilmes && listaFilmes.length > 0 && (
                            <div className="ProfileInteresseMiniContainer">
                                <div className="ProfileInteresseCategoria">
                                    <p>Filmes</p>
                                </div>
                                {listaFilmes.map((filme, index) => (
                                    <div className="ProfileInteresseGenero" key={index}>
                                        <p key={index}>{formatarPalavraLegivel(filme)}</p>
                                        <AiOutlineDelete className="ProfileInteresseIconExcluir" onClick={() => removerInteresse("movieGenre", { filme })} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {listaMusicas && listaMusicas.length > 0 && (
                            <div className="ProfileInteresseMiniContainer">
                                <div className="ProfileInteresseCategoria">
                                    <p>Músicas</p>
                                </div>
                                {listaMusicas.map((musica, index) => (
                                    <div className="ProfileInteresseGenero" key={index}>
                                        <p key={index}>{formatarPalavraLegivel(musica)}</p>
                                        <AiOutlineDelete className="ProfileInteresseIconExcluir" onClick={() => removerInteresse("seriesGenre", { musica })} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {listaSeries && listaSeries.length > 0 && (
                            <div className="ProfileInteresseMiniContainer">
                                <div className="ProfileInteresseCategoria">
                                    <p>Séries</p>
                                </div>
                                {listaSeries.map((serie, index) => (
                                    <div className="ProfileInteresseGenero" key={index}>
                                        <p key={index}>{formatarPalavraLegivel(serie)}</p>
                                        <AiOutlineDelete className="ProfileInteresseIconExcluir" onClick={() => removerInteresse("seriesGenre", { serie })} />
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                )}

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